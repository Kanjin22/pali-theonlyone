const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/content-dhamma02.js');
let content = fs.readFileSync(filePath, 'utf8');

function updateStory(storyKey, processor) {
    const regex = new RegExp(`("${storyKey}":\\s*\\[)([\\s\\S]*?)(\\]\\s*(?:,|$))`);
    const match = content.match(regex);
    if (match) {
        const prefix = match[1];
        const arrayBody = match[2];
        const suffix = match[3];
        
        let items;
        try {
            items = new Function(`return [${arrayBody}]`)().flat();
        } catch (e) {
            console.error(`Error parsing ${storyKey}:`, e.message);
            return;
        }

        const newItems = processor(items);
        
        // Serialize back to JS string
        const newBody = newItems.map(item => {
            return JSON.stringify(item, null, 4)
                .replace(/"(\w+)":/g, '$1:') // Remove quotes from keys
                .replace(/"/g, '"'); // Ensure double quotes for values
        }).join(',\n        ');

        content = content.replace(regex, `${prefix}\n        ${newBody}\n    ${suffix}`);
        console.log(`Updated ${storyKey}`);
    } else {
        console.error(`Story ${storyKey} not found`);
    }
}

// 1. Fix Culapanthaka
updateStory('d02_v02_s03_culapanthaka', (items) => {
    // Merge 137 + 138 (Reverse order to preserve indices)
    // Check content to be sure
    if (items[137] && items[138] && items[137].pali.endsWith('กเถตฺวา')) {
        console.log('Merging Cula 137+138');
        items[137].pali += ' ' + items[138].pali;
        items[137].thai += ' ' + items[138].thai;
        // Merge other fields if necessary
        items.splice(138, 1);
    }

    // Merge 104 + 105
    if (items[104] && items[105] && items[104].pali.trim().endsWith('สนฺนิสินฺนา,')) {
        console.log('Merging Cula 104+105');
        items[104].pali = items[104].pali.trim() + ' ' + items[105].pali;
        items[104].thai = items[104].thai.trim() + ' ' + items[105].thai;
        items.splice(105, 1);
    }

    // Fix punctuations
    items.forEach((item, index) => {
        let p = item.pali.trim();
        // Fix specific known issues
        if (p.endsWith('กเถสฺสนฺติ,')) item.pali = p.replace(/,$/, '.');
        if (p.endsWith('สนฺนิสินฺนา,')) item.pali = p.replace(/,$/, '.'); // In case merge didn't happen or ended with comma
        if (p.endsWith('อโหสึเยว;')) item.pali = p.replace(/;$/, '.');
        
        // General cleanup for this story
        if (item.pali.endsWith(';')) item.pali = item.pali.slice(0, -1) + '.';
    });

    return items;
});

// 2. Fix Mahakassapa
updateStory('d02_v02_s05_mahakassapa', (items) => {
    items.forEach(item => {
        if (item.pali.includes('โธวติ;')) {
            item.pali = item.pali.replace('โธวติ;', 'โธวติ.');
        }
    });
    return items;
});

// 3. Fix Sakka
updateStory('d02_v02_s07_sakka', (items) => {
    items.forEach((item, index) => {
        // Fix typo
        if (item.pali.includes("\\\\'สปฺปุริโส")) {
             item.pali = item.pali.replace("\\\\'สปฺปุริโส", "'สปฺปุริโส");
        }
        
        // Fix endings
        let p = item.pali.trim();
        if (p.endsWith(';') || p.endsWith(',')) {
            // Check if it's a verse line (often ends in ; in some formats, but we want . or ฯ)
            // For now, replacing with . seems safest for consistency with other stories
            item.pali = p.slice(0, -1) + ' ฯ'; // Using ฯ for verses usually
        }
        
        // Specific fixes from check_all_stories log
        if (index === 203 && p.includes('ปติฏฺฐหิ,')) {
            item.pali = item.pali.replace('ปติฏฺฐหิ,', 'ปติฏฺฐหิ.');
        }
    });
    return items;
});

// 4. Verify Kumbhaghosaka 86
updateStory('d02_v02_s02_kumbhaghosaka', (items) => {
    if (items[86] && !items[86].pali.includes('นิสมฺมการิโนติ')) {
        console.log('Restoring Kumbha 86 Pali');
        items[86].pali = "นิสมฺมการิโนติ: “เอวญฺเจ ภวิสฺสติ, เอวํ กริสฺสามีติ วา “อิมสฺมึ กมฺเม เอวํ กเต, อิทนฺนาม ภวิสฺสตีติ วา เอวํ นิทานํ สลฺลกฺเขตฺวา โรคติกิจฺฉนํ วิย สพฺพกมฺมานิ นิสาเมตฺวา อุปธาเรตฺวา กโรนฺตสฺส ฯ";
    }
    return items;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixes applied.');
