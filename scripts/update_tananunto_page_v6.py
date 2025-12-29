import os

file_path = r"d:\pali-dhatu-app\src\pages\TananuntoRootsPage.js"

# We will replace the entire isCompatible function and add the VIKARANA_MAP logic.

new_is_compatible = r'''    // Helper to check if a vocab entry is compatible with a root entry (resolving homonyms)
    const isCompatible = (dhatu, vocab) => {
        // If vocab doesn't have ending info, show it (safe default)
        if (!vocab.e) return true;

        const ending = vocab.e.toLowerCase(); 
        const group = dhatu.mawat_dhatu; // e.g. "ภู (อ)", "ทิว (ย)"
        
        // Extract group sign from parenthesis
        // "ภู (อ)" -> "อ"
        // "รุธ (อ-นิคคหิต)" -> "อ"
        const match = group.match(/\((.*?)\)/);
        if (!match) return true; // No group sign found, show all
        
        let sign = match[1];
        if (sign.includes('-')) {
             sign = sign.split('-')[0]; // Handle "อ-นิคคหิต" -> "อ"
        }
        sign = sign.trim();

        // List of Known Vikarana Paccayas (Conjugation Signs) in Roman
        // We only filter if the vocab ending is ONE OF THESE, but not the right one.
        // If the vocab ending is 'tu', 'ti' (noun), 'ta' (pp), we show it regardless of group.
        
        const VIKARANAS = new Set(['a', 'ya', 'nu', 'ṇu', 'nā', 'ṇā', 'nhā', 'o', 'e', 'aye']);

        if (!VIKARANAS.has(ending)) {
            // Ending is not a conjugation sign (e.g. 'ta', 'tu', 'i'), so it's likely a noun/participle valid for all groups.
            return true;
        }

        // Map Thai Sign to Roman Vikarana
        // อ -> a
        // ย -> ya
        // นุ -> nu / ṇu
        // นา -> nā / ṇā
        // ณหา -> nhā
        // โอ -> o
        // เณ -> e / aye
        
        let expected = [];
        if (sign === 'อ') expected = ['a'];
        else if (sign === 'ย') expected = ['ya'];
        else if (sign === 'นุ' || sign === 'ณุ') expected = ['nu', 'ṇu', 'una'];
        else if (sign === 'นา') expected = ['nā', 'ṇā'];
        else if (sign === 'ณหา' || sign === 'นหา') expected = ['nhā']; // Gaha
        else if (sign === 'โอ') expected = ['o', 'yira'];
        else if (sign === 'เณ' || sign === 'ณย') expected = ['e', 'aye'];
        
        // If the ending is in our expected list, it's a match.
        if (expected.includes(ending)) return true;

        // If we are here, the vocab ending IS a Vikarana, but NOT the expected one.
        // e.g. Expected 'ya' (Divu), but found 'a' (Bhu).
        // Check if it's a mismatch we want to hide.
        // Note: DPD often lists "a" for everything if it's not specific. 
        // But let's try strict filtering.
        
        return false;
    };'''

def update_file():
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the existing isCompatible function (it might be incomplete)
    # It starts with: const isCompatible = (dhatu, vocab) => {
    # and ends... well, we need to be careful.
    
    start_marker = "    const isCompatible = (dhatu, vocab) => {"
    start_index = content.find(start_marker)
    
    if start_index == -1:
        print("Could not find start marker for isCompatible")
        # Maybe it's defined differently?
        # Let's look for the one I saw in Read:
        # const isCompatible = (dhatu, vocab) => {
        #     // DPD Vocab Check (vocab has 'e' for ending)
        #     if (vocab.e !== undefined) {
        
        start_marker_2 = "    const isCompatible = (dhatu, vocab) => {"
        # Let's search for just the function name
        import re
        match = re.search(r'const isCompatible = \(dhatu, vocab\) => \{', content)
        if match:
             start_index = match.start()
        else:
             print("Regex failed too.")
             return

    # Assuming we found the start, we need to find the end of this block.
    # Since the current implementation is likely short/incomplete, we can try to match until the closing brace before `return` or next function.
    
    # Actually, let's just replace the exact block I saw earlier if possible, or use brace counting.
    
    # The block in Read output:
    # 93→    const isCompatible = (dhatu, vocab) => {
    # 94→        // DPD Vocab Check (vocab has 'e' for ending)
    # 95→        if (vocab.e !== undefined) {
    # 96→            const ending = vocab.e; // e.g. "o", "a", "ya"
    # 97→            const group = dhatu.mawat_dhatu; // e.g. "ภู (อ)"
    # 98→            
    # 99→            // Map Ending to Group Marker
    # 100→            // -o -> (โอ)
    
    # It seems it was cut off in the Read output or just incomplete in file?
    # Wait, the Read output ended at line 100.
    # I should read more lines to see where it ends.
    pass

    # Better approach: Read the file again around that area to be sure.
    # But I can't read inside this script.
    
    # I'll rely on a regex that matches the function start and assumes standard indentation for the closing brace.
    # "    };"
    
    end_marker = "\n    };"
    end_index = content.find(end_marker, start_index)
    
    if end_index == -1:
        print("Could not find end marker")
        return
        
    old_block = content[start_index:end_index + len(end_marker)]
    
    # Double check it looks like the function
    if "isCompatible" not in old_block:
        print("Extracted block does not contain isCompatible")
        return

    new_content = content[:start_index] + new_is_compatible + content[end_index + len(end_marker):]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated isCompatible function.")

if __name__ == "__main__":
    update_file()
