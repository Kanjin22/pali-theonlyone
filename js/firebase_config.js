// Firebase Configuration
// ⚠️  WARNING: These values should be loaded from environment variables in production
// For now, replace with actual values from your Firebase Console
// Visit: https://console.firebase.google.com/project/YOUR_PROJECT/settings/general

const firebaseConfig = {
    apiKey: window.__FIREBASE_CONFIG?.apiKey || "AIzaSyC3ib32Tk9p40p2Z2j30Yogxy0lR8vSM28",
    authDomain: window.__FIREBASE_CONFIG?.authDomain || "palitest-generator.firebaseapp.com",
    projectId: window.__FIREBASE_CONFIG?.projectId || "palitest-generator",
    appId: window.__FIREBASE_CONFIG?.appId || "1:844040146831:web:b19c0a8a5493299f6ec5fa",
    messagingSenderId: window.__FIREBASE_CONFIG?.messagingSenderId || "844040146831",
    storageBucket: window.__FIREBASE_CONFIG?.storageBucket || "palitest-generator.firebasestorage.app",
    measurementId: window.__FIREBASE_CONFIG?.measurementId || "G-RKML6H6EX7"
};

// 🔐 IMPORTANT: In production, use Cloud Functions or backend to inject config
// DO NOT expose sensitive credentials in client-side code
// See: https://firebase.google.com/docs/projects/learn-more

// Initialize Firebase if not already initialized
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
    // Fail gracefully if Firebase config is missing
}

// Global Exports
window.firebaseConfig = firebaseConfig;
window.auth = firebase.auth();
window.auth.useDeviceLanguage();
window.db = firebase.firestore();
