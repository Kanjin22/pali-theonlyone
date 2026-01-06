import json
import os
import glob

missing_keys = [
    "d01_v01_s12_devahita",
    "d02_v03_s05_cittahattha",
    "d04_v06_s09_mahadhana",
    "d04_v08_s04_anathapindika",
    "d04_v08_s09_kassapa",
    "d04_v08_s15_silava",
    "d08_v20_s01_pancasata_bhikkhu_1",
    "d08_v22_s09_titthiya_savaka",
    "d08_v23_s02_hatthacariya"
]

search_terms = {
    "d01_v01_s12_devahita": ["เทวหิต", "Devahita"],
    "d02_v03_s05_cittahattha": ["จิตตหัตถ", "Cittahattha"],
    "d04_v06_s09_mahadhana": ["มหาธน", "Mahadhana"],
    "d04_v08_s04_anathapindika": ["อนาถ", "Anathapindika", "อนัตถ"],
    "d04_v08_s09_kassapa": ["กัสสปะ", "Kassapa"],
    "d04_v08_s15_silava": ["ศีลเป็นที่รัก", "Silava", "สีลว"],
    "d08_v20_s01_pancasata_bhikkhu_1": ["ทุจริต", "ภิกษุ ๕๐๐", "Pancasata"],
    "d08_v22_s09_titthiya_savaka": ["พราหมณ์ผู้ฝึกตน", "Titthiya"],
    "d08_v23_s02_hatthacariya": ["ปาเวยยกะ", "Hatthacariya", "ช้าง"]
}

data_dir = r"D:\Budsir 7\BUDSIR7 ict21607"
json_files = glob.glob(os.path.join(data_dir, "*.json"))

print(f"Searching in {len(json_files)} files...")

for file_path in json_files:
    book_num = os.path.basename(file_path)
    print(f"Scanning {book_num}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        titles = set()
        for entry in data:
            t = entry.get('story_title', '').strip()
            if t: titles.add(t)
            
        for key, terms in search_terms.items():
            for title in titles:
                for term in terms:
                    if term in title:
                        print(f"Match for {key} in {book_num}: {title}")
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
