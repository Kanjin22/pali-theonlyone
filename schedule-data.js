// ===================================================================
// ==          ไฟล์ข้อมูลตารางเรียน-สอบฉบับสมบูรณ์                   ==
// ==   จากนี้ไป แค่สร้างไฟล์ PDF ให้ชื่อตรงกับที่กำหนดไว้ในนี้ก็พอ    ==
// ===================================================================

const scheduleData = [
  // --- รูปแบบการใส่ข้อมูล ---
  // {
  //   date: "YYYY-MM-DD",          // วันที่ ค.ศ. สำหรับไฮไลท์
  //   displayDate: "ข้อความวันที่",   // วันที่ที่จะแสดงในตาราง
  //   notes: "เนื้อหาเช้า-สาย",
  //   fileNote: "materials/ชื่อไฟล์เนื้อหา.pdf", // ใส่ # ถ้ายังไม่มีไฟล์
  //   examTime: "HH:MM:SS",          // เวลาเริ่มสอบ
  //   fileExam: "exams/ชื่อไฟล์ข้อสอบ.pdf",   // ใส่ # ถ้ายังไม่มีไฟล์
  //   remarks: "ข้อความในช่องหมายเหตุ"
  // },
  // { date: "YYYY-MM-DD", displayDate: "...", isWeekend: true, remarks: "..." } // สำหรับวันหยุด

  // ########## พฤศจิกายน 2568 ##########
  { date: "2025-11-12", displayDate: "พ. ๑๒-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-50-51.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-50-51.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๐-๕๑" },
  { date: "2025-11-13", displayDate: "พฤ. ๑๓-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-52-53.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-52-53.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๒-๕๓" },
  { date: "2025-11-14", displayDate: "ศ. ๑๔-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-54-55.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-54-55.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๔-๕๕" },
  { date: "2025-11-15", displayDate: "ส. ๑๕-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-16", displayDate: "อา. ๑๖-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-17", displayDate: "จ. ๑๗-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-56-57.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-56-57.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๖-๕๗" },
  { date: "2025-11-18", displayDate: "อ. ๑๘-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-58-59.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-58-59.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๕๘-๕๙" },
  { date: "2025-11-19", displayDate: "พ. ๑๙-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-60-61.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-60-61.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๐-๖๑" },
  { date: "2025-11-20", displayDate: "พฤ. ๒๐-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-62-63.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-62-63.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๒-๖๓" },
  { date: "2025-11-21", displayDate: "ศ. ๒๑-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-64-65.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-64-65.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๔-๖๕" },
  { date: "2025-11-22", displayDate: "ส. ๒๒-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-23", displayDate: "อา. ๒๓-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-24", displayDate: "จ. ๒๔-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-66-67.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-66-67.pdf", remarks: "ข้อ ๑-๒ (สมัญญาภิธาน-สนธิ) ปี' ๖๖-๖๗" },
  { date: "2025-11-25", displayDate: "อ. ๒๕-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-50-51.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-50-51.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๐-๕๑" },
  { date: "2025-11-26", displayDate: "พ. ๒๖-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-52-53.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-52-53.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๒-๕๓" },
  { date: "2025-11-27", displayDate: "พฤ. ๒๗-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-54-55.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-54-55.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๔-๕๕" },
  { date: "2025-11-28", displayDate: "ศ. ๒๘-พ.ย.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-56-57.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-56-57.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๖-๕๗" },
  { date: "2025-11-29", displayDate: "ส. ๒๙-พ.ย.-๒๕", isWeekend: true },
  { date: "2025-11-30", displayDate: "อา. ๓๐-พ.ย.-๒๕", isWeekend: true },

  // ########## ธันวาคม 2568 ##########
  { date: "2025-12-01", displayDate: "จ. ๑-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-58-59.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-58-59.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๕๘-๕๙" },
  { date: "2025-12-02", displayDate: "อ. ๒-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-60-61.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-60-61.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๐-๖๑" },
  { date: "2025-12-03", displayDate: "พ. ๓-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-62-63.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-62-63.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๒-๖๓" },
  { date: "2025-12-04", displayDate: "พฤ. ๔-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-64-65.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-64-65.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๔-๖๕" },
  { date: "2025-12-05", displayDate: "ศ. ๕-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-66-67.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-66-67.pdf", remarks: "ข้อ ๓ (นามศัพท์-อัพยยศัพท์) ปี' ๖๖-๖๗" },
  { date: "2025-12-06", displayDate: "ส. ๖-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-07", displayDate: "อา. ๗-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-08", displayDate: "จ. ๘-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-50-51.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-50-51.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๐-๕๑" },
  { date: "2025-12-09", displayDate: "อ. ๙-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-52-53.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-52-53.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๒-๕๓" },
  { date: "2025-12-10", displayDate: "พ. ๑๐-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-54-55.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-54-55.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๔-๕๕" },
  { date: "2025-12-11", displayDate: "พฤ. ๑๑-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-56-57.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-56-57.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๖-๕๗" },
  { date: "2025-12-12", displayDate: "ศ. ๑๒-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-58-59.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-58-59.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๕๘-๕๙" },
  { date: "2025-12-13", displayDate: "ส. ๑๓-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-14", displayDate: "อา. ๑๔-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-15", displayDate: "จ. ๑๕-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-60-61.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-60-61.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๐-๖๑" },
  { date: "2025-12-16", displayDate: "อ. ๑๖-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-62-63.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-62-63.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๒-๖๓" },
  { date: "2025-12-17", displayDate: "พ. ๑๗-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-64-65.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-64-65.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๔-๖๕" },
  { date: "2025-12-18", displayDate: "พฤ. ๑๘-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-66-67.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-66-67.pdf", remarks: "ข้อ ๔-๕ (อาขยาต-กิตก์) ปี' ๖๖-๖๗" },
  { date: "2025-12-19", displayDate: "ศ. ๑๙-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-50-51.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-50-51.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๐-๕๑" },
  { date: "2025-12-20", displayDate: "ส. ๒๐-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-21", displayDate: "อา. ๒๑-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-22", displayDate: "จ. ๒๒-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-52-53.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-52-53.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๒-๕๓" },
  { date: "2025-12-23", displayDate: "อ. ๒๓-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-54-55.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-54-55.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๔-๕๕" },
  { date: "2025-12-24", displayDate: "พ. ๒๔-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-56-57.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-56-57.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๖-๕๗" },
  { date: "2025-12-25", displayDate: "พฤ. ๒๕-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-58-59.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-58-59.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๕๘-๕๙" },
  { date: "2025-12-26", displayDate: "ศ. ๒๖-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-60-61.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-60-61.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๐-๖๑" },
  { date: "2025-12-27", displayDate: "ส. ๒๗-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-28", displayDate: "อา. ๒๘-ธ.ค.-๒๕", isWeekend: true },
  { date: "2025-12-29", displayDate: "จ. ๒๙-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-62-63.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-62-63.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๒-๖๓" },
  { date: "2025-12-30", displayDate: "อ. ๓๐-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-64-65.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-64-65.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๔-๖๕" },
  { date: "2025-12-31", displayDate: "พ. ๓๑-ธ.ค.-๒๕", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-66-67.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-66-67.pdf", remarks: "ข้อ ๖-๗ (สมาส-ตัทธิต) ปี' ๖๖-๖๗" },

  // ########## มกราคม 2569 ##########
  { date: "2026-01-01", displayDate: "พฤ. ๑-ม.ค.-๒๖", isWeekend: true },
  { date: "2026-01-02", displayDate: "ศ. ๒-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2529.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2529.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๒๙" },
  { date: "2026-01-03", displayDate: "ส. ๓-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2530.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2530.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๐" },
  { date: "2026-01-04", displayDate: "อา. ๔-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2531.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2531.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๑" },
  { date: "2026-01-05", displayDate: "จ. ๕-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2532.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2532.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๒" },
  { date: "2026-01-06", displayDate: "อ. ๖-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2533.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2533.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๓" },
  { date: "2026-01-07", displayDate: "พ. ๗-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2534.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2534.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๔" },
  { date: "2026-01-08", displayDate: "พฤ. ๘-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2535.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2535.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๕" },
  { date: "2026-01-09", displayDate: "ศ. ๙-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2536.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2536.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๖" },
  { date: "2026-01-10", displayDate: "ส. ๑๐-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2537.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2537.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๗" },
  { date: "2026-01-11", displayDate: "อา. ๑๑-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2538.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2538.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๘" },
  { date: "2026-01-12", displayDate: "จ. ๑๒-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2539.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2539.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๓๙" },
  { date: "2026-01-13", displayDate: "อ. ๑๓-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2540.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2540.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๐" },
  { date: "2026-01-14", displayDate: "พ. ๑๔-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2541.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2541.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๑" },
  { date: "2026-01-15", displayDate: "พฤ. ๑๕-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2542.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2542.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๒" },
  { date: "2026-01-16", displayDate: "ศ. ๑๖-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2543.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2543.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๓" },
  { date: "2026-01-17", displayDate: "ส. ๑๗-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2544.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2544.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๔" },
  { date: "2026-01-18", displayDate: "อา. ๑๘-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2545.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2545.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๕" },
  { date: "2026-01-19", displayDate: "จ. ๑๙-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2546.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2546.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๖" },
  { date: "2026-01-20", displayDate: "อ. ๒๐-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2547.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2547.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๗" },
  { date: "2026-01-21", displayDate: "พ. ๒๑-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2548.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2548.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๘" },
  { date: "2026-01-22", displayDate: "พฤ. ๒๒-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2549.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2549.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๔๙" },
  { date: "2026-01-23", displayDate: "ศ. ๒๓-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2550.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2550.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๐" },
  { date: "2026-01-24", displayDate: "ส. ๒๔-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2551.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2551.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๑" },
  { date: "2026-01-25", displayDate: "อา. ๒๕-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2552.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2552.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๒" },
  { date: "2026-01-26", displayDate: "จ. ๒๖-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2553.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2553.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๓" },
  { date: "2026-01-27", displayDate: "อ. ๒๗-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2554.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2554.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๔" },
  { date: "2026-01-28", displayDate: "พ. ๒๘-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2555.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2555.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๕" },
  { date: "2026-01-29", displayDate: "พฤ. ๒๙-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2556.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2556.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๖" },
  { date: "2026-01-30", displayDate: "ศ. ๓๐-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2557.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2557.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๗" },
  { date: "2026-01-31", displayDate: "ส. ๓๑-ม.ค.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2558.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2558.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๘" },

  // ########## กุมภาพันธ์ 2569 ##########
  { date: "2026-02-01", displayDate: "อา. ๑-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2559.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2559.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๕๙" },
  { date: "2026-02-02", displayDate: "จ. ๒-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2560.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2560.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๐" },
  { date: "2026-02-03", displayDate: "อ. ๓-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2561.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2561.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๑" },
  { date: "2026-02-04", displayDate: "พ. ๔-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2562.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2562.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๒" },
  { date: "2026-02-05", displayDate: "พฤ. ๕-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2563.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2563.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๓" },
  { date: "2026-02-06", displayDate: "ศ. ๖-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2564.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2564.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๔" },
  { date: "2026-02-07", displayDate: "ส. ๗-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2565.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2565.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๕" },
  { date: "2026-02-08", displayDate: "อา. ๘-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2566.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2566.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๖" },
  { date: "2026-02-09", displayDate: "จ. ๙-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2567.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2567.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๗" },
  { date: "2026-02-10", displayDate: "อ. ๑๐-ก.พ.-๒๖", notes: "อ่านหนังสือ", fileNote: "materials/grammar-notes-total-2568.pdf", examTime: "18:30:00", fileExam: "exams/grammar-exam-total-2568.pdf", remarks: "รวม ๔ เล่ม ปี' ๒๕๖๘" }

];