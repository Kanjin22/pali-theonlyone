
import os

APP_CSS_PATH = r"D:\pali-dhatu-app\src\App.css"

content = """
/* ===== LIGHT THEME: "Modern Classroom" ===== */

:root {
  --primary-color: #3498db;      /* Blue header */
  --primary-dark: #2980b9;
  --accent-color: #e67e22;       /* Orange accents */
  --bg-color: #f8f9fa;           /* Light gray background */
  --card-bg: #ffffff;
  --text-primary: #2c3e50;       /* Dark gray text */
  --text-secondary: #7f8c8d;
  --border-color: #ecf0f1;
  --success-color: #27ae60;
  --font-main: 'Sarabun', sans-serif;
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.1);
  --radius: 12px;
}

body {
  margin: 0;
  font-family: var(--font-main);
  background-color: var(--bg-color);
  color: var(--text-primary);
  line-height: 1.6;
}

.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* --- Header --- */
.App-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.App-header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
  align-items: center;
}

.nav-links a {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-links a:hover, .nav-links a.active {
  background-color: rgba(255,255,255,0.2);
  color: white;
}

.logout-button {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white !important;
  cursor: pointer;
  font-family: var(--font-main);
}

/* --- Search Page --- */
.Search-page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

.search-hero {
  background: white;
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
  text-align: center;
}

.search-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 250px;
}

.control-group label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.search-input, .group-select {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: var(--font-main);
}

.search-input:focus, .group-select:focus {
  border-color: var(--primary-color);
  outline: none;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.dhatu-card-mini {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
}

.dhatu-card-mini:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.card-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.id-badge { background: #eee; padding: 2px 6px; border-radius: 4px; color: #777; }
.group-badge { background: #e8f6f3; color: var(--success-color); padding: 2px 6px; border-radius: 4px; }

.dhatu-card-mini h3 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
  font-size: 1.4rem;
}

.dhatu-card-mini p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.load-more-btn {
  display: block;
  margin: 2rem auto;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.2s;
}

.load-more-btn:hover { background: var(--primary-dark); }

/* --- Katha List Page --- */
.katha-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.katha-card-link { text-decoration: none; color: inherit; }

.katha-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.katha-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }

.katha-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.katha-number { font-weight: bold; color: var(--primary-color); }
.dhatu-count-badge { background: var(--accent-color); color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; }

.katha-footer {
  margin-top: auto;
  text-align: right;
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 500;
  padding-top: 1rem;
}

/* --- Detail Page --- */
.Dhatu-detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.detail-header {
  text-align: center;
  margin-bottom: 2rem;
}

.dhatu-title {
  font-size: 3rem;
  margin: 0.5rem 0;
  color: var(--primary-dark);
}

.anukrom-badge {
  background: var(--accent-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.detail-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.detail-card.full-width { grid-column: 1 / -1; }

.detail-card h2 {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-top: 0;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.detail-card p { font-size: 1.1rem; margin: 0; }
.pali-text { font-family: 'Sarabun', serif; font-size: 1.2rem; }

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: var(--text-secondary);
  text-decoration: none;
}

.back-link:hover { color: var(--primary-color); }

/* Mobile */
@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
  .search-controls { flex-direction: column; }
  .App-header { padding: 1rem; }
  .App-header nav { flex-direction: column; gap: 1rem; }
  .nav-links { flex-wrap: wrap; justify-content: center; }
}

.nowrap-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
"""

with open(APP_CSS_PATH, "w", encoding="utf-8") as f:
    f.write(content.strip())

print("App.css updated.")
