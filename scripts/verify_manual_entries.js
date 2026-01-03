const fs = require('fs');
const vm = require('vm');

const filePath1 = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js';
const filePath2 = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9-5-8.js';

let fileContent1 = fs.readFileSync(filePath1, 'utf8');
// Remove const declaration to assign to global sandbox variable or just run it
// Actually better to keep it as is and read from the variable name
// But since they are `const`, we can't redeclare in the same context if we are not careful.
// Let's replace `const vocabInsanPr9 =` with `var vocabInsanPr9 =` to be safe or just rely on the object.

// Strategy: Modify content to assignment to property of a container object or just run them.
// File 1: const vocabInsanPr9 = { ... }
// File 2: const vocabInsanPr9Part5to8 = { ... }
// We can just run them in the sandbox.

const sandbox = {};
vm.createContext(sandbox);

try {
    // Replace const with var to ensure it attaches to the sandbox object
    fileContent1 = fileContent1.replace(/const\s+vocabInsanPr9\s*=/, 'var vocabInsanPr9 =');
    vm.runInContext(fileContent1, sandbox);
    
    if (fs.existsSync(filePath2)) {
        let fileContent2 = fs.readFileSync(filePath2, 'utf8');
        fileContent2 = fileContent2.replace(/const\s+vocabInsanPr9Part5to8\s*=/, 'var vocabInsanPr9Part5to8 =');
        vm.runInContext(fileContent2, sandbox);
    }
} catch (e) {
    console.error("Error running scripts in sandbox:", e);
    process.exit(1);
}

// Merge them
const mergedVocab = Object.assign({}, 
    sandbox.vocabInsanPr9 || {}, 
    sandbox.vocabInsanPr9Part5to8 || {}
);

// Check for original keys to ensure no accidental deletion
const originalKeys = ['โลก', 'ธมฺมปทฏฺฐกถา', 'ปณามคาถา', 'มโนปุพฺพงฺคมา', 'ธมฺมา'];
console.log('\n--- Verifying Original Keys ---');
originalKeys.forEach(key => {
    if (mergedVocab[key]) {
        console.log(`[OK] Found original key: ${key}`);
    } else {
        console.log(`[MISSING] Could not find original key: ${key}`);
    }
});

// Check total count
const totalKeys = Object.keys(mergedVocab).length;
console.log(`\nTotal entries in combined dictionary: ${totalKeys}`);
if (totalKeys < 12000) {
    console.warn('WARNING: Total count is lower than expected (should be > 12000)');
} else {
    console.log('Total count looks normal.');
}

