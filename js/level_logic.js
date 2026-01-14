
async function initLevelPage(levelId) {
    // Check if room is selected
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    
    // Ensure Firebase Firestore is available
    if (typeof db === 'undefined' && typeof firebase !== 'undefined') {
        window.db = firebase.firestore();
    }

    if (roomId) {
        try {
            // Try fetching from Firestore first
            let room = null;
            if (typeof db !== 'undefined') {
                 const doc = await db.collection('classrooms').doc(roomId).get();
                 if (doc.exists) room = doc.data();
            }

            // Fallback to systemConfig if Firestore fails or not found (and systemConfig exists)
            if (!room && typeof systemConfig !== 'undefined') {
                room = systemConfig.getRoom(roomId);
            }

            if (room) {
                 let allow = true;
                 if (typeof firebase !== 'undefined') {
                     const u = firebase.auth().currentUser;
                     if (u) {
                         
                         let role = 'general';
                         try {
                             const userDoc = await firebase.firestore().collection('users').doc(u.uid).get();
                             if (userDoc.exists && userDoc.data()) role = userDoc.data().role || role;
                         } catch (e) {}

                         // Teacher/Admin can always access
                        if (role === 'teacher' || role === 'admin') {
                            allow = true;
                        }
                        // Students check enrollment
                        else {
                             try {
                                 const enr = await firebase.firestore().collection('enrollments').doc(u.uid).get();
                                 const approved = enr.exists && enr.data().status === 'approved';
                                 const rooms = enr.exists && Array.isArray(enr.data().rooms) ? enr.data().rooms : [];
                                 const isMember = rooms.includes(roomId);
                                 
                                 // Allow if approved member OR if fallback admin (for safety)
                                 const FALLBACK_ADMINS = ['admin1234@hotmail.com'];
                                 if (!approved || !isMember) {
                                     if (!FALLBACK_ADMINS.includes(u.email)) allow = false;
                                 }
                             } catch (e) { allow = false; }
                         }
                     } else { allow = false; }
                 }
                 if (!allow) { window.location.href = '../index.html'; return; }
                 renderRoomContent(room);
            } else {
                 console.error("Invalid room ID:", roomId);
                 document.body.innerHTML = "<h1 style='text-align:center; margin-top:50px;'>ไม่พบห้องเรียนที่ระบุ</h1>";
            }

        } catch (e) {
            console.error("Error fetching room:", e);
             // Fallback
             if (typeof systemConfig !== 'undefined') {
                const room = systemConfig.getRoom(roomId);
                if (room) renderRoomContent(room);
             }
        }
    } else {
        const container = document.getElementById('room-selection-container');
        if (container) {
            try {
                let role = 'general';
                let user = null;
                let myRooms = [];
                if (typeof firebase !== 'undefined') {
                    user = firebase.auth().currentUser;
                    if (user) {
                        try {
                            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
                            if (doc.exists && doc.data()) role = doc.data().role || role;
                        } catch (e) {}
                        try {
                            const enr = await firebase.firestore().collection('enrollments').doc(user.uid).get();
                            if (enr.exists && Array.isArray(enr.data().rooms)) myRooms = enr.data().rooms;
                        } catch (e) {}
                    }
                }
                let rooms = [];
                if (typeof db !== 'undefined') {
                    const snap = await db.collection('classrooms').where('level', '==', levelId).get();
                    snap.forEach(d => rooms.push({ id: d.id, ...d.data() }));
                }
                if (rooms.length === 0 && typeof systemConfig !== 'undefined') {
                    for (let k in systemConfig.classrooms) {
                        const r = systemConfig.classrooms[k];
                        if (r.level === levelId) rooms.push({ id: r.id, ...r });
                    }
                }
                const modePref = localStorage.getItem('access_mode') || 'auto';
                const effectiveMode = (function(){
                    if (role === 'teacher' || role === 'admin') return 'teacher';
                    if (modePref === 'teacher') return 'teacher';
                    if (role === 'student') return 'student';
                    return (Array.isArray(myRooms) && myRooms.length > 0) ? 'student' : 'teacher';
                })();
                let visible = rooms;
                if (effectiveMode === 'student') {
                    const allowIds = new Set(myRooms);
                    visible = rooms.filter(r => allowIds.has(r.id));
                }
                container.style.display = 'block';
                if (typeof safeSetInnerHTML === 'function') safeSetInnerHTML(container, ''); else container.textContent = '';
                if (visible.length === 0) {
                    container.innerHTML = `<div style="padding:20px; color:#7f8c8d;">ยังไม่มีห้องในชั้นนี้สำหรับคุณ</div>`;
                    return;
                }
                const grid = document.createElement('div');
                grid.style.cssText = 'display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:12px;';
                const teacherName = user ? (user.displayName || user.email || user.uid) : '';
                visible.forEach(r => {
                    const card = document.createElement('a');
                    card.href = `../schedule_view.html?id=${r.id}_January_2026&room=${r.id}`;
                    card.className = 'menu-button';
                    const isTeaching = effectiveMode === 'teacher' && Array.isArray(r.teachers) && teacherName && r.teachers.includes(teacherName);
                    const badge = isTeaching ? `<span style="display:inline-block; margin-left:8px; background:#27ae60; color:#fff; padding:2px 8px; border-radius:10px; font-size:0.75rem;">สอนอยู่</span>` : '';
                    const cardHtml2 = `${r.name || r.id}${badge}`;
                    if (typeof safeSetInnerHTML === 'function') safeSetInnerHTML(card, cardHtml2); else card.innerHTML = cardHtml2;
                    grid.appendChild(card);
                });
                container.appendChild(grid);
            } catch (e) {
                const container2 = document.getElementById('room-selection-container');
                if (container2 && typeof systemConfig !== 'undefined') {
                    const rooms = systemConfig.getRoomsByLevel(levelId).map(r => ({ id: r.id, ...r }));
                    container2.style.display = 'block';
                    container2.innerHTML = '';
                    if (rooms.length === 0) {
                        container2.innerHTML = `<div style="padding:20px; color:#7f8c8d;">ยังไม่มีห้องในชั้นนี้สำหรับคุณ</div>`;
                        return;
                    }
                    const grid = document.createElement('div');
                    grid.style.cssText = 'display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:12px;';
                    const user = (typeof firebase !== 'undefined') ? firebase.auth().currentUser : null;
                    const teacherName = user ? (user.displayName || user.email || user.uid) : '';
                    rooms.forEach(r => {
                        const card = document.createElement('a');
                        card.href = `../schedule_view.html?id=${r.id}_January_2026&room=${r.id}`;
                        card.className = 'menu-button';
                        const isTeaching = Array.isArray(r.teachers) && teacherName && r.teachers.includes(teacherName);
                        const badge = isTeaching ? `<span style="display:inline-block; margin-left:8px; background:#27ae60; color:#fff; padding:2px 8px; border-radius:10px; font-size:0.75rem;">สอนอยู่</span>` : '';
                        card.innerHTML = `${r.name || r.id}${badge}`;
                        grid.appendChild(card);
                    });
                    container2.appendChild(grid);
                    return;
                }
                window.location.href = `../classroom_select.html?level=${levelId}`;
            }
        } else {
            window.location.href = `../classroom_select.html?level=${levelId}`;
        }
    }
}

