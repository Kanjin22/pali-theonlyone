import os

# Define paths
base_path = "d:/pali-dhatu-app/src"
add_dhatu_path = os.path.join(base_path, "components/AddDhatuForm.js")
add_katha_path = os.path.join(base_path, "pages/AdminAddKatha.js")
user_manager_path = os.path.join(base_path, "components/UserManager.js")

def update_file(path, old_content, new_content):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if the content is already updated (partial check)
        if new_content in content:
            print(f"File {path} is already updated.")
            return

        if old_content in content:
            updated_content = content.replace(old_content, new_content)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Successfully updated {path}")
        else:
            print(f"Could not find exact match in {path}. Content might have changed.")
            # Debug: print first 50 chars of expected vs actual
            # print(f"Expected start: {old_content[:50]}")
    except Exception as e:
        print(f"Error updating {path}: {e}")

# 1. AddDhatuForm.js
add_dhatu_old = """  return (
    <div className="add-dhatu-form-container">
      <div className="latest-dhatu-info">
        {latestDhatu ? (
          <p>ธาตุล่าสุด: <strong>{latestDhatu.dhatu_word}</strong> (ลำดับที่: <strong>{latestDhatu.anukrom_dhatu}</strong>)</p>
        ) : (
          <p>ยังไม่มีข้อมูลในระบบ</p>
        )}
      </div>
      <h4>เพิ่มธาตุใหม่โดยตรง</h4>
      <form onSubmit={handleSubmit}>
        <label>อนุกรมธาตุ (สร้างอัตโนมัติ):</label>
        <input
          type="number"
          name="anukrom_dhatu"
          value={formData.anukrom_dhatu}
          onChange={handleChange}
          required
          readOnly // *** เพิ่มบรรทัดนี้ ***
          className="readonly-input" // *** เพิ่ม class นี้ ***
        />
        <label>ธาตุ:</label>
        <input name="dhatu_word" value={formData.dhatu_word} onChange={handleChange} required />
        <label>อรรถ (บาลี):</label>
        <input name="arth_pali" value={formData.arth_pali} onChange={handleChange} />
        <label>อรรถ (ไทย):</label>
        <input name="arth_thai" value={formData.arth_thai} onChange={handleChange} required />
        <label>หมวดธาตุ:</label>
        <input name="mawat_dhatu" value={formData.mawat_dhatu} onChange={handleChange} list="dhatu-categories" />
        <datalist id="dhatu-categories">
          {dhatuCategories.map(cat => <option key={cat} value={cat} />)}
        </datalist>
        <label>คาถาที่:</label>
        <input type="number" name="katha_no" value={formData.katha_no} onChange={handleChange} />
        <label>อุทาหรณ์ (คั่นด้วย ;):</label>
        <textarea name="udaharana_str" value={formData.udaharana_str} onChange={handleChange} rows="4" />
        <div className="action-buttons" style={{ marginTop: '20px' }}>
          <button type="submit" disabled={isSubmitting} className="approve-btn">
            {isSubmitting ? 'กำลังเพิ่ม...' : 'เพิ่มธาตุ'}
          </button>
        </div>
      </form>
    </div>
  );"""

add_dhatu_new = """  return (
    <div className="add-dhatu-form-container">
      <div className="latest-dhatu-info">
        {latestDhatu ? (
          <p>ธาตุล่าสุด: <strong>{latestDhatu.dhatu_word}</strong> (ลำดับที่: <strong>{latestDhatu.anukrom_dhatu}</strong>)</p>
        ) : (
          <p>ยังไม่มีข้อมูลในระบบ</p>
        )}
      </div>
      <h4>เพิ่มธาตุใหม่โดยตรง</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-column">
            <label>อนุกรมธาตุ (สร้างอัตโนมัติ):</label>
            <input
              type="number"
              name="anukrom_dhatu"
              value={formData.anukrom_dhatu}
              onChange={handleChange}
              required
              readOnly
              className="readonly-input"
            />
            <label>ธาตุ:</label>
            <input name="dhatu_word" value={formData.dhatu_word} onChange={handleChange} required />
            <label>หมวดธาตุ:</label>
            <input name="mawat_dhatu" value={formData.mawat_dhatu} onChange={handleChange} list="dhatu-categories" />
            <datalist id="dhatu-categories">
              {dhatuCategories.map(cat => <option key={cat} value={cat} />)}
            </datalist>
            <label>คาถาที่:</label>
            <input type="number" name="katha_no" value={formData.katha_no} onChange={handleChange} />
          </div>
          <div className="form-column">
            <label>อรรถ (บาลี):</label>
            <input name="arth_pali" value={formData.arth_pali} onChange={handleChange} />
            <label>อรรถ (ไทย):</label>
            <input name="arth_thai" value={formData.arth_thai} onChange={handleChange} required />
            <label>อุทาหรณ์ (คั่นด้วย ;):</label>
            <textarea name="udaharana_str" value={formData.udaharana_str} onChange={handleChange} rows="5" />
          </div>
        </div>
        <div className="action-buttons" style={{ marginTop: '20px' }}>
          <button type="submit" disabled={isSubmitting} className="approve-btn">
            {isSubmitting ? 'กำลังเพิ่ม...' : 'เพิ่มธาตุ'}
          </button>
        </div>
      </form>
    </div>
  );"""

