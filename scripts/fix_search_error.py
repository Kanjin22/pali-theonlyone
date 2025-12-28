
import os

search_page_path = r"D:\pali-dhatu-app\src\pages\SearchPage.js"

with open(search_page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the filter logic with a more robust version
old_logic = """            const matchesText = !searchText || 
                                d.dhatu_word.toLowerCase().includes(searchLower) || 
                                (d.arth_thai && d.arth_thai.toLowerCase().includes(searchLower)) ||
                                (d.arth_pali && d.arth_pali.toLowerCase().includes(searchLower)) ||
                                (d.udaharana && d.udaharana.toLowerCase().includes(searchLower));"""

new_logic = """            const matchesText = !searchText || 
                                (d.dhatu_word && String(d.dhatu_word).toLowerCase().includes(searchLower)) || 
                                (d.arth_thai && String(d.arth_thai).toLowerCase().includes(searchLower)) ||
                                (d.arth_pali && String(d.arth_pali).toLowerCase().includes(searchLower)) ||
                                (d.udaharana && (Array.isArray(d.udaharana) ? d.udaharana.join(' ') : String(d.udaharana)).toLowerCase().includes(searchLower));"""

if old_logic in content:
    content = content.replace(old_logic, new_logic)
    print("Updated filter logic to be robust against non-string types")
else:
    # Fallback search if exact match fails (e.g. whitespace differences)
    # Let's try to match parts of it or just the udaharana line which is the culprit
    print("Exact block match failed, trying targeted replacement for udaharana line")
    
    # Target just the udaharana line
    old_line = "(d.udaharana && d.udaharana.toLowerCase().includes(searchLower));"
    new_line = "(d.udaharana && (Array.isArray(d.udaharana) ? d.udaharana.join(' ') : String(d.udaharana)).toLowerCase().includes(searchLower));"
    
    if old_line in content:
        content = content.replace(old_line, new_line)
        print("Updated udaharana check")
    else:
        print("Could not find the code block to replace.")

with open(search_page_path, 'w', encoding='utf-8') as f:
    f.write(content)
