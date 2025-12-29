import os

FILE_PATH = r"d:\pali-dhatu-app\src\components\DhatuDetail.js"

OLD_CODE = """                            <div className="derived-word-header">
                                <span className="derived-word-thai">{thaiWord}</span>
                                <span className="derived-word-roman">{word}</span>
                            </div>"""

NEW_CODE = """                            <div className="derived-word-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span className="derived-word-thai">{thaiWord}</span>
                                    <span className="derived-word-roman">{word}</span>
                                </div>
                                <a 
                                    href={`https://www.dpdict.net/gd?search=${word}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title="ดูใน dpdict.net"
                                    style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9em', textDecoration: 'none' }}
                                >
                                    <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>"""

def main():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if OLD_CODE in content:
        new_content = content.replace(OLD_CODE, NEW_CODE)
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated DhatuDetail.js")
    else:
        print("Could not find code block to replace")

if __name__ == "__main__":
    main()
