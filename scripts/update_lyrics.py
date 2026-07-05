#!/usr/bin/env venv/bin/python3
"""更新 data/music.yml 的 note 字段，已有内容的保持不变。"""

from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parent.parent
MUSIC_YML = ROOT / "data" / "music.yml"

LYRICS = {
    "琴岛漫步": "从虫鸣的夜晚到鸟叫的清早",
    "Come Around Me": "When you come around me, treat me like you miss me",
    "程艾影": "漫山遍野你的脸庞，唯有遗忘是最漫长",
    "没有人可以比我们更接近对方": "没有人可以比我们更接近对方",
    "吕梦江": "一江之水夜未央，一江之隔夜思凉",
    "drunk": "All my friends are drunk again, don't need nobody else",
    "日落大道": "每当黄昏阳光把所有都渲染，你看那金黄多耀眼",
    "iPad": "Isn't it strange how we're strangers again",
    "美丽人生": "像那美丽的花，盛开在每个人的心底",
    "染春": "昨天的烟还在今天的肺里，我凭什么要想着以后",
    "莉莉安": "在离这很远的地方，有一片海滩",
    "山雀": "自然赠予你，树冠、微风、肩头的暴雨",
    "垂髫": "我的勇气啊藏起来咯，我的热烈啊藏起来咯",
    "太聪明": "我开始后悔不应该太聪明的卖弄，只是怕亲手将我的真心葬送",
    "大风吹": "大风吹着谁，谁就倒霉",
}


def main():
    with open(MUSIC_YML, "r", encoding="utf-8") as f:
        tracks = yaml.safe_load(f) or []

    updated = 0
    for track in tracks:
        title = track.get("title", "")
        if title in LYRICS and not track.get("note"):
            track["note"] = LYRICS[title]
            updated += 1

    with open(MUSIC_YML, "w", encoding="utf-8") as f:
        yaml.dump(
            tracks,
            f,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False,
            width=120,
        )

    print(f"已更新 {updated} 首歌曲的 note")


if __name__ == "__main__":
    main()
