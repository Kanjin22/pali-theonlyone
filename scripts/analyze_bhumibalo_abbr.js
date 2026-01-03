const fs = require('fs');
const path = require('path');

const vocabPath = path.join(__dirname, '../data/raw/vocab-bhumibalo.js');

try {
    const data = fs.readFileSync(vocabPath, 'utf8');
    const lines = data.split('\n');
    
    // Regex to find patterns like (ก.), (น.), [ก.], [น.] etc. inside the content
    // We want to capture the content inside parentheses or brackets that looks like an abbreviation.
    const abbrRegex = /[(\[][ก-ฮ]\.[^)]*[)\]]/g;
    
    const abbrCounts = {};

    lines.forEach(line => {
        // Simple extraction from the value part
        const match = line.match(/".+?":\s*"(.*)"/);
        if (match) {
            const content = match[1];
            const found = content.match(abbrRegex);
            if (found) {
                found.forEach(abbr => {
                    // Clean up
                    const clean = abbr.replace(/[()[\]]/g, '');
                    abbrCounts[clean] = (abbrCounts[clean] || 0) + 1;
                });
            }
        }
    });

    // Sort by count
    const sorted = Object.entries(abbrCounts).sort((a, b) => b[1] - a[1]);
    
    console.log("Found Abbreviations in vocab-bhumibalo.js:");
    sorted.slice(0, 50).forEach(([abbr, count]) => {
        console.log(`${abbr}: ${count}`);
    });

} catch (err) {
    console.error("Error:", err);
}
