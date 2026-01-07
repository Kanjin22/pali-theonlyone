
const PaliDeclension = require('./data/pali-declension.js');
const PaliScript = require('./data/pali-script.js');

const tests = [
    { input: "อุกฺกณฺฐิโต", expectedBase: "อุกฺกณฺฐิต", expectedRomanBase: "ukkaṇṭhita" },
    { input: "วูปกฏฺโฐ", expectedBase: "วูปกฏฺฐ", expectedRomanBase: "vūpakaṭṭha" }
];

tests.forEach(test => {
    console.log(`\nTesting: ${test.input}`);
    const roman = PaliScript.thaiToRoman(test.input);
    console.log(`Roman: ${roman}`);
    
    const candidates = PaliDeclension.decompose(roman);
    console.log(`Candidates: ${JSON.stringify(candidates)}`);
    
    if (candidates.includes(test.expectedRomanBase)) {
        console.log(`SUCCESS: Found '${test.expectedRomanBase}' in candidates.`);
    } else {
        console.log(`FAILURE: '${test.expectedRomanBase}' NOT found.`);
    }
});
