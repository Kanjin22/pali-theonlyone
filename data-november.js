// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (Final Boss Version)          ==
// ==               รองรับระบบ "เฉลยข้อสอบ" อัตโนมัติ               ==
// ===================================================================

const scheduleData = [

    // ########## พฤศจิกายน 2568 ##########
    {
        date: "2025-11-12", displayDate: "พ. ๑๒-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๑) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๐-๕๑"
        },
        morning: {
            activityGrammar: "อ่านไวย (๑)",
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๑)",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer-50-51.pdf"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๑)/เรียนไวย."
        }
    },

    {
        date: "2025-11-13", displayDate: "พฤ. ๑๓-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๒) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓",
            translate: "ทำความเข้าใจหลักการแปลมคธเป็นไทยเบื้องต้น"
        },
        morning: {
            activityGrammar: "อ่านไวย. (๒)",
            activityTranslate: "เรียนแปล.",
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf",
            fileNoteTranslate: "materials/translate-notes-01.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๒)",
            activityTranslate: "สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer-52-53.pdf",
            fileExamTranslate: "exams/translate-exam-01.pdf",
            fileAnswerTranslate: "answers/translate-answer-01.pdf"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๒)/เรียนไวย."
        },
    },

    {
        date: "2025-11-14", displayDate: "ศ. ๑๔-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๓) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕",
            translate: [
                "หลักการแปล ๙ ประการ",
                " - (๑. อาลปนะ)"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๓)",
            activityTranslate: "เรียนแปล.",
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf",
            fileNoteTranslate: "materials/translate-notes-02.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๓)",
            activityTranslate: "สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer-54-55.pdf",
            fileExamTranslate: "exams/translate-exam-02.pdf",
            fileAnswerTranslate: "answers/translate-answer-02.pdf"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๓)/เรียนไวย."
        }
    },

    {
        date: "2025-11-15", displayDate: "ส. ๑๕-พ.ย.-๒๕",
        remarks: {
            translate: [
                "หลักการแปล ๙ ประการ",
                " - (๒. นิบาตต้นข้อความ, ๓. กาลสัตตมี, ๔. ประธาน)"
            ]
        },
        morning: {
            activityTranslate: "เรียนแปล.",
            fileNoteTranslate: "materials/translate-notes-03.pdf"
        },
        afternoon: {
            activityTranslate: "สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamTranslate: "exams/translate-exam-03.pdf",
            fileAnswerTranslate: "answers/translate-answer-03.pdf"
        },
        evening: {
            activityTranslate: "เฉลยแปล./เรียนแปล.",
            fileNoteTranslate: "materials/translate-notes-04.pdf"
        }
    },

    {
        date: "2025-11-16", displayDate: "อา. ๑๖-พ.ย.-๒๕",
        remarks: {
            translate: [
                "หลักการแปล ๙ ประการ",
                " - (๕. ขยายประธาน)"
            ]
        },
        afternoon: {
            activityTranslate: "สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamTranslate: "exams/translate-exam-04.pdf",
            fileAnswerTranslate: "answers/translate-answer-04.pdf"
        },
        evening: {
            activityTranslate: "เฉลยแปล./เรียนแปล.",
            fileNoteTranslate: "materials/translate-notes-05.pdf"
        }
    },

    {
        date: "2025-11-17", displayDate: "จ. ๑๗-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๔) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๖-๕๗",
            translate: [
                "หลักการแปล ๙ ประการ",
                " - (๖. กิริยาในระหว่างและประโยคแทรก, ๗. บทขยายกิริยาในระหว่าง)"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๔)",
            activityTranslate: "สอบแปล.",
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf",
            isExam: true,
            examStartTime: "09:00:00",
            examEndTime: "10:00:00",
            fileExamTranslate: "exams/translate-exam-05.pdf",
            fileAnswerTranslate: "answers/translate-answer-05.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๔)",
            activityTranslate: "เรียนแปล.",
            fileNoteTranslate: "materials/translate-notes-06.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer-56-57.pdf"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๔)/เรียนไวย.",
            activityTranslate: "เรียนแปล.",
            fileNoteTranslate: "materials/translate-notes-07.pdf",
            isExam: true,
            examStartTime: "18:30:00",
            examEndTime: "19:30:00",
            fileExamTranslate: "exams/translate-exam-06.pdf",
            fileAnswerTranslate: "answers/translate-answer-06.pdf"
        }
    },

    {
        date: "2025-11-18", displayDate: "อ. ๑๘-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๕) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๘-๕๙",
            translate: [
                "หลักการแปล ๙ ประการ",
                " - (๘. กิริยาคุมพากย์, ๙. บทขยายกิริยาคุมพวกย์)"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๕)",
            activityTranslate: "อ่านแปล.",
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
            fileNoteTranslate: "materials/translate-notes-07.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๕)",
            activityTranslate: "สอบแปล.",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer-58-59.pdf",
            fileExamTranslate: "exams/translate-exam-07.pdf",
            fileAnswerTranslate: "answers/translate-answer-07.pdf"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๕)/เรียนไวย."
        }
    },

    {
        date: "2025-11-19", displayDate: "พ. ๑๙-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๖) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๐-๖๑",
            translate: [
                "ภาค ๑ เก็ง ๑",
                "ภาค ๑ เก็ง ๒"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๖)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๖)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "14:00:00",
            fileExamGrammar: "exams/grammar-exam-60-61.pdf"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๖)",
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    {
        date: "2025-11-20", displayDate: "พฤ. ๒๐-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๗) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๒-๖๓",
            translate: [
                "ภาค ๑ เก็ง ๓",
                "ภาค ๑ เก็ง ๔"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๗)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๗)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-62-63.pdf"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๗)/เรียน",
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    {
        date: "2025-11-21", displayDate: "ศ. ๒๑-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๘) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๔-๖๕",
            translate: [
                "ภาค ๑ เก็งที่ ๕",
                "ภาค ๑ เก็งที่ ๖"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๘)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf",
            fileNoteTranslate: "#"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๘)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-64-65.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๘)/เรียน",
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    // --- วันหยุดสุดสัปดาห์ เรียนเฉพาะวิชาแปล ---
    {
        date: "2025-11-22", displayDate: "ส. ๒๒-พ.ย.-๒๕",
        remarks: {
            translate: [
                "ภาค ๑ เก็งที่ ๗",
                "ภาค ๑ เก็งที่ ๘"
            ]
        },
        morning: {
            activityTranslate: "อ่าน/เรียนแปล",
        },
        afternoon: {
            activityTranslate: "อ่านแปล. ภ. ๑"
        },
        evening: {
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },
    {
        date: "2025-11-23", displayDate: "อา. ๒๓-พ.ย.-๒๕",
        remarks: {
            translate: [
                "ภาค ๑ เก็งที่ ๙",
                "ภาค ๑ เก็งที่ ๑๐"
            ]
        },
        morning: {
            activityTranslate: "อ่านแปล. ภ. ๑"
        },
        afternoon: {
            activityTranslate: "อ่านแปล. ภ. ๑"
        },
        evening: {
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    // --- กลับมาเรียนผสมผสานในวันทำการ ---
    {
        date: "2025-11-24", displayDate: "จ. ๒๔-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๙) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๖-๖๗",
            translate: [
                "ภาค ๑ เก็งที่ ๑๑",
                "ภาค ๑ เก็งที่ ๑๒"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๙)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๙)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-66-67.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๙)/เรียน",
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    {
        date: "2025-11-25", displayDate: "อ. ๒๕-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๐) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๐-๕๑",
            translate: [
                "ภาค ๑ เก็งที่ ๑๓",
                "ภาค ๑ เก็งที่ ๑๔"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๑๐)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๑๐)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-50-51.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๑๐)/เรียน",
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    {
        date: "2025-11-26", displayDate: "พ. ๒๖-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๑) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๒-๕๓",
            translate: [
                "ภาค ๑ เก็งที่ ๑๕",
                "ภาค ๑ เก็งที่ ๑๖"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๑๑)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๑๑)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-52-53.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๑๑)/เรียน",
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    {
        date: "2025-11-27", displayDate: "พฤ. ๒๗-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๒) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๔-๕๕",
            translate: [
                "ภาค ๑ เก็งที่ ๑๗",
                "ภาค ๑ เก็งที่ ๑๘"
            ]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๑๒)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf"
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๑๒)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-54-55.pdf"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๑๒)/เรียน",
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    {
        date: "2025-11-28", displayDate: "ศ. ๒๘-พ.ย.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๓) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๖-๕๗",
            translate: [
                "ภาค ๑ เก็งที่ ๑๙",
                "ภาค ๑ เก็งที่ ๒๐"]
        },
        morning: {
            activityGrammar: "อ่านไวย. (๑๓)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf",
        },
        afternoon: {
            activityGrammar: "สอบไวย. (๑๓)",
            activityTranslate: "อ่านแปล. ภ. ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-56-57.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: "เฉลยไวย. (๑๓)/เรียน",
            activityTranslate: "อ่านแปล. ภ. ๑"
        }
    },

    // --- วันหยุดสุดสัปดาห์ เรียนเฉพาะวิชาแปล (เริ่มต้นภาค ๒) ---
    {
        date: "2025-11-29", displayDate: "ส. ๒๙-พ.ย.-๒๕",
        remarks: {
            translate: [
                "ภาค ๒ เก็งที่ ๑",
                "ภาค ๒ เก็งที่ ๒"
            ]
        },
        morning: {
            activityTranslate: "อ่านแปล. ภ. ๒"
        },
        afternoon: {
            activityTranslate: "อ่านแปล. ภ. ๒"
        },
        evening: {
            activityTranslate: "อ่านแปล. ภ. ๒"
        }
    },

    {
        date: "2025-11-30", displayDate: "อา. ๓๐-พ.ย.-๒๕",
        remarks: {
            translate: [
                "ภาค ๒ เก็งที่ ๓",
                "ภาค ๒ เก็งที่ ๔"
            ]
        },
        morning: {
            activityTranslate: "อ่านแปล. ภ. ๒"
        },
        afternoon: {
            activityTranslate: "อ่านแปล. ภ. ๒"
        },
        evening: {
            activityTranslate: "อ่านแปล. ภ. ๒"
        }
    },

];