
import os

KATHA_LIST_PATH = r"D:\pali-dhatu-app\src\pages\KathaListPage.js"

content = """
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

with open(KATHA_LIST_PATH, "w", encoding="utf-8") as f:
    f.write(content.strip())

print("KathaListPage.js updated.")
