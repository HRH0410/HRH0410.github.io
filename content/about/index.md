---
title: "关于我"
description: "认识 Steph.H"
showDate: false
showAuthor: false
showReadingTime: false
showWordCount: false
showTableOfContents: true
---

<style>
/* 头部卡片样式 */
.profile-card {
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
  background: linear-gradient(145deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3));
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
}
.dark .profile-card {
  background: linear-gradient(145deg, rgba(30,41,59,0.6), rgba(15,23,42,0.4));
  border: 1px solid rgba(255,255,255,0.1);
}
.profile-avatar {
  width: 160px;
  height: 160px;
  border-radius: 16px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.profile-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
}
.profile-info .tagline {
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.dark .profile-info .tagline { color: #aaa; }
.profile-info .contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.4rem 0;
  font-size: 0.9rem;
  color: #555;
}
.dark .profile-info .contact-item { color: #bbb; }
.profile-info .contact-item a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dashed currentColor;
}
.profile-info .contact-item a:hover {
  color: #3b82f6;
}

/* 章节样式 - 高级简约 */
article h2 {
  position: relative;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 3.5rem 0 1.2rem;
  padding-bottom: 0.85rem;
  color: #1a1a1a;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
article h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2.5px;
  background: linear-gradient(90deg, #1a1a1a 0%, #888 60%, transparent 100%);
  border-radius: 2px;
}
.dark article h2 {
  color: #e8e8e8;
}
.dark article h2::after {
  background: linear-gradient(90deg, #e8e8e8 0%, #888 60%, transparent 100%);
}

/* About 部分 h2 无下划线 */
.profile-info + article h2::after {
  display: none;
}

/* About 标题：更精致的引导样式 */
.profile-info > h2 {
  margin: 1.4rem 0 0.3rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: none;
  color: #1a1a1a;
  display: block;
}

.dark .profile-info > h2 {
  color: #f5f5f5;
}

/* About 部分文字间距 */
.profile-info > p {
  margin-bottom: 1.0rem;
}

/* 移除 About 标题下划线 */
.profile-info h2::after {
  display: none !important;
}

/* 时间线样式 - 复古简约 */
.timeline {
  position: relative;
  padding-left: 1.5rem;
  margin: 1rem 0;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(0,0,0,0.12);
  border-radius: 2px;
}
.dark .timeline::before {
  background: rgba(255,255,255,0.12);
}
.timeline-item {
  position: relative;
  padding: 1.25rem 0 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.dark .timeline-item {
  border-bottom-color: rgba(255,255,255,0.04);
}
.timeline-item:last-child { border-bottom: none; }
.timeline-item::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: 1.5rem;
  width: 7px;
  height: 7px;
  background: #999;
  border-radius: 50%;
  transform: translateX(-3px);
}
.dark .timeline-item::before {
  background: #777;
}
.timeline-date {
  font-size: 0.75rem;
  color: #aaa;
  font-weight: 500;
  letter-spacing: 0.05em;
}
.timeline-title {
  font-weight: 700;
  font-size: 1.05rem;
  margin: 0.3rem 0;
  color: #333;
}
.dark .timeline-title {
  color: #eee;
}
.timeline-desc {
  font-size: 0.85rem;
  color: #888;
}
.dark .timeline-desc { color: #999; }

/* 标签样式 - 极简版 */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin: 1.5rem 0;
}
.tag {
  background: #fafafa;
  color: #555;
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 500;
  border: 1px solid rgba(0,0,0,0.08);
  transition: all 0.2s ease;
}
.tag:hover {
  background: #fff;
  color: #2a2a2a;
  border-color: rgba(0,0,0,0.15);
  transform: translateY(-1px);
}
.dark .tag {
  background: rgba(255,255,255,0.04);
  color: #aaa;
  border-color: rgba(255,255,255,0.08);
}
.dark .tag:hover {
  background: rgba(255,255,255,0.06);
  color: #ddd;
  border-color: rgba(255,255,255,0.12);
}

/* 复古简约项目卡片 */
.project-card {
  background: #fafafa;
  border-radius: 16px;
  padding: 2rem 2.25rem;
  margin: 1.5rem 0;
  border: 1px solid rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  position: relative;
}
.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
}
.dark .project-card {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.08);
}

.project-card .card-label {
  font-size: 0.7rem;
  font-weight: 500;
  color: #999;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.project-card .card-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 0.4rem 0;
  color: #1a1a1a;
}
.dark .project-card .card-title {
  color: #f5f5f5;
}

.project-card .card-subtitle {
  font-size: 0.88rem;
  color: #888;
  margin-bottom: 1rem;
}

.project-card .card-desc {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #555;
  margin-bottom: 1.25rem;
}
.dark .project-card .card-desc {
  color: #bbb;
}

.project-card .card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.project-card .card-tags span {
  background: transparent;
  color: #888;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.3rem 0;
  border-bottom: 1px dashed #ccc;
}
.dark .project-card .card-tags span {
  color: #aaa;
  border-bottom-color: #555;
}

/* 小项目网格 - 复古风 */
.mini-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin: 1.5rem 0;
  background: rgba(0,0,0,0.06);
  border-radius: 12px;
  overflow: hidden;
}
@media (max-width: 768px) {
  .mini-cards {
    grid-template-columns: 1fr;
  }
}

