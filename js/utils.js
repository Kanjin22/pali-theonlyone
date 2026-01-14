// js/utils.js

// Global Config for Open Levels
window.OPEN_LEVELS = [];

async function loadSystemConfig() {
    try {
        // Ensure db is available (from global firebase init)
        if (typeof db === 'undefined') return;
        
        const doc = await db.collection('config').doc('open_levels').get();
        if (doc.exists && doc.data().levels) {
            window.OPEN_LEVELS = doc.data().levels;
        }
    } catch (e) {
        console.warn("Failed to load config:", e);
    }
}

// --- Helper Functions ---

function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9999; display:flex; flex-direction:column; gap:10px;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'min-width:250px; padding:12px 16px; border-radius:8px; color:white; font-family:Sarabun, sans-serif; box-shadow:0 4px 6px rgba(0,0,0,0.2); opacity:0; transform:translateY(20px); transition:all 0.3s ease;';
    
    if (type === 'error') toast.style.backgroundColor = '#e74c3c';
    else if (type === 'success') toast.style.backgroundColor = '#27ae60';
    else if (type === 'warning') toast.style.backgroundColor = '#f39c12';
    else toast.style.backgroundColor = '#34495e';

    toast.innerHTML = `<div style="display:flex; align-items:center; justify-content:space-between;"><span>${message}</span><i class="fa-solid fa-xmark" style="cursor:pointer; margin-left:10px;" onclick="this.parentElement.parentElement.remove()"></i></div>`;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    // Auto dismiss
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

function safeNotify(message, type = 'info') {
    if (typeof showToast === 'function') {
        showToast(message, type);
        return;
    }
    try {
        let bar = document.getElementById('fallback-notify-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'fallback-notify-bar';
            bar.style.position = 'fixed';
            bar.style.left = '0';
            bar.style.right = '0';
            bar.style.bottom = '0';
            bar.style.padding = '10px 16px';
            bar.style.zIndex = '9999';
            bar.style.textAlign = 'center';
            bar.style.fontFamily = 'Sarabun, sans-serif';
            document.body.appendChild(bar);
        }
        let bg = '#34495e';
        if (type === 'error') bg = '#e74c3c';
        else if (type === 'success') bg = '#27ae60';
        else if (type === 'warning') bg = '#f39c12';
        bar.style.backgroundColor = bg;
        bar.style.color = '#ffffff';
        bar.textContent = message;
    } catch (e) {
        console.error(message);
    }
}

// --- Skeleton Loader ---
function injectSkeletonStyles() {
    if (document.getElementById('skeleton-styles')) return;
    const style = document.createElement('style');
    style.id = 'skeleton-styles';
    style.textContent = `
        @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        .skeleton {
            background: #eee;
            background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            border-radius: 4px;
        }
        .skeleton-text { height: 1em; margin-bottom: 0.5em; width: 100%; }
        .skeleton-card { height: 100px; width: 100%; border-radius: 8px; margin-bottom: 10px; }
        .skeleton-circle { width: 40px; height: 40px; border-radius: 50%; }
    `;
    document.head.appendChild(style);
}

function showSkeleton(container, type = 'list', count = 3) {
    injectSkeletonStyles();
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        if (type === 'card') {
            el.className = 'skeleton skeleton-card';
        } else if (type === 'text') {
            el.className = 'skeleton skeleton-text';
            el.style.width = Math.random() * 50 + 50 + '%'; // Random width 50-100%
        } else if (type === 'list') {
            el.className = 'skeleton';
            el.style.height = '60px';
            el.style.marginBottom = '10px';
            el.style.borderRadius = '8px';
        }
        container.appendChild(el);
    }
}

