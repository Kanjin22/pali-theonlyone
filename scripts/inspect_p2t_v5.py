import sqlite3
import os

db_path = r"C:\Program Files (x86)\E-Tipitaka\resources\p2t_dict_v5.sqlite"

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check distinct sources
    cursor.execute("SELECT DISTINCT source FROM p2t")
    sources = cursor.fetchall()
    print(f"Distinct sources: {sources}")
    
    # Check if content has <br> like our js file
    cursor.execute("SELECT headword, content FROM p2t WHERE content LIKE '%<br>%' LIMIT 5")
    rows = cursor.fetchall()
    print(f"\nRows with <br>: {len(rows)}")
    for r in rows:
        print(f"{r[0]}: {r[1][:100]}...")

    conn.close()
except Exception as e:
    print(e)
