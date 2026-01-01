import sqlite3
import os

db_path = r"C:\Program Files (x86)\E-Tipitaka\resources\p2t_dict_v5.sqlite"

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Count per source
    cursor.execute("SELECT source, COUNT(*) FROM p2t GROUP BY source")
    counts = cursor.fetchall()
    print("Counts per source:")
    for source, count in counts:
        print(f"  {source}: {count}")
        
    # Check for duplicate headwords
    cursor.execute("SELECT headword, COUNT(*) as c FROM p2t GROUP BY headword HAVING c > 1 LIMIT 5")
    dups = cursor.fetchall()
    print(f"\nDuplicate headwords count (sample): {len(dups)}")
    for d in dups:
        print(f"  {d[0]}: {d[1]} entries")
        
    # Inspect a duplicate to see how they differ
    if dups:
        word = dups[0][0]
        print(f"\nInspecting duplicate: {word}")
        cursor.execute("SELECT source, content FROM p2t WHERE headword = ?", (word,))
        rows = cursor.fetchall()
        for r in rows:
            print(f"  Source: {r[0]}")
            print(f"  Content: {r[1][:100]}...")

    conn.close()
except Exception as e:
    print(e)
