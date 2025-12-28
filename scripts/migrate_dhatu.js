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

async function exportDhatus() {
  console.log('Starting export from Firestore...');
  try {
    const snapshot = await db.collection('dhatu').get();
    
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    console.log(`Found ${snapshot.size} documents.`);

    const rootsMap = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      const rootWord = data.dhatu_word ? data.dhatu_word.trim() : "";
      
      if (!rootWord) return;

      // Map to our project's format
      const entry = {
        meaning: data.arth_thai || "",
        meaning_pali: data.arth_pali || "",
        example: Array.isArray(data.udaharana) ? data.udaharana.join(' | ') : (data.udaharana || ""),
        group: data.mawat_dhatu || "",
        id: data.anukrom_dhatu || 0,
        ref: data.katha_no || ""
      };

      if (!rootsMap[rootWord]) {
        rootsMap[rootWord] = [];
      }
      rootsMap[rootWord].push(entry);
    });

    // Write to file
    const outputPath = path.resolve('D:/pali-theonlyone/data/vocab-roots-firebase.js');
    const fileContent = `const vocabRoots = ${JSON.stringify(rootsMap, null, 2)};\n\n// Exported from Pali Dhatu App (Firebase) on ${new Date().toISOString()}`;
    
    fs.writeFileSync(outputPath, fileContent, 'utf8');
    console.log(`Successfully exported to ${outputPath}`);

  } catch (err) {
    console.error('Error getting documents', err);
  } finally {
    process.exit(0);
  }
}

exportDhatus();
