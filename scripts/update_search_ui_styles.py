import os

file_path = r'd:\pali-dhatu-app\src\pages\SearchPage.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix the Vocab Search Link (make it visible and distinct)
# Old: <Link to="/search-vocab" className="vocab-search-link" style={{ color: "#fff", textDecoration: "underline" }}>🔍 ไปที่หน้าค้นหาศัพท์ (Vocabulary Search)</Link>
# New: Styled as a secondary button/box
old_link = '<div style={{ marginBottom: "15px" }}><Link to="/search-vocab" className="vocab-search-link" style={{ color: "#fff", textDecoration: "underline" }}>🔍 ไปที่หน้าค้นหาศัพท์ (Vocabulary Search)</Link></div>'

new_link = """<div style={{ marginBottom: "20px" }}>
                    <Link to="/search-vocab" className="vocab-search-link" style={{ 
                        display: 'inline-block',
                        backgroundColor: '#e67e22', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '30px', 
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s'
                    }}>
                        🔍 ไปที่หน้าค้นหาศัพท์ (Vocabulary Search)
                    </Link>
                </div>"""

if old_link in content:
    content = content.replace(old_link, new_link)
else:
    # Fallback: try to find the link by partial string if exact match fails
    # (The previous script wrote it, so it should match, but whitespace might vary slightly if auto-formatted)
    print("Exact link match failed, trying partial replacement...")
    # This regex-like replace is risky without regex, but let's try to match the core part
    search_str = 'to="/search-vocab" className="vocab-search-link"'
    if search_str in content:
        # We need to replace the whole div wrapper if possible, or just the style
        # Let's try to locate the line and replace it
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if search_str in line:
                lines[i] = new_link
                content = '\n'.join(lines)
                break

# 2. Update Search Input Background to be distinct
# We look for the input we added/modified in the last step
input_search_str = 'className="search-input"'
# We want to add style={{ flex: 1, backgroundColor: '#f0f2f5' }} 
# Currently it has style={{ flex: 1 }}
old_style = 'style={{ flex: 1 }}'
new_style = "style={{ flex: 1, backgroundColor: '#f8f9fa', border: '2px solid #bdc3c7' }}"

# Be careful not to replace other inputs if any (there's only one search-input in this file usually)
# But wait, I just wrote the file with `style={{ flex: 1 }}` in the previous step.
if old_style in content:
    content = content.replace(old_style, new_style)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SearchPage.js styles updated.")
