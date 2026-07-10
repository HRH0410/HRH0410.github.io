# 网站架构说明（第一版）

> 目标：这份文档用于快速定位本项目的页面结构、模板关系、样式来源与维护流程。  
> 适用对象：你自己 + 后续协作的 AI（避免“改错页面/改错文件”）。

## 1. 技术栈与总体结构

- 静态站点框架：Hugo
- 主题：Blowfish（`theme = "blowfish"`）
- 主要自定义方式：
  - `content/` 页面内容（保留页面 HTML 结构，不再内联大段 `<style>`）
  - `layouts/` 局部模板覆盖（优先级高于主题）
  - `assets/css/foundation/` 统一设计变量
  - `assets/css/layers/` 全站样式分层
  - `assets/css/pages/` 页面专属样式
  - `static/` 静态资源（图片等）

## 2. 目录职责

- `content/`：站点内容（首页、文章、项目、关于我等）
- `layouts/`：自定义模板（列表页、header、首页背景、head 扩展）
- `assets/css/foundation/tokens.css`：颜色、字体、间距、圆角、布局与动效变量
- `assets/css/layers/`：全局、文章、频道、响应式与导航样式层
- `assets/css/pages/`：首页、About、项目等页面级样式
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
- 当前实现：页面结构保留在内容文件，专属样式位于 `assets/css/pages/projects.css`

### 3.5 关于我页

- 路由：`/about/`
- 内容文件：`content/about/index.md`
- 特点：内容与自定义组件块保留在 Markdown，样式位于 `assets/css/pages/about-content.css`

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

- 加载模板：`layouts/partials/head.html`
- 设计变量：`assets/css/foundation/tokens.css`（统一使用 `--steph-*` 命名空间）
- 全局基础：`assets/css/layers/global.css`
- 文章系统：`assets/css/layers/article.css` + `article-overrides.css`
- 频道系统：`assets/css/layers/channels.css`
- 响应式兼容：`assets/css/layers/responsive.css`
- 导航覆盖：`assets/css/layers/navigation.css`
- About 最终覆盖：`assets/css/layers/about-overrides.css`

以上文件按旧 `custom.css` 的原始顺序加载，不能随意调整顺序。

## 5.2 页面样式

- 首页：`assets/css/pages/home-content.css`
- About：`assets/css/pages/about-content.css`
- 项目页：`assets/css/pages/projects.css`

内容文件在原 `<style>` 位置使用 `page-style` shortcode 加载对应资源，从而保持原有 CSS 层叠顺序。

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
2. 改 notes/daily 风格：优先改 `assets/css/layers/channels.css`
3. 改项目页结构：`content/projects/_index.md`；改视觉：`assets/css/pages/projects.css`
4. 改首页结构：`content/_index.md`；改视觉：`assets/css/pages/home-content.css` + `assets/css/pages/home.css`
5. 改固定导航：`layouts/partials/header/fixed-fill-blur.html`

## 11. 技术债与后续可选优化（非必须）

- 将部分内联 HTML 组件抽成 `layouts/partials/*`，提高复用性。
- `article-overrides.css` 与 `responsive.css` 仍保留旧层叠顺序；后续若合并重复规则，必须单独做视觉回归。

## 12. 最近变更快照（2026-02-09）

### 12.1 项目页已重构为“展陈风”

- 文件：`content/projects/_index.md`
- 核心结构：
  - `projects-hero`（页头导语）
  - `feature-grid`（代表项目，不对称 7/5 栅格）
  - `course-grid`（课程作品，3 列工作卡）
- 关键样式：
  - 样式已迁移到 `assets/css/pages/projects.css`
  - 标题避让 fixed nav 使用：
    - `main#main-content > article > header > h1 { margin-top: ... }`
  - 深色模式在同文件内配套覆盖（`.dark ...`）

### 12.2 About This Site 引用区已独立风格化

- 文件：`content/about/index.md`
- 相关样式类：
  - `.about-site-text`
  - `.about-site-highlight`
  - `.about-site-quote`
- 当前目标：克制、居中、低装饰；避免与 About 其它模块割裂。

### 12.3 一个关键坑：Markdown 与原生 HTML 混排

- 在 `content/*.md` 里写原生 HTML 时，如果块内行首有缩进，Hugo/Goldmark 可能把后续内容渲染成代码块（`<pre><code>`）。
- 规避规则：
  - 原生 HTML 块尽量顶格写（不加多余缩进）。
  - 改完后检查 `public/*.html` 是否出现异常 `<pre><code>`。

---

如果后续出现“改动不生效/改错页”，先按下面顺序排查：

1. 路由对应的内容文件是否正确
2. 该路由是否有 `layouts/` 覆盖模板
3. 样式是在 `custom.css` 还是页面内联 `<style>`
4. 是否是 `public/` 旧缓存（强刷 + 重新构建）
