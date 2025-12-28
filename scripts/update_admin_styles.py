
import os

css_path = 'D:/pali-dhatu-app/src/App.css'

css_content = """

/* --- Admin Theme (New) --- */

/* 1. General Admin Page Layout */
.admin-content h3 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 25px;
  font-size: 1.5rem;
}

/* 2. Admin Tables */
.dhatu-manager table,
.admin-content table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 20px;
  font-size: 0.95rem;
}

.dhatu-manager th,
.admin-content th {
  background-color: #34495e;
  color: white;
  font-weight: 500;
  text-align: left;
  padding: 15px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.dhatu-manager td,
.admin-content td {
  padding: 12px 15px;
  border-bottom: 1px solid #ecf0f1;
  color: #2c3e50;
  vertical-align: middle;
}

.dhatu-manager tr:last-child td,
.admin-content tr:last-child td {
  border-bottom: none;
}

.dhatu-manager tr:hover,
.admin-content tr:hover {
  background-color: #f8f9fa;
}

/* 3. Action Buttons in Table */
.action-buttons {
  display: flex;
  gap: 8px;
}

.edit-btn, .reject-btn, .approve-btn {
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
  font-family: 'Sarabun', sans-serif;
}

.edit-btn {
  background-color: #f39c12;
  color: white;
}

.edit-btn:hover {
  background-color: #e67e22;
}

.reject-btn { /* Used for Delete/Cancel */
  background-color: #e74c3c;
  color: white;
}

.reject-btn:hover {
  background-color: #c0392b;
}

.approve-btn { /* Used for Save */
  background-color: #27ae60;
  color: white;
}

.approve-btn:hover {
  background-color: #219150;
}

/* 4. Forms (Add/Edit) */
.add-dhatu-form-container,
.edit-form-container-inline {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 30px;
  border: 1px solid #e0e0e0;
}

.edit-form-container-inline h3 {
  margin-top: 0;
  font-size: 1.2rem;
  border-bottom: 1px solid #eee;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.add-dhatu-form-container label,
.edit-form-container-inline label {
  font-weight: 600;
  color: #34495e;
  font-size: 0.9rem;
  margin-bottom: 4px;
  display: block;
}

.add-dhatu-form-container input,
.add-dhatu-form-container select,
.add-dhatu-form-container textarea,
.edit-form-container-inline input,
.edit-form-container-inline select,
.edit-form-container-inline textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Sarabun', sans-serif;
  transition: border-color 0.2s;
  box-sizing: border-box; /* Ensure padding doesn't affect width */
}

.add-dhatu-form-container input:focus,
.add-dhatu-form-container select:focus,
.add-dhatu-form-container textarea:focus,
.edit-form-container-inline input:focus,
.edit-form-container-inline select:focus,
.edit-form-container-inline textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.add-dhatu-form-container button[type="submit"] {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s;
  display: block;
  width: 100%; /* Full width for add forms */
}

.add-dhatu-form-container button[type="submit"]:hover {
  background-color: #34495e;
}

/* 5. Search Bar in Manager */
.manager-search-bar {
  margin-bottom: 20px;
}

.manager-search-bar input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px; /* Pill shape */
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
  transition: all 0.2s;
}

.manager-search-bar input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

/* 6. Info Box (Latest Dhatu/Katha) */
.latest-dhatu-info {
  background-color: #e8f6f3;
  border: 1px solid #a3e4d7;
  color: #16a085;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}

.latest-dhatu-info strong {
  color: #0e6655;
  margin: 0 4px;
}

/* 7. Readonly Input Style */
.readonly-input {
  background-color: #f8f9fa;
  color: #7f8c8d;
  cursor: not-allowed;
}

/* Mobile Responsiveness for Admin */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr; /* Stack columns */
    gap: 15px;
  }
  
  .action-buttons {
    flex-direction: column; /* Stack buttons on small screens */
  }
  
  .dhatu-manager table, 
  .admin-content table {
    display: block;
    overflow-x: auto; /* Scroll horizontally */
  }
}
"""

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(css_content)

print(f"Appended Admin Theme to {css_path}")
