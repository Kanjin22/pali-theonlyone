
import docx
import json
import re
import sys
import os
import difflib

def normalize(text):
    if not text: return ""
    text = re.sub(r'\(P\.?\d+\)', '', text)
    text = re.sub(r'[\s\u200b\u200c\u200d\uFEFF"\',.;:?!ฯ-]', '', text)
    text = text.replace('“', '').replace('”', '').replace('‘', '').replace('’', '')
    text = text.replace('(', '').replace(')', '')
    text = re.sub(r'\d+', '', text)
    return text.lower()

def run():
    json_path = os.path.join(os.getcwd(), 'temp_kumbhaghosaka.json')
    docx_path = os.path.join(os.getcwd(), '102 พระธัมมปทัฏฐกถา ภาค ๒ (บาลี-โดยอรรถ).docx')
    report_path = os.path.join(os.getcwd(), 'comparison_report_kumbhaghosaka.txt')
    
    print("Loading JSON...")
    with open(json_path, 'r', encoding='utf-8') as f:
        js_data = json.load(f)
    
    print("Loading DOCX...")
    try:
        doc = docx.Document(docx_path)
    except Exception as e:
        print(f"Error reading DOCX: {e}")
        return

    full_docx_text = "\n".join([p.text for p in doc.paragraphs])
    docx_normalized = normalize(full_docx_text)
    
    found_count = 0
    not_found = []
    
    for i, item in enumerate(js_data):
        pali = item.get('pali', '')
        if not pali or len(pali) < 3: continue

        pali_norm = normalize(pali)
        if not pali_norm: continue
        
        if pali_norm in docx_normalized:
            found_count += 1
        else:
            not_found.append({
                'index': i,
                'pali': pali
            })
            
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(f"Comparison Report for Kumbhaghosaka\n")
        f.write(f"Total Sentences: {len(js_data)}\n")
        f.write(f"Matched: {found_count}\n")
        f.write(f"Mismatched: {len(not_found)}\n")
        f.write("="*40 + "\n\n")
        
        for item in not_found:
            f.write(f"[Index {item['index']}]\n")
            f.write(f"{item['pali']}\n")
            f.write("-" * 20 + "\n")
            
    print(f"Report written to {report_path}")

if __name__ == "__main__":
    run()
