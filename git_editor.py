import sys
import os

file_path = sys.argv[1]
with open(file_path, 'r') as f:
    content = f.read()

# Replace 'pick' with 'edit' for the commit e557daa
content = content.replace('pick e557daa', 'edit e557daa')

with open(file_path, 'w') as f:
    f.write(content)
