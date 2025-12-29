import os

FILE_PATH = r'd:\pali-dhatu-app\src\pages\SearchPage.js'

def update_file():
    print(f"Reading {FILE_PATH}...")
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Target the container div
    old_container = '<div style={{ marginBottom: "20px" }}>'
    new_container = '<div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>'
    
    # Target the second button's style to remove marginLeft
    # We need to be careful with matching multi-line strings.
    # Let's try to match the specific line with marginLeft: '10px'
    
    if old_container in content:
        content = content.replace(old_container, new_container)
        print("Updated container style.")
    else:
        print("Could not find container div start tag.")
        
    # Remove marginLeft: '10px'
    # It might have a comma before it or after.
    # In the file:
    # transition: 'transform 0.2s',
    # marginLeft: '10px'
    
    if "marginLeft: '10px'" in content:
        content = content.replace("marginLeft: '10px'", "")
        print("Removed marginLeft: '10px'.")
    else:
        print("Could not find marginLeft: '10px'.")

    print(f"Writing back to {FILE_PATH}...")
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done.")

if __name__ == "__main__":
    update_file()
