import json
import sys
import os

if len(sys.argv) < 3:
    print("Usage: python find_story_containing.py <book_number> <search_term>")
    sys.exit(1)

book_num = sys.argv[1]
search_term = sys.argv[2]
file_path = fr"d:\pali-theonlyone\data\raw\purivaro-book{book_num}-raw.json"

if not os.path.exists(file_path):
    print(f"File not found: {file_path}")
    sys.exit(1)

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    found_titles = set()
    
    for entry in data:
        # Check all text fields
        text_content = ""
        for key in ['thai_text', 'pali_text', 'story_title', 'thai_attha', 'pali']:
             if key in entry and entry[key]:
                 text_content += str(entry[key]) + " "
        
        if search_term in text_content:
            title = entry.get('story_title')
            if title:
                found_titles.add(title.strip())

    print(f"--- Stories containing '{search_term}' in Book {book_num} ---")
    for t in found_titles:
        print(t)
        
except Exception as e:
    print(f"Error: {e}")
