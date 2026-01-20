# 🧪 Security Testing Plan - แผนการทดสอบความปลอดภัย

**Date:** 2026-01-14  
**Project:** Pali Learning Platform  
**Focus:** Firestore Security Rules Testing

---

## 🎯 Test Scenarios - 5 กรณีทดสอบ

### Scenario 1: ผู้เยี่ยมชมทั่วไป (Guest/Unauthenticated)
**สถานะ:** ไม่ล็อกอิน

**ทดสอบ:**
- [ ] ไปที่ `index.html` โดยไม่ล็อกอิน
- [ ] ตรวจสอบหน้า redirect ไปที่ login หรือไม่
- [ ] พยายาม access ข้อมูลโดยไม่มี authentication

**ผลลัพธ์ที่คาดหวัง:**
```
❌ CANNOT READ:
- /users/* (ต้องล็อกอิน)
- /classrooms/* (ต้องล็อกอิน)
- /exam_sets/* (ต้องล็อกอิน)
- /contents/* (ต้องล็อกอิน)
- /files/* (ต้องล็อกอิน)

✅ CAN ACCESS:
- Public pages (login, signup)
- Static assets (CSS, fonts)
- CDN libraries (DOMPurify, etc.)
```

**Console Check:**
```javascript
// ใจ open DevTools (F12) → Console
// ลองเขียนโค้ด:
db.collection('exam_sets').get()
// ควรเห็น error: "Missing or insufficient permissions"
```

---

### Scenario 2: ผู้ล็อกอินทั่วไป (Regular User - No Special Role)
**สถานะ:** ล็อกอินแล้ว แต่ไม่มี custom claim

**ขั้นตอน:**
1. ไป Firebase Console → Authentication
2. สร้าง user ใหม่: `user1@test.com` / `Password123!`
3. ล็อกอินด้วย account นี้

**ทดสอบ:**
- [ ] ลอ็กอิน ด้วย user1@test.com
- [ ] ไปที่ dashboard หรือ home
- [ ] ลองดู own profile data (/users/{uid})
- [ ] ลองดู classroom ที่ไม่ได้เป็นสมาชิก
- [ ] ลองแก้ไข exam

**ผลลัพธ์ที่คาดหวัง:**
```
✅ CAN READ:
- Own user profile (/users/{uid})
- Own schedule (/users/{uid}/schedule/*)
- Own vocabulary (/users/{uid}/vocab/*)
- Own progress (/users/{uid}/progress/*)

✅ CAN CREATE:
- New exam results (/classrooms/{classroomId}/examResults/*)
- Own schedule items
- Own vocabulary items

❌ CANNOT READ:
- Other users' data
- Exam sets (even read) - ต้องลองดู!
- Files
- Admin data (errorLogs, auditLogs)

❌ CANNOT WRITE:
- exam_sets (admin only)
- contents, pins, files
```

**Console Test:**
```javascript
// ควรสำเร็จ
db.collection('users').doc(auth.currentUser.uid).get()

// ควรล้มเหลว
db.collection('exam_sets').get()
db.collection('exam_sets').add({title: "test"})
```

---

### Scenario 3: ผู้ล็อกอิน นักเรียน (Student User)
**สถานะ:** ล็อกอินแล้ว + มี custom claim `role: 'student'`

**ขั้นตอน Setup:**
1. สร้าง user ใหม่: `student@test.com` / `Password123!`
2. ไปที่ Firebase Console → Authentication
3. ไปที่ Custom Claims ของ user นี้
4. เพิ่ม claims:
```json
{
  "role": "student"
}
```

**ทดสอบ:**
- [ ] ล็อกอินด้วย student@test.com
- [ ] ดูรายชื่อห้องเรียนที่เป็นสมาชิก
- [ ] ลองดู exam ของห้องเรียน
- [ ] ส่งคำตอบสอบ (create examResult)
- [ ] ลองแก้ไข exam (ต้องถูกปฏิเสธ)
- [ ] ลองลบ files (ต้องถูกปฏิเสธ)

**ผลลัพธ์ที่คาดหวัง:**
```
✅ CAN READ:
- exam_sets (ล็อกอินแล้ว)
- classrooms ที่เป็นสมาชิก
- contents, pins, sanluang_exams
- Own exam results

✅ CAN CREATE:
- examResults เท่านั้น
- Own schedule, vocab, progress

❌ CANNOT WRITE:
- exam_sets ❌ (admin only)
- exam_logs ❌ (admin only)
- files ❌ (admin only)
- contents, pins ❌ (admin only)
- Other users' data ❌

❌ CANNOT DELETE:
- Anything ❌
```

