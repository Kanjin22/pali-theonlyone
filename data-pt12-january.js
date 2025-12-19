// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (เวอร์ชัน 3.0 - Modal)        ==
// ==  รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบเฉลยอัตโนมัติ  ==
// ===================================================================

const dataJanuary = [
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
    //        fileNoteGrammar: "materials/... (ไฟล์เนื้อหาไวยากรณ์ ถ้ามี)",
    //        fileNoteTranslate: [
    //            "materials/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 1 ถ้ามี)",
    //            "materials/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 2 ถ้ามี)"
    //        ]
    //    },

    // --- กิจกรรมช่วงบ่าย (ตัวอย่างการสอบ) ---
    //    afternoon: {
    //        activityGrammar: "กิจกรรมไวยากรณ์ช่วงบ่าย (ถ้ามี)",
    //        activityTranslate: "กิจกรรมแปลช่วงบ่าย (ถ้ามี)",
    //        isExam: true, // ใส่ true ถ้าช่วงเวลานี้มีการสอบ
    //        examStartTime: "HH:MM:SS", // เวลาเริ่มสอบ (24-hour format)
    //        examEndTime: "HH:MM:SS",   // เวลาสิ้นสุดการสอบ (สำคัญสำหรับเฉลย)
    //        fileExamGrammar: "exams/... (ไฟล์ข้อสอบไวยากรณ์ ถ้ามี)",
    //        fileAnswerGrammar: "answers/... (ไฟล์เฉลยไวยากรณ์ ถ้ามี)",
    //        fileExamTranslate: "exams/... (ไฟล์ข้อสอบแปล ถ้ามี)",
    //        fileAnswerTranslate: "answers/... (ไฟล์เฉลยแปล ถ้ามี)"
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

    // ########## มกราคม 2569 ##########
    // --- วันหยุดขึ้นปีใหม่ ---
    {
        date: "2026-01-01", displayDate: "พฤ. ๑-ม.ค.-๖๙",
        isWeekend: true,
        remarks: { general: "วันขึ้นปีใหม่" }
    },

    // --- เริ่มติวรวม ๔ เล่ม (ครั้งที่ ๓๗ เป็นต้นไป) ---
    {
        date: "2026-01-02", displayDate: "ศ. ๒-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๗" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๒๙",
            fileNoteGrammar: "materials/grammar-notes-total-2529.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๗",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2529.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2529.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๗"] }
    },
    {
        date: "2026-01-03", displayDate: "ส. ๓-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๘" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๐",
            fileNoteGrammar: "materials/grammar-notes-total-2530.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๘",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2530.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2530.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๘"] }
    },
    {
        date: "2026-01-04", displayDate: "อา. ๔-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๙" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๑",
            fileNoteGrammar: "materials/grammar-notes-total-2531.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๙",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2531.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2531.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๙"] }
    },
    {
        date: "2026-01-05", displayDate: "จ. ๕-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๐" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๒",
            fileNoteGrammar: "materials/grammar-notes-total-2532.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๐",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2532.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2532.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๐"] }
    },
    {
        date: "2026-01-06", displayDate: "อ. ๖-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๑" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๓",
            fileNoteGrammar: "materials/grammar-notes-total-2533.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๑",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2533.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2533.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๑"] }
    },
    {
        date: "2026-01-07", displayDate: "พ. ๗-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๒" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๔",
            fileNoteGrammar: "materials/grammar-notes-total-2534.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๒",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2534.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2534.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๒"] }
    },
    {
        date: "2026-01-08", displayDate: "พฤ. ๘-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๓" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๕",
            fileNoteGrammar: "materials/grammar-notes-total-2535.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๓",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2535.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2535.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๓"] }
    },
    {
        date: "2026-01-09", displayDate: "ศ. ๙-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๔" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๖",
            fileNoteGrammar: "materials/grammar-notes-total-2536.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๔",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2536.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2536.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๔"] }
    },
    {
        date: "2026-01-10", displayDate: "ส. ๑๐-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๕" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๗",
            fileNoteGrammar: "materials/grammar-notes-total-2537.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๕",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2537.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2537.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๕"] }
    },
    {
        date: "2026-01-11", displayDate: "อา. ๑๑-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๖" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๘",
            fileNoteGrammar: "materials/grammar-notes-total-2538.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๖",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2538.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2538.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๖"] }
    },
    {
        date: "2026-01-12", displayDate: "จ. ๑๒-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๗" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๓๙",
            fileNoteGrammar: "materials/grammar-notes-total-2539.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๗",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2539.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2539.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๗"] }
    },
    {
        date: "2026-01-13", displayDate: "อ. ๑๓-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๘" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๐",
            fileNoteGrammar: "materials/grammar-notes-total-2540.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๘",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2540.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2540.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๘"] }
    },
    {
        date: "2026-01-14", displayDate: "พ. ๑๔-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๔๙" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๑",
            fileNoteGrammar: "materials/grammar-notes-total-2541.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔๙",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2541.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2541.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔๙"] }
    },
    {
        date: "2026-01-15", displayDate: "พฤ. ๑๕-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๐" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๒",
            fileNoteGrammar: "materials/grammar-notes-total-2542.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๐",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2542.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2542.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๐"] }
    },
    {
        date: "2026-01-16", displayDate: "ศ. ๑๖-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๑" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๓",
            fileNoteGrammar: "materials/grammar-notes-total-2543.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๑",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2543.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2543.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๑"] }
    },
    {
        date: "2026-01-17", displayDate: "ส. ๑๗-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๒" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๔",
            fileNoteGrammar: "materials/grammar-notes-total-2544.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๒",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2544.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2544.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๒"] }
    },
    {
        date: "2026-01-18", displayDate: "อา. ๑๘-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๓" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๕",
            fileNoteGrammar: "materials/grammar-notes-total-2545.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๓",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2545.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2545.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๓"] }
    },
    {
        date: "2026-01-19", displayDate: "จ. ๑๙-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๔" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๖",
            fileNoteGrammar: "materials/grammar-notes-total-2546.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๔",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2546.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2546.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๔"] }
    },
    {
        date: "2026-01-20", displayDate: "อ. ๒๐-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๕" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๗",
            fileNoteGrammar: "materials/grammar-notes-total-2547.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๕",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2547.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2547.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๕"] }
    },
    {
        date: "2026-01-21", displayDate: "พ. ๒๑-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๖" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๘",
            fileNoteGrammar: "materials/grammar-notes-total-2548.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๖",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2548.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2548.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๖"] }
    },
    {
        date: "2026-01-22", displayDate: "พฤ. ๒๒-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๗" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๔๙",
            fileNoteGrammar: "materials/grammar-notes-total-2549.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๗",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2549.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2549.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๗"] }
    },
    {
        date: "2026-01-23", displayDate: "ศ. ๒๓-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๘" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๐",
            fileNoteGrammar: "materials/grammar-notes-total-2550.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๘",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2550.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2550.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๘"] }
    },
    {
        date: "2026-01-24", displayDate: "ส. ๒๔-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๕๙" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๑",
            fileNoteGrammar: "materials/grammar-notes-total-2551.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕๙",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2551.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2551.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕๙"] }
    },
    {
        date: "2026-01-25", displayDate: "อา. ๒๕-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๖๐" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๒",
            fileNoteGrammar: "materials/grammar-notes-total-2552.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖๐",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2552.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2552.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖๐"] }
    },
    {
        date: "2026-01-26", displayDate: "จ. ๒๖-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๖๑" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๓",
            fileNoteGrammar: "materials/grammar-notes-total-2553.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖๑",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2553.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2553.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖๑"] }
    },
    {
        date: "2026-01-27", displayDate: "อ. ๒๗-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๖๒" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๔",
            fileNoteGrammar: "materials/grammar-notes-total-2554.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖๒",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2554.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2554.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖๒"] }
    },
    {
        date: "2026-01-28", displayDate: "พ. ๒๘-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๖๓" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๕",
            fileNoteGrammar: "materials/grammar-notes-total-2555.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖๓",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2555.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2555.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖๓"] }
    },
    {
        date: "2026-01-29", displayDate: "พฤ. ๒๙-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๖๔" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๖",
            fileNoteGrammar: "materials/grammar-notes-total-2556.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖๔",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2556.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2556.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖๔"] }
    },
    {
        date: "2026-01-30", displayDate: "ศ. ๓๐-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๖๕" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๗",
            fileNoteGrammar: "materials/grammar-notes-total-2557.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖๕",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2557.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2557.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖๕"] }
    },
    {
        date: "2026-01-31", displayDate: "ส. ๓๑-ม.ค.-๖๙",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๖๖" },
        morning: {
            activityGrammar: "(อ่าน) รวม ๔ เล่ม ปี' ๒๕๕๘",
            fileNoteGrammar: "materials/grammar-notes-total-2558.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖๖",
            isExam: true,
            examStartTime: "14:00:00", examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-total-2558.pdf",
            fileAnswerGrammar: "answers/grammar-answer-total-2558.pdf"
        },
        evening: { activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖๖"] }
    }
];