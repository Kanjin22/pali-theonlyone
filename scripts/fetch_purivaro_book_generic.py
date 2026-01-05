import urllib.request
import json
import os
import sys

def fetch_book_data(book_id, start_page, end_page):
    url = f"https://pali.purivaro.com/page/dhammabot/api/get_lines.php?book={book_id}&page_start={start_page}&page_end={end_page}"
    try:
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode('utf-8'))
        return data.get('lines', [])
    except Exception:
        return []

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/fetch_purivaro_book_generic.py <book_id>")
        return
    book_id = int(sys.argv[1])
    os.makedirs('data/raw', exist_ok=True)
    all_lines = []
    start = 1
    batch = 50
    while True:
        end = start + batch - 1
        lines = fetch_book_data(book_id, start, end)
        if not lines:
            break
        all_lines.extend(lines)
        if len(lines) < batch:
            break
        start = end + 1
        if start > 1000:
            break
    output_file = f'data/raw/purivaro-book{book_id}-raw.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_lines, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(all_lines)} lines to {output_file}")

if __name__ == "__main__":
    main()
