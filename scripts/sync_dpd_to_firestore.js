const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// 1. Setup Firebase
const serviceAccountPath = 'D:/pali-dhatu-app/service-account-key.json';
if (!fs.existsSync(serviceAccountPath)) {
    console.error(`Service account key not found at ${serviceAccountPath}`);
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath))
});

const db = admin.firestore();

// 2. Load DPD Data
const dataPath = path.join(__dirname, '../data/vocab-roots-dpd.js');
if (!fs.existsSync(dataPath)) {
    console.error(`Data file not found at ${dataPath}`);
    process.exit(1);
}

let fileContent = fs.readFileSync(dataPath, 'utf8');
// Remove "const vocabRootsDPD = " and trailing ";" to parse as JSON
fileContent = fileContent.replace('const vocabRootsDPD = ', '').trim();
if (fileContent.endsWith(';')) {
    fileContent = fileContent.slice(0, -1);
}

let vocabRootsDPD;
try {
    vocabRootsDPD = JSON.parse(fileContent);
} catch (e) {
    // If simple JSON parse fails, try eval (safe enough for local trusted file)
    // or better, fix the format if it's not strict JSON.
    // Given the previous `Read` output, keys are quoted, so JSON.parse might work if keys are valid.
    // But standard JS object keys might not be quoted.
    // Let's use eval in a VM context if needed, but try JSON.parse first.
    console.error("JSON parse failed, trying eval...");
    try {
        vocabRootsDPD = eval('(' + fileContent + ')');
    } catch (e2) {
        console.error("Failed to parse data file:", e2);
        process.exit(1);
    }
}

// 3. Mapping Logic
const groupMapping = {
    1: "ภู (อ)",
    2: "รุธ (ํอ)",
    3: "ทิว (ย)",
    4: "สุ (ณุ ณา อุณา)",
    5: "กี (นา)",
    6: "คห (ณฺหา ปฺป)",
    7: "ตน (โอ ยิร)",
    8: "จุร (เณ ณย)"
};

function getThaiGroup(dpdGroup) {
    // dpdGroup is usually an integer 1-8
    // But sometimes it might be string or have other data?
    // Based on sample, it's integer.
    return groupMapping[dpdGroup] || dpdGroup;
}

