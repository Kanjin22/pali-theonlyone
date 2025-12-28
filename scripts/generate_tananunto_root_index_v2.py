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
        match = re.search(r'(?:[+\s(]|^)([ก-ฮ\u0e30-\u0e3a\u0e40-\u0e4e]+)\s*ธาตุ', definition)
        if match:
            thai_root = match.group(1).strip()
            
            # 1. Try exact match
            if thai_root in available_keys:
                found_roots.add(thai_root)
                continue
                
            # 2. Try variations
            # If root ends with phinthu (e.g. กรฺ), try removing it (กร)
            if thai_root.endswith('ฺ'):
                without_phinthu = thai_root[:-1]
                if without_phinthu in available_keys:
                    found_roots.add(without_phinthu)
                    continue
            else:
                # If root doesn't end with phinthu (e.g. กร), try adding it (กรฺ)
                with_phinthu = thai_root + 'ฺ'
                if with_phinthu in available_keys:
                    found_roots.add(with_phinthu)
                    continue
            
            # If ends with vowel 'ะ', try removing it? (กะ -> ก)
            if thai_root.endswith('ะ'):
                without_a = thai_root[:-1]
                if without_a in available_keys:
                    found_roots.add(without_a)
                    continue
            
            # If still not found, add to missed
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