.mini-card {
  background: #fafafa;
  padding: 1.5rem;
  transition: all 0.3s ease;
  text-align: center;
}
.mini-card:hover {
  background: #fff;
}
.dark .mini-card {
  background: rgba(255,255,255,0.02);
}
.dark .mini-card:hover {
  background: rgba(255,255,255,0.05);
}

.mini-card .mini-label {
  font-size: 0.65rem;
  font-weight: 500;
  color: #bbb;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.mini-card .mini-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.35rem 0;
  color: #333;
}
.dark .mini-card .mini-title {
  color: #eee;
}

.mini-card .mini-subtitle {
  font-size: 0.78rem;
  color: #aaa;
  margin-bottom: 0.5rem;
}

.mini-card .mini-link {
  font-size: 0.75rem;
  font-weight: 500;
  color: #999;
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.mini-card:hover .mini-link {
  opacity: 1;
}
.mini-card .mini-link:hover {
  color: #555;
}

/* 旅行钉子墙 */
.travel-wall {
  margin: 2rem 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(240,240,240,0.6), transparent 40%),
    linear-gradient(135deg, #f8f8f8, #f2f2f2);
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 1px solid rgba(0,0,0,0.03);
  position: relative;
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.04);
}
.dark .travel-wall {
  background: 
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.04), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(255,255,255,0.02), transparent 40%),
    linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  border-color: rgba(255,255,255,0.06);
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.02), 0 2px 8px rgba(0,0,0,0.2);
}

/* 时间轴线 */
.travel-wall::before {
  content: '';
  position: absolute;
  left: 108px;
  top: 2.5rem;
  bottom: 2.5rem;
  width: 2px;
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(0,0,0,0.06) 3%, 
    rgba(0,0,0,0.1) 10%, 
    rgba(0,0,0,0.1) 90%, 
    rgba(0,0,0,0.06) 97%,
    transparent 100%);
  border-radius: 2px;
  box-shadow: 1px 0 2px rgba(0,0,0,0.05);
}
.dark .travel-wall::before {
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(255,255,255,0.08) 3%, 
    rgba(255,255,255,0.12) 10%, 
    rgba(255,255,255,0.12) 90%, 
    rgba(255,255,255,0.08) 97%,
    transparent 100%);
  box-shadow: 1px 0 2px rgba(0,0,0,0.3);
}

