const firebaseConfig = window.__FIREBASE_CONFIG || {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

try {
    if (!firebase.apps.length) {
        if (!firebaseConfig || !firebaseConfig.apiKey) {
            throw new Error("Missing Firebase configuration");
        }
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

window.firebaseConfig = firebaseConfig;

try {
    window.auth = firebase.auth();
    window.auth.useDeviceLanguage();
    window.db = firebase.firestore();
} catch (e) {}
