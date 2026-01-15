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
// Ensure window.firebaseConfig is available for module scripts
if (!window.firebaseConfig && (__cfgFromQuery || __cfgFromLocal)) {
    window.firebaseConfig = __cfgFromQuery || __cfgFromLocal;
}
const firebaseConfig = window.firebaseConfig || window.__FIREBASE_CONFIG || null;

try {
    if (firebaseConfig && firebaseConfig.apiKey) {
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
    if (firebase.apps.length) {
        window.auth = firebase.auth();
        window.auth.useDeviceLanguage();
        window.db = firebase.firestore();
    }
} catch (_) {}
