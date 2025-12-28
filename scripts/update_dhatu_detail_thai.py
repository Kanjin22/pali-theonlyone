import os

file_path = r'd:\pali-dhatu-app\src\components\DhatuDetail.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_str = '<span key={index} className="derived-word-tag">{word}</span>'
new_str = '<span key={index} className="derived-word-tag">{PaliScript.romanToThai(word)}</span>'

if old_str in content:
    new_content = content.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated DhatuDetail.js successfully.")
else:
    print("Target string not found in DhatuDetail.js")
