const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/vocab-roots-dpd.js');
if (!fs.existsSync(dataPath)) {
    console.error(`Data file not found at ${dataPath}`);
    process.exit(1);
}

let fileContent = fs.readFileSync(dataPath, 'utf8');
fileContent = fileContent.replace('const vocabRootsDPD = ', '').trim();
if (fileContent.endsWith(';')) {
    fileContent = fileContent.slice(0, -1);
}

let vocabRootsDPD;
try {
    vocabRootsDPD = JSON.parse(fileContent);
} catch (e) {
    try {
        vocabRootsDPD = eval('(' + fileContent + ')');
    } catch (e2) {
        console.error("Failed to parse data file:", e2);
        process.exit(1);
    }
}

const combinations = new Map();
let count = 0;

for (const key in vocabRootsDPD) {
    if (vocabRootsDPD.hasOwnProperty(key)) {
        const roots = vocabRootsDPD[key];
        if (Array.isArray(roots)) {
            roots.forEach(r => {
                const group = r.group || "?";
                const sign = r.sign || "(no sign)";
                const combo = `Group ${group} + Sign "${sign}"`;
                
                if (!combinations.has(combo)) {
                    combinations.set(combo, 0);
                }
                combinations.set(combo, combinations.get(combo) + 1);
            });
            count += roots.length;
        }
    }
}

console.log(`Total Entries Scanned: ${count}`);
console.log("Unique Combinations Found (Group + Sign):");
const sortedCombos = Array.from(combinations.keys()).sort();
sortedCombos.forEach(k => {
    console.log(`- ${k}: ${combinations.get(k)} entries`);
});
