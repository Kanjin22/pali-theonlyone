import json
import re

file_path = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip_next = False

for i, line in enumerate(lines):
    if skip_next:
        skip_next = False
        continue

    stripped = line.strip()

    # 1. Add comment before "อาคต"
    if '"อาคต":' in line and 'อาคตตฺต' not in line: # Ensure exact match key
        new_lines.append('  // --- Page Chunk 4 (Start) ---\n')
        new_lines.append(line)
        print("Found อาคต")
        continue

    # 2. Fix "อาคตาคต" (Truncated)
    if '"อาคตาคต":' in line:
        print("Found อาคตาคต")
        new_line = '  "อาคตาคต": "ว. ผู้ทั้งมาแล้วทั้งมาแล้ว ปุ. แจก เหมือน ปุริส เช่น จ. พหุ. อาคตาคตานํ (ชนานํ) แก่ชน ท. ผู้ทั้งมาแล้วทั้งมาแล้ว เป็นวิเสสโนภยบท กัมมธารยสมาส วิ. ว่า อาคตา จ อาคตา จ = อาคตาคตา (ชนา) ชน ท. มาแล้วด้วย มาแล้วด้วย ชื่อว่าผู้ทั้งมาแล้วทั้งมาแล้ว",\n'
        new_lines.append(new_line)
        continue

    # 3. Fix "อาคตภาว" and remove garbage "สมาส" line
    if '"อาคตภาว":' in line:
        print("Found อาคตภาว")
        # Current: "... เป็นฉัฏฐีตัปปุริส"
        # Correct: "... เป็นฉัฏฐีตัปปุริส สมาส วิ.ว่า อาคตสฺส ภาโว = อาคตภาโว"
        # We replace the entire line with correct content
        new_line = '  "อาคตภาว": "น., ปุ. ความที่แห่ง... เป็นผู้มาแล้ว ปุ. แจกเหมือน ปุริส เช่น ทุ. เอก. อาคตภาวํ ซึ่งความที่แห่ง... เป็นผู้มาแล้ว เป็นฉัฏฐีตัปปุริสสมาส วิ. ว่า อาคตสฺส ภาโว = อาคตภาโว",\n'
        new_lines.append(new_line)
        
        # Check if next line is garbage "สมาส"
        if i + 1 < len(lines) and '"สมาส":' in lines[i+1]:
            print("Skipping garbage สมาส line")
            skip_next = True
        continue

    # 4. Fix "อาคนฺตพฺพํ" (Split merged entries)
    if '"อาคนฺตพฺพํ":' in line:
        print("Found อาคนฺตพฺพํ")
        # Split into 3 lines
        # 1. อาคนฺตพฺพํ
        line1 = '  "อาคนฺตพฺพํ": "ก. (เช่น อยฺเยน อันพระผู้เป็นเจ้า) พึงมา อา บทหน้า + คม ธาตุ ในความ ไป มี อา อยู่หน้า แปลว่า มา + ตพฺพ ปัจจัย แปลงที่สุดธาตุ เป็น นฺ. ได้รูปเป็น อาคนฺตพฺพ ลง สิ ปฐมาวิภัตติ ฝ่ายเอกวจนะ แปลง อ กับ สิ เป็น อํ สำเร็จรูปเป็น อาคนฺตพฺพํ สัมพันธ์: อยฺเยน อนภิหิตกตฺตา ใน อาคนฺตพฺพํ ๆ กิตบท ภาววาจก บางครั้งใช้ อาคนฺตพฺพํ เป็นตัวประธานก็มี เช่น... อาทาย อาคนฺตพฺพํ ภเวยฺย = อ. อันอันท่าน ถือเอา.... พึงมา พึงมี [ธ. ๘: โชติกตฺเถรวตฺถุ หน้า ๑๕๙] สัมพันธ์: ตยา อนภิหิตกตฺตา ใน อาคนฺตพฺพํ อาทาย สมานกาลกิริยา ใน อาคนฺตพฺพํ ๆ สยกตฺตา ใน ภเวยฺย ๆ อาขฺยาตบท กตฺตุวาจก",\n'
        # 2. อาคนฺตุก ๑
        line2 = '  "อาคนฺตุก ๑": "น., ปุ. อาคันตุกะ แจกเหมือน ปุริส เช่น อา. เอก อาคนฺตุก ดูก่อนอาคันตุกะ",\n'
        # 3. อาคนฺตุก ๒
        line3 = '  "อาคนฺตุก ๒": "ว. ผู้จรมา ปุ. แจกเหมือน ปุริส เช่น ป. เอก. อาคนฺตุโก (ภิกฺขุ) อ. ภิกษุ ผู้จรมา คำว่า อาคนฺตุก มาจาก อา บทหน้า + คม ธาตุ ใน ความไป มี อา อยู่หน้า แปลว่า มา + ตุก ปัจจัย ในนามกิตก์ (นอกแบบ) แปลง ม ที่สุดธาตุ เป็น นฺ ได้รูปเป็น อาคนฺตุก แปลว่า ผู้จรมา เป็น",\n'
        
        new_lines.append(line1)
        new_lines.append(line2)
        new_lines.append(line3)
        continue

    # 5. Fix "อาคมนกาล" (Remove garbage "อาคนฺตุก ๑")
    if '"อาคมนกาล":' in line:
        print("Found อาคมนกาล")
        new_line = line.replace('อาคนฺตุก ๑ ', '')
        new_lines.append(new_line)
        continue

    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Updates applied successfully.")
