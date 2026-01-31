# Firebase Deployment Guide

## 1. Install Firebase CLI
```
npm install -g firebase-tools
```

## 2. Login to Firebase
```
firebase login
```

## 3. Select Your Firebase Project
```
firebase use --add
```

## 4. Deploy Firestore Rules
```
firebase deploy --only firestore:rules
```

## 5. Deploy Storage Rules
```
firebase deploy --only storage
```

## 6. Deploy Hosting
```
firebase deploy --only hosting
```

## 7. Deploy All at Once
```
firebase deploy
```

## 8. Post-Deployment Checklist
- Visit your site: https://<project-id>.web.app
- Check Firestore/Storage/Rules in Firebase Console
- Review logs and errors in Firebase Console

---
**Notes:**
- Ensure `config.js` and `service-account-key.json` are correct before deploying.
- Test security rules with Firebase Emulator or a staging environment before production.
- Always review logs after deployment.
