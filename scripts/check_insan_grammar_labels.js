const fs = require('fs');
const path = require('path');

const files = [
  {
    name: 'vocab-insan-pr9.js',
    path: path.join(__dirname, '..', 'data', 'raw', 'vocab-insan-pr9.js')
  },
  {
    name: 'vocab-insan-pr9-5-8.js',
    path: path.join(__dirname, '..', 'data', 'raw', 'vocab-insan-pr9-5-8.js')
  }
];

function readLines(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  return text.split(/\r?\n/);
}

const vibhattiCombosExpected = [
  { form: 'ติ', label: 'วัตตมานาวิภัตติ' },
  { form: 'อนฺติ', label: 'วัตตมานาวิภัตติ' },
  { form: 'สิ', label: 'วัตตมานาวิภัตติ' },
  { form: 'ถ', label: 'วัตตมานาวิภัตติ' },
  { form: 'มิ', label: 'วัตตมานาวิภัตติ' },
  { form: 'เต', label: 'วัตตมานาวิภัตติ' },
  { form: 'อนฺเต', label: 'วัตตมานาวิภัตติ' },
  { form: 'เส', label: 'วัตตมานาวิภัตติ' },
  { form: 'วฺเห', label: 'วัตตมานาวิภัตติ' },
  { form: 'เอ', label: 'วัตตมานาวิภัตติ' },
  { form: 'มฺเห', label: 'วัตตมานาวิภัตติ' },

  { form: 'ตุ', label: 'ปัญจมีวิภัตติ' },
  { form: 'อนฺตุ', label: 'ปัญจมีวิภัตติ' },
  { form: 'หิ', label: 'ปัญจมีวิภัตติ' },
  { form: 'ถ', label: 'ปัญจมีวิภัตติ' },
  { form: 'มิ', label: 'ปัญจมีวิภัตติ' },
  { form: 'ม', label: 'ปัญจมีวิภัตติ' },
  { form: 'ตํ', label: 'ปัญจมีวิภัตติ' },
  { form: 'อนฺตํ', label: 'ปัญจมีวิภัตติ' },
  { form: 'สฺสุ', label: 'ปัญจมีวิภัตติ' },
  { form: 'วฺโห', label: 'ปัญจมีวิภัตติ' },
  { form: 'เอ', label: 'ปัญจมีวิภัตติ' },
  { form: 'อามฺหเส', label: 'ปัญจมีวิภัตติ' },

  { form: 'เอยฺย', label: 'สัตตมีวิภัตติ' },
  { form: 'เอยฺยํ', label: 'สัตตมีวิภัตติ' },
  { form: 'เอยฺยาสิ', label: 'สัตตมีวิภัตติ' },
  { form: 'เอยฺยาถ', label: 'สัตตมีวิภัตติ' },
  { form: 'เอยฺยามิ', label: 'สัตตมีวิภัตติ' },
  { form: 'เอยฺยาม', label: 'สัตตมีวิภัตติ' },
  { form: 'เอถ', label: 'สัตตมีวิภัตติ' },
  { form: 'เอรํ', label: 'สัตตมีวิภัตติ' },
  { form: 'เอโถ', label: 'สัตตมีวิภัตติ' },
  { form: 'เอยฺยวฺโห', label: 'สัตตมีวิภัตติ' },
  { form: 'เอยฺยามฺเห', label: 'สัตตมีวิภัตติ' },

  { form: 'อ', label: 'ปโรกขาวิภัตติ' },
  { form: 'อุ', label: 'ปโรกขาวิภัตติ' },
  { form: 'เอ', label: 'ปโรกขาวิภัตติ' },
  { form: 'ตฺถ', label: 'ปโรกขาวิภัตติ' },
  { form: 'อํ', label: 'ปโรกขาวิภัตติ' },
  { form: 'มฺห', label: 'ปโรกขาวิภัตติ' },
  { form: 'เร', label: 'ปโรกขาวิภัตติ' },
  { form: 'ตฺโถ', label: 'ปโรกขาวิภัตติ' },
  { form: 'วฺโห', label: 'ปโรกขาวิภัตติ' },
  { form: 'อึ', label: 'ปโรกขาวิภัตติ' },
  { form: 'มฺเห', label: 'ปโรกขาวิภัตติ' },

  { form: 'อา', label: 'หิยัตตนีวิภัตติ' },
  { form: 'อู', label: 'หิยัตตนีวิภัตติ' },
  { form: 'โอ', label: 'หิยัตตนีวิภัตติ' },
  { form: 'ตฺถ', label: 'หิยัตตนีวิภัตติ' },
  { form: 'อํ', label: 'หิยัตตนีวิภัตติ' },
  { form: 'มฺห', label: 'หิยัตตนีวิภัตติ' },
  { form: 'ตฺถํ', label: 'หิยัตตนีวิภัตติ' },
  { form: 'เส', label: 'หิยัตตนีวิภัตติ' },
  { form: 'วฺหํ', label: 'หิยัตตนีวิภัตติ' },
  { form: 'อึ', label: 'หิยัตตนีวิภัตติ' },
  { form: 'มฺหเส', label: 'หิยัตตนีวิภัตติ' },

  { form: 'อี', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'อํ', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'โอ', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'ตฺถ', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'อึ', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'มฺหา', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'อา', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'อู', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'เส', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'วฺหํ', label: 'อัชชัตตนีวิภัตติ' },
  { form: 'มฺเห', label: 'อัชชัตตนีวิภัตติ' },

  { form: 'สฺสติ', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสนฺติ', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสสิ', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสถ', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสามิ', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสาม', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสเต', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสนฺเต', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสเส', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสวฺเห', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสํ', label: 'ภวิสสันติวิภัตติ' },
  { form: 'สฺสามฺเห', label: 'ภวิสสันติวิภัตติ' },

  { form: 'สฺสา', label: 'กาลาติปัตติวิภัตติ' },
  { form: 'สฺสํสุ', label: 'กาลาติปัตติวิภัตติ' },
  { form: 'สฺเส', label: 'กาลาติปัตติวิภัตติ' },
  { form: 'สฺสถ', label: 'กาลาติปัตติวิภัตติ' },
  { form: 'สฺสํ', label: 'กาลาติปัตติวิภัตติ' },
  { form: 'สฺสามฺหเส', label: 'กาลาติปัตติวิภัตติ' }
];

