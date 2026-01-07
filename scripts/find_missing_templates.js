const fs = require('fs');
const vm = require('vm');

const inputFiles = [
    { path: 'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js', varName: 'vocabInsanPr9' },
    { path: 'd:/pali-theonlyone/data/raw/vocab-insan-pr9-5-8.js', varName: 'vocabInsanPr9Part5to8' }
];

const TemplateMap = {
    "ปุริส": "ปุริส",
    "กุล": "กุล",
    "กญฺญา": "กญฺญา",
    "รตฺติ": "รตฺติ", "รัตติ": "รตฺติ",
    "มุนิ": "มุนิ",
    "นารี": "นารี",
    "เสฏฺฐี": "เสฏฺฐี", "เศรษฐี": "เสฏฺฐี",
    "ครุ": "ครุ",
    "วตฺถุ": "วตฺถุ"
};

const context = vm.createContext({
    Object: Object,
    vocabInsanPr9Part5to8_Page1: {}, 
});

const counts = {};

inputFiles.forEach(fileInfo => {
    let content = fs.readFileSync(fileInfo.path, 'utf-8');
    let safeContent = content.replace(new RegExp(`const\\s+${fileInfo.varName}\\s*=`, 'g'), `${fileInfo.varName} =`);
    safeContent = safeContent.replace(new RegExp(`let\\s+${fileInfo.varName}\\s*=`, 'g'), `${fileInfo.varName} =`);
    safeContent = safeContent.replace(/const\s+vocabInsanPr9Part5to8_Page/g, 'vocabInsanPr9Part5to8_Page');

    try {
        vm.runInContext(safeContent, context);
        const dict = context[fileInfo.varName];
        if (dict) {
            Object.values(dict).forEach(def => {
                if (typeof def !== 'string') return;
                const match = def.match(/แจกเหมือน\s+([\u0E00-\u0E7F]+)/);
                if (match) {
                    const template = match[1];
                    counts[template] = (counts[template] || 0) + 1;
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
});

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

console.log("Top missing templates:");
sorted.forEach(([template, count]) => {
    if (!TemplateMap[template]) {
        console.log(`${template}: ${count}`);
    }
});

console.log("\nTop existing templates (for verification):");
sorted.forEach(([template, count]) => {
    if (TemplateMap[template]) {
        console.log(`${template}: ${count}`);
    }
});
