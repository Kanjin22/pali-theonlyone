
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
            { name: "พฤศจิกายน ๒๕๖๘", file: "november" },
            { name: "ธันวาคม ๒๕๖๘", file: "december" },
            { name: "มกราคม ๒๕๖๙", file: "january" },
            { name: "กุมภาพันธ์ ๒๕๖๙", file: "february" }
        ];

        let html = '';
        months.forEach(m => {
             // Link to schedule file with room param
             html += `<a href="../schedules/${room.level}/schedule-${room.level}-${m.file}.html?room=${room.id}" class="menu-button">${m.name}</a>`;
        });
        
        // Add Create Schedule Button
        html += `
            <a href="../admin/schedule_builder.html?level=${room.level}&room=${room.id}" 
               class="menu-button" style="background-color: #f1c40f; color: #2c3e50; border: 2px dashed #f39c12; text-align:center;">
               + สร้างตารางเรียนใหม่
            </a>
        `;

        scheduleContainer.innerHTML = html;
    }

    // Update Stats Link if exists
    const statsLink = document.getElementById('statsLink');
    if (statsLink) {
        statsLink.href = `../statistics.html?room=${room.id}`;
    }
}
