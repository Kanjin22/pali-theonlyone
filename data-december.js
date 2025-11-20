// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (เวอร์ชัน 3.0 - Modal)        ==
// ==  รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบเฉลยอัตโนมัติ  ==
// ===================================================================

const scheduleData = [
    // ===============================================================
    // ==                 *** ตัวอย่างต้นแบบ ***                     ==
    // ==   คัดลอกบล็อก {...}, นี้ไปใช้ แล้วแก้ไขข้อมูลตามต้องการ      ==
    // ===============================================================
    {
        // --- ข้อมูลหลักของวัน (จำเป็นต้องมี) ---
        date: "YYYY-MM-DD",          // รูปแบบปี-เดือน-วัน (ค.ศ.) สำหรับการคำนวณ
        displayDate: "ว. ดด-เดือน-ปป", // ข้อความวันที่ ที่จะแสดงในตาราง

        // --- หมายเหตุ (แสดงที่คอลัมน์สุดท้าย) ---
        remarks: {
            grammar: "หมายเหตุสำหรับวิชาไวยากรณ์ (ถ้ามี)",
            translate: [
                "หมายเหตุสำหรับวิชาแปล ชุดที่ 1 (ถ้ามี)",
                "หมายเหตุสำหรับวิชาแปล ชุดที่ 2 (ถ้ามี)"
            ],
            general: "หมายเหตุทั่วไป ไม่เกี่ยวกับวิชาใดเป็นพิเศษ (ถ้ามี)"
        },

        // --- กิจกรรมช่วงเช้า ---
        morning: {
            activityGrammar: "ข้อความกิจกรรมของวิชาไวยากรณ์ (ถ้ามี)",
            activityTranslate: "ข้อความกิจกรรมของวิชาแปล (ถ้ามี)",
            linkZoom: "https://... (ลิงก์ Zoom ถ้ามี)",
            linkYoutube: "https://... (ลิงก์ YouTube ถ้ามี)",
            fileNoteGrammar: "materials/... (ไฟล์เนื้อหาไวยากรณ์ ถ้ามี)",
            fileNoteTranslate: [
                "materials/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 1 ถ้ามี)",
                "materials/... (ไฟล์เนื้อหาแปล ไฟล์ที่ 2 ถ้ามี)"
            ]
        },

        // --- กิจกรรมช่วงบ่าย (ตัวอย่างการสอบ) ---
        afternoon: {
            activityGrammar: "กิจกรรมไวยากรณ์ช่วงบ่าย (ถ้ามี)",
            activityTranslate: "กิจกรรมแปลช่วงบ่าย (ถ้ามี)",
            isExam: true, // ใส่ true ถ้าช่วงเวลานี้มีการสอบ
            examStartTime: "HH:MM:SS", // เวลาเริ่มสอบ (24-hour format)
            examEndTime: "HH:MM:SS",   // เวลาสิ้นสุดการสอบ (สำคัญสำหรับเฉลย)
            fileExamGrammar: "exams/... (ไฟล์ข้อสอบไวยากรณ์ ถ้ามี)",
            fileAnswerGrammar: "answers/... (ไฟล์เฉลยไวยากรณ์ ถ้ามี)",
            fileExamTranslate: "exams/... (ไฟล์ข้อสอบแปล ถ้ามี)",
            fileAnswerTranslate: "answers/... (ไฟล์เฉลยแปล ถ้ามี)"
        },

        // --- กิจกรรมช่วงค่ำ (ตัวอย่างกิจกรรมทั่วไป) ---
        evening: {
            activity: "กิจกรรมทั่วไปที่ไม่แยกวิชา (ถ้ามี)"
        }
    },
    // --- ตัวอย่างสำหรับวันหยุดสุดสัปดาห์ ---
    {
        date: "YYYY-MM-DD",
        displayDate: "ว. ดด-เดือน-ปป",
        isWeekend: true, // ใส่ true เพื่อให้เป็นแถบสีเทา
        remarks: {
            general: "ข้อความสำหรับวันหยุด (ถ้ามี)"
        }
    },

    // ===============================================================
    // ==                  *** เริ่มข้อมูลจริง ***                    ==
    // ===============================================================

    // ########## ธันวาคม 2568 ##########
    {
        date: "2025-12-01", displayDate: "จ. ๑-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๔) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙",
            translate: ["แปล. ภาค ๒ เก็งที่ ๕", "แปล. ภาค ๒ เก็งที่ ๖"]
        },
        morning: { activityGrammar: "อ่านไวย. (๑๔)", activityTranslate: "อ่านแปล. ภ. ๒", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๑๔)", activityTranslate: "อ่านแปล. ภ. ๒", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๑๔)/เรียน", activityTranslate: "อ่านแปล. ภ. ๒" }
    },
    {
        date: "2025-12-02", displayDate: "อ. ๒-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๕) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑",
            translate: ["แปล. ภาค ๒ เก็งที่ ๗", "แปล. ภาค ๒ เก็งที่ ๘"]
        },
        morning: { activityGrammar: "อ่านไวย. (๑๕)", activityTranslate: "อ่านแปล. ภ. ๒", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๑๕)", activityTranslate: "อ่านแปล. ภ. ๒", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๑๕)/เรียน", activityTranslate: "อ่านแปล. ภ. ๒" }
    },
    {
        date: "2025-12-03", displayDate: "พ. ๓-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๖) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓",
            translate: ["แปล. ภาค ๒ เก็งที่ ๙", "แปล. ภาค ๒ เก็งที่ ๑๐"]
        },
        morning: { activityGrammar: "อ่านไวย. (๑๖)", activityTranslate: "อ่านแปล. ภ. ๒", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๑๖)", activityTranslate: "อ่านแปล. ภ. ๒", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๑๖)/เรียน", activityTranslate: "อ่านแปล. ภ. ๒" }
    },
    {
        date: "2025-12-04", displayDate: "พฤ. ๔-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๗) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕",
            translate: ["แปล. ภาค ๒ เก็งที่ ๑๑", "แปล. ภาค ๒ เก็งที่ ๑๒"]
        },
        morning: { activityGrammar: "อ่านไวย. (๑๗)", activityTranslate: "อ่านแปล. ภ. ๒", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๑๗)", activityTranslate: "อ่านแปล. ภ. ๒", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๑๗)/เรียน", activityTranslate: "อ่านแปล. ภ. ๒" }
    },
    {
        date: "2025-12-05", displayDate: "ศ. ๕-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๘) ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗",
            translate: ["แปล. ภาค ๒ เก็งที่ ๑๓", "แปล. ภาค ๒ เก็งที่ ๑๔"]
        },
        morning: { activityGrammar: "อ่านไวย. (๑๘)", activityTranslate: "อ่านแปล. ภ. ๒", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๑๘)", activityTranslate: "อ่านแปล. ภ. ๒", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๑๘)/เรียน", activityTranslate: "อ่านแปล. ภ. ๒" }
    },
    {
        date: "2025-12-06", displayDate: "ส. ๖-ธ.ค.-๒๕",
        remarks: { translate: ["แปล. ภาค ๒ เก็งที่ ๑๕", "แปล. ภาค ๒ เก็งที่ ๑๖"] },
        morning: { activityTranslate: "อ่าน/เรียนแปล", fileNoteTranslate: "#" },
        afternoon: { activityTranslate: "ทบทวนแปล" },
        evening: { activityTranslate: "สอบแปล", isExam: true, examStartTime: "18:30:00", examEndTime: "20:30:00", fileExamTranslate: "#", fileAnswerTranslate: "#" }
    },
    {
        date: "2025-12-07", displayDate: "อา. ๗-ธ.ค.-๒๕",
        remarks: { translate: ["แปล. ภาค ๒ เก็งที่ ๑๗", "แปล. ภาค ๒ เก็งที่ ๑๘"] },
        morning: { activityTranslate: "อ่าน/เรียนแปล", fileNoteTranslate: "#" },
        afternoon: { activityTranslate: "ทบทวนแปล" },
        evening: { activityTranslate: "สอบแปล", isExam: true, examStartTime: "18:30:00", examEndTime: "20:30:00", fileExamTranslate: "#", fileAnswerTranslate: "#" }
    },
    {
        date: "2025-12-08", displayDate: "จ. ๘-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๑๙) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑",
            translate: ["แปล. ภาค ๒ เก็งที่ ๑๙", "แปล. ภาค ๒ เก็งที่ ๒๐"]
        },
        morning: { activityGrammar: "อ่านไวย. (๑๙)", activityTranslate: "อ่านแปล. ภ. ๒", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๑๙)", activityTranslate: "อ่านแปล. ภ. ๒", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๑๙)/เรียน", activityTranslate: "อ่านแปล. ภ. ๒" }
    },
    {
        date: "2025-12-09", displayDate: "อ. ๙-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๐) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓",
            translate: ["แปล. ภาค ๒ เก็งที่ ๒๑", "แปล. ภาค ๒ เก็งที่ ๒๒"] // *** สิ้นสุดภาค ๒ ***
        },
        morning: { activityGrammar: "อ่านไวย. (๒๐)", activityTranslate: "อ่านแปล. ภ. ๒", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๐)", activityTranslate: "อ่านแปล. ภ. ๒", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๐)/เรียน", activityTranslate: "อ่านแปล. ภ. ๒" }
    },
    {
        date: "2025-12-10", displayDate: "พ. ๑๐-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๑) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕",
            translate: ["แปล. ภาค ๓ เก็งที่ ๑", "แปล. ภาค ๓ เก็งที่ ๒"]
        },
        morning: { activityGrammar: "อ่านไวย. (๒๑)", activityTranslate: "อ่านแปล. ภ. ๓", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๑)", activityTranslate: "อ่านแปล. ภ. ๓", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๑)/เรียน", activityTranslate: "อ่านแปล. ภ. ๓" }
    },
    {
        date: "2025-12-11", displayDate: "พฤ. ๑๑-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๒) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗",
            translate: ["แปล. ภาค ๓ เก็งที่ ๓", "แปล. ภาค ๓ เก็งที่ ๔"]
        },
        morning: { activityGrammar: "อ่านไวย. (๒๒)", activityTranslate: "อ่านแปล. ภ. ๓", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๒)", activityTranslate: "อ่านแปล. ภ. ๓", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๒)/เรียน", activityTranslate: "อ่านแปล. ภ. ๓" }
    },
    {
        date: "2025-12-12", displayDate: "ศ. ๑๒-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๓) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙",
            translate: ["แปล. ภาค ๓ เก็งที่ ๕", "แปล. ภาค ๓ เก็งที่ ๖"]
        },
        morning: { activityGrammar: "อ่านไวย. (๒๓)", activityTranslate: "อ่านแปล. ภ. ๓", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๓)", activityTranslate: "อ่านแปล. ภ. ๓", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๓)/เรียน", activityTranslate: "อ่านแปล. ภ. ๓" }
    },
    {
        date: "2025-12-13", displayDate: "ส. ๑๓-ธ.ค.-๒๕",
        remarks: { translate: ["แปล. ภาค ๓ เก็งที่ ๗", "แปล. ภาค ๓ เก็งที่ ๘"] },
        morning: { activityTranslate: "อ่าน/เรียนแปล", fileNoteTranslate: "#" },
        afternoon: { activityTranslate: "ทบทวนแปล" },
        evening: { activityTranslate: "สอบแปล", isExam: true, examStartTime: "18:30:00", examEndTime: "20:30:00", fileExamTranslate: "#", fileAnswerTranslate: "#" }
    },
    {
        date: "2025-12-14", displayDate: "อา. ๑๔-ธ.ค.-๒๕",
        remarks: { translate: ["แปล. ภาค ๓ เก็งที่ ๙", "แปล. ภาค ๓ เก็งที่ ๑๐"] },
        morning: { activityTranslate: "อ่าน/เรียนแปล", fileNoteTranslate: "#" },
        afternoon: { activityTranslate: "ทบทวนแปล" },
        evening: { activityTranslate: "สอบแปล", isExam: true, examStartTime: "18:30:00", examEndTime: "20:30:00", fileExamTranslate: "#", fileAnswerTranslate: "#" }
    },
    {
        date: "2025-12-15", displayDate: "จ. ๑๕-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๔) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑",
            translate: ["แปล. ภาค ๓ เก็งที่ ๑๑", "แปล. ภาค ๓ เก็งที่ ๑๒"]
        },
        morning: { activityGrammar: "อ่านไวย. (๒๔)", activityTranslate: "อ่านแปล. ภ. ๓", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๔)", activityTranslate: "อ่านแปล. ภ. ๓", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๔)/เรียน", activityTranslate: "อ่านแปล. ภ. ๓" }
    },
    {
        date: "2025-12-16", displayDate: "อ. ๑๖-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๕) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓",
            translate: ["แปล. ภาค ๓ เก็งที่ ๑๓", "แปล. ภาค ๓ เก็งที่ ๑๔"]
        },
        morning: { activityGrammar: "อ่านไวย. (๒๕)", activityTranslate: "อ่านแปล. ภ. ๓", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๕)", activityTranslate: "อ่านแปล. ภ. ๓", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๕)/เรียน", activityTranslate: "อ่านแปล. ภ. ๓" }
    },
    {
        date: "2025-12-17", displayDate: "พ. ๑๗-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๖) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕",
            translate: ["แปล. ภาค ๓ เก็งที่ ๑๕", "แปล. ภาค ๓ เก็งที่ ๑๖"]
        },
        morning: { activityGrammar: "อ่านไวย. (๒๖)", activityTranslate: "อ่านแปล. ภ. ๓", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๖)", activityTranslate: "อ่านแปล. ภ. ๓", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๖)/เรียน", activityTranslate: "อ่านแปล. ภ. ๓" }
    },
    {
        date: "2025-12-18", displayDate: "พฤ. ๑๘-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๗) ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗",
            translate: ["แปล. ภาค ๓ เก็งที่ ๑๗", "แปล. ภาค ๓ เก็งที่ ๑๘"] // *** สิ้นสุดภาค ๓ ***
        },
        morning: { activityGrammar: "อ่านไวย. (๒๗)", activityTranslate: "อ่านแปล. ภ. ๓", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๗)", activityTranslate: "อ่านแปล. ภ. ๓", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๗)/เรียน", activityTranslate: "อ่านแปล. ภ. ๓" }
    },
    {
        date: "2025-12-19", displayDate: "ศ. ๑๙-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๘) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑",
            translate: ["แปล. ภาค ๔ เก็งที่ ๑", "แปล. ภาค ๔ เก็งที่ ๒"]
        },
        morning: { activityGrammar: "อ่านไวย. (๒๘)", activityTranslate: "อ่านแปล. ภ. ๔", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๘)", activityTranslate: "อ่านแปล. ภ. ๔", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๘)/เรียน", activityTranslate: "อ่านแปล. ภ. ๔" }
    },
    {
        date: "2025-12-20", displayDate: "ส. ๒๐-ธ.ค.-๒๕",
        remarks: { translate: ["แปล. ภาค ๔ เก็งที่ ๓", "แปล. ภาค ๔ เก็งที่ ๔"] },
        morning: { activityTranslate: "อ่าน/เรียนแปล", fileNoteTranslate: "#" },
        afternoon: { activityTranslate: "ทบทวนแปล" },
        evening: { activityTranslate: "สอบแปล", isExam: true, examStartTime: "18:30:00", examEndTime: "20:30:00", fileExamTranslate: "#", fileAnswerTranslate: "#" }
    },
    {
        date: "2025-12-21", displayDate: "อา. ๒๑-ธ.ค.-๒๕",
        remarks: { translate: ["แปล. ภาค ๔ เก็งที่ ๕", "แปล. ภาค ๔ เก็งที่ ๖"] },
        morning: { activityTranslate: "อ่าน/เรียนแปล", fileNoteTranslate: "#" },
        afternoon: { activityTranslate: "ทบทวนแปล" },
        evening: { activityTranslate: "สอบแปล", isExam: true, examStartTime: "18:30:00", examEndTime: "20:30:00", fileExamTranslate: "#", fileAnswerTranslate: "#" }
    },
    {
        date: "2025-12-22", displayDate: "จ. ๒๒-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๒๙) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓",
            translate: ["แปล. ภาค ๔ เก็งที่ ๗", "แปล. ภาค ๔ เก็งที่ ๘"]
        },
        morning: { activityGrammar: "อ่านไวย. (๒๙)", activityTranslate: "อ่านแปล. ภ. ๔", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๒๙)", activityTranslate: "อ่านแปล. ภ. ๔", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๒๙)/เรียน", activityTranslate: "อ่านแปล. ภ. ๔" }
    },
    {
        date: "2025-12-23", displayDate: "อ. ๒๓-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๓๐) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕",
            translate: ["แปล. ภาค ๔ เก็งที่ ๙", "แปล. ภาค ๔ เก็งที่ ๑๐"]
        },
        morning: { activityGrammar: "อ่านไวย. (๓๐)", activityTranslate: "อ่านแปล. ภ. ๔", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๓๐)", activityTranslate: "อ่านแปล. ภ. ๔", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๓๐)/เรียน", activityTranslate: "อ่านแปล. ภ. ๔" }
    },
    {
        date: "2025-12-24", displayDate: "พ. ๒๔-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๓๑) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗",
            translate: ["แปล. ภาค ๔ เก็งที่ ๑๑", "แปล. ภาค ๔ เก็งที่ ๑๒"]
        },
        morning: { activityGrammar: "อ่านไวย. (๓๑)", activityTranslate: "อ่านแปล. ภ. ๔", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๓๑)", activityTranslate: "อ่านแปล. ภ. ๔", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๓๑)/เรียน", activityTranslate: "อ่านแปล. ภ. ๔" }
    },
    {
        date: "2025-12-25", displayDate: "พฤ. ๒๕-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๓๒) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙",
            translate: ["แปล. ภาค ๔ เก็งที่ ๑๓", "แปล. ภาค ๔ เก็งที่ ๑๔"]
        },
        morning: { activityGrammar: "อ่านไวย. (๓๒)", activityTranslate: "อ่านแปล. ภ. ๔", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๓๒)", activityTranslate: "อ่านแปล. ภ. ๔", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๓๒)/เรียน", activityTranslate: "อ่านแปล. ภ. ๔" }
    },
    {
        date: "2025-12-26", displayDate: "ศ. ๒๖-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๓๓) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑",
            translate: ["แปล. ภาค ๔ เก็งที่ ๑๕", "แปล. ภาค ๔ เก็งที่ ๑๖"]
        },
        morning: { activityGrammar: "อ่านไวย. (๓๓)", activityTranslate: "อ่านแปล. ภ. ๔", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๓๓)", activityTranslate: "อ่านแปล. ภ. ๔", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๓๓)/เรียน", activityTranslate: "อ่านแปล. ภ. ๔" }
    },
    {
        date: "2025-12-27", displayDate: "ศ. ๒๗-ธ.ค.-๒๕",
        remarks: {
            grammar: "ไวย. (๓๔) ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๒-๖๓",
            translate: ["แปล. ภาค ๔ เก็งที่ ๑๗", "แปล. ภาค ๔ เก็งที่ ๑๘"] // *** สิ้นสุดภาค ๔ ***
        },
        morning: { activityGrammar: "อ่านไวย. (๓๔)", activityTranslate: "อ่านแปล. ภ. ๔", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบไวย. (๓๔)", activityTranslate: "อ่านแปล. ภ. ๔", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: "เฉลยไวย. (๓๔)/เรียน", activityTranslate: "อ่านแปล. ภ. ๔" }
    },

    // --- วันหยุดส่งท้ายปี ---
    { date: "2025-12-28", displayDate: "อา. ๒๘-ธ.ค.-๒๕", isWeekend: true, remarks: { general: "พักผ่อนส่งท้ายปี" } },
    { date: "2025-12-29", displayDate: "จ. ๒๙-ธ.ค.-๒๕", isWeekend: true, remarks: { general: "พักผ่อนส่งท้ายปี" } },
    { date: "2025-12-30", displayDate: "อ. ๓๐-ธ.ค.-๒๕", isWeekend: true, remarks: { general: "พักผ่อนส่งท้ายปี" } },
    { date: "2025-12-31", displayDate: "พ. ๓๑-ธ.ค.-๒๕", isWeekend: true, remarks: { general: "พักผ่อนส่งท้ายปี" } },
];