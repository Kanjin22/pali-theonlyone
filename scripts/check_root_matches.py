import json
import re

# Load vocab-roots.js (mocking the JS object structure)
# We'll just regex extract the roots from the file content since it's a JS object
with open(r"d:\pali-theonlyone\data\vocab-roots.js", "r", encoding="utf-8") as f:
    roots_content = f.read()

# Extract keys: "key": [
# Regex to find keys at the start of lines or after comma
keys = re.findall(r'"([^"]+)":\s*\[', roots_content)

# Load vocab-roots-dpd-derived.js
with open(r"d:\pali-theonlyone\data\vocab-roots-dpd-derived.js", "r", encoding="utf-8") as f:
    dpd_content = f.read()

# Extract keys from DPD
dpd_keys = set(re.findall(r'"([^"]+)":\s*\[', dpd_content))

# Thai to Roman (Simplified Python version of the JS logic)
def thai_to_roman(text):
    if not text: return ""
    s = text
    # Move pre-positioned vowels
    s = re.sub(r'([เโไใ])((?:[ก-ฮ]ฺ)*[ก-ฮ])', r'\2\1', s)
    
    map_char = {
        'ก': 'k', 'ข': 'kh', 'ค': 'g', 'ฆ': 'gh', 'ง': 'ṅ',
        'จ': 'c', 'ฉ': 'ch', 'ช': 'j', 'ฌ': 'jh', 'ญ': 'ñ',
        'ฏ': 'ṭ', 'ฐ': 'ṭh', 'ฑ': 'ḍ', 'ฒ': 'ḍh', 'ณ': 'ṇ',
        'ต': 't', 'ถ': 'th', 'ท': 'd', 'ธ': 'dh', 'น': 'n',
        'ป': 'p', 'ผ': 'ph', 'พ': 'b', 'ภ': 'bh', 'ม': 'm',
        'ย': 'y', 'ร': 'r', 'ล': 'l', 'ว': 'v', 'ส': 's', 'ห': 'h', 'ฬ': 'ḷ', 'อ': 'a',
        'ฮ': 'h',
        '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
        '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9'
    }
    
    consonants = "กขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลวสหฬอฮ"
    res = ""
    i = 0
    while i < len(s):
        c = s[i]
        if c in consonants:
            if c == 'อ':
                res += "a"
            else:
                res += map_char.get(c, c) + "a"
        elif c == 'ฺ':
            if res.endswith('a'): res = res[:-1]
        elif c == 'า' or c == 'ๅ':
            if res.endswith('a'): res = res[:-1]
            res += 'ā'
        elif c == 'ิ':
            if res.endswith('a'): res = res[:-1]
            res += 'i'
        elif c == 'ี':
            if res.endswith('a'): res = res[:-1]
            res += 'ī'
        elif c == 'ึ':
            if res.endswith('a'): res = res[:-1]
            res += 'iṃ'
        elif c == 'ุ':
            if res.endswith('a'): res = res[:-1]
            res += 'u'
        elif c == 'ู':
            if res.endswith('a'): res = res[:-1]
            res += 'ū'
        elif c == 'เ':
            if res.endswith('a'): res = res[:-1]
            res += 'e'
        elif c == 'โ':
            if res.endswith('a'): res = res[:-1]
            res += 'o'
        elif c == 'ไ' or c == 'ใ':
            if res.endswith('a'): res = res[:-1]
            res += 'ai'
        elif c == 'ํ':
            res += 'ṃ'
        elif c == 'ะ' or c == 'ั':
            if not res.endswith('a'): res += 'a'
        elif c == 'ฤ':
            if res.endswith('a'): res = res[:-1]
            res += 'ṛ'
        elif c == 'ฦ':
            if res.endswith('a'): res = res[:-1]
            res += 'ḷ'
        i += 1
    return res

matches = 0
total = 0
mismatches = []

for k in keys:
    total += 1
    roman = thai_to_roman(k)
    if roman in dpd_keys:
        matches += 1
    else:
        mismatches.append(f"{k} -> {roman}")

print(f"Total Roots in DB: {total}")
print(f"Matches in DPD: {matches}")
print(f"Match Rate: {matches/total*100:.2f}%")
print("First 10 mismatches:")
for m in mismatches[:10]:
    print(m)
