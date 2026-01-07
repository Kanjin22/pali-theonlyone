
const PaliScript = require('./data/pali-script.js');
const fs = require('fs');

console.log("Testing romanToThai...");
const r = "ukkaṇṭhita";
const t = PaliScript.romanToThai(r);
console.log(`${r} -> ${t}`);
console.log("Generated Char Codes:", t.split('').map(c => c.charCodeAt(0)));

// Read Dictionary Key from file
const content = fs.readFileSync('d:\\pali-theonlyone\\data\\raw\\vocab-insan-pr9-5-8.js', 'utf8');
const match = content.match(/"(อุกฺกณฺฐิต)"/);
if (match) {
    const dictKey = match[1];
    console.log("Dictionary Key:", dictKey);
    console.log("Dict Key Char Codes:", dictKey.split('').map(c => c.charCodeAt(0)));
    
    if (t === dictKey) {
        console.log("MATCH CONFIRMED");
    } else {
        console.log("MISMATCH DETECTED");
    }
} else {
    console.log("Dictionary Key NOT FOUND in file content search");
}
