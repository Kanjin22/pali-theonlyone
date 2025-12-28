import os

file_path = r'd:\pali-dhatu-app\src\App.css'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_css = '''/* Derived Words Section */
.derived-words-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.derived-word-tag {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.95rem;
  border: 1px solid #c8e6c9;
}'''

new_css = '''/* Derived Words Section (List with Meanings) */
.derived-words-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
}

.derived-word-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #3498db;
}

.derived-word-tag {
  background-color: #e3f2fd;
  color: #1565c0;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Sarabun', sans-serif;
  font-weight: bold;
  white-space: nowrap;
  min-width: 80px;
  text-align: center;
}

.derived-word-meaning {
  font-family: 'Sarabun', sans-serif;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
}

.derived-word-meaning.text-muted {
    color: #999;
}'''

if old_css in content:
    content = content.replace(old_css, new_css)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced CSS in App.css")
else:
    print("Could not find old CSS block to replace.")
