import os

# Paths
app_css_path = "D:/pali-dhatu-app/src/App.css"
verse_detail_path = "D:/pali-dhatu-app/src/pages/VerseDetailPage.js"
header_path = "D:/pali-dhatu-app/src/components/Header.js"

# 1. Update App.css (Remove verse background)
try:
    with open(app_css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()

    # Find the rule and replace it
    old_rule = "background-color: #f8f9fa; /* Light bg for readability */"
    new_rule = "background-color: transparent; /* Transparent as requested */"
    
    if old_rule in css_content:
        css_content = css_content.replace(old_rule, new_rule)
        
        # Add styles for the new Dhatu Table in VerseDetail
        table_styles = """
/* Verse Dhatu Table Styles */
.verse-dhatu-table-container {
  overflow-x: auto;
  margin-top: 1rem;
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.verse-dhatu-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Ensure scroll on small screens */
}

.verse-dhatu-table th, .verse-dhatu-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.verse-dhatu-table th {
  background-color: var(--primary-color);
  color: white;
  font-weight: 500;
}

.verse-dhatu-table tr:hover {
  background-color: #f1f1f1;
}

.view-btn-sm {
  background-color: var(--accent-color);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.view-btn-sm:hover {
  background-color: #d35400;
}

.centered-back-link {
    display: block;
    text-align: center;
    margin: 2rem auto;
    width: fit-content;
    padding: 10px 20px;
    background-color: #eee;
    border-radius: 30px;
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
}
.centered-back-link:hover {
    background-color: var(--primary-color);
    color: white;
}
"""
        if ".verse-dhatu-table" not in css_content:
            css_content += table_styles

        with open(app_css_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
        print("Updated App.css")
    else:
        print("Warning: Could not find background-color rule in App.css")

except Exception as e:
    print(f"Error updating App.css: {e}")


# 2. Update Header.js (Remove Dhatu Index)
try:
    with open(header_path, 'r', encoding='utf-8') as f:
        header_content = f.read()

    # Remove the line with /all-dhatus
    if '<li><NavLink to="/all-dhatus">ดัชนีธาตุ</NavLink></li>' in header_content:
        header_content = header_content.replace('<li><NavLink to="/all-dhatus">ดัชนีธาตุ</NavLink></li>', '')
        with open(header_path, 'w', encoding='utf-8') as f:
            f.write(header_content)
        print("Updated Header.js")
    else:
        print("Warning: Could not find Dhatu Index link in Header.js")

except Exception as e:
    print(f"Error updating Header.js: {e}")


# 3. Update VerseDetailPage.js (Remove Search, Use Table, Move Back Button)
try:
    with open(verse_detail_path, 'r', encoding='utf-8') as f:
        v_content = f.read()
    
    # We will rewrite the return part mostly. 
    # And remove searchTerm logic/state if possible, but keeping it unused is safer than partial regex removal unless we do full replace.
    # Let's do a full rewrite of the component to be clean.
    
    new_verse_detail_code = """// src/pages/VerseDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import LoadingSpinner from '../components/LoadingSpinner';
import KathaRenderer from '../components/KathaRenderer';

function VerseDetailPage() {
    const { id } = useParams();
    const [dhatus, setDhatus] = useState([]);
    const [katha, setKatha] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDhatusInKatha = async () => {
            if (!id) return;
            setLoading(true);
            setError('');
            try {
                // 1. Fetch Katha Document
                const kathaRef = doc(db, 'katha', id);
                const kathaSnap = await getDoc(kathaRef);
                
                let currentKatha = null;
                let kathaNo = null;

                if (kathaSnap.exists()) {
                    currentKatha = kathaSnap.data();
                    setKatha(currentKatha);
                    kathaNo = currentKatha.katha_no;
                } else {
                    setError("ไม่พบข้อมูลคาถาที่ระบุ");
                    setLoading(false);
                    return;
                }

                // 2. Fetch Dhatus using katha_no
                if (kathaNo !== null && kathaNo !== undefined) {
                    const dhatusRef = collection(db, 'dhatu');
                    const kathaNoVariants = [kathaNo, String(kathaNo), Number(kathaNo)];
                    const uniqueVariants = [...new Set(kathaNoVariants)];

                    const q = query(dhatusRef, where('katha_no', 'in', uniqueVariants), orderBy('anukrom_dhatu'));
                    
                    const querySnapshot = await getDocs(q);
                    const dhatusList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setDhatus(dhatusList);
                } else {
                    setDhatus([]);
                }

            } catch (err) {
                console.error("Error fetching dhatus in katha: ", err);
                setError("ไม่สามารถดึงข้อมูลธาตุได้ (อาจต้องสร้าง Index ใน Firestore)");
            } finally {
                setLoading(false);
            }
        };
        fetchDhatusInKatha();
    }, [id]);

    if (loading) return <LoadingSpinner loading={loading} />;

    if (error) {
        return (
            <main className="Home-content">
                <h2>เกิดข้อผิดพลาด</h2>
                <p className="error-message">{error}</p>
                <Link to="/kathas" className="back-link">← กลับไปหน้าคาถาทั้งหมด</Link>
            </main>
        );
    }

    return (
        <main className="Home-content">
            {katha && (
                <div className="katha-detail-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="nowrap-title">ธาตุในคาถาที่ {katha.katha_no || id}</h2>
                    <KathaRenderer text={katha.katha_pali} type={katha.katha_type} />
                </div>
            )}

            <div className="dhatu-manager">
                {dhatus.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>ไม่พบข้อมูลธาตุสำหรับคาถานี้</p>
                ) : (
                    <div className="verse-dhatu-table-container">
                        <table className="verse-dhatu-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ธาตุ</th>
                                    <th>คำแปล (ไทย)</th>
                                    <th>หมวด</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dhatus.map(dhatu => (
                                    <tr key={dhatu.id}>
                                        <td>{dhatu.anukrom_dhatu}</td>
                                        <td style={{ fontWeight: 'bold', color: '#2980b9' }}>{dhatu.dhatu_word}</td>
                                        <td>{dhatu.arth_thai}</td>
                                        <td>{dhatu.mawat_dhatu}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Link to={`/dhatu/${dhatu.id}`} className="view-btn-sm">
                                                ดู
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            <Link to="/kathas" className="centered-back-link">
                ← กลับไปหน้ารวมคาถา
            </Link>
        </main>
    );
}

export default VerseDetailPage;
"""

    with open(verse_detail_path, 'w', encoding='utf-8') as f:
        f.write(new_verse_detail_code)
    print("Updated VerseDetailPage.js")

except Exception as e:
    print(f"Error updating VerseDetailPage.js: {e}")
