import os

file_path = r'd:\pali-dhatu-app\src\pages\SearchPage.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Filter Logic (Remove arth_pali and udaharana)
old_filter = """            const matchesText = !searchText || 
                                (d.dhatu_word && String(d.dhatu_word).toLowerCase().includes(searchLower)) || 
                                (d.arth_thai && String(d.arth_thai).toLowerCase().includes(searchLower)) ||
                                (d.arth_pali && String(d.arth_pali).toLowerCase().includes(searchLower)) ||
                                (d.udaharana && (Array.isArray(d.udaharana) ? d.udaharana.join(' ') : String(d.udaharana)).toLowerCase().includes(searchLower));"""

new_filter = """            const matchesText = !searchText || 
                                (d.dhatu_word && String(d.dhatu_word).toLowerCase().includes(searchLower)) || 
                                (d.arth_thai && String(d.arth_thai).toLowerCase().includes(searchLower));"""

# Try to find a substring if exact match fails (due to whitespace)
if old_filter not in content:
    # Construct a simpler regex or just look for the block
    start_marker = "const matchesText = !searchText ||"
    end_marker = "return matchesGroup && matchesText;"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx != -1 and end_idx != -1:
        # Replace the chunk
        content = content[:start_idx] + new_filter.strip() + "\n            " + content[end_idx:]
        print("Updated filter logic (via index finding).")
    else:
        print("Could not find filter logic block.")
else:
    content = content.replace(old_filter, new_filter)
    print("Updated filter logic (exact match).")

# 2. Update Placeholder
old_placeholder = 'placeholder="ค้นหาชื่อธาตุ, คำแปล หรือศัพท์ในอุทาหรณ์..."'
new_placeholder = 'placeholder="ค้นหาชื่อธาตุ หรือคำแปล..."'
content = content.replace(old_placeholder, new_placeholder)

# 3. Add Link to Vocab Search
# Insert it after <h1>
if '<h1>สืบค้นธาตุบาลี</h1>' in content and 'Link to="/search-vocab"' not in content:
    content = content.replace(
        '<h1>สืบค้นธาตุบาลี</h1>',
        '<h1>สืบค้นธาตุบาลี</h1>\n                <div style={{ marginBottom: "15px" }}><Link to="/search-vocab" className="vocab-search-link" style={{ color: "#fff", textDecoration: "underline" }}>🔍 ไปที่หน้าค้นหาศัพท์ (Vocabulary Search)</Link></div>'
    )

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SearchPage.js updated.")
