import re

with open(r"d:\pali-theonlyone\data\vocab-roots-dpd-derived.js", "r", encoding="utf-8") as f:
    content = f.read()

keys = re.findall(r'"([^"]+)":\s*\[', content)
b_keys = [k for k in keys if k.startswith('bh')]

print("Found keys starting with bh:")
for k in sorted(b_keys):
    print(k)
