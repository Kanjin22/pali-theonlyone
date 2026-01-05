import json
import glob
import os

def load_all_raw_data():
    all_data = []
    # Use absolute path with correct separator
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

def main():
    raw_data = load_all_raw_data()
    print(f"Loaded {len(raw_data)} items.")
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
    
    print(f"Loaded {len(scraped_stories)} unique stories.")

    targets = [
        'เทวหิตพฺราหฺมณวตฺถุ',
        'มหาธนวาณิชวตฺถุ',
        'พระมหากัสสปเถระ',
        'ปญฺจสตภิกฺขุวตฺถุ',
        'ติตฺถิยสาวกวตฺถุ',
        'หตฺถาจริยปุพฺพกภิกฺขุวตฺถุ',
        'อนาถปิณฺฑิกวตฺถุ'
    ]
    
    for t in targets:
        print(f"Checking for '{t}'...")
        if t in scraped_stories:
            print("  Found!")
        else:
            print("  Not Found.")
            # Partial match?
            for k in scraped_stories.keys():
                if t in k or k in t:
                    print(f"    Similar: {k}")

if __name__ == "__main__":
    main()
