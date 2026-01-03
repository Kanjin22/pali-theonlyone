import sqlite3

db_path = r'C:\Program Files (x86)\E-Tipitaka\resources\p2t_dict_v5.sqlite'

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute(f"PRAGMA table_info(p2t)")
    columns = cursor.fetchall()
    print(f"Schema for p2t:", columns)
    
    # Check first few rows
    cursor.execute("SELECT * FROM p2t LIMIT 1")
    row = cursor.fetchone()
    print("Sample row:", row)
            
    conn.close()

except Exception as e:
    print(f"Error: {e}")
