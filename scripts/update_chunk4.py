import json
import re

file_path = r'd:\pali-theonlyone\data\raw\vocab-insan-pr9-5-8.js'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip_next = False

for i, line in enumerate(lines):
    if skip_next:
        skip_next = False
        continue

    stripped = line.strip()

    # 1. Add comment before "อาคต"
    if stripped.startswith('"อาคต":'):
        new_lines.append('  // --- Page Chunk 4 (Start) ---\n')
        new_lines.append(line)
        continue

    # 2. Fix "อาคตภาว" and merge with "สมาส"
    if stripped.startswith('"อาคตภาว":'):
        # Get current value content (remove key and quotes)
        current_val = line.split('": "')[1].rstrip('",\n')
        
        # Look ahead for "สมาส" key
        if i + 1 < len(lines):
            next_line = lines[i+1].strip()
            if next_line.startswith('"สมาส":'):
                next_val = next_line.split('": "')[1].rstrip('",\n')
                # Merge: remove "สมาส " if present at start of next_val? No, next_val starts with "วิ. ว่า..."
                # current_val ends with "เป็นฉัฏฐีตัปปุริส"
                # "สมาส" key content is "วิ. ว่า ..."
                # We need to add "สมาส " text? 
                # User input: "... เป็นฉัฏฐีตัปปุริส สมาส วิ.ว่า ..."
                # File: "อาคตภาว": "... เป็นฉัฏฐีตัปปุริส",
                #       "สมาส": "วิ. ว่า ..."
                # So we combine: current_val + "สมาส " + next_val
                
                # Wait, does the "สมาส" key contain the word "สมาส"?
                # Line 58: "สมาส": "วิ. ว่า เหฏฺฐา..."
                # So the word "สมาส" is the key.
                # Combined: "... เป็นฉัฏฐีตัปปุริสสมาส วิ. ว่า ..."
                
                merged_line = f'  "อาคตภาว": "{current_val}สมาส {next_val}",\n'
                new_lines.append(merged_line)
                skip_next = True # Skip the "สมาส" line
                continue

    # 3. Fix "อาคนฺตพฺพํ" and split "อาคนฺตุก ๑/๒"
    if stripped.startswith('"อาคนฺตพฺพํ":'):
        # Extract the full content
        full_content = line.split('": "')[1].rstrip('",\n')
        
        # Find where to split
        # User input ends at "... กตฺตุวาจก"
        # File has "... กตฺตุวาจก อาคนฺตุก ๑ ..."
        
        split_marker = "กตฺตุวาจก อาคนฺตุก ๑"
        if split_marker in full_content:
            parts = full_content.split(split_marker)
            main_part = parts[0] + "กตฺตุวาจก"
            remainder = "อาคนฺตุก ๑" + parts[1]
            
            # Add the corrected main entry
            new_lines.append(f'  "อาคนฺตพฺพํ": "{main_part}",\n')
            
            # Handle the remainder
            # "อาคนฺตุก ๑ น., ปุ. ... อาคนฺตุก ๒ ว. ..."
            # Split 1 and 2
            split_marker_2 = "อาคนฺตุก ๒"
            if split_marker_2 in remainder:
                parts2 = remainder.split(split_marker_2)
                part1 = parts2[0].strip() # "อาคนฺตุก ๑ ..."
                part2 = split_marker_2 + parts2[1] # "อาคนฺตุก ๒ ..."
                
                # Clean up part1 key name from text? No, just use the text as value
                # Key: "อาคนฺตุก ๑"
                # Value: "น., ปุ. ..." (Need to remove the key text from value?)
                # In file: "อาคนฺตุก ๑ น., ปุ. ..."
                # Standard format: Key "X": "definition"
                # So for "อาคนฺตุก ๑", value should start at "น., ปุ."
                val1 = part1.replace("อาคนฺตุก ๑ ", "", 1)
                new_lines.append(f'  "อาคนฺตุก ๑": "{val1}",\n')
                
                # For "อาคนฺตุก ๒"
                val2 = part2.replace("อาคนฺตุก ๒ ", "", 1)
                new_lines.append(f'  "อาคนฺตุก ๒": "{val2}",\n')
            else:
                # Only part 1 found?
                val1 = remainder.replace("อาคนฺตุก ๑ ", "", 1)
                new_lines.append(f'  "อาคนฺตุก ๑": "{val1}",\n')
                
            continue

    # Keep other lines
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Updates applied successfully.")
