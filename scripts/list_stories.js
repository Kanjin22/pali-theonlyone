const fs = require('fs');
const filePath = 'data/content-dhamma02.js';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /"d02_v02_s\d+_[a-zA-Z0-9_]+"/g;
    const matches = content.match(regex);
    
    if (matches) {
        console.log("Found keys:");
        matches.forEach(m => console.log(m));
    } else {
        console.log("No keys found.");
    }
} catch (err) {
    console.error(err);
}
