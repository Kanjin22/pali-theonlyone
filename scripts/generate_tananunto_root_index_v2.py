import re
import os
import json

# Paths
TANANUNTO_PATH = r'd:\pali-theonlyone\data\vocab-tananunto.js'
ROOTS_PATH = r'd:\pali-theonlyone\data\vocab-roots.js'
OUTPUT_PATH = r'd:\pali-dhatu-app\src\data\tananunto-root-keys.js'

def main():
    # 1. Load available roots from vocab-roots.js
    print(f"Reading {ROOTS_PATH}...")
    with open(ROOTS_PATH, 'r', encoding='utf-8') as f:
        roots_content = f.read()
    
    # Extract keys: "key": [ ... ]
    available_keys = set(re.findall(r'"([^"]+)":\s*\[', roots_content))
    print(f"Loaded {len(available_keys)} available roots.")

    # 2. Read Tananunto
    print(f"Reading {TANANUNTO_PATH}...")
    with open(TANANUNTO_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract entries
    entries = re.findall(r'"((?:[^"\\]|\\.)+)":\s*"((?:[^"\\]|\\.)+)"', content)
    print(f"Found {len(entries)} entries in Tananunto.")
    
    # 3. Find matching roots
    found_roots = set()
    missed_roots = set()
    
    for thai_word, definition in entries:
        definition = definition.replace('\\"', '"')
        
        # Regex to find Root: XX ธาตุ
        # Allow optional characters before 'ธาตุ' to capture context if needed, but group 1 is the root
        match = re.search(r'(?:[+\s(]|^)([ก-ฮ\u0e30-\u0e3a\u0e40-\u0e4e]+)\s*ธาตุ', definition)
        if match:
            thai_root = match.group(1).strip()
            
            # Manual mappings for known mismatches
            # Tananunto -> vocab-roots.js
            manual_map = {
                "คม": "คมุ",
                "ฉิท": "ฉิทิ",
                "วิช": "วิชิ",
                "ฐป": "ฐา",
                "กร": "กร", # Sometimes matches กรฺ
                "ทิส": "ทิส", # Check if ทิสฺ exists
                "ภุช": "ภุช",
                "มุจ": "มุจ",
                # New mappings
                "วินฺท": "วิท",
                "สีท": "สท",
                "อิจฺฉ": "อิส",
                "เนห": "สเนห",
                "ปิย": "ปีย",
                "ชห": "หา",
                "ทุพฺภิ": "ทุภ",
            }
            
            candidate_roots = [thai_root]
            
            # Add mapped root if exists
            if thai_root in manual_map:
                candidate_roots.append(manual_map[thai_root])
            
            # Generate variations
            # 1. Phinthu variations
            if thai_root.endswith('ฺ'):
                candidate_roots.append(thai_root[:-1])
            else:
                candidate_roots.append(thai_root + 'ฺ')
            
            # 2. Vowel variations (roots often have implicit vowels like u or i)
            # e.g. คม -> คมุ, ฉิท -> ฉิทิ
            candidate_roots.append(thai_root + 'ุ')
            candidate_roots.append(thai_root + 'ิ')
            
            # 3. Remove final vowel (e.g. กะ -> ก)
            if thai_root.endswith('ะ'):
                candidate_roots.append(thai_root[:-1])

            root_found = False
            for r in candidate_roots:
                if r in available_keys:
                    found_roots.add(r)
                    root_found = True
                    break
            
            if not root_found:
                # Filter out obvious noise
                noise_keywords = ["ในหนังสือ", "สัททนีติ", "เช่น", "กล่าวว่า", "แปลว่า", "มาจาก"]
                is_noise = False
                for k in noise_keywords:
                    if k in thai_root:
                        is_noise = True
                        break
                
                if not is_noise and len(thai_root) > 1: # Single letter might be noise or real root, usually >1
                     missed_roots.add(thai_root)
    
    print(f"Found {len(found_roots)} unique roots used in Tananunto.")
    print(f"Missed {len(missed_roots)} roots. Examples: {list(missed_roots)[:10]}")
    
    # 4. Save to file
    sorted_roots = sorted(list(found_roots))
    
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write("const tananuntoRootKeys = [\n")
        for i, root in enumerate(sorted_roots):
            comma = "," if i < len(sorted_roots) - 1 else ""
            f.write(f'  "{root}"{comma}\n')
        f.write("];\n\nexport default tananuntoRootKeys;\n")
        
    print(f"Saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
