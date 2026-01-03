import sqlite3
import os

db_path = r"D:\pali-theonlyone\data\raw\pali_thai-db-v5\pali_thai.sqlite"

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check tables again
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print(f"Tables: {[t[0] for t in tables]}")
    
    if 'pali_thai' in [t[0] for t in tables]:
        print("\n--- 'pali_thai' Table Sample ---")
        cursor.execute("PRAGMA table_info(pali_thai)")
        columns = cursor.fetchall()
        print(f"Columns: {[c[1] for c in columns]}")
        
        cursor.execute("SELECT * FROM pali_thai LIMIT 10")
        rows = cursor.fetchall()
        for row in rows:
            print(row)
            
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
