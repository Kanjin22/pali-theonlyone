const fs = require('fs');
const path = require('path');

const files = [
    'data/raw/vocab-jinakalamalini.js',
    'data/raw/vocab-tananunto.js'
];

files.forEach(relativePath => {
    const filePath = path.join(__dirname, '..', relativePath);
    console.log(`\n--- Analyzing ${relativePath} ---`);
    
    if (!fs.existsSync(filePath)) {
        console.log("File not found");
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // Simple regex to catch abbreviations (Thai chars followed by dot)
    // Examples: อ., ส., ป.ธ.
    const regex = /[\u0E00-\u0E7F]+\.(?:[\u0E00-\u0E7F]+\.)*/g;
    
    const matches = content.match(regex) || [];
    const counts = {};
    
    matches.forEach(m => {
        counts[m] = (counts[m] || 0) + 1;
    });
    
    // Sort by frequency
    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50); // Top 50
        
    console.log("Top 50 Abbreviations:");
    sorted.forEach(([abbr, count]) => {
        console.log(`${abbr}: ${count}`);
    });
});
