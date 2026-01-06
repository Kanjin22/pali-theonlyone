const fs = require('fs');
const vm = require('vm');

const rawText = `
ปณามคาถา น. คาถาน้อมไหว้, คาถาแสดงความเคารพพระรัตนตรัย เรียกกนง่ายๆ ว่า คาถาไหว้ครู ซึ่งตามปกติ พระอาจารย์ผู้แต่งคัมภีร์ภาษาบาลี เช่น อรรถกถา ฎีกา เป็นต้น ถือเป็นธรรมเนียมที่จะเรียบเรียงไว้เป็นเบื้องต้น ก่อนขึ้นเนื้อความของคัมภีร์นั้นๆ ประกอบด้วยคำสรรเสริญคุณพรพระรัตนตรัย คำบอกความมุ่งหมายในการแต่ง คำอ้างถึงบุคคลที่เกี่ยวข้อง เช่น ผู้อาราธนาให้แต่ง และข้อควรทราบอื่นๆ เป็นอย่างคำนำ หรือคำปรารภ
`;

// Load existing dictionary
const dictPath = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js';
let fileContent = fs.readFileSync(dictPath, 'utf8');

// Safe parsing
const sandbox = {};
fileContent = fileContent.replace(/const\s+vocabInsanPr9\s*=\s*/, 'vocabInsanPr9 = ');

vm.createContext(sandbox);
vm.runInContext(fileContent, sandbox);
const vocabInsanPr9 = sandbox.vocabInsanPr9;

// Parser Logic
const lines = rawText.split('\n');
const entries = {};
let currentKey = null;

// Regex to find Key + POS
// Matches:
// 1. Key (non-dot, non-comma, non-parenthesis)
// 2. POS marker (ก., น., ว., นิ., อ.)
const posRegex = /^([^.,()[\]]+?)\s*(ก\.|น\.|ว\.|นิ\.|อ\.)/;

// Helper to validate key (exclude Thai tone marks and non-Pali vowels)
function isValidKey(key) {
    // Check for Thai tone marks (Mai Ek - Mai Chatwa), Mai Taikhu, Sara Ae, Sara Am, Sara Ai, Sara Aii, Yamok
    const thaiNonPaliChars = /[\u0E48-\u0E4B\u0E47\u0E41\u0E4C\u0E4D\u0E4E\u0E4F\u0E24\u0E26]/; 
    // \u0E48-\u0E4B: Tone marks
    // \u0E47: Mai Taikhu (็)
    // \u0E41: Sara Ae (แ) - Pali uses Sara E (เ)
    // \u0E44: Sara Ai (ไ) - Pali doesn't use
    // \u0E43: Sara Aii (ใ) - Pali doesn't use
    // \u0E46: Yamok (ๆ)
    // Note: Sara Am (ำ) is \u0E33. Niggahita is \u0E4D.
    // Pali uses Niggahita (ํ). Thai uses Sara Am (ำ).
    // Let's check for specific Thai vowels that are definitely not Pali keys.
    if (thaiNonPaliChars.test(key)) return false;
    if (key.includes('แ')) return false;
    if (key.includes('ไ')) return false;
    if (key.includes('ใ')) return false;
    if (key.includes('ๆ')) return false;
    
    // Check for overly long keys (heuristic)
    if (key.length > 50) return false;
    
    return true;
}

lines.forEach(line => {
    let content = line.trim();
    if (!content) return;

    const match = content.match(posRegex);
    if (match) {
        let key = match[1].trim();
        
        if (isValidKey(key)) {
            console.log(`Found Key: ${key}`);
            // Remove key from start of line to get definition
            // We use substring to remove the KEY part only, preserving POS
            // match[0] includes Key + Space + POS. 
            // We want the POS to remain in the definition.
            // But match[1] is Key.
            // We strip match[1] from content.
            
            // Be careful if key appears multiple times?
            // content starts with key.
            let def = content.substring(match[1].length).trim();
            
            currentKey = key;
            entries[currentKey] = def;
        } else {
            // Treated as continuation
            if (currentKey) {
                entries[currentKey] += ' ' + content;
            }
        }
    } else {
        if (currentKey) {
            entries[currentKey] += ' ' + content;
        }
    }
});

console.log(`Parsed ${Object.keys(entries).length} entries.`);

// Merge into existing dictionary
let updateCount = 0;
let newCount = 0;

Object.keys(entries).forEach(key => {
    if (vocabInsarn[key]) {
        if (vocabInsarn[key] !== entries[key]) {
            vocabInsarn[key] = entries[key];
            updateCount++;
        }
    } else {
        vocabInsarn[key] = entries[key];
        newCount++;
    }
});

console.log(`Updated: ${updateCount}, New: ${newCount}`);

// Cleanup false positive from previous run if any
if (vocabInsarn['ป.เอ']) {
    delete vocabInsarn['ป.เอ'];
    console.log("Removed false positive: ป.เอ");
}
// Cleanup old key with special character if exists
if (vocabInsarn['อากาสฏฺฐเทวตา']) {
    delete vocabInsarn['อากาสฏฺฐเทวตา'];
    console.log("Removed old key: อากาสฏฺฐเทวตา");
}
if (vocabInsarn['อากฑฺฒิก.']) {
    delete vocabInsarn['อากฑฺฒิก.'];
    console.log("Removed old key: อากฑฺฒิก.");
}
// Cleanup false positives from previous run
const invalidKeys = [
    'แล้วเป็นปกติ แจกเหมือน เสฏฺฐี เช่น ต.เอ',
    'เหมือน ปุริส เช่น ป.เอ',
    'แจกเหมือน กญฺญา เช่น ป.เอ',
    'เช่น ป.เอ',
    'อาคจฺฉํ, ปุคฺคโล'
];
invalidKeys.forEach(k => {
    if (vocabInsarn[k]) {
        delete vocabInsarn[k];
        console.log("Removed invalid key: " + k);
    }
});

// Write back to file
const newContent = `const vocabInsanPr9 = ${JSON.stringify(vocabInsarn, null, 2)};`;
fs.writeFileSync(dictPath, newContent, 'utf8');
console.log('Successfully saved to ' + dictPath);
