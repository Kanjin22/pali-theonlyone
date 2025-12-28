
import os

# Define file paths
app_css_path = 'D:/pali-dhatu-app/src/App.css'
dhatu_detail_path = 'D:/pali-dhatu-app/src/components/DhatuDetail.js'

# 1. Update App.css
with open(app_css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Update katha-grid-display
if '.katha-grid-display {' in css_content:
    css_content = css_content.replace(
        '.katha-grid-display {',
        '.katha-grid-display {\n  max-width: 700px;\n  margin: 1.5rem auto;\n  padding: 0 1.5rem;'
    )

# Update katha-linear-display
if '.katha-linear-display {' in css_content:
    css_content = css_content.replace(
        '.katha-linear-display {',
        '.katha-linear-display {\n  max-width: 600px;\n  margin: 1.5rem auto;\n  padding: 0 1.5rem;'
    )

with open(app_css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)
print(f"Updated {app_css_path}")

# 2. Update DhatuDetail.js
with open(dhatu_detail_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Simplify Source Names
js_content = js_content.replace(
    "full = 'ธาตุปทีปิกา (รวบรวมโดย พระมหาโพธิวงศาจารย์)';",
    "full = 'ธาตุปทีปิกา';"
)
js_content = js_content.replace(
    "full = 'พจนานุกรมธาตุ (พระมหาโพธิวงศาจารย์)';",
    "full = 'พจนานุกรมธาตุ';"
)

# Add formatExample function
format_func = """
  const formatExample = (text) => {
      if (!text) return text;
      // Ensure space after . and ,
      return text.replace(/([.,])(?!\\s)/g, '$1 ');
  };

  const groupCode"""

if "const groupCode" in js_content and "const formatExample" not in js_content:
    js_content = js_content.replace("const groupCode", format_func)

# Apply formatExample to list items
# Search for: <li key={index}>{item}</li>
# Replace with: <li key={index}>{formatExample(item)}</li>
js_content = js_content.replace(
    "<li key={index}>{item}</li>",
    "<li key={index}>{formatExample(item)}</li>"
)

with open(dhatu_detail_path, 'w', encoding='utf-8') as f:
    f.write(js_content)
print(f"Updated {dhatu_detail_path}")
