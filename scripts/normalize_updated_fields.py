import sys
import re
from pathlib import Path

TARGET_FIELDS = [
    ('thai_desana', '""'),    # inserted with trailing comma
    ('thai_sense', '``'),
    ('context', '``'),
    ('akhyata', '``'),
    ('kitaka', '``'),
    ('vocab_list', '``'),
    ('sandhi', '{}'),
]

def ensure_fields(block_lines):
    text = "\n".join(block_lines)
    present = {name: (re.search(rf'^\s*{name}\s*:', text, re.M) is not None) for name, _ in TARGET_FIELDS}
    # Build insertion lines for missing fields, respecting indentation (12 spaces used in data files)
    insert_lines = []
    for name, default in TARGET_FIELDS:
        if not present[name]:
            # choose backticks for string defaults
            if default.startswith('``'):
                insert_lines.append(f'            {name}: ``,')
            elif default == '""':
                insert_lines.append(f'            {name}: "",')
            else:
                insert_lines.append(f'            {name}: {default},')
    if not insert_lines:
        # also fix missing commas after existing sandhi if more props follow
        fixed = list(block_lines)
        for idx, line in enumerate(fixed):
            if re.search(r'^\s*sandhi\s*:\s*\{\s*\}\s*$', line):
                # if next line is another property (not closing brace), add comma
                if idx + 1 < len(fixed) and fixed[idx + 1].strip() != '}':
                    fixed[idx] = line.rstrip() + ','
        return fixed
    # Insert after thai line if exists, else after pali, else before closing brace
    new_block = []
    inserted = False
    for i, line in enumerate(block_lines):
        new_block.append(line)
        if not inserted and re.search(r'^\s*thai\s*:\s*`', line):
            for ins in insert_lines:
                new_block.append(ins)
            inserted = True
    if not inserted:
        # fallback: before closing brace
        if new_block and new_block[-1].strip().startswith('}'):
            new_block = new_block[:-1] + insert_lines + [new_block[-1]]
        else:
            new_block.extend(insert_lines)
    # also ensure sandhi comma correctness in the resulting block
    for idx, line in enumerate(new_block):
        if re.search(r'^\s*sandhi\s*:\s*\{\s*\}\s*$', line):
            if idx + 1 < len(new_block) and not new_block[idx + 1].strip().startswith('}'):
                new_block[idx] = line.rstrip() + ','
    return new_block

def process_file(path):
    src = Path(path).read_text(encoding='utf-8').splitlines()
    out = []
    i = 0
    while i < len(src):
        line = src[i]
        # Reorder episode/page so that page comes before episode when adjacent
        if re.search(r'^\s*episode\s*:\s*".*",\s*$', line):
            if i + 1 < len(src) and re.search(r'^\s*page\s*:\s*".*",\s*$', src[i+1]):
                out.append(src[i+1])
                out.append(line)
                i += 2
                continue
        out.append(line)
        if re.search(r'^\s*thai_desana\s*:', line):
            lookahead = src[i+1:i+20]
            has_any = any(re.search(r'^\s*(thai_sense|context|akhyata|kitaka|vocab_list|sandhi)\s*:', la) for la in lookahead)
            if not has_any:
                out.append('            thai_sense: ``,')
                out.append('            context: ``,')
                out.append('            akhyata: ``,')
                out.append('            kitaka: ``,')
                out.append('            vocab_list: ``,')
                out.append('            sandhi: {},')
        i += 1
    # Second pass: fix missing object separators within arrays
    fixed = []
    in_array = False
    seen_first_object = False
    for idx, line in enumerate(out):
        trimmed = line.strip()
        if re.search(r'":\s*\[', trimmed):
            in_array = True
            seen_first_object = False
            fixed.append(line)
            continue
        if in_array and trimmed.startswith(']'):
            in_array = False
            seen_first_object = False
            fixed.append(line)
            continue
        if in_array and trimmed.startswith('{'):
            if not seen_first_object:
                seen_first_object = True
                fixed.append(line)
                continue
            # ensure previous object was properly closed; look back for a closing brace
            j = len(fixed) - 1
            while j >= 0 and fixed[j].strip() == '':
                j -= 1
            prev_line = fixed[j].strip() if j >= 0 else ''
            # if the previous significant line is not a structural closing brace,
            # insert a proper object terminator with comma
            if not prev_line.startswith('}'):
                fixed.append('        },')
            fixed.append(line)
            continue
        fixed.append(line)
    # Third pass: sanitize stray backticks inside template literals (pali/thai)
    sanitized = []
    in_tpl = False
    for line in fixed:
        if not in_tpl:
            if re.search(r'^\s*(pali|thai)\s*:\s*`', line):
                # if template closes on the same line, do not enter template mode
                if re.search(r'`,\s*$', line):
                    in_tpl = False
                else:
                    in_tpl = True
            sanitized.append(line)
            continue
        # inside template literal body
        if re.search(r'`,\s*$', line):
            last = line.rfind('`')
            if last != -1:
                before = line[:last].replace('`', '\\`')
                line = before + line[last:]
            sanitized.append(line)
            in_tpl = False
        else:
            sanitized.append(line.replace('`', '\\`'))
    # Final pass: ensure opening backtick of pali/thai templates is not escaped
    final_lines = []
    for line in sanitized:
        line = re.sub(r'^(\s*(pali|thai)\s*:\s*)\\`', r'\1`', line)
        final_lines.append(line)
    Path(path).write_text("\n".join(final_lines), encoding='utf-8')

if __name__ == "__main__":
    target = "d:/pali-theonlyone/data/updated/content-dhamma08-updated.js"
    if len(sys.argv) > 1:
        target = sys.argv[1]
    process_file(target)
