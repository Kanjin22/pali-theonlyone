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

const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH || 'D:/pali-dhatu-app/service-account-key.json';
if (!fs.existsSync(serviceAccountPath)) {
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath))
});

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.use(express.json());

const defaultAdmins = ['pali.theonlyone@gmail.com','setthachayo@gmail.com'];
const envAdmins = (process.env.ALLOWLIST_ADMINS || '').split(',').map(s => s.trim()).filter(Boolean);
const allowedAdminEmails = new Set([...defaultAdmins, ...envAdmins]);

let isRunning = false;

function readJsonFromJs(path, prefix) {
  if (!fs.existsSync(path)) return null;
  const txt = fs.readFileSync(path, 'utf8').trim();
  let s = txt;
  if (prefix) s = s.replace(prefix, '').trim();
  if (s.endsWith(';')) s = s.slice(0, -1);
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function computeDPDDiff(oldObj, newObj) {
  const oldKeys = new Set(Object.keys(oldObj || {}));
  const newKeys = new Set(Object.keys(newObj || {}));
  const newWords = [...newKeys].filter(k => !oldKeys.has(k));
  const removedWords = [...oldKeys].filter(k => !newKeys.has(k));
  const changedWords = [];
  for (const k of oldKeys) {
    if (newKeys.has(k) && (oldObj[k] !== newObj[k])) changedWords.push(k);
  }
  return {
    newCount: newWords.length,
    removedCount: removedWords.length,
    changedCount: changedWords.length,
    samples: {
      new: newWords.slice(0, 20),
      removed: removedWords.slice(0, 20),
      changed: changedWords.slice(0, 20)
    }
  };
}

function normalizeEntry(e) {
  return {
    root: e.root || e.dhatu_word || '',
    group: e.group || e.mawat_dhatu || '',
    thai: e.meaning_thai || e.arth_thai || '',
    pali: e.meaning_pali || e.arth_pali || '',
    source: e.source || ''
  };
}

function computeRootsDiff(oldObj, newObj) {
  const oldKeys = new Set(Object.keys(oldObj || {}));
  const newKeys = new Set(Object.keys(newObj || {}));
  const newRootKeys = [...newKeys].filter(k => !oldKeys.has(k));
  const removedRootKeys = [...oldKeys].filter(k => !newKeys.has(k));
  let newEntries = 0;
  let removedEntries = 0;
  let changedEntries = 0;
  let newDPDEntries = 0;
  const changedKeys = [];
  for (const k of newKeys) {
    const oldArr = (oldObj && oldObj[k]) || [];
    const newArr = newObj[k] || [];
    const oldNorm = oldArr.map(normalizeEntry);
    const newNorm = newArr.map(normalizeEntry);
    const oldSig = new Set(oldNorm.map(x => JSON.stringify(x)));
    const newSig = new Set(newNorm.map(x => JSON.stringify(x)));
    const adds = [...newSig].filter(x => !oldSig.has(x));
    const rems = [...oldSig].filter(x => !newSig.has(x));
    if (adds.length || rems.length) changedKeys.push(k);
    newEntries += adds.length;
    removedEntries += rems.length;
    newDPDEntries += adds.filter(x => JSON.parse(x).source === 'DPD').length;
    const potentialUpdates = Math.min(oldNorm.length, newNorm.length);
    if (potentialUpdates && (adds.length || rems.length)) changedEntries += Math.max(adds.length, rems.length);
  }
  return {
    newRootKeys: newRootKeys.length,
    removedRootKeys: removedRootKeys.length,
    newEntries,
    removedEntries,
    changedEntries,
    newDPDEntries,
    samples: {
      newKeys: newRootKeys.slice(0, 20),
      removedKeys: removedRootKeys.slice(0, 20),
      changedKeys: changedKeys.slice(0, 20)
    }
  };
}

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

app.get('/', (req, res) => {
  res.send('Pali TheOnlyone API Server is running');
});

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

app.get('/api/ping', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/dpd-update-report', async (req, res) => {
  const ok = await verifyAdmin(req);
  if (!ok) {
    return res.status(403).json({ ok: false, error: 'forbidden' });
  }
  if (isRunning) {
    return res.status(409).json({ ok: false, error: 'busy' });
  }
  isRunning = true;
  const oldDPD = readJsonFromJs('data/raw/vocab-dpd.js', 'const vocabDPD = ');
  const oldRoots = readJsonFromJs('data/raw/vocab-roots-dpd.js', 'const vocabRootsDPD = ');
  const args = ['scripts/update_dpd_data.py'];
  const skip = req.body && req.body.skip === true;
  if (skip) args.push('--skip-download');
  const py = spawn('python', args, { shell: true });
  let out = '';
  let err = '';
  py.stdout.on('data', d => (out += d.toString()));
  py.stderr.on('data', d => (err += d.toString()));
  py.on('close', code => {
    const newDPD = readJsonFromJs('data/raw/vocab-dpd.js', 'const vocabDPD = ');
    const newRoots = readJsonFromJs('data/raw/vocab-roots-dpd.js', 'const vocabRootsDPD = ');
    const dpdDiff = computeDPDDiff(oldDPD || {}, newDPD || {});
    const rootsDiff = computeRootsDiff(oldRoots || {}, newRoots || {});
    
    isRunning = false;
    if (code !== 0) {
      res.status(500).json({
        ok: false,
        error: (err && err.toString()) || 'script_failed',
        dpd: dpdDiff,
        roots: rootsDiff,
        logTail: (out || '').slice(-1000)
      });
    } else {
      res.json({
        ok: true,
        dpd: dpdDiff,
        roots: rootsDiff,
        logTail: (out || '').slice(-1000)
      });
    }
  });
});

