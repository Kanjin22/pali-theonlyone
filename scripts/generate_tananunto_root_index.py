import re
import os
import json

# Paths
TANANUNTO_PATH = r'd:\pali-theonlyone\data\vocab-tananunto.js'
ROOTS_PATH = r'd:\pali-theonlyone\data\vocab-roots.js'
OUTPUT_PATH = r'd:\pali-dhatu-app\src\data\tananunto-root-keys.js'

def thai_to_roman(text):
    if not text: return ""
    s = text
    # Move pre-positioned vowels
    s = re.sub(r'([เโไใ])((?:[ก-ฮ]ฺ)*[ก-ฮ])', r'\2\1', s)
    
    map_char = {
        'ก': 'k', 'ข': 'kh', 'ค': 'g', 'ฆ': 'gh', 'ง': 'ṅ',
        'จ': 'c', 'ฉ': 'ch', 'ช': 'j', 'ฌ': 'jh', 'ญ': 'ñ',
        'ฏ': 'ṭ', 'ฐ': 'ṭh', 'ฑ': 'ḍ', 'ฒ': 'ḍh', 'ณ': 'ṇ',
        'ต': 't', 'ถ': 'th', 'ท': 'd', 'ธ': 'dh', 'น': 'n',
        'ป': 'p', 'ผ': 'ph', 'พ': 'b', 'ภ': 'bh', 'ม': 'm',
        'ย': 'y', 'ร': 'r', 'ล': 'l', 'ว': 'v', 'ส': 's', 'ห': 'h', 'ฬ': 'ḷ', 'อ': 'a',
        'ฮ': 'h',
        '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
        '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9'
    }
    
    consonants = "กขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลวสหฬอฮ"
    res = ""
    i = 0
    while i < len(s):
        c = s[i]
        if c in consonants:
            if c == 'อ':
                res += "a"
            else:
                res += map_char.get(c, c) + "a"
        elif c == 'ฺ':
            if res.endswith('a'): res = res[:-1]
        elif c == 'า' or c == 'ๅ':
            if res.endswith('a'): res = res[:-1]
            res += 'ā'
        elif c == 'ิ':
            if res.endswith('a'): res = res[:-1]
            res += 'i'
        elif c == 'ี':
            if res.endswith('a'): res = res[:-1]
            res += 'ī'
        elif c == 'ึ':
            if res.endswith('a'): res = res[:-1]
            res += 'iṃ'
        elif c == 'ุ':
            if res.endswith('a'): res = res[:-1]
            res += 'u'
        elif c == 'ู':
            if res.endswith('a'): res = res[:-1]
            res += 'ū'
        elif c == 'เ':
            if res.endswith('a'): res = res[:-1]
            res += 'e'
        elif c == 'โ':
            if res.endswith('a'): res = res[:-1]
            res += 'o'
        elif c == 'ไ' or c == 'ใ':
            if res.endswith('a'): res = res[:-1]
            res += 'ai'
        elif c == 'ํ':
            res += 'ṃ'
        elif c == 'ะ' or c == 'ั':
            if not res.endswith('a'): res += 'a'
        elif c == 'ฤ':
            if res.endswith('a'): res = res[:-1]
            res += 'ṛ'
        elif c == 'ฦ':
            if res.endswith('a'): res = res[:-1]
            res += 'ḷ'
        i += 1
    return res

def normalize_root(roman_root, available_keys):
    # Try exact match
    if roman_root in available_keys:
        return roman_root
    
    # Try removing final 'a' (kara -> kar)
    if roman_root.endswith('a'):
        shorter = roman_root[:-1]
        if shorter in available_keys:
            return shorter
            
    # Try adding final 'a' (kar -> kara)
    longer = roman_root + 'a'
    if longer in available_keys:
        return longer
        
    return None

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
    
    for thai_word, definition in entries:
        definition = definition.replace('\\"', '"')
        
        # Regex to find Root: XX ธาตุ
        match = re.search(r'(?:[+\s(]|^)([ก-ฮ\u0e30-\u0e3a\u0e40-\u0e4e]+)\s*ธาตุ', definition)
        if match:
            thai_root = match.group(1)
            roman_root = thai_to_roman(thai_root)
            
            target_key = normalize_root(roman_root, available_keys)
            
            if target_key:
                found_roots.add(target_key)
    
    print(f"Found {len(found_roots)} unique roots used in Tananunto.")
    
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
