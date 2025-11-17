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

    // ########## ธันวาคม 2568 ##########
    {
        date: "2025-12-01", displayDate: "จ. ๑-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-58-59.pdf", fileNoteTranslate: "materials/translate-notes-58-59.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-58-59.pdf", fileExamTranslate: "exams/translate-exam-58-59.pdf" }
    },
    {
        date: "2025-12-02", displayDate: "อ. ๒-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-60-61.pdf", fileNoteTranslate: "materials/translate-notes-60-61.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-60-61.pdf", fileExamTranslate: "exams/translate-exam-60-61.pdf" }
    },
    {
        date: "2025-12-03", displayDate: "พ. ๓-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-62-63.pdf", fileNoteTranslate: "materials/translate-notes-62-63.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-62-63.pdf", fileExamTranslate: "exams/translate-exam-62-63.pdf" }
    },
    {
        date: "2025-12-04", displayDate: "พฤ. ๔-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-64-65.pdf", fileNoteTranslate: "materials/translate-notes-64-65.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-64-65.pdf", fileExamTranslate: "exams/translate-exam-64-65.pdf" }
    },
    {
        date: "2025-12-05", displayDate: "ศ. ๕-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-66-67.pdf", fileNoteTranslate: "materials/translate-notes-66-67.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-66-67.pdf", fileExamTranslate: "exams/translate-exam-66-67.pdf" }
    },
    { date: "2025-12-06", displayDate: "ส. ๖-ธ.ค.-๒๕", isWeekend: true },
    { date: "2025-12-07", displayDate: "อา. ๗-ธ.ค.-๒๕", isWeekend: true },
    {
        date: "2025-12-08", displayDate: "จ. ๘-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-50-51.pdf", fileNoteTranslate: "materials/translate-notes-50-51.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-50-51.pdf", fileExamTranslate: "exams/translate-exam-50-51.pdf" }
    },
    {
        date: "2025-12-09", displayDate: "อ. ๙-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-52-53.pdf", fileNoteTranslate: "materials/translate-notes-52-53.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-52-53.pdf", fileExamTranslate: "exams/translate-exam-52-53.pdf" }
    },
    {
        date: "2025-12-10", displayDate: "พ. ๑๐-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-54-55.pdf", fileNoteTranslate: "materials/translate-notes-54-55.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-54-55.pdf", fileExamTranslate: "exams/translate-exam-54-55.pdf" }
    },
    {
        date: "2025-12-11", displayDate: "พฤ. ๑๑-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-56-57.pdf", fileNoteTranslate: "materials/translate-notes-56-57.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-56-57.pdf", fileExamTranslate: "exams/translate-exam-56-57.pdf" }
    },
    {
        date: "2025-12-12", displayDate: "ศ. ๑๒-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-58-59.pdf", fileNoteTranslate: "materials/translate-notes-58-59.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-58-59.pdf", fileExamTranslate: "exams/translate-exam-58-59.pdf" }
    },
    { date: "2025-12-13", displayDate: "ส. ๑๓-ธ.ค.-๒๕", isWeekend: true },
    { date: "2025-12-14", displayDate: "อา. ๑๔-ธ.ค.-๒๕", isWeekend: true },
    {
        date: "2025-12-15", displayDate: "จ. ๑๕-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-60-61.pdf", fileNoteTranslate: "materials/translate-notes-60-61.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-60-61.pdf", fileExamTranslate: "exams/translate-exam-60-61.pdf" }
    },
    {
        date: "2025-12-16", displayDate: "อ. ๑๖-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-62-63.pdf", fileNoteTranslate: "materials/translate-notes-62-63.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-62-63.pdf", fileExamTranslate: "exams/translate-exam-62-63.pdf" }
    },
    {
        date: "2025-12-17", displayDate: "พ. ๑๗-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-64-65.pdf", fileNoteTranslate: "materials/translate-notes-64-65.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-64-65.pdf", fileExamTranslate: "exams/translate-exam-64-65.pdf" }
    },
    {
        date: "2025-12-18", displayDate: "พฤ. ๑๘-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-66-67.pdf", fileNoteTranslate: "materials/translate-notes-66-67.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-66-67.pdf", fileExamTranslate: "exams/translate-exam-66-67.pdf" }
    },
    {
        date: "2025-12-19", displayDate: "ศ. ๑๙-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-50-51.pdf", fileNoteTranslate: "materials/translate-notes-50-51.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-50-51.pdf", fileExamTranslate: "exams/translate-exam-50-51.pdf" }
    },
    { date: "2025-12-20", displayDate: "ส. ๒๐-ธ.ค.-๒๕", isWeekend: true },
    { date: "2025-12-21", displayDate: "อา. ๒๑-ธ.ค.-๒๕", isWeekend: true },
    {
        date: "2025-12-22", displayDate: "จ. ๒๒-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-52-53.pdf", fileNoteTranslate: "materials/translate-notes-52-53.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-52-53.pdf", fileExamTranslate: "exams/translate-exam-52-53.pdf" }
    },
    {
        date: "2025-12-23", displayDate: "อ. ๒๓-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-54-55.pdf", fileNoteTranslate: "materials/translate-notes-54-55.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-54-55.pdf", fileExamTranslate: "exams/translate-exam-54-55.pdf" }
    },
    {
        date: "2025-12-24", displayDate: "พ. ๒๔-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-56-57.pdf", fileNoteTranslate: "materials/translate-notes-56-57.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-56-57.pdf", fileExamTranslate: "exams/translate-exam-56-57.pdf" }
    },
    {
        date: "2025-12-25", displayDate: "พฤ. ๒๕-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-58-59.pdf", fileNoteTranslate: "materials/translate-notes-58-59.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-58-59.pdf", fileExamTranslate: "exams/translate-exam-58-59.pdf" }
    },
    {
        date: "2025-12-26", displayDate: "ศ. ๒๖-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-60-61.pdf", fileNoteTranslate: "materials/translate-notes-60-61.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-60-61.pdf", fileExamTranslate: "exams/translate-exam-60-61.pdf" }
    },
    { date: "2025-12-27", displayDate: "ส. ๒๗-ธ.ค.-๒๕", isWeekend: true },
    { date: "2025-12-28", displayDate: "อา. ๒๘-ธ.ค.-๒๕", isWeekend: true },
    {
        date: "2025-12-29", displayDate: "จ. ๒๙-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๒-๖๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-62-63.pdf", fileNoteTranslate: "materials/translate-notes-62-63.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-62-63.pdf", fileExamTranslate: "exams/translate-exam-62-63.pdf" }
    },
    {
        date: "2025-12-30", displayDate: "อ. ๓๐-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๔-๖๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-64-65.pdf", fileNoteTranslate: "materials/translate-notes-64-65.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-64-65.pdf", fileExamTranslate: "exams/translate-exam-64-65.pdf" }
    },
    {
        date: "2025-12-31", displayDate: "พ. ๓๑-ธ.ค.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๖-๖๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-66-67.pdf", fileNoteTranslate: "materials/translate-notes-66-67.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-66-67.pdf", fileExamTranslate: "exams/translate-exam-66-67.pdf" }
    },
];