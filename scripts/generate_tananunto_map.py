import re
import os
import json

# Paths
TANANUNTO_PATH = r'd:\pali-theonlyone\data\vocab-tananunto.js'
ROOTS_PATH = r'd:\pali-theonlyone\data\vocab-roots.js'
OUTPUT_PATH = r'd:\pali-dhatu-app\src\data\tananunto-vocab-map.js'

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
    
    # Extract entries: "key": "definition"
    # Using a robust regex to handle escaped quotes if any
    entries = re.findall(r'"((?:[^"\\]|\\.)+)":\s*"((?:[^"\\]|\\.)+)"', content)
    print(f"Found {len(entries)} entries in Tananunto.")
    
    # 3. Build Map: Root -> List of Vocab
    root_map = {}
    
    for thai_word, definition in entries:
        definition = definition.replace('\\"', '"')
        
        # Regex to find Root: XX ธาตุ
        # Matches: "กร ธาตุ", "(กร ธาตุ)", " กร ธาตุ"
        match = re.search(r'(?:[+\s(]|^)([ก-ฮ\u0e30-\u0e3a\u0e40-\u0e4e]+)\s*ธาตุ', definition)
        
        if match:
            thai_root_raw = match.group(1).strip()
            matched_key = None

            # 1. Try exact match
            if thai_root_raw in available_keys:
                matched_key = thai_root_raw
            else:
                # 2. Try variations (Phinthu handling)
                if thai_root_raw.endswith('ฺ'):
                    without_phinthu = thai_root_raw[:-1]
                    if without_phinthu in available_keys:
                        matched_key = without_phinthu
                else:
                    with_phinthu = thai_root_raw + 'ฺ'
                    if with_phinthu in available_keys:
                        matched_key = with_phinthu
                
                # 3. Try removing 'ะ' (e.g. กะ -> ก)
                if not matched_key and thai_root_raw.endswith('ะ'):
                    without_a = thai_root_raw[:-1]
                    if without_a in available_keys:
                        matched_key = without_a

            if matched_key:
                if matched_key not in root_map:
                    root_map[matched_key] = []
                
                root_map[matched_key].append({
                    "word": thai_word,
                    "def": definition
                })
    
    print(f"Mapped words to {len(root_map)} unique roots.")
    
    # 4. Save to file
    # We want a JS object: const tananuntoVocabMap = { "key": [ ... ], ... }; export default ...
    
    print(f"Writing to {OUTPUT_PATH}...")
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write("const tananuntoVocabMap = {\n")
        
        sorted_keys = sorted(root_map.keys())
        for i, root in enumerate(sorted_keys):
            vocab_list = root_map[root]
            # Convert list to JSON string for safety/escaping
            json_val = json.dumps(vocab_list, ensure_ascii=False)
            
            comma = "," if i < len(sorted_keys) - 1 else ""
            f.write(f'  "{root}": {json_val}{comma}\n')
            
        f.write("};\n\nexport default tananuntoVocabMap;\n")
        
    print("Done.")

if __name__ == "__main__":
    main()
