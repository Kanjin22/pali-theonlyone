
import os

# Define paths
APP_CSS_PATH = r"D:\pali-dhatu-app\src\App.css"
DHATU_DETAIL_PATH = r"D:\pali-dhatu-app\src\components\DhatuDetail.js"
VERSE_DETAIL_PATH = r"D:\pali-dhatu-app\src\pages\VerseDetailPage.js"
KATHA_RENDERER_PATH = r"D:\pali-dhatu-app\src\components\KathaRenderer.js"

# --- 1. Update App.css ---
with open(APP_CSS_PATH, "r", encoding="utf-8") as f:
    css_content = f.read()

# Replace dhātu-card style for better mobile/modern look
new_dhatu_card_style = """
.dhātu-card {
  width: 100%;
  max-width: 340px;
  background-color: var(--white);
  border: none;
  border-radius: 20px; /* Modern rounded corners */
  padding: 24px;
  text-align: left;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06); /* Soft, modern shadow */
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dhātu-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
"""

# Replace existing .dhātu-card block
import re
css_content = re.sub(r"\.dhātu-card\s*\{[^}]*\}", new_dhatu_card_style.strip(), css_content)

# Add helper classes for "No Wrap Title" and Katha styling
additional_css = """

/* --- Modern UI Helpers --- */
.nowrap-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: block;
  line-height: 1.4;
}

/* --- Katha (Verse) Display Modernization --- */
.katha-grid-display {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 Columns by default */
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.katha-grid-display .verse {
  font-size: 1.2rem; /* Larger font for reading */
  line-height: 1.7;
  background-color: #fff; /* Clean white */
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
  border-left: 4px solid var(--primary-orange); /* Accent */
  color: var(--dark-text);
}

.katha-linear-display {
    font-size: 1.2rem;
    line-height: 1.8;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    border-left: 4px solid var(--secondary-green);
    white-space: pre-wrap; /* Ensure text wraps */
}

/* Mobile Adjustments for Katha */
@media (max-width: 768px) {
    .katha-grid-display {
         grid-template-columns: 1fr; /* Stack on mobile */
    }
    
    .katha-grid-display .verse {
        font-size: 1.15rem;
    }
}
"""

if ".nowrap-title" not in css_content:
    css_content += additional_css

# Make Detail Cards in Grid prettier
detail_card_style = """
.detail-card {
    background-color: var(--white);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
    margin-bottom: 0; /* Let grid handle gap */
    transition: transform 0.2s;
}
.detail-card:hover {
    transform: translateY(-2px);
}
.detail-card h2 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--dark-text);
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
    white-space: nowrap; /* Requested: Single line title */
    overflow: hidden;
    text-overflow: ellipsis;
}
.detail-card p {
    line-height: 1.7;
    color: #555;
    font-size: 1.1rem;
    word-wrap: break-word; /* Requested: Wrap content */
}
"""
# Append or replace if I could find it, but detail-card might not be explicitly defined in App.css (it was in DhatuDetail.js styled inline or just class). 
# I will append it to App.css to ensure it overrides.
css_content += "\n" + detail_card_style

with open(APP_CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css_content)


# --- 2. Update DhatuDetail.js ---
# We want to add 'nowrap-title' class to h1 and ensure h2 uses the new styles (which we did via CSS above).
# But wait, DhatuDetail.js uses `className="detail-card"` so the CSS above will apply.
# We just need to check if there are any inline styles conflicting.

with open(DHATU_DETAIL_PATH, "r", encoding="utf-8") as f:
    dd_content = f.read()

# Update the main title to be nowrap
if 'className="dhatu-title"' in dd_content:
    dd_content = dd_content.replace('className="dhatu-title"', 'className="dhatu-title nowrap-title"')

with open(DHATU_DETAIL_PATH, "w", encoding="utf-8") as f:
    f.write(dd_content)

print("Updates completed successfully.")
