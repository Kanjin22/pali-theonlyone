// PaliFormatter: Centralized logic for formatting dictionary definitions
// Designed to be portable across projects (e.g., Pali TheOnlyOne, theDhatu)

const PaliFormatter = {
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

        // 3.1 Declension (แจกเหมือน) -> New Line + Green Bold
        // Enhanced to include preceding gender (ปุ. อิ. นปุ.) if present
        clean = clean.replace(/((?:(?:ปุ\.|อิ\.|นปุ\.)\s*)?แจกเหมือน)/g, '<br><span style="color:#16a085; font-weight:bold;">$1</span>');

        // 3.2 Conditionals and Grammar Descriptions (Combined)
        // Use alternation to prevent "เป็น..." from matching inside "ถ้าเป็น..."
        clean = clean.replace(/(ถ้า\s*เป็น(?:สมาส|ตัทธิต))|(เป็น[ก-๙\.\s]+(?:สมาส|ตัทธิต))/g, (match, p1, p2) => {
            if (p1) {
                // Condition: ถ้าเป็น... -> Blue Bold
                return `<br><span style="color:#2980b9; font-weight:bold;">${p1}</span>`;
            } else if (p2) {
                // Grammar: เป็น... -> Purple
                return `<br><span style="color:#8e44ad;">${p2}</span>`;
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
