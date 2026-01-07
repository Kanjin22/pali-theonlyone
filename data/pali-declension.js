// Auto-generated from d:\pali-declension\js\declension-rules.js
// Maps declined suffix (Roman) to potential base endings (Roman)

var PaliDeclension = {
    // Map: Suffix -> [BaseEnding1, BaseEnding2, ...]
    suffixMap: {
    "o": [
        "a"
    ],
    "ā": [
        "a",
        "ā"
    ],
    "ṃ": [
        "a",
        "e",
        "ā"
    ],
    "e": [
        "a",
        "ā"
    ],
    "ena": [
        "a"
    ],
    "ehi": [
        "a"
    ],
    "ebhi": [
        "a"
    ],
    "assa": [
        "a"
    ],
    "āya": [
        "a",
        "ā"
    ],
    "atthaṃ": [
        "a"
    ],
    "ānaṃ": [
        "a",
        "ā"
    ],
    "asmā": [
        "a"
    ],
    "amhā": [
        "a"
    ],
    "asmiṃ": [
        "a"
    ],
    "amhi": [
        "a"
    ],
    "esu": [
        "a"
    ],
    "a": [
        "a"
    ],
    "i": [
        "i",
        "e"
    ],
    "ayo": [
        "i"
    ],
    "ī": [
        "i",
        "e"
    ],
    "iṃ": [
        "i",
        "e"
    ],
    "inā": [
        "i",
        "e"
    ],
    "īhi": [
        "i",
        "e"
    ],
    "ībhi": [
        "i",
        "e"
    ],
    "issa": [
        "i",
        "e"
    ],
    "ino": [
        "i",
        "e"
    ],
    "īnaṃ": [
        "i",
        "e"
    ],
    "ismā": [
        "i",
        "e"
    ],
    "imhā": [
        "i",
        "e"
    ],
    "ismiṃ": [
        "i",
        "e"
    ],
    "imhi": [
        "i",
        "e"
    ],
    "īsu": [
        "i",
        "e"
    ],
    "inaṃ": [
        "e"
    ],
    "u": [
        "u"
    ],
    "avo": [
        "u"
    ],
    "ū": [
        "u"
    ],
    "uṃ": [
        "u"
    ],
    "unā": [
        "u"
    ],
    "ūhi": [
        "u"
    ],
    "ūbhi": [
        "u"
    ],
    "ussa": [
        "u"
    ],
    "uno": [
        "u"
    ],
    "ūnaṃ": [
        "u"
    ],
    "usmā": [
        "u"
    ],
    "umhā": [
        "u"
    ],
    "usmiṃ": [
        "u"
    ],
    "umhi": [
        "u"
    ],
    "ūsu": [
        "u"
    ],
    "ave": [
        "u"
    ],
    "āyo": [
        "ā"
    ],
    "āhi": [
        "ā"
    ],
    "ābhi": [
        "ā"
    ],
    "āyaṃ": [
        "ā"
    ],
    "āsu": [
        "ā"
    ],
    "iyo": [
        "i",
        "e"
    ],
    "iyā": [
        "i",
        "e"
    ],
    "yā": [
        "i"
    ],
    "iyaṃ": [
        "i",
        "e"
    ],
    "yaṃ": [
        "i"
    ],
    "uyo": [
        "u"
    ],
    "uyā": [
        "u"
    ],
    "uyaṃ": [
        "u"
    ],
    "āni": [
        "a"
    ],
    "īni": [
        "i"
    ],
    "ūni": [
        "u"
    ]
},

    /**
     * Decomposes a word into potential candidates based on declension rules.
     * @param {string} word - Romanized word.
     * @returns {string[]} - List of candidate base words (Roman).
     */
    decompose: function(word) {
        if (!word) return [];
        const candidates = new Set();
        const map = this.suffixMap;
        
        // Iterate suffixes (length 1 to 10)
        for (let len = 1; len <= 10; len++) {
            if (len > word.length) break;
            const suffix = word.slice(-len);
            if (map[suffix]) {
                const bases = map[suffix];
                const stem = word.slice(0, -len);
                bases.forEach(baseEnd => {
                    candidates.add(stem + baseEnd);
                });
            }
        }
        
        return Array.from(candidates);
    }
};

if (typeof window !== 'undefined') window.PaliDeclension = PaliDeclension;
if (typeof module !== 'undefined') module.exports = PaliDeclension;
