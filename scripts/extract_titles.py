import json
import sys
import os

if len(sys.argv) < 2:
    print("Usage: python extract_titles.py <book_number>")
    sys.exit(1)

book_num = sys.argv[1]
file_path = fr"d:\pali-theonlyone\data\raw\purivaro-book{book_num}-raw.json"

if not os.path.exists(file_path):
    print(f"File not found: {file_path}")
    sys.exit(1)

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    titles = []
    last_title = None
    
    for entry in data:
        title = entry.get('story_title')
        if title:
            title = title.strip()
            if title != last_title:
                titles.append(title)
                last_title = title
            
    print(f"--- Titles for Book {book_num} ---")
    for t in titles:
        print(t)
        
except Exception as e:
    print(f"Error: {e}")
