import re

# Logic to replace the derived words section in DhatuDetail.js

file_path = r'd:\pali-dhatu-app\src\components\DhatuDetail.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Helper Functions (outside component or inside, but before return)
# We will insert them before the component function for cleanliness, or just inside.
# Let's insert them before "function DhatuDetail() {"

helper_code = """
const sourceMapping = {
    'Etipitaka': { label: 'พจนานุกรมพระไตรปิฎก', color: '#8e44ad', icon: 'fas fa-book' },
    'Tananunto': { label: 'พจนานุกรมธนานันท์', color: '#2980b9', icon: 'fas fa-user-tie' },
    'NewGen': { label: 'พจนานุกรมบาลี-ไทย (รุ่นใหม่)', color: '#27ae60', icon: 'fas fa-leaf' },
    'Palidict': { label: 'Palidict.com', color: '#e67e22', icon: 'fas fa-globe' }
};

const parseMeaning = (text) => {
    if (!text) return [];
    // Split by separator if multiple sources exist
    const sections = text.split(/\\n\\n-{3,}\\n\\n/);
    
    return sections.map(section => {
        const match = section.match(/^\\[(.*?)\\]\\s*([\\s\\S]*)/);
        if (match) {
            const sourceKey = match[1];
            const content = match[2].trim();
            const sourceInfo = sourceMapping[sourceKey] || { label: sourceKey, color: '#95a5a6', icon: 'fas fa-bookmark' };
            return { source: sourceInfo, content };
        }
        return { source: { label: 'ทั่วไป', color: '#7f8c8d', icon: 'fas fa-info-circle' }, content: section.trim() };
    });
};
"""

if "const sourceMapping" not in content:
    content = content.replace("function DhatuDetail() {", helper_code + "\n\nfunction DhatuDetail() {")

# 2. Replace the JSX Block
old_jsx_start = "{/* Derived Words Section (DPD) */}"
# We need to find the matching closing brace for the condition block. 
# The block is:
# {derivedWords && derivedWords.length > 0 && (
#   <div className="detail-card full-width">
#     ...
#   </div>
# )}

# Since regex replacement across multiple lines can be tricky with nested braces, 
# I will use a known unique substring to identify the block and replace it carefully.

# The block to replace:
block_signature = """{derivedWords && derivedWords.length > 0 && (
              <div className="detail-card full-width">
                <h2>ศัพท์ที่สร้างจากธาตุนี้ (DPD)</h2>
                <div className="derived-words-list">
                  {derivedWords.map((word, index) => {
                    const thaiWord = PaliScript.romanToThai(word);
                    const meaning = vocabDerivedMeanings[thaiWord];
                    return (
                        <div key={index} className="derived-word-item">
                            <span className="derived-word-tag">{thaiWord}</span>
                            {meaning ? (
                                <div className="derived-word-meaning">{meaning}</div>
                            ) : (
                                <div className="derived-word-meaning text-muted">-</div>
                            )}
                        </div>
                    );
                  })}
                </div>
              </div>
            )}"""

new_jsx = """{/* Derived Words Section (DPD) - Enhanced */}
            {derivedWords && derivedWords.length > 0 && (
              <div className="derived-words-section">
                <div className="derived-section-header">
                    <div className="derived-section-icon">
                        <i className="fas fa-sitemap"></i>
                    </div>
                    <h2>ศัพท์ที่สร้างจากธาตุนี้ (DPD)</h2>
                </div>
                
                <div className="derived-words-list-enhanced">
                  {derivedWords.map((word, index) => {
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
                                        <div key={idx} className="meaning-group">
                                            <div className="dict-badge" style={{ backgroundColor: group.source.color }}>
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
                  })}
                </div>
              </div>
            )}"""

# Normalize spaces for replacement if needed, but exact match is safer if I copy-pasted correctly.
# Let's try direct replacement.
if block_signature in content:
    content = content.replace(block_signature, new_jsx)
else:
    # Fallback: Try to find by stricter subset if indentation matches vary
    # Or just replace the inner part if outer condition matches
    print("Direct match failed. Trying flexible replacement.")
    # Read the file again and print a chunk to see indentation
    # But since I read it via tool before, I know the indentation.
    # It might be spaces vs tabs or just newline diffs.
    pass

# Retry with more flexible matching if needed. 
# Let's try to match the lines regardless of leading whitespace for the block body
import re
pattern = r"\{\/\* Derived Words Section \(DPD\) \*\/\}[\s\S]*?\}\)\}[\s\S]*?\}\)"
# This regex is risky if there are nested }) that match early.
# Better approach: Replace the inner <div> content if possible, or use exact string from my previous read.

# Let's trust the `block_signature` but be careful about whitespace.
# I will use the exact string I got from `Read` tool.
# The Read tool output:
exact_block = """            {/* Derived Words Section (DPD) */}
            {derivedWords && derivedWords.length > 0 && (
              <div className="detail-card full-width">
                <h2>ศัพท์ที่สร้างจากธาตุนี้ (DPD)</h2>
                <div className="derived-words-list">
                  {derivedWords.map((word, index) => {
                    const thaiWord = PaliScript.romanToThai(word);
                    const meaning = vocabDerivedMeanings[thaiWord];
                    return (
                        <div key={index} className="derived-word-item">
                            <span className="derived-word-tag">{thaiWord}</span>
                            {meaning ? (
                                <div className="derived-word-meaning">{meaning}</div>
                            ) : (
                                <div className="derived-word-meaning text-muted">-</div>
                            )}
                        </div>
                    );
                  })}
                </div>
              </div>
            )}"""

if exact_block in content:
    content = content.replace(exact_block, new_jsx)
    print("Exact block match successful.")
else:
    print("Exact block match failed. Check indentation/content.")
    # For debugging purposes in the script execution
    start_idx = content.find("{/* Derived Words Section (DPD) */}")
    if start_idx != -1:
        print(f"Found start at {start_idx}")
        # manual slice replacement
        end_marker = "            )}"
        end_idx = content.find(end_marker, start_idx) + len(end_marker)
        if end_idx != -1:
             print(f"Found end at {end_idx}")
             # Check if it looks right
             # content = content[:start_idx] + new_jsx + content[end_idx:]
             # I won't do this blindly in this script without verifying.
    

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
