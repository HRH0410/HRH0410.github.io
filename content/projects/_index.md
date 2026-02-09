---
title: "项目"
description: "我做过并持续打磨的项目，以及课程作品与相关视频记录。"
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: false
layout: "simple"
---

<style>
/* 项目页标题避让固定导航 */
main#main-content > article > header > h1 {
  margin-top: clamp(3.6rem, 7.2vw, 4.8rem) !important;
  letter-spacing: 0.02em;
}

.projects-shell {
  position: relative;
  padding: 0.35rem 0.15rem 0.15rem;
}

.projects-shell::before {
  content: "";
  position: absolute;
  inset: -0.45rem -0.6rem -0.2rem;
  pointer-events: none;
  border-radius: 30px;
  background:
    radial-gradient(circle at 9% 8%, rgba(125, 155, 206, 0.16), transparent 42%),
    radial-gradient(circle at 86% 82%, rgba(125, 155, 206, 0.12), transparent 46%),
    repeating-linear-gradient(
      -11deg,
      rgba(114, 139, 180, 0.045),
      rgba(114, 139, 180, 0.045) 1px,
      transparent 1px,
      transparent 28px
    );
  opacity: 0.58;
}

.projects-shell > * {
  position: relative;
  z-index: 1;
}

.projects-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.15rem;
  padding: 0.28rem 0.2rem 0.9rem;
  border-bottom: 1px solid rgba(89, 118, 164, 0.2);
}

.projects-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #6e86aa;
  font-weight: 640;
}

.projects-note {
  margin: 0;
  max-width: 30rem;
  text-align: right;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #60779c;
}

.block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.05rem 0 0.78rem;
}

.block-title {
  margin: 0;
  font-size: 1.06rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5d7397;
}

.block-mark {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8ca2c3;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.feature-card {
  position: relative;
  overflow: hidden;
  border-radius: 23px 17px 21px 16px;
  border: 1px solid rgba(70, 98, 142, 0.24);
  padding: 1.2rem 1.18rem 1.08rem;
  min-height: 246px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(247, 250, 255, 0.92)),
    repeating-linear-gradient(
      0deg,
      rgba(130, 154, 192, 0.05),
      rgba(130, 154, 192, 0.05) 1px,
      transparent 1px,
      transparent 24px
    );
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.84) inset,
    0 20px 34px -24px rgba(24, 43, 74, 0.58);
  transition: transform 0.34s cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 0.34s ease, border-color 0.3s ease;
}

.feature-card::before {
  content: "";
  position: absolute;
  left: 1rem;
  right: 1rem;
  top: 0.85rem;
  height: 1px;
  background: linear-gradient(90deg, rgba(114, 142, 184, 0.22), rgba(114, 142, 184, 0));
}

.feature-card::after {
  content: "";
  position: absolute;
  right: -90px;
  bottom: -90px;
  width: 230px;
  height: 230px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(118, 151, 205, 0.16), rgba(118, 151, 205, 0));
}

.feature-card:hover {
  transform: translateY(-6px);
  border-color: rgba(88, 122, 178, 0.4);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.86) inset,
    0 26px 38px -24px rgba(24, 44, 78, 0.64);
}

.feature-card--a {
  grid-column: span 7;
}

.feature-card--b {
  grid-column: span 5;
}

.project-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}

.project-name {
  margin: 0;
  font-size: 1.32rem;
  line-height: 1.32;
  letter-spacing: 0.01em;
  color: #20314d;
}

.project-status {
  font-size: 0.75rem;
  white-space: nowrap;
  padding: 0.2rem 0.56rem;
  border-radius: 999px;
  color: #5d7ca8;
  border: 1px solid rgba(122, 147, 186, 0.34);
  background: rgba(255, 255, 255, 0.72);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
  margin: 0.56rem 0 0.85rem;
}

.project-tags span {
  font-size: 0.73rem;
  font-weight: 560;
  padding: 0.2rem 0.56rem;
  border-radius: 999px;
  border: 1px solid rgba(95, 124, 166, 0.28);
  color: #436189;
  background: rgba(255, 255, 255, 0.62);
}

.project-desc {
  margin: 0;
  font-size: 0.97rem;
  line-height: 1.75;
  color: #4b658b;
  font-weight: 510;
}

.project-actions {
  margin-top: 0.92rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
}

