#!/usr/bin/env python3
"""Import a Notion Markdown export into Hugo page bundles."""

from __future__ import annotations

import argparse
import hashlib
import math
import re
import shutil
from dataclasses import dataclass
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Iterable
from urllib.parse import unquote, urlparse


MARKDOWN_LINK_RE = re.compile(r"(!?)\[([^\]]*)\]\(([^)]+)\)")
NOTION_ID_RE = re.compile(r"\s+[0-9a-f]{16,32}$", re.IGNORECASE)
YAML_FRONT_MATTER_RE = re.compile(r"\A---\s*\n.*?\n---\s*\n", re.DOTALL)
TOML_FRONT_MATTER_RE = re.compile(r"\A\+\+\+\s*\n.*?\n\+\+\+\s*\n", re.DOTALL)
FENCED_CODE_RE = re.compile(r"^\s*(```|~~~)")
INLINE_CODE_RE = re.compile(r"(`+[^`]*`+)")
BOLD_COLON_RE = re.compile(r"\*\*([^*\n]+?)([:：])\s+\*\*")
INLINE_MATH_RE = re.compile(r"(?<!\\)\$(?!\$)(.+?)(?<!\\)\$(?!\$)")
MULTILINE_INLINE_MATH_RE = re.compile(r"(?m)^([ \t]*)\$(?!\$)([^$]*\n[^$]*?)(?<!\\)\$(?!\$)")


@dataclass(frozen=True)
class Page:
    source: Path
    title: str
    slug: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert a Notion Markdown export directory into Hugo post bundles for the notes channel."
    )
    parser.add_argument("export_dir", type=Path, help="Directory exported from Notion as Markdown & CSV.")
    parser.add_argument("--dest", type=Path, default=Path("content/posts"), help="Destination Hugo section.")
    parser.add_argument("--url-prefix", default="/posts", help="Public URL prefix for imported pages.")
    parser.add_argument("--post-type", default="study", help="postType front matter value for channel grouping.")
    parser.add_argument("--category", default="学习笔记", help="Category written to imported notes.")
    parser.add_argument("--tag", action="append", help="Tag to add. Repeat for multiple tags.")
    parser.add_argument("--draft", action="store_true", help="Import notes as drafts.")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing note bundles.")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be imported without writing files.")
    parser.add_argument("--timezone", default="+08:00", help="Timezone offset for generated dates, e.g. +08:00.")
    args = parser.parse_args()
    if args.tag is None:
        args.tag = ["数字花园", "Notion"]
    args.url_prefix = "/" + args.url_prefix.strip("/")
    return args


def clean_title(stem: str) -> str:
    title = unquote(stem).strip()
    title = NOTION_ID_RE.sub("", title)
    title = re.sub(r"\s+", " ", title).strip()
    return title or "Untitled"


