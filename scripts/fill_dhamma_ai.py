import re
import json
import urllib.request
import time
import sys

# Configuration
API_KEY = "AIzaSyC42i6GRpirCPvveVX4MBKsP1CS1rtlpQw"
INPUT_FILE = "d:/pali-theonlyone/data/content-dhamma01.js"
OUTPUT_FILE = "d:/pali-theonlyone/data/content-dhamma01_preview.js"
MODEL = "gemini-2.0-flash"
LIMIT = 2000  # Process all entries

def call_gemini(pali, thai):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
    
    prompt = f"""
    Role: ผู้เชี่ยวชาญภาษาบาลีและพระไตรปิฎก
    Task: วิเคราะห์ประโยคบาลีและเติมข้อมูลในฟิลด์ที่กำหนดตามมาตรฐานอย่างเคร่งครัด
    
    Input:
    Pali: {pali}
    Thai Translation: {thai}
    
    Output Format (JSON Only):
    {{
        "episode": "ชื่อตอน (ใส่เนื้อหาเลย ไม่ต้องมีคำว่า 'ตอนที่')",
        "thai_sense": "คำแปลเอาความ/เล่าเรื่อง (ใช้เครื่องหมายคำพูด \"...\" สำหรับบทสนทนา และ '...' สำหรับความคิดหรือคำพูดซ้อน)",
        "context": "บริบทสั้นๆ ของประโยคนั้น",
        "akhyata": "กิริยาอาขยาต พร้อมคำย่อวิภัตติ เช่น กโรติ (วตฺ) ถ้าไม่มีให้เว้นว่าง",
        "kitaka": "กิริยากิตก์ (ตัดวิภัตติออก ให้เหลือรูปศัพท์เดิม เช่น คต, ฐิต) ถ้าไม่มีให้เว้นว่าง",
        "vocab_list": "ศัพท์สมาส ตัทธิต หรือนามกิตก์ (คั่นด้วยจุลภาค ไม่ต้องวงเล็บประเภทศัพท์) ถ้าไม่มีให้เว้นว่าง",
        "sandhi": {{ "บทสนธิ": "บทหน้า + บทหลัง" }} (ถ้ามีศัพท์สนธิให้แยกมาใน object นี้ ถ้าไม่มีให้ใช้ {{}})
    }}
    
    Requirement: 
    - ตอบเป็น JSON เท่านั้น
    - thai_desana ให้เว้นว่างไว้ (ไม่ต้องส่งกลับมาใน JSON นี้ เพราะเราจะไม่แก้ฟิลด์นี้)
    - thai_sense ต้องเรียบเรียงให้อ่านง่าย เป็นธรรมชาติ
    """

    data = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "response_mime_type": "application/json"
        }
    }

    headers = {'Content-Type': 'application/json'}
    
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            text_content = result['candidates'][0]['content']['parts'][0]['text']
            # Clean potential markdown
            text_content = text_content.replace('```json', '').replace('```', '').strip()
            parsed = json.loads(text_content)
            if isinstance(parsed, list):
                return parsed[0]
            return parsed
    except Exception as e:
        print(f"Error calling API: {e}")
        return None

def process_file():
    print(f"Reading {INPUT_FILE}...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find entries with "รอข้อมูล"
    # Regex to find object blocks that contain thai_desana: `รอข้อมูล`
    # We look for the pattern and extract pali/thai to send to AI
    
    # This regex looks for the specific structure in the JS file
    # It captures the whole object if it contains "รอข้อมูล"
    # Note: This is a simplified parser for the specific format in content-dhamma01.js
    
    # Strategy: Find all matches of `thai_desana: \`รอข้อมูล\`` and then backtrack to find pali/thai
    # But since regex backward search is hard, we'll iterate through the file content intelligently.
    
    # Let's try to match the object properties.
    # We look for entries where thai_sense is explicitly `รอข้อมูล` (as a marker for unprocessed entries)
    pattern = re.compile(r'(pali:\s*`([^`]+)`,\s*thai:\s*`([^`]+)`,\s*thai_desana:\s*`[^`]*`,\s*thai_sense:\s*`รอข้อมูล`.*?sandhi:\s*\{.*?\})', re.DOTALL)
    
    matches = list(pattern.finditer(content))
    print(f"Found {len(matches)} entries needing update.")
    
    if not matches:
        print("No entries found with 'รอข้อมูล'.")
        return

    new_content = content
    count = 0
    
    # Process in reverse order to maintain indices
    for match in reversed(matches):
        if count >= LIMIT:
            break
            
        full_match_text = match.group(1)
        pali = match.group(2).strip()
        thai = match.group(3).strip()
        
        print(f"\nProcessing [{count+1}/{LIMIT}]: {pali[:30]}...")
        
        ai_result = call_gemini(pali, thai)
        
        if ai_result:
            episode = ai_result.get('episode', '')
            sense = ai_result.get('thai_sense', '')
            context = ai_result.get('context', '')
            akhyata = ai_result.get('akhyata', '')
            kitaka = ai_result.get('kitaka', '')
            vocab = ai_result.get('vocab_list', '')
            sandhi = ai_result.get('sandhi', {})

            # Format sandhi object to string
            sandhi_str = json.dumps(sandhi, ensure_ascii=False, indent=4)
            # Indent sandhi correctly
            sandhi_str = sandhi_str.replace('\n', '\n            ')

            # We need to reconstruct the part of the object we matched
            # Since regex matching is tricky for replacement, we will do field-by-field replacement on the matched text
            
            replacement = full_match_text
            
            # Helper to replace value in backticks
            def replace_field(text, field, new_value):
                # Only replace if the field currently has `รอข้อมูล` or empty/placeholder
                # But user wants to update these fields specifically.
                # Regex: field:\s*`.*?` -> field: `new_value`
                return re.sub(f'{field}:\s*`.*?`', f'{field}: `{new_value}`', text)

            replacement = replace_field(replacement, 'episode', episode)
            replacement = replace_field(replacement, 'thai_sense', sense)
            replacement = replace_field(replacement, 'context', context)
            replacement = replace_field(replacement, 'akhyata', akhyata)
            replacement = replace_field(replacement, 'kitaka', kitaka)
            replacement = replace_field(replacement, 'vocab_list', vocab)
            
            # Special handling for sandhi which is an object, not backticked string
            # It ends with } so we look for sandhi: { ... }
            replacement = re.sub(r'sandhi:\s*\{.*?\}', f'sandhi: {sandhi_str}', replacement, flags=re.DOTALL)
            
            # Now replace in the main content
            start, end = match.span(1) # Use group 1 which is the full text we captured
            new_content = new_content[:start] + replacement + new_content[end:]
            
            print("  -> Updated.")
            count += 1
            time.sleep(1) # Rate limiting
        else:
            print("  -> Failed to get AI response.")

    print(f"\nSaving to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Done.")

if __name__ == "__main__":
    process_file()
