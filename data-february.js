// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (เวอร์ชัน 3.0 - Modal)        ==
// ==  รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบเฉลยอัตโนมัติ  ==
// ===================================================================

const dataFebruary = [
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

    // ########## กุมภาพันธ์ 2569 ##########
    {
        date: "2026-02-01", displayDate: "อา. ๑-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๙" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2559.pdf", fileNoteTranslate: "materials/translate-notes-total-2559.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2559.pdf", fileExamTranslate: "exams/translate-exam-total-2559.pdf" }
    },
    {
        date: "2026-02-02", displayDate: "จ. ๒-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๐" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2560.pdf", fileNoteTranslate: "materials/translate-notes-total-2560.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2560.pdf", fileExamTranslate: "exams/translate-exam-total-2560.pdf" }
    },
    {
        date: "2026-02-03", displayDate: "อ. ๓-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2561.pdf", fileNoteTranslate: "materials/translate-notes-total-2561.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2561.pdf", fileExamTranslate: "exams/translate-exam-total-2561.pdf" }
    },
    {
        date: "2026-02-04", displayDate: "พ. ๔-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๒" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2562.pdf", fileNoteTranslate: "materials/translate-notes-total-2562.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2562.pdf", fileExamTranslate: "exams/translate-exam-total-2562.pdf" }
    },
    {
        date: "2026-02-05", displayDate: "พฤ. ๕-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2563.pdf", fileNoteTranslate: "materials/translate-notes-total-2563.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2563.pdf", fileExamTranslate: "exams/translate-exam-total-2563.pdf" }
    },
    {
        date: "2026-02-06", displayDate: "ศ. ๖-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๔" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2564.pdf", fileNoteTranslate: "materials/translate-notes-total-2564.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2564.pdf", fileExamTranslate: "exams/translate-exam-total-2564.pdf" }
    },
    {
        date: "2026-02-07", displayDate: "ส. ๗-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2565.pdf", fileNoteTranslate: "materials/translate-notes-total-2565.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2565.pdf", fileExamTranslate: "exams/translate-exam-total-2565.pdf" }
    },
    {
        date: "2026-02-08", displayDate: "อา. ๘-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๖" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2566.pdf", fileNoteTranslate: "materials/translate-notes-total-2566.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2566.pdf", fileExamTranslate: "exams/translate-exam-total-2566.pdf" }
    },
    {
        date: "2026-02-09", displayDate: "จ. ๙-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2567.pdf", fileNoteTranslate: "materials/translate-notes-total-2567.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2567.pdf", fileExamTranslate: "exams/translate-exam-total-2567.pdf" }
    },
    {
        date: "2026-02-10", displayDate: "อ. ๑๐-ก.พ.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๘" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2568.pdf", fileNoteTranslate: "materials/translate-notes-total-2568.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2568.pdf", fileExamTranslate: "exams/translate-exam-total-2568.pdf" }
    },
];