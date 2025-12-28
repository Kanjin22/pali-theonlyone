import requests

url = "https://palidict.com/node/4236"
print(f"Fetching {url}...")
response = requests.get(url)
with open("temp_detail.html", "w", encoding="utf-8") as f:
    f.write(response.text)
print("Saved to temp_detail.html")
