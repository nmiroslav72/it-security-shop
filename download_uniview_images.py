"""
Preuzima Uniview slike koristeći Playwright sesiju
Pokretanje iz root foldera projekta: python download_uniview_images.py
"""
from playwright.sync_api import sync_playwright
import os, json, re

os.makedirs("public/uploads/uniview", exist_ok=True)

BASE_URL = "https://boma.rs"
EMAIL    = "nmiroslav72@yahoo.com"
PASSWORD = "verona72"

# Ucitaj slike iz uniview_products.json
with open("uniview_products.json", encoding="utf-8") as f:
    products = json.load(f)

image_urls = {}
for p in products:
    img = p.get("image", "")
    if img and "/img/articles/" in img:
        filename = img.split("/")[-1]
        full_url = img if img.startswith("http") else BASE_URL + img
        image_urls[filename] = full_url

print(f"Slika za preuzimanje: {len(image_urls)}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Login
    print("🔐 Logujem se...")
    page.goto(BASE_URL + "/auth/login", wait_until="networkidle")
    page.wait_for_timeout(2000)
    page.fill("input[name='email']", EMAIL)
    page.fill("input[name='password']", PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_timeout(4000)
    print(f"  URL: {page.url}\n")

    ok = 0
    fail = 0

    for filename, img_url in image_urls.items():
        save_to = f"public/uploads/uniview/{filename}"
        print(f"  {filename}... ", end="", flush=True)
        try:
            response = context.request.get(img_url)
            if response.status == 200:
                content = response.body()
                if content[:2] in [b'\xff\xd8', b'\x89P'] or content[:4] == b'\x89PNG':
                    with open(save_to, "wb") as f2:
                        f2.write(content)
                    print(f"✅ ({len(content)//1024}KB)")
                    ok += 1
                else:
                    # Nije slika direktno - otvori stranicu i screenshot
                    print(f"HTML redirect - pokusavam browser... ", end="", flush=True)
                    page.goto(img_url, wait_until="networkidle")
                    page.wait_for_timeout(1500)
                    img_el = page.locator("img").first
                    if img_el.count() > 0:
                        img_el.screenshot(path=save_to)
                        print(f"✅ screenshot")
                        ok += 1
                    else:
                        print(f"❌")
                        fail += 1
            else:
                print(f"❌ status={response.status}")
                fail += 1
        except Exception as e:
            print(f"❌ {e}")
            fail += 1

    browser.close()

print(f"\n✅ Preuzeto: {ok} | ❌ Greška: {fail}")

# Azuriraj uniview_seed_block.txt sa lokalnim putanjama
print("\nAžuriram putanje u uniview_seed_block.txt...")
with open("uniview_seed_block.txt", encoding="utf-8") as f:
    seed_block = f.read()

import re
def replace_img(m):
    url = m.group(1)
    if "/img/articles/" in url:
        fname = url.split("/")[-1]
        return f"['/uploads/uniview/{fname}']"
    return m.group(0)

seed_block = re.sub(r"\['(https://boma\.rs/img/articles/[^']+)'\]", replace_img, seed_block)
seed_block = re.sub(r"\['/img/articles/([^']+)'\]", lambda m: f"['/uploads/uniview/{m.group(1).split('/')[-1]}']", seed_block)

with open("uniview_seed_block.txt", "w", encoding="utf-8") as f:
    f.write(seed_block)
print("✅ Putanje ažurirane na /uploads/uniview/")
