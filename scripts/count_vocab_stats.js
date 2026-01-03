const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadVocab(filePath, varName) {
    if (!fs.existsSync(filePath)) {
        console.log(`[WARN] File not found: ${filePath}`);
        return {};
    }
    let content = fs.readFileSync(filePath, 'utf8');
    // Handle const/var issue and export const
    content = content.replace(new RegExp(`const\\s+${varName}\\s*=`), `var ${varName} =`);
    content = content.replace(new RegExp(`export\\s+const\\s+${varName}\\s*=`), `var ${varName} =`);
    
    const sandbox = {};
    vm.createContext(sandbox);
    try {
        vm.runInContext(content, sandbox);
        return sandbox[varName] || {};
    } catch (e) {
        console.error(`Error loading ${filePath}:`, e.message);
        return {};
    }
}

// Define files to check
const files = [
    { name: 'Insan-PR9 (1-4)', path: '../data/raw/vocab-insan-pr9.js', var: 'vocabInsanPr9' },
    { name: 'Insan-PR9 (5-8)', path: '../data/raw/vocab-insan-pr9-5-8.js', var: 'vocabInsanPr9Part5to8' },
    { name: 'Bhumibalo', path: '../data/raw/vocab-bhumibalo.js', var: 'vocabBhumibalo' },
    { name: 'General', path: '../data/raw/vocab-general.js', var: 'vocabGeneralRaw' },
    { name: 'Jinakalamalini', path: '../data/raw/vocab-jinakalamalini.js', var: 'vocabJinakalamalini' },
    { name: 'SC', path: '../data/vocab-sc.js', var: 'vocabSC' },
    { name: 'PTS', path: '../data/vocab-pts.js', var: 'vocabPTS' },
    { name: 'DPPN', path: '../data/vocab-dppn.js', var: 'vocabDPPN' },
    { name: 'Dhammika', path: '../data/vocab-dhammika.js', var: 'vocabDhammika' }
];

let totalUniqueKeys = new Set();
let stats = [];

console.log('--- Counting Vocabulary ---');

files.forEach(f => {
    const fullPath = path.join(__dirname, f.path);
    const data = loadVocab(fullPath, f.var);
    const count = Object.keys(data).length;
    
    stats.push({ name: f.name, count: count });
    
    Object.keys(data).forEach(k => totalUniqueKeys.add(k));
});

console.log(JSON.stringify({
    details: stats,
    totalUnique: totalUniqueKeys.size
}, null, 2));
