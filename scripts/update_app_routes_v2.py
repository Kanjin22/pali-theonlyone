import os

file_path = r'd:\pali-dhatu-app\src\App.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Import
if "import VocabSearchPage" not in content:
    content = content.replace(
        "import SearchPage from './pages/SearchPage';",
        "import SearchPage from './pages/SearchPage';\nimport VocabSearchPage from './pages/VocabSearchPage';"
    )

# 2. Add Route
if '<Route path="/search-vocab"' not in content:
    # Insert before /search route
    content = content.replace(
        '<Route path="/search" element={<SearchPage />} />',
        '<Route path="/search-vocab" element={<VocabSearchPage />} />\n            <Route path="/search" element={<SearchPage />} />'
    )

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("App.js routes updated.")
