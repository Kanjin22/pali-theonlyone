import json
import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'
output_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

def fix_chunk12():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    skip_next = False
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # 1. Line 290: Split อาโรเปตุํ, อาโรเปตฺวา ๑, อาโรเปตฺวา ๒
        if '"อาโรเปตุํ":' in stripped and 'อาโรเปตฺวา ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            
            # Split at อาโรเปตฺวา ๑ and อาโรเปตฺวา ๒
            # Also clean อาโรเจนฺต inside if present
            # "อาโรเปตุํ": "... ดู อกฺโกสิตุํ อาโรเปตฺวา ๑ ก. ยกขึ้นแล้ว ... อาโรเจนฺต อาโรเปตฺวา ธาตุ ... อาโรเปตฺวา ๒ ก. ..."
            
            parts = re.split(r'( อาโรเปตฺวา ๑ | อาโรเปตฺวา ๒ )', val)
            
            if len(parts) >= 5:
                # Part 1: อาโรเปตุํ
                def1 = parts[0]
                new_lines.append(f'  "อาโรเปตุํ": "{def1}",\n')
                
                # Part 2: อาโรเปตฺวา ๑
                key2 = "อาโรเปตฺวา ๑"
                def2 = parts[2]
                # Clean "อาโรเจนฺต อาโรเปตฺวา " artifact inside def2?
                # Text: "ก. ยกขึ้นแล้ว อา บทหน้า + รุป อาโรเจนฺต อาโรเปตฺวา ธาตุ ในความยกขึ้น..."
                # Likely "รุป ธาตุ" is correct. "อาโรเจนฺต อาโรเปตฺวา " is garbage.
                def2 = def2.replace(' อาโรเจนฺต อาโรเปตฺวา', '')
                new_lines.append(f'  "{key2}": "{def2}",\n')
                
                # Part 3: อาโรเปตฺวา ๒
                key3 = "อาโรเปตฺวา ๒"
                def3 = parts[4]
                new_lines.append(f'  "{key3}": "{def3}",\n')
                
                print("Split อาโรเปตุํ, อาโรเปตฺวา ๑, อาโรเปตฺวา ๒")
                i += 1
                continue

        # 2. Line 304: Fix อาลยาทีนิ (Replace อาโรเปตฺวา with สมาส)
        if '"อาลยาทีนิ":' in stripped and stripped.endswith('อาโรเปตฺวา",'):
            # "... เป็นฉัฏฐีตุลยาธิกรณพหุพพิหิ อาโรเปตฺวา"
            new_line = line.replace(' อาโรเปตฺวา",', 'สมาส",')
            new_lines.append(new_line)
            print("Fixed อาลยาทีนิ (replaced อาโรเปตฺวา with สมาส)")
            i += 1
            continue

        # 3. Line 307-308: Fix อาลินฺท and หสาทีนิ
        if '"อาลินฺท":' in stripped:
            if i + 1 < len(lines) and '"ตุลยาธิกรณพหุพพิหิสมาส":' in lines[i+1]:
                # Line 307: "... เป็นสัตตมี"
                # Line 308: "ตุลยาธิกรณพหุพพิหิสมาส": "วิ. ว่า หโส อาทิ ..."
                
                line307 = line
                line308 = lines[i+1]
                
                val307 = line307.split('": "')[1].rstrip('",\n')
                val308 = line308.split('": "')[1].rstrip('",\n')
                
                # Merge key of 308 into value of 307
                new_val307 = val307 + "ตุลยาธิกรณพหุพพิหิสมาส"
                new_lines.append(f'  "อาลินฺท": "{new_val307}",\n')
                
                # Create new key หสาทีนิ for value of 308
                new_lines.append(f'  "หสาทีนิ": "{val308}",\n')
                
                print("Fixed อาลินฺท and created หสาทีนิ")
                i += 2 # Skip next line
                continue

        # 4. Line 309: Split อาลุลมาน, อาโลก ๑, อาโลก ๒
        if '"อาลุลมาน":' in stripped and 'อาโลก ๑' in stripped:
            val = line.split('": "')[1].rstrip('",\n')
            parts = re.split(r'( อาโลก ๑ | อาโลก ๒ )', val)
            
            if len(parts) >= 5:
                # Part 1: อาลุลมาน
                def1 = parts[0]
                new_lines.append(f'  "อาลุลมาน": "{def1}",\n')
                
                # Part 2: อาโลก ๑
                key2 = "อาโลก ๑"
                def2 = parts[2]
                new_lines.append(f'  "{key2}": "{def2}",\n')
                
                # Part 3: อาโลก ๒
                key3 = "อาโลก ๒"
                def3 = parts[4]
                new_lines.append(f'  "{key3}": "{def3}",\n')
                
                print("Split อาลุลมาน, อาโลก ๑, อาโลก ๒")
                i += 1
                continue

        # 5. Line 311-313: Fix อาวชฺชน...เวกฺขเณหิ
        if '"อาวชฺชติ":' in stripped and 'อาวชฺชนสมาปชฺชน' in stripped:
            # Line 311: "อาวชฺชติ": "... อาวชฺชนสมาปชฺชนอธิฏฺฐานวุฏฺฐานปฺปจฺจ",
            # Line 312: "เวกฺขเณหิ": "น., นปุ. ด้วยการนึกและการเข้า และการอธิษฐานและการออกและการ",
            # Line 313: "พิจารณา": "ท. เป็นอสมาหาร..."
            
            if i + 2 < len(lines) and '"เวกฺขเณหิ":' in lines[i+1] and '"พิจารณา":' in lines[i+2]:
                line311 = lines[i]
                line312 = lines[i+1]
                line313 = lines[i+2]
                
                val311 = line311.split('": "')[1].rstrip('",\n')
                val312 = line312.split('": "')[1].rstrip('",\n')
                val313 = line313.split('": "')[1].rstrip('",\n')
                
                # Extract trailing key part from 311
                # "อาวชฺชติ": "... อาวชฺชติ อาวชฺชน..." ?
                # The text says "... สำเร็จรูปเป็น อาวชฺชติ อาวชฺชน..."
                split_point = "อาวชฺชติ "
                if split_point in val311:
                    parts311 = val311.rsplit(split_point, 1) # Split from right to be safe
                    def_avajjhati = parts311[0] + "อาวชฺชติ"
                    trailing_key_part = parts311[1] # "อาวชฺชน..."
                else:
                    # Fallback if pattern doesn't match exactly
                    # Assume text after last space? Or just hardcode
                    def_avajjhati = val311.replace(' อาวชฺชนสมาปชฺชนอธิฏฺฐานวุฏฺฐานปฺปจฺจ', '')
                    trailing_key_part = 'อาวชฺชนสมาปชฺชนอธิฏฺฐานวุฏฺฐานปฺปจฺจ'

                new_lines.append(f'  "อาวชฺชติ": "{def_avajjhati}",\n')
                
                # Construct new key
                # trailing_key_part + "เวกฺขเณหิ"
                # "เวกฺขเณหิ" key in line 312
                # But wait, line 312 key is "เวกฺขเณหิ"
                # So full key is trailing_key_part + "เวกฺขเณหิ"
                # Note: trailing_key_part might end with "ปฺปจฺจ" and next starts with "เวกฺขเณหิ"
                # Check for overlap? No, just concat.
                
                full_key = trailing_key_part + "เวกฺขเณหิ"
                
                # Construct new value
                # val312 + "พิจารณา" + val313 ?
                # val312 ends with "และการ"
                # val313 starts with "ท. เป็น..."
                # Key "พิจารณา" is between them.
                # So "และการ" + "พิจารณา" + " " + val313
                
                full_val = val312 + "พิจารณา " + val313
                
                new_lines.append(f'  "{full_key}": "{full_val}",\n')
                
                print(f"Merged long key: {full_key}")
                i += 3
                continue

        new_lines.append(line)
        i += 1

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

if __name__ == "__main__":
    fix_chunk12()
