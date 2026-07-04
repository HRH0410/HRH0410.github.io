/* =============================================
   Steph.H home - private vinyl listening station
   ============================================= */

(function () {
  "use strict";

  const tracks = window.homePlaylist || [];
  if (!tracks.length) return;

  const section = document.getElementById("home-listening-station");
  const carousel = document.getElementById("record-carousel");
  const cards = carousel ? Array.from(carousel.querySelectorAll(".carousel-card")) : [];
  const modeBtn = document.getElementById("player-mode");
  const playBtn = document.getElementById("player-play");
  const prevBtn = document.getElementById("player-prev");
  const nextBtn = document.getElementById("player-next");
  const progressBar = document.getElementById("player-progress-bar");
  const progressFill = document.getElementById("player-progress-fill");
  const currentTimeEl = document.getElementById("player-current-time");
  const totalTimeEl = document.getElementById("player-total-time");
  const trackTitleEl = document.getElementById("player-track-title");
  const trackArtistEl = document.getElementById("player-track-artist");
  const trackNoteEl = document.getElementById("player-track-note");
  const trackIndexEl = document.getElementById("player-track-index");
  const recordCover = document.getElementById("record-cover");
  const vinylLabel = document.getElementById("vinyl-label");
  const canvas = document.getElementById("player-ambience-canvas");

  if (!section || !carousel || !playBtn || !progressBar || !progressFill) return;

  const total = tracks.length;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentIndex = 0;
  let isPlaying = false;
  let audio = null;
  let isDragging = false;
  let isCarouselDragging = false;
  let carouselPointerId = null;
  let carouselStartX = 0;
  let carouselStartScrollLeft = 0;
  let carouselMoved = false;
  let pointerInside = false;
  let playMode = "sequence";

  const playModes = ["sequence", "shuffle", "repeat"];
  const modeIcons = {
    sequence: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h13"/><path d="M4 17h13"/><path d="m17 4 3 3-3 3"/><path d="m17 14 3 3-3 3"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="m4 4 5 5"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/><path d="M11 10h1v5"/></svg>'
  };

  const modeLabels = {
    sequence: "顺序播放",
    shuffle: "随机播放",
    repeat: "单曲循环"
  };

  audio = document.createElement("audio");
  audio.className = "home-player-audio";
  audio.preload = "metadata";
  audio.setAttribute("playsinline", "");
  section.appendChild(audio);

  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function hexToRgb(hex) {
    const normalized = String(hex || "").replace("#", "").trim();
    if (normalized.length !== 3 && normalized.length !== 6) return [185, 148, 49];
    const full = normalized.length === 3
      ? normalized.split("").map((char) => char + char).join("")
      : normalized;
    const int = Number.parseInt(full, 16);
    if (Number.isNaN(int)) return [185, 148, 49];
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  }

  function updatePlayButton() {
    playBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    playBtn.innerHTML = isPlaying
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    section.classList.toggle("is-playing", isPlaying);
  }

  function updateModeButton() {
    if (!modeBtn) return;
    modeBtn.innerHTML = modeIcons[playMode];
    modeBtn.setAttribute("aria-label", modeLabels[playMode]);
    modeBtn.setAttribute("title", modeLabels[playMode]);
    modeBtn.dataset.mode = playMode;
    section.dataset.playMode = playMode;
  }

  function updateCards() {
    cards.forEach((card, i) => {
      card.style.transform = i === currentIndex ? "translateY(-2px)" : "none";
      card.style.opacity = "1";
      card.style.filter = "none";
      card.style.zIndex = i === currentIndex ? "3" : "1";
      card.classList.toggle("is-active", i === currentIndex);
      card.setAttribute("aria-current", i === currentIndex ? "true" : "false");
      card.tabIndex = 0;
    });
  }

  function centerActiveCard(behavior = "smooth") {
    const activeCard = cards[currentIndex];
    if (!activeCard || !carousel) return;
    const target = activeCard.offsetLeft - (carousel.clientWidth - activeCard.offsetWidth) / 2;
    carousel.scrollTo({
      left: Math.max(0, target),
      behavior: reducedMotion ? "auto" : behavior
    });
  }

  function applyTrackVisuals(track) {
    const color = track.color || "#b99431";
    const rgb = hexToRgb(color);
    section.style.setProperty("--home-accent", color);
    section.style.setProperty("--home-accent-rgb", rgb.join(", "));

    if (vinylLabel) {
      vinylLabel.style.backgroundColor = "";
      vinylLabel.style.setProperty("--record-cover-image", `url("${track.cover}")`);
    }
    if (recordCover) {
      recordCover.src = track.cover;
      recordCover.alt = "";
      recordCover.classList.add("nozoom");
    }
  }

  function getRandomIndex() {
    if (total <= 1) return currentIndex;
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * total);
    }
    return nextIndex;
  }

  function updateProgress(percent, currentTime) {
    const clamped = Math.max(0, Math.min(100, percent || 0));
    progressFill.style.width = `${clamped}%`;
    progressBar.setAttribute("aria-valuenow", String(Math.round(clamped)));
    if (typeof currentTime === "number") {
      currentTimeEl.textContent = formatTime(currentTime);
    }
  }

  function loadTrack(index) {
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }

    currentIndex = ((index % total) + total) % total;
    const track = tracks[currentIndex];
    audio.src = track.audio;
    audio.preload = "metadata";

    trackTitleEl.textContent = track.title;
    trackArtistEl.textContent = track.artist;
    if (trackNoteEl) trackNoteEl.textContent = track.note || track.album || "一首放进私人电台里的歌。";
    if (trackIndexEl) trackIndexEl.textContent = String(currentIndex + 1).padStart(2, "0");

    applyTrackVisuals(track);
    updateCards();
    centerActiveCard();
  }

  function bindAudioEvents() {
    if (!audio) return;

    audio.addEventListener("loadedmetadata", () => {
      totalTimeEl.textContent = formatTime(audio.duration);
      updateProgress(0, 0);
    });

    audio.addEventListener("timeupdate", () => {
      if (!audio || isDragging) return;
      const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      updateProgress(pct, audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      handleTrackEnded();
    });

    audio.addEventListener("error", () => {
      totalTimeEl.textContent = "0:00";
    });
  }

  function playTrack() {
    if (!audio) loadTrack(currentIndex);
    if (!audio) return;

    const promise = audio.play();
    if (promise && typeof promise.then === "function") {
      promise
        .then(() => {
          section.dataset.playError = "";
          isPlaying = true;
          updatePlayButton();
        })
        .catch((error) => {
          section.dataset.playError = error && error.name ? error.name : "play-failed";
          isPlaying = false;
          updatePlayButton();
        });
    } else {
      isPlaying = true;
      updatePlayButton();
    }
  }

  function pauseTrack() {
    if (audio) audio.pause();
    isPlaying = false;
    updatePlayButton();
  }

  function togglePlay() {
    if (isPlaying) pauseTrack();
    else playTrack();
  }

  function prevTrack() {
    const shouldResume = isPlaying;
    const targetIndex = playMode === "shuffle" ? getRandomIndex() : currentIndex - 1;
    loadTrack(targetIndex);
    if (shouldResume) playTrack();
  }

  function nextTrack() {
    const shouldResume = isPlaying;
    const targetIndex = playMode === "shuffle" ? getRandomIndex() : currentIndex + 1;
    loadTrack(targetIndex);
    if (shouldResume) playTrack();
  }

  function handleTrackEnded() {
    if (playMode === "repeat") {
      loadTrack(currentIndex);
    } else if (playMode === "shuffle") {
      loadTrack(getRandomIndex());
    } else {
      loadTrack(currentIndex + 1);
    }
    playTrack();
  }

  function selectTrack(index) {
    if (index === currentIndex) {
      togglePlay();
      return;
    }
    loadTrack(index);
    playTrack();
  }

  function seekToClientX(clientX, commit) {
    if (!audio || !audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    updateProgress(pct, (pct / 100) * audio.duration);
    if (commit) audio.currentTime = (pct / 100) * audio.duration;
  }

  function bindEvents() {
    if (modeBtn) {
      modeBtn.addEventListener("click", () => {
        const currentModeIndex = playModes.indexOf(playMode);
        playMode = playModes[(currentModeIndex + 1) % playModes.length];
        updateModeButton();
      });
    }

    playBtn.addEventListener("click", togglePlay);
    prevBtn.addEventListener("click", prevTrack);
    nextBtn.addEventListener("click", nextTrack);

    section.addEventListener("mouseenter", () => { pointerInside = true; });
    section.addEventListener("mouseleave", () => { pointerInside = false; });

    progressBar.addEventListener("pointerdown", (event) => {
      isDragging = true;
      progressBar.setPointerCapture(event.pointerId);
      seekToClientX(event.clientX, false);
    });

    progressBar.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      seekToClientX(event.clientX, false);
    });

    progressBar.addEventListener("pointerup", (event) => {
      if (!isDragging) return;
      isDragging = false;
      seekToClientX(event.clientX, true);
      progressBar.releasePointerCapture(event.pointerId);
    });

    progressBar.addEventListener("keydown", (event) => {
      if (!audio || !audio.duration) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 5 : -5;
      audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
      updateProgress((audio.currentTime / audio.duration) * 100, audio.currentTime);
    });

    cards.forEach((card) => {
      card.addEventListener("click", (event) => {
        if (carouselMoved) return;
        selectTrack(Number.parseInt(card.dataset.index, 10));
      });
    });

    carousel.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      isCarouselDragging = true;
      carouselMoved = false;
      carouselPointerId = event.pointerId;
      carouselStartX = event.clientX;
      carouselStartScrollLeft = carousel.scrollLeft;
      carousel.classList.add("is-dragging");
      carousel.setPointerCapture(event.pointerId);
    });

    carousel.addEventListener("pointermove", (event) => {
      if (!isCarouselDragging || event.pointerId !== carouselPointerId) return;
      const delta = event.clientX - carouselStartX;
      if (Math.abs(delta) > 4) carouselMoved = true;
      carousel.scrollLeft = carouselStartScrollLeft - delta;
    });

    function endCarouselDrag(event) {
      if (!isCarouselDragging || event.pointerId !== carouselPointerId) return;
      isCarouselDragging = false;
      carouselPointerId = null;
      carousel.classList.remove("is-dragging");
      if (carousel.hasPointerCapture(event.pointerId)) {
        carousel.releasePointerCapture(event.pointerId);
      }
      window.setTimeout(() => {
        carouselMoved = false;
      }, 120);
    }

    carousel.addEventListener("pointerup", endCarouselDrag);
    carousel.addEventListener("pointercancel", endCarouselDrag);

    carousel.addEventListener("wheel", (event) => {
      if (!carousel || carousel.scrollWidth <= carousel.clientWidth) return;
      const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontalIntent ? event.deltaX : event.deltaY;
      if (!delta) return;

      const previous = carousel.scrollLeft;
      carousel.scrollLeft += delta;
      if (carousel.scrollLeft !== previous) {
        event.preventDefault();
      }
    }, { passive: false });

    document.addEventListener("keydown", (event) => {
      const focusedInside = section.contains(document.activeElement);
      if (!focusedInside && !pointerInside) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevTrack();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextTrack();
      }
    });

    window.addEventListener("resize", () => {
      updateCards();
      centerActiveCard("auto");
    });
  }

  function initCanvas() {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      frame += isPlaying ? 0.018 : 0.006;
      const track = tracks[currentIndex] || {};
      const rgb = hexToRgb(track.color);
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width * 0.48, height * 0.42, 0, width * 0.48, height * 0.42, Math.max(width, height) * 0.62);
      gradient.addColorStop(0, `rgba(${rgb.join(",")}, ${isPlaying ? 0.18 : 0.11})`);
      gradient.addColorStop(0.48, "rgba(255, 255, 255, 0.02)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1.1;
      for (let i = 0; i < 4; i += 1) {
        const y = height * (0.24 + i * 0.14);
        const amp = (isPlaying ? 12 : 6) + i * 2;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const wave = Math.sin(x * 0.018 + frame * (2 + i * 0.2) + i) * amp;
          const drift = Math.cos(x * 0.008 + frame + i) * amp * 0.35;
          const py = y + wave + drift;
          if (x === 0) ctx.moveTo(x, py);
          else ctx.lineTo(x, py);
        }
        ctx.strokeStyle = `rgba(${rgb.join(",")}, ${0.1 - i * 0.012})`;
        ctx.stroke();
      }

      if (isPlaying && !reducedMotion) {
        for (let i = 0; i < 14; i += 1) {
          const x = ((Math.sin(frame * 0.8 + i * 2.1) + 1) / 2) * width;
          const y = ((Math.cos(frame * 0.7 + i * 1.4) + 1) / 2) * height;
          ctx.fillStyle = `rgba(${rgb.join(",")}, 0.08)`;
          ctx.beginPath();
          ctx.arc(x, y, 1.2 + (i % 3), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reducedMotion) window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
  }

  bindAudioEvents();
  loadTrack(currentIndex);
  updatePlayButton();
  updateModeButton();
  bindEvents();
  centerActiveCard("auto");
  initCanvas();
})();
