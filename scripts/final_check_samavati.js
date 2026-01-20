const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../data/content-dhamma02.js');

function processFile() {
    console.log(`Reading ${FILE_PATH}...`);
    let content = fs.readFileSync(FILE_PATH, 'utf8');

    // Find the start of the array for Samavati story
    const startMarkerRegex = /"d02_v02_s01_samavati"\s*:\s*\[/;
    const matchStart = content.match(startMarkerRegex);
    
    if (!matchStart) {
        console.error("Could not find start of Samavati story array.");
        return;
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
            endIdx = currentIdx;
            break;
        }
        currentIdx++;
    }

    const arrayContent = content.substring(startIdx, endIdx);
    
    let items;
    try {
        items = new Function(`return [${arrayContent}]`)();
    } catch (e) {
        console.error("Error parsing array content:", e);
        return;
    }
    
    console.log(`Loaded ${items.length} items.`);
    
    let splitCount = 0;
    const reportPath = path.join(__dirname, '../samavati_final_report.txt');
    let reportContent = "";

    const validEndingRegex = /([ฯ.])(\s*\(.*\))?$/;

    items.forEach((item, index) => {
        if (!item.pali) return;
        // if (item.gatha) return; // Optional: include gatha check? Gatha usually ends in ฯ too.

        const pali = item.pali.trim();
        
        // Check for splits
        if (!validEndingRegex.test(pali)) {
            splitCount++;
            reportContent += `[Index ${index}] [SPLIT]\n`;
            reportContent += `  Pali: "${pali}"\n`;
            reportContent += `----------------------------------------\n`;
        }
    });

    fs.writeFileSync(reportPath, reportContent, 'utf8');
    console.log(`Check complete. Found ${splitCount} potential splits.`);
    console.log(`Report written to ${reportPath}`);
}

processFile();
