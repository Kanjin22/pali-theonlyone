const fs = require('fs');
const filePath = 'd:\\pali-theonlyone\\data\\content-dhamma02.js';

let content = fs.readFileSync(filePath, 'utf-8');
console.log('Original length:', content.length);

// 1. Fix Line 65 (Index 3) - just in case
const pali65_old = 'pali: "ตตฺรายํ อนุปุพฺพีกถา:",';
const pali65_new = 'pali: "ตตฺรายํ อนุปุพฺพีกถา ฯ",';
if (content.includes(pali65_old)) {
    content = content.replace(pali65_old, pali65_new);
    console.log('Fixed Line 65');
} else {
    console.log('Line 65 already fixed or not found');
}

// 2. Merge 525 + 526
// 525 Pali
const pali525 = `pali: "สตฺถา “ธีตรา เต มยฺหํ อตฺโถ อตฺถิ วา นตฺถิ วาติ อวตฺวาว “พฺราหฺมณ เอกนฺเต การณํ กเถมีติ วตฺวา, “กเถหิ สมณาติ วุตฺเต, มหาภินิกฺขมนโต ปฏฺฐาย ยาว อชปาลนิโคฺรธมูลา มาเรน อนุพนฺธภาวํ อชปาลนิโคฺรธมูเล จ “อตีโตทานิ เม เอส วิสยนฺติ ตสฺส โสกาตุรสฺส โสกวูปสมนตฺถํ อาคตาหิ มารธีตาหิ กุมาริกวณฺณาทิวเสน ปโยชิตปโลภนํ อาจิกฺขิตฺวา",`;
// 526 Pali
const pali526 = `pali: "“ทิสฺวาน ตณฺหํ อรติญฺจ ราคํ \\nนาโหสิ ฉนฺโท อปิ เมถุนสฺมึ, \\nกิเมวิทํ มุตฺตกรีสปุณฺณํ \\nปาทาปิมํ สมฺผุสิตุํ น อิจฺเฉติ \\nอิมํ คาถมาห ฯ",`;

if (content.includes(pali526) && content.includes(pali525)) {
    // Construct the merged Pali string
    const mergedPali = pali525.replace('",', ' ') + pali526.replace('pali: "', '');
    // Replace 526's Pali with merged Pali
    content = content.replace(pali526, mergedPali);
    
    // Merge Thai
    const thai525_full = `thai: "อ. พระศาสดา ไม่ตรัสแล้วว่า อ. ความต้องการ ด้วยธิดา ของท่าน มีอยู่ แก่เรา หรือ หรือว่า (อ. ความต้องการ ด้วยธิดา ของท่าน) ย่อมไม่มี (แก่เรา) ดังนี้เทียว ตรัสแล้วว่า ดูก่อนพราหมณ์ (อ. เรา) จะกล่าว ซึ่งเหตุ อย่างหนึ่ง แก่ท่าน ดังนี้, (ครั้นเมื่อคำ) ว่า ดูก่อนสมณะ (อ. ท่าน) จงกล่าว ดังนี้ (อันพราหมณ์) กล่าวแล้ว, ตรัสบอกแล้ว ซึ่งความที่ (แห่งพระองค์) เป็นผู้อันมารติดตามแล้ว จำเดิม แต่การเสด็จออกเพื่อคุณอันยิ่งใหญ่ เพียงไร แต่โคนแห่งต้นอชปาลนิโครธ (ด้วย) ซึ่งการประเล้าประโลม อันอันธิดาแห่งมาร ท. ผู้มาแล้ว เพื่ออันยังความโศก (ของมาร) นั้น ผู้กระสับกระส่ายเพราะความโศกว่า (อ. พระสมณะ ผู้โคดม) นั่น ไปล่วงแล้ว ซึ่งวิสัย ของเรา ในกาลนี้ ดังนี้ ให้เข้าไปสงบวิเศษ ประกอบแล้ว ด้วยสามารถแห่งเพศมีเพศแห่งนางกุมาริกาเป็นต้น ที่โคนแห่งต้นอชปาลนิโครธด้วย",`;
    const thai526_header = `thai: "ตรัสแล้ว ซึ่งพระคาถา นี้ ว่า`;
    
    if (content.includes(thai525_full) && content.includes(thai526_header)) {
        const mergedThai = thai525_full.replace('",', ' ') + thai526_header.replace('thai: "', '');
        content = content.replace(thai526_header, mergedThai);
        console.log('Merged Thai 525+526');
    }

    // Delete 525 OBJECT
    const splitParts = content.split(pali525);
    if (splitParts.length === 2) {
        const before = splitParts[0];
        const lastBrace = before.lastIndexOf('{');
        const after = splitParts[1];
        const nextBrace = after.indexOf('},');
        
        if (lastBrace !== -1 && nextBrace !== -1) {
            const partToRemoveStart = before.length - (before.length - lastBrace);
            const partToRemoveEnd = before.length + pali525.length + nextBrace + 2;
            const toRemove = content.substring(partToRemoveStart, partToRemoveEnd);
            content = content.replace(toRemove, '');
            console.log('Merged 525+526 (Prepended 525 to 526)');
        }
    }
} else {
    console.log('525 or 526 not found');
}

