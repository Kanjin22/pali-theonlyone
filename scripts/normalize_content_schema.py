import os
import re

def ensure_thai_desana_in_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    lines = content.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        new_lines.append(line)
        if line.strip().startswith('{'):
            obj_buf = [line]
            i += 1
            has_thai_desana = False
            insertion_done = False
            while i < len(lines):
                l = lines[i]
                obj_buf.append(l)
                if 'thai_desana:' in l:
                    has_thai_desana = True
                if (not has_thai_desana) and (not insertion_done) and re.search(r'^\s*thai:\s*`', l):
                    new_lines.pop()  # remove last '{' already added
                    new_lines.extend(obj_buf)
                    new_lines.append('            thai_desana: "",')
                    insertion_done = True
                if l.strip().startswith('}'):
                    break
                i += 1
            if not insertion_done and not has_thai_desana:
                new_lines.pop()  # remove last appended line
                for bl in obj_buf[:-1]:
                    new_lines.append(bl)
                new_lines.append('            thai_desana: "",')
                new_lines.append(obj_buf[-1])
        i += 1
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))

def main():
    base = 'd:/pali-theonlyone/data'
    targets = [f'content-dhamma{n:02d}.js' for n in range(1, 9)]
    for fname in targets:
        path = os.path.join(base, fname)
        if os.path.exists(path):
            ensure_thai_desana_in_file(path)

if __name__ == '__main__':
    main()
