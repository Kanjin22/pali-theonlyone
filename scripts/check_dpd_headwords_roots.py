import sqlite3
import os

DB_PATH = r"d:\pali-theonlyone\data\dpd-db-repo\dpd.db"

def main():
    if not os.path.exists(DB_PATH):
        print(f"DB not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    words_to_check = [
        "hiṃsati", "mukha", "vaṇij", "valañjeti", "valañja", "lāha", "acchati", "acchāti"
    ]
    
    print("Checking headwords for root info...")
    for w in words_to_check:
        print(f"\n--- Checking '{w}' ---")
        # Try exact match or like
        c.execute("SELECT lemma_1, root_key, family_root, construction FROM dpd_headwords WHERE lemma_1 LIKE ?", (w + '%',))
        rows = c.fetchall()
        for r in rows:
            print(r)
            
    conn.close()

if __name__ == "__main__":
    main()