app.get('/api/dpd-stats', (_req, res) => {
  res.json({
    vocab: parseWithPrefixes('data/raw/vocab-dpd.js', ['const vocabDPD = ']),
    roots: parseWithPrefixes('data/raw/vocab-roots-dpd.js', ['export const dpdRoots = ', 'const vocabRootsDPD = '])
  });
});

const parseWithPrefixes = (p, prefixes) => {
  if (!fs.existsSync(p)) return null;
  const s = fs.statSync(p);
  let count = 0;
  try {
    const txt = fs.readFileSync(p, 'utf8').trim();
    let payload = txt;
    // Strip BOM
    if (payload.charCodeAt(0) === 0xFEFF) {
      payload = payload.slice(1);
    }
    for (const pref of prefixes) {
      if (payload.startsWith(pref)) {
        payload = payload.slice(pref.length).trim();
        break;
      }
    }
    if (payload.endsWith(';')) payload = payload.slice(0, -1);
    const obj = JSON.parse(payload);
    if (Array.isArray(obj)) {
      count = obj.length;
    } else {
      count = Object.keys(obj).length;
    }
  } catch {}
  return { mtime: s.mtime, size: s.size, count };
};

app.get('/api/raw-files-stats', (_req, res) => {
  res.json({
    general_dpd: parseWithPrefixes('data/raw/vocab-general-dpd.js', ['export const dpdVocab = ']),
    roots_dpd: parseWithPrefixes('data/raw/vocab-roots-dpd.js', ['export const dpdRoots = ', 'const vocabRootsDPD = ']),
    tananunto: parseWithPrefixes('data/raw/vocab-tananunto.js', ['const vocabTananunto = ']),
    bhumibalo: parseWithPrefixes('data/raw/vocab-bhumibalo.js', ['const vocabBhumibalo = ']),
    jinakalamalini: parseWithPrefixes('data/raw/vocab-jinakalamalini.js', ['const vocabJinakalamalini = ']),
    general_raw: parseWithPrefixes('data/raw/vocab-general.js', ['const vocabGeneralRaw = ']),
    derived_roots_dpd: parseWithPrefixes('data/raw/vocab-roots-dpd-derived.js', ['const vocabRootsDPDDerived = ']),
    extra_enthai: parseWithPrefixes('data/vocab-enthai.js', ['const vocabEnThai = ']),
    extra_ipa: parseWithPrefixes('data/vocab-ipa.js', ['const vocabIPA = ']),
    extra_pts: parseWithPrefixes('data/vocab-pts.js', ['const vocabPTS = ']),
    extra_dppn: parseWithPrefixes('data/vocab-dppn.js', ['const vocabDPPN = ']),
    extra_dhammika: parseWithPrefixes('data/vocab-dhammika.js', ['const vocabDhammika = ']),
    extra_sc: parseWithPrefixes('data/vocab-sc.js', ['const vocabSC = ']),
    extra_sandhi: parseWithPrefixes('data/vocab-sandhi.js', ['const vocabSandhi = ']),
    extra_general: parseWithPrefixes('data/vocab-general.js', ['const vocabGeneral = '])
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {});