.wall-timeline {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.year-section {
  position: relative;
  padding-left: 120px;
  animation: fadeInUp 0.6s ease-out backwards;
}
.year-section:nth-child(1) { animation-delay: 0.1s; }
.year-section:nth-child(2) { animation-delay: 0.2s; }
.year-section:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.year-label {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 0.05em;
  font-family: "Georgia", "Times New Roman", serif;
}
.dark .year-label {
  color: #e5e5e5;
}

/* 年份标记点 - 更立体 */
.year-label::after {
  content: '';
  position: absolute;
  right: -38px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: radial-gradient(circle at 30% 30%, #888, #555);
  border: 3px solid #f5f5f5;
  border-radius: 50%;
  box-shadow: 
    0 0 0 1px rgba(0,0,0,0.1),
    0 2px 4px rgba(0,0,0,0.15),
    inset 0 1px 1px rgba(255,255,255,0.3);
}
.dark .year-label::after {
  background: radial-gradient(circle at 30% 30%, #aaa, #777);
  border-color: rgba(255,255,255,0.03);
  box-shadow: 
    0 0 0 1px rgba(255,255,255,0.1),
    0 2px 4px rgba(0,0,0,0.4),
    inset 0 1px 1px rgba(255,255,255,0.2);
}

.cities-pins {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* 钉子卡片 - 纸张质感 */
.pin-card {
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  padding: 0.85rem 1.1rem;
  box-shadow: 
    0 1px 2px rgba(0,0,0,0.04),
    0 3px 8px rgba(0,0,0,0.06),
    0 0 0 1px rgba(255,255,255,0.8) inset;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  transform: rotate(-1.5deg);
}
.pin-card:nth-child(even) {
  transform: rotate(1.2deg);
}
.pin-card:nth-child(3n) {
  transform: rotate(-0.8deg);
}
.pin-card:nth-child(4n) {
  transform: rotate(1.8deg);
}

/* 钉子效果 - 更真实 */
.pin-card::before {
  content: '📍';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25));
  z-index: 2;
}

/* 钉子阴影 */
.pin-card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(0,0,0,0.15), transparent 70%);
  border-radius: 50%;
  z-index: 1;
}

.pin-card:hover {
  transform: rotate(0deg) translateY(-6px) scale(1.08);
  box-shadow: 
    0 4px 12px rgba(0,0,0,0.08),
    0 12px 32px rgba(0,0,0,0.12),
    0 0 0 1px rgba(255,255,255,1) inset;
  border-color: rgba(0,0,0,0.12);
  z-index: 10;
}

.dark .pin-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%);
  border-color: rgba(255,255,255,0.12);
  box-shadow: 
    0 1px 2px rgba(0,0,0,0.2),
    0 3px 8px rgba(0,0,0,0.25),
    0 0 0 1px rgba(255,255,255,0.08) inset;
}
.dark .pin-card:hover {
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.06) 100%);
  box-shadow: 
    0 4px 12px rgba(0,0,0,0.3),
    0 12px 32px rgba(0,0,0,0.4),
    0 0 0 1px rgba(255,255,255,0.15) inset;
  border-color: rgba(255,255,255,0.2);
}

.pin-city {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2a2a2a;
  letter-spacing: 0.02em;
}
.dark .pin-city {
  color: #e0e0e0;
}
.pin-emoji {
  font-size: 1.3rem;
  filter: grayscale(15%) brightness(0.95);
  transition: all 0.35s ease;
  transform-origin: center;
}
.pin-card:hover .pin-emoji {
  filter: grayscale(0%) brightness(1.05);
  transform: scale(1.15) rotate(-5deg);
}

@media (max-width: 768px) {
  .travel-wall {
    padding: 2.5rem 1.5rem;
  }
  .travel-wall::before {
    left: 70px;
  }
  .year-section {
    padding-left: 95px;
  }
  .year-label {
    font-size: 1.2rem;
  }
  .year-label::after {
    right: -28px;
    width: 8px;
    height: 8px;
  }
  .cities-pins {
    gap: 0.75rem;
  }
}

