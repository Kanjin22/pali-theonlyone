const fs = require('fs');
const path = require('path');

// 1. Load Scraped Data (vocab-roots.js)
const scrapedPath = path.resolve('D:/pali-theonlyone/data/vocab-roots.js');
let scrapedContent = fs.readFileSync(scrapedPath, 'utf8');
// Remove "const vocabRoots = " and ";" to parse JSON
scrapedContent = scrapedContent.replace('const vocabRoots =', '').trim();
if (scrapedContent.endsWith(';')) scrapedContent = scrapedContent.slice(0, -1);
const scrapedData = JSON.parse(scrapedContent);

// 2. Load Firebase Data (vocab-roots-firebase.js)
const firebasePath = path.resolve('D:/pali-theonlyone/data/vocab-roots-firebase.js');
let firebaseContent = fs.readFileSync(firebasePath, 'utf8');
// Remove JS wrapper
firebaseContent = firebaseContent.replace(/const vocabRoots =/, '').replace(/\/\/ Exported.*/, '').trim();
// Find the last closing brace and cut off anything after (comments)
const lastBrace = firebaseContent.lastIndexOf('}');
firebaseContent = firebaseContent.substring(0, lastBrace + 1);
const firebaseData = JSON.parse(firebaseContent);

console.log(`Scraped Roots: ${Object.keys(scrapedData).length}`);
console.log(`Firebase Roots: ${Object.keys(firebaseData).length}`);

// 3. Merge
// Strategy: Iterate Firebase entries. If key exists in scraped, merge. Else add.
// Firebase keys might be comma separated e.g. "ขภิ, ขมฺภ"

let mergedCount = 0;
let addedCount = 0;

Object.keys(firebaseData).forEach(fbKey => {
    const fbEntries = firebaseData[fbKey];
    
    // Handle comma-separated keys
    const keys = fbKey.split(',').map(k => k.trim()).filter(k => k);
    
    keys.forEach(key => {
        if (scrapedData[key]) {
            // Merge into existing array
            // Check if this specific entry already exists (by meaning?)
            // Actually, Firebase data is likely "better".
            // Let's prepend Firebase entries to the array, or mark them as "verified"
            
            fbEntries.forEach(fbEntry => {
                // Check for duplicates in existing entries
                const isDuplicate = scrapedData[key].some(existing => 
                    existing.meaning === fbEntry.meaning || 
                    (existing.group === fbEntry.group && existing.example === fbEntry.example)
                );

                if (!isDuplicate) {
                    // Enrich fbEntry with source tag
                    fbEntry._source = "App";
                    scrapedData[key].unshift(fbEntry); // Put verified data on top
                } else {
                    // Update existing entry with extra fields
                     const existing = scrapedData[key].find(e => 
                        e.meaning === fbEntry.meaning || 
                        (e.group === fbEntry.group && e.example === fbEntry.example)
                    );
                    if (existing) {
                        if (fbEntry.meaning_pali) existing.meaning_pali = fbEntry.meaning_pali;
                        if (fbEntry.id) existing.id = fbEntry.id;
                        if (fbEntry.ref) existing.ref = fbEntry.ref;
                        existing._source = "App (Merged)";
                    }
                }
            });
            mergedCount++;
        } else {
            // New root
            scrapedData[key] = fbEntries.map(e => ({ ...e, _source: "App" }));
            addedCount++;
        }
    });
});

console.log(`Merged: ${mergedCount}, Added: ${addedCount}`);
console.log(`Total Roots after merge: ${Object.keys(scrapedData).length}`);

// 4. Save back to vocab-roots.js
const finalContent = `const vocabRoots = ${JSON.stringify(scrapedData, null, 2)};`;
fs.writeFileSync(scrapedPath, finalContent, 'utf8');
console.log('Saved merged data to vocab-roots.js');
