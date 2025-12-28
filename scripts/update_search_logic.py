import os

SEARCH_PAGE_PATH = r'd:\pali-dhatu-app\src\pages\SearchPage.js'
VOCAB_PAGE_PATH = r'd:\pali-dhatu-app\src\pages\VocabSearchPage.js'

def update_search_page():
    print(f"Updating {SEARCH_PAGE_PATH}...")
    with open(SEARCH_PAGE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Old Filter Logic
    old_logic = """    // Filter Logic
    const filteredData = useMemo(() => {
        return allDhatus.filter(d => {
            const matchesGroup = selectedGroup === 'all' || (d.mawat_dhatu && d.mawat_dhatu.includes(selectedGroup));
            const searchLower = searchText.toLowerCase();
            const matchesText = !searchText || 
                                (d.dhatu_word && String(d.dhatu_word).toLowerCase().includes(searchLower)) || 
                                (d.arth_thai && String(d.arth_thai).toLowerCase().includes(searchLower));
            return matchesGroup && matchesText;
        });
    }, [allDhatus, selectedGroup, searchText]);"""

    # New Filter Logic
    new_logic = """    // Filter Logic
    const filteredData = useMemo(() => {
        return allDhatus.filter(d => {
            const matchesGroup = selectedGroup === 'all' || (d.mawat_dhatu && d.mawat_dhatu.includes(selectedGroup));
            // Exact match for Dhatu Word or Meaning (Thai)
            const searchTrimmed = searchText.trim();
            const matchesText = !searchText || 
                                (d.dhatu_word && String(d.dhatu_word).trim() === searchTrimmed) || 
                                (d.arth_thai && String(d.arth_thai).trim() === searchTrimmed);
            return matchesGroup && matchesText;
        });
    }, [allDhatus, selectedGroup, searchText]);"""

    if old_logic in content:
        content = content.replace(old_logic, new_logic)
        with open(SEARCH_PAGE_PATH, 'w', encoding='utf-8') as f:
            f.write(content)
        print("SearchPage.js updated.")
    else:
        print("SearchPage.js: Old logic not found (maybe already updated?)")
        # Try a more robust check or manual visual check if needed.
        # But for now, exact string match.
        # It's possible whitespace differs slightly.
        # Let's try to be less strict if needed, but first try exact.

def update_vocab_page():
    print(f"Updating {VOCAB_PAGE_PATH}...")
    with open(VOCAB_PAGE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Filter Logic
    old_logic = """    const filteredData = useMemo(() => {
        if (!searchText) return [];
        const lower = searchText.toLowerCase();
        return vocabList.filter(item => 
            item.wordThai.includes(lower) || 
            item.wordRoman.toLowerCase().includes(lower)
        );
    }, [vocabList, searchText]);"""

    new_logic = """    const filteredData = useMemo(() => {
        if (!searchText) return [];
        const searchTrimmed = searchText.trim();
        const searchLower = searchTrimmed.toLowerCase();
        
        return vocabList.filter(item => 
            // Exact match only
            item.wordThai === searchTrimmed || 
            item.wordRoman.toLowerCase() === searchLower
        );
    }, [vocabList, searchText]);"""

    if old_logic in content:
        content = content.replace(old_logic, new_logic)
        print("VocabSearchPage.js: Filter logic updated.")
    else:
        print("VocabSearchPage.js: Filter logic not found.")

    # 2. Update Input Style
    old_input = """                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-input"
                            autoFocus
                        />"""
    
    new_input = """                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-input"
                            style={{ 
                                backgroundColor: 'white', 
                                color: '#2c3e50', 
                                border: '2px solid #bdc3c7',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                            }}
                            autoFocus
                        />"""

    if old_input in content:
        content = content.replace(old_input, new_input)
        print("VocabSearchPage.js: Input style updated.")
    else:
        print("VocabSearchPage.js: Input style not found.")

    with open(VOCAB_PAGE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_search_page()
    update_vocab_page()