**Console Test:**
```javascript
// ควรสำเร็จ
db.collection('exam_sets').get()  // ✅ read

// ควรล้มเหลว
db.collection('exam_sets').add({title: "malicious"})  // ❌ write
db.collection('exam_logs').add({...})  // ❌ admin only
```

---

### Scenario 4: ผู้ล็อกอิน ครู (Teacher User)
**สถานะ:** ล็อกอินแล้ว + มี custom claim `role: 'teacher'`

**ขั้นตอน Setup:**
1. สร้าง user ใหม่: `teacher@test.com` / `Password123!`
2. เพิ่ม custom claims:
```json
{
  "role": "teacher"
}
```

**ทดสอบ:**
- [ ] ล็อกอินด้วย teacher@test.com
- [ ] ดูห้องเรียนที่เป็น admin
- [ ] สร้าง exam ในห้องเรียนของตัวเอง
- [ ] แก้ไข exam ของห้องเรียนของตัวเอง
- [ ] ลองแก้ไข exam ของห้องอื่น (ต้องถูกปฏิเสธ)
- [ ] ลองแก้ไข exam_sets (ต้องถูกปฏิเสธ)
- [ ] ดู exam results ของนักเรียนในห้อง

**ผลลัพธ์ที่คาดหวัง:**
```
✅ CAN READ:
- classrooms ที่เป็น admin
- exam ในห้องของตัวเอง
- examResults ของนักเรียนในห้อง
- exam_sets

✅ CAN WRITE:
- exam ในห้องที่เป็น admin เท่านั้น
- Create exam
- Update exam (own classroom only)
- Delete exam (own classroom only)

❌ CANNOT WRITE:
- exam_sets ❌ (admin only)
- exam_logs ❌ (admin only)
- files ❌ (admin only)
- exam ในห้องอื่น ❌ (not admin of that classroom)
```

**Console Test:**
```javascript
// ควรสำเร็จ
db.collection('exam_sets').get()  // ✅

// ควรล้มเหลว
db.collection('exam_sets').add({title: "test"})  // ❌ admin only
db.collection('exam_logs').add({...})  // ❌ admin only
```

---

### Scenario 5: ผู้ล็อกอิน แอดมิน (Admin User)
**สถานะ:** ล็อกอินแล้ว + มี custom claim `admin: true`

**ขั้นตอน Setup:**
1. สร้าง user ใหม่: `admin@test.com` / `Password123!`
2. เพิ่ม custom claims:
```json
{
  "admin": true
}
```

**ทดสอบ:**
- [ ] ล็อกอินด้วย admin@test.com
- [ ] สร้าง exam_sets (ต้องสำเร็จ)
- [ ] แก้ไข exam_sets (ต้องสำเร็จ)
- [ ] ลบ exam_sets (ต้องสำเร็จ)
- [ ] ดู error logs (ต้องสำเร็จ)
- [ ] สร้าง exam logs (ต้องสำเร็จ)
- [ ] ลบ users (ต้องสำเร็จ)
- [ ] ดู audit logs (ต้องสำเร็จ)

**ผลลัพธ์ที่คาดหวัง:**
```
✅ CAN READ:
- Everything (ทั้งหมด)
- exam_sets, contents, pins, files
- errorLogs, auditLogs, exam_logs
- All users' data

✅ CAN WRITE:
- Everything (ทั้งหมด)
- Create exam_sets
- Update exam_sets
- Delete exam_sets
- Create exam_logs
- Create errorLogs, auditLogs

✅ CAN DELETE:
- Everything (ทั้งหมด)
```

**Console Test:**
```javascript
// ทั้งหมดควรสำเร็จ
db.collection('exam_sets').add({title: "test"})  // ✅
db.collection('exam_logs').add({...})  // ✅
db.collection('errorLogs').add({...})  // ✅
db.collection('auditLogs').add({...})  // ✅
db.collection('errorLogs').get()  // ✅
```

---

## 🔧 Test Accounts Setup - ตั้งค่า Test Accounts

### Firebase Console Steps
1. ไปที่ https://console.firebase.google.com
2. เลือก project `palitest-generator`
3. ไป **Authentication** → **Users**
4. สร้าง 5 users ตามด้านล่าง

