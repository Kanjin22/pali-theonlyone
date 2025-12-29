import json
import re

path = r'd:\pali-dhatu-app\src\data\tananunto-vocab-map.js'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Naive parse since it's "const x = {...}"
start = content.find('{')
end = content.rfind('}')
json_str = content[start:end+1]

# It might be valid JSON if keys are quoted.
try:
    data = json.loads(json_str)
    print(f"Key count: {len(data)}")
except:
    print("JSON load failed, counting keys via regex")
    keys = re.findall(r'"([^"]+)":\s*\[', json_str)
    print(f"Key count (regex): {len(keys)}")
