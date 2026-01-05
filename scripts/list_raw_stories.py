import json

def list_stories():
    try:
        # Load Book 8
        with open('d:/pali-theonlyone/data/raw/purivaro-book8-raw.json', 'r', encoding='utf-8') as f:
            data8 = json.load(f)
        
        # Load Book 7
        try:
            with open('d:/pali-theonlyone/data/raw/purivaro-book7-raw.json', 'r', encoding='utf-8') as f:
                data7 = json.load(f)
        except FileNotFoundError:
            data7 = []
        
        data = data8 + data7
            
        titles = set()
        for line in data:
            title = line.get('story_title', '').strip()
            if title:
                titles.add(title)
        
        print("--- Unique Story Titles in Raw Data ---")
        for t in sorted(list(titles)):
            print(t)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_stories()
