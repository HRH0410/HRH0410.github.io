---
title: "项目"
description: "这里收录了我参与或独立完成的项目，涵盖 AI Agent、AIGC、课程实践等方向。"
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: false
layout: "simple"
---

<style>
.projects-shell {
  position: relative;
  padding: 0.2rem 0.1rem 0.1rem;
}

.projects-shell::before {
  content: "";
  position: absolute;
  inset: -0.3rem -0.5rem;
  pointer-events: none;
  background:
    radial-gradient(circle at 8% 14%, rgba(126, 156, 207, 0.12), transparent 44%),
    radial-gradient(circle at 88% 80%, rgba(126, 156, 207, 0.1), transparent 42%),
    repeating-linear-gradient(
      -10deg,
      rgba(113, 138, 178, 0.05),
      rgba(113, 138, 178, 0.05) 1px,
      transparent 1px,
      transparent 26px
    );
  border-radius: 24px;
  opacity: 0.45;
}

.projects-shell > * {
  position: relative;
  z-index: 1;
}

.projects-list {
  display: grid;
  gap: 1rem;
}

.project-item {
  display: block;
  text-decoration: none !important;
  color: inherit !important;
  position: relative;
  border-radius: 18px 16px 20px 15px;
  padding: 1.22rem 1.22rem 1.08rem;
  border: 1px solid rgba(62, 89, 134, 0.2);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.93), rgba(248, 251, 255, 0.9)),
    repeating-linear-gradient(
      0deg,
      rgba(123, 149, 190, 0.04),
      rgba(123, 149, 190, 0.04) 1px,
      transparent 1px,
      transparent 24px
    );
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.72) inset,
    0 18px 28px -24px rgba(23, 42, 73, 0.5);
  transition: transform 0.34s cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 0.34s ease, border-color 0.3s ease;
}

.project-item::before {
  content: "";
  position: absolute;
  left: 0.82rem;
  top: 0.85rem;
  bottom: 0.85rem;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(91, 129, 190, 0.9), rgba(91, 129, 190, 0.15));
  opacity: 0.42;
}

.project-item:nth-child(1) {
  transform: rotate(-0.35deg);
}

.project-item:nth-child(2) {
  transform: rotate(0.35deg);
}

.project-item:hover {
  transform: translateY(-5px) rotate(0deg);
  border-color: rgba(86, 122, 179, 0.44);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.74) inset,
    0 24px 34px -24px rgba(23, 44, 78, 0.62);
}

.project-item:nth-child(2)::before {
  background: linear-gradient(180deg, rgba(85, 147, 170, 0.86), rgba(85, 147, 170, 0.14));
}

.project-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

.project-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  line-height: 1.3;
  letter-spacing: 0.01em;
}

.project-link-hint {
  font-size: 0.78rem;
  color: #5d7ca8;
  white-space: nowrap;
  padding: 0.22rem 0.56rem;
  border-radius: 999px;
  border: 1px solid rgba(122, 147, 186, 0.3);
  background: rgba(255, 255, 255, 0.65);
  transition: transform 0.28s ease, background-color 0.28s ease, border-color 0.28s ease;
}

.project-item:hover .project-link-hint {
  transform: translateX(2px);
  border-color: rgba(92, 124, 178, 0.48);
  background: rgba(255, 255, 255, 0.84);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.52rem 0 0.78rem;
  padding-left: 1rem;
}

.project-tags span {
  font-size: 0.73rem;
  font-weight: 560;
  padding: 0.19rem 0.56rem;
  border-radius: 999px;
  border: 1px solid rgba(92, 121, 163, 0.28);
  color: #435f89;
  background: rgba(255, 255, 255, 0.62);
}

.project-desc {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.99rem;
  line-height: 1.74;
  color: #486183;
  font-weight: 510;
}

.dark .projects-shell::before {
  opacity: 0.22;
}

.dark .project-item {
  border-color: rgba(167, 188, 221, 0.28);
  background:
    linear-gradient(180deg, rgba(25, 37, 57, 0.9), rgba(19, 30, 47, 0.86)),
    repeating-linear-gradient(
      0deg,
      rgba(116, 136, 170, 0.12),
      rgba(116, 136, 170, 0.12) 1px,
      transparent 1px,
      transparent 24px
    );
  box-shadow:
    0 1px 0 rgba(232, 240, 255, 0.08) inset,
    0 18px 30px -22px rgba(0, 0, 0, 0.66);
}

.dark .project-item:hover {
  border-color: rgba(178, 201, 237, 0.5);
}

.dark .project-link-hint {
  color: #a9c2e7;
  border-color: rgba(148, 173, 212, 0.34);
  background: rgba(255, 255, 255, 0.06);
}

.dark .project-item:hover .project-link-hint {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(167, 192, 230, 0.52);
}

.dark .project-tags span {
  border-color: rgba(170, 192, 226, 0.3);
  color: #bfd4f3;
  background: rgba(255, 255, 255, 0.04);
}

.dark .project-desc {
  color: #aac0e1;
}

@media (max-width: 768px) {
  .project-item,
  .project-item:nth-child(1),
  .project-item:nth-child(2) {
    transform: none;
    border-radius: 14px;
  }

  .project-item {
    padding: 0.96rem 0.92rem 0.88rem;
  }

  .project-item::before {
    left: 0.62rem;
    top: 0.62rem;
    bottom: 0.62rem;
  }

  .project-topline,
  .project-tags,
  .project-desc {
    padding-left: 0.62rem;
  }

  .project-title {
    font-size: 1.02rem;
  }

  .project-link-hint {
    font-size: 0.72rem;
    padding: 0.16rem 0.46rem;
  }

  .project-desc {
    font-size: 0.9rem;
  }
}
</style>

<div class="projects-shell">
<div class="projects-list">
  <a href="https://github.com/NJUIS-Students/NJUIS-Students.github.io" target="_blank" rel="noopener noreferrer" class="project-item">
    <div class="project-topline">
      <h3 class="project-title"><span>🎨</span><span>智科全家桶</span></h3>
      <span class="project-link-hint">GitHub →</span>
    </div>
    <div class="project-tags">
      <span>NJUIS</span>
      <span>课程资源</span>
      <span>学习导航</span>
    </div>
    <p class="project-desc">面向南大智科同学的课程资源聚合与学习索引，沉淀高频课程资料与实践路径。</p>
  </a>

  <a href="https://github.com/HRH0410/Shapez" target="_blank" rel="noopener noreferrer" class="project-item">
    <div class="project-topline">
      <h3 class="project-title"><span>🏭</span><span>异形工厂 Shapez</span></h3>
      <span class="project-link-hint">GitHub →</span>
    </div>
    <div class="project-tags">
      <span>C++</span>
      <span>课程项目</span>
      <span>工程实现</span>
    </div>
    <p class="project-desc">高级程序设计课程项目，围绕玩法机制与程序架构完成的工程化实践。</p>
  </a>
</div>
</div>