### Create Test Users

```
User 1: guest (No account - just visit page)
────────────────────────────────────────

User 2: Regular User
Email: user1@test.com
Password: Password123!
Custom Claims: {} (none)

User 3: Student
Email: student@test.com
Password: Password123!
Custom Claims: {
  "role": "student"
}

User 4: Teacher
Email: teacher@test.com
Password: Password123!
Custom Claims: {
  "role": "teacher"
}

User 5: Admin
Email: admin@test.com
Password: Password123!
Custom Claims: {
  "admin": true
}
```

### Set Custom Claims

**How to add Custom Claims:**
1. ใน Firebase Console → Authentication → Users
2. คลิก user ที่ต้องการ
3. เลื่อนลง → Custom Claims
4. กด ✎ (edit)
5. ใส่ JSON claims
6. Save

---

## 📝 Test Checklist - รายการตรวจสอบ

### Test 1: Guest User
```
Scenario: ผู้เยี่ยมชมไม่ล็อกอิน
─────────────────────────────

[ ] Can load public pages (login, signup)
[ ] Cannot access dashboard
[ ] Cannot read /exam_sets
[ ] Cannot read /users
[ ] Cannot read /classrooms
[ ] Cannot read /contents
[ ] Cannot read /files
[ ] Error message shows when trying to read data
[ ] No console errors (except permission denied)
```

### Test 2: Regular User
```
Scenario: ล็อกอินแล้ว แต่ไม่มี role
──────────────────────────────────

[ ] Can login successfully
[ ] Can see own profile
[ ] Can create own schedule
[ ] Can create own vocabulary
[ ] Can view own progress
[ ] Cannot read other users' data
[ ] Cannot read exam_sets - 🔴 CRITICAL CHECK
[ ] Cannot create exam_sets
[ ] Cannot view errorLogs
[ ] Cannot view auditLogs
```

### Test 3: Student User
```
Scenario: นักเรียน (student role)
──────────────────────────────────

[ ] Can login as student
[ ] Can read exam_sets - 🔴 CRITICAL CHECK
[ ] Can read contents, pins, sanluang_exams
[ ] Can create examResults
[ ] Cannot update exam_sets - 🔴 CRITICAL CHECK
[ ] Cannot create exam_sets
[ ] Cannot create exam_logs
[ ] Cannot delete files
[ ] Cannot read errorLogs
[ ] Cannot read other students' examResults
```

### Test 4: Teacher User
```
Scenario: ครู (teacher role)
───────────────────────────

[ ] Can login as teacher
[ ] Can create exams in own classroom
[ ] Can update exams in own classroom
[ ] Can delete exams in own classroom
[ ] Cannot create exams in other classrooms
[ ] Cannot update exam_sets - 🔴 CRITICAL CHECK
[ ] Cannot create exam_logs - 🔴 CRITICAL CHECK
[ ] Can read exam_sets
[ ] Can view student exam results in own classroom
[ ] Cannot view exam results from other classrooms
```

### Test 5: Admin User
```
Scenario: แอดมิน (admin: true)
──────────────────────────────

[ ] Can login as admin
[ ] Can create exam_sets - ✅ CRITICAL CHECK
[ ] Can update exam_sets - ✅ CRITICAL CHECK
[ ] Can delete exam_sets - ✅ CRITICAL CHECK
[ ] Can create exam_logs - ✅ CRITICAL CHECK
[ ] Can update exam_logs - ✅ CRITICAL CHECK
[ ] Can delete exam_logs - ✅ CRITICAL CHECK
[ ] Can read errorLogs - ✅ CRITICAL CHECK
[ ] Can create errorLogs
[ ] Can read auditLogs
[ ] Can read ALL users' data
[ ] Can update ALL users' data
```

---

## 🚀 How to Run Tests - วิธีทำการทดสอบ

### Step 1: Setup Test Accounts
```bash
# Go to Firebase Console
# https://console.firebase.google.com/u/0/project/palitest-generator/authentication/users

# Create 5 test users (see Test Accounts Setup section above)
```

### Step 2: Test Guest User
```javascript
// 1. Open app in incognito/private window
// 2. Don't login
// 3. Try to access data via console:

// Open DevTools → Console
db.collection('exam_sets').get()
// ✅ Should show: "Missing or insufficient permissions"
```

