import os

css_path = r"d:\pali-dhatu-app\src\App.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# Target the specific block we added/modified recently
target_block = """.derived-words-section {
  margin-top: 2rem;"""

replacement_block = """.derived-words-section {
  grid-column: 1 / -1;
  margin-top: 2rem;"""

if target_block in content:
    content = content.replace(target_block, replacement_block)
    print("Added grid-column: 1 / -1 to .derived-words-section")
else:
    print("Could not find exact block to replace. Trying regex/broader search.")
    # Fallback to broader replace if indentation varies
    if ".derived-words-section {" in content:
         content = content.replace(".derived-words-section {", ".derived-words-section {\n  grid-column: 1 / -1;")
         print("Added grid-column via generic replace.")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)
