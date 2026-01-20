# 🚀 Production Deployment Guide / คู่มือการปรับใช้ในสภาพแวดล้อมการผลิต

## English Version

### Step 1: Install Dependencies
```bash
cd goofy-elion
npm install
```

### Step 2: Setup Environment Variables
```bash
# Copy template
cp .env.example .env

# Edit .env with your actual Firebase credentials
nano .env  # or use your preferred editor
```

**Required Variables:**
- `FIREBASE_API_KEY` - From Firebase Console > Project Settings
- `FIREBASE_PROJECT_ID` - Your Firebase project ID
- `SERVICE_ACCOUNT_PATH` - Path to service-account-key.json
- `ALLOWLIST_ADMINS` - Comma-separated admin emails

### Step 3: Prepare Service Account Key
```bash
# Download from Firebase Console > Project Settings > Service Accounts
# Place in: ./service-account-key.json

# IMPORTANT: Never commit this file to Git!
# Add to .gitignore if not already there
echo "service-account-key.json" >> .gitignore
```

### Step 4: Deploy Firestore Configuration
```bash
# Login to Firebase
firebase login

# Deploy Firestore Security Rules (CRITICAL)
firebase deploy --only firestore:rules

# Deploy Firestore Indexes
firebase deploy --only firestore:indexes
```

### Step 5: Deploy to Firebase Hosting
```bash
# Build (if needed)
npm run build  # If you have a build script

# Deploy
firebase deploy --only hosting

# Verify deployment
firebase hosting:list
```

### Step 6: Start Backend Server
```bash
# Development mode
npm start

# Production mode
NODE_ENV=production npm start
```

**Server runs on:** http://localhost:3001

### Step 7: Verify Installation
```bash
# Check logs
tail -f logs/app.log

# Test endpoints
curl http://localhost:3001/api/dpd/update
```

---

## Thai Version / เวอร์ชันไทย

### ขั้นตอนที่ 1: ติดตั้ง Dependencies
```bash
cd goofy-elion
npm install
```

### ขั้นตอนที่ 2: ตั้งค่าตัวแปรสภาพแวดล้อม
```bash
# คัดลอกไฟล์ตัวอย่าง
cp .env.example .env

# แก้ไข .env ด้วยข้อมูลประจำตัว Firebase จริงของคุณ
nano .env  # หรือใช้ editor ที่คุณชอบ
```

**ตัวแปรที่จำเป็น:**
- `FIREBASE_API_KEY` - จากคอนโซล Firebase > Project Settings
- `FIREBASE_PROJECT_ID` - ID โปรเจ็กต์ Firebase ของคุณ
- `SERVICE_ACCOUNT_PATH` - เส้นทางไปยัง service-account-key.json
- `ALLOWLIST_ADMINS` - อีเมลผู้ดูแลระบบคั่นด้วยเครื่องหมายจุลภาค

### ขั้นตอนที่ 3: เตรียมคีย์บัญชีบริการ
```bash
# ดาวน์โหลดจากคอนโซล Firebase > Project Settings > Service Accounts
# วางไว้ใน: ./service-account-key.json

# สำคัญ: อย่าส่งไฟล์นี้ไปยัง Git!
# เพิ่มไปยัง .gitignore หากไม่มีอยู่แล้ว
echo "service-account-key.json" >> .gitignore
```

### ขั้นตอนที่ 4: ปรับใช้การตั้งค่า Firestore
```bash
# เข้าสู่ระบบ Firebase
firebase login

# ปรับใช้ Firestore Security Rules (สำคัญมาก)
firebase deploy --only firestore:rules

# ปรับใช้ Firestore Indexes
firebase deploy --only firestore:indexes
```

### ขั้นตอนที่ 5: ปรับใช้ไปยัง Firebase Hosting
```bash
# สร้าง (หากจำเป็น)
npm run build  # ถ้าคุณมีสคริปต์ build

# ปรับใช้
firebase deploy --only hosting

# ตรวจสอบการปรับใช้
firebase hosting:list
```

### ขั้นตอนที่ 6: เริ่มเซิร์ฟเวอร์แบ็กเอนด์
```bash
# โหมดพัฒนา
npm start

# โหมดการผลิต
NODE_ENV=production npm start
```

**เซิร์ฟเวอร์ทำงานบน:** http://localhost:3001

### ขั้นตอนที่ 7: ตรวจสอบการติดตั้ง
```bash
# ตรวจสอบบันทึก
tail -f logs/app.log

# ทดสอบเอนดพอยต์
curl http://localhost:3001/api/dpd/update
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Frontend loads at https://your-project.firebaseapp.com
- [ ] Backend API responds at http://localhost:3001/health
- [ ] Firestore Security Rules are active
- [ ] Firestore Indexes are building (check Firebase Console)
- [ ] Service account key is NOT in Git history
- [ ] .env file is in .gitignore
- [ ] Admin email can login to admin dashboard
- [ ] Student cannot access admin pages
- [ ] Error logging is working (check logs/app.log)
- [ ] Rate limiting is working (test with 101+ requests in 15 min)

---

## 🆘 Troubleshooting

### Issue: "Cannot find module 'express-rate-limit'"
**Solution:**
```bash
npm install express-rate-limit dotenv
```

### Issue: "Service account key not found"
**Solution:**
1. Download service-account-key.json from Firebase Console
2. Place in project root directory
3. Update SERVICE_ACCOUNT_PATH in .env

### Issue: "Permission denied" in Firestore
**Solution:**
1. Re-deploy security rules: `firebase deploy --only firestore:rules`
2. Wait a minute for propagation
3. Check user has proper authentication

### Issue: "XSS Warning" in console
**Solution:**
1. Ensure DOMPurify.js is loaded first
2. Use sanitizer.safeSetInnerHTML() instead of innerHTML
3. Check network tab for failed script loads

---

## 🔐 Security Reminders

⚠️ **CRITICAL - Do NOT:**
- ❌ Commit .env file to Git
- ❌ Commit service-account-key.json
- ❌ Expose Firebase API keys
- ❌ Allow unsigned users to write to Firestore
- ❌ Run with NODE_ENV !== 'production' in production

✅ **DO:**
- ✅ Use HTTPS only
- ✅ Enable Firestore backups
- ✅ Monitor error logs regularly
- ✅ Update packages: `npm audit fix`
- ✅ Test security rules thoroughly

---

## 📞 Support

For issues or questions:
1. Check logs: `tail -f logs/app.log`
2. Check Firebase Console for quota/errors
3. Review PROJECT_ANALYSIS.md for architecture
4. Contact: setthachayo@gmail.com
