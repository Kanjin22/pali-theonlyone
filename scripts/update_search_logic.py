
import os

search_page_path = r"D:\pali-dhatu-app\src\pages\SearchPage.js"

with open(search_page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Cache Key to force refresh
if "dhatu_cache" in content:
    content = content.replace("'dhatu_cache'", "'dhatu_cache_v2'")
    content = content.replace("'dhatu_cache_time'", "'dhatu_cache_time_v2'")
    print("Updated cache key to v2")

# 2. Update Fetch Logic to include udaharana
old_fetch = """                    arth_pali: doc.data().arth_pali,
                    mawat_dhatu: doc.data().mawat_dhatu,
                    anukrom_dhatu: doc.data().anukrom_dhatu
                }));"""

new_fetch = """                    arth_pali: doc.data().arth_pali,
                    mawat_dhatu: doc.data().mawat_dhatu,
                    anukrom_dhatu: doc.data().anukrom_dhatu,
                    udaharana: doc.data().udaharana
                }));"""

if old_fetch in content:
    content = content.replace(old_fetch, new_fetch)
    print("Added udaharana to fetch logic")
else:
    print("Warning: Fetch logic pattern not found")

# 3. Update Search Logic to include udaharana
old_search = """                                (d.arth_pali && d.arth_pali.toLowerCase().includes(searchLower));"""

new_search = """                                (d.arth_pali && d.arth_pali.toLowerCase().includes(searchLower)) ||
                                (d.udaharana && d.udaharana.toLowerCase().includes(searchLower));"""

if old_search in content:
    content = content.replace(old_search, new_search)
    print("Added udaharana to search logic")
else:
    print("Warning: Search logic pattern not found")

# 4. Update Placeholder text to indicate example search
old_placeholder = """placeholder="เช่น ภุ, มีความมี...\""""
new_placeholder = """placeholder="ค้นหาชื่อธาตุ, คำแปล หรือศัพท์ในอุทาหรณ์...\""""

if old_placeholder in content:
    content = content.replace(old_placeholder, new_placeholder)
    print("Updated placeholder text")

with open(search_page_path, 'w', encoding='utf-8') as f:
    f.write(content)
