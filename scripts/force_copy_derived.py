import shutil
import os
import time

src = r'd:\pali-theonlyone\data\vocab-roots-dpd-derived.js'
dst = r'd:\pali-dhatu-app\src\data\vocab-roots-dpd-derived.js'

print(f"Copying {src} to {dst}...")

try:
    shutil.copy2(src, dst)
    print("Success!")
except Exception as e:
    print(f"Error: {e}")
    # Try to force by removing destination first
    try:
        if os.path.exists(dst):
            os.remove(dst)
        shutil.copy2(src, dst)
        print("Success on retry!")
    except Exception as e2:
        print(f"Retry failed: {e2}")
