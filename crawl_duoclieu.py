import pandas as pd
import requests
from bs4 import BeautifulSoup
import time

# Load CSV
df = pd.read_csv("duoclieu_ten_va_anh.csv").head(30)

# Hàm tạo slug cho link chi tiết
def make_slug(name):
    name = name.lower().strip()
    slug = name
    slug = slug.replace("đ", "d")
    trans = str.maketrans(
        "áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựíìỉĩịýỳỷỹỵ",
        "aaaaaaaaaaaaaaaaaeeeeeeeeeeeooooooooooooooooouuuuuuuuuuuiiiiiyyyyy"
    )
    slug = slug.translate(trans)
    for ch in " ,./():–—+\"'":
        slug = slug.replace(ch, "-")
    slug = "-".join([s for s in slug.split("-") if s])
    return slug

df["Link chi tiết"] = df["Tên dược liệu"].apply(lambda x: f"https://tracuuduoclieu.vn/{make_slug(x)}.html")

# Hàm lấy đoạn văn theo tiêu đề
def get_section(soup, keyword):
    tag = soup.find(lambda t: t.name in ["h2", "h3"] and keyword.lower() in t.get_text(strip=True).lower())
    if not tag:
        return ""
    content = []
    for sibling in tag.find_next_siblings():
        if sibling.name in ["h2", "h3"]:
            break
        content.append(sibling.get_text(strip=True))
    return "\n".join(content).strip()

# Crawl chi tiết
details = []
for i, row in df.iterrows():
    print(f"{i+1}/30: {row['Tên dược liệu']}")
    try:
        res = requests.get(row["Link chi tiết"], timeout=10)
        soup = BeautifulSoup(res.text, "html.parser")
        mo_ta = get_section(soup, "Mô tả cây")
        sinh_thai = get_section(soup, "Sinh thái")
        phan_bo = get_section(soup, "Phân bố")
        bo_phan = get_section(soup, "Bộ phận dùng")
        cong_dung = get_section(soup, "Công dụng")
        details.append([mo_ta, sinh_thai, phan_bo, bo_phan, cong_dung])
        time.sleep(1)  # tránh bị chặn
    except Exception as e:
        print("❌", e)
        details.append([""] * 5)

# Gán vào DataFrame
df[["Mô tả cây", "Sinh thái", "Phân bố", "Bộ phận dùng", "Công dụng"]] = pd.DataFrame(details)

# Lưu file kết quả
df.to_csv("duoclieu_30_chitiet.csv", index=False, encoding="utf-8-sig")
