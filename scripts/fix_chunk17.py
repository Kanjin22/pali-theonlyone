import re

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    changes = 0

    for i, line in enumerate(lines):
        original_line = line
        stripped = line.strip()
        
        # Skip comments or non-key-value lines
        if not stripped.startswith('"') or '": "' not in stripped:
            new_lines.append(line)
            continue

        # Fix truncated values
        # 1. ...ตุลยาธิ-", -> ...ตุลยาธิกรณพหุพพิหิสมาส",
        if stripped.endswith('ตุลยาธิ-",'):
            line = line.replace('ตุลยาธิ-",', 'ตุลยาธิกรณพหุพพิหิสมาส",')
            changes += 1
            print(f"Fixed truncated line {i+1}: ตุลยาธิ- -> ตุลยาธิกรณพหุพพิหิสมาส")
        
        # 2. ...ภินนาธิ-", -> ...ภินนาธิกรณพหุพพิหิสมาส",
        elif stripped.endswith('ภินนาธิ-",'):
            line = line.replace('ภินนาธิ-",', 'ภินนาธิกรณพหุพพิหิสมาส",')
            changes += 1
            print(f"Fixed truncated line {i+1}: ภินนาธิ- -> ภินนาธิกรณพหุพพิหิสมาส")

        # 3. ...กัมม-", -> ...กัมมธารยสมาส",
        elif stripped.endswith('กัมม-",'):
            line = line.replace('กัมม-",', 'กัมมธารยสมาส",')
            changes += 1
            print(f"Fixed truncated line {i+1}: กัมม- -> กัมมธารยสมาส")

        # 4. ...ทวันทว-", -> ...ทวันทวสมาส",
        elif stripped.endswith('ทวันทว-",'):
            line = line.replace('ทวันทว-",', 'ทวันทวสมาส",')
            changes += 1
            print(f"Fixed truncated line {i+1}: ทวันทว- -> ทวันทวสมาส")

        # 5. ...จตุตถีตุลยาธิกรณ-", -> ...จตุตถีตุลยาธิกรณพหุพพิหิสมาส",
        elif stripped.endswith('จตุตถีตุลยาธิกรณ-",'):
            line = line.replace('จตุตถีตุลยาธิกรณ-",', 'จตุตถีตุลยาธิกรณพหุพพิหิสมาส",')
            changes += 1
            print(f"Fixed truncated line {i+1}: จตุตถีตุลยาธิกรณ- -> จตุตถีตุลยาธิกรณพหุพพิหิสมาส")
        
        # 6. ...สมาหารทวันทว-", -> ...สมาหารทวันทวสมาส",
        elif stripped.endswith('สมาหารทวันทว-",'):
            line = line.replace('สมาหารทวันทว-",', 'สมาหารทวันทวสมาส",')
            changes += 1
            print(f"Fixed truncated line {i+1}: สมาหารทวันทว- -> สมาหารทวันทวสมาส")

        # 7. ...อสมาหารทวันทว-", -> ...อสมาหารทวันทวสมาส",
        elif stripped.endswith('อสมาหารทวันทว-",'):
            line = line.replace('อสมาหารทวันทว-",', 'อสมาหารทวันทวสมาส",')
            changes += 1
            print(f"Fixed truncated line {i+1}: อสมาหารทวันทว- -> อสมาหารทวันทวสมาส")
            
        # 8. ...ตุลยาธิกรณพหุพ-", -> ...ตุลยาธิกรณพหุพพิหิสมาส",
        elif stripped.endswith('ตุลยาธิกรณพหุพ-",'):
            line = line.replace('ตุลยาธิกรณพหุพ-",', 'ตุลยาธิกรณพหุพพิหิสมาส",')
            changes += 1
            print(f"Fixed truncated line {i+1}: ตุลยาธิกรณพหุพ- -> ตุลยาธิกรณพหุพพิหิสมาส")

        new_lines.append(line)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"Total changes made: {changes}")

if __name__ == "__main__":
    file_path = r"d:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js"
    fix_file(file_path)
