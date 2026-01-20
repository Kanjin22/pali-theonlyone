const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/content-dhamma02.js');
const content = fs.readFileSync(filePath, 'utf8');

function getStoryItems(storyKey) {
    const regex = new RegExp(`"${storyKey}":\\s*\\[([\\s\\S]*?)\\]\\s*(?:,|$)`);
    const match = content.match(regex);
    if (match) {
        // Use a safer evaluation method or just simple brace wrapping
        // The file structure is known, so we can wrap in brackets
        const arrayString = '[' + match[1] + ']';
        try {
            return new Function(`return ${arrayString}`)().flat();
        } catch (e) {
            console.error(`Error parsing ${storyKey}:`, e.message);
            return [];
        }
    }
    return [];
}

const kumbhaghosaka = getStoryItems('d02_v02_s02_kumbhaghosaka');
if (kumbhaghosaka.length > 86) {
    console.log('Kumbha 86 Pali:', kumbhaghosaka[86].pali.slice(0, 50));
} else {
    console.log('Kumbha 86 not found');
}

const samavati = getStoryItems('d02_v02_s01_samavati');
console.log('Samavati Count:', samavati.length);

const culapanthaka = getStoryItems('d02_v02_s03_culapanthaka');
console.log('Culapanthaka Count:', culapanthaka.length);
if (culapanthaka.length > 105) {
    console.log('Cula 104 Pali end:', culapanthaka[104].pali.slice(-20));
    console.log('Cula 105 Pali start:', culapanthaka[105].pali.slice(0, 20));
}
if (culapanthaka.length > 137) {
    console.log('Cula 136 Pali end:', culapanthaka[136].pali.slice(-20));
    console.log('Cula 137 Pali start:', culapanthaka[137].pali.slice(0, 20));
}
