import os

file_path = r"D:\pali-dhatu-app\src\pages\VocabSearchPage.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add formatContent function
format_function = """
const formatContent = (text) => {
    if (!text) return null;
    
    // Replace <br> tags with newlines
    let cleanText = text.replace(/<br\s*\/?>/gi, '\\n');
    
    // Split into lines
    const lines = cleanText.split('\\n');
    
    return lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} style={{ height: '8px' }}></div>;
        
        // Highlight Part of Speech (e.g., "ค. ", "น. ", "ก. ") at start of line
        const abbrMatch = trimmed.match(/^([ก-ฮ]\\.)\\s+(.*)/);
        if (abbrMatch) {
             return (
                <div key={index} style={{ marginBottom: '4px' }}>
                    <span style={{ color: '#d35400', fontWeight: 'bold', marginRight: '5px' }}>{abbrMatch[1]}</span>
                    {abbrMatch[2]}
                </div>
            );
        }
        
        // Style Synonyms/Equals (e.g., "= ...")
        if (trimmed.startsWith('=')) {
             return (
                <div key={index} style={{ marginBottom: '4px', paddingLeft: '15px', color: '#7f8c8d' }}>
                    {trimmed}
                </div>
            );
        }
        
        return <div key={index} style={{ marginBottom: '4px' }}>{trimmed}</div>;
    });
};

"""

# Insert before function VocabSearchPage()
if "function VocabSearchPage() {" in content and "const formatContent" not in content:
    content = content.replace("function VocabSearchPage() {", format_function + "function VocabSearchPage() {")
    print("Added formatContent function.")
else:
    print("formatContent function already exists or target not found.")

# 2. Use formatContent in render
old_render = '<div className="meaning-text">{group.content}</div>'
new_render = '<div className="meaning-text">{formatContent(group.content)}</div>'

if old_render in content:
    content = content.replace(old_render, new_render)
    print("Updated render to use formatContent.")
else:
    print("Render target not found (or already updated).")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done.")
