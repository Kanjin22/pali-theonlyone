import sqlite3
import json

db_path = r"D:\pali-theonlyone\data\raw\pali_thai-db-v5\pali_thai.sqlite"

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT count(*) FROM pali_thai")
    count = cursor.fetchone()[0]
    print(f"Total entries: {count}")
    
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
