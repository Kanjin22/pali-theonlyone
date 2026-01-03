import json
import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'
output_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

def fix_chunk16():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # 1. Line 475: อิทฺธานุภาว -> Split อิทฺธิ ๑, ๒
        if '"อิทฺธานุภาว":' in stripped and 'อิทฺธิ ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            parts = re.split(r'( อิทฺธิ ๑ | อิทฺธิ ๒ )', val)
            
            if len(parts) >= 5:
                new_lines.append(f'  "อิทฺธานุภาว": "{parts[0]}",\n')
                new_lines.append(f'  "อิทฺธิ ๑": "{parts[2]}",\n')
                new_lines.append(f'  "อิทฺธิ ๒": "{parts[4]}",\n')
                print("Split อิทฺธานุภาว, อิทฺธิ ๑/๒")
                i += 1
                continue

        # 2. Line 476: อิทฺธิปตฺต -> Split อิทฺธิปาท ๑, ๒
        if '"อิทฺธิปตฺต":' in stripped and 'อิทฺธิปาท ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            parts = re.split(r'( อิทฺธิปาท ๑ | อิทฺธิปาท ๒ )', val)
            
            if len(parts) >= 5:
                new_lines.append(f'  "อิทฺธิปตฺต": "{parts[0]}",\n')
                new_lines.append(f'  "อิทฺธิปาท ๑": "{parts[2]}",\n')
                new_lines.append(f'  "อิทฺธิปาท ๒": "{parts[4]}",\n')
                print("Split อิทฺธิปตฺต, อิทฺธิปาท ๑/๒")
                i += 1
                continue

        # 3. Line 478: อิทฺธิมนฺตานํ -> Append อิทฺธิมนฺตุ
        if '"อิทฺธิมนฺตานํ":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('ได้รูปเป็น'):
                val += " อิทฺธิมนฺตุ"
                new_lines.append(f'  "อิทฺธิมนฺตานํ": "{val}",\n')
                print("Fixed อิทฺธิมนฺตานํ")
                i += 1
                continue

        # 4. Line 482: อิธโลกตฺตภาว -> Merge วิภัตติ] (Line 483)
        if '"อิธโลกตฺตภาว":' in stripped:
            if i + 1 < len(lines) and '"วิภัตติ]":' in lines[i+1]:
                val = line.split('": "')[1].rstrip('",\n')
                line_next = lines[i+1]
                val_next = line_next.split('": "')[1].rstrip('",\n')
                
                # val ends with "สัตตมี"
                # val_next starts with "ส. ตัป. วิ. ..."
                full_val = val + " " + val_next
                new_lines.append(f'  "อิธโลกตฺตภาว": "{full_val}",\n')
                print("Merged วิภัตติ] into อิธโลกตฺตภาว")
                i += 2
                continue

        # 5. Line 488: อิธโลเก -> Fix truncation
        if '"อิธโลเก":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('เป็นวิเสสนบุพพบท'):
                val += " กัมมธารยสมาส"
                new_lines.append(f'  "อิธโลเก": "{val}",\n')
                print("Fixed อิธโลเก")
                i += 1
                continue

        # 6. Line 492: อินฺทโคปกวณฺณํ -> Fix truncation
        if '"อินฺทโคปกวณฺณํ":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('เป็นฉัฏฐีอุปมา'):
                val += "พหุพพิหิสมาส"
                new_lines.append(f'  "อินฺทโคปกวณฺณํ": "{val}",\n')
                print("Fixed อินฺทโคปกวณฺณํ")
                i += 1
                continue

        # 7. Line 493: อินฺทปตฺตนคร -> Fix truncation
        if '"อินฺทปตฺตนคร":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('เป็นวิเสสนบุพพบท'):
                val += " กัมมธารยสมาส"
                new_lines.append(f'  "อินฺทปตฺตนคร": "{val}",\n')
                print("Fixed อินฺทปตฺตนคร")
                i += 1
                continue

        # 8. Line 494: อินฺทสาลคุหา -> Fix truncation
        if '"อินฺทสาลคุหา":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('กัมมธารย'):
                val += "สมาส"
                new_lines.append(f'  "อินฺทสาลคุหา": "{val}",\n')
                print("Fixed อินฺทสาลคุหา")
                i += 1
                continue

        # 9. Line 495: อินฺทฺริย -> Remove artifact
        if '"อินฺทฺริย":' in stripped and 'อิธโลกปรโลกตฺถ' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            val = val.replace(' อิธโลกปรโลกตฺถ', '')
            new_lines.append(f'  "อินฺทฺริย": "{val}",\n')
            print("Fixed อินฺทฺริย")
            i += 1
            continue

        # 10. Line 497: อินฺทฺริยทมน -> Split อินฺทฺริยสํวร ๑, ๒
        if '"อินฺทฺริยทมน":' in stripped and 'อินฺทฺริยสํวร ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            parts = re.split(r'( อินฺทฺริยสํวร ๑ | อินฺทฺริยสํวร ๒ )', val)
            
            if len(parts) >= 5:
                new_lines.append(f'  "อินฺทฺริยทมน": "{parts[0]}",\n')
                new_lines.append(f'  "อินฺทฺริยสํวร ๑": "{parts[2]}",\n')
                new_lines.append(f'  "อินฺทฺริยสํวร ๒": "{parts[4]}",\n')
                print("Split อินฺทฺริยทมน, อินฺทฺริยสํวร ๑/๒")
                i += 1
                continue

        new_lines.append(line)
        i += 1

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

if __name__ == "__main__":
    fix_chunk16()
