import sqlite3
import os
import sys

if len(sys.argv) < 2:
    print("Usage: python inspect_db.py <db_path> [table_name]")
    exit(1)

db_path = sys.argv[1]

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Find tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cursor.fetchall()]
print(f"Tables: {tables}")

if len(tables) == 0:
    print("No tables found.")
    conn.close()
    exit(0)

if len(sys.argv) > 2:
    table_name = sys.argv[2]
else:
    table_name = tables[0]

print(f"Using table: {table_name}")

try:
    cursor.execute(f"PRAGMA table_info({table_name})")
    columns = [row[1] for row in cursor.fetchall()]
    print(f"Columns in {table_name}: {columns}")
    
    # Sample data
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 5")
    rows = cursor.fetchall()
    print(f"Sample data ({len(rows)} rows):")
    for row in rows:
        print(row)
except Exception as e:
    print(f"Error inspecting table: {e}")

conn.close()
