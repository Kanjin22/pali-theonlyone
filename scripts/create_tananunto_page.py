import os

APP_DIR = r'd:\pali-dhatu-app\src'
PAGES_DIR = os.path.join(APP_DIR, 'pages')
APP_JS_PATH = os.path.join(APP_DIR, 'App.js')
SEARCH_PAGE_PATH = os.path.join(PAGES_DIR, 'SearchPage.js')

TANANUNTO_PAGE_CONTENT = """import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import tananuntoRootKeys from '../data/tananunto-root-keys';

function TananuntoRootsPage() {
    const [allDhatus, setAllDhatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [displayLimit, setDisplayLimit] = useState(20);

    // Tananunto keys set for O(1) lookup
    const tananuntoSet = useMemo(() => new Set(tananuntoRootKeys), []);

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

            // Filter only Tananunto roots
            const filtered = data.filter(d => {
                const word = d.dhatu_word ? d.dhatu_word.trim() : "";
                // Try exact match
                if (tananuntoSet.has(word)) return true;
                
                // Try removing phinthu from data if set has no phinthu
                // Or try removing phinthu from set if data has phinthu?
                // Actually tananunto-root-keys.js was generated from vocab-roots.js keys.
                // Firestore data also comes from vocab-roots.js (via upload script).
                // So keys should match exactly.
                
                return false;
            });
            
            setAllDhatus(filtered);
            setLoading(false);
        };

        fetchData();
    }, [tananuntoSet]);

    // Filter Logic (Search Box)
    const filteredData = useMemo(() => {
        if (!searchText) return allDhatus;
        const searchTrimmed = searchText.trim().toLowerCase();
        
        return allDhatus.filter(d => {
            // Check Dhatu Word
            if (d.dhatu_word && d.dhatu_word.includes(searchTrimmed)) return true;
            // Check Thai Meaning
            if (d.arth_thai && d.arth_thai.includes(searchTrimmed)) return true;
            // Check Pali Meaning
            if (d.arth_pali && d.arth_pali.includes(searchTrimmed)) return true;
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

                <p>พบธาตุจำนวน {allDhatus.length} ตัว ที่ปรากฏในพจนานุกรม</p>
                
                <div className="search-controls">
                    <div className="control-group" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <label>ค้นหาธาตุในรายการนี้</label>
                        <div className="input-group" style={{ display: 'flex', gap: '8px', width: '100%' }}>
                            <input 
                                type="text" 
                                placeholder="พิมพ์ชื่อธาตุ หรือคำแปล..." 
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

            <div className="results-grid">
                {displayedData.map(dhatu => (
                    <Link to={`/dhatu/${dhatu.id}`} key={dhatu.id} className="dhatu-card-mini">
                        <div className="card-top">
                            <span className="dhatu-name">{dhatu.dhatu_word}</span>
                            <span className="group-badge">{dhatu.mawat_dhatu}</span>
                        </div>
                        <div className="dhatu-meaning-container">
                            {dhatu.arth_pali ? <span className="pali-meaning">({dhatu.arth_pali})</span> : null}
                            <span className="thai-meaning"> {dhatu.arth_thai}</span>
                        </div>
                    </Link>
                ))}
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

def update_app_js():
    print(f"Updating {APP_JS_PATH}...")
    with open(APP_JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add Import
    if "import TananuntoRootsPage" not in content:
        content = content.replace("import VocabSearchPage from './pages/VocabSearchPage';", 
                                  "import VocabSearchPage from './pages/VocabSearchPage';\nimport TananuntoRootsPage from './pages/TananuntoRootsPage';")
    
    # 2. Add Route
    if 'path="/tananunto-roots"' not in content:
        content = content.replace('<Route path="/search-vocab" element={<VocabSearchPage />} />', 
                                  '<Route path="/search-vocab" element={<VocabSearchPage />} />\n            <Route path="/tananunto-roots" element={<TananuntoRootsPage />} />')
    
    with open(APP_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print("App.js updated.")

def update_search_page():
    print(f"Updating {SEARCH_PAGE_PATH}...")
    with open(SEARCH_PAGE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add link button
    if "/tananunto-roots" not in content:
        # Find the link to search-vocab and add another one
        search_str = '</Link>'
        replacement = """</Link>
                    <Link to="/tananunto-roots" className="vocab-search-link" style={{ 
                        display: 'inline-block',
                        backgroundColor: '#8e44ad', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '30px', 
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        marginLeft: '10px'
                    }}>
                        📚 ธาตุในธรรมบท
                    </Link>"""
        
        # We need to target the specific Link in the header
        # The Link to /search-vocab has specific styles.
        # Let's replace the whole block if possible or use regex
        
        # Simpler approach: Locate the closing tag of the first Link and append
        # Be careful not to replace all links
        
        # The first link in the file is likely the one in header (based on file read earlier)
        # Line 107: </Link>
        # Line 108: </div>
        
        # Let's replace </div> after the vocab search link
        target = '<Link to="/search-vocab"'
        idx = content.find(target)
        if idx != -1:
            end_idx = content.find('</Link>', idx)
            if end_idx != -1:
                end_tag_end = end_idx + 7
                # Check if we already added it (safety)
                
                content = content[:end_tag_end] + "\n                    " + """<Link to="/tananunto-roots" className="vocab-search-link" style={{ 
                        display: 'inline-block',
                        backgroundColor: '#8e44ad', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '30px', 
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        marginLeft: '10px'
                    }}>
                        📚 ธาตุในธรรมบท
                    </Link>""" + content[end_tag_end:]

    with open(SEARCH_PAGE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print("SearchPage.js updated.")

def main():
    # 1. Create Page
    page_path = os.path.join(PAGES_DIR, 'TananuntoRootsPage.js')
    print(f"Creating {page_path}...")
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(TANANUNTO_PAGE_CONTENT)
    
    # 2. Update App
    update_app_js()
    
    # 3. Update Search Page
    update_search_page()

if __name__ == "__main__":
    main()
