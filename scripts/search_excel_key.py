import pandas as pd
import sys

excel_path = 'd:/pali-theonlyone/data/ธป.1-4.xlsx'
search_terms = ['ธมฺมปทฏฺฐกถา', 'ปณามคาถา', 'ธมฺมา', 'อากาสาทีสุ']

print(f"Searching in {excel_path}...")

try:
    xl = pd.ExcelFile(excel_path)
    found_any = False
    
    for sheet in xl.sheet_names:
        df = xl.parse(sheet)
        print(f"\n--- Sheet: {sheet} ---")
        
        # Check all columns
        for col in df.columns:
            # Convert to string and search
            for term in search_terms:
                # Exact match or substring?
                # Let's try substring
                matches = df[df[col].astype(str).str.contains(term, na=False)]
                if not matches.empty:
                    found_any = True
                    print(f"Found '{term}' in column '{col}':")
                    print(matches)

    if not found_any:
        print("\nNo matches found.")

except Exception as e:
    print(f"Error: {e}")
