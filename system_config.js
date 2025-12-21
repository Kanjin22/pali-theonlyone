const systemConfig = {
    // รายชื่อห้องเรียนทั้งหมด
    classrooms: {
        "pt12_1": {
            id: "pt12_1",
            level: "pt12", // ประโยค ๑-๒
            name: "สามเณรนวกะ ๒ ชุด C ห้อง ๔",
            description: "สำหรับสามเณรนวกะ ๒",
            schedulePrefix: "pt12_1",
            teachers: ['พระมหากาญจน์'],
            status: "active"
        },
        "pt12_1": {
            id: "pt12_1",
            level: "pt12", // ประโยค ๑-๒
            name: "บ.ศ. ๑-๒ (สาธุชนทั่วไป)",
            description: "สำหรับบุคคลทั่วไปที่สนใจศึกษาบาลี",
            schedulePrefix: "pt12_1",
            teachers: ['พระมหากาญจน์'],
            status: "active"
        },
        "pt8_1": {
            id: "pt8_1",
            level: "pt8", // ประโยค ป.ธ.๘
            name: "พิเศษ",
            description: "สำหรับใช้เรียนเฉพาะกลุ่ม",
            schedulePrefix: "pt8_1",
            teachers: ['พม.ดำรงค์ ปชฺโชตชโย ป.ธ.๙'],
            status: "active"
        },
    },

    // ฟังก์ชันสำหรับดึงข้อมูลห้อง
    getRoom: function (id) {
        return this.classrooms[id] || this.classrooms["room1"];
    }
};