// 4. Upload/Sync Loop
async function syncData() {
    console.log("Starting Sync...");
    let batch = db.batch();
    let count = 0;
    let totalUpdated = 0;

    const entries = [];
    for (const key in vocabRootsDPD) {
        if (vocabRootsDPD.hasOwnProperty(key)) {
            const roots = vocabRootsDPD[key];
            if (Array.isArray(roots)) {
                entries.push(...roots);
            }
        }
    }

    console.log(`Found ${entries.length} DPD entries to process.`);

    for (const entry of entries) {
        // Map Group
        const thaiGroup = getThaiGroup(entry.group);
        
        // Prepare Data
        // Firestore 'dhatu' collection schema expectations:
        // dhatu_word, arth_thai, arth_pali, mawat_dhatu, udaharana, source, etc.
        
        // Remove "√" from root for cleaner display? Or keep it?
        // Existing logic in root_detail.html adds "√" manually: displayRoot = `√${displayRoot}`;
        // So we should probably store it WITHOUT "√" if possible, or consistent with existing.
        // Let's check existing DPD entries in Firestore...
        // Assuming we store what is in 'root' field.
        // Sample: "root": "√akkh"
        // Let's keep it as is for now to match the key.

        const docData = {
            dhatu_word: entry.root.replace(/^√/, ''), // Strip √ for storage if we follow convention? 
            // Wait, root_detail.html says: displayRoot = `√${displayRoot}`;
            // If we store "√akkh", display becomes "√√akkh".
            // So we MUST strip "√".
            
            arth_thai: entry.meaning_thai || "",
            arth_pali: entry.meaning_pali || "", // Map 'meaning_pali' to 'arth_pali'
            mawat_dhatu: thaiGroup,
            udaharana: entry.example || "",
            source: "DPD",
            page: entry.page || "",
            updated_at: admin.firestore.FieldValue.serverTimestamp()
        };

        // Unique ID generation or Query?
        // We should query by dhatu_word + source = DPD to avoid duplicates.
        // But doing a query for every item is slow.
        // Maybe we can generate a deterministic ID? e.g. "dpd_akkh_1"
        // But existing IDs might be auto-generated.
        
        // Strategy: Query for existing DPD entry with this root word.
        // If found, update. If not, add.
        // This is slow for 2000+ entries.
        
        // Optimized Strategy:
        // 1. Fetch ALL DPD entries from Firestore once (id, dhatu_word, mawat_dhatu).
        // 2. Create a map.
        // 3. Match and batch write.
        
        // Let's do the Optimized Strategy.
    }
    
    // Fetch existing DPD roots
    console.log("Fetching existing DPD roots from Firestore...");
    const snapshot = await db.collection('dhatu').where('source', '==', 'DPD').get();
    const existingMap = new Map(); // key: dhatu_word + "_" + group (to distinguish multiple groups for same root?)
    // Actually DPD roots are usually unique by Root + Group.
    
    snapshot.forEach(doc => {
        const d = doc.data();
        const key = `${d.dhatu_word}_${d.mawat_dhatu}`; 
        // Note: mawat_dhatu in Firestore might be the OLD one (e.g. "1") or NEW one ("ภู (อ)").
        // We need a robust key. Maybe just dhatu_word?
        // DPD might have same root in different groups.
        
        // If we change the group name, the key changes.
        // Better to match by `dhatu_word` and maybe just update all matches.
        
        if (!existingMap.has(d.dhatu_word)) {
            existingMap.set(d.dhatu_word, []);
        }
        existingMap.get(d.dhatu_word).push({ id: doc.id, ...d });
    });

    console.log(`Fetched ${snapshot.size} existing DPD documents.`);

    for (const entry of entries) {
        // Strip "√" prefix and trailing numbers (e.g. "√acc 1" -> "acc")
        const cleanRoot = entry.root.replace(/^√/, '').replace(/\s+\d+$/, '');
        const thaiGroup = getThaiGroup(entry.group);
        
        const docData = {
            dhatu_word: cleanRoot,
            arth_thai: entry.meaning_thai || "",
            arth_pali: entry.meaning_pali || "",
            mawat_dhatu: thaiGroup,
            udaharana: entry.example || "",
            paccaya: entry.root_sign_thai || "", // Add Paccaya (Root Sign)
            source: "DPD",
            page: entry.page || "",
            updated_at: admin.firestore.FieldValue.serverTimestamp()
        };

        const existingDocs = existingMap.get(cleanRoot);
        
        let docRef;
        let match = null;

        if (existingDocs && existingDocs.length > 0) {
            // Uniqueness Check Logic: Root + Suffix (Paccaya)
            
            // 1. Try exact match by Paccaya
            if (entry.root_sign_thai) {
                match = existingDocs.find(d => d.paccaya === entry.root_sign_thai);
            }

            // 2. If not found, try match by Group (mawat_dhatu) - Migration fallback
            if (!match) {
                match = existingDocs.find(d => d.mawat_dhatu === thaiGroup);
            }

            // 3. If still not found and only 1 candidate exists (and it has no paccaya), assume match
            if (!match && existingDocs.length === 1 && !existingDocs[0].paccaya) {
                match = existingDocs[0];
            }
        }

        if (match) {
            // Found existing. Update it.
            docRef = db.collection('dhatu').doc(match.id);
            batch.update(docRef, docData);
            
            // Remove used doc from existingDocs so we don't match it again
            const idx = existingDocs.indexOf(match);
            if (idx > -1) existingDocs.splice(idx, 1);
        } else {
            // Create New
            docRef = db.collection('dhatu').doc();
            // Add extra creation fields
            docData.created_at = admin.firestore.FieldValue.serverTimestamp();
            // Use global counter + current batch offset for simplistic ID, or just rely on totalUpdated
            docData.anukrom_dhatu = totalUpdated + 1; 
            
            batch.set(docRef, docData);
        }

        count++;
        totalUpdated++;

        if (count >= 400) {
            await batch.commit();
            batch = db.batch();
            count = 0;
            console.log(`Processed ${totalUpdated} entries...`);
        }
    }

    if (count > 0) {
        await batch.commit();
    }
    
    console.log(`Sync Complete. Total processed: ${totalUpdated}`);
}

syncData().catch(err => console.error(err));
