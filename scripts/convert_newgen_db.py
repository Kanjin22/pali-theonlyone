import sqlite3
import json
import os

# Configuration
db_path = r'd:\pali-theonlyone\data\DB\palitothai_newgen.db'
output_path = r'd:\pali-theonlyone\data\vocab-newgen.js'

def convert_db_to_js():
    print(f"Connecting to database: {db_path}")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get total count
    cursor.execute("SELECT COUNT(*) FROM palithaiNewGen")
    count = cursor.fetchone()[0]
    print(f"Total records found: {count}")
    
    # Fetch data
    cursor.execute("SELECT Paliword, content FROM palithaiNewGen")
    rows = cursor.fetchall()
    
    vocab_data = {}
    
    print("Processing data...")
    for row in rows:
        pali_word = row[0]
        content = row[1]
        
        if not pali_word:
            continue
            
        # Clean up content
        details = []
        if content:
            # Split by newlines and clean
            lines = content.replace('\r\n', '\n').split('\n')
            details = [line.strip() for line in lines if line.strip()]
        
        vocab_data[pali_word] = {
            "split": pali_word, # Default to same as word since we don't have separate split data
            "details": details
        }
    
    conn.close()
    
    # Convert to JSON string
    print("Converting to JSON...")
    json_str = json.dumps(vocab_data, ensure_ascii=False, indent=4)
    
    # Write to JS file
    print(f"Writing to {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("const vocabNewGen = ")
        f.write(json_str)
        f.write(";")
        
    print("Conversion complete!")

if __name__ == "__main__":
    convert_db_to_js()
