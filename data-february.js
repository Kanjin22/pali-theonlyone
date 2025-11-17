// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (Final Boss Version)          ==
// ==               รองรับระบบ "เฉลยข้อสอบ" อัตโนมัติ               ==
// ===================================================================

const scheduleData = [
    // --- ตัวอย่างโครงสร้างข้อมูลที่สมบูรณ์ ---
    // evening: {
    //   activity: "สอบประจำวัน",
    //   isExam: true,
    //   examStartTime: "18:30:00",
    //   examEndTime: "19:30:00", // <-- เพิ่มเข้ามา
    //   fileExamGrammar: "exams/...",
    //   fileAnswerGrammar: "answers/...", // <-- เพิ่มเข้ามา
    //   fileExamTranslate: "exams/...",
    //   fileAnswerTranslate: "answers/..." // <-- เพิ่มเข้ามา
    // },

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