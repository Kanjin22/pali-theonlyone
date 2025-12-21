import glob
import os

def fix_typos():
    files = glob.glob('data/data-pt12*.js')
    print(f"Found {len(files)} files to check.")
    
    replacements = {
        'factivity': 'activity',
        'ileNote': 'fileNote',
        'ileExam': 'fileExam',
        'ileAnswer': 'fileAnswer',
        'ffile': 'file', # just in case
        'aactivity': 'activity' # just in case
    }
    
    for file_path in files:
        print(f"Processing {file_path}...")
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for old, new in replacements.items():
            if old in new_content:
                print(f"  Replacing '{old}' with '{new}'")
                new_content = new_content.replace(old, new)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("  Saved changes.")
        else:
            print("  No changes needed.")

if __name__ == "__main__":
    fix_typos()
