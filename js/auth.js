// js/auth.js

const auth = firebase.auth();
const db = firebase.firestore();

// --- DOM Elements (Auth) ---
const loginModal = document.getElementById('login-modal');
const btnCloseLogin = document.getElementById('btn-close-login');
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
            // ✅ FIXED: Store role in memory/sessionStorage instead of localStorage
            window._currentUserRole = role;
            sessionStorage.setItem('pali_user_role_session', role);
        }
            // ✅ FIXED: Use safe DOM creation instead of innerHTML for XSS prevention
            userInfo.textContent = '';
        const nameSpan = document.createElement('b');
        nameSpan.textContent = name;  // ✅ Safe - no HTML/JS execution
        userInfo.appendChild(nameSpan);
        if (statusHtml) {
            const statusSpan = document.createElement('span');
                if (typeof safeSetInnerHTML === 'function') safeSetInnerHTML(statusSpan, statusHtml);
                else statusSpan.innerHTML = statusHtml;
            userInfo.appendChild(statusSpan);
        }
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
    if (loginModal) {
        loginModal.style.display = 'flex';
        const card = document.getElementById('login-modal-card');
        if (card) {
            card.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
            card.style.transform = 'scale(0.98)';
            card.style.opacity = '0';
            requestAnimationFrame(() => {
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
            });
        }
    }
}

function closeLogin() {
    if (loginModal) {
        loginModal.style.display = 'none';
    }
}

// ✅ ADDED: Password validation function
function validatePassword(password) {
    const errors = [];
    if (password.length < 8) errors.push('ต้องมีอย่างน้อย 8 ตัวอักษร');
    if (!/[A-Z]/.test(password)) errors.push('ต้องมีตัวพิมพ์ใหญ่');
    if (!/[0-9]/.test(password)) errors.push('ต้องมีตัวเลข');
    if (!/[!@#$%^&*]/.test(password)) errors.push('ต้องมีสัญลักษณ์');
    return { valid: errors.length === 0, message: errors.join(', ') };
}

// Event Listeners for Login Buttons
if (btnOpenLogin) btnOpenLogin.onclick = openLogin;
if (btnLogoutTop) btnLogoutTop.onclick = () => {
    if (confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
        auth.signOut().then(() => {
            localStorage.removeItem('pali_user_role');
            localStorage.removeItem('pali_enroll_level');
            // ✅ FIXED: Clear memory and session storage
            window._currentUserRole = null;
            sessionStorage.removeItem('pali_user_role_session');
            location.reload();
        });
    }
};
if (btnCloseLogin) btnCloseLogin.onclick = closeLogin;
if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) closeLogin();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLogin();
    });
}

// --- Social Login ---

const btnLoginGoogle = document.getElementById('login-google');
const btnLoginFacebook = document.getElementById('login-facebook');
const btnLoginLine = document.getElementById('login-line');

window.loginGoogle = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    } catch (error) {
        const msg = (typeof getErrorMessage === 'function')
            ? getErrorMessage(error.code || '')
            : 'ไม่สามารถเข้าสู่ระบบด้วย Google ได้: ' + (error.message || '');
        if (typeof safeNotify === 'function') safeNotify(msg, 'error');
    }
};

window.loginFacebook = async () => {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        await auth.signInWithPopup(provider);
    } catch (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
             const msg = 'อีเมลนี้มีการใช้งานแล้วด้วยวิธีอื่น (เช่น Google) กรุณาล็อกอินด้วยวิธีนั้น';
             if (typeof safeNotify === 'function') safeNotify(msg, 'warning');
        } else {
             const msg = (typeof getErrorMessage === 'function')
                 ? getErrorMessage(error.code || '')
                 : 'ไม่สามารถเข้าสู่ระบบด้วย Facebook ได้: ' + (error.message || '');
            if (typeof safeNotify === 'function') safeNotify(msg, 'error');
        }
    }
};

if (btnLoginGoogle) btnLoginGoogle.onclick = () => window.loginGoogle && window.loginGoogle();
if (btnLoginFacebook) btnLoginFacebook.onclick = () => window.loginFacebook && window.loginFacebook();
if (btnLoginLine) btnLoginLine.onclick = () => window.loginLine && window.loginLine();

