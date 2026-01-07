
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// --- 1. Define Paradigms (Transformation Rules) ---

// Rule Types:
// 1. "append": Just add string to end. (e.g. ปุริส -> ปุริสสฺส)
// 2. "pre_vowel": Insert vowel (โ, เ) before the final consonant. (e.g. ปุริส -> ปุริโส)
//    - options: { vowel: "โ", append: "" } -> ปุริส -> ปุริ + โ + ส + "" = ปุริโส
//    - options: { vowel: "เ", append: "น" } -> ปุริส -> ปุริ + เ + ส + น = ปุริเสน
// 3. "strip_append": Remove final char (vowel), then append. (e.g. กญฺญา -> กญฺญ + ํ = กญฺญํ)

const Paradigms = {
    // 1. Akara-Pulling (Purisa) - a-stem Masc
    // Base ends in Consonant (implicit 'a').
    "ปุริส": [
        { type: "pre_vowel", vowel: "โ" }, // Nom Sg: o
        { type: "append", suffix: "า" },   // Nom Pl: ā
        { type: "append", suffix: "ํ" },   // Acc Sg: ṃ
        { type: "pre_vowel", vowel: "เ" }, // Acc Pl: e
        { type: "pre_vowel", vowel: "เ", append: "น" }, // Ins Sg: ena
        { type: "pre_vowel", vowel: "เ", append: "ณน" }, // Ins Sg: eṇa (Sandhi)
        { type: "pre_vowel", vowel: "เ", append: "หิ" }, // Ins Pl: ehi
        { type: "pre_vowel", vowel: "เ", append: "ภิ" }, // Ins Pl: ebhi
        { type: "append", suffix: "สฺส" }, // Dat/Gen Sg: assa
        { type: "append", suffix: "านํ" }, // Dat/Gen Pl: ānaṃ
        { type: "append", suffix: "สฺมา" }, // Abl Sg: asmā
        { type: "append", suffix: "มฺหา" }, // Abl Sg: amhā
        { type: "append", suffix: "า" },    // Abl Sg: ā
        { type: "append", suffix: "สฺมึ" }, // Loc Sg: asmiṃ
        { type: "append", suffix: "มฺหิ" }, // Loc Sg: amhi
        { type: "pre_vowel", vowel: "เ", append: "สุ" }, // Loc Pl: esu
        { type: "append", suffix: "" },     // Voc Sg: (base)
        { type: "append", suffix: "า" },    // Voc Pl: ā
    ],

    // 2. Akara-Napumsaka (Kula) - a-stem Neut
    "กุล": [
        { type: "append", suffix: "ํ" },    // Nom/Acc Sg: ṃ
        { type: "append", suffix: "านิ" },  // Nom/Acc Pl: āni
        { type: "pre_vowel", vowel: "เ", append: "น" }, // Ins Sg: ena
        { type: "pre_vowel", vowel: "เ", append: "หิ" }, // Ins Pl: ehi
        { type: "pre_vowel", vowel: "เ", append: "ภิ" }, // Ins Pl: ebhi
        { type: "append", suffix: "สฺส" }, // Dat/Gen Sg: assa
        { type: "append", suffix: "านํ" }, // Dat/Gen Pl: ānaṃ
        { type: "append", suffix: "สฺมา" }, // Abl Sg: asmā
        { type: "append", suffix: "มฺหา" }, // Abl Sg: amhā
        { type: "append", suffix: "า" },    // Abl Sg: ā
        { type: "append", suffix: "สฺมึ" }, // Loc Sg: asmiṃ
        { type: "append", suffix: "มฺหิ" }, // Loc Sg: amhi
        { type: "pre_vowel", vowel: "เ", append: "สุ" }, // Loc Pl: esu
        { type: "append", suffix: "" },     // Voc Sg: (base)
        { type: "append", suffix: "านิ" },  // Voc Pl: āni
    ],

    // 3. Ā-Karanta (Kanya) - ā-stem Fem
    // Base ends in 'า'
    "กญฺญา": [
        { type: "append", suffix: "" },     // Nom Sg: (base)
        { type: "append", suffix: "โย" },   // Nom Pl: āyo
        { type: "append", suffix: "" },     // Nom Pl: ā (same as base)
        { type: "strip_append", suffix: "ํ" }, // Acc Sg: ṃ (remove า -> add ํ)
        { type: "strip_append", suffix: "าย" }, // Ins/Dat/Gen/Abl/Loc Sg: āya (Wait, remove า -> add าย = same as append ย)
        // Actually, Kanya + ya = Kanyaya. 
        // Logic: Kanya -> Kanyāyā (Dat Sg).
        // Let's use 'strip_append' to be safe.
        // Base: กญฺญา -> Strip: กญฺญ.
        { type: "strip_append", suffix: "าย" }, // Ins/Dat/Gen/Abl/Loc Sg
        { type: "strip_append", suffix: "าหิ" }, // Ins/Abl Pl: āhi
        { type: "strip_append", suffix: "าภิ" }, // Ins/Abl Pl: ābhi
        { type: "strip_append", suffix: "านํ" }, // Dat/Gen Pl: ānaṃ
        { type: "strip_append", suffix: "ายํ" }, // Loc Sg: āyaṃ
        { type: "strip_append", suffix: "าสุ" }, // Loc Pl: āsu
        { type: "strip_append", suffix: "เ" },   // Voc Sg: e (Kanye)
        { type: "append", suffix: "โย" },   // Voc Pl: āyo
    ],

    // 4. I-Karanta (Ratti, Muni)
    // Base ends in 'ิ'
    "รตฺติ": [ // Fem
        { type: "append", suffix: "" },     // Nom Sg
        { type: "strip_append", suffix: "โย" }, // Nom Pl: iyo
        { type: "strip_append", suffix: "ี" },  // Nom Pl: ī
        { type: "append", suffix: "ํ" },    // Acc Sg: iṃ
        { type: "strip_append", suffix: "ยา" }, // Ins/Dat/Gen/Abl/Loc Sg: iyā
        { type: "strip_append", suffix: "ีหิ" }, // Ins/Abl Pl: īhi
        { type: "strip_append", suffix: "ีภิ" },
        { type: "strip_append", suffix: "ีนํ" }, // Dat/Gen Pl: īnaṃ
        { type: "strip_append", suffix: "ิยํ" }, // Loc Sg: iyaṃ
        { type: "strip_append", suffix: "ีสุ" }, // Loc Pl: īsu
    ],
    "มุนิ": [ // Masc
        { type: "append", suffix: "" },
        { type: "strip_append", suffix: "โย" },
        { type: "strip_append", suffix: "ี" },
        { type: "append", suffix: "ํ" },
        { type: "append", suffix: "นา" },   // Ins Sg: inā
        { type: "strip_append", suffix: "ีหิ" },
        { type: "strip_append", suffix: "ีภิ" },
        { type: "append", suffix: "สฺส" },  // Dat/Gen Sg: issa
        { type: "append", suffix: "โน" },   // Dat/Gen Sg: ino
        { type: "strip_append", suffix: "ีนํ" },
        { type: "append", suffix: "สฺมา" },
        { type: "append", suffix: "มฺหา" },
        { type: "append", suffix: "สฺมึ" },
        { type: "append", suffix: "มฺหิ" },
        { type: "strip_append", suffix: "ีสุ" },
    ],
    
    // 5. Ī-Karanta (Nari, Setthi)
    // Base ends in 'ี'
    "นารี": [ // Fem
        { type: "append", suffix: "" },
        { type: "strip_append", suffix: "ิโย" }, // iyo
        { type: "append", suffix: "" }, // ī
        { type: "strip_append", suffix: "ึ" }, // iṃ
        { type: "strip_append", suffix: "ิยา" }, // iyā
        { type: "append", suffix: "หิ" }, // īhi
        { type: "append", suffix: "ภิ" },
        { type: "append", suffix: "นํ" }, // īnaṃ
        { type: "strip_append", suffix: "ิยํ" }, // iyaṃ
        { type: "append", suffix: "สุ" }, // īsu
    ],
    "เสฏฺฐี": [ // Masc
        { type: "append", suffix: "" },
        { type: "strip_append", suffix: "ิโน" }, // ino
        { type: "append", suffix: "" }, // ī
        { type: "strip_append", suffix: "ึ" }, // iṃ
        { type: "strip_append", suffix: "ินา" }, // inā
        { type: "append", suffix: "หิ" }, // īhi
        { type: "append", suffix: "ภิ" },
        { type: "strip_append", suffix: "ิสฺส" }, // issa
        { type: "append", suffix: "นํ" }, // īnaṃ
        { type: "strip_append", suffix: "ิสฺมา" },
        { type: "strip_append", suffix: "ิมฺหา" },
        { type: "strip_append", suffix: "ิสฺมึ" },
        { type: "strip_append", suffix: "ิมฺหิ" },
        { type: "append", suffix: "สุ" },
    ],

    // 6. U-Karanta (Garu, Vatthu)
    // Base ends in 'ุ'
    "ครุ": [ // Masc
        { type: "append", suffix: "" },
        { type: "pre_vowel", vowel: "โ", append: "ว" }, // u -> ovo (Garu -> Garavo)? No, Garū, Garavo.
        // Wait, Garu -> Garavo. 
        // Base 'ครุ'. Strip 'ุ' -> 'คร'. Pre 'โ' -> 'โคร'. App 'ว' -> 'โครว'?? No.
        // 'ครุ' -> 'ครโว' (Garavo).
        // Let's use 'strip_append' logic for this complex one if needed.
        // Or 'pre_vowel' logic: 'ครุ' -> 'คร' (strip u) -> 'โคร' (add o) -> 'โครว' (add vo) ?? No.
        // 'Garavo' in Thai is 'ครโว'.
        // Base 'ครุ'. Strip 'ุ' -> 'คร'.
        // But 'คร' has 'ร'. 'โ' goes before 'ร'. -> 'โคร'. + 'ว' -> 'โครว'.
        // Is 'Garavo' = 'ครโว' or 'ครว'? 
        // 'Garu' + 'o' -> 'Garavo'.
        // Thai: ครุ -> ครโว.
        // Logic: Strip 'ุ'. Insert 'โ' before last cons. Append 'ว'.
        { type: "pre_vowel", vowel: "โ", append: "ว", strip: true }, 
        { type: "strip_append", suffix: "ู" }, // ū
        { type: "append", suffix: "ํ" }, // uṃ
        { type: "append", suffix: "นา" }, // unā
        { type: "strip_append", suffix: "ูหิ" },
        { type: "strip_append", suffix: "ูภิ" },
        { type: "append", suffix: "สฺส" }, // ussa
        { type: "append", suffix: "โน" }, // uno
        { type: "strip_append", suffix: "ูนํ" },
        { type: "append", suffix: "สฺมา" },
        { type: "append", suffix: "มฺหา" },
        { type: "append", suffix: "สฺมึ" },
        { type: "append", suffix: "มฺหิ" },
        { type: "strip_append", suffix: "ูสุ" },
    ],
    "วตฺถุ": [ // Neut
        { type: "append", suffix: "ํ" },
        { type: "strip_append", suffix: "ูนิ" },
        { type: "strip_append", suffix: "ู" }, // Added alternative Pl
        { type: "append", suffix: "นา" },
        { type: "strip_append", suffix: "ูหิ" },
        { type: "strip_append", suffix: "ูภิ" },
        { type: "append", suffix: "สฺส" },
        { type: "append", suffix: "โน" },
        { type: "strip_append", suffix: "ูนํ" },
        { type: "append", suffix: "สฺมา" },
        { type: "append", suffix: "มฺหา" },
        { type: "append", suffix: "สฺมึ" },
        { type: "append", suffix: "มฺหิ" },
        { type: "strip_append", suffix: "ูสุ" },
    ],
    
    // 7. Akki (Neut i-stem)
    "อกฺขิ": [
        { type: "append", suffix: "ํ" },    // Nom/Acc Sg: iṃ
        { type: "strip_append", suffix: "ีนิ" }, // Nom/Acc Pl: īni
        { type: "strip_append", suffix: "ี" },   // Nom/Acc Pl: ī
        { type: "append", suffix: "นา" },   // Ins Sg: inā
        { type: "strip_append", suffix: "ีหิ" }, // Ins Pl: īhi
        { type: "strip_append", suffix: "ีภิ" },
        { type: "append", suffix: "สฺส" },  // Dat/Gen Sg: issa
        { type: "append", suffix: "โน" },   // Dat/Gen Sg: ino
        { type: "strip_append", suffix: "ีนํ" }, // Dat/Gen Pl: īnaṃ
        { type: "append", suffix: "สฺมา" }, // Abl Sg: ismā
        { type: "append", suffix: "มฺหา" }, // Abl Sg: imhā
        { type: "append", suffix: "สฺมึ" }, // Loc Sg: ismiṃ
        { type: "append", suffix: "มฺหิ" }, // Loc Sg: imhi
        { type: "strip_append", suffix: "ีสุ" }, // Loc Pl: īsu
    ],

    // 8. Raja (Masc Irregular) - Consonant stem (Rāj)
    "ราช": [
        { type: "append", suffix: "า" },    // Nom Sg: Rājā
        { type: "append", suffix: "าโน" },  // Nom/Acc Pl: Rājāno
        { type: "append", suffix: "ํ" },    // Acc Sg: Rājaṃ
        { type: "pre_vowel", vowel: "เ", append: "น" }, // Ins Sg: Rājena (a-stem)
        { type: "append", suffix: "ินา" },  // Ins Sg: Rājinā (i-stem)
        { type: "pre_vowel", vowel: "ู", append: "หิ" }, // Ins Pl: Rājūhi
        { type: "pre_vowel", vowel: "ู", append: "ภิ" },
        { type: "append", suffix: "ิโน" },  // Gen Sg: Rājino
        { type: "append", suffix: "ญฺโญ" }, // Gen Sg: Rañño (Special)
        { type: "pre_vowel", vowel: "ู", append: "นํ" }, // Gen Pl: Rājūnaṃ
        { type: "append", suffix: "ญฺญํ" }, // Gen Pl: Raññaṃ
        { type: "append", suffix: "ินิ" },  // Loc Sg: Rājini
        { type: "pre_vowel", vowel: "ู", append: "สุ" }, // Loc Pl: Rājūsu
    ],

    // 9. Bhavanta (Masc Irregular) - ant-stem
    "ภวนฺต": [
        { type: "strip_append", suffix: "ํ" }, // Nom Sg: Bhavaṃ (nt -> ṃ)
        { type: "strip_append", suffix: "นฺโต" }, // Nom Pl: Bhavanto
        { type: "strip_append", suffix: "นฺตา" }, // Nom Pl: Bhavantā
        { type: "strip_append", suffix: "นฺตํ" }, // Acc Sg: Bhavantaṃ
        { type: "pre_vowel", vowel: "โ", append: "ต" }, // Voc Sg: Bho (Special) -> Ignore for general template? 
        // Or Bhoto? Let's stick to standard stem.
        { type: "strip_append", suffix: "นฺเต" }, // Acc Pl: Bhavante
        { type: "strip_append", suffix: "ตา" },   // Ins Sg: Bhavatā
        { type: "strip_append", suffix: "นฺเตหิ" }, // Ins Pl: Bhavantehi
        { type: "strip_append", suffix: "โต" },   // Gen Sg: Bhavato
        { type: "strip_append", suffix: "ตํ" },   // Gen Pl: Bhavataṃ
        { type: "strip_append", suffix: "นฺตานํ" }, // Gen Pl: Bhavantānaṃ
    ],

    // 10. Satthu (Masc u-stem agent / ar-stem)
    "สตฺถุ": [
        { type: "append", suffix: "า" },    // Nom Sg: Satthā
        { type: "append", suffix: "าโร" },  // Nom Pl: Satthāro
        { type: "append", suffix: "รํ" },   // Acc Sg: Satthāraṃ
        { type: "append", suffix: "ารา" },  // Ins Sg: Satthārā
        { type: "append", suffix: "ารานํ" }, // Gen Pl: Satthārānaṃ
        { type: "append", suffix: "ุโน" },  // Gen Sg: Satthuno
        { type: "append", suffix: "ุสฺส" }, // Gen Sg: Satthussa
        { type: "append", suffix: "ารี" },  // Loc Sg: Satthārī (Sanskrit)
    ],

    // 11. Pitu (Masc u-stem irregular)
    "ปิตุ": [
        { type: "append", suffix: "า" },    // Nom Sg: Pitā
        { type: "append", suffix: "โร" },   // Nom Pl: Pitaro (Wait, Pitu -> Pitaro? strip u -> Pit -> Pitaro)
        // Let's use strip_append
        { type: "strip_append", suffix: "โร" },
        { type: "strip_append", suffix: "รํ" }, // Acc Sg: Pitaraṃ
        { type: "strip_append", suffix: "รา" }, // Ins Sg: Pitarā
        { type: "strip_append", suffix: "ูหิ" }, // Ins Pl: Pitūhi
        { type: "strip_append", suffix: "ุโน" }, // Gen Sg: Pituno
        { type: "strip_append", suffix: "ูนํ" }, // Gen Pl: Pitūnaṃ
        { type: "strip_append", suffix: "รินํ" }, // Gen Pl: Pitarinaṃ
    ],
    
    // 12. Matu (Fem u-stem irregular)
    "มาตุ": [
        { type: "append", suffix: "า" },    // Nom Sg: Mātā
        { type: "strip_append", suffix: "โร" },   // Nom Pl: Mātaro
        { type: "strip_append", suffix: "รํ" }, // Acc Sg: Mātaraṃ
        { type: "strip_append", suffix: "รา" }, // Ins Sg: Mātarā
        { type: "strip_append", suffix: "ูหิ" }, // Ins Pl: Mātūhi
        { type: "strip_append", suffix: "ุยา" }, // Gen Sg: Mātuya
        { type: "strip_append", suffix: "ูนํ" }, // Gen Pl: Mātūnaṃ
    ],

    // 13. Brahma (Masc an-stem)
    "พฺรหฺม": [
        { type: "append", suffix: "า" },    // Nom Sg: Brahmā
        { type: "append", suffix: "าโน" },  // Nom Pl: Brahmāno
        { type: "append", suffix: "ํ" },    // Acc Sg: Brahmaṃ
        { type: "append", suffix: "ุนา" },  // Ins Sg: Brahmunā
        { type: "append", suffix: "ุโน" },  // Gen Sg: Brahmuno
    ],

    // 14. Mana (Neut as-stem)
    "มน": [
        { type: "pre_vowel", vowel: "โ" }, // Nom Sg: Mano
        { type: "append", suffix: "ํ" },    // Acc Sg: Manaṃ
        { type: "append", suffix: "สา" },   // Ins Sg: Manasā
        { type: "pre_vowel", vowel: "โ", append: "ส" }, // Gen Sg: Manaso
        { type: "pre_vowel", vowel: "โ", append: "สิ" }, // Loc Sg: Manasi
        { type: "append", suffix: "านิ" },  // Pl: Manāni
    ]
};

