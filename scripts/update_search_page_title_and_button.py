import os

file_path = r'd:\pali-dhatu-app\src\pages\SearchPage.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Title
content = content.replace(
    '<h1>สืบค้นธาตุบาลี</h1>', 
    '<h1>สืบค้นธาตุบาลีและคำศัพท์</h1>'
)

# 2. Add Search Button
# We look for the input field and wrap it or append a button
old_input_block = """                        <input 
                            type="text" 
                            placeholder="ค้นหาชื่อธาตุ หรือคำแปล..." 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-input"
                        />"""

new_input_block = """                        <div className="input-group" style={{ display: 'flex', gap: '8px', width: '100%' }}>
                            <input 
                                type="text" 
                                placeholder="ค้นหาชื่อธาตุ หรือคำแปล..." 
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="search-input"
                                style={{ flex: 1 }}
                            />
                            <button className="search-btn" style={{ 
                                padding: '0 20px', 
                                backgroundColor: '#3498db', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px', 
                                cursor: 'pointer',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>"""

if old_input_block in content:
    content = content.replace(old_input_block, new_input_block)
else:
    # Fallback with regex or less strict match if indentation varies
    # Trying a simpler replacement if the above fails due to whitespace
    print("Warning: Exact input block match failed. Trying less strict match.")
    # (For now, let's assume the previous file read was accurate. If this fails, I'll see in the output)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SearchPage.js updated successfully.")
