
import os

TARGET_PATH = r'd:\pali-dhatu-app\src\pages\TananuntoRootsPage.js'

NEW_GET_DPD_VOCAB = r'''    // Helper to find DPD vocab for a Thai root
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

def main():
    with open(TARGET_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to replace the existing getDpdVocab function.
    # It starts with "const getDpdVocab = (thaiRoot) => {"
    # And ends before "const isCompatible ="
    
    start_marker = "const getDpdVocab = (thaiRoot) => {"
    end_marker = "const isCompatible ="
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx != -1 and end_idx != -1:
        # Find the last closing brace before end_marker
        # Actually, let's just replace the block if we can identify it clearly.
        # The existing block ends with "return [];\n    };\n\n" usually.
        
        # Let's slice carefully.
        # Check if we can find the exact string to replace or just replace the range.
        
        # To be safe, let's find the closing brace of the function.
        # It's safer to read the file, identify the function lines, and replace.
        
        # Or I can just search for the previous implementation string pattern.
        old_impl_start = content.find(start_marker)
        if old_impl_start == -1:
            print("Could not find getDpdVocab start.")
            return

        # Scan for matching brace is hard without a parser.
        # But we know the next function starts at `const isCompatible =`
        # So we can replace everything from `start_marker` to `const isCompatible` (minus whitespace).
        
        # Check what's between them.
        segment = content[old_impl_start:end_idx]
        # The segment should contain the function body.
        
        # Let's construct the new content.
        new_content = content[:old_impl_start] + NEW_GET_DPD_VOCAB + "\n\n    " + content[end_idx:]
        
        with open(TARGET_PATH, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print("Updated getDpdVocab in TananuntoRootsPage.js")
    else:
        print("Could not find function boundaries.")

if __name__ == "__main__":
    main()
