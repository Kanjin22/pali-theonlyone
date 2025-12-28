import requests
from bs4 import BeautifulSoup
import json
import time
import os
import random

# Configuration
INPUT_FILE = 'data/root_links.json'
OUTPUT_FILE = 'data/scraped_roots_raw.json'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
SAVE_INTERVAL = 5
LIMIT = None

def load_data():
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except json.JSONDecodeError:
            return {}
    return {}

def save_data(data):
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def extract_text(soup, selector):
    element = soup.select_one(selector)
    if element:
        # Get text, preserving newlines for readability if needed, but mostly we want clean text
        return element.get_text(separator=' ', strip=True)
    return ""

def scrape_details():
    # Load links
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        links = json.load(f)
    
    # Load existing progress
    scraped_data = load_data()
    
    print(f"Total links to scrape: {len(links)}")
    print(f"Already scraped: {len(scraped_data)}")
    
    count = 0
    
    for item in links:
        if LIMIT and count >= LIMIT:
            print(f"Reached limit of {LIMIT} items. Stopping.")
            break
            
        root_name = item['root']
        url = item['url']
        
        # Skip if already scraped (check by URL to be safe, or root name if unique)
        # Using URL as key might be safer if roots have duplicates, but user wants root as key.
        # However, multiple entries might have same root name. 
        # Let's check if this specific URL has been processed.
        # But wait, the structure of vocab-roots.js is { "root_name": [ {entry1}, {entry2} ] }
        # So we should probably store it similarly or just a flat list first and then group later.
        # For intermediate saving, a dict keyed by URL is easiest to track progress.
        
        if url in scraped_data:
            continue
            
        print(f"[{count+len(scraped_data)}/{len(links)}] Scraping {root_name}: {url}")
        
        success = False
        for attempt in range(3):
            try:
                response = requests.get(url, headers=HEADERS, timeout=15)
                if response.status_code == 200:
                    success = True
                    break
                elif response.status_code == 404:
                    print(f"  Page not found: {url}")
                    break
                else:
                    print(f"  Attempt {attempt+1} failed: {response.status_code}")
                    time.sleep(2)
            except Exception as e:
                print(f"  Attempt {attempt+1} error: {e}")
                time.sleep(2)
        
        if not success:
            print(f"  Failed to scrape {url} after 3 attempts.")
            continue
            
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract fields
        # Note: Root name from H1 might be better than from link text
        title_elem = soup.select_one('h1.page-title span')
        actual_root = title_elem.get_text(strip=True) if title_elem else root_name
        
        meaning_pali = extract_text(soup, '.field--name-field-dhatumeaning .field__item')
        meaning_thai = extract_text(soup, '.field--name-body')
        example = extract_text(soup, '.field--name-field-sample .field__item')
        group = extract_text(soup, '.field--name-field-dhatugroup .field__item')
        page = extract_text(soup, '.field--name-field-katha .field__item')
        source = extract_text(soup, '.field--name-field-source .field__item')
        
        # Store data
        entry = {
            'root': actual_root,
            'meaning_pali': meaning_pali,
            'meaning_thai': meaning_thai,
            'example': example,
            'group': group,
            'page': page,
            'source': source,
            'url': url
        }
        
        scraped_data[url] = entry
        count += 1
        
        # Save periodically
        if count % SAVE_INTERVAL == 0:
            save_data(scraped_data)
            print(f"  Saved progress ({len(scraped_data)} items)")
            
        # Polite delay
        time.sleep(random.uniform(0.5, 1.5))
        
    # Final save
    save_data(scraped_data)
    print("Scraping completed!")

    # Post-process: Convert to vocab-roots format (Dict[root, List[Entry]])
    convert_to_vocab_format(scraped_data)

def convert_to_vocab_format(raw_data):
    print("Converting to vocab-roots structure...")
    vocab_roots = {}
    
    for url, entry in raw_data.items():
        root = entry['root']
        # Remove URL from final object if not needed, or keep it. User didn't ask for URL but useful for ref.
        # Clean entry for final output
        clean_entry = {k: v for k, v in entry.items() if k != 'url'}
        
        if root not in vocab_roots:
            vocab_roots[root] = []
        vocab_roots[root].append(clean_entry)
        
    # Save as final JSON
    with open('data/vocab-roots-detailed-grouped.json', 'w', encoding='utf-8') as f:
        json.dump(vocab_roots, f, ensure_ascii=False, indent=2)
    print(f"Saved grouped data to data/vocab-roots-detailed-grouped.json with {len(vocab_roots)} unique roots.")

if __name__ == "__main__":
    scrape_details()
