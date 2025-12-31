import os
import re
import json

def read_file(path, encoding):
    try:
        with open(path, 'r', encoding=encoding, errors='replace') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return ""

def clean_text(text):
    # Remove LineNumber spans: <span class="LineNumber"> 001 </span>
    text = re.sub(r'<span class="LineNumber">\s*\d+\s*</span>', '', text)
    # Remove other HTML tags like <SUP>, <B>, etc.
    text = re.sub(r'<[^>]+>', '', text)
    # Remove footnotes if needed, or keep them?
    # For now, let's keep text content but remove excessive whitespace
    
    # Replace newlines with space to flatten the text
    text = text.replace('\n', ' ')
    text = text.replace('\r', ' ')
    
    # Remove multiple spaces
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()

def split_thai_sentences(text):
    if not text:
        return []
    
    # Split by . (Period) which often marks sentence end in this Thai text
    # Also handle [x] markers as split points if they are not at start
    
    # First, protect the [x] markers so we don't split inside them (unlikely with .)
    # But we want to ensure [x] starts a new sentence if possible.
    
    # Simple split by period first
    parts = text.split('.')
    sentences = []
    for part in parts:
        s = part.strip()
        if s:
            sentences.append(s)
            
    return sentences

def to_thai_digits(num):
    thai_digits = "๐๑๒๓๔๕๖๗๘๙"
    return "".join([thai_digits[int(d)] for d in str(num)])

def split_pali_sentences(text):
    if not text:
        return []
    
    # Split by ฯ (Paiyannoi)
    parts = re.split(r'(ฯ)', text)
    sentences = []
    current_sentence = ""
    for part in parts:
        current_sentence += part
        if part == 'ฯ':
            sentences.append(current_sentence.strip())
            current_sentence = ""
            
    # Handle any remaining text that doesn't end with ฯ
    if current_sentence.strip():
        sentences.append(current_sentence.strip())
        
    return sentences

def process_page(page_num):
    # Format page number to 6 digits, e.g. 000097
    filename = f"{page_num:06d}.txt"
    pali_path = os.path.join(r"d:\pali-theonlyone\temp_extraction\01", filename)
    
    # Try to find Thai file in multiple locations (02, 03, 04)
    # The user indicated that Thai content continues in other volumes
    thai_path_02 = os.path.join(r"d:\pali-theonlyone\temp_extraction\02", filename)
    thai_path_03 = os.path.join(r"d:\pali-theonlyone\temp_extraction\03", filename)
    thai_path_04 = os.path.join(r"d:\pali-theonlyone\temp_extraction\04", filename)
    
    pali_content = ""
    if os.path.exists(pali_path):
        pali_content = clean_text(read_file(pali_path, 'tis-620'))
    
    thai_content = ""
    # Check all possible Thai source directories
    if os.path.exists(thai_path_02):
        thai_content = clean_text(read_file(thai_path_02, 'cp874'))
    elif os.path.exists(thai_path_03):
        thai_content = clean_text(read_file(thai_path_03, 'cp874'))
    elif os.path.exists(thai_path_04):
        thai_content = clean_text(read_file(thai_path_04, 'cp874'))
    
    # Split Pali content into sentences
    sentences = split_pali_sentences(pali_content)
    
    # Split Thai content into sentences
    thai_sentences = split_thai_sentences(thai_content)
    
    # If no Pali sentences found (empty file or no delimiters), but content exists
    if not sentences and pali_content:
        sentences = [pali_content]
    elif not sentences:
        # If both empty, return empty list (will be skipped in main loop if checked)
        # But if Thai content exists, we should preserve it
        sentences = [""]

    entries = []
    
    # Attempt to align Pali and Thai sentences
    # Basic logic: 1-to-1 mapping as far as possible
    
    max_len = max(len(sentences), len(thai_sentences))
    
    for i in range(max_len):
        pali_text = sentences[i] if i < len(sentences) else ""
        thai_text = thai_sentences[i] if i < len(thai_sentences) else ""
        
        # Skip if both are empty
        if not pali_text and not thai_text:
            continue
            
        entry = {
            "part": "มังคลัถทีปนี ภาค ๒",
            "vagga": "", # Placeholder
            "story": "", # Placeholder
            "episode": "", # Placeholder
            "page": f"หน้า {to_thai_digits(page_num)}",
            "pali": pali_text,
            "thai": thai_text, # Mapped Thai text
            "thai_desana": "", # Cleared as requested (or should we keep the full text somewhere?)
                               # User asked to put Thai content to match Pali, so 'thai' field is appropriate.
            "thai_sense": "",
            "context": "", # Placeholder
            "akhyata": "", # Placeholder
            "kitaka": "", # Placeholder
            "vocab_list": "", # Placeholder
            "sandhi": {} # Placeholder
        }
        entries.append(entry)
        
    return entries

def main():
    pali_dir = r"d:\pali-theonlyone\temp_extraction\01"
    files = [f for f in os.listdir(pali_dir) if f.endswith('.txt')]
    files.sort()
    
    data = []
    
    print(f"Found {len(files)} files to process...")
    
    for filename in files:
        try:
            page_num = int(filename.split('.')[0])
            if page_num % 50 == 0:
                print(f"Processing page {page_num}...")
            
            entries = process_page(page_num)
            if entries:
                data.extend(entries)
                
        except ValueError:
            print(f"Skipping invalid filename: {filename}")
            
    output_structure = {
        "mangala2_content": data
    }
    
    output_path = r"d:\pali-theonlyone\data\content-mangala02.js"
    
    # Write as JS file
    js_content = f"const contentMangala02 = {json.dumps(output_structure, ensure_ascii=False, indent=4)};\n"
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully processed {len(data)} segments from {len(files)} pages and wrote to {output_path}")

if __name__ == "__main__":
    main()
