const fs = require('fs');
const path = require('path');

// Use process.cwd() assuming we run from project root
const ROOT_DIR = process.cwd();
const OUTPUT_FILE = path.join(ROOT_DIR, 'js', 'file_index.js');

console.log(`Root Dir: ${ROOT_DIR}`);
console.log(`Output File: ${OUTPUT_FILE}`);

const TARGET_DIRS = ['materials', 'exams', 'answers'];
const FILE_INDEX = {};

try {
    TARGET_DIRS.forEach(type => {
        const typeDir = path.join(ROOT_DIR, type);
        console.log(`Checking ${typeDir}...`);
        
        if (!fs.existsSync(typeDir)) {
            console.log(`  Skipping ${type} (not found)`);
            return;
        }

        const items = fs.readdirSync(typeDir);
        items.forEach(item => {
            const itemPath = path.join(typeDir, item);
            if (fs.statSync(itemPath).isDirectory()) {
                const level = item; // e.g., pt12, pt4
                
                if (!FILE_INDEX[level]) FILE_INDEX[level] = {};
                if (!FILE_INDEX[level][type]) FILE_INDEX[level][type] = [];

                const files = fs.readdirSync(itemPath).filter(f => {
                    const lower = f.toLowerCase();
                    return lower.endsWith('.pdf') || lower.endsWith('.jpg') || lower.endsWith('.png');
                });

                FILE_INDEX[level][type] = files.sort();
                console.log(`  Found ${files.length} files in ${type}/${level}`);
            }
        });
    });

    const content = `const FILE_INDEX = ${JSON.stringify(FILE_INDEX, null, 4)};\n\nif (typeof module !== 'undefined') module.exports = FILE_INDEX;`;

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`Successfully wrote to ${OUTPUT_FILE}`);

} catch (err) {
    console.error("Error generating index:", err);
    process.exit(1);
}
