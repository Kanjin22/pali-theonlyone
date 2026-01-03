import sqlite3
import os
import shutil
import sys

# Path to the Manifest.db found
db_path = r"D:\3uTools9\Backup\20260103_045210_Kan_Gold‘s_iPhone_15_PM\00008130-000A35322ED8001C\Manifest.db"
backup_root = os.path.dirname(db_path)
output_dir = r"d:\pali-theonlyone\data\raw\ios_extracted"

def list_domains():
    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}")
        sys.exit(1)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT domain FROM Files ORDER BY domain")
    domains = [row[0] for row in cursor.fetchall()]
    conn.close()
    
    print("Available Domains:")
    for d in domains:
        print(d)

def list_files(domain_filter):
    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}")
        sys.exit(1)

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        query = f"""
        SELECT fileID, relativePath
        FROM Files 
        WHERE domain LIKE '%{domain_filter}%'
        """
        
        cursor.execute(query)
        rows = cursor.fetchall()
        
        print(f"Found {len(rows)} files for domain '{domain_filter}':")
        print("-" * 80)
        
        for file_id, rel_path in rows:
            print(f"{rel_path}")
                
        conn.close()

    except Exception as e:
        print(f"Error reading database: {e}")

def extract_etipitaka(domain_filter="E-Tipitaka-Plus", extract_all=False):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}")
        sys.exit(1)

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Query for files in specific domain
        query = f"""
        SELECT fileID, relativePath
        FROM Files 
        WHERE domain LIKE '%{domain_filter}%'
          AND relativePath NOT LIKE '%__MACOSX%'
          AND (relativePath LIKE '%.sqlite' OR relativePath LIKE '%.db' OR relativePath LIKE '%.sqlite3')
        """
        
        cursor.execute(query)
        rows = cursor.fetchall()
        
        print(f"Found {len(rows)} database files to extract for domain '{domain_filter}':")
        print("-" * 80)
        
        for file_id, rel_path in rows:
            # Construct source path
            src_path = os.path.join(backup_root, file_id[:2], file_id)
            
            # Construct dest path
            filename = os.path.basename(rel_path)
            # Prefix filename with domain to avoid collisions if extracting multiple domains
            safe_domain = domain_filter.replace('.', '_').replace('-', '_')
            filename = f"{safe_domain}_{filename}"
            
            dest_path = os.path.join(output_dir, filename)
            
            print(f"Extracting {rel_path} to {filename}...")
            try:
                if os.path.exists(src_path):
                    shutil.copy2(src_path, dest_path)
                    print(f"  -> Saved to {dest_path}")
                else:
                    print(f"  -> Source file missing: {src_path}")
            except Exception as e:
                print(f"  -> Error copying: {e}")
                
        conn.close()

    except Exception as e:
        print(f"Error reading database: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "list_domains":
        list_domains()
    elif len(sys.argv) > 2 and sys.argv[1] == "extract_domain":
        domain_filter = sys.argv[2]
        extract_etipitaka(domain_filter)
    elif len(sys.argv) > 2 and sys.argv[1] == "list_files":
        domain_filter = sys.argv[2]
        list_files(domain_filter)
    elif len(sys.argv) > 2 and sys.argv[1] == "extract_all":
        domain_filter = sys.argv[2]
        extract_etipitaka(domain_filter, extract_all=True)
    else:
        extract_etipitaka("E-Tipitaka-Plus")
