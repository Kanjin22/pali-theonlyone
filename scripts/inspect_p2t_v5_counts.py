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

    conn.close()
except Exception as e:
    print(e)
