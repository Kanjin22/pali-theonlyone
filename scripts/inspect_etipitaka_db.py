import sqlite3
import os

# Define paths
base_path = r"C:\Program Files (x86)\E-Tipitaka\resources"
db_files = ["thaimm.sqlite", "p2t_dict_v5.sqlite", "thaidict.sqlite"]

def inspect_db(db_name):
    db_path = os.path.join(base_path, db_name)
    print(f"\n--- Inspecting {db_name} ---")
    if not os.path.exists(db_path):
        print("File not found.")
        return

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"Tables: {[t[0] for t in tables]}")
        
        for table in tables:
            table_name = table[0]
            print(f"\n  Table: {table_name}")
            
            # Get row count
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            count = cursor.fetchone()[0]
            print(f"  Row count: {count}")
            
            # Get columns
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = [col[1] for col in cursor.fetchall()]
            print(f"  Columns: {columns}")
            
            # Get sample data
            cursor.execute(f"SELECT * FROM {table_name} LIMIT 3")
            rows = cursor.fetchall()
            for row in rows:
                print(f"    {row}")
                
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

for db in db_files:
    inspect_db(db)
