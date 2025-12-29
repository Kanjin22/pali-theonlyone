import re
import json
import os

# Paths
INPUT_DERIVED = r"d:\pali-theonlyone\data\vocab-roots-dpd-derived.js"
INPUT_DPD_VOCAB = r"d:\pali-theonlyone\data\vocab-dpd.js"
OUTPUT_ENRICHED = r"d:\pali-dhatu-app\src\data\vocab-roots-dpd-derived-enriched.js"

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

def load_js_object(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    # Strip "const name = " and ";" and "export default"
    content = re.sub(r'export default .*', '', content)
    content = re.sub(r'const \w+ = ', '', content)
    content = content.strip().rstrip(";")
    # Remove comments
    content = re.sub(r'//.*', '', content)
    return json.loads(content)

def extract_construction(defn):
    match = re.search(r'\[(.*?)\]', defn, re.DOTALL)
    return match.group(1) if match else None

def extract_first_suffix(construction):
    if not construction:
        return None
    
    # Clean up: take the first line if multiple lines (e.g. [A + B\nC + D])
    # We assume the first line contains the root decomposition.
    construction = construction.split('\n')[0]
    
    # Split by +
    parts = construction.split('+')
    parts = [p.strip() for p in parts]
    
    for i, p in enumerate(parts):
        # Check for root symbol
        if '√' in p:
            # This is the root part.
            # Next part is the suffix
            if i + 1 < len(parts):
                suffix = parts[i+1]
                # Clean up suffix (remove > or other artifacts if present)
                suffix = suffix.split('>')[0].strip()
                return suffix
    
    return None

def main():
    print("Loading data...")
    try:
        derived_data = load_js_object(INPUT_DERIVED)
        vocab_dpd = load_js_object(INPUT_DPD_VOCAB)
    except Exception as e:
        print(f"Error loading JS files: {e}")
        return

    print(f"Loaded {len(derived_data)} root entries.")
    
    enriched_data = {}
    
    for root, words in derived_data.items():
        # Convert Roman Root Key to Thai Key
        thai_key = normalize_dpd_root(root)
        
        enriched_list = []
        for word in words:
            defn = vocab_dpd.get(word)
            stem_ending = None
            
            # Helper to process definition list or string
            def process_defn(d):
                const = extract_construction(d)
                return extract_first_suffix(const)

            if defn:
                if isinstance(defn, list):
                    # Try to find a suffix in any of the definitions
                    for d in defn:
                        stem_ending = process_defn(d)
                        if stem_ending:
                            break
                    # Use the first definition for display
                    display_defn = defn[0]
                else:
                    stem_ending = process_defn(defn)
                    display_defn = defn
            else:
                display_defn = ""
            
            # Store as object
            enriched_list.append({
                "w": word,
                "e": stem_ending, # e for ending / first suffix
                "d": display_defn
            })
        
        # Merge if key exists (multiple DPD roots mapping to same Thai key)
        if thai_key in enriched_data:
            # Avoid duplicates if any
            existing_words = {x['w'] for x in enriched_data[thai_key]}
            for item in enriched_list:
                if item['w'] not in existing_words:
                    enriched_data[thai_key].append(item)
                    existing_words.add(item['w'])
        else:
            enriched_data[thai_key] = enriched_list
        
    print(f"Enriched {len(enriched_data)} roots (mapped to Thai keys).")
    
    # Save as JS
    output_content = f"const vocabRootsDpdDerivedEnriched = {json.dumps(enriched_data, ensure_ascii=False, indent=2)};\n\nexport default vocabRootsDpdDerivedEnriched;"
    
    os.makedirs(os.path.dirname(OUTPUT_ENRICHED), exist_ok=True)
    with open(OUTPUT_ENRICHED, "w", encoding="utf-8") as f:
        f.write(output_content)
    
    print(f"Saved to {OUTPUT_ENRICHED}")

if __name__ == "__main__":
    main()
