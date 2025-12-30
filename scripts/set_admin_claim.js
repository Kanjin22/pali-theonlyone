const fs = require('fs');
let admin;
try { admin = require('firebase-admin'); } catch { process.exit(1); }
const p = 'D:/pali-dhatu-app/service-account-key.json';
if (!fs.existsSync(p)) process.exit(1);
admin.initializeApp({ credential: admin.credential.cert(require(p)) });
const args = process.argv.slice(2);
function arg(name) {
  const i = args.findIndex(a => a === name || a.startsWith(name + '='));
  if (i === -1) return null;
  const a = args[i];
  if (a.includes('=')) return a.split('=').slice(1).join('=');
  return args[i + 1] || null;
}
async function run() {
  const email = arg('--email');
  const revoke = args.includes('--revoke');
  if (!email) { console.error('Missing --email'); process.exit(1); }
  const user = await admin.auth().getUserByEmail(email);
  if (revoke) {
    await admin.auth().setCustomUserClaims(user.uid, {});
    console.log('Revoked admin for', email);
  } else {
    await admin.auth().setCustomUserClaims(user.uid, { admin: true, roles: ['admin'] });
    console.log('Granted admin for', email);
  }
}
run().catch(e => { console.error(e.message || e); process.exit(1); });
