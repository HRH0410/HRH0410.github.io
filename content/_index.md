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
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 20px 60px rgba(0,0,0,0.05);
    border-radius: 32px;
    padding: 3.5rem 2rem;
    max-width: 800px;
    margin: 4rem auto;
    text-align: center;
  }

  .dark .glass-card {
    background: rgba(15, 23, 42, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
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
  
  .nav-line { position: absolute; bottom: -8px; left: 0; width: 100%; height: 1px; background: #f0f0f0; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  .nav-active-line { position: absolute; bottom: -8px; left: 0; width: 0; height: 1px; background: #333; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  .garden-nav-item:hover .nav-active-line { width: 100% !important; }
  .dark .nav-line { background: #333 !important; }
  .dark .nav-active-line { background: #eee !important; }
</style>

<div class="glass-card">

  <img src="/img/author.jpg" alt="Steph.H" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; margin-bottom: 2rem;" class="floating-avatar">

  <h1 style="font-size: 2.4rem; font-weight: 800; margin-bottom: 2.5rem; letter-spacing: 0.01em;">
    {{< typeit speed=70 lifeLike=true >}}
    Hi, 我是 Steph.H 👋
    一名行走在数字世界里的漫游者。{{< /typeit >}}
  </h1>

  <div style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 2.5rem; color: #666; font-size: 0.95rem; align-items: center;">
    <span style="display: flex; align-items: center; gap: 6px;">
      {{< icon "location-dot" >}} 苏州 · NJU
    </span>
    <span style="opacity: 0.3;">|</span>
    <span style="display: flex; align-items: center; gap: 6px;">{{< icon "fire" >}} 正在探索 AIGC</span>
    <span style="opacity: 0.3;">|</span>
    <span style="display: flex; align-items: center; gap: 6px;">{{< icon "mug-hot" >}} 近况：在世界里慢慢走</span>
  </div>



  <div style="margin-bottom: 2.5rem; max-width: 550px; margin-left: auto; margin-right: auto;">
    <p style="font-family: serif; font-style: italic; color: #777; font-size: 1.15rem; line-height: 1.8; opacity: 0.9;">
      “ 只有滚动的石头 才能不长青苔”
    </p>
  </div>

  <div style="display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap;">
    <a href="/posts/" class="garden-nav-item">
      <span style="font-size: 0.75rem; color: #aaa; letter-spacing: 0.25rem; text-transform: uppercase;">Vol. 01</span>
      <div style="margin-top: 0.6rem; position: relative; padding: 0 4px;">
        <span style="font-size: 1.2rem; font-weight: 600;">学习与笔记</span>
        <div class="nav-line"></div>
        <div class="nav-active-line"></div>
      </div>
    </a>
    <a href="/projects/" class="garden-nav-item">
      <span style="font-size: 0.75rem; color: #aaa; letter-spacing: 0.25rem; text-transform: uppercase;">Vol. 02</span>
      <div style="margin-top: 0.6rem; position: relative; padding: 0 4px;">
        <span style="font-size: 1.2rem; font-weight: 600;">AI 与思考</span>
        <div class="nav-line"></div>
        <div class="nav-active-line"></div>
      </div>
    </a>
    <a href="/tags/life/" class="garden-nav-item">
      <span style="font-size: 0.75rem; color: #aaa; letter-spacing: 0.25rem; text-transform: uppercase;">Vol. 03</span>
      <div style="margin-top: 0.6rem; position: relative; padding: 0 4px;">
        <span style="font-size: 1.2rem; font-weight: 600;">生活与日常</span>
        <div class="nav-line"></div>
        <div class="nav-active-line"></div>
      </div>
    </a>
  </div>

<div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 4rem; margin-top: 2.5rem; font-size: 1.6rem;">
    <a href="https://github.com/HRH0410" style="color: inherit; opacity: 0.6; transition: 0.3s;" target="_blank" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">{{< icon "github" >}}</a>
    <a href="https://space.bilibili.com/1834168183" style="color: inherit; opacity: 0.6; transition: 0.3s;" target="_blank" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">{{< icon "bilibili" >}}</a>
    <a href="https://v.douyin.com/W9pAmwPcBcg/" style="color: inherit; opacity: 0.6; transition: 0.3s;" target="_blank" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">{{< icon "dou" >}}</a>
  </div>

</div>

<div style="margin: 8rem 0 5rem; text-align: center; opacity: 0.25; font-size: 0.8rem; letter-spacing: 0.4rem; font-family: monospace;">
  🌱 DIGITAL GARDEN MANIFESTO
</div>
