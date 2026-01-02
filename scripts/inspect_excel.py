import pandas as pd

try:
    df = pd.read_excel('d:/pali-theonlyone/data/ธป.1-4.xlsx')
    print("Columns:", df.columns.tolist())
    print("First few rows:")
    print(df.head())
except Exception as e:
    print(f"Error reading excel: {e}")
