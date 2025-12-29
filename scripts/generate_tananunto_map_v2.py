import re
import json
import os

# Paths
BASE_DIR = r'd:\pali-theonlyone\data'
VOCAB_FILE = os.path.join(BASE_DIR, 'vocab-tananunto.js')
ROOTS_FILE = os.path.join(BASE_DIR, 'vocab-roots.js')
OUTPUT_FILE = r'd:\pali-dhatu-app\src\data\tananunto-vocab-map.js'

def load_available_roots():
    """Loads root keys from vocab-roots.js"""
    print(f"Reading {ROOTS_FILE}...")
    with open(ROOTS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    keys = set(re.findall(r'"([^"]+)":\s*\[', content))
    print(f"Loaded {len(keys)} available root keys.")
    return keys

def normalize_root(thai_root, available_keys):
    """
    Normalizes a Tananunto root string to a vocab-roots.js key.
    Returns the key if found, otherwise None.
    """
    thai_root = thai_root.strip()
    
    garbage = {
        "ซึ่ง", "ตามหนังสือสัททนีติ", "ต้น", "ถือเอาซึ่งพระ", "ทีฆะต้น", "ที่สุด",
        "นิพพาน", "นิพฺพาน", "ผู้มี", "พระ", "มาจากญา", "มีธาตุเหมือนกับ", "มีเตโช",
        "สักว่าขันธ์และ", "สัททนีติ", "อันมี", "อันมีโสต", "อาคมหลัง", "อุปสัคสังหาร",
        "และ", "ใช้ปฏิเสธ", "ในตัวกิริยาตัวหลังซึ่งมี", "มุข", "วณิช", "ฬาห", "โสต"
    }
    
    if thai_root in garbage:
        return None
    
    # Manual mappings
    manual_map = {
        "คม": "คมุ",
        "ฉิท": "ฉิทิ",
        "วิช": "วิชิ",
        "ฐป": "ถป",
        "กร": "กร",
        "ทิส": "ทิส",
        "ภุช": "ภุช",
        "มุจ": "มุจ",
        "วินฺท": "วิท",
        "ฐุห": "ฐุภ",
        "เนห": "สเนห",
        "ปิย": "ปีย",
        "สีท": "สท",
        "อิจฺฉ": "อิส",
        "ชห": "หา",
        "ทุพฺภิ": "ทุภ",
        "ฉิ": "ฉิทิ",
        "ติข": "ติก",
        "ปิลนฺธ": "ปิลธิ",
        "ผุ": "ผุส",
        "มช": "มชฺช",
        "มณฺฑ": "มฑิ",
        "ลมฺพ": "ลพิ",
        "วิลี": "ลี",
        "วุห": "วห",
        "สกฺข": "สกฺก",
        "สงฺก": "สกิ",
        "อลฺล": "อล",
        "หึส": "หิส",
        "วลญฺช": "วฬญฺช",
        "อจฺฉ": "อาส",
        "ปารุป": "รุป",
    }
    candidates = []
    
    if thai_root in manual_map:
        mapped = manual_map[thai_root]
        if mapped in available_keys:
            return mapped
        candidates.append(mapped)
    
    candidates.append(thai_root)
        
    if thai_root.endswith('ฺ'):
        candidates.append(thai_root[:-1])
    else:
        candidates.append(thai_root + 'ฺ')
        
    candidates.append(thai_root + 'ุ')
    candidates.append(thai_root + 'ิ')
    
    if thai_root.endswith('ะ'):
        candidates.append(thai_root[:-1])
        
    for c in candidates:
        if c in available_keys:
            return c
            
    return None

def load_js_object(filepath):
    """
    Naively parses a JS object definition file (const x = { ... }) into a Python dict.
    Assumes keys are quoted or unquoted strings, values are strings.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip "const vocabTananunto = " and trailing "};" roughly
    start = content.find('{')
    end = content.rfind('}')
    if start == -1 or end == -1:
        return {}
    
    json_str = content[start:end+1]
    
    # Python's JSON requires property names to be enclosed in double quotes.
    # The file might not be valid JSON (JS allows unquoted keys).
    # However, looking at the file content provided in context, keys are quoted: "กกุฏปาท": ...
    # So we might be able to use json.loads directly if the syntax is clean enough.
    
    # Let's try to parse entries manually to be robust against JS syntax quirks (like trailing commas, etc)
    # or use a regex to extract key-value pairs.
    
    entries = []
    # Regex to capture "key": "value"
    # Handles multiline values? The file seems to have values on one line or wrapped.
    # The previous script used a regex. Let's reuse/improve that.
    
    # Pattern: "KEY": "VALUE",
    # Value might contain escaped quotes.
    pattern = re.compile(r'"([^"]+)":\s*"((?:[^"\\]|\\.)*)"', re.DOTALL)
    
    for match in pattern.finditer(json_str):
        entries.append((match.group(1), match.group(2)))
        
    return entries

def clean_meaning(meaning):
    """Removes 'ความ' prefix and whitespace."""
    if not meaning:
        return ""
    m = meaning.replace("ความ", "").strip()
    return m

def map_paccaya_to_roman(thai_paccaya):
    if not thai_paccaya: return None
    p = thai_paccaya.strip()
    mapping = {
        "อ": "a",
        "ย": "ya",
        "นุ": "nu",
        "ณุ": "ṇu",
        "นา": "nā",
        "ณหา": "nhā",
        "นหา": "nhā",
        "โอ": "o",
        "เณ": "e",
        "ณย": "e",
    }
    return mapping.get(p, p)

def extract_root_info(definition):
    """
    Parses definition to extract root info.
    Format: "... RootName ธาตุ ใน Meaning + Paccaya ปัจจัย..."
    """
    # Normalized definition for easier regex
    # Replace newlines with space
    def_norm = definition.replace('\n', ' ')
    
    # Regex to find root analysis
    # Group 1: Root Name
    # Group 2: Meaning (after "ใน" or "ในความ")
    # Group 3: Paccaya (before "ปัจจัย")
    
    # Pattern 1: Explicit "ธาตุ ใน ... + ... ปัจจัย"
    # Example: "ธร ธาตุ ในความทรงไว้ + ณย ปัจจัย"
    match = re.search(r'([ก-ฮ\u0e30-\u0e3a\u0e40-\u0e4e]+)\s*ธาตุ\s*ใน\s*(?:ความ)?([^\+]+)\s*\+\s*([^\s]+)\s*ปัจจัย', def_norm)
    
    if match:
        root_name = match.group(1).strip()
        meaning = match.group(2).strip()
        paccaya = match.group(3).strip()
        return {
            "root_name": root_name,
            "meaning": clean_meaning(meaning),
            "paccaya": paccaya
        }
        
    # Pattern 2: Maybe no Paccaya mentioned? Or different format?
    # "กร ธาตุ ใน ความทำ" (without affix?)
    match_simple = re.search(r'([ก-ฮ\u0e30-\u0e3a\u0e40-\u0e4e]+)\s*ธาตุ\s*ใน\s*(?:ความ)?([^\+\s]+)', def_norm)
    if match_simple:
         root_name = match_simple.group(1).strip()
         meaning = match_simple.group(2).strip()
         return {
            "root_name": root_name,
            "meaning": clean_meaning(meaning),
            "paccaya": None
        }

    return None

def main():
    available_keys = load_available_roots()

    print(f"Reading {VOCAB_FILE}...")
    entries = load_js_object(VOCAB_FILE)
    print(f"Found {len(entries)} entries.")
    
    mapped_data = {}
    matched_count = 0
    
    for word, definition in entries:
        info = extract_root_info(definition)
        if info:
            raw_root = info['root_name']
            normalized_root = normalize_root(raw_root, available_keys)
            
            if normalized_root:
                # Use normalized root key
                if normalized_root not in mapped_data:
                    mapped_data[normalized_root] = []
                
                mapped_data[normalized_root].append({
                    "word": word,
                    "def": definition,
                    "e": map_paccaya_to_roman(info['paccaya'])
                })
                matched_count += 1
            # else:
                # print(f"Could not map root '{raw_root}' for word '{word}'")
    
    print(f"Mapped {matched_count} words to roots.")
    
    # Save to JS file
    print(f"Writing to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("const tananuntoVocabMap = ")
        f.write(json.dumps(mapped_data, ensure_ascii=False, indent=2))
        f.write(";\n\nexport default tananuntoVocabMap;")
    print("Done.")

if __name__ == "__main__":
    main()
