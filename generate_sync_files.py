import sqlite3
import json
import os

db_path = "dpd_data/dpd.db"
output_derived = "data/vocab-roots-dpd-derived.js"
output_dpd = "data/vocab-dpd.js"

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

def generate_derived():
    print("Generating vocab-roots-dpd-derived.js...")
    cursor.execute("SELECT root_key, lemma_1 FROM dpd_headwords WHERE root_key IS NOT NULL AND root_key != ''")
    rows = cursor.fetchall()
    
    derived_map = {}
    for root_key, lemma in rows:
        if root_key not in derived_map:
            derived_map[root_key] = []
        if lemma not in derived_map[root_key]:
            derived_map[root_key].append(lemma)
            
    # Sort keys
    sorted_keys = sorted(derived_map.keys())
    sorted_map = {k: sorted(derived_map[k]) for k in sorted_keys}
    
    with open(output_derived, "w", encoding="utf-8") as f:
        f.write("const vocabRootsDPDDerived = ")
        json.dump(sorted_map, f, ensure_ascii=False, indent=2)
        f.write(";")
    print(f"Saved {len(sorted_map)} roots to {output_derived}")

def generate_dpd_definitions():
    print("Generating vocab-dpd.js...")
    # Fields to construct the definition string
    cursor.execute("SELECT lemma_1, pos, meaning_1, construction FROM dpd_headwords")
    rows = cursor.fetchall()
    
    vocab_map = {}
    for lemma, pos, meaning, construction in rows:
        # Format: (pos) meaning [construction]
        def_parts = []
        if pos:
            def_parts.append(f"({pos})")
        if meaning:
            def_parts.append(meaning)
        if construction:
            def_parts.append(f"[{construction}]")
            
        full_def = " ".join(def_parts)
        vocab_map[lemma] = full_def
        
    with open(output_dpd, "w", encoding="utf-8") as f:
        f.write("const vocabDPD = ")
        json.dump(vocab_map, f, ensure_ascii=False) # Minified for size
        f.write(";")
    print(f"Saved {len(vocab_map)} definitions to {output_dpd}")

if __name__ == "__main__":
    generate_derived()
    generate_dpd_definitions()
    conn.close()
