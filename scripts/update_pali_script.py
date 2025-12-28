import os

path = r'd:\pali-dhatu-app\src\utils\PaliScript.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

old_str = """    romanToThai: function(text) {
        if (!text) return "";
        const map = {"""
new_str = """    romanToThai: function(text) {
        if (!text) return "";
        
        // Normalization for Thai Pali conventions (Display)
        if (text.endsWith('vant')) text = text.slice(0, -4) + 'vantu';
        if (text.endsWith('mant')) text = text.slice(0, -4) + 'mantu';
        if (text.endsWith('ar')) text = text.slice(0, -2) + 'u'; // e.g. samavekkhitar -> samavekkhitu

        const map = {"""

if old_str in content:
    content = content.replace(old_str, new_str)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated PaliScript.js")
else:
    print("Could not find old_str in PaliScript.js")
