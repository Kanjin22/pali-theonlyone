import sqlite3
import collections

db_path = r"D:\pali-theonlyone\data\raw\pali_thai-db-v5\pali_thai.sqlite"

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT head FROM pali_thai")
    rows = cursor.fetchall()
    
    heads = [r[0] for r in rows if r[0]]
    counter = collections.Counter(heads)
    
    duplicates = {k: v for k, v in counter.items() if v > 1}
    print(f"Total rows: {len(rows)}")
    print(f"Unique heads: {len(counter)}")
    print(f"Duplicates: {len(duplicates)}")
    
    print("\nSample duplicates:")
    for k in list(duplicates.keys())[:5]:
        print(f"{k}: {duplicates[k]}")
        
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
