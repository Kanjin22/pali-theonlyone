import requests
from bs4 import BeautifulSoup

url = "https://palidict.com/node/4236"
print(f"Fetching {url}...")
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Status: {response.status_code}")
    response.raise_for_status()
    
    with open("temp_detail.html", "w", encoding="utf-8") as f:
        f.write(response.text)
    print("Saved HTML to temp_detail.html")

    soup = BeautifulSoup(response.text, 'html.parser')

    # Try finding fields again
    fields = soup.find_all('div', class_='field')
    print(f"Found {len(fields)} fields")
    for field in fields:
        # Try to find class names to help identify
        classes = field.get('class', [])
        label = field.find('div', class_='field-label')
        items = field.find('div', class_='field-items')
        
        l_text = label.get_text(strip=True) if label else "No Label"
        v_text = items.get_text(strip=True) if items else "No Value"
        print(f"Class: {classes} | Label: {l_text} | Value: {v_text[:50]}...")

except Exception as e:
    print(f"Error: {e}")
