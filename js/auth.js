// js/auth.js

const auth = firebase.auth();
const db = firebase.firestore();

// --- DOM Elements (Auth) ---
const modalEmailSignIn = document.getElementById('modal-email-signin');
const modalEmailSignUp = document.getElementById('modal-email-signup');
const modalForgotPassword = document.getElementById('modal-forgot-password');
const btnOpenLogin = document.getElementById('btn-open-login');
const btnLogoutTop = document.getElementById('btn-logout');
const userInfo = document.getElementById('user-info');
const appContent = document.getElementById('app-content');

// --- Auth UI Functions ---

function showUser(u, role) {
    if (userInfo) {
        const name = u.displayName || u.email || 'ผู้ใช้งาน';
        let statusHtml = '';
        if (role) {
            let label = 'ผู้ใช้งานทั่วไป';
            let color = '#7f8c8d';
            if (role === 'admin') { label = 'ผู้ดูแลระบบ'; color = '#c0392b'; }
            else if (role === 'teacher') { label = 'อาจารย์'; color = '#8e44ad'; }
            else if (role === 'student') { label = 'นักเรียน'; color = '#27ae60'; }
            statusHtml = `<span style="display:inline-block; margin-left:8px; font-size:0.75rem; background:${color}; color:white; padding:2px 8px; border-radius:99px; vertical-align:middle;">${label}</span>`;
            localStorage.setItem('pali_user_role', role);
        }
        userInfo.innerHTML = `<b>${name}</b> ${statusHtml}`;
        userInfo.style.display = 'inline-flex';
        userInfo.style.alignItems = 'center';
    }
    if (btnLogoutTop) btnLogoutTop.style.display = 'inline-block';
    if (btnOpenLogin) btnOpenLogin.style.display = 'none';
}

function hideUser() {
    if (userInfo) {
        userInfo.innerHTML = '';
        userInfo.style.display = 'none';
    }
    if (btnLogoutTop) btnLogoutTop.style.display = 'none';
    if (btnOpenLogin) btnOpenLogin.style.display = 'inline-block';
}

function openLogin() {
    // Check if we are in "Simple Login" mode
    const simpleLoginSection = document.getElementById('simple-login-section');
    if (simpleLoginSection && simpleLoginSection.style.display !== 'none') {
        // Just focus or scroll to it
        simpleLoginSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Show Email Sign In Modal by default if not guest
        if (modalEmailSignIn) modalEmailSignIn.style.display = 'block';
    }
}

function closeLogin() {
    if (modalEmailSignIn) modalEmailSignIn.style.display = 'none';
    if (modalEmailSignUp) modalEmailSignUp.style.display = 'none';
    if (modalForgotPassword) modalForgotPassword.style.display = 'none';
}

// Event Listeners for Login Buttons
if (btnOpenLogin) btnOpenLogin.onclick = openLogin;
if (btnLogoutTop) btnLogoutTop.onclick = () => {
    if (confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
        auth.signOut().then(() => {
            localStorage.removeItem('pali_user_role');
            localStorage.removeItem('pali_enroll_level');
            location.reload();
        });
    }
};

// --- Social Login ---
window.loginGoogle = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    } catch (error) {
        alert('Google Login Error: ' + error.message);
    }
};

window.loginFacebook = async () => {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        await auth.signInWithPopup(provider);
    } catch (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
             alert('อีเมลนี้มีการใช้งานแล้วด้วยวิธีอื่น (เช่น Google) กรุณาล็อกอินด้วยวิธีนั้น');
        } else {
             alert('Facebook Login Error: ' + error.message);
        }
    }
};

window.loginLine = async () => {
    alert('ระบบล็อกอินผ่าน LINE กำลังพัฒนาครับ กรุณาใช้ Google หรือ Email แทนก่อนนะครับ');
};

// --- Email Login Logic ---

// 1. เปิด Modal สร้างบัญชี
const btnToSignup = document.getElementById('btn-to-signup');
if (btnToSignup) btnToSignup.onclick = () => {
    modalEmailSignIn.style.display = 'none';
    modalEmailSignUp.style.display = 'block';
};

// 2. กลับไปหน้าล็อกอิน
const btnToSignin = document.getElementById('btn-to-signin');
if (btnToSignin) btnToSignin.onclick = () => {
    modalEmailSignUp.style.display = 'none';
    modalEmailSignIn.style.display = 'block';
};

