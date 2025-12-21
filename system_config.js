const systemConfig = {
    // รายชื่อห้องเรียนทั้งหมด
    classrooms: {
        "room1": {
            id: "room1",
            level: "pt12",
            name: "สามเณรนวกะ ๒ ชุด C ห้อง ๔",
            description: "สำหรับสามเณรนวกะ ๒",
            schedulePrefix: "pt12_novice",
            teachers: ["พระมหากาญจน์"],
            status: "active"
        },
        "room2": {
            id: "room2",
            level: "pt12",
            name: "สาธุชนทั่วไป",
            description: "สำหรับบุคคลทั่วไปที่สนใจศึกษาบาลี",
            schedulePrefix: "pt12",
            teachers: ["พระมหากาญจน์"],
            status: "active"
        },
        "room3": {
            id: "room1",
            level: "pt8",
            name: "",
            description: "",
            schedulePrefix: "pt8_room1",
            teachers: ['พม.ดำรงค์ ปชฺโชตชโย ป.ธ.๙', 'ดร.'],
            status: "active"
        },
    },

    // ฟังก์ชันสำหรับดึงข้อมูลห้อง
    getRoom: function (id) {
        return this.classrooms[id] || this.classrooms["room1"];
    }
};