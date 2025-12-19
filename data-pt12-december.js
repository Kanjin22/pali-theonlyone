// ===================================================================
// == ไฟล์ข้อมูลตาราง(เรียน) -(สอบ) (เวอร์ชัน 3.0 - Modal) ==
// == รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบ(เฉลย) อัตโนมัติ ==
// ===================================================================

const dataDecember = [
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

    // ########## ธันวาคม 2568 ##########
    {
        date: "2025-12-01", displayDate: "จ. ๑-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๔",
            translate: "แปลมคธเป็นไทย ครัั้งที่ ๓ ภาค ๒ (เก็งที่ ๕-๖)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๕ น.๒๔-๒๗ เสฏฺฐี มโตติ - ทานพฺยาวโฏ อโหสิ ฯ",
            linkYoutube: [
                "https://youtu.be/Fxi6Fzm2lGA?si=pgtiXdt3Z6VIVpXY&t=2940",
                "https://youtu.be/tcbWtQK70X4?si=EYY2dc0JYFTB5Gse",
            ],
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
            fileNoteTranslate: "materials/translate-notes-205.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๔",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๖ น. ๒๙-๓๑ สา ทานคฺเค อุจฺจาสทฺทํ - ตสฺสาเยว ปริวาริตฺถิโย อเหสุํ ฯ",
            linkYoutube: [
                "https://youtu.be/FdhxWVZTC00?si=TSX7tmticVRhHHe4&t=86",
            ],
            fileNoteTranslate: "materials/translate-notes-206.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-58-59.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๔"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๒"
        }
    },

    {
        date: "2025-12-02", displayDate: "อ. ๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๕",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๒ (เก็งที่ ๗-๘)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๗ น.๓๓-๓๕ จณฺฑปชฺโชโต ปิ อุเทนํ - หตฺถคตํ กรึสุ ฯ",
            linkYoutube: [
                "https://youtu.be/1UUn6E6TdGY?si=lWewLM7WqyGIc_7p&t=479",
                "https://youtu.be/brBfFITuq5E?si=uOnAQGX2O5gCcECb",
            ],
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf",
            fileNoteTranslate: "materials/translate-notes-207.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๕",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๘ น.๔๒-๔๔ ตสฺมึ โข ปน สมเย - มยา ลทฺธาติ อาห ฯ",
            linkYoutube: [
                "https://youtu.be/iniianWQ0Zw?si=4WzsTv0VpPJkvz8q&t=421",
                "https://youtu.be/DIoXAa37r6A?si=kxSJtqwObPDQv5lj",
            ],
            fileNoteTranslate: "materials/translate-notes-208.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-60-61.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๕"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๒"
        }
    },

    {
        date: "2025-12-03", displayDate: "พ. ๓-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๖",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๒ (เก็งที่ ๙-๑๐)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๙ น.๔๖-๔๘ เตสํ ปน ติณฺณํ - วนฺทึสุ เจว ปูเชสุํ ฯ",
            linkYoutube: [
                "https://youtu.be/DIoXAa37r6A?si=WUF9b2rMjTCDmr8F&t=1122",
                "https://youtu.be/VaB0JZhQF-c?si=aB7OSCs4nUeHXNMa",
            ],
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf",
            fileNoteTranslate: "materials/translate-notes-209.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๖",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๐ น.๕๕-๕๘ ตา เอกทิวสํ เถรสฺส - อิมํ อุทานํ อุทาเนสิ ฯ",
            linkYoutube: [
                "https://youtu.be/AuqvGqy6q4E?si=y3bVGODAUCxP2qMc&t=63",
            ],
            fileNoteTranslate: "materials/translate-notes-210.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-62-63.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-62-63.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๖"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๒"
        }
    },

    {
        date: "2025-12-04", displayDate: "พฤ. ๔-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๗",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๒ (เก็งที่ ๑๑-๑๒)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๑ น.๗๐-๗๒ สา กติปาหจฺจเยน - น ทิฏฺฐปุพฺโพติ อาห ฯ",
            linkYoutube: [
                "https://youtu.be/co8ARPoXiBs?si=dZCgB7uOFbzHAbgB&t=184",
            ],
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf",
            fileNoteTranslate: "materials/translate-notes-211.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๗",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๒ น.๘๒-๘๔ อถ สายณฺหสมเย ภิกฺขู - มาตา มหาสกฺการสมฺมานมกาสิ ฯ",
            linkYoutube: [
                "https://youtu.be/BL1qQqmfGJg?si=FKJ3TP3H2xDCR81y&t=222",
            ],
            fileNoteTranslate: "materials/translate-notes-212.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-64-65.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-64-65.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๗"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๒"
        }
    },

    {
        date: "2025-12-05", displayDate: "ศ. ๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๘",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๒ (เก็งที่ ๑๓-๑๔)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๓ น.๘๔-๘๗ ตทา พาราณสีราชา - ทิสาปาโมกฺขาจริโยติ ฯ",
            linkYoutube: [
                "https://youtu.be/ISq7VTxJdIY?si=gjfm1yRZdQ9fvi2_",
            ],
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf",
            fileNoteTranslate: "materials/translate-notes-213.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๘",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๔ น.๙๗-๙๙ อตีเต มคธรฏฺเฐ - กุชฺฌิตฺวา เอวมาหาติ ฯ",
            linkYoutube: [
                "https://youtu.be/BR_aEZQy8es?si=JK4oCfVfzCyBOkGP&t=483",
                "https://youtu.be/QxjOjO-14QM?si=WL7lz85Cbi41pLch",
            ],
            fileNoteTranslate: "materials/translate-notes-214.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-66-67.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-66-67.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๘"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๒"
        }
    },

    {
        date: "2025-12-06", displayDate: "ส. ๖-ธ.ค.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๒ (เก็งที่ ๑๕-๑๖)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๕ น.๑๐๕-๑๐๗ สุชาตา ปน กาลํ - ธีตา หุตฺวา นิพฺพตฺติ ฯ",
            linkYoutube: [
                "https://youtu.be/CFIfKWK-hL8?si=CaXCgAIp6axmGucV",
            ],
            fileNoteTranslate: "materials/translate-notes-215.pdf",
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๖ น.๑๒๐-๑๒๒ เตสุ เอวํ กติกํ กตฺวา - ตสฺสา คุณกถํ กถยึสุ ฯ",
            linkYoutube: [
                "https://youtu.be/EzE3vYLukbY?si=wiF8CEaSsiDigRnr&t=995",
                "https://youtu.be/xp-n1g51qm0?si=AD8DxD7YhcyTfto1",
            ],
            fileNoteTranslate: "materials/translate-notes-216.pdf",
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๒"
        }
    },

    {
        date: "2025-12-07", displayDate: "อา. ๗-ธ.ค.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๒ (เก็งที่ ๑๗-๑๘)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๗ น.๑๒๒-๑๒๔ อญฺญตโร ภิกฺขุ ตสฺสา - วตฺวา อิมํ คาถมาห ฯ",
            linkYoutube: [
                "https://youtu.be/xp-n1g51qm0?si=ihUniziGjaLa47Eq&t=937",
                "https://youtu.be/kU-Wx3poJM0?si=QXlPeMuvEKYV-p8_",
            ],
            fileNoteTranslate: "materials/translate-notes-217.pdf",
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๘ น.๑๒๖-๑๒๘ สตฺถริ กิร สาวตฺถิยํ - ทตฺวา อิมํ คาถมาห ฯ",
            linkYoutube: [
                "https://youtu.be/ki46xNs2Qsw?si=iqu4LGoYGuZ1vuoG&t=431",
            ],
            fileNoteTranslate: "materials/translate-notes-218.pdf",
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๒"
        }
    },

    {
        date: "2025-12-08", displayDate: "จ. ๘-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๙",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑๐ ภาค ๒ (เก็งที่ ๑๙-๒๐)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๑๙ น.๑๒๙-๑๓๒ สาวตฺถิยํ กิเรโก - วตฺวา อิมํ คาถมาห ฯ",
            linkYoutube: [
                "https://youtu.be/SKUDuGGyl1Q?si=3IN16juV8VTCP7Ts&t=261",
                "https://youtu.be/qKiQPCLPo2A?si=WbpdzuVSDjRYcJO-",
            ],
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf",
            fileNoteTranslate: "materials/translate-notes-219.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๙",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๒๐ น.๑๓๓-๑๓๕ เอโก กิร สาวตฺถีวาสี - อรหตฺตํ ปาปุณิ ฯ",
            linkYoutube: [
                "https://youtu.be/qKiQPCLPo2A?si=junc2Fa0jH8tTNW1&t=676",
                "https://youtu.be/hx4zxu90xuA?si=Z1zTgjL0mBi1nuLO",
            ],
            fileNoteTranslate: "materials/translate-notes-220.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-50-51.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๙"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๑๐ ภาค ๒"
        }
    },

    {
        date: "2025-12-09", displayDate: "อ. ๙-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๐",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑๑ ภาค ๒ (เก็งที่ ๒๑-๒๒) (สิ้นสุด)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๒๑ น.๑๔๐-๑๔๒ สาวตฺถิยํ กิร ปญฺจสตา - ปวิเสยฺยาถาติ อุยฺโยเชสิ ฯ",
            linkYoutube: [
                "https://youtu.be/I9jYkFWC1a8?si=3-u8eVsJagBK6gBf&t=44",
            ],
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf",
            fileNoteTranslate: "materials/translate-notes-221.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๐",
            activityTranslate: "(อ่าน) ภาคที่ ๒ เก็งที่ ๒๒ น.๑๕๒-๑๕๖ สมฺมาสมฺพุทฺเธ สาวตฺถิยํ - ปุริสลิงฺคํ ปาตุภาวิ ฯ",
            linkYoutube: [
                "https://youtu.be/o4x0BtfXuYE?si=kCbeQt1et347FX9g&t=936",
                "https://youtu.be/n1Sk7r06nRQ?si=iogtpZ-xByZMWZS3",
                "https://youtu.be/A0lknpBv538?si=zfruQJIns-kLQu1b",
            ],
            fileNoteTranslate: "materials/translate-notes-222.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-52-53.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๐"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๑๑ ภาค ๒"
        }
    },

    {
        date: "2025-12-10", displayDate: "พ. ๑๐-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๑",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๓ (เก็งที่ ๑-๒)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑ น.๙-๑๑ อิติ โข มหาราช - สุวณฺณวณฺโณ อโหสิ ฯ",
            linkYoutube: [
                "https://youtu.be/JEVbneGdqQA?si=Qloo8zO_DmHPR6bY&t=784",
                "https://youtu.be/eHxUIL6Kei0?si=I2YApUFvHGiRw0Zf",
            ],
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf",
            fileNoteTranslate: "materials/translate-notes-301.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๑",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๒ น.๑๗-๒๐ พนฺธุโล เตนหิ อิมา - ลภติ รชฺชสุขํ นานุโภติ ฯ",
            linkYoutube: [
                "https://youtu.be/22hxOtjBmnI?si=QnR9JQkVj2xmNcUL&t=304",
                "https://youtu.be/R3YYWFUjUig?si=u9oe_N4X984fE8vw",
            ],
            fileNoteTranslate: "materials/translate-notes-302.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-54-55.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๑"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๓"
        }
    },

    {
        date: "2025-12-11", displayDate: "พฤ. ๑๑-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๒",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๓ (เก็งที่ ๓-๔)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๓ น.๒๑-๒๓ สมฺมาสมฺพุทฺธสฺส ปน - ตตฺถ มจฺฉกจฺฉปภกฺขา อเหสุํ",
            linkYoutube: [
                "https://youtu.be/R3YYWFUjUig?si=szxoV7JhplaIPaha&t=953",
                "https://youtu.be/NkFHoo6KWoo?si=8hJWaA2cBmyWdE5L",
            ],
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf",
            fileNoteTranslate: "materials/translate-notes-303.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๒",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๔ น.๓๐-๓๒ วตฺถุ ราชคเห สมุฏฺฐิตํ - ปูเว ปจิตุํ อารภิ ฯ",
            linkYoutube: [
                "https://youtu.be/UnecSVndhdE?si=vqSB7eBH_gxKNkxN&t=478",
                "https://youtu.be/C_Yj2nM7LYg?si=FV82-BS-Q3ULhvyU",
            ],
            slideId: "p3_geng4",
            fileNoteTranslate: "materials/translate-notes-304.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-56-57.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๒"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๓"
        }
    },

    {
        date: "2025-12-12", displayDate: "ศ. ๑๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๓",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๓ (เก็งที่ ๕-๖)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๕ น.๓๒-๓๔ อถ สตฺถา ปาโต ว - เชตวนทฺวารโกฏฺเฐ โหตูติ อธิฏฺฐาสิ ฯ",
            linkYoutube: [
                "https://youtu.be/C_Yj2nM7LYg?si=GbHPSmUWokr10Xrm&t=199",
                "https://youtu.be/t9OQZ7IiTMM?si=KwvDA16y1z7tfLLI",
            ],
            slideId: "p3_geng5",
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
            fileNoteTranslate: "materials/translate-notes-305.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๓",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๖ น.๓๘-๔๐ สาวตฺถิยํ กิร เอกา - วตฺวา อิมํ คาถมาห ฯ",
            linkYoutube: [
                "https://youtu.be/-lrYl1Ec9CM?si=KIjSWwLoyizHnRmo&t=44",
            ],
            slideId: "p3_geng6",
            fileNoteTranslate: "materials/translate-notes-306.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-58-59.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๓"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๓"
        }
    },

    {
        date: "2025-12-13", displayDate: "ส. ๑๓-ธ.ค.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๓ (เก็งที่ ๗-๘)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๗ น.๔๗-๔๙ เตน โข ปน สมเยน - อิทํ วยกลฺยาณํ นามาติ ฯ",
            linkYoutube: ["https://youtu.be/AySNS0QsciU?si=JORHnHbuKhoSF5J7"],
            slideId: "p3_geng7",
            fileNoteTranslate: "materials/translate-notes-307.pdf",
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๘ น.๔๙-๕๑ อถสฺส มาตาปิตโร - ตํ สุวณฺณมาลํ ปิลนฺธยึสุ ฯ",
            linkYoutube: [
                "https://youtu.be/AySNS0QsciU?si=kVeLpnbWQUE-Vvz3&t=836",
                "https://youtu.be/e6EfF6zWhPU?si=v7WdjwTdBCENvDhX",
            ],
            slideId: "p3_geng8",
            fileNoteTranslate: "materials/translate-notes-308.pdf",
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๓"
        }
    },

    {
        date: "2025-12-14", displayDate: "อา. ๑๔-ธ.ค.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๓ (เก็งที่ ๙-๑๐)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๙ น.๖๓-๖๕ อถ นํ กุฏุมฺพิกา - มิคาโรติสฺส นามํ อกาสิ ฯ",
            linkYoutube: [
                "https://youtu.be/8H79-Tg7LWI?si=5VJJGEvusdoUNudr&t=1020",
                "https://youtu.be/Zpe0NsZYGM8?si=yQkvr8aZJRw3XQ0z",
            ],
            slideId: "p3_geng9",
            fileNoteTranslate: "materials/translate-notes-309.pdf",
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๐ น.๘๐-๘๓ เอกสฺมึ หิ ทิวเส - มยฺหํ ภาโร ภนฺเตติ ฯ",
            linkYoutube: [
                "https://youtu.be/ERLSzPh_mSI?si=-0VQRipBX5dMjbre&t=759",
                "https://youtu.be/_Tf4EHA48r8?si=KQzZkdJlacb9i1fv",
            ],
            slideId: "p3_geng10",
            fileNoteTranslate: "materials/translate-notes-310.pdf",
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๓"
        }
    },

    {
        date: "2025-12-15", displayDate: "จ. ๑๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๔",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๓ (เก็งที่ ๑๑-๑๒)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๑ น.๑๐๐-๑๐๒ ราชา กิร ปเสนทิโกสโล - อรุณวตีมตฺติกํ อทาสิ ฯ",
            linkYoutube: [
                "https://youtu.be/g54DU2TcaoI?si=zTfpMQInXVzSO3WF&t=1175",
                "https://youtu.be/4l3lskFzGWg?si=1RjlujbWWTdDdBr8",
            ],
            slideId: "p3_geng11",
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf",
            fileNoteTranslate: "materials/translate-notes-311.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๔",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๒ น.๑๐๔-๑๐๖ โส อรุณุคฺคมนกาเลเยว - วตฺวา อตีตํ อาหริ",
            linkYoutube: [
                "https://youtu.be/aRW0uecyzw0?si=fSy_8ioXfS8Chxzo&t=246",
                "https://youtu.be/hwDAWWjY1qg?si=XhijKzrPEttwlTPt",
            ],
            slideId: "p3_geng12",
            fileNoteTranslate: "materials/translate-notes-312.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-60-61.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๔"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๓"
        }
    },

    {
        date: "2025-12-16", displayDate: "อ. ๑๖-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๕",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๓ (เก็งที่ ๑๓-๑๔)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๓ น.๑๑๑-๑๑๓ อตีเต พาราณสีรญฺโญ - วตฺวา อิมํ คาถมาห ฯ",
            linkYoutube: [
                "https://youtu.be/d2ogaiRZ_EE?si=0cXUpvIQsL7vWWxr&t=1209",
                "https://youtu.be/h7AvrT3jiII?si=F9dzgopcd7rc3x1q",
            ],
            slideId: "p3_geng13",
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf",
            fileNoteTranslate: "materials/translate-notes-313.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๕",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๔ น.๑๑๕-๑๑๗ เทสนา ราชคเห - วตฺวา อตีตํ อาหริ ฯ",
            linkYoutube: [
                "https://youtu.be/7i1YT0PugL0?si=I5UTWhn4BE0bryDR&t=57",
                "https://youtu.be/1cwK8Igu7RY?si=E3awDYO0fqNNeUyP",
            ],
            slideId: "p3_geng14",
            fileNoteTranslate: "materials/translate-notes-314.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-62-63.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-62-63.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๕"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๓"
        }
    },

    {
        date: "2025-12-17", displayDate: "พ. ๑๗-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๖",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๓ (เก็งที่ ๑๕-๑๖)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๕ น.๑๓๔-๑๓๖ โส กิร เทวสิกํ - คเหตฺวา เคหํ อคมาสิ ฯ",
            linkYoutube: [
                "https://youtu.be/aJ0fXUFJWqQ?si=CuszIleZ68HAqzL6",
            ],
            slideId: "p3_geng15",
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf",
            fileNoteTranslate: "materials/translate-notes-315.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๖",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๖ น.๑๔๖-๑๔๘ โส ปทสา คมนกาลโต - สยมาโน วีตินาเมสิ ฯ",
            linkYoutube: [
                "https://youtu.be/QZFe1-YeiTw?si=iN7ucUMm_txoYm_d&t=856",
                "https://youtu.be/pSK3XRVkmZU?si=4YAwThnZPIhUmmXL",
            ],
            slideId: "p3_geng16",
            fileNoteTranslate: "materials/translate-notes-316.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-64-65.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-64-65.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๖"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๓"
        }
    },

    {
        date: "2025-12-18", displayDate: "พฤ. ๑๘-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๗",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๓ (เก็งที่ ๑๗-๑๘) (สิ้นสุด)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๗ น.๑๕๐-๑๕๒ อถ ปฐมยาเม จตฺตาโร - สฏฺฐิวสฺสตเฺถโร วิย อเหสุํ ฯ",
            linkYoutube: [
                "https://youtu.be/fhD-FjmFMCk?si=uB0wLl0eLv2glrOz&t=183",
            ],
            slideId: "p3_geng17",
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf",
            fileNoteTranslate: "materials/translate-notes-317.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๗",
            activityTranslate: "(อ่าน) ภาคที่ ๓ เก็งที่ ๑๘ น.๑๖๓-๑๖๖ เทสนา ปน มจฺฉิกาสณฺเฑ - อิมา คาถา อกาสิ ฯ",
            linkYoutube: [
                "https://youtu.be/wNPnKydqlj8?si=ndkvTQShr1Q5KGt4&t=346",
                "https://youtu.be/ycJZW2gsiNM?si=x4nT0vh40YWiDz4b",
            ],
            slideId: "p3_geng18",
            fileNoteTranslate: "materials/translate-notes-318.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-66-67.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-66-67.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๗"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๓"
        }
    },

    {
        date: "2025-12-19", displayDate: "ศ. ๑๙-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๘",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๔ (เก็งที่ ๑-๒)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑ น.๑๓-๑๕ ราชา เต ปาโตว โภเชตฺวา - อคฺคา เนว เตมึสุ ฯ",
            linkYoutube: [
                "https://youtu.be/DKYg3F8REQQ?si=HsQQFZybytFaRLI-&t=647",
                "https://youtu.be/9d9U-Gg4L08?si=N4J4GJ969LydSn_D",
            ],
            slideId: "d04_v06_s04_mahakappina",
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf",
            fileNoteTranslate: "materials/translate-notes-401.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๘",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๒ น.๑๗-๑๙ เตปิ วาณิชกา ราชกุลํ - เทฺว นทิโย อุตฺตริ ฯ",
            linkYoutube: [
                "https://youtu.be/9d9U-Gg4L08?si=1oLa97YVYLo4i0D4&t=1132",
                "https://youtu.be/viw9y7kSpe0?si=XxVaLNDj57_Yhh3f"
            ],
            slideId: "d04_v06_s04_mahakappina",
            fileNoteTranslate: "materials/translate-notes-402.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-50-51.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๘"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๑ ภาค ๔"
        }
    },

    {
        date: "2025-12-20", displayDate: "ส. ๒๐-ธ.ค.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๔ (เก็งที่ ๓-๔)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๓ น.๒๑-๒๓ อตีเต กิร กสฺสปสมฺมาสมฺพุทฺโธ - ทาตุํ น วฏฺฏตีติ ฯ",
            slideId: "d04_v06_s04_mahakappina",
            fileNoteTranslate: "materials/translate-notes-403.pdf"
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๔ น.๒๓-๒๖ โส ตสฺมึ กเถนฺเต - เต ตสฺส อทาสิ ฯ",
            slideId: "d04_v06_s04_mahakappina",
            fileNoteTranslate: "materials/translate-notes-404.pdf"
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๒ ภาค ๔"
        }
    },

    {
        date: "2025-12-21", displayDate: "อา. ๒๑-ธ.ค.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๔ (เก็งที่ ๕-๖)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๕ น.๒๗-๒๙ ตํทิวสํ ปน สตฺถา - แาเทตฺวา อฏฺฐาสิ ฯ",
            slideId: "d04_v06_s05_pandita",
            fileNoteTranslate: "materials/translate-notes-405.pdf"
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๖ น.เถโร อฏฺฐเม ทิวเส - อตฺตภาวํ สมฺมสนฺโต นิสีทิ ฯ",
            slideId: "d04_v06_s06_lakuntaka",
            fileNoteTranslate: "materials/translate-notes-406.pdf"
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๓ ภาค ๔"
        }
    },

    {
        date: "2025-12-22", displayDate: "จ. ๒๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๙",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๔ (เก็งที่ ๗-๘)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๗ น.๕๕-๕๗ เอกสฺมึ หิ สมเย สตฺถา - เทเสนฺโต อิมํ คาถมาห ฯ",
            slideId: "d04_v06_s07_kana_mother",
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf",
            fileNoteTranslate: "materials/translate-notes-407.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๙",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๘ น.๖๕-๖๗ เอกสฺมึ หิ สมเย อายสฺมา - เทเสนฺโต อิมํ คาถมาห ฯ",
            slideId: "d04_v06_s08_500_monks",
            fileNoteTranslate: "materials/translate-notes-408.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-52-53.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๙"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๔ ภาค ๔"
        }
    },

    {
        date: "2025-12-23", displayDate: "อ. ๒๓-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๐",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๔ (เก็งที่ ๙-๑๐)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๙ น.๖๙-๗๑ เถโร ปน ปุถุชฺชโน - วตฺวา อิมํ คาถมาห ฯ",
            slideId: "d04_v06_s09_thera_dhamma",
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf",
            fileNoteTranslate: "materials/translate-notes-409.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๐",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๐ น.๗๔-๗๖ อายสฺมา หิ สารีปุตฺโต - คุมฺพาภิมุโข อโหสิ ฯ",
            slideId: "d04_v06_s10_listening_dhamma",
            fileNoteTranslate: "materials/translate-notes-410.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-54-55.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๐"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๕ ภาค ๔"
        }
    },

    {
        date: "2025-12-24", displayDate: "พ. ๒๔-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๑",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๔ (เก็งที่ ๑๑-๑๒)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๑ น.๗๗-๗๙ สามเณโรปิ สจาหํ อิธ - คนฺตฺวา ปญฺญตฺตาสเน นิสีทิ ฯ",
            slideId: "d04_v06_s11_visiting_monk",
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf",
            fileNoteTranslate: "materials/translate-notes-411.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๑",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๒ น.๙๔-๙๗ ตสฺส พฺรหฺมุโน เอตทโหสิ - ตสฺส อภิสมฺปรายํ ปุจฺฉึสุ ฯ",
            slideId: "d04_v07_s01_jivaka",
            fileNoteTranslate: "materials/translate-notes-412.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-56-57.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๑"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๖ ภาค ๔"
        }
    },

    {
        date: "2025-12-25", displayDate: "พฤ. ๒๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๒",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๔ (เก็งที่ ๑๓-๑๔)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๓ น.๙๘-๑๐๐ ราชคเห กิร เอกา - อหํ ปฏิยาเทสฺสามีติ ฯ",
            slideId: "d04_v07_s02_mahakassapa",
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
            fileNoteTranslate: "materials/translate-notes-413.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๒",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๔ น.๑๐๒-๑๐๔ สาปิ โจรํ ปปาเต - เอกมนฺตํ นิสีทึสุ ฯ",
            slideId: "d04_v07_s03_belatthasisa",
            fileNoteTranslate: "materials/translate-notes-414.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-58-59.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๒"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๗ ภาค ๔"
        }
    },

    {
        date: "2025-12-26", displayDate: "ศ. ๒๖-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๓",
            translate: "แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๔ (เก็งที่ ๑๕-๑๖)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๕ น.๑๑๓-๑๑๕ ฑีฆลมฺพวาสิโน กิร - อุปาสกสเตหิ ปริวุโต วิจริ ฯ",
            slideId: "d04_v07_s05_mahakaccayana",
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf",
            fileNoteTranslate: "materials/translate-notes-415.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๓",
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๖ น.๑๑๙-๑๒๑ สตฺถา เอตสฺมึ คเต ตํ - ตสฺมา เตปิ ตถา อทํสุ ฯ",
            slideId: "d04_v07_s06_sariputta",
            fileNoteTranslate: "materials/translate-notes-416.pdf",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-60-61.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๓"],
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๘ ภาค ๔"
        }
    },

    {
        date: "2025-12-27", displayDate: "ส. ๒๗-ธ.ค.-๖๘",
        remarks: {
            translate: "แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๔ (เก็งที่ ๑๗-๑๘) (สิ้นสุด)"
        },
        morning: {
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๗ น.๑๒๓-๑๒๕ ภิกฺขู คณฺฑิสทฺทํ - อิมํ คาถมาห ฯ",
            slideId: "d04_v07_s06_sariputta",
            fileNoteTranslate: "materials/translate-notes-417.pdf"
        },
        afternoon: {
            activityTranslate: "(อ่าน) ภาคที่ ๔ เก็งที่ ๑๘ น.๑๓๖-๑๓๙ สา ปริปุณฺคพฺภา หุตฺวา - ปูริตปารมี อภินีหารสมฺปนฺนํ ฯ",
            slideId: "d04_v07_s07_tissa_kosambi",
            fileNoteTranslate: "materials/translate-notes-418.pdf"
        },
        evening: {
            activityTranslate: "(เรียน) แปลมคธเป็นไทย ครั้งที่ ๙ ภาค ๔"
        }
    },

    {
        date: "2025-12-28", displayDate: "อา. ๒๘-ธ.ค.-๖๘",
        isWeekend: true
    },

    {
        date: "2025-12-29", displayDate: "จ. ๒๙-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๔"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๒-๖๓",
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๔",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-62-63.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-62-63.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๔"]
        }
    },

    {
        date: "2025-12-30", displayDate: "อ. ๓๐-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๕"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๔-๖๕",
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๕",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-64-65.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-64-65.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๕"]
        }
    },

    {
        date: "2025-12-31", displayDate: "พ. ๓๑-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๖ (จบ)"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๖-๖๗",
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๖",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-66-67.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-66-67.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๖"]
        }
    }
];