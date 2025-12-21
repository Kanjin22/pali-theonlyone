// ===================================================================
// == ไฟล์ข้อมูลตาราง(เรียน) -(สอบ) (เวอร์ชัน 3.0 - Modal) ==
// == รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบ(เฉลย) อัตโนมัติ ==
// ===================================================================

const dataNovember = [
    // ===============================================================
    // == *** ตัวอย่างต้นแบบ *** ==
    // == คัดลอกบล็อก {...}, นี้ไปใช้ แล้วแก้ไขข้อมูลตามต้องการ ==
    // ===============================================================
    //{
    // --- ข้อมูลหลักของวัน (จำเป็นต้องมี) ---
    // date: "YYYY-MM-DD", // รูปแบบปี-เดือน-วัน (ค.ศ.) สำหรับการคำนวณ
    // displayDate: "ว. ดด-เดือน-ปป", // ข้อความวันที่ ที่จะแสดงในตาราง

    // --- หมายเหตุ (แสดงที่คอลัมน์สุดท้าย) ---
    // remarks: {
    // grammar: "หมายเหตุสำหรับวิชาไวยากรณ์ (ถ้ามี)",
    // translate: [
    // "หมายเหตุสำหรับวิชาแปล ชุดที่ 1 (ถ้ามี)",
    // "หมายเหตุสำหรับวิชาแปล ชุดที่ 2 (ถ้ามี)"
    // ],
    // general: "หมายเหตุทั่วไป ไม่เกี่ยวกับวิชาใดเป็นพิเศษ (ถ้ามี)"
    // },

    // --- กิจกรรมช่วงเช้า ---
    // morning: {
    // activityGrammar: "ข้อความกิจกรรมของวิชาไวยากรณ์ (ถ้ามี)",
    // activityTranslate: "ข้อความกิจกรรมของวิชาแปล (ถ้ามี)",
    // linkZoom: "https://... (ลิงก์ Zoom ถ้ามี)",
    // linkYoutube: "https://... (ลิงก์ YouTube ถ้ามี)",
    // fileNoteGrammar: "materials/... (ไฟล์เนื้อหาไวยากรณ์ ถ้ามี)",
    // fileNoteTranslate: [
    // "materials/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 1 ถ้ามี)",
    // "materials/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 2 ถ้ามี)"
    // ]
    // },

    // --- กิจกรรมช่วงบ่าย (ตัวอย่างการ(สอบ) ) ---
    // afternoon: {
    // activityGrammar: "กิจกรรมไวยากรณ์ช่วงบ่าย (ถ้ามี)",
    // activityTranslate: "กิจกรรมแปลช่วงบ่าย (ถ้ามี)",
    // isExam: true, // ใส่ true ถ้าช่วงเวลานี้มีการ(สอบ) 
    // examStartTime: "HH:MM:SS", // เวลาเริ่ม(สอบ) (24-hour format)
    // examEndTime: "HH:MM:SS", // เวลาสิ้นสุดการ(สอบ) (สำคัญสำหรับ(เฉลย) )
    // fileExamGrammar: "exams/... (ไฟล์ข้อ(สอบ) ไวยากรณ์ ถ้ามี)",
    // fileAnswerGrammar: "answers/... (ไฟล์(เฉลย) ไวยากรณ์ ถ้ามี)",
    // fileExamTranslate: "exams/... (ไฟล์ข้อ(สอบ) แปล ถ้ามี)",
    // fileAnswerTranslate: "answers/... (ไฟล์(เฉลย) แปล ถ้ามี)"
    // },

    // --- กิจกรรมช่วงค่ำ (ตัวอย่างกิจกรรมทั่วไป) ---
    // evening: {
    // activity: "กิจกรรมทั่วไปที่ไม่แยกวิชา (ถ้ามี)"
    // }
    //},
    // --- ตัวอย่างสำหรับวันหยุดสุดสัปดาห์ ---
    //{
    // date: "YYYY-MM-DD",
    // displayDate: "ว. ดด-เดือน-ปป",
    // isWeekend: true, // ใส่ true เพื่อให้เป็นแถบสีเทา
    // remarks: {
    // general: "ข้อความสำหรับวันหยุด (ถ้ามี)"
    // }
    //},

    // ===============================================================
    // == *** เริ่มข้อมูลจริง *** ==
    // ===============================================================

    // ########## พฤศจิกายน 2568 ##########
    {
        date: "2025-11-12", displayDate: "พ. ๑๒-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๐-๕๑",
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y50-51.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y50-51.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y50-51.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑"
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
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓",
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y52-53.pdf",
            activityTranslate: "(เรียน) หลักการแปล ๙ ประการ ครั้งที่ ๑ (ทำความเข้าใจหลักการแปลมคธเป็นไทยเบื้องต้น)",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_01.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓",
            activityTranslate: "(สอบ) หลักการแปล ๙ ประการ ครั้งที่ ๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y52-53.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y52-53.pdf",
            fileExamTranslate: "exams/pt12/pt12_pali_translate_exam_01.pdf",
            fileAnswerTranslate: "answers/pt12/pt12_pali_translate_ans_01.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒"
            ],
            activityTranslate: "(เฉลย) หลักการแปล ๙ ประการ ครั้งที่ ๑"
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
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕",
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y54-55.pdf",
            factivityTranslate: "(เรียน) หลักการแปล ๙ ประการ (๑. อาลปนะ)",
            ileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_02.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕",
            activityTranslate: "(สอบ) หลักการแปล ๙ ประการ ครั้งที่ ๒",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y54-55.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y54-55.pdf",
            fileExamTranslate: "exams/pt12/pt12_pali_translate_exam_02.pdf",
            fileAnswerTranslate: "answers/pt12/pt12_pali_translate_ans_02.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓"
            ],
            activityTranslate: [
                "(เฉลย) หลักการแปล ๙ ประการ ครั้งที่ ๒"
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
                "(เรียน) หลักการแปล ๙ ประการ (๒. นิบาตต้นข้อความ)",
                "(เรียน) หลักการแปล ๙ ประการ (๓. กาลสัตตมี)"
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_03.pdf"
        },
        afternoon: {
            activityTranslate: "(สอบ) หลักการแปล ๙ ประการ ครั้งที่ ๓",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamTranslate: "exams/pt12/pt12_pali_translate_exam_03.pdf",
            fileAnswerTranslate: "answers/pt12/pt12_pali_translate_ans_03.pdf"
        },
        evening: {
            activityTranslate: [
                "(เฉลย) หลักการแปล ๙ ประการ ครั้งที่ ๓",
                "(เรียน) หลักการแปล ๙ ประการ (๔. บทประธาน)"
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_04.pdf"
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
            activityTranslate: "(สอบ) หลักการแปล ๙ ประการ ครั้งที่ ๔",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamTranslate: "exams/pt12/pt12_pali_translate_exam_04.pdf",
            fileAnswerTranslate: "answers/pt12/pt12_pali_translate_ans_04.pdf"
        },
        evening: {
            activityTranslate: [
                "(เฉลย) หลักการแปล ๙ ประการ ครั้งที่ ๔",
                "(เรียน) หลักการแปล ๙ ประการ (๕. ขยายประธาน)"
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_05.pdf"
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
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๖-๕๗",
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y56-57.pdf",
            activityTranslate: "(สอบ) การแปล ๙ ประการ ครั้งที่ ๕",
            isExam: true,
            examStartTime: "09:00:00",
            examEndTime: "10:00:00",
            fileExamTranslate: "exams/pt12/pt12_pali_translate_exam_05.pdf",
            fileAnswerTranslate: "answers/pt12/pt12_pali_translate_ans_05.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔",
            activityTranslate: [
                "(เฉลย) หลักการแปล ๙ ประการ ครั้งที่ ๕",
                "(เรียน) หลักการแปล ๙ ประการ (๖. กิริยาในระหว่างและประโยคแทรก)"
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_06.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y56-57.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y56-57.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔"
            ],
            activityTranslate: "(สอบ) การแปล ๙ ประการ ครั้งที่ ๖",
            isExam: true,
            examStartTime: "18:30:00",
            examEndTime: "19:30:00",
            fileExamTranslate: "exams/pt12/pt12_pali_translate_exam_06.pdf",
            fileAnswerTranslate: "answers/pt12/pt12_pali_translate_ans_06.pdf"
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
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๘-๕๙",
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y58-59.pdf",
            activityTranslate: [
                "(เฉลย) หลักการแปล ๙ ประการ ครั้งที่ ๖",
                "(เรียน) หลักการแปล ๙ ประการ (๗. บทขยายกิริยาในระหว่าง)",
                "(เรียน) หลักการแปล ๙ ประการ (๘. กิริยาคุมพากย์)",
                "(เรียน) หลักการแปล ๙ ประการ (๙. บทขยายกิริยาคุมพวกย์)"
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_07.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕",
            activityTranslate: "(สอบ) การแปล ๙ ประการ ครั้งที่ ๗",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y58-59.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y58-59.pdf",
            fileExamTranslate: "exams/pt12/pt12_pali_translate_exam_07.pdf",
            fileAnswerTranslate: "answers/pt12/pt12_pali_translate_ans_07.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕"
            ],
            activityTranslate: "(เฉลย) หลักการแปล ๙ ประการ ครั้งที่ ๗"
        }
    },

    {
        date: "2025-11-19", displayDate: "พ. ๑๙-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๖",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๑ (เก็งที่ ๑-๒)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๐-๖๑",
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y60-61.pdf",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑ น.๗-๙ ตสฺส วรวนฺตสฺเสว - อาสิญฺจถาติ ปุนปฺปุนํ ยาจิ ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_01.pdf",
            linkYoutube: [
                "https://youtu.be/R8QsLUmUs90?si=zGUWc2AKWzNk0sbV&t=565",
                "https://youtu.be/eOw1vJ0AJ-g?si=pFlLdsJrx3R9QYcD"
            ],
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๒ น.๑๓-๑๕ โส อนุปุพฺเพน ตํ - อิมา คาถา อภาสิ ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_02.pdf",
            linkYoutube: [
                "https://youtu.be/3gujLYnrg0s?si=IQttvTA5zSqHWRiK&t=706",
                "https://youtu.be/6ZaIEQcfITs?si=yIQw5gq8h13LzZRO",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y60-61.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y60-61.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖"
            ],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๑"
        }
    },

    {
        date: "2025-11-20", displayDate: "พฤ. ๒๐-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๗",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๑ (เก็งที่ ๓-๔)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๒-๖๓",
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y62-63.pdf",
            activityTranslate: "(อ่าน) ก็งที่ ๓ น.๑๘-๑๙ อเถกทิวสํ ทิสาวาสิโน - จกฺขุปาโล อโหสิ ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_03.pdf",
            linkYoutube: [
                "https://youtu.be/6ZaIEQcfITs?si=5Q_tn1_WJsPTIaRf&t=1200",
                "https://youtu.be/HWt5O-HmVYU?si=43zsWD8cEZtXzbPc",
            ],
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๗",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๔ น.๓๕-๓๗ โส กิรายสฺมา - วตฺวา อตีตํ อาหริ ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_04.pdf",
            linkYoutube: [
                "https://youtu.be/wYO0QtGbqH4?si=4uyDcW-Rx2i5oj8t&t=72",
                "https://youtu.be/PXF3hbtgmpE?si=f1ru8mS0NIgCCvcE",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y62-63.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y62-63.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๗"
            ],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๑"
        }
    },

    {
        date: "2025-11-21", displayDate: "ศ. ๒๑-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๘",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๑ (เก็งที่ ๕-๖)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๔-๖๕",
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y64-65.pdf",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๕ น.๓๗-๓๘ อตีเต พาราณสิยํ - มา เอวํ อกริตฺถ อาจริยาติ ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_05.pdf",
            linkYoutube: [
                "https://youtu.be/PXF3hbtgmpE?si=QQ4EDIuc_uDtkB63&t=128",
                "https://youtu.be/Ua-6ouBapBY?si=We0jLD77EameWxvo",
            ],
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๘",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๖ น.๔๔-๔๖ อถสฺสา อิตรา อุทรํ - วตฺวา อิมํ คาถมาห ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_06.pdf",
            linkYoutube: [
                "https://youtu.be/OcEaVlcvVuY?si=2sUyAX1Adyk4leXb&t=797",
                "https://youtu.be/x8TCfNLvOqQ?si=mWK3feIJ8xL6IXC0",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y64-65.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y64-65.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๘"
            ],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๑"
        }
    },

    // --- วันหยุดสุดสัปดาห์ (เรียน) เฉพาะวิชาแปล ---
    {
        date: "2025-11-22", displayDate: "ส. ๒๒-พ.ย.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๑ (เก็งที่ ๗-๘)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๗ น.๕๒-๕๔ โส ตาย อากิณฺณวิหารตาย - อุณฺโหทกํ ปฏิยาเทติ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_07.pdf",
            linkYoutube: [
                "https://youtu.be/NGP-LrmIP4w?si=JcP2w3FwtPRNSnbz&t=1200",
                "https://youtu.be/9faWLXQEcYw?si=d68S4jEhMgj0W8iP",
            ],
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๘ น.๕๔-๕๖ สตฺถา อุทกํ เต - เสยฺโยติ วตฺวา (อาห) ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_08.pdf",
            linkYoutube: [
                "https://youtu.be/9faWLXQEcYw?si=2mIVWc71lFp4g29U&t=594",
                "https://youtu.be/jta8di0oBKE?si=sdOjiuaWWYqygKss",
            ],
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๑"
        }
    },
    {
        date: "2025-11-23", displayDate: "อา. ๒๓-พ.ย.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๑ (เก็งที่ ๙-๑๐)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๙ น.๖๕-๖๗ ตสฺส ทิฏฺฐกาลโต ปฏฺฐาย - อิมา คาถาโย อภาสิ ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_09.pdf",
            linkYoutube: [
                "https://youtu.be/pEztrJFGb5Y?si=HAwQQEzxR3FR78vX&t=238",
            ],
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๐ น.๗๐-๗๒ เอกสฺมึ หิ สมเย - วตฺวา อตีตํ อาหริ ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_10.pdf",
            linkYoutube: [
                "https://youtu.be/_VeuCTS9aqc?si=v8g-DWnBWzoKSqQu&t=79",
            ],
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๑"
        }
    },

    {
        date: "2025-11-24", displayDate: "จ. ๒๔-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๙",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๑ (เก็งที่ ๑๑-๑๒)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๖-๖๗",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๑ น.๘๑-๘๓ เตน โข ปน - มยฺหํ ภาโรติ วตฺวา (อาห)",
            linkYoutube: [
                "https://youtu.be/-PGkPIpdq9A?si=3poa-rDYgYPrQVfS&t=1292",
                "https://youtu.be/gAiC-673Gek?si=ezHluQfeqaSTbcRI",
            ],
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y66-67.pdf",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_11.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๙",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๒ น.๘๔-๘๖ ปริพฺพาชโก ปฐมปททฺวยเมว - สทฺธึ เวฬุวนํ อคมํสุ ฯ",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_12.pdf",
            linkYoutube: [
                "https://youtu.be/gAiC-673Gek?si=5Vc5LM375MqIIqZ-",
                "https://youtu.be/DbPRlF_UhpQ?si=Nl-V182b6rFQfIV1",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q1-2_y66-67.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q1-2_y66-67.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๙"
            ],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๑"
        }
    },

    {
        date: "2025-11-25", displayDate: "อ. ๒๕-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๐",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๑ (เก็งที่ ๑๓-๑๔)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๐-๕๑",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๓ น.๙๓-๙๕ ตทา ปน เตสํ - อิมมฺปิ ธมฺมเทสนํ อาหริ ฯ",
            linkYoutube: [
                "https://youtu.be/wKjwJesIDKM?si=UtsnkL2xot8yBs8u&t=920",
                "https://youtu.be/LfaaIifBfbI?si=okd5o1jo7N7HPynT",
            ],
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y50-51.pdf",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_13.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๐",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๔ น.๙๕-๙๗ อคฺคสาวกา ปน - คเหตฺวา เอกมนฺตํ นิสีทิ ฯ",
            linkYoutube: [
                "https://youtu.be/LfaaIifBfbI?si=WlCBPQYYf-vqtRXa&t=395",
                "https://youtu.be/pG2QSG6Mvq0?si=1HeDpMgfmXijURmz",
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_14.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q3_y50-51.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q3_y50-51.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๐"
            ],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๑"
        }
    },

    {
        date: "2025-11-26", displayDate: "พ. ๒๖-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๑",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๑ (เก็งที่ ๑๕-๑๖)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๒-๕๓",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๕ น.๙๙-๑๐๑ เอวํ นิสินฺเน สตฺถริ - สารีปุตฺโต นาม ภวิสฺสสีติ ฯ",
            linkYoutube: [
                "https://youtu.be/pG2QSG6Mvq0?si=0S6CPMBr6iRL-e3G&t=850",
            ],
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y52-53.pdf",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_15.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๑",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๖ น.๑๐๖-๑๐๙ กุมาโร นิวตฺติตุกาโม - คนฺตฺวา วาสํ กปฺเปสิ ฯ",
            linkYoutube: [
                "https://youtu.be/mGL7wVrmP9k?si=KjEdUj3z9eKSOTy2&t=495",
                "https://youtu.be/6Qyl-RWfioI?si=cHUT1fYpb8DsO-VF",
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_16.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q3_y52-53.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q3_y52-53.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๑"
            ],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๑"
        }
    },

    {
        date: "2025-11-27", displayDate: "พฤ. ๒๗-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๒",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๑ (เก็งที่ ๑๗-๑๘)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๔-๕๕",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๗ น.๑๒๐-๑๒๓ สาวตฺถิยํ กิร - อิมํ คาถมาห ฯ",
            linkYoutube: [
                "https://youtu.be/mQJ4bkWQMtQ?si=5kkad5aaY0d8p5bE",
            ],
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y54-55.pdf",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_17.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๒",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๘ น.๑๒๔-๑๒๖ เทวทตฺตสฺส วตฺถุํ - อุฏฺฐหตีติ อาห ฯ",
            linkYoutube: [
                "https://youtu.be/yXl8QHKmdgQ?si=Cp_LdpVAWNH5w_GF",
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_18.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q3_y54-55.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q3_y54-55.pdf",
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๒"
            ],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๑"
        }
    },

    {
        date: "2025-11-28", displayDate: "ศ. ๒๘-พ.ย.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๓",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑๐ ภาค ๑ (เก็งที่ ๑๙-๒๐) (สิ้นสุด)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๖-๕๗",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๑๙ น.๑๒๙-๑๓๑ อปรภาเค สตฺถริ - ...กกฺกฏกชาตกานิ กเถสิ ฯ",
            linkYoutube: [
                "https://youtu.be/sb34IpqIEjw?si=jEaJQgtBzjTCxNf2&t=742",
                "https://youtu.be/gzI7v5vT4YU?si=_7pXG-u-mFL-skZD",
            ],
            fileNoteGrammar: "materials/pt12/pt12_pali_grammar_notes_y56-57.pdf",
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_19.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๓",
            activityTranslate: "(อ่าน) ภาคที่ ๑ เก็งที่ ๒๐ น.๒๔๑-๑๔๓ สาวตฺถิยํ หิ เทวสิกํ - อิมํ คาถมาห ฯ",
            linkYoutube: [
                "https://youtu.be/Xyu5oWv-XL0?si=5-I8K_DyrGkIsc7g",
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp1_20.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/pt12/pt12_pali_grammar_exam_q3_y56-57.pdf",
            fileAnswerGrammar: "answers/pt12/pt12_pali_grammar_ans_q3_y56-57.pdf"
        },
        evening: {
            activityGrammar: [
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๓"
            ],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๑๐ ภาค ๑"
        }
    },

    {
        date: "2025-11-29", displayDate: "ส. ๒๙-พ.ย.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๒ (เก็งที่ ๑-๒)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑ น.๔-๖ ตทา จ หิมวนฺตปฺปเทเส - เทฺวปิ สมคฺคสํวาสํ วสึสุ ฯ",
            linkYoutube: [
                "https://youtu.be/njG8dBKLuk4?si=P1Rf_Yi0u9Sd05kK&t=271",
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp2_01.pdf",
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๒ น.๘-๑๐ อลฺลกปฺปรฏฺเฐ ปน ทุพฺภิกฺเข - ภตึ กโรนฺตี วสิ ฯ",
            linkYoutube: [
                "https://youtu.be/JVBWiXwa-qs?si=H9Bw7tIXPcjaMqR-",
                "https://youtu.be/9-VFvaw97eI?si=ybXnBnRpwdpCONIy",
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp2_02.pdf",
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๒"
        }
    },

    {
        date: "2025-11-30", displayDate: "อา. ๓๐-พ.ย.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๒ (เก็งที่ ๓-๔)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๓ น.๑๒-๑๕ ติรจฺฉานา นาเมเต - อนฺตเร กตฺวา อฏฺฐาสิ ฯ",
            linkYoutube: [
                "https://youtu.be/yjcrDc5apJA?si=bs6SCkbjMOZjEyOX&t=38",
                "https://youtu.be/wfNS5MNXaBI?si=21ADDRJgCc8DIk31",
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp2_03.pdf",
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๔ น.๑๖-๑๘ สา ตํ เนตฺวา - อปฺปทุฏฺฐสฺส ปทุฏฺฐมโน ฯ",
            linkYoutube: [
                "https://youtu.be/wfNS5MNXaBI?si=pGyjMySmKSWVhJGJ&t=416",
            ],
            fileNoteTranslate: "materials/pt12/pt12_pali_translate_notes_tp2_04.pdf",
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๒"
        }
    },

];