import re
import os
import json

# Paths
TANANUNTO_PATH = r'd:\pali-theonlyone\data\vocab-tananunto.js'
DPD_DERIVED_PATH = r'd:\pali-theonlyone\data\vocab-roots-dpd-derived.js'

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
    print(f"Reading {TANANUNTO_PATH}...")
    with open(TANANUNTO_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract entries
    # Pattern to match "Key": "Value"
    # Handling escaped quotes in value is important
    entries = re.findall(r'"((?:[^"\\]|\\.)+)":\s*"((?:[^"\\]|\\.)+)"', content)
    print(f"Found {len(entries)} entries in Tananunto.")
    
    # Read DPD Derived
    print(f"Reading {DPD_DERIVED_PATH}...")
    with open(DPD_DERIVED_PATH, 'r', encoding='utf-8') as f:
        dpd_content = f.read()
        
    # Extract JS object content to parse into Python dict
    # Assume format: const vocabRootsDpdDerived = { ... };
    # We'll regex extract keys and list values
    
    # First, let's just extract the inner part of { ... }
    # Or parsing it manually line by line might be safer if it's formatted well
    # Let's try to load it by cleaning it up to be JSON-like
    
    # Actually, simpler approach: Read the file, identify existing keys, keep the content in memory,
    # and we will reconstruct the file or append to it?
    # Reconstructing is better to ensure sorting and clean structure.
    
    # Regex to find all keys and their arrays
    # "key": ["val1", "val2"],
    dpd_data = {}
    
    # Find all matches of "key": [ ... ]
    # We need to capture the list content. 
    # Since lists can span lines, we use dotall
    matches = re.findall(r'"([^"]+)":\s*\[(.*?)\]', dpd_content, re.DOTALL)
    
    for key, val_str in matches:
        # val_str is like "word1", "word2"
        # Extract words
        words = [w.strip().strip('"').strip("'") for w in val_str.split(',') if w.strip()]
        dpd_data[key] = set(words) # Use set for uniqueness
        
    print(f"Loaded {len(dpd_data)} roots from DPD Derived.")
    
    available_keys = set(dpd_data.keys())
    
    added_count = 0
    matched_roots = 0
    
    for thai_word, definition in entries:
        # Clean up definition text (unescape quotes)
        definition = definition.replace('\\"', '"')
        
        # Regex to find Root: XX ธาตุ
        # Allow optional characters before 'ธาตุ' like whitespace or +
        # Updated to include Thai diacritics (Phinthu, Vowels) in the root name
        # \u0e30-\u0e3a includes vowels and phinthu. \u0e40-\u0e4e includes vowels.
        match = re.search(r'(?:[+\s(]|^)([ก-ฮ\u0e30-\u0e3a\u0e40-\u0e4e]+)\s*ธาตุ', definition)
        if match:
            thai_root = match.group(1)
            
            # Convert to Roman
            roman_root = thai_to_roman(thai_root)
            roman_word = thai_to_roman(thai_word)
            
            # Normalize Root
            target_key = normalize_root(roman_root, available_keys)
            
            if target_key:
                # Add word to DPD data
                if roman_word not in dpd_data[target_key]:
                    dpd_data[target_key].add(roman_word)
                    added_count += 1
                matched_roots += 1
            # else:
            #     print(f"Root not found: {thai_root} -> {roman_root} (Word: {thai_word})")
                
    print(f"Matched {matched_roots} root references.")
    print(f"Added {added_count} new derived words.")
    
    # Write back to file
    print(f"Writing back to {DPD_DERIVED_PATH}...")
    
    # Sort keys
    sorted_keys = sorted(dpd_data.keys())
    
    with open(DPD_DERIVED_PATH, 'w', encoding='utf-8') as f:
        f.write("const vocabRootsDpdDerived = {\n")
        for i, key in enumerate(sorted_keys):
            words = sorted(list(dpd_data[key]))
            # Format: "key": ["w1", "w2"],
            words_str = ", ".join([f'"{w}"' for w in words])
            comma = "," if i < len(sorted_keys) - 1 else ""
            f.write(f'  "{key}": [{words_str}]{comma}\n')
        f.write("};\n\nexport default vocabRootsDpdDerived;\n")
        
    print("Done.")

if __name__ == "__main__":
    main()
