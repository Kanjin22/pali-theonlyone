import sys
import re
import glob
import os

def fix_file(filepath):
    print(f"Processing {filepath}...")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return
    
    new_lines = []
    modified_count = 0
    
    for line in lines:
        stripped = line.strip()
        # Check if line starts with property name and contains backticks
        if (stripped.startswith('pali:') or stripped.startswith('thai:')) and '`' in line:
            # Find first and last backtick indices
            first_idx = line.find('`')
            last_idx = line.rfind('`')
            
            # Ensure we have at least two backticks
            if first_idx != -1 and last_idx != -1 and first_idx != last_idx:
                prefix = line[:first_idx+1] # includes first `
                content = line[first_idx+1:last_idx]
                suffix = line[last_idx:] # includes last `
                
                if '`' in content:
                    # Replace inner backticks with single quotes
                    new_content = content.replace('`', "'")
                    new_line = prefix + new_content + suffix
                    new_lines.append(new_line)
                    modified_count += 1
                else:
                    new_lines.append(line)
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)
            
    if modified_count > 0:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
            print(f"Fixed {modified_count} lines in {filepath}")
        except Exception as e:
            print(f"Error writing {filepath}: {e}")
    else:
        print(f"No changes in {filepath}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        patterns = sys.argv[1:]
        for pattern in patterns:
            files = glob.glob(pattern)
            if not files:
                print(f"No files found for pattern: {pattern}")
            for filepath in files:
                fix_file(filepath)
    else:
        print("Usage: python fix_nested_backticks.py <file_pattern>")