/* 足迹地图 - 简约风 */
.footprint-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 1px;
  margin: 1rem 0;
  background: rgba(0,0,0,0.04);
  border-radius: 12px;
  overflow: hidden;
}
.footprint-item {
  text-align: center;
  padding: 1.25rem 0.5rem;
  background: #fafafa;
  transition: all 0.3s ease;
}
.footprint-item:hover {
  background: #fff;
}
.dark .footprint-item {
  background: rgba(255,255,255,0.02);
}
.dark .footprint-item:hover {
  background: rgba(255,255,255,0.05);
}
.footprint-item .emoji {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.35rem;
  filter: grayscale(30%);
  transition: filter 0.3s ease;
}
.footprint-item:hover .emoji {
  filter: grayscale(0%);
}
.footprint-item .place {
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
}
.dark .footprint-item .place {
  color: #bbb;
}

/* 奖项列表 - 优雅线条版 */
.awards-list {
  margin: 2rem 0;
  position: relative;
}
.award-item {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 2rem;
  padding: 1.25rem 0;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.award-item::before {
  content: '';
  position: absolute;
  left: 85px;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 100%);
  transition: all 0.4s ease;
}
.dark .award-item::before {
  background: linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%);
}
.award-item:last-child::before {
  display: none;
}
.award-item:hover {
  transform: translateX(8px);
}
.award-item:hover::before {
  background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
}
.dark .award-item:hover::before {
  background: linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
}

.award-date {
  font-size: 0.72rem;
  font-weight: 600;
  color: #999;
  letter-spacing: 0.08em;
  padding-top: 0.15rem;
  position: relative;
}
.award-date::after {
  content: '';
  position: absolute;
  right: -1rem;
  top: 50%;
  width: 4px;
  height: 4px;
  background: #ccc;
  border-radius: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}
.award-item:hover .award-date::after {
  background: #888;
  transform: translateY(-50%) scale(1.5);
}
.dark .award-date {
  color: #666;
}
.dark .award-date::after {
  background: #555;
}
.dark .award-item:hover .award-date::after {
  background: #888;
}

.award-name {
  font-size: 0.92rem;
  font-weight: 500;
  color: #444;
  line-height: 1.6;
  position: relative;
}
.dark .award-name {
  color: #ccc;
}
.award-name .highlight {
  font-weight: 700;
  color: #333;
  position: relative;
}
.award-name .highlight::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.award-item:hover .award-name .highlight::after {
  transform: scaleX(1);
}
.dark .award-name .highlight {
  color: #eee;
}
.dark .award-name .highlight::after {
  background: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05));
}

.award-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: #999;
  background: rgba(0,0,0,0.03);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  margin-left: 0.5rem;
  letter-spacing: 0.05em;
  vertical-align: middle;
}
.dark .award-badge {
  background: rgba(255,255,255,0.05);
  color: #888;
}

/* 技能清单 - 杂志风格三列 */
.skills-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  column-gap: 3.5rem;
  margin: 0.8rem 0 2.5rem;
  justify-items: stretch;
  align-items: start;
}
@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.skill-category {
  position: relative;
  width: 100%;
}

