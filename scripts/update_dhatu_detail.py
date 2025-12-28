import os

path = "D:/pali-dhatu-app/src/components/DhatuDetail.js"

try:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add Dhatu Type Card
    # Find where to insert. After "คำแปลอรรถ (ไทย)" card?
    target_card = """            <div className="detail-card">
              <h2>คำแปลอรรถ (ไทย)</h2>
              <p>{dhatu.arth_thai || '-'}</p>
            </div>"""

    new_card = """            <div className="detail-card">
              <h2>คำแปลอรรถ (ไทย)</h2>
              <p>{dhatu.arth_thai || '-'}</p>
            </div>
            {dhatu.dhatu_type && (
            <div className="detail-card">
              <h2>ประเภทธาตุ</h2>
              <p>{dhatu.dhatu_type}</p>
            </div>
            )}"""

    if target_card in content and "ประเภทธาตุ" not in content:
        content = content.replace(target_card, new_card)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Added Dhatu Type field to DhatuDetail.js")
    else:
        print("Could not add Dhatu Type field (pattern not found or already exists)")

except Exception as e:
    print(f"Error: {e}")
