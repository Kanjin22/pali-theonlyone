// ===================================================================
// ==          ไฟล์ข้อมูลตารางเรียน-สอบ (เวอร์ชันสุดท้าย)            ==
// ==  ระบบจัดการข้อมูลที่สมบูรณ์แบบที่สุด แค่กรอกข้อมูลที่นี่ที่เดียว  ==
// ===================================================================

const scheduleData = [
  // ########## พฤศจิกายน 2568 ##########
  {
    date: "2025-11-12", displayDate: "พ. ๑๒-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๐-๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-50-51.pdf", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "exams/grammar-exam-50-51.pdf" }
  },
  {
    date: "2025-11-13", displayDate: "พฤ. ๑๓-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-52-53.pdf", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-14", displayDate: "ศ. ๑๔-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  { date: "2025-11-15", displayDate: "ส. ๑๕-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-16", displayDate: "อา. ๑๖-พ.ย.-๒๕", isWeekend: true },
  {
    date: "2025-11-17", displayDate: "จ. ๑๗-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๖-๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-18", displayDate: "อ. ๑๘-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๘-๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-19", displayDate: "พ. ๑๙-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๐-๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-20", displayDate: "พฤ. ๒๐-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๒-๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-21", displayDate: "ศ. ๒๑-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๔-๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  { date: "2025-11-22", displayDate: "ส. ๒๒-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-23", displayDate: "อา. ๒๓-พ.ย.-๒๕", isWeekend: true },
  {
    date: "2025-11-24", displayDate: "จ. ๒๔-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๖-๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-25", displayDate: "อ. ๒๕-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๐-๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-26", displayDate: "พ. ๒๖-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๒-๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-27", displayDate: "พฤ. ๒๗-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๔-๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-11-28", displayDate: "ศ. ๒๘-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๖-๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  { date: "2025-11-29", displayDate: "ส. ๒๙-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-30", displayDate: "อา. ๓๐-พ.ย.-๒๕", isWeekend: true },

  // ########## ธันวาคม 2568 ##########
  {
    date: "2025-12-01", displayDate: "จ. ๑-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-02", displayDate: "อ. ๒-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-03", displayDate: "พ. ๓-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-04", displayDate: "พฤ. ๔-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-05", displayDate: "ศ. ๕-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  { date: "2025-12-06", displayDate: "ส. ๖-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-07", displayDate: "อา. ๗-ธ.ค.-๒๕", isWeekend: true },
  {
    date: "2025-12-08", displayDate: "จ. ๘-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-09", displayDate: "อ. ๙-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-10", displayDate: "พ. ๑๐-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-11", displayDate: "พฤ. ๑๑-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-12", displayDate: "ศ. ๑๒-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  { date: "2025-12-13", displayDate: "ส. ๑๓-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-14", displayDate: "อา. ๑๔-ธ.ค.-๒๕", isWeekend: true },
  {
    date: "2025-12-15", displayDate: "จ. ๑๕-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-16", displayDate: "อ. ๑๖-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-17", displayDate: "พ. ๑๗-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-18", displayDate: "พฤ. ๑๘-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-19", displayDate: "ศ. ๑๙-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  { date: "2025-12-20", displayDate: "ส. ๒๐-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-21", displayDate: "อา. ๒๑-ธ.ค.-๒๕", isWeekend: true },
  {
    date: "2025-12-22", displayDate: "จ. ๒๒-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-23", displayDate: "อ. ๒๓-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-24", displayDate: "พ. ๒๔-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-25", displayDate: "พฤ. ๒๕-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-26", displayDate: "ศ. ๒๖-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  { date: "2025-12-27", displayDate: "ส. ๒๗-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-28", displayDate: "อา. ๒๘-ธ.ค.-๒๕", isWeekend: true },
  {
    date: "2025-12-29", displayDate: "จ. ๒๙-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๒-๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-30", displayDate: "อ. ๓๐-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๔-๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2025-12-31", displayDate: "พ. ๓๑-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๖-๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },

  // ########## มกราคม 2569 ##########
  { date: "2026-01-01", displayDate: "พฤ. ๑-ม.ค.-๒๖", isWeekend: true },
  {
    date: "2026-01-02", displayDate: "ศ. ๒-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๒๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-03", displayDate: "ส. ๓-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๐" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-04", displayDate: "อา. ๔-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-05", displayDate: "จ. ๕-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๒" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-06", displayDate: "อ. ๖-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-07", displayDate: "พ. ๗-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๔" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-08", displayDate: "พฤ. ๘-ม.ค.-๒۶",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-09", displayDate: "ศ. ๙-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๖" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-10", displayDate: "ส. ๑๐-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-11", displayDate: "อา. ๑๑-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๘" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-12", displayDate: "จ. ๑๒-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-13", displayDate: "อ. ๑๓-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๐" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-14", displayDate: "พ. ๑๔-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-15", displayDate: "พฤ. ๑๕-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๒" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-16", displayDate: "ศ. ๑๖-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-17", displayDate: "ส. ๑๗-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๔" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-18", displayDate: "อา. ๑๘-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-19", displayDate: "จ. ๑๙-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๖" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-20", displayDate: "อ. ๒๐-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-21", displayDate: "พ. ๒๑-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๘" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-22", displayDate: "พฤ. ๒๒-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-23", displayDate: "ศ. ๒๓-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๐" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-24", displayDate: "ส. ๒๔-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-25", displayDate: "อา. ๒๕-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๒" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-26", displayDate: "จ. ๒๖-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-27", displayDate: "อ. ๒๗-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๔" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-28", displayDate: "พ. ๒๘-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-29", displayDate: "พฤ. ๒๙-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๖" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-30", displayDate: "ศ. ๓๐-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-01-31", displayDate: "ส. ๓๑-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๘" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },

  // ########## กุมภาพันธ์ 2569 ##########
  {
    date: "2026-02-01", displayDate: "อา. ๑-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-02", displayDate: "จ. ๒-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๐" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-03", displayDate: "อ. ๓-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-04", displayDate: "พ. ๔-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๒" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-05", displayDate: "พฤ. ๕-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-06", displayDate: "ศ. ๖-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๔" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-07", displayDate: "ส. ๗-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-08", displayDate: "อา. ๘-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๖" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-09", displayDate: "จ. ๙-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
  {
    date: "2026-02-10", displayDate: "อ. ๑๐-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๘" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "#", fileNoteTranslate: "#" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "#" }
  },
];