window.loginLine = async () => {
    try {
        const provider = new firebase.auth.OAuthProvider('oidc.line');
        await auth.signInWithPopup(provider);
    } catch (error) {
        let msg = '';
        if (typeof getErrorMessage === 'function' && error && error.code && String(error.code).indexOf('auth/') === 0) {
            msg = getErrorMessage(error.code);
        } else {
            msg = 'ไม่สามารถเข้าสู่ระบบด้วย LINE ได้: ' + (error && error.message ? error.message : '');
        }
        if (typeof safeNotify === 'function') safeNotify(msg, 'error');
    }
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

// Helper references (match index.html IDs)
const modalEmailInput = document.getElementById('modal-email');
const modalPasswordInput = document.getElementById('modal-password');
const emailStatus = document.getElementById('email-status');
const btnModalNext = document.getElementById('modal-email-next');
const btnModalSignin = document.getElementById('modal-email-signin');
const btnModalSignup = document.getElementById('modal-email-signup');
const btnModalForgot = document.getElementById('modal-forgot-password');

// Apply ASCII enforcement
enforceAsciiEmail(modalEmailInput);

// Next: decide login vs signup
if (btnModalNext) btnModalNext.onclick = async () => {
    const rawEmail = modalEmailInput.value.trim();
    if (!rawEmail) return;
    const checked = (window.validator && typeof window.validator.validateEmail === 'function')
        ? window.validator.validateEmail(rawEmail)
        : { valid: !!rawEmail, sanitized: rawEmail };
    if (!checked.valid) {
        emailStatus.textContent = 'รูปแบบอีเมลไม่ถูกต้อง';
        emailStatus.style.color = 'red';
        return;
    }
    const email = checked.sanitized;
    try {
        setLoading(true, btnModalNext);
        const methods = await auth.fetchSignInMethodsForEmail(email);
        modalPasswordInput.style.display = 'block';
        if (methods && methods.includes('password')) {
            btnModalSignin.style.display = 'inline-block';
            btnModalSignup.style.display = 'none';
            btnModalForgot.style.display = 'inline-block';
            emailStatus.textContent = 'พบบัญชีในระบบ กรุณาใส่รหัสผ่าน';
            emailStatus.style.color = '#607d8b';
        } else {
            btnModalSignin.style.display = 'none';
            btnModalSignup.style.display = 'inline-block';
            btnModalForgot.style.display = 'none';
            emailStatus.textContent = 'ยังไม่มีบัญชี กรุณาตั้งรหัสผ่านเพื่อสมัครสมาชิก';
            emailStatus.style.color = '#607d8b';
        }
    } catch (err) {
        emailStatus.textContent = getErrorMessage(err.code || 'auth/error');
        emailStatus.style.color = 'red';
    } finally {
        setLoading(false, btnModalNext);
    }
};
if (btnCloseLogin) btnCloseLogin.onclick = closeLogin;

// Sign in with email/password
if (btnModalSignin) btnModalSignin.onclick = async () => {
    const email = modalEmailInput.value.trim();
    const pass = modalPasswordInput.value.trim();
    if (!email || !pass) return;
    try {
        setLoading(true, btnModalSignin);
        await auth.signInWithEmailAndPassword(email, pass);
    } catch (err) {
        setLoading(false, btnModalSignin);
        emailStatus.textContent = getErrorMessage(err.code || 'auth/error');
        emailStatus.style.color = 'red';
    }
};

// Sign up with email/password
if (btnModalSignup) btnModalSignup.onclick = async () => {
    const email = modalEmailInput.value.trim();
    const pass = modalPasswordInput.value.trim();
    if (!email || !pass) return;
    const validation = validatePassword(pass);
    if (!validation.valid) {
        emailStatus.textContent = 'รหัสผ่านอ่อนแอ: ' + validation.message;
        emailStatus.style.color = 'red';
        return;
    }
    try {
        setLoading(true, btnModalSignup);
        await auth.createUserWithEmailAndPassword(email, pass);
    } catch (err) {
        setLoading(false, btnModalSignup);
        emailStatus.textContent = getErrorMessage(err.code || 'auth/error');
        emailStatus.style.color = 'red';
    }
};

// 4. ลืมรหัสผ่าน
if (btnModalForgot) btnModalForgot.onclick = async () => {
    const email = modalEmailInput.value.trim();
    if (!email) return;

    setLoading(true, btnModalForgot);
    try {
        await auth.sendPasswordResetEmail(email);
        const msg = 'ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมล ' + email + ' แล้วครับ';
        if (typeof safeNotify === 'function') {
            safeNotify(msg, 'success');
        }
        setLoading(false, btnModalForgot);
    } catch (err) {
        const msg = 'ไม่สามารถส่งอีเมลได้: ' + getErrorMessage(err.code);
        if (typeof safeNotify === 'function') {
            safeNotify(msg, 'error');
        }
        setLoading(false, btnModalForgot);
    }
};

// --- Guest / Simple Login Logic ---

// ✅ FIXED: Use Firebase Anonymous Auth instead of localStorage
async function saveSimpleUser() {
    const input = document.getElementById('simple-username');
    const name = input.value.trim();
    if (!name) return;
    
    try {
        const btnGuest = document.getElementById('btn-guest-login');
        setLoading(true, btnGuest);
        // Sign in anonymously with Firebase
        const result = await auth.signInAnonymously();
        const user = result.user;
        
        // Update display name
        await user.updateProfile({ displayName: name });
        
        // ✅ SECURE: UID comes from Firebase, cannot be faked
        // onAuthStateChanged will handle the rest
    } catch (error) {
        setLoading(false, document.getElementById('btn-guest-login'));
        const msg = 'ไม่สามารถเข้าใช้งานแบบทดลองได้: ' + (error.message || '');
        if (typeof safeNotify === 'function') safeNotify(msg, 'error');
    }
}

function checkSimpleLogin() {
    const simpleLoginSection = document.getElementById('simple-login-section');
    const appContent = document.getElementById('app-content');
    const introSection = document.getElementById('intro-section');
    
    // ✅ FIXED: Rely on Firebase auth state only, not localStorage
    // If Firebase user is present, they take precedence (handled in auth listener)
    if (window._currentUser) {
        if (simpleLoginSection) simpleLoginSection.style.display = 'none';
        if (introSection) introSection.style.display = 'none';
        return;
    }

    // ✅ FIXED: Guest login is now handled by onAuthStateChanged (Firebase Anonymous Auth)
    // If no Firebase user, show login section
    if (simpleLoginSection) simpleLoginSection.style.display = 'block';
    if (introSection) introSection.style.display = 'block';
}

// --- Main Auth Listener ---

const btnGuestLogin = document.getElementById('btn-guest-login');
if (btnGuestLogin) btnGuestLogin.onclick = () => saveSimpleUser();

auth.onAuthStateChanged((user) => {
    if (user) {
        closeLogin();
        // showUser(user); // ย้ายไปเรียกหลังจากดึงข้อมูลเพิ่มเติมเสร็จ
        if (appContent) appContent.style.display = 'block';

        // Load Pins immediately
        if (typeof loadTodayPins === 'function') loadTodayPins();

        const uid = user.uid;
        // ✅ FIXED: Store UID in memory and sessionStorage only, not localStorage
        window._currentUserUID = uid;
        sessionStorage.setItem('pali_user_uid_session', uid);

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
            try {
                const validatedEmail = (window.validator && typeof window.validator.validateEmail === 'function')
                    ? window.validator.validateEmail(user.email || '').sanitized
                    : (user.email || '');
                const safeDisplayName = (typeof sanitizeHTML === 'function') ? sanitizeHTML(user.displayName || '') : (user.displayName || '');
                const userDoc = {
                    displayName: safeDisplayName,
                    email: validatedEmail,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                };
                db.collection('users').doc(uid).set(userDoc, { merge: true }).catch(e => {
                    console.warn("Update user info failed:", e.message);
                });
            } catch (e) {
                console.warn('User write validation failed:', e);
            }

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
                if (typeof safeNotify === 'function') safeNotify('ระบบยืนยันตัวตนขัดข้อง กรุณารีเฟรชหน้าจอ', 'error');
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
                    // Validate title and level before creating a default exam set
                    const defaultTitle = (typeof sanitizeHTML === 'function') ? sanitizeHTML('ชุดแบบทดสอบเริ่มต้น') : 'ชุดแบบทดสอบเริ่มต้น';
                    const levelVal = (window.validator && typeof window.validator.validateLevel === 'function') ? window.validator.validateLevel('pt3').sanitized : 'pt3';
                    return db.collection('exam_sets').add({
                        title: defaultTitle,
                        level: levelVal,
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
