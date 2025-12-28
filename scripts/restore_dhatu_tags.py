
file_path = r'd:\pali-dhatu-app\src\components\DhatuDetail.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to insert the missing closing tags before the next section.
# The next section starts with <div className="detail-card full-width"> containing "อุทาหรณ์ (ตัวอย่างการใช้)"

target = '<div className="detail-card full-width">\n              <h2>อุทาหรณ์ (ตัวอย่างการใช้)</h2>'

missing_tags = """                            </div>
                        </div>
                    );
                  })}
                </div>
              </div>
            )}

"""

if target in content:
    content = content.replace(target, missing_tags + "            " + target)
    print("Restored missing tags.")
else:
    print("Target not found.")
    # Try finding just the div line
    target_simple = '<div className="detail-card full-width">'
    # But this class is used elsewhere too (e.g. at the top of the file for main details?)
    # Let's check. 
    # The derived words section itself used to use it, but now uses 'derived-words-section'.
    # The udaharana section uses it.
    
    # Let's search for the one followed by h2 udaharana
    import re
    pattern = r'(<div className="detail-card full-width">\s*<h2>อุทาหรณ์)'
    
    if re.search(pattern, content):
        content = re.sub(pattern, missing_tags + r'\n            \1', content)
        print("Restored missing tags via regex.")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
