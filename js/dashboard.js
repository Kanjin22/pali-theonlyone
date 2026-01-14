// js/dashboard.js

// --- Badge & Role UI Logic ---

async function updateAdminBadge() {
    try {
        const snap = await db.collection('enrollments').where('status', '==', 'pending').get();
        const count = snap.size;
        const badge = document.getElementById('admin-badge-count');
        if (badge) {
            if (count > 0) {
                badge.textContent = count > 99 ? '99+' : String(count);
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    } catch (e) {}
}

function ensureLevelBadge(anchor) {
    if (!anchor) return null;
    let badge = anchor.querySelector('.level-pending-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'level-pending-badge';
        badge.style.cssText = 'display:none; position:absolute; top:8px; right:8px; background-color:red; color:white; border-radius:999px; padding:2px 6px; font-size:0.75rem; font-weight:bold; min-width:22px; text-align:center;';
        badge.textContent = '0';
        anchor.style.position = 'relative';
        anchor.appendChild(badge);
    }
    return badge;
}

async function updateLevelPendingBadges() {
    try {
        const snap = await db.collection('enrollments').where('status', '==', 'pending').get();
        const counts = {};
        snap.forEach(doc => {
            const d = doc.data();
            const lvl = d.levelRequested || '';
            if (!lvl) return;
            counts[lvl] = (counts[lvl] || 0) + 1;
        });
        
        const cards = Array.from(document.querySelectorAll('a[href^="classroom_select.html"]'));
        cards.forEach(a => {
            const href = a.getAttribute('href') || '';
            const q = href.split('?')[1] || '';
            const params = new URLSearchParams(q);
            const lvl = params.get('level');
            const badge = ensureLevelBadge(a);
            const c = counts[lvl] || 0;
            if (badge) {
                if (c > 0) {
                    badge.textContent = c > 99 ? '99+' : String(c);
                    badge.style.display = 'inline-block';
                } else {
                    badge.style.display = 'none';
                }
            }
        });
    } catch (e) {
        console.warn('updateLevelPendingBadges failed:', e);
    }
}

function applyRoleUI(role) {
    // 1. Toggle Top Admin Button
    const btnAdminTop = document.getElementById('btn-admin-dashboard');
    if (btnAdminTop) {
        btnAdminTop.style.display = (role === 'admin') ? 'inline-flex' : 'none';
    }

    const classroomLinks = Array.from(document.querySelectorAll('a[href^="classroom_select.html"]'));

    const enrollCardId = 'enroll-card';
    const existingEnroll = document.getElementById(enrollCardId);

    // Logic:
    // - Admin/Teacher: See ALL classrooms
    // - Student: See ONLY Open Levels
    // - General: See NONE (Show Enroll Card instead)

    if (role === 'admin' || role === 'teacher') {
        // Show All
        classroomLinks.forEach(a => a.style.display = 'flex');

        if (existingEnroll) existingEnroll.remove();

    } else if (role === 'student') {
        // Show ONLY student's assigned rooms if available; otherwise fallback to level
        const uid = (typeof firebase !== 'undefined' && firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        const myRoomsSection = document.getElementById('my-rooms-section');
        const myRoomsGrid = document.getElementById('my-rooms-grid');
        
        async function fetchMyRooms() {
            let roomIds = [];
            try {
                const doc = await db.collection('classrooms_members').doc(uid).get();
                if (doc.exists && doc.data() && Array.isArray(doc.data().rooms)) {
                    roomIds = doc.data().rooms;
                }
            } catch (e) {}
            // Fallback: try enrollments.rooms array if present
            if (roomIds.length === 0) {
                try {
                    const enr = await db.collection('enrollments').doc(uid).get();
                    if (enr.exists && enr.data() && Array.isArray(enr.data().rooms)) {
                        roomIds = enr.data().rooms;
                    }
                } catch (e) {}
            }
            return roomIds;
        }

        function renderMyRooms(rooms) {
            if (!myRoomsSection || !myRoomsGrid) return false;
            if (typeof safeSetInnerHTML === 'function') safeSetInnerHTML(myRoomsGrid, ''); else myRoomsGrid.textContent = '';
            if (!rooms || rooms.length === 0) {
                myRoomsSection.style.display = 'none';
                return false;
            }
            const levelMap = { pt12: 'ประโยค ๑-๒', pt3: 'ประโยค ๓', pt4: 'ประโยค ๔', pt5: 'ประโยค ๕', pt6: 'ประโยค ๖', pt7: 'ประโยค ๗', pt8: 'ประโยค ๘', pt9: 'ประโยค ๙' };
            rooms.forEach(r => {
                const a = document.createElement('a');
                a.className = 'menu-card level-tool';
                a.href = `levels/home_${r.level}.html?room=${r.id}`;
                const icon = document.createElement('div');
                icon.className = 'icon-box';
                if (typeof safeSetInnerHTML === 'function') safeSetInnerHTML(icon, '<i class="fa-solid fa-school"></i>'); else icon.innerHTML = '<i class="fa-solid fa-school"></i>';
                const title = document.createElement('div');
                title.className = 'card-title';
                title.textContent = r.name || r.id;
                const desc = document.createElement('div');
                desc.className = 'card-desc';
                desc.textContent = levelMap[r.level] || r.level;
                a.appendChild(icon); a.appendChild(title); a.appendChild(desc);
                myRoomsGrid.appendChild(a);
            });
            myRoomsSection.style.display = 'block';
            return true;
        }

        (async () => {
            // Show Skeleton
            if (myRoomsSection) myRoomsSection.style.display = 'block';
            if (myRoomsGrid && typeof showSkeleton === 'function') showSkeleton(myRoomsGrid, 'card', 2);

            const ids = await fetchMyRooms();
            const rooms = [];
            for (const id of ids) {
                try {
                    const doc = await db.collection('classrooms').doc(id).get();
                    if (doc.exists) rooms.push({ id, ...doc.data() });
                } catch (e) {}
            }
            try { window._myRooms = rooms; } catch (e) {}
            // Reload pins after loading rooms to ensure correct filtering
            if (typeof loadTodayPins === 'function') loadTodayPins();
            const shown = renderMyRooms(rooms);
            
            if (shown) {
                // Hide generic classroom section completely
                const label = document.getElementById('pali-classrooms-label');
                const grid = document.getElementById('pali-classrooms-grid');
                if (label) label.style.display = 'none';
                if (grid) grid.style.display = 'none';

                classroomLinks.forEach(a => a.style.display = 'none');
                if (existingEnroll) existingEnroll.remove();
            } else {
                // Fallback to single level card behavior
                let enrolledLevel = null;
                try {
                    const obj = JSON.parse(localStorage.getItem('pali_enroll_level') || '{}');
                    if (uid && obj[uid]) enrolledLevel = obj[uid];
                } catch (e) {}
                
                classroomLinks.forEach(a => {
                    const urlParams = new URLSearchParams(a.href.split('?')[1] || '');
                    const level = urlParams.get('level');
                    if (enrolledLevel && level === enrolledLevel) {
                        a.style.display = 'flex';
                    } else {
                        a.style.display = 'none';
                    }
                });
                if (existingEnroll) existingEnroll.remove();
            }
        })();

    } else {
        // General or others -> Hide All, Show Enroll
        classroomLinks.forEach(a => a.style.display = 'none');

        createEnrollCard(enrollCardId, classroomLinks.length ? classroomLinks[0].parentElement : null);
    }

    const teacherToolLink = document.querySelector('a[href="exam_builder.html"]');
    if (teacherToolLink) {
        const toolsGrid = teacherToolLink.closest('.grid-menu');
        const toolsLabel = toolsGrid ? toolsGrid.previousElementSibling : null;
        const showTools = (role === 'admin' || role === 'teacher');
        if (toolsGrid) {
            toolsGrid.style.display = showTools ? 'grid' : 'none';
        }
        if (toolsLabel && toolsLabel.classList.contains('section-label')) toolsLabel.style.display = showTools ? 'block' : 'none';
    }
}

function createEnrollCard(id, container) {
    try {
        if (!container) {
            const grids = document.querySelectorAll('.grid-menu');
            container = grids[1] || grids[0] || null;
        }
        if (!container || document.getElementById(id)) return;
        const a = document.createElement('a');
        a.id = id;
        a.href = 'pages/enroll.html';
        a.className = 'menu-card level-tool';
        a.style.display = 'flex';
        a.style.background = '#fffbe6';
        a.style.border = '2px solid #f1c40f';
        a.style.boxShadow = '0 10px 25px rgba(241,196,15,0.25)';
        a.style.position = 'relative';
            const enrollHtml = '<span style="position:absolute; top:10px; right:10px; background:#e67e22; color:#fff; font-size:0.8rem; padding:4px 10px; border-radius:999px;">สำคัญ</span><div class="icon-box" style="color:#e67e22;"><i class="fa-solid fa-user-graduate"></i></div><div class="card-title" style="color:#c0392b;">สมัครเรียน</div><div class="card-desc" style="color:#7f8c8d;">กรอกข้อมูลและเลือกชั้นเรียนที่เปิดรับ</div>';
            if (typeof safeSetInnerHTML === 'function') safeSetInnerHTML(a, enrollHtml); else a.innerHTML = enrollHtml;
        container.insertBefore(a, container.firstChild);
    } catch (e) { }
}

function updateStudentDashboard(user, role) {
    const dashboard = document.getElementById('student-dashboard');
    if (!dashboard) return;

    if (role !== 'student') {
        dashboard.style.display = 'none';
        return;
    }

    dashboard.style.display = 'block';

    // 1. Update Greeting
    const greetingEl = document.getElementById('dash-greeting');
    if (greetingEl && user.displayName) {
        greetingEl.textContent = `สวัสดีครับ, ${user.displayName}`;
    }

    // 2. Update Level & Link
    const levelEl = document.getElementById('dash-level');
    const btnEl = document.getElementById('dash-classroom-btn');
    const resumeBtnEl = document.getElementById('dash-resume-btn');
    const flashBtnEl = document.getElementById('dash-flashcard-btn');
    
    if (flashBtnEl) {
        flashBtnEl.onclick = (e) => { e.preventDefault(); openFlashcardsModal(user.uid); };
    }
    
    let enrolledLevel = null;
    try {
        const obj = JSON.parse(localStorage.getItem('pali_enroll_level') || '{}');
        if (obj && user.uid && obj[user.uid]) enrolledLevel = obj[user.uid];
    } catch (e) {}

    const levelMap = {
        'pt12': 'ประโยค ๑-๒',
        'pt3': 'ประโยค ๓',
        'pt4': 'ประโยค ๔',
        'pt5': 'ประโยค ๕',
        'pt6': 'ประโยค ๖',
        'pt7': 'ประโยค ๗',
        'pt8': 'ประโยค ๘',
        'pt9': 'ประโยค ๙'
    };

    const myRooms = (window._myRooms && Array.isArray(window._myRooms)) ? window._myRooms : [];
    if (myRooms.length > 0) {
        const first = myRooms[0];
        if (levelEl) levelEl.textContent = `เข้าห้อง: ${first.name || first.id} (${levelMap[first.level] || first.level})`;
        if (btnEl) {
            btnEl.href = `levels/home_${first.level}.html?room=${first.id}`;
            btnEl.style.display = 'flex';
        }
    } else
    if (enrolledLevel && levelMap[enrolledLevel]) {
        if (levelEl) levelEl.textContent = `กำลังศึกษาชั้น: ${levelMap[enrolledLevel]}`;
        if (btnEl) {
            btnEl.href = `classroom_select.html?level=${enrolledLevel}`;
            btnEl.style.display = 'flex';
        }
    } else {
        if (levelEl) levelEl.textContent = 'ยินดีต้อนรับสู่ห้องเรียนบาลี';
        if (btnEl) btnEl.style.display = 'none';
    }

    // 3. Update Streak
    const streakEl = document.getElementById('dash-streak');
    if (streakEl) {
        try {
            const today = new Date().toISOString().split('T')[0];
            let streakData = JSON.parse(localStorage.getItem('pali_streak_data') || '{"lastVisit": "", "streak": 0}');
            
            if (streakData.lastVisit !== today) {
                const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                
                if (streakData.lastVisit === yesterday) {
                    streakData.streak++;
                } else {
                    streakData.streak = 1;
                }
                streakData.lastVisit = today;
                localStorage.setItem('pali_streak_data', JSON.stringify(streakData));
            }
            streakEl.textContent = `${streakData.streak} วัน`;
        } catch (e) {
            console.warn('Streak update failed:', e);
        }
    }

    // 4. Weekly Goal progress (3 sessions/week)
    const weekEl = document.getElementById('dash-week');
    if (weekEl) {
        try {
            const today = new Date();
            const day = today.getDay(); // 0 Sun - 6 Sat
            const monday = new Date(today);
            const sunday = new Date(today);
            // Set to Monday
            monday.setDate(today.getDate() - ((day + 6) % 7));
            monday.setHours(0,0,0,0);
            // Set to Sunday
            sunday.setDate(monday.getDate() + 6);
            sunday.setHours(23,59,59,999);

            const fmt = (d) => d.toISOString().split('T')[0];

            let visitDates = [];
            try {
                visitDates = JSON.parse(localStorage.getItem('pali_visit_dates') || '[]');
            } catch (e) { visitDates = []; }

            const todayStr = fmt(today);
            if (!visitDates.includes(todayStr)) {
                visitDates.push(todayStr);
                localStorage.setItem('pali_visit_dates', JSON.stringify(visitDates));
            }

            const count = visitDates.filter(ds => {
            const dt = new Date(ds + 'T00:00:00');
            return dt >= monday && dt <= sunday;
        }).length;

        const userGoal = parseInt(localStorage.getItem('user_weekly_goal') || 3);
        weekEl.textContent = `${Math.min(count, userGoal)}/${userGoal} ครั้ง`;
    } catch (e) {
        console.warn('Weekly progress failed:', e);
    }
}

if (resumeBtnEl) {
    resumeBtnEl.style.display = 'none'; // ซ่อนไว้ก่อน

    // ฟังก์ชันช่วยสร้างลิงก์
    const setupResumeButton = (data) => {
        if (!data) return;
        const resumeHtml = '<i class="fa-solid fa-clock-rotate-left"></i> เรียนต่อ: ' + (data.title || 'ล่าสุด');
        if (typeof safeSetInnerHTML === 'function') safeSetInnerHTML(resumeBtnEl, resumeHtml); else resumeBtnEl.innerHTML = resumeHtml;
        
        if (data.type === 'reader') {
            // สร้าง URL ของ Reader
            let url = `reader.html?resume=true`;
            // ถ้ามีข้อมูลละเอียดก็ใส่ไปเลยเพื่อความแม่นยำ (Backup)
            if(data.level) url += `&level=${encodeURIComponent(data.level)}`;
            resumeBtnEl.href = url;
        } else {
            // สร้าง URL ของ Presentation
            resumeBtnEl.href = `presentation.html?id=${data.id}&index=${data.index}`;
        }
        resumeBtnEl.style.display = 'flex';
    };

    function fallbackToLocal() {
        try {
            // เช็ค LocalStorage แบบระบุชื่อ (Simple Login)
            let localData = null;
            // Use user.displayName safely
            if (user && user.displayName) {
                    localData = localStorage.getItem(`pali_progress_local_${user.displayName}`);
            }
            // หรือเช็คแบบ Guest ล่าสุด
            if (!localData) localData = localStorage.getItem('pali_last_session');

            if (localData) {
                setupResumeButton(JSON.parse(localData));
            }
        } catch (e) { }
    }

    // 1. ลองดึงจาก Firestore ก่อน (ข้อมูลล่าสุดจากทุกเครื่อง)
    if (user && user.uid && !user.uid.startsWith('local_')) {
        db.collection('users').doc(user.uid).collection('progress').doc('last_session').get()
        .then((doc) => {
            if (doc.exists) {
                // เจอใน Cloud -> ใช้เลย
                setupResumeButton(doc.data());
            } else {
                // ไม่เจอใน Cloud -> ลองดูใน LocalStorage (เครื่องนี้)
                fallbackToLocal();
            }
        }).catch(() => {
            // Error -> Fallback ไป Local
            fallbackToLocal();
        });
    } else {
        fallbackToLocal();
    }
}

    // 6. Today pins summary
    const todayEl = document.getElementById('dash-today');
    if (todayEl) {
        const pins = window.todayPins || [];
        if (pins.length > 0) {
            const p = pins[0];
            const summary = `${p.level ? p.level + ': ' : ''}${p.time || ''}${p.subject ? ' • ' + p.subject : ''}${p.act ? ' • ' + p.act : ''}`;
            todayEl.textContent = `วันนี้: ${summary}`;
        } else {
            todayEl.textContent = 'วันนี้: ยังไม่มีรายการ';
        }
    }
    
    const scoreEl = document.getElementById('dash-flash-score');
    if (scoreEl) {
        const uid = user.uid;
        db.collection('flashcard_stats').doc(uid).get().then(doc => {
            if (doc.exists && doc.data()) {
                const data = doc.data();
                const total = Number(data.totalCorrect || 0);
                scoreEl.textContent = String(total);
            } else {
                try {
                    const local = JSON.parse(localStorage.getItem('pali_flash_stats') || '{"totalCorrect":0}');
                    scoreEl.textContent = String(local.totalCorrect || 0);
                } catch (e) { scoreEl.textContent = '0'; }
            }
        }).catch(() => {
            try {
                const local = JSON.parse(localStorage.getItem('pali_flash_stats') || '{"totalCorrect":0}');
                scoreEl.textContent = String(local.totalCorrect || 0);
            } catch (e) { scoreEl.textContent = '0'; }
        });
    }
}

function openFlashcardsModal(uid) {
    // Redirect to the new dedicated Flashcards page
    window.location.href = 'flashcards.html';
}

function checkResume(specificUid = null) {
    const resumeSection = document.getElementById('resume-section');
    const resumeBtn = document.getElementById('resume-btn');
    const resumeTitle = document.getElementById('resume-title');
    const resumeDesc = document.getElementById('resume-desc');

    try {
        let saved = null;
        if (specificUid) {
            saved = localStorage.getItem(`pali_progress_${specificUid}`);
        }
        if (!saved) {
            saved = localStorage.getItem('pali_last_session');
        }

        if (saved) {
            const state = JSON.parse(saved);
            const isReader = state && state.type === 'reader' && typeof state.scrollTop !== 'undefined';
            const isPresentation = state && state.id && typeof state.index !== 'undefined';
            if (isReader || isPresentation) {
                resumeSection.style.display = 'block';
                resumeTitle.textContent = state.title || "บทเรียนล่าสุด";
                
                const date = new Date(state.timestamp);
                const timeStr = date.toLocaleDateString('th-TH') + ' ' + date.toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'});
                resumeDesc.textContent = `เรียนต่อจากที่ค้างไว้ (${timeStr})`;
                
                if (state.type === 'reader') {
                        resumeBtn.href = 'reader.html?resume=true';
                } else {
                        resumeBtn.href = `presentation.html?id=${state.id}&index=${state.index}`;
                }
                return;
            }
        }
        
        resumeSection.style.display = 'none';
    } catch (e) {
        console.error("Error loading resume state", e);
        resumeSection.style.display = 'none';
    }
}

function editWeeklyGoal() {
    const currentGoal = localStorage.getItem('user_weekly_goal') || 3;
    const newGoal = prompt("ตั้งเป้าหมายจำนวนครั้งที่จะเรียนในสัปดาห์นี้:", currentGoal);
    
    if (newGoal !== null && !isNaN(newGoal) && newGoal > 0) {
        localStorage.setItem('user_weekly_goal', parseInt(newGoal));
        
        // Refresh Dashboard if possible, or just update text
        const weekEl = document.getElementById('dash-week');
        if (weekEl) {
            const text = weekEl.textContent; // e.g. "1/3 ครั้ง"
            const parts = text.split('/');
            if (parts.length > 0) {
                const count = parseInt(parts[0]);
                weekEl.textContent = `${Math.min(count, newGoal)}/${newGoal} ครั้ง`;
            }
        }
    }
}
