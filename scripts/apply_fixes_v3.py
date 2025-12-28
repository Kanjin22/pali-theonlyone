import os

# Paths
search_page_path = "D:/pali-dhatu-app/src/pages/SearchPage.js"
app_css_path = "D:/pali-dhatu-app/src/App.css"
verse_detail_path = "D:/pali-dhatu-app/src/pages/VerseDetailPage.js"

# 1. Update SearchPage.js
try:
    with open(search_page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove (Affix Group)
    content = content.replace("หมวดธาตุ (Affix Group)", "หมวดธาตุ")

    # Move search-results-info
    # We look for the closing of search-hero and the info block following it
    search_hero_end_pattern = """                </div>
            </div>

            <div className="search-results-info">
                พบ {filteredData.length} รายการ
            </div>"""

    search_hero_new_pattern = """                </div>
                <div className="search-results-info">
                    พบ {filteredData.length} รายการ
                </div>
            </div>"""

    if search_hero_end_pattern in content:
        content = content.replace(search_hero_end_pattern, search_hero_new_pattern)
        print("Moved search-results-info inside search-hero")
    else:
        print("Warning: Could not find exact pattern for search-results-info move. Check indentation.")
        # Fallback: Try a slightly looser replacement if needed, or manual check.
        # Let's try to find the closing div of search-hero and insert before it.
        # But simply replacing the pattern is safest if it matches.

    with open(search_page_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {search_page_path}")

except Exception as e:
    print(f"Error updating SearchPage.js: {e}")


# 2. Update App.css
try:
    with open(app_css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()

    new_css = """
/* Added by apply_fixes_v3.py */
.search-results-info {
  text-align: center;
  margin-top: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  width: 100%;
}

.katha-grid-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;
}

.katha-grid-display .verse {
  text-align: left;
  font-family: 'Sarabun', serif;
  font-size: 1.1rem;
  padding: 0.5rem;
  background-color: #f8f9fa; /* Light bg for readability */
  border-radius: 4px;
}

.katha-linear-display {
  text-align: left;
  margin: 1rem 0;
  line-height: 1.8;
  font-family: 'Sarabun', serif;
  font-size: 1.1rem;
}

/* Mobile optimizations for Katha */
@media (max-width: 480px) {
  .katha-grid-display {
     gap: 0.5rem;
  }
  .katha-grid-display .verse {
      font-size: 0.95rem;
      padding: 0.25rem;
  }
}
"""

    if ".katha-grid-display" not in css_content:
        css_content += new_css
        with open(app_css_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
        print(f"Updated {app_css_path}")
    else:
        print("App.css already contains .katha-grid-display")

except Exception as e:
    print(f"Error updating App.css: {e}")


# 3. Update VerseDetailPage.js (Fix Query Logic)
try:
    with open(verse_detail_path, 'r', encoding='utf-8') as f:
        v_content = f.read()

    # We need to replace the query line to use katha_no from the fetched doc
    old_logic = "const q = query(dhatusRef, where('katha_no', '==', Number(id)), orderBy('anukrom_dhatu'));"
    
    # We construct the new logic block. 
    # Since 'kathaSnap' is available in the scope (fetched just before), we can use it.
    new_logic = """
                let kathaNo = -1; 
                if (kathaSnap.exists()) {
                    kathaNo = kathaSnap.data().katha_no;
                }
                const q = query(dhatusRef, where('katha_no', '==', kathaNo), orderBy('anukrom_dhatu'));
    """

    if old_logic in v_content:
        v_content = v_content.replace(old_logic, new_logic)
        with open(verse_detail_path, 'w', encoding='utf-8') as f:
            f.write(v_content)
        print(f"Updated {verse_detail_path}")
    else:
        print("Warning: Could not find old query logic in VerseDetailPage.js")

except Exception as e:
    print(f"Error updating VerseDetailPage.js: {e}")
