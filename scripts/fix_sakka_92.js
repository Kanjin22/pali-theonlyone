
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/content-dhamma02.js');
let content = fs.readFileSync(filePath, 'utf8');

// The target string to fix
const target = `ตํ เว เทวา ตาวตึสา อาหุ 'สปฺปุริโส อิตีติ`;
const replacement = `ตํ เว เทวา ตาวตึสา อาหุ 'สปฺปุริโส อิตีติ ฯ`;

// Only replace if it doesn't already have a terminator
if (content.includes(target + '"')) {
    console.log('Found target without terminator. Fixing...');
    content = content.replace(target + '"', replacement + '"');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed Sakka index 92.');
} else if (content.includes(target + ' ฯ"')) {
    console.log('Target already has ฯ.');
} else if (content.includes(target + '."')) {
    console.log('Target already has .');
} else {
    console.log('Target not found exactly as expected. Checking partial...');
    // Fallback regex check
    const regex = /อาหุ 'สปฺปุริโส อิตีติ"(?![\s\S]*?[ฯ.])/;
    if (regex.test(content)) {
         console.log('Found via regex. Fixing...');
         content = content.replace(/อาหุ 'สปฺปุริโส อิตีติ"/, "อาหุ 'สปฺปุริโส อิตีติ ฯ\"");
         fs.writeFileSync(filePath, content, 'utf8');
         console.log('Fixed via regex.');
    } else {
        console.log('Could not find target to fix.');
    }
}