def slugify(value: str) -> str:
    value = NOTION_ID_RE.sub("", unquote(value)).strip().lower()
    value = re.sub(r"[^\w\-\s\u4e00-\u9fff]+", "", value)
    value = re.sub(r"[\s_]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    if value:
        return value
    digest = hashlib.sha1(value.encode("utf-8")).hexdigest()[:10]
    return f"note-{digest}"


def unique_slug(base: str, used: set[str]) -> str:
    candidate = base
    index = 2
    while candidate in used:
        candidate = f"{base}-{index}"
        index += 1
    used.add(candidate)
    return candidate


def iter_markdown_files(root: Path) -> Iterable[Path]:
    for path in sorted(root.rglob("*.md")):
        if path.name == "_index.md":
            continue
        if any(part.startswith(".") for part in path.relative_to(root).parts):
            continue
        yield path


def strip_front_matter(text: str) -> str:
    text = YAML_FRONT_MATTER_RE.sub("", text, count=1)
    text = TOML_FRONT_MATTER_RE.sub("", text, count=1)
    return text.lstrip()


def title_from_body(text: str, fallback: str) -> tuple[str, str]:
    lines = text.splitlines()
    for index, line in enumerate(lines[:12]):
        match = re.match(r"^#\s+(.+?)\s*$", line)
        if match:
            title = match.group(1).strip()
            del lines[index]
            return title, "\n".join(lines).lstrip()
    return fallback, text


def normalize_heading_depth(line: str) -> str:
    match = re.match(r"^(#{1,5})(\s+.+)$", line)
    if not match:
        return line
    hashes, rest = match.groups()
    return f"{hashes}#{rest}"


def normalize_heading_markup(line: str) -> str:
    match = re.match(r"^(#{1,6})(\s+)(.+)$", line)
    if not match:
        return line

    hashes, spacing, title = match.groups()
    title = re.sub(r"\*\*([^*]+)\*\*", r"\1", title)
    title = re.sub(r"(?<!\\)\$(?!\$)(.+?)(?<!\\)\$(?!\$)", r"\1", title)
    title = re.sub(r"\\\((.+?)\\\)", r"\1", title)
    title = re.sub(r"\\([A-Za-z]+)", r"\1", title)
    title = re.sub(r"\s+", " ", title).strip()
    return f"{hashes}{spacing}{title}"


def looks_like_math(value: str) -> bool:
    value = value.strip()
    if not value or "\n" in value:
        return False
    if value[0].isdigit() and re.fullmatch(r"[\d,]+(?:\.\d+)?", value):
        return False
    math_chars = set(r"\_^{}=<>|,+-*/()[]≈≤≥×÷±√∞∑∏∂∇∈∉⊂⊆→←↔₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹̂")
    return any(char in math_chars for char in value) or bool(
        re.search(r"[A-Za-z]\d|[A-Za-z]_[A-Za-z0-9]", value)
        or re.search(r"\b[A-Za-z](?:')?\s+[A-Za-z](?:')?\b", value)
        or re.fullmatch(r"[A-Za-z](?:['*])?", value)
    )


def clean_math_inner(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value.startswith("*") and value.endswith("*"):
        value = value[1:-1].strip()
    return sanitize_tex_comparisons(value)


def sanitize_tex_comparisons(value: str) -> str:
    value = re.sub(r"(?<!\\)<=", r"\\le ", value)
    value = re.sub(r"(?<!\\)>=", r"\\ge ", value)
    value = re.sub(r"(?<!\\)<", r"\\lt ", value)
    value = re.sub(r"(?<!\\)>", r"\\gt ", value)
    return value


def normalize_math_block_line(value: str) -> str:
    value = sanitize_tex_comparisons(value.strip())
    return re.sub(r"^([+-])(\s+)", r"\\mathord{\1}\2", value)


def bold_needs_trailing_space(next_char: str) -> bool:
    return bool(re.match(r"[A-Za-z0-9\u4e00-\u9fff`“\"'「『《]", next_char))


def bold_needs_leading_space(prev_char: str) -> bool:
    return bool(re.match(r"[A-Za-z0-9\u4e00-\u9fff）】」』》]", prev_char))


def normalize_strong_boundaries_segment(segment: str) -> str:
    output: list[str] = []
    index = 0

    while index < len(segment):
        if segment.startswith("**", index):
            end = segment.find("**", index + 2)
            if end != -1:
                end += 2
                if output and output[-1] and not output[-1].endswith((" ", "\t", "\n")) and bold_needs_leading_space(output[-1][-1]):
                    output.append(" ")
                output.append(segment[index:end])
                index = end
                if index < len(segment) and bold_needs_trailing_space(segment[index]):
                    output.append(" ")
                continue

        output.append(segment[index])
        index += 1

    return "".join(output)


def normalize_strong_boundaries(line: str) -> str:
    if "**" not in line:
        return line
    parts = INLINE_CODE_RE.split(line)
    for index, part in enumerate(parts):
        if index % 2 == 0:
            parts[index] = normalize_strong_boundaries_segment(part)
    return "".join(parts)


def normalize_inline_math_segment(segment: str) -> str:
    def replace(match: re.Match[str]) -> str:
        inner = clean_math_inner(match.group(1))
        if not looks_like_math(inner):
            return match.group(0)
        return rf"\({inner}\)"

    return INLINE_MATH_RE.sub(replace, segment)


def normalize_inline_math(line: str) -> str:
    if "$" not in line:
        return line
    parts = INLINE_CODE_RE.split(line)
    for index, part in enumerate(parts):
        if index % 2 == 0:
            parts[index] = normalize_inline_math_segment(part)
    return "".join(parts)


def escape_cjk_angle_brackets(line: str) -> str:
    return re.sub(r"<([^<>\n]*[\u4e00-\u9fff][^<>\n]*)>", r"&lt;\1&gt;", line)


def normalize_multiline_inline_math(text: str) -> str:
    def replace(match: re.Match[str]) -> str:
        indent, value = match.groups()
        inner = re.sub(r"\s*\n\s*", " ", value).strip()
        if not looks_like_math(inner):
            return match.group(0)
        return rf"{indent}\({clean_math_inner(inner)}\)"

    return MULTILINE_INLINE_MATH_RE.sub(replace, text)


def normalize_multiline_inline_math_outside_blocks(text: str) -> str:
    chunks: list[str] = []
    pending_text: list[str] = []
    in_code_fence = False
    in_math_block = False

    def flush_pending_text() -> None:
        if pending_text:
            chunks.append(normalize_multiline_inline_math("\n".join(pending_text)))
            pending_text.clear()

    for line in text.splitlines():
        stripped = line.strip()

        if FENCED_CODE_RE.match(line):
            flush_pending_text()
            chunks.append(line)
            in_code_fence = not in_code_fence
            continue

        if in_code_fence:
            chunks.append(line)
            continue

        if in_math_block:
            chunks.append(line)
            if stripped == "$$" or stripped.endswith("$$"):
                in_math_block = False
            continue

        if stripped.startswith("$$"):
            flush_pending_text()
            chunks.append(line)
            after_open = stripped[2:].strip()
            if not after_open.endswith("$$"):
                in_math_block = True
            continue

        pending_text.append(line)

    flush_pending_text()
    return "\n".join(chunks)


def normalize_notion_markdown(text: str) -> str:
    text = normalize_multiline_inline_math_outside_blocks(text)
    normalized_lines: list[str] = []
    in_code_fence = False
    in_math_block = False
    in_aside = False

    for line in text.splitlines():
        if FENCED_CODE_RE.match(line):
            normalized_lines.append(line)
            in_code_fence = not in_code_fence
            continue

        if in_code_fence:
            normalized_lines.append(line)
            continue

        stripped = line.strip()

        if stripped == "<aside>":
            normalized_lines.append("> **提示**")
            in_aside = True
            continue

        if stripped == "</aside>":
            normalized_lines.append("")
            in_aside = False
            continue

        if in_aside:
            if not stripped:
                normalized_lines.append(">")
                continue
            if len(stripped) <= 2 and not re.search(r"[\w\u4e00-\u9fff]", stripped):
                normalized_lines.append(">")
                continue
            line = normalize_heading_depth(stripped)
            line = BOLD_COLON_RE.sub(r"**\1\2** ", line)
            line = normalize_strong_boundaries(line)
            line = normalize_inline_math(line)
            line = escape_cjk_angle_brackets(line)
            normalized_lines.append(f"> {line}")
            continue

        if in_math_block:
            if not stripped:
                continue

            if stripped == "$$":
                normalized_lines.append(r"\]")
                in_math_block = False
                continue

            if stripped.endswith("$$"):
                before_close = stripped[:-2].strip()
                if before_close:
                    normalized_lines.append(normalize_math_block_line(before_close))
                normalized_lines.append(r"\]")
                in_math_block = False
                continue

            normalized_lines.append(normalize_math_block_line(stripped))
            continue

        if stripped.startswith("$$"):
            after_open = stripped[2:].strip()
            normalized_lines.append(r"\[")

            if after_open.endswith("$$"):
                inner = after_open[:-2].strip()
                if inner:
                    normalized_lines.append(normalize_math_block_line(inner))
                normalized_lines.append(r"\]")
            else:
                if after_open:
                    normalized_lines.append(normalize_math_block_line(after_open))
                in_math_block = True

            continue

        line = normalize_heading_depth(line)
        if re.match(r"^#{1,6}\s+", line):
            line = normalize_heading_markup(line)
            line = escape_cjk_angle_brackets(line)
            normalized_lines.append(line)
            continue

        line = BOLD_COLON_RE.sub(r"**\1\2** ", line)
        line = normalize_strong_boundaries(line)
        line = normalize_inline_math(line)
        line = escape_cjk_angle_brackets(line)
        normalized_lines.append(line)

    if in_math_block:
        normalized_lines.append(r"\]")

    return "\n".join(normalized_lines)


def toml_string(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def toml_array(values: list[str]) -> str:
    return "[" + ", ".join(toml_string(value) for value in values if value) + "]"


def estimate_word_count(text: str) -> int:
    text = re.sub(r"```.*?```", " ", text, flags=re.DOTALL)
    text = re.sub(r"~~~.*?~~~", " ", text, flags=re.DOTALL)
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\{\{<[^>]+>\}\}", " ", text)
    text = re.sub(r"\\\[(.*?)\\\]", r" \1 ", text, flags=re.DOTALL)
    text = re.sub(r"\\\((.*?)\\\)", r" \1 ", text, flags=re.DOTALL)
    text = re.sub(r"\\[A-Za-z]+", " ", text)
    text = re.sub(r"[#>*_`~\[\]{}()|=+\\/:;,.!?，。！？、；：]", " ", text)
    cjk_count = len(re.findall(r"[\u4e00-\u9fff]", text))
    latin_count = len(re.findall(r"[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?", text))
    return cjk_count + latin_count


def estimate_reading_time(word_count: int) -> int:
    return max(1, math.ceil(word_count / 500))


def parse_timezone(value: str) -> timezone:
    match = re.fullmatch(r"([+-])(\d{2}):?(\d{2})", value)
    if not match:
        raise ValueError(f"Invalid timezone offset: {value}")
    sign, hours, minutes = match.groups()
    delta = timedelta(hours=int(hours), minutes=int(minutes))
    if sign == "-":
        delta = -delta
    return timezone(delta)


def page_date(path: Path, tz: timezone) -> str:
    modified = datetime.fromtimestamp(path.stat().st_mtime, tz=tz)
    return modified.replace(microsecond=0).isoformat()


def front_matter(page: Page, source_root: Path, args: argparse.Namespace, tz: timezone, body: str) -> str:
    source_rel = page.source.relative_to(source_root).as_posix()
    word_count = estimate_word_count(body)
    reading_time = estimate_reading_time(word_count)
    fields = [
        "+++",
        f"title = {toml_string(page.title)}",
        f"description = {toml_string(page.title)}",
        f"summary = {toml_string(page.title)}",
        f'date = "{page_date(page.source, tz)}"',
        f"draft = {str(args.draft).lower()}",
        f"postType = {toml_string(args.post_type)}",
        f"tags = {toml_array(args.tag)}",
        f"categories = {toml_array([args.category])}",
        "showTableOfContents = true",
        "showWordCount = true",
        "showReadingTime = true",
        f"wordCount = {word_count}",
        f"readingTime = {reading_time}",
        f"notionSource = {toml_string(source_rel)}",
        "+++",
        "",
        "{{< katex >}}",
        "",
    ]
    return "\n".join(fields)


def normalize_link_target(raw_target: str) -> tuple[str, str]:
    target = raw_target.strip()
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1].strip()
    if " " in target and not target.startswith(("http://", "https://")):
        # Notion leaves spaces unescaped; keep the whole target intact.
        pass
    parsed = urlparse(target)
    path = unquote(parsed.path)
    suffix = ""
    if parsed.query:
        suffix += f"?{parsed.query}"
    if parsed.fragment:
        suffix += f"#{parsed.fragment}"
    return path, suffix


def unique_asset_name(name: str, used: set[str]) -> str:
    safe_name = re.sub(r"[^\w.\-\u4e00-\u9fff]+", "-", name).strip("-") or "asset"
    candidate = safe_name
    stem = Path(safe_name).stem
    suffix = Path(safe_name).suffix
    index = 2
    while candidate in used:
        candidate = f"{stem}-{index}{suffix}"
        index += 1
    used.add(candidate)
    return candidate


def resolve_local_path(base_dir: Path, target_path: str) -> Path | None:
    if not target_path or target_path.startswith("#"):
        return None
    parsed = urlparse(target_path)
    if parsed.scheme or parsed.netloc or target_path.startswith("/"):
        return None
    return (base_dir / unquote(target_path)).resolve()


def rewrite_links(
    text: str,
    page: Page,
    output_dir: Path,
    page_by_source: dict[Path, Page],
    url_prefix: str,
    dry_run: bool,
) -> str:
    assets_dir = output_dir / "assets"
    used_asset_names: set[str] = set()
    copied_assets: dict[Path, Path] = {}

    def replace(match: re.Match[str]) -> str:
        bang, label, raw_target = match.groups()
        target_path, suffix = normalize_link_target(raw_target)
        local_path = resolve_local_path(page.source.parent, target_path)

        if not local_path or not local_path.exists():
            return match.group(0)

        if local_path.suffix.lower() == ".md" and local_path in page_by_source:
            target_page = page_by_source[local_path]
            return f"[{label}]({url_prefix}/{target_page.slug}/{suffix})"

        if local_path.is_file():
            asset_rel = copied_assets.get(local_path)
            if not asset_rel:
                asset_name = unique_asset_name(local_path.name, used_asset_names)
                asset_rel = Path("assets") / asset_name
                copied_assets[local_path] = asset_rel
            if not dry_run:
                assets_dir.mkdir(parents=True, exist_ok=True)
                shutil.copy2(local_path, output_dir / asset_rel)
            return f"{bang}[{label}]({asset_rel.as_posix()}{suffix})"

        return match.group(0)

    return MARKDOWN_LINK_RE.sub(replace, text)


def discover_pages(source_root: Path) -> list[Page]:
    used_slugs: set[str] = set()
    pages: list[Page] = []
    for md_path in iter_markdown_files(source_root):
        raw_text = md_path.read_text(encoding="utf-8", errors="replace")
        body = strip_front_matter(raw_text)
        fallback = clean_title(md_path.stem)
        title, _ = title_from_body(body, fallback)
        slug = unique_slug(slugify(title), used_slugs)
        pages.append(Page(source=md_path.resolve(), title=title, slug=slug))
    return pages


def import_page(
    page: Page,
    source_root: Path,
    page_by_source: dict[Path, Page],
    args: argparse.Namespace,
    tz: timezone,
) -> str:
    output_dir = args.dest / page.slug
    output_file = output_dir / "index.md"

    if output_file.exists() and not args.overwrite:
        return f"skip existing: {output_file}"

    raw_text = page.source.read_text(encoding="utf-8", errors="replace")
    body = strip_front_matter(raw_text)
    _, body = title_from_body(body, page.title)
    body = normalize_notion_markdown(body)
    body = rewrite_links(body, page, output_dir, page_by_source, args.url_prefix, args.dry_run)
    rendered = front_matter(page, source_root, args, tz, body) + body.rstrip() + "\n"

    if not args.dry_run:
        output_dir.mkdir(parents=True, exist_ok=True)
        output_file.write_text(rendered, encoding="utf-8")

    return f"import: {page.source.relative_to(source_root)} -> {output_file}"


def main() -> int:
    args = parse_args()
    source_root = args.export_dir.resolve()
    args.dest = args.dest.resolve()

    if not source_root.exists() or not source_root.is_dir():
        raise SystemExit(f"Export directory does not exist: {source_root}")

    tz = parse_timezone(args.timezone)
    pages = discover_pages(source_root)
    page_by_source = {page.source: page for page in pages}

    if not pages:
        print(f"No Markdown files found in {source_root}")
        return 0

    for page in pages:
        print(import_page(page, source_root, page_by_source, args, tz))

    action = "Would import" if args.dry_run else "Imported"
    print(f"{action} {len(pages)} page(s) into {args.dest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
