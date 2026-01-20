const fs = require('fs');

const filePath = 'd:\\pali-theonlyone\\data\\content-dhamma02.js';

try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find the start of the samavati array using indexOf
    const key = '"d02_v02_s01_samavati"';
    const keyIndex = content.indexOf(key);
    
    if (keyIndex === -1) {
        console.error('Could not find d02_v02_s01_samavati using indexOf');
        console.log("First 500 chars:", content.substring(0, 500));
        process.exit(1);
    }
    
    // Find the opening bracket '[' after the key
    const openBracketIndex = content.indexOf('[', keyIndex);
    if (openBracketIndex === -1) {
        console.error('Could not find opening bracket [');
        process.exit(1);
    }

    console.log(`Found start at index ${openBracketIndex}`);

    // Find the end of the array (bracket balancing)
    let openBrackets = 0;
    let endIndex = -1;
    let inString = false;
    let stringChar = '';
    
    for (let i = openBracketIndex; i < content.length; i++) {
        const char = content[i];
        
        if (inString) {
            if (char === stringChar && content[i-1] !== '\\') {
                inString = false;
            }
        } else {
            if (char === '"' || char === "'" || char === '`') {
                inString = true;
                stringChar = char;
            } else if (char === '[') {
                openBrackets++;
            } else if (char === ']') {
                openBrackets--;
                if (openBrackets === 0) {
                    endIndex = i + 1; // Include the closing ]
                    break;
                }
            }
        }
    }

    if (endIndex === -1) {
        console.error('Could not find end of array');
        process.exit(1);
    }

    const arrayString = content.substring(openBracketIndex, endIndex);
    
    // Evaluate the array string to get the object
    let items;
    try {
        items = eval(arrayString);
    } catch (e) {
        console.error('Failed to eval array:', e.message);
        process.exit(1);
    }

    let reportContent = "";
    reportContent += `Checking ${items.length} items in d02_v02_s01_samavati...\n`;
    
    let splitCount = 0;
    
    items.forEach((item, index) => {
        if (!item.pali) return;
        if (item.gatha) return; // Exclude gatha

        const pali = item.pali.trim();
        const thai = (item.thai || "").trim();
        
        // Check for splits
        if (!pali.endsWith('ฯ') && !pali.endsWith('.')) {
            const paliEnd = pali.slice(-1);
            const thaiEnd = thai.slice(-1);
            
            let status = "CHECK MANUALLY";
            if (!thai) {
                status = "MISSING TRANSLATION";
            } else if (thai.endsWith('ฯ') || thai.endsWith('.')) {
                status = "MISMATCH (Pali split, Thai complete?)";
            } else if (paliEnd === ',' && thaiEnd === ',') {
                status = "CONSISTENT (Both comma)";
            }

            splitCount++;
            reportContent += `[Index ${index}] [${status}]\n`;
            reportContent += `  Pali: "${pali}"\n`;
            reportContent += `  Thai: "${thai}"\n`;
            reportContent += `----------------------------------------\n`;
        }
    });

    reportContent += `\nTotal splits found: ${splitCount}\n`;
    
    fs.writeFileSync('samavati_report.txt', reportContent, 'utf-8');
    console.log(`Report written to samavati_report.txt with ${splitCount} splits.`);

} catch (err) {
    console.error('Error:', err);
}
