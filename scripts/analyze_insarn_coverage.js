const fs = require('fs');
const vm = require('vm');

// Read the file content
const filePath = 'd:\\pali-theonlyone\\data\\raw\\vocab-insarn-pr9.js';
let fileContent = fs.readFileSync(filePath, 'utf8');

// Remove 'const' to make it a valid assignment in the sandbox context or just evaluate it
// The file has 'const vocabInsarn = { ... }'
// We can just strip 'const ' and return the object
if (fileContent.includes('const vocabTananunto')) {
    fileContent = fileContent.replace('const vocabTananunto =', 'vocabInsarn =');
} else {
    fileContent = fileContent.replace('const vocabInsarn =', 'vocabInsarn =');
}

const sandbox = { vocabInsarn: {} };
vm.createContext(sandbox);
vm.runInContext(fileContent, sandbox);

const data = sandbox.vocabInsarn;
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
