import json

with open("data/vocab-roots-detailed.json", "r", encoding="utf-8") as f:
    data = json.load(f)

total_entries = sum(len(entries) for entries in data.values())
unique_roots = len(data)

print(f"Unique Roots: {unique_roots}")
print(f"Total Entries: {total_entries}")
