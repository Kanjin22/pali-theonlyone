import json
import re
import os

def normalize_text(text):
    if not text: return ""
    return text.strip().replace('\u200b', '')

def main():
    # 1. Load Scraped Data
    raw_path8 = os.path.join('d:/pali-theonlyone', 'data/raw/purivaro-book8-raw.json')
    with open(raw_path8, 'r', encoding='utf-8') as f:
        raw_data8 = json.load(f)

    # Load Book 7
    raw_path7 = os.path.join('d:/pali-theonlyone', 'data/raw/purivaro-book7-raw.json')
    try:
        with open(raw_path7, 'r', encoding='utf-8') as f:
            raw_data7 = json.load(f)
    except FileNotFoundError:
        print("Warning: Book 7 raw data not found.")
        raw_data7 = []
        
    raw_data = raw_data8 + raw_data7
        
    # Group by story_title
    scraped_stories = {}
    for line in raw_data:
        title = line.get('story_title', '').strip()
        if not title: continue
        if title not in scraped_stories:
            scraped_stories[title] = []
        scraped_stories[title].append(line)
        
    # 2. Load Existing JS Structure
    with open('data/content-dhamma08.js', 'r', encoding='utf-8') as f:
        js_content = f.read()
        
    # Regex to find keys and metadata
    # Format: "key": [\n { \n part: "...", \n vagga: "...", \n story: "..."
    # We want to capture the whole block to replace it or parse it.
    
    # Strategy: Parse the file line by line to reconstruct it with new data.
    
    new_lines = []
    lines = js_content.split('\n')
    
    current_key = None
    current_meta = {}
    skip_mode = False
    
    # Mapping helper
    # We need to map JS story names/keys to Scraped Titles
    # Let's define a manual mapping based on inspection or fuzzy logic
    # Since we can't do interactive mapping easily, we'll use a best-effort function
    
    def find_matching_scraped_title(js_key, js_story_name):
        # 1. Try key match (e.g. kapila_maccha -> กปิลมจฺฉ)
        key_part = js_key.split('_')[-1] # kapila or maccha
        if len(js_key.split('_')) > 4:
             key_part = js_key.split('_')[-2] # e.g. kapila
             
        # Manual overrides for known mismatches
        manual_map = {
            'kapila_maccha': 'กปิลมจฺฉวตฺถุ',
            'pancasata_bhikkhu_1': 'ปญฺจสตภิกฺขุวตฺถุ',
            'pancasata_bhikkhu_2': 'ปญฺจสตภิกฺขุวตฺถุ', # Duplicate mapping
            'tissa': 'ปพฺภารวาสิติสฺสตฺเถรวตฺถุ',
            'sukara': 'สูกรโปติกาวตฺถุ',
            'potthila': 'โปฐิลตฺเถรวตฺถุ', # Try this, if fails, might be missing
            'pancasata_bhikkhu_3': 'ปญฺจสตภิกฺขุวตฺถุ', # Duplicate mapping
            'suvannakara': 'สารีปุตฺตตฺเถรสฺสสทฺธิวิหาริกวตฺถุ', 
            'mahamoggallana': 'มหาโมคฺคลฺลานตฺเถรวตฺถุ',
            'mahallaka': 'มหลฺลกตฺเถรวตฺถุ',
            'pothila': 'โปฐิลตฺเถรวตฺถุ',
            'suvanna_kara': 'สารีปุตฺตตฺเถรสฺสสทฺธิวิหาริกวตฺถุ',
            'mahadhana': 'มหาธนวาณิชวตฺถุ',
            'attano_pubbakamma': 'อตฺตโนปุพฺพกมฺมวตฺถุ',
            'kukkuta_andani': 'กุกฺกุฏณฺฑขาทิกาวตฺถุ',
            'daru_cira': 'ทารุสากฏิกวตฺถุ',
            'vajjiputta': 'วชฺชีปุตฺตกภิกฺขุวตฺถุ',
            'citta': 'จิตฺตคหปติวตฺถุ',
            'culasubhadda': 'จูฬสุภทฺทาวตฺถุ',
            'ekavihari': 'เอกวิหาริตฺเถรวตฺถุ',
            'lakuntaka': 'ลกุณฺฏกภทฺทิยตฺเถรวตฺถุ',
            'pasada_brahmana': 'ปสาทพหุลพฺราหฺมณวตฺถุ',
            'kuhaka_brahmana': 'กุหกพฺราหฺมณวตฺถุ',
            'kisagotami': 'กิสาโคตมีวตฺถุ',
            'patacara': 'ปฏาจาราเถรีวตฺถุ', # Try this
            'vibbhanta': 'วิพฺภนฺตกวตฺถุ',
            'bandhanagara': 'พนฺธนาคารวตฺถุ',
            'khema': 'เขมาวตฺถุ', 
            'uggasena': 'อุคฺคเสนเสฏฺฐิปุตฺตวตฺถุ',
            'culladhanuggaha': 'จูฬธนุคฺคหปณฺฑิตวตฺถุ',
            'mara': 'มารวตฺถุ',
            'upaka': 'อุปกาชีวกวตฺถุ',
            'sakka': 'สกฺกเทวราชวตฺถุ',
            'aputtaka': 'อปุตฺตกเสฏฺฐิวตฺถุ',
            'ankura': 'องฺกุรเทวปุตฺตวตฺถุ',
            'mahapanthaka': 'มหาปนฺถกตฺเถรวตฺถุ',
            'pilindavaccha': 'ปิลินฺทวจฺฉตฺเถรวตฺถุ, อญฺญตรภิกฺขุวตฺถุ', 
            'sariputta_4': 'สารีปุตฺตตฺเถรวตฺถุ',
            'moggallana': 'มหาโมคฺคลฺลานตฺเถรวตฺถุ',
            'revata': 'เรวตตฺเถรวตฺถุ',
            'candabha': 'จนฺทาภตฺเถรวตฺถุ',
            'sivali': 'สีวลิตฺเถรวตฺถุ',
            'sundarasamudra': 'สุนฺทรสมุทฺทตฺเถรวตฺถุ',
            'jotika': 'โชติกตฺเถรวตฺถุ',
            'natapubbaka_1': 'ปฐมนฏปุพฺพกวตฺถุ',
            'natapubbaka_2': 'ทุติยนฏปุพฺพกวตฺถุ',
            'vangisa': 'วงฺคีสตฺเถรวตฺถุ',
            'dhammadinna': 'ธมฺมทินฺนาเถรีวตฺถุ',
            'angulimala': 'องฺคุลิมาลตฺเถรวตฺถุ',
            'devahita': 'เทวหิตพฺราหฺมณวตฺถุ',
            'brahmana_2': 'เทฺว พฺราหฺมณวตฺถุ',
            'hamsa_ghataka': 'หํสฆาตกภิกฺขุวตฺถุ',
            'kokalika': 'โกกาลิกวตฺถุ',
            'jatila': 'ชฏิลพฺราหฺมณวตฺถุ',
            'five_laymen': 'ปญฺจคฺคทายกพฺราหฺมณวตฺถุ',
            'santisarana': 'สนฺตกายตฺเถรวตฺถุ',
            'akkosaka': 'อกฺโกสกภารทฺวาชวตฺถุ',
            'samanera': 'สามเณรวตฺถุ',
            'sumana': 'สุมนสามเณรวตฺถุ',
            'anyatara_bhikkhu': 'อญฺญตรภิกฺขุวตฺถุ',
            'anyatara_brahmana': 'อญฺญตรพฺราหฺมณวตฺถุ',
            'anyatara_pabbajita': 'อญฺญตรปพฺพชิตวตฺถุ',
            'kuhaka': 'กุหกพฺราหฺมณวตฺถุ',
            'sambahula_bhikkhu': 'สมฺพหุลภิกฺขุวตฺถุ',
            'bhikkhu': 'อญฺญตรภิกฺขุวตฺถุ',
            'hansa': 'หํสฆาตกภิกฺขุวตฺถุ',
            'brahmana': 'อญฺญตรพฺราหฺมณวตฺถุ',
            'sambahula': 'สมฺพหุลภิกฺขุวตฺถุ',  # Fallback
            'vipakkhasevi': 'อญฺญตรวิปกฺขเสวกภิกฺขุวตฺถุ',
            'pancaggadayaka': 'ปญฺจคฺคทายกพฺราหฺมณวตฺถุ',
            'santakaya': 'สนฺตกายตฺเถรวตฺถุ',
            'nangalakuta': 'นงฺคลกูฏตฺเถรวตฺถุ',
            'vakkali': 'วกฺกลิตฺเถรวตฺถุ',
            'ananda': 'อานนฺทตฺเถรวตฺถุ',
            'annatara_pabbajita': 'อญฺญตรปพฺพชิตวตฺถุ',
            'sariputta': 'สารีปุตฺตตฺเถรวตฺถุ',
            'mahapajapati': 'มหาปชาปตีโคตมีวตฺถุ',
            'uppalavanna': 'อุปฺปลวณฺณาเถรีวตฺถุ',
        }
        
        # Check manual map using key suffix
        for k, v in manual_map.items():
            if k in js_key:
                return v
                
        # Fuzzy search
        # Remove vowels/tonal marks from Thai story name to compare with Pali? No.
        # Just look for containment
        return None

    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Detect Key Start
        key_match = re.match(r'^\s*"([^"]+)": \[\s*$', line)
        if key_match:
            current_key = key_match.group(1)
            new_lines.append(line)
            
            # Read next lines to get metadata (part, vagga, story)
            i += 1
            meta_block = []
            metadata = {}
            
            while i < len(lines) and not lines[i].strip().startswith('}'):
                l = lines[i]
                meta_block.append(l)
                
                # Extract meta
                if 'part:' in l: metadata['part'] = re.search(r'part: "([^"]+)"', l).group(1)
                if 'vagga:' in l: metadata['vagga'] = re.search(r'vagga: "([^"]+)"', l).group(1)
                if 'story:' in l: metadata['story'] = re.search(r'story: "([^"]+)"', l).group(1)
                
                i += 1
            
            # Now we are at '}', end of first object
            # Check if we have data for this story
            scraped_title = find_matching_scraped_title(current_key, metadata.get('story', ''))
            
            if scraped_title:
                if scraped_title in scraped_stories:
                    print(f"Match found: {current_key} -> {scraped_title}")
                    # Generate new objects
                    story_lines = scraped_stories[scraped_title]
                    
                    # Sort by sentence_index (if needed, but usually already sorted)
                    # But raw data might be mixed? No, usually API returns sorted.
                    
                    for idx, s_line in enumerate(story_lines):
                        pali_text = normalize_text(s_line.get('pali', ''))
                        thai_text = normalize_text(s_line.get('thai', ''))
                        page_num = s_line.get('page', 0)
                        
                        # Create object string
                        obj_str = "        {\n"
                        obj_str += f'            part: "{metadata.get("part", "")}",\n'
                        obj_str += f'            vagga: "{metadata.get("vagga", "")}",\n'
                        obj_str += f'            story: "{metadata.get("story", "")}",\n'
                        obj_str += f'            episode: "รหัส {s_line.get("id", "")}",\n' # Use ID as episode or keep empty
                        obj_str += f'            page: "หน้า {page_num}",\n'
                        obj_str += f'            pali: `{pali_text}`,\n'
                        obj_str += f'            thai: `{thai_text}`,\n'
                        obj_str += '            thai_sense: "",\n'
                        obj_str += '            context: "",\n'
                        obj_str += '            akhyata: "",\n'
                        obj_str += '            kitaka: "",\n'
                        obj_str += '            vocab_list: "",\n'
                        obj_str += '            sandhi: {}\n'
                        obj_str += "        }"
                        
                        if idx < len(story_lines) - 1:
                            obj_str += ","
                        
                        new_lines.append(obj_str)
                else:
                     print(f"Title Mapped but not in Raw Data: {current_key} -> '{scraped_title}'")
                     # Debug: print closest match
                     # for k in scraped_stories.keys():
                     #    if 'ปสาท' in k: print(f"Did you mean: {k}?")
                     
                     new_lines.append(meta_block[0]) # {
                     for l in meta_block[1:]:
                        new_lines.append(l)
                     new_lines.append(lines[i]) 
            
            else:
                # No data found, keep original block (but we already consumed it into meta_block)
                # We need to output the original block
                print(f"No match for: {current_key} ({metadata.get('story', '')})")
                new_lines.append(meta_block[0]) # {
                # Add rest of meta fields
                for l in meta_block[1:]:
                    new_lines.append(l)
                # We are at '}'
                new_lines.append(lines[i]) 
            
            # Skip until ']'
            while i < len(lines) and not lines[i].strip().startswith(']'):
                i += 1
            new_lines.append(lines[i]) # ]
            
        else:
            new_lines.append(line)
            
        i += 1
        
    # Write output
    output_path = os.path.join('d:/pali-theonlyone', 'data/content-dhamma08-updated.js')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    print(f"Done! Wrote to {output_path}")
        
if __name__ == "__main__":
    main()
