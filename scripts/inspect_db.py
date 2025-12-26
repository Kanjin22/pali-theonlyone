import sqlite3
import os
import json

# Configuration
db_path = r'd:\pali-theonlyone\data\DB\palitothai_newgen.db'

def inspect_db():
    if not os.path.exists(db_path):
        print(f"Error: Database file not found at {db_path}")
        print("Please copy 'palitothai_newgen' to 'd:\\pali-theonlyone\\data\\'")
        return

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get all tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"Tables found: {tables}")
        
        for table in tables:
            table_name = table[0]
            print(f"\nStructure of table '{table_name}':")
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = cursor.fetchall()
            for col in columns:
                print(col)
                
            # Preview data
            print(f"Sample data from '{table_name}':")
            cursor.execute(f"SELECT * FROM {table_name} LIMIT 5")
            rows = cursor.fetchall()
            for row in rows:
                print(row)
                
        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    inspect_db()
