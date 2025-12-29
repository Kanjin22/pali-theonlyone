
import os

file_path = r"d:\pali-dhatu-app\src\pages\TananuntoRootsPage.js"

new_content = """import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import tananuntoVocabMap from '../data/tananunto-vocab-map';

import vocabRootsDpdDerivedEnriched from '../data/vocab-roots-dpd-derived-enriched';
// PaliScript is still useful for other things, though less needed for DPD lookup now
import PaliScript from '../utils/paliScript';

function TananuntoRootsPage() {
    const [allDhatus, setAllDhatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [displayLimit, setDisplayLimit] = useState(20);
    const [showDpd, setShowDpd] = useState(true);

    // Get keys from the map as the authoritative list
    const tananuntoKeys = useMemo(() => new Set(Object.keys(tananuntoVocabMap)), []);
    const dpdKeys = useMemo(() => Object.keys(vocabRootsDpdDerivedEnriched), []);

    useEffect(() => {
        const fetchData = async () => {
            // Try to load from localStorage first to save reads
            const cachedData = localStorage.getItem('dhatu_cache_v2');
            const cachedTime = localStorage.getItem('dhatu_cache_time_v2');
            const NOW = new Date().getTime();
            const ONE_DAY = 24 * 60 * 60 * 1000;

            let data = [];

            if (cachedData && cachedTime && (NOW - cachedTime < ONE_DAY)) {
                data = JSON.parse(cachedData);
            } else {
                try {
                    const q = query(collection(db, 'dhatu'), orderBy('anukrom_dhatu'));
                    const snapshot = await getDocs(q);
                    data = snapshot.docs.map(doc => ({
                        id: doc.id,
                        dhatu_word: doc.data().dhatu_word,
                        arth_thai: doc.data().arth_thai,
                        arth_pali: doc.data().arth_pali,
                        mawat_dhatu: doc.data().mawat_dhatu,
                        anukrom_dhatu: doc.data().anukrom_dhatu,
                        udaharana: doc.data().udaharana
                    }));
                    
                    // Cache it
                    localStorage.setItem('dhatu_cache_v2', JSON.stringify(data));
                    localStorage.setItem('dhatu_cache_time_v2', NOW);
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            }

            // Filter only roots that exist in our Tananunto Map
            const filtered = data.filter(d => {
                const word = d.dhatu_word ? d.dhatu_word.trim() : "";
                return tananuntoKeys.has(word);
            });
            
            setAllDhatus(filtered);
            setLoading(false);
        };

        fetchData();
    }, [tananuntoKeys]);

    // Helper to find DPD vocab for a Thai root
    // Now using direct Thai keys from vocabRootsDpdDerivedEnriched
    const getDpdVocab = (thaiRoot) => {
        if (!thaiRoot) return [];
        return vocabRootsDpdDerivedEnriched[thaiRoot] || [];
    };

    // Helper to check if a vocab entry is compatible with a root entry (resolving homonyms)
    const isCompatible = (dhatu, vocab) => {
        // If vocab doesn't have ending info, show it (safe default)
        if (!vocab.e) return true;

        const ending = vocab.e.toLowerCase(); 
        const group = dhatu.mawat_dhatu || ""; // e.g. "ภู (อ)", "ทิว (ย)"
        
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
    };

    // Enhanced Filter Logic
    const filteredData = useMemo(() => {
        if (!searchText) return allDhatus;
        const searchTrimmed = searchText.trim().toLowerCase();
        
        return allDhatus.filter(d => {
            const rootWord = d.dhatu_word ? d.dhatu_word.trim() : "";
            
            // 1. Check Root Name
            if (rootWord.includes(searchTrimmed)) return true;
            
            // 2. Check Root Meaning (Thai/Pali)
            if (d.arth_thai && d.arth_thai.includes(searchTrimmed)) return true;
            if (d.arth_pali && d.arth_pali.includes(searchTrimmed)) return true;
            
            // 3. Check Vocab Words in Tananunto Map (ONLY Compatible ones)
            let vocabList = tananuntoVocabMap[rootWord];
            if (vocabList) {
                // Pre-filter by compatibility
                vocabList = vocabList.filter(v => isCompatible(d, v));
                
                // Check if ANY compatible word in the list matches
                const hasMatch = vocabList.some(v => 
                    v.word.includes(searchTrimmed) || v.def.includes(searchTrimmed)
                );
                if (hasMatch) return true;
            }
            
            return false;
        });
    }, [allDhatus, searchText]);

    const displayedData = filteredData.slice(0, displayLimit);

    const handleLoadMore = () => {
        setDisplayLimit(prev => prev + 20);
    };

    if (loading) return <LoadingSpinner loading={loading} />;

    return (
        <main className="Search-page-container">
            <div className="search-hero">
                <h1 style={{ fontSize: "min(2rem, 7vw)" }}>ธาตุในพจนานุกรมธรรมบท ๑-๘</h1>
                
                <div style={{ marginBottom: "20px" }}>
                     <Link to="/" className="vocab-search-link" style={{ 
                        display: 'inline-block',
                        backgroundColor: '#7f8c8d', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '30px', 
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s'
                    }}>
                        <i className="fas fa-home"></i> กลับหน้าหลัก
                    </Link>
                </div>

                <p>พบธาตุจำนวน {allDhatus.length} ตัว ที่ปรากฏในพจนานุกรมธรรมบท</p>
                
                <div className="search-controls">
                    <div className="control-group" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <label>ค้นหา (ธาตุ / คำแปล / ศัพท์ในธรรมบท)</label>
                        <div className="input-group" style={{ display: 'flex', gap: '8px', width: '100%' }}>
                            <input 
                                type="text" 
                                placeholder="เช่น กร, ทำ, กโรติ..." 
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="search-input"
                                style={{ flex: 1, backgroundColor: '#f8f9fa', border: '2px solid #bdc3c7' }}
                            />
                            <button className="search-btn" style={{ 
                                padding: '0 20px', 
                                backgroundColor: '#27ae60', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px', 
                                cursor: 'pointer',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="results-grid" style={{ gridTemplateColumns: '1fr' }}> 
                {displayedData.map(dhatu => {
                    const rootWord = dhatu.dhatu_word ? dhatu.dhatu_word.trim() : "";
                    let vocabList = tananuntoVocabMap[rootWord] || [];
                    let dpdList = showDpd ? getDpdVocab(rootWord) : [];
                    
                    // Filter by compatibility (Resolve Homonyms)
                    vocabList = vocabList.filter(v => isCompatible(dhatu, v));
                    dpdList = dpdList.filter(v => isCompatible(dhatu, v));
                    
                    const searchTrimmed = searchText.trim().toLowerCase();

                    // Logic: 
                    // 1. If Root Name or Meaning matches search -> Show ALL compatible vocab
                    // 2. If Root doesn't match, but vocab matches -> Show ONLY matching compatible vocab
                    
                    const rootMatches = 
                        (rootWord.includes(searchTrimmed)) ||
                        (dhatu.arth_thai && dhatu.arth_thai.includes(searchTrimmed)) ||
                        (dhatu.arth_pali && dhatu.arth_pali.includes(searchTrimmed));

                    if (searchText && !rootMatches) {
                         // Filter vocab list to show only matches
                         vocabList = vocabList.filter(v => 
                            v.word.includes(searchTrimmed) || v.def.includes(searchTrimmed)
                         );
                         dpdList = dpdList.filter(v => v.w.toLowerCase().includes(searchTrimmed) || (v.d && v.d.toLowerCase().includes(searchTrimmed)));
                    }
                    
                    // If filtering resulted in empty list (and root didn't match), 
                    // this block shouldn't be rendered due to parent filter, but safe to check.
                    if (vocabList.length === 0 && dpdList.length === 0 && !rootMatches) return null;

                    return (
                        <div key={dhatu.id} className="dhatu-card-mini" style={{ 
                            width: '100%', 
                            maxWidth: '800px', 
                            margin: '0 auto 20px auto',
                            display: 'block',
                            cursor: 'default',
                            textAlign: 'left'
                        }}>
                            {/* Card Header: Root Info */}
                            <div className="card-top" style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <Link to={`/dhatu/${dhatu.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <span className="dhatu-name" style={{ fontSize: '1.5rem', color: '#2c3e50' }}>{dhatu.dhatu_word}</span>
                                    </Link>
                                    <span className="group-badge">{dhatu.mawat_dhatu}</span>
                                    <span className="thai-meaning" style={{ fontSize: '1.1rem', color: '#7f8c8d' }}>
                                        {dhatu.arth_thai} {dhatu.arth_pali ? `(${dhatu.arth_pali})` : ''}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body: Tananunto Vocab List */}
                            <div className="vocab-list">
                                <h4 style={{ margin: '10px 0', color: '#8e44ad', fontSize: '1rem' }}>
                                    <i className="fas fa-book"></i> ศัพท์ในธรรมบท ({vocabList.length})
                                </h4>
                                <div style={{ 
                                    maxHeight: '300px', 
                                    overflowY: 'auto', 
                                    backgroundColor: '#f9f9f9', 
                                    padding: '10px', 
                                    borderRadius: '8px',
                                    border: '1px solid #eee'
                                }}>
                                    {vocabList.length > 0 ? (
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {vocabList.map((v, idx) => (
                                                <li key={idx} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px dashed #e0e0e0' }}>
                                                    <strong style={{ color: '#c0392b' }}>{v.word}</strong>
                                                    <span style={{ color: '#34495e', marginLeft: '5px' }}>
                                                        {v.def.replace(v.word, '').trim().replace(/^:\s*/, '')} 
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span style={{ color: '#95a5a6' }}>ไม่มีรายการศัพท์ที่ตรงกับคำค้นหา</span>
                                    )}
                                </div>
                            </div>
                            {/* DPD Vocab List */}
                            {dpdList.length > 0 && (
                                <div className="vocab-list-dpd" style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                                    <h4 style={{ margin: '10px 0', color: '#2980b9', fontSize: '1rem' }}>
                                        <i className="fas fa-globe"></i> ศัพท์จาก DPD ({dpdList.length})
                                    </h4>
                                    <div style={{ 
                                        maxHeight: '200px', 
                                        overflowY: 'auto', 
                                        backgroundColor: '#ecf0f1', 
                                        padding: '10px', 
                                        borderRadius: '8px',
                                        fontSize: '0.9rem'
                                    }}>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {dpdList.map((v, idx) => (
                                                <li key={idx} style={{ marginBottom: '5px', paddingBottom: '5px', borderBottom: '1px dashed #bdc3c7' }}>
                                                    <strong style={{ color: '#c0392b' }}>{v.w}</strong>
                                                    {v.e && <span style={{ fontSize: '0.8em', color: '#7f8c8d', marginLeft: '5px' }}>[{v.e}]</span>}
                                                    <span style={{ color: '#34495e', marginLeft: '5px' }}>
                                                        {v.d ? v.d.replace(/<[^>]*>/g, '') : ''}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
    
                        </div>
                    );
                })}
            </div>

            {displayedData.length < filteredData.length && (
                <button onClick={handleLoadMore} className="load-more-btn">
                    แสดงเพิ่มเติม
                </button>
            )}
            
            {filteredData.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '40px', color: '#7f8c8d' }}>
                    ไม่พบข้อมูลที่ค้นหา
                </div>
            )}
        </main>
    );
}

export default TananuntoRootsPage;
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Updated TananuntoRootsPage.js successfully")
