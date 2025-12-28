
import os

APP_JS_PATH = r"D:\pali-dhatu-app\src\App.js"

content = """
// src/App.js

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import DhatuDetail from './components/DhatuDetail';
import SearchPage from './pages/SearchPage';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout หลัก และหน้า Admin ย่อยๆ
import AdminLayout from './components/AdminLayout';
import AdminSubmissions from './pages/AdminSubmissions';
import AdminDhatuManagement from './pages/AdminDhatuManagement';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminAddDhatu from './pages/AdminAddDhatu';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrinciplesPage from './pages/PrinciplesPage';
import FlashcardsPage from './pages/FlashcardsPage';
// import HomePage from './pages/HomePage'; // ไม่ใช้แล้ว ให้ SearchPage เป็นหน้าแรก
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
            {/* หน้าแรกเป็น SearchPage ตามคำขอ */}
            <Route path="/" element={<SearchPage />} />
            
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

            {/* --- Route สำหรับ Admin --- */}
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

with open(APP_JS_PATH, "w", encoding="utf-8") as f:
    f.write(content.strip())

print("App.js updated.")
