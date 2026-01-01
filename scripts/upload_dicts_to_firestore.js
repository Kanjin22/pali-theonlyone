const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const keyPath = "d:/pali-dhatu-app/service-account-key.json";

if (!fs.existsSync(keyPath)) {
    console.error(`Service account key not found at ${keyPath}`);
    process.exit(1);
}

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(keyPath)
});

const db = admin.firestore();

// Load Data Function
function loadData(filename) {
    const p = path.join(__dirname, '../data/raw', filename);
    console.log(`Loading ${p}...`);
    let content = fs.readFileSync(p, 'utf8');
    // Simple regex to extract JSON object
    // Expects: const variableName = { ... };
    content = content.replace(/^const \w+\s*=\s*/, '').replace(/;\s*$/, '').trim();
    try {
        return JSON.parse(content);
    } catch (e) {
        console.error(`Error parsing ${filename}:`, e.message);
        return {};
    }
}

const sources = [
    { file: 'vocab-bhumibalo.js', source: 'Bhumibalo' },
    { file: 'vocab-jinakalamalini.js', source: 'Jinakālamālinī' },
    { file: 'vocab-general.js', source: 'General' }
];

function generateSearchIndex(headword, meaning) {
    const index = new Set();
    if (headword) index.add(headword);
    
    // Add partial matches for headword?
    // Maybe not for now, Firestore limits array size.
    
    // Keywords from meaning (Thai)
    if (meaning) {
        // Remove HTML tags if any (e.g. <br>)
        const cleanMeaning = meaning.replace(/<[^>]*>/g, ' ');
        // Split by spaces and punctuation
        const tokens = cleanMeaning.split(/[\s,.;:"'()\[\]]+/);
        tokens.forEach(t => {
            if (t && t.length > 1) index.add(t);
        });
    }
    
    return Array.from(index).slice(0, 50); // Limit to 50 keywords
}

async function upload() {
    const batchSize = 400;
    
    for (const src of sources) {
        console.log(`Processing ${src.source}...`);
        const data = loadData(src.file);
        const entries = Object.entries(data);
        const total = entries.length;
        
        if (total === 0) {
            console.log("No entries found, skipping.");
            continue;
        }
        
        let batch = db.batch();
        let count = 0;
        let globalCount = 0;
        
        for (const [headword, content] of entries) {
            // Create a new doc
            const docRef = db.collection('vocab').doc();
            
            const docData = {
                pali_word: headword,
                pali_roman: null, // Placeholder
                meaning: content,
                source: src.source,
                search_index_array: generateSearchIndex(headword, content),
                created_at: admin.firestore.FieldValue.serverTimestamp()
            };
            
            batch.set(docRef, docData);
            count++;
            globalCount++;
            
            if (count >= batchSize) {
                process.stdout.write(`\r  Committing batch... (${globalCount}/${total})`);
                await batch.commit();
                batch = db.batch();
                count = 0;
            }
        }
        
        if (count > 0) {
            console.log(`\n  Committing final batch... (${globalCount}/${total})`);
            await batch.commit();
        } else {
            console.log("");
        }
        console.log(`Done with ${src.source}.`);
    }
}

upload().catch(err => {
    console.error("Upload failed:", err);
});