function renderExamCountdown(levelId) {
    // Disabled
    const container = document.getElementById('exam-info-container');
    if (container) container.style.display = 'none';
}

function renderRoomSelection(levelId) {
    // Disabled
    const container = document.getElementById('room-selection-container');
    if (container) container.style.display = 'none';
}

function renderRoomContent(room) {
    const section = document.getElementById('room-content-section');
    if(section) section.style.display = 'block';
    
    // Update Header to show Room Name
    const title = document.getElementById('page-title');
    if (title) {
        // Check if title already has room name to avoid duplication
        // Or just overwrite it cleanly
        // Mapping level to Thai name if needed, or just use room.name
        title.textContent = `${room.name}`;
    }
    
    const desc = document.getElementById('page-description');
    if(desc) {
        desc.innerText = room.description || '';
    }

    // Render Schedule Links
    const scheduleContainer = document.getElementById('schedule-links-container');
    if (scheduleContainer) {
        // Standard Months (can be dynamic later)
        const months = [
            { name: "พฤศจิกายน ๒๕๖๘", month: "November", year: "2025" },
            { name: "ธันวาคม ๒๕๖๘", month: "December", year: "2025" },
            { name: "มกราคม ๒๕๖๙", month: "January", year: "2026" },
            { name: "กุมภาพันธ์ ๒๕๖๙", month: "February", year: "2026" }
        ];

        let html = '';
        
        // Add "Today's Schedule" Button
        const todayUrl = `../schedule_view.html?mode=daily&room=${room.id}`;
        html += `<a href="${todayUrl}" class="menu-button" style="background-color: #e74c3c; color: white;">📅 ตารางเรียนวันนี้</a>`;

        months.forEach(m => {
             // Link to NEW dynamic schedule viewer
             // ID Format: roomId_Month_Year (e.g. pt12_1_November_2025)
             const scheduleId = `${room.id}_${m.month}_${m.year}`;
             html += `<a href="../schedule_view.html?id=${scheduleId}&room=${room.id}" class="menu-button">${m.name}</a>`;
        });
        
        // Link to Reader (Textbooks)
        const readerUrl = `../reader.html?level=${room.level}`;
        html += `<a href="${readerUrl}" class="menu-button" style="background-color:#3498db; color:#fff;">📖 อ่านเนื้อหา / ตำราเรียน</a>`;
        
        // Add Create Schedule Button (Hidden by default, shown for Admin/Teacher only)
        html += `
            <a id="btn-create-schedule" href="../admin/schedule_builder.html?level=${room.level}&room=${room.id}" 
               class="menu-button" style="display:none; background-color: #f1c40f; color: #2c3e50; border: 2px dashed #f39c12; text-align:center;">
               + สร้างตารางเรียนใหม่
            </a>
            <a id="btn-exam-builder" href="../exam_builder.html?level=${room.level}&room=${room.id}"
               class="menu-button" style="display:none; background-color:#8e44ad; color:#fff; border:2px solid #7d3c98; text-align:center;">
               ออกข้อสอบ
            </a>
        `;
        
        scheduleContainer.innerHTML = html;

        // Check Permissions
        if (typeof firebase !== 'undefined') {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    const FALLBACK_ADMINS = ['admin1234@hotmail.com'];
                    let allow = false;

                    // 1. Check Fallback
                    if (FALLBACK_ADMINS.includes(user.email)) allow = true;

                    // 2. Check Firestore Role
                    if (!allow) {
                        try {
                            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
                            if (doc.exists) {
                                const role = doc.data().role;
                                if (role === 'admin' || role === 'teacher') allow = true;
                            }
                        } catch (e) {
                            console.error("Role check failed:", e);
                        }
                    }

                    if (allow) {
                        try {
                            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
                            const role = doc.exists ? (doc.data().role || 'general') : 'general';
                            const btn = document.getElementById('btn-create-schedule');
                            const examBtn = document.getElementById('btn-exam-builder');
                            if (btn) {
                                let canCreate = false;
                                if (role === 'admin') canCreate = true;
                                else {
                                    const teacherName = user.displayName || user.email || user.uid;
                                    const teachers = Array.isArray(room.teachers) ? room.teachers : [];
                                    canCreate = teachers.includes(teacherName);
                                }
                                btn.style.display = canCreate ? 'flex' : 'none';
                                if (examBtn) examBtn.style.display = canCreate ? 'flex' : 'none';
                            }
                        } catch (e) {}
                    }
                }
            });
        }
    }

    // Update Stats Link if exists
    const statsLink = document.getElementById('statsLink');
    if (statsLink) {
        statsLink.href = `../statistics.html?room=${room.id}`;
    }

    // Update Subject Links with Room ID
    const subjectContainer = document.getElementById('subject-links-container');
    if (subjectContainer) {
        const links = subjectContainer.querySelectorAll('a');
        links.forEach(link => {
            const url = new URL(link.href, window.location.origin);
            url.searchParams.set('room', room.id);
            // Also preserve level if it exists, or add it if missing and known
            if (!url.searchParams.has('level') && room.level) {
                url.searchParams.set('level', room.level);
            }
            // Add return_to parameter
            url.searchParams.set('return_to', window.location.href);
            link.href = url.toString();
        });
    }
}
