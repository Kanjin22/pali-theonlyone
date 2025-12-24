
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
        // No room selected -> Redirect to selection
        window.location.href = `../classroom_select.html?level=${levelId}`;
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
        title.innerHTML = `${room.name}`;
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
        months.forEach(m => {
             // Link to NEW dynamic schedule viewer
             // ID Format: roomId_Month_Year (e.g. pt12_1_November_2025)
             const scheduleId = `${room.id}_${m.month}_${m.year}`;
             html += `<a href="../schedule_view.html?id=${scheduleId}&room=${room.id}" class="menu-button">${m.name}</a>`;
        });
        
        // Add Create Schedule Button (Hidden by default, shown for Admin/Teacher only)
        html += `
            <a id="btn-create-schedule" href="../admin/schedule_builder.html?level=${room.level}&room=${room.id}" 
               class="menu-button" style="display:none; background-color: #f1c40f; color: #2c3e50; border: 2px dashed #f39c12; text-align:center;">
               + สร้างตารางเรียนใหม่
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
                        const btn = document.getElementById('btn-create-schedule');
                        if (btn) btn.style.display = 'flex'; // menu-button usually flex or block
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
}
