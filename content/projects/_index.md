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
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap');

main#main-content > article > header > h1 {
  display: none !important;
}

.neo-sketch {
  --paper: #fbf8f2;
  --paper-deep: #f1eadc;
  --ink: #231e18;
  --ink-soft: #5a5145;
  --line: #2f2922;
  --line-soft: rgba(47, 41, 34, 0.26);
  --accent-yellow: #f1cf49;
  --accent-mist: #dce7ec;
  position: relative;
  margin-top: clamp(2rem, 6vw, 3.4rem);
  padding: 1.5rem 1.45rem 1.6rem;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; /* Sketchy wrapper edge */
  border: 3px solid rgba(35, 30, 23, 0.85); /* Outer border */
  background:
    radial-gradient(circle at 10% 8%, rgba(255, 255, 255, 0.6), transparent 35%),
    radial-gradient(circle at 86% 84%, rgba(219, 232, 238, 0.34), transparent 40%),
    repeating-linear-gradient(-8deg, rgba(84, 74, 60, 0.03), rgba(84, 74, 60, 0.03) 1px, transparent 1px, transparent 24px),
    linear-gradient(180deg, var(--paper), var(--paper-deep));
  box-shadow: 12px 14px 0 rgba(35, 30, 23, 0.85); /* Hard comic shadow */
  overflow: hidden;
}

.neo-sketch::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-radial-gradient(circle at 18% 22%, rgba(40, 34, 27, 0.05), rgba(40, 34, 27, 0.05) 1px, transparent 1px, transparent 4px),
    repeating-radial-gradient(circle at 74% 66%, rgba(40, 34, 27, 0.045), rgba(40, 34, 27, 0.045) 1px, transparent 1px, transparent 5px);
  opacity: 0.28;
}

.neo-sketch::after {
  content: "";
  position: absolute;
  inset: 6px;
  pointer-events: none;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; /* Hand-drawn look */
  border: 1.5px solid rgba(43, 37, 29, 0.45);
}

.studio-hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 170px 1fr auto;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.95rem;
}

.studio-hero::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(42, 36, 30, 0.35), rgba(42, 36, 30, 0.12));
}

.profile-polaroid {
  position: relative;
  transform: rotate(-4.5deg);
  padding: 0.44rem 0.44rem 1.4rem; /* Typical polaroid bottom padding */
  background: #fff;
  border: 2px solid rgba(35, 30, 23, 0.85); /* Darker bolder edge */
  border-radius: 2px 2px 2px 4px; /* Slightly asymmetric */
  box-shadow: 6px 8px 0 rgba(29, 24, 18, 0.8); /* Hard shadow */
}

.profile-polaroid::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 18px;
  left: 50%;
  transform: translateX(-50%) rotate(-4deg);
  top: -12px;
  border-radius: 3px;
  background: rgba(241, 207, 73, 0.65); /* More visible tape */
  border: 1.5px solid rgba(130, 109, 36, 0.6);
}

