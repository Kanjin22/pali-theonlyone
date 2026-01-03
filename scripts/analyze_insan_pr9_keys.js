const fs = require('fs');
const vm = require('vm');
const path = require('path');

const filePath = path.join(__dirname, '../data/raw/vocab-insan-pr9.js');

try {
    const code = fs.readFileSync(filePath, 'utf8');
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    
    // The file defines `const vocabInsarn = ...`
    // But `const` in top-level of vm might not be accessible on sandbox object directly if it's let/const.
    // However, in Node vm, top-level var/const are usually scoped.
    // Let's try to detect it.
    
    // If it's `const vocabInsarn`, it might not be on `sandbox`.
    // We might need to modify the code to assign to sandbox.
    
    // Better approach: Read file, replace `const vocabInsarn =` with `vocabInsarn =`.
    // Or wrap in a function.
    
    // Let's try replacing.
    const modifiedCode = code.replace('const vocabInsanPr9 =', 'sandbox.vocabInsanPr9 =');
    // If replacement didn't work (maybe it's var), try that too.
    const finalCode = modifiedCode.replace('var vocabInsanPr9 =', 'sandbox.vocabInsanPr9 =');
    
    const context = { sandbox: {} };
    vm.createContext(context);
    vm.runInContext(finalCode, context);
    
    const vocab = context.sandbox.vocabInsanPr9;
    
    if (!vocab) {
        throw new Error("Could not find vocabInsanPr9 object");
    }
    
    const keys = Object.keys(vocab);
    console.log(`Total Keys: ${keys.length}`);
    
    const distribution = {};
    keys.forEach(key => {
        const firstChar = key.charAt(0);
        distribution[firstChar] = (distribution[firstChar] || 0) + 1;
    });
    
    console.log("Key Distribution by First Character:");
    const sortedChars = Object.keys(distribution).sort();
    sortedChars.forEach(char => {
        console.log(`${char}: ${distribution[char]} (Code: ${char.charCodeAt(0)})`);
    });
    
} catch (err) {
    console.error("Error:", err);
}
