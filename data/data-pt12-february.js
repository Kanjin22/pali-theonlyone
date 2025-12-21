// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (เวอร์ชัน 3.0 - Modal)        ==
// ==  รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบเฉลยอัตโนมัติ  ==
// ===================================================================

var dataFebruary = [
    // ===============================================================
    // ==                 *** ตัวอย่างต้นแบบ ***                     ==
    // ==   คัดลอกบล็อก {...}, นี้ไปใช้ แล้วแก้ไขข้อมูลตามต้องการ      ==
    // ===============================================================
    //{
    // --- ข้อมูลหลักของวัน (จำเป็นต้องมี) ---
    //    date: "YYYY-MM-DD",          // รูปแบบปี-เดือน-วัน (ค.ศ.) สำหรับการคำนวณ
    //    displayDate: "ว. ดด-เดือน-ปป", // ข้อความวันที่ ที่จะแสดงในตาราง

    // --- หมายเหตุ (แสดงที่คอลัมน์สุดท้าย) ---
    //    remarks: {
    //        grammar: "หมายเหตุสำหรับวิชาไวยากรณ์ (ถ้ามี)",
    //        translate: [
    //            "หมายเหตุสำหรับวิชาแปล ชุดที่ 1 (ถ้ามี)",
    //            "หมายเหตุสำหรับวิชาแปล ชุดที่ 2 (ถ้ามี)"
    //        ],
    //        general: "หมายเหตุทั่วไป ไม่เกี่ยวกับวิชาใดเป็นพิเศษ (ถ้ามี)"
    //    },

    // --- กิจกรรมช่วงเช้า ---
    //    morning: {
    //        activityGrammar: "ข้อความกิจกรรมของวิชาไวยากรณ์ (ถ้ามี)",
    //        activityTranslate: "ข้อความกิจกรรมของวิชาแปล (ถ้ามี)",
    //        linkZoom: "https://... (ลิงก์ Zoom ถ้ามี)",
    //        linkYoutube: "https://... (ลิงก์ YouTube ถ้ามี)",
    //        fileNoteGrammar: "materials/pt12/... (ไฟล์เนื้อหาไวยากรณ์ ถ้ามี)",
    //        fileNoteTranslate: [
    //            "materials/pt12/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 1 ถ้ามี)",
    //            "materials/pt12/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 2 ถ้ามี)"
    //        ]
    //    },

    // --- กิจกรรมช่วงบ่าย (ตัวอย่างการสอบ) ---
    //    afternoon: {
    //        activityGrammar: "กิจกรรมไวยากรณ์ช่วงบ่าย (ถ้ามี)",
    //        activityTranslate: "กิจกรรมแปลช่วงบ่าย (ถ้ามี)",
    //        isExam: true, // ใส่ true ถ้าช่วงเวลานี้มีการสอบ
    //        examStartTime: "HH:MM:SS", // เวลาเริ่มสอบ (24-hour format)
    //        examEndTime: "HH:MM:SS",   // เวลาสิ้นสุดการสอบ (สำคัญสำหรับเฉลย)
    //        fileExamGrammar: "exams/pt12/... (ไฟล์ข้อสอบไวยากรณ์ ถ้ามี)",
    //        fileAnswerGrammar: "answers/pt12/... (ไฟล์เฉลยไวยากรณ์ ถ้ามี)",
    //        fileExamTranslate: "exams/pt12/... (ไฟล์ข้อสอบแปล ถ้ามี)",
    //        fileAnswerTranslate: "answers/pt12/... (ไฟล์เฉลยแปล ถ้ามี)"
    //    },

    // --- กิจกรรมช่วงค่ำ (ตัวอย่างกิจกรรมทั่วไป) ---
    //    evening: {
    //        activity: "กิจกรรมทั่วไปที่ไม่แยกวิชา (ถ้ามี)"
    //    }
    //},
    // --- ตัวอย่างสำหรับวันหยุดสุดสัปดาห์ ---
    //{
    //    date: "YYYY-MM-DD",
    //    displayDate: "ว. ดด-เดือน-ปป",
    //    isWeekend: true, // ใส่ true เพื่อให้เป็นแถบสีเทา
    //    remarks: {
    //        general: "ข้อความสำหรับวันหยุด (ถ้ามี)"
    //    }
    //},

    // ===============================================================
    // ==                  *** เริ่มข้อมูลจริง ***                    ==
    // ===============================================================

    // ########## กุมภาพันธ์ 2569 ##########
    {
        date: "2026-02-01", displayDate: "อา. ๑-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๕๐ - ๒๕๕๑" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๕๐-๕๑",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2550-2551.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๕๐-๕๑",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2550-2551.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2550-2551.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๕๐-๕๑"] }
    },

    // --- วันที่ 2 : ปี 52-53 ---
    {
        date: "2026-02-02", displayDate: "จ. ๒-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๕๒ - ๒๕๕๓" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๕๒-๕๓",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2552-2553.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๕๒-๕๓",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2552-2553.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2552-2553.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๕๒-๕๓"] }
    },

    // --- วันที่ 3 : ปี 54-55 ---
    {
        date: "2026-02-03", displayDate: "อ. ๓-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๕๔ - ๒๕๕๕" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๕๔-๕๕",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2554-2555.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๕๔-๕๕",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2554-2555.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2554-2555.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๕๔-๕๕"] }
    },

    // --- วันที่ 4 : ปี 56-57 ---
    {
        date: "2026-02-04", displayDate: "พ. ๔-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๕๖ - ๒๕๕๗" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๕๖-๕๗",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2556-2557.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๕๖-๕๗",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2556-2557.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2556-2557.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๕๖-๕๗"] }
    },

    // --- วันที่ 5 : ปี 58-59 ---
    {
        date: "2026-02-05", displayDate: "พฤ. ๕-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๕๘ - ๒๕๕๙" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๕๘-๕๙",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2558-2559.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๕๘-๕๙",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2558-2559.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2558-2559.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๕๘-๕๙"] }
    },

    // --- วันที่ 6 : ปี 60-61 ---
    {
        date: "2026-02-06", displayDate: "ศ. ๖-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๖๐ - ๒๕๖๑" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๖๐-๖๑",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2560-2561.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๖๐-๖๑",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2560-2561.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2560-2561.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๖๐-๖๑"] }
    },

    // --- วันที่ 7 : ปี 62-63 ---
    {
        date: "2026-02-07", displayDate: "ส. ๗-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๖๒ - ๒๕๖๓" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๖๒-๖๓",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2562-2563.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๖๒-๖๓",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2562-2563.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2562-2563.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๖๒-๖๓"] }
    },

    // --- วันที่ 8 : ปี 64-65 ---
    {
        date: "2026-02-08", displayDate: "อา. ๘-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๖๔ - ๒๕๖๕" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๖๔-๖๕",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2564-2565.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๖๔-๖๕",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2564-2565.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2564-2565.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๖๔-๖๕"] }
    },

    // --- วันที่ 9 : ปี 66-67 (จบ) ---
    {
        date: "2026-02-09", displayDate: "จ. ๙-ก.พ.-๖๙",
        remarks: { grammar: "ไวยากรณ์ รวม ๔ เล่ม ปี' ๒๕๖๖ - ๒๕๖๗ (จบ)" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๖๖-๖๗",
            fileNoteGrammar: "materials/pt12/grammar-notes-total-2566-2567.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) รวม ๔ เล่ม ปี' ๖๖-๖๗",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "16:00:00",
            fileExamGrammar: "exams/pt12/grammar-exam-total-2566-2567.pdf",
            fileAnswerGrammar: "answers/pt12/grammar-answer-total-2566-2567.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) รวม ๔ เล่ม ปี' ๖๖-๖๗"] }
    },

    // --- วันที่ 10 : ปิดโครงการ ---
    {
        date: "2026-02-10", displayDate: "อ. ๑๐-ก.พ.-๖๙",
        remarks: { general: "วันสุดท้ายของการอบรม / เตรียมตัวเดินทาง" },
        morning: { activity: "ปัจฉิมนิเทศ / ปิดโครงการ" },
        afternoon: { activity: "เดินทาง / พักผ่อน" },
        evening: { activity: "พักผ่อน" }
    }
];