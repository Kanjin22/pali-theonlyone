const fs = require('fs');
let admin;
try { admin = require('firebase-admin'); } catch { process.exit(1); }
const p = 'D:/pali-dhatu-app/service-account-key.json';
if (!fs.existsSync(p)) process.exit(1);
admin.initializeApp({ credential: admin.credential.cert(require(p)) });
const db = admin.firestore();
function mapNum(n) {
  if (n === '1') return 'ภู';
  if (n === '2') return 'รุธ';
  if (n === '3') return 'ทิว';
  if (n === '4') return 'สุ';
  if (n === '5') return 'กี';
  if (n === '6') return 'คห';
  if (n === '7') return 'ตน';
  if (n === '8') return 'จุร';
  return null;
}
function mapSign(s) {
  if (!s) return '';
  const t = s.toLowerCase().trim();
  if (t === 'a') return 'อ';
  if (t === 'ya') return 'ย';
  if (t === 'nu') return 'ณุ';
  if (t === 'nā' || t === 'na') return 'นา';
  if (t === 'o') return 'โอ';
  if (t === 'e') return 'เณ';
  if (t === 'aya') return 'ณย';
  return s;
}
function hasThaiGroup(s) {
  if (!s) return false;
  return ['ภู','รุธ','ทิว','สุ','กี','คห','ตน','จุร'].some(x => s.includes(x));
}
async function run() {
  const snap = await db.collection('dhatu').where('source','==','DPD').get();
  let batch = db.batch();
  let c = 0, upd = 0;
  snap.forEach(doc => {
    const d = doc.data();
    const g = (d.mawat_dhatu || '').trim();
    if (!g) return;
    if (hasThaiGroup(g)) return;
    const m = g.match(/^(\d)\s*(?:\(([^)]+)\))?/);
    if (!m) return;
    const n = m[1];
    const s = m[2] ? mapSign(m[2]) : '';
    const tn = mapNum(n);
    if (!tn) return;
    const ng = s ? `${tn} (${s})` : tn;
    if (ng !== g) {
      batch.update(doc.ref, { mawat_dhatu: ng, updated_at: admin.firestore.FieldValue.serverTimestamp() });
      c++;
      upd++;
      if (c >= 400) { batch.commit(); batch = db.batch(); c = 0; }
    }
  });
  if (c > 0) await batch.commit();
  console.log('Updated', upd);
}
run().catch(e => { console.error(e); process.exit(1); });
