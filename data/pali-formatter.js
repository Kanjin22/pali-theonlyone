// PaliFormatter: Centralized logic for formatting dictionary definitions
// Designed to be portable across projects (e.g., Pali TheOnlyOne, theDhatu)

const PaliFormatter = {
    // Configuration for Grammatical Terms (User can add more here)
    GRAMMAR_TERMS: {
        samasa: [ // สมาส (Compounds)
            "วิเสสนบุพพบท กัมมธารยสมาส",
            "ฉัฏฐีตุลยาธิกรณพหุพพิหิสมาส",
            "กัมมธารยสมาส",
            "พหุพพิหิสมาส",
            "ทวันทวสมาส",
            "ตัปปุริสสมาส",
            "อัพยยีภาวสมาส",
            "ทิคุสมาส"
        ],
        taddhita: [ // ตัทธิต (Derivatives)
            "ตทัสสัตถิตัทธิต",
            "โคตตตัทธิต",
            "ตรตยาทิตัทธิต",
            "ราคาทิตัทธิต",
            "ชาตาทิตัทธิต",
            "สมุหตัทธิต",
            "ฐานตัทธิต",
            "พหุลตัทธิต",
            "เสฏฐตัทธิต"
        ],
        kitaka: [ // นามกิตก์ / กิริยากิตก์ (Verbal Derivatives)
            "นามกิตก์",
            "กิริยากิตก์",
            "กิตก์"
        ]
    },

    /**
     * Formats dictionary definition text with styling and links.
     * @param {string|Array|Object} text - The raw definition text.
     * @param {string} callbackName - The global function name to call when clicking a link (default: 'showDictionaryDefinition').
     * @returns {string} The formatted HTML string.
     */
    format: function(text, callbackName = 'showDictionaryDefinition') {
        if (!text) return "";
        
        // Handle non-string inputs
        if (typeof text !== 'string') {
            if (Array.isArray(text)) return text.map(t => this.format(t, callbackName)).join('<br>');
            if (typeof text === 'object') return JSON.stringify(text);
            text = String(text);
        }

        // 1. Normalize Newlines: Convert \n to <br> and collapse multiple <br>
        let clean = text.replace(/(\r\n|\n|\r)+/g, '<br>'); 
        clean = clean.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>');

        // 2. Normalize Spaces: Collapse multiple spaces to single space
        clean = clean.replace(/[ \t]{2,}/g, ' ');

        // 2.5 Link "See also" (ดู ..., เทียบ ...)
        // Wraps words following "ดู" or "เทียบ" in a clickable span that calls the callback function
        clean = clean.replace(/(^|\s|>)((?:ดู|เทียบ)\s+)([ก-๙\u0E00-\u0E7F]+)/g, 
            `$1$2<span style="color:#3498db; cursor:pointer; text-decoration:underline;" onclick="${callbackName}('$3')">$3</span>`);

        // 3. Formatting (Beauty): Add breaks/styling for key sections
        
        // 3.0 Pre-formatting fixes
        // Break after "แจกได้ใน X ลิงค์" 
        clean = clean.replace(/(แจกได้ใน\s*[๐-๙]+\s*ลิงค์)/g, '$1<br>');

        // 3.0.5 Etymology (มาจาก...) -> New Line + Gray Bold
        clean = clean.replace(/(มาจาก)/g, '<br><span style="color:#7f8c8d; font-weight:bold;">$1</span>');

        // 3.0.6 Word Formation Result (ได้รูป เป็น...) -> Bold
        clean = clean.replace(/(ได้รูป\s*เป็น\s*[ก-๙\.\u0E00-\u0E7F]+)/g, '<span style="color:#2c3e50; font-weight:bold;">$1</span>');

        // 3.1 Declension (แจกเหมือน) -> New Line + Green Bold
        // Enhanced to include preceding gender (ปุ. อิ. นปุ.) if present
        // Updated to ensure gender is preceded by space/start/> to avoid matching inside words
        clean = clean.replace(/((?:(?:^|\s|>)(?:ปุ\.|อิ\.|อิต\.|อิตฺ\.|นปุ\.)\s*)?แจกเหมือน)/g, '<br><span style="color:#16a085; font-weight:bold;">$1</span>');

        // 3.1.5 Gender Sections (Leftover genders not followed by แจกเหมือน) -> New Line + Green Bold
        // Catch ปุ. อิ. อิต. อิตฺ. นปุ. that start a sentence or section
        // Exclude if followed by "แจกเหมือน" (handled by 3.1) to avoid double wrapping
        clean = clean.replace(/(^|\s|>)((?:ปุ|อิ|อิต|อิตฺ|นปุ)\.)(?!\s*แจกเหมือน)/g, '<br><span style="color:#16a085; font-weight:bold;">$2</span>');

        // 3.2 Conditionals and Grammar Descriptions (Combined)
        // Use alternation to prevent "เป็น..." from matching inside "ถ้าเป็น..."
        // Updated: If "ถ้าเป็น..." is immediately followed by "เป็น...", keep them on the same line.
        
        // Build regex pattern from GRAMMAR_TERMS
        const specificTerms = [
            ...this.GRAMMAR_TERMS.samasa, 
            ...this.GRAMMAR_TERMS.taddhita, 
            ...this.GRAMMAR_TERMS.kitaka
        ].sort((a, b) => b.length - a.length).join('|').replace(/\./g, '\\.');

        // Generic fallback: Matches words ending in สมาส/ตัทธิต/กิตก์ (NO SPACES allowed to prevent greedy matching)
        const genericPattern = "[ก-๙\\.]+(?:สมาส|ตัทธิต|กิตก์)";
        
        // Construct the full regex
        // p1: ถ้าเป็น... (Condition)
        // p2: เป็น... (Definition following Condition)
        // p3: ถ้าเป็น... (Condition alone)
        // p4: เป็น... (Definition alone)
        const grammarRegex = new RegExp(
            `(ถ้า\\s*เป็น(?:สมาส|ตัทธิต|กิตก์))(?:\\s*<br\\s*\\/?>\\s*|\\s+)(เป็น(?:${specificTerms}|${genericPattern}))|(ถ้า\\s*เป็น(?:สมาส|ตัทธิต|กิตก์))|(เป็น(?:${specificTerms}|${genericPattern}))`, 
            'g'
        );

        clean = clean.replace(grammarRegex, (match, p1, p2, p3, p4) => {
            if (p1 && p2) {
                // Case 1: "ถ้าเป็น..." followed by "เป็น..." -> Same line (remove break between them)
                return `<br><span style="color:#2980b9; font-weight:bold;">${p1}</span> <span style="color:#8e44ad;">${p2}</span>`;
            } else if (p3) {
                // Case 2: "ถ้าเป็น..." alone -> New Line + Blue Bold
                return `<br><span style="color:#2980b9; font-weight:bold;">${p3}</span>`;
            } else if (p4) {
                // Case 3: "เป็น..." alone -> New Line + Purple
                return `<br><span style="color:#8e44ad;">${p4}</span>`;
            }
            return match;
        });

        // 3.3 Analysis Steps (Chain of abbreviations ending in วิ. or วิ.ว่า) -> New Line + Orange Bold
        // Captures "กฺวิ. กัต. กัต. วิ." or "วิ.ว่า" or "วิ."
        // We look for a sequence of Thai chars + dot + spaces, ending with วิ. or วิ.ว่า
        clean = clean.replace(/(^|\s|>)((?:[ก-๙]+\.\s*)+วิ\.(?:ว่า)?)/g, '<br><span style="color:#d35400; font-weight:bold;">$2</span>');
        
        // Fallback for isolated "วิ.ว่า" if not caught by above complex regex
        clean = clean.replace(/(?<!\.)\s(วิ\.ว่า)/g, '<br><span style="color:#d35400; font-weight:bold;">$1</span>');
        
        // 4. Cleanup excessive breaks (in case we added too many)
        clean = clean.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>');
        
        return clean;
    }
};

// Export for module environments if needed (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaliFormatter;
}
