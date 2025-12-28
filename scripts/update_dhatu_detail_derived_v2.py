import re

file_path = r'd:\pali-dhatu-app\src\components\DhatuDetail.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Helper Functions
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
    print("Helper functions added.")

# 2. Replace the JSX Block using indices
start_marker = "{/* Derived Words Section (DPD) */}"
end_marker = "            )}" # identifying the closing of the condition

start_idx = content.find(start_marker)
if start_idx != -1:
    # Find the closing tag. It should be the first one after start_idx.
    # Note: We need to be careful not to match a nested one, but the structure is:
    # {cond && (
    #    <div>...</div>
    # )}
    # So searching for "            )}" (12 spaces + )}) should work if formatting is consistent.
    
    # Let's verify what the file actually has by searching
    next_end = content.find(end_marker, start_idx)
    
    if next_end != -1:
        # Include the marker length
        end_idx = next_end + len(end_marker)
        
        # Check if we are replacing the right thing
        chunk = content[start_idx:end_idx]
        print(f"Replacing chunk of length {len(chunk)}")
        
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
            
        content = content[:start_idx] + new_jsx + content[end_idx:]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("JSX block replaced successfully.")
    else:
        print("End marker not found.")
else:
    print("Start marker not found.")
