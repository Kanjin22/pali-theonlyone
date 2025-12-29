import os

FILE_PATH = r"d:\pali-dhatu-app\src\pages\TananuntoRootsPage.js"

OLD_CODE = """                                            {dpdList.map((v, idx) => (
                                                <li key={idx} style={{ marginBottom: '5px', paddingBottom: '5px', borderBottom: '1px dashed #bdc3c7' }}>
                                                    <strong style={{ color: '#c0392b' }}>{v.w}</strong>
                                                    {v.e && <span style={{ fontSize: '0.8em', color: '#7f8c8d', marginLeft: '5px' }}>[{v.e}]</span>}
                                                    <span style={{ color: '#34495e', marginLeft: '5px' }}>
                                                        {v.d ? v.d.replace(/<[^>]*>/g, '') : ''}
                                                    </span>
                                                </li>
                                            ))}"""

NEW_CODE = """                                            {dpdList.map((v, idx) => (
                                                <li key={idx} style={{ marginBottom: '5px', paddingBottom: '5px', borderBottom: '1px dashed #bdc3c7' }}>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                                        <strong style={{ color: '#c0392b' }}>{v.w}</strong>
                                                        {v.e && <span style={{ fontSize: '0.8em', color: '#7f8c8d', marginLeft: '5px' }}>[{v.e}]</span>}
                                                        <a 
                                                            href={`https://www.dpdict.net/gd?search=${v.w}`} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            title="ดูใน dpdict.net"
                                                            style={{ marginLeft: '8px', color: '#2980b9', fontSize: '0.9em' }}
                                                        >
                                                            <i className="fas fa-external-link-alt"></i>
                                                        </a>
                                                    </div>
                                                    <span style={{ color: '#34495e', display: 'block', marginTop: '2px' }}>
                                                        {v.d ? v.d.replace(/<[^>]*>/g, '') : ''}
                                                    </span>
                                                </li>
                                            ))}"""

def main():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if OLD_CODE in content:
        new_content = content.replace(OLD_CODE, NEW_CODE)
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated TananuntoRootsPage.js")
    else:
        print("Could not find code block to replace")

if __name__ == "__main__":
    main()