.project-link {
  font-size: 0.77rem;
  color: #5d7ca8;
  white-space: nowrap;
  padding: 0.2rem 0.58rem;
  border-radius: 999px;
  border: 1px solid rgba(122, 147, 186, 0.32);
  background: rgba(255, 255, 255, 0.66);
  text-decoration: none;
  transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.project-link:hover {
  transform: translateX(2px);
  border-color: rgba(92, 124, 178, 0.5);
  background: rgba(255, 255, 255, 0.86);
}

.project-link.passive {
  pointer-events: none;
  opacity: 0.86;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.course-card {
  position: relative;
  border-radius: 16px 13px 17px 12px;
  border: 1px solid rgba(72, 99, 145, 0.2);
  padding: 1.03rem 1rem 0.95rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(247, 250, 255, 0.91)),
    repeating-linear-gradient(
      0deg,
      rgba(130, 154, 192, 0.045),
      rgba(130, 154, 192, 0.045) 1px,
      transparent 1px,
      transparent 22px
    );
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.82) inset,
    0 14px 28px -26px rgba(24, 43, 74, 0.6);
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

.course-card::before {
  content: attr(data-index);
  position: absolute;
  right: 0.84rem;
  top: 0.74rem;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  color: rgba(82, 111, 157, 0.5);
  text-transform: uppercase;
}

.course-card:hover {
  transform: translateY(-4px);
  border-color: rgba(90, 124, 181, 0.42);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.86) inset,
    0 20px 30px -24px rgba(24, 44, 78, 0.64);
}

.course-name {
  margin: 0;
  padding-right: 2.5rem;
  font-size: 1.04rem;
  line-height: 1.45;
  color: #213350;
}

.course-actions {
  margin-top: 0.72rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
}

.course-tags {
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.34rem;
}

.course-tags span {
  font-size: 0.71rem;
  font-weight: 560;
  padding: 0.16rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(95, 124, 166, 0.26);
  color: #466489;
  background: rgba(255, 255, 255, 0.62);
}

.course-desc {
  margin: 0.7rem 0 0;
  font-size: 0.89rem;
  line-height: 1.66;
  color: #4e688f;
}

.dark .projects-shell::before {
  opacity: 0.26;
}

.dark .projects-hero {
  border-bottom-color: rgba(151, 177, 221, 0.28);
}

.dark .projects-kicker {
  color: #9fb7dc;
}

.dark .projects-note {
  color: #9ab2d7;
}

.dark .block-title {
  color: #9db4d8;
}

.dark .block-mark {
  color: #7f99bf;
}

.dark .feature-card,
.dark .course-card {
  border-color: rgba(167, 188, 221, 0.28);
  background:
    linear-gradient(180deg, rgba(25, 37, 57, 0.9), rgba(19, 30, 47, 0.86)),
    repeating-linear-gradient(
      0deg,
      rgba(116, 136, 170, 0.12),
      rgba(116, 136, 170, 0.12) 1px,
      transparent 1px,
      transparent 22px
    );
  box-shadow:
    0 1px 0 rgba(232, 240, 255, 0.08) inset,
    0 18px 30px -22px rgba(0, 0, 0, 0.66);
}

.dark .feature-card:hover,
.dark .course-card:hover {
  border-color: rgba(178, 201, 237, 0.52);
}

.dark .project-name,
.dark .course-name {
  color: #e4ecfa;
}

.dark .project-desc,
.dark .course-desc {
  color: #abc1e2;
}

.dark .project-tags span,
.dark .course-tags span {
  border-color: rgba(170, 192, 226, 0.3);
  color: #bfd4f3;
  background: rgba(255, 255, 255, 0.04);
}

.dark .project-link,
.dark .project-status {
  color: #a9c2e7;
  border-color: rgba(148, 173, 212, 0.34);
  background: rgba(255, 255, 255, 0.06);
}

.dark .project-link:hover {
  background: rgba(255, 255, 255, 0.11);
  border-color: rgba(167, 192, 230, 0.52);
}

.dark .course-card::before {
  color: rgba(162, 188, 230, 0.48);
}

@media (max-width: 1100px) {
  .feature-card--a,
  .feature-card--b {
    grid-column: span 12;
    min-height: 220px;
  }
}

@media (max-width: 980px) {
  .course-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .projects-note {
    max-width: 22rem;
  }
}

@media (max-width: 768px) {
  main#main-content > article > header > h1 {
    margin-top: clamp(3.1rem, 12vw, 3.9rem) !important;
  }

  .projects-hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.45rem;
    padding-bottom: 0.78rem;
  }

  .projects-note {
    text-align: left;
    max-width: none;
    font-size: 0.86rem;
  }

  .block-title {
    font-size: 0.98rem;
  }

  .feature-card {
    border-radius: 15px;
    padding: 0.95rem 0.9rem 0.9rem;
    min-height: 206px;
  }

  .project-name {
    font-size: 1.07rem;
  }

  .project-status,
  .project-link {
    font-size: 0.71rem;
    padding: 0.16rem 0.46rem;
  }

  .project-desc {
    font-size: 0.9rem;
  }

  .course-grid {
    grid-template-columns: 1fr;
  }

  .course-card {
    border-radius: 13px;
    padding: 0.9rem 0.86rem 0.84rem;
  }

  .course-name {
    font-size: 0.97rem;
    padding-right: 2rem;
  }

  .course-desc {
    font-size: 0.84rem;
  }
}
</style>

