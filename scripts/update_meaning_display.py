import os

# 1. Update DhatuDetail.js
file_path_detail = r'd:\pali-dhatu-app\src\components\DhatuDetail.js'
with open(file_path_detail, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the inner part of derived-word-item to support block display
old_jsx = """                        <div key={index} className="derived-word-item">
                            <span className="derived-word-tag">{thaiWord}</span>
                            {meaning ? (
                                <span className="derived-word-meaning">{meaning}</span>
                            ) : (
                                <span className="derived-word-meaning text-muted">-</span>
                            )}
                        </div>"""

new_jsx = """                        <div key={index} className="derived-word-item">
                            <span className="derived-word-tag">{thaiWord}</span>
                            {meaning ? (
                                <div className="derived-word-meaning">{meaning}</div>
                            ) : (
                                <div className="derived-word-meaning text-muted">-</div>
                            )}
                        </div>"""

if old_jsx in content:
    content = content.replace(old_jsx, new_jsx)
else:
    # Fallback if indentation differs slightly, try regex or simpler replacement
    content = content.replace('<span className="derived-word-meaning">{meaning}</span>', '<div className="derived-word-meaning">{meaning}</div>')
    content = content.replace('<span className="derived-word-meaning text-muted">-</span>', '<div className="derived-word-meaning text-muted">-</div>')

with open(file_path_detail, 'w', encoding='utf-8') as f:
    f.write(content)
print("DhatuDetail.js updated.")

# 2. Update VocabSearchPage.js
file_path_search = r'd:\pali-dhatu-app\src\pages\VocabSearchPage.js'
with open(file_path_search, 'r', encoding='utf-8') as f:
    content = f.read()

# Update the display in VocabSearchPage
old_p = """<p style={{ margin: 0, color: '#555', fontFamily: 'Sarabun' }}>{item.meaning || '-'}</p>"""
new_div = """<div style={{ margin: 0, color: '#555', fontFamily: 'Sarabun', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{item.meaning || '-'}</div>"""

content = content.replace(old_p, new_div)

with open(file_path_search, 'w', encoding='utf-8') as f:
    f.write(content)
print("VocabSearchPage.js updated.")

# 3. Update App.css
file_path_css = r'd:\pali-dhatu-app\src\App.css'
css_append = """
/* Derived Words Styles - Updated for Full Meanings */
.derived-word-item {
  display: block;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 4px solid #3498db;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.derived-word-tag {
  font-weight: bold;
  color: #2980b9;
  font-size: 1.2rem;
  display: block;
  margin-bottom: 8px;
  font-family: 'Sarabun', sans-serif;
}

.derived-word-meaning {
  color: #444;
  font-size: 1rem;
  white-space: pre-wrap;
  line-height: 1.6;
  font-family: 'Sarabun', sans-serif;
}
"""

with open(file_path_css, 'a', encoding='utf-8') as f:
    f.write(css_append)
print("App.css updated.")
