import os

# Define paths
app_dir = r"D:\pali-dhatu-app"
src_dir = os.path.join(app_dir, "src")
components_dir = os.path.join(src_dir, "components")
pages_dir = os.path.join(src_dir, "pages")

# 1. Update DhatuDetail.js
dhatu_detail_path = os.path.join(components_dir, "DhatuDetail.js")
dhatu_detail_content = """import React, { useState, useEffect } from 'react';
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
            <h1 className="dhatu-title">{dhatu.dhatu_word}</h1>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <h2>อรรถ (บาลี)</h2>
              <p>{dhatu.arth_pali || '-'}</p>
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
              <p className="reference-info"><strong>เลขลำดับคาถา:</strong> {dhatu.katha_no || '-'}</p>
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
              {(dhatu.udaharana && len(dhatu.udaharana) > 0) ? (
                <ul className="udaharana-list">
                  {dhatu.udaharana.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (dhatu.udaharana && dhatu.udaharana.length > 0) ? (
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
""".replace("len(dhatu.udaharana) > 0", "dhatu.udaharana.length > 0") # Fix pythonism

with open(dhatu_detail_path, "w", encoding="utf-8") as f:
    f.write(dhatu_detail_content)
print(f"Updated {dhatu_detail_path}")

# 2. Update PrinciplesPage.js
principles_page_path = os.path.join(pages_dir, "PrinciplesPage.js")
principles_page_content = """import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import LoadingSpinner from '../components/LoadingSpinner';

function PrinciplesPage() {
    const { groupCode } = useParams();
    const [content, setContent] = useState(null);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (groupCode) {
                    const docRef = doc(db, 'grammar_principles', groupCode);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setContent(docSnap.data());
                    }
                } else {
                    // Fetch list if no specific group
                    const q = query(collection(db, 'grammar_principles'), orderBy('order'));
                    const querySnapshot = await getDocs(q);
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        items.push({ id: doc.id, ...doc.data() });
                    });
                    setList(items);
                }
            } catch (error) {
                console.error("Error fetching principles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [groupCode]);

    if (loading) return <LoadingSpinner loading={loading} />;

    return (
        <main className="static-page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            {groupCode && content ? (
                <div>
                    <Link to="/principles" className="back-link" style={{ marginBottom: '20px', display: 'inline-block' }}>&larr; กลับไปหน้ารวมหลักการ</Link>
                    <div dangerouslySetInnerHTML={{ __html: content.content_html }} />
                </div>
            ) : (
                <div>
                    <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>หลักการประกอบศัพท์ในไวยากรณ์บาลี</h1>
                    <div className="principles-list">
                        {list.map(item => (
                            <Link key={item.id} to={`/principles/${item.id}`} className="principle-card" style={{
                                display: 'block',
                                background: 'white',
                                padding: '20px',
                                marginBottom: '15px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                color: '#333',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s'
                            }}>
                                <h3 style={{ margin: 0, color: '#27ae60' }}>{item.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

export default PrinciplesPage;
"""
with open(principles_page_path, "w", encoding="utf-8") as f:
    f.write(principles_page_content)
print(f"Updated {principles_page_path}")

# 3. Update App.js (Patching)
app_js_path = os.path.join(src_dir, "App.js")
with open(app_js_path, "r", encoding="utf-8") as f:
    app_js_content = f.read()

# Add the new route if not exists
new_route = '<Route path="/principles/:groupCode" element={<PrinciplesPage />} />'
if new_route not in app_js_content:
    old_route = '<Route path="/principles" element={<PrinciplesPage />} />'
    if old_route in app_js_content:
        app_js_content = app_js_content.replace(old_route, old_route + '\n            ' + new_route)
        with open(app_js_path, "w", encoding="utf-8") as f:
            f.write(app_js_content)
        print(f"Updated {app_js_path}")
    else:
        print("Could not find anchor to patch App.js")
else:
    print("App.js already has the new route")

