---
title: ""
layout: "background"
showAuthor: false
showTaxonomies: false
showDate: false
---

<style>
  /* 基础清理 */
  header + .relative { display: none !important; }

  @keyframes bgFloat {
    0% { transform: scale(1.03) translate3d(0, 0, 0); }
    50% { transform: scale(1.035) translate3d(0, -6px, 0); }
    100% { transform: scale(1.03) translate3d(0, 0, 0); }
  }

  /* 仅首页背景动效，其它元素不变 */
  #background-image {
    animation: bgFloat 28s ease-in-out infinite;
    transform-origin: center top;
    will-change: transform;
    opacity: 0.7;
  }

  .dark #background-image { opacity: 0.7; }

  @media (max-width: 768px) {
    #background-image { animation-duration: 30s; }
  }

  @media (prefers-reduced-motion: reduce) {
    #background-image {
      animation: none !important;
      transform: none !important;
    }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .floating-avatar {
    animation: float 6s ease-in-out infinite;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    border: 4px solid white;
    transition: all 0.5s ease;
  }
  
  .floating-avatar:hover {
    transform: scale(1.05) translateY(-5px);
  }

  .glass-card {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.35) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 
      0 4px 24px rgba(0, 0, 0, 0.04),
      0 12px 48px rgba(0, 0, 0, 0.03),
      0 24px 80px rgba(0, 0, 0, 0.02),
      inset 0 1px 1px rgba(255, 255, 255, 0.8);
    border-radius: 32px;
    padding: 3.5rem 2rem;
    max-width: 800px;
    margin: 1rem auto 4rem;
    text-align: center;
  }

  .dark .glass-card {
    background: linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 4px 24px rgba(0, 0, 0, 0.2),
      0 12px 48px rgba(0, 0, 0, 0.15),
      0 24px 80px rgba(0, 0, 0, 0.1),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }

  .garden-nav-item {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 1rem 1.5rem;
    border-radius: 16px;
    text-decoration: none !important;
    color: inherit !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .garden-nav-item:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: translateY(-4px);
  }

  .dark .garden-nav-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  /* 去掉丑陋的黑线，改用优雅的渐变下划线 */
  .nav-line { display: none; }
  .nav-active-line { display: none; }
  
  /* 悬停时的微妙效果 */
  .garden-nav-item .nav-title {
    position: relative;
  }
  .garden-nav-item .nav-title::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(100, 100, 100, 0.3), transparent);
    border-radius: 2px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .garden-nav-item:hover .nav-title::after {
    width: 80%;
  }
  
  /* 浅色模式下的文字颜色 */
  .garden-nav-item span:first-of-type {
    color: #ccc;
  }
  
  .garden-nav-item .nav-title {
    color: #333;
  }
  
  .garden-nav-item span:last-of-type {
    color: #aaa;
  }
  
  /* 深色模式下的文字颜色 */
  .dark .garden-nav-item .nav-title::after {
    background: linear-gradient(90deg, transparent, rgba(200, 200, 200, 0.3), transparent);
  }
  
  .dark .garden-nav-item .nav-title {
    color: #e5e5e5 !important;
  }
  
  .dark .garden-nav-item span:first-of-type {
    color: #777 !important;
  }
  
  .dark .garden-nav-item span:last-of-type {
    color: #999 !important;
  }

  /* 深色模式下的分隔线 */
  .dark .separator-line-vertical {
    background: linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent) !important;
  }

  .dark .separator-line-horizontal {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent) !important;
  }

  /* 深色模式下的信息栏文字 */
  .dark .info-text {
    color: #999 !important;
  }

  /* 深色模式下的引用文字 */
  .dark .quote-text {
    color: #aaa !important;
  }

  /* 深色模式下的底部文字 */
  .dark .manifesto-text {
    opacity: 0.4 !important;
    color: #888 !important;
  }
</style>

<div class="glass-card">

  <img src="/img/author.jpg" alt="Steph.H" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; margin-bottom: 2rem;" class="floating-avatar">

  <h1 style="font-size: 2.4rem; font-weight: 800; margin-bottom: 3rem; letter-spacing: 0.01em; line-height: 1.3;">
    {{< typeit speed=70 lifeLike=true >}}
    Hi, 我是 Steph.H 👋
    一名行走在数字世界里的漫游者 {{< /typeit >}}
  </h1>

  <div class="info-text" style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 3.5rem; color: #666; font-size: 0.95rem; align-items: center;">
    <span style="display: flex; align-items: center; gap: 6px;">
      {{< icon "location-dot" >}} 苏州 · NJU
    </span>
    <span style="opacity: 0.3;">|</span>
    <span style="display: flex; align-items: center; gap: 6px;">{{< icon "fire" >}} 正在探索 AIGC</span>
    <span style="opacity: 0.3;">|</span>
    <span style="display: flex; align-items: center; gap: 6px;">{{< icon "mug-hot" >}} 近况：在世界里慢慢走</span>
  </div>

<div style="margin-bottom: 2.5rem; max-width: 550px; margin-left: auto; margin-right: auto;">
    <p class="quote-text" style="font-family: serif; font-style: italic; color: #777; font-size: 1.10rem; line-height: 1.8; opacity: 0.9;">
      —— " 只有滚动的石头 才能不长青苔"
    </p>
  </div>


<!-- 四个导航入口 - 带分隔线的立体设计 -->
<div style="display: flex; justify-content: center; align-items: stretch; flex-wrap: nowrap; margin: 0 auto; position: relative;">
<!-- 顶部装饰线 -->
<div class="separator-line-horizontal" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);"></div>
<a href="/notes/" class="garden-nav-item" style="padding: 1.5rem 2rem; position: relative;">
<span style="font-size: 0.6rem; letter-spacing: 0.2rem; text-transform: uppercase; font-weight: 300;">Vol. 01</span>
<span class="nav-title" style="font-size: 1.05rem; font-weight: 600; margin-top: 0.35rem; position: relative;">拾光笔记</span>
<span style="font-size: 0.65rem; margin-top: 0.4rem; font-weight: 300;">学习与记录</span>
</a>
<!-- 竖线分隔 -->
<div class="separator-line-vertical" style="width: 1px; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.08), transparent); margin: 0.5rem 0;"></div>
<a href="/projects/" class="garden-nav-item" style="padding: 1.5rem 2rem; position: relative;">
<span style="font-size: 0.6rem; letter-spacing: 0.2rem; text-transform: uppercase; font-weight: 300;">Vol. 02</span>
<span class="nav-title" style="font-size: 1.05rem; font-weight: 600; margin-top: 0.35rem; position: relative;">造物手记</span>
<span style="font-size: 0.65rem; margin-top: 0.4rem; font-weight: 300;">项目与作品</span>
</a>
<!-- 竖线分隔 -->
<div class="separator-line-vertical" style="width: 1px; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.08), transparent); margin: 0.5rem 0;"></div>
<a href="/daily/" class="garden-nav-item" style="padding: 1.5rem 2rem; position: relative;">
<span style="font-size: 0.6rem; letter-spacing: 0.2rem; text-transform: uppercase; font-weight: 300;">Vol. 03</span>
<span class="nav-title" style="font-size: 1.05rem; font-weight: 600; margin-top: 0.35rem; position: relative;">漫步日常</span>
<span style="font-size: 0.65rem; margin-top: 0.4rem; font-weight: 300;">生活与思考</span>
</a>
<!-- 竖线分隔 -->
<div class="separator-line-vertical" style="width: 1px; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.08), transparent); margin: 0.5rem 0;"></div>
<a href="/about/" class="garden-nav-item" style="padding: 1.5rem 2rem; position: relative;">
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
