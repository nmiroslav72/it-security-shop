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

# Fetch one product page
resp = session.get("https://boma.rs/cctv/article/400")
soup = BeautifulSoup(resp.text, "html.parser")

# Print all text content
print("=== PAGE TEXT ===")
print(soup.get_text()[:3000])

# Find all tables
print("\n=== TABLES ===")
for table in soup.find_all("table"):
    print(table.get_text()[:500])

# Find divs with content
print("\n=== CONTENT DIVS ===")
for div in soup.find_all("div", class_=True):
    text = div.get_text(strip=True)
    if 20 < len(text) < 500 and div.get("class"):
        print(f"class={div.get('class')}: {text[:100]}")
