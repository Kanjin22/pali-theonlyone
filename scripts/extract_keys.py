import re
import json

def extract_keys():
    with open('data/content-dhamma08.js', 'r', encoding='utf-8') as f:
        content = f.read()
        
    pattern = r'"([^"]+)": \[\s*\{\s*part:.*story: "([^"]+)"'
    # The regex needs to be loose enough to catch newlines
    # Using re.DOTALL to let . match newlines
    # But regex in JS file might be tricky.
    # Let's use a simpler approach: finding lines with key and then finding story.
    
    matches = []
    lines = content.split('\n')
    current_key = None
    
    for line in lines:
        line = line.strip()
        key_match = re.match(r'"([^"]+)": \[', line)
        if key_match:
            current_key = key_match.group(1)
            
        story_match = re.match(r'story: "([^"]+)"', line)
        if current_key and story_match:
            story_name = story_match.group(1)
            matches.append({'key': current_key, 'story': story_name})
            current_key = None # Reset
            
    return matches

if __name__ == "__main__":
    keys = extract_keys()
    print(json.dumps(keys, indent=2, ensure_ascii=False))
