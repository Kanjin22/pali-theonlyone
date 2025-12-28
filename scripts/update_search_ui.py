
import os

# Paths
search_page_path = r"D:\pali-dhatu-app\src\pages\SearchPage.js"
app_css_path = r"D:\pali-dhatu-app\src\App.css"

# 1. Update SearchPage.js
with open(search_page_path, 'r', encoding='utf-8') as f:
    search_content = f.read()

# Update fetchData to include arth_pali
old_fetch = """                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    dhatu_word: doc.data().dhatu_word,
                    arth_thai: doc.data().arth_thai,
                    mawat_dhatu: doc.data().mawat_dhatu,
                    anukrom_dhatu: doc.data().anukrom_dhatu
                }));"""

new_fetch = """                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    dhatu_word: doc.data().dhatu_word,
                    arth_thai: doc.data().arth_thai,
                    arth_pali: doc.data().arth_pali,
                    mawat_dhatu: doc.data().mawat_dhatu,
                    anukrom_dhatu: doc.data().anukrom_dhatu
                }));"""

if old_fetch in search_content:
    search_content = search_content.replace(old_fetch, new_fetch)
else:
    print("Warning: fetchData block not found or already updated.")

# Update Filter Logic to include arth_pali
old_filter = """                                (d.arth_thai && d.arth_thai.toLowerCase().includes(searchLower));"""
new_filter = """                                (d.arth_thai && d.arth_thai.toLowerCase().includes(searchLower)) ||
                                (d.arth_pali && d.arth_pali.toLowerCase().includes(searchLower));"""

if old_filter in search_content:
    search_content = search_content.replace(old_filter, new_filter)

# Update JSX Render
old_jsx = """            <div className="results-grid">
                {displayedData.map(dhatu => (
                    <Link to={`/dhatu/${dhatu.id}`} key={dhatu.id} className="dhatu-card-mini">
                        <div className="card-top">
                            <span className="id-badge">#{dhatu.anukrom_dhatu}</span>
                            <span className="group-badge">{dhatu.mawat_dhatu}</span>
                        </div>
                        <h3>{dhatu.dhatu_word}</h3>
                        <p>{dhatu.arth_thai}</p>
                    </Link>
                ))}
            </div>"""

new_jsx = """            <div className="results-grid">
                {displayedData.map(dhatu => (
                    <Link to={`/dhatu/${dhatu.id}`} key={dhatu.id} className="dhatu-card-mini">
                        <div className="card-top">
                            <span className="dhatu-name">{dhatu.dhatu_word}</span>
                            <span className="group-badge">{dhatu.mawat_dhatu}</span>
                        </div>
                        <div className="dhatu-meaning-container">
                            <span className="pali-meaning">({dhatu.arth_pali})</span>
                            <span className="thai-meaning"> {dhatu.arth_thai}</span>
                        </div>
                    </Link>
                ))}
            </div>"""

if old_jsx in search_content:
    search_content = search_content.replace(old_jsx, new_jsx)
else:
    print("Warning: JSX block not found or already updated.")

with open(search_page_path, 'w', encoding='utf-8') as f:
    f.write(search_content)
print("Updated SearchPage.js")

# 2. Update App.css
with open(app_css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Add box-sizing
if "* { box-sizing: border-box; }" not in css_content:
    css_content = css_content.replace("/* ===== LIGHT THEME: \"Modern Classroom\" ===== */", "/* ===== LIGHT THEME: \"Modern Classroom\" ===== */\n\n* { box-sizing: border-box; }")

# Add new styles
new_styles = """
/* Updated Search Result Styles */
.dhatu-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.dhatu-meaning-container {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.5;
}

.pali-meaning {
  color: var(--primary-dark);
  font-weight: 500;
  margin-right: 6px;
}

.thai-meaning {
  color: var(--text-secondary);
}

/* Ensure Search Input doesn't overflow */
.search-controls {
  max-width: 100%;
  box-sizing: border-box;
}
"""

if ".dhatu-name" not in css_content:
    css_content += new_styles

with open(app_css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)
print("Updated App.css")
