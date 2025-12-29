import re

def extract_construction(defn):
    match = re.search(r'\[(.*?)\]', defn)
    return match.group(1) if match else None

def extract_first_suffix(construction):
    if not construction:
        return None
    
    # Clean up: take the first line if multiple lines (e.g. [A + B\nC + D])
    construction = construction.split('\n')[0]
    
    # Split by +
    parts = construction.split('+')
    parts = [p.strip() for p in parts]
    
    for i, p in enumerate(parts):
        # Check for root symbol
        if '√' in p:
            # This is the root part.
            # Next part is the suffix
            if i + 1 < len(parts):
                suffix = parts[i+1]
                # Clean up suffix (remove > or other artifacts if present)
                suffix = suffix.split('>')[0].strip()
                return suffix
    
    return None

test_cases = [
    "(adj) with a flame [√acc + i + ikā + a\naccikā + a]",
    "(fem) flame [√acc + i]",
    "(adj) eating [√ad + a]",
    "[na > a + √kaṅkh + a]"
]

for t in test_cases:
    const = extract_construction(t)
    suffix = extract_first_suffix(const)
    print(f"'{t}' -> Const: '{const}' -> Suffix: '{suffix}'")
