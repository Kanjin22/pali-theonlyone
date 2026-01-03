import sqlite3
import sys
import os

def check_keys_in_db(db_path, table_name, column_name, keys):
    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}")
        return

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        found_keys = []
        missing_keys = []
        
        print(f"Checking {db_path} table '{table_name}' column '{column_name}'...")
        
        for key in keys:
            # Check exact match
            query = f"SELECT {column_name} FROM {table_name} WHERE {column_name} = ?"
            cursor.execute(query, (key,))
            result = cursor.fetchone()
            
            if result:
                found_keys.append(key)
                print(f"  [FOUND] {key}")
            else:
                missing_keys.append(key)
                print(f"  [MISSING] {key}")
                
        print(f"\nSummary for {os.path.basename(db_path)}:")
        print(f"Found: {len(found_keys)}/{len(keys)}")
        print(f"Missing: {len(missing_keys)}/{len(keys)}")
        
        conn.close()
        return found_keys
        
    except Exception as e:
        print(f"Error reading database: {e}")
        return []

if __name__ == "__main__":
    keys_to_check = ['ธมฺมา', 'ธมฺมปทฏฺฐกถา', 'ปณามคาถา']
    
    # Check tripitaka91.db
    db_path_91 = r"d:\pali-theonlyone\data\raw\ios_extracted\tripitaka91.db"
    check_keys_in_db(db_path_91, "tripitaka91_dict", "buddic_word", keys_to_check)
    
    # Check thaivn.sqlite
    db_path_vn = r"d:\pali-theonlyone\data\raw\ios_extracted\thaivn.sqlite"
    # Check 'content' and 'display' columns
    check_keys_in_db(db_path_vn, "main", "content", keys_to_check)
    check_keys_in_db(db_path_vn, "main", "display", keys_to_check)
