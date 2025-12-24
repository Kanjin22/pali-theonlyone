// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3ib32Tk9p40p2Z2j30Yogxy0lR8vSM28",
    authDomain: "palitest-generator.firebaseapp.com",
    projectId: "palitest-generator",
    appId: "1:844040146831:web:b19c0a8a5493299f6ec5fa",
    messagingSenderId: "844040146831",
    storageBucket: "palitest-generator.firebasestorage.app",
    measurementId: "G-RKML6H6EX7"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

// Global Exports (optional, for explicit usage)
window.firebaseConfig = firebaseConfig;