# 2. AdminAddKatha.js
add_katha_old = """            <div className="add-dhatu-form-container" style={{ maxWidth: '600px', margin: '20px 0' }}>
                <form onSubmit={handleSubmit}>
                    <label>เลขคาถา (สร้างอัตโนมัติ):</label>
                    {/* *** 4. เพิ่ม readOnly และ className *** */}
                    <input type="number" name="katha_no" value={formData.katha_no} onChange={handleChange} required readOnly className="readonly-input" />

                    <label>เนื้อหาคาถา (บาลี):</label>
                    <textarea name="katha_pali" value={formData.katha_pali} onChange={handleChange} rows="6" required />

                    <label>จำนวนธาตุ:</label>
                    <input type="number" name="dhatu_count" value={formData.dhatu_count} onChange={handleChange} required />

                    <label>ประเภทคาถา:</label>
                    <select name="katha_type" value={formData.katha_type} onChange={handleChange}>
                        <option value="pathyavatta">คาถาปัฐยาวัตร (2/4 บาท)</option>
                        <option value="pathyavatta-6">คาถาปัฐยาวัตร (6 บาท)</option>
                        <option value="other">คาถาอื่นๆ (1 คอลัมน์)</option>
                    </select>

                    <div className="action-buttons" style={{ marginTop: '20px' }}>
                        <button type="submit" disabled={isSubmitting} className="approve-btn">
                            {isSubmitting ? 'กำลังเพิ่ม...' : 'เพิ่มคาถา'}
                        </button>
                    </div>
                </form>
            </div>"""

add_katha_new = """            <div className="add-dhatu-form-container" style={{ maxWidth: '100%', margin: '20px 0' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-column">
                            <label>เลขคาถา (สร้างอัตโนมัติ):</label>
                            <input type="number" name="katha_no" value={formData.katha_no} onChange={handleChange} required readOnly className="readonly-input" />
                            
                            <label>จำนวนธาตุ:</label>
                            <input type="number" name="dhatu_count" value={formData.dhatu_count} onChange={handleChange} required />
                            
                            <label>ประเภทคาถา:</label>
                            <select name="katha_type" value={formData.katha_type} onChange={handleChange}>
                                <option value="pathyavatta">คาถาปัฐยาวัตร (2/4 บาท)</option>
                                <option value="pathyavatta-6">คาถาปัฐยาวัตร (6 บาท)</option>
                                <option value="other">คาถาอื่นๆ (1 คอลัมน์)</option>
                            </select>
                        </div>
                        <div className="form-column">
                            <label>เนื้อหาคาถา (บาลี):</label>
                            <textarea name="katha_pali" value={formData.katha_pali} onChange={handleChange} rows="8" required />
                        </div>
                    </div>

                    <div className="action-buttons" style={{ marginTop: '20px' }}>
                        <button type="submit" disabled={isSubmitting} className="approve-btn">
                            {isSubmitting ? 'กำลังเพิ่ม...' : 'เพิ่มคาถา'}
                        </button>
                    </div>
                </form>
            </div>"""

# 3. UserManager.js
user_manager_old = """  return (
    <div className="user-manager-container">
      <h4>จัดการผู้ดูแลระบบ (Admin)</h4>
      <p>ส่วนนี้สำหรับเพิ่มผู้ดูแลระบบคนใหม่ (ต้องใช้ Firebase Functions)</p>

      <form onSubmit={handleAddAdmin} className="center-form"> {/* เอา edit-form และ style ออก */}
        <label>อีเมล Admin ใหม่:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>รหัสผ่าน (อย่างน้อย 6 ตัวอักษร):</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
        <div className="action-buttons" style={{ marginTop: '20px' }}>
          <button type="submit" disabled={isSubmitting} className="approve-btn">
            {isSubmitting ? 'กำลังเพิ่ม...' : 'เพิ่ม Admin'}
          </button>
        </div>
        {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
      </form>
"""

user_manager_new = """  return (
    <div className="add-dhatu-form-container">
      <h4>จัดการผู้ดูแลระบบ (Admin)</h4>
      <p>ส่วนนี้สำหรับเพิ่มผู้ดูแลระบบคนใหม่ (ต้องใช้ Firebase Functions)</p>

      <form onSubmit={handleAddAdmin}>
        <label>อีเมล Admin ใหม่:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>รหัสผ่าน (อย่างน้อย 6 ตัวอักษร):</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
        <div className="action-buttons" style={{ marginTop: '20px' }}>
          <button type="submit" disabled={isSubmitting} className="approve-btn">
            {isSubmitting ? 'กำลังเพิ่ม...' : 'เพิ่ม Admin'}
          </button>
        </div>
        {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
      </form>
"""

# Execute Updates
update_file(add_dhatu_path, add_dhatu_old, add_dhatu_new)
update_file(add_katha_path, add_katha_old, add_katha_new)
update_file(user_manager_path, user_manager_old, user_manager_new)
