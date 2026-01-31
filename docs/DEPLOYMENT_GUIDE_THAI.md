# คู่มือ Deploy ระบบ (Firebase)

## 1. ติดตั้ง Firebase CLI
```
npm install -g firebase-tools
```

## 2. Login ด้วยบัญชี Google
```
firebase login
```

## 3. เลือก Project Firebase
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

## 7. Deploy ทุกอย่างพร้อมกัน
```
firebase deploy
```

## 8. ตรวจสอบหลัง Deploy
- เปิดหน้าเว็บ: https://<project-id>.web.app
- ตรวจสอบ Firestore/Storage/Rules ใน Firebase Console
- ตรวจสอบ log และ error ใน Firebase Console

---
**หมายเหตุ:**
- ตรวจสอบ `config.js` และ `service-account-key.json` ให้ถูกต้องก่อน deploy
- ทดสอบ security rules ด้วย Firebase Emulator หรือ staging ก่อน production
- ตรวจสอบ log ทุกครั้งหลัง deploy
