const fs = require('fs');
const vm = require('vm');

const filePath1 = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js';
const filePath2 = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9-5-8.js';

let fileContent1 = fs.readFileSync(filePath1, 'utf8');

// Handle variable replacement to ensure it attaches to sandbox
// Replace `const varName =` with `var varName =` or `this.varName =`
fileContent1 = fileContent1.replace(/const\s+vocabInsanPr9\s*=/, 'var vocabInsanPr9 =');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(fileContent1, sandbox);

if (fs.existsSync(filePath2)) {
    let fileContent2 = fs.readFileSync(filePath2, 'utf8');
    fileContent2 = fileContent2.replace(/const\s+vocabInsanPr9Part5to8\s*=/, 'var vocabInsanPr9Part5to8 =');
    vm.runInContext(fileContent2, sandbox);
}

// Merge
const data = Object.assign({}, 
    sandbox.vocabInsanPr9 || {}, 
    sandbox.vocabInsanPr9Part5to8 || {}
);

const entries = Object.entries(data);

console.log(`Total entries: ${entries.length}`);

const partCounts = {
    '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0
};

// Regex to find references to parts (ภาค) or Dh (ธ.)
// Patterns: ภาค ๑, ภาค 1, ธ. ๑, ธ. 1
const regex = /(?:ภาค|ธ\.|เล่ม)[\s\.]*([1-8๑-๘])(?!\d)/g;

let matchesFound = 0;

for (const [key, value] of entries) {
    let match;
    // Reset lastIndex because we are reusing the regex object (though creating new one in loop is safer if simple)
    // Actually, string.matchAll or regex.exec loop
    
    // Convert Thai numerals to Arabic for counting
    const normalizedValue = value.replace(/[๑-๘]/g, m => '๑๒๓๔๕๖๗๘'.indexOf(m) + 1);
    
    // Search for "ภาค X" or "ธ. X"
    const partMatches = normalizedValue.match(/(?:ภาค|ธ\.|เล่ม)[\s\.]*([1-8])/g);
    
    if (partMatches) {
        partMatches.forEach(m => {
            const num = m.match(/[1-8]/)[0];
            if (partCounts[num] !== undefined) {
                partCounts[num]++;
                matchesFound++;
            }
        });
    }
}

console.log('Reference distribution by Part (1-8):');
Object.keys(partCounts).forEach(k => {
    console.log(`Part ${k}: ${partCounts[k]} references`);
});

if (matchesFound === 0) {
    console.log('No explicit "Part X" references found. Checking for other indicators...');
}
