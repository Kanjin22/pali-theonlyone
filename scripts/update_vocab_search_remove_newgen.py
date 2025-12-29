import os

FILE_PATH = r'd:\pali-dhatu-app\src\pages\VocabSearchPage.js'

def update_file():
    print(f"Reading {FILE_PATH}...")
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replacement 1: sourceMapping
    old_mapping = """const sourceMapping = {
    'Etipitaka': { label: 'พจนานุกรมพระไตรปิฎก', color: '#8e44ad', icon: 'fas fa-book' },
    'Tananunto': { label: 'พจนานุกรมธรรมบทภาค ๑-๘', color: '#d35400', icon: 'fas fa-bookmark' },
    'NewGen': { label: 'พจนานุกรมบาลี-ไทย (รุ่นใหม่)', color: '#27ae60', icon: 'fas fa-leaf' },
    'Palidict': { label: 'Palidict.com', color: '#2980b9', icon: 'fas fa-globe' }
};"""

    new_mapping = """const sourceMapping = {
    'Etipitaka': { label: 'พจนานุกรมพระไตรปิฎก', color: '#8e44ad', icon: 'fas fa-book' },
    'Tananunto': { label: 'พจนานุกรมธรรมบทภาค ๑-๘', color: '#d35400', icon: 'fas fa-bookmark' },
    // 'NewGen' removed as per request (duplicate content)
    'Palidict': { label: 'Palidict.com', color: '#2980b9', icon: 'fas fa-globe' }
};"""

    if old_mapping in content:
        content = content.replace(old_mapping, new_mapping)
        print("Updated sourceMapping.")
    else:
        print("Could not find sourceMapping to replace.")

    # Replacement 2: parseMeaning
    old_parse = """const parseMeaning = (text) => {
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
};"""

    # Note: Regex in python string needs double escaping for backslashes if used in string replacement literally
    # But here we are reading raw content. 
    # Let's try to match a unique part of the function if full match is risky due to whitespace.
    
    # Strategy: Find the mapping function part and inject the filter.
    
    # Logic to inject:
    # if (sourceKey === 'NewGen') return null;
    # ...
    # }).filter(item => item !== null);
    
    target_str = """            const sourceKey = match[1];
            const content = match[2].trim();"""
            
    replacement_str = """            const sourceKey = match[1];
            
            // Filter out NewGen dictionary
            if (sourceKey === 'NewGen') return null;

            const content = match[2].trim();"""
            
    if target_str in content:
        content = content.replace(target_str, replacement_str)
        print("Updated parseMeaning logic.")
    else:
        print("Could not find parseMeaning logic target.")

    # Add .filter(item => item !== null)
    # Finding the closing of the map
    map_end = """        return { source: { label: 'ทั่วไป', color: '#7f8c8d', icon: 'fas fa-info-circle' }, content: section.trim() };
    });
};"""

    map_end_new = """        return { source: { label: 'ทั่วไป', color: '#7f8c8d', icon: 'fas fa-info-circle' }, content: section.trim() };
    }).filter(item => item !== null);
};"""

    if map_end in content:
        content = content.replace(map_end, map_end_new)
        print("Added .filter() to parseMeaning.")
    else:
        print("Could not find map closing to add filter.")

    print(f"Writing back to {FILE_PATH}...")
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done.")

if __name__ == "__main__":
    update_file()
