const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Paths
const dataDir = path.join(__dirname, '../data');
const outputDir = path.join(__dirname, '../../pali-dhatu-app/src/data');

// Files to process
const sources = [
    { file: 'vocab-etipitaka.js', name: 'Etipitaka', varName: 'vocabEtipitaka' },
    { file: 'vocab-tananunto.js', name: 'Tananunto', varName: 'vocabTananunto' }
    // NewGen removed as per request
];

// Helper to load JS file content as object
function loadJsData(filePath, varName) {
    try {
        let code = fs.readFileSync(filePath, 'utf8');
        // Replace "const varName" with "varName" to ensure it attaches to sandbox
        code = code.replace(new RegExp(`const\\s+${varName}\\s*=`, 'g'), `${varName} =`);
        code = code.replace(new RegExp(`let\\s+${varName}\\s*=`, 'g'), `${varName} =`);
        code = code.replace(new RegExp(`var\\s+${varName}\\s*=`, 'g'), `${varName} =`);
        
        const sandbox = {};
        vm.createContext(sandbox);
        vm.runInContext(code, sandbox);
        return sandbox[varName];
    } catch (e) {
        console.error(`Error loading ${filePath}:`, e);
        return {};
    }
}

// Main logic
const mergedVocab = {};

sources.forEach(source => {
    console.log(`Loading ${source.name}...`);
    const data = loadJsData(path.join(dataDir, source.file), source.varName);
    const keys = Object.keys(data);
    console.log(`Loaded ${keys.length} entries from ${source.name}`);

    keys.forEach(key => {
        const cleanKey = key.trim(); // Normalize key if needed
        if (!mergedVocab[cleanKey]) {
            mergedVocab[cleanKey] = [];
        }

        let content = "";
        
        // Handle simple string value
        content = data[key];

        if (content) {
             // Add source label and content
            mergedVocab[cleanKey].push(`[${source.name}]\n${content}`);
        }
    });
});

// Convert to final object mapping: Key -> Combined String
const finalOutput = {};
let count = 0;
Object.keys(mergedVocab).forEach(key => {
    finalOutput[key] = mergedVocab[key].join('\n\n-------------------\n\n');
    count++;
});

console.log(`Total unique words: ${count}`);

// Write to file
const outputContent = `const vocabDerivedMeanings = ${JSON.stringify(finalOutput, null, 2)};\n\nexport default vocabDerivedMeanings;`;

fs.writeFileSync(path.join(outputDir, 'vocab-derived-meanings.js'), outputContent, 'utf8');
console.log('Successfully wrote vocab-derived-meanings.js');
