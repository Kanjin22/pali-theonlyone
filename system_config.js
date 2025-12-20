const systemConfig = {
    // รายชื่อห้องเรียนทั้งหมด
    classrooms: {
        "room1": {
            id: "room1",
            name: "ห้องเรียนที่ ๑ (ปกติ)",
            description: "สำหรับนักเรียนชั้นประโยค ๑-๒ ภาคปกติ",
            schedulePrefix: "pt12", // ใช้ data-pt12-xxx.js
            teachers: ["พระอาจารย์ A", "พระอาจารย์ B"],
            status: "active" // active, maintenance, closed
        },
        "room2": {
            id: "room2",
            name: "ห้องเรียนที่ ๒ (เร่งรัด)",
            description: "สำหรับนักเรียนที่ต้องการจบหลักสูตรเร็วขึ้น",
            schedulePrefix: "pt12_fast", // จะใช้ data-pt12_fast-xxx.js (สมมติ)
            teachers: ["พระอาจารย์ C"],
            status: "active"
        },
        "room3": {
            id: "room3",
            name: "ห้องเรียนที่ ๓ (ทบทวน)",
            description: "สำหรับนักเรียนที่ต้องการปูพื้นฐานใหม่",
            schedulePrefix: "pt12_review",
            teachers: ["พระอาจารย์ D"],
            status: "maintenance" // ปิดปรับปรุงชั่วคราว
        }
    },
    
    // ฟังก์ชันสำหรับดึงข้อมูลห้อง
    getRoom: function(id) {
        return this.classrooms[id] || this.classrooms["room1"];
    }
};
