const systemConfig = {
    // รายชื่อห้องเรียนทั้งหมด
    classrooms: {
        "room1": {
            id: "room1",
            level: "pt12",
            name: "สามเณรนวกะ ๒ ชุด C ห้อง ๔",
            description: "สำหรับสามเณรนวกะ (ชุด C)",
            schedulePrefix: "pt12_novice", 
            teachers: ["พระมหากาญจน์"],
            status: "active"
        },
        "room2": {
            id: "room2",
            level: "balisuksa",
            name: "สาธุชนทั่วไป",
            description: "สำหรับบุคคลทั่วไปที่สนใจศึกษาบาลี",
            schedulePrefix: "pt12", 
            teachers: ["พระมหากาญจน์"],
            status: "active"
        }
    },
    
    // ฟังก์ชันสำหรับดึงข้อมูลห้อง
    getRoom: function(id) {
        return this.classrooms[id] || this.classrooms["room1"];
    }
};
