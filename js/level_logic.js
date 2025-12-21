
function initLevelPage(levelId) {
    if (typeof systemConfig === 'undefined') {
        console.error("system_config.js not loaded");
        return;
    }

    // Disable Exam Countdown and Room Selection as per user request
    // renderExamCountdown(levelId);
    // renderRoomSelection(levelId);
    
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
             } else {
                 // Invalid room ID, maybe show error or redirect to select
                 console.error("Invalid room ID:", roomId);
             }
        }
    } else {
        // If no room selected (direct access), redirect to classroom selection
        // window.location.href = `../classroom_select.html?level=${levelId}`;
        
        // OR fallback to first room (keeping old behavior for safety but it shouldn't happen from flow)
        const rooms = systemConfig.getRoomsByLevel(levelId).filter(r => r.level === levelId);
        if (rooms.length > 0) {
            renderRoomContent(rooms[0]);
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
