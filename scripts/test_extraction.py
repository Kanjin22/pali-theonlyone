import re

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

definition = "ก. (เช่น ชโน อ. ชน) จักกระทำ กร ธาตุ ใน ความทำ + โอ ปัจจัยในกัตตุวาจก + สฺสติ ภวิสสันติ วิภัต                ตติ ลง อิ อาคม ลบ โอ ปัจจัย สำเร็จรูปเป็น กริสฺสติ"
match = re.search(r'(?:[+\s]|^)([ก-ฮ]+)\s*ธาตุ', definition)

print(f"Definition: {definition}")
if match:
    thai_root = match.group(1)
    print(f"Found Thai Root: {thai_root}")
    roman_root = thai_to_roman(thai_root)
    print(f"Roman Root: {roman_root}")
else:
    print("No root match found")

thai_word = "กริสฺสติ"
roman_word = thai_to_roman(thai_word)
print(f"Thai Word: {thai_word} -> Roman: {roman_word}")
