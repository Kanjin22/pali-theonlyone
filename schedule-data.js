const scheduleData = [
  // ########## พฤศจิกายน 2568 ##########
  {
    date: "2025-11-12", displayDate: "พ. ๑๒-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๐-๕๑", translate: "แปล. ทำความเข้าใจหลักการแปลมคธเป็นไทยเบื้องต้น" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-50-51.pdf", fileNoteTranslate: "materials/translate-notes-50-51.pdf" },
    afternoon: { activity: "เรียน/ทบทวน" },
    evening: { activity: "สอบประจำวัน", isExam: true, examStartTime: "18:30:00", fileExamGrammar: "exams/grammar-exam-50-51.pdf", fileExamTranslate: "exams/translate-exam-50-51.pdf" }
  },
  {
    date: "2025-11-13", displayDate: "พฤ. ๑๓-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-52-53.pdf", fileNoteTranslate: "materials/translate-notes-52-53.pdf" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-52-53.pdf", fileExamTranslate: "exams/translate-exam-52-53.pdf" },
    evening: { activity: "เรียน/ทบทวน" }
  },
  {
    date: "2025-11-14", displayDate: "ศ. ๑๔-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-54-55.pdf", fileNoteTranslate: "materials/translate-notes-54-55.pdf" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-54-55.pdf", fileExamTranslate: "exams/translate-exam-54-55.pdf" },
    evening: { activity: "เรียน/ทบทวน" }
  },
  { date: "2025-11-15", displayDate: "ส. ๑๕-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-16", displayDate: "อา. ๑๖-พ.ย.-๒๕", isWeekend: true },
  {
    date: "2025-11-17", displayDate: "จ. ๑๗-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๖-๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-56-57.pdf", fileNoteTranslate: "materials/translate-notes-56-57.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-56-57.pdf", fileExamTranslate: "exams/translate-exam-56-57.pdf" }
  },
  {
    date: "2025-11-18", displayDate: "อ. ๑๘-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๘-๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-58-59.pdf", fileNoteTranslate: "materials/translate-notes-58-59.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-58-59.pdf", fileExamTranslate: "exams/translate-exam-58-59.pdf" }
  },
  {
    date: "2025-11-19", displayDate: "พ. ๑๙-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๐-๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-60-61.pdf", fileNoteTranslate: "materials/translate-notes-60-61.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-60-61.pdf", fileExamTranslate: "exams/translate-exam-60-61.pdf" }
  },
  {
    date: "2025-11-20", displayDate: "พฤ. ๒๐-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๒-๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-62-63.pdf", fileNoteTranslate: "materials/translate-notes-62-63.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-62-63.pdf", fileExamTranslate: "exams/translate-exam-62-63.pdf" }
  },
  {
    date: "2025-11-21", displayDate: "ศ. ๒๑-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๔-๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-64-65.pdf", fileNoteTranslate: "materials/translate-notes-64-65.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-64-65.pdf", fileExamTranslate: "exams/translate-exam-64-65.pdf" }
  },
  { date: "2025-11-22", displayDate: "ส. ๒๒-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-23", displayDate: "อา. ๒๓-พ.ย.-๒๕", isWeekend: true },
  {
    date: "2025-11-24", displayDate: "จ. ๒๔-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๖-๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-66-67.pdf", fileNoteTranslate: "materials/translate-notes-66-67.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-66-67.pdf", fileExamTranslate: "exams/translate-exam-66-67.pdf" }
  },
  {
    date: "2025-11-25", displayDate: "อ. ๒๕-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๐-๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-50-51.pdf", fileNoteTranslate: "materials/translate-notes-50-51.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-50-51.pdf", fileExamTranslate: "exams/translate-exam-50-51.pdf" }
  },
  {
    date: "2025-11-26", displayDate: "พ. ๒๖-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๒-๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-52-53.pdf", fileNoteTranslate: "materials/translate-notes-52-53.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-52-53.pdf", fileExamTranslate: "exams/translate-exam-52-53.pdf" }
  },
  {
    date: "2025-11-27", displayDate: "พฤ. ๒๗-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๔-๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-54-55.pdf", fileNoteTranslate: "materials/translate-notes-54-55.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-54-55.pdf", fileExamTranslate: "exams/translate-exam-54-55.pdf" }
  },
  {
    date: "2025-11-28", displayDate: "ศ. ๒๘-พ.ย.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๖-๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-56-57.pdf", fileNoteTranslate: "materials/translate-notes-56-57.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-56-57.pdf", fileExamTranslate: "exams/translate-exam-56-57.pdf" }
  },
  { date: "2025-11-29", displayDate: "ส. ๒๙-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-30", displayDate: "อา. ๓๐-พ.ย.-๒๕", isWeekend: true },

  // ########## ธันวาคม 2568 ##########
  {
    date: "2025-12-01", displayDate: "จ. ๑-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-58-59.pdf", fileNoteTranslate: "materials/translate-notes-58-59.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-58-59.pdf", fileExamTranslate: "exams/translate-exam-58-59.pdf" }
  },
  {
    date: "2025-12-02", displayDate: "อ. ๒-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-60-61.pdf", fileNoteTranslate: "materials/translate-notes-60-61.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-60-61.pdf", fileExamTranslate: "exams/translate-exam-60-61.pdf" }
  },
  {
    date: "2025-12-03", displayDate: "พ. ๓-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-62-63.pdf", fileNoteTranslate: "materials/translate-notes-62-63.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-62-63.pdf", fileExamTranslate: "exams/translate-exam-62-63.pdf" }
  },
  {
    date: "2025-12-04", displayDate: "พฤ. ๔-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-64-65.pdf", fileNoteTranslate: "materials/translate-notes-64-65.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-64-65.pdf", fileExamTranslate: "exams/translate-exam-64-65.pdf" }
  },
  {
    date: "2025-12-05", displayDate: "ศ. ๕-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-66-67.pdf", fileNoteTranslate: "materials/translate-notes-66-67.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-66-67.pdf", fileExamTranslate: "exams/translate-exam-66-67.pdf" }
  },
  { date: "2025-12-06", displayDate: "ส. ๖-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-07", displayDate: "อา. ๗-ธ.ค.-๒๕", isWeekend: true },
  {
    date: "2025-12-08", displayDate: "จ. ๘-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-50-51.pdf", fileNoteTranslate: "materials/translate-notes-50-51.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-50-51.pdf", fileExamTranslate: "exams/translate-exam-50-51.pdf" }
  },
  {
    date: "2025-12-09", displayDate: "อ. ๙-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-52-53.pdf", fileNoteTranslate: "materials/translate-notes-52-53.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-52-53.pdf", fileExamTranslate: "exams/translate-exam-52-53.pdf" }
  },
  {
    date: "2025-12-10", displayDate: "พ. ๑๐-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-54-55.pdf", fileNoteTranslate: "materials/translate-notes-54-55.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-54-55.pdf", fileExamTranslate: "exams/translate-exam-54-55.pdf" }
  },
  {
    date: "2025-12-11", displayDate: "พฤ. ๑๑-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-56-57.pdf", fileNoteTranslate: "materials/translate-notes-56-57.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-56-57.pdf", fileExamTranslate: "exams/translate-exam-56-57.pdf" }
  },
  {
    date: "2025-12-12", displayDate: "ศ. ๑๒-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-58-59.pdf", fileNoteTranslate: "materials/translate-notes-58-59.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-58-59.pdf", fileExamTranslate: "exams/translate-exam-58-59.pdf" }
  },
  { date: "2025-12-13", displayDate: "ส. ๑๓-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-14", displayDate: "อา. ๑๔-ธ.ค.-๒๕", isWeekend: true },
  {
    date: "2025-12-15", displayDate: "จ. ๑๕-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-60-61.pdf", fileNoteTranslate: "materials/translate-notes-60-61.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-60-61.pdf", fileExamTranslate: "exams/translate-exam-60-61.pdf" }
  },
  {
    date: "2025-12-16", displayDate: "อ. ๑๖-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-62-63.pdf", fileNoteTranslate: "materials/translate-notes-62-63.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-62-63.pdf", fileExamTranslate: "exams/translate-exam-62-63.pdf" }
  },
  {
    date: "2025-12-17", displayDate: "พ. ๑๗-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-64-65.pdf", fileNoteTranslate: "materials/translate-notes-64-65.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-64-65.pdf", fileExamTranslate: "exams/translate-exam-64-65.pdf" }
  },
  {
    date: "2025-12-18", displayDate: "พฤ. ๑๘-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-66-67.pdf", fileNoteTranslate: "materials/translate-notes-66-67.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-66-67.pdf", fileExamTranslate: "exams/translate-exam-66-67.pdf" }
  },
  {
    date: "2025-12-19", displayDate: "ศ. ๑๙-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-50-51.pdf", fileNoteTranslate: "materials/translate-notes-50-51.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-50-51.pdf", fileExamTranslate: "exams/translate-exam-50-51.pdf" }
  },
  { date: "2025-12-20", displayDate: "ส. ๒๐-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-21", displayDate: "อา. ๒๑-ธ.ค.-๒๕", isWeekend: true },
  {
    date: "2025-12-22", displayDate: "จ. ๒๒-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-52-53.pdf", fileNoteTranslate: "materials/translate-notes-52-53.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-52-53.pdf", fileExamTranslate: "exams/translate-exam-52-53.pdf" }
  },
  {
    date: "2025-12-23", displayDate: "อ. ๒๓-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-54-55.pdf", fileNoteTranslate: "materials/translate-notes-54-55.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-54-55.pdf", fileExamTranslate: "exams/translate-exam-54-55.pdf" }
  },
  {
    date: "2025-12-24", displayDate: "พ. ๒๔-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-56-57.pdf", fileNoteTranslate: "materials/translate-notes-56-57.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-56-57.pdf", fileExamTranslate: "exams/translate-exam-56-57.pdf" }
  },
  {
    date: "2025-12-25", displayDate: "พฤ. ๒๕-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-58-59.pdf", fileNoteTranslate: "materials/translate-notes-58-59.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-58-59.pdf", fileExamTranslate: "exams/translate-exam-58-59.pdf" }
  },
  {
    date: "2025-12-26", displayDate: "ศ. ๒๖-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-60-61.pdf", fileNoteTranslate: "materials/translate-notes-60-61.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-60-61.pdf", fileExamTranslate: "exams/translate-exam-60-61.pdf" }
  },
  { date: "2025-12-27", displayDate: "ส. ๒๗-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-28", displayDate: "อา. ๒๘-ธ.ค.-๒๕", isWeekend: true },
  {
    date: "2025-12-29", displayDate: "จ. ๒๙-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๒-๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-62-63.pdf", fileNoteTranslate: "materials/translate-notes-62-63.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-62-63.pdf", fileExamTranslate: "exams/translate-exam-62-63.pdf" }
  },
  {
    date: "2025-12-30", displayDate: "อ. ๓๐-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๔-๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-64-65.pdf", fileNoteTranslate: "materials/translate-notes-64-65.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-64-65.pdf", fileExamTranslate: "exams/translate-exam-64-65.pdf" }
  },
  {
    date: "2025-12-31", displayDate: "พ. ๓๑-ธ.ค.-๒๕",
    remarks: { grammar: "ไวย. ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๖-๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-66-67.pdf", fileNoteTranslate: "materials/translate-notes-66-67.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-66-67.pdf", fileExamTranslate: "exams/translate-exam-66-67.pdf" }
  },

  // ########## มกราคม 2569 ##########
  { date: "2026-01-01", displayDate: "พฤ. ๑-ม.ค.-๒๖", isWeekend: true },
  {
    date: "2026-01-02", displayDate: "ศ. ๒-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๒๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2529.pdf", fileNoteTranslate: "materials/translate-notes-total-2529.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2529.pdf", fileExamTranslate: "exams/translate-exam-total-2529.pdf" }
  },
  {
    date: "2026-01-03", displayDate: "ส. ๓-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๐" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2530.pdf", fileNoteTranslate: "materials/translate-notes-total-2530.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2530.pdf", fileExamTranslate: "exams/translate-exam-total-2530.pdf" }
  },
  {
    date: "2026-01-04", displayDate: "อา. ๔-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2531.pdf", fileNoteTranslate: "materials/translate-notes-total-2531.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2531.pdf", fileExamTranslate: "exams/translate-exam-total-2531.pdf" }
  },
  {
    date: "2026-01-05", displayDate: "จ. ๕-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๒" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2532.pdf", fileNoteTranslate: "materials/translate-notes-total-2532.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2532.pdf", fileExamTranslate: "exams/translate-exam-total-2532.pdf" }
  },
  {
    date: "2026-01-06", displayDate: "อ. ๖-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2533.pdf", fileNoteTranslate: "materials/translate-notes-total-2533.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2533.pdf", fileExamTranslate: "exams/translate-exam-total-2533.pdf" }
  },
  {
    date: "2026-01-07", displayDate: "พ. ๗-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๔" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2534.pdf", fileNoteTranslate: "materials/translate-notes-total-2534.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2534.pdf", fileExamTranslate: "exams/translate-exam-total-2534.pdf" }
  },
  {
    date: "2026-01-08", displayDate: "พฤ. ๘-ม.ค.-๒۶",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2535.pdf", fileNoteTranslate: "materials/translate-notes-total-2535.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2535.pdf", fileExamTranslate: "exams/translate-exam-total-2535.pdf" }
  },
  {
    date: "2026-01-09", displayDate: "ศ. ๙-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๖" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2536.pdf", fileNoteTranslate: "materials/translate-notes-total-2536.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2536.pdf", fileExamTranslate: "exams/translate-exam-total-2536.pdf" }
  },
  {
    date: "2026-01-10", displayDate: "ส. ๑๐-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2537.pdf", fileNoteTranslate: "materials/translate-notes-total-2537.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2537.pdf", fileExamTranslate: "exams/translate-exam-total-2537.pdf" }
  },
  {
    date: "2026-01-11", displayDate: "อา. ๑๑-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๘" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2538.pdf", fileNoteTranslate: "materials/translate-notes-total-2538.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2538.pdf", fileExamTranslate: "exams/translate-exam-total-2538.pdf" }
  },
  {
    date: "2026-01-12", displayDate: "จ. ๑๒-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๓๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2539.pdf", fileNoteTranslate: "materials/translate-notes-total-2539.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2539.pdf", fileExamTranslate: "exams/translate-exam-total-2539.pdf" }
  },
  {
    date: "2026-01-13", displayDate: "อ. ๑๓-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๐" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2540.pdf", fileNoteTranslate: "materials/translate-notes-total-2540.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2540.pdf", fileExamTranslate: "exams/translate-exam-total-2540.pdf" }
  },
  {
    date: "2026-01-14", displayDate: "พ. ๑๔-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2541.pdf", fileNoteTranslate: "materials/translate-notes-total-2541.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2541.pdf", fileExamTranslate: "exams/translate-exam-total-2541.pdf" }
  },
  {
    date: "2026-01-15", displayDate: "พฤ. ๑๕-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๒" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2542.pdf", fileNoteTranslate: "materials/translate-notes-total-2542.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2542.pdf", fileExamTranslate: "exams/translate-exam-total-2542.pdf" }
  },
  {
    date: "2026-01-16", displayDate: "ศ. ๑๖-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2543.pdf", fileNoteTranslate: "materials/translate-notes-total-2543.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2543.pdf", fileExamTranslate: "exams/translate-exam-total-2543.pdf" }
  },
  {
    date: "2026-01-17", displayDate: "ส. ๑๗-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๔" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2544.pdf", fileNoteTranslate: "materials/translate-notes-total-2544.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2544.pdf", fileExamTranslate: "exams/translate-exam-total-2544.pdf" }
  },
  {
    date: "2026-01-18", displayDate: "อา. ๑๘-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2545.pdf", fileNoteTranslate: "materials/translate-notes-total-2545.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2545.pdf", fileExamTranslate: "exams/translate-exam-total-2545.pdf" }
  },
  {
    date: "2026-01-19", displayDate: "จ. ๑๙-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๖" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2546.pdf", fileNoteTranslate: "materials/translate-notes-total-2546.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2546.pdf", fileExamTranslate: "exams/translate-exam-total-2546.pdf" }
  },
  {
    date: "2026-01-20", displayDate: "อ. ๒๐-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2547.pdf", fileNoteTranslate: "materials/translate-notes-total-2547.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2547.pdf", fileExamTranslate: "exams/translate-exam-total-2547.pdf" }
  },
  {
    date: "2026-01-21", displayDate: "พ. ๒๑-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๘" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2548.pdf", fileNoteTranslate: "materials/translate-notes-total-2548.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2548.pdf", fileExamTranslate: "exams/translate-exam-total-2548.pdf" }
  },
  {
    date: "2026-01-22", displayDate: "พฤ. ๒๒-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๔๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2549.pdf", fileNoteTranslate: "materials/translate-notes-total-2549.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2549.pdf", fileExamTranslate: "exams/translate-exam-total-2549.pdf" }
  },
  {
    date: "2026-01-23", displayDate: "ศ. ๒๓-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๐" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2550.pdf", fileNoteTranslate: "materials/translate-notes-total-2550.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2550.pdf", fileExamTranslate: "exams/translate-exam-total-2550.pdf" }
  },
  {
    date: "2026-01-24", displayDate: "ส. ๒๔-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2551.pdf", fileNoteTranslate: "materials/translate-notes-total-2551.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2551.pdf", fileExamTranslate: "exams/translate-exam-total-2551.pdf" }
  },
  {
    date: "2026-01-25", displayDate: "อา. ๒๕-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๒" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2552.pdf", fileNoteTranslate: "materials/translate-notes-total-2552.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2552.pdf", fileExamTranslate: "exams/translate-exam-total-2552.pdf" }
  },
  {
    date: "2026-01-26", displayDate: "จ. ๒๖-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2553.pdf", fileNoteTranslate: "materials/translate-notes-total-2553.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2553.pdf", fileExamTranslate: "exams/translate-exam-total-2553.pdf" }
  },
  {
    date: "2026-01-27", displayDate: "อ. ๒๗-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๔" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2554.pdf", fileNoteTranslate: "materials/translate-notes-total-2554.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2554.pdf", fileExamTranslate: "exams/translate-exam-total-2554.pdf" }
  },
  {
    date: "2026-01-28", displayDate: "พ. ๒๘-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2555.pdf", fileNoteTranslate: "materials/translate-notes-total-2555.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2555.pdf", fileExamTranslate: "exams/translate-exam-total-2555.pdf" }
  },
  {
    date: "2026-01-29", displayDate: "พฤ. ๒๙-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๖" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2556.pdf", fileNoteTranslate: "materials/translate-notes-total-2556.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2556.pdf", fileExamTranslate: "exams/translate-exam-total-2556.pdf" }
  },
  {
    date: "2026-01-30", displayDate: "ศ. ๓๐-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2557.pdf", fileNoteTranslate: "materials/translate-notes-total-2557.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2557.pdf", fileExamTranslate: "exams/translate-exam-total-2557.pdf" }
  },
  {
    date: "2026-01-31", displayDate: "ส. ๓๑-ม.ค.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๘" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2558.pdf", fileNoteTranslate: "materials/translate-notes-total-2558.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2558.pdf", fileExamTranslate: "exams/translate-exam-total-2558.pdf" }
  },

  // ########## กุมภาพันธ์ 2569 ##########
  {
    date: "2026-02-01", displayDate: "อา. ๑-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๕๙" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2559.pdf", fileNoteTranslate: "materials/translate-notes-total-2559.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2559.pdf", fileExamTranslate: "exams/translate-exam-total-2559.pdf" }
  },
  {
    date: "2026-02-02", displayDate: "จ. ๒-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๐" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2560.pdf", fileNoteTranslate: "materials/translate-notes-total-2560.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2560.pdf", fileExamTranslate: "exams/translate-exam-total-2560.pdf" }
  },
  {
    date: "2026-02-03", displayDate: "อ. ๓-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๑" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2561.pdf", fileNoteTranslate: "materials/translate-notes-total-2561.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2561.pdf", fileExamTranslate: "exams/translate-exam-total-2561.pdf" }
  },
  {
    date: "2026-02-04", displayDate: "พ. ๔-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๒" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2562.pdf", fileNoteTranslate: "materials/translate-notes-total-2562.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2562.pdf", fileExamTranslate: "exams/translate-exam-total-2562.pdf" }
  },
  {
    date: "2026-02-05", displayDate: "พฤ. ๕-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๓" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2563.pdf", fileNoteTranslate: "materials/translate-notes-total-2563.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2563.pdf", fileExamTranslate: "exams/translate-exam-total-2563.pdf" }
  },
  {
    date: "2026-02-06", displayDate: "ศ. ๖-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๔" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2564.pdf", fileNoteTranslate: "materials/translate-notes-total-2564.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2564.pdf", fileExamTranslate: "exams/translate-exam-total-2564.pdf" }
  },
  {
    date: "2026-02-07", displayDate: "ส. ๗-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๕" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2565.pdf", fileNoteTranslate: "materials/translate-notes-total-2565.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2565.pdf", fileExamTranslate: "exams/translate-exam-total-2565.pdf" }
  },
  {
    date: "2026-02-08", displayDate: "อา. ๘-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๖" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2566.pdf", fileNoteTranslate: "materials/translate-notes-total-2566.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2566.pdf", fileExamTranslate: "exams/translate-exam-total-2566.pdf" }
  },
  {
    date: "2026-02-09", displayDate: "จ. ๙-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๗" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2567.pdf", fileNoteTranslate: "materials/translate-notes-total-2567.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2567.pdf", fileExamTranslate: "exams/translate-exam-total-2567.pdf" }
  },
  {
    date: "2026-02-10", displayDate: "อ. ๑๐-ก.พ.-๒๖",
    remarks: { grammar: "ไวย. รวม ๔ เล่ม ปี' ๒๕๖๘" },
    morning: { activity: "อ่านหนังสือ", fileNoteGrammar: "materials/grammar-notes-total-2568.pdf", fileNoteTranslate: "materials/translate-notes-total-2568.pdf" },
    evening: { activity: "เรียน/ทบทวน" },
    afternoon: { activity: "สอบประจำวัน", isExam: true, examStartTime: "14:00:00", fileExamGrammar: "exams/grammar-exam-total-2568.pdf", fileExamTranslate: "exams/translate-exam-total-2568.pdf" }
  },
];