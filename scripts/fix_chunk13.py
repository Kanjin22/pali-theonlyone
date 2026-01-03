import json
import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'
output_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

def fix_chunk13():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # 1. Fix อาสนฺนมรณ (Line ~354) and remove จตุตถี... artifact (Line ~355)
        if '"อาสนฺนมรณ":' in stripped:
            if i + 1 < len(lines) and '"จตุตถีตุลยาธิกรณพหุพพิหิสมาส":' in lines[i+1]:
                # Update value of อาสนฺนมรณ
                val = line.split('": "')[1].rstrip('",\n')
                if val.endswith('เป็น'):
                    val += "ฉัฏฐีตุลยาธิกรณพหุพพิหิสมาส"
                
                new_lines.append(f'  "อาสนฺนมรณ": "{val}",\n')
                
                print("Fixed อาสนฺนมรณ and removed จตุตถีตุลยาธิกรณพหุพพิหิสมาส artifact")
                i += 2 # Skip current and next line
                continue
            else:
                # Just in case the next line is not what we expect, check strictly
                pass

        # 2. Fix อาสาฬฺหปุณฺณมายํ (Line ~364) and remove สัตตมี... artifact (Line ~365)
        if '"อาสาฬฺหปุณฺณมายํ":' in stripped:
            if i + 1 < len(lines) and '"สัตตมีตัปปุริสสมาส":' in lines[i+1]:
                val = line.split('": "')[1].rstrip('",\n')
                if val.endswith('เป็น'):
                    val += "สัตตมีตัปปุริสสมาส"
                
                new_lines.append(f'  "อาสาฬฺหปุณฺณมายํ": "{val}",\n')
                
                print("Fixed อาสาฬฺหปุณฺณมายํ and removed สัตตมีตัปปุริสสมาส artifact")
                i += 2 # Skip current and next line
                continue

        # 3. Fix อาสีนํ (Line ~375) -> Split into อาสีนํ, อาสีวิส ๑, อาสีวิส ๒
        if '"อาสีนํ":' in stripped and 'อาสีวิส ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            
            # Split
            parts = re.split(r'( อาสีวิส ๑ | อาสีวิส ๒ )', val)
            
            if len(parts) >= 5:
                # Part 1: อาสีนํ
                def1 = parts[0]
                new_lines.append(f'  "อาสีนํ": "{def1}",\n')
                
                # Part 2: อาสีวิส ๑
                key2 = "อาสีวิส ๑"
                def2 = parts[2]
                new_lines.append(f'  "{key2}": "{def2}",\n')
                
                # Part 3: อาสีวิส ๒
                key3 = "อาสีวิส ๒"
                def3 = parts[4]
                new_lines.append(f'  "{key3}": "{def3}",\n')
                
                print("Split อาสีนํ, อาสีวิส ๑, อาสีวิส ๒")
                i += 1
                continue

        # Default: keep line
        new_lines.append(line)
        i += 1

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

if __name__ == "__main__":
    fix_chunk13()
