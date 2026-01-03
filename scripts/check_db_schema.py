import sqlite3

db_path = r'C:\Program Files (x86)\E-Tipitaka\resources\p2t_dict_v5.sqlite'

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tables:", tables)
    
    # If there is a table that looks like dictionary, let's describe it
    if tables:
        first_table = tables[0][0]
        cursor.execute(f"PRAGMA table_info({first_table})")
        columns = cursor.fetchall()
        print(f"Schema for {first_table}:", columns)
            
    conn.close()

except Exception as e:
    print(f"Error: {e}")
