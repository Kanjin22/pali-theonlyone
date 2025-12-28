
file_path = r'd:\pali-theonlyone\data\vocab-tananunto.js'
with open(file_path, 'r', encoding='utf-8') as f:
    for line in f:
        if "กริสฺสติ" in line:
            print(line.strip())
