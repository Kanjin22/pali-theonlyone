import sqlite3
import os
import json

# Configuration
db_path = r"C:\Program Files (x86)\E-Tipitaka\resources\p2t_dict_v5.sqlite"
out_dir = r"d:\pali-theonlyone\data\raw"

# Source Mapping
# None -> General
# 'พจนานุกรม บาลี-ไทย-อังกฤษ ฉบับภูมิพโลภิกขุ' -> Bhum
# 'ปทานุกรม บาลี-ไทย-อังกฤษ-สันสกฤต' -> Chin

def export_source(cursor, source_name, filename, var_name):
    print(f"Exporting {source_name} to {filename}...")
    
    if source_name is None:
        query = "SELECT headword, content FROM p2t WHERE source IS NULL"
    else:
        query = f"SELECT headword, content FROM p2t WHERE source = '{source_name}'"
        
    cursor.execute(query)
    rows = cursor.fetchall()
    
    data = {}
    count = 0
    
    for headword, content in rows:
        if not headword: continue
        
        # Clean content? Maybe not, keep raw.
        # But ensure we handle duplicates
        if headword in data:
            data[headword] += " <br><br> " + content
        else:
            data[headword] = content
        count += 1
            
    # Write to JS file
    out_path = os.path.join(out_dir, filename)
    with open(out_path, 'w', encoding='utf-8') as f:
        # We write as a JS const
        json_str = json.dumps(data, indent=2, ensure_ascii=False)
        f.write(f"const {var_name} = {json_str};\n")
        
    print(f"  Done. {len(data)} unique headwords (from {count} rows).")

try:
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)
        
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 1. Bhumibalo
    export_source(cursor, 'พจนานุกรม บาลี-ไทย-อังกฤษ ฉบับภูมิพโลภิกขุ', 'vocab-bhumibalo.js', 'vocabBhumibalo')
    
    # 2. Chinnakarn (Jinakālamālinī)
    export_source(cursor, 'ปทานุกรม บาลี-ไทย-อังกฤษ-สันสกฤต', 'vocab-jinakalamalini.js', 'vocabJinakalamalini')
    
    # 3. General
    export_source(cursor, None, 'vocab-general.js', 'vocabGeneralRaw')
    
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
