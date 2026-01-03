const fs = require('fs');
const path = require('path');

const vocabPath = path.join(__dirname, '../data/raw/vocab-bhumibalo.js');
const data = fs.readFileSync(vocabPath, 'utf8');
const lines = data.split('\n');

const targets = ['ข.', 'ส.กา.', 'ส.ก.', 'ค.'];

targets.forEach(target => {
    console.log(`\n--- Context for ${target} ---`);
    let count = 0;
    for (const line of lines) {
        if (line.includes(target)) {
            console.log(line.trim().substring(0, 150));
            count++;
            if (count >= 5) break;
        }
    }
});