const btnToSignin2 = document.getElementById('btn-to-signin-2');
if (btnToSignin2) btnToSignin2.onclick = () => {
    modalForgotPassword.style.display = 'none';
    modalEmailSignIn.style.display = 'block';
};

const btnToForgot = document.getElementById('btn-to-forgot');
if (btnToForgot) btnToForgot.onclick = () => {
    modalEmailSignIn.style.display = 'none';
    modalForgotPassword.style.display = 'block';
};

// Helper references
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const btnEmailLogin = document.getElementById('btn-email-login');
const emailStatus = document.getElementById('email-status');

const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupConfirm = document.getElementById('signup-confirm');
const btnEmailSignup = document.getElementById('btn-email-signup');

const modalEmail = document.getElementById('reset-email');

// Apply ASCII enforcement
enforceAsciiEmail(emailInput);
enforceAsciiEmail(signupEmail);
enforceAsciiEmail(modalEmail);

// 3. ล็อกอินด้วย Email
if (btnEmailLogin) btnEmailLogin.onclick = async () => {
    const email = emailInput.value.trim();
    const pass = passwordInput.value.trim();
    if (!email || !pass) return;

    setLoading(true, btnEmailLogin);
    try {
        await auth.signInWithEmailAndPassword(email, pass);
        // ถ้าสำเร็จ onAuthStateChanged จะทำงานเอง
    } catch (err) {
        setLoading(false, btnEmailLogin);
        emailStatus.textContent = getErrorMessage(err.code);
        emailStatus.style.color = 'red';
    }
};

// 4. สมัครสมาชิกด้วย Email
if (btnEmailSignup) btnEmailSignup.onclick = async () => {
    const email = signupEmail.value.trim();
    const pass = signupPassword.value.trim();
    const confirm = signupConfirm.value.trim();

    if (!email || !pass) return;
    if (pass !== confirm) {
        emailStatus.textContent = 'รหัสผ่านไม่ตรงกัน';
        emailStatus.style.color = 'red';
        return;
    }

    setLoading(true, btnEmailSignup);
    try {
        await auth.createUserWithEmailAndPassword(email, pass);
        // ถ้าสำเร็จ onAuthStateChanged จะทำงานเอง
    } catch (err) {
        setLoading(false, modalEmailSignUp);
        if (err.code === 'auth/email-already-in-use') {
            // กรณีนี้เกิดขึ้นเมื่อ fetchSignInMethodsForEmail ไม่เจอ (เพราะ Protection) แต่จริงๆ มี User อยู่แล้ว
            emailStatus.textContent = 'อีเมลนี้มีผู้ใช้งานแล้ว กรุณาเข้าสู่ระบบแทน';
            emailStatus.style.color = 'red';

            // สลับปุ่มให้เป็นล็อกอินอัตโนมัติ
            modalEmailSignUp.style.display = 'none';
            modalEmailSignIn.style.display = 'inline-block';
            modalForgotPassword.style.display = 'inline-block';
        } else {
            emailStatus.textContent = getErrorMessage(err.code);
            emailStatus.style.color = 'red';
        }
    }
};

// 4. ลืมรหัสผ่าน
if (modalForgotPassword) modalForgotPassword.onclick = async () => {
    const email = modalEmail.value.trim();
    if (!email) return;

    setLoading(true, modalForgotPassword);
    try {
        await auth.sendPasswordResetEmail(email);
        alert('ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมล ' + email + ' แล้วครับ');
        setLoading(false, modalForgotPassword);
    } catch (err) {
        alert('ไม่สามารถส่งอีเมลได้: ' + getErrorMessage(err.code));
        setLoading(false, modalForgotPassword);
    }
};

// --- Guest / Simple Login Logic ---

function saveSimpleUser() {
    const input = document.getElementById('simple-username');
    const name = input.value.trim();
    if (name) {
        localStorage.setItem('pali_user_name', name);
        location.reload(); 
    }
}

