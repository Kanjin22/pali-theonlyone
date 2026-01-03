const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/raw/vocab-insan-pr9-5-8.js');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Remove "const vocabInsanPr9_5_8 = " and ";"
    // But since it's a JS file, we can just try to evaluate it or use syntax check.
    // Simpler: just require it? No, it might not export.
    // Let's try to construct a function wrapper.
    
    // Check for obvious syntax errors by compiling
    const vm = require('vm');
    const script = new vm.Script(content);
    console.log("Syntax check passed!");
} catch (e) {
    console.error("Syntax Error:", e.message);
    // Print context
    if (e.stack) {
        const match = e.stack.match(/evalmachine\.<anonymous>:(\d+)/);
        if (match) {
            const lineNum = parseInt(match[1]);
            console.log(`Error at line ${lineNum}`);
            // Read specific line
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');
            console.log(`Line ${lineNum}: ${lines[lineNum-1]}`);
        }
    }
}
