import os

file_path = r"d:\pali-dhatu-app\src\components\DhatuDetail.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Source Mapping Colors
old_mapping = """const sourceMapping = {
    'Etipitaka': { label: 'พจนานุกรมพระไตรปิฎก', color: '#95a5a6', icon: 'fas fa-book' },
    'Tananunto': { label: 'พจนานุกรมธรรมบทภาค ๑-๘', color: '#95a5a6', icon: 'fas fa-bookmark' },
    'NewGen': { label: 'พจนานุกรมบาลี-ไทย (รุ่นใหม่)', color: '#95a5a6', icon: 'fas fa-leaf' },
    'Palidict': { label: 'Palidict.com', color: '#95a5a6', icon: 'fas fa-globe' }
};"""

new_mapping = """const sourceMapping = {
    'Etipitaka': { label: 'พจนานุกรมพระไตรปิฎก', color: '#8e44ad', icon: 'fas fa-book' },
    'Tananunto': { label: 'พจนานุกรมธรรมบทภาค ๑-๘', color: '#d35400', icon: 'fas fa-bookmark' },
    'NewGen': { label: 'พจนานุกรมบาลี-ไทย (รุ่นใหม่)', color: '#27ae60', icon: 'fas fa-leaf' },
    'Palidict': { label: 'Palidict.com', color: '#2980b9', icon: 'fas fa-globe' }
};"""

if old_mapping in content:
    content = content.replace(old_mapping, new_mapping)
    print("Updated sourceMapping colors.")
else:
    print("Could not find exact sourceMapping block. It might be formatted differently.")
    # Fallback: Replace line by line if needed, but let's trust exact match first.
    
# 2. Add inline style to dict-label
target_div = '<div className="dict-label">'
replacement_div = '<div className="dict-label" style={{ backgroundColor: group.source.color }}>'

if target_div in content:
    content = content.replace(target_div, replacement_div)
    print("Added style to dict-label.")
else:
    print("Could not find <div className=\"dict-label\">")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
