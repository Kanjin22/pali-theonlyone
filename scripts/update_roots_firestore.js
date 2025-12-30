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
// Use the key from the main app directory to avoid duplicating secrets
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

async function updateRoots() {
  console.log('Starting root update...');
  
  // 1. Load Data
  const rootsPath = path.resolve('D:/pali-theonlyone/data/vocab-roots.js');
  let content = fs.readFileSync(rootsPath, 'utf8');
  content = content.replace('const vocabRoots =', '').trim();
  if (content.endsWith(';')) content = content.slice(0, -1);
  const vocabRoots = JSON.parse(content);

  // 2. Process Entries
  const batchSize = 400;
  let batch = db.batch();
  let count = 0;
  let totalUpdated = 0;
  let totalCreated = 0;
  
  const rootKeys = Object.keys(vocabRoots);
  console.log(`Processing ${rootKeys.length} roots...`);

  for (const rootKey of rootKeys) {
      const entries = vocabRoots[rootKey];
      for (const entry of entries) {
          
          // We mainly want to sync DPD entries to ensure daily updates are reflected.
          // For other entries (Palidict/Manual), we sync if we find a match to update example_school.
          
          // Query by root word
          const snapshot = await db.collection('dhatu')
              .where('dhatu_word', '==', entry.root)
              .get();
          
          let docRef = null;
          let isNew = true;

          // Try to find a matching document
          snapshot.forEach(doc => {
              const data = doc.data();
              
              // Match Logic:
              // 1. DPD Source: Match word + group + source="DPD". 
              if (entry.source === 'DPD') {
                  if (data.source === 'DPD' && data.mawat_dhatu === entry.group) {
                      // Found existing DPD entry for this root/group
                      docRef = doc.ref;
                      isNew = false;
                  }
              } 
              // 2. Legacy/Other Sources: Match word + group (fuzzy)
              else {
                   const dbGroup = data.mawat_dhatu || "";
                   const localGroup = entry.group || "";
                   // If groups match or one contains the other (e.g. "ภู (อ)" vs "ภู")
                   // And NOT a DPD entry in DB (don't overwrite DPD with non-DPD)
                   if (data.source !== 'DPD' && (dbGroup === localGroup || (dbGroup && localGroup.includes(dbGroup.split(' ')[0])))) {
                       docRef = doc.ref;
                       isNew = false;
                   }
              }
          });

          // Policy: 
          // - If DPD entry and not found -> Create New
          // - If Non-DPD entry and not found -> Skip (don't auto-create manual entries from script yet, safety first)
          // - If Found -> Update
          
          if (!docRef) {
              if (entry.source === 'DPD') {
                  docRef = db.collection('dhatu').doc();
                  isNew = true;
              } else {
                  continue; 
              }
          }

          const dataToSave = {
              dhatu_word: entry.root,
              mawat_dhatu: entry.group,
              arth_pali: entry.meaning_pali,
              arth_thai: entry.meaning_thai,
              udaharana: entry.example,
              udaharana_school: entry.example_school || null,
              page: entry.page || "",
              source: entry.source || "",
              updated_at: admin.firestore.FieldValue.serverTimestamp()
          };
          
          if (isNew) {
               batch.set(docRef, dataToSave);
               totalCreated++;
          } else {
               batch.update(docRef, dataToSave);
               totalUpdated++;
          }
          
          count++;
          if (count >= batchSize) {
              await batch.commit();
              batch = db.batch();
              count = 0;
              console.log(`Committed batch...`);
          }
      }
  }
  
  if (count > 0) {
      await batch.commit();
  }
  console.log(`Done. Created: ${totalCreated}, Updated: ${totalUpdated}`);
}

updateRoots().catch(err => {
    console.error(err);
    process.exit(1);
});
