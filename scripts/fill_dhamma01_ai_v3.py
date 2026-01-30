
import re
import json
import urllib.request
import time
import sys
import os

# Configuration
API_KEY = os.environ.get('GOOGLE_API_KEY')
INPUT_FILE = "d:/pali-theonlyone/data/content-dhamma01.js" 
OUTPUT_FILE = "d:/pali-theonlyone/data/content-dhamma01_preview_v3.js"
MODEL = "gemini-3-pro-preview"
LIMIT = 3000  # Process all entries

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
        "thai_sense": "คำแปลเอาความ/เล่าเรื่อง (ใช้เครื่องหมายคำพูด \\"...\\" สำหรับบทสนทนา และ '...' สำหรับความคิดหรือคำพูดซ้อน)",
        "context": "บริบทสั้นๆ ของประโยคนั้น (เช่น ใครพูดกับใคร, เหตุการณ์อะไร, หรือ อรรถกถาแก้ว่าอย่างไร)",
        "akhyata": "กิริยาอาขยาต พร้อมคำย่อวิภัตติ เช่น กโรติ (วตฺ) ถ้าไม่มีให้เว้นว่าง",
        "kitaka": "กิริยากิตก์ (ตัดวิภัตติออก ให้เหลือรูปศัพท์เดิม เช่น คต, ฐิต) ถ้าไม่มีให้เว้นว่าง",
        "vocab_list": "ศัพท์สมาส ตัทธิต หรือนามกิตก์ (คั่นด้วยจุลภาค ไม่ต้องวงเล็บประเภทศัพท์) ถ้าไม่มีให้เว้นว่าง",
        "sandhi": {{ "บทสนธิ": "บทหน้า + บทหลัง" }} (ถ้ามีศัพท์สนธิให้แยกมาใน object นี้ ถ้าไม่มีให้ใช้ {{}})
    }}
    
    Requirement: 
    - ตอบเป็น JSON เท่านั้น
    - thai_desana ให้เว้นว่างไว้
    - thai_sense ต้องเรียบเรียงให้อ่านง่าย เป็นธรรมชาติ
    - context ควรระบุให้ชัดเจน
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
    
    # Check if we can resume from existing preview file
    current_content = ""
    if os.path.exists(OUTPUT_FILE):
        print(f"Resuming from {OUTPUT_FILE}...")
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            current_content = f.read()
    else:
        try:
            with open(INPUT_FILE, 'r', encoding='utf-8') as f:
                current_content = f.read()
        except FileNotFoundError:
            print(f"File {INPUT_FILE} not found!")
            return

    # Find entries with 'รอข้อมูล'
    pattern = re.compile(r'(pali:\s*`([^`]+)`,\s*thai:\s*`([^`]+)`,\s*thai_desana:\s*`[^`]*`,\s*thai_sense:\s*`รอข้อมูล`.*?sandhi:\s*\{.*?\})', re.DOTALL)
    
    matches = list(pattern.finditer(current_content))
    print(f"Found {len(matches)} entries needing update.")
    
    if not matches:
        print("No entries found with 'รอข้อมูล'.")
        return

    updated_content = current_content
    count = 0
    
    # Process in reverse order
    for match in reversed(matches):
        if count >= LIMIT:
            break
            
        full_match_text = match.group(1)
        pali = match.group(2).strip()
        thai = match.group(3).strip()
        
        count += 1
        print(f"\nProcessing [{count}/{len(matches)}]: {pali[:30]}...")
        
        # Retry logic
        retry_count = 0
        data = None
        while retry_count < 3:
            data = call_gemini(pali, thai)
            if data:
                break
            print("  Retrying...")
            retry_count += 1
            time.sleep(2)
            
        if data:
            ep = data.get('episode', '...').replace('"', '\\"')
            ts = data.get('thai_sense', '').replace('"', '\\"')
            ctx = data.get('context', '').replace('"', '\\"')
            akh = data.get('akhyata', '').replace('"', '\\"')
            kit = data.get('kitaka', '').replace('"', '\\"')
            voc = data.get('vocab_list', '').replace('"', '\\"')
            
            sandhi_obj = data.get('sandhi', {})
            sandhi_str = json.dumps(sandhi_obj, ensure_ascii=False, indent=16).strip()
            if sandhi_str == "{}":
                sandhi_str = "{}"
            else:
                sandhi_str = sandhi_str[:-1] + "            }"

            new_block = f"""pali: `{pali}`,
            thai: `{thai}`,
            thai_desana: `รอข้อมูล`,
            thai_sense: `{ts}`,
            context: `{ctx}`,
            akhyata: `{akh}`,
            kitaka: `{kit}`,
            vocab_list: `{voc}`,
            sandhi: {sandhi_str}"""
            
            # Replace
            start_idx = match.start()
            end_idx = match.end()
            updated_content = updated_content[:start_idx] + new_block + updated_content[end_idx:]
            
            print(f"  -> Updated.")
            
            # Save frequently
            if count % 5 == 0:
                with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"  (Saved to {OUTPUT_FILE})")
                
            time.sleep(1.5) # Rate limiting
        else:
            print("  -> Failed after retries.")

    # Final save
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print("Done.")

if __name__ == "__main__":
    process_file()

