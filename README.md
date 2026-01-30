# Pali The Only One - Examination & Learning Platform

[English](#english) | [ภาษาไทย](#thai)

<a name="english"></a>

A dedicated learning and teaching platform specifically designed for the **Pali Sanam Luang Examination**. This project serves as a comprehensive digital classroom environment:

- **Central Classroom:** A collaborative space for teachers and students.
- **Personal Learning Space:** A self-study area for students to practice and review.
- **Teaching Preparation:** A toolkit for teachers to prepare materials and exams.

## Features

- 📚 Dictionary and vocabulary tools
- 📝 Grammar learning resources
- 🧮 Declension and morphology analysis
- 📖 Sutta readers and text browsers
- 🎓 Exam builder and scheduling
- 🔍 Search and lookup functions
- 📱 Responsive web interface
- ☁️ Firebase backend integration

## Project Structure

```
.
├── data/                    # Data files and vocabularies
│   ├── dicts/               # Dictionary data files (JS)
│   ├── raw/                 # Shared raw files (with thedhatu)
│   └── source_docs/         # Original source documents
├── docs/                    # Project documentation and reports
├── js/                      # JavaScript modules
├── scripts/                 # Utility and automation scripts
├── schedules/               # Course schedules
├── fonts/                   # Font files
├── icons/                   # Icon assets
├── *.html                   # Web interface pages
├── server.js                # Express.js server
├── sw.js                    # Service Worker
└── package.json             # Node.js dependencies
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   - Copy the example config:
     ```bash
     cp config.example.js config.js
     ```
   - Edit `config.js` and add your Firebase credentials.
   - **Note:** `config.js` is ignored by git to prevent secret leakage.

3. **Install Security Hooks (Recommended):**
   ```powershell
   # Windows PowerShell
   .\scripts\setup-hooks.ps1
   ```
   This installs a pre-commit hook to prevent accidental committing of secrets.

4. **Set environment variables (for server):**
   ```bash
   export SERVICE_ACCOUNT_PATH=/path/to/service-account-key.json
   ```

5. **Run the server:**
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start the server
- `npm run dpd:update` - Update DPD dictionary data
- `npm run dpd:sync` - Sync DPD to Firestore
- `npm run admin:grant` - Grant admin claims to user

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: Firebase/Firestore
- Deployment: Firebase Hosting

## For Developers & Educators

This project is structured to be easily reusable for educational purposes:
- **Dictionary Logic:** See `data/pali-lookup.js` for the core stemming and lookup algorithms.
- **Raw Data:** Vocabulary files in `data/dicts/` can be converted for other dictionary apps (SQLite/JSON).
- **Source Texts:** Original documents in `data/source_docs/` are valuable for creating teaching materials (Flashcards/Sheets).

## License

Internal project

---

<a name="thai"></a>

# Pali The Only One - แพลตฟอร์มการเรียนรู้และสอบบาลี

แพลตฟอร์มการเรียนการสอนที่ออกแบบมาโดยเฉพาะสำหรับ **การสอบบาลีสนามหลวง** โครงการนี้เน้นการเป็นห้องเรียนดิจิทัลที่ครบวงจร:
- **ห้องเรียนกลาง:** พื้นที่สำหรับอาจารย์และนักเรียนได้ใช้ร่วมกันในการเรียนการสอน
- **ห้องเรียนรู้ส่วนตัว:** พื้นที่สำหรับนักเรียนในการศึกษา ทบทวน และฝึกฝนด้วยตนเอง
- **เครื่องมือเตรียมการสอน:** พื้นที่สำหรับอาจารย์ในการจัดเตรียมสื่อการสอนและข้อสอบ

## คุณสมบัติ

- 📚 พจนานุกรมและเครื่องมือค้นหาคำศัพท์
- 📝 แหล่งข้อมูลการเรียนรู้ไวยากรณ์
- 🧮 การแจกวิภัตติและการวิเคราะห์รูปศัพท์
- 📖 โปรแกรมอ่านพระสูตรและเบราว์เซอร์ข้อความ
- 🎓 ระบบสร้างข้อสอบและตารางเรียน
- 🔍 ฟังก์ชันการค้นหาและสืบค้นข้อมูล
- 📱 เว็บอินเตอร์เฟสที่รองรับการแสดงผลบนมือถือ (Responsive)
- ☁️ เชื่อมต่อระบบหลังบ้านด้วย Firebase

## โครงสร้างโปรเจกต์

```
.
├── data/                    # ไฟล์ข้อมูลและคำศัพท์
│   ├── dicts/               # ไฟล์ข้อมูลพจนานุกรม (JS)
│   ├── raw/                 # ไฟล์ดิบที่ใช้ร่วมกัน (กับ thedhatu)
│   └── source_docs/         # เอกสารต้นฉบับ
├── docs/                    # เอกสารประกอบโครงการและรายงาน
├── js/                      # โมดูล JavaScript
├── scripts/                 # สคริปต์ยูทิลิตี้และระบบอัตโนมัติ
├── schedules/               # ตารางเรียน
├── fonts/                   # ไฟล์ฟอนต์
├── icons/                   # ไฟล์ไอคอน
├── *.html                   # หน้าเว็บอินเตอร์เฟส
├── server.js                # เซิร์ฟเวอร์ Express.js
├── sw.js                    # Service Worker
└── package.json             # การพึ่งพาของ Node.js (Dependencies)
```

## การติดตั้งและการใช้งาน

1. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

2. ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables):
   ```bash
   export SERVICE_ACCOUNT_PATH=/path/to/service-account-key.json
   ```

3. รันเซิร์ฟเวอร์:
   ```bash
   npm start
   ```

## สคริปต์ที่มีให้ใช้งาน

- `npm start` - เริ่มต้นเซิร์ฟเวอร์
- `npm run dpd:update` - อัปเดตข้อมูลพจนานุกรม DPD
- `npm run dpd:sync` - ซิงค์ข้อมูล DPD ไปยัง Firestore
- `npm run admin:grant` - มอบสิทธิ์แอดมินให้กับผู้ใช้

## เทคโนโลยีที่ใช้

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: Firebase/Firestore
- Deployment: Firebase Hosting

## สำหรับนักพัฒนาและอาจารย์

โครงการนี้จัดโครงสร้างเพื่อให้ง่ายต่อการนำไปใช้ซ้ำเพื่อการศึกษา:
- **ระบบค้นหาคำศัพท์:** ดูที่ `data/pali-lookup.js` สำหรับอัลกอริทึมการตัดคำและค้นหา
- **ข้อมูลดิบ:** ไฟล์คำศัพท์ใน `data/dicts/` สามารถแปลงไปใช้กับแอปพจนานุกรมอื่นได้ (SQLite/JSON)
- **เอกสารต้นฉบับ:** เอกสารใน `data/source_docs/` มีประโยชน์มากสำหรับการสร้างสื่อการสอน (Flashcards/ชีทเรียน)

## ลิขสิทธิ์

โครงการนี้เปิดเผยซอร์สโค้ดและเนื้อหาเพื่อส่งเสริมการศึกษาภาษาบาลี อนุญาตให้ผู้สนใจ นักพัฒนา และผู้ใฝ่เรียนรู้ สามารถดาวน์โหลดเนื้อหาและซอร์สโค้ดไปพัฒนาต่อยอด หรือใช้เพื่อการเรียนการสอนได้ฟรี

**ห้ามนำไปใช้ในเชิงพาณิชย์หรือเพื่อการซื้อขายโดยเด็ดขาด** (ธรรมทาน)
