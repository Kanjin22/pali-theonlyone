
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/content-dhamma02.js');
let content = fs.readFileSync(filePath, 'utf8');

// Helper to safely parse the file content (since it's a JS file with variable assignment)
// We will use a regex to extract the array content for the specific story if possible, 
// or just operate on the file string if we can locate the unique items.

// Strategy: Find the first item's Pali string, verify the next item's Pali string, then merge.

const pali1Part = "โส ตํ คเหตฺวา ชเวน คนฺตฺวา";
const pali1End = "อาณา สุริยเตชสทิสา โหตุ ฯ";
const pali2Start = "อิมสฺมึ เม ปิณฺฑปาเต สามินา ปตฺติ ทินฺนา";

// Find the index of the first item in the file content
const index1 = content.indexOf(pali1Part);
if (index1 === -1) {
    console.error("Could not find first paragraph.");
    process.exit(1);
}

// Find the end of the first item's Pali string
const index1End = content.indexOf(pali1End, index1);
if (index1End === -1) {
    console.error("Could not find end of first paragraph.");
    process.exit(1);
}

// Check if the next item follows closely
const index2 = content.indexOf(pali2Start, index1End);
if (index2 === -1) {
    console.error("Could not find second paragraph.");
    process.exit(1);
}

console.log(`Found items at indices ${index1} and ${index2}. Proceeding with logic to merge objects.`);

// We need to parse the file to manipulate the objects properly.
// Since the file is large and has comments, we can try to use a safer approach:
// 1. Load the file as a module (if possible) or eval it.
// 2. Manipulate the object.
// 3. Serialize it back.
// HOWEVER, serializing might lose formatting/comments.
// So, we will stick to string manipulation if possible, or use a robust AST parser. 
// Given the environment, string manipulation with regex or strict parsing is safer if we want to preserve other parts of the file exactly.

// BUT, for merging two items in an array, it's easier if we treat the file as a JS object.
// Let's try to parse specifically the `d02_v02_s01_samavati` array if we can isolate it.
// Or better, let's just find the two objects in the text and replace them with the merged one.

// Let's read the file line by line to identify the lines for the two objects.
const lines = content.split('\n');
let startLine1 = -1;
let endLine1 = -1;
let startLine2 = -1;
let endLine2 = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(pali1Part)) {
        // Scan backwards for the start of the object "{"
        for (let j = i; j >= 0; j--) {
            if (lines[j].trim().endsWith('{') || lines[j].trim() === '{') {
                startLine1 = j;
                break;
            }
        }
        // Scan forwards for the end of the object "},"
        for (let j = i; j < lines.length; j++) {
            if (lines[j].trim() === '},' || lines[j].trim() === '}') {
                endLine1 = j;
                break;
            }
        }
    }
    
    if (lines[i].includes(pali2Start)) {
         // Scan backwards for start
        for (let j = i; j >= 0; j--) {
            if (lines[j].trim().endsWith('{') || lines[j].trim() === '{') {
                startLine2 = j;
                break;
            }
        }
         // Scan forwards for end
         for (let j = i; j < lines.length; j++) {
            if (lines[j].trim() === '},' || lines[j].trim() === '}') {
                endLine2 = j;
                break;
            }
        }
    }
}

if (startLine1 !== -1 && endLine1 !== -1 && startLine2 !== -1 && endLine2 !== -1) {
    console.log(`Identified lines: Item 1 (${startLine1}-${endLine1}), Item 2 (${startLine2}-${endLine2})`);
    
    // Extract objects
    const obj1Str = lines.slice(startLine1, endLine1 + 1).join('\n').replace(/,$/, ''); // Remove trailing comma if any for parsing
    const obj2Str = lines.slice(startLine2, endLine2 + 1).join('\n').replace(/,$/, '');

    // We need to be careful about parsing. The file keys are not quoted.
    // Let's use eval to parse just these snippets.
    let obj1, obj2;
    try {
        obj1 = eval(`(${obj1Str})`);
        obj2 = eval(`(${obj2Str})`);
    } catch (e) {
        console.error("Error parsing objects:", e);
        // Fallback: simple string replacement if eval fails
        process.exit(1);
    }

    // Merge logic
    obj1.pali = obj1.pali.replace(/ ฯ$/, ';') + ' ' + obj2.pali;
    obj1.thai = obj1.thai.replace(/ ฯ$/, ';') + ' ' + obj2.thai;
    
    // Merge other fields if necessary (e.g. vocab_list, akhyata)
    if (obj2.akhyata && obj2.akhyata !== '-') obj1.akhyata = (obj1.akhyata === '-' ? '' : obj1.akhyata + ', ') + obj2.akhyata;
    if (obj2.kitaka && obj2.kitaka !== '-') obj1.kitaka = (obj1.kitaka === '-' ? '' : obj1.kitaka + ', ') + obj2.kitaka;
    if (obj2.vocab_list && obj2.vocab_list !== '-') obj1.vocab_list = (obj1.vocab_list === '-' ? '' : obj1.vocab_list + ', ') + obj2.vocab_list;
    
    // Reconstruct the string for the merged object
    // We want to keep the format similar to the file.
    // Helper to format string values
    const fmt = (key, val) => `            ${key}: ${JSON.stringify(val)},`;
    
    const mergedStr = `        {
${fmt('part', obj1.part)}
${fmt('vagga', obj1.vagga)}
${fmt('story', obj1.story)}
${fmt('episode', obj1.episode)}
${fmt('page', obj1.page)}
${fmt('pali', obj1.pali)}
${fmt('thai', obj1.thai)}
${fmt('thai_desana', obj1.thai_desana || "รอข้อมูล")}
${fmt('thai_sense', obj1.thai_sense || "รอข้อมูล")}
${fmt('thai_yok', obj1.thai_yok || "")}
${fmt('context', obj1.context || "")}
${fmt('akhyata', obj1.akhyata)}
${fmt('kitaka', obj1.kitaka)}
${fmt('vocab_list', obj1.vocab_list)}
            sandhi: {}
        },`;

    // Replace the lines in the original content
    // We remove lines from startLine1 to endLine2, and insert mergedStr
    // Note: check if there's a comma after endLine2
    const hasComma = lines[endLine2].trim().endsWith(',');
    const replacement = mergedStr.trimEnd() + (hasComma ? ',' : ''); // Ensure comma if needed (though usually items in array have commas)
    
    // Actually, in the file, items are usually followed by comma.
    // Let's assume we need a comma unless it's the last item.
    // The safest way is to replace the whole range with the new string + comma.
    
    // Wait, endLine2 is "}," or "}".
    // If we replace startLine1 to endLine2, we replace both objects.
    
    // Construct new lines array
    const newLines = [
        ...lines.slice(0, startLine1),
        mergedStr.trimEnd() + (lines[endLine2].trim().endsWith(',') ? ',' : ''),
        ...lines.slice(endLine2 + 1)
    ];
    
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log("Successfully merged items.");
    
} else {
    console.error("Could not identify start/end lines for both items.");
}