### Step 3: Test Each User
```bash
# For each user (user1, student, teacher, admin):
# 1. Login with that account
# 2. Go through the checklist above
# 3. Open Console and run test queries
# 4. Check results match expected behavior
```

### Step 4: Critical Security Tests
```javascript
// ⚠️ MOST IMPORTANT TESTS - ทดสอบสิ่งสำคัญที่สุด

// TEST 1: Students CANNOT edit exams
// Login as: student@test.com
db.collection('exam_sets').doc('any-exam-id').update({
  title: "Hacked!"
})
// ❌ MUST FAIL: "Missing or insufficient permissions"

// TEST 2: Students CAN read exams
// Login as: student@test.com
db.collection('exam_sets').get()
// ✅ MUST SUCCEED: Returns data

// TEST 3: Admin CAN edit exams
// Login as: admin@test.com
db.collection('exam_sets').doc('any-exam-id').update({
  title: "Updated by admin"
})
// ✅ MUST SUCCEED

// TEST 4: Students CANNOT read errorLogs
// Login as: student@test.com
db.collection('errorLogs').get()
// ❌ MUST FAIL: "Missing or insufficient permissions"

// TEST 5: Admin CAN read errorLogs
// Login as: admin@test.com
db.collection('errorLogs').get()
// ✅ MUST SUCCEED
```

---

## 📊 Test Results Template - แบบบันทึกผลลัพธ์

```
┌─────────────────────────────────────────────────────────────┐
│ SECURITY TEST RESULTS - [Date: 2026-01-14]                 │
├─────────────────────────────────────────────────────────────┤

TEST 1: Guest User
Status: ✅ PASS / ⚠️ WARN / ❌ FAIL
Notes: 

TEST 2: Regular User
Status: ✅ PASS / ⚠️ WARN / ❌ FAIL
Notes:

TEST 3: Student User
Status: ✅ PASS / ⚠️ WARN / ❌ FAIL
Notes:

TEST 4: Teacher User
Status: ✅ PASS / ⚠️ WARN / ❌ FAIL
Notes:

TEST 5: Admin User
Status: ✅ PASS / ⚠️ WARN / ❌ FAIL
Notes:

OVERALL: ✅ PASS / ❌ FAIL
────────────────────────────────────────────────────────────
Issues found:
- [list any issues]

Sign-off: ________________  Date: __________
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Success Criteria - เกณฑ์ความสำเร็จ

### 🔴 CRITICAL (Must Pass)
- [ ] Guest users CANNOT read any protected data
- [ ] Students CANNOT create/update/delete exam_sets
- [ ] Students CANNOT read admin data (errorLogs, auditLogs, exam_logs)
- [ ] Only admin can manage exam_sets
- [ ] Only admin can manage exam_logs
- [ ] Authentication is required for all protected resources

### 🟡 IMPORTANT (Should Pass)
- [ ] Teachers can only manage exams in their own classrooms
- [ ] Users can only see their own data
- [ ] Custom claims control access properly
- [ ] Role-based access works as expected

### 🟢 NICE-TO-HAVE (Good to Have)
- [ ] Performance is acceptable
- [ ] Error messages are user-friendly
- [ ] Console logs are informative

---

## 📞 Troubleshooting - แก้ปัญหา

### Problem: Custom Claims not updating
```bash
# Solution: Clear browser cache and reload
# Or: Logout and login again
# The claims take 5-60 seconds to propagate
```

### Problem: Still can read data after removing claims
```bash
# Solution: Firebase may cache auth token
# - Logout completely
# - Close all tabs with the app
# - Clear browser cache (Ctrl+Shift+Delete)
# - Login again
```

### Problem: Firestore returning unexpected results
```bash
# Solution: Check firestore.rules file
firebase firestore:indexes  # Check deployed rules
git status  # Check local changes
```

---

## ✅ Testing Completed Checklist

```
BEFORE TESTS:
[ ] All test accounts created
[ ] Custom claims set correctly
[ ] firestore.rules deployed to Firebase
[ ] Browser cache cleared
[ ] DevTools console ready

DURING TESTS:
[ ] Test each scenario 1-5
[ ] Check critical security tests
[ ] Document any issues
[ ] Take screenshots if needed

AFTER TESTS:
[ ] All critical tests passed
[ ] No unauthorized access found
[ ] Document results
[ ] Sign off on report
```

---

*Last Updated: 2026-01-14*  
*Ready to test security rules! 🧪✅*
