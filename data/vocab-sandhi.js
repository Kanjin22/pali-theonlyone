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

    // Manual Additions
    "อุกฺกณฺฐิต": "ก. กระสันขึ้นแล้ว, ระอาแล้ว อุ บท หน้า + กฐ ธาตุ ในความกระสัน, ความระอา + ต ปัจจัย ซ้อน กฺ หน้า กฐ ธาตุ ลงนิคคหิตอาคม ที่พยัญชนะต้นธาตุ (อุกฺกํฐ) แล้วแปลงนิคคหิต เป็น ณฺ เพราะ ฐ อยู่หลัง ลง อิ อาคม ได้รูปเป็น อุกฺกณฺฐิต ดู อคต แจกเหมือน ปุริส",
    "วูปกฏฺฐ": "ก. หลีกออกแล้ว, ปลีกตัวแล้ว, สงัดแล้ว วิ บทหน้า + อุป บทหน้า + กสฺส ธาตุ ในความคร่า + ต ปัจจัย แปลง กสฺส กับ ต เป็น กฏฺฐ แปลง วิ เป็น วู แจกเหมือน ปุริส"
};

if (typeof module !== 'undefined') module.exports = vocabSandhi;