.skill-header {
  margin-bottom: 1.75rem;
  min-height: 2.4rem;
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
}
.skill-header::before {
  content: attr(data-number);
  font-size: 0.75rem;
  font-weight: 700;
  color: #bbb;
  letter-spacing: 0;
  font-family: "Georgia", "Times New Roman", serif;
  font-style: italic;
}
.dark .skill-header::before {
  color: #666;
}
.skill-label {
  font-size: 1.05rem;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
  line-height: 1;
}
.dark .skill-label {
  color: #e5e5e5;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.skill-item {
  font-size: 0.95rem;
  font-weight: 400;
  color: #555;
  line-height: 1.6;
  transition: all 0.25s ease;
  padding-left: 0;
  position: relative;
  display: flex;
  align-items: center;
  min-height: 1.6em;
}
.skill-item::before {
  content: '';
  position: absolute;
  left: -0.65rem;
  top: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #333 0%, #888 100%);
  transform: translateY(-50%);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  border-radius: 1px;
}
.skill-item:hover {
  color: #1a1a1a;
  padding-left: 1rem;
}
.skill-item:hover::before {
  width: 0.5rem;
  opacity: 1;
}
.dark .skill-item {
  color: #999;
}
.dark .skill-item:hover {
  color: #ddd;
}
.dark .skill-item::before {
  background: linear-gradient(90deg, #aaa 0%, #666 100%);
}

/* 联系信息卡片样式 */
.contact-wrapper {
  max-width: 720px;
  margin: 0 auto 2.5rem;
}
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.contact-card {
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}
.dark .contact-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%);
  border-color: rgba(255,255,255,0.12);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.contact-content {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.contact-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #f0f0f0, #e8e8e8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}
.dark .contact-icon {
  background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.1));
}
.contact-info {
  flex: 1;
  min-width: 0;
}
.contact-label {
  font-size: 0.7rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.2rem;
  font-weight: 600;
}
.dark .contact-label {
  color: #777;
}
.contact-text {
  font-size: 0.82rem;
  color: #555;
  font-weight: 500;
  word-break: break-all;
  line-height: 1.3;
}
.dark .contact-text {
  color: #ccc;
}
.contact-text a {
  color: inherit;
  text-decoration: none;
}
.contact-text.location {
  font-size: 0.85rem;
}

/* About This Site 文本样式 */
.about-site-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  margin: 1.5rem 0 2rem;
}
.about-site-highlight {
  color: #2a2a2a;
}
.about-site-quote {
  margin: 2rem 0;
  padding-left: 1.5rem;
  border-left: 2px solid rgba(0,0,0,0.1);
  font-style: italic;
  color: #888;
  font-size: 0.92rem;
}
.about-site-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%);
}
.dark .about-site-text {
  color: #c2c2c2;
}
.dark .about-site-highlight {
  color: #d6d6d6;
}
.dark .about-site-quote {
  color: #b3b3b3;
  border-left-color: rgba(255,255,255,0.08);
}
.dark .about-site-divider {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
}

/* ==================== 设计收敛优化（克制统一） ==================== */
article h2 {
  margin: 3rem 0 1.1rem;
  font-size: 1.52rem;
  font-weight: 720;
  letter-spacing: 0.02em;
  text-transform: none;
  color: #1f2b43;
}
article h2::after {
  width: 42px;
  height: 2px;
  background: linear-gradient(90deg, rgba(31,43,67,0.9) 0%, rgba(31,43,67,0.3) 60%, transparent 100%);
}
.dark article h2 {
  color: #e6edf8;
}
.dark article h2::after {
  background: linear-gradient(90deg, rgba(230,237,248,0.9) 0%, rgba(230,237,248,0.35) 60%, transparent 100%);
}

.profile-card {
  border-radius: 24px;
  padding: 2.2rem;
  border: 1px solid rgba(255,255,255,0.62);
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.05),
    0 22px 56px rgba(15, 23, 42, 0.03),
    inset 0 1px 0 rgba(255,255,255,0.75);
}
.dark .profile-card {
  border-color: rgba(255,255,255,0.12);
}
.profile-avatar {
  width: 172px;
  height: 172px;
  border-radius: 20px;
}
.profile-info > p {
  color: #3f4f67;
  line-height: 1.95;
  font-size: 1.03rem;
}
.dark .profile-info > p {
  color: #b7c4d8;
}

.timeline {
  padding-left: 1.75rem;
}
.timeline::before {
  background: linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.14), rgba(0,0,0,0.04));
}
.dark .timeline::before {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.16), rgba(255,255,255,0.04));
}
.timeline-item {
  padding: 1.15rem 0 1.15rem 1.45rem;
}
.timeline-title {
  color: #243247;
}
.dark .timeline-title {
  color: #edf3fc;
}

.tag {
  background: rgba(255,255,255,0.72);
  border-color: rgba(36,50,71,0.12);
  color: #33445f;
}
.dark .tag {
  background: rgba(255,255,255,0.05);
  border-color: rgba(255,255,255,0.12);
  color: #b9c8dd;
}

