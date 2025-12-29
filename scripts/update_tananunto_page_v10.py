import os

FILE_PATH = r'd:\pali-dhatu-app\src\pages\TananuntoRootsPage.js'

def update_file():
    print(f"Reading {FILE_PATH}...")
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replacement 1: Reading logic and cleanup
    old_read = """            // Try to load from localStorage first to save reads
            const cachedData = localStorage.getItem('dhatu_cache_v2');
            const cachedTime = localStorage.getItem('dhatu_cache_time_v2');"""
    
    new_read = """            // Clean up old cache
            localStorage.removeItem('dhatu_cache_v2');
            localStorage.removeItem('dhatu_cache_time_v2');
            localStorage.removeItem('dhatu_cache'); 

            // Try to load from localStorage first to save reads
            const cachedData = localStorage.getItem('dhatu_cache_v3');
            const cachedTime = localStorage.getItem('dhatu_cache_time_v3');"""
    
    if old_read in content:
        content = content.replace(old_read, new_read)
        print("Updated reading logic.")
    else:
        print("Could not find old reading logic to replace. Maybe already updated?")
        if 'dhatu_cache_v3' in content:
            print("Found 'dhatu_cache_v3' in content. Proceeding.")
    
    # Replacement 2: Writing logic
    old_write = """                    // Cache it
                    localStorage.setItem('dhatu_cache_v2', JSON.stringify(data));
                    localStorage.setItem('dhatu_cache_time_v2', NOW);"""
    
    new_write = """                    // Cache it
                    localStorage.setItem('dhatu_cache_v3', JSON.stringify(data));
                    localStorage.setItem('dhatu_cache_time_v3', NOW);"""

    if old_write in content:
        content = content.replace(old_write, new_write)
        print("Updated writing logic.")
    else:
        print("Could not find old writing logic to replace.")

    print(f"Writing back to {FILE_PATH}...")
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done.")

if __name__ == "__main__":
    update_file()
