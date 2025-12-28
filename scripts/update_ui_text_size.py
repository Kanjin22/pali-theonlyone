import os

# 1. Update SearchPage.js
file_path_search = r'd:\pali-dhatu-app\src\pages\SearchPage.js'
with open(file_path_search, 'r', encoding='utf-8') as f:
    content = f.read()

# Modify title with inline style for responsive font size (using clamp or vw, but let's stick to user request "reduce size")
# The user said "overflows on phone", so let's use a smaller base size or clamp.
# Current: <h1>สืบค้นธาตุบาลีและคำศัพท์</h1>
# New: <h1 style={{ fontSize: 'min(2rem, 8vw)' }}>สืบค้นธาตุบาลีและคำศัพท์</h1>
content = content.replace(
    '<h1>สืบค้นธาตุบาลีและคำศัพท์</h1>', 
    '<h1 style={{ fontSize: "min(2rem, 7vw)" }}>สืบค้นธาตุบาลีและคำศัพท์</h1>'
)

# Remove English text from Link
# Old: 🔍 ไปที่หน้าค้นหาศัพท์ (Vocabulary Search)
# New: 🔍 ไปที่หน้าค้นหาศัพท์
content = content.replace(
    '🔍 ไปที่หน้าค้นหาศัพท์ (Vocabulary Search)', 
    '🔍 ไปที่หน้าค้นหาศัพท์'
)

with open(file_path_search, 'w', encoding='utf-8') as f:
    f.write(content)

print("SearchPage.js updated.")

# 2. Update VocabSearchPage.js
file_path_vocab = r'd:\pali-dhatu-app\src\pages\VocabSearchPage.js'
with open(file_path_vocab, 'r', encoding='utf-8') as f:
    content = f.read()

# Update Title (remove English)
# Old: <h1>สืบค้นศัพท์บาลี (Vocabulary)</h1>
# New: <h1>สืบค้นศัพท์บาลี</h1>
content = content.replace(
    '<h1>สืบค้นศัพท์บาลี (Vocabulary)</h1>', 
    '<h1>สืบค้นศัพท์บาลี</h1>'
)

# Update Back Link (remove English)
# Old: ⬅ กลับไปค้นหาธาตุ (Root Search)
# New: ⬅ กลับไปค้นหาธาตุ
content = content.replace(
    '⬅ กลับไปค้นหาธาตุ (Root Search)', 
    '⬅ กลับไปค้นหาธาตุ'
)

with open(file_path_vocab, 'w', encoding='utf-8') as f:
    f.write(content)

print("VocabSearchPage.js updated.")
