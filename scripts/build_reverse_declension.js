const fs = require('fs');
const path = require('path');

// 1. Thai to Roman Utility
const thaiToRoman = function(text) {
    if (!text) return "";
    let s = text;
    s = s.replace(/([เโไใ])((?:[ก-ฮ]ฺ)*[ก-ฮ])/g, "$2$1");
    
    const map = {
        'ก': 'k', 'ข': 'kh', 'ค': 'g', 'ฆ': 'gh', 'ง': 'ṅ',
        'จ': 'c', 'ฉ': 'ch', 'ช': 'j', 'ฌ': 'jh', 'ญ': 'ñ',
        'ฏ': 'ṭ', 'ฐ': 'ṭh', 'ฑ': 'ḍ', 'ฒ': 'ḍh', 'ณ': 'ṇ',
        'ต': 't', 'ถ': 'th', 'ท': 'd', 'ธ': 'dh', 'น': 'n',
        'ป': 'p', 'ผ': 'ph', 'พ': 'b', 'ภ': 'bh', 'ม': 'm',
        'ย': 'y', 'ร': 'r', 'ล': 'l', 'ว': 'v', 'ส': 's', 'ห': 'h', 'ฬ': 'ḷ', 'อ': 'a',
        'ฮ': 'h',
        '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
        '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9'
    };

    const consonants = "กขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลวสหฬอฮ";
    let res = "";
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (consonants.includes(c)) {
            let val = map[c];
            if (val === undefined) {
                // Try to find if it's a known issue
                console.error(`Error: Char '${c}' (code ${c.charCodeAt(0)}) found in consonants string but missing from map.`);
                val = '?';
            }
            
            if (c === 'อ') { res += "a"; } else { res += val + "a"; }
        } else if (c === 'ฺ') { 
            if (res.endsWith('a')) res = res.slice(0, -1);
        } else if (c === 'า' || c === 'ๅ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'ā';
        } else if (c === 'ิ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'i';
        } else if (c === 'ี') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'ī';
        } else if (c === 'ึ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'iṃ';
        } else if (c === 'ุ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'u';
        } else if (c === 'ู') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'ū';
        } else if (c === 'เ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'e';
        } else if (c === 'โ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'o';
        } else if (c === 'ไ' || c === 'ใ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'ai';
        } else if (c === 'ํ') {
            res += 'ṃ';
        } else if (c === 'ะ') {
            if (!res.endsWith('a')) res += 'a'; 
        } else if (c === 'ั') {
            if (!res.endsWith('a')) res += 'a';
        } else if (c === 'ฤ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'ṛ';
        } else if (c === 'ฦ') {
            if (res.endsWith('a')) res = res.slice(0, -1); res += 'ḷ';
        } else {
            if (map[c]) res += map[c]; else res += c;
        }
    }
    return res;
};

// 2. Read Rules
const rulesPath = 'd:\\pali-declension\\js\\declension-rules.js';
if (!fs.existsSync(rulesPath)) {
    console.error("Rules file not found:", rulesPath);
    process.exit(1);
}
let content = fs.readFileSync(rulesPath, 'utf8');

content = content.replace('const declensionRules =', 'global.declensionRules =');
try {
    eval(content);
} catch (e) {
    console.error("Error parsing declension rules:", e);
    process.exit(1);
}

const rules = global.declensionRules;
const reverseMap = {};

// 3. Karanta Mapping
const karantaMap = {
    "a-pungling": "a",
    "i-pungling": "i",
    "ī-pungling": "ī",
    "u-pungling": "u",
    "ū-pungling": "ū",
    "ar-pungling": "u", 
    "o-pungling": "o", 
    "a-itthiling": "ā", 
    "aa-itthiling": "ā", 
    "i-itthiling": "i",
    "ī-itthiling": "ī",
    "u-itthiling": "u",
    "ū-itthiling": "ū",
    "a-napun": "a",
    "i-napun": "i",
    "u-napun": "u"
};

function getBaseChar(key) {
    if (karantaMap[key]) return karantaMap[key];
    if (key.startsWith('a-')) return 'a'; 
    if (key.startsWith('i-')) return 'i';
    if (key.startsWith('u-')) return 'u';
    if (key.startsWith('e-')) return 'e';
    if (key.startsWith('o-')) return 'o';
    return '?';
}

// 4. Build Reverse Map
for (const [key, group] of Object.entries(rules)) {
    const baseChar = getBaseChar(key);
    if (baseChar === '?') {
        // console.warn(`Unknown karanta type: ${key}`);
        continue;
    }

    for (const caseName of Object.keys(group)) {
        const caseObj = group[caseName];
        for (const num of ['เอกวจนะ', 'พหุวจนะ']) {
            if (caseObj[num]) {
                const rule = caseObj[num];
                let suffixes = rule.final_suffix;
                if (!Array.isArray(suffixes)) suffixes = [suffixes];

                suffixes.forEach(suff => {
                    let suffRoman = thaiToRoman(suff);
                    if (suffRoman === "") suffRoman = baseChar;
                    
                    if (!reverseMap[suffRoman]) reverseMap[suffRoman] = [];
                    if (!reverseMap[suffRoman].includes(baseChar)) {
                        reverseMap[suffRoman].push(baseChar);
                    }
                });
            }
        }
    }
}

// 5. Output
const output = `// Auto-generated from d:\\pali-declension\\js\\declension-rules.js
// Maps declined suffix (Roman) to potential base endings (Roman)

var PaliDeclension = {
    // Map: Suffix -> [BaseEnding1, BaseEnding2, ...]
    suffixMap: ${JSON.stringify(reverseMap, null, 4)},

    /**
     * Decomposes a word into potential candidates based on declension rules.
     * @param {string} word - Romanized word.
     * @returns {string[]} - List of candidate base words (Roman).
     */
    decompose: function(word) {
        if (!word) return [];
        const candidates = new Set();
        const map = this.suffixMap;
        
        // Iterate suffixes (length 1 to 10)
        for (let len = 1; len <= 10; len++) {
            if (len > word.length) break;
            const suffix = word.slice(-len);
            if (map[suffix]) {
                const bases = map[suffix];
                const stem = word.slice(0, -len);
                bases.forEach(baseEnd => {
                    candidates.add(stem + baseEnd);
                });
            }
        }
        
        return Array.from(candidates);
    }
};

if (typeof window !== 'undefined') window.PaliDeclension = PaliDeclension;
if (typeof module !== 'undefined') module.exports = PaliDeclension;
`;

fs.writeFileSync('d:\\pali-theonlyone\\data\\pali-declension.js', output);
console.log("Successfully generated d:\\pali-theonlyone\\data\\pali-declension.js");
