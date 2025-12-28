
import os

# 1. Refactor KathaManager.js
katha_manager_path = 'D:/pali-dhatu-app/src/components/KathaManager.js'
with open(katha_manager_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the linear form with grid form
old_form = """                    <form onSubmit={handleUpdate}>
                        <h3>แก้ไขคาถาที่: {editingKatha.katha_no}</h3>
                        <label>เนื้อหาคาถา (บาลี):</label>
                        <textarea name="katha_pali" value={editingKatha.katha_pali} onChange={handleEditChange} rows="6" required />
                        <label>จำนวนธาตุ:</label>
                        <input type="number" name="dhatu_count" value={editingKatha.dhatu_count} onChange={handleEditChange} required />
                        <label>ประเภทคาถา:</label>
                        <select name="katha_type" value={editingKatha.katha_type} onChange={handleEditChange}>
                            <option value="pathyavatta">คาถาปัฐยาวัตร (2/4 บาท)</option>
                            <option value="pathyavatta-6">คาถาปัฐยาวัตร (6 บาท)</option>
                            <option value="other">คาถาอื่นๆ (1 คอลัมน์)</option>
                        </select>
                        <div className="action-buttons">
                            <button type="submit" className="approve-btn">บันทึก</button>
                            <button type="button" onClick={() => setEditingKatha(null)} className="reject-btn">ยกเลิก</button>
                        </div>
                    </form>"""

new_form = """                    <form onSubmit={handleUpdate}>
                        <h3>แก้ไขคาถาที่: {editingKatha.katha_no}</h3>
                        <div className="form-grid">
                            <div className="form-column">
                                <label>เลขคาถา (แก้ไขไม่ได้):</label>
                                <input type="number" value={editingKatha.katha_no} readOnly className="readonly-input" />
                                
                                <label>จำนวนธาตุ:</label>
                                <input type="number" name="dhatu_count" value={editingKatha.dhatu_count} onChange={handleEditChange} required />
                                
                                <label>ประเภทคาถา:</label>
                                <select name="katha_type" value={editingKatha.katha_type} onChange={handleEditChange}>
                                    <option value="pathyavatta">คาถาปัฐยาวัตร (2/4 บาท)</option>
                                    <option value="pathyavatta-6">คาถาปัฐยาวัตร (6 บาท)</option>
                                    <option value="other">คาถาอื่นๆ (1 คอลัมน์)</option>
                                </select>
                            </div>
                            <div className="form-column">
                                <label>เนื้อหาคาถา (บาลี):</label>
                                <textarea name="katha_pali" value={editingKatha.katha_pali} onChange={handleEditChange} rows="8" required />
                            </div>
                        </div>
                        <div className="action-buttons" style={{marginTop: '20px'}}>
                            <button type="submit" className="approve-btn">บันทึกการแก้ไข</button>
                            <button type="button" onClick={() => setEditingKatha(null)} className="reject-btn">ยกเลิก</button>
                        </div>
                    </form>"""

if old_form in content:
    content = content.replace(old_form, new_form)
    with open(katha_manager_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated KathaManager.js")
else:
    print("Could not find form in KathaManager.js")


# 2. Refactor AddDhatuForm.js
add_dhatu_path = 'D:/pali-dhatu-app/src/components/AddDhatuForm.js'
with open(add_dhatu_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I'll need to match a larger block or be clever. The file read earlier shows the form is inside `return`.
# I will use a simple regex-like replacement or just find the block if it's contiguous.
# The `return` block in `AddDhatuForm.js` (lines 94+) is simpler to just replace entirely if I construct it right.

# Let's try to replace the whole `return` statement block.
# Actually, the file content I read earlier ends at line 100. I need to be careful.
# I'll read the full file first to be safe.
pass

# 3. Refactor AdminAddKatha.js
# Similar strategy.

