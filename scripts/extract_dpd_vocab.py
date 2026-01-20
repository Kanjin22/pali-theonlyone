import sqlite3
import json
import os
import re

db_path = "dpd_data/dpd.db"
output_path = "data/dicts/vocab-general-dpd.js"

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

# Roman to Thai Transliteration Logic (Same as roots)
def roman_to_thai(text):
    if not text:
        return ""
    
    # 1. Pre-processing
    text = text.lower().strip()
    
    # Mapping
    consonants = {
        'k': 'ก', 'kh': 'ข', 'g': 'ค', 'gh': 'ฆ', 'ṅ': 'ง',
        'c': 'จ', 'ch': 'ฉ', 'j': 'ช', 'jh': 'ฌ', 'ñ': 'ญ',
        'ṭ': 'ฏ', 'ṭh': 'ฐ', 'ḍ': 'ฑ', 'ḍh': 'ฒ', 'ṇ': 'ณ',
        't': 'ต', 'th': 'ถ', 'd': 'ท', 'dh': 'ธ', 'n': 'น',
        'p': 'ป', 'ph': 'ผ', 'b': 'พ', 'bh': 'ภ', 'm': 'ม',
        'y': 'ย', 'r': 'ร', 'l': 'ล', 'v': 'ว', 's': 'ส', 'h': 'ห', 'ḷ': 'ฬ',
        'ṃ': 'ํ'
    }
    
    vowels = {
        'a': '', # Implicit
        'ā': 'า',
        'i': 'ิ',
        'ī': 'ี',
        'u': 'ุ',
        'ū': 'ู',
        'e': 'เ',
        'o': 'โ'
    }
    
    res = ""
    i = 0
    length = len(text)
    
    while i < length:
        char = text[i]
        next_char = text[i+1] if i + 1 < length else ""
        
        cons = ""
        cons_len = 0
        
        if char + next_char in consonants:
            cons = consonants[char + next_char]
            cons_len = 2
        elif char in consonants:
            cons = consonants[char]
            cons_len = 1
            
        if cons:
            i += cons_len
            vowel_char = text[i] if i < length else ""
            
            if vowel_char in vowels:
                v_thai = vowels[vowel_char]
                if vowel_char in ['e', 'o']:
                    res += v_thai + cons
                else:
                    res += cons + v_thai
                i += 1
                
                next_v = text[i] if i < length else ""
                if next_v == 'ṃ':
                    res += 'ํ'
                    i += 1
            elif vowel_char == 'ṃ':
                 res += cons + 'ํ'
                 i += 1
            else:
                res += cons + 'ฺ'
        else:
            if char in vowels:
                initial_vowels = {
                    'a': 'อ', 'ā': 'อา', 'i': 'อิ', 'ī': 'อี',
                    'u': 'อุ', 'ū': 'อู', 'e': 'เอ', 'o': 'โอ'
                }
                if char in initial_vowels:
                    res += initial_vowels[char]
                    i += 1
                    next_v = text[i] if i < length else ""
                    if next_v == 'ṃ':
                        res += 'ํ'
                        i += 1
                else:
                    res += char
                    i += 1
            else:
                res += char
                i += 1
                
    return res

print(f"Connecting to {db_path}...")
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# Query Headwords
print("Querying dpd_headwords...")
cursor.execute("""
    SELECT 
        lemma_1, 
        meaning_1, 
        pos, 
        grammar, 
        construction, 
        example_1, 
        example_2 
    FROM dpd_headwords 
    WHERE lemma_1 IS NOT NULL
""")
rows = cursor.fetchall()

vocab_list = []
count = 0

print("Processing rows...")
for row in rows:
    lemma = row['lemma_1']
    if not lemma:
        continue
        
    pali_roman = lemma.strip()
    pali_thai = roman_to_thai(pali_roman)
    
    meaning = row['meaning_1'] if row['meaning_1'] else ""
    pos = row['pos'] if row['pos'] else ""
    grammar = row['grammar'] if row['grammar'] else ""
    construction = row['construction'] if row['construction'] else ""
    
    examples = []
    if row['example_1']: examples.append(row['example_1'])
    if row['example_2']: examples.append(row['example_2'])
    
    entry = {
        "pali_thai": pali_thai,
        "pali_roman": pali_roman,
        "meaning": meaning,
        "pos": pos,
        "grammar": grammar,
        "construction": construction,
        "examples": examples,
        "source": "DPD"
    }
    
    vocab_list.append(entry)
    count += 1

conn.close()

print(f"Processed {count} entries.")

# Write to JS file
with open(output_path, "w", encoding="utf-8") as f:
    f.write("export const dpdVocab = ")
    json.dump(vocab_list, f, ensure_ascii=False, indent=2)
    f.write(";")

print(f"Saved to {output_path}")
