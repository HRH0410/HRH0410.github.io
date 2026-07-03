# Notion 迁移说明

优先使用 Notion MCP 直接读取页面；如果需要一次性迁移大量页面，也可以使用 Notion 官方导出的 Markdown 包。

## 迁移步骤

1. 在 Notion 中选择要迁移的页面或数据库，使用 `Export`。
2. 格式选择 `Markdown & CSV`，建议勾选包含子页面。
3. 解压导出的 zip 文件。
4. 在本站仓库根目录运行：

```bash
npm run import:notion -- "/path/to/notion-export"
```

默认会导入到 `content/posts`，并写入 `postType = "study"`，这样会自动出现在「文章」里的 `/notes/`「拾光笔记」频道，和 `Transformer 学习笔记` 是同一套结构。每篇笔记会变成 Hugo page bundle：

```text
content/posts/my-note/
  index.md
  assets/
    image.png
```

## 常用参数

```bash
npm run import:notion -- "/path/to/notion-export" --dry-run
npm run import:notion -- "/path/to/notion-export" --overwrite
npm run import:notion -- "/path/to/notion-export" --draft
npm run import:notion -- "/path/to/notion-export" --tag "课程笔记" --category "学习笔记"
npm run import:notion -- "/path/to/notion-export" --post-type "personal"
```

脚本会处理：

- Notion Markdown 页面转 Hugo TOML front matter
- 图片和附件复制到对应笔记的 `assets/`
- Notion 导出中的本地 Markdown 页面链接转为 `/posts/<slug>/`
- `# 一级标题` 自动作为页面标题，并从正文中移除，避免重复标题

导入后可以运行 Hugo 本地预览，确认页面和图片是否正常。
