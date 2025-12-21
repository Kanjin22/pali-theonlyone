
const fs = require('fs');
try {
    const content = fs.readFileSync('d:\\pali-theonlyone\\data\\content-dhamma04.js', 'utf8');
    // Wrap in a function or block to make it valid script execution
    // Remove 'const contentDhamma04 =' to just evaluate the object
    // Or just eval it?
    // It's a const assignment. 
    // Let's just try to eval the whole string.
    eval(content);
    console.log("Syntax OK");
} catch (e) {
    console.error("Syntax Error:", e.message);
}
