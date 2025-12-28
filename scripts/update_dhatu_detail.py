import os

file_path = r"d:\pali-dhatu-app\src\components\DhatuDetail.js"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Imports
old_import = "import LoadingSpinner from '../components/LoadingSpinner';"
new_import = "import LoadingSpinner from '../components/LoadingSpinner';\nimport vocabRootsDPDDerived from '../data/vocab-roots-dpd-derived';\nimport PaliScript from '../utils/paliScript';"

if "vocabRootsDPDDerived" not in content:
    content = content.replace(old_import, new_import)

# 2. Add Logic
old_logic = "const groupCode = dhatu ? getGroupCode(dhatu.mawat_dhatu) : null;"
new_logic = "const groupCode = dhatu ? getGroupCode(dhatu.mawat_dhatu) : null;\n  const derivedWords = dhatu ? vocabRootsDPDDerived[PaliScript.thaiToRoman(dhatu.dhatu_word)] : null;"

if "derivedWords" not in content:
    content = content.replace(old_logic, new_logic)

# 3. Add JSX
old_jsx = """            {/* School Examples Section */}
            {dhatu.udaharana_school && (
                <div className="detail-card full-width" style={{ backgroundColor: '#fff8e1', borderLeft: '5px solid #f39c12' }}>
                    <h2 style={{ color: '#d35400' }}>อุทาหรณ์จากแบบเรียน (บาลีสนามหลวง)</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{dhatu.udaharana_school}</p>
                </div>
            )}

            <div className="detail-card full-width">"""

new_jsx = """            {/* School Examples Section */}
            {dhatu.udaharana_school && (
                <div className="detail-card full-width" style={{ backgroundColor: '#fff8e1', borderLeft: '5px solid #f39c12' }}>
                    <h2 style={{ color: '#d35400' }}>อุทาหรณ์จากแบบเรียน (บาลีสนามหลวง)</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{dhatu.udaharana_school}</p>
                </div>
            )}

            {/* Derived Words Section (DPD) */}
            {derivedWords && derivedWords.length > 0 && (
              <div className="detail-card full-width">
                <h2>ศัพท์ที่สร้างจากธาตุนี้ (DPD)</h2>
                <div className="derived-words-list">
                  {derivedWords.map((word, index) => (
                    <span key={index} className="derived-word-tag">{word}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-card full-width">"""

if "Derived Words Section" not in content:
    content = content.replace(old_jsx, new_jsx)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated DhatuDetail.js")
