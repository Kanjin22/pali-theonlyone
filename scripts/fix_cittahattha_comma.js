const fs = require('fs');
const path = require('path');

const filePath = path.join('data', 'content-dhamma02.js');
let content = fs.readFileSync(filePath, 'utf8');

const pattern = /("d02_v03_s05_cittahattha":\s*\[[\s\S]*?sandhi:\s*\{\}\s*)(\r?\n\s*thai_desana)/;
const updated = content.replace(pattern, (_m, g1, g2) => `${g1},\n            thai_desana`);

if (updated !== content) {
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log('Inserted comma after sandhi in s05 block');
} else {
  console.log('No changes made (pattern not found)');
}
