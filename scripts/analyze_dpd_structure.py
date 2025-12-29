
import json
import re

def load_js_object(path, var_name):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Basic stripping of JS syntax
            content = content.replace(f"const {var_name} = ", "")
            content = re.sub(r'export default .*', '', content)
            content = content.strip().rstrip(";")
            
            # Remove trailing commas (simple regex approach)
            content = re.sub(r',(\s*[}\]])', r'\1', content)
            
            return json.loads(content)
    except Exception as e:
        print(f"Error loading {path}: {e}")
        return {}

def extract_construction(defn):
    match = re.search(r'\[(.*?)\]', defn)
    if match:
        return match.group(0)
    return None

def extract_stem_from_construction(const):
    # e.g. [karo + ti] -> karo
    # e.g. [aggha + ti] -> aggha
    if not const: return None
    
    clean = const.strip("[]")
    parts = clean.split("+")
    
    # Heuristic: The part before the final 'ti' (or similar ending) is the base/stem
    # Or, if it's "root + affix + ending", we want "root + affix"
    
    # Common endings to ignore for stem extraction
    endings = ["ti", "nti", "si", "tha", "mi", "ma", "te", "ante", "se", "vhe", "e", "mhase"]
    
    # Let's try to find the last part that matches an ending
    # But usually construction is simplified like [base + ending]
    
    if len(parts) >= 2:
        last = parts[-1].strip()
        if last in endings:
            # Return everything before the ending joined
            return "".join(parts[:-1]).strip().replace(" ", "")
            
    return None

def analyze():
    print("Loading data...")
    vocab_dpd = load_js_object(r"d:\pali-theonlyone\data\vocab-dpd.js", "vocabDPD")
    roots_dpd = load_js_object(r"d:\pali-theonlyone\data\vocab-roots-dpd-derived.js", "vocabRootsDpdDerived")
    
    print("Inverting root map...")
    word_to_root = {}
    for root, words in roots_dpd.items():
        for word in words:
            # Handle potential duplicates (one word multiple roots?) - Just overwrite for now
            word_to_root[word] = root
            
    test_words = [
        "karoti",    # Tan (o)
        "tanoti",    # Tan (o)
        "deseti",    # Cur (ne/naya -> e)
        "agghati",   # Bhu (a)
        "dibbati",   # Div (ya) -> dibba
        "suṇāti",    # Su (na/nu) -> suṇā
        "kiṇāti",    # Ki (na) -> kinā
        "rundhati",  # Rudh (a-niggahita) -> rundha
        "bhuñjati",  # Rudh (a-niggahita) -> bhuñja
        "kīḷati",    # Bhu (a)
        "pajahati",  # Juhu (a) -> pajaha
        "gacchati",  # Bhu (a) -> gaccha
        "gameti"     # Cur (caus) -> game
    ]
    
    print("\n--- Analysis Results ---")
    for word in test_words:
        root = word_to_root.get(word)
        defn = vocab_dpd.get(word)
        
        if not root or not defn:
            print(f"{word}: Missing data (Root: {root}, Defn found: {bool(defn)})")
            continue
            
        const = extract_construction(defn)
        stem = extract_stem_from_construction(const)
        
        if stem:
            last_char = stem[-1]
            print(f"{word} | Root: {root} | Stem: {stem} | Ending: -{last_char}")
        else:
            print(f"{word} | Root: {root} | Could not extract stem")

if __name__ == "__main__":
    analyze()