.profile-avatar {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  border: 2px solid rgba(39, 33, 27, 0.48);
  background:
    radial-gradient(circle at 34% 30%, rgba(255, 255, 255, 0.5), transparent 30%),
    linear-gradient(145deg, #f5e89c, #d3b49f 50%, #9fbecb);
  overflow: hidden;
}

.avatar-illustration {
  width: 100%;
  height: 100%;
  display: block;
}

.avatar-ink {
  fill: none;
  stroke: rgba(44, 37, 30, 0.82);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.avatar-soft {
  fill: rgba(255, 255, 255, 0.38);
}

.avatar-paper {
  fill: rgba(248, 241, 226, 0.72);
  stroke: rgba(73, 64, 53, 0.3);
  stroke-width: 1.2;
}

.avatar-card {
  fill: rgba(255, 255, 255, 0.24);
  stroke: rgba(74, 63, 50, 0.22);
  stroke-width: 1;
}

.avatar-pen {
  fill: rgba(170, 202, 218, 0.64);
  stroke: rgba(60, 81, 92, 0.38);
  stroke-width: 0.9;
}

.avatar-accent {
  fill: rgba(241, 207, 73, 0.9);
  stroke: rgba(105, 86, 28, 0.38);
  stroke-width: 0.85;
}

.avatar-dot {
  fill: rgba(66, 57, 46, 0.64);
}

.avatar-core {
  fill: rgba(255, 255, 255, 0.62);
  stroke: rgba(74, 63, 50, 0.3);
  stroke-width: 1.1;
}

.avatar-orbit {
  fill: none;
  stroke: rgba(74, 63, 50, 0.38);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-dasharray: 1.5 5.5;
}

.avatar-glow {
  fill: rgba(255, 255, 255, 0.32);
}

.profile-handle {
  margin-top: 0.42rem;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-align: center;
  color: #6b6358;
}

.hero-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1.5rem;
}

.hero-kicker {
  margin: 0;
  font-size: 0.73rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #6a6053;
  font-weight: 700;
}

.hero-title {
  margin: 0.3rem 0 0;
  font-size: clamp(1.8rem, 4vw, 2.5rem); /* Adjusted for playful font */
  line-height: 1.1;
  color: var(--ink);
  font-family: 'ZCOOL KuaiLe', 'Wawati SC', 'HanziPen SC', 'Comic Sans MS', cursive;
  position: relative;
  display: inline-block;
  z-index: 1;
  padding-bottom: 0.2rem;
  letter-spacing: 0.05em;
}

.doodle {
  position: absolute;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.doodle path, .doodle circle {
  fill: none;
  stroke: rgba(47, 41, 34, 0.85);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hero-quote {
  margin-top: 0.65rem;
  max-width: 44rem;
  background: rgba(255, 255, 255, 0.7);
  border: 2px solid rgba(48, 41, 34, 0.85); /* Thicker border */
  border-radius: 14px 255px 16px 225px / 255px 14px 225px 16px; /* Irregular */
  padding: 0.66rem 0.72rem;
  color: #4f473d;
  line-height: 1.65;
  font-size: 0.9rem;
  transform: rotate(-0.45deg);
  box-shadow: 4px 5px 0 rgba(33, 28, 22, 0.75); /* Hand-drawn hard shadow */
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 0.52rem;
}

.ink-action {
  text-decoration: none;
  font-size: 0.84rem;
  color: #2f2922;
  border: 2px solid rgba(47, 41, 34, 0.9);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; /* More hand-drawn border */
  padding: 0.48rem 0.82rem;
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 3px 4px 0 rgba(33, 28, 22, 0.8); /* Solid hand-drawn shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ink-action:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 2px 0 rgba(33, 28, 22, 0.8);
}

.ink-action--accent {
  background: linear-gradient(180deg, var(--accent-yellow), #f6e39b);
}

.block-head {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.06rem 0 0.78rem;
}

.block-title {
  margin: 0;
  font-family: "STKaiti", "Kaiti SC", "KaiTi", serif;
  font-size: 1.45rem;
  letter-spacing: 0.04em;
  color: var(--ink);
}

.block-mark {
  font-size: 0.76rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(63, 55, 47, 0.64);
}

.featured-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

.course-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem; /* Wider gap for course grid */
  padding-top: 0.5rem; /* Room for tape padding */
}

.sketch-card {
  --tilt: 0deg;
  position: relative;
  transform: rotate(var(--tilt));
  padding: 1.6rem 1.7rem 1.5rem; /* More generous padding inside cards */
  display: flex;
  flex-direction: column;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  border: 2px solid rgba(48, 41, 33, 0.85);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(250, 245, 237, 0.92)),
    repeating-linear-gradient(-4deg, rgba(86, 74, 59, 0.03), rgba(86, 74, 59, 0.03) 1px, transparent 1px, transparent 20px);
  box-shadow: 
    6px 8px 0 rgba(31, 26, 21, 0.75); /* Hard offset shadow */
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.sketch-card::before {
  content: none;
}

.sketch-card::after {
  content: "";
  position: absolute;
  top: -12px;
  left: 50%; /* Center the tape */
  width: 65px;
  height: 22px; /* Slightly taller tape */
  z-index: 3;
  background: rgba(239, 205, 80, 0.7); /* More visible tape */
  border-radius: 3px;
  border: 1.5px solid rgba(126, 102, 32, 0.45);
  transform: translateX(-50%) rotate(-3deg);
}

.sketch-card:hover {
  transform: rotate(0deg) translate(-2px, -3px);
  box-shadow: 
    8px 11px 0 rgba(31, 26, 21, 0.8);
}

.featured-card:first-child {
  --tilt: -0.25deg;
}

.featured-card:last-child {
  --tilt: 0.24deg;
}

.project-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.85rem;
}

.project-name {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.2;
  color: var(--ink);
}

.status {
  white-space: nowrap;
  font-size: 0.76rem;
  font-family: "STKaiti", "Kaiti SC", "KaiTi", serif; /* Handwriting font for tags */
  color: #4b4339;
  padding: 0.2rem 0.54rem;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; /* Irregular */
  border: 1.5px solid rgba(52, 45, 38, 0.7);
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15); /* Slight hard shadow */
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.58rem 0 0.8rem;
}

.tags span {
  font-size: 0.72rem;
  font-weight: 600;
  font-family: "STKaiti", "Kaiti SC", "KaiTi", serif;
  color: #4b4338;
  border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px; /* Irregular */
  border: 1.2px solid rgba(52, 45, 37, 0.5);
  background: rgba(255, 255, 255, 0.64);
  padding: 0.2rem 0.56rem;
}

.project-desc,
.course-desc {
  margin: 0;
  color: #554c41;
  line-height: 1.72;
}

.project-desc {
  font-size: 1rem;
}

.highlight-grid {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
}

.highlight-grid article {
  padding: 0.75rem 0.8rem;
  border: 1.5px dashed rgba(57, 49, 40, 0.6); /* More visible ink dash */
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; /* Hand-drawn look */
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 2px 2px 0 rgba(40, 35, 28, 0.15); /* Small sketchy offset */
}

.highlight-grid strong {
  display: block;
  font-size: 0.75rem;
  color: #3b342c;
}

.highlight-grid span {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.69rem;
  line-height: 1.45;
  color: #5b5348;
}

.actions {
  margin-top: auto; /* Pushes to bottom in flex container */
  padding-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.sketch-btn {
  display: inline-block;
  text-decoration: none;
  font-size: 0.8rem;
  font-family: inherit; /* Use default handwriting/serif */
  color: #383229;
  padding: 0.28rem 0.76rem;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; /* Hand-drawn look */
  border: 1.8px solid rgba(53, 46, 39, 0.82);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 3px 0 rgba(32, 27, 22, 0.7); /* Hard solid shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.sketch-btn:hover {
  transform: translate(1px, 2px);
  box-shadow: 1px 1px 0 rgba(32, 27, 22, 0.7);
}

.sketch-btn--primary {
  background: linear-gradient(170deg, var(--accent-yellow) 20%, #f1de86);
  border-color: rgba(90, 74, 31, 0.88);
}

.sketch-btn--passive {
  pointer-events: none;
  opacity: 0.84;
}

.course-card {
  padding: 1.5rem 1.4rem 1.4rem;
}

.course-card:nth-child(1) {
  --tilt: -0.18deg;
}

.course-card:nth-child(2) {
  --tilt: 0.2deg;
}

.course-card:nth-child(3) {
  --tilt: -0.16deg;
}

.course-card::after {
  left: 50%; /* Let it be centered like the rest */
}

.course-card::before {
  content: attr(data-index);
  position: absolute;
  right: 1.2rem; /* Adjusted for new padding */
  top: 1rem;
  font-size: 0.69rem;
  letter-spacing: 0.18em;
  color: rgba(72, 63, 53, 0.48);
  border: none;
  clip-path: none;
}

.course-name {
  margin: 0 0 0.6rem 0; /* Add margin bottom */
  padding-right: 3rem;
  font-size: 1.2rem; /* Slightly larger */
  line-height: 1.4;
  color: var(--ink);
}

.course-desc {
  margin-top: 0.8rem;
  font-size: 0.92rem;
  line-height: 1.6;
}

.dark .neo-sketch {
  --paper: #2c2822;
  --paper-deep: #221f1a;
  --ink: #efe1ca;
  --line: #e8d7bd;
  --line-soft: rgba(232, 215, 190, 0.34);
  --accent-yellow: #e2c048;
  background:
    radial-gradient(circle at 12% 14%, rgba(255, 255, 255, 0.08), transparent 34%),
    radial-gradient(circle at 86% 84%, rgba(163, 186, 199, 0.14), transparent 40%),
    repeating-linear-gradient(-8deg, rgba(190, 173, 146, 0.06), rgba(190, 173, 146, 0.06) 1px, transparent 1px, transparent 24px),
    linear-gradient(180deg, var(--paper), var(--paper-deep));
}

.dark .hero-kicker,
.dark .hero-note,
.dark .block-mark,
.dark .status,
.dark .tags span,
.dark .project-desc,
.dark .course-desc,
.dark .highlight-grid span,
.dark .sketch-btn,
.dark .course-card::before,
.dark .profile-handle,
.dark .hero-quote,
.dark .ink-action,
.dark .highlight-grid strong {
  color: #d9cab3;
}

.dark .highlight-grid strong,
.dark .ink-action {
  color: #efe1ca;
}

.dark .doodle path, 
.dark .doodle circle {
  stroke: rgba(231, 218, 194, 0.9);
}

.dark .avatar-ink {
  stroke: rgba(231, 218, 194, 0.9);
}

.dark .avatar-paper {
  fill: rgba(255, 252, 245, 0.12);
  stroke: rgba(226, 208, 180, 0.66);
}

.dark .avatar-card {
  fill: rgba(245, 223, 176, 0.06);
  stroke: rgba(224, 203, 172, 0.52);
}

.dark .avatar-pen {
  fill: rgba(162, 193, 209, 0.24);
  stroke: rgba(206, 221, 230, 0.56);
}

.dark .avatar-dot {
  fill: rgba(231, 218, 194, 0.8);
}

.dark .avatar-core {
  fill: rgba(255, 251, 242, 0.12);
  stroke: rgba(226, 208, 180, 0.62);
}

.dark .avatar-orbit {
  stroke: rgba(231, 218, 194, 0.56);
}

.dark .avatar-glow {
  fill: rgba(255, 255, 255, 0.12);
}

.dark .neo-sketch::after,
.dark .studio-hero::after,
.dark .sketch-card,
.dark .hero-quote,
.dark .ink-action,
.dark .status,
.dark .tags span,
.dark .sketch-btn,
.dark .highlight-grid article {
  border-color: rgba(218, 201, 174, 0.34);
}

.dark .hero-quote,
.dark .sketch-card,
.dark .ink-action,
.dark .status,
.dark .tags span,
.dark .sketch-btn,
.dark .highlight-grid article {
  background: rgba(255, 255, 255, 0.04);
}

.dark .sketch-btn--primary,
.dark .ink-action--accent {
  background: linear-gradient(170deg, var(--accent-yellow) 20%, #c49c27);
  color: #1a1610;
  border-color: #8c7322;
}

@media (max-width: 1120px) {
  .studio-hero {
    grid-template-columns: 156px 1fr;
  }

  .hero-actions {
    grid-column: 1 / -1;
  }

  .highlight-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .course-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .neo-sketch {
    margin-top: clamp(1.2rem, 8vw, 2rem);
    padding: 0.82rem 0.72rem 0.92rem;
    border-radius: 16px;
  }

  .studio-hero {
    grid-template-columns: 1fr;
    gap: 0.72rem;
  }

  .profile-polaroid {
    width: min(180px, 100%);
  }

  .hero-quote {
    max-width: none;
    transform: rotate(-0.2deg);
    font-size: 0.86rem;
  }

  .block-title {
    font-size: 1.22rem;
  }

  .sketch-card {
    padding: 0.9rem 0.84rem 0.84rem;
    transform: none !important;
  }

  .project-name {
    font-size: 1.24rem;
  }

  .project-desc {
    font-size: 0.92rem;
  }

  .highlight-grid {
    grid-template-columns: 1fr;
    gap: 0.42rem;
  }

  .course-grid {
    grid-template-columns: 1fr;
  }

  .course-name {
    font-size: 1rem;
  }

  .course-desc {
    font-size: 0.86rem;
  }
}
</style>

<div class="neo-sketch">
<section class="studio-hero">
<aside class="profile-polaroid">
<div class="profile-avatar">
<svg class="avatar-illustration" viewBox="0 0 120 120" aria-hidden="true">
  <!-- Soft background element -->
  <path d="M15 15 C 40 5, 80 5, 105 15 C 115 40, 115 80, 105 105 C 80 115, 40 115, 15 105 C 5 80, 5 40, 15 15 Z" fill="rgba(255,255,255,0.4)" stroke="rgba(43,37,29,0.3)" stroke-width="2" stroke-dasharray="4 4" />
  
  <!-- Desk/Shadow element -->
  <path d="M10 92 L110 92" fill="none" stroke="rgba(43,37,29,0.3)" stroke-width="2.5" stroke-linecap="round" />
  
  <!-- Plant / Succulent (Far Left) -->
  <!-- Leaves -->
  <path d="M 16 78 C 10 58, 22 55, 16 78 Z" fill="#84c798" stroke="#2b251d" stroke-width="1.5" stroke-linejoin="round" />
  <path d="M 16 78 C 22 62, 26 68, 16 78 Z" fill="#a3d9b1" stroke="#2b251d" stroke-width="1.5" stroke-linejoin="round" />
  <path d="M 16 78 C 8 68, 12 62, 16 78 Z" fill="#bbedc7" stroke="#2b251d" stroke-width="1.5" stroke-linejoin="round" />
  <!-- Pot -->
  <path d="M 10 76 L 22 76 L 19 92 L 13 92 Z" fill="#d3b49f" stroke="#2b251d" stroke-width="2.5" stroke-linejoin="round" />
  <path d="M 10 81 L 21 81" fill="none" stroke="#2b251d" stroke-width="1.5" stroke-linecap="round" />
  
  <!-- Mac / Computer Monitor (Center) -->
  <!-- Base -->
  <path d="M 30 80 L 35 92 L 85 92 L 90 80 Z" fill="#e8dfd5" stroke="#2b251d" stroke-width="2.5" stroke-linejoin="round" />
  <path d="M 40 80 L 43 92 M 80 80 L 77 92" fill="none" stroke="#2b251d" stroke-width="1.5" />
  <path d="M 68 86 L 78 86" fill="none" stroke="#2b251d" stroke-width="2" stroke-linecap="round" />
  <circle cx="82" cy="86" r="1.2" fill="#2b251d" />
  
  <!-- Screen Bezel -->
  <rect x="25" y="32" width="70" height="48" rx="4" fill="#fcf8f2" stroke="#2b251d" stroke-width="2.5" />
  <!-- Screen Display -->
  <rect x="33" y="40" width="54" height="32" rx="3" fill="#2d333b" stroke="#2b251d" stroke-width="2" />
  
  <!-- Code on Screen -->
  <!-- ">_" prompt -->
  <path d="M 40 48 L 44 53 L 40 58" fill="none" stroke="#84c798" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 46 58 L 52 58" fill="none" stroke="#84c798" stroke-width="2" stroke-linecap="round" />
  <!-- Highlight / Glint -->
  <path d="M 76 43 L 83 50 M 80 43 L 85 48" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-linecap="round" />
  
  <!-- Coffee Mug (Far Right) -->
  <!-- Mug Handle -->
  <path d="M 109 82 C 115 82, 115 88, 108 89" fill="none" stroke="#2b251d" stroke-width="2.5" stroke-linecap="round" />
  <!-- Mug Body -->
  <path d="M 98 78 L 110 78 L 108 92 L 100 92 Z" fill="#ebaa7e" stroke="#2b251d" stroke-width="2.5" stroke-linejoin="round" />
  <!-- Steam -->
  <path d="M 102 73 C 100 68, 104 63, 101 58" fill="none" stroke="rgba(43,37,29,0.4)" stroke-width="1.5" stroke-linecap="round" />
  <path d="M 106 75 C 104 70, 108 65, 105 60" fill="none" stroke="rgba(43,37,29,0.4)" stroke-width="1.5" stroke-linecap="round" />

  <!-- Floating Tech / Sparkles -->
  <!-- Code Brackets Left -->
  <path d="M 28 17 L 23 21 L 28 25" fill="none" stroke="#2b251d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 36 17 L 41 21 L 36 25" fill="none" stroke="#2b251d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 34 16 L 30 26" fill="none" stroke="#f1cf49" stroke-width="2" stroke-linecap="round" />

  <!-- Star/Sun Right -->
  <circle cx="92" cy="22" r="4" fill="#f1cf49" stroke="#2b251d" stroke-width="2" />
  <path d="M 92 13 V 15 M 92 29 V 31 M 83 22 H 85 M 99 22 H 101" stroke="#2b251d" stroke-width="2" stroke-linecap="round" />
  <path d="M 86 16 L 88 18 M 96 26 L 98 28 M 98 16 L 96 18 M 88 26 L 86 28" stroke="#2b251d" stroke-width="1.5" stroke-linecap="round" />
</svg>
</div>
<div class="profile-handle">Steph.H‘s project</div>
</aside>

<div class="hero-main">
<p class="hero-kicker">Creative Project Dossier</p>
<h2 class="hero-title">
项目展板
</h2>

<!-- Floating Stars/Elements -->
<svg class="doodle" style="top: 15%; right: 28%; width: 28px; height: 28px; transform: rotate(15deg); opacity: 0.85;" viewBox="0 0 50 50">
  <path d="M25 0 Q25 25 50 25 Q25 25 25 50 Q25 25 0 25 Q25 25 25 0 Z" fill="none" stroke="var(--accent-yellow)" stroke-width="3" />
</svg>
<svg class="doodle" style="top: 85%; right: 12%; width: 70px; height: 25px; opacity: 0.6;" viewBox="0 0 100 40">
  <path d="M 5 20 C 20 -15, 35 55, 50 20 C 65 -15, 80 55, 95 20" fill="none" stroke-width="2.5" />
</svg>
<svg class="doodle" style="top: 15%; left: 33%; width: 36px; height: 36px; transform: rotate(-15deg); opacity: 0.8;" viewBox="0 0 50 50">
  <path d="M28 4 L14 26 L27 26 L20 46 L40 20 L27 20 Z" fill="var(--accent-yellow)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>

</div>

<div class="hero-actions">
<a class="ink-action" href="https://github.com/HRH0410" target="_blank" rel="noopener noreferrer">分享</a>
<a class="ink-action ink-action--accent" href="https://github.com/NJUIS-Students/NJUIS-Students.github.io" target="_blank" rel="noopener noreferrer">订阅项目动态</a>
</div>
</section>

<section>
<div class="block-head">
<h2 class="block-title">代表项目</h2>
<span class="block-mark">Long-Term</span>
</div>
<div class="featured-grid">
<article class="sketch-card featured-card">
<div class="project-head">
<h3 class="project-name">🎨 智科全家桶 (NJUIS-Wiki)</h3>
<div style="display: flex; gap: 8px;">
<span class="status">持续维护</span>
<span class="status" style="display:flex; align-items:center; gap:4px; background-color: #fff9e6; color: #d97706; border-color: #f59e0b;">
  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
  <span id="wiki-stars-count">...</span>
</span>
</div>
</div>
<script>
  fetch('https://api.github.com/repos/NJUIS-Students/NJUIS-Students.github.io')
    .then(res => res.json())
    .then(data => {
      const countEl = document.getElementById('wiki-stars-count');
      if (countEl && data.stargazers_count !== undefined) {
        countEl.innerText = data.stargazers_count;
      }
    });
</script>
<div class="tags">
<span>南大智科</span>
<span>生存指南</span>
<span>全景攻略</span>
</div>
<p class="project-desc">面向南京大学智能科学与技术学院的开源 Wiki 协作平台。我们致力于聚合历届同学的经验心血，打造结构化的体系指南，内容涵盖专业学习、科学研究、职场就业与苏州生活等方方面面，全方位帮助后来者少走弯路。</p>
<div class="highlight-grid">
<article><strong>学业与科创</strong><span>汇总核心课程通关方法，梳理实验室套磁与科研入门向导</span></article>
<article><strong>求职与生活</strong><span>汇集真实大厂面经与实习体验，并提供苏州校区衣食住行攻略</span></article>
<article><strong>开源共建</strong><span>每一代智科人皆可作为协作者增补经验，让知识星火持续传承</span></article>
</div>
<div class="actions">
<a class="sketch-btn sketch-btn--primary" href="https://njuis-students.github.io/" target="_blank" rel="noopener noreferrer">访问 Wiki 站点 →</a>
<a class="sketch-btn" href="https://github.com/NJUIS-Students/NJUIS-Students.github.io" target="_blank" rel="noopener noreferrer">查看 GitHub 仓库</a>
</div>
</article>

<article class="sketch-card featured-card">
<div class="project-head">
<h3 class="project-name">🩺 知微见疾</h3>
<span class="status">推进中</span>
</div>
<div class="tags">
<span>LLM</span>
<span>Agent</span>
<span>多模态</span>
<span>医疗应用</span>
</div>
<p class="project-desc">基层医疗场景下的 AI 健康问诊与智能报告解读助手，围绕真实问诊流程设计多模态交互与可靠输出能力。</p>
<div class="highlight-grid">
<article><strong>多模态问诊</strong><span>结合文本与报告理解的场景化交互</span></article>
<article><strong>流程对齐</strong><span>按真实问诊步骤组织任务流与反馈</span></article>
<article><strong>可靠输出</strong><span>强调可解释、可落地的建议表达</span></article>
</div>
<div class="actions">
<span class="sketch-btn sketch-btn--passive">持续迭代中</span>
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
<article class="sketch-card course-card">
<h3 class="course-name">🧟 植物大战僵尸像素版</h3>
<div class="tags">
<span>课程项目</span>
<span>像素风</span>
<span>关卡玩法</span>
</div>
<p class="course-desc">课程实践中的玩法复刻项目，重点打磨了像素化表现、交互反馈与节奏设计。</p>
<div class="actions">
<a class="sketch-btn" href="https://www.bilibili.com/video/BV1HrypYJEnx/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=2db54e40bd1d8587ec698619193da3e0" target="_blank" rel="noopener noreferrer">Bilibili →</a>
</div>
</article>

<article class="sketch-card course-card">
<h3 class="course-name">🌲 跳一跳森林版</h3>
<div class="tags">
<span>课程项目</span>
<span>小游戏</span>
<span>交互体验</span>
</div>
<p class="course-desc">将经典“跳一跳”做成森林主题版本，围绕操作手感、关卡过渡与视觉反馈做了完整实现。</p>
<div class="actions">
<a class="sketch-btn" href="https://github.com/HRH0410/Jump_jump" target="_blank" rel="noopener noreferrer">GitHub →</a>
<a class="sketch-btn" href="https://www.bilibili.com/video/BV1c4421P75c/?spm_id_from=333.1387.collection.video_card.click&amp;vd_source=2db54e40bd1d8587ec698619193da3e0" target="_blank" rel="noopener noreferrer">Bilibili →</a>
</div>
</article>

<article class="sketch-card course-card">
<h3 class="course-name">🏭 异形工厂 Shapez</h3>
<div class="tags">
<span>C++</span>
<span>课程项目</span>
<span>工程实现</span>
</div>
<p class="course-desc">高级程序设计课程项目，围绕玩法机制与程序架构完成的工程化实践与视频记录。</p>
<div class="actions">
<a class="sketch-btn" href="https://github.com/HRH0410/Shapez" target="_blank" rel="noopener noreferrer">GitHub →</a>
<a class="sketch-btn" href="https://www.bilibili.com/video/BV1nJh5eLEi8/?spm_id_from=333.1387.collection.video_card.click&amp;vd_source=2db54e40bd1d8587ec698619193da3e0" target="_blank" rel="noopener noreferrer">Bilibili →</a>
</div>
</article>
</div>
</section>
</div>
