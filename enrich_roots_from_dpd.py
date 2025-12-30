import json
import re
import sys
import os
import sqlite3

# DB Path
DB_PATH = "dpd_data/dpd.db"

def roman_to_thai_robust(text):
    text = text.replace("√", "").strip()
    
    # Mapping
    cons = {
        'k': 'ก', 'kh': 'ข', 'g': 'ค', 'gh': 'ฆ', 'ṅ': 'ง',
        'c': 'จ', 'ch': 'ฉ', 'j': 'ช', 'jh': 'ฌ', 'ñ': 'ญ',
        'ṭ': 'ฏ', 'ṭh': 'ฐ', 'ḍ': 'ฑ', 'ḍh': 'ฒ', 'ṇ': 'ณ',
        't': 'ต', 'th': 'ถ', 'd': 'ท', 'dh': 'ธ', 'n': 'น',
        'p': 'ป', 'ph': 'ผ', 'b': 'พ', 'bh': 'ภ', 'm': 'ม',
        'y': 'ย', 'r': 'ร', 'l': 'ล', 'v': 'ว', 's': 'ส', 'h': 'ห', 'ḷ': 'ฬ',
        'ṃ': 'ํ'
    }
    
    vowels = {
        'a': '', 'ā': 'า', 'i': 'ิ', 'ī': 'ี', 'u': 'ุ', 'ū': 'ู', 
        'e': 'เ', 'o': 'โ'
    }
    
    res = ""
    i = 0
    length = len(text)
    
    while i < length:
        # Handle initial vowel or vowel after non-consonant (which shouldn't happen in roots usually)
        if i == 0 and text[i] in vowels:
            # Initial vowel
            v = text[i]
            if v == 'a': res += 'อ'
            elif v == 'ā': res += 'อา'
            elif v == 'i': res += 'อิ'
            elif v == 'ī': res += 'อี'
            elif v == 'u': res += 'อุ'
            elif v == 'ū': res += 'อู'
            elif v == 'e': res += 'เอ'
            elif v == 'o': res += 'โอ'
            i += 1
            continue
        
        # Consonant detection
        c = text[i]
        c_len = 1
        if i+1 < length and text[i:i+2] in cons and text[i:i+2] != 'ṃ':
            c = text[i:i+2]
            c_len = 2
        
        if c not in cons:
            # Unknown char or vowel in weird place
            # Just add it?
            if c in vowels:
                 # Should have been handled after consonant
                 pass
            res += c
            i += 1
            continue
        
        thai_c = cons[c]
        
        # Look ahead for vowel
        v = ""
        v_len = 0
        if i + c_len < length:
            next_char = text[i + c_len]
            if next_char in vowels:
                v = next_char
                v_len = 1
        
        if v:
            thai_v = vowels[v]
            if v in ['e', 'o']:
                res += thai_v + thai_c
            else:
                res += thai_c + thai_v
            i += c_len + v_len
        else:
            # No vowel -> Pinthu
            # Check if it's Niggahita?
            if c == 'ṃ':
                res += 'ํ'
            else:
                res += thai_c + 'ฺ'
            i += c_len
    
    # Post-fix for Niggahita
    res = res.replace("ิํ", "ึ") # i + m -> eu
    
    return res

def normalize_dpd_root(root_str):
    # 1. Strip √
    s = root_str.replace("√", "").strip()
    # 2. Strip numbers and spaces (e.g., "gam 1" -> "gam")
    s = re.sub(r'\s+\d+$', '', s)
    s = s.strip()
    
    # 3. Transliterate
    thai = roman_to_thai_robust(s)
    
    # 4. Strip final Pinthu if present
    # But only if it's the very last character
    if thai.endswith("ฺ"):
        thai = thai[:-1]
        
    return thai

def map_sign(dpd_sign):
    if not dpd_sign: return ""
    m = {
        "a": "อ",
        "ya": "ย",
        "nu": "ณุ",
        "nā": "นา",
        "o": "โอ",
        "e": "เณ",
        "aya": "ณย"
    }
    return m.get(dpd_sign, dpd_sign)

