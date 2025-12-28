const fs = require('fs');
const path = require('path');

// Try to load firebase-admin from the other project
let admin;
try {
    admin = require('D:/pali-dhatu-app/node_modules/firebase-admin');
} catch (e) {
    console.error("Could not load firebase-admin from D:/pali-dhatu-app/node_modules");
    console.error(e);
    process.exit(1);
}

// Load Service Account
const serviceAccountPath = 'D:/pali-dhatu-app/service-account-key.json';
if (!fs.existsSync(serviceAccountPath)) {
    console.error(`Service account key not found at ${serviceAccountPath}`);
    process.exit(1);
}
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadRoots() {
  console.log('Starting upload to Firestore...');
  
  // 1. Load Data
  const rootsPath = path.resolve('D:/pali-theonlyone/data/vocab-roots.js');
  let content = fs.readFileSync(rootsPath, 'utf8');
  content = content.replace('const vocabRoots =', '').trim();
  if (content.endsWith(';')) content = content.slice(0, -1);
  const vocabRoots = JSON.parse(content);

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
  
  // Flatten entries
  const entriesToUpload = [];
  
  Object.keys(vocabRoots).forEach(key => {
      const entries = vocabRoots[key];
      entries.forEach(entry => {
          // Skip if it came from the App originally
          if (entry._source && (entry._source === 'App' || entry._source.includes('App'))) {
              return;
          }
          
          entriesToUpload.push({
              key: key,
              data: entry
          });
      });
  });
  
  console.log(`Found ${entriesToUpload.length} new entries to upload.`);
  
  if (entriesToUpload.length === 0) {
      console.log("No new entries to upload.");
      return;
  }

  // 4. Upload in batches
  for (const item of entriesToUpload) {
      currentId++;
      
      const docRef = db.collection('dhatu').doc(); // Auto ID for document
      
      const payload = {
          dhatu_word: item.key,
          arth_thai: item.data.meaning || "",
          arth_pali: "", // Leave empty for scraped data as it's mixed
          mawat_dhatu: item.data.group || "",
          udaharana: item.data.example ? [item.data.example] : [],
          anukrom_dhatu: currentId,
          katha_no: "-",
          created_at: admin.firestore.FieldValue.serverTimestamp(),
          source: "palidict_scrape" // Mark source so we know
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

uploadRoots().catch(err => {
    console.error(err);
    process.exit(1);
});
