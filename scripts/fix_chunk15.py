import json
import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'
output_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

def fix_chunk15():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # 1. Line 451: อิฏฺฐกา -> Remove artifact, split อิฏฺฐารมฺมณ ๑, ๒
        if '"อิฏฺฐกา":' in stripped and 'อิฏฺฐารมฺมณ ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            
            # Remove artifact " อิจฺฉิตฏฺฐาน"
            val = val.replace(' อิจฺฉิตฏฺฐาน', '')
            
            # Split
            parts = re.split(r'( อิฏฺฐารมฺมณ ๑ | อิฏฺฐารมฺมณ ๒ )', val)
            
            if len(parts) >= 5:
                # Part 1: อิฏฺฐกา
                def1 = parts[0]
                new_lines.append(f'  "อิฏฺฐกา": "{def1}",\n')
                
                # Part 2: อิฏฺฐารมฺมณ ๑
                key2 = "อิฏฺฐารมฺมณ ๑"
                def2 = parts[2]
                new_lines.append(f'  "{key2}": "{def2}",\n')
                
                # Part 3: อิฏฺฐารมฺมณ ๒
                key3 = "อิฏฺฐารมฺมณ ๒"
                def3 = parts[4]
                new_lines.append(f'  "{key3}": "{def3}",\n')
                
                print("Fixed อิฏฺฐกา and split อิฏฺฐารมฺมณ ๑/๒")
                i += 1
                continue

        # 2. Line 455: อิติ -> Split อิตฺถํ ๑, ๒
        if '"อิติ":' in stripped and 'อิตฺถํ ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            parts = re.split(r'( อิตฺถํ ๑ | อิตฺถํ ๒ )', val)
            
            if len(parts) >= 5:
                new_lines.append(f'  "อิติ": "{parts[0]}",\n')
                new_lines.append(f'  "อิตฺถํ ๑": "{parts[2]}",\n')
                new_lines.append(f'  "อิตฺถํ ๒": "{parts[4]}",\n')
                print("Split อิติ, อิตฺถํ ๑/๒")
                i += 1
                continue

        # 3. Line 456: อิตฺถนฺนาม -> Fix truncation
        if '"อิตฺถนฺนาม":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('เป็นฉัฏฐีตุลยาธิกรณ'):
                val += "พหุพพิหิสมาส"
                new_lines.append(f'  "อิตฺถนฺนาม": "{val}",\n')
                print("Fixed อิตฺถนฺนาม")
                i += 1
                continue

        # 4. Line 457: อิตฺถี -> Merge กัตตุสาธนะ (Line 458)
        if '"อิตฺถี":' in stripped:
            if i + 1 < len(lines) and '"กัตตุสาธนะ":' in lines[i+1]:
                val = line.split('": "')[1].rstrip('",\n')
                line_next = lines[i+1]
                val_next = line_next.split('": "')[1].rstrip('",\n')
                
                # Append val_next to val. Note: val_next starts with "วิ. ว่า..."
                # val ends with "เป็นกัตตุรูป"
                full_val = val + " กัตตุสาธนะ " + val_next
                new_lines.append(f'  "อิตฺถี": "{full_val}",\n')
                print("Merged กัตตุสาธนะ into อิตฺถี")
                i += 2
                continue

        # 5. Line 462: อิตฺถีรติ -> Append ภาวสาธนะ
        if '"อิตฺถีรติ":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('เป็นภาวรูป'):
                val += " ภาวสาธนะ"
                new_lines.append(f'  "อิตฺถีรติ": "{val}",\n')
                print("Fixed อิตฺถีรติ")
                i += 1
                continue

        # 6. Line 463: อิตฺถีรูป -> Fix truncation and remove Line 464 (Artifact)
        if '"อิตฺถีรูป":' in stripped:
            if i + 1 < len(lines) and '"ตัปปุริสสมาส":' in lines[i+1]:
                val = line.split('": "')[1].rstrip('",\n')
                # Ignore content of Line 464 (Artifact from เหฏฺฐา)
                # Just complete the word
                if val.endswith('เป็น ฉัฏฐี'):
                    val += "ตัปปุริสสมาส"
                
                new_lines.append(f'  "อิตฺถีรูป": "{val}",\n')
                print("Fixed อิตฺถีรูป and removed artifact line")
                i += 2
                continue

        # 7. Line 467: อิตฺถีสทฺท -> Fix truncation
        if '"อิตฺถีสทฺท":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('เป็น'):
                val += "ฉัฏฐีตัปปุริสสมาส"
                new_lines.append(f'  "อิตฺถีสทฺท": "{val}",\n')
                print("Fixed อิตฺถีสทฺท")
                i += 1
                continue

        # 8. Line 468: อิตฺถีสมีป -> Split อิโต ๑, ๒
        if '"อิตฺถีสมีป":' in stripped and 'อิโต ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            parts = re.split(r'( อิโต ๑ | อิโต ๒ )', val)
            
            if len(parts) >= 5:
                new_lines.append(f'  "อิตฺถีสมีป": "{parts[0]}",\n')
                new_lines.append(f'  "อิโต ๑": "{parts[2]}",\n')
                new_lines.append(f'  "อิโต ๒": "{parts[4]}",\n')
                print("Split อิตฺถีสมีป, อิโต ๑/๒")
                i += 1
                continue

        new_lines.append(line)
        i += 1

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

if __name__ == "__main__":
    fix_chunk15()
