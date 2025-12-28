
import os

# 1. Create KathaListPage.js (Copy of HomePage logic)
KATHA_LIST_PATH = r"D:\pali-dhatu-app\src\pages\KathaListPage.js"
SEARCH_PAGE_PATH = r"D:\pali-dhatu-app\src\pages\SearchPage.js"
APP_CSS_PATH = r"D:\pali-dhatu-app\src\App.css"
APP_JS_PATH = r"D:\pali-dhatu-app\src\App.js"
HEADER_JS_PATH = r"D:\pali-dhatu-app\src\components\Header.js"

# --- KathaListPage.js ---
katha_list_content = """
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import KathaRenderer from '../components/KathaRenderer';

function KathaListPage() {
    const [kathas, setKathas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKathas = async () => {
            try {
                const kathaRef = collection(db, 'katha');
                const q = query(kathaRef, orderBy('katha_no'));
                const querySnapshot = await getDocs(q);
                const kathasList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setKathas(kathasList);
            } catch (error) {
                console.error("Error fetching kathas: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchKathas();
    }, []);

    if (loading) {
        return <LoadingSpinner loading={loading} />;
    }

    return (
        <main className="Home-content">
            <div className="page-header">
                <h2>คาถาในคัมภีร์ธาตวัตถสังคหะ</h2>
                <p>รวมบทคาถาแสดงธาตุทั้งหมด จัดเรียงตามลำดับ</p>
            </div>
            <div className="katha-list">
                {kathas.map(katha => (
                    <Link to={`/katha/${katha.id}`} key={katha.id} className="katha-card-link">
                        <div className="katha-card">
                            <div className="katha-header-row">
                                <div className="katha-number">คาถาที่ {katha.katha_no}</div>
                                <span className="dhatu-count-badge">{katha.dhatu_count || 0} ธาตุ</span>
                            </div>
                            
                            <KathaRenderer text={katha.katha_pali} type={katha.katha_type} />
                            
                            <div className="katha-footer">
                                <div className="view-dhatu-btn">ดูรายละเอียด →</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
export default KathaListPage;
"""

# --- SearchPage.js (New Logic) ---
search_page_content = """
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

# --- App.css (Light Theme) ---
app_css_content = """
/* ===== LIGHT THEME: "Modern Classroom" ===== */

:root {
  --primary-color: #3498db;      /* Blue header */
  --primary-dark: #2980b9;
  --accent-color: #e67e22;       /* Orange accents */
  --bg-color: #f8f9fa;           /* Light gray background */
  --card-bg: #ffffff;
  --text-primary: #2c3e50;       /* Dark gray text */
  --text-secondary: #7f8c8d;
  --border-color: #ecf0f1;
  --success-color: #27ae60;
  --font-main: 'Sarabun', sans-serif;
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.1);
  --radius: 12px;
}

body {
  margin: 0;
  font-family: var(--font-main);
  background-color: var(--bg-color);
  color: var(--text-primary);
  line-height: 1.6;
}

.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* --- Header --- */
.App-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.App-header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
  align-items: center;
}

.nav-links a {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-links a:hover, .nav-links a.active {
  background-color: rgba(255,255,255,0.2);
  color: white;
}

.logout-button {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white !important;
  cursor: pointer;
  font-family: var(--font-main);
}

/* --- Search Page --- */
.Search-page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

.search-hero {
  background: white;
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
  text-align: center;
}

.search-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 250px;
}

.control-group label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.search-input, .group-select {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: var(--font-main);
}

