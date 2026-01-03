import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'
output_file = input_file

def fix_chunk19():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    
    for i, line in enumerate(lines):
        line_stripped = line.strip()
        
        # Case 1: Split ปุญฺญ -> ปุญฺญ, ปุญฺญกมฺม ๑, ปุญฺญกมฺม ๒, ปุญฺญกรณ
        if '"ปุญฺญ":' in line_stripped and "ปุญฺ ญกรณ" in line_stripped:
            val = line_stripped.split('": "', 1)[1].rstrip(',\n').rstrip('"')
            
            # Split sequence
            # 1. Split "ปุญฺญกมฺม ๑ น.,"
            parts1 = val.split("ปุญฺญกมฺม ๑ น.,")
            val_punna = parts1[0].strip()
            
            rest1 = "น.," + parts1[1] # Restore POS
            
            # 2. Split "ปุญฺญกมฺม ๒ น.," from rest1
            parts2 = rest1.split("ปุญฺญกมฺม ๒ น.,")
            val_punnakamma1 = parts2[0].strip()
            
            rest2 = "น.," + parts2[1]
            
            # 3. Split "ปุญฺ ญกรณ น.," from rest2
            parts3 = rest2.split("ปุญฺ ญกรณ น.,")
            val_punnakamma2 = parts3[0].strip()
            
            val_punnakarana = "น.," + parts3[1].strip()
            
            new_lines.append(f'  "ปุญฺญ": "{val_punna}",\n')
            new_lines.append(f'  "ปุญฺญกมฺม ๑": "{val_punnakamma1}",\n')
            new_lines.append(f'  "ปุญฺญกมฺม ๒": "{val_punnakamma2}",\n')
            new_lines.append(f'  "ปุญฺญกรณ": "{val_punnakarana}",\n')
            
            print("Fixed Line 6587: Split ปุญฺญ group")
            continue

        # Case 2: Split มหากสฺสปตฺเถร -> มหากสฺสปตฺเถร, มหากาล
        if '"มหากสฺสปตฺเถร":' in line_stripped and "มหา กา ล" in line_stripped:
            val = line_stripped.split('": "', 1)[1].rstrip(',\n').rstrip('"')
            
            parts = val.split("มหา กา ล ว.,")
            val_kassapa = parts[0].strip()
            val_kala = "ว.," + parts[1].strip()
            
            new_lines.append(f'  "มหากสฺสปตฺเถร": "{val_kassapa}",\n')
            new_lines.append(f'  "มหากาล": "{val_kala}",\n')
            
            print("Fixed Line 7684: Split มหากสฺสปตฺเถร / มหากาล")
            continue

        # Case 3: Split สุเว -> สุเว, สุสญฺญต
        if '"สุเว":' in line_stripped and "สุสญฺ ญต" in line_stripped:
            val = line_stripped.split('": "', 1)[1].rstrip(',\n').rstrip('"')
            
            parts = val.split("สุสญฺ ญต ก.")
            val_suve = parts[0].strip()
            val_susannata = "ก." + parts[1].strip()
            
            new_lines.append(f'  "สุเว": "{val_suve}",\n')
            new_lines.append(f'  "สุสญฺญต": "{val_susannata}",\n')
            
            print("Fixed Line 10955: Split สุเว / สุสญฺญต")
            continue

        new_lines.append(line)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print("Chunk 19 fixes applied.")

if __name__ == "__main__":
    fix_chunk19()
