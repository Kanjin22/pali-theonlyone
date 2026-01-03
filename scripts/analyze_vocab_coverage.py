import pandas as pd
import re
import collections

# 1. Load Pali Text from Excel
print("Loading Pali text from Excel...")
try:
    df = pd.read_excel('d:/pali-theonlyone/data/ธป.1-4.xlsx')
    # Assuming the text is in the first column regardless of name, or 'คอลัมน์3'
    text_col = df.columns[0]
    all_text = ' '.join(df[text_col].astype(str).tolist())
    
    # Simple tokenization for Pali
    # Remove numbers, punctuation (keep special Pali chars if needed, but mostly standard regex \w is okay-ish if unicode supported, 
    # but better to explicitly keep Pali range or just strip non-pali)
    # Pali chars: ก-ฮ ฤ ฦ ะ า ิ ี ึ ื ุ ู เ แ โ ใ ไ ๅ ๆ ็ ่ ้ ๊ ๋ ์ ํ ฺ
    # Actually, let's just split by whitespace and strip punctuation
    
    words = re.split(r'[\s\(\)\[\]\{\}\.\,\;\"\'\-\—\?\!\d\/]+', all_text)
    # Filter empty and non-Thai/Pali looking words (basic check)
    pali_words = [w for w in words if w and re.search(r'[\u0E00-\u0E7F]', w)]
    
    unique_words = set(pali_words)
    word_counts = collections.Counter(pali_words)
    
    print(f"Found {len(pali_words)} total words, {len(unique_words)} unique words in text.")
    
except Exception as e:
    print(f"Error processing Excel: {e}")
    exit(1)

# 2. Load Dictionary Keys from JS
print("Loading Dictionary keys...")
dict_keys = set()
vocab_paths = [
    'd:/pali-theonlyone/data/raw/vocab-insan-pr9.js',
    'd:/pali-theonlyone/data/raw/vocab-insan-pr9-5-8.js'
]

for vocab_path in vocab_paths:
    try:
        with open(vocab_path, 'r', encoding='utf-8') as f:
            for line in f:
                # Match key pattern: "key":
                match = re.search(r'^\s*"([^"]+)":', line)
                if match:
                    dict_keys.add(match.group(1))
    except Exception as e:
        print(f"Error processing Dictionary {vocab_path}: {e}")
        # Continue to try loading other files

print(f"Found {len(dict_keys)} entries in combined Insan-PR9 dictionary.")

# 3. Analyze Coverage
print("\nAnalyzing Coverage...")
found_words = []
missing_words = []

for word in unique_words:
    if word in dict_keys:
        found_words.append(word)
    else:
        missing_words.append(word)

coverage_pct = (len(found_words) / len(unique_words)) * 100
print(f"\nCoverage: {coverage_pct:.2f}% ({len(found_words)}/{len(unique_words)})")

# 4. Show Top Missing Words (High Frequency)
print("\nTop 20 Missing Words (Frequency):")
missing_counts = {w: word_counts[w] for w in missing_words}
sorted_missing = sorted(missing_counts.items(), key=lambda x: x[1], reverse=True)

for w, count in sorted_missing[:20]:
    print(f"- {w}: {count}")

print("\n(Note: Some missing words might be inflected forms not in the dictionary, or typos in the text)")
