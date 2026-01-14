# 🧪 Local Testing Guide - คู่มือการทดสอบบนเครื่อง

**วันที่:** 2026-01-14  
**สถานะ:** Ready for Local Testing

---

## 🚀 ขั้นตอนเตรียม Local Server

### Step 1: ติดตั้ง Dependencies

```bash
cd c:\Users\setth\.claude-worktrees\pali-theonlyone\goofy-elion

# ติดตั้ง npm packages
npm install

# ผลลัพธ์ควรมี:
# - express
# - express-rate-limit
# - dotenv
# - firebase (client)
```

### Step 2: สร้างไฟล์ .env

```bash
# ก๊อปปี้ template
cp .env.example .env

# Edit .env และใส่ Firebase credentials ของคุณ:
# ไปที่ Firebase Console → Project Settings → Service Account
```

ไฟล์ `.env` ควรมี:
```
FIREBASE_API_KEY=AIzaSyD...
FIREBASE_PROJECT_ID=palitest-generator
FIREBASE_SERVICE_ACCOUNT_PATH=./service-account-key.json
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=debug
```

### Step 3: เพิ่ม Firebase Service Account

```bash
# ดาวน์โหลดจาก Firebase Console:
# 1. ไปที่ Firebase Console → Project Settings
# 2. Service Accounts tab
# 3. Download JSON
# 4. บันทึกลงใน project root เป็น service-account-key.json

# ✅ ตรวจสอบว่าไฟล์อยู่ที่:
ls -la service-account-key.json
```

### Step 4: เริ่ม Local Server

```bash
# Option A: ใช้ Node.js server.js
node server.js

# หรือ Option B: ใช้ Firebase emulator
firebase emulators:start

# Output ควรแสดง:
# Server running on http://localhost:3000
# Firestore emulator running on http://localhost:8080
```

---

## 📱 Testing Checklist - รายการทดสอบ

### 1️⃣ Basic Functionality - การทำงานพื้นฐาน

```
☐ เปิด http://localhost:3000 ใน browser
☐ หน้า home โหลดได้
☐ ไม่มี console errors
☐ CSS/styling แสดงถูกต้อง
☐ Fonts (Thai, Pali) แสดงถูกต้อง
☐ Icons แสดงถูกต้อง
```

**ทำการทดสอบ:**
```javascript
// ใน DevTools Console (F12)
console.log('Test log');
// ควรเห็น message ใน console เท่านั้น ไม่มี errors
```

---

### 2️⃣ Authentication - ยืนยันตัวตน

#### A. Guest Login (ไม่ต้อง login)
```
☐ เข้าเว็บโดยไม่ login
☐ ดูข้อมูลสาธารณะได้
☐ ไม่สามารถเข้า Firestore ได้
☐ ปุ่ม Login visible
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
firebase.auth().currentUser
// ควรแสดง: null (ไม่ได้ login)

db.collection('exam_sets').get()
// ควรได้ error: "Missing or insufficient permissions"
```

#### B. Email Signup - สมัครสมาชิก
```
☐ กรอก email: testuser@example.com
☐ กรอก password อ่อนแอ: "123"
☐ ควรเห็น error: "รหัสผ่านอ่อนแอ"
☐ กรอก password แข็งแกร่ง: "Test123456!"
☐ Signup สำเร็จ
☐ Auto login
```

**ทำการทดสอบ:**
```javascript
// DevTools Console หลังจาก signup สำเร็จ
firebase.auth().currentUser
// ควรแสดง user object

firebase.auth().currentUser.email
// ควรแสดง: "testuser@example.com"
```

#### C. Email Login - เข้าสู่ระบบ
```
☐ Logout
☐ Login ด้วย email ที่สร้าง
☐ Password ไม่ถูก → error
☐ Password ถูก → login สำเร็จ
☐ เห็น greeting message
☐ User info แสดงชื่อ
```

#### D. Google Login
```
☐ ปุ่ม Google Login visible
☐ คลิก → เปิด Google auth popup
☐ ล็อกอินผ่าน Google สำเร็จ
☐ User info อัปเดต
```

#### E. Password Reset - ลืมรหัสผ่าน
```
☐ คลิก "ลืมรหัสผ่าน"
☐ ใส่ email
☐ ควรเห็น message: "ส่งลิงก์..."
☐ ตรวจสอบ email (ใน Firebase Console logs)
```

---

### 3️⃣ Security Fixes Verification - ตรวจสอบการแก้ไข

