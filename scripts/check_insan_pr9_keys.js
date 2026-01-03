const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/raw/vocab-insan-pr9.js');
console.log('Reading file from:', filePath);

if (!fs.existsSync(filePath)) {
    console.error('File does not exist!');
    process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const jsonStr = content.replace('const vocabInsanPr9 = ', '');
console.log('File content length:', content.length);
console.log('First 200 chars:', content.substring(0, 200));

const keysToCheck = ['ธมฺมา', 'ธมฺมปทฏฺฐกถา', 'ปณามคาถา'];
const totalEntriesMatch = content.match(/"[^"]+":/g);
const totalKeys = totalEntriesMatch ? totalEntriesMatch.length : 0;

console.log(`Estimated total entries (regex): ${totalKeys}`);

keysToCheck.forEach(k => {
    // Look for "key": or 'key':
    const regex = new RegExp(`["']${k}["']\\s*:`);
    if (regex.test(content)) {
        console.log(`Found: ${k}`);
    } else {
        console.log(`Missing: ${k}`);
    }
});
