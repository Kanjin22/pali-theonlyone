import re
import os

def parse_js_content(file_path):
    """
    Parses the content-dhamma JS file and returns a dictionary of 
    { key: { 'story': story_title, 'pages': [page_nums...] } }
    """
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return {}

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    data = {}
    current_key = None
    
    # Split by keys
    # Keys look like: "d01_v01_s01_cakkhupala": [
    lines = content.split('\n')
    
    current_key = None
    current_items = []
    
    for line in lines:
        key_match = re.match(r'^\s*"([^"]+)": \[\s*$', line)
        if key_match:
            current_key = key_match.group(1)
            data[current_key] = {'story': None, 'pages': []}
            continue
            
        if current_key:
            # Extract Story Title (usually in the first object of the array)
            if 'story:' in line and data[current_key]['story'] is None:
                m = re.search(r'story:\s*"([^"]+)"', line)
                if m:
                    data[current_key]['story'] = m.group(1)
            
            # Extract Page
            if 'page:' in line:
                m = re.search(r'page:\s*"([^"]+)"', line)
                if m:
                    page_str = m.group(1).replace('หน้า', '').strip()
                    # Only add if not empty and not "..."
                    if page_str and page_str != "...":
                        data[current_key]['pages'].append(page_str)

    return data

def compare_books(books_range):
    print("=== Page Number Verification Report (Original vs Purivaro/Updated) ===")
    
    for book_id in books_range:
        original_path = f'd:/pali-theonlyone/data/content-dhamma{book_id:02d}.js'
        updated_path = f'd:/pali-theonlyone/data/updated/content-dhamma{book_id:02d}-updated.js'
        
        print(f"\n--- Checking Book {book_id} ---")
        
        original_data = parse_js_content(original_path)
        updated_data = parse_js_content(updated_path)
        
        if not original_data:
            print(f"Skipping Book {book_id} (Original missing)")
            continue
        if not updated_data:
            print(f"Skipping Book {book_id} (Updated missing)")
            continue
            
        mismatch_count = 0
        
        for key, orig_info in original_data.items():
            if key not in updated_data:
                # print(f"  [KEY MISSING IN UPDATED] {key} ({orig_info['story']})")
                continue
                
            upd_info = updated_data[key]
            
            orig_pages = set(orig_info['pages'])
            upd_pages = set(upd_info['pages'])
            
            # Filter out empty or placeholders from comparison if needed
            # But here we want to see if real numbers match
            
            if not orig_pages:
                # Original had no pages (maybe just "...")
                continue
                
            if orig_pages != upd_pages:
                # Check if it's just a subset or completely different
                # Purivaro might have broken down into more episodes, so it might have more pages
                # Or Original might have ranges "7-9" while Purivaro has "7", "8", "9"
                
                # Normalize ranges for comparison? 
                # Let's just print the raw difference for now for the user to judge
                
                print(f"  MISMATCH: {key}")
                print(f"    Story: {orig_info['story']}")
                print(f"    Original Pages: {sorted(list(orig_pages))}")
                print(f"    Purivaro Pages: {sorted(list(upd_pages))}")
                mismatch_count += 1
        
        if mismatch_count == 0:
            print(f"  Book {book_id}: All matched pages are consistent.")
        else:
            print(f"  Book {book_id}: Found {mismatch_count} discrepancies.")

if __name__ == "__main__":
    compare_books(range(1, 5))
