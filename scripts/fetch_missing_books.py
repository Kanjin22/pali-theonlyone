import urllib.request
import json
import os
import time

def fetch_book_data(book_id):
    # Estimate pages based on book id or just fetch a large range?
    # The API seems to take page_start and page_end.
    # Let's check max pages. Usually around 200.
    start_page = 1
    end_page = 300 
    
    url = f"https://pali.purivaro.com/page/dhammabot/api/get_lines.php?book={book_id}&page_start={start_page}&page_end={end_page}"
    print(f"Fetching Book {book_id}: {url}...")
    
    try:
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode('utf-8'))
        return data.get('lines', [])
    except Exception as e:
        print(f"Error fetching Book {book_id}: {e}")
        return []

def main():
    books_to_fetch = [4, 5, 6]
    
    os.makedirs('data/raw', exist_ok=True)
    
    for book_id in books_to_fetch:
        lines = fetch_book_data(book_id)
        print(f"Book {book_id}: Fetched {len(lines)} lines.")
        
        output_file = f'data/raw/purivaro-book{book_id}-raw.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(lines, f, ensure_ascii=False, indent=2)
            
        print(f"Saved to {output_file}")
        time.sleep(1) # Be nice to the server

if __name__ == "__main__":
    main()
