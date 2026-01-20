const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/content-dhamma02.js');
const content = fs.readFileSync(filePath, 'utf8');

function getStoryItems(storyKey) {
    const regex = new RegExp(`"${storyKey}":\\s*\\[([\\s\\S]*?)\\]\\s*(?:,|$)`);
    const match = content.match(regex);
    if (match) {
        const arrayString = '[' + match[1] + ']';
        try {
            return new Function(`return ${arrayString}`)().flat();
        } catch (e) {
            return [];
        }
    }
    return [];
}

const cula = getStoryItems('d02_v02_s03_culapanthaka');
if (cula.length > 138) {
    console.log('[136] Pali:', cula[136].pali);
    console.log('[137] Pali:', cula[137].pali);
    console.log('[138] Pali:', cula[138].pali);
}
