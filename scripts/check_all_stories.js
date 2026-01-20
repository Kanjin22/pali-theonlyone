const fs = require('fs');
const filePath = 'data/content-dhamma02.js';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find all keys
    const regex = /"d02_v02_s\d+_[a-zA-Z0-9_]+":\s*\[/g;
    let match;
    const stories = [];
    
    while ((match = regex.exec(content)) !== null) {
        const key = match[0].replace(/":\s*\[/, '').replace(/"/g, '');
        const startIdx = match.index;
        stories.push({ key, startIdx });
    }
    
    console.log(`Found ${stories.length} stories.`);
    
    stories.forEach(story => {
        console.log(`\nChecking ${story.key}...`);
        
        // Extract array
        let braceCount = 0;
        let arrayStart = content.indexOf('[', story.startIdx);
        let endIdx = arrayStart;
        
        for (let i = arrayStart; i < content.length; i++) {
            if (content[i] === '[') braceCount++;
            else if (content[i] === ']') {
                braceCount--;
                if (braceCount === 0) {
                    endIdx = i + 1;
                    break;
                }
            }
        }
        
        const arrayContent = content.substring(arrayStart, endIdx);
        let items;
        try {
            items = new Function(`return ${arrayContent}`)().flat();
        } catch (e) {
            console.error(`Failed to parse ${story.key}: ${e.message}`);
            return;
        }
        
        let splitCandidates = 0;
        let improperEndings = 0;
        
        items.forEach((item, index) => {
            if (!item.pali || item.gatha) return;
            
            const pali = item.pali.trim();
            const thai = (item.thai || "").trim();
            
            // Check terminators
            const lastChar = pali.slice(-1);
            const validTerminators = ['ฯ', '.', '?', '!', '”', '"', ')', ':']; // Added : based on Samavati finding
            // Also allow numbers like (๑)
            const endsWithNumber = /\(\d+\)$/.test(pali) || /\([๐-๙]+\)$/.test(pali);
            
            let validEnd = validTerminators.includes(lastChar) || endsWithNumber;
            if (lastChar === '"' || lastChar === '”') {
                 const secondLast = pali.slice(-2, -1);
                 validEnd = validTerminators.includes(secondLast);
            }
            
            if (!validEnd) {
                // Ignore if it's just a title/intro without punctuation (common?)
                // But usually they have ฯ
                console.log(`  [Index ${index}] Improper ending: ${pali.slice(-20)}`);
                improperEndings++;
            }
            
            // Check for splits
            // Logic: Pali ends with ฯ but Thai doesn't end with ฯ or .
            // This suggests Pali is a full sentence but Thai is continued? Or vice versa.
            // But sometimes Thai translation is just different.
            // Let's look for "short" Pali sentences that might be splits.
            
            if (pali.length < 20 && !pali.includes(' ')) {
                 // Very short, single word?
            }
            
            // Check specific split pattern: Pali has ฯ, Thai has nothing/comma?
            // Actually, best check is if Pali is NOT empty and Thai IS empty?
            if (pali && !thai) {
                console.log(`  [Index ${index}] Missing Thai translation`);
            }
        });
        
        console.log(`  Items: ${items.length}`);
        console.log(`  Improper endings found: ${improperEndings}`);
    });
    
} catch (err) {
    console.error(err);
}
