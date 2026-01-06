import json
import re
import os
import glob
from difflib import SequenceMatcher

def normalize_text(text):
    if not text: return ""
    return text.strip().replace('\u200b', '')

def normalize_pali_key(text):
    if not text: return ""
    # Remove punctuation, spaces, and lowercase to facilitate fuzzy matching
    # Keep Thai characters if any (unlikely in Pali field but safe to keep)
    s = re.sub(r'[\s\.,;:!?"\'“”‘’/\\\(\)\[\]\-]+', '', text)
    return s.lower()

def extract_field(full_text, key):
    # Try backticks (multi-line)
    m = re.search(rf'{key}:\s*`([^`]*)`', full_text, re.DOTALL)
    if m: return m.group(1)
    
    # Try double quotes
    m = re.search(rf'{key}:\s*"([^"]*)"', full_text, re.DOTALL)
    if m: return m.group(1)
    
    # Try single quotes
    m = re.search(rf"{key}:\s*'([^']*)'", full_text, re.DOTALL)
    if m: return m.group(1)

    return ""

def extract_sandhi(full_text):
    # Extract sandhi object content: sandhi: { ... }
    m = re.search(r'sandhi:\s*(\{.*?\})', full_text, re.DOTALL)
    if m: return m.group(1)
    return "{}"

def parse_original_block(block_lines):
    full_text = "\n".join(block_lines)
    return {
        'pali': extract_field(full_text, 'pali'),
        'thai': extract_field(full_text, 'thai'),
        'thai_desana': extract_field(full_text, 'thai_desana'),
        'thai_sense': extract_field(full_text, 'thai_sense'),
        'context': extract_field(full_text, 'context'),
        'akhyata': extract_field(full_text, 'akhyata'),
        'kitaka': extract_field(full_text, 'kitaka'),
        'vocab_list': extract_field(full_text, 'vocab_list'),
        'sandhi': extract_sandhi(full_text)
    }