function checkSimpleLogin() {
    const simpleLoginSection = document.getElementById('simple-login-section');
    const appContent = document.getElementById('app-content');
    const introSection = document.getElementById('intro-section');
    const userName = localStorage.getItem('pali_user_name');
    const btnLogout = document.getElementById('btn-logout');

    // If Firebase user is present, they take precedence (handled in auth listener)
    if (window._currentUser) {
        if (simpleLoginSection) simpleLoginSection.style.display = 'none';
        if (introSection) introSection.style.display = 'none';
        return;
    }

    if (userName) {
        // Local User Logged In
        if (simpleLoginSection) simpleLoginSection.style.display = 'none';
        if (introSection) introSection.style.display = 'none';
        if (appContent) appContent.style.display = 'block';

        // Update UI
        const greetingEl = document.getElementById('dash-greeting');
        if (greetingEl) greetingEl.textContent = `สวัสดีครับ, ${userName}`;
        
        const userInfo = document.getElementById('user-info');
        if (userInfo) {
            userInfo.innerHTML = `<b>${userName}</b> <span style="font-size:0.75rem; background:#95a5a6; color:white; padding:2px 8px; border-radius:99px;">Guest</span>`;
            userInfo.style.display = 'inline-flex';
            userInfo.style.alignItems = 'center';
        }

        const btnOpenLogin = document.getElementById('btn-open-login');
        if (btnOpenLogin) btnOpenLogin.style.display = 'none';

        if (btnLogout) {
            btnLogout.style.display = 'inline-block';
            btnLogout.onclick = () => {
                localStorage.removeItem('pali_user_name');
                location.reload();
            };
        }
        
        // Show Dashboard with Local ID
        const fakeUser = { uid: 'local_' + userName, displayName: userName };
        if (typeof updateStudentDashboard === 'function') {
            updateStudentDashboard(fakeUser, 'student'); // Treat as student to show dashboard
        }
        
        // Check Resume for this user
        if (typeof checkResume === 'function') {
            checkResume(fakeUser.uid);
        }
    } else {
        // No Login
        if (simpleLoginSection) simpleLoginSection.style.display = 'block';
        if (introSection) introSection.style.display = 'block';
    }
}

// --- Main Auth Listener ---

