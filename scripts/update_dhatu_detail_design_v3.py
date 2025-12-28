import re

file_path = r'd:\pali-dhatu-app\src\components\DhatuDetail.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Helper Functions (Dictionary Name Change)
# I need to find the `const sourceMapping` block and replace it.

old_mapping_start = "const sourceMapping = {"
new_mapping = """const sourceMapping = {
    'Etipitaka': { label: 'พจนานุกรมพระไตรปิฎก', color: '#95a5a6', icon: 'fas fa-book' },
    'Tananunto': { label: 'พจนานุกรมธรรมบทภาค ๑-๘', color: '#95a5a6', icon: 'fas fa-bookmark' },
    'NewGen': { label: 'พจนานุกรมบาลี-ไทย (รุ่นใหม่)', color: '#95a5a6', icon: 'fas fa-leaf' },
    'Palidict': { label: 'Palidict.com', color: '#95a5a6', icon: 'fas fa-globe' }
};"""

# Regex replace for the object
pattern_mapping = r"const sourceMapping = \{[\s\S]*?\};"
content = re.sub(pattern_mapping, new_mapping, content)

# 2. Update the JSX structure for the new "Faint Box" design
# Locate the map loop inside derived-words-list-enhanced

# The block to replace:
# return (
#     <div key={index} className="derived-word-card">
#         ...
#     </div>
# );

# I will replace the entire `derived-words-list-enhanced` content or just the map callback return.
# Let's target the inner return block.

# Since regex is tricky for nested structures, I will replace the whole block starting from 
# {derivedWords.map((word, index) => {
# down to the closing of that map.

start_marker = "{derivedWords.map((word, index) => {"
end_marker = "                  })}" # The closing of the map

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx) + len(end_marker)
    
    new_map_block = """{derivedWords.map((word, index) => {
                    const thaiWord = PaliScript.romanToThai(word);
                    const rawMeaning = vocabDerivedMeanings[thaiWord];
                    const meaningGroups = parseMeaning(rawMeaning);

                    return (
                        <div key={index} className="derived-word-card">
                            <div className="derived-word-header">
                                <span className="derived-word-thai">{thaiWord}</span>
                                <span className="derived-word-roman">{word}</span>
                            </div>
                            
                            <div className="derived-meaning-list">
                                {meaningGroups.length > 0 ? (
                                    meaningGroups.map((group, idx) => (
                                        <div key={idx} className="dict-entry-box">
                                            <div className="dict-label">
                                                <i className={group.source.icon}></i>
                                                {group.source.label}
                                            </div>
                                            <div className="meaning-text">{group.content}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-meaning">ยังไม่มีคำแปลในฐานข้อมูล</div>
                                )}
                            </div>
                        </div>
                    );
                  })}"""
    
    content = content[:start_idx] + new_map_block + content[end_idx:]
    print("Map block updated.")
else:
    print("Map block start not found.")


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
