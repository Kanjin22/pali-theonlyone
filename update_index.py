
import os

path = 'd:/pali-theonlyone/index.html'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

# Look for the block
for i, line in enumerate(lines):
    # Line 645 (index 644) should be <script>
    if i == 644 and '<script>' in line:
        start_idx = i
    # Line 2195 (index 2194) should be </script>
    if i == 2194 and '</script>' in line:
        end_idx = i

print(f"Start index: {start_idx}")
if start_idx != -1:
    print(f"Line {start_idx+1}: {lines[start_idx].strip()}")

print(f"End index: {end_idx}")
if end_idx != -1:
    print(f"Line {end_idx+1}: {lines[end_idx].strip()}")

# Double check context
if start_idx != -1:
    print(f"Line {start_idx+2} (should be initTheme): {lines[start_idx+1].strip()}") # +1 because next line

if end_idx != -1:
    print(f"Line {end_idx} (should be setTimeout): {lines[end_idx-1].strip()}") # -1 because prev line

if start_idx != -1 and end_idx != -1 and start_idx < end_idx:
    new_content = [
        '    <script src="js/utils.js"></script>\n',
        '    <script src="js/firebase_config.js"></script>\n',
        '    <script src="js/auth.js"></script>\n',
        '    <script src="js/dashboard.js"></script>\n',
        '    <script src="js/schedule.js"></script>\n',
        '    <script>\n',
        '        setTimeout(checkSimpleLogin, 500);\n',
        '    </script>\n'
    ]
    
    final_lines = lines[:start_idx] + new_content + lines[end_idx+1:]
    
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
    print("Successfully updated index.html")
else:
    print("Aborting: Start or End index not found or invalid")
