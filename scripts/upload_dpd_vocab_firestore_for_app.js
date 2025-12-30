const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// 1. Load Data (Adjusted for pali-dhatu-app structure: src/data)
const dataPath = path.join(__dirname, '../src/data/vocab-general-dpd.js');
if (!fs.existsSync(dataPath)) {
    console.error("Data file not found:", dataPath);
    console.error("Please ensure vocab-general-dpd.js is in src/data/");
    process.exit(1);
}

// Read and parse export syntax
let fileContent = fs.readFileSync(dataPath, 'utf8');
fileContent = fileContent.replace('export const dpdVocab = ', '').replace(';', '').trim();
const vocabData = JSON.parse(fileContent);

// 2. Initialize Firebase
const keyPaths = [
    path.join(__dirname, '../service-account-key.json'),
    './service-account-key.json'
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
    console.error("No service-account-key.json found. Please place it in the project root.");
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
    if (entry.pali_thai) index.add(entry.pali_thai);
    if (entry.pali_roman) index.add(entry.pali_roman.toLowerCase());
    if (entry.meaning) index.add(entry.meaning);
    
    // Add keywords (split meaning)
    if (entry.meaning) {
        entry.meaning.split(/[, ]+/).forEach(w => {
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
    let total = vocabData.length;
    
    console.log(`Preparing to upload ${total} vocab entries...`);
    
    // Using 'vocab' collection as standard dictionary storage
    const collectionName = 'vocab';
    
    for (let i = 0; i < total; i++) {
        const item = vocabData[i];
        
        // Map to Firestore Schema
        const docRef = db.collection(collectionName).doc(); // Auto ID
        
        const firestoreData = {
            pali_word: item.pali_thai,
            pali_roman: item.pali_roman,
            meaning: item.meaning,
            pos: item.pos,
            grammar: item.grammar,
            construction: item.construction,
            examples: item.examples || [],
            source: "DPD",
            search_index_array: generateSearchIndex(item),
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
