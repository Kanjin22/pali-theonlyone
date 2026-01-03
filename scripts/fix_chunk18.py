import json
import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'
output_file = input_file # Overwrite

def fix_chunk18():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    skip_indices = set()
    
    # Track stats
    fixed_7513 = False
    fixed_7908 = False
    fixed_7914 = False

    for i, line in enumerate(lines):
        if i in skip_indices:
            continue
            
        line_stripped = line.strip()
        
        # Case 1: Merge 7513-7515 (มณิการกุลุปกติสฺสตฺเถรวตฺถุ)
        # 7513: "มณิการกุลุปกติสฺสตฺเถรวตฺถุ": "... มณิการสฺส กุลํ =",
        # 7514: "มณิการกุลํ": "วิ. บุพ. ... = มณิ-",
        # 7515: "การกุลุปโก (ติสฺสตฺเถโร)": "วิ. บุพ. ...",
        if '"มณิการกุลุปกติสฺสตฺเถรวตฺถุ":' in line_stripped and i + 2 < len(lines):
            line1 = line
            line2 = lines[i+1]
            line3 = lines[i+2]
            
            if '"มณิการกุลํ":' in line2 and '"การกุลุปโก (ติสฺสตฺเถโร)":' in line3:
                # Extract parts
                # Line 1 value ends with "มณิการสฺส กุลํ ="
                val1 = line1.split('": "', 1)[1].rstrip(',\n').rstrip('"')
                
                # Line 2: Key "มณิการกุลํ" is actually part of val1 end.
                # But val1 ends with "=", so "มณิการกุลํ" completes it.
                # Val2 starts with "วิ. บุพ. ..."
                key2 = "มณิการกุลํ"
                val2 = line2.split('": "', 1)[1].rstrip(',\n').rstrip('"')
                
                # Line 3: Key "การกุลุปโก (ติสฺสตฺเถโร)" completes "มณิ-" from Val2.
                # Val3 is the rest.
                key3 = "การกุลุปโก (ติสฺสตฺเถโร)"
                val3 = line3.split('": "', 1)[1].rstrip(',\n').rstrip('"')
                
                # Construct merged value
                # val1 ends with "="
                # key2 is "มณิการกุลํ"
                # val2 is "วิ. บุพ. ... = มณิ-"
                # key3 is "การกุลุปโก ..."
                # val3 is "..."
                
                # Logic:
                # val1 + " " + key2 + " " + val2 (remove hyphen) + key3 + " " + val3
                
                merged_val = val1 + " " + key2 + " " + val2.rstrip('-') + key3 + " " + val3
                
                new_line = f'  "มณิการกุลุปกติสฺสตฺเถรวตฺถุ": "{merged_val}",\n'
                new_lines.append(new_line)
                
                skip_indices.add(i+1)
                skip_indices.add(i+2)
                fixed_7513 = True
                print("Fixed 7513: Merged มณิการกุลุปกติสฺสตฺเถรวตฺถุ")
                continue

        # Case 2: Fix 7908-7909 (มาสทิวเส + หิรญฺญสุวณฺณํ)
        # 7908: "มาสทิวเส": "... เป็นอสมา-",
        # 7909: "หารทวันทวสมาส": "วิ. ว่า หิรญฺญญฺจ ...",
        if '"มาสทิวเส":' in line_stripped and i + 1 < len(lines):
            line1 = line
            line2 = lines[i+1]
            
            if '"หารทวันทวสมาส":' in line2:
                # Val1 ends with "เป็นอสมา-"
                val1 = line1.split('": "', 1)[1].rstrip(',\n').rstrip('"')
                
                # Key2 is "หารทวันทวสมาส" -> completes "อสมาหารทวันทวสมาส"
                # Val2 is "วิ. ว่า หิรญฺญญฺจ ..." -> belongs to หิรญฺญสุวณฺณํ
                
                val2 = line2.split('": "', 1)[1].rstrip(',\n').rstrip('"')
                
                # 1. Update มาสทิวเส
                # "เป็นอสมา-" + "หารทวันทวสมาส"
                fixed_val1 = val1.rstrip('-') + "หารทวันทวสมาส"
                new_line1 = f'  "มาสทิวเส": "{fixed_val1}",\n'
                new_lines.append(new_line1)
                
                # 2. Create หิรญฺญสุวณฺณํ
                # Use a placeholder definition or infer from context?
                # The analysis is "วิ. ว่า หิรญฺญญฺจ สุวณฺณญฺจ = หิรญฺญสุวณฺณํ แจกเหมือน กุล เฉพาะฝ่ายเอก."
                # I'll prefix with [Draft] or generic POS if unknown, but usually text implies POS.
                # "หิรญฺญสุวณฺณํ" is Noun, Neuter (แจกเหมือน กุล).
                # So "น., นปุ. เงินและทอง"
                new_key = "หิรญฺญสุวณฺณํ"
                new_val = "น., นปุ. เงินและทอง " + val2
                new_line2 = f'  "{new_key}": "{new_val}",\n'
                new_lines.append(new_line2)
                
                skip_indices.add(i+1)
                fixed_7908 = True
                print("Fixed 7908: Split มาสทิวเส and หิรญฺญสุวณฺณํ")
                continue

        # Case 3: Fix 7914 (มิคสต -> มิคสต + มิคารมาตุปาสาท)
        # 7914: "มิคสต": "... ดู อฏฺฐิสต มิคารมาตุป าสาท น., ปุ. ...",
        if '"มิคสต":' in line_stripped and "มิคารมาตุป าสาท" in line_stripped:
            val = line_stripped.split('": "', 1)[1].rstrip(',\n').rstrip('"')
            
            # Split point: "ดู อฏฺฐิสต"
            # The text is "... ดู อฏฺฐิสต มิคารมาตุป าสาท น., ปุ. ..."
            split_marker = "ดู อฏฺฐิสต"
            parts = val.split(split_marker)
            
            if len(parts) > 1:
                # Part 1: Definition of มิคสต
                val1 = parts[0] + split_marker
                
                # Part 2: Definition of มิคารมาตุปาสาท
                # The rest is " มิคารมาตุป าสาท น., ปุ. ..."
                # We need to extract the key "มิคารมาตุป าสาท" and make it clean "มิคารมาตุปาสาท"
                remainder = parts[1].strip()
                
                # Expect remainder to start with "มิคารมาตุป าสาท น., ปุ."
                # Let's verify
                if remainder.startswith("มิคารมาตุป าสาท"):
                    # Key is "มิคารมาตุปาสาท" (remove space)
                    key2 = "มิคารมาตุปาสาท"
                    # Value is everything after the key in remainder
                    # "มิคารมาตุป าสาท น., ปุ. ..."
                    # val2 = "น., ปุ. ..."
                    val2 = remainder.replace("มิคารมาตุป าสาท", "", 1).strip()
                    
                    new_line1 = f'  "มิคสต": "{val1}",\n'
                    new_lines.append(new_line1)
                    
                    new_line2 = f'  "{key2}": "{val2}",\n'
                    new_lines.append(new_line2)
                    
                    fixed_7914 = True
                    print("Fixed 7914: Split มิคสต and มิคารมาตุปาสาท")
                    continue
        
        # Default: append line as is
        new_lines.append(line)

    # Write back
    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print("Chunk 18 fixes applied.")

if __name__ == "__main__":
    fix_chunk18()
