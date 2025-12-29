
import json
import re

# Mock loading vocabDPD (since it's a JS file, I'll just paste a few relevant entries or read the file properly)
# I'll read the file and strip the JS assignment part.

def load_vocab_dpd(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Remove "const vocabDPD = " and ";"
        json_str = content.replace("const vocabDPD = ", "").strip().rstrip(";")
        return json.loads(json_str)

def extract_paccaya(construction):
    # Pattern: Look for the element after the root
    # e.g., [na > a + √kaṅkh + a] -> root is kaṅkh, next is 'a'
    # e.g., [√aggh + a + ti] -> root is aggh, next is 'a'
    
    if not construction:
        return None
        
    # Clean up brackets
    inner = construction.strip("[]")
    parts = [p.strip() for p in inner.split("+")]
    
    # Find the part with √
    root_idx = -1
    for i, part in enumerate(parts):
        if "√" in part:
            root_idx = i
            break
            
    if root_idx != -1 and root_idx + 1 < len(parts):
        # The next part is likely the paccaya or a suffix
        paccaya = parts[root_idx + 1]
        
        # Sometimes the next part is an ending like 'ti' directly if no paccaya? 
        # But usually there is a conjugation sign.
        return paccaya
        
    return None

try:
    vocab = load_vocab_dpd(r"d:\pali-theonlyone\data\vocab-dpd.js")
    
    # Test with words from different groups
    test_words = [
        "agghati",   # Bhu (a)
        "bhavati",   # Bhu (a)
        "dibbati",   # Div (ya)
        "suṇāti",    # Su (na/nu)
        "cinoti",    # Ci (nu)
        "rundhati",  # Rudh (a + niggahita)
        "tanoti",    # Tan (o)
        "kiṇāti",    # Ki (na)
        "deseti",    # Cur (ne)
        "corayati",  # Cur (naya)
        "gaṇhāti",   # Gaha (nha)
        "karoti",    # Tan (o)
        "pajahati",  # Juhu (a?)
        "kīḷati",    # Bhu (a)
        "coreti",    # Cur (ne)
        "tudati",    # Tuda (a)
        "muñcati"    # Rudha (a + niggahita)
    ]
    
    print("Testing Paccaya Extraction (Stem Ending Analysis):")
    for word in test_words:
        if word in vocab:
            defn = vocab[word]
            match = re.search(r'\[(.*?)\]', defn)
            if match:
                const = match.group(0)
                # Check for + ti pattern
                if "+ ti" in const:
                    # Extract the part before + ti
                    parts = const.strip("[]").split("+")
                    # Find 'ti' index
                    ti_index = -1
                    for i, p in enumerate(parts):
                        if p.strip() == "ti":
                            ti_index = i
                            break
                    
                    if ti_index > 0:
                        stem = parts[ti_index-1].strip()
                        last_char = stem[-1] if stem else ""
                        print(f"{word}: {const} -> Stem: {stem}, Ending: -{last_char}")
                    else:
                        print(f"{word}: {const} -> Could not isolate stem before 'ti'")
                else:
                    print(f"{word}: {const} -> No '+ ti' pattern")
            else:
                print(f"{word}: No construction found")
        else:
            print(f"{word}: Not found in DPD")

except Exception as e:
    print(f"Error: {e}")
