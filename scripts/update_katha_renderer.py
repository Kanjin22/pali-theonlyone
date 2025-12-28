import os

file_path = "d:/pali-dhatu-app/src/components/KathaRenderer.js"

old_content = """        default:
            return (
                <div className="katha-linear-display">
                    <p>{text}</p>
                </div>
            );"""

new_content = """        default:
            return (
                <div className="katha-linear-display">
                    {verses.map((verse, index) => (
                        <div key={index} className="verse-line">{verse}</div>
                    ))}
                </div>
            );"""

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if old_content in content:
        updated_content = content.replace(old_content, new_content)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Successfully updated {file_path}")
    elif new_content in content:
        print(f"File {file_path} is already updated.")
    else:
        print(f"Could not find exact match in {file_path}")
        # Debugging: print context around where we expect the match
        start_index = content.find("default:")
        if start_index != -1:
            print("Context around 'default:':")
            print(content[start_index:start_index+200])

except Exception as e:
    print(f"Error: {e}")
