const fs = require('fs');
const vm = require('vm');

// 1. Load the dictionary file safely
// Target: vocab-insan-pr9.js (พจนานุกรมธรรมบทภาค ๑-๘ (Insan-PR9))
const filePath = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js';
let fileContent = fs.readFileSync(filePath, 'utf8');

// Hack to make it run in VM: remove 'const ' to make it a global assignment in sandbox
// Also handle both variable names just in case
fileContent = fileContent.replace(/const\s+vocabInsanPr9\s*=\s*/, 'vocabInsanPr9 = ');
if (fileContent.includes('const vocabTananunto')) {
    fileContent = fileContent.replace(/const\s+vocabTananunto\s*=\s*/, 'vocabInsanPr9 = ');
}

const sandbox = { vocabInsanPr9: {} };
vm.createContext(sandbox);
vm.runInContext(fileContent, sandbox);
const dictionary = sandbox.vocabInsanPr9;

// 2. Define the abbreviations list provided by user (Updated 2026-01-02)
const abbrList = [
    { short: 'ก.', full: 'กิริยา' },
    { short: 'กฺวิ.กัต.กัต.วิ.', full: 'กฺวิปัจจัย กัตตุรูป กัตตุสาธนะวิเคราะห์ว่า' },
    { short: 'จ.', full: 'จตุตถีวิภัตติ' },
    { short: 'จ.พหุ.', full: 'จตุตถีวิภัตติฝ่ายพหุวจนะ' },
    { short: 'จ.เอก.', full: 'จตุตถีวิภัตติฝ่ายเอกวจนะ' },
    { short: 'จตุ.ตัป.วิ.', full: 'จตุตถีตัปปุริสสมาส วิเคราะห์ว่า' },
    { short: 'จตุ.ตุล.วิ.', full: 'จตุตถีตุลยาธิกรณพหุพพิหิสมาส วิเคราะห์ว่า' },
    { short: 'ฉ.', full: 'ฉัฏฐีวิภัตติ' },
    { short: 'ฉ.ตัป. วิ.', full: 'ฉัฏฐีตัปปุริสสมาส วิเคราะห์ว่า' },
    { short: 'ฉ.ตุล.วิ.', full: 'ฉัฏฐีตุลยาธิกรณพหุพพิหิสมาส วิเคราะห์ว่า' },
    { short: 'ฉ.พหุ.', full: 'ฉัฏฐีวิภัตติฝ่ายพหุวจนะ' },
    { short: 'ฉ.ภิน.พหุพ.วิ.', full: 'ฉัฏฐีภินนาธิกรณพหุพพิหิสมาส วิเคราะห์ว่า' },
    { short: 'ฉ.อุป.พหุพ.วิ.', full: 'ฉัฏฐีอุปมาพหุพพิหิสมาส วิเคราะห์ว่า' },
    { short: 'ณ.กัต.กรณ.วิ.', full: 'ณปัจจัย กัตตุรูป กรณสาธนะวิเคราะห์ว่า' },
    { short: 'ณ.กัต.กัต.วิ.', full: 'ณปัจจัย กัตตุรูป กัตตุสาธนะวิเคราะห์ว่า' },
    { short: 'ณ.ตทัส.วิ.', full: 'ณ ปัจจัย ในตทัสสัตถิตัทธิต วิเคราะห์ว่า' },
    { short: 'ณ.ปริมาณ.วิ.', full: 'ณ ปัจจัย ในปริมาณตัทธิต วิเคราะห์ว่า' },
    { short: 'ณ.ราคา.วิ.', full: 'ณ ปัจจัย ในราคาทิตัทธิต วิเคราะห์ว่า' },
    { short: 'ณิก.ตรตฺยา.วิ.', full: 'ณิก ปัจจัย ในตรตฺยาทิตัทธิต วิเคราะห์ว่า' },
    { short: 'ณี.กัต.กัต.วิ.', full: 'ณีปัจจัย กัตตุรูป กัตตุสาธนะวิเคราะห์ว่า' },
    { short: 'ณฺย.ภาว.วิ.', full: 'ณฺย ปัจจัย ในภาวตัทธิต วิเคราะห์ว่า' },
    { short: 'ณฺวุ.กัต.กัต.วิ.', full: 'ณฺวุปัจจัย กัตตุรูป กัตตุสาธนะวิเคราะห์ว่า' },
    { short: 'ต.', full: 'ตติยาวิภัตติ' },
    { short: 'ต.ตัป.วิ.', full: 'ตติยาตัปปุริสสมาส วิเคราะห์ว่า' },
    { short: 'ต.ตุล.วิ.', full: 'ตติยาตุลยาธิกรณพหุพพิหิสมาส วิเคราะห์ว่า' },
    { short: 'ต.พหุ.', full: 'ตติยาวิภัตติฝ่ายพหุวจนะ' },
    { short: 'ต.เอก.', full: 'ตติยาวิภัตติฝ่ายเอกวจนะ' },
    { short: 'ตร.เสฏฐ.วิ.', full: 'ตร ปัจจัย ในเสฏฐตัทธิต วิเคราะห์ว่า' },
    { short: 'ตา.ภาว.วิ.', full: 'ตา ปัจจัย ในภาวตัทธิต วิเคราะห์ว่า' },
    { short: 'ท.', full: 'ทั้งหลาย' },
    { short: 'ทุ.', full: 'ทุติยาวิภัตติ' },
    { short: 'ทุ. เอก.', full: 'ทุติยาวิภัตติฝ่ายเอกวจนะ' },
    { short: 'ทุ.ตัป.วิ.', full: 'ทุติยาตัปปุริสสมาส วิเคราะห์ว่า' },
    { short: 'ทุ.พหุ.', full: 'ทุติยาวิภัตติฝ่ายพหุวจนะ' },
    { short: 'ทุ.เอก.', full: 'ทุติยาวิภัตติฝ่ายเอกวจนะ' },
    { short: 'ธ.', full: 'ธมฺมปทฏฺฐกถา หรือธรรมบทบาลีภาค' },
    { short: 'ธา.วิภาค.วิ.', full: 'ธา ปัจจัย ในวิภาคตัทธิต วิเคราะห์ว่า' },
    { short: 'น.', full: 'นาม' },
    { short: 'น.,นปุ.', full: 'นาม นปุงสกลิงค์' },
    { short: 'น.,ปุ.', full: 'นาม ปุงลิงค์' },
    { short: 'น.,ปุ.,นปุ.', full: 'นาม ปุงลิงค์, นปุงสกลิงค์' },
    { short: 'น.,อิต.', full: 'นาม อิตถีลิงค์' },
    { short: 'นบุพ.กัม.วิ.', full: 'นบุพพบทกัมมธารยสมาส วิเคราะห์ว่า' },
    { short: 'นบุพ.พหุพ.วิ.', full: 'นบุพพบทพหุพพิหิสมาส วิเคราะห์ว่า' },
    { short: 'นปุ.', full: 'นปุงสกลิงค์' },
    { short: 'นปุ.พหุ.', full: 'นปุงสกลิงค์พหุวจนะ' },
    { short: 'นิ.', full: 'นิบาต' },
    { short: 'นิ.อัพ.วิ.', full: 'นิปาตปุพพกะ อัพยยีภาวสมาส วิเคราะห์ว่า' },
    { short: 'ป.', full: 'ปฐมาวิภัตติ' },
    { short: 'ป.พหุ.', full: 'ปฐมาวิภัตติฝ่ายพหุวจนะ' },
    { short: 'ป.เอก.', full: 'ปฐมาวิภัตติฝ่ายเอกวจนะ' },
    { short: 'ปญฺ.', full: 'ปัญจมีวิภัตติ' },
    { short: 'ปญฺ.เอก.', full: 'ปัญจมีวิภัตติฝ่ายเอกวจนะ' },
    { short: 'ปเรก.วิ.', full: 'ปเรกเสสสมาส วิเคราะห์ว่า' },
    { short: 'ปัญจ.ตัป.วิ.', full: 'ปัญจมีตัปปุริสสมาส วิเคราะห์ว่า' },
    { short: 'ปัญจ.ตุล.วิ.', full: 'ปัญจมีตุลยาธิกรณพหุพพิหิสมาส วิเคราะห์ว่า' },
    { short: 'ปุ.', full: 'ปุงลิงค์' },
    { short: 'ปุพเพก.วิ.', full: 'ปุพเพกเสสสมาส วิเคราะห์ว่า' },
    { short: 'พหุ.', full: 'พหุวจนะ' },
    { short: 'ม.', full: 'มัธยมบุรุษ' },
    { short: 'มย.ปกติ.วิ.', full: 'มย ปัจจัย ในปกติตัทธิต วิเคราะห์ว่า' },
    { short: 'ยุ.กัต.กรณ.วิ.', full: 'ยุปัจจัย กัตตุรูป กรณสาธนะวิเคราะห์ว่า' },
    { short: 'ยุ.กัต.อธิ.วิ.', full: 'ยุปัจจัยกัตตุรูปอธิกรณสาธนะวิเคราะห์ว่า' },
    { short: 'ยุ.กัม.อธิ.วิ.', full: 'ยุปัจจัยกัมมรูปอธิกรณสาธนะวิเคราะห์ว่า' },
    { short: 'ร.ตทัส.วิ.', full: 'ร ปัจจัย ในตทัสสัตถิตัทธิต วิเคราะห์ว่า' },
    { short: 'ว.', full: 'วิเสสนะ' },
    { short: 'ว.,นปุ.', full: 'วิเสสนะ นปุงสกลิงค์' },
    { short: 'ว.,ปุ.', full: 'วิเสสนะ ปุงลิงค์' },
    { short: 'ว.,อิต.', full: 'วิเสสนะ อิตถีลิงค์' },
    { short: 'วิ.ว่า', full: 'วิเคราะห์ว่า' },
    { short: 'วิ.,ปุ.', full: 'วิเสสนะ ปุงลิงค์' },
    { short: 'วิ.นุต.กัม.วิ.', full: 'วิเสสนุตตรบท กัมมธารยสมาส วิเคราะห์ว่า' },
    { short: 'วิ.โนปม.กัม.วิ.', full: 'วิเสสโนปมบท กัมมธารยสมาส วิเคราะห์ว่า' },
    { short: 'วิ.โนภย.กัม.วิ.', full: 'วิเสสโนภยบท กัมมธารยสมาส วิเคราะห์ว่า' },
    { short: 'วิ.บุพ.กัม.วิ.', full: 'วิเสสนบุพพบท กัมมธารยสมาส วิเคราะห์ว่า' },
    { short: 'ส.', full: 'สัตตมีวิภัตติ' },
    { short: 'ส.ตัป.วิ.', full: 'สัตตมีตัปปุริสสมาส วิเคราะห์ว่า' },
    { short: 'ส.ทวัน.วิ.', full: 'สมาหารทวันทวสมาส วิเคราะห์ว่า' },
    { short: 'ส.ทิคุ.วิ', full: 'สมาหารทิคุสมาส วิเคราะห์ว่า' },
    { short: 'ส.พหุ.', full: 'สัตตมีวิภัตติฝ่ายพหุวจนะ' },
    { short: 'ส.เอก.', full: 'สัตตมีวิภัตติฝ่ายเอกวจนะ' },
    { short: 'สห.พหุพ.วิ.', full: 'สหบุพพบทพหุพพิหิสมาส วิเคราะห์ว่า' },
    { short: 'สัม.บุพ.กัม.วิ.', full: 'สัมภาวนบุพพบท กัมมธารยสมาส วิเคราะห์ว่า' },
    { short: 'อ.', full: 'อันว่า' },
    { short: 'อ.กัต.กรณ.วิ.', full: 'อ ปัจจัย กัตตุรูป กรณสาธนะวิเคราะห์ว่า' },
    { short: 'อ.กัต.กัต.วิ.', full: 'อ ปัจจัย กัตตุรูป กัตตุสาธนะวิเคราะห์ว่า' },
    { short: 'อ.กัต.กัม.วิ.', full: 'อ ปัจจัย กัตตุรูป กัมมสาธนะวิเคราะห์ว่า' },
    { short: 'อ.ทวัน.วิ.', full: 'อสมาหารทวันทวสมาส วิเคราะห์ว่า' },
    { short: 'อ.ทิคุ.วิ.', full: 'อสมาหารทิคุสมาส วิ.ว่า' },
    { short: 'อว.บุพ.กัม.วิ.', full: 'อวธารณบุพพบท กัมมธารยสมาส วิเคราะห์ว่า' },
    { short: 'อัพ.', full: 'อัพยยศัพท์' },
    { short: 'อา.', full: 'อาลปนะ' },
    { short: 'อิก.ตทัส.วิ.', full: 'อิก ปัจจัย ในตทัสสัตถิตัทธิต วิเคราะห์ว่า' },
    { short: 'อิต.', full: 'อิตถีลิงค์' },
    { short: 'อิม.ชาตา.วิ.', full: 'อิม ปัจจัย ในชาตาทิตัทธิต วิเคราะห์ว่า' },
    { short: 'อิย.ชาตา.วิ.', full: 'อิย ปัจจัย ในชาตาทิตัทธิต วิเคราะห์ว่า' },
    { short: 'อี.ตทัส.วิ.', full: 'อีปัจจัย ในตทัสสัตถิตัทธิต วิเคราะห์ว่า' },
    { short: 'อีย.ฐาน.วิ.', full: 'อีย ปัจจัย ในฐานตัทธิต วิเคราะห์ว่า' },
    { short: 'อุ.', full: 'อุตตมบุรุษ' },
    { short: 'เอก.', full: 'เอกวจนะ' },
    { short: 'เอยฺย.ฐาน.วิ.', full: 'เอยฺย ปัจจัย ในฐานตัทธิต วิเคราะห์ว่า' }
];

