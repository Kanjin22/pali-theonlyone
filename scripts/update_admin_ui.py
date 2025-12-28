
import os

# --- 1. Update AdminMenu.js ---
admin_menu_path = 'D:/pali-dhatu-app/src/components/AdminMenu.js'
with open(admin_menu_path, 'r', encoding='utf-8') as f:
    menu_content = f.read()

menu_old = """      <ul>
        {/* --- กลุ่มเมนู "สร้างข้อมูลใหม่" --- */}
        <li><NavLink to="/admin/add-dhatu"><strong>+ เพิ่มธาตุใหม่</strong></NavLink></li>
        <li><NavLink to="/admin/add-katha"><strong>+ เพิ่มคาถาใหม่</strong></NavLink></li>

        <hr />

        {/* --- กลุ่มเมนู "จัดการข้อมูล" --- */}
        <li><NavLink to="/admin/submissions">จัดการเสนอแนะ</NavLink></li>
        <li><NavLink to="/admin/dhatu-management">จัดการคลังธาตุ</NavLink></li>
        <li><NavLink to="/admin/katha-management">จัดการคาถา</NavLink></li>
        <li><NavLink to="/admin/user-management">จัดการผู้ใช้งาน</NavLink></li>

        <hr />

        {/* --- กลุ่มเมนู "อื่นๆ" --- */}
        <li><NavLink to="/">กลับไปหน้าแรก</NavLink></li>
      </ul>"""

menu_new = """      <ul className="admin-menu-list">
        <li className="menu-section-title">ส่วนเพิ่มข้อมูล</li>
        <li><NavLink to="/admin/add-dhatu" className={({ isActive }) => isActive ? "active-menu" : ""}> <i className="fas fa-plus-circle"></i> เพิ่มธาตุ</NavLink></li>
        <li><NavLink to="/admin/add-katha" className={({ isActive }) => isActive ? "active-menu" : ""}> <i className="fas fa-plus-circle"></i> เพิ่มคาถา</NavLink></li>

        <li className="menu-section-title">ส่วนแก้ไข/จัดการ</li>
        {/* ลบเมนูจัดการเสนอแนะออกตามคำขอ */}
        <li><NavLink to="/admin/dhatu-management" className={({ isActive }) => isActive ? "active-menu" : ""}> <i className="fas fa-database"></i> จัดการคลังธาตุ</NavLink></li>
        <li><NavLink to="/admin/katha-management" className={({ isActive }) => isActive ? "active-menu" : ""}> <i className="fas fa-book"></i> จัดการคาถา</NavLink></li>
        <li><NavLink to="/admin/user-management" className={({ isActive }) => isActive ? "active-menu" : ""}> <i className="fas fa-users"></i> จัดการผู้ใช้งาน</NavLink></li>

        <li className="menu-separator"></li>
        
        <li><NavLink to="/" className="back-home-link"> <i className="fas fa-home"></i> กลับไปหน้าแรก</NavLink></li>
      </ul>"""

if menu_old in menu_content:
    menu_content = menu_content.replace(menu_old, menu_new)
    with open(admin_menu_path, 'w', encoding='utf-8') as f:
        f.write(menu_content)
    print("Updated AdminMenu.js")
else:
    print("Could not find snippet in AdminMenu.js")

# --- 2. Update App.js ---
app_js_path = 'D:/pali-dhatu-app/src/App.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

app_old = """            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminSubmissions />} />
              <Route path="submissions" element={<AdminSubmissions />} />
              <Route path="dhatu-management" element={<AdminDhatuManagement />} />"""

app_new = """            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDhatuManagement />} />
              {/* <Route path="submissions" element={<AdminSubmissions />} /> */}
              <Route path="dhatu-management" element={<AdminDhatuManagement />} />"""

if app_old in app_content:
    app_content = app_content.replace(app_old, app_new)
    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(app_content)
    print("Updated App.js")
else:
    print("Could not find snippet in App.js")

# --- 3. Update Login.js ---
login_js_path = 'D:/pali-dhatu-app/src/components/Login.js'
with open(login_js_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

login_old = """  return (
    <main className="Login-container">
      <h2>เข้าสู่ระบบสำหรับเจ้าหน้าที่</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">อีเมล:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">รหัสผ่าน:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">เข้าสู่ระบบ</button>
      </form>
    </main>
  );"""

login_new = """  return (
    <div className="login-page-wrapper">
      <main className="Login-container">
        <div className="login-header">
          <div className="login-logo">☸️</div>
          <h2>ระบบจัดการคลังธาตุ</h2>
          <p>เข้าสู่ระบบสำหรับเจ้าหน้าที่ (Admin)</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">อีเมล</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="error-message"><i className="fas fa-exclamation-circle"></i> {error}</div>}

          <button type="submit" className="login-button">
            เข้าสู่ระบบ
          </button>
        </form>
      </main>
    </div>
  );"""

if login_old in login_content:
    login_content = login_content.replace(login_old, login_new)
    with open(login_js_path, 'w', encoding='utf-8') as f:
        f.write(login_content)
    print("Updated Login.js")
else:
    print("Could not find snippet in Login.js")

# --- 4. Append Styles to App.css ---
css_path = 'D:/pali-dhatu-app/src/App.css'
css_to_append = """

/* --- Admin Login Page --- */
.login-page-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  padding: 20px;
}

.Login-container {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-header {
  margin-bottom: 30px;
}

.login-logo {
  font-size: 3rem;
  margin-bottom: 10px;
}

.login-header h2 {
  color: #2c3e50;
  margin: 0 0 5px 0;
  font-size: 1.5rem;
}

.login-header p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
}

.login-form .form-group {
  margin-bottom: 20px;
  text-align: left;
}

.login-form label {
  display: block;
  margin-bottom: 8px;
  color: #34495e;
  font-weight: 500;
  font-size: 0.95rem;
}

.login-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.login-form input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #34495e;
}

.error-message {
  color: #e74c3c;
  background-color: #fde8e7;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

/* --- Admin Dashboard Layout --- */
.Admin-layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.admin-header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.admin-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

.admin-user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.9rem;
}

.logout-button {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.logout-button:hover {
  background: rgba(255,255,255,0.2);
}

.admin-grid-container {
  display: flex;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  gap: 20px;
}

.admin-menu {
  width: 250px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  height: fit-content;
}

.admin-menu h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.1rem;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 10px;
}

.admin-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.admin-menu-list li {
  margin-bottom: 5px;
}

.menu-section-title {
  color: #95a5a6;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 15px;
  margin-bottom: 8px;
  padding-left: 10px;
  font-weight: 600;
}

.admin-menu-list a {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #34495e;
  border-radius: 6px;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.admin-menu-list a:hover {
  background-color: #ecf0f1;
  color: #2c3e50;
}

.admin-menu-list a.active-menu {
  background-color: #e8f4f8;
  color: #2980b9;
  font-weight: 500;
}

.admin-menu-list a i {
  width: 20px;
  text-align: center;
  margin-right: 8px;
}

.menu-separator {
  height: 1px;
  background-color: #ecf0f1;
  margin: 15px 0;
}

.back-home-link {
  color: #e67e22 !important;
}

.back-home-link:hover {
  background-color: #fff5e6 !important;
}

.admin-content {
  flex: 1;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  min-height: 500px;
}
"""

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(css_to_append)
print("Appended styles to App.css")