.project-card {
  border-radius: 18px;
  border-color: rgba(36,50,71,0.08);
  background: linear-gradient(145deg, rgba(255,255,255,0.82), rgba(255,255,255,0.6));
  box-shadow: 0 4px 14px rgba(15,23,42,0.04);
}
.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(15,23,42,0.08);
}
.dark .project-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
  border-color: rgba(255,255,255,0.12);
}
.project-card .card-label {
  letter-spacing: 0.1em;
}

.mini-cards {
  gap: 0.85rem;
  background: transparent;
}
.mini-card {
  border: 1px solid rgba(36,50,71,0.08);
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(255,255,255,0.72), rgba(255,255,255,0.56));
}
.mini-card:hover {
  transform: translateY(-2px);
}
.dark .mini-card {
  border-color: rgba(255,255,255,0.1);
}

.travel-wall {
  border-radius: 18px;
  background:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.65), transparent 42%),
    radial-gradient(circle at 80% 70%, rgba(240,240,240,0.4), transparent 38%),
    linear-gradient(135deg, #f7f9fc, #f2f5fa);
}
.travel-wall::before {
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.14), transparent);
  box-shadow: none;
}
.pin-card {
  transform: none !important;
  border-radius: 10px;
}
.pin-card::before {
  content: '';
  width: 7px;
  height: 7px;
  top: -4px;
  border-radius: 50%;
  background: #8a8a8a;
  box-shadow: 0 1px 2px rgba(0,0,0,0.18);
}
.pin-card::after {
  display: none;
}
.pin-card:hover {
  transform: translateY(-2px) scale(1.02);
}

.award-item:hover {
  transform: translateX(4px);
}

.skill-label {
  letter-spacing: 0.08em;
  text-transform: none;
}
.skill-item:hover {
  padding-left: 0.7rem;
}

.contact-card {
  border-radius: 12px;
  border-color: rgba(36,50,71,0.08);
}

/* 响应式 */
@media (max-width: 640px) {
  .profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .profile-avatar {
    width: 120px;
    height: 120px;
  }
}
</style>

<!-- ==================== 个人简介卡片 ==================== -->
<div class="profile-card">
<img src="/img/author.jpg" alt="Steph.H" class="profile-avatar">
<div class="profile-info">

## About

我叫**黄荣昊**（Steph.H），是南京大学智能科学与技术专业的一名本科生。

现在的我，正在探索**AIGC**这片快速生长的领域，于**NJU Reasoning & Learning Group**进行早期科研训练，师从**范琦教授**。

我对**LLM**与**Agent**充满好奇，也乐于探索技术与创意、理性与感受之间的交汇点。

在这里，我会记录自己的学习、项目、思考，也会写下生活中的一些片段——希望它们能成为时间里可回望的痕迹。

</div>
</div>

<!-- ==================== 教育背景 ==================== -->
## Education

<div class="timeline">
<div class="timeline-item">
<div class="timeline-date">2023 - 至今</div>
<div class="timeline-title">南京大学 · 智能科学与技术</div>
<div class="timeline-desc">本科在读 · 智能科学与技术学院</div>
</div>

<div class="timeline-item">
<div class="timeline-date">2020 - 2023</div>
<div class="timeline-title">江苏省句容高级中学</div>
</div>
</div>

<!-- ==================== 研究兴趣 ==================== -->
## Research Interests

<div class="tag-list">
<span class="tag">LLM</span>
<span class="tag">Agent</span>
<span class="tag">World Model</span>
<span class="tag">AIGC</span>
</div>



<!-- [可选] 如果有实验室经历可以写这里 -->
<!-- 
> 我在 **XXX 实验室** 进行研究，专注于复杂环境下的强化学习，涵盖理论研究和决策模型的实际应用。
-->

<!-- ==================== 项目经历 ==================== -->
## Projects

