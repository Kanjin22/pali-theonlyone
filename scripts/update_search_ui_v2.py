
import os

search_page_path = r"D:\pali-dhatu-app\src\pages\SearchPage.js"

with open(search_page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove "(Affix Group)"
if "(Affix Group)" in content:
    content = content.replace("หมวดธาตุ (Affix Group)", "หมวดธาตุ")
    print("Removed (Affix Group) from label")

# 2. Style search-results-info
# We can add inline styles or just rely on CSS class update.
# Let's check the JSX structure.
# <div className="search-results-info">
#    พบ {filteredData.length} รายการ
# </div>
# I will modify App.css for this class, so no JSX change needed here for styling, 
# UNLESS I want to move it inside search-hero.
# The user said: "ให้อยู่กึ่งกลางติดบล็อกค้นหา" (Center and stick to search block).
# Currently it's outside search-hero.
# If I move it INSIDE search-hero, it will naturally stick better.

if '<div className="search-results-info">' in content and '<div className="search-hero">' in content:
    # Find the closing tag of search-hero
    # The structure is:
    # <div className="search-hero">
    #    ...
    # </div>
    # <div className="search-results-info">...</div>
    
    # Let's try to move it inside.
    # First, locate the search-results-info block
    start_info = content.find('<div className="search-results-info">')
    end_info = content.find('</div>', start_info) + 6
    info_block = content[start_info:end_info]
    
    # Remove it from current location
    content = content[:start_info] + content[end_info:]
    
    # Insert it before the closing div of search-hero
    # We need to find the closing div of search-hero.
    # Search hero starts at...
    start_hero = content.find('<div className="search-hero">')
    # This is risky with regex or simple find because of nested divs.
    # But wait, search-hero contains search-controls.
    # search-controls contains control-group.
    # Let's look for the end of search-controls.
    
    end_controls_tag = "</div>\n            </div>" # This is likely the end of search-controls AND search-hero based on indentation in previous Read output.
    
    # Let's try to insert it after search-controls closing div, but before search-hero closing div.
    # In the file:
    #                </div>
    #            </div>
    #
    #            <div className="search-results-info">
    
    # It seems I can just replace the sequence.
    pass

with open(search_page_path, 'w', encoding='utf-8') as f:
    f.write(content)
