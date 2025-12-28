import json
import re
import os

# Paths
DATA_DIR = r'd:\pali-theonlyone\data'
OUTPUT_PATH = r'd:\pali-dhatu-app\src\data\vocab-derived-meanings.js'

FILES = {
    'Etipitaka': os.path.join(DATA_DIR, 'vocab-etipitaka.js'),
    'Tananunto': os.path.join(DATA_DIR, 'vocab-tananunto.js'),
    'NewGen': os.path.join(DATA_DIR, 'vocab-newgen.js')
}

DPD_DERIVED_PATH = os.path.join(DATA_DIR, 'vocab-roots-dpd-derived.js')

# Roman to Thai Mapping (simplified for Python)
# We can reuse the logic from existing scripts or just implement the basics needed for Pali
def roman_to_thai(text):
    if not text: return ""
    
    map_char = {
        'k': 'ก', 'kh': 'ข', 'g': 'ค', 'gh': 'ฆ', 'ṅ': 'ง',
        'c': 'จ', 'ch': 'ฉ', 'j': 'ช', 'jh': 'ฌ', 'ñ': 'ญ',
        'ṭ': 'ฏ', 'ṭh': 'ฐ', 'ḍ': 'ฑ', 'ḍh': 'ฒ', 'ṇ': 'ณ',
        't': 'ต', 'th': 'ถ', 'd': 'ท', 'dh': 'ธ', 'n': 'น',
        'p': 'ป', 'ph': 'ผ', 'b': 'พ', 'bh': 'ภ', 'm': 'ม',
        'y': 'ย', 'r': 'ร', 'l': 'ล', 'v': 'ว', 's': 'ส', 'h': 'ห', 'ḷ': 'ฬ',
        'a': '', 'ā': 'า', 'i': 'ิ', 'ī': 'ี', 'u': 'ุ', 'ū': 'ู', 
        'e': 'เ', 'o': 'โ', 'ṃ': 'ํ'
    }
    
    vowels = ['a', 'ā', 'i', 'ī', 'u', 'ū', 'e', 'o']
    consonants = ['k', 'kh', 'g', 'gh', 'ṅ', 'c', 'ch', 'j', 'jh', 'ñ', 
                  'ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 't', 'th', 'd', 'dh', 'n', 
                  'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'l', 'v', 's', 'h', 'ḷ']
                  
    res = ""
    i = 0
    length = len(text)
    
    while i < length:
        c = text[i]
        
        # Check for multi-char consonant
        if i + 1 < length:
            two_chars = text[i:i+2]
            if two_chars in consonants:
                c = two_chars
        
        if c in consonants:
            # It's a consonant
            thai_c = map_char[c]
            char_len = len(c)
            
            # Look ahead for vowel or niggahita
            next_idx = i + char_len
            
            if next_idx < length:
                next_c = text[next_idx]
                
                if next_c in vowels:
                    # Consonant + Vowel
                    if next_c == 'e' or next_c == 'o':
                        res += map_char[next_c] + thai_c
                    else:
                        res += thai_c + map_char[next_c]
                    i = next_idx + 1 # Skip consonant and vowel
                elif next_c == 'ṃ':
                    # Consonant + Niggahita (implied 'a')
                    res += thai_c + map_char['ṃ']
                    i = next_idx + 1
                else:
                    # Consonant + Consonant (or End) -> Pinthu
                    # Check if next is actually start of another consonant
                    # e.g. 'k' + 'k'.
                    res += thai_c + 'ฺ'
                    i = next_idx
            else:
                # End of word, add Pinthu if ends in consonant?
                # Pali words usually end in vowel or niggahita.
                # If ends in consonant, it's usually suppressed vowel?
                # Actually, standard Pali words end in vowel.
                # But if we have stems?
                # Let's assume Pinthu for safety if no vowel.
                res += thai_c + 'ฺ'
                i = next_idx
                
        elif c in vowels:
            # Standalone vowel (e.g. at start of word)
            if c == 'e' or c == 'o':
                res += map_char[c] + 'อ'
            else:
                res += 'อ' + map_char[c]
            i += 1
            
        elif c == 'ṃ':
            res += map_char[c]
            i += 1
        else:
            res += c
            i += 1
            
    return res

def load_js_object(path):
    print(f"Loading {path}...")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Regex to capture the object content: const x = { ... };
            # We assume it starts with "const ... = {" and ends with "};" or similar.
            match = re.search(r'=\s*(\{[\s\S]*\});?', content)
            if match:
                json_str = match.group(1)
                # JS keys might not be quoted. e.g. key: "value"
                # We need to quote keys: key: -> "key":
                # But be careful about values containing colons.
                # Fortunately, our dict files usually have quoted keys "key": "value"
                # Let's check vocab-tananunto.js again.
                # "กกุฏปาท": "..." -> Quoted.
                # So standard JSON.loads might work.
                return json.loads(json_str)
            else:
                print(f"Regex match failed for {path}")
                return {}
    except Exception as e:
        print(f"Error loading {path}: {e}")
        return {}

def main():
    # 1. Load Dictionaries
    dicts = {}
    for name, path in FILES.items():
        if os.path.exists(path):
            dicts[name] = load_js_object(path)
        else:
            print(f"File not found: {path}")

    # 2. Load DPD Derived List
    dpd_data = load_js_object(DPD_DERIVED_PATH)
    if not dpd_data:
        print("Failed to load DPD derived data")
        return

    # 3. Collect all unique Roman words
    all_roman_words = set()
    for root, words in dpd_data.items():
        for word in words:
            all_roman_words.add(word)
    
    print(f"Total unique derived words (Roman): {len(all_roman_words)}")

    # 4. Transliteration Setup (Inline simplified version or load)
    # Since I cannot easily import, I'll implement a robust-enough one or rely on what I have.
    # Actually, `extract_derived_meanings.py` is available. I can import it if I put this script in same dir.
    # But `extract_derived_meanings.py` is in `d:\pali-theonlyone\scripts`.
    # I will verify the path.
    
    # 5. Process
    combined_meanings = {}
    found_count = 0
    
    # For Roman->Thai, I really need a good converter.
    # I'll rely on the `extract_derived_meanings` module if possible.
    
    from extract_derived_meanings import roman_to_thai
    
    for roman in all_roman_words:
        thai = roman_to_thai(roman)
        
        entry_parts = []
        
        # Check each dictionary
        # Priority: Etipitaka -> Tananunto -> NewGen
        order = ['Etipitaka', 'Tananunto', 'NewGen']
        
        for source in order:
            data = dicts.get(source)
            if data and thai in data:
                definition = data[thai]
                
                # Handle Object format (NewGen)
                if isinstance(definition, dict) and 'details' in definition:
                    # Join details array
                    definition = "\n".join(definition['details'])
                elif isinstance(definition, dict):
                     # Unknown dict format, maybe stringify or skip
                     definition = str(definition)
                
                # Ensure string
                if not isinstance(definition, str):
                    definition = str(definition)
                    
                # Cleanup: remove HTML breaks if any, but keep structure
                definition = definition.replace('<br>', '\n')
                entry_parts.append(f"[{source}]\n{definition}")
        
        if entry_parts:
            # Join with separator
            full_meaning = "\n\n---\n\n".join(entry_parts)
            combined_meanings[thai] = full_meaning
            found_count += 1
            
    print(f"Found meanings for {found_count} words.")
    
    # 6. Save
    output_content = f"const vocabDerivedMeanings = {json.dumps(combined_meanings, ensure_ascii=False, indent=2)};\n\nexport default vocabDerivedMeanings;"
    
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(output_content)
    
    print(f"Saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
