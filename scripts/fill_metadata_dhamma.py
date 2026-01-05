import sys
import re
from pathlib import Path

def fill_metadata_in_key(path, key, part_text, vagga_text, story_text):
    src = Path(path).read_text(encoding='utf-8').splitlines()
    out = []
    i = 0
    in_target_array = False
    brace_level = 0
    while i < len(src):
        line = src[i]
        # detect start of target array
        if not in_target_array:
            if re.match(rf'^\s*"{re.escape(key)}"\s*:\s*\[', line):
                in_target_array = True
                brace_level = 0
                out.append(line)
                i += 1
                continue
            else:
                out.append(line)
                i += 1
                continue
        # inside target array
        trimmed = line.strip()
        # detect end of array
        if in_target_array and trimmed.startswith(']'):
            in_target_array = False
            out.append(line)
            i += 1
            continue
        # track object braces to know object boundaries (optional)
        if trimmed.startswith('{'):
            brace_level += 1
        if trimmed.startswith('}'):
            if brace_level > 0:
                brace_level -= 1
        # replace empty metadata values
        if re.match(r'^\s*part\s*:\s*""\s*,?\s*$', line):
            out.append(re.sub(r'""', f'"{part_text}"', line))
        elif re.match(r'^\s*vagga\s*:\s*""\s*,?\s*$', line):
            out.append(re.sub(r'""', f'"{vagga_text}"', line))
        elif re.match(r'^\s*story\s*:\s*""\s*,?\s*$', line):
            out.append(re.sub(r'""', f'"{story_text}"', line))
        else:
            out.append(line)
        i += 1
    Path(path).write_text("\n".join(out), encoding='utf-8')

if __name__ == "__main__":
    target_path = sys.argv[1] if len(sys.argv) > 1 else "d:/pali-theonlyone/data/content-dhamma01.js"
    key = sys.argv[2] if len(sys.argv) > 2 else "d01_v01_s01_cakkhupala"
    part = sys.argv[3] if len(sys.argv) > 3 else "ภาคที่ ๑"
    vagga = sys.argv[4] if len(sys.argv) > 4 else "๑. ยมกวรรค"
    story = sys.argv[5] if len(sys.argv) > 5 else "๑. เรื่องจักขุปาลเถระ [๑]"
    fill_metadata_in_key(target_path, key, part, vagga, story)
