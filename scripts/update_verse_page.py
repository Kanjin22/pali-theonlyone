
import os

VERSE_DETAIL_PATH = r"D:\pali-dhatu-app\src\pages\VerseDetailPage.js"

with open(VERSE_DETAIL_PATH, "r", encoding="utf-8") as f:
    content = f.read()

old_str = '<h2>ธาตุในคาถาที่ {id}</h2>'
new_str = '<h2 className="nowrap-title">ธาตุในคาถาที่ {id}</h2>'

if old_str in content:
    content = content.replace(old_str, new_str)
    with open(VERSE_DETAIL_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("VerseDetailPage updated.")
else:
    print("Target string not found.")
