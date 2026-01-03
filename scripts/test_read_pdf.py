import sys
try:
    import pypdf
except ImportError:
    print("pypdf not installed")
    sys.exit(0)

pdf_path = r"C:\Users\setth\OneDrive\รูปภาพ\พจนานุกรมบาลี - ไทย ธรรมบทภาค ๑-๘\พจนานุกรมบาลี-ไทย อรรถกถาธรรมบท (ภาคที่ ๑ - ๔).pdf"

try:
    reader = pypdf.PdfReader(pdf_path)
    print(f"Pages: {len(reader.pages)}")
    print("First page text:")
    print(reader.pages[0].extract_text())
except Exception as e:
    print(f"Error reading PDF: {e}")
