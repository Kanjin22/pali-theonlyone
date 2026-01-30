// js/schedule.js
// Security-hardened version with safe DOM manipulation

// --- Today Pins Logic ---
async function loadTodayPins() {
    const container = document.getElementById('today-schedule-container');
    if (!container) return;
    
    // Show the section when loading starts
    const section = document.getElementById('today-pins-section');
    if (section) section.style.display = 'block';

    if (typeof safeSetInnerHTML === 'function') safeSetInnerHTML(container, ''); else container.textContent = '';
    const header = document.createElement('div');
    header.style.padding = '14px 16px';
    header.style.borderBottom = '1px solid #eee';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    
    // SAFE: Create elements instead of innerHTML
    const titleDiv = document.createElement('div');
    titleDiv.style.fontWeight = '700';
    titleDiv.style.color = '#2c3e50';
    titleDiv.innerHTML = '<i class="fa-regular fa-calendar-check" style="color:#27ae60;"></i> ปักหมุดวันนี้';
    
    const dateDiv = document.createElement('div');
    dateDiv.id = 'today-date';
    dateDiv.style.color = '#7f8c8d';
    dateDiv.style.fontSize = '0.9rem';
    
    header.appendChild(titleDiv);
    header.appendChild(dateDiv);
    container.appendChild(header);
    const body = document.createElement('div');
    body.style.padding = '12px 16px';
    container.appendChild(body);

    // Show Skeleton while loading
    if (typeof showSkeleton === 'function') showSkeleton(body, 'list', 2);

    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    const iso = `${y}-${m}-${d}`;
    const todayLabel = `วันที่ ${d}/${m}/${y + 543}`;
    const todayDateEl = header.querySelector('#today-date');
    if (todayDateEl) todayDateEl.textContent = todayLabel;

    // Use Cache if available
    if (window._cachedRawPins && window._cachedRawPinsDate === iso) {
        renderPins(body, window._cachedRawPins);
        return;
    }

    // 1) Try Firestore config/today_pins
    let pinsLoaded = false;
    try {
        const doc = await db.collection('config').doc('today_pins').get();
        if (doc.exists && doc.data() && Array.isArray(doc.data().items)) {
            const pins = doc.data().items;
            // Only use manual pins if they are for TODAY
            if (doc.data().date === iso) {
                renderPins(body, pins);
                pinsLoaded = true;
            }
        }
    } catch (e) { }
    // 2) Load from 'schedules' collection (The New System)
    if (!pinsLoaded) {
        try {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const currentMonth = monthNames[today.getMonth()];
            const currentYear = today.getFullYear().toString();
            
            // Fetch classrooms for room names
            const roomSnap = await db.collection('classrooms').get();
            const roomMap = {};
            roomSnap.forEach(doc => {
                roomMap[doc.id] = doc.data().name || doc.id;
            });

            const snap = await db.collection('schedules')
                .where('month', '==', currentMonth)
                .where('year', '==', currentYear)
                .get();

            const allPins = [];
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
            const getLevelLabel = (l) => levelMap[l] || l;

            snap.forEach(doc => {
                const data = doc.data();
                // Find today's entry
                if (data.days && Array.isArray(data.days)) {
                    const dayEntry = data.days.find(d => d.date === iso);
                    if (dayEntry) {
                        const roomName = roomMap[data.roomId] || data.roomId;
                        const lvlLabel = `${getLevelLabel(data.level)} (${roomName})`;
                        
                        const extract = (periodData, periodName) => {
                            if (!periodData) return;
                            const timeLabel = periodName === 'morning' ? 'เช้า' : (periodName === 'afternoon' ? 'บ่าย' : 'ค่ำ');
                            
                            // Helper to add pin
                            const add = (subj, act) => {
                                if (!act) return;
                                
                                // Clean act (if array)
                                const cleanAct = Array.isArray(act) ? act.join('\n') : act;
                                
                                // Filter out 'undefined' string
                                if (typeof cleanAct === 'string' && cleanAct === 'undefined') return;
                                if (cleanAct === 'undefined') return;
                                // Determine subject label
                                let subjLabel = subj;
                                if (subj === 'Grammar') subjLabel = 'ไวยากรณ์';
                                else if (subj === 'Translate') subjLabel = 'แปล';
                                else if (subj === 'Return') subjLabel = 'กลับ';
                                else if (subj === 'Chan') subjLabel = 'ฉันท์';
                                else if (subj === 'Samphan') subjLabel = 'สัมพันธ์';
                                else if (subj === 'Tang') subjLabel = 'แต่ง';
                                
                                allPins.push({ time: timeLabel, act: cleanAct, level: lvlLabel, subject: subjLabel, roomId: data.roomId });
                            };

                            // 1. Structured Activities
                            if (periodData.activities) {
                                Object.keys(periodData.activities).forEach(k => {
                                    add(k, periodData.activities[k]);
                                });
                            } 
                            // 2. Legacy Fallbacks (if no structured activities found for standard types)
                            else {
                                if (periodData.activityGrammar) add('Grammar', periodData.activityGrammar);
                                if (periodData.activityTranslate) add('Translate', periodData.activityTranslate);
                                if (periodData.activityReturn) add('Return', periodData.activityReturn);
                                if (periodData.activityChan) add('Chan', periodData.activityChan);
                                if (periodData.activitySamphan) add('Samphan', periodData.activitySamphan);
                                if (periodData.activityTang) add('Tang', periodData.activityTang);
                                
                                // Generic
                                const hasSpecific = periodData.activityGrammar || periodData.activityTranslate || periodData.activityReturn || periodData.activityChan || periodData.activitySamphan || periodData.activityTang;
                                if (periodData.activity && !hasSpecific) {
                                    add('กิจกรรม', periodData.activity);
                                }
                            }
                        };

                        extract(dayEntry.morning, 'morning');
                        extract(dayEntry.afternoon, 'afternoon');
                        extract(dayEntry.evening, 'evening');
                    }
                }
            });

            if (allPins.length > 0) {
                // Sort pins: Morning -> Afternoon -> Evening, then by Level
                const timeOrder = { 'เช้า': 1, 'บ่าย': 2, 'ค่ำ': 3 };
                allPins.sort((a, b) => {
                    const tDiff = (timeOrder[a.time] || 4) - (timeOrder[b.time] || 4);
                    if (tDiff !== 0) return tDiff;
                    return a.level.localeCompare(b.level);
                });

                renderPins(body, allPins);
                pinsLoaded = true;
            }

        } catch (e) {
            console.error("Failed to load dynamic pins:", e);
        }
    }
    if (!pinsLoaded) {
        body.innerHTML = '<div style="color:#95a5a6; text-align:center; padding:20px;">ยังไม่มีรายการปักหมุดสำหรับวันนี้</div>';
    }
}

