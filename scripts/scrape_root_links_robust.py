import requests
from bs4 import BeautifulSoup
import json
import time

base_url = "https://palidict.com/พจนานุกรมธาตุ"
links_data = []
output_file = "data/root_links.json"

# Load existing if any
try:
    with open(output_file, "r", encoding="utf-8") as f:
        links_data = json.load(f)
    print(f"Loaded {len(links_data)} existing links.")
except:
    pass

start_page = len(links_data) // 25
print(f"Starting from page {start_page}...")

for page in range(start_page, 155): # Max pages around 155 for 3800 items
    url = f"{base_url}?page={page}"
    print(f"Fetching page {page}...")
    
    success = False
    for attempt in range(3):
        try:
            response = requests.get(url, timeout=20)
            if response.status_code == 200:
                success = True
                break
            else:
                print(f"  Attempt {attempt+1} failed: {response.status_code}")
                time.sleep(2)
        except Exception as e:
            print(f"  Attempt {attempt+1} error: {e}")
            time.sleep(2)
    
    if not success:
        print(f"Failed to fetch page {page} after 3 attempts. Stopping.")
        break
            
    soup = BeautifulSoup(response.content, 'html.parser')
    rows = soup.find_all('tr')
    
    page_items = 0
    current_page_links = []
    for row in rows:
        cols = row.find_all('td')
        if not cols:
            continue
            
        link_tag = cols[0].find('a')
        if link_tag:
            root_name = link_tag.get_text(strip=True)
            href = link_tag.get('href')
            current_page_links.append({
                "root": root_name,
                "url": f"https://palidict.com{href}"
            })
            page_items += 1
    
    # Avoid duplicates if restarting mid-page (simplified: just append)
    links_data.extend(current_page_links)
    
    print(f"Found {page_items} items on page {page}. Total: {len(links_data)}")
    
    # Save periodically
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(links_data, f, ensure_ascii=False, indent=2)

    if page_items == 0:
        print("No items found, stopping.")
        break
        
    next_link = soup.find('li', class_='pager__item--next')
    if not next_link:
        print("No next page, stopping.")
        break
        
    time.sleep(0.5)

print(f"Final count: {len(links_data)}")
