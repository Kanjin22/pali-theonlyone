const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/raw/vocab-roots-dpd.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');
fileContent = fileContent.replace('const vocabRootsDPD = ', '').trim();
if (fileContent.endsWith(';')) fileContent = fileContent.slice(0, -1);

const vocabRootsDPD = JSON.parse(fileContent);

console.log("--- Examples of Sign '*a' (Group 1) ---");
let countA = 0;
for (const key in vocabRootsDPD) {
    const roots = vocabRootsDPD[key];
    roots.forEach(r => {
        if (r.sign === "*a") {
            if (countA < 5) {
                console.log(`Root: ${r.root}, Meaning: ${r.meaning}, Pali: ${r.pali}, Group: ${r.group}`);
            }
            countA++;
        }
    });
}
console.log(`Total '*a': ${countA}`);

console.log("\n--- Examples of Sign '*e' (Group 8) ---");
let countE = 0;
for (const key in vocabRootsDPD) {
    const roots = vocabRootsDPD[key];
    roots.forEach(r => {
        if (r.sign === "*e") {
            console.log(`Root: ${r.root}, Meaning: ${r.meaning}, Pali: ${r.pali}, Group: ${r.group}`);
            countE++;
        }
    });
}
console.log(`Total '*e': ${countE}`);
