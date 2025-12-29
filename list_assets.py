import urllib.request
import urllib.error

base_url = "https://github.com/digitalpalidictionary/dpd-db/releases/download/v0.2.20251105"
filenames = ["dpd.db", "dpd.db.zip", "dpd-db.zip", "dpd-sqlite.zip", "dpd.zip"]

for name in filenames:
    url = f"{base_url}/{name}"
    print(f"Checking {url}...")
    try:
        request = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(request) as response:
            print(f"  [SUCCESS] {name} exists! (Status: {response.status})")
    except urllib.error.HTTPError as e:
        print(f"  [FAILED] {name}: {e.code} {e.reason}")
    except Exception as e:
        print(f"  [ERROR] {name}: {e}")
