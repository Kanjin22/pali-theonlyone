import os

# Paths
app_css_path = "D:/pali-dhatu-app/src/App.css"
verse_detail_path = "D:/pali-dhatu-app/src/pages/VerseDetailPage.js"

# 1. Update App.css for centering
try:
    with open(app_css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()

    new_css_rule = """
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}
"""
    if ".page-header {" not in css_content:
        css_content += new_css_rule
        print("Added .page-header style to App.css")
    else:
        # If it exists, we might want to ensure text-align is center.
        # Simple string replacement for now if it's simple, otherwise append override.
        # Appending is safer for CSS as it overrides previous rules if specific enough.
        css_content += """
/* Override for centering */
.page-header {
  text-align: center !important;
}
"""
        print("Appended .page-header override to App.css")

    with open(app_css_path, 'w', encoding='utf-8') as f:
        f.write(css_content)

except Exception as e:
    print(f"Error updating App.css: {e}")

# 2. Update VerseDetailPage.js
try:
    with open(verse_detail_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace the logic inside fetchDhatusInKatha
    # We will rewrite the whole component logic part to be safe and use 'in' query
    
    new_logic = """    useEffect(() => {
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
                // Use 'in' query to handle both Number and String types of katha_no
                if (kathaNo !== null && kathaNo !== undefined) {
                    const dhatusRef = collection(db, 'dhatu');
                    // Create variants for query (Number and String) to be robust
                    const kathaNoVariants = [kathaNo, String(kathaNo), Number(kathaNo)];
                    // Remove duplicates
                    const uniqueVariants = [...new Set(kathaNoVariants)];

                    const q = query(dhatusRef, where('katha_no', 'in', uniqueVariants), orderBy('anukrom_dhatu'));
                    
                    const querySnapshot = await getDocs(q);
                    const dhatusList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setDhatus(dhatusList);
                } else {
                    console.warn("Katha document exists but has no katha_no");
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
    }, [id]);"""

    # We need to find the useEffect block to replace. 
    # It starts with `useEffect(() => {` and ends before `const filteredDhatus`.
    # This is risky with simple replace if we don't match exactly.
    # Let's try to match the start of useEffect up to `const filteredDhatus`.
    
    import re
    
    # Regex to capture the whole useEffect block
    # We look for "useEffect(() => {" ... up to ... "const filteredDhatus"
    pattern = r"useEffect\(\(\) => \{.*?(?=const filteredDhatus)"
    
    # Check if we can find it
    match = re.search(pattern, content, re.DOTALL)
    if match:
        # Replace the matched block with new_logic + some newlines
        # We need to be careful about closing braces of the useEffect that might be inside or outside the match
        # The pattern above stops BEFORE "const filteredDhatus", so it includes the closing of useEffect if it's before that.
        # In the original code:
        #     useEffect(...)
        #     }, [id]);
        #
        #     const filteredDhatus = ...
        
        # So the match should cover everything.
        content = content.replace(match.group(0), new_logic + "\n\n    ")
        print("Updated useEffect logic in VerseDetailPage.js")
    else:
        print("Could not match useEffect block via regex. Trying full overwrite of the file to be safe.")
        # Fallback: Full Overwrite since we know the structure
        content = """// src/pages/VerseDetailPage.js
import React, { useState, useEffect, useMemo } from 'react';
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
    const [searchTerm, setSearchTerm] = useState('');
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
                // Use 'in' query to handle both Number and String types of katha_no
                if (kathaNo !== null && kathaNo !== undefined) {
                    const dhatusRef = collection(db, 'dhatu');
                    // Create variants for query (Number and String) to be robust
                    const kathaNoVariants = [kathaNo, String(kathaNo), Number(kathaNo)];
                    // Remove duplicates
                    const uniqueVariants = [...new Set(kathaNoVariants)];

                    const q = query(dhatusRef, where('katha_no', 'in', uniqueVariants), orderBy('anukrom_dhatu'));
                    
                    const querySnapshot = await getDocs(q);
                    const dhatusList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setDhatus(dhatusList);
                } else {
                    console.warn("Katha document exists but has no katha_no");
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

    const filteredDhatus = useMemo(() => {
        if (!searchTerm.trim()) {
            return dhatus;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return dhatus.filter(dhatu =>
            dhatu.dhatu_word.toLowerCase().includes(lowercasedFilter) ||
            dhatu.arth_thai.toLowerCase().includes(lowercasedFilter) ||
            String(dhatu.anukrom_dhatu).includes(lowercasedFilter)
        );
    }, [searchTerm, dhatus]);

    if (loading) {
        return <LoadingSpinner loading={loading} />;
    }

    if (error) {
        return (
            <main className="Home-content">
                <h2>เกิดข้อผิดพลาด</h2>
                <p className="error-message">{error}</p>
                <p><strong>คำแนะนำ:</strong> หากปัญหานี้เกิดขึ้นครั้งแรก ลองเปิด Developer Tools (กด F12) ไปที่แท็บ Console แล้วมองหา Link สีแดงสำหรับสร้าง Index ใน Firebase</p>
                <Link to="/" className="back-link">← กลับไปหน้าคาถาทั้งหมด</Link>
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
            <Link to="/" className="back-link" style={{ marginBottom: '20px', display: 'inline-block' }}>
                ← กลับไปหน้าคาถาทั้งหมด
            </Link>

            <div className="dhatu-manager">
                <div className="manager-search-bar">
                    <input
                        type="text"
                        placeholder="ค้นหาจากธาตุ, คำแปล, หรือเลขอนุกรมในคาถานี้..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {dhatus.length === 0 ? (
                    <p>ไม่พบข้อมูลธาตุสำหรับคาถานี้</p>
                ) : filteredDhatus.length === 0 ? (
                    <p>ไม่พบข้อมูลธาตุที่ตรงกับคำค้นหา "{searchTerm}"</p>
                ) : (
                    <div className="dhatu-list">
                        {filteredDhatus.map(dhatu => (
                            <Link to={`/dhatu/${dhatu.id}`} key={dhatu.id} className="dhatu-card-link">
                                <div className="dhatu-card-item">
                                    <div className="dhatu-info">
                                        <h3>{dhatu.dhatu_word}</h3>
                                        <p>{dhatu.arth_thai}</p>
                                    </div>
                                    <div className="dhatu-meta">
                                        <span className="anukrom-number">#{dhatu.anukrom_dhatu}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default VerseDetailPage;
"""

    with open(verse_detail_path, 'w', encoding='utf-8') as f:
        f.write(content)

except Exception as e:
    print(f"Error updating VerseDetailPage.js: {e}")
