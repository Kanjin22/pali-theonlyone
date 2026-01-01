const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/raw/vocab-etipitaka.js');

try {
  const content = fs.readFileSync(filePath, 'utf8');
  // extract the object
  const match = content.match(/const vocabEtipitaka = ({[\s\S]*?});/);
  if (!match) {
    console.error("Could not find vocabEtipitaka object");
    process.exit(1);
  }

  const vocab = eval('(' + match[1] + ')');
  const entries = Object.entries(vocab);
  
  console.log(`Total entries: ${entries.length}`);

  let countSans = 0; // [สัน. ...]
  let countChin = 0; // (ชิน. ...)
  let countPha = 0;  // (ผ)
  let countPali = 0; // ป. ...
  let countNabu = 0; // นป. ...
  let countItt = 0; // อิต. ...
  let countBr = 0; // <br>
  
  entries.forEach(([key, value]) => {
    if (value.includes('[สัน.')) countSans++;
    if (value.includes('(ชิน.')) countChin++;
    if (value.includes('(ผ)')) countPha++;
    if (value.includes('ป.')) countPali++; // This might be too generic
    if (value.includes('นป.')) countNabu++;
    if (value.includes('อิต.')) countItt++;
    if (value.includes('<br>')) countBr++;
  });

  console.log(`Entries with [สัน.]: ${countSans} (Likely Bhumibalo/PTS)`);
  console.log(`Entries with (ชิน.): ${countChin}`);
  console.log(`Entries with (ผ): ${countPha}`);
  console.log(`Entries with <br> (Multiple definitions): ${countBr}`);
  
  // Sample mixed entry
  console.log("\nSample Mixed Entry:");
  const mixed = entries.find(([k,v]) => v.includes('<br>') && v.includes('(ชิน.') && v.includes('[สัน.'));
  if (mixed) {
      console.log(mixed[0], ":", mixed[1]);
  }

} catch (err) {
  console.error(err);
}
