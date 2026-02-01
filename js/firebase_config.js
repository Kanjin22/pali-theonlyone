// Firebase Configuration
// Cleaned up config.js references and embedded credentials directly
function __readQueryConfig() {
    try {
        var params = new URLSearchParams(location.search);
        var raw = params.get('firebaseConfig') || params.get('fbcfg') || params.get('cfg');
        if (!raw) return null;
        var decoded = /^[A-Za-z0-9+/=]+$/.test(raw) ? atob(raw) : raw;
        var obj = JSON.parse(decoded);
        localStorage.setItem('firebaseConfig', JSON.stringify(obj));
        return obj;
    } catch (_) { return null; }
}

function __readLocalConfig() {
    try {
        var s = localStorage.getItem('firebaseConfig');
        if (!s) return null;
        return JSON.parse(s);
    } catch (_) { return null; }
}

var __cfgFromQuery = __readQueryConfig();
var __cfgFromLocal = __readLocalConfig();

// Fallback config for GitHub Pages or environments where config.js is missing
var __defaultConfig = {
  apiKey: "AIzaSyC3ib32Tk9p40p2Z2j30Yogxy0lR8vSM28",
  authDomain: "palitest-generator.firebaseapp.com",
  projectId: "palitest-generator",
  storageBucket: "palitest-generator.firebasestorage.app",
  messagingSenderId: "844040146831",
  appId: "1:844040146831:web:b19c0a8a5493299f6ec5fa",
  measurementId: "G-RKML6H6EX7"
};

// Helper to check if config is placeholder
var isPlaceholderConfig = function(cfg) { return cfg && cfg.apiKey === "YOUR_API_KEY_HERE"; };

// Aggressively clear global placeholder if present
if (isPlaceholderConfig(window.firebaseConfig)) {
    window.firebaseConfig = undefined;
}

// Ensure window.firebaseConfig is available for module scripts
// Use var to avoid "Identifier has already been declared" if script is loaded twice
var candidateConfig = window.firebaseConfig || __cfgFromQuery || __cfgFromLocal;

// If the candidate config is just a placeholder, ignore it so we can try config.js
if (isPlaceholderConfig(candidateConfig)) {
    candidateConfig = null;
    // Also clear from localStorage if it was the source of the bad config
    if (__cfgFromLocal && isPlaceholderConfig(__cfgFromLocal)) {
        try { localStorage.removeItem('firebaseConfig'); } catch(e) {}
    }
}

if (!window.firebaseConfig && candidateConfig) {
    window.firebaseConfig = candidateConfig;
}

var firebaseConfig = window.firebaseConfig || window.__FIREBASE_CONFIG || __defaultConfig;
// Ensure it is available globally for module scripts
window.firebaseConfig = firebaseConfig;

try {
    var isPlaceholder = firebaseConfig.apiKey === "YOUR_API_KEY_HERE";
    if (!isPlaceholder && firebaseConfig && firebaseConfig.apiKey && typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // Already initialized
        }
    } else if (isPlaceholder) {
        console.warn("Firebase config is using placeholders. Firebase will not be initialized.");
    }
} catch (e) {
    console.error("Firebase initialization failed:", e);
}

window.firebaseConfig = firebaseConfig || {};

try {
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
        window.auth = firebase.auth();
        if (window.auth.useDeviceLanguage) {
             window.auth.useDeviceLanguage();
        }
        window.db = firebase.firestore();
    }
} catch (_) {}
