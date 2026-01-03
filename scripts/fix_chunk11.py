import json
import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'
output_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

def fix_chunk11():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    skip_next = False
    
    for i, line in enumerate(lines):
        if skip_next:
            skip_next = False
            continue

        stripped = line.strip()
        
        # 1. Fix อามนฺตนาทีสุ (Insert missing พหุพพิหิสมาส)
        if '"อามนฺตนาทีสุ":' in stripped and 'เป็นฉัฏฐีตุลยาธิกรณวิ.' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            new_val = val.replace('เป็นฉัฏฐีตุลยาธิกรณวิ.', 'เป็นฉัฏฐีตุลยาธิกรณพหุพพิหิสมาส วิ.')
            new_lines.append(f'  "อามนฺตนาทีสุ": "{new_val}",\n')
            print("Fixed อามนฺตนาทีสุ (inserted พหุพพิหิสมาส)")
            continue
        
        # 1. Merge อามนฺตนาทีสุ + พหุพพิหิสมาส (Legacy check, keep just in case)
        if '"อามนฺตนาทีสุ":' in stripped:
            if i + 1 < len(lines) and '"พหุพพิหิสมาส":' in lines[i+1]:
                current_val = line.split('": "')[1].rstrip('",\n')
                next_line = lines[i+1]
                next_val = next_line.split('": "')[1].rstrip('",\n')
                
                # Combine them
                # "อามนฺตนาทีสุ": "ว., ปุ. (กาเลสุ) ในกาล ท. มีกาล เป็นที่ร้องเรียกเป็นต้น เป็นฉัฏฐีตุลยาธิกรณ"
                # "พหุพพิหิสมาส": "วิ. ว่า โสตาปตฺติมคฺโค อาทิ เยสํ เต โสตาปตฺติมคฺคาทโย (มคฺคา) แจกเหมือน มุนิ"
                # Expected: "อามนฺตนาทีสุ": "... เป็นฉัฏฐีตุลยาธิกรณพหุพพิหิสมาส วิ. ว่า ..."
                
                # Check if "พหุพพิหิสมาส" is actually part of the word or just the text
                # The key is "พหุพพิหิสมาส" which suggests it was split at "พหุพพิหิสมาส"
                
                merged_val = current_val + "พหุพพิหิสมาส " + next_val
                new_line = f'  "อามนฺตนาทีสุ": "{merged_val}",\n'
                new_lines.append(new_line)
                skip_next = True
                print("Merged อามนฺตนาทีสุ + พหุพพิหิสมาส")
                continue

        # 2. Split อามิสปฏิสนฺถาร containing อายตน ๑ and อายตน ๒
        if '"อามิสปฏิสนฺถาร":' in stripped and 'อายตน ๑' in stripped:
            # "อามิสปฏิสนฺถาร": "น., ปุ. อามิสปฏิสันถาร แจกเหมือน ปุริส เช่น ต. เอก. อามิสปฏิสนฺถาเรน ด้วยอามิสปฏิสันถาร อายตน ๑ น., นปุ. ศาลเจ้า แจกเหมือน กุล เช่น ทุ. เอก. อายตนํ ซึ่งศาลเจ้า อายตน ๒ น., นปุ. อายตนะ แจกเหมือน กุล เช่น ป. พหุ. อายตนานิ อ. อายตนะ ท. ",
            val = line.split('": "')[1].rstrip('",\n')
            
            # Regex to find the split points
            # Split at " อายตน ๑ " and " อายตน ๒ "
            parts = re.split(r'( อายตน ๑ | อายตน ๒ )', val)
            
            # parts[0] = definition of อามิสปฏิสนฺถาร
            # parts[1] = " อายตน ๑ "
            # parts[2] = definition of อายตน ๑
            # parts[3] = " อายตน ๒ "
            # parts[4] = definition of อายตน ๒
            
            if len(parts) >= 5:
                # Part 1: อามิสปฏิสนฺถาร
                def1 = parts[0]
                new_lines.append(f'  "อามิสปฏิสนฺถาร": "{def1}",\n')
                
                # Part 2: อายตน ๑
                key2 = "อายตน ๑"
                def2 = parts[2]
                new_lines.append(f'  "{key2}": "{def2}",\n')
                
                # Part 3: อายตน ๒
                key3 = "อายตน ๒"
                def3 = parts[4]
                new_lines.append(f'  "{key3}": "{def3}",\n')
                
                print("Split อามิสปฏิสนฺถาร, อายตน ๑, อายตน ๒")
                continue

        # 3. Split อาราเธสิ containing อาราม ๑ and อาราม ๒
        if '"อาราเธสิ":' in stripped and 'อาราม ๑' in stripped:
            # "อาราเธสิ": "... อาราเธสิ อาราม ๑ น., ปุ. อาราม, สวน ... อาราม ๒ ว. เป็นที่มายินดี ..."
            val = line.split('": "')[1].rstrip('",\n')
            
            parts = re.split(r'( อาราม ๑ | อาราม ๒ )', val)
            
            if len(parts) >= 5:
                # Part 1: อาราเธสิ
                def1 = parts[0]
                new_lines.append(f'  "อาราเธสิ": "{def1}",\n')
                
                # Part 2: อาราม ๑
                key2 = "อาราม ๑"
                def2 = parts[2]
                new_lines.append(f'  "{key2}": "{def2}",\n')
                
                # Part 3: อาราม ๒
                key3 = "อาราม ๒"
                def3 = parts[4]
                new_lines.append(f'  "{key3}": "{def3}",\n')
                
                print("Split อาราเธสิ, อาราม ๑, อาราม ๒")
                continue

        # 4. Fix อารกฺขณตฺถ (remove อายุปริโยสาน)
        if '"อารกฺขณตฺถ":' in stripped and 'อายุปริโยสาน' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            new_val = val.replace('อายุปริโยสาน ', '')
            new_lines.append(f'  "อารกฺขณตฺถ": "{new_val}",\n')
            print("Fixed อารกฺขณตฺถ (removed อายุปริโยสาน)")
            continue

        # 5. Fix อาพาธิก (ในตทัสสัตถิวิ. -> ในตทัสสัตถิตัทธิต วิ.)
        if '"อาพาธิก":' in stripped and 'ในตทัสสัตถิวิ.' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            new_val = val.replace('ในตทัสสัตถิวิ.', 'ในตทัสสัตถิตัทธิต วิ.')
            new_lines.append(f'  "อาพาธิก": "{new_val}",\n')
            print("Fixed อาพาธิก typo")
            continue

        new_lines.append(line)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

if __name__ == "__main__":
    fix_chunk11()
