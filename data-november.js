// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (เวอร์ชัน 3.0 - Modal)        ==
// ==  รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบเฉลยอัตโนมัติ  ==
// ===================================================================

const dataNovember = [
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

    // ########## พฤศจิกายน 2568 ##########
    {
        date: "2025-11-12", displayDate: "พ. ๑๒-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๐-๕๑",
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer-50-51.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๑"
            ]
        }
    },

    {
        date: "2025-11-13", displayDate: "พฤ. ๑๓-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒",
            translate: "หลักการแปล ๙ ประการ ครั้งที่ ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓",
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf",
            activityTranslate: "เรียนหลักการแปล ๙ ประการ ครั้งที่ ๑ (ทำความเข้าใจหลักการแปลมคธเป็นไทยเบื้องต้น)",
            fileNoteTranslate: "materials/translate-notes-01.pdf"
        },
        afternoon: {
            activityGrammar: "สอบข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓",
            activityTranslate: "สอบหลักการแปล ๙ ประการ ครั้งที่ ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer-52-53.pdf",
            fileExamTranslate: "exams/translate-exam-01.pdf",
            fileAnswerTranslate: "answers/translate-answer-01.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๒"
            ],
            activityTranslate: "เฉลยหลักการแปล ๙ ประการ ครั้งที่ ๑"
        },
    },

    {
        date: "2025-11-14", displayDate: "ศ. ๑๔-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓",
            translate: [
                "หลักการแปล ๙ ประการ ครั้งที่ ๒"
            ]
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕",
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf",
            factivityTranslate: "เรียนหลักการแปล ๙ ประการ (๑. อาลปนะ)",
            ileNoteTranslate: "materials/translate-notes-02.pdf"
        },
        afternoon: {
            activityGrammar: "สอบข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕",
            activityTranslate: "สอบหลักการแปล ๙ ประการ ครั้งที่ ๒",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer-54-55.pdf",
            fileExamTranslate: "exams/translate-exam-02.pdf",
            fileAnswerTranslate: "answers/translate-answer-02.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๓"
            ],
            activityTranslate: [
                "เฉลยหลักการแปล ๙ ประการ ครั้งที่ ๒"
            ]
        }
    },

    {
        date: "2025-11-15", displayDate: "ส. ๑๕-พ.ย.-๖๘",
        remarks: {
            translate: [
                "หลักการแปล ๙ ประการ ครั้งที่ ๓-๔"
            ]
        },
        morning: {
            activityTranslate: [
                "เรียนหลักการแปล ๙ ประการ (๒. นิบาตต้นข้อความ)",
                "เรียนหลักการแปล ๙ ประการ (๓. กาลสัตตมี)"
            ],
            fileNoteTranslate: "materials/translate-notes-03.pdf"
        },
        afternoon: {
            activityTranslate: "สอบหลักการแปล ๙ ประการ ครั้งที่ ๓",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamTranslate: "exams/translate-exam-03.pdf",
            fileAnswerTranslate: "answers/translate-answer-03.pdf"
        },
        evening: {
            activityTranslate: [
                "เฉลยหลักการแปล ๙ ประการ ครั้งที่ ๓",
                "เรียนหลักการแปล ๙ ประการ (๔. บทประธาน)"
            ],
            fileNoteTranslate: "materials/translate-notes-04.pdf"
        }
    },

    {
        date: "2025-11-16", displayDate: "อา. ๑๖-พ.ย.-๖๘",
        remarks: {
            translate: [
                "หลักการแปล ๙ ประการ ครั้งที่ ๔-๕"
            ]
        },
        afternoon: {
            activityTranslate: "สอบหลักการแปล ๙ ประการ ครั้งที่ ๔",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamTranslate: "exams/translate-exam-04.pdf",
            fileAnswerTranslate: "answers/translate-answer-04.pdf"
        },
        evening: {
            activityTranslate: [
                "เฉลยหลักการแปล ๙ ประการ ครั้งที่ ๔",
                "เรียนหลักการแปล ๙ ประการ (๕. ขยายประธาน)"
            ],
            fileNoteTranslate: "materials/translate-notes-05.pdf"
        }
    },

    {
        date: "2025-11-17", displayDate: "จ. ๑๗-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๔",
            translate: [
                "หลักการแปล ๙ ประการ ครั้งที่ ๕-๖"
            ]
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๖-๕๗",
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf",
            activityTranslate: "สอบการแปล ๙ ประการ ครั้งที่ ๕",
            isExam: true,
            examStartTime: "09:00:00",
            examEndTime: "10:00:00",
            fileExamTranslate: "exams/translate-exam-05.pdf",
            fileAnswerTranslate: "answers/translate-answer-05.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๔",
            activityTranslate: [
                "เฉลยหลักการแปล ๙ ประการ ครั้งที่ ๕",
                "เรียนหลักการแปล ๙ ประการ (๖. กิริยาในระหว่างและประโยคแทรก)"
            ],
            fileNoteTranslate: "materials/translate-notes-06.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer-56-57.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๔"
            ],
            activityTranslate: "สอบการแปล ๙ ประการ ครั้งที่ ๖",
            isExam: true,
            examStartTime: "18:30:00",
            examEndTime: "19:30:00",
            fileExamTranslate: "exams/translate-exam-06.pdf",
            fileAnswerTranslate: "answers/translate-answer-06.pdf"
        }
    },

    {
        date: "2025-11-18", displayDate: "อ. ๑๘-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๕",
            translate: [
                "หลักการแปล ๙ ประการ ครั้งที่ ๖-๗",
            ]
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๘-๕๙",
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
            activityTranslate: [
                "เฉลยหลักการแปล ๙ ประการ ครั้งที่ ๖",
                "เรียนหลักการแปล ๙ ประการ (๗. บทขยายกิริยาในระหว่าง)",
                "เรียนหลักการแปล ๙ ประการ (๘. กิริยาคุมพากย์)",
                "เรียนหลักการแปล ๙ ประการ (๙. บทขยายกิริยาคุมพวกย์)"
            ],
            fileNoteTranslate: "materials/translate-notes-07.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๕",
            activityTranslate: "สอบการแปล ๙ ประการ ครั้งที่ ๗",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer-58-59.pdf",
            fileExamTranslate: "exams/translate-exam-07.pdf",
            fileAnswerTranslate: "answers/translate-answer-07.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๕"
            ],
            activityTranslate: "เฉลยหลักการแปล ๙ ประการ ครั้งที่ ๗"
        }
    },

    {
        date: "2025-11-19", displayDate: "พ. ๑๙-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๖",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๐-๖๑",
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf",
            activityTranslate: "อ่านเก็งที่ ๑ น.๗-๙ ตสฺส วรวนฺตสฺเสว - อาสิญฺจถาติ ปุนปฺปุนํ ยาจิ ฯ",
            fileNoteTranslate: "materials/translate-notes-101.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๖",
            activityTranslate: "อ่านเก็งที่ ๒ น.๑๓-๑๕ โส อนุปุพฺเพน ตํ - อิมา คาถา อภาสิ ฯ",
            fileNoteTranslate: "materials/translate-notes-102.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer-60-61.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๖"
            ],
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๑"
        }
    },

    {
        date: "2025-11-20", displayDate: "พฤ. ๒๐-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๗",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๒-๖๓",
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf",
            activityTranslate: "อ่านก็งที่ ๓ น.๑๘-๑๙ อเถกทิวสํ ทิสาวาสิโน - จกฺขุปาโล อโหสิ ฯ",
            fileNoteTranslate: "materials/translate-notes-103.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๗",
            activityTranslate: "อ่านเก็งที่ ๔ น.๓๕-๓๗ โส กิรายสฺมา - วตฺวา อตีตํ อาหริ ฯ",
            fileNoteTranslate: "materials/translate-notes-104.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-62-63.pdf",
            fileAnswerGrammar: "answers/grammar-answer-62-63.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๗"
            ],
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๑"
        }
    },

    {
        date: "2025-11-21", displayDate: "ศ. ๒๑-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๘",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๔-๖๕",
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf",
            activityTranslate: "อ่านเก็งที่ ๕ น.๓๗-๓๘ อตีเต พาราณสิยํ - มา เอวํ อกริตฺถ อาจริยาติ ฯ",
            fileNoteTranslate: "materials/translate-notes-105.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๘",
            activityTranslate: "อ่านเก็งที่ ๖ น.๔๔-๔๖ อถสฺสา อิตรา อุทรํ - วตฺวา อิมํ คาถมาห ฯ",
            fileNoteTranslate: "materials/translate-notes-106.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-64-65.pdf",
            fileAnswerGrammar: "answers/grammar-answer-64-65.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๘"
            ],
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๑"
        }
    },

    // --- วันหยุดสุดสัปดาห์ เรียนเฉพาะวิชาแปล ---
    {
        date: "2025-11-22", displayDate: "ส. ๒๒-พ.ย.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๑"
        },
        morning: {
            activityTranslate: "อ่านเก็งที่ ๗ น.๕๒-๕๔ โส ตาย อากิณฺณวิหารตาย - อุณฺโหทกํ ปฏิยาเทติ",
        },
        afternoon: {
            activityTranslate: "อ่านเก็งที่ ๘ น.๕๔-๕๖ สตฺถา อุทกํ เต - เสยฺโยติ วตฺวา (อาห) ฯ"
        },
        evening: {
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๑"
        }
    },
    {
        date: "2025-11-23", displayDate: "อา. ๒๓-พ.ย.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๑"
        },
        morning: {
            activityTranslate: "อ่านเก็งที่ ๙ น.๖๕-๖๗ ตสฺส ทิฏฺฐกาลโต ปฏฺฐาย - อิมา คาถาโย อภาสิ ฯ"
        },
        afternoon: {
            activityTranslate: "อ่านเก็งที่ ๑๐ น.๗๐-๗๒ เอกสฺมึ หิ สมเย - วตฺวา อตีตํ อาหริ ฯ"
        },
        evening: {
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๑"
        }
    },

    // --- กลับมาเรียนผสมผสานในวันทำการ ---
    {
        date: "2025-11-24", displayDate: "จ. ๒๔-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๙",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๖-๖๗",
            activityTranslate: "อ่านเก็งที่ ๑๑ น.๘๑-๘๓ เตน โข ปน - มยฺหํ ภาโรติ วตฺวา (อาห)",
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๙",
            activityTranslate: "อ่านเก็งที่ ๑๒ น.๘๔-๘๖ ปริพฺพาชโก ปฐมปททฺวยเมว - สทฺธึ เวฬุวนํ อคมํสุ ฯ",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-66-67.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๙"
            ],
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๑"
        }
    },

    {
        date: "2025-11-25", displayDate: "อ. ๒๕-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๐",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๐-๕๑",
            activityTranslate: "อ่านเก็งที่ ๑๓ น.๙๓-๙๕ ตทา ปน เตสํ - อิมมฺปิ ธมฺมเทสนํ อาหริ ฯ",
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๐",
            activityTranslate: "อ่านเก็งที่ ๑๔ น.๙๕-๙๗ อคฺคสาวกา ปน - คเหตฺวา เอกมนฺตํ นิสีทิ ฯ",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-50-51.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๐"
            ],
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๑"
        }
    },

    {
        date: "2025-11-26", displayDate: "พ. ๒๖-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๑",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๒-๕๓",
            activityTranslate: "อ่านเก็งที่ ๑๕ น.๙๙-๑๐๑ เอวํ นิสินฺเน สตฺถริ - สารีปุตฺโต นาม ภวิสฺสสีติ ฯ",
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๑",
            activityTranslate: "อ่านเก็งที่ ๑๖ น.๑๐๖-๑๐๙ กุมาโร นิวตฺติตุกาโม - คนฺตฺวา วาสํ กปฺเปสิ ฯ",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-52-53.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๑"
            ],
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๑"
        }
    },

    {
        date: "2025-11-27", displayDate: "พฤ. ๒๗-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๒",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๔-๕๕",
            activityTranslate: "อ่านเก็งที่ ๑๗ น.๑๒๐-๑๒๓ สาวตฺถิยํ กิร - อิมํ คาถมาห ฯ",
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๒",
            activityTranslate: "อ่านเก็งที่ ๑๘ น.๑๒๔-๑๒๖ เทวทตฺตสฺส วตฺถุํ - อุฏฺฐหตีติ อาห ฯ",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-54-55.pdf"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๒"
            ],
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๑"
        }
    },

    {
        date: "2025-11-28", displayDate: "ศ. ๒๘-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๓",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๑"
        },
        morning: {
            activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๖-๕๗",
            activityTranslate: "อ่านเก็งที่ ๑๙ น.๑๒๙-๑๓๑ อปรภาเค สตฺถริ - ...กกฺกฏกชาตกานิ กเถสิ ฯ",
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf"
        },
        afternoon: {
            activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๓",
            activityTranslate: "อ่านเก็งที่ ๒๐ น.๒๔๑-๑๔๓ สาวตฺถิยํ หิ เทวสิกํ - อิมํ คาถมาห ฯ",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam-56-57.pdf",
            fileAnswerGrammar: "#"
        },
        evening: {
            activityGrammar: [
                "เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๓"
            ],
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๑๐ ภาค ๑"
        }
    },

    // --- วันหยุดสุดสัปดาห์ เรียนเฉพาะวิชาแปล (เริ่มต้นภาค ๒) ---
    {
        date: "2025-11-29", displayDate: "ส. ๒๙-พ.ย.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๒"
        },
        morning: {
            activityTranslate: "อ่านเก็งที่ ๑ น.๔-๖ ตทา จ หิมวนฺตปฺปเทเส - เทฺวปิ สมคฺคสํวาสํ วสึสุ ฯ"
        },
        afternoon: {
            activityTranslate: "อ่านเก็งที่ ๒ น.๘-๙ อลฺลกปฺปรฏฺเฐ ปน ทุพฺภิกฺเข - ภตึ กโรนฺตี วสิ ฯ"
        },
        evening: {
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๒"
        }
    },

    {
        date: "2025-11-30", displayDate: "อา. ๓๐-พ.ย.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๒"
        },
        morning: {
            activityTranslate: "อ่านเก็งที่ ๓ น.๑๒-๑๕ ติรจฺฉานา นาเมเต - อนฺตเร กตฺวา อฏฺฐาสิ ฯ"
        },
        afternoon: {
            activityTranslate: "อ่านเก็งที่ ๔ น.๑๖-๑๘ สา ตํ เนตฺวา - อปฺปทุฏฺฐสฺส ปทุฏฺฐมโน ฯ"
        },
        evening: {
            activityTranslate: "เรียนแปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๒"
        }
    },

];