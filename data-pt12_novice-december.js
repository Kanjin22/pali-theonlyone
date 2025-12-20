// ===================================================================
// == ไฟล์ข้อมูลตาราง(เรียน) -(สอบ) (เวอร์ชัน 3.0 - Modal) ==
// == (สำหรับสามเณรนวกะ - เฉพาะวิชาไวยากรณ์) ==
// ===================================================================

const dataDecember = [
    {
        date: "2025-12-01",
        displayDate: "จ. ๑-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๔"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙",
            linkYoutube: [
                "https://youtu.be/Fxi6Fzm2lGA?si=pgtiXdt3Z6VIVpXY&t=2940"
            ],
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๔",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-58-59.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๔"
            ]
        }
    },
    {
        date: "2025-12-02",
        displayDate: "อ. ๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๕"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑",
            linkYoutube: [
                "https://youtu.be/1UUn6E6TdGY?si=lWewLM7WqyGIc_7p&t=479"
            ],
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๕",
            linkYoutube: [
                "https://youtu.be/iniianWQ0Zw?si=4WzsTv0VpPJkvz8q&t=421"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-60-61.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๕"
            ]
        }
    },
    {
        date: "2025-12-03",
        displayDate: "พ. ๓-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๖"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓",
            linkYoutube: [
                "https://youtu.be/DIoXAa37r6A?si=WUF9b2rMjTCDmr8F&t=1122"
            ],
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๖",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-62-63.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-62-63.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๖"
            ]
        }
    },
    {
        date: "2025-12-04",
        displayDate: "พฤ. ๔-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๗"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕",
            linkYoutube: [
                "https://youtu.be/co8ARPoXiBs?si=dZCgB7uOFbzHAbgB&t=184"
            ],
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๗",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-64-65.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-64-65.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๗"
            ]
        }
    },
    {
        date: "2025-12-05",
        displayDate: "ศ. ๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๘"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗",
            linkYoutube: [
                "https://youtu.be/ISq7VTxJdIY?si=gjfm1yRZdQ9fvi2_"
            ],
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๘",
            linkYoutube: [
                "https://youtu.be/BR_aEZQy8es?si=JK4oCfVfzCyBOkGP&t=483"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam3-66-67.pdf",
            fileAnswerGrammar: "answers/grammar-answer3-66-67.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๘"
            ]
        }
    },
    {
        date: "2025-12-06",
        displayDate: "ส. ๖-ธ.ค.-๖๘",
        remarks: {},
        morning: {},
        afternoon: {},
        evening: {}
    },
    {
        date: "2025-12-07",
        displayDate: "อา. ๗-ธ.ค.-๖๘",
        remarks: {},
        morning: {},
        afternoon: {},
        evening: {}
    },
    {
        date: "2025-12-08",
        displayDate: "จ. ๘-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๙"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑",
            linkYoutube: [
                "https://youtu.be/SKUDuGGyl1Q?si=3IN16juV8VTCP7Ts&t=261"
            ],
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๙",
            linkYoutube: [
                "https://youtu.be/qKiQPCLPo2A?si=junc2Fa0jH8tTNW1&t=676"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-50-51.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๙"
            ]
        }
    },
    {
        date: "2025-12-09",
        displayDate: "อ. ๙-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๐"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓",
            linkYoutube: [
                "https://youtu.be/I9jYkFWC1a8?si=3-u8eVsJagBK6gBf&t=44"
            ],
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๐",
            linkYoutube: [
                "https://youtu.be/o4x0BtfXuYE?si=kCbeQt1et347FX9g&t=936"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-52-53.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๐"
            ]
        }
    },
    {
        date: "2025-12-10",
        displayDate: "พ. ๑๐-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๑"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕",
            linkYoutube: [
                "https://youtu.be/JEVbneGdqQA?si=Qloo8zO_DmHPR6bY&t=784"
            ],
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๑",
            linkYoutube: [
                "https://youtu.be/22hxOtjBmnI?si=QnR9JQkVj2xmNcUL&t=304"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-54-55.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๑"
            ]
        }
    },
    {
        date: "2025-12-11",
        displayDate: "พฤ. ๑๑-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๒"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗",
            linkYoutube: [
                "https://youtu.be/R3YYWFUjUig?si=szxoV7JhplaIPaha&t=953"
            ],
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๒",
            linkYoutube: [
                "https://youtu.be/UnecSVndhdE?si=vqSB7eBH_gxKNkxN&t=478"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-56-57.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๒"
            ]
        }
    },
    {
        date: "2025-12-12",
        displayDate: "ศ. ๑๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๓"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙",
            linkYoutube: [
                "https://youtu.be/C_Yj2nM7LYg?si=GbHPSmUWokr10Xrm&t=199"
            ],
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๓",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-58-59.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๓"
            ]
        }
    },
    {
        date: "2025-12-13",
        displayDate: "ส. ๑๓-ธ.ค.-๖๘",
        remarks: {},
        morning: {
        },
        afternoon: {
        },
        evening: {}
    },
    {
        date: "2025-12-14",
        displayDate: "อา. ๑๔-ธ.ค.-๖๘",
        remarks: {},
        morning: {
        },
        afternoon: {
        },
        evening: {}
    },
    {
        date: "2025-12-15",
        displayDate: "จ. ๑๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๔"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑",
            linkYoutube: [
                "https://youtu.be/g54DU2TcaoI?si=zTfpMQInXVzSO3WF&t=1175"
            ],
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๔",
            linkYoutube: [
                "https://youtu.be/aRW0uecyzw0?si=fSy_8ioXfS8Chxzo&t=246"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-60-61.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๔"
            ]
        }
    },
    {
        date: "2025-12-16",
        displayDate: "อ. ๑๖-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๕"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓",
            linkYoutube: [
                "https://youtu.be/d2ogaiRZ_EE?si=0cXUpvIQsL7vWWxr&t=1209"
            ],
            fileNoteGrammar: "materials/grammar-notes-62-63.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๕",
            linkYoutube: [
                "https://youtu.be/7i1YT0PugL0?si=I5UTWhn4BE0bryDR&t=57"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-62-63.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-62-63.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๕"
            ]
        }
    },
    {
        date: "2025-12-17",
        displayDate: "พ. ๑๗-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๖"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕",
            linkYoutube: [
                "https://youtu.be/aJ0fXUFJWqQ?si=CuszIleZ68HAqzL6"
            ],
            fileNoteGrammar: "materials/grammar-notes-64-65.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๖",
            linkYoutube: [
                "https://youtu.be/QZFe1-YeiTw?si=iN7ucUMm_txoYm_d&t=856"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-64-65.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-64-65.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๖"
            ]
        }
    },
    {
        date: "2025-12-18",
        displayDate: "พฤ. ๑๘-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๗"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗",
            linkYoutube: [
                "https://youtu.be/fhD-FjmFMCk?si=uB0wLl0eLv2glrOz&t=183"
            ],
            fileNoteGrammar: "materials/grammar-notes-66-67.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๗",
            linkYoutube: [
                "https://youtu.be/wNPnKydqlj8?si=ndkvTQShr1Q5KGt4&t=346"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam45-66-67.pdf",
            fileAnswerGrammar: "answers/grammar-answer45-66-67.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๗"
            ]
        }
    },
    {
        date: "2025-12-19",
        displayDate: "ศ. ๑๙-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๘"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑",
            linkYoutube: [
                "https://youtu.be/DKYg3F8REQQ?si=HsQQFZybytFaRLI-&t=647"
            ],
            fileNoteGrammar: "materials/grammar-notes-50-51.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๘",
            linkYoutube: [
                "https://youtu.be/9d9U-Gg4L08?si=1oLa97YVYLo4i0D4&t=1132"
            ],
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-50-51.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-50-51.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๘"
            ]
        }
    },
    {
        date: "2025-12-20",
        displayDate: "ส. ๒๐-ธ.ค.-๖๘",
        remarks: {},
        morning: {
        },
        afternoon: {
        },
        evening: {}
    },
    {
        date: "2025-12-21",
        displayDate: "อา. ๒๑-ธ.ค.-๖๘",
        remarks: {},
        morning: {
        },
        afternoon: {
        },
        evening: {}
    },
    {
        date: "2025-12-22",
        displayDate: "จ. ๒๒-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๙"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓",
            fileNoteGrammar: "materials/grammar-notes-52-53.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๒๙",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-52-53.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-52-53.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒๙"
            ]
        }
    },
    {
        date: "2025-12-23",
        displayDate: "อ. ๒๓-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๐"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕",
            fileNoteGrammar: "materials/grammar-notes-54-55.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๐",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-54-55.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-54-55.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๐"
            ]
        }
    },
    {
        date: "2025-12-24",
        displayDate: "พ. ๒๔-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๑"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗",
            fileNoteGrammar: "materials/grammar-notes-56-57.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๑",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-56-57.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-56-57.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๑"
            ]
        }
    },
    {
        date: "2025-12-25",
        displayDate: "พฤ. ๒๕-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๒"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙",
            fileNoteGrammar: "materials/grammar-notes-58-59.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๒",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-58-59.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-58-59.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๒"
            ]
        }
    },
    {
        date: "2025-12-26",
        displayDate: "ศ. ๒๖-ธ.ค.-๖๘",
        remarks: {
            grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๓"
        },
        morning: {
            activityGrammar: "(อ่าน) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑",
            fileNoteGrammar: "materials/grammar-notes-60-61.pdf"
        },
        afternoon: {
            activityGrammar: "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๓๓",
            isExam: true,
            examStartTime: "14:00:00",
            examEndTime: "15:00:00",
            fileExamGrammar: "exams/grammar-exam67-60-61.pdf",
            fileAnswerGrammar: "answers/grammar-answer67-60-61.pdf"
        },
        evening: {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๓"
            ]
        }
    },
    {
        date: "2025-12-27",
        displayDate: "ส. ๒๗-ธ.ค.-๖๘",
        remarks: {},
        morning: {
        },
        afternoon: {
        },
        evening: {}
    },
    {
        date: "2025-12-28",
        displayDate: "อา. ๒๘-ธ.ค.-๖๘",
        isWeekend: true
    },
    {
        date: "2025-12-29",
        displayDate: "จ. ๒๙-ธ.ค.-๖๘",
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
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๔"
            ]
        }
    },
    {
        date: "2025-12-30",
        displayDate: "อ. ๓๐-ธ.ค.-๖๘",
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
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๕"
            ]
        }
    },
    {
        date: "2025-12-31",
        displayDate: "พ. ๓๑-ธ.ค.-๖๘",
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
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓๖"
            ]
        }
    }
];
