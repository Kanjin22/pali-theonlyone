import os

file_path = r"d:\pali-dhatu-app\src\pages\TananuntoRootsPage.js"

def cleanup_file():
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix duplicated dpdList logic at lines 264-265 (approx)
    # The duplicate:
    # let dpdList = showDpd ? getDpdVocab(rootWord) : [];
    # let dpdList = showDpd ? getDpdVocab(rootWord) : [];
    
    if "let dpdList = showDpd ? getDpdVocab(rootWord) : [];\n                    let dpdList = showDpd ? getDpdVocab(rootWord) : [];" in content:
        content = content.replace(
            "let dpdList = showDpd ? getDpdVocab(rootWord) : [];\n                    let dpdList = showDpd ? getDpdVocab(rootWord) : [];",
            "let dpdList = showDpd ? getDpdVocab(rootWord) : [];"
        )
        print("Fixed duplicate dpdList definition")

    # 2. Fix duplicate filtering at lines 269-270
    # dpdList = dpdList.filter(v => isCompatible(dhatu, v));
    # dpdList = dpdList.filter(v => isCompatible(dhatu, v));
    
    if "dpdList = dpdList.filter(v => isCompatible(dhatu, v));\n                    dpdList = dpdList.filter(v => isCompatible(dhatu, v));" in content:
        content = content.replace(
            "dpdList = dpdList.filter(v => isCompatible(dhatu, v));\n                    dpdList = dpdList.filter(v => isCompatible(dhatu, v));",
            "dpdList = dpdList.filter(v => isCompatible(dhatu, v));"
        )
        print("Fixed duplicate dpdList filtering")

    # 3. Fix duplicate filtering at lines 288-289
    # dpdList = dpdList.filter(v => v.w.toLowerCase().includes(searchTrimmed) || (v.d && v.d.toLowerCase().includes(searchTrimmed)));
    # dpdList = dpdList.filter(v => v.w.toLowerCase().includes(searchTrimmed) || (v.d && v.d.toLowerCase().includes(searchTrimmed)));
    
    dup_filter = "dpdList = dpdList.filter(v => v.w.toLowerCase().includes(searchTrimmed) || (v.d && v.d.toLowerCase().includes(searchTrimmed)));"
    if f"{dup_filter}\n                         {dup_filter}" in content:
        content = content.replace(
            f"{dup_filter}\n                         {dup_filter}",
            dup_filter
        )
        print("Fixed duplicate dpdList text filtering")

    # 4. Fix duplicate rendering block for DPD
    # Lines 347-374 and 377-403
    # It seems to be exact copy.
    
    dpd_render_block = r'''                            {/* DPD Vocab List */}
                            {dpdList.length > 0 && (
                                <div className="vocab-list-dpd" style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                                    <h4 style={{ margin: '10px 0', color: '#2980b9', fontSize: '1rem' }}>
                                        <i className="fas fa-globe"></i> ศัพท์จาก DPD ({dpdList.length})
                                    </h4>
                                    <div style={{ 
                                        maxHeight: '200px', 
                                        overflowY: 'auto', 
                                        backgroundColor: '#ecf0f1', 
                                        padding: '10px', 
                                        borderRadius: '8px',
                                        fontSize: '0.9rem'
                                    }}>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {dpdList.map((v, idx) => (
                                                <li key={idx} style={{ marginBottom: '5px', paddingBottom: '5px', borderBottom: '1px dashed #bdc3c7' }}>
                                                    <strong style={{ color: '#c0392b' }}>{v.w}</strong>
                                                    {v.e && <span style={{ fontSize: '0.8em', color: '#7f8c8d', marginLeft: '5px' }}>[{v.e}]</span>}
                                                    <span style={{ color: '#34495e', marginLeft: '5px' }}>
                                                        {v.d ? v.d.replace(/<[^>]*>/g, '') : ''}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}'''
    
    # Normalize line endings
    dpd_render_block = dpd_render_block.replace('\r\n', '\n')
    content_normalized = content.replace('\r\n', '\n')
    
    # Check if the block appears twice consecutively (with some whitespace in between)
    # The read output showed:
    # 374→                            )}
    # 375→    
    # 376→                            {/* DPD Vocab List */}
    
    double_block = f"{dpd_render_block}\n    \n{dpd_render_block}"
    
    if double_block in content_normalized:
        content_normalized = content_normalized.replace(double_block, dpd_render_block)
        print("Fixed duplicate DPD render block")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content_normalized)
    else:
        # Maybe indentation or spacing is slightly different.
        # Let's try to remove the second occurrence if it exists.
        count = content_normalized.count(dpd_render_block)
        if count > 1:
            print(f"Found {count} occurrences of DPD render block. Removing duplicates.")
            # Keep only the first one
            parts = content_normalized.split(dpd_render_block)
            # Reconstruct: part0 + block + part1 + part2...
            # But we need to be careful not to remove valid duplicates if logic required it (unlikely here)
            
            # The structure in file is likely:
            # block
            # whitespace
            # block
            
            # Let's use regex to replace consecutive blocks
            import re
            escaped_block = re.escape(dpd_render_block)
            pattern = f"{escaped_block}\\s+{escaped_block}"
            
            if re.search(pattern, content_normalized):
                new_content = re.sub(pattern, dpd_render_block, content_normalized)
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print("Fixed duplicate DPD render block via regex")
            else:
                print("Could not match consecutive blocks via regex either.")
        else:
             print("Did not find duplicate render block (count=1)")
             # Maybe I should just save the other fixes
             with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content_normalized)

if __name__ == "__main__":
    cleanup_file()
