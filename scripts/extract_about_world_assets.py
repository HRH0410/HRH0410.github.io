#!/usr/bin/env python3
"""Build the About-page worlds from the owner's source assets.

The Stardew scene is composed on a native 640×352 pixel canvas. Static scenery
is baked into two coherent day/night maps; only objects that actually animate
are exported as separate sprites. Source sheets are never modified.
"""

from pathlib import Path
import shutil
from typing import Optional, Tuple

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets-to-be-used"
STARDEW = SOURCE / "Stardew valley"
OUTPUT = ROOT / "static" / "img" / "about" / "worlds"
TOWN = OUTPUT / "town"
SPRITES = OUTPUT / "sprites"


def open_rgba(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def save_png(
    source: Path,
    target: Path,
    crop: Optional[Tuple[int, int, int, int]] = None,
) -> None:
    image = open_rgba(source)
    if crop:
        image = image.crop(crop)
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, optimize=True)


def copy_asset(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


def nearest(image: Image.Image, scale: int) -> Image.Image:
    return image.resize(
        (image.width * scale, image.height * scale),
        Image.Resampling.NEAREST,
    )


def crop(sheet: Image.Image, box: Tuple[int, int, int, int], scale: int = 1) -> Image.Image:
    image = sheet.crop(box)
    return nearest(image, scale) if scale != 1 else image


def tile_canvas(size: Tuple[int, int], tiles: list[Image.Image]) -> Image.Image:
    canvas = Image.new("RGBA", size)
    tile_w, tile_h = tiles[0].size
    for y in range(0, size[1], tile_h):
        for x in range(0, size[0], tile_w):
            tile = tiles[(x // tile_w + y // tile_h * 3) % len(tiles)]
            canvas.alpha_composite(tile, (x, y))
    return canvas


def render_stardew_label(text: str, target: Path) -> None:
    """Render unobtrusive object lettering with the game's bold glyph atlas."""
    font = open_rgba(STARDEW / "LooseSprites" / "font_bold..png")
    glyph_width, glyph_height = 8, 16
    padding_x, padding_y = 1, 1
    width = len(text) * glyph_width + padding_x * 2 + 1
    height = glyph_height + padding_y * 2 + 1
    label = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    text_mask = Image.new("L", (width, height), 0)

    for index, character in enumerate(text.upper()):
        code = ord(character)
        if not 32 <= code <= 127:
            continue
        atlas_index = code - 32
        column = atlas_index % 16
        row = atlas_index // 16
        glyph = font.crop((
            column * glyph_width,
            row * glyph_height,
            (column + 1) * glyph_width,
            (row + 1) * glyph_height,
        ))
        alpha = glyph.getchannel("A")
        x = padding_x + index * glyph_width
        text_mask.paste(alpha, (x, padding_y))

    # A true one-pixel outline keeps the pale Stardew letters legible over the
    # bright spring grass. Unlike a backing plaque, it does not divide the map
    # into UI blocks and remains unobtrusive on the night scene.
    outline_mask = text_mask.filter(ImageFilter.MaxFilter(3))
    outline = Image.new("RGBA", label.size, (60, 34, 22, 0))
    outline.putalpha(outline_mask)
    ink = Image.new("RGBA", label.size, (255, 226, 145, 0))
    ink.putalpha(text_mask)
    label.alpha_composite(outline)
    label.alpha_composite(ink)

    target.parent.mkdir(parents=True, exist_ok=True)
    label.save(target, optimize=True)


def tone_night(image: Image.Image) -> Image.Image:
    """Create a proper night render while keeping every source pixel legible."""
    alpha = image.getchannel("A") if image.mode == "RGBA" else None
    rgb = image.convert("RGB")
    rgb = ImageEnhance.Brightness(rgb).enhance(0.46)
    rgb = ImageEnhance.Color(rgb).enhance(0.72)
    blue = Image.new("RGB", rgb.size, (20, 33, 72))
    result = Image.blend(rgb, blue, 0.28).convert("RGBA")
    if alpha is not None:
        result.putalpha(alpha)
    return result


def compose_town_scene(target_day: Path, target_night: Path) -> None:
    """Compose one continuous spring farmstead with deliberate depth and paths."""
    outdoors = open_rgba(STARDEW / "Maps" / "spring_outdoorsTileSheet..png")
    panorama = open_rgba(STARDEW / "LooseSprites" / "stardewPanorama..png")
    houses = open_rgba(STARDEW / "Buildings" / "houses..png")
    bushes = open_rgba(STARDEW / "TileSheets" / "bushes..png")
    crops = open_rgba(STARDEW / "TileSheets" / "crops..png")
    hoe_dirt = open_rgba(STARDEW / "TerrainFeatures" / "hoeDirt..png")
    tree_one = open_rgba(STARDEW / "TerrainFeatures" / "tree1_spring..png").crop((0, 0, 48, 96))
    tree_two = open_rgba(STARDEW / "TerrainFeatures" / "tree2_spring..png").crop((0, 0, 48, 96))
    tree_three = open_rgba(STARDEW / "TerrainFeatures" / "tree3_spring..png").crop((0, 0, 48, 96))
    # The panorama is already a seamless 640px original. Separate its mountain
    # silhouette from the blue transition strip so the sky reads as one scene,
    # not as an ocean band pasted above the trees.
    scene = panorama.crop((0, 0, 640, 352))
    mountains = panorama.crop((0, 245, 640, 400))
    pixels = mountains.load()
    for y in range(mountains.height):
        for x in range(mountains.width):
            red, green, blue, alpha = pixels[x, y]
            is_blue_horizon = blue > green and blue > red
            is_white_spray = red > 150 and green > 180 and blue > 180
            if is_blue_horizon or is_white_spray:
                pixels[x, y] = (red, green, blue, 0)
    scene.alpha_composite(mountains, (0, 35))

    # Original outdoor tiles form a single field instead of a CSS gradient.
    grass_tiles = [
        crop(outdoors, (0, 192, 16, 208)),
        crop(outdoors, (16, 192, 32, 208)),
        crop(outdoors, (32, 192, 48, 208)),
        crop(outdoors, (48, 192, 64, 208)),
    ]
    grass = tile_canvas((640, 212), grass_tiles)
    scene.alpha_composite(grass, (0, 140))

    # Use the dedicated mature-tree sheets. Every crown is complete; none is
    # clipped from a neighbouring atlas tile.
    tree_specs = [
        (tree_three, 18, 91),
        (tree_one, 118, 88),
        (tree_two, 242, 93),
        (tree_three, 366, 89),
        (tree_one, 492, 91),
        (tree_two, 586, 88),
    ]
    for tree, x, y in tree_specs:
        scene.alpha_composite(tree, (x, y))

    # Continuous fence behind the living space, with real end/post tiles.
    fence_rail = crop(outdoors, (128, 224, 160, 256))
    fence_post = crop(outdoors, (160, 224, 176, 256))
    for x in range(0, 640, 32):
        scene.alpha_composite(fence_rail, (x, 157))
    for x in (0, 96, 192, 288, 384, 480, 608):
        scene.alpha_composite(fence_post, (x, 157))

    # A broad, gently stepped path connects the house, studio and bus road.
    # This is the atlas's seamless, fully opaque dirt tile. The previous
    # prototype accidentally sampled edge/grass tiles, creating green seams.
    dirt_tiles = [crop(outdoors, (48, 96, 64, 112))]
    dirt = tile_canvas(scene.size, dirt_tiles)
    path_mask = Image.new("L", scene.size, 0)
    path_draw = ImageDraw.Draw(path_mask)
    path_draw.rectangle((0, 280, 640, 352), fill=255)
    scene.paste(dirt, (0, 0), path_mask)

    # One clear home anchors the map. Activity zones stay in the open lawn,
    # rather than being stacked against extra buildings.
    home = houses.crop((0, 288, 160, 432))
    scene.alpha_composite(home, (96, 154))

    # A compact 3×2 field beside the farmhouse forms one scene with the hens.
    soil_tile = hoe_dirt.crop((16, 0, 48, 32))
    crop_sprite = crop(crops, (80, 0, 96, 32))
    for y in (205, 237):
        for x in (4, 34, 64):
            scene.alpha_composite(soil_tile, (x, y))
            scene.alpha_composite(crop_sprite, (x + 8, y - 16))

    # Small, authentic farm details keep the spaces connected rather than bare.
    bush = crop(bushes, (0, 0, 32, 32))
    berry_bush = crop(bushes, (32, 0, 64, 32))
    for sprite, pos in [
        (bush, (260, 177)),
    ]:
        scene.alpha_composite(sprite, pos)

    # The horse belongs to a small paddock vignette, with original trough/hay.
    trough = crop(outdoors, (288, 128, 320, 144))
    hay = crop(outdoors, (304, 144, 320, 176))
    scene.alpha_composite(trough, (475, 218))
    scene.alpha_composite(hay, (580, 202))

    # One shared deck now carries both the outdoor cinema and music corner.
    # Keep the original plank pixels while lifting their tone for separation
    # from the dark keyboard and amplifier.
    stage_tile = crop(outdoors, (192, 192, 224, 208))
    stage_tile = ImageEnhance.Brightness(stage_tile).enhance(1.55)
    stage_tile = ImageEnhance.Color(stage_tile).enhance(0.76)
    for y in (272, 288, 304):
        for x in range(316, 572, 32):
            scene.alpha_composite(stage_tile, (x, y))

    target_day.parent.mkdir(parents=True, exist_ok=True)
    scene.save(target_day, optimize=True)

    # Night is a different composition, not a dim filter over the whole image:
    # real Stardew stars and distant mountains replace the daytime panorama.
    night = tone_night(scene)
    night_scene = open_rgba(STARDEW / "Maps" / "nightSceneMaru..png")
    night_sky = night_scene.crop((0, 330, 480, 435)).resize((640, 140), Image.Resampling.NEAREST)
    night.alpha_composite(night_sky, (0, 0))

    # Rebuild the nighttime ground and scenery over the new sky.
    ground_night = tone_night(scene.crop((0, 140, 640, 352)))
    ground_night = ImageEnhance.Brightness(ground_night).enhance(1.2)
    night.alpha_composite(ground_night, (0, 140))

    # Restore complete tree crowns over the night horizon; this avoids a hard
    # horizontal cut through any sprite that crosses the ground boundary.
    for tree, x, y in tree_specs:
        night.alpha_composite(tone_night(tree), (x, y))
    night.save(target_night, optimize=True)


def main() -> None:
    # Studio animations supplied by the site owner.
    copy_asset(SOURCE / "coder.gif", OUTPUT / "studio" / "coder.gif")
    coder_still = Image.open(SOURCE / "coder.gif")
    coder_still.seek(0)
    coder_still.convert("RGBA").save(OUTPUT / "studio" / "coder-still.png", optimize=True)
    copy_asset(
        SOURCE / "Man and robot with computers sitting together in workplace.svg",
        OUTPUT / "studio" / "ai-workplace.svg",
    )
    copy_asset(SOURCE / "Sandy Loading.svg", OUTPUT / "studio" / "sandy-loading.svg")

    compose_town_scene(TOWN / "farmstead-day.png", TOWN / "farmstead-night.png")

    for label in ("music", "photo", "travel", "game", "guitar", "movie"):
        render_stardew_label(label, TOWN / f"label-{label}.png")

    # Props that animate remain separate from the baked map.
    save_png(STARDEW / "Maps" / "spring_BusStop..png", TOWN / "travel-bus-front.png", (0, 0, 128, 240))
    save_png(STARDEW / "TileSheets" / "furniture..png", TOWN / "movie-tv.png", (448, 720, 512, 768))
    save_png(STARDEW / "TileSheets" / "furniture..png", TOWN / "movie-chair.png", (32, 0, 48, 32))
    save_png(STARDEW / "Maps" / "TownIndoors..png", TOWN / "electric-guitar.png", (192, 1408, 256, 1536))
    save_png(STARDEW / "Maps" / "samshowtiles..png", TOWN / "drum-kit.png", (0, 96, 32, 128))
    save_png(STARDEW / "Maps" / "samshowtiles..png", TOWN / "keyboard.png", (136, 172, 160, 192))
    save_png(STARDEW / "Maps" / "samshowtiles..png", TOWN / "amplifier.png", (96, 160, 128, 192))
    save_png(STARDEW / "Maps" / "townInterior..png", TOWN / "arcade-cabinet.png", (32, 704, 48, 736))
    save_png(STARDEW / "TileSheets" / "critters..png", SPRITES / "blue-bird-flight.png", (0, 160, 160, 192))
    save_png(STARDEW / "TileSheets" / "animations..png", SPRITES / "photo-flash.png", (0, 0, 512, 64))
    save_png(STARDEW / "TileSheets" / "animations..png", SPRITES / "pixel-sparkle.png", (0, 192, 512, 256))
    save_png(STARDEW / "LooseSprites" / "shadow..png", SPRITES / "shadow.png")

    # Kent's four directions; left is produced by mirroring the right strip in CSS.
    save_png(STARDEW / "Characters" / "Kent..png", SPRITES / "kent-idle.png", (0, 0, 16, 32))
    save_png(STARDEW / "Characters" / "Kent..png", SPRITES / "kent-walk-down.png", (0, 0, 64, 32))
    save_png(STARDEW / "Characters" / "Kent..png", SPRITES / "kent-walk-right.png", (0, 32, 64, 64))
    save_png(STARDEW / "Characters" / "Kent..png", SPRITES / "kent-walk-up.png", (0, 64, 64, 96))

    save_png(STARDEW / "Animals" / "cat..png", SPRITES / "cat-idle.png", (0, 0, 128, 32))
    save_png(STARDEW / "Animals" / "White Chicken..png", SPRITES / "chicken-peck.png", (0, 0, 64, 16))
    save_png(STARDEW / "Animals" / "Brown Chicken..png", SPRITES / "brown-chicken-peck.png", (0, 0, 64, 16))
    save_png(STARDEW / "Animals" / "horse..png", SPRITES / "horse-walk-side.png", (0, 32, 128, 64))
    save_png(STARDEW / "TileSheets" / "critters..png", SPRITES / "butterfly-flight.png", (0, 96, 320, 128))

    print(f"About world assets written to {OUTPUT}")


if __name__ == "__main__":
    main()