// Map similar templates
const TemplateMap = {
    "ปุริส": "ปุริส",
    "กุล": "กุล",
    "กญฺญา": "กญฺญา",
    "รตฺติ": "รตฺติ", "รัตติ": "รตฺติ",
    "มุนิ": "มุนิ",
    "นารี": "นารี",
    "เสฏฺฐี": "เสฏฺฐี", "เศรษฐี": "เสฏฺฐี",
    "ครุ": "ครุ",
    "วตฺถุ": "วตฺถุ",
    "อกฺขิ": "อกฺขิ",
    "ราช": "ราช", "ราชา": "ราช",
    "ภวนฺต": "ภวนฺต", "ภควนฺตุ": "ภวนฺต", // Bhagavant behaves like Bhavant
    "สตฺถุ": "สตฺถุ",
    "ปิตุ": "ปิตุ",
    "มาตุ": "มาตุ",
    "พฺรหฺม": "พฺรหฺม",
    "มน": "มน", "ใจ": "มน", // Sometimes defined as 'ใจ' (Mano-gana)
    "วิญฺญู": "วิญฺญู"
};

function generateForms(base, template) {
    const mappedTemplate = TemplateMap[template];
    if (!mappedTemplate || !Paradigms[mappedTemplate]) return [];

    const rules = Paradigms[mappedTemplate];
    const forms = new Set();
    forms.add(base);

    rules.forEach(rule => {
        let term = base;

        // Helper to strip final vowel/mark if needed
        // Usually needed if rule implies replacement or pre_vowel on a consonant base
        // But for 'ปุริส' (Consonant base), strip is not needed unless specified.
        
        let workingBase = base;
        if (rule.strip || rule.type === 'strip_append') {
             // Remove last character (assuming it's a vowel/mark)
             // Or if it's 'ปุริส', removing last char removes the consonant! (Not what we want usually)
             // But for 'ครุ' (Garu), strip 'ุ' -> 'คร'. Correct.
             if (base.length > 0) {
                 // Check if it ends in a vowel mark?
                 // Simple logic: just remove last char.
                 workingBase = base.slice(0, -1);
             }
        }

        if (rule.type === 'append') {
            term = workingBase + rule.suffix;
        } 
        else if (rule.type === 'strip_append') {
            term = workingBase + rule.suffix;
        }
        else if (rule.type === 'pre_vowel') {
            // Insert vowel before final consonant of workingBase
            if (workingBase.length > 0) {
                const lastCon = workingBase.slice(-1);
                const stem = workingBase.slice(0, -1);
                const appendPart = rule.append || "";
                
                term = stem + rule.vowel + lastCon + appendPart;
            }
        }

        forms.add(term);
    });

    return Array.from(forms);
}


