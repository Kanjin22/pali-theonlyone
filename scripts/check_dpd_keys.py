
import json
import os

FILE_PATH = r"d:\pali-dhatu-app\src\data\vocab-roots-dpd-derived-enriched.js"

def load_js_object(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    # Strip JS parts
    import re
    content = re.sub(r'export default .*', '', content)
    content = re.sub(r'const \w+ = ', '', content)
    content = content.strip().rstrip(";")
    return json.loads(content)

def main():
    try:
        data = load_js_object(FILE_PATH)
        keys = list(data.keys())
        print(f"Total keys: {len(keys)}")
        print("First 20 keys:", keys[:20])
        
        # Check specific roots
        check_list = ["ji", "jī", "bhu", "bhū", "ni", "nī", "gam", "gamu", "kar", "kara"]
        for k in check_list:
            if k in data:
                print(f"Found '{k}'")
            else:
                print(f"'{k}' NOT found")
                
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
