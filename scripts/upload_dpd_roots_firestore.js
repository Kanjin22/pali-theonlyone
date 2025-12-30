const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// 1. Load Data
const dataPath = path.join(__dirname, '../data/raw/vocab-roots-dpd.js');
if (!fs.existsSync(dataPath)) {
    console.error("Data file not found:", dataPath);
    console.error("Please ensure vocab-roots-dpd.js is in data/raw/");
    process.exit(1);
}

// Read and parse export syntax
let fileContent = fs.readFileSync(dataPath, 'utf8');
fileContent = fileContent.replace('export const dpdRoots = ', '').replace(';', '').trim();
const rootsData = JSON.parse(fileContent);

// 2. Initialize Firebase
// Check for service account in typical locations
const keyPaths = [
    'D:/pali-dhatu-app/service-account-key.json',
    path.join(__dirname, '../service-account-key.json')
];

let serviceAccount = null;
for (const p of keyPaths) {
    if (fs.existsSync(p)) {
        serviceAccount = require(p);
        console.log(`Found service account at: ${p}`);
        break;
    }
}

if (!serviceAccount) {
    console.error("No service-account-key.json found. Please place it in D:/pali-dhatu-app/ or project root.");
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 3. Helper: Generate Search Index
function generateSearchIndex(entry) {
    const index = new Set();
    
    // Add raw fields
    if (entry.root_pali) index.add(entry.root_pali);
    if (entry.root_roman) index.add(entry.root_roman.toLowerCase());
    if (entry.meaning_thai) index.add(entry.meaning_thai);
    if (entry.meaning_pali) index.add(entry.meaning_pali);
    
    // Add examples
    if (entry.udaharana && Array.isArray(entry.udaharana)) {
        entry.udaharana.forEach(ex => index.add(ex));
    }
    
    // Add keywords (split meaning)
    if (entry.meaning_thai) {
        entry.meaning_thai.split(/[, ]+/).forEach(w => {
            if (w.trim()) index.add(w.trim());
        });
    }
    
    return Array.from(index);
}

// 4. Upload Function
async function uploadData() {
    const batchSize = 400;
    let batch = db.batch();
    let count = 0;
    let total = rootsData.length;
    
    console.log(`Preparing to upload ${total} roots...`);
    
    for (let i = 0; i < total; i++) {
        const item = rootsData[i];
        
        // Map to Firestore Schema
        const docRef = db.collection('dhatu').doc(); // Auto ID
        
        const firestoreData = {
            dhatu_word: item.root_pali,      // root_pali -> dhatu_word
            mawat_dhatu: item.group_pali,    // group_pali -> mawat_dhatu
            arth_thai: item.meaning_thai,    // meaning_thai -> arth_thai
            arth_pali: item.meaning_pali,    // meaning_pali -> arth_pali
            udaharana: item.udaharana || [],
            source: "DPD",
            anukrom_dhatu: i + 1,            // Sequence number
            search_index_array: generateSearchIndex(item),
            
            // Extra fields for DPD reference
            root_roman: item.root_roman,
            group_roman: item.group_roman,
            created_at: admin.firestore.FieldValue.serverTimestamp()
        };
        
        batch.set(docRef, firestoreData);
        count++;
        
        if (count % batchSize === 0) {
            console.log(`Committing batch ${count / batchSize}...`);
            await batch.commit();
            batch = db.batch();
        }
    }
    
    if (count % batchSize !== 0) {
        console.log(`Committing final batch...`);
        await batch.commit();
    }
    
    console.log("Upload complete!");
}

uploadData().catch(console.error);
