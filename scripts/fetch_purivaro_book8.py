import urllib.request
import json
import os
import sys

def fetch_book_data(book_id, start_page, end_page):
    url = f"https://pali.purivaro.com/page/dhammabot/api/get_lines.php?book={book_id}&page_start={start_page}&page_end={end_page}"
    print(f"Fetching {url}...")
    try:
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode('utf-8'))
        return data.get('lines', [])
    except Exception as e:
        print(f"Error fetching data: {e}")
        return []

def main():
    book_id = 8
    total_pages = 192 # From get_pages.php check
    
    # Create directory if not exists
    os.makedirs('data/raw', exist_ok=True)
    
    all_lines = fetch_book_data(book_id, 1, total_pages)
    
    print(f"Total lines fetched: {len(all_lines)}")
    
    output_file = 'data/raw/purivaro-book8-raw.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_lines, f, ensure_ascii=False, indent=2)
        
    print(f"Saved to {output_file}")

if __name__ == "__main__":
    main()
