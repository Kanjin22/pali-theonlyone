const systemConfig = {
    // รายชื่อห้องเรียนทั้งหมด
    classrooms: {
        "pt12_1": {
            id: "pt12_1",
            level: "pt12", // ประโยค ๑-๒
            name: "สามเณรนวกะ ๒ ชุด C ห้อง ๔",
            description: "สำหรับสามเณรนวกะ ๒",
            schedulePrefix: "pt12_novice",
            teachers: ['พระมหากาญจน์'],
            status: "active"
        },
        "pt12_2": {
            id: "pt12_2",
            level: "pt12", // ประโยค ๑-๒
            name: "บ.ศ. ๑-๒ (สาธุชนทั่วไป)",
            description: "สำหรับบุคคลทั่วไปที่สนใจศึกษาบาลี",
            schedulePrefix: "pt12",
            teachers: ['พระมหากาญจน์'],
            status: "active"
        },
        "pt8_kan": {
            id: "pt8_kan",
            level: "pt8",
            name: "ป.ธ.๘ (พิเศษ)",
            description: "สำหรับเรียนส่วนตัวเท่านั้น",
            schedulePrefix: "pt8_kan",
            teachers: [],
            status: "active"
        },
    },

    // วันสอบของแต่ละชั้นประโยค (YYYY-MM-DD)
    examDates: {
        "pt12": "2025-02-23", // ตัวอย่าง
        "pt3": "2025-02-24",
        "pt4": "2025-02-25",
        "pt5": "2025-02-26",
        "pt6": "2025-02-27",
        "pt7": "2025-02-28",
        "pt8": "2025-03-01",
        "pt9": "2025-03-02"
    },

    // ฟังก์ชันสำหรับดึงข้อมูลห้อง
    getRoom: function (id) {
        return this.classrooms[id] || this.classrooms["pt12_2"]; // Default to Laypeople room if not found
    },

    // ดึงห้องเรียนทั้งหมดในระดับชั้นที่ระบุ
    getRoomsByLevel: function (level) {
        return Object.values(this.classrooms).filter(r => r.level === level && r.status === 'active');
    },

    // ฟังก์ชันช่วยแปลง path ไฟล์ให้ถูกต้องตามโครงสร้างใหม่
    resolvePath: function (path, level) {
        if (!path) return '';
        if (path.startsWith('http')) return path;

        // ถ้าเป็นไฟล์ใน materials, exams, answers ให้เติม level subfolder และถอยกลับ 2 ชั้น (../../)
        // เพราะไฟล์ html อยู่ใน schedules/ptxx/
        if (path.startsWith('materials/') || path.startsWith('exams/') || path.startsWith('answers/')) {
            const parts = path.split('/');
            const folder = parts[0];
            const filename = parts.slice(1).join('/');

            // ตรวจสอบว่ามี subfolder แล้วหรือยัง (เผื่อในอนาคต data file อัปเดตแล้ว)
            // แต่ตอนนี้เราจะบังคับใส่ level folder เข้าไป
            // แต่อย่าใส่ซ้ำ

            // เช็คว่า level ที่ส่งมาตรงกับ folder ที่ควรจะเป็นหรือไม่
            // สมมติว่า path ใน data file ยังเป็น "materials/filename.pdf"

            // Map level to folder name if needed (e.g. pt12 -> pt12)
            // แต่บางไฟล์อาจจะใช้ร่วมกัน? 
            // เอาเป็นว่าเราจะใส่ level ที่ส่งมา
            let targetLevel = level;

            // Map specific prefixes to folder names
            if (targetLevel === 'pt12_novice') targetLevel = 'pt12';
            if (targetLevel === 'pt12_2') targetLevel = 'pt12'; // Just in case

            // Logic พิเศษสำหรับไฟล์รวม (เช่น grammar-answer45)
            if (filename.includes('answer12') || filename.includes('exam12')) targetLevel = 'pt12';
            if (filename.includes('answer3') || filename.includes('exam3')) targetLevel = 'pt3';
            if (filename.includes('answer4') || filename.includes('exam4')) targetLevel = 'pt4';
            if (filename.includes('answer5') || filename.includes('exam5')) targetLevel = 'pt5';
            if (filename.includes('answer6') || filename.includes('exam6')) targetLevel = 'pt6';
            if (filename.includes('answer7') || filename.includes('exam7')) targetLevel = 'pt7';
            if (filename.includes('answer8') || filename.includes('exam8')) targetLevel = 'pt4';
            if (filename.includes('answer9') || filename.includes('exam9')) targetLevel = 'pt9';

            // ถ้า filename เริ่มต้นด้วย folder level อยู่แล้ว (เช่น materials/pt12/file.pdf) ก็ไม่ต้องทำอะไร
            if (filename.startsWith(targetLevel + '/')) {
                return '../../' + path;
            }

            return '../../' + folder + '/' + targetLevel + '/' + filename;
        }

        return path;
    }
};