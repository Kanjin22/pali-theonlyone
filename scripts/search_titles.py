import json
import glob
import re
import sys

def search_titles(keywords):
    files = glob.glob('d:/pali-theonlyone/data/raw/purivaro-book*-raw.json')
    found_map = {k: [] for k in keywords}
    
    for file_path in files:
        print(f"Scanning {file_path}...")
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        for i, line in enumerate(lines):
            if '"story_title":' in line:
                match = re.search(r'"story_title":\s*"([^"]+)"', line)
                if match:
                    title = match.group(1)
                    for k in keywords:
                        if k in title:
                            found_map[k].append(f"{file_path}:{i+1} -> {title}")
                            
    for k, results in found_map.items():
        print(f"\n--- Results for '{k}' ---")
        seen = set()
        for r in results:
            if r not in seen:
                print(r)
                seen.add(r)

if __name__ == '__main__':
    keywords = [
        "อนาถปิณฺฑิก",
        "มหาธน",
        "ศีลเป็นที่รัก",
        "ถูกเบียดเบียน",
        "พราหมณ์ผู้ฝึกตน",
        "ปาเวยยกะ"
    ]
    search_titles(keywords)
