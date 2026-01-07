// Verification script for declension logic comparison
// Run with: node verify_declension_logic.js

global.window = {};
const fs = require('fs');
const path = require('path');

// Mock dependencies
function loadScript(filename) {
    let content = fs.readFileSync(path.join(__dirname, 'data', filename), 'utf8');
    content = content.replace('const PaliDeclension', 'global.PaliDeclension');
    content = content.replace('const PaliScript', 'global.PaliScript');
    content = content.replace('const PaliLookup', 'global.PaliLookup');
    content = content.replace('const vocabSandhi', 'global.vocabSandhi');
    content = content.replace(/window\./g, 'global.');
    try { eval(content); } catch (e) { console.error(`Error loading ${filename}:`, e); }
}

console.log("Loading scripts...");
loadScript('pali-script.js');
loadScript('pali-declension.js');
// Mock dbs for PaliLookup context (we just want candidate generation, but need dbs object)
const dbs = { sandhi: {}, insan_pr9: {} }; 
loadScript('pali-lookup.js');

const words = ["อุกฺกณฺฐิโต", "ปุริโส"];

console.log("\n--- Analysis ---");

words.forEach(word => {
    console.log(`\nWord: ${word}`);
    
    // 1. Roman Conversion
    const roman = PaliScript.thaiToRoman(word);
    console.log(`  Roman: ${roman}`);
    
    // 2. PaliDeclension (Roman Path)
    const romanCandidates = PaliDeclension.decompose(roman);
    console.log(`  PaliDeclension Candidates (Roman):`, romanCandidates);
    const thaiFromRoman = romanCandidates.map(r => PaliScript.romanToThai(r));
    console.log(`  -> Converted to Thai:`, thaiFromRoman);
    
    // 3. PaliLookup.generateCandidates (Full Logic Trace)
    // We can't easily trace inside the function without modifying it, 
    // but we can call it and deduce.
    const allCandidates = PaliLookup.generateCandidates(word, dbs);
    console.log(`  All Candidates Generated:`, allCandidates);
    
    // Check intersection
    const hasBase = (base) => allCandidates.includes(base);
    
    if (word === "อุกฺกณฺฐิโต") {
        console.log(`  [Check] Contains 'อุกฺกณฺฐิต' (Base)? ${hasBase('อุกฺกณฺฐิต')}`);
        console.log(`  [Check] Contains 'อุกฺกณฺฐิ' (Bad -to strip)? ${hasBase('อุกฺกณฺฐิ')}`);
    }
    if (word === "ปุริโส") {
        console.log(`  [Check] Contains 'ปุริส' (Base)? ${hasBase('ปุริส')}`);
    }
});
