import json
import glob
import os

def list_titles():
    files = sorted(glob.glob('d:/pali-theonlyone/data/raw/purivaro-book*-raw.json'))
    with open('d:/pali-theonlyone/purivaro_titles_utf8.txt', 'w', encoding='utf-8') as out_f:
        for fpath in files:
            book_num = os.path.basename(fpath).replace('purivaro-book', '').replace('-raw.json', '')
            out_f.write(f"--- Book {book_num} ---\n")
            try:
                with open(fpath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    titles = set()
                    for item in data:
                        if 'story_title' in item and item['story_title']:
                            titles.add(item['story_title'])
                    
                    for t in sorted(list(titles)):
                        out_f.write(f"{t}\n")
            except Exception as e:
                print(f"Error reading {fpath}: {e}")

if __name__ == "__main__":
    list_titles()
