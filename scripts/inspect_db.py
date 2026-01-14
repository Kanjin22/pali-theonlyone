import sqlite3
import os

db_path = "dpd_data/dpd.db"

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# List tables
print("=== Tables ===")
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
for table in tables:
    print(table[0])

# Check for roots table
roots_table = None
for table in tables:
    name = table[0]
    if "root" in name.lower() or "dhatu" in name.lower():
        roots_table = name
        break

if roots_table:
    print(f"\n=== Columns in {roots_table} ===")
    cursor.execute(f"PRAGMA table_info({roots_table})")
    columns = cursor.fetchall()
    for col in columns:
        print(f"{col[1]} ({col[2]})")
    
    # Peek at data
    print(f"\n=== First 5 rows in {roots_table} ===")
    cursor.execute(f"SELECT * FROM {roots_table} LIMIT 5")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
else:
    print("\nNo obvious roots table found.")

conn.close()
