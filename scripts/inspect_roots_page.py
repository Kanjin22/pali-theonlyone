import requests
from bs4 import BeautifulSoup

url = "https://palidict.com/พจนานุกรมธาตุ"
print(f"Fetching {url}...")
try:
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    print("Fetch successful.")
except Exception as e:
    print(f"Error fetching: {e}")
    exit(1)

soup = BeautifulSoup(response.content, 'html.parser')

# Find the first few rows
rows = soup.find_all('tr')
print(f"Found {len(rows)} rows.")

for i, row in enumerate(rows[:5]):
    print(f"--- Row {i} ---")
    cols = row.find_all('td')
    for j, col in enumerate(cols):
        print(f"Col {j}: {col.get_text(strip=True)}")
        # Check for links
        links = col.find_all('a')
        for link in links:
            print(f"  Link: {link.get('href')}")
