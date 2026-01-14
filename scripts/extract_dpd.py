import sqlite3
import json
import re

db_path = "dpd_data/dpd.db"
output_path = "data/raw/vocab-dpd.js"

print(f"Connecting to {db_path}...")
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

print("Querying headwords...")
cursor.execute("SELECT lemma_1, pos, meaning_1, meaning_lit, construction FROM dpd_headwords")
rows = cursor.fetchall()

dictionary = {}
count = 0

for row in rows:
    lemma = row['lemma_1']
    # Clean lemma: remove digits and dots at the end (e.g., "metta 1", "a 1.1")
    # Usually it is "word digit" or "word digit.digit"
    # But sometimes the word itself might have numbers? Unlikely for Pali.
    word = re.sub(r'\s+\d+(\.\d+)?$', '', lemma).strip()
    
    meaning = row['meaning_1']
    if not meaning:
        continue
        
    pos = row['pos'] if row['pos'] else ""
    lit = row['meaning_lit']
    construction = row['construction']
    
    # Format definition
    # [pos] meaning (lit. ...) [construction]
    def_parts = []
    if pos:
        def_parts.append(f"({pos})")
    
    def_parts.append(meaning)
    
    if lit:
        def_parts.append(f"(lit. {lit})")
        
    if construction:
         def_parts.append(f"[{construction}]")
         
    full_def = " ".join(def_parts)
    
    if word not in dictionary:
        dictionary[word] = []
    dictionary[word].append(full_def)
    count += 1

conn.close()

print(f"Processed {count} entries into {len(dictionary)} unique words.")

# Convert to JS object
# Use a compact format. If multiple definitions, join with <br> or similar?
# Or keep array? 
# Existing vocab-sc uses object with HTML or text?
# Let's check vocab-sc.js format.
# But for now I'll create the object.

# To save space, I will join multiple definitions with " | " or "<br>"
final_dict = {}
for k, v in dictionary.items():
    final_dict[k] = "<br>".join(v)

print("Writing to file...")
with open(output_path, "w", encoding="utf-8") as f:
    f.write("const vocabDPD = ")
    json.dump(final_dict, f, ensure_ascii=False)
    f.write(";")

print(f"Done. Saved to {output_path}")
