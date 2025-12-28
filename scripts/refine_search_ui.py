
import os

search_page_path = r"D:\pali-dhatu-app\src\pages\SearchPage.js"

with open(search_page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the parens issue: Only show parens if arth_pali exists
old_span = """<span className="pali-meaning">({dhatu.arth_pali})</span>"""
new_span = """{dhatu.arth_pali ? <span className="pali-meaning">({dhatu.arth_pali})</span> : null}"""

if old_span in content:
    content = content.replace(old_span, new_span)
    print("Fixed empty parens issue.")
    
    with open(search_page_path, 'w', encoding='utf-8') as f:
        f.write(content)
else:
    print("Pattern not found (maybe already fixed or different format).")
