// ===================================================================
// == ไฟล์ข้อมูลตาราง(เรียน) -(สอบ) (เวอร์ชัน 3.0 - Modal) ==
// == (สำหรับสามเณรนวกะ - เฉพาะวิชาไวยากรณ์) ==
// ===================================================================

const dataNovember = [
    {
        "date": "2025-11-12",
        "displayDate": "พ. ๑๒-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๑"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๐-๕๑",
            "fileNoteGrammar": "materials/grammar-notes-50-51.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑",
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-50-51.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-50-51.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑"
            ]
        }
    },
    {
        "date": "2025-11-13",
        "displayDate": "พฤ. ๑๓-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๒"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓",
            "fileNoteGrammar": "materials/grammar-notes-52-53.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓",
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-52-53.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-52-53.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๒"
            ]
        }
    },
    {
        "date": "2025-11-14",
        "displayDate": "ศ. ๑๔-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๓"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕",
            "fileNoteGrammar": "materials/grammar-notes-54-55.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕",
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-54-55.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-54-55.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๓"
            ]
        }
    },
    {
        "date": "2025-11-15",
        "displayDate": "ส. ๑๕-พ.ย.-๖๘",
        "remarks": {},
        "morning": {},
        "afternoon": {
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00"
        },
        "evening": {}
    },
    {
        "date": "2025-11-16",
        "displayDate": "อา. ๑๖-พ.ย.-๖๘",
        "remarks": {},
        "afternoon": {
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00"
        },
        "evening": {}
    },
    {
        "date": "2025-11-17",
        "displayDate": "จ. ๑๗-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๔"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๖-๕๗",
            "fileNoteGrammar": "materials/grammar-notes-56-57.pdf",
            "isExam": true,
            "examStartTime": "09:00:00",
            "examEndTime": "10:00:00"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๔",
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-56-57.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-56-57.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๔"
            ],
            "isExam": true,
            "examStartTime": "18:30:00",
            "examEndTime": "19:30:00"
        }
    },
    {
        "date": "2025-11-18",
        "displayDate": "อ. ๑๘-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๕"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๘-๕๙",
            "fileNoteGrammar": "materials/grammar-notes-58-59.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๕",
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-58-59.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-58-59.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๕"
            ]
        }
    },
    {
        "date": "2025-11-19",
        "displayDate": "พ. ๑๙-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๖"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๐-๖๑",
            "fileNoteGrammar": "materials/grammar-notes-60-61.pdf",
            "linkYoutube": [
                "https://youtu.be/R8QsLUmUs90?si=zGUWc2AKWzNk0sbV&t=565"
            ]
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๖",
            "linkYoutube": [
                "https://youtu.be/3gujLYnrg0s?si=IQttvTA5zSqHWRiK&t=706"
            ],
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-60-61.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-60-61.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๖"
            ]
        }
    },
    {
        "date": "2025-11-20",
        "displayDate": "พฤ. ๒๐-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๗"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๒-๖๓",
            "fileNoteGrammar": "materials/grammar-notes-62-63.pdf",
            "linkYoutube": [
                "https://youtu.be/6ZaIEQcfITs?si=5Q_tn1_WJsPTIaRf&t=1200"
            ]
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๗",
            "linkYoutube": [
                "https://youtu.be/wYO0QtGbqH4?si=4uyDcW-Rx2i5oj8t&t=72"
            ],
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-62-63.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-62-63.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๗"
            ]
        }
    },
    {
        "date": "2025-11-21",
        "displayDate": "ศ. ๒๑-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๘"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๔-๖๕",
            "fileNoteGrammar": "materials/grammar-notes-64-65.pdf",
            "linkYoutube": [
                "https://youtu.be/PXF3hbtgmpE?si=QQ4EDIuc_uDtkB63&t=128"
            ]
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๘",
            "linkYoutube": [
                "https://youtu.be/OcEaVlcvVuY?si=2sUyAX1Adyk4leXb&t=797"
            ],
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-64-65.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-64-65.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๘"
            ]
        }
    },
    {
        "date": "2025-11-22",
        "displayDate": "ส. ๒๒-พ.ย.-๖๘",
        "remarks": {},
        "morning": {},
        "afternoon": {},
        "evening": {}
    },
    {
        "date": "2025-11-23",
        "displayDate": "อา. ๒๓-พ.ย.-๖๘",
        "remarks": {},
        "morning": {},
        "afternoon": {},
        "evening": {}
    },
    {
        "date": "2025-11-24",
        "displayDate": "จ. ๒๔-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๙"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๖-๖๗",
            "linkYoutube": [
                "https://youtu.be/-PGkPIpdq9A?si=3poa-rDYgYPrQVfS&t=1292"
            ],
            "fileNoteGrammar": "materials/grammar-notes-66-67.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๙",
            "linkYoutube": [
                "https://youtu.be/gAiC-673Gek?si=5Vc5LM375MqIIqZ-"
            ],
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam12-66-67.pdf",
            "fileAnswerGrammar": "answers/grammar-answer12-66-67.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๙"
            ]
        }
    },
    {
        "date": "2025-11-25",
        "displayDate": "อ. ๒๕-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๑๐"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๐-๕๑",
            "linkYoutube": [
                "https://youtu.be/wKjwJesIDKM?si=UtsnkL2xot8yBs8u&t=920"
            ],
            "fileNoteGrammar": "materials/grammar-notes-50-51.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๐",
            "linkYoutube": [
                "https://youtu.be/LfaaIifBfbI?si=WlCBPQYYf-vqtRXa&t=395"
            ],
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam3-50-51.pdf",
            "fileAnswerGrammar": "answers/grammar-answer3-50-51.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๐"
            ]
        }
    },
    {
        "date": "2025-11-26",
        "displayDate": "พ. ๒๖-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๑๑"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๒-๕๓",
            "linkYoutube": [
                "https://youtu.be/pG2QSG6Mvq0?si=0S6CPMBr6iRL-e3G&t=850"
            ],
            "fileNoteGrammar": "materials/grammar-notes-52-53.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๑",
            "linkYoutube": [
                "https://youtu.be/mGL7wVrmP9k?si=KjEdUj3z9eKSOTy2&t=495"
            ],
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam3-52-53.pdf",
            "fileAnswerGrammar": "answers/grammar-answer3-52-53.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๑"
            ]
        }
    },
    {
        "date": "2025-11-27",
        "displayDate": "พฤ. ๒๗-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๑๒"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๔-๕๕",
            "linkYoutube": [
                "https://youtu.be/mQJ4bkWQMtQ?si=5kkad5aaY0d8p5bE"
            ],
            "fileNoteGrammar": "materials/grammar-notes-54-55.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๒",
            "linkYoutube": [
                "https://youtu.be/yXl8QHKmdgQ?si=Cp_LdpVAWNH5w_GF"
            ],
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam3-54-55.pdf",
            "fileAnswerGrammar": "answers/grammar-answer3-54-55.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๒"
            ]
        }
    },
    {
        "date": "2025-11-28",
        "displayDate": "ศ. ๒๘-พ.ย.-๖๘",
        "remarks": {
            "grammar": "บาลีไวยากรณ์ ครั้งที่ ๑๓"
        },
        "morning": {
            "activityGrammar": "(อ่าน) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๖-๕๗",
            "linkYoutube": [
                "https://youtu.be/sb34IpqIEjw?si=jEaJQgtBzjTCxNf2&t=742"
            ],
            "fileNoteGrammar": "materials/grammar-notes-56-57.pdf"
        },
        "afternoon": {
            "activityGrammar": "(สอบ) บาลีไวยากรณ์ ครั้งที่ ๑๓",
            "linkYoutube": [
                "https://youtu.be/Xyu5oWv-XL0?si=5-I8K_DyrGkIsc7g"
            ],
            "isExam": true,
            "examStartTime": "14:00:00",
            "examEndTime": "15:00:00",
            "fileExamGrammar": "exams/grammar-exam3-56-57.pdf",
            "fileAnswerGrammar": "answers/grammar-answer3-56-57.pdf"
        },
        "evening": {
            activityGrammar: [
                "เรียนอุภัยพากย์ปริวัตน์",
                "(เฉลย) บาลีไวยากรณ์ ครั้งที่ ๑๓"
            ]
        }
    },
    {
        "date": "2025-11-29",
        "displayDate": "ส. ๒๙-พ.ย.-๖๘",
        "remarks": {},
        "morning": {},
        "afternoon": {},
        "evening": {}
    },
    {
        "date": "2025-11-30",
        "displayDate": "อา. ๓๐-พ.ย.-๖๘",
        "remarks": {},
        "morning": {},
        "afternoon": {},
        "evening": {}
    }
];
