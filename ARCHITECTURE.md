# 网站架构说明（第一版）

> 目标：这份文档用于快速定位本项目的页面结构、模板关系、样式来源与维护流程。  
> 适用对象：你自己 + 后续协作的 AI（避免“改错页面/改错文件”）。

## 1. 技术栈与总体结构

- 静态站点框架：Hugo
- 主题：Blowfish（`theme = "blowfish"`）
- 主要自定义方式：
  - `content/` 页面内容（大量页面内联 HTML + `<style>`）
  - `layouts/` 局部模板覆盖（优先级高于主题）
  - `assets/css/custom.css` 全站样式补丁
  - `static/` 静态资源（图片等）

## 2. 目录职责

- `content/`：站点内容（首页、文章、项目、关于我等）
- `layouts/`：自定义模板（列表页、header、首页背景、head 扩展）
- `assets/css/custom.css`：全局样式入口（目前体量最大）
- `static/img/`：文章图片、站点图片等
- `config/_default/`：Hugo 与主题配置（语言、菜单、参数、markup）
- `public/`：构建产物（生成目录，不作为“源码编辑”入口）

## 3. 路由与模板映射

### 3.1 顶部主导航（中文）

配置文件：`config/_default/menus.zh-cn.toml`

- `文章` -> `/posts/`
- `项目` -> `/projects/`
- `关于我` -> `/about/`

### 3.2 首页

- 内容文件：`content/_index.md`
- 使用布局：`layout = "background"`（前言）
- 背景模板：`layouts/partials/home/background.html`
- 首页风格特点：高度定制，包含较多内联样式与分区入口（Vol.01/02/03/04）

### 3.3 文章体系（已拆分）

- 主入口页：`/posts/`
  - 模板：`layouts/posts/list.html`
  - 作用：文章导航/统计页（跳转到两个频道）
- 频道页：
  - `/notes/` -> `layouts/notes/list.html`
  - `/daily/` -> `layouts/daily/list.html`
  - 两者共用 partial：`layouts/partials/posts/channel-list.html`

### 3.4 项目页

- 路由：`/projects/`
- 内容文件：`content/projects/_index.md`
- 布局：`layout = "simple"`
- 当前实现：页面结构 + 专属样式都写在该文件内（内联 `<style>`）

### 3.5 关于我页

- 路由：`/about/`
- 内容文件：`content/about/index.md`
- 特点：内容与样式高度共址（内联 `<style>` + 自定义组件块）

## 4. 数据模型与内容约定

## 4.1 Post 分类规则（关键）

文章实际都存放在 `content/posts/`，通过 front matter 字段分流：

- `postType = "study"` -> 出现在 `/notes/`
- `postType = "personal"` -> 出现在 `/daily/`

示例文件：

- `content/posts/transformer-notes.md`（study）
- `content/posts/why-i-built-this-site.md`（personal）

若漏写 `postType`，将不会被频道正确分组（但仍可能出现在总文章列表里）。

## 4.2 标签/分类

- 站点 taxonomy 在 `config/_default/hugo.toml` 中定义：
  - `tags`, `categories`, `authors`, `series`
- 当前文章标签已收敛为你想保留的主标签体系（如“数字花园”）。

## 5. 样式分层（非常重要）

## 5.1 全局样式入口

- 文件：`assets/css/custom.css`
- 作用：
  - 覆盖 Blowfish 默认视觉
  - TOC 样式
  - 文章页顶部避让 fixed nav
  - 图注与图片尺寸控制（含横图识别类 `is-landscape`）
  - admonition（重点框）重绘
  - `/posts/`、`/notes/`、`/daily/` 页面样式

## 5.2 页面内联样式

以下页面将样式与内容写在同一文件：

- `content/_index.md`（首页）
- `content/about/index.md`
- `content/projects/_index.md`

优点：改页面快。  
代价：样式分散，不便统一重构。

## 6. 关键自定义模板说明

### 6.1 固定胶囊导航

- 文件：`layouts/partials/header/fixed-fill-blur.html`
- 作用：重做 header，使用固定毛玻璃胶囊样式
- 关联配置：`config/_default/params.toml` -> `[header] layout = "fixed-fill-blur"`

### 6.2 首页背景布局

- 文件：`layouts/partials/home/background.html`
- 作用：控制首页背景图与内容容器
- 关联配置：`params.toml` -> `[homepage] layout = "background"`

### 6.3 Head 扩展（图片横竖识别）

- 文件：`layouts/partials/extend-head-uncached.html`
- 作用：前端脚本为文章图片自动打 `.is-landscape` 类
- 用途：配合 `custom.css` 对横图统一限宽

## 7. 数学公式与 Markdown 渲染

配置文件：`config/_default/markup.toml`

- 开启 Goldmark passthrough：
  - 行内：`\(...\)`
  - 块级：`\[...\]` 与 `$$...$$`
- 页面中可使用 `{{< katex >}}` shortcode（如 Transformer 笔记）

## 8. 资源组织

- 头像/站点图标：
  - `assets/img/author.jpg`
  - `assets/icons/*.svg`
- 文章图片（尤其 Transformer）：
  - `static/img/posts/transformer/*`
- 文章内引用统一使用 `/img/...` 绝对路径

## 9. 常用维护操作

## 9.1 本地预览

```bash
hugo server -D --disableFastRender
```

- `-D`：预览草稿
- 访问：`http://localhost:1313`

## 9.2 生产构建（当前常用命令）

```bash
CACHE_DIR="$(pwd)/.hugo_cache" && hugo --minify --gc --cleanDestinationDir --cacheDir "$CACHE_DIR"
```

## 9.3 改动后最少检查页

- `/`（首页）
- `/posts/`（文章导航页）
- `/notes/`（学习频道）
- `/daily/`（日常频道）
- `/projects/`（项目页）
- `/about/`（关于页）

## 10. 当前架构下的编辑建议

1. 改频道聚合逻辑：优先改 `layouts/posts/list.html` 和 `layouts/partials/posts/channel-list.html`  
2. 改 notes/daily 风格：优先改 `assets/css/custom.css` 的 `channel-*` 样式段  
3. 改项目页：直接改 `content/projects/_index.md`（当前是页面内联样式）  
4. 改首页视觉：`content/_index.md` + `layouts/partials/home/background.html`  
5. 改固定导航：`layouts/partials/header/fixed-fill-blur.html`

## 11. 技术债与后续可选优化（非必须）

- `assets/css/custom.css` 体量较大，可分拆为：
  - `article.css`
  - `posts-hub.css`
  - `channel.css`
  - `global-overrides.css`
- 将 `content/projects/_index.md`、`content/about/index.md` 的内联样式迁移到 `assets/css`，减少内容文件复杂度。
- 将部分内联 HTML 组件抽成 `layouts/partials/*`，提高复用性。

---

如果后续出现“改动不生效/改错页”，先按下面顺序排查：

1. 路由对应的内容文件是否正确
2. 该路由是否有 `layouts/` 覆盖模板
3. 样式是在 `custom.css` 还是页面内联 `<style>`
4. 是否是 `public/` 旧缓存（强刷 + 重新构建）