// --- 2. Main Processing ---

const inputFiles = [
    { path: 'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js', varName: 'vocabInsanPr9' },
    { path: 'd:/pali-theonlyone/data/raw/vocab-insan-pr9-5-8.js', varName: 'vocabInsanPr9Part5to8' },
    { path: 'd:/pali-theonlyone/data/vocab-sandhi.js', varName: 'vocabSandhi', isModule: true }
];

const outputFile = 'd:/pali-theonlyone/data/vocab-inflected.js';

let masterIndex = {}; // Form -> Base

const context = vm.createContext({
    Object: Object,
    vocabInsanPr9Part5to8_Page1: {}, 
});

function loadFile(filePath) {
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf-8');
}

inputFiles.forEach(fileInfo => {
    console.log(`Processing ${fileInfo.path}...`);
    let content = loadFile(fileInfo.path);
    if (!content) return;

    let dict = {};

    if (fileInfo.isModule) {
        try {
            dict = require(fileInfo.path);
            console.log(`Loaded module ${fileInfo.path}, keys: ${Object.keys(dict).length}`);
        } catch (e) {
            console.error(`Failed to require ${fileInfo.path}:`, e);
        }
    } else {
        try {
            let safeContent = content.replace(new RegExp(`const\\s+${fileInfo.varName}\\s*=`, 'g'), `${fileInfo.varName} =`);
            safeContent = safeContent.replace(new RegExp(`let\\s+${fileInfo.varName}\\s*=`, 'g'), `${fileInfo.varName} =`);
            safeContent = safeContent.replace(/const\s+vocabInsanPr9Part5to8_Page/g, 'vocabInsanPr9Part5to8_Page');

            vm.runInContext(safeContent, context);
            dict = context[fileInfo.varName];
            console.log(`Loaded script ${fileInfo.path}, keys: ${dict ? Object.keys(dict).length : 'undefined'}`);
        } catch (e) {
            console.error(`Error executing ${fileInfo.path}:`, e.message);
        }
    }

    if (!dict) return;

    let matchCount = 0;
    Object.keys(dict).forEach(key => {
        const def = dict[key];
        if (typeof def !== 'string') return;

        const templateMatch = def.match(/แจกเหมือน\s+([\u0E00-\u0E7F]+)/);
        if (templateMatch) {
            const template = templateMatch[1];
            
            // Generate
            const forms = generateForms(key, template);
            
            if (forms.length > 0 && matchCount < 3) {
                 console.log(`Example: ${key} (${template}) -> ${forms.slice(0, 3).join(', ')}`);
            }
            if (forms.length > 0) matchCount++;

            forms.forEach(form => {
                // If collision, maybe keep existing or overwrite? 
                // Let's overwrite as we process files in priority order?
                // Actually, priority: Sandhi (last) > Part 5-8 > Main
                // But we process Main first.
                // If form exists, maybe we shouldn't overwrite if it points to a different word?
                // But synonyms exist.
                // Let's just set it.
                if (!masterIndex[form]) {
                    masterIndex[form] = key; 
                }
            });
        }
    });
    console.log(`Found ${matchCount} templates in ${fileInfo.varName}`);
});

const outputContent = `
// Auto-generated Inflected Index
// Maps InflectedForm -> BaseWord
const vocabInflected = ${JSON.stringify(masterIndex, null, 2)};

if (typeof module !== 'undefined') module.exports = vocabInflected;
`;

fs.writeFileSync(outputFile, outputContent);
console.log(`Generated ${Object.keys(masterIndex).length} inflected forms.`);
