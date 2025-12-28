import json
import re
import os

# --- Copy of roman_to_thai from extract_derived_meanings.py ---
def roman_to_thai(text):
    if not text: return ""
    s = text
    
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
        key = c
        char_len = 1
        if i + 1 < length:
            two_chars = text[i:i+2]
            if two_chars in consonants:
                key = two_chars
                char_len = 2
        
        if key in consonants:
            # It's a consonant
            thai_c = map_char[key]
            
            # Look ahead for vowel or niggahita or consonant
            next_idx = i + char_len
            
            # Check next char (might be start of 2-char consonant)
            next_is_consonant = False
            next_char_val = ""
            
            if next_idx < length:
                next_c = text[next_idx]
                next_two = text[next_idx:next_idx+2] if next_idx + 1 < length else ""
                
                if next_two in consonants:
                    next_is_consonant = True
                    next_char_val = next_two
                elif next_c in consonants:
                    next_is_consonant = True
                    next_char_val = next_c
                
                if next_is_consonant:
                     res += thai_c + 'ฺ'
                     # Don't advance i here, just handled the current consonant
                elif next_c in vowels:
                    if next_c == 'e' or next_c == 'o':
                        res += map_char[next_c] + thai_c
                    else:
                        res += thai_c + map_char[next_c]
                    i += 1 # skip vowel
                elif next_c == 'ṃ':
                    res += thai_c + map_char['ṃ']
                    i += 1 # skip niggahita
                else:
                    # End of word or unknown? Assume Pinthu
                     res += thai_c + 'ฺ'
            else:
                # End of word
                 res += thai_c + 'ฺ'
                 
            i += char_len
            
        elif key in vowels:
            # Standalone vowel
            if key == 'e' or key == 'o':
                res += map_char[key] + 'อ'
            else:
                res += 'อ' + map_char[key]
            i += 1
            
        elif key == 'ṃ':
            res += map_char[key]
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
            match = re.search(r'=\s*(\{[\s\S]*\});?', content)
            if match:
                return json.loads(match.group(1))
            else:
                print(f"Regex match failed for {path}")
                return {}
    except Exception as e:
        print(f"Error loading {path}: {e}")
        return {}

def main():
    roman_word = "kaṭṭhahārikā"
    thai_word = roman_to_thai(roman_word)
    print(f"Roman: {roman_word}")
    print(f"Thai (converted): {thai_word}")
    
    # Load Tananunto
    tananunto_path = r'd:\pali-theonlyone\data\vocab-tananunto.js'
    tananunto = load_js_object(tananunto_path)
    
    if thai_word in tananunto:
        print(f"Found in Tananunto: Yes")
    else:
        print(f"Found in Tananunto: No")
        # Try to find what it should be
        print("Searching for similar keys in Tananunto...")
        for k in tananunto.keys():
            if k.startswith("กฏฺฐ"):
                print(f"Match candidate: {k}")

if __name__ == "__main__":
    main()
