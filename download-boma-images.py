import requests
import json
import os
import time
from urllib.parse import urlparse

with open("boma_cameras.json", "r", encoding="utf-8") as f:
    products = json.load(f)

LOGIN_URL = "https://boma.rs/login"
USERNAME = "nmiroslav72@yahoo.com"
PASSWORD = "verona72"

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0"})
login_page = session.get(LOGIN_URL)
from bs4 import BeautifulSoup
soup = BeautifulSoup(login_page.text, "html.parser")
csrf = soup.find("input", {"name": "_token"})
csrf_token = csrf["value"] if csrf else ""
session.post(LOGIN_URL, data={"email": USERNAME, "password": PASSWORD, "_token": csrf_token})

# Create folder
os.makedirs("public/uploads/boma", exist_ok=True)

updated = []
for i, product in enumerate(products):
    local_images = []
    for img_url in product.get("images", []):
        if not img_url:
            continue
        
        # Get filename
        filename = img_url.split("/")[-1]
        local_path = f"public/uploads/boma/{filename}"
        web_path = f"/uploads/boma/{filename}"
        
        if not os.path.exists(local_path):
            try:
                resp = session.get(img_url, timeout=10)
                if resp.status_code == 200:
                    with open(local_path, "wb") as f:
                        f.write(resp.content)
                    print(f"[{i+1}] Downloaded: {filename}")
                else:
                    print(f"[{i+1}] Failed {resp.status_code}: {img_url}")
                time.sleep(0.3)
            except Exception as e:
                print(f"[{i+1}] Error: {e}")
                continue
        else:
            print(f"[{i+1}] Exists: {filename}")
        
        local_images.append(web_path)
    
    product["local_images"] = local_images
    updated.append(product)

with open("boma_cameras_local.json", "w", encoding="utf-8") as f:
    json.dump(updated, f, ensure_ascii=False, indent=2)

print(f"\nDone! Downloaded images for {len(updated)} products")
print("Saved to boma_cameras_local.json")
