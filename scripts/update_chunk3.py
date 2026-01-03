import json
import os

file_path = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    stripped = line.strip()
    
    # 1. Add comment before "อาคจฺฉติ"
    if stripped.startswith('"อาคจฺฉติ":'):
        new_lines.append('  // --- Page Chunk 3 (Start) ---\n')
        new_lines.append(line)
        continue

    # 2. Fix "อาคจฺฉตุ" merged entry
    if stripped.startswith('"อาคจฺฉตุ":'):
        # Construct the new 3 lines
        line1 = '  "อาคจฺฉตุ": "ก. (เช่น ภิกฺขุสงฺโฆ อ. หมู่แห่งภิกษุ) จงมา, ขอจงมา อา บทหน้า + คม ธาตุ ใน ความไป มี อา อยู่หน้า แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + ตุ ปัญจมีวิภัตติ แปลง คม ธาตุ เป็น คจฺฉ สำเร็จรูปเป็น อาคจฺฉตุ",\n'
        line2 = '  "อาคจฺฉถ ๑": "ก. (ตุมฺเห อ. ท่าน ท.) ย่อมมา อา บทหน้า + คม ธาตุ ในความไป มี อา อยู่หน้า แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + ถ วัตตมานาวิภัตติ แปลง คม ธาตุ เป็น คจฺฉ สำเร็จรูปเป็น อาคจฺฉถ",\n'
        line3 = '  "อาคจฺฉถ ๒": "ก. (ตุมฺเห อ. ท่าน ท.) จงมา อา บทหน้า + คม ธาตุ ในความไป มี อา อยู่หน้า แปลว่า มา + อ ปัจจัย ในกัตตุวาจก + ถ ปัญจมีวิภัตติ แปลง คม ธาตุ เป็น คจฺฉ สำเร็จรูปเป็น อาคจฺฉถ",\n'
        new_lines.append(line1)
        new_lines.append(line2)
        new_lines.append(line3)
        continue

    # 3. Fix "อาคญฺฉิ" value (remove "อาคจฺฉติ " inside the value)
    if stripped.startswith('"อาคญฺฉิ":'):
        # Original: ... แปลว่า อาคจฺฉติ มา ...
        # Target: ... แปลว่า มา ...
        new_line = line.replace('แปลว่า อาคจฺฉติ มา', 'แปลว่า มา')
        new_lines.append(new_line)
        continue

    # Keep other lines as is
    new_lines.append(line)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Updates applied successfully.")
