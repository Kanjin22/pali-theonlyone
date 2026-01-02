const fs = require('fs');
const vm = require('vm');

const filePath = 'd:/pali-theonlyone/data/raw/vocab-jinakalamalini.js';
let fileContent = fs.readFileSync(filePath, 'utf8');
fileContent = fileContent.replace('const vocabJinakalamalini', 'vocabJinakalamalini');

const sandbox = { vocabJinakalamalini: {} };
vm.createContext(sandbox);
vm.runInContext(fileContent, sandbox);
const dictionary = sandbox.vocabJinakalamalini;

const values = Object.values(dictionary);
const abbrSet = new Set();

// Regex to find abbreviations: Thai chars followed by dot
// e.g. "ชิน." in "(ชิน. ๙๖๔/๓๑๘)"
const regex = /([\u0E00-\u0E7F]+\.)/g;

values.forEach(val => {
    let match;
    while ((match = regex.exec(val)) !== null) {
        abbrSet.add(match[1]);
    }
});

console.log(`Found ${abbrSet.size} unique abbreviations:`);
const sortedAbbrs = Array.from(abbrSet).sort();
console.log(sortedAbbrs.join(', '));

// Count frequency
const freq = {};
values.forEach(val => {
    let match;
    while ((match = regex.exec(val)) !== null) {
        const abbr = match[1];
        freq[abbr] = (freq[abbr] || 0) + 1;
    }
});

console.log('\nTop 20 frequencies:');
Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([abbr, count]) => console.log(`${abbr}: ${count}`));
