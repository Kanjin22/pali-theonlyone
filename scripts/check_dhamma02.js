const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../data/content-dhamma02.js');

function checkFile() {
    if (!fs.existsSync(FILE_PATH)) {
        console.log(`File not found: ${FILE_PATH}`);
        return;
    }

    console.log(`Checking ${FILE_PATH}...`);
    let content = fs.readFileSync(FILE_PATH, 'utf8');

    // Extract object
    const match = content.match(/const\s+(\w+)\s*=\s*(\{[\s\S]*\});\s*$/);
    if (!match) {
        // Try strict match if loose failed
        const strictMatch = content.match(/const\s+(\w+)\s*=\s*(\{[\s\S]*\})/);
         if (!strictMatch) {
            console.log("Could not parse file structure.");
            return;
         }
         // Use strict match
         var data = eval(`(${strictMatch[2]})`);
    } else {
        var data = eval(`(${match[2]})`);
    }

    let splitCount = 0;
    let reportContent = "Report of potential splits in content-dhamma02.js\n\n";

    for (const key in data) {
        if (!Array.isArray(data[key])) continue;
        const items = data[key];

        items.forEach((item, index) => {
            if (!item.pali) return;
            // Exclude gatha as requested
            if (item.gatha) return;

            const pali = item.pali.trim();
            // Check if ends with ฯ or . (User specified these as valid endings)
            if (!pali.endsWith('ฯ') && !pali.endsWith('.')) {
                const msg = `[Group: ${key} | Index ${index}] Ends without ฯ or .: "${pali}"\n`;
                // console.log(msg.trim()); // Reduce console noise
                reportContent += msg;
                splitCount++;
            }
        });
    }

    console.log(`Found ${splitCount} potential splits (excluding items with 'gatha' field and allowing '.' as terminator).`);
    
    // Summary analysis
    const lines = reportContent.split('\n').filter(l => l.trim());
    const endings = {};
    lines.forEach(line => {
        if (!line.includes('Ends without')) return;
        const match = line.match(/"(.*)"$/);
        if (match) {
            const content = match[1];
            const lastChar = content.slice(-1);
            endings[lastChar] = (endings[lastChar] || 0) + 1;
        }
    });
    console.log("Ending characters distribution:", endings);

    fs.writeFileSync('splits_report.txt', reportContent, 'utf8');
    console.log('Report saved to splits_report.txt');
}

checkFile();
