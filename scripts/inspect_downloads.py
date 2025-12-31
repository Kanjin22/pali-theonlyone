import requests
from bs4 import BeautifulSoup
import os

url = "http://learntripitaka.com/Attakata-Pali2.html"

try:
    response = requests.get(url)
    response.raise_for_status()
    response.encoding = 'utf-8' # or 'tis-620' if thai site
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    links = soup.find_all('a')
    print(f"Found {len(links)} links.")
    
    for link in links:
        href = link.get('href')
        if href and (href.endswith('.zip') or href.endswith('.rar') or 'download' in href.lower()):
            print(f"Potential download: {href}")
            
except Exception as e:
    print(f"Error: {e}")
