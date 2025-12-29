import os

FILE_PATH = r'd:\pali-dhatu-app\src\pages\TananuntoRootsPage.js'

def update_file():
    print(f"Reading {FILE_PATH}...")
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    found = False
    for line in lines:
        if "พบธาตุจำนวน {allDhatus.length} ตัว ที่ปรากฏในพจนานุกรมธรรมบท" in line:
            print(f"Removing line: {line.strip()}")
            found = True
            continue # Skip this line
        new_lines.append(line)
    
    if not found:
        print("Could not find the target line to remove.")
    else:
        print(f"Writing back to {FILE_PATH}...")
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Done.")

if __name__ == "__main__":
    update_file()
