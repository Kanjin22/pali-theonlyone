import requests
from bs4 import BeautifulSoup
import json
import time

base_url = "https://palidict.com/พจนานุกรมธาตุ"
links_data = []

# Assuming max 100 pages based on previous experience (2500 items / 25 per page = 100 pages)
# I'll check for "next" button to stop.

print("Scraping root links...")

for page in range(101): # 0 to 100
    url = f"{base_url}?page={page}"
    print(f"Fetching page {page}...")
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            print(f"Failed to fetch page {page}: {response.status_code}")
            break
            
        soup = BeautifulSoup(response.content, 'html.parser')
        rows = soup.find_all('tr')
        
        page_items = 0
        for row in rows:
            cols = row.find_all('td')
            if not cols:
                continue
                
            # Col 0 has the link
            link_tag = cols[0].find('a')
            if link_tag:
                root_name = link_tag.get_text(strip=True)
                href = link_tag.get('href')
                links_data.append({
                    "root": root_name,
                    "url": f"https://palidict.com{href}"
                })
                page_items += 1
        
        print(f"Found {page_items} items on page {page}.")
        
        if page_items == 0:
            print("No items found, stopping.")
            break
            
        # Optional: Check for 'next' link to be sure
        next_link = soup.find('li', class_='pager__item--next')
        if not next_link:
            print("No next page, stopping.")
            break
            
    except Exception as e:
        print(f"Error on page {page}: {e}")
        break
        
    time.sleep(0.1) # Be nice

print(f"Total links collected: {len(links_data)}")
with open("data/root_links.json", "w", encoding="utf-8") as f:
    json.dump(links_data, f, ensure_ascii=False, indent=2)
