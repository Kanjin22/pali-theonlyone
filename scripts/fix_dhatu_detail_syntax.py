
file_path = r'd:\pali-dhatu-app\src\components\DhatuDetail.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The garbage pattern to remove
garbage = """                            </div>
                        </div>
                    );
                  })}
                </div>
              </div>
            )}"""

# We want to remove this garbage.
# However, exact whitespace matching might be tricky if my copy-paste above isn't perfect.
# Let's try to find it.

if garbage in content:
    content = content.replace(garbage, "")
    print("Garbage removed via exact match.")
else:
    print("Garbage not found via exact match. Trying looser cleanup.")
    # The structure is ... )} followed by garbage ... )}
    # We can look for the sequence of lines.
    
    lines = content.split('\n')
    new_lines = []
    skip = False
    
    # We know the garbage starts around line 245 (0-indexed 244)
    # Let's look at the file content again from previous turn.
    # 244:             )}
    # 245:                             </div>
    # ...
    # 251:             )}
    
    # We want to keep 244, remove 245-251.
    
    # Let's verify line 244 is "            )}"
    # and line 245 is "                            </div>"
    
    # Note: split('\n') might affect line numbers if original had different line endings, but usually fine.
    
    # We will iterate and remove the specific block if found.
    
    for i in range(len(lines)):
        # Identifying the start of garbage
        if i < len(lines)-6 and \
           lines[i].strip() == "</div>" and \
           lines[i+1].strip() == "</div>" and \
           lines[i+2].strip() == ");" and \
           lines[i+3].strip() == "})}" and \
           lines[i+4].strip() == "</div>" and \
           lines[i+5].strip() == "</div>" and \
           lines[i+6].strip() == ")}":
            # Found the garbage block!
            # We skip these lines.
            print(f"Found garbage starting at line {i+1}")
            # Skip 7 lines
            # Actually, the loop logic needs to be able to skip.
            # So let's use a while loop or modify list in place (risky).
            pass
            
    # Better: Reconstruct string.
    
    cleaned_lines = []
    i = 0
    while i < len(lines):
        # Check for garbage signature
        is_garbage = False
        if i < len(lines)-6:
             # Check loosely stripped content to be safe
             if lines[i].strip() == "</div>" and \
                lines[i+1].strip() == "</div>" and \
                lines[i+2].strip() == ");" and \
                lines[i+3].strip() == "})}" and \
                lines[i+4].strip() == "</div>" and \
                lines[i+5].strip() == "</div>" and \
                lines[i+6].strip() == ")}":
                 is_garbage = True
        
        if is_garbage:
            print(f"Removing garbage block at line {i+1}")
            i += 7 # Skip the 7 lines of garbage
        else:
            cleaned_lines.append(lines[i])
            i += 1
            
    content = '\n'.join(cleaned_lines)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
