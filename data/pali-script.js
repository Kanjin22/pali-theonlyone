const PaliScript = {
    /**
     * Converts Thai Pali script to Roman Pali script.
     * Based on standard Pali transliteration rules.
     * @param {string} text - The text in Thai Pali script.
     * @returns {string} - The text in Roman Pali script.
     */
    thaiToRoman: function(text) {
        if (!text) return "";
        let s = text;

        // 1. Move pre-positioned vowels (เ, โ, ไ, ใ) to after the consonant cluster
        // The pattern matches a pre-vowel, followed by optional (Consonant+Pinthu) sequences, then the main Consonant.
        // Example: เสฺว -> สฺว + เ
        s = s.replace(/([เโไใ])((?:[ก-ฮ]ฺ)*[ก-ฮ])/g, "$2$1");

        // Mapping table
        const map = {
            'ก': 'k', 'ข': 'kh', 'ค': 'g', 'ฆ': 'gh', 'ง': 'ṅ',
            'จ': 'c', 'ฉ': 'ch', 'ช': 'j', 'ฌ': 'jh', 'ญ': 'ñ',
            'ฏ': 'ṭ', 'ฐ': 'ṭh', 'ฑ': 'ḍ', 'ฒ': 'ḍh', 'ณ': 'ṇ',
            'ต': 't', 'ถ': 'th', 'ท': 'd', 'ธ': 'dh', 'น': 'n',
            'ป': 'p', 'ผ': 'ph', 'พ': 'b', 'ภ': 'bh', 'ม': 'm',
            'ย': 'y', 'ร': 'r', 'ล': 'l', 'ว': 'v', 'ส': 's', 'ห': 'h', 'ฬ': 'ḷ', 'อ': 'a',
            'ฮ': 'h',
            '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
            '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9'
        };

        const consonants = "กขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลวสหฬอฮ";
        let res = "";

        for (let i = 0; i < s.length; i++) {
            let c = s[i];

            if (consonants.includes(c)) {
                // Consonants imply an 'a' vowel by default
                if (c === 'อ') {
                    // 'อ' is a placeholder. It maps to 'a' initially.
                    // If followed by a vowel mark, the 'a' will be replaced.
                    // If not, it stays 'a'.
                    res += "a"; 
                } else {
                    res += map[c] + "a";
                }
            } else if (c === 'ฺ') { 
                // Pinthu: Suppresses the inherent 'a' of the previous consonant
                if (res.endsWith('a')) res = res.slice(0, -1);
            } else if (c === 'า' || c === 'ๅ') {
                // Vowel -ā
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'ā';
            } else if (c === 'ิ') {
                // Vowel -i
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'i';
            } else if (c === 'ี') {
                // Vowel -ī
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'ī';
            } else if (c === 'ุ') {
                // Vowel -u
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'u';
            } else if (c === 'ู') {
                // Vowel -ū
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'ū';
            } else if (c === 'เ') {
                // Vowel -e (already moved to correct position)
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'e';
            } else if (c === 'โ') {
                // Vowel -o (already moved)
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'o';
            } else if (c === 'ไ' || c === 'ใ') {
                // Vowel -ai (rare in Pali, but handled)
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'ai';
            } else if (c === 'ํ') {
                // Niggahita (ṃ) - Appends to the vowel, doesn't replace it
                // Ex: กํ -> kam (k+a+m)
                res += 'ṃ';
            } else if (c === 'ะ') {
                // Visarga/Stop - explicitly 'a'. No change needed if 'a' is there.
                // If previous was 'a', keep it.
                if (!res.endsWith('a')) res += 'a'; 
            } else if (c === 'ั') {
                // Mai Han-Akat - explicit 'a' in closed syllable.
                // Ex: กัม -> kam.
                // Treated as 'a'.
                if (!res.endsWith('a')) res += 'a';
            } else if (c === 'ฤ') {
                // R with vowel
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'ṛ';
            } else if (c === 'ฦ') {
                if (res.endsWith('a')) res = res.slice(0, -1);
                res += 'ḷ';
            } else {
                // Other characters (spaces, punctuation)
                // Just append
                if (map[c]) res += map[c];
                else res += c;
            }
        }

        // Special fix for 'อ' mapped to 'a'.
        // If we had 'อ' + 'า' -> 'a' + 'ā' -> 'ā'. Correct.
        // If we had 'อ' + 'ุ' -> 'a' + 'u' -> 'u'. Correct.
        // If we had 'อ' (alone) -> 'a'. Correct.
        
        return res;
    }
};
