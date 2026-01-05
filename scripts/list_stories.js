const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
// Filter for content-dhamma files, excluding 'updated' ones to avoid duplicates if they exist alongside
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('content-dhamma') && f.endsWith('.js') && !f.includes('updated'));

let allStories = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    // Simple regex to find the ID key and the story name
    // Matches: "d01_v01_s01_...": [
    // followed eventually by: story: "..."
    
    // We split by "d" to roughly separate entries or use a global regex
    // A more robust regex to capture the key and the content block might be needed
    // But since the structure is consistent, we can iterate line by line or use a block regex
    
    // Regex to match the ID at the start of a property
    const entryRegex = /"([a-z0-9_]+)":\s*\[([\s\S]*?)\]/g;
    
    let match;
    while ((match = entryRegex.exec(content)) !== null) {
        const id = match[1];
        const body = match[2];
        
        // Find story name inside the body
        const storyMatch = body.match(/story:\s*"([^"]+)"/);
        if (storyMatch) {
            allStories.push({
                id: id,
                name: storyMatch[1],
                file: file
            });
        }
    }
});

// Sort by ID
allStories.sort((a, b) => a.id.localeCompare(b.id));

console.log(`Found ${allStories.length} stories.`);

const outputContent = allStories.map(s => `${s.id} | ${s.name}`).join('\n');
const outputPath = path.join(__dirname, '../all_stories.txt');

// Write with UTF-8 BOM to ensure Windows editors open it correctly if needed, or just UTF-8
fs.writeFileSync(outputPath, '\uFEFF' + outputContent, 'utf8');

console.log(`List written to ${outputPath}`);
// Also print first 10 and last 10 to console for verification
console.log('First 5 entries:');
allStories.slice(0, 5).forEach(s => console.log(`${s.id} | ${s.name}`));
console.log('...');
