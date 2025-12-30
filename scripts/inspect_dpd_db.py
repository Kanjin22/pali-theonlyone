import sqlite3
import sys

db_path = "dpd_data/dpd.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("Tables:")
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
for t in tables:
    print(t[0])
    # Print columns for roots table if found
    if "root" in t[0].lower():
        print(f"  Columns in {t[0]}:")
        cursor.execute(f"PRAGMA table_info({t[0]})")
        cols = cursor.fetchall()
        for c in cols:
            print(f"    {c[1]} ({c[2]})")

conn.close()
