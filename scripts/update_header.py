
import os

HEADER_JS_PATH = r"D:\pali-dhatu-app\src\components\Header.js"

content = """
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

with open(HEADER_JS_PATH, "w", encoding="utf-8") as f:
    f.write(content.strip())

print("Header.js updated.")
