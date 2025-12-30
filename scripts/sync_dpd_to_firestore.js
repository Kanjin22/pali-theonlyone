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
            source: "DPD",
            page: entry.page || "",
            updated_at: admin.firestore.FieldValue.serverTimestamp()
        };

        const existingDocs = existingMap.get(cleanRoot);
        
        let docRef;
        if (existingDocs && existingDocs.length > 0) {
            // Found existing. Use the first one (or try to match group if possible).
            // Since we are fixing groups, we might not match by group.
            // But if there are multiple entries for the same root (homonyms), we need to be careful.
            // DPD data sample: "√acc 1", "√acc 2". These are distinct keys in the JS object.
            // But 'root' field in value might be "√acc".
            
            // Let's look at JS data again.
            // "√acc 1": [ { root: "√acc 1", ... } ]
            // So the root field DOES contain the number if it's distinct?
            // Let's check the previous Read output.
            // "√acc 1": [ { "root": "√acc 1", ... } ]
            // So `cleanRoot` will be "acc 1".
            
            // If Firestore has "acc" and "acc", we need to know which is which.
            // If we use "acc 1" as dhatu_word, it resolves ambiguity.
            
            // Logic: Just look for a doc with this dhatu_word.
            // If multiple, maybe we update the one that "matches best"? 
            // For now, if there is a match, we update the first one. 
            // If DPD has duplicates in the source file, we might overwrite.
            
            // To prevent creating duplicates if we already have them:
            // We pop from the list so we don't reuse it for another entry?
            const matchIndex = existingDocs.findIndex(d => d.dhatu_word === cleanRoot);
            
            if (matchIndex !== -1) {
                const match = existingDocs[matchIndex];
                docRef = db.collection('dhatu').doc(match.id);
                // Remove from map so we don't update it again?
                // actually, DPD might have multiple entries for same root word?
                // The JS structure is Object with keys. Keys are unique.
                // Value is Array. 
                // "√akkh": [ { ... } ]
                // If array has 1 item, fine.
                
                // If array has multiple items, they share the root key.
                // e.g. "√kri": [ { group: 1 }, { group: 8 } ]
                // Then `cleanRoot` is same "kri".
                // We need to match existing docs that have `mawat_dhatu` matching the NEW group?
                // Or if we are changing groups, we can't match by group.
                
                // This is tricky. 
                // Simple approach: Delete all DPD entries and re-upload? 
                // Pros: Clean. Cons: Writes cost, might break links if IDs change (bookmarks?).
                
                // Better approach:
                // Try to find a doc with same `dhatu_word` AND (`mawat_dhatu` == thaiGroup OR `mawat_dhatu` == oldGroup).
                
                // Since we are just one-shot fixing, maybe we just assume if `dhatu_word` matches, it's the candidate.
                // If there are multiple `dhatu_word` matches (e.g. 2 docs for 'kri'), and we have 2 entries to process.
                // We should map 1-to-1.
                
                existingDocs.splice(matchIndex, 1); // Remove used doc
            } else {
                // No exact match for this root word. Create new.
                docRef = db.collection('dhatu').doc();
            }
        } else {
            // New
            docRef = db.collection('dhatu').doc();
        }

        batch.set(docRef, docData, { merge: true });
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