<div class="project-card">
<div class="card-label">Vol. 01</div>
<div class="card-title">知微见疾</div>
<div class="card-subtitle">基层医疗场景下的AI健康问诊与智能报告解读助手</div>
<div class="card-desc">
一款能看、会说、懂你的AI医疗助手，围绕真实问诊场景设计，支持多模态输入与智能交互。
</div>
<div class="card-tags">
<span>LLM</span>
<span>Agent</span>
<span>多模态</span>
<span>医疗应用</span>
</div>
</div>

<div class="project-card">
<div class="card-label">Vol. 02</div>
<div class="card-title">LLM 不确定性量化</div>
<div class="card-subtitle">国家级大学生创新训练计划项目</div>
<div class="card-desc">
围绕大语言模型在生成与推理过程中的不确定性展开研究，探索模型输出可靠性与置信度建模问题。
</div>
<div class="card-tags">
<span>LLM</span>
<span>Uncertainty</span>
<span>科研训练</span>
</div>
</div>

<div style="font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #888; margin: 2.5rem 0 1.2rem;">Course Projects</div>

<div class="mini-cards">
<div class="mini-card">
<div class="mini-label">Course.01</div>
<div class="mini-title">像素版植物大战僵尸</div>
<div class="mini-subtitle">程序设计实训</div>
<a href="https://github.com/wyaaaattwho/PVZ" target="_blank" class="mini-link">GitHub →</a>
</div>

<div class="mini-card">
<div class="mini-label">Course.02</div>
<div class="mini-title">异形工厂 Shapez</div>
<div class="mini-subtitle">高级程序设计</div>
<a href="https://github.com/HRH0410/Shapez" target="_blank" class="mini-link">GitHub →</a>
</div>

<div class="mini-card">
<div class="mini-label">Course.03</div>
<div class="mini-title">森林版跳一跳</div>
<div class="mini-subtitle">CPL</div>
<a href="https://github.com/HRH0410/Jump_jump" target="_blank" class="mini-link">GitHub →</a>
</div>
</div>

<!-- ==================== 所获奖项 ==================== -->
## Awards

<div class="awards-list">
<div class="award-item">
<span class="award-date">2025.11</span>
<span class="award-name"><span class="highlight">知微见疾</span> · 第十九杯挑战杯“人工智能+”创意赛<span class="award-badge">全国一等奖</span></span>
</div>

<div class="award-item">
<span class="award-date">2025.10</span>
<span class="award-name"><span class="highlight">知微见疾</span> · “云智算杯”AI+应用创新大赛<span class="award-badge">全国一等奖</span></span>
</div>

<div class="award-item">
<span class="award-date">2025.09</span>
<span class="award-name">杜厦奖学金</span>
</div>

<div class="award-item">
<span class="award-date">2025.06</span>
<span class="award-name"><span class="highlight">知微见疾</span> · 南京大学“天池杯”AI创新大赛<span class="award-badge">AI先锋冠军</span></span>
</div>

<div class="award-item">
<span class="award-date">2025.05</span>
<span class="award-name">南京大学优秀共青团干部<span class="award-badge">标兵</span></span>
</div>

<div class="award-item">
<span class="award-date">2024.11</span>
<span class="award-name">"砥砺奋进 声动南苏" 南苏第二届十佳歌手<span class="award-badge">🎤 冠军</span></span>
</div>

<div class="award-item">
<span class="award-date">2024.9</span>
<span class="award-name">人民奖学金</span>
</div>

</div>

<!-- ==================== 技能清单 ==================== -->
## Skills

<div class="skills-container">

<div class="skill-category">
<div class="skill-header" data-number="01">
<div class="skill-label">Code</div>
</div>
<div class="skill-items">
<div class="skill-item">C / C++</div>
<div class="skill-item">Python</div>
<div class="skill-item">PyTorch</div>
<div class="skill-item">Git</div>
</div>
</div>

