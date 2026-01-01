const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1. Initialize Firebase
// Support both local file and env variable
const serviceAccountPath = path.join(__dirname, '../service-account-key.json');
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var");
        process.exit(1);
    }
} else if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath);
} else {
    // Try D:/pali-dhatu-app/ location for local dev
    const localDevPath = 'D:/pali-dhatu-app/service-account-key.json';
    if (fs.existsSync(localDevPath)) {
        serviceAccount = require(localDevPath);
    } else {
        console.error("No service account found. Please set FIREBASE_SERVICE_ACCOUNT env var or place service-account-key.json");
        process.exit(1);
    }
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. Fetch Data
async function fetchRoots() {
    console.log("Fetching roots from Firestore (collection: dhatu)...");
    try {
        const snapshot = await db.collection('dhatu').orderBy('anukrom_dhatu').get();
        
        if (snapshot.empty) {
            console.log("No documents found in 'dhatu' collection.");
            return;
        }

        const rootsMap = {};
        let count = 0;

        snapshot.forEach(doc => {
            const data = doc.data();
            const key = data.dhatu_word || doc.id;
            
            // Format to match vocab-roots.js structure approximately
            // Or keep it raw?
            // The backup file vocab-roots-firebase.js uses a grouped map structure.
            
            const entry = {
                root: data.dhatu_word,
                meaning_pali: data.arth_pali,
                meaning_thai: data.arth_thai,
                example: data.udaharana, // Array
                group: data.mawat_dhatu,
                page: data.ref || "", // Some fields might differ
                source: data.source || "App",
                id: data.anukrom_dhatu,
                // Add extra fields if needed
                created_at: data.created_at ? data.created_at.toDate().toISOString() : null,
                updated_at: data.updated_at ? data.updated_at.toDate().toISOString() : null
            };

            if (!rootsMap[key]) {
                rootsMap[key] = [];
            }
            rootsMap[key].push(entry);
            count++;
        });

        console.log(`Fetched ${count} roots.`);

        // 3. Write to file
        const outputPath = path.join(__dirname, '../data/raw/backup/vocab-roots-firebase.js');
        // Ensure dir exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const fileContent = `const vocabRoots = ${JSON.stringify(rootsMap, null, 2)};\n`;
        fs.writeFileSync(outputPath, fileContent, 'utf8');
        console.log(`Saved to ${outputPath}`);

    } catch (error) {
        console.error("Error fetching roots:", error);
        process.exit(1);
    }
}

fetchRoots();
