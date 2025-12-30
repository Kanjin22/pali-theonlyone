const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');

let admin;
try {
  admin = require('firebase-admin');
} catch {
  process.exit(1);
}

const serviceAccountPath = 'D:/pali-dhatu-app/service-account-key.json';
if (!fs.existsSync(serviceAccountPath)) {
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath))
});

const app = express();
app.use(cors());
app.use(express.json());

const allowedAdminEmails = new Set([
  'pali.theonlyone@gmail.com'
]);

let isRunning = false;

async function verifyAdmin(req) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return false;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const isAdminClaim = decoded.admin === true || (decoded.roles && decoded.roles.includes('admin'));
    const isAllowedEmail = decoded.email && allowedAdminEmails.has(decoded.email);
    return isAdminClaim || isAllowedEmail;
  } catch {
    return false;
  }
}

app.get('/api/is-admin', async (req, res) => {
  const ok = await verifyAdmin(req);
  res.json({ isAdmin: ok });
});

app.post('/api/dpd-update', async (req, res) => {
  const ok = await verifyAdmin(req);
  if (!ok) {
    return res.status(403).json({ ok: false, error: 'forbidden' });
  }
  if (isRunning) {
    return res.status(409).json({ ok: false, error: 'busy' });
  }
  isRunning = true;
  const skip = req.body && req.body.skip === true;
  const args = ['scripts/update_dpd_data.py'];
  if (skip) args.push('--skip-download');
  const py = spawn('python', args, { shell: true });
  let out = '';
  let err = '';
  py.stdout.on('data', d => (out += d.toString()));
  py.stderr.on('data', d => (err += d.toString()));
  py.on('close', code => {
    isRunning = false;
  });
  res.json({ ok: true, started: true });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {});