// 3. Scan the dictionary
const values = Object.values(dictionary);
const results = {
    found: [],
    missing: []
};

console.log(`Scanning ${values.length} entries in vocab-insan-pr9.js...`);

abbrList.forEach(item => {
    // Check exact match (or contains with word boundaries/spacing)
    // 1. Try exact match
    let isFound = values.some(v => v.includes(item.short));
    
    if (isFound) {
        results.found.push(item);
    } else {
        // 2. Try with spaces after dots (e.g., "จ.เอก." -> "จ. เอก.")
        // Fix: Don't add space if one already exists
        const spaced = item.short.replace(/\.(?!\s|$)/g, '. '); 
        const isFoundSpaced = values.some(v => v.includes(spaced));
        
        // 3. Try without trailing dot
        const noDot = item.short.endsWith('.') ? item.short.slice(0, -1) : item.short;
        const isFoundNoDot = values.some(v => v.includes(noDot));

        // 4. Try spaced without trailing dot
        const spacedNoDot = noDot.replace(/\.(?!$)/g, '. ');
        const isFoundSpacedNoDot = values.some(v => v.includes(spacedNoDot));

        // 5. Try comma with space (e.g., "น.,ปุ." -> "น., ปุ.")
        const commaSpaced = item.short.replace(/,/g, ', ');
        const isFoundCommaSpaced = values.some(v => v.includes(commaSpaced));
        
        // 6. Try compacting (remove spaces inside abbr, if user provided "ทุ. เอก.")
        const compacted = item.short.replace(/ /g, '');
        const isFoundCompacted = values.some(v => v.includes(compacted));

        if (isFoundSpaced) {
            results.found.push({...item, note: 'Found with spaces'});
        } else if (isFoundNoDot) {
            results.found.push({...item, note: 'Found without trailing dot'});
        } else if (isFoundSpacedNoDot) {
            results.found.push({...item, note: 'Found with spaces & no trailing dot'});
        } else if (isFoundCommaSpaced) {
            results.found.push({...item, note: 'Found with comma space'});
        } else if (isFoundCompacted) {
             results.found.push({...item, note: 'Found compacted (no space)'});
        } else {
            results.missing.push(item);
        }
    }
});

// 4. Output results
console.log(`\n=== Found (${results.found.length}) ===`);
// results.found.forEach(r => console.log(`[OK] ${r.short}`));

console.log(`\n=== Missing (${results.missing.length}) ===`);
results.missing.forEach(r => console.log(`[MISSING] ${r.short}`));

// 5. Loose Match Check for Missing
console.log(`\n=== Loose Match Check for Missing ===`);
results.missing.forEach(item => {
    // Remove dots and special chars for loose match
    const loose = item.short.replace(/[.*]/g, '');
    if (loose.length < 2) return; 
    
    const sample = values.find(v => v.includes(loose));
    if (sample) {
        const idx = sample.indexOf(loose);
        const ctx = sample.substring(Math.max(0, idx - 20), Math.min(sample.length, idx + 20));
        console.log(`[LOOSE MATCH] '${item.short}' not found, but '${loose}' found in: "...${ctx}..."`);
    }
});
