
import os

app_css_path = 'D:/pali-dhatu-app/src/App.css'
principles_page_path = 'D:/pali-dhatu-app/src/pages/PrinciplesPage.js'

# 1. Update PrinciplesPage.js to add 'grammar-content' class
with open(principles_page_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

if '<div dangerouslySetInnerHTML={{ __html: content.content_html }} />' in js_content:
    js_content = js_content.replace(
        '<div dangerouslySetInnerHTML={{ __html: content.content_html }} />',
        '<div className="grammar-content" dangerouslySetInnerHTML={{ __html: content.content_html }} />'
    )
    with open(principles_page_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"Updated {principles_page_path}")
else:
    print("Could not find div to update in PrinciplesPage.js (or already updated)")

# 2. Add Styles to App.css
grammar_styles = """
/* ===== Grammar Principles Styles (Classroom Theme) ===== */
.grammar-content {
  font-family: 'Sarabun', sans-serif;
  color: #333;
  line-height: 1.8;
}

.grammar-content h1 {
  font-family: 'Niramit', serif;
  font-size: 2.2rem;
  color: #2c3e50;
  border-bottom: 3px solid #27ae60;
  padding-bottom: 15px;
  margin-bottom: 30px;
  text-align: center;
}

.grammar-content h2 {
  font-family: 'Niramit', serif;
  font-size: 1.6rem;
  color: #27ae60;
  margin-top: 30px;
  margin-bottom: 20px;
}

.grammar-content h3 {
  font-family: 'Niramit', serif;
  font-size: 1.3rem;
  color: #d35400;
  margin-top: 25px;
  margin-bottom: 15px;
  font-weight: 600;
}

.grammar-content .content-box {
  font-size: 1.15rem;
  color: #444;
  text-align: justify;
}

.grammar-content .example-list {
  list-style: none;
  padding: 0;
}

.grammar-content .example-list li {
  background: #f9fbfd;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.grammar-content .pali-word {
  font-family: 'Niramit', serif;
  font-weight: 600;
  color: #c0392b;
}

.grammar-content .rule-box {
  background: #e8f5e9;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  border: 1px solid #c8e6c9;
}

/* Mobile Adjustments for Grammar Content */
@media (max-width: 600px) {
  .grammar-content h1 { font-size: 1.8rem; }
  .grammar-content h2 { font-size: 1.4rem; }
  .grammar-content .content-box { font-size: 1rem; }
}
"""

with open(app_css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

if '.grammar-content' not in css_content:
    with open(app_css_path, 'a', encoding='utf-8') as f:
        f.write("\n" + grammar_styles)
    print(f"Appended styles to {app_css_path}")
else:
    print("Styles already exist in App.css")
