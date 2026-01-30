const fs = require('fs');
const path = require('path');

// Mappings
const groupMap = {
    "ภู (อ)": "bhūvādigaṇa",
    "รุธ (นิ)": "rudhādigaṇa",
    "ทิว (ย)": "divādigaṇa",
    "สุ (ณุ ณา อุณา)": "svādigaṇa",
    "กี (นา)": "kiyādigaṇa",
    "คห (ณฺหา)": "gahādigaṇa",
    "ตน (โอ)": "tanādigaṇa",
    "จุร (เณ ณย)": "curādigaṇa"
};

// Transliteration helper (Simple Thai Pali -> Roman Pali)
// This is a simplified version. For full accuracy, a library is needed, but we can do basic mapping.
// Actually, maybe we don't need perfect Romanization for now if it's for offline fallback mainly displayed in Thai?
// But let's try a basic map.
function thaiToRoman(text) {
    if (!text) return "";
    let res = text;
    // Vowels
    res = res.replace(/อา/g, 'ā').replace(/อ/g, 'a')
             .replace(/อี/g, 'ī').replace(/อิ/g, 'i')
             .replace(/อู/g, 'ū').replace(/อุ/g, 'u')
             .replace(/เอ/g, 'e').replace(/โอ/g, 'o');
    
    // This is too complex to implement fully correct here without a proper library.
    // For now, we will leave root_roman empty or just copy root_pali if needed.
    // Better to leave it empty or use a placeholder if not critical.
    return ""; 
}

// Read the input file
const inputPath = path.join(__dirname, '../data/raw/backup/vocab-roots-firebase.js');
const outputPath = path.join(__dirname, '../data/dicts/vocab-roots-dpd.js');

try {
    const fileContent = fs.readFileSync(inputPath, 'utf8');
    
    // Extract the object. The file starts with "const vocabRoots = {"
    // We can just eval it in a safe-ish way or use regex to extract the JSON part.
    // Since it's a JS file, let's try to extract the JSON-like object content.
    // But it might contain comments or JS syntax not valid in JSON (like keys without quotes).
    // The previous `cat` showed keys with quotes.
    
    // Let's strip "const vocabRoots = " and trailing ";" and parse as JSON if possible.
    // Or just run it in a VM.
    
    // Quick hack: use eval (since we trust the codebase)
    // We need to assign it to a variable we can access.
    const vocabRoots = eval(fileContent.replace('const vocabRoots =', 'module.exports =') + ';');
    // Wait, eval with module.exports assignment won't return it directly unless we use `require` logic, 
    // but here we are in a script.
    
    // Better: Write a temporary js file that exports it, then require it.
    const tempFile = path.join(__dirname, 'temp_roots.js');
    const tempContent = fileContent.replace('const vocabRoots =', 'module.exports =');
    fs.writeFileSync(tempFile, tempContent);
    
    const rootsData = require(tempFile);
    
    // Transform
    let newRoots = [];
    
    Object.keys(rootsData).forEach(key => {
        const entries = rootsData[key];
        entries.forEach(entry => {
            // Check if example is string or array
            let examples = [];
            if (Array.isArray(entry.example)) {
                examples = entry.example;
            } else if (typeof entry.example === 'string') {
                examples = [entry.example];
            }
            
            // Map Group
            let groupRoman = groupMap[entry.group] || "";
            if (!groupRoman && entry.group) {
                // Try partial match
                for (const [k, v] of Object.entries(groupMap)) {
                    if (entry.group.includes(k.split(' ')[0])) {
                        groupRoman = v;
                        break;
                    }
                }
            }

            newRoots.push({
                "root_pali": entry.root,
                "root_roman": "", // difficult to auto-generate reliably without lib
                "group_pali": entry.group,
                "group_roman": groupRoman,
                "meaning_thai": entry.meaning_thai,
                "meaning_pali": entry.meaning_pali,
                "root_sign_thai": "อ", // Default or extract?
                "udaharana": examples,
                "source": entry.source || "TheDhatu",
                "page": entry.page || "",
                "katha": ""
            });
        });
    });
    
    // Write output
    const outputContent = `export const dpdRoots = ${JSON.stringify(newRoots, null, 2)};`;
    fs.writeFileSync(outputPath, outputContent);
    
    // Cleanup
    fs.unlinkSync(tempFile);
    
    console.log(`Successfully migrated ${newRoots.length} roots to ${outputPath}`);
    
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
