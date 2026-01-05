
import json
import glob
import re

def normalize(text):
    return text.strip()

files = glob.glob('d:/pali-theonlyone/data/raw/purivaro-book*-raw.json')
all_titles = []
for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            data = json.load(file)
            for item in data:
                all_titles.append(item.get('story_title', ''))
    except Exception as e:
        print(f"Error reading {f}: {e}")

all_titles.sort()
with open('d:/pali-theonlyone/temp_raw_titles.txt', 'w', encoding='utf-8') as f:
    for t in all_titles:
        f.write(t + '\n')

print(f"Saved {len(all_titles)} titles to temp_raw_titles.txt")
