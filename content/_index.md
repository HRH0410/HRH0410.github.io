---
title: ""
layout: "background"
showAuthor: false
showTaxonomies: false
showDate: false
---

{{< page-style "css/pages/home-content.css" >}}

<div class="glass-card">

  <img src="/img/author.jpg" alt="Steph.H" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; margin-bottom: 2rem;" class="floating-avatar nozoom" data-no-zoom="true">

  <h1 style="font-size: 2.4rem; font-weight: 800; margin-bottom: 3rem; letter-spacing: 0.01em; line-height: 1.3;">
    {{< typeit speed=70 lifeLike=true >}}
    Hi, 我是 Steph.H 👋
    一名行走在数字世界里的漫游者 {{< /typeit >}}
  </h1>

  <div class="info-text" style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 3.5rem; color: #666; font-size: 0.95rem; align-items: center;">
    <span style="display: flex; align-items: center; gap: 6px;">
      {{< icon "location-dot" >}} 苏州 · NJU
    </span>
    <span class="info-separator" style="opacity: 0.3;">|</span>
    <span style="display: flex; align-items: center; gap: 6px;">{{< icon "fire" >}} 正在探索 AI Product</span>
    <span class="info-separator" style="opacity: 0.3;">|</span>
    <span style="display: flex; align-items: center; gap: 6px;">{{< icon "mug-hot" >}} 近况：在世界里慢慢走</span>
  </div>

  <div style="margin-bottom: 2rem; max-width: 550px; margin-left: auto; margin-right: auto;">
    <p class="quote-text" style="font-family: serif; font-style: italic; color: #777; font-size: 1.10rem; line-height: 1.8; opacity: 0.9;">
      —— " 只有滚动的石头 才能不长青苔"
    </p>
  </div>

  {{< home-record-carousel >}}

  <!-- 四个导航入口 - 带分隔线的立体设计 -->
  <div class="home-nav-grid" style="display: flex; justify-content: center; align-items: stretch; flex-wrap: nowrap; margin: 0 auto; position: relative;">
    <!-- 顶部装饰线 -->
    <div class="separator-line-horizontal" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);"></div>
    <a href="/notes/" class="garden-nav-item is-magnetic" style="padding: 1.5rem 2rem; position: relative;">
      <span style="font-size: 0.6rem; letter-spacing: 0.2rem; text-transform: uppercase; font-weight: 300;">Vol. 01</span>
      <span class="nav-title" style="font-size: 1.05rem; font-weight: 600; margin-top: 0.35rem; position: relative;">拾光笔记</span>
      <span style="font-size: 0.65rem; margin-top: 0.4rem; font-weight: 300;">学习与记录</span>
    </a>
    <!-- 竖线分隔 -->
    <div class="separator-line-vertical" style="width: 1px; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.08), transparent); margin: 0.5rem 0;"></div>
    <a href="/daily/" class="garden-nav-item is-magnetic" style="padding: 1.5rem 2rem; position: relative;">
      <span style="font-size: 0.6rem; letter-spacing: 0.2rem; text-transform: uppercase; font-weight: 300;">Vol. 02</span>
      <span class="nav-title" style="font-size: 1.05rem; font-weight: 600; margin-top: 0.35rem; position: relative;">漫步日常</span>
      <span style="font-size: 0.65rem; margin-top: 0.4rem; font-weight: 300;">生活与思考</span>
    </a>
    <!-- 竖线分隔 -->
    <div class="separator-line-vertical" style="width: 1px; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.08), transparent); margin: 0.5rem 0;"></div>
    <a href="/projects/" class="garden-nav-item is-magnetic" style="padding: 1.5rem 2rem; position: relative;">
      <span style="font-size: 0.6rem; letter-spacing: 0.2rem; text-transform: uppercase; font-weight: 300;">Vol. 03</span>
      <span class="nav-title" style="font-size: 1.05rem; font-weight: 600; margin-top: 0.35rem; position: relative;">造物手记</span>
      <span style="font-size: 0.65rem; margin-top: 0.4rem; font-weight: 300;">项目与作品</span>
    </a>
    <!-- 竖线分隔 -->
    <div class="separator-line-vertical" style="width: 1px; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.08), transparent); margin: 0.5rem 0;"></div>
    <a href="/about/" class="garden-nav-item is-magnetic" style="padding: 1.5rem 2rem; position: relative;">
      <span style="font-size: 0.6rem; letter-spacing: 0.2rem; text-transform: uppercase; font-weight: 300;">Vol. 04</span>
      <span class="nav-title" style="font-size: 1.05rem; font-weight: 600; margin-top: 0.35rem; position: relative;">关于我</span>
      <span style="font-size: 0.65rem; margin-top: 0.4rem; font-weight: 300;">认识一下</span>
    </a>
    <!-- 底部装饰线 -->
    <div class="separator-line-horizontal" style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);"></div>
  </div>

  <!-- 社交链接 - 更精致的设计 -->
  <div style="margin-top: 3rem; margin-bottom: 2rem;">
    <div style="display: flex; justify-content: center; align-items: center; gap: 1.5rem; font-size: 1.5rem;">
      <div style="flex: 1; height: 1px; background: linear-gradient(to left, rgba(0,0,0,0.08), transparent); max-width: 80px;"></div>
      <a href="https://github.com/HRH0410" style="color: inherit; opacity: 0.45; transition: all 0.3s ease; padding: 0.5rem;" target="_blank" onmouseover="this.style.opacity='1'; this.style.transform='translateY(-3px)'" onmouseout="this.style.opacity='0.45'; this.style.transform='translateY(0)'">{{< icon "github" >}}</a>
      <a href="https://space.bilibili.com/1834168183" style="color: inherit; opacity: 0.45; transition: all 0.3s ease; padding: 0.5rem;" target="_blank" onmouseover="this.style.opacity='1'; this.style.transform='translateY(-3px)'" onmouseout="this.style.opacity='0.45'; this.style.transform='translateY(0)'">{{< icon "bilibili" >}}</a>
      <a href="https://v.douyin.com/W9pAmwPcBcg/" style="color: inherit; opacity: 0.45; transition: all 0.3s ease; padding: 0.5rem;" target="_blank" onmouseover="this.style.opacity='1'; this.style.transform='translateY(-3px)'" onmouseout="this.style.opacity='0.45'; this.style.transform='translateY(0)'">{{< icon "dou" >}}</a>
      <div style="flex: 1; height: 1px; background: linear-gradient(to right, rgba(0,0,0,0.08), transparent); max-width: 80px;"></div>
    </div>
  </div>

</div>

<div class="manifesto-text" style="margin: 4rem 0 5rem; text-align: center; opacity: 0.25; font-size: 0.8rem; letter-spacing: 0.4rem; font-family: monospace;">
  🌱 DIGITAL GARDEN MANIFESTO
</div>
