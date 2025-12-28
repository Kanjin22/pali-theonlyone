import os

# Define paths
source_vocab = r"d:\pali-theonlyone\data\vocab-roots-dpd-derived.js"
dest_vocab = r"d:\pali-dhatu-app\src\data\vocab-roots-dpd-derived.js"

source_script = r"d:\pali-theonlyone\data\pali-script.js"
dest_script = r"d:\pali-dhatu-app\src\utils\paliScript.js"

def process_and_copy(source, dest, type):
    try:
        with open(source, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if type == "vocab":
            # Change "const vocabRootsDPDDerived =" to "const vocabRootsDPDDerived =" and add export
            if "export default" not in content:
                content += "\n\nexport default vocabRootsDPDDerived;"
        elif type == "script":
            # Change "const PaliScript =" to "const PaliScript =" and add export
            if "export default" not in content:
                content += "\n\nexport default PaliScript;"
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        
        with open(dest, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully copied and updated {dest}")
    except Exception as e:
        print(f"Error processing {source}: {e}")

if __name__ == "__main__":
    process_and_copy(source_vocab, dest_vocab, "vocab")
    process_and_copy(source_script, dest_script, "script")
