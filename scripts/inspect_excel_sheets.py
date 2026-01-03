import pandas as pd

try:
    xl = pd.ExcelFile('d:/pali-theonlyone/data/ธป.1-4.xlsx')
    print("Sheet names:", xl.sheet_names)
    for sheet in xl.sheet_names:
        df = xl.parse(sheet)
        print(f"\nSheet: {sheet}")
        print("Columns:", df.columns.tolist())
        print(df.head())
except Exception as e:
    print(f"Error reading excel: {e}")
