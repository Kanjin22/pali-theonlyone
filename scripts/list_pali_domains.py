import sqlite3
import os

# Path to the Manifest.db found
db_path = r"D:\3uTools9\Backup\20260103_045210_Kan_Gold‘s_iPhone_15_PM\00008130-000A35322ED8001C\Manifest.db"

def list_pali_domains():
    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}")
        return

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Find domains with 'pali' or 'dict'
        query = """
        SELECT DISTINCT domain 
        FROM Files 
        WHERE domain LIKE '%pali%' OR domain LIKE '%dict%'
        ORDER BY domain
        """
        
        cursor.execute(query)
        rows = cursor.fetchall()
        
        print("Found domains:")
        print("-" * 80)
        for row in rows:
            print(row[0])
                
        conn.close()

    except Exception as e:
        print(f"Error reading database: {e}")

if __name__ == "__main__":
    list_pali_domains()
