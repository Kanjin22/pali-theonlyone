import re

file_path = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

indd_matches = []

for i, line in enumerate(lines):
    if 'indd' in line.lower():
        indd_matches.append((i + 1, line.strip()))

print(f"Found {len(indd_matches)} 'indd' matches:")
for ln, txt in indd_matches[:10]:
    print(f"Line {ln}: {txt}")