<div class="projects-shell">
<section class="projects-hero">
<div class="projects-kicker">Project Atelier</div>
<p class="projects-note"></p>
</section>

<section>
<div class="block-head">
<h2 class="block-title">代表项目</h2>
<span class="block-mark">Long-Term</span>
</div>
<div class="feature-grid">
<article class="feature-card feature-card--a">
<div class="project-heading">
<h3 class="project-name">🎨 智科全家桶</h3>
<span class="project-status">持续维护</span>
</div>
<div class="project-tags">
<span>NJUIS</span>
<span>课程资源</span>
<span>学习导航</span>
</div>
<p class="project-desc">面向南大智科同学的课程资源聚合与学习索引，沉淀高频课程资料与实践路径。</p>
<div class="project-actions">
<a class="project-link" href="https://github.com/NJUIS-Students/NJUIS-Students.github.io" target="_blank" rel="noopener noreferrer">GitHub →</a>
</div>
</article>
<article class="feature-card feature-card--b">
<div class="project-heading">
<h3 class="project-name">🩺 知微见疾</h3>
<span class="project-status">推进中</span>
</div>
<div class="project-tags">
<span>LLM</span>
<span>Agent</span>
<span>多模态</span>
<span>医疗应用</span>
</div>
<p class="project-desc">基层医疗场景下的 AI 健康问诊与智能报告解读助手，围绕真实问诊流程设计多模态交互与可靠输出能力。</p>
<div class="project-actions">
<span class="project-link passive">持续迭代中</span>
</div>
</article>
</div>
</section>

<section>
<div class="block-head">
<h2 class="block-title">Course Works</h2>
<span class="block-mark">Practice</span>
</div>
<div class="course-grid">
<article class="course-card" data-index="CW 01">
<h3 class="course-name">🧟 植物大战僵尸像素版</h3>
<div class="course-actions">
<a class="project-link" href="https://www.bilibili.com/video/BV1HrypYJEnx/?spm_id_from=333.1387.homepage.video_card.click&vd_source=2db54e40bd1d8587ec698619193da3e0" target="_blank" rel="noopener noreferrer">Bilibili →</a>
</div>
<div class="course-tags">
<span>课程项目</span>
<span>像素风</span>
<span>关卡玩法</span>
</div>
<p class="course-desc">课程实践中的玩法复刻项目，重点打磨了像素化表现、交互反馈与节奏设计。</p>
</article>
<article class="course-card" data-index="CW 02">
<h3 class="course-name">🌲 跳一跳森林版</h3>
<div class="course-actions">
<a class="project-link" href="https://github.com/HRH0410/Jump_jump" target="_blank" rel="noopener noreferrer">GitHub →</a>
<a class="project-link" href="https://www.bilibili.com/video/BV1c4421P75c/?spm_id_from=333.1387.collection.video_card.click&vd_source=2db54e40bd1d8587ec698619193da3e0" target="_blank" rel="noopener noreferrer">Bilibili →</a>
</div>
<div class="course-tags">
<span>课程项目</span>
<span>小游戏</span>
<span>交互体验</span>
</div>
<p class="course-desc">将经典“跳一跳”做成森林主题版本，围绕操作手感、关卡过渡与视觉反馈做了完整实现。</p>
</article>
<article class="course-card" data-index="CW 03">
<h3 class="course-name">🏭 异形工厂 Shapez</h3>
<div class="course-actions">
<a class="project-link" href="https://github.com/HRH0410/Shapez" target="_blank" rel="noopener noreferrer">GitHub →</a>
<a class="project-link" href="https://www.bilibili.com/video/BV1nJh5eLEi8/?spm_id_from=333.1387.collection.video_card.click&vd_source=2db54e40bd1d8587ec698619193da3e0" target="_blank" rel="noopener noreferrer">Bilibili →</a>
</div>
<div class="course-tags">
<span>C++</span>
<span>课程项目</span>
<span>工程实现</span>
</div>
<p class="course-desc">高级程序设计课程项目，围绕玩法机制与程序架构完成的工程化实践与视频记录。</p>
</article>
</div>
</section>
</div>
