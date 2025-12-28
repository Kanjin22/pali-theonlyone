import json
import re
import os

# Paths
DPD_DERIVED_PATH = r'd:\pali-theonlyone\data\vocab-roots-dpd-derived.js'
ETIPITAKA_PATH = r'd:\pali-theonlyone\data\vocab-etipitaka.js'
OUTPUT_PATH = r'd:\pali-dhatu-app\src\data\vocab-derived-meanings.js'

# Roman to Thai Transliteration (Ported from PaliScript.js)
def roman_to_thai(text):
    if not text: return ""
    s = text

    # 1. Move pre-positioned vowels (e, o) to after consonant
    # JS: s = s.replace(/([เโไใ])((?:[ก-ฮ]ฺ)*[ก-ฮ])/g, "$2$1"); 
    # Wait, the JS logic was for Thai->Roman fix or Roman->Thai?
    # The JS `romanToThai` function:
    # 1. Maps Roman chars to Thai chars.
    # 2. Handles special cases.
    
    # Actually, the JS logic I saw was:
    # "Move pre-positioned vowels (เ, โ, ไ, ใ) to after the consonant cluster" -> This comment in JS seemed to be in `thaiToRoman`?
    # Let's re-read the JS code carefully.
    
    # Re-reading PaliScript.js:
    # romanToThai:
    # Iterate char by char.
    # If vowel e/o, add 'เ'/'โ' BEFORE the consonant? 
    # No, in Roman 'ke' -> Thai 'เก'. 'k' comes first.
    # The JS code:
    # if (vowels.includes(c)) { ... if (c === 'e' || c === 'o') res += map[c] + 'อ'; ... } -> This handles standalone vowels.
    # if (consonants.includes(nextChar)) ...
    # if (vowels.includes(nextChar)) {
    #    if (nextChar === 'e' || nextChar === 'o') {
    #        res += map[nextChar] + thaiC; // map['e'] is 'เ'. So 'เ' + 'ก' -> 'เก'. Correct.
    #    } else {
    #        res += thaiC + map[nextChar]; // 'ก' + 'า' -> 'กา'. Correct.
    #    }
    # }
    
    # So I need to implement this logic.
    
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
    while i < len(text):
        c = text[i]
        next_c = text[i+1] if i+1 < len(text) else ""
        
        # Multi-char consonants
        key = c + next_c
        char_len = 1
        
        if key in consonants:
            c = key
            char_len = 2
        elif c not in consonants:
            # Vowel or other
            if c in vowels:
                # Standalone vowel
                if c in ['e', 'o']:
                    res += map_char[c] + 'อ'
                else:
                    res += 'อ' + map_char[c]
            else:
                res += map_char.get(c, c)
            i += 1
            continue
            
        # It is a consonant
        thai_c = map_char[c]
        next_char_start = i + char_len
        next_char = text[next_char_start] if next_char_start < len(text) else ""
        
        # Check next char
        is_next_consonant = False
        if next_char in consonants:
            is_next_consonant = True
        elif next_char_start + 1 < len(text) and (next_char + text[next_char_start+1]) in consonants:
            is_next_consonant = True
            
        if is_next_consonant:
             res += thai_c + 'ฺ'
        elif next_char in vowels:
            if next_char in ['e', 'o']:
                res += map_char[next_char] + thai_c
            else:
                res += thai_c + map_char[next_char]
            
            # Consume vowel
            i += 1 # for vowel
            
            # Check Niggahita after vowel
            after_vowel_idx = next_char_start + 1
            if after_vowel_idx < len(text) and text[after_vowel_idx] == 'ṃ':
                 res += 'ํ'
                 i += 1
        elif next_char == 'ṃ':
            res += thai_c + 'ํ'
            i += 1
        else:
            # End or unknown -> Pinthu
            res += thai_c + 'ฺ'
            
        i += char_len
        
    return res

def load_js_object(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Remove "const variableName = " and trailing ";"
        content = re.sub(r'const\s+\w+\s*=\s*', '', content)
        content = content.strip().rstrip(';')
        # Fix JS keys (no quotes) to JSON keys (quotes) if needed
        # But wait, the files might have quoted keys already?
        # Let's check. vocab-roots-dpd-derived.js: "acc": [...] -> Quoted.
        # vocab-etipitaka.js: "กกฺขฬิย": ... -> Quoted.
        # So standard JSON.loads might work if format is clean JSON.
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            # Fallback: simple eval if safe (local trusted file)
            # Or use regex to parse if simple
            print(f"JSON decode failed for {path}. Trying simple parsing.")
            return None

def extract_meanings():
    print("Loading DPD Derived data...")
    dpd_data = load_js_object(DPD_DERIVED_PATH)
    if not dpd_data:
        print("Failed to load DPD data")
        return

    print("Loading Etipitaka data...")
    etipitaka_data = load_js_object(ETIPITAKA_PATH)
    if not etipitaka_data:
        print("Failed to load Etipitaka data")
        return

    derived_meanings = {}
    
    print("Extracting meanings...")
    count = 0
    found = 0
    
    # Collect all unique derived words
    all_words = set()
    for root, words in dpd_data.items():
        for word in words:
            all_words.add(word)
            
    print(f"Total unique derived words: {len(all_words)}")
    
    for word in all_words:
        thai_word = roman_to_thai(word)
        if thai_word in etipitaka_data:
            meaning = etipitaka_data[thai_word]
            # Cleanup meaning
            # 1. Remove <br>
            meaning = meaning.replace('<br>', ' ')
            # 2. Truncate if too long (optional, maybe keep full)
            # Let's keep first 100 chars for preview? Or full?
            # User wants "dictionary", so maybe fuller is better.
            # But for the list view, maybe just the definition.
            # Split by newlines and take first non-empty line?
            parts = re.split(r'\n|<br>|\.', meaning)
            short_meaning = parts[0].strip()
            if len(short_meaning) < 5: # If too short, maybe take more
                 short_meaning = meaning[:100] + "..."
            
            derived_meanings[thai_word] = short_meaning
            found += 1
        
        count += 1
        if count % 1000 == 0:
            print(f"Processed {count} words...")

    print(f"Found meanings for {found} out of {len(all_words)} words.")
    
    # Save to file
    output_content = f"const vocabDerivedMeanings = {json.dumps(derived_meanings, ensure_ascii=False, indent=2)};\n\nexport default vocabDerivedMeanings;"
    
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(output_content)
        
    print(f"Saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    extract_meanings()
