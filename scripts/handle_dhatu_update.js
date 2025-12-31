const fs = require('fs');
const path = require('path');

// 1. Get Payload
const payloadJson = process.env.CLIENT_PAYLOAD;
if (!payloadJson) {
    console.error("No CLIENT_PAYLOAD environment variable provided.");
    process.exit(1);
}

let payload;
try {
    payload = JSON.parse(payloadJson);
} catch (e) {
    console.error("Failed to parse CLIENT_PAYLOAD JSON:", e);
    process.exit(1);
}

const { dhatuId, after } = payload;

if (!dhatuId || !after) {
    console.error("Invalid payload: missing dhatuId or after state.");
    // If it's a delete event, 'after' might be null, but we assume update for now.
    process.exit(1);
}

// 2. Load File
const filePath = path.join(__dirname, '../data/raw/vocab-roots-firebase.js');
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Extract JSON part
const prefix = 'const vocabRoots = ';
// We assume the file ends with a semicolon or we search for the last closing brace
const jsonStart = content.indexOf(prefix);
if (jsonStart === -1) {
    console.error("Could not find prefix 'const vocabRoots = ' in file.");
    process.exit(1);
}

// Simple extraction: assume everything after prefix (minus potential trailing semicolon) is JSON
let jsonString = content.substring(jsonStart + prefix.length).trim();
if (jsonString.endsWith(';')) {
    jsonString = jsonString.slice(0, -1);
}

let vocabRoots;
try {
    vocabRoots = JSON.parse(jsonString);
} catch (e) {
    console.error("Error parsing vocabRoots JSON content:", e);
    process.exit(1);
}

// 3. Find and Update
let found = false;
let oldKey = null;

// The payload ID might be string, file ID is usually int.
// We handle both.
const targetId = parseInt(dhatuId); 

console.log(`Processing update for Dhatu ID: ${targetId} (${dhatuId})`);

for (const [key, roots] of Object.entries(vocabRoots)) {
    // roots is an array of objects
    const index = roots.findIndex(r => r.id == targetId); 
    if (index !== -1) {
        found = true;
        oldKey = key;
        const currentRoot = roots[index];
        
        console.log(`Found existing root under key '${key}'`);

        // Map Firestore fields (after) to File fields
        // Firestore: dhatu_word, arth_thai, arth_pali, udaharana, mawat_dhatu, anukrom_dhatu, page
        // File: meaning, meaning_pali, example, group, id, ref
        
        const newRoot = {
            meaning: after.arth_thai !== undefined ? after.arth_thai : currentRoot.meaning,
            meaning_pali: after.arth_pali !== undefined ? after.arth_pali : currentRoot.meaning_pali,
            example: Array.isArray(after.udaharana) ? after.udaharana : (after.udaharana ? [after.udaharana] : currentRoot.example),
            group: after.mawat_dhatu !== undefined ? after.mawat_dhatu : currentRoot.group,
            id: currentRoot.id, // Preserve ID from file (or use targetId)
            ref: after.page ? parseInt(after.page) : currentRoot.ref
        };
        
        // Check if key (dhatu_word) changed
        const newKey = after.dhatu_word;
        if (newKey && newKey !== oldKey) {
            console.log(`Root word changed from '${oldKey}' to '${newKey}'`);
            
            // Remove from old key
            roots.splice(index, 1);
            if (roots.length === 0) {
                delete vocabRoots[oldKey];
            }
            
            // Add to new key
            if (!vocabRoots[newKey]) vocabRoots[newKey] = [];
            vocabRoots[newKey].push(newRoot);
        } else {
            // Update in place
            console.log(`Updating in place under key '${oldKey}'`);
            roots[index] = newRoot;
        }
        break;
    }
}

if (!found) {
    console.log(`Root with ID ${dhatuId} not found in file. Creating new entry...`);
    const newKey = after.dhatu_word;
    if (!newKey) {
        console.error("Cannot create new root: missing dhatu_word in payload.");
        process.exit(1);
    }
    
    const newRoot = {
        meaning: after.arth_thai || "",
        meaning_pali: after.arth_pali || "",
        example: Array.isArray(after.udaharana) ? after.udaharana : (after.udaharana ? [after.udaharana] : []),
        group: after.mawat_dhatu || "",
        id: targetId || parseInt(after.anukrom_dhatu) || 0,
        ref: after.page ? parseInt(after.page) : 0
    };
    
    if (!vocabRoots[newKey]) vocabRoots[newKey] = [];
    vocabRoots[newKey].push(newRoot);
}

// 4. Write Back
const newContent = `${prefix}${JSON.stringify(vocabRoots, null, 2)};`;
fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully updated vocab-roots-firebase.js`);
