const fs = require('fs');
const path = require('path');

// Setup Firebase Admin
let admin;
try {
    admin = require('D:/pali-dhatu-app/node_modules/firebase-admin');
} catch (e) {
    console.error("Could not load firebase-admin from D:/pali-dhatu-app/node_modules");
    process.exit(1);
}

const serviceAccountPath = 'D:/pali-dhatu-app/service-account-key.json';
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function getDhatu() {
    const word = "สคิ";
    console.log(`Searching for word: ${word}...`);
    
    try {
        const snapshot = await db.collection('dhatu').where('dhatu_word', '==', word).get();
        
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', JSON.stringify(doc.data(), null, 2));
        });
    } catch (err) {
        console.error('Error getting documents:', err);
    }
}

getDhatu();
