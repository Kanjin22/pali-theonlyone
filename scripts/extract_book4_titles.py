import json
import sys

file_path = r"d:\pali-theonlyone\data\raw\purivaro-book4-raw.json"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    titles = []
    seen_titles = set()
    last_title = None
    
    for entry in data:
        title = entry.get('story_title', '').strip()
        if title and title != last_title:
            titles.append(title)
            last_title = title
            
    for t in titles:
        print(t)
        
except Exception as e:
    print(f"Error: {e}")
