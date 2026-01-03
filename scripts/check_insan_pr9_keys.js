const fs = require('fs');
const path = require('path');

const filePaths = [
    path.join(__dirname, '../data/raw/vocab-insan-pr9.js'),
    path.join(__dirname, '../data/raw/vocab-insan-pr9-5-8.js')
];

let totalKeys = 0;
let combinedContent = '';

filePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        console.log('Reading file from:', filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        combinedContent += content;
        
        const matches = content.match(/"[^"]+":/g);
        if (matches) totalKeys += matches.length;
    } else {
        console.log('File not found:', filePath);
    }
});

console.log(`Estimated total entries (regex): ${totalKeys}`);

const keysToCheck = ['ธมฺมา', 'ธมฺมปทฏฺฐกถา', 'ปณามคาถา'];
keysToCheck.forEach(k => {
    const regex = new RegExp(`["']${k}["']\\s*:`);
    if (regex.test(combinedContent)) {
        console.log(`Found: ${k}`);
    } else {
        console.log(`Missing: ${k}`);
    }
});