def map_group(dpd_group):
    if not dpd_group: return ""
    # DPD: bhū, rudh, div, sw, kī, gah, tan, cur
    m = {
        "bhū": "ภู",
        "rudh": "รุธ",
        "div": "ทิว",
        "sv": "สุ", # sw? check DPD
        "sw": "สุ",
        "ki": "กี", # kī
        "kī": "กี",
        "gah": "คห",
        "tan": "ตน",
        "cur": "จุร"
    }
    return m.get(str(dpd_group), str(dpd_group)) # ensure string

def load_vocab_roots():
    path = os.path.join("data", "vocab-roots.js")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        # Strip "const vocabRoots = " and ";"
        json_str = content.replace("const vocabRoots = ", "").strip().rstrip(";")
        return json.loads(json_str)

def save_vocab_roots(data):
    path = os.path.join("data", "vocab-roots.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write("const vocabRoots = " + json.dumps(data, ensure_ascii=False, indent=2) + ";")

def main():
    print("Loading vocab-roots.js...")
    vocab_roots = load_vocab_roots()
    print(f"Loaded {len(vocab_roots)} roots from vocab-roots.js")
    
    print("Connecting to DPD DB...")
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM dpd_roots")
        dpd_roots = cursor.fetchall()
        print(f"Loaded {len(dpd_roots)} roots from DPD DB")
        
        matched_count = 0
        new_entries_count = 0
        new_keys_count = 0
        
        for r in dpd_roots:
            # Normalize key
            thai_key = normalize_dpd_root(r['root'])
            
            if "phand" in r['root'] or "siṃs" in r['root']:
                print(f"DEBUG: Processing {r['root']} -> {thai_key}. In vocab? {thai_key in vocab_roots}")

            pali_meanings = []
            if r['dhatupatha_pali'] and r['dhatupatha_pali'] != "-": pali_meanings.append(r['dhatupatha_pali'])
            if r['dhatumanjusa_pali'] and r['dhatumanjusa_pali'] != "-": pali_meanings.append(r['dhatumanjusa_pali'])
            if r['dhatumala_pali'] and r['dhatumala_pali'] != "-": pali_meanings.append(r['dhatumala_pali'])
            
            pali_meaning_str = ", ".join(list(set(pali_meanings))) # Dedupe
            
            new_entry = {
                "root": thai_key,
                "meaning_pali": pali_meaning_str if pali_meaning_str else r['root_meaning'],
                "meaning_thai": f"(DPD) {r['root_meaning']}",
                "example": r['root_example'] if r['root_example'] else "", 
                "group": f"{map_group(r['root_group'])} ({map_sign(r['root_sign'])})",
                "page": "", 
                "source": "DPD"
            }
            
            # Check if exists
            if thai_key in vocab_roots:
                matched_count += 1
                
                # Check if already added (avoid duplicates if re-running)
                # Update if exists
                exists_idx = -1
                for i, entry in enumerate(vocab_roots[thai_key]):
                    if entry.get("source") == "DPD" and entry.get("meaning_thai") == new_entry["meaning_thai"]:
                        exists_idx = i
                        break
                
                if exists_idx != -1:
                    # Update existing
                    vocab_roots[thai_key][exists_idx] = new_entry
                else:
                    # Add new
                    vocab_roots[thai_key].append(new_entry)
                    new_entries_count += 1
            else:
                # Add NEW root key
                vocab_roots[thai_key] = [new_entry]
                new_keys_count += 1
        
        print(f"Matched {matched_count} DPD roots to existing keys.")
        print(f"Added {new_entries_count} new DPD entries to existing keys.")
        print(f"Added {new_keys_count} new root keys from DPD.")
        
        # Save
        save_vocab_roots(vocab_roots)
        print("Saved updated vocab-roots.js")
        
    finally:
        conn.close()

if __name__ == "__main__":
    main()
