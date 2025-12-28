import os

# Paths
header_path = r"D:\pali-dhatu-app\src\components\Header.js"
app_path = r"D:\pali-dhatu-app\src\App.js"

# 1. Update Header.js
try:
    with open(header_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Target block to remove
    target = """          <li><NavLink to="/flashcards" style={{color: "#f39c12"}}>ทบทวนธาตุ</NavLink></li>
          <li className="nav-separator">|</li>
          <li><NavLink to="/submit">เสนอแนะข้อมูล</NavLink></li>
          <li><NavLink to="/about">เกี่ยวกับ</NavLink></li>
          <li><NavLink to="/contact">ติดต่อ</NavLink></li>"""
    
    replacement = """          <li><NavLink to="/flashcards" style={{color: "#f39c12"}}>ทบทวนธาตุ</NavLink></li>"""

    if target in content:
        new_content = content.replace(target, replacement)
        with open(header_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {header_path}")
    else:
        print(f"Target not found in {header_path}. Maybe whitespace mismatch?")
        # Fallback: Try regex or looser matching if needed, but let's see if exact match works first.
        # Actually, let's print a snippet to debug if it fails.
except Exception as e:
    print(f"Error updating Header.js: {e}")

# 2. Update App.js
try:
    with open(app_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        stripped = line.strip()
        # Filter out lines containing the routes we want to remove
        if '<Route path="/submit"' in stripped:
            continue
        if '<Route path="/about"' in stripped:
            continue
        if '<Route path="/contact"' in stripped:
            continue
        new_lines.append(line)

    with open(app_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f"Updated {app_path}")

except Exception as e:
    print(f"Error updating App.js: {e}")
