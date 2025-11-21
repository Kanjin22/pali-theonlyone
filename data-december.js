// ===================================================================
// ==        ไฟล์ข้อมูลตารางเรียน-สอบ (เวอร์ชัน 3.0 - Modal)        ==
// ==  รองรับลิงก์ Zoom/YouTube, ปุ่มรายละเอียด, และระบบเฉลยอัตโนมัติ  ==
// ===================================================================

const dataDecember = [
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

    // ########## ธันวาคม 2568 ##########
    {
        date: "2025-12-01", displayDate: "จ. ๑-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๔", translate: "แปลมคธเป็นไทย ภาค ๒" },
        morning: { activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙", activityTranslate: "อ่านเก็งที่ ๕ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๔", activityTranslate: "อ่านเก็งที่ ๖ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๔", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-02", displayDate: "อ. ๒-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๕", translate: "แปลมคธเป็นไทย ภาค ๒" },
        morning: { activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑", activityTranslate: "อ่านเก็งที่ ๗ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๕", activityTranslate: "อ่านเก็งที่ ๘ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๕", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-03", displayDate: "พ. ๓-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๖", translate: "แปลมคธเป็นไทย ภาค ๒" },
        morning: { activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓", activityTranslate: "อ่านเก็งที่ ๙ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๖", activityTranslate: "อ่านเก็งที่ ๑๐ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๖", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-04", displayDate: "พฤ. ๔-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๗", translate: "แปลมคธเป็นไทย ภาค ๒" },
        morning: { activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕", activityTranslate: "อ่านเก็งที่ ๑๑ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๗", activityTranslate: "อ่านเก็งที่ ๑๒ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๗", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-05", displayDate: "ศ. ๕-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๘", translate: "แปลมคธเป็นไทย ภาค ๒" },
        morning: { activityGrammar: "อ่านข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗", activityTranslate: "อ่านเก็งที่ ๑๓ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๘", activityTranslate: "อ่านเก็งที่ ๑๔ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๘", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-06", displayDate: "ส. ๖-ธ.ค.-๖๘",
        remarks: { translate: "แปลมคธเป็นไทย ภาค ๒" },
        morning: { activityTranslate: "อ่านเก็งที่ ๑๕ น......." },
        afternoon: { activityTranslate: "อ่านเก็งที่ ๑๖ น...... ฯ" },
        evening: { activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-07", displayDate: "อา. ๗-ธ.ค.-๖๘",
        remarks: { translate: "แปลมคธเป็นไทย ภาค ๒" },
        morning: { activityTranslate: "อ่านเก็งที่ ๑๗ น......." },
        afternoon: { activityTranslate: "อ่านเก็งที่ ๑๘ น...... ฯ" },
        evening: { activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-08", displayDate: "จ. ๘-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๑๙", translate: "แปลมคธเป็นไทย ภาค ๒" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑", activityTranslate: "อ่านเก็งที่ ๑๙ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๑๙", activityTranslate: "อ่านเก็งที่ ๒๐ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๑๙", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-09", displayDate: "อ. ๙-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๐", translate: "แปลมคธเป็นไทย ภาค ๒ (สิ้นสุด)" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓", activityTranslate: "อ่านเก็งที่ ๒๑ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๐", activityTranslate: "อ่านเก็งที่ ๒๒ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๐", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๒" }
    },
    {
        date: "2025-12-10", displayDate: "พ. ๑๐-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๑", translate: "แปลมคธเป็นไทย ภาค ๓" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕", activityTranslate: "อ่านเก็งที่ ๑ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๑", activityTranslate: "อ่านเก็งที่ ๒ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๑", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-11", displayDate: "พฤ. ๑๑-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๒", translate: "แปลมคธเป็นไทย ภาค ๓" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗", activityTranslate: "อ่านเก็งที่ ๓ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๒", activityTranslate: "อ่านเก็งที่ ๔ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๒", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-12", displayDate: "ศ. ๑๒-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๓", translate: "แปลมคธเป็นไทย ภาค ๓" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙", activityTranslate: "อ่านเก็งที่ ๕ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๓", activityTranslate: "อ่านเก็งที่ ๖ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๓", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-13", displayDate: "ส. ๑๓-ธ.ค.-๖๘",
        remarks: { translate: "แปลมคธเป็นไทย ภาค ๓" },
        morning: { activityTranslate: "อ่านเก็งที่ ๗ น......." },
        afternoon: { activityTranslate: "อ่านเก็งที่ ๘ น...... ฯ" },
        evening: { activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-14", displayDate: "อา. ๑๔-ธ.ค.-๖๘",
        remarks: { translate: "แปลมคธเป็นไทย ภาค ๓" },
        morning: { activityTranslate: "อ่านเก็งที่ ๙ น......." },
        afternoon: { activityTranslate: "อ่านเก็งที่ ๑๐ น...... ฯ" },
        evening: { activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-15", displayDate: "จ. ๑๕-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๔", translate: "แปลมคธเป็นไทย ภาค ๓" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑", activityTranslate: "อ่านเก็งที่ ๑๑ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๔", activityTranslate: "อ่านเก็งที่ ๑๒ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๔", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-16", displayDate: "อ. ๑๖-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๕", translate: "แปลมคธเป็นไทย ภาค ๓" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓", activityTranslate: "อ่านเก็งที่ ๑๓ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๕", activityTranslate: "อ่านเก็งที่ ๑๔ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๕", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-17", displayDate: "พ. ๑๗-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๖", translate: "แปลมคธเป็นไทย ภาค ๓" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕", activityTranslate: "อ่านเก็งที่ ๑๕ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๖", activityTranslate: "อ่านเก็งที่ ๑๖ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๖", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-18", displayDate: "พฤ. ๑๘-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๗", translate: "แปลมคธเป็นไทย ภาค ๓ (สิ้นสุด)" },
        morning: { activityGrammar: "อ่านข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗", activityTranslate: "อ่านเก็งที่ ๑๗ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๗", activityTranslate: "อ่านเก็งที่ ๑๘ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๗", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๓" }
    },
    {
        date: "2025-12-19", displayDate: "ศ. ๑๙-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๘", translate: "แปลมคธเป็นไทย ภาค ๔" },
        morning: { activityGrammar: "อ่านข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑", activityTranslate: "อ่านเก็งที่ ๑ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๘", activityTranslate: "อ่านเก็งที่ ๒ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๘", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },
    {
        date: "2025-12-20", displayDate: "ส. ๒๐-ธ.ค.-๖๘",
        remarks: { translate: "แปลมคธเป็นไทย ภาค ๔" },
        morning: { activityTranslate: "อ่านเก็งที่ ๓ น......." },
        afternoon: { activityTranslate: "อ่านเก็งที่ ๔ น...... ฯ" },
        evening: { activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },
    {
        date: "2025-12-21", displayDate: "อา. ๒๑-ธ.ค.-๖๘",
        remarks: { translate: "แปลมคธเป็นไทย ภาค ๔" },
        morning: { activityTranslate: "อ่านเก็งที่ ๕ น......." },
        afternoon: { activityTranslate: "อ่านเก็งที่ ๖ น...... ฯ" },
        evening: { activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },
    {
        date: "2025-12-22", displayDate: "จ. ๒๒-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๒๙", translate: "แปลมคธเป็นไทย ภาค ๔" },
        morning: { activityGrammar: "อ่านข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓", activityTranslate: "อ่านเก็งที่ ๗ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๒๙", activityTranslate: "อ่านเก็งที่ ๘ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๒๙", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },
    {
        date: "2025-12-23", displayDate: "อ. ๒๓-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๐", translate: "แปลมคธเป็นไทย ภาค ๔" },
        morning: { activityGrammar: "อ่านข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕", activityTranslate: "อ่านเก็งที่ ๙ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๓๐", activityTranslate: "อ่านเก็งที่ ๑๐ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๓๐", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },
    {
        date: "2025-12-24", displayDate: "พ. ๒๔-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๑", translate: "แปลมคธเป็นไทย ภาค ๔" },
        morning: { activityGrammar: "อ่านข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗", activityTranslate: "อ่านเก็งที่ ๑๑ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๓๑", activityTranslate: "อ่านเก็งที่ ๑๒ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๓๑", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },
    {
        date: "2025-12-25", displayDate: "พฤ. ๒๕-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๒", translate: "แปลมคธเป็นไทย ภาค ๔" },
        morning: { activityGrammar: "อ่านข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙", activityTranslate: "อ่านเก็งที่ ๑๓ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๓๒", activityTranslate: "อ่านเก็งที่ ๑๔ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๓๒", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },
    {
        date: "2025-12-26", displayDate: "ศ. ๒๖-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๓", translate: "แปลมคธเป็นไทย ภาค ๔" },
        morning: { activityGrammar: "อ่านข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑", activityTranslate: "อ่านเก็งที่ ๑๕ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๓๓", activityTranslate: "อ่านเก็งที่ ๑๖ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๓๓", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },
    {
        date: "2025-12-27", displayDate: "ศ. ๒๗-ธ.ค.-๖๘",
        remarks: { grammar: "บาลีไวยากรณ์ ครั้งที่ ๓๔", translate: "แปลมคธเป็นไทย ภาค ๔ (สิ้นสุด)" },
        morning: { activityGrammar: "อ่านข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๒-๖๓", activityTranslate: "อ่านเก็งที่ ๑๗ น.......", fileNoteGrammar: "#", fileNoteTranslate: "#" },
        afternoon: { activityGrammar: "สอบบาลีไวยากรณ์ ครั้งที่ ๓๔", activityTranslate: "อ่านเก็งที่ ๑๘ น...... ฯ", isExam: true, examStartTime: "14:00:00", examEndTime: "15:00:00", fileExamGrammar: "#", fileAnswerGrammar: "#" },
        evening: { activityGrammar: ["เฉลยบาลีไวยากรณ์ ครั้งที่ ๓๔", "เรียนบาลีไวยากรณ์"], activityTranslate: "เรียนแปลมคธเป็นไทย ภาค ๔" }
    },

    // --- วันหยุดส่งท้ายปี ---
    { date: "2025-12-28", displayDate: "อา. ๒๘-ธ.ค.-๖๘", isWeekend: true, remarks: { general: "พักผ่อนส่งท้ายปี" } },
    { date: "2025-12-29", displayDate: "จ. ๒๙-ธ.ค.-๖๘", isWeekend: true, remarks: { general: "พักผ่อนส่งท้ายปี" } },
    { date: "2025-12-30", displayDate: "อ. ๓๐-ธ.ค.-๖๘", isWeekend: true, remarks: { general: "พักผ่อนส่งท้ายปี" } },
    { date: "2025-12-31", displayDate: "พ. ๓๑-ธ.ค.-๖๘", isWeekend: true, remarks: { general: "พักผ่อนส่งท้ายปี" } },
];