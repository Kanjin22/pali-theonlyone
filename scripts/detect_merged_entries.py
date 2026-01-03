import re

input_file = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

# Pattern: Space + (Candidate Key) + Space + (POS)
# POS: น., ว., ก., นิ. (Noun, Adjective, Verb, Indeclinable)
# We strictly look for these start markers.
pattern = re.compile(r'\s([ก-ฮ\.\-\(\) ]+)\s(น\.|ว\.|ก\.|นิ\.)')

def check_merged_entries():
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    found_count = 0
    for i, line in enumerate(lines):
        line = line.strip()
        if not line.startswith('"'):
            continue
            
        parts = line.split('": "', 1)
        if len(parts) != 2:
            continue
            
        value = parts[1]
        
        # Search for pattern in value, skip first 10 chars
        matches = list(pattern.finditer(value, 10))
        
        for match in matches:
            candidate_key = match.group(1).strip()
            pos = match.group(2)
            
            # Filters
            # 1. Candidate key shouldn't be too long (likely a sentence)
            if len(candidate_key) > 40:
                continue
            
            # 2. Candidate key shouldn't contain certain words that indicate it's part of a sentence
            # e.g. "เช่น", "ว่า", "ได้แก่", "คือ"
            if any(w in candidate_key for w in ["เช่น", "ว่า", "ได้แก่", "คือ", "ดู", "อ."]):
                continue

            # 3. Exclude if candidate ends with Case Marker (which would make POS look like next word)
            # e.g. "... ปุริส ป." -> "ป." matched as POS? No, regex expects น.|ว.|ก.|นิ.
            
            # 4. Exclude if candidate is just a number or symbol
            if re.match(r'^[\d\s\.\-]+$', candidate_key):
                continue
                
            # 5. Check for "Space" in candidate key - strong indicator of split word
            # e.g. "มิคารมาตุป าสาท"
            has_inner_space = ' ' in candidate_key
            
            # 6. Check for duplicate key (if candidate key == main key) - ignore
            main_key = parts[0].strip('"')
            if candidate_key == main_key:
                continue

            # Print
            print(f"Line {i+1}: Potential merged entry '{candidate_key}' ({pos})")
            print(f"  Context: ...{value[max(0, match.start()-20):min(len(value), match.end()+30)]}...")
            
            found_count += 1
            if found_count >= 50:
                break
        
        if found_count >= 50:
            break

if __name__ == "__main__":
    check_merged_entries()
