import sys
import os

def read_file(path):
    encodings = ['cp874', 'utf-8', 'utf-16', 'tis-620', 'iso-8859-11']
    for enc in encodings:
        try:
            print(f"--- Trying {enc} ---")
            with open(path, 'r', encoding=enc) as f:
                content = f.read()
                print(f"Success with {enc}")
                print(content[:1000])
                return
        except Exception as e:
            print(f"Failed with {enc}: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        read_file(sys.argv[1])
    else:
        print("Usage: python read_thai_file.py <path>")
