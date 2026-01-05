import urllib.request
import json

def find_maggavagga_in_book7():
    print("Searching for Maggavagga in Book 7...")
    # Check pages 1, 50, 100, 150 to see where it lands
    for page in range(1, 200, 20):
        url = f"https://pali.purivaro.com/page/dhammabot/api/get_lines.php?book=7&page_start={page}&page_end={page+5}"
        try:
            response = urllib.request.urlopen(url)
            data = json.loads(response.read().decode('utf-8'))
            lines = data.get('lines', [])
            for line in lines:
                pali = line.get('pali', '')
                story = line.get('story_title', '')
                if 'มัคค' in pali or 'มัคค' in story or 'Maggavagga' in pali or '๒๐' in pali:
                     if '๒๐' in pali and 'วคฺค' in pali:
                        print(f"FOUND Vagga 20 at Page {page} (approx)!")
                        print(f"Sample: {pali} | {story}")
                        return
        except Exception as e:
            print(f"Error checking page {page}: {e}")

find_maggavagga_in_book7()
