import sqlite3
import json
import os
import re

db_path = "dpd_data/dpd.db"
output_path = "data/vocab-roots-dpd.js"

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

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
# Adapting fields based on typical DPD columns
# root, root_in_comps, root_has_verb, root_group, root_sign, root_meaning, root_meaning_in_context
query = f"SELECT * FROM {roots_table}"
cursor.execute(query)
rows = cursor.fetchall()

vocab_roots = {}
count = 0

for row in rows:
    # Adjust field names based on actual DB columns
    # We'll use a robust mapping approach
    
    # Try to find root word
    root_word = row['root'] if 'root' in columns else row[columns[0]] # Fallback
    
    # Clean root word (remove digits, etc if needed)
    root_clean = root_word.strip()
    
    # Group
    group = row['root_group'] if 'root_group' in columns else ""
    
    # Meaning
    meaning_pali = row['root_meaning'] if 'root_meaning' in columns else ""
    meaning_thai = "" # DPD usually doesn't have Thai
    
    # Examples / Context
    example = row['root_example'] if 'root_example' in columns else ""
    if not example and 'root_info' in columns:
        example = row['root_info']
    
    # Construct entry
    entry = {
        "root": root_clean,
        "meaning_pali": meaning_pali,
        "meaning_thai": meaning_thai, # Placeholder or map from somewhere else
        "example": example,
        "group": group,
        "page": "", # DPD doesn't have page refs to Thai books usually
        "source": "DPD"
    }
    
    if root_clean not in vocab_roots:
        vocab_roots[root_clean] = []
    
    vocab_roots[root_clean].append(entry)
    count += 1

conn.close()

print(f"Processed {count} roots into {len(vocab_roots)} unique entries.")

# Write to JS file
with open(output_path, "w", encoding="utf-8") as f:
    f.write("const vocabRootsDPD = ")
    json.dump(vocab_roots, f, ensure_ascii=False, indent=2)
    f.write(";")

print(f"Saved to {output_path}")
