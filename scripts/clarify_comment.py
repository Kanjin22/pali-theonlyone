import os
import re

FILE_PATH = r"d:\pali-dhatu-app\src\pages\TananuntoRootsPage.js"

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def main():
    content = read_file(FILE_PATH)
    
    # Simple comment update to clarify source of data
    old_comment = "const group = dhatu.mawat_dhatu; // e.g. \"ภู (อ)\""
    new_comment = "const group = dhatu.mawat_dhatu; // Check against Our Root Dictionary (Palidict) Group"
    
    if old_comment in content:
        content = content.replace(old_comment, new_comment)
        print("Updated comment in TananuntoRootsPage.js")
    else:
        print("Could not find the comment to update")
        
    write_file(FILE_PATH, content)

if __name__ == "__main__":
    main()
