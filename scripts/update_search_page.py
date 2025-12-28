
import os

SEARCH_PAGE_PATH = r"D:\pali-dhatu-app\src\pages\SearchPage.js"

content = """
import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

function SearchPage() {
    const [allDhatus, setAllDhatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('all');
    const [displayLimit, setDisplayLimit] = useState(20);

    // Groups mapping
    const groups = [
        { value: 'all', label: 'ทุกหมวด (All Groups)' },
        { value: 'ภู', label: 'ภูวาทิคณะ (หมวด ภู)' },
        { value: 'รุธ', label: 'รุธาทิคณะ (หมวด รุธ)' },
        { value: 'ทิว', label: 'ทิวาทิคณะ (หมวด ทิว)' },
        { value: 'สุ', label: 'สวาทิคณะ (หมวด สุ)' },
        { value: 'กี', label: 'กิยาทิคณะ (หมวด กี)' },
        { value: 'คห', label: 'คหาทิคณะ (หมวด คห)' },
        { value: 'ตน', label: 'ตนาทิคณะ (หมวด ตน)' },
        { value: 'จุร', label: 'จุราทิคณะ (หมวด จุร)' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            // Try to load from localStorage first to save reads
            const cachedData = localStorage.getItem('dhatu_cache');
            const cachedTime = localStorage.getItem('dhatu_cache_time');
            const NOW = new Date().getTime();
            const ONE_DAY = 24 * 60 * 60 * 1000;

            if (cachedData && cachedTime && (NOW - cachedTime < ONE_DAY)) {
                setAllDhatus(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            try {
                // Fetch simplified data for search
                const q = query(collection(db, 'dhatu'), orderBy('anukrom_dhatu'));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    dhatu_word: doc.data().dhatu_word,
                    arth_thai: doc.data().arth_thai,
                    mawat_dhatu: doc.data().mawat_dhatu,
                    anukrom_dhatu: doc.data().anukrom_dhatu
                }));
                
                setAllDhatus(data);
                // Cache it
                localStorage.setItem('dhatu_cache', JSON.stringify(data));
                localStorage.setItem('dhatu_cache_time', NOW);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter Logic
    const filteredData = useMemo(() => {
        return allDhatus.filter(d => {
            const matchesGroup = selectedGroup === 'all' || (d.mawat_dhatu && d.mawat_dhatu.includes(selectedGroup));
            const searchLower = searchText.toLowerCase();
            const matchesText = !searchText || 
                                d.dhatu_word.toLowerCase().includes(searchLower) || 
                                (d.arth_thai && d.arth_thai.toLowerCase().includes(searchLower));
            return matchesGroup && matchesText;
        });
    }, [allDhatus, selectedGroup, searchText]);

    const displayedData = filteredData.slice(0, displayLimit);

    const handleLoadMore = () => {
        setDisplayLimit(prev => prev + 20);
    };

    if (loading) return <LoadingSpinner loading={loading} />;

    return (
        <main className="Search-page-container">
            <div className="search-hero">
                <h1>สืบค้นธาตุบาลี</h1>
                <p>ค้นหาจาก {allDhatus.length} ธาตุ ในคลังข้อมูล</p>
                
                <div className="search-controls">
                    <div className="control-group">
                        <label>ค้นหาคำ (ธาตุ/คำแปล)</label>
                        <input 
                            type="text" 
                            placeholder="เช่น ภุ, มีความมี..." 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="control-group">
                        <label>หมวดธาตุ (Affix Group)</label>
                        <select 
                            value={selectedGroup} 
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            className="group-select"
                        >
                            {groups.map(g => (
                                <option key={g.value} value={g.value}>{g.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="search-results-info">
                พบ {filteredData.length} รายการ
            </div>

            <div className="results-grid">
                {displayedData.map(dhatu => (
                    <Link to={`/dhatu/${dhatu.id}`} key={dhatu.id} className="dhatu-card-mini">
                        <div className="card-top">
                            <span className="id-badge">#{dhatu.anukrom_dhatu}</span>
                            <span className="group-badge">{dhatu.mawat_dhatu}</span>
                        </div>
                        <h3>{dhatu.dhatu_word}</h3>
                        <p>{dhatu.arth_thai}</p>
                    </Link>
                ))}
            </div>

            {displayedData.length < filteredData.length && (
                <button onClick={handleLoadMore} className="load-more-btn">
                    แสดงเพิ่มเติม
                </button>
            )}
        </main>
    );
}

export default SearchPage;
"""

with open(SEARCH_PAGE_PATH, "w", encoding="utf-8") as f:
    f.write(content.strip())

print("SearchPage.js updated.")
