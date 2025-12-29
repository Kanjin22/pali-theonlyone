import sqlite3
import os

DB_PATH = r"d:\pali-theonlyone\data\dpd-db-repo\dpd.db"

def main():
    if not os.path.exists(DB_PATH):
        print(f"DB not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    print("Listing tables...")
    c.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = c.fetchall()
    for t in tables:
        print(t)
        
    conn.close()

if __name__ == "__main__":
    main()
