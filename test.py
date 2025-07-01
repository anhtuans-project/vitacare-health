import requests
from bs4 import BeautifulSoup
import pandas as pd

base_url = "https://tracuuduoclieu.vn"
headers = {"User-Agent": "Mozilla/5.0"}

duoclieu_list = []

print("📦 Đang thu thập tên và ảnh dược liệu (theo div.dl)...")

for page in range(1, 100):
    url = f"{base_url}/tra-cuu-duoc-lieu/page/{page}/"
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, "html.parser")

    items = soup.select("div.dl")
    if not items:
        break

    for item in items:
        # Lấy tên từ h2 > a
        name_tag = item.select_one("h2 a")
        ten = name_tag.text.strip() if name_tag else ""

        # Lấy link ảnh từ img
        img_tag = item.find("img")
        img_url = img_tag["src"] if img_tag and img_tag.has_attr("src") else ""

        if ten and img_url:
            duoclieu_list.append({
                "Tên dược liệu": ten,
                "Link ảnh": img_url
            })

print(f"✅ Đã thu thập {len(duoclieu_list)} dược liệu")

# Xuất CSV
df = pd.DataFrame(duoclieu_list)
df.to_csv("duoclieu_ten_va_anh.csv", index=False, encoding='utf-8-sig')

print("🎉 Xuất file: duoclieu_ten_va_anh.csv")
