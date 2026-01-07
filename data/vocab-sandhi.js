// Vocab Sandhi & Manual Overrides
// Use this file for:
// 1. Sandhi Splitting: "compound": ["part1", "part2"]
// 2. Manual Mapping: "irregular_form": "base_word" (to redirect to dictionary entry)
// 3. Custom Definition: "word": "Direct definition text..."

const vocabSandhi = {
    // ตัวอย่างการแยกบทสนธิ (Sandhi Split)
    "ปาโตว": ["ปาโต", "ว"],
    
    // ตัวอย่างการจับคู่คำยาก (Manual Mapping)
    // "โกสมฺพิยํ": "โกสมฺพี",
    "โกสมฺพิยํ": "โกสมฺพี", 
};

if (typeof module !== 'undefined') module.exports = vocabSandhi;