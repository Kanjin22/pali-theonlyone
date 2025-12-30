import sqlite3
import json
import os
import re

db_path = "dpd_data/dpd.db"
output_path = "data/vocab-roots-dpd.js"

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

# Roman to Thai Transliteration Logic
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
        # Special
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
        # Check for multi-char consonants first
        char = text[i]
        next_char = text[i+1] if i + 1 < length else ""
        
        cons = ""
        cons_len = 0
        
        # Double char consonants
        if char + next_char in consonants:
            cons = consonants[char + next_char]
            cons_len = 2
        elif char in consonants:
            cons = consonants[char]
            cons_len = 1
            
        if cons:
            # We have a consonant
            i += cons_len
            
            # Check for vowel
            vowel_char = text[i] if i < length else ""
            
            if vowel_char in vowels:
                # Vowel found
                v_thai = vowels[vowel_char]
                
                # Handle pre-positioned vowels (e, o)
                if vowel_char in ['e', 'o']:
                    res += v_thai + cons
                else:
                    res += cons + v_thai
                
                i += 1
                
                # Check for Niggahita after vowel (e.g. aṃ, iṃ)
                next_v = text[i] if i < length else ""
                if next_v == 'ṃ':
                    res += 'ํ'
                    i += 1
            elif vowel_char == 'ṃ':
                 # Consonant + ṃ (implicit a + ṃ) -> กํ
                 res += cons + 'ํ'
                 i += 1
            else:
                # No vowel -> implicit 'a' or Phinthu?
                # In Pali Roman, 'k' at end means 'k'+Virama usually? 
                # Or 'ka' is explicit 'a'.
                # But here inputs are like "akkh" -> a-k-kh (a, k-stop, kh)
                # "akkh" -> อ กฺ ข
                # Logic: If next char is consonant or end, and we didn't consume a vowel:
                # Roman 'k' usually implies 'k' with virama if no 'a'.
                # WAIT. 'ka' = ก. 'k' = กฺ.
                # So if no vowel follows, add Phinthu.
                res += cons + 'ฺ'
        else:
            # Vowel at start or special char
            if char in vowels:
                # Vowel at start (e.g. akkh -> a...)
                # Map initial vowels: a->อ, ā->อา, i->อิ, etc.
                initial_vowels = {
                    'a': 'อ', 'ā': 'อา', 'i': 'อิ', 'ī': 'อี',
                    'u': 'อุ', 'ū': 'อู', 'e': 'เอ', 'o': 'โอ'
                }
                if char in initial_vowels:
                    res += initial_vowels[char]
                    i += 1
                    # Check for Niggahita
                    next_v = text[i] if i < length else ""
                    if next_v == 'ṃ':
                        res += 'ํ'
                        i += 1
                else:
                    # Unknown char, just keep it? or skip
                    # Remove root symbol √
                    if char != '√' and char != ' ':
                         res += char
                    i += 1
            else:
                # Unknown char (space, dash, etc)
                if char not in ['√']:
                    res += char
                i += 1
                
    return res

print(f"Connecting to {db_path}...")
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# Find roots table
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cursor.fetchall()]
print(f"Tables found: {tables}")

roots_table = None
if "dpd_roots" in tables:
    roots_table = "dpd_roots"
elif "roots" in tables:
    roots_table = "roots"

if not roots_table:
    print("No roots table found. Exiting.")
    conn.close()
    exit(1)

print(f"Using table: {roots_table}")

# Get columns
cursor.execute(f"PRAGMA table_info({roots_table})")
columns = [row[1] for row in cursor.fetchall()]
print(f"Columns: {columns}")

# Query data
query = f"SELECT * FROM {roots_table}"
cursor.execute(query)
rows = cursor.fetchall()

vocab_roots = []
count = 0

for row in rows:
    # 1. Root
    root_word = row['root'] if 'root' in columns else ""
    root_clean = root_word.strip()
    root_pali = roman_to_thai(root_clean).replace("√", "") # Ensure no √ in Thai
    
    # 2. Group
    group = row['root_group'] if 'root_group' in columns else ""
    
    # Thai Group Mapping
    group_map = {
        1: "ภู (อ)",
        2: "รุธ (ํอ)",
        3: "ทิว (ย)",
        4: "สุ (ณุ ณา อุณา)",
        5: "กี (นา)",
        6: "คห (ณฺหา ปฺป)",
        7: "ตน (โอ ยิร)",
        8: "จุร (เณ ณย)"
    }
    
    # Roman Group Mapping
    group_roman_map = {
        1: "bhūvādigaṇa",
        2: "rudhādigaṇa",
        3: "divādigaṇa",
        4: "svādigaṇa",
        5: "kiyādigaṇa",
        6: "gahādigaṇa",
        7: "tanādigaṇa",
        8: "curādigaṇa"
    }
    
    try:
        group_int = int(group)
        group_pali = group_map.get(group_int, str(group))
        group_roman = group_roman_map.get(group_int, str(group))
    except:
        group_pali = str(group)
        group_roman = str(group)
        
    # 3. Meaning
    # Try to find Pali meaning first
    meaning_pali_roman = ""
    if 'dhatupatha_pali' in columns and row['dhatupatha_pali'] and row['dhatupatha_pali'] != '-':
        meaning_pali_roman = row['dhatupatha_pali']
    elif 'dhatumanjusa_pali' in columns and row['dhatumanjusa_pali'] and row['dhatumanjusa_pali'] != '-':
        meaning_pali_roman = row['dhatumanjusa_pali']
    elif 'dhatumala_pali' in columns and row['dhatumala_pali'] and row['dhatumala_pali'] != '-':
        meaning_pali_roman = row['dhatumala_pali']
        
    meaning_pali = roman_to_thai(meaning_pali_roman)
    
    # Thai Meaning (English for now)
    meaning_thai = row['root_meaning'] if 'root_meaning' in columns else ""
    
    # 4. Examples (Udaharana)
    example_str = row['root_example'] if 'root_example' in columns else ""
    if not example_str and 'root_info' in columns:
        example_str = row['root_info']
        
    udaharana = []
    if example_str:
        # Split by comma or newline
        parts = re.split(r'[,\n]', example_str)
        for p in parts:
            p = p.strip()
            if p:
                udaharana.append(roman_to_thai(p))
                
    # Construct Entry Object
    entry = {
        "root_pali": root_pali,
        "root_roman": root_clean.replace("√", "").strip(),
        "group_pali": group_pali,
        "group_roman": group_roman,
        "meaning_thai": meaning_thai,
        "meaning_pali": meaning_pali,
        "udaharana": udaharana,
        "source": "DPD",
        "page": "",
        "katha": ""
    }
    
    vocab_roots.append(entry)
    count += 1

conn.close()

print(f"Processed {count} roots.")

# Write to JS file
with open(output_path, "w", encoding="utf-8") as f:
    f.write("export const dpdRoots = ")
    json.dump(vocab_roots, f, ensure_ascii=False, indent=2)
    f.write(";")

print(f"Saved to {output_path}")
