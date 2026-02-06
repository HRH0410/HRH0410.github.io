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
.projects-intro {
  margin: 0.4rem 0 0;
  font-size: 1.22rem;
  line-height: 1.75;
  color: #5b7195;
  font-weight: 510;
  max-width: 980px;
}

.dark .projects-intro {
  color: #a8bddf;
}

.projects-divider {
  margin: 1.8rem 0 2rem;
  height: 1px;
  border: 0;
  background: linear-gradient(90deg, transparent, rgba(85, 107, 144, 0.22), transparent);
}

.dark .projects-divider {
  background: linear-gradient(90deg, transparent, rgba(166, 185, 220, 0.2), transparent);
}

.projects-section-title {
  margin: 0 0 1.25rem !important;
  font-size: 1.9rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.02em;
}

.projects-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.2rem;
}

.project-item {
  display: block;
  text-decoration: none !important;
  color: inherit !important;
  border-radius: 16px;
  padding: 1.2rem 1.2rem 1.1rem;
  border: 1px solid rgba(41, 61, 94, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(252, 253, 255, 0.84));
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.03),
    0 10px 24px rgba(0, 0, 0, 0.035);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.project-item:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.05),
    0 14px 34px rgba(0, 0, 0, 0.06);
  border-color: rgba(88, 120, 163, 0.28);
}

.dark .project-item {
  border-color: rgba(168, 190, 224, 0.18);
  background: linear-gradient(180deg, rgba(27, 38, 57, 0.86), rgba(20, 29, 44, 0.84));
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.2),
    0 14px 30px rgba(0, 0, 0, 0.16);
}

.dark .project-item:hover {
  border-color: rgba(185, 206, 235, 0.3);
}

.project-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.55rem;
}

.project-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.14rem;
  line-height: 1.35;
  letter-spacing: 0.01em;
}

.project-link-hint {
  font-size: 0.85rem;
  color: #6f86a8;
  opacity: 0.88;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.dark .project-link-hint {
  color: #9cb5da;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.55rem 0 0.85rem;
}

.project-tags span {
  font-size: 0.73rem;
  font-weight: 560;
  padding: 0.2rem 0.56rem;
  border-radius: 999px;
  border: 1px solid rgba(92, 121, 163, 0.28);
  color: #435f89;
  background: rgba(255, 255, 255, 0.6);
}

.dark .project-tags span {
  border-color: rgba(170, 192, 226, 0.28);
  color: #bfd4f3;
  background: rgba(255, 255, 255, 0.04);
}

.project-desc {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.75;
  color: #486183;
  font-weight: 500;
}

.dark .project-desc {
  color: #aac0e1;
}

@media (max-width: 768px) {
  .projects-intro {
    font-size: 1.05rem;
    line-height: 1.7;
  }
  .projects-section-title {
    font-size: 1.55rem !important;
  }
  .project-title {
    font-size: 1.02rem;
    margin-right: 0.3rem;
  }
  .project-link-hint {
    font-size: 0.75rem;
  }
  .project-desc {
    font-size: 0.9rem;
  }
}
</style>

<p class="projects-intro">这里收录了我参与或独立完成的项目，涵盖 AI Agent、AIGC、课程实践等方向。</p>

<hr class="projects-divider">

<h2 class="projects-section-title">代表项目</h2>

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

<hr class="projects-divider">
