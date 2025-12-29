
import os

file_path = r"d:\pali-dhatu-app\src\pages\TananuntoRootsPage.js"

new_is_compatible = """    // Helper to check if a vocab entry is compatible with a root entry (resolving homonyms)
    const isCompatible = (dhatu, vocab) => {
        // If vocab has no specific root info, assume it's compatible (legacy behavior)
        if (!vocab.root_info) return true;
        
        const info = vocab.root_info;
        
        // 1. Check Meaning Compatibility
        if (info.meaning && dhatu.arth_thai) {
             const dMean = dhatu.arth_thai.replace(/[.,\s]/g, '');
             const vMean = info.meaning.replace(/[.,\s]/g, '');
             
             // Check if either contains the other
             if (!dhatu.arth_thai.includes(info.meaning) && !info.meaning.includes(dhatu.arth_thai)) {
                 // Double check normalized strings
                 if (!dMean.includes(vMean) && !vMean.includes(dMean)) {
                     return false; 
                 }
             }
        }
        
        // 2. Check Paccaya Compatibility
        // Filter if vocab specifies a conjugation paccaya that conflicts with the Root's Group.
        if (info.paccaya && dhatu.mawat_dhatu) {
            const p = info.paccaya.trim();
            const group = dhatu.mawat_dhatu; // e.g. "ภู (อ)", "ทิว (ย)"
            
            // Map Paccaya to Expected Group Markers
            const conjugationMap = {
                "ย": "ย",      // Div (Ya)
                "ณุ": "ณุ",     // Su (Nu)
                "ณา": "นา",     // Ki (Na)
                "นา": "นา",     // Ki (Na)
                "ณฺหา": "คห",   // Gaha (Nha) - usually marked (คห)
                "โอ": "โอ",     // Tan (O)
                "เณ": "เณ",     // Cur (Ne)
                "ณย": "ณ"      // Cur (Naya) - loose match for (เณ)/(ณย)
            };

            // Only apply if it's a known conjugation paccaya
            if (conjugationMap[p]) {
                const requiredMarker = conjugationMap[p];
                if (!group.includes(requiredMarker)) {
                    // Exception: Cur group might be marked (เณ) but vocab says (ณย) -> Handled by loose match?
                    // "ณ" matches "เณ" and "ณย" somewhat? No.
                    // Let's be strict only on clear mismatches.
                    
                    // If Paccaya is "ย" (Div) and Group is "ภู (อ)" -> Mismatch.
                    return false;
                }
            }
            
            // Special case for "อ" (A) - Bhu/Rudha/Tuda
            if (p === "อ") {
                // If Group is explicitly distinct (Ya, Nu, Na, O, Ne), reject "A"
                if (group.includes("(ย)") || group.includes("(ณุ)") || group.includes("(นา)") || 
                    group.includes("(โอ)") || group.includes("(เณ)")) {
                    return false;
                }
            }
        }
        
        return true;
    };"""

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start and end of the existing isCompatible function
start_marker = "const isCompatible = (dhatu, vocab) => {"
end_marker = "return true;\n    };"

start_idx = content.find(start_marker)
if start_idx != -1:
    # Find the closing brace of the function. 
    # Since we know the structure from previous read, we can target the end block.
    # The previous read showed it ends with:
    #        return true;
    #    };
    
    # We'll search for the next "};" after "return true;"
    end_idx = content.find(end_marker, start_idx)
    
    if end_idx != -1:
        end_idx += len(end_marker)
        
        # Replace the function
        new_content = content[:start_idx] + new_is_compatible + content[end_idx:]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated isCompatible in TananuntoRootsPage.js")
    else:
        print("Could not find end of isCompatible function")
else:
    print("Could not find start of isCompatible function")
