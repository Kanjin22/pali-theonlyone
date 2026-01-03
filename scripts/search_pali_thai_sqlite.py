import sqlite3
import os

db_path = r"d:\pali-theonlyone\data\raw\pali_thai-db-v5\pali_thai.sqlite"

def search_keys(keys):
    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}")
        return

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # List tables first to know schema
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print("Tables:", tables)
        
        # Assuming there is a table for vocab, let's find it.
        # Usually it's 'vocabulary' or similar.
        for table in tables:
            table_name = table[0]
            print(f"\nChecking table: {table_name}")
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = [col[1] for col in cursor.fetchall()]
            print(f"Columns: {columns}")
            
            # Try to search if columns look like key/word
            search_col = None
            if 'word' in columns: search_col = 'word'
            elif 'pali' in columns: search_col = 'pali'
            elif 'key' in columns: search_col = 'key'
            
            if search_col:
                for key in keys:
                    query = f"SELECT * FROM {table_name} WHERE {search_col} = ?"
                    cursor.execute(query, (key,))
                    results = cursor.fetchall()
                    if results:
                        print(f"  Found '{key}': {results}")
                    else:
                        print(f"  Not Found '{key}'")
            else:
                print("  No suitable column found to search.")

        conn.close()

    except Exception as e:
        print(f"Error reading database: {e}")

if __name__ == "__main__":
    search_keys(["ธมฺมา", "ธมฺมปทฏฺฐกถา", "ปณามคาถา"])