function renderPins(body, pins) {
    body.innerHTML = ''; // Clear previous content
    
    // Normalize activity -> act (Handle legacy/manual pins)
    if (pins && Array.isArray(pins)) {
        pins = pins.map(p => {
            if (!p.act && p.activity) return { ...p, act: p.activity };
            return p;
        });
    }

    // Filter out invalid pins (undefined/null activities)
    if (pins && Array.isArray(pins)) {
        pins = pins.filter(p => {
            if (!p.act) return false;
            const s = String(p.act).trim();
            return s !== 'undefined' && s !== 'null' && s !== '';
        });
    }

    if (!pins || pins.length === 0) {
        body.innerHTML = '<div style="color:#95a5a6; text-align:center; padding:20px;">ยังไม่มีรายการปักหมุดสำหรับวันนี้</div>';
        return;
    }
    try {
        // Filter for student: show only pins of their rooms
        let filtered = pins.slice();
        try {
            const user = window._currentUser;
            const role = window._currentRole;
            const myRooms = (window._myRooms && Array.isArray(window._myRooms)) ? window._myRooms : [];
            if (user && role === 'student' && myRooms.length > 0) {
                const allowIds = new Set(myRooms.map(r => r.id));
                const allowNames = new Set(myRooms.map(r => (r.name || r.id)));
                filtered = filtered.filter(p => {
                    if (p.roomId && allowIds.has(p.roomId)) return true;
                    if (!p.roomId && typeof p.level === 'string') {
                        for (const nm of allowNames) {
                            if (p.level.includes(nm)) return true;
                        }
                    }
                    return false;
                });
            }
        } catch (e) {}
        window.todayPins = filtered.slice();

        // FIX: Handle case where filtering removes all pins
        if (window.todayPins.length === 0 && pins.length > 0) {
            body.innerHTML = '<div style="color:#95a5a6; text-align:center; padding:20px;">ไม่มีรายการปักหมุดสำหรับห้องเรียนของคุณในวันนี้</div>';
            // Update dashboard anyway just in case
            if (window._currentUser && window._currentRole) {
                // Ensure updateStudentDashboard is available (from dashboard.js)
                if (typeof updateStudentDashboard === 'function') {
                    updateStudentDashboard(window._currentUser, window._currentRole);
                }
            }
            return;
        }

        if (window._currentUser && window._currentRole) {
            if (typeof updateStudentDashboard === 'function') {
                updateStudentDashboard(window._currentUser, window._currentRole);
            }
        }
    } catch (e) {}
    const groups = {};
    const pinsToShow = window.todayPins || pins;
    pinsToShow.forEach(p => {
        const level = (p.level || 'ทั่วไป');
        if (!groups[level]) groups[level] = [];
        groups[level].push(p);
    });

    Object.keys(groups).sort().forEach(lvl => {
        // Card Container
        const wrapper = document.createElement('div');
        wrapper.className = 'pin-card';
        wrapper.style.border = 'none';
        wrapper.style.borderRadius = '12px';
        wrapper.style.marginBottom = '15px';
        wrapper.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        wrapper.style.overflow = 'hidden';
        wrapper.style.backgroundColor = '#fff';

        // Header
        const title = document.createElement('div');
        title.style.background = 'linear-gradient(135deg, #d35400, #e67e22)';
        title.style.color = 'white';
        title.style.padding = '10px 15px';
        title.style.fontSize = '1.1rem';
        title.style.fontWeight = 'bold';
        title.style.display = 'flex';
        title.style.alignItems = 'center';
        title.style.justifyContent = 'space-between';
        title.style.cursor = 'pointer'; // Make clickable

        const titleText = document.createElement('div');
        titleText.innerHTML = `<i class="fa-solid fa-layer-group" style="margin-right:10px;"></i>${lvl}`;

        const toggleIcon = document.createElement('i');
        toggleIcon.className = 'fa-solid fa-chevron-down';
        toggleIcon.style.transition = 'transform 0.3s ease';

        title.appendChild(titleText);
        title.appendChild(toggleIcon);
        wrapper.appendChild(title);

        // Content List
        const list = document.createElement('div');
        list.style.padding = '15px';
        list.style.display = 'none'; // Default hidden
        list.style.flexDirection = 'column';
        list.style.gap = '10px';
        list.style.transition = 'all 0.3s ease';

        // Toggle logic
        title.addEventListener('click', () => {
            const isHidden = list.style.display === 'none';
            list.style.display = isHidden ? 'flex' : 'none';
            toggleIcon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        // Inject Mobile Styles
        if (!document.getElementById('schedule-mobile-styles')) {
            const style = document.createElement('style');
            style.id = 'schedule-mobile-styles';
            style.textContent = `
                @media (max-width: 600px) {
                    .pin-item-responsive {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                    .pin-time-badge-responsive {
                        margin-right: 0 !important;
                        margin-bottom: 8px !important;
                        align-self: flex-start !important;
                        min-width: auto !important;
                        padding: 4px 12px !important;
                    }
                    .pin-content-responsive {
                        width: 100% !important;
                        display: block !important;
                    }
                    .pin-subject-badge-responsive {
                        margin-bottom: 4px !important;
                        display: inline-block !important;
                        vertical-align: top !important;
                    }
                    .pin-act-text-responsive {
                        display: inline !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        groups[lvl].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'pin-item-responsive';
            itemDiv.style.display = 'flex';
            itemDiv.style.alignItems = 'flex-start';
            itemDiv.style.background = '#f8f9fa';
            itemDiv.style.padding = '10px';
            itemDiv.style.borderRadius = '8px';
            itemDiv.style.borderLeft = '4px solid #f39c12'; // Default accent

            // Time Badge
            let timeColor = '#7f8c8d';
            let timeIcon = 'fa-clock';
            if (item.time === 'เช้า') { timeColor = '#3498db'; timeIcon = 'fa-sun'; }
            else if (item.time === 'บ่าย') { timeColor = '#e67e22'; timeIcon = 'fa-cloud-sun'; }
            else if (item.time === 'ค่ำ') { timeColor = '#8e44ad'; timeIcon = 'fa-moon'; }

            const timeBadge = document.createElement('div');
            timeBadge.className = 'pin-time-badge-responsive';
            timeBadge.style.minWidth = '70px';
            timeBadge.style.backgroundColor = timeColor;
            timeBadge.style.color = 'white';
            timeBadge.style.padding = '4px 8px';
            timeBadge.style.borderRadius = '15px';
            timeBadge.style.fontSize = '0.85rem';
            timeBadge.style.fontWeight = 'bold';
            timeBadge.style.textAlign = 'center';
            timeBadge.style.marginRight = '12px';
            timeBadge.style.display = 'flex';
            timeBadge.style.alignItems = 'center';
            timeBadge.style.justifyContent = 'center';
            timeBadge.style.gap = '5px';
            timeBadge.innerHTML = `<i class="fa-solid ${timeIcon}"></i> ${item.time}`;

            // Content
            const contentDiv = document.createElement('div');
            contentDiv.className = 'pin-content-responsive';
            contentDiv.style.flex = '1';
            contentDiv.style.display = 'flex';
            contentDiv.style.alignItems = 'flex-start';

            // Subject Badge
            const subjectBadge = document.createElement('span');
            subjectBadge.className = 'pin-subject-badge-responsive';
            subjectBadge.style.display = 'inline-block';
            subjectBadge.style.flexShrink = '0';
            subjectBadge.style.fontSize = '0.8rem';
            subjectBadge.style.padding = '2px 8px';
            subjectBadge.style.borderRadius = '4px';
            subjectBadge.style.marginRight = '8px';
            subjectBadge.style.fontWeight = '600';

            if (item.subject === 'ไวยากรณ์') {
                subjectBadge.style.backgroundColor = '#e8f6f3';
                subjectBadge.style.color = '#1abc9c';
                subjectBadge.innerText = 'ไวยากรณ์';
                itemDiv.style.borderLeftColor = '#1abc9c';
            } else if (item.subject === 'แปล') {
                subjectBadge.style.backgroundColor = '#fef5e7';
                subjectBadge.style.color = '#f39c12';
                subjectBadge.innerText = 'แปล';
                itemDiv.style.borderLeftColor = '#f39c12';
            } else {
                subjectBadge.style.backgroundColor = '#ececec';
                subjectBadge.style.color = '#7f8c8d';
                subjectBadge.innerText = item.subject || 'กิจกรรม';
                itemDiv.style.borderLeftColor = '#7f8c8d';
            }

            const actText = document.createElement('span');
            actText.className = 'pin-act-text-responsive';
            actText.style.flex = '1';
            actText.style.fontSize = '1rem';
            actText.style.color = '#34495e';
            actText.style.whiteSpace = 'pre-wrap';
            actText.innerText = item.act;

            contentDiv.appendChild(subjectBadge);
            contentDiv.appendChild(actText);

            itemDiv.appendChild(timeBadge);
            itemDiv.appendChild(contentDiv);
            list.appendChild(itemDiv);
        });

        wrapper.appendChild(list);
        body.appendChild(wrapper);
    });
}
