import urllib.request
import json

def check_book(book_id):
    url = f"https://pali.purivaro.com/page/dhammabot/api/get_lines.php?book={book_id}&page_start=1&page_end=1"
    try:
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode('utf-8'))
        lines = data.get('lines', [])
        print(f"--- Book {book_id} Page 1 ---")
        for line in lines[:5]:
            print(f"Pali: {line.get('pali', '')}")
            print(f"Thai: {line.get('thai', '')}")
            print(f"Story: {line.get('story_title', '')}")
            print("-" * 20)
    except Exception as e:
        print(f"Error fetching book {book_id}: {e}")

check_book(7)
check_book(6)
