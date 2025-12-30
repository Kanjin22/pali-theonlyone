import sqlite3
import os

db_path = "dpd_data/dpd.db"
if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Find roots table
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cursor.fetchall()]
print(f"Tables: {tables}")

roots_table = "dpd_roots" if "dpd_roots" in tables else "roots"
print(f"Using table: {roots_table}")

cursor.execute(f"PRAGMA table_info({roots_table})")
columns = [row[1] for row in cursor.fetchall()]
print(f"Columns in {roots_table}: {columns}")

conn.close()
