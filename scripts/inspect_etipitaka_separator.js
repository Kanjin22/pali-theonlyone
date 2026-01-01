const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/raw/vocab-etipitaka.js');

try {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const vocabEtipitaka = ({[\s\S]*?});/);
  if (!match) { console.error("Obj not found"); process.exit(1); }
  const vocab = eval('(' + match[1] + ')');
  
  const entries = Object.entries(vocab);
  const withBr = entries.filter(([k,v]) => v.includes('<br>'));
  
  console.log(`Entries with <br>: ${withBr.length}`);
  
  if (withBr.length > 0) {
      console.log("--- Sample 1 ---");
      console.log(JSON.stringify(withBr[0][1]));
      console.log("--- Sample 2 ---");
      console.log(JSON.stringify(withBr[100][1]));
  }
} catch (e) { console.error(e); }