auth.onAuthStateChanged((user) => {
    if (user) {
        closeLogin();
        // showUser(user); // ย้ายไปเรียกหลังจากดึงข้อมูลเพิ่มเติมเสร็จ
        if (appContent) appContent.style.display = 'block';

        // Load Pins immediately
        if (typeof loadTodayPins === 'function') loadTodayPins();

        const uid = user.uid;
        localStorage.setItem('pali_user_uid', uid);

        let cachedRole = null;
        try {
            const rc = localStorage.getItem('pali_role_cache');
            if (rc) {
                const obj = JSON.parse(rc);
                if (obj && obj[uid]) cachedRole = obj[uid];
            }
        } catch (e) {}

        // Fallback Admin List (กรณี Firestore Rules มีปัญหา)
        const FALLBACK_ADMIN_EMAILS = [
            'admin@example.com',
            'pali.theonlyone@gmail.com',
            'admin1234@hotmail.com' // Explicitly added by user request
        ];

        // บันทึกข้อมูลลง Firestore (Best Effort - ไม่รอผล)
        db.collection('users').doc(uid).set({
            displayName: user.displayName || '',
            email: user.email || '',
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }).catch(e => {
            console.warn("Update user info failed:", e.message);
            // Background sync failure - no need to alarm user heavily
        });

        if (cachedRole) {
            const displayUserEarly = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            };
            showUser(displayUserEarly, cachedRole);
            if (typeof applyRoleUI === 'function') applyRoleUI(cachedRole);
            if (cachedRole === 'admin') {
                if (typeof updateAdminBadge === 'function') updateAdminBadge();
                if (typeof updateLevelPendingBadges === 'function') updateLevelPendingBadges();
            }
        }

        (async () => {
            try {
                if (typeof loadSystemConfig === 'function') await loadSystemConfig(); // Load open levels first
                let role = 'general';
                let displayName = user.displayName;

                // 1. Try to get User Role from Firestore
                try {
                    const doc = await db.collection('users').doc(uid).get();
                    if (doc.exists && doc.data()) {
                        role = doc.data().role || 'general';
                    }
                } catch (e) {
                    console.warn("Firestore Read Error (User):", e.message);
                    // Fallback Check
                    if (FALLBACK_ADMIN_EMAILS.includes(user.email)) {
                        console.info("Admin Access granted via Fallback List");
                        role = 'admin';
                    }
                }

                if (cachedRole) {
                    const order = { general: 0, student: 1, teacher: 2, admin: 3 };
                    if (order[cachedRole] > order[role]) role = cachedRole;
                }

                // ถ้าเป็น Admin ให้ข้ามการตรวจสอบสถานะการสมัครเรียน
                if (role !== 'admin') {
                    
                    try {
                        const enr = await db.collection('enrollments').doc(uid).get();
                        if (enr.exists && enr.data()) {
                            const enrData = enr.data();
                            // Upgrade role if general and approved
                            if (enrData.status === 'approved' && role === 'general') {
                                role = 'student'; // Just display as student
                            }

                            // Construct Real Name if approved
                            if (enrData.status === 'approved') {
                                const title = enrData.title || '';
                                const first = enrData.firstName || '';
                                const last = enrData.lastName || '';
                                const epithet = enrData.epithet ? ` (${enrData.epithet})` : '';
                                displayName = `${title}${first} ${last}${epithet}`;
                                
                                // Persist enrolled level for UI filtering
                                try {
                                    const store = JSON.parse(localStorage.getItem('pali_enroll_level') || '{}');
                                    store[uid] = enrData.levelRequested || null;
                                    localStorage.setItem('pali_enroll_level', JSON.stringify(store));
                                } catch (e) {}
                            }
                        }
                    } catch (e) { 
                        console.warn("Enrollment Check Error:", e.message);
                    }
                }

                // Update User UI with correct name
                const displayUser = {
                    uid: user.uid,
                    email: user.email,
                    displayName: displayName,
                    photoURL: user.photoURL
                };
                try { window._currentUser = displayUser; window._currentRole = role; } catch (e) {}
                showUser(displayUser, role);
                if (typeof applyRoleUI === 'function') applyRoleUI(role);
                if (typeof updateStudentDashboard === 'function') updateStudentDashboard(displayUser, role);
                if (role === 'admin') {
                    if (typeof updateAdminBadge === 'function') updateAdminBadge();
                    if (typeof updateLevelPendingBadges === 'function') updateLevelPendingBadges();
                }

                try {
                    const rc2 = localStorage.getItem('pali_role_cache');
                    let obj2 = {};
                    if (rc2) obj2 = JSON.parse(rc2) || {};
                    obj2[uid] = role;
                    localStorage.setItem('pali_role_cache', JSON.stringify(obj2));
                } catch (e) {}

                try {
                    // Automatically handle role caching without prompting user
                    let isTeacherRole = (role === 'teacher' || role === 'admin');
                    
                    // Legacy access_mode cleanup
                    localStorage.removeItem('access_mode');

                    // Set simple flag for standalone tools (like reader.html)
                    if (isTeacherRole) {
                        localStorage.setItem('pali_is_teacher', 'true');
                    } else {
                        localStorage.removeItem('pali_is_teacher');
                    }
                } catch (e) {}

            } catch (e) {
                console.error("Critical Error in Auth Flow:", e);
                if (typeof showToast === 'function') showToast('ระบบยืนยันตัวตนขัดข้อง กรุณารีเฟรชหน้าจอ', 'error');
                // ถ้า Error หนักจริงๆ ให้แสดง User แบบปกติไปก่อน
                let fallbackRole = cachedRole;
                if (!fallbackRole && FALLBACK_ADMIN_EMAILS.includes(user.email)) fallbackRole = 'admin';
                if (fallbackRole) {
                    const displayUser2 = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    };
                    showUser(displayUser2, fallbackRole);
                    if (typeof applyRoleUI === 'function') applyRoleUI(fallbackRole);
                    if (fallbackRole === 'admin') {
                        if (typeof updateAdminBadge === 'function') updateAdminBadge();
                        if (typeof updateLevelPendingBadges === 'function') updateLevelPendingBadges();
                    }
                } else {
                    showUser(user);
                }
            }
        })();

        // โค้ดสร้าง Exam Sets (คงเดิม)
        db.collection('exam_sets').where('createdBy', '==', uid).limit(1).get().then(s => {
            if (s.empty) {
                return db.collection('exam_sets').add({
                    title: 'ชุดสอบแรก',
                    level: 'pt3',
                    createdBy: uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        }).then(() => {
            console.log("User data synced");
        }).catch(err => console.error("Firestore Error:", err));

    } else {
        localStorage.removeItem('pali_user_uid');
        hideUser();
        if (appContent) appContent.style.display = 'none';
        
        // If no user, check simple login
        checkSimpleLogin();
    }
});

setTimeout(checkSimpleLogin, 500);