// ฟังก์ชันช่วยแสดงข้อความ Error เป็นภาษาไทย
function getErrorMessage(code) {
    switch (code) {
        case 'auth/email-already-in-use': return 'อีเมลนี้มีผู้ใช้งานแล้ว กรุณาเข้าสู่ระบบ';
        case 'auth/invalid-email': return 'รูปแบบอีเมลไม่ถูกต้อง';
        case 'auth/weak-password': return 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
        case 'auth/wrong-password': return 'รหัสผ่านไม่ถูกต้อง';
        case 'auth/user-not-found': return 'ไม่พบผู้ใช้งานนี้ในระบบ';
        case 'auth/popup-closed-by-user': return 'คุณปิดหน้าต่างล็อกอินก่อนทำรายการสำเร็จ';
        case 'auth/too-many-requests': return 'ทำรายการเกินกำหนด กรุณารอสักครู่แล้วลองใหม่';
        case 'auth/operation-not-allowed': return 'ยังไม่ได้เปิดใช้งานผู้ให้บริการล็อกอินนี้ หรือการตั้งค่าไม่สมบูรณ์ (เช่น LINE ยังไม่ได้เชื่อมต่อกับ Firebase Console/LINE Developer Console)';
        default: return 'เกิดข้อผิดพลาด (' + code + ')';
    }
}

// ฟังก์ชันล็อกปุ่มขณะโหลด
function setLoading(isLoading, btnElement) {
    if (isLoading) {
        if (btnElement) {
            btnElement.dataset.originalText = btnElement.innerText;
            btnElement.innerText = 'กำลังโหลด...';
            btnElement.disabled = true;
        }
    } else {
        if (btnElement) {
            btnElement.innerText = btnElement.dataset.originalText || 'ตกลง';
            btnElement.disabled = false;
        }
    }
}

function enforceAsciiEmail(el) {
    if (!el) return;
    el.addEventListener('input', () => {
        const v = el.value || '';
        // อนุญาตตัวอักษรภาษาอังกฤษ ตัวเลข และสัญลักษณ์อีเมล
        const s = v.replace(/[^A-Za-z0-9@._%+\-]/g, '');
        if (s !== v) el.value = s;
    });
}

function switchTab(tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    // Deactivate all tab buttons
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    // Show selected tab content and activate button
    const targetContent = document.getElementById(`tab-${tabName}`);
    const targetBtn = document.getElementById(`tab-btn-${tabName}`);
    
    if (targetContent) targetContent.classList.add("active");
    if (targetBtn) targetBtn.classList.add("active");
}

function backupUserData() {
    const dataToBackup = {};
    // Backup all pali_ keys
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pali_') || key.startsWith('reader_notes') || key.startsWith('vocab_notebook') || key === 'simple_user') {
                dataToBackup[key] = localStorage.getItem(key);
        }
    }
    
    const dataStr = JSON.stringify(dataToBackup, null, 2);
    const blob = new Blob([dataStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pali_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// --- Theme Logic ---
function initTheme() {
    const currentTheme = localStorage.getItem('theme');
    const btn = document.getElementById('theme-toggle');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && btn) {
            btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('theme', target);
    
    const btn = document.getElementById('theme-toggle');
    if(btn) {
        btn.innerHTML = target === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
}

// --- Initialization ---

// Initialize Theme immediately
initTheme();

// ตรวจสอบว่าเป็น LINE หรือ Facebook In-App Browser หรือไม่
var ua = navigator.userAgent || navigator.vendor || window.opera;
var isLine = (ua.indexOf("Line") > -1) || (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);

if (isLine) {
    // สร้าง Div แจ้งเตือนสีแดงเด่นๆ บนหน้าเว็บเฉพาะคนกลุ่มนี้
    document.addEventListener('DOMContentLoaded', function () {
        var warningDiv = document.createElement('div');
        warningDiv.style.cssText = "background: #c0392b; color: white; padding: 15px; text-align: center; position: fixed; top: 0; left: 0; width: 100%; z-index: 10000; box-shadow: 0 2px 10px rgba(0,0,0,0.2); font-family: 'Sarabun', sans-serif;";
        warningDiv.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px;">
                <div style="font-size: 1.1rem; font-weight: bold;"><i class="fa-solid fa-triangle-exclamation"></i> แจ้งเตือน: เว็บไซต์นี้อาจทำงานไม่สมบูรณ์บนแอปนี้</div>
                <div style="font-size: 0.95rem;">กรุณากดที่เมนูมุมบนขวา (3 จุด) แล้วเลือก <strong>"เปิดในเบราว์เซอร์" (Open in Browser)</strong> เพื่อใช้งานได้เต็มรูปแบบ</div>
            </div>
        `;
        document.body.prepend(warningDiv);
        // ดันเนื้อหาลงมาหน่อยไม่ให้บัง
        document.body.style.paddingTop = "100px";
    });
}
