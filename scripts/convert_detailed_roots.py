import json

input_file = "data/vocab-roots-detailed.json"
output_file = "data/vocab-roots.js"

with open(input_file, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Loaded {len(data)} roots.")

# Transform to JS object string
js_content = "const vocabRoots = " + json.dumps(data, ensure_ascii=False, indent=2) + ";"

with open(output_file, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Saved to {output_file}")
