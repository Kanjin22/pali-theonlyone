import json
import glob
import re
import os

def extract_structure():
    files = sorted(glob.glob('data/raw/purivaro-book*-raw.json'))
    
    structure = []

    for file_path in files:
        book_num = int(re.search(r'book(\d+)', file_path).group(1))
        print(f"Processing Book {book_num}...")
        
        current_vagga = "Unknown Vagga"
        # Track unique stories per vagga to avoid duplicates in list
        vagga_stories = {} # {vagga_name: [story_list]}
        ordered_vaggas = []
        
        # Read file
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        last_story = None
        
        for item in data:
            # Check for Vagga (is_section = 1)
            if item.get('is_section') == 1:
                # Extract Vagga name from Pali or Thai
                pali_text = item.get('pali', '').strip()
                # Clean up punctuation
                pali_text = re.sub(r'^\d+\.\s*', '', pali_text) # Remove leading number
                pali_text = pali_text.strip('.')
                current_vagga = pali_text
                if current_vagga not in vagga_stories:
                    ordered_vaggas.append(current_vagga)
                    vagga_stories[current_vagga] = []
                continue

            # Check for Story
            story_title = item.get('story_title')
            if story_title and story_title != last_story:
                if current_vagga not in vagga_stories:
                    # Case where story appears before first section marker?
                    ordered_vaggas.append(current_vagga)
                    vagga_stories[current_vagga] = []
                
                if story_title not in vagga_stories[current_vagga]:
                     vagga_stories[current_vagga].append(story_title)
                last_story = story_title

        structure.append({
            'book': book_num,
            'vaggas': [{'name': v, 'stories': vagga_stories[v]} for v in ordered_vaggas]
        })

    # Output report
    with open('structure_report.txt', 'w', encoding='utf-8') as f:
        for book in structure:
            f.write(f"Book {book['book']}\n")
            for vagga in book['vaggas']:
                f.write(f"  Vagga: {vagga['name']}\n")
                for story in vagga['stories']:
                    f.write(f"    - {story}\n")
            f.write("\n")

    print("Structure extracted to structure_report.txt")

if __name__ == "__main__":
    extract_structure()
