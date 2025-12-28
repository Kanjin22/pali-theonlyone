import os

file_path = r'd:\pali-dhatu-app\src\pages\VocabSearchPage.js'

content = """import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import vocabRootsDPDDerived from '../data/vocab-roots-dpd-derived';
import vocabDerivedMeanings from '../data/vocab-derived-meanings';
import PaliScript from '../utils/paliScript';

function VocabSearchPage() {
    const [vocabList, setVocabList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [displayLimit, setDisplayLimit] = useState(50);

    useEffect(() => {
        const prepareData = async () => {
            // 1. Fetch Dhatus to map Root -> ID
            // Check cache first
            let dhatus = [];
            const cachedData = localStorage.getItem('dhatu_cache_v2');
            const cachedTime = localStorage.getItem('dhatu_cache_time_v2');
            const NOW = new Date().getTime();
            const ONE_DAY = 24 * 60 * 60 * 1000;

            if (cachedData && cachedTime && (NOW - cachedTime < ONE_DAY)) {
                dhatus = JSON.parse(cachedData);
            } else {
                try {
                    const q = query(collection(db, 'dhatu'), orderBy('anukrom_dhatu'));
                    const snapshot = await getDocs(q);
                    dhatus = snapshot.docs.map(doc => ({
                        id: doc.id,
                        dhatu_word: doc.data().dhatu_word, // Thai usually
                        // We might need roman logic if dhatu_word is Thai
                    }));
                    // Cache it
                    localStorage.setItem('dhatu_cache_v2', JSON.stringify(dhatus));
                    localStorage.setItem('dhatu_cache_time_v2', NOW);
                } catch (err) {
                    console.error("Error fetching dhatus:", err);
                }
            }

            // Create Map: RomanRoot -> DhatuID
            // Note: Our Dhatu words in DB are Thai. vocabRootsDPDDerived keys are Roman.
            // So convert DB Thai -> Roman
            const rootMap = {};
            dhatus.forEach(d => {
                if (d.dhatu_word) {
                    const roman = PaliScript.thaiToRoman(d.dhatu_word);
                    // Handle cases where Roman might need adjustments (stripping 'a' etc)
                    rootMap[roman] = d;
                    // Also map stripped 'a' version just in case
                    if (roman.endsWith('a')) rootMap[roman.slice(0, -1)] = d;
                }
            });

            // 2. Build Vocab List
            const list = [];
            // vocabRootsDPDDerived: { "root": ["derived1", "derived2"] }
            
            Object.keys(vocabRootsDPDDerived).forEach(rootRoman => {
                const derivedWords = vocabRootsDPDDerived[rootRoman];
                const dhatuInfo = rootMap[rootRoman];
                
                derivedWords.forEach(wordRoman => {
                    const wordThai = PaliScript.romanToThai(wordRoman);
                    const meaning = vocabDerivedMeanings[wordThai];
                    
                    if (meaning) { // Only add if we have a meaning? Or all derived words? 
                        // User wants "Search from Vocabulary". Probably wants to find Root.
                        list.push({
                            wordThai,
                            wordRoman,
                            meaning,
                            rootRoman,
                            rootThai: dhatuInfo ? dhatuInfo.dhatu_word : PaliScript.romanToThai(rootRoman),
                            dhatuId: dhatuInfo ? dhatuInfo.id : null
                        });
                    }
                });
            });

            setVocabList(list);
            setLoading(false);
        };

        prepareData();
    }, []);

    const filteredData = useMemo(() => {
        if (!searchText) return [];
        const lower = searchText.toLowerCase();
        return vocabList.filter(item => 
            item.wordThai.includes(lower) || 
            (item.meaning && item.meaning.includes(lower))
        );
    }, [vocabList, searchText]);

    const displayedData = filteredData.slice(0, displayLimit);

    return (
        <main className="Search-page-container">
             <div className="search-hero" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' }}>
                <h1>สืบค้นศัพท์บาลี (Vocabulary)</h1>
                <div style={{ marginBottom: "15px" }}>
                    <Link to="/search" className="vocab-search-link" style={{ color: '#ecf0f1' }}>⬅ กลับไปค้นหาธาตุ (Root Search)</Link>
                </div>
                
                <div className="search-controls">
                    <div className="control-group" style={{ width: '100%', maxWidth: '600px' }}>
                        <input 
                            type="text" 
                            placeholder="พิมพ์ศัพท์ที่ต้องการค้นหา (เช่น ภวติ, กโรติ)..." 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-input"
                            autoFocus
                        />
                    </div>
                </div>
                <div className="search-results-info">
                    {searchText ? `พบ ${filteredData.length} รายการ` : `มีศัพท์ทั้งหมด ${vocabList.length} คำ ในฐานข้อมูล`}
                </div>
            </div>

            <div className="results-grid" style={{ gridTemplateColumns: '1fr' }}>
                {!searchText && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
                        <i className="fas fa-search" style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}></i>
                        <p>พิมพ์คำศัพท์เพื่อเริ่มค้นหา</p>
                    </div>
                )}
                
                {displayedData.map((item, index) => (
                    <div key={index} className="vocab-card" style={{ 
                        background: 'white', 
                        padding: '15px', 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontFamily: 'Sarabun' }}>{item.wordThai}</h3>
                            <p style={{ margin: 0, color: '#555', fontFamily: 'Sarabun' }}>{item.meaning || '-'}</p>
                        </div>
                        
                        {item.dhatuId ? (
                            <Link to={`/dhatu/${item.dhatuId}`} className="view-root-btn" style={{
                                background: '#27ae60',
                                color: 'white',
                                padding: '8px 15px',
                                borderRadius: '20px',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                whiteSpace: 'nowrap'
                            }}>
                                ดูธาตุ: {item.rootThai}
                            </Link>
                        ) : (
                            <span style={{ color: '#95a5a6', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                                รากศัพท์: {item.rootThai} (ไม่มีในฐานข้อมูล)
                            </span>
                        )}
                    </div>
                ))}
            </div>
             {displayedData.length < filteredData.length && (
                <button onClick={() => setDisplayLimit(p => p + 50)} className="load-more-btn">
                    แสดงเพิ่มเติม
                </button>
            )}
        </main>
    );
}

export default VocabSearchPage;
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("VocabSearchPage.js created.")
