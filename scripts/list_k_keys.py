import re

with open(r"d:\pali-theonlyone\data\vocab-roots-dpd-derived.js", "r", encoding="utf-8") as f:
    content = f.read()

keys = re.findall(r'"([^"]+)":\s*\[', content)
k_keys = [k for k in keys if k.startswith('k')]

print("Found keys starting with k:")
for k in sorted(k_keys):
    print(k)
