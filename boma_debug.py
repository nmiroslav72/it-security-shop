"""
Debug - analizira stranicu LISTE proizvoda (ne pojedinačni proizvod)
"""
from playwright.sync_api import sync_playwright
import re

BASE_URL  = "https://boma.rs"
EMAIL     = "nmiroslav72@yahoo.com"
PASSWORD  = "verona72"
CAT_URL   = BASE_URL + "/imou/allArticles/imou/IP_Kamere"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=50)
    page = browser.new_page()

    # Login
    print("Logujem se...")
    page.goto(BASE_URL + "/auth/login", wait_until="networkidle")
    page.wait_for_timeout(2000)
    page.fill("input[name='email']", EMAIL)
    page.fill("input[name='password']", PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_timeout(4000)

    # Idi na listu kategorije
    print(f"Otvaram listu: {CAT_URL}")
    page.goto(CAT_URL, wait_until="networkidle")
    page.wait_for_timeout(3000)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(2000)

    # Screenshot liste
    page.screenshot(path="lista_debug.png", full_page=True)
    print("Screenshot: lista_debug.png")

    # Sva dugmad
    print("\n=== DUGMAD na listi ===")
    for el in page.locator("button").all():
        try:
            txt = el.inner_text().strip()
            cls = el.get_attribute("class") or ""
            if txt:
                print(f"  class='{cls[:70]}' | text='{txt[:60]}'")
        except: pass

    # Svi linkovi koji liče na korpu
    print("\n=== LINKOVI/DUGMAD sa cart/korpa/dodaj ===")
    for el in page.locator("a, button").all():
        try:
            txt = el.inner_text().strip().lower()
            cls = (el.get_attribute("class") or "").lower()
            href = (el.get_attribute("href") or "").lower()
            combined = txt + cls + href
            if any(x in combined for x in ["cart", "korpa", "dodaj", "kupi", "add"]):
                tag = el.evaluate("el => el.tagName.toLowerCase()")
                print(f"  <{tag}> class='{cls[:60]}' | text='{txt[:50]}'")
        except: pass

    # HTML prvog product item-a
    print("\n=== HTML prvog item-a na listi ===")
    for sel in [
        ".article-list-item", ".product-item", ".item-card",
        ".article-item", "li.article", ".list-item",
        "[class*='article']", "[class*='product']", "[class*='item']"
    ]:
        els = page.locator(sel).all()
        if els:
            html = els[0].inner_html()
            print(f"Selektor: '{sel}'")
            print(html[:1000])
            print("...")
            break

    input("\nPritisnite Enter za zatvaranje...")
    browser.close()
