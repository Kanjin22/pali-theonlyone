import os

css_path = r"d:\pali-dhatu-app\src\App.css"

new_css = """
/* Enhanced Derived Words Section */
.derived-words-section {
  margin-top: 2rem;
  background-color: #fff;
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.derived-section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f2f5;
}

.derived-section-icon {
  width: 40px;
  height: 40px;
  background-color: #e8f4f8;
  color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.derived-section-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: var(--text-primary);
}

.derived-words-list-enhanced {
  display: grid;
  gap: 1.5rem;
}

.derived-word-card {
  border: 1px solid #eef2f7;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  background: white;
}

.derived-word-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  border-color: #dfe6e9;
}

.derived-word-header {
  background-color: #f8f9fa;
  padding: 12px 20px;
  display: flex;
  align-items: baseline;
  gap: 12px;
  border-bottom: 1px solid #eef2f7;
}

.derived-word-thai {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--primary-dark);
}

.derived-word-roman {
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-family: monospace;
}

.derived-meaning-list {
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.dict-entry-box {
  background-color: #fff;
  border-radius: 8px;
}

.dict-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
  background-color: #95a5a6; /* Default fallback */
}

/* Specific dictionary colors are handled inline or we can add classes */
.dict-label i {
  font-size: 0.8rem;
}

.meaning-text {
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.6;
  white-space: pre-wrap;
  padding-left: 4px;
}

.empty-meaning {
  color: var(--text-secondary);
  font-style: italic;
  padding: 10px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 6px;
}
"""

with open(css_path, "a", encoding="utf-8") as f:
    f.write(new_css)

print("App.css updated successfully.")
