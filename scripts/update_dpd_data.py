import os
import requests
import zipfile
import shutil
import subprocess
import sys
import tarfile

# Configuration
GITHUB_API_URL = "https://api.github.com/repos/digitalpalidictionary/dpd-db/releases/latest"
DOWNLOAD_DIR = "temp_download"
DPD_DATA_DIR = "dpd_data"
DB_FILENAME = "dpd.db"

def main():
    print("=== DPD Data Auto-Updater ===")
    
    skip_download = ("--skip-download" in sys.argv) or (os.getenv("SKIP_DOWNLOAD") == "1")
    dpd_db_path = os.path.join(DPD_DATA_DIR, DB_FILENAME)
    
    if skip_download and os.path.exists(dpd_db_path):
        print("Skipping download per flag. Using existing dpd_data/dpd.db")
    else:
        print("Fetching latest release info from GitHub...")
        try:
            resp = requests.get(GITHUB_API_URL)
            resp.raise_for_status()
            data = resp.json()
            tag_name = data['tag_name']
            assets = data['assets']
            print(f"Latest version: {tag_name}")
        except Exception as e:
            print(f"Error fetching GitHub info: {e}")
            return

        # 2. Find the database asset
        download_url = None
        target_asset_name = ""
        is_tar = False
        
        priorities = ["dpd.db.tar.bz2", "dpd.db.zip", "dpd.zip"]
        
        for p in priorities:
            for asset in assets:
                if asset['name'] == p:
                    download_url = asset['browser_download_url']
                    target_asset_name = asset['name']
                    if p.endswith('tar.bz2'):
                        is_tar = True
                    break
            if download_url:
                break
                
        if not download_url:
            print("No suitable DB asset (zip/tar.bz2) found in release.")
            print(f"Available assets: {[a['name'] for a in assets]}")
            return

        # 3. Download
        if not os.path.exists(DOWNLOAD_DIR):
            os.makedirs(DOWNLOAD_DIR)
        
        file_path = os.path.join(DOWNLOAD_DIR, target_asset_name)
        print(f"Downloading {target_asset_name} from {download_url}...")
        
        try:
            with requests.get(download_url, stream=True) as r:
                r.raise_for_status()
                with open(file_path, 'wb') as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        f.write(chunk)
            print("Download complete.")
        except Exception as e:
            print(f"Download failed: {e}")
            return

        # 4. Extract
        print("Extracting...")
        try:
            if is_tar:
                with tarfile.open(file_path, "r:bz2") as tar:
                    file_list = tar.getnames()
                    print(f"Files in archive: {file_list}")
                    
                    db_file_in_archive = next((f for f in file_list if f.endswith('.db')), None)
                    
                    if not db_file_in_archive:
                        print("No .db file found in archive.")
                        return
                    
                    tar.extract(db_file_in_archive, DOWNLOAD_DIR)
                    extracted_path = os.path.join(DOWNLOAD_DIR, db_file_in_archive)

            else:
                with zipfile.ZipFile(file_path, 'r') as zip_ref:
                    file_list = zip_ref.namelist()
                    print(f"Files in archive: {file_list}")
                    
                    db_file_in_archive = next((f for f in file_list if f.endswith('.db')), None)
                    
                    if not db_file_in_archive:
                        print("No .db file found in ZIP.")
                        return
                    
                    zip_ref.extract(db_file_in_archive, DOWNLOAD_DIR)
                    extracted_path = os.path.join(DOWNLOAD_DIR, db_file_in_archive)

            if not os.path.exists(DPD_DATA_DIR):
                os.makedirs(DPD_DATA_DIR)
                
            dst = os.path.join(DPD_DATA_DIR, DB_FILENAME)
            
            if os.path.exists(dst):
                try:
                    os.remove(dst)
                except PermissionError:
                    print(f"Warning: Could not remove old {dst}. It might be in use.")
                    
            shutil.move(extracted_path, dst)
            print(f"Database updated at {dst}")
                
        except Exception as e:
            print(f"Extraction failed: {e}")
            return
        
    # 5. Run scripts
    scripts_to_run = [
        [sys.executable, "extract_dpd.py"],
        [sys.executable, "extract_dpd_roots.py"],
        [sys.executable, "extract_dpd_vocab.py"],
        [sys.executable, "generate_sync_files.py"]
    ]
    
    print("\n=== Running Data Generation Scripts ===")
    success = True
    for cmd in scripts_to_run:
        print(f"Running: {' '.join(cmd)}")
        try:
            subprocess.run(cmd, check=True, shell=True) # shell=True for node/python in some envs
            print(f"[OK] {' '.join(cmd)} completed.")
        except subprocess.CalledProcessError as e:
            print(f"[ERROR] Error running {cmd}: {e}")
            success = False
            
    if success:
        print("\n=== All updates completed successfully! ===")
        print("You can now verify the changes and commit them.")
    else:
        print("\n=== Some updates failed. Please check the logs above. ===")
    
    # Cleanup
    try:
        if os.path.exists(DOWNLOAD_DIR):
            shutil.rmtree(DOWNLOAD_DIR)
            print("Cleanup temporary files.")
    except:
        pass

if __name__ == "__main__":
    main()
