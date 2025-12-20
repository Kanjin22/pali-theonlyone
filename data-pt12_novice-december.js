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
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙",
            linkYoutube: [
                "https://youtu.be/Fxi6Fzm2lGA?si=pgtiXdt3Z6VIVpXY&t=2940",
                "https://youtu.be/tcbWtQK70X4?si=EYY2dc0JYFTB5Gse",
            ],
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๔",
            linkYoutube: [
                "https://youtu.be/FdhxWVZTC00?si=TSX7tmticVRhHHe4&t=86",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-58-59.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๔"],
        }
    },

    {
        date: "2025-12-02", displayDate: "อ. ๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๕",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑",
            linkYoutube: [
                "https://youtu.be/1UUn6E6TdGY?si=lWewLM7WqyGIc_7p&t=479",
                "https://youtu.be/brBfFITuq5E?si=uOnAQGX2O5gCcECb",
            ],
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๕",
            linkYoutube: [
                "https://youtu.be/iniianWQ0Zw?si=4WzsTv0VpPJkvz8q&t=421",
                "https://youtu.be/DIoXAa37r6A?si=kxSJtqwObPDQv5lj",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-60-61.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๕"],
        }
    },

    {
        date: "2025-12-03", displayDate: "พ. ๓-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๖",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓",
            linkYoutube: [
                "https://youtu.be/DIoXAa37r6A?si=WUF9b2rMjTCDmr8F&t=1122",
                "https://youtu.be/VaB0JZhQF-c?si=aB7OSCs4nUeHXNMa",
            ],
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๖",
            linkYoutube: [
                "https://youtu.be/AuqvGqy6q4E?si=y3bVGODAUCxP2qMc&t=63",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-62-63.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-62-63.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๖"],
        }
    },

    {
        date: "2025-12-04", displayDate: "พฤ. ๔-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๗",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕",
            linkYoutube: [
                "https://youtu.be/co8ARPoXiBs?si=dZCgB7uOFbzHAbgB&t=184",
            ],
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๗",
            linkYoutube: [
                "https://youtu.be/BL1qQqmfGJg?si=FKJ3TP3H2xDCR81y&t=222",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-64-65.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-64-65.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๗"],
        }
    },

    {
        date: "2025-12-05", displayDate: "ศ. ๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๘",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗",
            linkYoutube: [
                "https://youtu.be/ISq7VTxJdIY?si=gjfm1yRZdQ9fvi2_",
            ],
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๘",
            linkYoutube: [
                "https://youtu.be/BR_aEZQy8es?si=JK4oCfVfzCyBOkGP&t=483",
                "https://youtu.be/QxjOjO-14QM?si=WL7lz85Cbi41pLch",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-66-67.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-66-67.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๘"],
        }
    },

    {
        date: "2025-12-06", displayDate: "ส. ๖-ธ.ค.-๖๘",
        remarks: {
        },
        morning: {
            linkYoutube: [
                "https://youtu.be/CFIfKWK-hL8?si=CaXCgAIp6axmGucV",
            ],
        },
        afternoon: {
            linkYoutube: [
                "https://youtu.be/EzE3vYLukbY?si=wiF8CEaSsiDigRnr&t=995",
                "https://youtu.be/xp-n1g51qm0?si=AD8DxD7YhcyTfto1",
            ],
        },
        evening: {
        }
    },

    {
        date: "2025-12-07", displayDate: "อา. ๗-ธ.ค.-๖๘",
        remarks: {
        },
        morning: {
            linkYoutube: [
                "https://youtu.be/xp-n1g51qm0?si=ihUniziGjaLa47Eq&t=937",
                "https://youtu.be/kU-Wx3poJM0?si=QXlPeMuvEKYV-p8_",
            ],
        },
        afternoon: {
            linkYoutube: [
                "https://youtu.be/ki46xNs2Qsw?si=iqu4LGoYGuZ1vuoG&t=431",
            ],
        },
        evening: {
        }
    },

    {
        date: "2025-12-08", displayDate: "จ. ๘-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๙",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑",
            linkYoutube: [
                "https://youtu.be/SKUDuGGyl1Q?si=3IN16juV8VTCP7Ts&t=261",
                "https://youtu.be/qKiQPCLPo2A?si=WbpdzuVSDjRYcJO-",
            ],
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๙",
            linkYoutube: [
                "https://youtu.be/qKiQPCLPo2A?si=junc2Fa0jH8tTNW1&t=676",
                "https://youtu.be/hx4zxu90xuA?si=Z1zTgjL0mBi1nuLO",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-50-51.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๙"],
        }
    },

    {
        date: "2025-12-09", displayDate: "อ. ๙-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๐",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓",
            linkYoutube: [
                "https://youtu.be/I9jYkFWC1a8?si=3-u8eVsJagBK6gBf&t=44",
            ],
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๐",
            linkYoutube: [
                "https://youtu.be/o4x0BtfXuYE?si=kCbeQt1et347FX9g&t=936",
                "https://youtu.be/n1Sk7r06nRQ?si=iogtpZ-xByZMWZS3",
                "https://youtu.be/A0lknpBv538?si=zfruQJIns-kLQu1b",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-52-53.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๐"],
        }
    },

    {
        date: "2025-12-10", displayDate: "พ. ๑๐-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๑",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕",
            linkYoutube: [
                "https://youtu.be/JEVbneGdqQA?si=Qloo8zO_DmHPR6bY&t=784",
                "https://youtu.be/eHxUIL6Kei0?si=I2YApUFvHGiRw0Zf",
            ],
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๑",
            linkYoutube: [
                "https://youtu.be/22hxOtjBmnI?si=QnR9JQkVj2xmNcUL&t=304",
                "https://youtu.be/R3YYWFUjUig?si=u9oe_N4X984fE8vw",
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-54-55.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๑"],
        }
    },

    {
        date: "2025-12-11", displayDate: "พฤ. ๑๑-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๒",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗",
            linkYoutube: [
                "https://youtu.be/R3YYWFUjUig?si=szxoV7JhplaIPaha&t=953",
                "https://youtu.be/NkFHoo6KWoo?si=8hJWaA2cBmyWdE5L",
            ],
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๒",
            linkYoutube: [
                "https://youtu.be/UnecSVndhdE?si=vqSB7eBH_gxKNkxN&t=478",
                "https://youtu.be/C_Yj2nM7LYg?si=FV82-BS-Q3ULhvyU",
            ],
            slideId: "d03_v04_s05_kosiya",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-56-57.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๒"],
        }
    },

    {
        date: "2025-12-12", displayDate: "ศ. ๑๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๓",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙",
            linkYoutube: [
                "https://youtu.be/C_Yj2nM7LYg?si=GbHPSmUWokr10Xrm&t=199",
                "https://youtu.be/t9OQZ7IiTMM?si=KwvDA16y1z7tfLLI",
            ],
            slideId: "d03_v04_s05_kosiya",
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๓",
            linkYoutube: [
                "https://youtu.be/-lrYl1Ec9CM?si=KIjSWwLoyizHnRmo&t=44",
            ],
            slideId: "d03_v04_s06_patika",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-58-59.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๓"],
        }
    },

    {
        date: "2025-12-13", displayDate: "ส. ๑๓-ธ.ค.-๖๘",
        remarks: {
        },
        morning: {
            linkYoutube: ["https://youtu.be/AySNS0QsciU?si=JORHnHbuKhoSF5J7"],
            slideId: "d03_v04_s08_visakha",
        },
        afternoon: {
            linkYoutube: [
                "https://youtu.be/AySNS0QsciU?si=kVeLpnbWQUE-Vvz3&t=836",
                "https://youtu.be/e6EfF6zWhPU?si=v7WdjwTdBCENvDhX",
            ],
            slideId: "d03_v04_s08_visakha",
        },
        evening: {
        }
    },

    {
        date: "2025-12-14", displayDate: "อา. ๑๔-ธ.ค.-๖๘",
        remarks: {
        },
        morning: {
            linkYoutube: [
                "https://youtu.be/8H79-Tg7LWI?si=5VJJGEvusdoUNudr&t=1020",
                "https://youtu.be/Zpe0NsZYGM8?si=yQkvr8aZJRw3XQ0z",
            ],
            slideId: "d03_v04_s08_visakha",
        },
        afternoon: {
            linkYoutube: [
                "https://youtu.be/ERLSzPh_mSI?si=-0VQRipBX5dMjbre&t=759",
                "https://youtu.be/_Tf4EHA48r8?si=KQzZkdJlacb9i1fv",
            ],
            slideId: "d03_v04_s08_visakha",
        },
        evening: {
        }
    },

    {
        date: "2025-12-15", displayDate: "จ. ๑๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๔",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑",
            linkYoutube: [
                "https://youtu.be/g54DU2TcaoI?si=zTfpMQInXVzSO3WF&t=1175",
                "https://youtu.be/4l3lskFzGWg?si=1RjlujbWWTdDdBr8",
            ],
            slideId: "d03_v04_s10_mahakassapa",
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๔",
            linkYoutube: [
                "https://youtu.be/aRW0uecyzw0?si=fSy_8ioXfS8Chxzo&t=246",
                "https://youtu.be/hwDAWWjY1qg?si=XhijKzrPEttwlTPt",
            ],
            slideId: "d03_v04_s10_mahakassapa",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-60-61.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๔"],
        }
    },

    {
        date: "2025-12-16", displayDate: "อ. ๑๖-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๕",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓",
            linkYoutube: [
                "https://youtu.be/d2ogaiRZ_EE?si=0cXUpvIQsL7vWWxr&t=1209",
                "https://youtu.be/h7AvrT3jiII?si=F9dzgopcd7rc3x1q",
            ],
            slideId: "d03_v04_s12_garahadinna",
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๕",
            linkYoutube: [
                "https://youtu.be/7i1YT0PugL0?si=I5UTWhn4BE0bryDR&t=57",
                "https://youtu.be/1cwK8Igu7RY?si=E3awDYO0fqNNeUyP",
            ],
            slideId: "d03_v05_s01_anyaman",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-62-63.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-62-63.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๕"],
        }
    },

    {
        date: "2025-12-17", displayDate: "พ. ๑๗-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๖",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕",
            linkYoutube: [
                "https://youtu.be/aJ0fXUFJWqQ?si=CuszIleZ68HAqzL6",
            ],
            slideId: "d03_v05_s09_sumana",
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๖",
            linkYoutube: [
                "https://youtu.be/QZFe1-YeiTw?si=iN7ucUMm_txoYm_d&t=856",
                "https://youtu.be/pSK3XRVkmZU?si=4YAwThnZPIhUmmXL",
            ],
            slideId: "d03_v05_s10_uppalavanna",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-64-65.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-64-65.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๖"],
        }
    },

    {
        date: "2025-12-18", displayDate: "พฤ. ๑๘-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๗",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗",
            linkYoutube: [
                "https://youtu.be/fhD-FjmFMCk?si=uB0wLl0eLv2glrOz&t=183",
            ],
            slideId: "d03_v05_s14_sudhamma",
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๗",
            linkYoutube: [
                "https://youtu.be/wNPnKydqlj8?si=ndkvTQShr1Q5KGt4&t=346",
                "https://youtu.be/ycJZW2gsiNM?si=x4nT0vh40YWiDz4b",
            ],
            slideId: "d03_v05_s14_sudhamma",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-66-67.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-66-67.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๗"],
        }
    },

    {
        date: "2025-12-19", displayDate: "ศ. ๑๙-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๘",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑",
            linkYoutube: [
                "https://youtu.be/DKYg3F8REQQ?si=HsQQFZybytFaRLI-&t=647",
                "https://youtu.be/9d9U-Gg4L08?si=N4J4GJ969LydSn_D",
            ],
            slideId: "d04_v06_s04_mahakappina",
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๘",
            linkYoutube: [
                "https://youtu.be/9d9U-Gg4L08?si=1oLa97YVYLo4i0D4&t=1132",
                "https://youtu.be/viw9y7kSpe0?si=XxVaLNDj57_Yhh3f"
            ],
            slideId: "d04_v06_s04_mahakappina",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-50-51.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๘"],
        }
    },

    {
        date: "2025-12-20", displayDate: "ส. ๒๐-ธ.ค.-๖๘",
        remarks: {
        },
        morning: {
            linkYoutube: [
                "https://youtu.be/dwg8rUyEkeE?si=IwSd7drH2o8xfT7Q&t=555",
                "https://youtu.be/qDeXFZJvdfc?si=VcJK90jMDtDWmBuF",
            ],
            slideId: "d04_v06_s05_pandita",
        },
        afternoon: {
            linkYoutube: [
                "https://youtu.be/qDeXFZJvdfc?si=g9ILzXFMnpQF0hJH&t=199",
                "https://youtu.be/ViGwTiLsQSU?si=UqIwiT0mPF5iNwRI",
            ],
            slideId: "d04_v06_s05_pandita",
        },
        evening: {
        }
    },

    {
        date: "2025-12-21", displayDate: "อา. ๒๑-ธ.ค.-๖๘",
        remarks: {
        },
        morning: {
            slideId: "d04_v06_s05_pandita",
        },
        afternoon: {
            slideId: "d04_v06_s06_lakuntaka",
        },
        evening: {
        }
    },

    {
        date: "2025-12-22", displayDate: "จ. ๒๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๙",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓",
            slideId: "d04_v06_s07_kana_mother",
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๙",
            slideId: "d04_v06_s08_500_monks",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-52-53.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๙"],
        }
    },

    {
        date: "2025-12-23", displayDate: "อ. ๒๓-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๐",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕",
            slideId: "d04_v06_s09_thera_dhamma",
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๐",
            slideId: "d04_v06_s10_listening_dhamma",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-54-55.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๐"],
        }
    },

    {
        date: "2025-12-24", displayDate: "พ. ๒๔-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๑",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗",
            slideId: "d04_v06_s11_visiting_monk",
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๑",
            slideId: "d04_v07_s01_jivaka",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-56-57.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๑"],
        }
    },

    {
        date: "2025-12-25", displayDate: "พฤ. ๒๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๒",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙",
            slideId: "d04_v07_s02_mahakassapa",
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๒",
            slideId: "d04_v07_s03_belatthasisa",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-58-59.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๒"],
        }
    },

    {
        date: "2025-12-26", displayDate: "ศ. ๒๖-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๓",
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑",
            slideId: "d04_v07_s05_mahakaccayana",
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf",
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๓",
            slideId: "d04_v07_s06_sariputta",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-60-61.pdf"
        },
        evening: {
            activityGrammar: ["(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๓"],
        }
    },

    {
        date: "2025-12-27", displayDate: "ส. ๒๗-ธ.ค.-๖๘",
        remarks: {
        },
        morning: {
            slideId: "d04_v07_s06_sariputta",
        },
        afternoon: {
            slideId: "d04_v07_s07_tissa_kosambi",
        },
        evening: {
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