import re
import difflib

ROOTS_PATH = r'd:\pali-theonlyone\data\vocab-roots.js'
TANANUNTO_PATH = r'd:\pali-theonlyone\data\vocab-tananunto.js'

def main():
    # 1. Load available roots
    with open(ROOTS_PATH, 'r', encoding='utf-8') as f:
        roots_content = f.read()
    available_keys = set(re.findall(r'"([^"]+)":\s*\[', roots_content))
    print(f"Loaded {len(available_keys)} available roots.")

    # 2. Extract Tananunto roots
    with open(TANANUNTO_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    entries = re.findall(r'"((?:[^"\\]|\\.)+)":\s*"((?:[^"\\]|\\.)+)"', content)
    
    missed_roots = set()
    
    # Manual mappings from generate_tananunto_map_v2.py
    manual_map = {
        "คม": "คมุ",
        "ฉิท": "ฉิทิ",
        "วิช": "วิชิ",
        "ฐป": "ฐา",
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

    for thai_word, definition in entries:
        definition = definition.replace('\\"', '"')
        match = re.search(r'(?:[+\s(]|^)([ก-ฮ\u0e30-\u0e3a\u0e40-\u0e4e]+)\s*ธาตุ', definition)
        if match:
            thai_root = match.group(1).strip()
            
            garbage = {
                "ซึ่ง", "ตามหนังสือสัททนีติ", "ต้น", "ถือเอาซึ่งพระ", "ทีฆะต้น", "ที่สุด",
                "นิพพาน", "นิพฺพาน", "ผู้มี", "พระ", "มาจากญา", "มีธาตุเหมือนกับ", "มีเตโช",
                "สักว่าขันธ์และ", "สัททนีติ", "อันมี", "อันมีโสต", "อาคมหลัง", "อุปสัคสังหาร",
                "และ", "ใช้ปฏิเสธ", "ในตัวกิริยาตัวหลังซึ่งมี", "มุข", "วณิช", "ฬาห", "โสต"
            }
            if thai_root in garbage:
                continue
            
            # Apply manual map
            if thai_root in manual_map:
                # If mapped, check if the mapped target exists (it should)
                target = manual_map[thai_root]
                if target in available_keys:
                    continue # Handled
                else:
                    # Mapped but target not found? Warning.
                    print(f"Warning: '{thai_root}' mapped to '{target}' which is not in available keys.")
            
            # Normalize basic variations
            candidates = [thai_root, thai_root + 'ฺ', thai_root[:-1] if thai_root.endswith('ฺ') else thai_root, thai_root + 'ุ', thai_root + 'ิ']
            
            found = False
            for c in candidates:
                if c in available_keys:
                    found = True
                    break
            
            if not found:
                # Basic noise filter
                if "ในหนังสือ" not in thai_root and len(thai_root) > 1:
                    missed_roots.add(thai_root)

    print(f"Missed {len(missed_roots)} roots (after manual mapping).")
    
    # 3. Find closest matches
    print("\n--- Suggestions ---")
    for missed in sorted(list(missed_roots)):
        # Try to find close matches in available_keys
        matches = difflib.get_close_matches(missed, available_keys, n=3, cutoff=0.6)
        print(f"'{missed}': {matches}")

if __name__ == "__main__":
    main()
