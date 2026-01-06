import json
import glob
import re
import sys
import os

def search_titles(keywords):
    files = glob.glob(r'D:\Budsir 7\BUDSIR7 ict21607\**\*.txt', recursive=True)
    found_map = {k: [] for k in keywords}
    
    for file_path in files:
        print(f"Scanning {file_path}...")
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        except Exception:
            continue
            
        for i, line in enumerate(lines):
            text = line.strip()
            for k in keywords:
                if k in text:
                    found_map[k].append(f"{file_path}:{i+1} -> {text[:200]}")
                            
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
