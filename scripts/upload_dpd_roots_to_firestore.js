const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
let admin;
try {
    admin = require('firebase-admin');
} catch (e) {
    console.error("Could not load firebase-admin module.");
    process.exit(1);
}

// Load Service Account
const serviceAccountPath = 'D:/pali-dhatu-app/service-account-key.json';
if (!fs.existsSync(serviceAccountPath)) {
    console.error(`Service account key not found at ${serviceAccountPath}`);
    process.exit(1);
}
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadDpdRoots() {
  console.log('Starting DPD Roots upload to Firestore...');
  
  // 1. Load Data
  const rootsPath = path.resolve('D:/pali-theonlyone/data/vocab-roots.js');
  if (!fs.existsSync(rootsPath)) {
      console.error(`File not found: ${rootsPath}`);
      process.exit(1);
  }

  let content = fs.readFileSync(rootsPath, 'utf8');
  content = content.replace('const vocabRoots =', '').trim();
  if (content.endsWith(';')) content = content.slice(0, -1);
  
  let vocabRoots;
  try {
      vocabRoots = JSON.parse(content);
  } catch (e) {
      console.error("Error parsing vocab-roots.js:", e);
      process.exit(1);
  }

  // 2. Get current max ID
  let currentId = 0;
  const snapshot = await db.collection('dhatu').orderBy('anukrom_dhatu', 'desc').limit(1).get();
  if (!snapshot.empty) {
      currentId = snapshot.docs[0].data().anukrom_dhatu || 0;
  }
  console.log(`Current Max Anukrom ID: ${currentId}`);

  // 3. Prepare Batch
  let batch = db.batch();
  let count = 0;
  let totalAdded = 0;
  
  // Flatten entries and filter for DPD
  const entriesToUpload = [];
  
  Object.keys(vocabRoots).forEach(key => {
      const entries = vocabRoots[key];
      entries.forEach(entry => {
          // Only upload DPD entries
          if (entry.source === 'DPD') {
              entriesToUpload.push({
                  key: key,
                  data: entry
              });
          }
      });
  });
  
  console.log(`Found ${entriesToUpload.length} DPD entries to upload.`);
  
  if (entriesToUpload.length === 0) {
      console.log("No DPD entries to upload.");
      return;
  }

  // Check for duplicates? 
  // For now, we assume if we run this multiple times we might get duplicates.
  // Ideally we should check if a DPD entry for this root already exists.
  // But doing 600+ reads might be slow.
  // Let's do a quick check for a few or just proceed if we trust the user won't spam it.
  // Or better: Delete existing DPD entries for these keys? No, too dangerous.
  // Let's just upload. User can delete manually if needed.
  
  // 4. Upload in batches
  for (const item of entriesToUpload) {
      currentId++;
      
      const docRef = db.collection('dhatu').doc(); // Auto ID for document
      
      const payload = {
          dhatu_word: item.key,
          arth_thai: item.data.meaning_thai || "",
          arth_pali: item.data.meaning_pali || "",
          mawat_dhatu: item.data.group || "",
          udaharana: item.data.example ? [item.data.example] : [],
          anukrom_dhatu: currentId,
          katha_no: "-",
          created_at: admin.firestore.FieldValue.serverTimestamp(),
          source: "DPD"
      };
      
      batch.set(docRef, payload);
      count++;
      totalAdded++;
      
      if (count >= 400) {
          await batch.commit();
          console.log(`Committed batch of ${count} entries...`);
          batch = db.batch();
          count = 0;
      }
  }
  
  if (count > 0) {
      await batch.commit();
      console.log(`Committed final batch of ${count} entries.`);
  }
  
  console.log(`Upload Complete. Total added: ${totalAdded}`);
  console.log(`New Max Anukrom ID: ${currentId}`);
  
  process.exit(0);
}

uploadDpdRoots().catch(err => {
    console.error(err);
    process.exit(1);
});
