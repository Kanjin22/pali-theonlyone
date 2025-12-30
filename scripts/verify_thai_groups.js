const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/raw/vocab-roots-dpd.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');
fileContent = fileContent.replace('const vocabRootsDPD = ', '').trim();
if (fileContent.endsWith(';')) fileContent = fileContent.slice(0, -1);

const vocabRootsDPD = JSON.parse(fileContent);

const groupChecks = new Set();
const groupMap = new Map();

for (const key in vocabRootsDPD) {
    const roots = vocabRootsDPD[key];
    roots.forEach(r => {
        if (r.group && r.group_thai) {
            groupChecks.add(r.group);
            groupMap.set(r.group, r.group_thai);
        }
    });
}

console.log("Verified Thai Group Mappings:");
const sortedGroups = Array.from(groupChecks).sort((a,b) => a - b);
sortedGroups.forEach(g => {
    console.log(`Group ${g}: ${groupMap.get(g)}`);
});
