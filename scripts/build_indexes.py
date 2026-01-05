import json
import glob
import os
import re
from pathlib import Path

def build_thai_index():
    rows = []
    files = sorted(glob.glob(os.path.join('d:/pali-theonlyone/data/raw', 'purivaro-book*-raw.json')))
    for fp in files:
        book = int(re.search(r'book(\d+)', fp).group(1))
        with open(fp, 'r', encoding='utf-8') as f:
            data = json.load(f)
        current_vagga = ''
        seen = set()
        for item in data:
            if item.get('is_section') == 1:
                pali_text = item.get('pali', '').strip()
                pali_text = re.sub(r'^\d+\.\s*', '', pali_text)
                pali_text = pali_text.strip()
                current_vagga = pali_text
                continue
            title = str(item.get('story_title') or '').strip()
            if not title:
                continue
            key = (book, current_vagga, title)
            if key in seen:
                continue
            seen.add(key)
            rows.append([book, current_vagga, title])
    out = Path('d:/pali-theonlyone/data/index-titles-thai.csv')
    out.write_text('book,vagga,story_thai\n' + '\n'.join([f'{b},{v},{t}' for b,v,t in rows]), encoding='utf-8')

def build_roman_index():
    rows = []
    files = sorted(glob.glob(os.path.join('d:/pali-theonlyone/data', 'content-dhamma*.js')))
    key_re = re.compile(r'^\s*"([^"]+)": \[\s*$')
    for fp in files:
        with open(fp, 'r', encoding='utf-8') as f:
            lines = f.read().splitlines()
        i = 0
        while i < len(lines):
            m = key_re.match(lines[i])
            if m:
                key = m.group(1)
                km = re.match(r'^d(\d{2})_v(\d{2})_s(\d{2})_(.+)$', key)
                if km:
                    book = int(km.group(1))
                    vagga_no = int(km.group(2))
                    story_slug = km.group(4)
                else:
                    book = 0
                    vagga_no = 0
                    story_slug = key
                j = i + 1
                story_title = ''
                while j < len(lines) and not lines[j].strip().startswith('}'):
                    if 'story:' in lines[j]:
                        sm = re.search(r'story:\s*"([^"]+)"', lines[j])
                        if sm:
                            story_title = sm.group(1)
                            break
                    j += 1
                rows.append([book, vagga_no, story_slug, story_title, key])
            i += 1
    out = Path('d:/pali-theonlyone/data/index-titles-roman.csv')
    out.write_text('book,vagga_no,story_roman,story_thai,key\n' + '\n'.join([f'{b},{v},{sr},{st},{k}' for b,v,sr,st,k in rows]), encoding='utf-8')

if __name__ == '__main__':
    build_thai_index()
    build_roman_index()
