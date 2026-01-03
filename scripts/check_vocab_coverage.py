import pandas as pd
import re
import os

# 1. Load Dictionary Keys from vocab-insan-pr9.js and vocab-insan-pr9-5-8.js
vocab_paths = [
    'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js',
    'd:/pali-theonlyone/data/raw/vocab-insan-pr9-5-8.js'
]
vocab_keys = set()

for vocab_path in vocab_paths:
    print(f"Loading dictionary from {vocab_path}...")
    try:
        with open(vocab_path, 'r', encoding='utf-8') as f:
            for line in f:
                # Match "key": "definition"
                match = re.search(r'^\s*"(.+?)":', line)
                if match:
                    vocab_keys.add(match.group(1))
    except Exception as e:
        print(f"Error reading dictionary {vocab_path}: {e}")
        if vocab_path == vocab_paths[0]: # If primary file fails, that's critical
            exit(1)

print(f"Loaded {len(vocab_keys)} total unique keys from dictionaries.")

# 2. Load Text from Excel
excel_path = 'd:/pali-theonlyone/data/ธป.1-4.xlsx'
text_words = set()

print(f"Loading text from {excel_path}...")
try:
    xl = pd.ExcelFile(excel_path)
    for sheet in xl.sheet_names:
        df = xl.parse(sheet)
        # Assume all columns contain text
        for col in df.columns:
            for cell in df[col]:
                if isinstance(cell, str):
                    # Clean and split
                    # Remove punctuation: . , " ' ( ) ฯ -
                    cleaned = re.sub(r'[.,"\':;()\[\]\-\u0E2F]', ' ', cell)
                    words = cleaned.split()
                    for w in words:
                        # Filter out numbers? Or keep them?
                        # Dictionary might not have numbers like ๑.
                        # But might have words.
                        if w.strip():
                            text_words.add(w.strip())
    print(f"Loaded {len(text_words)} unique words from text.")
except Exception as e:
    print(f"Error reading excel: {e}")
    exit(1)

# 3. Compare
found = 0
missing = 0
missing_list = []

for word in text_words:
    if word in vocab_keys:
        found += 1
    else:
        missing += 1
        missing_list.append(word)

print(f"\nCoverage Report:")
print(f"Total Unique Words in Text: {len(text_words)}")
print(f"Found in Dictionary: {found} ({found/len(text_words)*100:.2f}%)")
print(f"Missing: {missing}")

print("\nSample Missing Words (First 50):")
print(missing_list[:50])

# Write missing words to file
with open('d:/pali-theonlyone/data/missing_words_report.txt', 'w', encoding='utf-8') as f:
    for w in missing_list:
        f.write(w + '\n')
print("\nFull missing words list saved to data/missing_words_report.txt")
