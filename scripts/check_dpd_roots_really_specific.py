import sqlite3
import os

DB_PATH = r"d:\pali-theonlyone\data\dpd-db-repo\dpd.db"

def main():
    if not os.path.exists(DB_PATH):
        print(f"DB not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    print("VERSION: NEW_FILE_NAME")
    print("Searching for roots matching 'hiṃs' or 'mukh' in dpd_roots...")
    try:
        c.execute("SELECT root, root_meaning, dhatupatha_pali FROM dpd_roots WHERE root LIKE '%hiṃs%' OR root LIKE '%mukh%'")
        rows = c.fetchall()
        
        if not rows:
            print("No matches found in 'dpd_roots' table.")
        
        for r in rows:
            print(r)
    except Exception as e:
        print(f"Error querying dpd_roots: {e}")
        
    conn.close()

if __name__ == "__main__":
    main()
