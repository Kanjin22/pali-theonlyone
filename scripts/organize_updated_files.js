const fs = require('fs');
const path = require('path');

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function moveUpdatedFiles() {
  const base = path.join(__dirname, '..', 'data');
  const target = path.join(base, 'updated');
  ensureDir(target);

  const files = fs.readdirSync(base).filter(f => /^content-dhamma\d{2}-updated\.js$/.test(f));
  let moved = 0;
  for (const f of files) {
    const src = path.join(base, f);
    const dst = path.join(target, f);
    if (fs.existsSync(dst)) {
      // overwrite target with latest
      fs.unlinkSync(dst);
    }
    fs.renameSync(src, dst);
    moved++;
    console.log(`Moved: ${f} -> data/updated/${f}`);
  }
  console.log(`Total moved: ${moved}`);
}

moveUpdatedFiles();