<div class="skill-category">
<div class="skill-header" data-number="02">
<div class="skill-label">AI Workflow</div>
</div>
<div class="skill-items">
<div class="skill-item">Vibe Coding</div>
<div class="skill-item">Prompt Engineering</div>
<div class="skill-item">百炼 / Dify</div>
</div>
</div>

<div class="skill-category">
<div class="skill-header" data-number="03">
<div class="skill-label">Create</div>
</div>
<div class="skill-items">
<div class="skill-item">视频剪辑</div>
<div class="skill-item">美编设计</div>
<div class="skill-item">内容写作</div>
</div>
</div>

</div>

<!-- ==================== 兴趣爱好 ==================== -->
## Hobbies

<div class="tag-list">
<span class="tag">🎵 音乐</span>
<span class="tag">📷 摄影</span>
<span class="tag">✈️ 旅行</span>
<span class="tag">🎮 游戏</span>
<span class="tag">📚 阅读</span>
<span class="tag">🎬 电影</span>
</div>

<!-- ==================== 走过的足迹 ==================== -->
## Footprints

<div class="travel-wall">
<div class="wall-timeline">

<!-- 2026 -->
<div class="year-section">
<div class="year-label">2026</div>
<div class="cities-pins">
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🏔️</span>
<span>西藏</span>
</div>
</div>
</div>
</div>

<!-- 2025 -->
<div class="year-section">
<div class="year-label">2025</div>
<div class="cities-pins">
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🎭</span>
<span>北京</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🌊</span>
<span>扬州</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🏯</span>
<span>大阪</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🗼</span>
<span>东京</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🌸</span>
<span>京都</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">⛩️</span>
<span>镰仓</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🌃</span>
<span>广州</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🏮</span>
<span>武汉</span>
</div>
</div>
</div>
</div>

<!-- 2024 -->
<div class="year-section">
<div class="year-label">2024</div>
<div class="cities-pins">
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🎋</span>
<span>莫干山</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🏞️</span>
<span>杭州</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🌊</span>
<span>威海</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🏔️</span>
<span>贵阳</span>
</div>
</div>
</div>
</div>

<!-- 2023 -->
<div class="year-section">
<div class="year-label">2023</div>
<div class="cities-pins">
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🌶️</span>
<span>长沙</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🏝️</span>
<span>厦门</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🐼</span>
<span>成都</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🍜</span>
<span>重庆</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🌃</span>
<span>广州</span>
</div>
</div>
<div class="pin-card">
<div class="pin-city">
<span class="pin-emoji">🌆</span>
<span>上海</span>
</div>
</div>
</div>
</div>

</div>
</div>

<!-- ==================== 关于这个网站 ==================== -->
## About This Site

<p class="about-site-text">
这是我的 <strong class="about-site-highlight">数字花园</strong> —— 一个记录想法、学习笔记和生活碎片的地方。
</p>

<blockquote class="about-site-quote">
"只有滚动的石头，才能不长青苔"
</blockquote>

<!-- 分隔线 -->
<div style="margin: 3.5rem 0 3rem;">
<div class="about-site-divider"></div>
</div>

<!-- 联系信息区域 -->
<div class="contact-wrapper">
<div class="contact-grid">

<!-- 邮箱卡片 -->
<div class="contact-card">
<div class="contact-content">
<div class="contact-icon">📧</div>
<div class="contact-info">
<div class="contact-label">Email</div>
<div class="contact-text"><a href="mailto:231880191@smail.nju.edu.cn">231880191@smail.nju.edu.cn</a></div>
</div>
</div>
</div>

<!-- 地区卡片 -->
<div class="contact-card">
<div class="contact-content">
<div class="contact-icon">📍</div>
<div class="contact-info">
<div class="contact-label">Location</div>
<div class="contact-text location">NJU，苏州，中国</div>
</div>
</div>
</div>

</div>

<p style="text-align: center; color: #aaa; font-size: 0.82rem; margin: 0; letter-spacing: 0.05em; font-style: italic;">
感谢你来到这里，期待与你交流 🌸
</p>
</div>
