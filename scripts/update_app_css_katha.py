import os

file_path = "d:/pali-dhatu-app/src/App.css"

css_to_append = """
/* Added for Linear Katha Display */
.verse-line {
  font-size: 1.15rem;
  margin-bottom: 8px;
  color: #2c3e50;
  line-height: 1.6;
}
"""

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if ".verse-line" not in content:
        with open(file_path, 'a', encoding='utf-8') as f:
            f.write(css_to_append)
        print(f"Successfully appended styles to {file_path}")
    else:
        print(f"Styles for .verse-line already exist in {file_path}")

except Exception as e:
    print(f"Error: {e}")
