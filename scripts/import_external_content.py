import os
import json
import re

def normalize_text(s):
    if s is None:
        return ""
    return str(s).replace('\u200b', '').strip()

def ensure_fields(obj):
    keys = ["part","vagga","story","episode","page","pali","thai","thai_desana","thai_sense","context","akhyata","kitaka","vocab_list","sandhi"]
    o = {}
    for k in keys:
        if k == "sandhi":
            v = obj.get(k, {})
            if not isinstance(v, dict):
                v = {}
            o[k] = v
        else:
            v = obj.get(k, "")
            o[k] = normalize_text(v)
    return o

def is_placeholder_block(lines):
    t = "\n".join(lines)
    return "รอข้อมูล" in t

def serialize_obj(o):
    s = []
    s.append("        {")
    s.append(f'            part: "{o["part"]}",')
    s.append(f'            vagga: "{o["vagga"]}",')
    s.append(f'            story: "{o["story"]}",')
    s.append(f'            episode: "{o["episode"]}",')
    s.append(f'            page: "{o["page"]}",')
    s.append(f'            pali: `{o["pali"]}`,')
    s.append(f'            thai: `{o["thai"]}`,')
    s.append(f'            thai_desana: "{o["thai_desana"]}",')
    s.append(f'            thai_sense: "{o["thai_sense"]}",')
    s.append(f'            context: "{o["context"]}",')
    s.append(f'            akhyata: "{o["akhyata"]}",')
    s.append(f'            kitaka: "{o["kitaka"]}",')
    s.append(f'            vocab_list: "{o["vocab_list"]}",')
    s.append('            sandhi: {')
    if o["sandhi"]:
        items = list(o["sandhi"].items())
        for i, (k, v) in enumerate(items):
            comma = "," if i < len(items)-1 else ""
            s.append(f'                "{k}": "{v}"{comma}')
    s.append("            }")
    s.append("        }")
    return "\n".join(s)

def merge_into_file(book_id, key, new_objects):
    path = f'd:/pali-theonlyone/data/content-dhamma{book_id:02d}.js'
    if not os.path.exists(path):
        return False
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    lines = content.split("\n")
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = re.match(r'^\s*"([^"]+)": \[\s*$', line)
        if m:
            current_key = m.group(1)
            out.append(line)
            i += 1
            block_lines = []
            meta_block = []
            while i < len(lines) and not lines[i].strip().startswith('}'):
                meta_block.append(lines[i])
                i += 1
            closing_obj = lines[i]
            i += 1
            array_tail_start = i
            original_blocks = []
            first_full = list(meta_block) + [closing_obj]
            if not is_placeholder_block(first_full):
                original_blocks.append(first_full)
            while i < len(lines) and not lines[i].strip().startswith(']'):
                if lines[i].strip().startswith('{'):
                    obj_buf = []
                    while i < len(lines):
                        obj_buf.append(lines[i])
                        if lines[i].strip().startswith('}'):
                            if i+1 < len(lines) and lines[i+1].strip().startswith(','):
                                obj_buf.append(lines[i+1])
                                i += 1
                            break
                        i += 1
                    if not is_placeholder_block(obj_buf):
                        original_blocks.append(obj_buf)
                i += 1
            arr_close = lines[i]
            if current_key == key:
                for bl in original_blocks:
                    for l in bl:
                        out.append(l)
                if original_blocks:
                    if not out[-1].strip().endswith(','):
                        out.append("        ,")
                for idx, obj in enumerate(new_objects):
                    s = serialize_obj(ensure_fields(obj))
                    if idx < len(new_objects)-1:
                        s += ","
                    out.append(s)
                out.append(arr_close)
            else:
                for l in meta_block:
                    out.append(l)
                out.append(closing_obj)
                j = array_tail_start
                while j <= i:
                    out.append(lines[j])
                    j += 1
        else:
            out.append(line)
            i += 1
    with open(path, 'w', encoding='utf-8') as f:
        f.write("\n".join(out))
    return True

def load_import_units():
    base = 'd:/pali-theonlyone/data/import'
    os.makedirs(base, exist_ok=True)
    units = []
    for name in os.listdir(base):
        if not name.endswith('.json'):
            continue
        p = os.path.join(base, name)
        try:
            with open(p, 'r', encoding='utf-8') as f:
                data = json.load(f)
            units.append((p, data))
        except Exception:
            pass
    return units

def extract_items(data):
    items = []
    if isinstance(data, dict) and "items" in data:
        book = int(data.get("book", 0))
        for it in data["items"]:
            items.append((book, it.get("key",""), it.get("objects", [])))
    elif isinstance(data, dict):
        for k, v in data.items():
            m = re.match(r'^d(\d{2})_', k)
            book = int(m.group(1)) if m else 0
            arr = v if isinstance(v, list) else []
            items.append((book, k, arr))
    return items

def main():
    units = load_import_units()
    for p, data in units:
        items = extract_items(data)
        for book, key, objs in items:
            if book and key and objs:
                merge_into_file(book, key, objs)

if __name__ == '__main__':
    main()
