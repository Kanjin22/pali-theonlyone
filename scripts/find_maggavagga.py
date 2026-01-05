import urllib.request
import json

def find_maggavagga():
    for book_id in range(1, 15):
        url = f"https://pali.purivaro.com/page/dhammabot/api/get_lines.php?book={book_id}&page_start=1&page_end=5"
        try:
            response = urllib.request.urlopen(url)
            data = json.loads(response.read().decode('utf-8'))
            lines = data.get('lines', [])
            found = False
            for line in lines:
                pali = line.get('pali', '')
                story = line.get('story_title', '')
                if 'มัคค' in pali or 'มัคค' in story or 'Maggavagga' in pali:
                    print(f"FOUND Maggavagga in Book {book_id}!")
                    print(f"Sample: {pali} | {story}")
                    found = True
                    break
            if not found:
                # Check the first line just to identify the book
                if lines:
                    print(f"Book {book_id} starts with: {lines[0].get('pali', '')} | {lines[0].get('story_title', '')}")
                else:
                    print(f"Book {book_id} is empty or error.")
        except Exception as e:
            print(f"Error checking book {book_id}: {e}")

find_maggavagga()
