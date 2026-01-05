import re
import difflib

def normalize(text):
    # Remove common prefixes/suffixes for better matching
    text = text.strip()
    text = re.sub(r'^.*?เรื่อง', '', text) # Remove leading numbering and "Reuang"
    text = re.sub(r'\[.*?\]', '', text) # Remove [page number]
    
    # Remove honorifics/common words
    remove_words = ['พระ', 'นาง', 'เถระ', 'เถรี', 'อุบาสก', 'อุบาสิกา', 'เรื่อง', 'ภิกษุ', 'สามเณร', 'พราหมณ์', 'เศรษฐี', 'นาย', 'เจ้า']
    for word in remove_words:
        text = text.replace(word, '')
    
    return text.strip()

def load_raw_titles(path):
    with open(path, 'r', encoding='utf-8') as f:
        return [line.strip() for line in f if line.strip()]

def load_missing_keys(path):
    missing = []
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            if 'NO_MAPPING' in line or 'MISSING_DATA' in line:
                # Extract the Thai title part
                # Format: 1→NO_MAPPING: key | Thai Title [Page]
                parts = line.split('|')
                if len(parts) > 1:
                    full_thai = parts[1].strip()
                    # Clean up "-> ..." part if present
                    if '->' in full_thai:
                        full_thai = full_thai.split('->')[0].strip()
                    
                    key_part = parts[0].split(':')[1].strip()
                    missing.append({'key': key_part, 'full_thai': full_thai, 'search_term': normalize(full_thai)})
    return missing

def find_matches():
    raw_titles = load_raw_titles('d:/pali-theonlyone/temp_raw_titles.txt')
    
    # search_terms: key = identifier, value = search string
    search_terms = {
        'kassapa': 'มหร', # Mahadhana?
        'kassapa_2': 'พ่อค้า',
        'silava': 'ศีล',
        'silava_2': 'สีล',
        'cullaekasataka': 'เอกสาฏก',
        'cullaekasataka_2': 'สาฏก',
        'aparijjuta': 'บริขาร',
        'aparijjuta_2': 'ปริกฺขาร',
        'uposatha': 'อุโบสถ',
        'uposatha_2': 'อุโปสถ',
        'rupananda': 'รูปนันทา',
        'rupananda_2': 'ชนบทกัลยาณี',
        'sammunjani': 'สัมมุญช',
        'sammunjani_2': 'สมฺมุญฺช',
        'devorohana': 'เทโวโรหณ',
        'devorohana_2': 'ยมก',
        'anabhirata': 'ไม่ยินดี',
        'upasaka': 'อุบาสก',
        'kulaputta': 'กุลบุตร',
        'culasari': 'จูฬสารี',
        'culasari_2': 'จุลฺลสารี',
        'duccarita': 'ทุจริต',
        'duccarita_2': 'ทุจฺจริต',
        'nigantha': 'นิครนถ์',
        'nigantha_2': 'นิคนฺถ',
        'attadanta': 'ฝึกตน',
        'attadanta_2': 'ทนฺต',
        'paveyyaka': 'ปาเวยฺย',
        'paveyyaka_2': 'ช้าง',
    }
    
    print(f"Searching for {len(search_terms)} terms...")
    
    for key, term in search_terms.items():
        print(f"\n--- Searching for '{term}' ({key}) ---")
        matches = [t for t in raw_titles if term in t]
        
        # Deduplicate matches while preserving order
        seen = set()
        unique_matches = []
        for m in matches:
            if m not in seen:
                unique_matches.append(m)
                seen.add(m)
        
        for m in unique_matches[:5]:
            print(f"  {m}")

if __name__ == "__main__":
    find_matches()
