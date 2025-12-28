const fs = require('fs');
const admin = require('D:/pali-dhatu-app/node_modules/firebase-admin');
const serviceAccount = require('D:/pali-dhatu-app/service-account-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function fixDhatu() {
    console.log("Fixing 'สคิ' documents...");

    // 1. Fix E5UlnWkvnm6OrQOfsiam (Matches vocab-roots entry 2)
    // Source: vocab-roots.js -> meaning_pali: "คมเน", meaning_thai: "ไป, ถึง, เป็นไป"
    try {
        await db.collection('dhatu').doc('E5UlnWkvnm6OrQOfsiam').update({
            arth_pali: "คมเน",
            arth_thai: "ไป, ถึง, เป็นไป",
            // udaharana is ["สงฺคติ สงฺคนํ"] which is okay-ish, but let's keep it.
        });
        console.log("Updated E5UlnWkvnm6OrQOfsiam successfully.");
    } catch (err) {
        console.error("Error updating E5UlnWkvnm6OrQOfsiam:", err);
    }

    // 2. Fix OcnhrL4eR9WoIrtgMuty (Matches vocab-roots entry 1)
    // Source: vocab-roots.js -> meaning_pali: "คตฺยํ", meaning_thai: "ไป, ถึง, บรรลุ"
    try {
        await db.collection('dhatu').doc('OcnhrL4eR9WoIrtgMuty').update({
            arth_pali: "คตฺยํ",
            arth_thai: "ไป, ถึง, บรรลุ",
            // udaharana currently ["สงฺคติ.สงฺคนํการไป."] -> Let's format it better if we want, 
            // but the main issue was arth_pali/arth_thai.
            // I'll leave udaharana as is for now unless I parse it.
        });
        console.log("Updated OcnhrL4eR9WoIrtgMuty successfully.");
    } catch (err) {
        console.error("Error updating OcnhrL4eR9WoIrtgMuty:", err);
    }
}

fixDhatu();
