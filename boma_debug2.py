"""
Debug - analizira HTML jednog product item-a na listi
"""
from playwright.sync_api import sync_playwright

BASE_URL  = "https://boma.rs"
EMAIL     = "nmiroslav72@yahoo.com"
PASSWORD  = "verona72"
CAT_URL   = BASE_URL + "/imou/allArticles/imou/IP_Kamere"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=50)
    page = browser.new_page()

    print("Logujem se...")
    page.goto(BASE_URL + "/auth/login", wait_until="networkidle")
    page.wait_for_timeout(2000)
    page.fill("input[name='email']", EMAIL)
    page.fill("input[name='password']", PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_timeout(4000)

    print(f"Otvaram listu...")
    page.goto(CAT_URL, wait_until="networkidle")
    page.wait_for_timeout(3000)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(2000)

    # Nađi parent element dugmeta i ispiši mu HTML
    print("\n=== HTML oko dugmeta 'DODAJ U KORPU' (parent elementi) ===")
    btn = page.locator(".btn-dodaj-grid").first
    if btn.count() > 0:
        # Ispiši 3 nivoa parent-a
        for level in range(1, 5):
            js = f"el => el.{'parentElement.'*level}outerHTML"
            try:
                html = btn.evaluate(js)
                print(f"\n--- Parent level {level} (prvih 1500 chars) ---")
                print(html[:1500])
            except: pass

    input("\nPritisnite Enter...")
    browser.close()
