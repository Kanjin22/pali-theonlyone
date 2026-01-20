const fs = require('fs');

const filePath = 'd:\\pali-theonlyone\\data\\content-dhamma02.js';

try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract Samavati array (Same logic as before)
    const startMarker = '"d02_v02_s01_samavati": [';
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) throw new Error('Could not find d02_v02_s01_samavati');

    let openBrackets = 0;
    let endIndex = -1;
    let inString = false;
    let stringChar = '';
    const arrayOpenIndex = startIndex + startMarker.length - 1;

    for (let i = arrayOpenIndex; i < content.length; i++) {
        const char = content[i];
        if (inString) {
            if (char === stringChar && content[i-1] !== '\\') inString = false;
        } else {
            if (char === '"' || char === "'" || char === '`') {
                inString = true;
                stringChar = char;
            } else if (char === '[') openBrackets++;
            else if (char === ']') {
                openBrackets--;
                if (openBrackets === 0) {
                    endIndex = i + 1;
                    break;
                }
            }
        }
    }

    if (endIndex === -1) throw new Error('Could not find end of array');

    const arrayString = content.substring(arrayOpenIndex, endIndex);
    let items = eval(arrayString);

    let modified = false;
    const tasks = [
        { type: 'merge', match: 'อุปายํ ทิสฺวา', nextMatch: '“อยํ เม อวชาตปุตฺโต' },
        { type: 'merge', match: 'สตฺถุ สนฺติเก วสิตฺวา', nextMatch: 'โกสมฺพีคมนตฺถาย' },
        { type: 'merge', match: 'ตถาคตา อภิรมนฺตีติ วุตฺเต,', nextMatch: '“มยํ ปน สตฺถุ' },
        { type: 'merge', match: 'อมฺเหปิ ปาเยหีติ วตฺวา,', nextMatch: 'สา เตหิ กหาปเณหิ' },
        { type: 'merge', match: 'อิทํ กินฺติ ปุจฺฉิตฺวา,', nextMatch: 'ตาหิ ตสฺสา' },
        { type: 'merge', match: 'ปูเชม จาติ วุตฺเต,', nextMatch: '“เตนหิ ตุมฺเห' },
        { type: 'merge', match: 'อุปฏฺฐานํ กโรนฺตี', nextMatch: 'จูฬปิตุ สาสนํ' },
        { type: 'merge', match: 'เทวาติ ปุจฺฉิตฺวา,', nextMatch: '“สามาวติยา ปาสาทนฺติ' },
        { type: 'merge', match: 'สามาวติยา ปาสาทนฺติ วุตฺเต,', nextMatch: 'อาห “เตนหิ' }
    ];

    function mergeItems(item1, item2) {
        let newPali = item1.pali.trim() + " " + item2.pali.trim();
        let newThai = (item1.thai || "").trim();
        if (newThai && !newThai.endsWith(" ") && !item2.thai.startsWith(" ")) newThai += " ";
        newThai += (item2.thai || "").trim();

        const mergeField = (field) => {
            const v1 = (item1[field] || "-").trim();
            const v2 = (item2[field] || "-").trim();
            if (v1 === "-" && v2 === "-") return "-";
            if (v1 === "-") return v2;
            if (v2 === "-") return v1;
            return v1 + ", " + v2;
        };

        return {
            ...item1,
            pali: newPali,
            thai: newThai,
            thai_desana: mergeField('thai_desana').replace(/, /g, " "),
            thai_sense: mergeField('thai_sense').replace(/, /g, " "),
            thai_yok: (item1.thai_yok || "") + "; " + (item2.thai_yok || ""),
            akhyata: mergeField('akhyata'),
            kitaka: mergeField('kitaka'),
            vocab_list: mergeField('vocab_list'),
            sandhi: { ...(item1.sandhi || {}), ...(item2.sandhi || {}) }
        };
    }

    // Apply tasks - Iterative approach to handle chains
    // Loop until no more tasks are applied in a pass?
    // Or just one pass through tasks, but scan array for each task.
    
    for (const task of tasks) {
        let found = false;
        for (let i = 0; i < items.length; i++) {
             if (task.type === 'merge') {
                if (items[i].pali && items[i].pali.includes(task.match)) {
                    if (i + 1 < items.length && items[i+1].pali && items[i+1].pali.includes(task.nextMatch)) {
                        console.log(`Merging index ${i} with next (Match: ${task.match})`);
                        items[i] = mergeItems(items[i], items[i+1]);
                        items.splice(i+1, 1);
                        found = true;
                        modified = true;
                        break; 
                    }
                }
            }
        }
        if (!found) console.log(`Task not applied: ${task.match}`);
    }

    if (modified) {
        // Use same serialization logic as before
        const jsonStr = JSON.stringify(items, null, 4);
        let formatted = jsonStr
            .replace(/^\[/, '[') 
            .replace(/\]$/, '    ]')
            .replace(/\n/g, '\n    ');
        
        formatted = formatted.replace(/"(\w+)":/g, '$1:');
        
        const lines = formatted.split('\n');
        const indented = lines.map((line, idx) => {
            if (idx === 0) return line;
            return '    ' + line;
        }).join('\n');

        const newContent = content.substring(0, arrayOpenIndex) + indented + content.substring(endIndex);
        
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log('File updated successfully.');
    } else {
        console.log('No changes needed.');
    }

} catch (err) {
    console.error('Error:', err);
}