function scanVibhatti(lines, fileName) {
  const regex = /([^\s"']+)\s+(วัตตมานาวิภัตติ|ปัญจมีวิภัตติ|สัตตมีวิภัตติ|ปโรกขาวิภัตติ|หิยัตตนีวิภัตติ|อัชชัตตนีวิภัตติ|ภวิสสันติวิภัตติ|กาลาติปัตติวิภัตติ)/g;
  const found = [];
  lines.forEach((line, idx) => {
    let m;
    while ((m = regex.exec(line)) !== null) {
      found.push({
        form: m[1],
        label: m[2],
        file: fileName,
        line: idx + 1
      });
    }
  });
  return found;
}

function main() {
  const allLines = {};
  files.forEach(f => {
    allLines[f.name] = readLines(f.path);
  });

  let foundVibhatti = [];
  files.forEach(f => {
    foundVibhatti = foundVibhatti.concat(
      scanVibhatti(allLines[f.name], f.name)
    );
  });

  const foundMap = new Map();
  foundVibhatti.forEach(item => {
    const key = `${item.form}|${item.label}`;
    if (!foundMap.has(key)) foundMap.set(key, []);
    foundMap.get(key).push({ file: item.file, line: item.line });
  });

  const expectedMap = new Map();
  vibhattiCombosExpected.forEach(c => {
    expectedMap.set(`${c.form}|${c.label}`, c);
  });

  const missing = [];
  const extra = [];

  for (const [key, val] of expectedMap.entries()) {
    if (!foundMap.has(key)) {
      missing.push(val);
    }
  }

  for (const [key, locs] of foundMap.entries()) {
    if (!expectedMap.has(key)) {
      const [form, label] = key.split('|');
      extra.push({ form, label, locations: locs });
    }
  }

  console.log('=== VIBHATTI SUMMARY (found combos) ===');
  for (const [key, locs] of foundMap.entries()) {
    const [form, label] = key.split('|');
    const locStr = locs
      .map(l => `${l.file}:${l.line}`)
      .join(', ');
    console.log(`${form}\t${label}\t${locStr}`);
  }

  console.log('\n=== VIBHATTI MISSING FROM FILES (expected but not found) ===');
  if (missing.length === 0) {
    console.log('(none)');
  } else {
    missing.forEach(c => console.log(`${c.form}\t${c.label}`));
  }

  console.log('\n=== VIBHATTI EXTRA IN FILES (found but not in expected list) ===');
  if (extra.length === 0) {
    console.log('(none)');
  } else {
    extra.forEach(c => {
      const locStr = c.locations
        .map(l => `${l.file}:${l.line}`)
        .join(', ');
      console.log(`${c.form}\t${c.label}\t${locStr}`);
    });
  }
}

if (require.main === module) {
  main();
}

