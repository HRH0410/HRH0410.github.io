#!/usr/bin/env python3
"""从专辑封面提取主题色并更新 data/music.yml。"""

from pathlib import Path
import sys
import yaml
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans

ROOT = Path(__file__).resolve().parent.parent
MUSIC_YML = ROOT / "data" / "music.yml"
STATIC_DIR = ROOT / "static"


def rgb_to_hex(rgb):
    return "#" + "".join(f"{int(c):02x}" for c in rgb)


def hsl_from_rgb(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    mx = max(r, g, b)
    mn = min(r, g, b)
    d = mx - mn
    l = (mx + mn) / 2.0

    if d == 0:
        h = s = 0
    else:
        s = d / (2 - mx - mn) if l > 0.5 else d / (mx + mn)
        if mx == r:
            h = (g - b) / d + (6 if g < b else 0)
        elif mx == g:
            h = (b - r) / d + 2
        else:
            h = (r - g) / d + 4
        h /= 6
    return h, s, l


def score_color(rgb):
    """优先选择亮度适中、饱和度足够、不太灰暗的颜色。"""
    _, s, l = hsl_from_rgb(*rgb)
    # 亮度理想区间 0.35~0.65
    l_score = 1.0 - abs(l - 0.5) * 1.5
    # 饱和度越高越好，但不要太刺眼
    s_score = min(s * 2.5, 1.0)
    # 避免过灰
    if s < 0.08 or l < 0.18 or l > 0.85:
        return -1.0
    return l_score + s_score


def extract_color(image_path, n_colors=6):
    img = Image.open(image_path).convert("RGB")
    # 缩小以加速，同时保留色彩分布
    img.thumbnail((120, 120), Image.Resampling.LANCZOS)
    pixels = np.array(img).reshape(-1, 3)

    # 如果图片像素不够，直接返回
    if len(pixels) < n_colors:
        return rgb_to_hex(pixels[0])

    kmeans = KMeans(n_clusters=n_colors, n_init=10, random_state=42).fit(pixels)
    colors = kmeans.cluster_centers_.astype(int)

    scored = [(score_color(c), tuple(c)) for c in colors]
    scored.sort(key=lambda x: x[0], reverse=True)

    best = scored[0][1]
    # 如果最佳颜色评分太低， fallback 到亮度最接近 0.5 的颜色
    if scored[0][0] < 0.5:
        best = min(colors, key=lambda c: abs(hsl_from_rgb(*c)[2] - 0.5))
        best = tuple(best)

    return rgb_to_hex(best)


def main():
    if not MUSIC_YML.exists():
        print(f"找不到 {MUSIC_YML}")
        sys.exit(1)

    with open(MUSIC_YML, "r", encoding="utf-8") as f:
        content = f.read()
        tracks = yaml.safe_load(content) or []

    changed = []
    for track in tracks:
        cover = track.get("cover", "")
        if not cover:
            continue
        # cover 路径形如 /img/albums/xxx.jpg
        cover_path = STATIC_DIR / cover.lstrip("/")
        if not cover_path.exists():
            print(f"⚠️  找不到封面: {cover_path}")
            continue

        old_color = track.get("color", "")
        new_color = extract_color(cover_path)
        track["color"] = new_color
        changed.append((track.get("title", "?"), old_color, new_color))

    # 备份原文件
    backup = MUSIC_YML.with_suffix(".yml.bak")
    backup.write_text(content, encoding="utf-8")

    with open(MUSIC_YML, "w", encoding="utf-8") as f:
        yaml.dump(
            tracks,
            f,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False,
            width=120,
        )

    print(f"已更新 {len(changed)} 首歌曲的主题色，原文件备份至 {backup}\n")
    for title, old, new in changed:
        print(f"  {title}: {old} -> {new}")


if __name__ == "__main__":
    main()
