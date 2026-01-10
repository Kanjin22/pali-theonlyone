import re
import os

files = [
    r"d:\pali-theonlyone\data\raw\vocab-insan-pr9.js",
    r"d:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js"
]

types = {}
examples = {}

for file_path in files:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        count_lines = 0
        for line in f:
            count_lines += 1
            match = re.search(r'"[^"]+":\s*"(.*?)"', line)
            if match:
                content = match.group(1)
                # Extract the first part usually ending with . or space
                parts = content.split(' ')
                if parts:
                    first_token = parts[0]
                    
                    if first_token not in types:
                        types[first_token] = 0
                        examples[first_token] = content[:50] + "..."
                    types[first_token] += 1
        print(f"Processed {file_path}: {count_lines} lines")

with open('analysis_result.txt', 'w', encoding='utf-8') as out:
    sorted_types = sorted(types.items(), key=lambda x: x[1], reverse=True)
    out.write("Unique starting tokens (Types):\n")
    for token, count in sorted_types:
        out.write(f"{token}: {count} (Ex: {examples[token]})\n")
