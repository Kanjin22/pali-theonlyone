const fs = require('fs');
const path = require('path');

const files = [
    'content-dhamma01.js',
    'content-dhamma02.js',
    'content-dhamma03.js',
    'content-dhamma04.js',
    'data-pt12-december.js'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Simple syntax check by eval (safe in this controlled env)
        // We wrap in a function or block to avoid variable collision if running in same context,
        // but since we just want to check syntax, we can just eval.
        // However, const redeclaration might be an issue if we eval all in one go.
        // We can just check if it parses.
        try {
            new Function(content); 
            console.log(`PASS: ${file}`);
        } catch (e) {
            console.error(`FAIL: ${file} - Syntax Error: ${e.message}`);
        }
    } catch (e) {
        console.error(`FAIL: ${file} - File Error: ${e.message}`);
    }
});
