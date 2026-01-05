import json
import glob
import re

def load_all_raw_titles():
    titles = set()
    files = glob.glob('d:/pali-theonlyone/data/raw/purivaro-book*-raw.json')
    for fpath in files:
        try:
            with open(fpath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for line in data:
                    t = line.get('story_title', '').strip()
                    if t: titles.add(t)
        except:
            pass
    return sorted(list(titles))

def main():
    raw_titles = load_all_raw_titles()
    
    with open('d:/pali-theonlyone/missing_keys_report.txt', 'r', encoding='utf-8') as f:
        report_lines = f.readlines()
        
    suggestions = {}
    
    for line in report_lines:
        if not line.startswith('NO_MAPPING'): continue
        
        # Parse line: NO_MAPPING: key | Thai Name [Page]
        parts = line.split('|')
        key_part = parts[0].replace('NO_MAPPING:', '').strip()
        thai_part = parts[1].strip() if len(parts) > 1 else ""
        
        # Extract keywords from key (e.g. d04_v06_s01_radha -> radha)
        key_name = key_part.split('_')[-1]
        if key_name.isdigit() or len(key_name) < 3:
             key_name = key_part.split('_')[-2]
             
        # Extract keywords from Thai name (remove "เรื่อง", "พระ", "เถระ")
        thai_keyword = thai_part.split('[')[0].strip()
        thai_keyword = thai_keyword.replace('เรื่อง', '').replace('พระ', '').replace('เถระ', '').replace('นาง', '').replace('ฯ', '').strip()
        
        # Search in raw_titles
        best_match = None
        
        # Strategy 1: Thai keyword in raw title
        candidates = [t for t in raw_titles if thai_keyword in t]
        
        # Strategy 2: If no match, try looser search
        if not candidates and len(thai_keyword) > 2:
            candidates = [t for t in raw_titles if thai_keyword[:2] in t]
            
        if candidates:
            # Pick shortest match usually? Or first?
            best_match = candidates[0]
            
        print(f"'{key_name}': '{best_match}', # {thai_part}")

if __name__ == "__main__":
    main()
