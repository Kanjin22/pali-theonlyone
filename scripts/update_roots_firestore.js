const fs = require('fs');
const path = require('path');

// Try to load firebase-admin from the other project
let admin;
try {
    admin = require('D:/pali-dhatu-app/node_modules/firebase-admin');
} catch (e) {
    console.error("Could not load firebase-admin from D:/pali-dhatu-app/node_modules");
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

async function updateRoots() {
  console.log('Starting root update...');
  
  // 1. Load Data
  const rootsPath = path.resolve('D:/pali-theonlyone/data/vocab-roots.js');
  let content = fs.readFileSync(rootsPath, 'utf8');
  content = content.replace('const vocabRoots =', '').trim();
  if (content.endsWith(';')) content = content.slice(0, -1);
  const vocabRoots = JSON.parse(content);

  // 2. Identify entries with example_school
  const updates = [];
  
  Object.keys(vocabRoots).forEach(key => {
      const entries = vocabRoots[key];
      entries.forEach(entry => {
          if (entry.example_school) {
              updates.push({
                  root: key,
                  group: entry.group,
                  example_school: entry.example_school
              });
          }
      });
  });
  
  console.log(`Found ${updates.length} entries to update with example_school.`);
  
  if (updates.length === 0) {
      console.log("No updates found.");
      return;
  }

  // 3. Process Updates
  let updatedCount = 0;
  
  for (const item of updates) {
      console.log(`Processing ${item.root} (${item.group})...`);
      
      const snapshot = await db.collection('dhatu')
          .where('dhatu_word', '==', item.root)
          .get();
          
      if (snapshot.empty) {
          console.log(`  - No document found for ${item.root}`);
          continue;
      }
      
      const batch = db.batch();
      let matchFound = false;
      
      snapshot.forEach(doc => {
          const data = doc.data();
          // Heuristic to match group (mawat_dhatu)
          // Data in Firestore might be "ภู (อ)" or just "ภู"
          // We check if Firestore group includes our group keyword or vice versa
          
          const dbGroup = data.mawat_dhatu || "";
          const localGroup = item.group || "";
          
          // Simple inclusion check
          if (dbGroup === localGroup || (dbGroup && localGroup.includes(dbGroup.split(' ')[0]))) {
              // Update
              batch.update(doc.ref, { 
                  udaharana_school: item.example_school,
                  updated_at: admin.firestore.FieldValue.serverTimestamp()
              });
              matchFound = true;
          }
      });
      
      if (matchFound) {
          await batch.commit();
          console.log(`  - Updated.`);
          updatedCount++;
      } else {
          console.log(`  - No matching group found for ${item.root} (Local: ${item.group})`);
      }
  }
  
  console.log(`Update Complete. Total roots updated: ${updatedCount}`);
  process.exit(0);
}

updateRoots().catch(err => {
    console.error(err);
    process.exit(1);
});
