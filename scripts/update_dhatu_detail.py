
import os

DHATU_DETAIL_PATH = r"D:\pali-dhatu-app\src\components\DhatuDetail.js"

content = """
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import LoadingSpinner from '../components/LoadingSpinner';

function DhatuDetail() {
  const { id } = useParams();
  const [dhatu, setDhatu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDhatu = async () => {
      setLoading(true);
      setError('');
      try {
        const docRef = doc(db, 'dhatu', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDhatu({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('ไม่พบข้อมูลธาตุที่ระบุ');
        }
      } catch (err) {
        console.error("Error fetching document: ", err);
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDhatu();
    }
  }, [id]);

  const getGroupCode = (groupName) => {
      if (!groupName) return null;
      if (groupName.includes("ภู")) return "bhu";
      if (groupName.includes("รุธ")) return "rudha";
      if (groupName.includes("ทิว")) return "divu";
      if (groupName.includes("สุ")) return "su";
      if (groupName.includes("กี")) return "ki";
      if (groupName.includes("คห")) return "gaha";
      if (groupName.includes("ตน")) return "tana";
      if (groupName.includes("จุร")) return "cura";
      return null;
  };

  const getSourceFullName = (abbr) => {
      if (!abbr) return '-';
      let full = abbr;
      if (abbr.includes('ธป')) full = 'ธาตุปทีปิกา (รวบรวมโดย พระมหาโพธิวงศาจารย์)';
      if (abbr.includes('พธ')) full = 'พจนานุกรมธาตุ (พระมหาโพธิวงศาจารย์)';
      if (abbr.includes('ธส')) full = 'ธาตุวัตถุสังคหะ';
      
      // If it's just the code, append the code in brackets
      if (full !== abbr) return `${full} [${abbr}]`;
      return full;
  };

  if (loading) return <LoadingSpinner loading={loading} />;

  if (error) {
    return (
      <main className="Dhatu-detail-container">
        <div className="error-message">{error}</div>
        <Link to="/" className="back-link">กลับไปหน้าแรก</Link>
      </main>
    );
  }

  const groupCode = dhatu ? getGroupCode(dhatu.mawat_dhatu) : null;

  return (
    <main className="Dhatu-detail-container">
      {dhatu ? (
        <>
          <div className="detail-header">
            <span className="anukrom-badge">อนุกรมธาตุที่ {dhatu.anukrom_dhatu || '-'}</span>
            <h1 className="dhatu-title nowrap-title">{dhatu.dhatu_word}</h1>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <h2>อรรถ (บาลี)</h2>
              <p className="pali-text">{dhatu.arth_pali || '-'}</p>
            </div>
            <div className="detail-card">
              <h2>คำแปลอรรถ (ไทย)</h2>
              <p>{dhatu.arth_thai || '-'}</p>
            </div>
            <div className="detail-card">
              <h2>หมวดธาตุและปัจจัย</h2>
              <p>{dhatu.mawat_dhatu || '-'}</p>
              {groupCode && (
                  <Link to={`/principles/${groupCode}`} className="grammar-link-btn" style={{
                      display: 'inline-block',
                      marginTop: '10px',
                      color: '#27ae60',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                  }}>
                      <i className="fas fa-book-open"></i> ดูหลักการประกอบศัพท์หมวดนี้
                  </Link>
              )}
            </div>
            <div className="detail-card">
              <h2>ข้อมูลอ้างอิง</h2>
              <p className="reference-info"><strong>แหล่งที่มา:</strong> {getSourceFullName(dhatu.source)}</p>
              <p className="reference-info"><strong>หน้า/คาถาที่:</strong> {dhatu.katha_no || dhatu.page || '-'}</p>
            </div>

            {/* School Examples Section */}
            {dhatu.udaharana_school && (
                <div className="detail-card full-width" style={{ backgroundColor: '#fff8e1', borderLeft: '5px solid #f39c12' }}>
                    <h2 style={{ color: '#d35400' }}>อุทาหรณ์จากแบบเรียน (บาลีสนามหลวง)</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{dhatu.udaharana_school}</p>
                </div>
            )}

            <div className="detail-card full-width">
              <h2>อุทาหรณ์ (ตัวอย่างการใช้)</h2>
              {(dhatu.udaharana && dhatu.udaharana.length > 0) ? (
                <ul className="udaharana-list">
                  {dhatu.udaharana.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>ไม่มีข้อมูล</p>
              )}
            </div>
          </div>

          <Link to="/" className="back-link">กลับไปหน้าแรก</Link>
        </>
      ) : (
        <p>ไม่พบข้อมูล</p>
      )}
    </main>
  );
}

export default DhatuDetail;
"""

with open(DHATU_DETAIL_PATH, "w", encoding="utf-8") as f:
    f.write(content.strip())

print("DhatuDetail.js updated.")
