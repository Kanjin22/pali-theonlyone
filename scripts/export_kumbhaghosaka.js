
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../data/content-dhamma02.js');
const OUTPUT_PATH = path.join(__dirname, '../temp_kumbhaghosaka.json');

function extractAndSave() {
    console.log(`Reading ${FILE_PATH}...`);
    let content = fs.readFileSync(FILE_PATH, 'utf8');

    // Find the start of the array for Kumbhaghosaka story
    const startMarkerRegex = /"d02_v02_s02_kumbhaghosaka"\s*:\s*\[/;
    const matchStart = content.match(startMarkerRegex);
    
    if (!matchStart) {
        console.error("Could not find start of Kumbhaghosaka story array.");
        process.exit(1);
    }

    const startIdx = matchStart.index + matchStart[0].length;
    let braceCount = 0;
    let endIdx = startIdx;
    
    // Scan to find array end ']'
    let currentIdx = startIdx;
    while (currentIdx < content.length) {
        const char = content[currentIdx];
        if (char === '{') braceCount++;
        else if (char === '}') braceCount--;
        else if (char === ']' && braceCount === 0) {
            endIdx = currentIdx; // Stop exactly at ]
            break;
        }
        currentIdx++;
    }

    // Extract content between [ and ]
    const rawContent = content.substring(startIdx, endIdx);
    
    try {
        const items = new Function(`return [${rawContent}]`)();
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(items, null, 2), 'utf8');
        console.log(`Successfully exported ${items.length} items to ${OUTPUT_PATH}`);
    } catch (e) {
        console.error("Error parsing array content:", e);
        process.exit(1);
    }
}

extractAndSave();
