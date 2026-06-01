"""
Poredi Dahua HD kamere na boma.rs sa onima u bazi - sa paginacijom
Pokretanje: python check_boma_vs_db.py
"""
from playwright.sync_api import sync_playwright
import re

BASE_URL = "https://boma.rs"
EMAIL    = "nmiroslav72@yahoo.com"
PASSWORD = "verona72"

CATEGORIES = [
    ("Dahua HD kamere",  "/cctv/allArticles/cctv/HDCVI_Kamere",  "hd-kamere"),
    ("Dahua IP kamere",  "/cctv/allArticles/cctv/IP_Kamere",      "ip-kamere"),
    ("Dahua NVR",        "/cctv/allArticles/cctv/NVR_Rekorderi",  "nvr-mrezni-snimaci"),
    ("Dahua DVR",        "/cctv/allArticles/cctv/XVR_Rekorderi",  "dvr-digitalni-snimaci"),
]

def scrape_category(page, base_url, cat_path):
    available = []
    page_num = 1

    while True:
        url = BASE_URL + cat_path + (f"?page={page_num}" if page_num > 1 else "")
        print(f"    Stranica {page_num}: {url}")
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(3000)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(2000)

        items = page.locator("span.article-wrap").all()
        if not items:
            break

        new_found = 0
        for item in items:
            try:
                btn = item.locator(".btn-dodaj-grid").first
                if btn.count() > 0 and "DODAJ U KORPU" in btn.inner_text().upper():
                    name_el = item.locator(".article-name h4 a").first
                    name = name_el.inner_text().strip() if name_el.count() > 0 else ""
                    if name:
                        available.append(name)
                        new_found += 1
            except: pass

        print(f"    +{new_found} na stanju (ukupno {len(available)})")

        # Proveri sledecu stranicu
        next_btn = page.locator("a.next, a[rel='next'], .next.page-numbers").first
        if next_btn.count() == 0 or not next_btn.is_visible():
            break

        page_num += 1

    return available

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=30)
    page = browser.new_page(viewport={"width": 1280, "height": 900})

    print("Logujem se...")
    page.goto(BASE_URL + "/auth/login", wait_until="networkidle")
    page.wait_for_timeout(2000)
    page.fill("input[name='email']", EMAIL)
    page.fill("input[name='password']", PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_timeout(4000)

    print("\n" + "="*60)
    print("BOMA.RS - proizvodi na stanju po kategorijama")
    print("="*60)

    for cat_name, cat_path, cat_slug in CATEGORIES:
        print(f"\n{cat_name}:")
        models = scrape_category(page, BASE_URL, cat_path)
        print(f"  UKUPNO NA STANJU: {len(models)}")
        for m in models:
            print(f"    - {m}")

    browser.close()
