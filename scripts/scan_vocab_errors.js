const fs = require('fs');
const readline = require('readline');

const filePath = 'd:/pali-theonlyone/data/raw/vocab-insan-pr9-5-8.js';

async function scanFile() {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNum = 0;
  const posMarkers = ['น.', 'ก.', 'ว.', 'นิ.', 'วิ.', 'ปุ.', 'อิต.', 'นปุ.'];

  const startLine = 4500;
  const endLine = 6000;

  for await (const line of rl) {
    lineNum++;
    if (lineNum < startLine) continue;
    if (lineNum > endLine) break;

    const trimmed = line.trim();
    if (!trimmed.startsWith('"')) continue;

    // Extract key and value
    const match = trimmed.match(/^"([^"]+)": "(.+)",?$/);
    if (!match) continue;

    const key = match[1];
    const value = match[2];

    // Check key for artifacts
    if (key.startsWith('=')) {
      console.log(`Line ${lineNum}: Key starts with '=' -> ${key}`);
    }
    if (key.includes('(') || key.includes(')')) {
      console.log(`Line ${lineNum}: Key contains parenthesis -> ${key}`);
    }
    if (key.length <= 1) {
      console.log(`Line ${lineNum}: Key too short -> ${key}`);
    }
    
    // Check value for merged entries
    // Pattern: space + ThaiWord + space + POS marker + space
    // We look for POS markers that are NOT at the beginning.
    // The value starts with POS usually.
    
    // Simple heuristic: " Word POS." inside the string
    // Regex: \s[ก-ฮ]+\s[นกว]\.
    // Using a regex with the specific markers
    const mergedRegex = /\s[ก-ฮ๑-๙]+\s(น|ก|ว|นิ|วิ)\./;
    if (mergedRegex.test(value)) {
       // Exclude common false positives if any?
       // " ดู อคต" is common, but "ดู" is a verb (ก.), so " ดู อคต" -> " ดู" is verb? No.
       // "ดู" is a word. "ก." is POS.
       // " ดู ก." -> " ดู" is word, "ก." is POS.
       // If the text is "... ดู ก." it matches.
       
       // Let's print matches to see.
       console.log(`Line ${lineNum}: Potential merged entry -> ${key}: ... ${value.match(mergedRegex)[0]} ...`);
    }

    // Check for "truncated" entries (value ending with "ได้รูปเป็น" or similar without word)
    if (value.endsWith('ได้รูปเป็น')) {
        console.log(`Line ${lineNum}: Truncated entry -> ${key}`);
    }
  }
}

scanFile();
