import sys
import os
import re
import json

# Adjust path to import modules
sys.path.append(r'd:\pali-theonlyone\scripts')

from extract_derived_meanings import roman_to_thai

TANANUNTO_PATH = r'd:\pali-theonlyone\data\vocab-tananunto.js'

def load_js_object(path):
    print(f"Loading {path}...")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'=\s*(\{[\s\S]*\});?', content)
            if match:
                json_str = match.group(1)
                return json.loads(json_str)
            else:
                print(f"Regex match failed for {path}")
                return {}
    except Exception as e:
        print(f"Error loading {path}: {e}")
        return {}

tananunto = load_js_object(TANANUNTO_PATH)
if "กริสฺสติ" in tananunto:
    print("Found 'กริสฺสติ' in Tananunto.")
    print("Value:", tananunto["กริสฺสติ"])
else:
    print("'กริสฺสติ' NOT found in Tananunto.")

roman = "karissati"
thai = roman_to_thai(roman)
print(f"Roman: {roman} -> Thai: {thai}")

if thai in tananunto:
    print(f"Match! '{thai}' is in Tananunto.")
else:
    print(f"No match for '{thai}' in Tananunto.")
