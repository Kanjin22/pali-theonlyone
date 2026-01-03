const fs = require('fs');
const vm = require('vm');

// Load the dictionary
const filePath1 = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js';
const filePath2 = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9-5-8.js';

let dictionary = {};

// Load Part 1-4
if (fs.existsSync(filePath1)) {
    let fileContent = fs.readFileSync(filePath1, 'utf8');
    fileContent = fileContent.replace('const vocabInsanPr9', 'var vocabInsanPr9');
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(fileContent, sandbox);
    Object.assign(dictionary, sandbox.vocabInsanPr9);
}

// Load Part 5-8
if (fs.existsSync(filePath2)) {
    let fileContent = fs.readFileSync(filePath2, 'utf8');
    fileContent = fileContent.replace('const vocabInsanPr9Part5to8', 'var vocabInsanPr9Part5to8');
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(fileContent, sandbox);
    Object.assign(dictionary, sandbox.vocabInsanPr9Part5to8);
}

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
