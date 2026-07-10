# CSS architecture

The local head partial loads the global styles in this exact order:

1. `foundation/tokens.css` — namespaced `--steph-*` design tokens
2. `layers/global.css` — site-wide color variables and shared overrides
3. `layers/article.css` — article reading system and TOC base rules
4. `layers/channels.css` — posts hub, notes, and daily channel pages
5. `layers/article-overrides.css` — late article compatibility overrides
6. `layers/responsive.css` — legacy mobile rules kept in their original cascade position
7. `layers/navigation.css` — mobile navigation overrides
8. `layers/about-overrides.css` — final About heading corrections

The order intentionally matches the former `custom.css` byte-for-byte. Do not
reorder compatibility layers during visual work; consolidate them only in a
separate change with desktop/mobile and light/dark regression checks.

Page-owned styles live in `pages/` and are loaded at their original Markdown
position through the `page-style` shortcode. This preserves the previous
cascade while keeping CSS out of content files.
