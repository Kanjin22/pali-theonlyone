function __readQueryConfig() {
    try {
        const params = new URLSearchParams(location.search);
        const raw = params.get('firebaseConfig') || params.get('fbcfg') || params.get('cfg');
        if (!raw) return null;
        const decoded = /^[A-Za-z0-9+/=]+$/.test(raw) ? atob(raw) : raw;
        const obj = JSON.parse(decoded);
        localStorage.setItem('firebaseConfig', JSON.stringify(obj));
        return obj;
    } catch (_) { return null; }
}

function __readLocalConfig() {
    try {
        const s = localStorage.getItem('firebaseConfig');
        if (!s) return null;
        return JSON.parse(s);
    } catch (_) { return null; }
}

const __cfgFromQuery = __readQueryConfig();
const __cfgFromLocal = __readLocalConfig();

// Fallback config for GitHub Pages or environments where config.js is missing
const __defaultConfig = {
  apiKey: "AIzaSyC3ib32Tk9p40p2Z2j30Yogxy0lR8vSM28",
  authDomain: "palitest-generator.firebaseapp.com",
  projectId: "palitest-generator",
  storageBucket: "palitest-generator.firebasestorage.app",
  messagingSenderId: "844040146831",
  appId: "1:844040146831:web:b19c0a8a5493299f6ec5fa",
  measurementId: "G-RKML6H6EX7"
};

// Ensure window.firebaseConfig is available for module scripts
if (!window.firebaseConfig && (__cfgFromQuery || __cfgFromLocal)) {
    window.firebaseConfig = __cfgFromQuery || __cfgFromLocal;
}
const firebaseConfig = window.firebaseConfig || window.__FIREBASE_CONFIG || __defaultConfig;
// Ensure it is available globally for module scripts
window.firebaseConfig = firebaseConfig;

try {
    if (firebaseConfig && firebaseConfig.apiKey && typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app();
        }
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

window.firebaseConfig = firebaseConfig || {};

try {
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
        window.auth = firebase.auth();
        window.auth.useDeviceLanguage();
        window.db = firebase.firestore();
    }
} catch (_) {}
