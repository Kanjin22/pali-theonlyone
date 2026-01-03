import json
import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'
output_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

def fix_chunk14():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # 1. Fix อาหารเวลา (Line 410) and ภุตฺตวมฺมิกานํ (Line 411) -> Merge Key
        if '"อาหารเวลา":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            garbage_suffix = " อาหารหตฺถกอลํสาฏกตตฺถวฏฺฏกกากมาสก"
            if val.endswith(garbage_suffix):
                # Clean current line
                new_val = val.replace(garbage_suffix, "")
                new_lines.append(f'  "อาหารเวลา": "{new_val}",\n')
                
                # Check next line for ภุตฺตวมฺมิกานํ
                if i + 1 < len(lines) and '"ภุตฺตวมฺมิกานํ":' in lines[i+1]:
                    line_next = lines[i+1]
                    val_next = line_next.split('": "')[1].rstrip('",\n')
                    full_key = "อาหารหตฺถกอลํสาฏกตตฺถวฏฺฏกกากมาสกภุตฺตวมฺมิกานํ"
                    new_lines.append(f'  "{full_key}": "{val_next}",\n')
                    print("Fixed อาหารเวลา and merged key for อาหารหตฺถกอลํ...")
                    i += 2
                    continue
            else:
                new_lines.append(line)
                i += 1
                continue
            
            # If next line wasn't matched but suffix was removed (unlikely case handled)
            # Just continue normal loop if we didn't hit the continue above
            i += 1 
            continue

        # 2. Split อาฬวีวาสี, อาฬาหน ๑, อาฬาหน ๒ (Line 419)
        if '"อาฬวีวาสี":' in stripped and 'อาฬาหน ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            parts = re.split(r'( อาฬาหน ๑ | อาฬาหน ๒ )', val)
            
            if len(parts) >= 5:
                # Part 1: อาฬวีวาสี
                def1 = parts[0]
                new_lines.append(f'  "อาฬวีวาสี": "{def1}",\n')
                
                # Part 2: อาฬาหน ๑
                key2 = "อาฬาหน ๑"
                def2 = parts[2]
                new_lines.append(f'  "{key2}": "{def2}",\n')
                
                # Part 3: อาฬาหน ๒
                key3 = "อาฬาหน ๒"
                def3 = parts[4]
                new_lines.append(f'  "{key3}": "{def3}",\n')
                
                print("Split อาฬวีวาสี, อาฬาหน ๑, อาฬาหน ๒")
                i += 1
                continue

        # 3. Fix อิจฺฉํ (Line 422) - Remove artifact
        if '"อิจฺฉํ":' in stripped and 'อาหารุปจฺเฉท' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            new_val = val.replace(' อาหารุปจฺเฉท', '')
            new_lines.append(f'  "อิจฺฉํ": "{new_val}",\n')
            print("Fixed อิจฺฉํ (removed artifact)")
            i += 1
            continue

        # 4. Fix อิจฺฉา (Line 427) and ปรารถนา (Line 428)
        if '"อิจฺฉา":' in stripped:
            if i + 1 < len(lines) and '"ปรารถนา":' in lines[i+1]:
                val = line.split('": "')[1].rstrip('",\n')
                # Append "ปรารถนา" to value
                val += "ปรารถนา"
                new_lines.append(f'  "อิจฺฉา": "{val}",\n')
                print("Fixed อิจฺฉา and merged ปรารถนา")
                i += 2
                continue

        # 5. Fix อิจฺฉาโทสา (Line 429) - Truncated
        if '"อิจฺฉาโทสา":' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            if val.endswith('เป็นฉัฏฐีตุลยาธิ-'):
                val += "กรณพหุพพิหิสมาส" # Complete the word
                new_lines.append(f'  "อิจฺฉาโทสา": "{val}",\n')
                print("Fixed อิจฺฉาโทสา (completed truncated text)")
                i += 1
                continue

        # 6. Fix อิจฺฉิตการณ (Line 435) and ธารยสมาส (Line 436)
        if '"อิจฺฉิตการณ":' in stripped:
            if i + 1 < len(lines) and '"ธารยสมาส":' in lines[i+1]:
                val = line.split('": "')[1].rstrip('",\n')
                # Append "ธารยสมาส" to value
                val += "ธารยสมาส"
                new_lines.append(f'  "อิจฺฉิตการณ": "{val}",\n')
                print("Fixed อิจฺฉิตการณ and merged ธารยสมาส")
                i += 2
                continue

        # Default
        new_lines.append(line)
        i += 1

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

if __name__ == "__main__":
    fix_chunk14()
