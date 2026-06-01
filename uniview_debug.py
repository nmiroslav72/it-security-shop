"""
Debug - ispisuje SVE tekstualne elemente sa stranice Uniview proizvoda
"""
from playwright.sync_api import sync_playwright

BASE_URL = "https://boma.rs"
EMAIL    = "nmiroslav72@yahoo.com"
PASSWORD = "verona72"

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

    page.goto(BASE_URL + "/uniview/article/40039", wait_until="networkidle")
    page.wait_for_timeout(3000)
    
    # Skroluj dole da ucitas sve
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(2000)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)

    print("\n=== MOB-TITLE-CATEGORY (pun tekst) ===")
    try:
        txt = page.locator(".mob-title-category").first.inner_text()
        print(repr(txt))
    except: print("NEMA")

    print("\n=== SVI DIV/SECTION SA TEKSTOM >50 znakova ===")
    result = page.evaluate("""
        () => {
            const els = document.querySelectorAll('div, section, article, td, span');
            const found = [];
            const seen = new Set();
            for (const el of els) {
                // Samo listovi bez dece (leaf nodes sa tekstom)
                if (el.children.length > 3) continue;
                const txt = el.innerText ? el.innerText.trim() : '';
                if (txt.length > 50 && txt.length < 800 && !seen.has(txt)) {
                    seen.add(txt);
                    found.push({
                        tag: el.tagName,
                        cls: el.className || '',
                        id: el.id || '',
                        txt: txt.substring(0, 200)
                    });
                }
            }
            return found.slice(0, 40);
        }
    """)
    for r in result:
        print(f"\n  <{r['tag']}> cls='{r['cls'][:40]}' id='{r['id']}':")
        print(f"    {r['txt'][:150]}")

    input("\nPritisnite Enter...")
    browser.close()
