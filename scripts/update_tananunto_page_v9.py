import os

FILE_PATH = r"d:\pali-dhatu-app\src\pages\TananuntoRootsPage.js"

OLD_CODE = "{v.def.replace(v.word, '').trim().replace(/^:\s*/, '')}"
NEW_CODE = "{v.def.replace(v.word, '').trim().replace(/^:\s*/, '').replace(/สำเร็จรูปเป็น\\s*$/, '')}"

def main():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if OLD_CODE in content:
        new_content = content.replace(OLD_CODE, NEW_CODE)
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated TananuntoRootsPage.js")
    else:
        print("Could not find code block to replace")

if __name__ == "__main__":
    main()
