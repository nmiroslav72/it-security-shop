"""
Preuzima Imou slike sa boma.rs liste kategorije
- Login sa CSRF tokenom (kao u $RRWWHOD.py koji je radio)
- Uzima img src iz .article-image img na listi
- Preuzima slike i cuva u public/uploads/imou/
Pokretanje iz root foldera projekta: python download_imou_images.py
"""
import requests
from bs4 import BeautifulSoup
import os, re, time

os.makedirs("public/uploads/imou", exist_ok=True)

LOGIN_URL = "https://boma.rs/login"
USERNAME  = "nmiroslav72@yahoo.com"
PASSWORD  = "verona72"

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": "https://boma.rs",
})

# Login sa CSRF tokenom
print("🔐 Logujem se...")
login_page = session.get(LOGIN_URL)
soup = BeautifulSoup(login_page.text, "html.parser")
csrf = soup.find("input", {"name": "_token"})
csrf_token = csrf["value"] if csrf else ""
r = session.post(LOGIN_URL, data={
    "email": USERNAME,
    "password": PASSWORD,
    "_token": csrf_token,
})
print(f"  Status: {r.status_code} | URL: {r.url}")

# Naši Imou modeli koje tražimo
TARGET_MODELS = [
    "IPC-F88FIP-V2",
    "IPC-T22EP-C",
    "IPC-C22FP-C",
    "IPC-K9DCP-3T0WE-V2",
    "IPC-K9DC-5M0WEH-V2",
    "IPC-K3DP-5H0WF-0280B",
    "IPC-PS3EP-5M0-0280B",
    "IPC-C32EP",
    "IPC-PS8D-5V0-0280B",
    "IPC-PS3EP-8Q0-0280B",
    "NVR-N118W-8A0E-P",
    "NVR-N110W-8A0E-P",
    "NVR-N110-8A0E-P",
    "NVR-N118-8A0E-P",
]

found_images = {}  # model -> img_url

# Skeniraj IP kamere listu
for cat_url in [
    "https://boma.rs/imou/allArticles/imou/IP_Kamere",
    "https://boma.rs/imou/allArticles/imou/NVR_Rekorderi",
]:
    print(f"\n📋 Skeniram: {cat_url}")
    r = session.get(cat_url)
    soup = BeautifulSoup(r.text, "html.parser")

    items = soup.select("span.article-wrap")
    print(f"  Pronađeno {len(items)} artikala")

    for item in items:
        # Uzmi naziv
        name_el = item.select_one(".article-name h4 a")
        name = name_el.get_text(strip=True) if name_el else ""

        # Uzmi img src
        img_el = item.select_one(".article-image img")
        img_src = img_el.get("src", "") if img_el else ""
        if img_src.startswith("/"):
            img_src = "https://boma.rs" + img_src

        if not img_src or not name:
            continue

        # Provjeri koji model odgovara
        for model in TARGET_MODELS:
            if model.lower() in name.lower() or model.lower() in img_src.lower():
                if model not in found_images:
                    found_images[model] = img_src
                    print(f"  ✅ {model} -> {img_src}")
                break

print(f"\nPronađeno {len(found_images)}/{len(TARGET_MODELS)} slika")

# Preuzmi slike
print("\n⬇️  Preuzimam slike...")
ok = 0
fail = 0

for model in TARGET_MODELS:
    filename = f"{model}_01.jpg"
    save_to = f"public/uploads/imou/{filename}"

    if model not in found_images:
        print(f"  ⚠️  {model} - nije pronađen na listi")
        fail += 1
        continue

    img_url = found_images[model]
    print(f"  {filename}... ", end="", flush=True)

    try:
        r = session.get(img_url, timeout=15)
        if r.status_code == 200 and len(r.content) > 2000:
            # Provjeri da li je slika
            if r.content[:2] in [b'\xff\xd8', b'\x89P', b'GIF', b'RIFF']:
                with open(save_to, "wb") as f:
                    f.write(r.content)
                print(f"✅ ({len(r.content)//1024}KB)")
                ok += 1
            else:
                print(f"❌ nije slika: {r.content[:30]}")
                fail += 1
        else:
            print(f"❌ status={r.status_code} size={len(r.content)}")
            fail += 1
    except Exception as e:
        print(f"❌ {e}")
        fail += 1

    time.sleep(0.3)

print(f"\n✅ Preuzeto: {ok} | ❌ Greška: {fail}")
print("Slike su u: public/uploads/imou/")
