import os
import shutil

base_dir = r"c:\Users\user\OneDrive - 서일대학교\바탕 화면\skv1"
img_dir = os.path.join(base_dir, "images")
if not os.path.exists(img_dir):
    os.makedirs(img_dir)

# Banner
banner_src = os.path.join(base_dir, "청라 배너.png")
if os.path.exists(banner_src):
    shutil.copy(banner_src, os.path.join(img_dir, "banner.png"))

# Slides
slide_src_dir = os.path.join(base_dir, "청라 sk v1_상담북(A3)최종 0910-복사")
if os.path.exists(slide_src_dir):
    for i in range(1, 30):
        src_name = f"청라 sk v1_상담북(A3)최종 0910-복사_{i}.jpg"
        src_path = os.path.join(slide_src_dir, src_name)
        if os.path.exists(src_path):
            dst_name = f"slide_{i:02d}.jpg"
            dst_path = os.path.join(img_dir, dst_name)
            shutil.copy(src_path, dst_path)

print("Images organized successfully!")
