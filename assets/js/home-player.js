/* =============================================
   Steph.H home - private vinyl listening station
   Now a view layer on top of the global VinylPlayer state
   ============================================= */

(function () {
  "use strict";

  const tracks = window.homePlaylist || [];
  if (!tracks.length) return;

  const Player = window.VinylPlayer;
  if (!Player) return;

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
  let isDragging = false;
  let isCarouselDragging = false;
  let carouselPointerId = null;
  let carouselStartX = 0;
  let carouselStartScrollLeft = 0;
  let carouselMoved = false;
  let carouselPressIndex = null;
  let pointerInside = false;
  let coverObserver = null;

  function normalizeTrackIndex(index) {
    return (index + total) % total;
  }

  function loadCardCover(index, priority) {
    const card = cards[normalizeTrackIndex(index)];
    const image = card ? card.querySelector("img[data-cover-src]") : null;
    if (!image || image.getAttribute("src")) return;

    image.loading = priority ? "eager" : "lazy";
    image.src = image.dataset.coverSrc;
  }

  function preloadActiveCovers(currentIndex) {
    loadCardCover(currentIndex, true);
    loadCardCover(currentIndex - 1, false);
    loadCardCover(currentIndex + 1, false);
  }

  function initCoverLoading() {
    if (!("IntersectionObserver" in window)) return;

    coverObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number.parseInt(entry.target.dataset.index, 10);
        if (Number.isInteger(index)) loadCardCover(index, false);
        coverObserver.unobserve(entry.target);
      });
    }, { root: carousel, rootMargin: "0px", threshold: 0.01 });

    cards.forEach((card) => coverObserver.observe(card));
  }

  function updatePlayButton(isPlaying) {
    playBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    playBtn.innerHTML = isPlaying
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    section.classList.toggle("is-playing", isPlaying);
  }

  function updateModeButton(playMode) {
    if (!modeBtn) return;
    modeBtn.innerHTML = Player.modeIcons[playMode] || "";
    modeBtn.setAttribute("aria-label", Player.modeLabels[playMode] || playMode);
    modeBtn.setAttribute("title", Player.modeLabels[playMode] || playMode);
    modeBtn.dataset.mode = playMode;
    section.dataset.playMode = playMode;
  }

  function updateCards(currentIndex) {
    cards.forEach((card, i) => {
      card.style.zIndex = i === currentIndex ? "3" : "1";
      card.classList.toggle("is-active", i === currentIndex);
      card.setAttribute("aria-current", i === currentIndex ? "true" : "false");
      card.tabIndex = 0;
    });
  }

  function centerActiveCard(currentIndex, behavior) {
    const activeCard = cards[currentIndex];
    if (!activeCard || !carousel) return;
    const target = activeCard.offsetLeft - (carousel.clientWidth - activeCard.offsetWidth) / 2;
    carousel.scrollTo({
      left: Math.max(0, target),
      behavior: reducedMotion || behavior === "auto" ? "auto" : "smooth"
    });
  }

  function applyTrackVisuals(track) {
    const color = track.color || "#b99431";
    const rgb = Player.hexToRgb(color);
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

  function updateTrackInfo(state) {
    const track = tracks[state.currentIndex];
    if (!track) return;

    trackTitleEl.textContent = track.title;
    trackArtistEl.textContent = track.artist;
    if (trackNoteEl) trackNoteEl.textContent = track.note || track.album || "一首放进私人电台里的歌。";
    if (trackIndexEl) trackIndexEl.textContent = String(state.currentIndex + 1).padStart(2, "0");

    applyTrackVisuals(track);
    preloadActiveCovers(state.currentIndex);
    updateCards(state.currentIndex);
    centerActiveCard(state.currentIndex, "auto");
  }

  function updateProgress(state) {
    if (isDragging) return;
    const pct = state.duration ? (state.currentTime / state.duration) * 100 : 0;
    const clamped = Math.max(0, Math.min(100, pct));
    progressFill.style.width = `${clamped}%`;
    progressBar.setAttribute("aria-valuenow", String(Math.round(clamped)));
    currentTimeEl.textContent = Player.formatTime(state.currentTime);
    totalTimeEl.textContent = Player.formatTime(state.duration);
  }

  function handleStateChange(state, changes) {
    if ("isPlaying" in changes) updatePlayButton(state.isPlaying);
    if ("playMode" in changes) updateModeButton(state.playMode);
    if ("currentIndex" in changes || "duration" in changes) {
      updateTrackInfo(state);
    }
    if ("currentTime" in changes || "duration" in changes) {
      updateProgress(state);
    }
    if (state.error) {
      section.dataset.playError = state.error;
    } else {
      section.dataset.playError = "";
    }
  }

  function seekToClientX(clientX, commit) {
    const audio = Player.getAudio();
    if (!audio || !audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const time = (pct / 100) * audio.duration;
    progressFill.style.width = `${pct}%`;
    currentTimeEl.textContent = Player.formatTime(time);
    if (commit) Player.seek(pct);
  }

  function bindEvents() {
    if (modeBtn) {
      modeBtn.addEventListener("click", () => {
        Player.cycleMode();
      });
    }

    playBtn.addEventListener("click", () => Player.toggle());
    prevBtn.addEventListener("click", () => Player.prev());
    nextBtn.addEventListener("click", () => Player.next());

    section.addEventListener("mouseenter", () => { pointerInside = true; });
    section.addEventListener("mouseleave", () => { pointerInside = false; });

    progressBar.addEventListener("pointerdown", (event) => {
      isDragging = true;
      Player.setDragging(true);
      progressBar.classList.add("is-dragging");
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
      Player.setDragging(false);
      progressBar.classList.remove("is-dragging");
      seekToClientX(event.clientX, true);
      progressBar.releasePointerCapture(event.pointerId);
    });

    progressBar.addEventListener("keydown", (event) => {
      const audio = Player.getAudio();
      if (!audio || !audio.duration) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 5 : -5;
      Player.seekByTime(delta);
    });

    cards.forEach((card) => {
      card.addEventListener("click", (event) => {
        event.preventDefault();
      });

      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        Player.select(Number.parseInt(card.dataset.index, 10));
      });
    });

    carousel.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      const pressedCard = event.target.closest(".carousel-card");
      isCarouselDragging = true;
      carouselMoved = false;
      carouselPointerId = event.pointerId;
      carouselPressIndex = pressedCard ? Number.parseInt(pressedCard.dataset.index, 10) : null;
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
      if (event.type === "pointerup" && !carouselMoved && Number.isInteger(carouselPressIndex)) {
        Player.select(carouselPressIndex);
      }
      carouselPressIndex = null;
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
        Player.prev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        Player.next();
      }
    });

    window.addEventListener("resize", () => {
      const state = Player.getState();
      updateCards(state.currentIndex);
      centerActiveCard(state.currentIndex, "auto");
    });
  }

  function initCanvas() {
    if (!canvas) return function cleanup() {};
    const ctx = canvas.getContext("2d");
    if (!ctx) return function cleanup() {};

    let width = 0;
    let height = 0;
    let frame = 0;
    let frameId = null;
    let stopped = false;

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
      if (stopped) return;
      const state = Player.getState();
      frame += state.isPlaying ? 0.018 : 0.006;
      const track = tracks[state.currentIndex] || {};
      const rgb = Player.hexToRgb(track.color);
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width * 0.48, height * 0.42, 0, width * 0.48, height * 0.42, Math.max(width, height) * 0.62);
      gradient.addColorStop(0, `rgba(${rgb.join(",")}, ${state.isPlaying ? 0.18 : 0.11})`);
      gradient.addColorStop(0.48, "rgba(255, 255, 255, 0.02)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1.1;
      for (let i = 0; i < 4; i += 1) {
        const y = height * (0.24 + i * 0.14);
        const amp = (state.isPlaying ? 12 : 6) + i * 2;
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

      if (state.isPlaying && !reducedMotion) {
        for (let i = 0; i < 14; i += 1) {
          const x = ((Math.sin(frame * 0.8 + i * 2.1) + 1) / 2) * width;
          const y = ((Math.cos(frame * 0.7 + i * 1.4) + 1) / 2) * height;
          ctx.fillStyle = `rgba(${rgb.join(",")}, 0.08)`;
          ctx.beginPath();
          ctx.arc(x, y, 1.2 + (i % 3), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(draw);
      }
    }

    function cleanup() {
      stopped = true;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
      window.removeEventListener("resize", resize);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return cleanup;
  }

  Player.init(tracks);
  const unsubscribe = Player.subscribe(handleStateChange);
  bindEvents();
  initCoverLoading();

  // Ensure carousel is centered on initial paint
  const initialState = Player.getState();
  updateCards(initialState.currentIndex);
  centerActiveCard(initialState.currentIndex, "auto");
  updatePlayButton(initialState.isPlaying);
  updateModeButton(initialState.playMode);
  updateTrackInfo(initialState);
  updateProgress(initialState);
  const cleanupCanvas = initCanvas();

  // Clean up subscription when the section is removed (e.g. Turbo navigation)
  section.addEventListener("player-disconnect", () => {
    unsubscribe();
    cleanupCanvas();
    if (coverObserver) coverObserver.disconnect();
  });
})();