// 3. Merge 560 + 561
// 560 Pali
const pali560 = `pali: "โส ตํทิวสํ อรญฺเญ กมฺมํ กตฺวา สายํ อาคนฺตฺวา, ภตฺเต วฑฺเฒตฺวา ทินฺเน, “ฉาโตสฺมีติ สหสา อภุญฺชิตฺวาว",`;
// 561 Pali
const pali561 = `pali: "“อญฺเญสุ ทิวเสสุ อิมสฺมึ เคเห ‘ภตฺตํ เทถ สูปํ เทถ พฺยญฺชนํ เทถาติ มหาโกลาหลํ โหติ, อชฺช สพฺเพ นิสฺสทฺทา นิปชฺชึสุ, มยฺหเมเวกสฺส อาหารํ วฑฺฒยึสุ: กินฺนุ โข เอตนฺติ จินฺเตตฺวา ปุจฺฉิ “อวเสสา ภุญฺชึสูติ ฯ",`;

if (content.includes(pali560) && content.includes(pali561)) {
    // Merge 561 INTO 560 (Append)
    const mergedPali560 = pali560.replace('",', ' ') + pali561.replace('pali: "', '');
    content = content.replace(pali560, mergedPali560);
    
    // Merge Thai 560+561
    const thai560 = `thai: "(อ. บุรุษผู้กระทำซึ่งการรับจ้าง) นั้น กระทำแล้ว ซึ่งการงาน ในป่า ในวันนั้น มาแล้ว ในเวลาเย็น, ครั้นเมื่อข้าวสวย (อันชน ท.) ให้เจริญแล้ว ถวายแล้ว, ไม่บริโภคแล้ว โดยพลันเทียว (ด้วยอันคิด) ว่า “(อ. เรา) เป็นผู้หิวแล้ว ย่อมเป็น” ดังนี้",`;
    const thai561 = `thai: "คิดแล้ว ว่า “อ.ความโกลาหลใหญ่ ว่า ‘(อ. ท่าน ท.) จงให้ ซึ่งข้าวสวย, (อ. ท่าน ท.) จงให้ ซึ่งแกง, (อ. ท่าน ท.) จงให้ ซึ่งกับ’ ดังนี้ ย่อมมี ในเรือน นี้ ในวัน ท. เหล่าอื่น, ในวันนี้ (อ. ชน ท.) ทั้งปวง ผู้มีเสียงออกแล้ว นอนแล้ว, (อ. ชน ท.) ยังอาหาร ให้เจริญแล้ว เพื่อเรา ผู้เดียวนั่นเทียว, (อ. เหตุ) นั่น อะไรหนอแล” ดังนี้ ถามแล้ว ว่า “(อ. ชน ท.) ผู้เหลือลง บริโภคแล้วหรือ” ดังนี้ ฯ",`;
    
    if (content.includes(thai560) && content.includes(thai561)) {
        const mergedThai560 = thai560.replace('",', ' ') + thai561.replace('thai: "', '');
        content = content.replace(thai560, mergedThai560);
        console.log('Merged Thai 560+561');
    }
    
    // Delete 561 Object
    const splitParts = content.split(pali561);
    if (splitParts.length === 2) {
        const before = splitParts[0];
        const lastBrace = before.lastIndexOf('{');
        const after = splitParts[1];
        const nextBrace = after.indexOf('},');
        
        if (lastBrace !== -1 && nextBrace !== -1) {
            const partToRemoveStart = before.length - (before.length - lastBrace);
            const partToRemoveEnd = before.length + pali561.length + nextBrace + 2;
            const toRemove = content.substring(partToRemoveStart, partToRemoveEnd);
            content = content.replace(toRemove, '');
            console.log('Merged 560+561 (Appended 561 to 560)');
        }
    }
} else {
    console.log('560 or 561 not found');
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done writing file.');
