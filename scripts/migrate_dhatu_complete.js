const fs = require('fs');
const path = require('path');
const admin = require('D:/pali-dhatu-app/node_modules/firebase-admin');
const serviceAccount = require('D:/pali-dhatu-app/service-account-key.json');

// Initialize Firebase
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();

// --- 1. Load Data ---
const vocabPath = path.join(__dirname, '../data/vocab-roots.js');
let fileContent = fs.readFileSync(vocabPath, 'utf8');

// Quick hack to load the data: Remove "const vocabRoots =" and eval, or just wrap in a function
// Since it's a JS object literal, we can use eval safely in this controlled script
// But "const vocabRoots =" might be at the start.
fileContent = fileContent.replace('const vocabRoots =', 'module.exports =');
// Write to a temp file to require it
const tempPath = path.join(__dirname, 'temp_vocab_roots.js');
fs.writeFileSync(tempPath, fileContent);
const vocabRoots = require('./temp_vocab_roots.js');

// --- 2. Pali Script Utils (Thai -> Roman) ---
// Copied and adapted from pali-script.js
function thaiToRoman(text) {
    if (!text) return "";
    let s = text;

    // 1. Move pre-positioned vowels (เ, โ, ไ, ใ) to after the consonant cluster
    // The pattern matches a pre-vowel, followed by optional (Consonant+Pinthu) sequences, then the main Consonant.
    s = s.replace(/([เโไใ])((?:[ก-ฮ]ฺ)*[ก-ฮ])/g, "$2$1");

    // Mapping table
    const map = {
        'ก': 'k', 'ข': 'kh', 'ค': 'g', 'ฆ': 'gh', 'ง': 'ṅ',
        'จ': 'c', 'ฉ': 'ch', 'ช': 'j', 'ฌ': 'jh', 'ญ': 'ñ',
        'ฏ': 'ṭ', 'ฐ': 'ṭh', 'ฑ': 'ḍ', 'ฒ': 'ḍh', 'ณ': 'ṇ',
        'ต': 't', 'ถ': 'th', 'ท': 'd', 'ธ': 'dh', 'น': 'n',
        'ป': 'p', 'ผ': 'ph', 'พ': 'b', 'ภ': 'bh', 'ม': 'm',
        'ย': 'y', 'ร': 'r', 'ล': 'l', 'ว': 'v', 'ส': 's', 'ห': 'h', 'ฬ': 'ḷ', 'อ': 'a',
        'า': 'ā', 'ิ': 'i', 'ี': 'ī', 'ุ': 'u', 'ู': 'ū', 
        'เ': 'e', 'โ': 'o', 'ำ': 'ṃ', 'ํ': 'ṃ', 'ฺ': '', 'ฯ': '', '.': ''
    };

    // Replace longest matches first? No, simple char replacement usually works AFTER moving pre-vowels
    // But we need to handle multi-char sequences if any? 
    // Thai-to-Roman is simpler than Roman-to-Thai because 1 Thai char usually maps to 1 Roman unit (except aspirates which are 1 unit in Pali thought)
    // Actually, 'ข' -> 'kh'. 
    
    let res = "";
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (map[c] !== undefined) {
            res += map[c];
        } else {
            // Keep original if not mapped (e.g. spaces, special chars)
             // Check if it's a Thai char not in map?
             if (/[ก-ฮ]/.test(c)) {
                 // Implicit 'a' logic is tricky here without full syllabification
                 // But for ROOTS, usually they are explicit.
                 // Let's rely on simple mapping first.
                 // Note: 'อ' maps to 'a' only if it's a vowel holder? 
                 // In roots like 'อติ', 'อ' is 'a'.
                 // In roots like 'ก', it's 'ka' (implicit).
                 // However, for SORTING, 'k' vs 'ka' usually sorts same place relative to 'kh'.
                 // Let's stick to direct char mapping for now.
             }
             res += c;
        }
    }
    return res;
}

// Order of Pali alphabet for sorting
const paliOrder = [
    'a', 'ā', 'i', 'ī', 'u', 'ū', 'e', 'o',
    'k', 'kh', 'g', 'gh', 'ṅ',
    'c', 'ch', 'j', 'jh', 'ñ',
    'ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ',
    't', 'th', 'd', 'dh', 'n',
    'p', 'ph', 'b', 'bh', 'm',
    'y', 'r', 'l', 'v', 's', 'h', 'ḷ', 'ṃ'
];

const paliOrderMap = new Map();
paliOrder.forEach((char, index) => {
    paliOrderMap.set(char, index);
});