def load_all_raw_data():
    # Load all raw data into a dictionary keyed by title
    import os
    all_data = []
    pattern = os.path.join('d:\\', 'pali-theonlyone', 'data', 'raw', 'purivaro-book*-raw.json')
    print(f"Searching for: {pattern}")
    files = glob.glob(pattern)
    print(f"Found {len(files)} files.")
    for fpath in files:
        try:
            with open(fpath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                all_data.extend(data)
        except Exception as e:
            print(f"Error loading {fpath}: {e}")
    return all_data

def get_manual_map():
    return {
        'kapila_maccha': 'กปิลมจฺฉวตฺถุ',
        'pancasata_bhikkhu_1': 'ปญฺจสตภิกฺขุวตฺถุ',
        'pancasata_bhikkhu_2': 'ปญฺจสตภิกฺขุวตฺถุ',
        'tissa': 'ปพฺภารวาสิติสฺสตฺเถรวตฺถุ',
        'sukara': 'สูกรโปติกาวตฺถุ',
        'potthila': 'โปฐิลตฺเถรวตฺถุ',
        'pancasata_bhikkhu_3': 'ปญฺจสตภิกฺขุวตฺถุ',
        'suvannakara': 'สารีปุตฺตตฺเถรสฺสสทฺธิวิหาริกวตฺถุ',
        'mahamoggallana': 'มหาโมคฺคลฺลานตฺเถรวตฺถุ',
        'mahallaka': 'มหลฺลกตฺเถรวตฺถุ',
        'pothila': 'โปฐิลตฺเถรวตฺถุ',
        'suvanna_kara': 'สารีปุตฺตตฺเถรสฺสสทฺธิวิหาริกวตฺถุ',
        'cittahattha': 'พระจิตหัตถเถระ',
        'mahadhana': 'มหาธนวาณิชวตฺถุ',
        'kassapa': 'พระมหากัสสปเถระ',
        'anathapindika': 'อนาถปิณฺฑิกวตฺถุ',
        'silava': 'ภิกษุอัสสชิและปุนัพพสุกะ',
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
        'patacara': 'ปฏาจาราวตฺถุ',
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
        'sambahula': 'สมฺพหุลภิกฺขุวตฺถุ',
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
        'sanu': 'สานุสามเณรวตฺถุ',
        'goghata': 'โคฆาตกปุตฺตวตฺถุ',
        'ekudana': 'เอกุทานตฺเถรวตฺถุ',
        'pandita': 'บัณฑิตตสามเณร',
        'khadiravaniya': 'พระขทิรวนิยเรวตเถระ',
        'tambadathika': 'บุรุษผู้คร่าโจรมีเคราแดง',
        'anathapindika': 'อนาถปิณฺฑิกวตฺถุ',
        'kundalakesi': 'พระกุณฑลเกสีเถรี',
        'kisa': 'นางกีสาโคตมี',
        'silava': 'ภิกษุผู้มีศีลเป็นที่รัก',
        'uposatha': 'อุโบสถกรรม',
        'devadatta': 'เทวทตฺตวตฺถุ',
        'cinca': 'จิญฺจมาณวิกาวตฺถุ',
        'atula': 'อตุลอุปาสกวตฺถุ',
        'subhadda': 'สุภทฺทวตฺถุ',
        'sundari': 'สุนฺทรีปริพฺพาชิกาวตฺถุ',
        'anitthigandha': 'อนิตฺถิคนฺธกุมารวตฺถุ',
        'anagami': 'อนาคามิตฺเถรวตฺถุ',
        'rohini': 'โรหิณีขตฺติยกญฺญาวตฺถุ',
        'loludayi': 'โลฬุทายิตฺเถรวตฺถุ',
        'titthiya_savaka': 'ติตฺถิยสาวกวตฺถุ',
        'pasenadi': 'ปเสนทิโกสลราชวตฺถุ',
        'belatthasisa': 'พระเพฬัฏฐสีสเถระ',
        'mahakaccayana': 'พระมหากัจจายนะเถระ',
        'laja': 'ลาชเทวธีตาวตฺถุ',
        'bilalapadaka': 'พิฬาลปทกเสฏฺฐิวตฺถุ',
        'koka': 'โกกสุนขลุทฺทกวตฺถุ',
        'suppabuddha': 'สุปฺปพุทฺธสกฺกวตฺถุ',
        'kondadhana': 'โกณฺฑธานตฺเถรวตฺถุ',
        'bahubhandika': 'พหุภณฺฑิกภิกฺขุวตฺถุ',
        'santati': 'สนฺตติมหามตฺตวตฺถุ',
        'pilotika': 'ปิโลติกตฺเถรวตฺถุ',
        'visakha_sahaya': 'วิสาขายสหายิกาวตฺถุ',
        'sirima': 'สิริมาวตฺถุ',
        'uttara': 'อุตฺตราอุปาสิกาวตฺถุ',
        'adhimanika': 'อธิมานิกภิกฺขุวตฺถุ',
        'mallika': 'มลฺลิกาเทวีวตฺถุ',
        'mahakala': 'มหากาลอุปาสกวตฺถุ',
        'sanghabheda': 'สงฺฆเภทปริสกฺกนวตฺถุ',
        'kala': 'กาลตฺเถรวตฺถุ',
        'culakala': 'จุลฺลกาลอุปาสกวตฺถุ',
        'attadattha': 'อตฺตทตฺถตฺเถรวตฺถุ',
        'suddhodana': 'สุทฺโธทนวตฺถุ',
        'vipassaka': 'วิปสฺสกภิกฺขุวตฺถุ',
        'abhaya': 'อภยราชกุมารวตฺถุ',
        'pesakaradhita': 'เปสการธีตุวตฺถุ',
        'asadisa': 'อสทิสทานวตฺถุ',
        'erakapatta': 'เอรกปตฺตนาคราชวตฺถุ',
        'aggidatta': 'อคฺคิทตฺตปุโรหิตวตฺถุ',
        'kassapa_cediya': 'กสฺสปทสพลสฺสสุวณฺณเจติยวตฺถุ',
        'kosala': 'ปเสนทิโกสลวตฺถุ',
        'annatara_kula': 'อญฺญตรกุลปุตฺตวตฺถุ',
        'tayo_jana': 'ตโยชนวตฺถุ',
        'kulaputta': 'อญฺญตรกุลปุตฺตวตฺถุ',
        'kutumbi': 'อญฺญตรกุฏุมฺพิกวตฺถุ',
        'licchavi': 'ลิจฺฉวิวตฺถุ',
        'pancasata_daraka': 'ปญฺจสตทารกวตฺถุ',
        'nandiya': 'นนฺทิยวตฺถุ',
        'punna': 'ปุณฺณทาสีวตฺถุ',
        'chabbaggiya': 'ฉพฺพคฺคิยวตฺถุ',
        'ghataka_putta': 'โคฆาตกปุตฺตวตฺถุ',
        'kula_putta': 'อญฺญตรกุลปุตฺตวตฺถุ',
        'upasaka_5': 'ปญจอุปาสกวตฺถุ',
        'upasaka': 'อญฺญตรอุปาสกวตฺถุ',
        'mendaka': 'เมณฺฑกเสฏฺฐิวตฺถุ',
        'ujjhanasanni': 'อุชฺฌานสญฺญิตฺเถรวตฺถุ',
        'vinicchaya': 'วินิจฺฉยมหามตฺตวตฺถุ',
        'hatthaka': 'หตฺถกวตฺถุ',
        'titthiya': 'ติตฺถิยวตฺถุ',
        'ariya': 'อริยพาลิสิกวตฺถุ',
        'vaggumuda': 'วคฺคุมุทาตีริยภิกฺขุวตฺถุ',
        'dubbacca': 'ทุพฺพจภิกฺขุวตฺถุ',
        'issapakata': 'อิสฺสาปกตอิตฺถีวตฺถุ',
        'hatthacariya': 'หตฺถาจริยปุพฺพกภิกฺขุวตฺถุ',
        'nati_kalaha': 'ญาตกานํกลหวูปสมนวตฺถุ',
        'sankicca': 'สังกิจจสามเณร',
        'khanu': 'พระขานุโกณฑัญญเถระ',
        'seyyasaka': 'เสยฺยสกตฺเถรวตฺถุ',
        'ajagara': 'อชครเปตวตฺถุ',
        'kukkutamitta': 'กุกฺกุฏมิตฺตวตฺถุ',
        'bahuputtika': 'พระพหุปุตติกาเถรี',
        'cullaekasataka': 'จูเฬกสาฏกวตฺถุ',
        'janapadakalyani': 'รูปนนฺทาเถรีวตฺถุ',
        'devorohana': 'ยมกปฺปาฏิหาริยวตฺถุ',
        'nigantha': 'นิคนฺถวตฺถุ',
        'udana': 'ปฐมโพธิวตฺถุ',
        'visakha': 'วิสาขาอุปาสิกาวตฺถุ',
        'aparijjuta': 'อสญฺญตปริกฺขารภิกฺขุวตฺถุ',
        'anabhirata': 'อนภิรตภิกฺขุวตฺถุ',
        'uposatha': 'อุโปสถกมฺมวตฺถุ',
        'pathanakammika_tissa': 'ปธานกมฺมิกติสฺสตฺเถรวตฺถุ',
        'sukara_peta': 'สูกรเปตวตฺถุ',
        'bhaddiya_bhikkhu': 'ภทฺทิยภิกฺขุวตฺถุ',
        'dukka_pilita_satta': 'ทุกฺขปีฬิตสตฺตวตฺถุ',
        'agantuka_bhikkhu': 'อาคนฺตุกภิกฺขุวตฺถุ',
        'parijinna_brahmana_putta': 'ปริชิณฺณบฺราหฺมณปุตฺตวตฺถุ',
        'paveraka_hatti': 'ปาเวรกหตฺถิวตฺถุ',
        'culasari': 'จูฬสาริภิกฺขุวตฺถุ',
        'tissa_dahara': 'ติสฺสทหรวตฺถุ'
        ,
        # explicit key-based overrides to improve matching
        'd08_v23_s02_hatthacariya': 'ปาเวรกหตฺถิวตฺถุ',
        'd08_v22_s09_titthiya_savaka': 'ติตฺถิยสาวกวตฺถุ',
        'd08_v20_s01_pancasata_bhikkhu_1': 'ปญฺจสตภิกฺขุวตฺถุ',
        'd04_v08_s04_anathapindika': 'อนาถปิณฺฑิกวตฺถุ',
        'd04_v08_s15_silava': 'ภิกษุผู้มีศีลเป็นที่รัก',
        'd01_v01_s12_devahita': 'เทวหิตพฺราหฺมณวตฺถุ'
    }

def clean_thai_title(title):
    title = re.sub(r'^[๑-๙\d]+\.\s*', '', title)
    title = title.replace('เรื่อง', '')
    title = re.sub(r'\s*\[.*', '', title)
    return title.strip()

def tokenize_thai(s):
    s = re.sub(r'[\d\[\]\(\)\.,;:!?\\"\'“”‘’/\\\\]+', ' ', s)
    s = s.replace('ฯ', ' ').replace('ๆ', ' ')
    tokens = [t for t in s.split() if t]
    return tokens

def normalize_title(s):
    if not s:
        return ''
    s = re.sub(r'[\s\\d\\[\\]\\(\\)\\.,;:!?"\\\'“”‘’/\\\\]+', '', s)
    return s.strip().lower()

STOPWORDS = {'ผู้', 'เรื่อง', 'ชื่อ', 'คนใดคนหนึ่ง', 'พระ', 'นาง', 'เถระ', 'เถรี'}

def is_placeholder_block(block_lines):
    joined = "\n".join(block_lines)
    return ('รอข้อมูล' in joined)

def find_matching_scraped_title(js_key, js_story_title, manual_map, scraped_stories_keys):
    for k, v in manual_map.items():
        if k in js_key:
            print(f"  [manual] {js_key} -> {v}")
            # try exact title first
            if v in scraped_stories_keys:
                return v
            # fallback: normalized match
            nv = normalize_title(v)
            for sk in scraped_stories_keys:
                if normalize_title(sk) == nv:
                    return sk
            # fallback: token overlap
            vtoks = tokenize_thai(v)
            best = None
            best_shared = 0
            for sk in scraped_stories_keys:
                toks = [t for t in tokenize_thai(sk) if t not in STOPWORDS]
                shared = sum(1 for t in vtoks if any(t in rt for rt in toks))
                if shared > best_shared:
                    best_shared = shared
                    best = sk
            if best_shared >= 1:
                return best
            return v

    cleaned = clean_thai_title(js_story_title)
    cleaned_tokens = [t for t in tokenize_thai(cleaned) if t not in STOPWORDS]
    if not cleaned_tokens:
        cleaned_tokens = tokenize_thai(cleaned)

    if cleaned in scraped_stories_keys:
        return cleaned

    for raw_title in scraped_stories_keys:
        raw_tokens = tokenize_thai(raw_title)
        raw_tokens_filtered = [t for t in raw_tokens if t not in STOPWORDS]
        shared = 0
        for ct in cleaned_tokens:
            if any(ct in rt for rt in raw_tokens_filtered):
                shared += 1
        if shared >= 2 or (len(cleaned_tokens) >= 1 and shared == len(cleaned_tokens)):
            return raw_title

    return None

def process_book(book_id, scraped_stories, manual_map, missing_keys):
    input_path = f'd:/pali-theonlyone/data/content-dhamma{book_id:02d}.js'
    output_path = f'd:/pali-theonlyone/data/updated/content-dhamma{book_id:02d}-updated.js'
    
    if not os.path.exists(input_path):
        print(f"Skipping {input_path} (File not found)")
        return

    print(f"Processing {input_path}...")
    
    with open(input_path, 'r', encoding='utf-8') as f:
        js_content = f.read()

    new_lines = []
    lines = js_content.split('\n')
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Detect Key Start
        key_match = re.match(r'^\s*"([^"]+)": \[\s*$', line)
        if key_match:
            current_key = key_match.group(1)
            new_lines.append(line)
            
            i += 1
            meta_block = []
            metadata = {}
            
            while i < len(lines) and not lines[i].strip().startswith('}'):
                l = lines[i]
                meta_block.append(l)
                
                if 'part:' in l: metadata['part'] = re.search(r'part: "([^"]+)"', l).group(1)
                if 'vagga:' in l: metadata['vagga'] = re.search(r'vagga: "([^"]+)"', l).group(1)
                if 'story:' in l: metadata['story'] = re.search(r'story: "([^"]+)"', l).group(1)
                if 'episode:' in l: 
                    m = re.search(r'episode: "([^"]+)"', l)
                    if m: 
                        metadata['episode'] = m.group(1)
                
                i += 1
            
            # We are at '}', end of first object
            story_title_meta = metadata.get('story', '')
            scraped_title = find_matching_scraped_title(current_key, story_title_meta, manual_map, scraped_stories.keys())
        
            if 'kassapa' in current_key or 'pancasata_bhikkhu_1' in current_key or 'anathapindika' in current_key:
                print(f"DEBUG: Key={current_key}")
                print(f"DEBUG: ScrapedTitle={scraped_title}")
                if scraped_title:
                    print(f"DEBUG: InScrapedStories={scraped_title in scraped_stories}")
            
            stories = None
            
            # Collect original additional objects in this array
            original_items_blocks = []
                
            # Helper to collect block lines
            temp_j = i + 1
            # Check if first block itself was useful (often it's placeholder if no page number or ...)
            # Actually, first block is already in meta_block + lines[i]
            # But the loop logic below iterates from i+1.
            # We need to capture the first block if it has content.
            # But usually first block in original files is just header info if it's a placeholder.
            # Let's collect ALL blocks from the original file for this story.
            
            # Note: meta_block is the CONTENT of the first object. lines[i] is '}'.
            first_block_full = list(meta_block)
            first_block_full.append(lines[i])
            original_items_blocks.append(first_block_full)
    
            while temp_j < len(lines) and not lines[temp_j].strip().startswith(']'):
                if lines[temp_j].strip().startswith('{'):
                    obj_lines = []
                    while temp_j < len(lines):
                        obj_lines.append(lines[temp_j])
                        if lines[temp_j].strip().startswith('}'):
                            # include trailing comma line if present
                            if temp_j + 1 < len(lines) and lines[temp_j + 1].strip().startswith(','):
                                # We don't need the comma for parsing, but ok
                                pass 
                            break
                        temp_j += 1
                    original_items_blocks.append(obj_lines)
                temp_j += 1
                
            original_items_kept = [blk for blk in original_items_blocks if not is_placeholder_block(blk)]
            
            if scraped_title and scraped_title in scraped_stories:
                print(f"  Match: {current_key} -> {scraped_title}")
                story_lines = scraped_stories[scraped_title]
                
                # Create map of Original Content for merging
                original_map = {}
                for blk in original_items_kept:
                    data = parse_original_block(blk)
                    key = normalize_pali_key(data['pali'])
                    if key and len(key) > 5: # Filter out too short keys
                        original_map[key] = data
                
                total_count = len(story_lines)
                
                for idx, s_line in enumerate(story_lines):
                    pali_text = normalize_text(s_line.get('pali', ''))
                    thai_text = normalize_text(s_line.get('thai', ''))
                    page_num = s_line.get('page', 0)
                    
                    # Defaults
                    thai_desana = ""
                    thai_sense = ""
                    context = ""
                    akhyata = ""
                    kitaka = ""
                    vocab_list = ""
                    sandhi = "{}"
                    
                    # Check for match in original
                    pali_key = normalize_pali_key(pali_text)
                    if pali_key in original_map:
                        orig = original_map[pali_key]
                        # Prefer Original Thai if available and substantial
                        if orig['thai'] and len(orig['thai']) > 10: 
                            thai_text = normalize_text(orig['thai'])
                        if orig['thai_desana']: thai_desana = normalize_text(orig['thai_desana'])
                        if orig['thai_sense']: thai_sense = normalize_text(orig['thai_sense'])
                        if orig['context']: context = normalize_text(orig['context'])
                        if orig['akhyata']: akhyata = normalize_text(orig['akhyata'])
                        if orig['kitaka']: kitaka = normalize_text(orig['kitaka'])
                        if orig['vocab_list']: vocab_list = normalize_text(orig['vocab_list'])
                        if orig['sandhi'] and len(orig['sandhi']) > 2: sandhi = orig['sandhi']
                    
                    obj_str = "        {\n"
                    obj_str += f'            part: "{metadata.get("part", "")}",\n'
                    obj_str += f'            vagga: "{metadata.get("vagga", "")}",\n'
                    obj_str += f'            story: "{metadata.get("story", "")}",\n'
                    obj_str += f'            page: "หน้า {page_num}",\n'
                    episode_val = metadata.get("episode", f'รหัส {s_line.get("id", "")}')
                    obj_str += f'            episode: "{episode_val}",\n'
                    obj_str += f'            pali: `{pali_text}`,\n'
                    obj_str += f'            thai: `{thai_text}`,\n'
                    obj_str += f'            thai_desana: `{thai_desana}`,\n'
                    obj_str += f'            thai_sense: `{thai_sense}`,\n'
                    obj_str += f'            context: `{context}`,\n'
                    obj_str += f'            akhyata: `{akhyata}`,\n'
                    obj_str += f'            kitaka: `{kitaka}`,\n'
                    obj_str += f'            vocab_list: `{vocab_list}`,\n'
                    obj_str += f'            sandhi: {sandhi}\n'
                    obj_str += "        }"
                    
                    if idx < total_count - 1:
                        obj_str += ","
                    
                    new_lines.append(obj_str)
                
                # Note: We intentionally do NOT append original_items_kept here.
                # We merged them into story_lines.
                
            else:
                missing_info = f"{current_key} | {metadata.get('story', '')}"
                if scraped_title:
                     print(f"  MISSING DATA: {current_info} -> {scraped_title}")
                     missing_keys.append(f"MISSING_DATA: {missing_info} -> {scraped_title}")
                else:
                     print(f"  NO MAPPING: {current_key} ({metadata.get('story', '')})")
                     missing_keys.append(f"NO_MAPPING: {missing_info}")
                
                # If no match, rebuild first object with complete fields
                orig_data = parse_original_block(meta_block)
                page_text = extract_field("\n".join(meta_block), 'page')
                page_num = re.sub(r'[^0-9]+', '', page_text) if page_text else ''
                obj_str = "        {\n"
                obj_str += f'            part: "{metadata.get("part", "")}",\n'
                obj_str += f'            vagga: "{metadata.get("vagga", "")}",\n'
                obj_str += f'            story: "{metadata.get("story", "")}",\n'
                obj_str += f'            page: "หน้า {page_num if page_num else "..."}",\n'
                episode_val = metadata.get("episode", "")
                obj_str += f'            episode: "{episode_val if episode_val else "รอข้อมูล"}",\n'
                obj_str += f'            pali: `{normalize_text(orig_data.get("pali", ""))}`,\n'
                obj_str += f'            thai: `{normalize_text(orig_data.get("thai", ""))}`,\n'
                obj_str += f'            thai_desana: `{normalize_text(orig_data.get("thai_desana", ""))}`,\n'
                obj_str += f'            thai_sense: `{normalize_text(orig_data.get("thai_sense", ""))}`,\n'
                obj_str += f'            context: `{normalize_text(orig_data.get("context", ""))}`,\n'
                obj_str += f'            akhyata: `{normalize_text(orig_data.get("akhyata", ""))}`,\n'
                obj_str += f'            kitaka: `{normalize_text(orig_data.get("kitaka", ""))}`,\n'
                obj_str += f'            vocab_list: `{normalize_text(orig_data.get("vocab_list", ""))}`,\n'
                sandhi_val = orig_data.get("sandhi", "{}")
                obj_str += f'            sandhi: {sandhi_val}\n'
                obj_str += "        }\n"
                new_lines.append(obj_str.strip('\n'))
                
                # Preserve additional original items
                # We need to re-scan for them since original_items_kept logic above consumed lines but we are just writing logic
                # Actually, lines 354-365 logic was appending blocks.
                # Here we just use original_items_blocks which we already collected.
                
                # Note: original_items_blocks[0] is the first block (already written above via meta_block)
                # So append the rest
                for k_idx, blk in enumerate(original_items_blocks[1:]):
                     # Add comma to previous line if needed? 
                     # The original file had commas. block_lines includes them?
                     # No, lines[temp_j] includes everything.
                     # But my collector logic separated blocks.
                     # Let's just output them.
                     
                     # Ensure comma from previous block
                     new_lines.append("        ,")
                     for bl in blk:
                        new_lines.append(bl)

            # Skip until ']'
            while i < len(lines) and not lines[i].strip().startswith(']'):
                i += 1
            if i < len(lines):
                new_lines.append(lines[i]) # ]
            else:
                new_lines.append("    ]")
            
        else:
            new_lines.append(line)
            
        i += 1

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    print(f"Updated {output_path}")

def main():
    # Load all raw data into a dictionary keyed by title
    raw_data = load_all_raw_data()
    if not raw_data:
        print("No purivaro raw data found. Skipping update to avoid overwriting originals.")
        return
    scraped_stories = {}
    for line in raw_data:
        title_val = line.get('story_title', '')
        if title_val is None:
            title_val = ''
        title = str(title_val).strip()
        if not title: continue
        if title not in scraped_stories:
            scraped_stories[title] = []
        scraped_stories[title].append(line)
    
    print(f"Loaded {len(scraped_stories)} unique stories from raw data.")
    
    manual_map = {
        "d01_v01_s01_cakkhupala": "พระจักขุปาลเถระ",
        "d01_v01_s04_kali": "นางกาลียักษิณี",
        "d01_v01_s05_kosambi": "ภิกษุชาวเมืองโกสัมพี",
        "d01_v01_s08_sanjaya": "สัญชัยปริพาชก",
        "d01_v01_s11_dhammika": "ธัมมิกอุบาสก",
        "d02_v02_s04_bala": "นักษัตรของคนพาล",
        "d02_v02_s06_two_monks": "ภิกษุ ๒ สหาย",
        "d02_v03_s01_meghiya": "พระเมฆิยะเถระ",
        "d02_v03_s03_ukkantitha": "ภิกษุผู้กระสันขึ้นแล้ว",
        "d02_v03_s04_sangharakkhita": "พระสังฆรักขิตเถระผู้เป็นหลาน",
        "d02_v03_s06_vipassana": "ภิกษุผู้มีวิปัสสนาอันปรารถแล้ว",
        "d02_v03_s07_putigatta": "พระติสสเถระผู้มีตัวอันเน่า",
        "d02_v03_s08_nandagopala": "ผู้เลี้ยงโคชื่อว่านันทะ",
        "d03_v04_s01_pathavikatha": "ภิกษุ ๕๐๐​ รูป ผู้ขวนขวายแล้วในปฐวีกถา",
        "d03_v04_s04_patipujika": "หญิงชื่อว่าปติปูชิกา",
        "d03_v04_s05_kosiya": "เศรษฐีชื่อว่าโกสิยะผู้มีความตระหนี่",
        "d03_v04_s06_patika": "อาชีวกชื่อว่าปาฏิกะ",
        "d03_v04_s07_chattapani": "อุบาสกชื่อว่าฉัตตปาณิ",
        "d03_v04_s11_godhika": "การปรินิพพานแห่งพระโคธิกะ",
        "d03_v04_s12_garahadinna": "นิครนถ์ชื่อว่าครหทิน",
        "d03_v05_s04_ganthibhedaka": "โจรผู้ทำลายซึ่งปม",
        "d03_v05_s06_patha": "ภิกษุในเมืองปาฐา",
        "d03_v05_s11_jambuka": "อาชีวกชื่อว่าชัมพุกะ",
        "d03_v05_s12_ahi_peta": "เปรตมีอัตภาพแห่งงู",
        "d03_v05_s13_satthikuta_peta": "เปรตมีศีรษะอันค้อน ๖๐ ทำลายแล้ว",
        "d03_v05_s15_vanavasi": "พระวนวาสีติสสะเถระ",
        "d04_v08_s02_bahiya": "พระทารุจีริยเถระ",
        "d07_v18_s07_upasaka_5": "ปญฺจอุปาสกวตฺถุ",
        "d04_v07_s03_belatthasisa": "พระเพฬัฏฐสีสเถระ",
        "d04_v07_s05_mahakaccayana": "พระมหากัจจายนะเถระ",
        "d04_v07_s07_kosambivasitissa": "พระติสสเถระชาวกรุงโกสัมพี",
        "d04_v07_s09_khadiravaniya": "พระขทิรวนิยเรวตเถระ",
        "d04_v08_s01_tambadathika": "บุรุษผู้คร่าโจรมีเคราแดง",
        "d04_v08_s03_kundalakesi": "พระกุณฑลเกสีเถรี",
        "d01_v01_s03_tissa": "พระติสสเถระ",
        "d02_v02_s09_tissa": "พระติสสะเถระผู้อยู่ในนิคม",
        "d02_v03_s05_cittahattha": "พระจิตตหัตถเถระ",
        "d03_v04_s09_ananda": "ปัญหาของพระอานนท์",
        "d03_v05_s03_ananda_setthi": "เศรษฐีชื่อว่าอานนท์",
        "d03_v05_s07_suppabuddha": "สุปปพุทธะบุรุษผู้เป็นโรคเรื้อน",
        "d03_v05_s09_sumana": "นายมาลาการชื่อว่าสุมนะ",
        "d04_v06_s05_pandita": "บัณฑิตตสามเณร",
        "d04_v06_s06_lakuntaka": "พระลกุณฏกภัททิยะเถระ",
        "d04_v08_s06_patacara": "นางปฏาจารา",
        "d04_v08_s07_kisagotami": "นางกีสาโคตมี",
        "d04_v08_s08_bahuputtika": "พระพหุปุตติกาเถรี",
        "d04_v08_s10_sankicca": "สังกิจจสามเณร",
        "d04_v08_s11_khanu": "พระขานุโกณฑัญญเถระ",
        "d04_v08_s13_patacara": "นางปฏาจารา",
        "d04_v08_s14_kisa": "นางกีสาโคตมี",
        "d05_v09_s01_cullaekasataka": "รูปนนฺทตฺเถรีวตฺถุ",
        "d05_v11_s06_mallika": "มหาธนเสฏฺฐิปุตฺตวตฺถุ",
        "d06_v12_s01_bodhirajakumara": "สมฺมชฺชนตฺเถรวตฺถุ",
        "d07_v16_s01_tayo_jana": "จูฬสาริภิกฺขุวตฺถุ",
        "d08_v23_s07_sambahula_bhikkhu": "เทวหิตพฺราหฺมณวตฺถุ",
        # Add more if needed
    }
    missing_keys = []
    
    # Process Books 1-8
    for book_id in range(1, 9):
        process_book(book_id, scraped_stories, manual_map, missing_keys)
        
    with open('missing_keys_report.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(missing_keys))
    print(f"Wrote missing keys to missing_keys_report.txt")

if __name__ == "__main__":
    main()
