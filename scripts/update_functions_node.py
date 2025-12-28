
import json

path = r"D:\pali-dhatu-app\functions\package.json"

with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

data['engines']['node'] = "20"

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Updated functions/package.json to Node 20")
