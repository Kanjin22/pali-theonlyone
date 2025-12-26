
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

        return null;
    },

    checkAll: function(key, dbs) {
        // Priority order can be adjusted here
        if (dbs.newgen && dbs.newgen[key]) return { ...dbs.newgen[key], source: 'Thai New Gen' };
        if (dbs.tananunto && dbs.tananunto[key]) return { details: [dbs.tananunto[key]], source: 'พจนานุกรม บาลี-ไทย' };
        if (dbs.general && dbs.general[key]) return { ...dbs.general[key], source: 'ศัพท์ทั่วไป' };
        if (dbs.akhyata && dbs.akhyata[key]) return { ...dbs.akhyata[key], source: 'อาขยาต' };
        if (dbs.kitaka && dbs.kitaka[key]) return { ...dbs.kitaka[key], source: 'กิริยากิตก์' };
        if (dbs.samasa && dbs.samasa[key]) return { ...dbs.samasa[key], source: 'สมาส' };
        if (dbs.taddhita && dbs.taddhita[key]) return { ...dbs.taddhita[key], source: 'ตัทธิต' };
        return null;
    },

    generateCandidates: function(word) {
        let candidates = [];
        const len = word.length;

        // Common Endings in Thai Pali Script
        // NOTE: Order matters! Longer suffixes first to avoid partial matches.
        
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
