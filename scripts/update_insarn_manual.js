const fs = require('fs');
const vm = require('vm');

const rawText = `
อากาสาทีสุ ว.,ปุ. (ปเทเสสุ) ในประเทศ ท. มีอากาศ 
 เป็นต้น เป็นฉัฏฐีตุลยาธิกรณพหุพพิหิสมาส 
 วิ.ว่า อากาโส อาทิ เยสํ เต อากาสาทโย 
 (ปเทสา) อากาศ เป็นต้น ของประเทศ ท. เหล่าใด 
 ประเทศ ท. เหล่านั้น ชื่อว่ามีอากาศเป็นต้น [คำว่า 
 ปเทส = ประเทศ หมายถึง ส่วนของแผ่นดิน, 
 ส่วนของโลก ปุ.] 
 อากิณฺณ ก. เกลื่อนกล่นแล้ว อา บทหน้า + กิร 
 ธาตุ ในความเรี่ยราย, ความโปรย, ความเกลี่ย, 
 ความเกลื่อนกล่น + ต ปัจจัย แปลง ต เป็น ณฺณ 
 ลบ ร ที่สุดธาตุ ได้รูปเป็น อากิณฺณ ดู อคต 
 อากิณฺณมนุสฺสา ว.,อิต. (เวสาลี) อ. เมืองไพสาลี 
 มีมนุษย์เกลื่อนกล่นแล้ว เป็นสัตตมีตุลยาธิ- 
 กรณพหุพพิหิสมาส วิ.ว่า อากิณฺณา มนุสฺสา 
 ยสฺสํ สา อากิณฺณมนุสฺสา (เวสาลี) 
 อากิณฺณวิหารี ว.,ปุ. ผู้มีอันอยู่เกลื่อนกล่น 
 แล้วเป็นปกติ แจกเหมือน เสฏฺฐี เช่น ต.เอก. 
 อากิณฺณวิหารินา (ปุคฺคเลน) อันบุคคล ผู้มีอัน 
 อยู่เกลื่อนกล่นแล้วเป็นปกติ มาจาก อากิณฺณ + วิ 
 บทหน้า + หร ธาตุ ในความนำไป มี วิ อุปสัค 
 อยู่หน้า แปลว่า อยู่ + ณี ปัจจัย ด้วยอำนาจ ณี 
 ปัจจัย ทีฆะ อ ต้นธาตุเป็น อา, ลบ ณ เหลือไว้ 
 แต่ อี ได้รูปเป็น อากิณฺณวิหารี แปลว่า ผู้มีอัน 
 อยู่เกลื่อนกล่นแล้วโดยปกติ เป็นสมาสรูป 
 ตัสสีลสาธนะ วิ.ว่า อากิณฺณํ วิหริตุํ สีลมสฺสาติ 
 อากิณฺณวิหารี (ปุคฺคโล) การอยู่ เกลื่อนกล่น 
 เป็นปกติ ของบุคคลนั้น เหตุนั้น บุคคลนั้น ชื่อว่า 
 อากิณฺณวิหารีๆ ผู้มีอันอยู่เกลื่อนกล่นแล้วเป็น 
 ปกติ 
 อากิรติ ก. (เช่น ปุคฺคโล อ. บุคคล) ย่อมเกลี่ยลง 
 อา บทหน้า + กิร ธาตุ ในความเรี่ยราย, ความโปรย, 
 ความเกลี่ย, ความเกลื่อนกล่น + อ ปัจจัยใน 
 กัตตุวาจก + ติ วัตตมานาวิภัตติ สำเร็จรูปเป็น 
 อากิรติ 
 อากิรเต ก. (เช่น ปุคฺคโล อ. บุคคล) ย่อมเกลี่ยลง 
 อา + กิร ธาตุ ในความเรี่ยราย, ความโปรย, 
 ความเกลี่ย, ความเกลื่อนกล่น + อ ปัจจัย 
 ในกัตตุวาจก + เต วัตตมานาวิภัตติ สำเร็จรูปเป็น 
 อากิรเต 
 อากิริ ก. (เช่น พฺราหฺมโณ อ. พราหมณ์) เกลี่ยลง 
 แล้ว อา + กิร ธาตุ ในความเรี่ยราย, ความโปรย, 
 ความเกลี่ย, ความเกลื่อนกล่น + อ ปัจจัยใน 
 กัตตุวาจก + อี อัชชัตตนีวิภัตติ รัสสะ อี เป็น อิ 
 สำเร็จรูปเป็น อากิริ 
 อากิริตฺวา ก. โปรยแล้ว, โปรยลงแล้ว, เรี่ยราย 
 แล้ว, เกลี่ยลงแล้ว อา บทหน้า + กิร ธาตุ ใน 
 ความเรี่ยราย, ความโปรย, ความเกลี่ย, ความ 
 เกลื่อนกล่น + ตฺวา ปัจจัย ลง อิ อาคม สำเร็จรูปเป็น 
 อากิริตฺวา 
 อากุล ว. วุ่นวาย, สับสน, อากูล, คั่งค้าง ปุ. แจก 
 เหมือน ปุริส เช่น ป.เอก. อากุโล (กมฺมนฺโต) 
 อ. การงาน อันอากูล อิต. ลง อา เครื่องหมาย อิต. 
 แจกเหมือน กญฺญา เช่น ป.เอก. อากุลา (สุชาตา) 
 อ. นางสุชาดา ผู้วุ่นวาย นปุ. แจกเหมือน กุล 
 เช่น ป.เอก. อากุลํ (จิตฺตํ) อ. จิต อันสับสน 
 อาโกฏาเปสิ ก. (เช่น หตฺถาจริโย อ. นาย 
 หัตถาจารย์) ยัง...ให้ตีแล้ว อา บทหน้า + กุฏ 
 ธาตุ ในความเคาะ, ความทุบ, ความตี + ณาเป 
 ปัจจัย ในกัตตุวาจก + อี อัชชัตตนีวิภัตติ ด้วย 
 อำนาจ ณาเป ปัจจัย พฤทธิ อุ ต้นธาตุ เป็น โอ 
 ลบ ณ เหลือไว้แต่ อาเป ลง ส อาคม รัสสะ อี เป็น 
 อิ สำเร็จรูปเป็น อาโกฏาเปสิ 
 อาโกเฏตฺวา ก. เคาะแล้ว อา บทหน้า + กุฏ ธาตุ 
 ในความเคาะ, ความทุบ, ความตี + เณ ปัจจัย 
 ในกัตตุวาจก + ตฺวา ปัจจัย ด้วยอำนาจ เณ ปัจจัย 
 พฤทธิ อุ ต้นธาตุ เป็น โอ ลบ ณ เหลือไว้แต่ เอ 
 สำเร็จรูปเป็น อาโกเฏตฺวา 
 อาโกเฏสิ ก. (เช่น เถโร อ. พระเถระ) เคาะแล้ว 
 อา บทหน้า + กุฏ ธาตุ ในความเคาะ, ความทุบ, 
 ความตี + เณ ปัจจัย ในกัตตุวาจก ด้วยอำนาจ เณ 
 ปัจจัย พฤทธิ อุ ต้นธาตุ เป็น โอ ลบ ณ เหลือ 
 ไว้แต่ เอ ลง ส อาคม รัสสะ อี เป็น อิ สำเร็จรูป 
 เป็น อาโกเฏสิ 
 อาคจฺฉํ ก. มาอยู่, เมื่อมา อา + คม ธาตุ ในความ 
 ไป ด้วยอำนาจ อา อุปสัคสังหารธาตุ แปลว่า 
 มา + อ ปัจจัย ในกัตตุวาจก + อนฺต เป็น อาคจฺฉนฺต อ การันต์ ในปุงลิงค์ ลง สิ ปฐมาวิภัตติ ฝ่าย 
 เอกวจนะ แปลง นฺต กับ สิ เป็น อํ สำเร็จรูปเป็น 
 อาคจฺฉํ, ปุคฺคโล อ. บุคคล อาคจฺฉํ เมื่อมา 
 แจกเหมือน ภวนฺต 
 อาคจฺฉติ ก. (เช่น ชรา อ. ชรา) ย่อมมา อา 
 บทหน้า + คม ธาตุ ในความไป มี อา อยู่หน้า 
 แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + ติ วัตตมานา 
 วิภัตติ แปลง คม ธาตุ เป็น คจฺฉ สำเร็จรูปเป็น 
 อาคจฺฉติ 
 อาคจฺฉตุ ก. (เช่น ภิกฺขุสงฺโฆ อ. หมู่แห่งภิกษุ) 
 จงมา, ขอจงมา อา บทหน้า + คม ธาตุ ใน 
 ความไป มี อา อยู่หน้า แปลว่า มา + อ ปัจจัย 
 ในกัตตุวาจก + ตุ ปัญจมีวิภัตติ แปลง คม ธาตุ 
 เป็น คจฺฉ สำเร็จรูปเป็น อาคจฺฉตุ 
 อาคจฺฉถ ๑ ก. (ตุมฺเห อ. ท่าน ท.) ย่อมมา อา 
 บทหน้า + คม ธาตุ ในความไป มี อา อยู่หน้า 
 แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + ถ วัตตมานา- 
 วิภัตติ แปลง คม ธาตุ เป็น คจฺฉ สำเร็จรูปเป็น 
 อาคจฺฉถ 
 อาคจฺฉถ ๒ ก. (ตุมฺเห อ. ท่าน ท.) จงมา อา 
 บทหน้า + คม ธาตุ ในความไป มี อา อยู่หน้า 
 แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + ถ ปัญจมีวิภัตติ 
 แปลง คม ธาตุ เป็น คจฺฉ สำเร็จรูปเป็น อาคจฺฉถ 
 อาคจฺฉนฺต ก. มาอยู่ อา บทหน้า + คม ธาตุ ใน 
 ความไป มี อา อยู่หน้า แปลว่า มา + อ ปัจจัย 
 ในกัตตุวาจก + อนฺต ปัจจัย แปลง คม ธาตุ เป็น 
 คจฺฉ ได้รูปเป็น อาคจฺฉนฺต ดู อกฺกมนฺต 
 อาคจฺฉนฺติ ก. (เช่น ภิกฺขู อ. ภิกษุ ท.) ย่อมมา 
 อา บทหน้า + คม ธาตุ ในความไป มี อา อยู่หน้า 
 แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + อนฺติ 
 วัตตมานาวิภัตติ แปลง คม ธาตุ เป็น คจฺฉ 
 สำเร็จรูปเป็น อาคจฺฉนฺติ 
 อาคจฺฉนฺตุ ก. (เช่น ภิกฺขู อ. ภิกษุ ท.) จงมา อา 
 บทหน้า + คม ธาตุ ในความไป มี อา อยู่หน้า 
 แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + อนฺตุ 
 ปัญจมีวิภัตติ แปลง คม ธาตุ เป็น คจฺฉ 
 สำเร็จรูปเป็น อาคจฺฉนฺตุ 
 อาคจฺฉมาน ก. มาอยู่, เมื่อมา อา บทหน้า + คม 
 ธาตุ ในความไป มี อา อยู่หน้า แปลว่า มา + อ 
 ปัจจัย ในกัตตุวาจก + มาน ปัจจัย แปลง คม ธาตุ 
 เป็น คจฺฉ ได้รูปเป็น อาคจฺฉมาน ดู อนิจฺฉมาน 
 อาคจฺฉสิ ก. (ตฺวํ อ. ท่าน) ย่อมมา อา บทหน้า + 
 คม ธาตุ ในความไป มี อา อยู่หน้า แปลว่า มา 
 + อ ปัจจัย ในกัตตุวาจก + สิ วัตตมานาวิภัตติ 
 แปลง คม ธาตุ เป็น คจฺฉ สำเร็จรูปเป็น อาคจฺฉสิ 
 อาคจฺฉามิ ก. (อหํ อ. เรา) ย่อมมา อา บทหน้า + 
 คม ธาตุ ในความไป มี อา อยู่หน้า แปลว่า มา + 
 อ ปัจจัย ในกัตตุวาจก + มิ วัตตมานาวิภัตติ แปลง 
 คม ธาตุ เป็น คจฺฉ มิ อยู่หลัง ทีฆะ อ ที่สุดธาตุ 
 เป็น อา สำเร็จรูปเป็น อาคจฺฉามิ 
 อาคจฺฉิสฺสสิ ก. (ตฺวํ อ. ท่าน) จักมา อา บทหน้า 
 + คม ธาตุ ในความไป มี อา อยู่หน้า แปลว่า มา 
 + อ ปัจจัย ในกัตตุวาจก + สฺสสิ ภวิสสันติวิภัตติ 
 แปลง คม ธาตุ เป็น คจฺฉ ลง อิ อาคม สำเร็จรูป 
 เป็น อาคจฺฉิสฺสสิ 
 อาคจฺฉึสุ ก. (เช่น ภิกฺขู อ. ภิกษุ ท.) มาแล้ว อา 
 บทหน้า + คม ธาตุ ในความไป มี อา อยู่หน้า 
 แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + อุํ 
 อัชชัตตนีวิภัตติ แปลง คม ธาตุ เป็น คจฺฉ 
 แปลง อุํ เป็น อึสุ สำเร็จรูปเป็น อาคจฺฉึสุ 
 อาคจฺเฉยฺยํ ก. (อหํ อ. เรา) พึงมา อา บทหน้า + 
 คม ธาตุ ในความไป มี อา อยู่หน้า แปลว่า มา + 
 อ ปัจจัย ในกัตตุวาจก + เอยฺยํ สัตตมีวิภัตติ แปลง 
 คม ธาตุ เป็น คจฺฉ สำเร็จรูปเป็น อาคจฺเฉยฺยํ
`;

// Load existing dictionary
const dictPath = 'd:/pali-theonlyone/data/raw/vocab-insarn-pr9.js';
let fileContent = fs.readFileSync(dictPath, 'utf8');

// Safe parsing
const sandbox = {};
// Handle BOTH cases for reading (migration from vocabTananunto -> vocabInsarn)
if (fileContent.includes('const vocabTananunto')) {
    fileContent = fileContent.replace(/const\s+vocabTananunto\s*=\s*/, 'vocabInsarn = ');
} else {
    fileContent = fileContent.replace(/const\s+vocabInsarn\s*=\s*/, 'vocabInsarn = ');
}

vm.createContext(sandbox);
vm.runInContext(fileContent, sandbox);
const vocabInsarn = sandbox.vocabInsarn;

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
if (vocabInsarn['อากาสฏฺเทวตา']) {
    delete vocabInsarn['อากาสฏฺเทวตา'];
    console.log("Removed old key: อากาสฏฺเทวตา");
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
const newContent = `const vocabInsarn = ${JSON.stringify(vocabInsarn, null, 2)};`;
fs.writeFileSync(dictPath, newContent, 'utf8');
console.log('Successfully saved to ' + dictPath);