.search-input:focus, .group-select:focus {
  border-color: var(--primary-color);
  outline: none;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.dhatu-card-mini {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
}

.dhatu-card-mini:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.card-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.id-badge { background: #eee; padding: 2px 6px; border-radius: 4px; color: #777; }
.group-badge { background: #e8f6f3; color: var(--success-color); padding: 2px 6px; border-radius: 4px; }

.dhatu-card-mini h3 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
  font-size: 1.4rem;
}

.dhatu-card-mini p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.load-more-btn {
  display: block;
  margin: 2rem auto;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.2s;
}

.load-more-btn:hover { background: var(--primary-dark); }

/* --- Katha List Page --- */
.katha-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.katha-card-link { text-decoration: none; color: inherit; }

.katha-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.katha-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }

.katha-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.katha-number { font-weight: bold; color: var(--primary-color); }
.dhatu-count-badge { background: var(--accent-color); color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; }

.katha-footer {
  margin-top: auto;
  text-align: right;
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 500;
  padding-top: 1rem;
}

/* --- Detail Page --- */
.Dhatu-detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.detail-header {
  text-align: center;
  margin-bottom: 2rem;
}

.dhatu-title {
  font-size: 3rem;
  margin: 0.5rem 0;
  color: var(--primary-dark);
}

.anukrom-badge {
  background: var(--accent-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.detail-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.detail-card.full-width { grid-column: 1 / -1; }

.detail-card h2 {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-top: 0;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.detail-card p { font-size: 1.1rem; margin: 0; }
.pali-text { font-family: 'Sarabun', serif; font-size: 1.2rem; }

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: var(--text-secondary);
  text-decoration: none;
}

.back-link:hover { color: var(--primary-color); }

/* Mobile */
@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
  .search-controls { flex-direction: column; }
  .App-header { padding: 1rem; }
  .App-header nav { flex-direction: column; gap: 1rem; }
  .nav-links { flex-wrap: wrap; justify-content: center; }
}

.nowrap-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
"""

# --- App.js ---
app_js_content = """
// src/App.js

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import DhatuDetail from './components/DhatuDetail';
import SearchPage from './pages/SearchPage';
import KathaListPage from './pages/KathaListPage'; // Changed from HomePage
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import AdminSubmissions from './pages/AdminSubmissions';
import AdminDhatuManagement from './pages/AdminDhatuManagement';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminAddDhatu from './pages/AdminAddDhatu';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrinciplesPage from './pages/PrinciplesPage';
import FlashcardsPage from './pages/FlashcardsPage';
import VerseDetailPage from './pages/VerseDetailPage';
import AllDhatusPage from './pages/AllDhatusPage';
import AdminKathaManagement from './pages/AdminKathaManagement';
import AdminAddKatha from './pages/AdminAddKatha';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />

          <Routes>
            {/* 1. Set Home to SearchPage */}
            <Route path="/" element={<SearchPage />} />
            
            {/* 2. Separate Katha List Page */}
            <Route path="/kathas" element={<KathaListPage />} />
            
            {/* Route Aliases */}
            <Route path="/search" element={<SearchPage />} />
            
            <Route path="/all-dhatus" element={<AllDhatusPage />} />
            <Route path="/dhatu/:id" element={<DhatuDetail />} />
            <Route path="/katha/:id" element={<VerseDetailPage />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/principles" element={<PrinciplesPage />} />
            <Route path="/principles/:groupCode" element={<PrinciplesPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminSubmissions />} />
              <Route path="submissions" element={<AdminSubmissions />} />
              <Route path="dhatu-management" element={<AdminDhatuManagement />} />
              <Route path="add-dhatu" element={<AdminAddDhatu />} />
              <Route path="katha-management" element={<AdminKathaManagement />} />
              <Route path="add-katha" element={<AdminAddKatha />} />
              <Route path="user-management" element={<AdminUserManagement />} />
            </Route>
          </Routes>

          <Footer />
          <ToastContainer position="bottom-right" autoClose={4000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
"""

# --- Header.js ---
header_js_content = """
// src/components/Header.js

import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="App-header">
      <nav>
        <div className="logo">
          <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
            <h1>คลังธาตุบาลี</h1>
          </Link>
        </div>
        <ul className="nav-links">
          {/* Updated Links */}
          <li><NavLink to="/" end>ค้นหา</NavLink></li>
          <li><NavLink to="/kathas">รวมคาถา</NavLink></li>
          <li><NavLink to="/all-dhatus">ดัชนีธาตุ</NavLink></li>
          <li><NavLink to="/principles">หลักการ</NavLink></li>
          <li><NavLink to="/flashcards" style={{background: 'rgba(255,255,255,0.1)'}}>ทบทวน</NavLink></li>

          {currentUser ? (
            <>
              <li className="nav-separator" style={{opacity: 0.5}}>|</li>
              <li><NavLink to="/admin" className="admin-link">แผงควบคุม</NavLink></li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-separator" style={{opacity: 0.5}}>|</li>
              <li>
                <Link to="/login" className="login-button">Admin</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
"""

# Helper to write files
def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"Updated: {path}")

# Execute updates
write_file(KATHA_LIST_PATH, katha_list_content)
write_file(SEARCH_PAGE_PATH, search_page_content)
write_file(APP_CSS_PATH, app_css_content)
write_file(APP_JS_PATH, app_js_content)
write_file(HEADER_JS_PATH, header_js_content)
"""

with open("d:\\pali-theonlyone\\scripts\\apply_major_update.py", "w", encoding="utf-8") as f:
    f.write(content)

print("Update script created.")
