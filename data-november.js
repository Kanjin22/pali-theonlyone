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

    // ########## พฤศจิกายน 2568 ##########
    {
        date: "2025-11-12", displayDate: "พ. ๑๒-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๐-๕๑"
        },
        morning: {
            activity: "อ่านไวย.",
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf"
        },
        afternoon: {
            activity: "สอบไวย.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer-50-51.pdf"
        },
        evening: {
            activity: "เฉลยไวย./เรียนไวย."
        }
    },

    {
        date: "2025-11-13", displayDate: "พฤ. ๑๓-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓",
            translate: "แปล. ทำความเข้าใจหลักการแปลมคธเป็นไทยเบื้องต้น"
        },
        morning: {
            activity: "อ่านไวย./เรียนแปล.",
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf",
            fileNoteTranslate: "materials/translate-notes-01.pdf"
        },
        afternoon: {
            activity: "สอบไวย./สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer-52-53.pdf",
            fileExamTranslate: "exams/translate-exam-01.pdf",
            fileAnswerTranslate: "answers/translate-answer-01.pdf"
        },
        evening: {
            activity: "เฉลยไวย./เรียนไวย."
        },
    },

    {
        date: "2025-11-14", displayDate: "ศ. ๑๔-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕",
            translate: "แปล. หลักการแปล ๙ ประการ (๑. อาลปนะ)"
        },
        morning: {
            activity: "อ่านไวย./เรียนแปล.",
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf",
            fileNoteTranslate: "materials/translate-notes-02.pdf"
        },
        afternoon: {
            activity: "สอบไวย./สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer-54-55.pdf",
            fileExamTranslate: "exams/translate-exam-02.pdf",
            fileAnswerTranslate: "answers/translate-answer-02.pdf"
        },
        evening: {
            activity: "เฉลยไวย./เรียนไวย."
        }
    },

    {
        date: "2025-11-15", displayDate: "ส. ๑๕-พ.ย.-๒๕",
        remarks: {
            translate: "แปล. หลักการแปล ๙ ประการ (๒. นิบาตต้นข้อความ, ๓. กาลสัตตมี, ๔. ประธาน)"
        },
        morning: {
            activity: "เรียนแปล.",
            fileNoteTranslate: "materials/translate-notes-03.pdf"
        },
        afternoon: {
            activity: "สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamTranslate: "exams/translate-exam-03.pdf",
            fileAnswerTranslate: "answers/translate-answer-03.pdf"
        },
        evening: {
            activity: "เฉลยแปล./เรียนแปล.",
            fileNoteTranslate: "materials/translate-notes-04.pdf"
        }
    },

    {
        date: "2025-11-16", displayDate: "อา. ๑๖-พ.ย.-๒๕",
        remarks: {
            translate: "แปล. หลักการแปล ๙ ประการ (๕. ขยายประธาน)"
        },
        afternoon: {
            activity: "สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamTranslate: "exams/translate-exam-04.pdf",
            fileAnswerTranslate: "answers/translate-answer-04.pdf"
        },
        evening: {
            activity: "เฉลยแปล./เรียนแปล.",
            fileNoteTranslate: "materials/translate-notes-05.pdf"
        }
    },

    {
        date: "2025-11-17", displayDate: "จ. ๑๗-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๖-๕๗",
            translate: "แปล. หลักการแปล ๙ ประการ (๖. กิริยาในระหว่างและประโยคแทรก, ๗. บทขยายกิริยาในระหว่าง, ๘. กิริยาคุมพากย์, ๙. บทขยายกิริยาคุมพวกย์)"
        },
        morning: {
            activity: "อ่านไวย./สอบแปล.",
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf",
            isExam: true,
            examStartTime: "09:00:00",
            examEndTime: "10:00:00",
            fileExamTranslate: "exams/translate-exam-05.pdf",
            fileAnswerTranslate: "answers/translate-answer-05.pdf"
        },
        afternoon: {
            activity: "สอบไวย./เรียนแปล./สอบแปล.",
            fileNoteTranslate: "materials/translate-notes-06.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer-56-57.pdf",
            fileExamTranslate: "exams/translate-exam-06.pdf",
            fileAnswerTranslate: "answers/translate-answer-06.pdf"
        },
        evening: {
            activity: "เฉลยไวย./เรียนไวย./เรียนแปล./สอบแปล.",
            fileNoteTranslate: "materials/translate-notes-07.pdf",
            isExam: true,
            examStartTime: "20:30:00",
            examEndTime: "21:30:00",
            fileExamTranslate: "exams/translate-exam-07.pdf",
            fileAnswerTranslate: "answers/translate-answer-07.pdf"
        }
    },

    {
        date: "2025-11-18", displayDate: "อ. ๑๘-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๘-๕๙",
            translate: "แปล. หลักการแปล ๙ ประการ"
        },
        morning: {
            activity: "อ่านหนังสือ",
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
            fileNoteTranslate: "#"
        },
        afternoon: {
            activity: "สอบประจำวัน",
            isExam: true,
            examStartTime: "18:30:00",
            examEndTime: "19:30:00",
            fileExamGrammar: "exams/grammar-exam-58-59.pdf",
            fileExamTranslate: "exams/translate-exam-04.pdf"
        },
        evening: {
            activity: "เฉลย/เรียน"
        }
    },
    {
        date: "2025-11-19", displayDate: "พ. ๑๙-พ.ย.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๐-๖๑", translate: "แปล. หลักการแปล ๙ ประการ" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-60-61.pdf", fileNoteTranslate: "materials/translate-notes-05.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-60-61.pdf", fileExamTranslate: "exams/translate-exam-05.pdf" }
    },
    {
        date: "2025-11-20", displayDate: "พฤ. ๒๐-พ.ย.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๒-๖๓", translate: "แปล. หลักการแปล ๙ ประการ" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-62-63.pdf", fileNoteTranslate: "materials/translate-notes-06.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-62-63.pdf", fileExamTranslate: "exams/translate-exam-06.pdf" }
    },
    {
        date: "2025-11-21", displayDate: "ศ. ๒๑-พ.ย.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๔-๖๕", translate: "แปล. หลักการแปล ๙ ประการ" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-64-65.pdf", fileNoteTranslate: "materials/translate-notes-07.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-64-65.pdf", fileExamTranslate: "exams/translate-exam-07.pdf" }
    },
    { date: "2025-11-22", displayDate: "ส. ๒๒-พ.ย.-๒๕", isWeekend: true },
    { date: "2025-11-23", displayDate: "อา. ๒๓-พ.ย.-๒๕", isWeekend: true },
    {
        date: "2025-11-24", displayDate: "จ. ๒๔-พ.ย.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๖-๖๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-66-67.pdf", fileNoteTranslate: "#" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-66-67.pdf", fileExamTranslate: "exams/translate-exam-66-67.pdf" }
    },
    {
        date: "2025-11-25", displayDate: "อ. ๒๕-พ.ย.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๐-๕๑" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-50-51.pdf", fileNoteTranslate: "materials/translate-notes-50-51.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-50-51.pdf", fileExamTranslate: "exams/translate-exam-50-51.pdf" }
    },
    {
        date: "2025-11-26", displayDate: "พ. ๒๖-พ.ย.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๒-๕๓" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-52-53.pdf", fileNoteTranslate: "materials/translate-notes-52-53.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-52-53.pdf", fileExamTranslate: "exams/translate-exam-52-53.pdf" }
    },
    {
        date: "2025-11-27", displayDate: "พฤ. ๒๗-พ.ย.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๔-๕๕" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-54-55.pdf", fileNoteTranslate: "materials/translate-notes-54-55.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-54-55.pdf", fileExamTranslate: "exams/translate-exam-54-55.pdf" }
    },
    {
        date: "2025-11-28", displayDate: "ศ. ๒๘-พ.ย.-๒๕",
        remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๖-๕๗" },
        morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-56-57.pdf", fileNoteTranslate: "materials/translate-notes-56-57.pdf" },
        evening: { activity: "เฉลย/เรียน" },
        afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", examEndTime: "19:30:00", fileExamGrammar: "exams/grammar-exam-56-57.pdf", fileExamTranslate: "exams/translate-exam-56-57.pdf" }
    },
    { date: "2025-11-29", displayDate: "ส. ๒๙-พ.ย.-๒๕", isWeekend: true },
    { date: "2025-11-30", displayDate: "อา. ๓๐-พ.ย.-๒๕", isWeekend: true },
];