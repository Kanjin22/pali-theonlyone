const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../data/raw/vocab-etipitaka.js');
const outDir = path.join(__dirname, '../data/raw');

try {
  const content = fs.readFileSync(sourcePath, 'utf8');
  const match = content.match(/const vocabEtipitaka = ({[\s\S]*?});/);
  
  if (!match) {
    console.error("Could not find vocabEtipitaka object");
    process.exit(1);
  }

  // Use Function to safely evaluate the object (better than eval for some cases, though similar risks)
  // But since the file is local and trusted, eval is acceptable for this one-off script.
  const vocab = eval('(' + match[1] + ')');
  
  const vocabBhum = {};
  const vocabChin = {};
  const vocabGen = {};
  
  let countBhum = 0;
  let countChin = 0;
  let countGen = 0;
  let totalEntries = 0;

  for (const [key, value] of Object.entries(vocab)) {
    totalEntries++;
    
    // Split by <br><br> or <br> <br> (just in case of spaces)
    // Based on inspection, it's <br><br>
    const parts = value.split(/<br>\s*<br>/);
    
    parts.forEach((part, index) => {
      const trimmedPart = part.trim();
      if (!trimmedPart) return;

      if (trimmedPart.includes('(ชิน.')) {
        // Chinnakarn
        if (vocabChin[key]) {
             // Append if already exists (unlikely for <br><br> split, but safe)
             vocabChin[key] += " <br><br> " + trimmedPart;
        } else {
             vocabChin[key] = trimmedPart;
             countChin++;
        }
      } else if (index === 0) {
        // First part -> Bhumibalo
        if (vocabBhum[key]) {
            vocabBhum[key] += " <br><br> " + trimmedPart;
        } else {
            vocabBhum[key] = trimmedPart;
            countBhum++;
        }
      } else {
        // Subsequent parts -> General
        if (vocabGen[key]) {
            vocabGen[key] += " <br><br> " + trimmedPart;
        } else {
            vocabGen[key] = trimmedPart;
            countGen++;
        }
      }
    });
  }

  // Helper to write file
  const writeFile = (name, data, varName) => {
    const fileContent = `const ${varName} = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(path.join(outDir, name), fileContent, 'utf8');
    console.log(`Written ${name}: ${Object.keys(data).length} entries`);
  };

  writeFile('vocab-etipitaka-bhum.js', vocabBhum, 'vocabEtipitakaBhum');
  writeFile('vocab-etipitaka-chin.js', vocabChin, 'vocabEtipitakaChin');
  writeFile('vocab-etipitaka-general.js', vocabGen, 'vocabEtipitakaGeneral');

  console.log(`\nSummary:`);
  console.log(`Total Original Entries: ${totalEntries}`);
  console.log(`Bhumibalo Entries: ${countBhum}`);
  console.log(`Chinnakarn Entries: ${countChin}`);
  console.log(`General Entries: ${countGen}`);
  
} catch (err) {
  console.error("Error:", err);
}
