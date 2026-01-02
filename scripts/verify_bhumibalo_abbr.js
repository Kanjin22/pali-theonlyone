const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = path.join(__dirname, '../data/raw/vocab-bhumibalo.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Prepare context for VM
const sandbox = {};
vm.createContext(sandbox);

// Execute the file content in the sandbox
// Replace 'const vocabBhumibalo =' with 'vocabBhumibalo =' to assign to sandbox global
const scriptContent = fileContent.replace('const vocabBhumibalo =', 'vocabBhumibalo =');

try {
    vm.runInContext(scriptContent, sandbox);
} catch (e) {
    console.error("Error parsing dictionary:", e);
    process.exit(1);
}

const dict = sandbox.vocabBhumibalo;
const values = Object.values(dict);
const totalEntries = values.length;

console.log(`Loaded ${totalEntries} entries from vocab-bhumibalo.js`);

const abbrs = [
    { short: "อ.", full: "อฏฺฐกถา (อรรถกถา)" },
    { short: "อ.ก.", full: "อกรรมกริยา" },
    { short: "อ.กา.", full: "อปาทานการก, ปัญจมีวิภัตติ" },
    { short: "องฺ.", full: "องฺคุตฺตรนิกาย" },
    { short: "องฺ.อ.", full: "องฺคุตฺตรนิกาย อฏฺฐกถา" },
    { short: "อ.ทา.", full: "อปทาน" },
    { short: "อธิ.กา.", full: "อธิกรณการก, สัตตมีวิภัตติ" },
    { short: "อนุ.", full: "อนุวํส" },
    { short: "อภิธา.", full: "อภิธานปฺปทีปิกา" },
    { short: "อภิ.ส.", full: "อภิธมฺมตฺถสงฺคห" },
    { short: "อ.ศา.", full: "อวทานศาตก" },
    { short: "อ.สา.", full: "อฏฺฐสาลินี" },
    { short: "อัช.", full: "อัชชัตตนี" },
    { short: "อัต.", full: "อัตตโนบท" },
    { short: "อัพ.", full: "อัพยยศัพท์" },
    { short: "อิต.", full: "อิตฺถีลิงค์" },
    { short: "อิตฺ.", full: "อิตฺถีลิงค์" },
    { short: "อิติ.", full: "อิติวุตฺตก" },
    { short: "อุ.", full: "อุทาหรณ์" },
    { short: "อุปมา", full: "โดยอรรถ" },
    { short: "อุต.", full: "อุตฺตมบุรุษ" },
    { short: "เอก.", full: "เอกพจน์" },
    { short: "ก.", full: "กริยา" },
    { short: "ก.กา.", full: "กรณการก" },
    { short: "ก.กิ.", full: "กริยากิตก์" },
    { short: "กถา.", full: "กถาวตฺถุ" },
    { short: "กถา.อ.", full: "กถาวตฺถุ อฏฺฐกถา" },
    { short: "กรรต.กา.", full: "กรรตุการก" },
    { short: "กรรม.กา.", full: "กรรมการก" },
    { short: "ก.วิ.", full: "กริยาวิเศษณ์" },
    { short: "ก.อา.", full: "กริยาอาขยาต" },
    { short: "กัจ.", full: "กัจจายนะ" },
    { short: "กจฺ.", full: "กัจจายนะ" },
    { short: "กัต.", full: "กัตตุวาจก" },
    { short: "กัม.", full: "กัมมวาจก" },
    { short: "กัมม.", full: "กัมมธารยสมาส" },
    { short: "กาพย์สัน.", full: "กาพย์สันสกฤต" },
    { short: "กาลา.", full: "กาลาติปัตติ" },
    { short: "ขุ.", full: "ขุททกนิกาย" },
    { short: "ขุ.อ.", full: "ขุททกนิกาย อฏฺฐกถา" },
    { short: "คุณ.", full: "คุณศัพท์" },
    { short: "จ.ปิ.", full: "จริยาปิฎก" },
    { short: "จุลฺ.นิ.", full: "จุลฺลนิทฺเทส" },
    { short: "ชา.", full: "ชาตก" },
    { short: "ชา.มา.", full: "ชาตกมาลา" },
    { short: "ต.", full: "ไตรปิฎก, ตำรา" },
    { short: "ตามตัว.", full: "ตามตัวอักษร" },
    { short: "ติ.ป.", full: "ติกปฏฺฐาน" },
    { short: "เถร.", full: "เถรคาถา" },
    { short: "เถร.อ.", full: "เถรคาถา อฏฺฐกถา" },
    { short: "เถรี.", full: "เถรีคาถา" },
    { short: "เถรี.อ.", full: "เถรีคาถา อฏฺฐกถา" },
    { short: "ทวัน.", full: "ทวันทวสมาส" },
    { short: "ทา.วํ.", full: "ทาฐาวํส" },
    { short: "ทิวฺ.", full: "ทิวฺยาวทาน" },
    { short: "ที.", full: "ทีฆนิกาย" },
    { short: "ที.อ.", full: "ทีฆนิกาย อฏฺฐกถา" },
    { short: "ธ.", full: "ธมฺมปท" },
    { short: "ธ.ป.", full: "ธมฺมปท" },
    { short: "ธ.ส.", full: "ธมฺมสงฺคณี" },
    { short: "ธ.ส.อ.", full: "ธมฺมสงฺคณี อฏฺฐกถา" },
    { short: "ธ.อ.", full: "ธมฺมปท อรรถกถา" },
    { short: "ธา.ป.", full: "ธาตุปาฐ" },
    { short: "ธา.ม.", full: "ธาตุมญฺชุสา" },
    { short: "น.", full: "หน้า" },
    { short: "นปุ.", full: "นปุงสกลิงค์" },
    { short: "นปุํ.", full: "นปุงสกลิงค์" },
    { short: "นาม.", full: "นามศัพท์" },
    { short: "นิยม ก.วิ.", full: "นิยมกริยาวิเศษณ์" },
    { short: "นิรุกติ.", full: "นิรุกติศาสตร์" },
    { short: "นิรุกติ", full: "นิรุกติศาสตร์" },
    { short: "เน.ป.", full: "เนตฺติปกรณ" },
    { short: "บา.", full: "บาลี" },
    { short: "ปกติ.", full: "ปกติสังขยา" },
    { short: "ปฏิ.ส.", full: "ปฏิสมฺภิทามคฺค" },
    { short: "ป.ที.", full: "ปรมตฺถทีปนี" },
    { short: "ประ.", full: "ประถมบุรุษ" },
    { short: "ปรัส.", full: "ปรัสสบท" },
    { short: "ปรา.", full: "ปรากฤต" },
    { short: "ปโรก.", full: "ปโรกฺขา" },
    { short: "ปัญ.", full: "ปัญจมี" },
    { short: "ปญฺจ.ที.", full: "ปญฺจคติทีปนี" },
    { short: "ปญฺ.ที.", full: "ปญฺจคติทีปนี" },
    { short: "ปุ.", full: "ปุคฺคลปญฺญตฺติ" },
    { short: "ปุ.อ.", full: "ปุคฺคลปญฺญตฺติ อฏฺฐกถา" },
    { short: "ปุํ.", full: "ปุงลิงค์" },
    { short: "ปูรณ.", full: "ปูรณสังขยา" },
    { short: "เปต.", full: "เปตวตฺถุ" },
    { short: "เปต.อ.", full: "เปตวตฺถุ อฏฺฐกถา" },
    { short: "พ.", full: "พม่า" },
    { short: "พหุ.", full: "พหูพจน์" },
    { short: "พุ.", full: "พุทฺธวํส" },
    { short: "พุทธสัน.", full: "พุทธสันสกฤต" },
    { short: "ภวิ.", full: "ภวิสฺสนฺติ" },
    { short: "ม.", full: "มชฺฌิมนิกาย" },
    { short: "ม.อ.", full: "มชฺฌิมนิกาย อฏฺฐกถา" },
    { short: "ม.ว.", full: "มหาวสฺตุ" },
    { short: "ม.วย.", full: "มหาวฺยุปตฺติ" },
    { short: "ม.วํ.", full: "มหาวํส" },
    { short: "มหา.นิ.", full: "มหานิทฺเทส" },
    { short: "มหา.วํ.", full: "มหาโพธิวํส" },
    { short: "มัธ.", full: "มัธยมบุรุษ" },
    { short: "มิลิน.", full: "มิลินฺทปญฺหา" },
    { short: "ร.ว.", full: "รตฺตนาวลี" },
    { short: "ล.วิ.", full: "ลลิตวิสตร" },
    { short: "วัต.", full: "วตฺตมานา" },
    { short: "วิ.", full: "วินยปิฎก" },
    { short: "วิภงฺค.", full: "วิภงฺคปกรณ" },
    { short: "วิ.ม.", full: "วิสุทฺธิมคฺค" },
    { short: "วิมาน.", full: "วิมานวตฺถุ" },
    { short: "วิมาน.อ.", full: "วิมานวตฺถุ อฏฺฐกถา" },
    { short: "ศิ.ส.", full: "ศิกฺษาสมุจฺจย" },
    { short: "ส.ก.", full: "สกรรมกริยา" },
    { short: "ส.กา.", full: "สัมพันธการก" },
    { short: "ส.ปา.", full: "สมนฺตปาสาทิกา" },
    { short: "สรรพ.", full: "สรรพนาม" },
    { short: "สัต.", full: "สัตตมี" },
    { short: "สัมป.กา.", full: "สัมปทานการก" },
    { short: "สทฺ.ปา.", full: "สทฺธมฺโมปายน" },
    { short: "สํ.", full: "สํยุตฺตนิกาย" },
    { short: "สํ.อ.", full: "สํยุตฺตนิกาย อฏฺฐกถา" },
    { short: "สี.", full: "สีหล" },
    { short: "สุ.วิ.", full: "สุมงคลวิลาสินี" },
    { short: "สุตฺ.นิ.", full: "สุตฺตนิปาต" },
    { short: "สุตฺ.นิ.อ.", full: "สุตฺตนิปาต อฏฺฐกถา" },
    { short: "หียัต.", full: "หียัตตนี" },
    { short: "หีย.", full: "หียัตตนี" },
    { short: "√", full: "ธาตุ หรือ รากศัพท์" },
    { short: "*Sk", full: "สันสกฤตที่สร้างขึ้น" },
    { short: "°", full: "ส่วนของสมาส" },
    { short: ">", full: "ความเกี่ยวพันด้านนิรุกติศาสตร์" },
    { short: "=", full: "เหมือนกัน" },
    { short: "+", full: "รวมเข้าด้วยกัน" }
];

const results = [];
const missing = [];

console.log("\nVerifying abbreviations...");

abbrs.forEach(item => {
    // Check if any value contains the abbreviation
    // Simple inclusion check
    const sample = values.find(v => v.includes(item.short));
    
    if (sample) {
        results.push(item);
    } else {
        missing.push(item);
    }
});

console.log("\n--- FOUND ---");
results.forEach(r => console.log(`[OK] ${r.short}`));

console.log("\n--- MISSING ---");
if (missing.length === 0) {
    console.log("None. All abbreviations found!");
} else {
    missing.forEach(r => console.log(`[MISSING] ${r.short} (${r.full})`));
}

// Loose check
console.log("\n--- Loose Match Check for Missing ---");
missing.forEach(item => {
    // Try removing dots or stars
    const loose = item.short.replace(/[.*]/g, '');
    if (loose.length < 2) return; 
    
    // Check if loose string exists
    const sample = values.find(v => v.includes(loose));
    if (sample) {
        // Extract context
        const idx = sample.indexOf(loose);
        const ctx = sample.substring(Math.max(0, idx - 10), Math.min(sample.length, idx + 20));
        console.log(`[LOOSE MATCH] '${item.short}' not found, but '${loose}' found in: "...${ctx}..."`);
    } else {
         console.log(`[NO MATCH] '${item.short}' (and loose '${loose}') not found.`);
    }
});