function comparePali(wordA, wordB) {
    const romanA = thaiToRoman(wordA).toLowerCase().replace(/[^a-zāīūṅñṭḍṇḷṃ]/g, '');
    const romanB = thaiToRoman(wordB).toLowerCase().replace(/[^a-zāīūṅñṭḍṇḷṃ]/g, '');

    // Tokenize? No, just char by char comparison
    // But 'kh' is one unit?
    // Actually, in sorting:
    // k < kh < g < gh ...
    // If we map 'kh' to a single comparable value, it's easier.
    // Let's replace multi-char Pali letters with single-char tokens for sorting
    // tokens: kh -> 1, gh -> 2, etc.
    // Or just iterate and consume.
    
    // Better strategy: Convert roman string to array of indices
    const getIndices = (str) => {
        const indices = [];
        let i = 0;
        while (i < str.length) {
            // Check 2-char match first
            let two = str.substr(i, 2);
            if (paliOrderMap.has(two)) {
                indices.push(paliOrderMap.get(two));
                i += 2;
                continue;
            }
            // Check 1-char match
            let one = str[i];
            if (paliOrderMap.has(one)) {
                indices.push(paliOrderMap.get(one));
                i += 1;
                continue;
            }
            // Unknown char (ignore or put at end?)
            i++; 
        }
        return indices;
    };

    const indicesA = getIndices(romanA);
    const indicesB = getIndices(romanB);

    const len = Math.min(indicesA.length, indicesB.length);
    for (let i = 0; i < len; i++) {
        if (indicesA[i] !== indicesB[i]) {
            return indicesA[i] - indicesB[i];
        }
    }
    return indicesA.length - indicesB.length;
}

// --- 3. Process Data ---
async function migrate() {
    console.log("Preparing data...");
    let allDhatus = [];

    // Flatten
    for (const [key, variants] of Object.entries(vocabRoots)) {
        if (Array.isArray(variants)) {
            variants.forEach(v => {
                allDhatus.push({
                    dhatu_word: v.root, // Original Thai root
                    arth_pali: v.meaning_pali || "",
                    arth_thai: v.meaning_thai || "",
                    mawat_dhatu: v.group || "",
                    source: v.source || "",
                    katha_no: v.page || "", // Mapping page -> katha_no
                    udaharana: v.example ? [v.example] : [], // Wrap in array
                    // For sorting:
                    _sortKey: v.root
                });
            });
        }
    }

    console.log(`Total entries found: ${allDhatus.length}`);

    // Sort
    console.log("Sorting...");
    allDhatus.sort((a, b) => comparePali(a._sortKey, b._sortKey));

    // Assign IDs
    allDhatus = allDhatus.map((item, index) => {
        // Remove _sortKey
        const { _sortKey, ...data } = item;
        return {
            ...data,
            anukrom_dhatu: index + 1
        };
    });

    // --- 4. Firestore Operations ---
    console.log("Deleting existing 'dhatu' collection...");
    const batchSize = 400; // Safe limit
    const collectionRef = db.collection('dhatu');
    
    // Delete function
    async function deleteCollection(collectionPath, batchSize) {
        const collectionRef = db.collection(collectionPath);
        const query = collectionRef.orderBy('__name__').limit(batchSize);
      
        return new Promise((resolve, reject) => {
          deleteQueryBatch(db, query, resolve).catch(reject);
        });
    }
      
    async function deleteQueryBatch(db, query, resolve) {
        const snapshot = await query.get();
      
        const batchSize = snapshot.size;
        if (batchSize === 0) {
          // When there are no documents left, we are done
          resolve();
          return;
        }
      
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
          deleteQueryBatch(db, query, resolve);
        });
    }

    await deleteCollection('dhatu', batchSize);
    console.log("Deletion complete.");

    // Upload
    console.log("Uploading new data...");
    let batch = db.batch();
    let count = 0;
    let totalUploaded = 0;

    for (const item of allDhatus) {
        const docRef = collectionRef.doc(); // Auto ID
        batch.set(docRef, item);
        count++;

        if (count >= batchSize) {
            await batch.commit();
            totalUploaded += count;
            console.log(`Uploaded ${totalUploaded} documents...`);
            batch = db.batch();
            count = 0;
        }
    }

    if (count > 0) {
        await batch.commit();
        totalUploaded += count;
    }

    console.log(`Migration complete. Total documents: ${totalUploaded}`);
    
    // Cleanup temp file
    fs.unlinkSync(tempPath);
}

migrate().catch(console.error);
