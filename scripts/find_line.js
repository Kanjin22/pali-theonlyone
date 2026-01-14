
const fs = require('fs');
const content = fs.readFileSync('d:\\pali-theonlyone\\data\\raw\\vocab-insan-pr9.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('วูปกฏฺ')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
