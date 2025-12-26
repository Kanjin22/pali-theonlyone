
const PaliLookup = {
    lookup: function(word, databases) {
        if (!word) return null;
        const cleanWord = word.replace(/[“"'(‘)”"'.ฯ,;:?’]+/g, '').trim();
        if (!cleanWord) return null;

        // 1. Exact Match
        let result = this.checkAll(cleanWord, databases);
        if (result) return result;

        // 2. Normalize and check (remove leading/trailing spaces, maybe zero-width spaces)
        // (Already trimmed)

        // 3. Smart Suffix Stripping
        const candidates = this.generateCandidates(cleanWord);
        for (const candidate of candidates) {
            result = this.checkAll(candidate, databases);
            if (result) {
                // Add note that we found it via stemming
                result._stemmedFrom = cleanWord;
                return result;
            }
        }

        // 4. Sandhi Splitting
        const sandhiResult = this.splitSandhi(cleanWord, databases);
        if (sandhiResult) return sandhiResult;

        return null;
    },

    splitSandhi: function(word, dbs) {
        // Convert to Roman if Thai
        let roman = word;
        if (/[ก-ฮ]/.test(word)) {
            if (typeof PaliScript !== 'undefined' && PaliScript.thaiToRoman) {
                roman = PaliScript.thaiToRoman(word);
            } else {
                return null;
            }
        }
        
        if (!roman || roman.length < 4) return null;
        
        // Loop split points
        for (let i = 2; i < roman.length - 1; i++) {
            let p1 = roman.substring(0, i);
            let p2 = roman.substring(i);
            
            // 1. Exact Split
            let r1 = this.checkPart(p1, dbs);
            let r2 = this.checkPart(p2, dbs);
            if (r1 && r2) return this.formatSandhiResult(p1, p2, r1, r2);
            
            // 2. m -> ṃ (e.g. evametaṃ -> evaṃ + etaṃ)
            if (p1.endsWith('m')) {
                let p1m = p1.slice(0, -1) + 'ṃ';
                let r1m = this.checkPart(p1m, dbs);
                if (r1m && r2) return this.formatSandhiResult(p1m, p2, r1m, r2);
            }
            
             // 3. d -> ṃ (e.g. etadavoca -> etaṃ + avoca)
            if (p1.endsWith('d')) {
                let p1d = p1.slice(0, -1) + 'ṃ';
                let r1d = this.checkPart(p1d, dbs);
                if (r1d && r2) return this.formatSandhiResult(p1d, p2, r1d, r2);
            }
        }
        return null;
    },
    
    checkPart: function(romanWord, dbs) {
        // 1. Check Thai DB (vocabTananunto) via romanToThai FIRST
        if (typeof PaliScript !== 'undefined' && PaliScript.romanToThai) {
            let thaiWord = PaliScript.romanToThai(romanWord);
            let res = this.checkAll(thaiWord, dbs);
            if (res) return { source: 'thai', data: res };
        }

        // 2. Check Roman DB (vocabSC) SECOND
        if (dbs.sc && dbs.sc[romanWord]) return { source: 'sc', data: dbs.sc[romanWord] };
        
        return null;
    },
    
    formatSandhiResult: function(w1, w2, r1, r2) {
        const d1 = this.extractDef(r1);
        const d2 = this.extractDef(r2);
        return {
            split: `${w1} + ${w2}`,
            details: [
                `<span style="color:#e67e22;"><b>${w1}</b></span>: ${d1}`,
                `<span style="color:#27ae60;"><b>${w2}</b></span>: ${d2}`
            ],
            _stemmedFrom: null
        };
    },
    
    extractDef: function(r) {
        if (r.source === 'sc') return r.data.definition;
        if (r.source === 'thai') {
             if (r.data.details && r.data.details.length > 0) return r.data.details[0];
             return "พบในพจนานุกรมไทย";
        }
        return "";
    },

    checkAll: function(key, dbs) {
        // Priority order can be adjusted here
        if (dbs.newgen && dbs.newgen[key]) return { ...dbs.newgen[key], source: 'Thai New Gen', word: key };
        if (dbs.tananunto && dbs.tananunto[key]) return { details: [dbs.tananunto[key]], source: 'พจนานุกรม บาลี-ไทย', word: key };
        if (dbs.general && dbs.general[key]) return { ...dbs.general[key], source: 'ศัพท์ทั่วไป', word: key };
        if (dbs.akhyata && dbs.akhyata[key]) return { ...dbs.akhyata[key], source: 'อาขยาต', word: key };
        if (dbs.kitaka && dbs.kitaka[key]) return { ...dbs.kitaka[key], source: 'กิริยากิตก์', word: key };
        if (dbs.samasa && dbs.samasa[key]) return { ...dbs.samasa[key], source: 'สมาส', word: key };
        if (dbs.taddhita && dbs.taddhita[key]) return { ...dbs.taddhita[key], source: 'ตัทธิต', word: key };
        return null;
    },

    generateCandidates: function(word) {
        let candidates = [];
        const len = word.length;

        // --- 1. Common Endings in Thai Pali Script ---
        
        // --- Vowel Transformations (Thai Script Specific) ---
        // Ex: ปุริโส -> ปุริส (remove โ... and keep consonant)
        // 'โ' is typically at index len-2.
        if (len >= 2) {
            const last = word[len-1];
            const secondLast = word[len-2];
            
            // Case -o (สระโอ): ปุริโส -> ปุริส
            if (secondLast === 'โ') {
                candidates.push(word.substring(0, len-2) + last);
            }
            // Case -e (สระเอ): กุเล -> กุล
            if (secondLast === 'เ') {
                candidates.push(word.substring(0, len-2) + last);
            }
        }

        // --- 2. Systematic Vowel Substitution (Targeted Strategy) ---
        
        let base = word;
        let originalVowel = ''; // 'o', 'e', 'u', 'uu', 'i', 'ii', 'a', 'aa'
        const lastChar = word.slice(-1);
        
        // Detect and Strip Vowel
        if (['ิ', 'ี', 'ุ', 'ู', 'า'].includes(lastChar)) {
             base = word.slice(0, -1);
             originalVowel = lastChar;
        } else if (len >= 2) {
             const secondLast = word[len-2];
             if (['เ', 'โ', 'ไ'].includes(secondLast)) {
                 base = word.substring(0, len-2) + lastChar;
                 originalVowel = secondLast;
             }
        }
        
        // If no vowel detected (implicitly 'a'), base is word itself
        if (!originalVowel) {
             originalVowel = 'a'; 
        }

        // 3. Scan Dictionary for Matching Roots (Reverse Lookup)
        // This is much safer than guessing. We look for words starting with 'base' in the dictionary.
        // We only do this if we have access to vocabTananunto (global).
        
        if (typeof vocabTananunto !== 'undefined') {
            const potentialMatches = [];
            // Optimize: Instead of iterating all, maybe we just try the most common patterns directly
            // because iterating 11k keys is fast, but let's stick to targeted checks first.
            
            // Actually, let's try the "Smart Guess" first based on Vowel Groups
            // because strict prefix matching might return too many unrelated words.
            
             // Case: O (โอ) -> Try A (อ), then AA (อา)
            if (originalVowel === 'โ') {
                 candidates.push(base);      // ปุริโส -> ปุริส (a)
                 candidates.push(base + 'า'); // ปุริโส -> ปุริสา (aa)
            }
            
            // Case: E (เอ) -> Try A (อ), then AA (อา)
            else if (originalVowel === 'เ') {
                 candidates.push(base);      // กุเล -> กุล (a)
                 candidates.push(base + 'า'); // กญฺเญ -> กญฺญา (aa)
            }
            
            // Case: UU (อู) -> Try U (อุ) FIRST
            else if (originalVowel === 'ู') {
                 candidates.push(base + 'ุ'); // ภิกฺขู -> ภิกฺขุ (u) ** Priority **
            }
            
            // Case: II (อี) -> Try I (อิ) FIRST
            else if (originalVowel === 'ี') {
                 candidates.push(base + 'ิ'); // เศรษฐี -> เศรษฐิ (i) ** Priority **
            }
            
            // Case: U (อุ) -> Try UU (อู)
            else if (originalVowel === 'ุ') {
                 candidates.push(base + 'ู'); 
            }
            
            // Case: I (อิ) -> Try II (อี)
            else if (originalVowel === 'ิ') {
                 candidates.push(base + 'ี');
            }
            
            // Fallback: If original was just a consonant (implicit a), try AA
            else if (originalVowel === 'a') {
                 candidates.push(base + 'า');
            }
            
            // General fallback: Try 'a' for everything else
            if (base !== word) {
                 candidates.push(base);
            }
        } else {
             // Fallback to previous logic if DB not available (should not happen in this context)
             if (base !== word) candidates.push(base);
        }

        // --- Suffix Stripping ---

        // --- Suffix Stripping ---
        
        // Niggahita (ํ) -> -a
        if (word.endsWith('ํ')) {
            candidates.push(word.slice(0, -1)); // กุลํ -> กุล
        }

        // -assa (สฺส)
        if (word.endsWith('สฺส')) {
            candidates.push(word.slice(0, -3)); // ปุริสสฺส -> ปุริส
        }
        
        // -āya (าย)
        if (word.endsWith('าย')) {
            candidates.push(word.slice(0, -2)); // กญฺญาย -> กญฺญ
            candidates.push(word.slice(0, -2) + 'า'); // กญฺญาย -> กญฺญา
        }

        // -ānaṃ (านํ)
        if (word.endsWith('านํ')) {
            candidates.push(word.slice(0, -3)); // ปุริสานํ -> ปุริส
        }

        // -iṃ (ึ) - e.g. นิสฺเสณึ -> นิสฺเสณิ
        if (word.endsWith('ึ')) {
             candidates.push(word.slice(0, -1) + 'ิ'); // นิสฺเสณึ -> นิสฺเสณิ
        }

        // -esu (เสุ)
        if (word.endsWith('เสุ')) {
            // Note: สระเอ is before consonant. ...เสุ implies ...esu.
            // In Thai string: ... + เ + ส + ุ
            // Actually 'เสุ' is unlikely written as combined chars like that in code.
            // It's usually char sequence: เ + ส + ุ
            // So last 3 chars are เ, ส, ุ.
            if (len >= 3 && word[len-3] === 'เ' && word[len-2] === 'ส' && word[len-1] === 'ุ') {
                candidates.push(word.slice(0, -3)); // ปุริเสุ -> ปุริส
            }
        }
        
        // -ā (า)
        if (word.endsWith('า')) {
            candidates.push(word.slice(0, -1)); // กญฺญา -> กญฺญ (might match stem)
        }

        // -i (ิ), -ī (ี), -u (ุ), -ū (ู)
        if (['ิ', 'ี', 'ุ', 'ู'].includes(word.slice(-1))) {
            candidates.push(word.slice(0, -1));
        }

        // -hi, -bhi (หิ, ภิ)
        if (word.endsWith('หิ') || word.endsWith('ภิ')) {
            candidates.push(word.slice(0, -2));
        }

        // -smā, -mhā (สฺมา, มฺหา)
        if (word.endsWith('สฺมา') || word.endsWith('มฺหา')) {
            candidates.push(word.slice(0, -4));
        }

        // -smiṃ (สฺมึ)
        if (word.endsWith('สฺมึ')) {
            candidates.push(word.slice(0, -4));
        }
        // -mhi (มฺหิ)
        if (word.endsWith('มฺหิ')) {
            candidates.push(word.slice(0, -4));
        }

        // Verb Endings (Akhyata)
        // -ti (ติ), -nti (นฺติ)
        if (word.endsWith('ติ')) {
            candidates.push(word.slice(0, -2)); // กโรติ -> กโร
            // Often root is simpler, but dictionary might have 'กโร' or 'กร'.
        }
        if (word.endsWith('นฺติ')) {
            candidates.push(word.slice(0, -4)); // กโรนฺติ -> กโร
        }
        
        // -si (สิ), -tha (ถ), -mi (มิ), -ma (ม)
        if (word.endsWith('สิ') || word.endsWith('มิ')) {
            candidates.push(word.slice(0, -2));
        }
        if (word.endsWith('ถ') || word.endsWith('ม')) {
             candidates.push(word.slice(0, -1));
        }
        
        // Taddhita/Kitaka suffixes commonly found
        // -to (โต)
        if (word.endsWith('โต') && len >= 3 && word[len-2] === 'โ') {
             candidates.push(word.slice(0, -3)); // ...โต -> ... (remove โต)
        }

        return [...new Set(candidates)]; // Unique only
    }
};
