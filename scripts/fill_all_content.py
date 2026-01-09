
import os
import re
import json
import urllib.request
import time
import sys

# Configuration
API_KEY = "AIzaSyC42i6GRpirCPvveVX4MBKsP1CS1rtlpQw"
MODEL = "gemini-3-pro-preview" # Gemini 3.0 Pro

# List of files to process (Sequential order)
FILES_TO_PROCESS = [
    "d:/pali-theonlyone/data/content-dhamma01.js",
    "d:/pali-theonlyone/data/content-dhamma02.js",
    "d:/pali-theonlyone/data/content-dhamma03.js",
    "d:/pali-theonlyone/data/content-dhamma04.js",
    "d:/pali-theonlyone/data/content-dhamma05.js",
    "d:/pali-theonlyone/data/content-dhamma06.js",
    "d:/pali-theonlyone/data/content-dhamma07.js",
    "d:/pali-theonlyone/data/content-dhamma08.js",
    "d:/pali-theonlyone/data/content-mangala01.js",
    "d:/pali-theonlyone/data/content-mangala02.js",
    "d:/pali-theonlyone/data/content-samanta01.js",
    "d:/pali-theonlyone/data/content-samanta02.js",
    "d:/pali-theonlyone/data/content-samanta03.js",
    "d:/pali-theonlyone/data/content-visuddhi01.js",
    "d:/pali-theonlyone/data/content-visuddhi02.js",
    "d:/pali-theonlyone/data/content-visuddhi03.js",
    "d:/pali-theonlyone/data/content-abhidhamma01.js"
]

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
        }]
    }
    
    json_data = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=json_data, headers={"Content-Type": "application/json"})
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            text_content = result['candidates'][0]['content']['parts'][0]['text']
            
            # Clean Markdown
            if text_content.startswith("```json"):
                text_content = text_content[7:-3].strip()
            elif text_content.startswith("```"):
                text_content = text_content[3:-3].strip()
            
            # Remove any trailing commas or bad json formatting if possible (basic cleanup)
            text_content = text_content.strip()
            
            parsed = json.loads(text_content)
            if isinstance(parsed, list):
                return parsed[0]
            return parsed
            
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return None

def process_single_file(input_path):
    print(f"\n{'='*50}")
    print(f"Processing File: {os.path.basename(input_path)}")
    print(f"{'='*50}")
    
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return

    # Output file logic: input_preview_ai.js
    base_name = os.path.basename(input_path).replace('.js', '')
    output_path = os.path.join(os.path.dirname(input_path), f"{base_name}_preview_ai.js")
    
    # Check if output file exists, if so, load it to continue
    if os.path.exists(output_path):
        print(f"Resuming from existing preview file: {output_path}")
        with open(output_path, "r", encoding="utf-8") as f:
            content = f.read()
    else:
        with open(input_path, "r", encoding="utf-8") as f:
            content = f.read()

    # Regex to find entries with thai_sense: "รอข้อมูล"
    pattern = re.compile(r'(pali:\s*`([^`]+)`,\s*thai:\s*`([^`]+)`,\s*thai_desana:\s*`[^`]*`,\s*thai_sense:\s*`รอข้อมูล`.*?sandhi:\s*\{.*?\})', re.DOTALL)
    
    matches = list(pattern.finditer(content))
    total_matches = len(matches)
    print(f"Found {total_matches} entries needing update.")
    
    if total_matches == 0:
        print("File is already up to date.")
        return

    # Process matches in reverse order
    matches_to_process = list(reversed(matches))
    
    updated_content = content
    count = 0
    
    for match in matches_to_process:
        full_match = match.group(1)
        pali = match.group(2)
        thai = match.group(3)
        
        count += 1
        print(f"Processing [{count}/{total_matches}]: {pali[:30]}...")
        
        data = call_gemini(pali, thai)
        
        if data:
            # Construct replacement string
            # Handle potential None values safely
            ep = data.get('episode', '...').replace('"', '\\"')
            ts = data.get('thai_sense', '').replace('"', '\\"')
            ctx = data.get('context', '').replace('"', '\\"')
            akh = data.get('akhyata', '').replace('"', '\\"')
            kit = data.get('kitaka', '').replace('"', '\\"')
            voc = data.get('vocab_list', '').replace('"', '\\"')
            
            # Format sandhi object
            sandhi_obj = data.get('sandhi', {})
            sandhi_str = json.dumps(sandhi_obj, ensure_ascii=False, indent=16).strip()
            # Fix indent for sandhi closing brace
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
            
            # Replace in content
            start_idx = match.start()
            end_idx = match.end()
            
            # Verify we are replacing the correct block by checking indices against current content length (not needed if we don't modify length before this match, but we are processing reversed, so it's safe!)
            updated_content = updated_content[:start_idx] + new_block + updated_content[end_idx:]
            
            print(f"  -> Updated.")
            
            # Save progress every 5 entries
            if count % 5 == 0:
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(updated_content)
                print(f"  (Auto-saved to {os.path.basename(output_path)})")
            
            # Rate limit preventer
            time.sleep(5) 
        else:
            print("  -> Failed (Skipping)")
            time.sleep(5)

    # Final save
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print(f"Done processing {os.path.basename(input_path)}.")

if __name__ == "__main__":
    print(f"Starting Batch Process with model: {MODEL}")
    for file_path in FILES_TO_PROCESS:
        try:
            process_single_file(file_path)
        except Exception as e:
            print(f"CRITICAL ERROR processing {file_path}: {e}")
            continue
    print("All files processed.")
