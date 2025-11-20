// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (เวอร์ชัน 3.0 - Modal)        ==
// ==  รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบเฉลยอัตโนมัติ  ==
// ===================================================================

const scheduleData = [
    // ===============================================================
    // ==                 *** ตัวอย่างต้นแบบ ***                     ==
    // ==   คัดลอกบล็อก {...}, นี้ไปใช้ แล้วแก้ไขข้อมูลตามต้องการ      ==
    // ===============================================================
    {
        // --- ข้อมูลหลักของวัน (จำเป็นต้องมี) ---
        date: "YYYY-MM-DD",          // รูปแบบปี-เดือน-วัน (ค.ศ.) สำหรับการคำนวณ
        displayDate: "ว. ดด-เดือน-ปป", // ข้อความวันที่ ที่จะแสดงในตาราง

        // --- หมายเหตุ (แสดงที่คอลัมน์สุดท้าย) ---
        remarks: {
            grammar: "หมายเหตุสำหรับวิชาไวยากรณ์ (ถ้ามี)",
            translate: [
                "หมายเหตุสำหรับวิชาแปล ชุดที่ 1 (ถ้ามี)",
                "หมายเหตุสำหรับวิชาแปล ชุดที่ 2 (ถ้ามี)"
            ],
            general: "หมายเหตุทั่วไป ไม่เกี่ยวกับวิชาใดเป็นพิเศษ (ถ้ามี)"
        },

        // --- กิจกรรมช่วงเช้า ---
        morning: {
            activityGrammar: "ข้อความกิจกรรมของวิชาไวยากรณ์ (ถ้ามี)",
            activityTranslate: "ข้อความกิจกรรมของวิชาแปล (ถ้ามี)",
            linkZoom: "https://... (ลิงก์ Zoom ถ้ามี)",
            linkYoutube: "https://... (ลิงก์ YouTube ถ้ามี)",
            fileNoteGrammar: "materials/... (ไฟล์เนื้อหาไวยากรณ์ ถ้ามี)",
            fileNoteTranslate: [
                "materials/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 1 ถ้ามี)",
                "materials/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 2 ถ้ามี)"
            ]
        },

        // --- กิจกรรมช่วงบ่าย (ตัวอย่างการสอบ) ---
        afternoon: {
            activityGrammar: "กิจกรรมไวยากรณ์ช่วงบ่าย (ถ้ามี)",
            activityTranslate: "กิจกรรมแปลช่วงบ่าย (ถ้ามี)",
            isExam: true, // ใส่ true ถ้าช่วงเวลานี้มีการสอบ
            examStartTime: "HH:MM:SS", // เวลาเริ่มสอบ (24-hour format)
            examEndTime: "HH:MM:SS",   // เวลาสิ้นสุดการสอบ (สำคัญสำหรับเฉลย)
            fileExamGrammar: "exams/... (ไฟล์ข้อสอบไวยากรณ์ ถ้ามี)",
            fileAnswerGrammar: "answers/... (ไฟล์เฉลยไวยากรณ์ ถ้ามี)",
            fileExamTranslate: "exams/... (ไฟล์ข้อสอบแปล ถ้ามี)",
            fileAnswerTranslate: "answers/... (ไฟล์เฉลยแปล ถ้ามี)"
        },

        // --- กิจกรรมช่วงค่ำ (ตัวอย่างกิจกรรมทั่วไป) ---
        evening: {
            activity: "กิจกรรมทั่วไปที่ไม่แยกวิชา (ถ้ามี)"
        }
    },
    // --- ตัวอย่างสำหรับวันหยุดสุดสัปดาห์ ---
    {
        date: "YYYY-MM-DD",
        displayDate: "ว. ดด-เดือน-ปป",
        isWeekend: true, // ใส่ true เพื่อให้เป็นแถบสีเทา
        remarks: {
            general: "ข้อความสำหรับวันหยุด (ถ้ามี)"
        }
    },

    // ===============================================================
    // ==                  *** เริ่มข้อมูลจริง ***                    ==
    // ===============================================================

    // ########## มกราคม 2569 ##########
    { date: "2026-01-01", displayDate: "พฤ. ๑-ม.ค.-๒๖", isWeekend: true },
    {
        date: "2026-01-02", displayDate: "ศ. ๒-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๒๙" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2529.pdf", fileNoteTranslate: "materials/translate-notes-total-2529.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2529.pdf", fileExamTranslate: "exams/translate-exam-total-2529.pdf" }
    },
    {
        date: "2026-01-03", displayDate: "ส. ๓-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๐" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2530.pdf", fileNoteTranslate: "materials/translate-notes-total-2530.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2530.pdf", fileExamTranslate: "exams/translate-exam-total-2530.pdf" }
    },
    {
        date: "2026-01-04", displayDate: "อา. ๔-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2531.pdf", fileNoteTranslate: "materials/translate-notes-total-2531.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2531.pdf", fileExamTranslate: "exams/translate-exam-total-2531.pdf" }
    },
    {
        date: "2026-01-05", displayDate: "จ. ๕-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๒" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2532.pdf", fileNoteTranslate: "materials/translate-notes-total-2532.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2532.pdf", fileExamTranslate: "exams/translate-exam-total-2532.pdf" }
    },
    {
        date: "2026-01-06", displayDate: "อ. ๖-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2533.pdf", fileNoteTranslate: "materials/translate-notes-total-2533.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2533.pdf", fileExamTranslate: "exams/translate-exam-total-2533.pdf" }
    },
    {
        date: "2026-01-07", displayDate: "พ. ๗-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๔" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2534.pdf", fileNoteTranslate: "materials/translate-notes-total-2534.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2534.pdf", fileExamTranslate: "exams/translate-exam-total-2534.pdf" }
    },
    {
        date: "2026-01-08", displayDate: "พฤ. ๘-ม.ค.-๒۶",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2535.pdf", fileNoteTranslate: "materials/translate-notes-total-2535.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2535.pdf", fileExamTranslate: "exams/translate-exam-total-2535.pdf" }
    },
    {
        date: "2026-01-09", displayDate: "ศ. ๙-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๖" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2536.pdf", fileNoteTranslate: "materials/translate-notes-total-2536.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2536.pdf", fileExamTranslate: "exams/translate-exam-total-2536.pdf" }
    },
    {
        date: "2026-01-10", displayDate: "ส. ๑๐-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2537.pdf", fileNoteTranslate: "materials/translate-notes-total-2537.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2537.pdf", fileExamTranslate: "exams/translate-exam-total-2537.pdf" }
    },
    {
        date: "2026-01-11", displayDate: "อา. ๑๑-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๘" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2538.pdf", fileNoteTranslate: "materials/translate-notes-total-2538.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2538.pdf", fileExamTranslate: "exams/translate-exam-total-2538.pdf" }
    },
    {
        date: "2026-01-12", displayDate: "จ. ๑๒-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๙" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2539.pdf", fileNoteTranslate: "materials/translate-notes-total-2539.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2539.pdf", fileExamTranslate: "exams/translate-exam-total-2539.pdf" }
    },
    {
        date: "2026-01-13", displayDate: "อ. ๑๓-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๐" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2540.pdf", fileNoteTranslate: "materials/translate-notes-total-2540.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2540.pdf", fileExamTranslate: "exams/translate-exam-total-2540.pdf" }
    },
    {
        date: "2026-01-14", displayDate: "พ. ๑๔-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2541.pdf", fileNoteTranslate: "materials/translate-notes-total-2541.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2541.pdf", fileExamTranslate: "exams/translate-exam-total-2541.pdf" }
    },
    {
        date: "2026-01-15", displayDate: "พฤ. ๑๕-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๒" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2542.pdf", fileNoteTranslate: "materials/translate-notes-total-2542.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2542.pdf", fileExamTranslate: "exams/translate-exam-total-2542.pdf" }
    },
    {
        date: "2026-01-16", displayDate: "ศ. ๑๖-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2543.pdf", fileNoteTranslate: "materials/translate-notes-total-2543.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2543.pdf", fileExamTranslate: "exams/translate-exam-total-2543.pdf" }
    },
    {
        date: "2026-01-17", displayDate: "ส. ๑๗-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๔" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2544.pdf", fileNoteTranslate: "materials/translate-notes-total-2544.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2544.pdf", fileExamTranslate: "exams/translate-exam-total-2544.pdf" }
    },
    {
        date: "2026-01-18", displayDate: "อา. ๑๘-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2545.pdf", fileNoteTranslate: "materials/translate-notes-total-2545.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2545.pdf", fileExamTranslate: "exams/translate-exam-total-2545.pdf" }
    },
    {
        date: "2026-01-19", displayDate: "จ. ๑๙-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๖" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2546.pdf", fileNoteTranslate: "materials/translate-notes-total-2546.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2546.pdf", fileExamTranslate: "exams/translate-exam-total-2546.pdf" }
    },
    {
        date: "2026-01-20", displayDate: "อ. ๒๐-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2547.pdf", fileNoteTranslate: "materials/translate-notes-total-2547.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2547.pdf", fileExamTranslate: "exams/translate-exam-total-2547.pdf" }
    },
    {
        date: "2026-01-21", displayDate: "พ. ๒๑-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๘" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2548.pdf", fileNoteTranslate: "materials/translate-notes-total-2548.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2548.pdf", fileExamTranslate: "exams/translate-exam-total-2548.pdf" }
    },
    {
        date: "2026-01-22", displayDate: "พฤ. ๒๒-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๙" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2549.pdf", fileNoteTranslate: "materials/translate-notes-total-2549.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2549.pdf", fileExamTranslate: "exams/translate-exam-total-2549.pdf" }
    },
    {
        date: "2026-01-23", displayDate: "ศ. ๒๓-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๐" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2550.pdf", fileNoteTranslate: "materials/translate-notes-total-2550.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2550.pdf", fileExamTranslate: "exams/translate-exam-total-2550.pdf" }
    },
    {
        date: "2026-01-24", displayDate: "ส. ๒๔-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2551.pdf", fileNoteTranslate: "materials/translate-notes-total-2551.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2551.pdf", fileExamTranslate: "exams/translate-exam-total-2551.pdf" }
    },
    {
        date: "2026-01-25", displayDate: "อา. ๒๕-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๒" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2552.pdf", fileNoteTranslate: "materials/translate-notes-total-2552.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2552.pdf", fileExamTranslate: "exams/translate-exam-total-2552.pdf" }
    },
    {
        date: "2026-01-26", displayDate: "จ. ๒๖-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2553.pdf", fileNoteTranslate: "materials/translate-notes-total-2553.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2553.pdf", fileExamTranslate: "exams/translate-exam-total-2553.pdf" }
    },
    {
        date: "2026-01-27", displayDate: "อ. ๒๗-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๔" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2554.pdf", fileNoteTranslate: "materials/translate-notes-total-2554.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2554.pdf", fileExamTranslate: "exams/translate-exam-total-2554.pdf" }
    },
    {
        date: "2026-01-28", displayDate: "พ. ๒๘-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2555.pdf", fileNoteTranslate: "materials/translate-notes-total-2555.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2555.pdf", fileExamTranslate: "exams/translate-exam-total-2555.pdf" }
    },
    {
        date: "2026-01-29", displayDate: "พฤ. ๒๙-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๖" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2556.pdf", fileNoteTranslate: "materials/translate-notes-total-2556.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2556.pdf", fileExamTranslate: "exams/translate-exam-total-2556.pdf" }
    },
    {
        date: "2026-01-30", displayDate: "ศ. ๓๐-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2557.pdf", fileNoteTranslate: "materials/translate-notes-total-2557.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2557.pdf", fileExamTranslate: "exams/translate-exam-total-2557.pdf" }
    },
    {
        date: "2026-01-31", displayDate: "ส. ๓๑-ม.ค.-๒๖",
        remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๘" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2558.pdf", fileNoteTranslate: "materials/translate-notes-total-2558.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-total-2558.pdf", fileExamTranslate: "exams/translate-exam-total-2558.pdf" }
    },
];