
function initLevelPage(levelId) {
    if (typeof systemConfig === 'undefined') {
        console.error("system_config.js not loaded");
        return;
    }

    renderExamCountdown(levelId);
    renderRoomSelection(levelId);
    
    // Check if room is selected
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    
    if (roomId) {
        const room = systemConfig.getRoom(roomId);
        if (room && room.level === levelId) {
            renderRoomContent(room);
        } else {
             // Room ID exists but might belong to another level or not exist
             // Fallback: If room belongs to another level, redirect? 
             // Or just show content if valid room.
             if (room) {
                 renderRoomContent(room);
             }
        }
    } else {
        // Default behavior: Select the first available room for this level
        const rooms = systemConfig.getRoomsByLevel(levelId);
        if (rooms.length > 0) {
            // Redirect to the first room to have a default view
            // window.location.search = `?room=${rooms[0].id}`;
            // Better: Just render it without reload
            renderRoomContent(rooms[0]);
            
            // Update URL without reload (optional, but good for UX)
            const newUrl = window.location.pathname + `?room=${rooms[0].id}`;
            window.history.replaceState({path: newUrl}, '', newUrl);
            
            // Update UI to reflect active state
            renderRoomSelection(levelId); 
        } else {
             document.getElementById('room-content-section').style.display = 'none';
        }
    }
}

function renderExamCountdown(levelId) {
    const dateStr = systemConfig.examDates[levelId];
    if (!dateStr) return;

    const examDate = new Date(dateStr);
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const container = document.getElementById('exam-info-container');
    if (container) {
        container.innerHTML = `
            <div style="background: #e8f6f3; border: 1px solid #1abc9c; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <h3 style="margin: 0; color: #16a085;">📅 วันสอบ: ${formatThaiDate(dateStr)}</h3>
                <p style="margin: 5px 0 0 0; font-size: 1.1em; color: #e67e22; font-weight: bold;">
                    (เหลือเวลาอีก ${diffDays > 0 ? diffDays : 0} วัน)
                </p>
            </div>
        `;
    }
}

function formatThaiDate(dateStr) {
    const d = new Date(dateStr);
    const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function renderRoomSelection(levelId) {
    const rooms = systemConfig.getRoomsByLevel(levelId);
    const container = document.getElementById('room-selection-container');
    const urlParams = new URLSearchParams(window.location.search);
    const currentRoomId = urlParams.get('room') || (rooms.length > 0 ? rooms[0].id : null);

    if (container) {
        let html = '<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 30px;">';
        
        rooms.forEach(room => {
            const isActive = room.id === currentRoomId;
            html += `
                <a href="?room=${room.id}" class="room-btn" 
                   style="padding: 10px 20px; border-radius: 20px; text-decoration: none; 
                          background: ${isActive ? '#16a085' : '#fff'}; 
                          color: ${isActive ? 'white' : '#2c3e50'}; 
                          border: 1px solid ${isActive ? '#16a085' : '#bdc3c7'};
                          font-weight: bold; transition: all 0.2s;
                          box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                   ${room.name}
                </a>
            `;
        });

        // Add Create Room Button (Admin)
        html += `
            <a href="../admin/room_builder.html?level=${levelId}" class="room-btn" 
               style="padding: 10px 20px; border-radius: 20px; text-decoration: none; 
                      background: #fff; color: #7f8c8d; border: 1px dashed #7f8c8d;
                      font-weight: normal; font-size: 0.9em;">
               + สร้างห้องเรียนใหม่
            </a>
        `;

        html += '</div>';
        container.innerHTML = html;
    }
}

function renderRoomContent(room) {
    const section = document.getElementById('room-content-section');
    if(section) section.style.display = 'block';
    
    // Update Header (Optional, if we want to change title dynamically)
    // document.getElementById('page-title').innerText = `ห้องเรียน ${room.level.toUpperCase()} (${room.name})`;
    
    // Update Description
    // const desc = document.getElementById('page-description');
    // if(desc) desc.innerText = room.description;

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
