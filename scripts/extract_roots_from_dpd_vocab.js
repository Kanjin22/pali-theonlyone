const fs = require('fs');
const path = require('path');

const dpdPath = path.resolve('D:/pali-theonlyone/data/vocab-dpd.js');
const outputPath = path.resolve('D:/pali-theonlyone/data/vocab-roots-dpd-derived.js');

console.log('Reading vocab-dpd.js...');
let content = fs.readFileSync(dpdPath, 'utf8');

// Strip "const vocabDPD = " and ";"
content = content.replace('const vocabDPD =', '').trim();
if (content.endsWith(';')) content = content.slice(0, -1);

let dpd;
try {
    dpd = JSON.parse(content);
} catch (e) {
    console.error("Failed to parse JSON:", e);
    process.exit(1);
}

console.log(`Loaded ${Object.keys(dpd).length} words from DPD.`);

const rootMap = {};

// Regex to find root: √root
// Examples: [na > a + √kaṅkh + a], [√bhan + a], [√dis + a + tti > tti]
const rootRegex = /√([a-zāīūḍḷñṅṇṭṭhṃ]+)/i;

Object.keys(dpd).forEach(word => {
    const def = dpd[word];
    const match = def.match(rootRegex);
    
    if (match && match[1]) {
        const root = match[1].toLowerCase();
        
        if (!rootMap[root]) {
            rootMap[root] = [];
        }
        
        // Add word to the list
        // We might want to store brief def? No, just word is enough for now, or word + brief meaning.
        // Let's store word only to save space, or maybe {w: word, m: meaning} if we want to show preview.
        // The full definition is in vocabDPD, which is loaded in the app.
        // So just storing the word is efficient.
        rootMap[root].push(word);
    }
});

console.log(`Extracted ${Object.keys(rootMap).length} unique roots.`);

// Sort roots
const sortedRoots = Object.keys(rootMap).sort().reduce((acc, key) => {
    acc[key] = rootMap[key];
    return acc;
}, {});

const fileContent = `const vocabRootsDPDDerived = ${JSON.stringify(sortedRoots, null, 2)};`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Saved derived roots to ${outputPath}`);
