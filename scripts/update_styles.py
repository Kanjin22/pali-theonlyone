
import os

CSS_PATH = r"D:\pali-dhatu-app\src\App.css"

new_styles = """

/* --- Grammar Principles Styles (Ported from Learning Web) --- */
.content-box { font-size: 1.15rem; color: #444; text-align: justify; line-height: 1.8; }
.content-box p { margin-bottom: 1.5em; }
.example-list { list-style: none; padding: 0; }
.example-list li { 
    background: #f9fbfd; 
    margin-bottom: 10px; 
    padding: 15px; 
    border-radius: 8px; 
    border-left: 4px solid #3498db; 
}
.pali-word { font-family: 'Sarabun', serif; font-weight: 600; color: #c0392b; }
.rule-box { background: #e8f5e9; padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #c8e6c9; }
.content-box h1 { font-size: 2.2rem; border-bottom: 3px solid #27ae60; padding-bottom: 15px; margin-bottom: 30px; text-align: center; color: #2c3e50; }
.content-box h2 { font-size: 1.6rem; color: #27ae60; margin-top: 30px; margin-bottom: 20px; }
.content-box h3 { font-size: 1.3rem; color: #d35400; margin-top: 25px; margin-bottom: 15px; font-weight: 600; }
.content-box i { margin-right: 5px; }

/* Adjustments for React Container */
.static-page-container .content-box {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
}
"""

with open(CSS_PATH, "a", encoding="utf-8") as f:
    f.write(new_styles)

print("App.css updated.")