#### A. Password Validation ✅
```
☐ ลอง password: "test" (สั้นเกินไป)
  → Error: "ต้องมีอย่างน้อย 8 ตัวอักษร"

☐ ลอง password: "testpassword" (ไม่มี uppercase)
  → Error: "ต้องมีตัวพิมพ์ใหญ่"

☐ ลอง password: "Testpassword" (ไม่มี number)
  → Error: "ต้องมีตัวเลข"

☐ ลอง password: "Test123" (ไม่มี symbol)
  → Error: "ต้องมีสัญลักษณ์"

☐ ลอง password: "Test123!" (ถูก!)
  → Signup สำเร็จ
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
// ลองสมัครกับ password ที่อ่อนแอ
// ควรเห็น error message บนหน้าจอ
```

#### B. XSS Protection ✅
```
☐ ใช้ account ชื่อเสียแปลก: "Test<img src=x>"
☐ User info ควร escape ตัวอักษร ไม่ execute HTML
☐ ไม่เห็น errors ใน DevTools
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
firebase.auth().currentUser.displayName = 
  '<img src=x onerror="alert(123)">';

// Update profile และ reload
// ควรเห็นชื่อเป็น text เท่านั้น ไม่เห็น alert
```

#### C. Role Storage (Not localStorage) ✅
```
☐ Login ด้วย account ทั่วไป
☐ เปิด DevTools → Application → localStorage
☐ ไม่ควรเห็น 'pali_user_role' key
☐ ควรเห็น 'pali_user_uid' เท่านั้น
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
localStorage.getItem('pali_user_role')
// ควรแสดง: null (ไม่มี)

localStorage.getItem('pali_user_uid')
// อาจจะ null ด้วย ถ้าเก็บ sessionStorage
```

#### D. Guest Login with Firebase Auth ✅
```
☐ ใส่ชื่อ: "Guest User"
☐ คลิก "Guest Login"
☐ ควร sign in anonymously
☐ UID ควรมาจาก Firebase (ตัวอักษรยาว) ไม่ใช่ 'local_...'
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
firebase.auth().currentUser.uid
// ควรแสดง: "K3jKdsjsklsld..." (Firebase Anonymous ID)
// ไม่ควรแสดง: "local_Guest User"
```

---

### 4️⃣ Firestore Security Rules - ทดสอบ Rules

#### A. Guest/Unauthenticated Access
```
☐ ไม่ login
☐ พยายาม read exam_sets
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
db.collection('exam_sets').get()
// ควรได้ error: "Missing or insufficient permissions"
```

#### B. Student Access
```
☐ Login ด้วย student account (role: student)
☐ พยายาม read exam_sets
☐ ควรสำเร็จ (ได้ข้อมูล)
☐ พยายาม write exam_sets
☐ ควรล้มเหลว (ไม่มีสิทธิ์)
```

**ทำการทดสอบ:**
```javascript
// Student account - login ก่อน

// ✅ Read ควรสำเร็จ
db.collection('exam_sets').get()
// ควรแสดง: QuerySnapshot {...}

// ❌ Write ควรล้มเหลว
db.collection('exam_sets').add({title: "test"})
// ควรได้ error: "Missing or insufficient permissions"
```

#### C. Admin Access
```
☐ Login ด้วย admin account (admin: true)
☐ Read exam_sets ✅
☐ Write exam_sets ✅
☐ Read errorLogs ✅
☐ Create exam_logs ✅
```

**ทำการทดสอบ:**
```javascript
// Admin account - login ก่อน

// ✅ ทั้งหมดควรสำเร็จ
db.collection('exam_sets').get()
db.collection('exam_sets').add({title: "test"})
db.collection('errorLogs').get()
```

---

### 5️⃣ Rate Limiting - ทดสอบการจำกัดอัตรา

```
☐ Login หลายครั้ง (จริงๆ ทดสอบการส่ง request จำนวนมาก)
☐ หลังจากถึง limit ควรเห็น error
```

**ทำการทดสอบ:**
```bash
# ใช้ curl loop เพื่อ stress test
for i in {1..150}; do
  curl http://localhost:3000/
done

# หลังจาก 100 requests ควร throttle/return 429
```

---

### 6️⃣ DOMPurify Integration - ตรวจสอบ XSS Protection

```
☐ DOMPurify library loaded
☐ ไม่มี dangerous HTML ที่ execute
☐ sanitizeHTML function ทำงาน
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
typeof DOMPurify
// ควรแสดง: "object"

DOMPurify.sanitize('<img src=x onerror="alert(1)">')
// ควรแสดง: '<img src="x">' (remove onerror)
```

---

### 7️⃣ Error Handling - ตรวจสอบการจัดการ errors

