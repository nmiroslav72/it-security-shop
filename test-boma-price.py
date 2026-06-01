import requests
from bs4 import BeautifulSoup

LOGIN_URL = "https://boma.rs/login"
USERNAME = "nmiroslav72@yahoo.com"
PASSWORD = "verona72"

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})

login_page = session.get(LOGIN_URL)
soup = BeautifulSoup(login_page.text, "html.parser")
csrf = soup.find("input", {"name": "_token"})
csrf_token = csrf["value"] if csrf else ""
session.post(LOGIN_URL, data={"email": USERNAME, "password": PASSWORD, "_token": csrf_token})

# Test one product page
resp = session.get("https://boma.rs/cctv/article/400")
soup = BeautifulSoup(resp.text, "html.parser")

# Search for price
print("=== PAGE TEXT (price area) ===")
text = soup.get_text()
# Find price section
idx = text.find("cen")
if idx > 0:
    print(text[max(0,idx-100):idx+300])

# Try all elements with price-related classes
print("\n=== PRICE ELEMENTS ===")
for el in soup.find_all(class_=True):
    classes = " ".join(el.get("class", []))
    if any(w in classes.lower() for w in ["price", "cena", "preis", "kost"]):
        print(f"class={classes}: '{el.get_text(strip=True)[:100]}'")
