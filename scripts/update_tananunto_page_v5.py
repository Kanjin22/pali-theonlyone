import os

file_path = r"d:\pali-dhatu-app\src\pages\TananuntoRootsPage.js"

new_function = r'''    // Helper to find DPD vocab for a Thai root
    const getDpdVocab = (thaiRoot) => {
        if (!thaiRoot) return [];
        
        // 1. Transliterate to Roman
        const roman = PaliScript.thaiToRoman(thaiRoot);
        if (!roman) return [];

        // 2. Try exact match (e.g. bhū, jī)
        if (vocabRootsDpdDerivedEnriched[roman]) return vocabRootsDpdDerivedEnriched[roman];

        // 3. Try removing final 'a' (common convention: kara -> kar)
        if (roman.endsWith('a')) {
            const short = roman.slice(0, -1);
            if (vocabRootsDpdDerivedEnriched[short]) return vocabRootsDpdDerivedEnriched[short];
        }

        // 4. Try removing final 'u' (common Thai convention: gamu -> gam)
        if (roman.endsWith('u')) {
             const short = roman.slice(0, -1);
             if (vocabRootsDpdDerivedEnriched[short]) return vocabRootsDpdDerivedEnriched[short];
        }

        // 5. Try removing final 'i' (common Thai convention: kakhi -> kakh?)
        // Note: Some roots really end in i like 'ji', but those are handled by exact match.
        // If 'ji' -> 'j', DPD won't match 'j' probably.
        if (roman.endsWith('i')) {
             const short = roman.slice(0, -1);
             if (vocabRootsDpdDerivedEnriched[short]) return vocabRootsDpdDerivedEnriched[short];
        }

        return [];
    };'''

def update_file():
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Locate the start of the function
    start_marker = "    // Helper to find DPD vocab for a Thai root"
    end_marker = "    };"
    
    start_index = content.find(start_marker)
    if start_index == -1:
        print("Could not find start marker")
        return

    # Find the end of the function block
    # We look for the closing brace and semicolon after the start index
    # But since there might be other blocks, we need to be careful.
    # The existing code ends with "        return [];\n    };"
    
    # Let's try to match the exact string block we know exists
    old_function_part = r'''    // Helper to find DPD vocab for a Thai root
    const getDpdVocab = (thaiRoot) => {
        if (!thaiRoot) return [];
        
        // 1. Transliterate to Roman
        const roman = PaliScript.thaiToRoman(thaiRoot);
        if (!roman) return [];

        // 2. Try exact match (unlikely if roman has inherent 'a')
        if (vocabRootsDpdDerivedEnriched[roman]) return vocabRootsDpdDerivedEnriched[roman];

        // 3. Try removing final 'a' (common convention: kara -> kar)
        if (roman.endsWith('a')) {
            const short = roman.slice(0, -1);
            if (vocabRootsDpdDerivedEnriched[short]) return vocabRootsDpdDerivedEnriched[short];
        }

        // 4. Try matching by "begins with" if strict match fails? (Maybe risky)
        // Let's stick to strict mapping for now.
        return [];
    };'''
    
    # Normalize line endings to ensure match
    content_normalized = content.replace('\r\n', '\n')
    old_function_normalized = old_function_part.replace('\r\n', '\n')
    
    if old_function_normalized in content_normalized:
        new_content = content_normalized.replace(old_function_normalized, new_function)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated getDpdVocab function.")
    else:
        print("Could not find exact match for the old function block. Printing snippet from file around start index:")
        print(content[start_index:start_index+500])

if __name__ == "__main__":
    update_file()