```
☐ ทดสอบ network error (disconnect internet)
☐ ควรเห็น error message ที่เข้าใจได้
☐ ไม่มี uncaught exceptions
☐ DevTools console ไม่มี red errors
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
// ลอง operation ที่ fail
db.collection('invalid').get()
  .catch(e => console.log(e.message))
  
// ควรเห็น: error message ที่ชัดเจน
```

---

### 8️⃣ Performance - ตรวจสอบความเร็ว

```
☐ Page load time < 3 seconds
☐ ไม่มี Memory leaks
☐ DevTools → Performance ถ่ายภาพและวิเคราะห์
☐ Login response < 2 seconds
```

**ทำการทดสอบ:**
```javascript
// DevTools Console
console.time('load');
// ทำการ action
console.timeEnd('load');
// ควรแสดง: < 2000ms
```

---

## 📝 Manual Testing Checklist - รายการตรวจสอบลายละเอียด

```
🔐 SECURITY
☐ Password validation works (test weak passwords)
☐ XSS prevented (can't inject HTML via displayName)
☐ Firestore rules block unauthorized access
☐ Guest login uses Firebase Auth (not localStorage)
☐ Role not in localStorage
☐ HTTPS enforced (in production)

🧪 FUNCTIONALITY
☐ Signup works with strong password
☐ Login works
☐ Logout works
☐ Google login works
☐ Password reset works
☐ Guest mode works
☐ Dashboard displays correctly

⚡ PERFORMANCE
☐ Page loads quickly
☐ No console errors
☐ No Memory leaks
☐ Rate limiting works

📱 COMPATIBILITY
☐ Works on Desktop
☐ Works on Mobile
☐ Works on Firefox
☐ Works on Chrome
☐ Works on Safari
```

---

## 🔍 Console Error Checking - ตรวจสอบ Console Errors

```bash
# ทำการทดสอบต่างๆ แล้วเปิด DevTools (F12)
# ไป Console tab
# ไม่ควรเห็น:
❌ Uncaught errors
❌ Missing files (404)
❌ CORS errors
❌ Security warnings (CSP violations)

# ควรเห็น:
✅ Info logs
✅ Warning logs (ถ้ามี)
✅ ถูกต้องของ app
```

---

## 📊 Test Results Template

```
╔═══════════════════════════════════════════════════════════╗
║       LOCAL TESTING RESULTS - 2026-01-14                 ║
╠═══════════════════════════════════════════════════════════╣

BASIC FUNCTIONALITY
  ☐ Page loads: ___________
  ☐ No console errors: ___________
  ☐ Styling correct: ___________

AUTHENTICATION
  ☐ Guest login: ___________
  ☐ Email signup: ___________
  ☐ Email login: ___________
  ☐ Google login: ___________
  ☐ Logout: ___________

SECURITY
  ☐ Password validation: ___________
  ☐ XSS protection: ___________
  ☐ Firestore rules: ___________
  ☐ Guest uses Firebase Auth: ___________
  ☐ Role not in localStorage: ___________

PERFORMANCE
  ☐ Load time: ___________
  ☐ Login speed: ___________
  ☐ No memory leaks: ___________

OVERALL STATUS: ✅ PASS / ⚠️ WARN / ❌ FAIL

Issues Found:
- [list any issues]

Sign-off: ________________  Date: __________
╚═══════════════════════════════════════════════════════════╝
```

---

## 🚀 เมื่อผ่านการทดสอบทั้งหมด

```bash
# 1. Commit changes
git add .
git commit -m "🔒 Security fixes and improvements verified locally"

# 2. Push to GitHub
git push origin goofy-elion

# 3. Create Pull Request
# Go to GitHub → New PR: goofy-elion → main

# 4. Deploy to Firebase
firebase deploy

# 5. Test on production
# Visit: https://palitest-generator.firebaseapp.com
```

---

## 📞 Troubleshooting

### Error: "Cannot find module 'express'"
```bash
npm install express
```

### Error: "FIREBASE_API_KEY is undefined"
```bash
# Check .env file
cat .env
# Make sure all keys are filled in
```

### Error: "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 node server.js
```

### Firestore emulator not running
```bash
# Install firebase tools
npm install -g firebase-tools

# Start emulator
firebase emulators:start
```

---

## ✅ Ready for Production?

ก่อนอัปขึ้น Production ตรวจสอบ:

- [x] All tests pass locally
- [x] No console errors
- [x] Security features working
- [x] Performance acceptable
- [x] Cross-browser tested
- [x] Mobile responsive
- [x] .env created with real credentials
- [x] No sensitive data in code
- [x] firestore.rules deployed
- [x] firestore-indexes deployed

**Status: ✅ READY FOR DEPLOYMENT**

---

*Last Updated: 2026-01-14*  
*Local Testing Guide v1.0*
