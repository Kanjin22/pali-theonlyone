const fs = require('fs');
const vm = require('vm');

// Load the dictionary
const filePath = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js';
let fileContent = fs.readFileSync(filePath, 'utf8');

// Quick hack to load the object
fileContent = fileContent.replace('const vocabInsanPr9', 'vocabInsanPr9');
const sandbox = { vocabInsanPr9: {} };
vm.createContext(sandbox);
vm.runInContext(fileContent, sandbox);
const dictionary = sandbox.vocabInsanPr9;

// Counters
const counts = {
    '1': 0, '2': 0, '3': 0, '4': 0, 
    '5': 0, '6': 0, '7': 0, '8': 0,
    'unknown': 0
};

let totalRefs = 0;

// Regex to find "ภาค X" or "ธ. X" or "เล่ม X"
// Matches: ภาค ๑, ภาค 1, ธ. ๑, ธ. 1, เล่ม ๑
const partRegex = /(?:ภาค|ธ\.|เล่ม)[\s\.]*([1-8๑-๘])(?!\d)/g;

Object.values(dictionary).forEach(def => {
    // Normalize Thai numerals to Arabic for easier matching
    const normalized = def.replace(/[๑-๘]/g, m => '๑๒๓๔๕๖๗๘'.indexOf(m) + 1);
    
    let matches = normalized.match(partRegex);
    if (matches) {
        matches.forEach(m => {
            const num = m.match(/[1-8]/)[0];
            if (counts[num] !== undefined) {
                counts[num]++;
                totalRefs++;
            }
        });
    }
});

console.log('=== Reference Distribution in vocab-insan-pr9.js ===');
console.log(`Total explicit part references found: ${totalRefs}`);
console.log('---------------------------------------------------');
for (let i = 1; i <= 8; i++) {
    const count = counts[i.toString()];
    const bar = '█'.repeat(Math.ceil(count / 100)); // Visual bar
    console.log(`Part ${i} (ภาค ${i}): ${count.toString().padEnd(5)} references ${bar}`);
}
