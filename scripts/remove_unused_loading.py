import re

file_path = r"D:\pali-dhatu-app\src\pages\VocabSearchPage.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove `const [loading, setLoading] = useState(true);`
content = content.replace("    const [loading, setLoading] = useState(true);", "")

# 2. Remove `setLoading(false);`
content = content.replace("            setLoading(false);", "")

# 3. Clean up empty lines if any (simple approach)
content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Removed unused loading state.")
