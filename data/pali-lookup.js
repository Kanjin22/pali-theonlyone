
const PaliLookup = {
    lookup: function(word, databases, options = {}) {
        if (!word) return null;
        const cleanWord = word.replace(/[“"'(‘)”"'.ฯ,;:?’]+/g, '').trim();
        if (!cleanWord) return null;

        // 0. Manual Root Mapping (User Defined) or Pali Roots Dictionary
        // Enabled only if options.includeRoots is true (per user request)
        if (options.includeRoots && databases.roots && databases.roots[cleanWord]) {
            const rootData = databases.roots[cleanWord];
            
            // NEW: Handle Roots Dictionary (Array of Objects)
            if (Array.isArray(rootData)) {
                 const entries = rootData.map(e => `[${e.group}] ${e.meaning_pali} (${e.meaning_thai})`);
                 return {
                     details: entries,
                     source: 'พจนานุกรมธาตุ',
                     word: cleanWord,
                     data: rootData, 
                     _stemmedFrom: cleanWord
                 };
            }

            const rootWord = rootData;
            let rootResult = this.checkAll(rootWord, databases);
            if (rootResult) {
                rootResult._stemmedFrom = cleanWord;
                rootResult._baseWord = rootWord;
                // Preserve original source but mark as manually mapped if needed
                return rootResult;
            }
        }

        // 1. Exact Match
        let result = this.checkAll(cleanWord, databases);

        // 1.5. Inflected Form Lookup (Thai)
        // Check generated vocab-inflected.js
        if (!result && databases.inflected && databases.inflected[cleanWord]) {
            const baseWord = databases.inflected[cleanWord];
            const baseResult = this.checkAll(baseWord, databases);
            if (baseResult) {
                baseResult._stemmedFrom = cleanWord;
                baseResult._baseWord = baseWord;
                return baseResult;
            }
        }
        
        // 2. Indirect Thai Lookup (via DPD Inflected Base Word)
        // If we didn't find a Thai result (result is null OR result is Roman), try to find base via DPD Inflected
        const isThaiResult = result && (
            result.source === 'พจนานุกรมธรรมบท ภาค ๑-๘ (อ.บุญสืบ อินสาร)' || 
            result.source === 'พจนานุกรมฉบับภูมิพโลภิกขุ' || 
            result.source === 'ปทานุกรมชินกาลมาลินี' || 
            result.source === 'พจนานุกรมทั่วไป (พระไตรปิฎก)' || 
            result.source === 'ศัพท์ทั่วไป'
        );
        
        if (!isThaiResult && databases.dpdInflected) {
             let roman = cleanWord;
             if (/[ก-ฮ]/.test(cleanWord) && typeof PaliScript !== 'undefined' && PaliScript.thaiToRoman) {
                roman = PaliScript.thaiToRoman(cleanWord);
             }
             
             const inflectedDef = databases.dpdInflected[roman];
             if (inflectedDef) {
                 const baseWords = this.extractBaseWords(inflectedDef);
                 for (const base of baseWords) {
                     // Check Thai DB for base word
                     // We use checkAll but verify source is Thai
                     // Convert base (Roman) to Thai for lookup
                     let thaiBase = base;
                     if (typeof PaliScript !== 'undefined' && PaliScript.romanToThai) {
                         thaiBase = PaliScript.romanToThai(base);
                     }
                     
                     const baseResult = this.checkAll(thaiBase, databases);
                    if (baseResult && (
                        baseResult.source === 'พจนานุกรมธรรมบท ภาค ๑-๘ (อ.บุญสืบ อินสาร)' || 
                        baseResult.source === 'พจนานุกรมฉบับภูมิพโลภิกขุ' || 
                        baseResult.source === 'ปทานุกรมชินกาลมาลินี' || 
                        baseResult.source === 'พจนานุกรมทั่วไป (พระไตรปิฎก)' || 
                        baseResult.source === 'ศัพท์ทั่วไป'
                    )) {
                         // Found Thai definition for base word!
                         baseResult._stemmedFrom = cleanWord;
                         baseResult._baseWord = thaiBase; // Record base word
                         return baseResult;
                     }
                 }
             }
        }

        if (result) return result;

        // 3. Normalize and check (remove leading/trailing spaces, maybe zero-width spaces)
        // (Already trimmed)

        // 4. Smart Suffix Stripping & Dictionary Scanning
        const candidates = this.generateCandidates(cleanWord, databases);
        for (const candidate of candidates) {
            result = this.checkAll(candidate, databases);
            if (result) {
                // Add note that we found it via stemming
                result._stemmedFrom = cleanWord;
                return result;
            }
        }

        // 5. Sandhi Splitting
        const sandhiResult = this.splitSandhi(cleanWord, databases);
        if (sandhiResult) return sandhiResult;

        return null;
    },

    extractBaseWords: function(inflectedDef) {
        if (!inflectedDef) return [];
        const parts = inflectedDef.split('<br>');
        const bases = new Set();
        // Regex to match base word at start: "word :" or "word 1 :"
        // Also handles "word: ..."
        const regex = /^([a-zāīūṅñṭḍṇḷṃ]+)(?=\s*(\d+)?\s*:)/i; 
        
        for (const part of parts) {
            const cleanPart = part.trim();
            const match = cleanPart.match(regex);
            if (match) {
                bases.add(match[1]);
            }
        }
        return Array.from(bases);
    },


    splitSandhi: function(word, dbs) {
        // 0. Manual Sandhi/Vocab Check (vocab-sandhi.js)
        if (dbs && dbs.sandhi && dbs.sandhi[word]) {
            const manualData = dbs.sandhi[word];
            // Support both array ["split1", "split2"] and simple string "definition"
            if (Array.isArray(manualData)) {
                return {
                    split: manualData.join(' + '),
                    details: manualData.map(part => {
                        // Try to find definition for each part
                        let def = "";
                        let partRes = this.checkPart(part, dbs);
                        if (partRes) {
                            def = this.extractDef(partRes);
                        }
                        return `<span style="color:#e67e22;"><b>${part}</b></span>: ${def || "-"}`;
                    }),
                    source: 'Manual Sandhi',
                    _stemmedFrom: null
                };
            } else {
                // Treat as direct vocabulary override
                return {
                    details: [manualData],
                    source: 'Manual Vocab',
                    word: word,
                    _stemmedFrom: null
                };
            }
        }

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

        // 2. Check Roman DBs (SC, DPD, PTS, etc. via checkAll)
        return this.checkAll(romanWord, dbs);
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
        if (r.source === 'Digital Pāḷi Dictionary') return r.details[0];
        if (r.source === 'sc') return r.data.definition;
        if (r.source === 'pts') return "PTS Dictionary"; // PTS content is long HTML
        if (r.source === 'dppn') return "DPPN";
        if (r.source === 'dhammika') return "Nature Dictionary";
        if (r.source === 'dpdInflected') return "DPD Inflected";
        if (r.source === 'thai') {
            if (r.data.details && r.data.details.length > 0) return r.data.details[0];
            return "พบในพจนานุกรมไทย";
        }
        return "";
    },
    
    checkAll: function(key, dbs) {
        // Priority 0: Manual Vocab (vocab-sandhi.js)
        if (dbs.sandhi) {
            // Check direct key
            if (dbs.sandhi[key] && typeof dbs.sandhi[key] === 'string') {
                 return { details: [dbs.sandhi[key]], source: 'Manual Vocab', word: key };
            }
            // Check Thai key if Roman input
            if (!/[ก-ฮ]/.test(key) && typeof PaliScript !== 'undefined' && PaliScript.romanToThai) {
                let thaiKey = PaliScript.romanToThai(key);
                if (dbs.sandhi[thaiKey] && typeof dbs.sandhi[thaiKey] === 'string') {
                     return { details: [dbs.sandhi[thaiKey]], source: 'Manual Vocab', word: thaiKey };
                }
            }
        }

        // Priority order adjusted by user request
        
        // 1. Thai Dictionaries (Ordered: Insan-PR9 (1-8), Bhumibalo, Jinakalamalini, General)
        // Note: dbs.insan_pr9 includes both Part 1-4 and Part 5-8 merged in presentation.html
        if (dbs.insan_pr9 && dbs.insan_pr9[key]) return { details: [dbs.insan_pr9[key]], source: 'พจนานุกรมธรรมบท ภาค ๑-๘ (อ.บุญสืบ อินสาร)', word: key };

        // [Priority Override] Try stemming for Insan-PR9 BEFORE checking exact matches in other dictionaries
        // This ensures Dhammapada results are always shown if available, even if the exact word form exists in a lower-priority dictionary (like General).
        if (dbs.insan_pr9 && typeof PaliScript !== 'undefined' && typeof PaliDeclension !== 'undefined') {
            const romanKey = PaliScript.thaiToRoman ? PaliScript.thaiToRoman(key) : key;
            if (PaliDeclension.decompose) {
                 const bases = PaliDeclension.decompose(romanKey);
                 for (const base of bases) {
                     const thaiBase = PaliScript.romanToThai ? PaliScript.romanToThai(base) : base;
                     if (dbs.insan_pr9[thaiBase]) {
                         return { 
                             details: [`<b>${thaiBase}</b> ${dbs.insan_pr9[thaiBase]}`], 
                             source: 'พจนานุกรมธรรมบท ภาค ๑-๘ (อ.บุญสืบ อินสาร)', 
                             word: key 
                         };
                     }
                 }
             }

             // Extra: Vowel Substitution for common cases (e.g. bhājane -> bhājana)
             // This covers simple inflection changes that might be missed by strict declension rules
             const vowelMap = {
                 'e': ['a', 'ā'], 'o': ['a', 'ā'], 
                 'ā': ['a'], 'a': ['ā'], 
                 'i': ['ī'], 'ī': ['i'], 
                 'u': ['ū'], 'ū': ['u'],
                 'ṃ': ['m'], 'm': ['ṃ']
             };
             const lastChar = romanKey.slice(-1);
             if (vowelMap[lastChar]) {
                 const basePrefix = romanKey.slice(0, -1);
                 for (const subChar of vowelMap[lastChar]) {
                     const subRoman = basePrefix + subChar;
                     const subThai = PaliScript.romanToThai ? PaliScript.romanToThai(subRoman) : subRoman;
                     if (dbs.insan_pr9[subThai]) {
                         return { 
                             details: [`<b>${subThai}</b> ${dbs.insan_pr9[subThai]}`], 
                             source: 'พจนานุกรมธรรมบท ภาค ๑-๘ (อ.บุญสืบ อินสาร)', 
                             word: key 
                         };
                     }
                 }
             }
         }

        if (dbs.bhumibalo && dbs.bhumibalo[key]) return { details: [dbs.bhumibalo[key]], source: 'พจนานุกรมฉบับภูมิพโลภิกขุ', word: key };
        if (dbs.jinakalamalini && dbs.jinakalamalini[key]) return { details: [dbs.jinakalamalini[key]], source: 'ปทานุกรมชินกาลมาลินี', word: key };
        
        // General Tripitaka Dictionaries
        if (dbs.general_raw && dbs.general_raw[key]) return { details: [dbs.general_raw[key]], source: 'พจนานุกรมทั่วไป (พระไตรปิฎก)', word: key };
        if (dbs.general && dbs.general[key]) return { ...dbs.general[key], source: 'ศัพท์ทั่วไป', word: key };
        
        // 2. Roman Dictionaries (Ordered: DPD, PTS, SC, Others)
        if (dbs.dpd || dbs.sc || dbs.pts || dbs.dppn || dbs.dhammika || dbs.dpdInflected) {
             let romanKey = key;
             if (/[ก-ฮ]/.test(key) && typeof PaliScript !== 'undefined' && PaliScript.thaiToRoman) {
                 romanKey = PaliScript.thaiToRoman(key);
             }
             
             // Priority 1: DPD (Digital Pāli Dictionary)
             if (dbs.dpd && dbs.dpd[romanKey]) return { details: [dbs.dpd[romanKey]], source: 'Digital Pāli Dictionary (DPD)', word: key };
             
             // Priority 2: PTS (Pali Text Society)
             if (dbs.pts && dbs.pts[romanKey]) return { source: 'pts', data: dbs.pts[romanKey], word: key };
             
             // Priority 3: SC (SuttaCentral)
             if (dbs.sc && dbs.sc[romanKey]) return { source: 'sc', data: dbs.sc[romanKey], word: key };
             
             // Others / Fallbacks
             if (dbs.dpdInflected && dbs.dpdInflected[romanKey]) return { source: 'Digital Pāli Dictionary (DPD Inflected)', data: dbs.dpdInflected[romanKey], word: key };
             if (dbs.dppn && dbs.dppn[romanKey]) return { source: 'dppn', data: dbs.dppn[romanKey], word: key };
             if (dbs.dhammika && dbs.dhammika[romanKey]) return { source: 'dhammika', data: dbs.dhammika[romanKey], word: key };
        }

        return null;
    },

    findAll: function(key, dbs) {
        let results = [];
        
        // 0. Root Dictionary
        if (dbs.roots && dbs.roots[key] && Array.isArray(dbs.roots[key])) {
             const entries = dbs.roots[key].map(e => `[${e.group}] ${e.meaning} ${e.example ? '('+e.example+')' : ''}`);
             results.push({ details: entries, source: 'พจนานุกรมธาตุ', word: key });
        }

        // 1. Thai Dictionaries (Ordered: Insan-PR9, Bhumibalo, Jinakalamalini, General)
        let thaiKey = key;
        if (!/[ก-ฮ]/.test(key) && typeof PaliScript !== 'undefined' && PaliScript.romanToThai) {
            thaiKey = PaliScript.romanToThai(key);
        }
        
        const addT = (db, src, k) => { if (db && db[k]) results.push({ details: [db[k]], source: src, word: k }); };
        const addG = (db, src, k) => { if (db && db[k]) results.push({ ...db[k], source: src, word: k }); };

        addT(dbs.insan_pr9, 'พจนานุกรมธรรมบท ภาค ๑-๘ (อ.บุญสืบ อินสาร)', key);
        addT(dbs.bhumibalo, 'พจนานุกรมฉบับภูมิพโลภิกขุ', key);
        addT(dbs.jinakalamalini, 'ปทานุกรมชินกาลมาลินี', key);
        addT(dbs.general_raw, 'พจนานุกรมทั่วไป (พระไตรปิฎก)', key);
        addG(dbs.general, 'ศัพท์ทั่วไป', key);

        if (thaiKey !== key) {
            addT(dbs.insan_pr9, 'พจนานุกรมธรรมบท ภาค ๑-๘ (อ.บุญสืบ อินสาร)', thaiKey);
            addT(dbs.bhumibalo, 'พจนานุกรมฉบับภูมิพโลภิกขุ', thaiKey);
            addT(dbs.jinakalamalini, 'ปทานุกรมชินกาลมาลินี', thaiKey);
            addT(dbs.general_raw, 'พจนานุกรมทั่วไป (พระไตรปิฎก)', thaiKey);
            addG(dbs.general, 'ศัพท์ทั่วไป', thaiKey);
        }

        // 2. Roman Dictionaries (Ordered: SC, DPD, PTS, Others)
        let romanKey = key;
        if (/[ก-ฮ]/.test(key) && typeof PaliScript !== 'undefined' && PaliScript.thaiToRoman) {
             romanKey = PaliScript.thaiToRoman(key);
        }
        
        if (dbs.sc && dbs.sc[romanKey]) results.push({ source: 'sc', data: dbs.sc[romanKey], word: romanKey });
        if (dbs.dpd && dbs.dpd[romanKey]) results.push({ details: [dbs.dpd[romanKey]], source: 'Digital Pāli Dictionary (DPD)', word: romanKey });
        if (dbs.pts && dbs.pts[romanKey]) results.push({ source: 'pts', data: dbs.pts[romanKey], word: romanKey });
        
        // Others
        if (dbs.dppn && dbs.dppn[romanKey]) results.push({ source: 'dppn', data: dbs.dppn[romanKey], word: romanKey });
        if (dbs.dhammika && dbs.dhammika[romanKey]) results.push({ source: 'dhammika', data: dbs.dhammika[romanKey], word: romanKey });
        if (dbs.dpdInflected && dbs.dpdInflected[romanKey]) results.push({ source: 'dpdInflected', data: dbs.dpdInflected[romanKey], word: romanKey });

        return results;
    },

    generateCandidates: function(word, dbs) {
        let candidates = [];
        
        // --- 1. Roman-based Scanning & Vowel Substitution (Smart & Incremental) ---
        // Convert to Roman -> Scan L-to-R -> Check Dictionary -> Convert back to Thai
        if (typeof PaliScript !== 'undefined' && PaliScript.thaiToRoman && PaliScript.romanToThai) {
             const roman = PaliScript.thaiToRoman(word);
             
             // Helper to push unique Thai candidates
             const add = (r) => {
                 const t = PaliScript.romanToThai(r);
                 if (t !== word && !candidates.includes(t)) candidates.push(t);
             };

             // --- 0. Reverse Declension (Karanta Rules) ---
             // Use PaliDeclension to decompose suffixes based on detailed grammar rules
             if (typeof PaliDeclension !== 'undefined' && PaliDeclension.decompose) {
                 const declensionBases = PaliDeclension.decompose(roman);
                 for (const base of declensionBases) {
                     // Check if base exists in any dictionary to avoid noise
                     let found = false;
                     
                     // 1. Check Roman DBs
                     if (dbs && ((dbs.sc && dbs.sc[base]) || (dbs.dpd && dbs.dpd[base]) || (dbs.pts && dbs.pts[base]) || (dbs.dpdInflected && dbs.dpdInflected[base]))) {
                         found = true;
                     }
                     
                     // 2. Check Thai DBs (if not found in Roman yet, or just to be safe)
                     if (!found && dbs) {
                        const thaiBase = PaliScript.romanToThai(base);
                        if ((dbs.sandhi && dbs.sandhi[thaiBase]) ||
                            (dbs.insan_pr9 && dbs.insan_pr9[thaiBase]) ||
                            (dbs.bhumibalo && dbs.bhumibalo[thaiBase]) ||
                            (dbs.jinakalamalini && dbs.jinakalamalini[thaiBase]) ||
                            (dbs.general && dbs.general[thaiBase]) ||
                            (dbs.general_raw && dbs.general_raw[thaiBase])) {
                            found = true;
                        }
                    }

                     if (found) {
                         add(base);
                     }
                 }
             }

             // Vowel mappings for substitution
             const vowelMap = {
                 'a': ['ā'], 'ā': ['a'],
                 'i': ['ī'], 'ī': ['i'],
                 'u': ['ū'], 'ū': ['u'],
                 'e': ['a', 'ā'],
                 'o': ['a', 'ā'],
                 'ṃ': ['m'], 'm': ['ṃ']
             };

             // Scan Roman string R-to-L (Prioritize Longest Match)
             // Start from full length down to 2
             for (let i = roman.length; i >= 2; i--) {
                 const sub = roman.substring(0, i);
                 
                 // 1. Check exact prefix match (if dictionary has it)
                 // This catches roots hidden inside long words (e.g. bhikkhu inside bhikkhū)
                 if (dbs && ((dbs.sc && dbs.sc[sub]) || (dbs.dpd && dbs.dpd[sub]))) {
                     add(sub);
                 }
                 
                 // 2. Check Vowel Substitution at the current end
                 // This handles inflection changes (e.g. puriso -> purisa)
                 const lastChar = sub.slice(-1);
                 const base = sub.slice(0, -1);
                 
                 if (vowelMap[lastChar]) {
                     for (const subChar of vowelMap[lastChar]) {
                         const candidate = base + subChar;
                         if (dbs && ((dbs.sc && dbs.sc[candidate]) || (dbs.dpd && dbs.dpd[candidate]))) {
                             add(candidate);
                         }
                     }
                 }
             }

             // Additional Heuristic: Force check specific roots for common stems
             // e.g. p -> pu -> pur -> puri -> puris -> purisa
             // This is computationally expensive but requested by user ("แปลงไปเทียบไปเลย")
             // Only do this if no candidates found yet? Or always? 
             // Let's do it L-to-R for "building up" roots
             for (let i = 2; i <= roman.length; i++) {
                const sub = roman.substring(0, i);
                 if (dbs && dbs.sc && dbs.sc[sub]) {
                     add(sub);
                 }
                 // Check substitutions for L-to-R too
                 const lastChar = sub.slice(-1);
                 const base = sub.slice(0, -1);
                 if (vowelMap[lastChar]) {
                     for (const subChar of vowelMap[lastChar]) {
                        const candidate = base + subChar;
                        if (dbs && ((dbs.sc && dbs.sc[candidate]) || (dbs.dpd && dbs.dpd[candidate]))) {
                            add(candidate);
                        }
                    }
                 }
             }
        }

        // --- 2. Suffix Stripping (Complex Endings) ---
        const len = word.length;

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

// Export if module
if (typeof module !== 'undefined') module.exports = PaliLookup;
