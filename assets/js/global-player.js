/* =============================================
   Global sidebar / bottom-bar vinyl player
   View layer on top of VinylPlayer state
   ============================================= */

(function () {
  "use strict";

  const Player = window.VinylPlayer;
  if (!Player) return;

  const root = document.getElementById("global-player-root");
  const fab = document.getElementById("global-player-fab");
  const panel = document.getElementById("global-player-panel");
  const collapseBtn = document.getElementById("global-player-collapse");
  const modeBtn = document.getElementById("global-player-mode");
  const playBtn = document.getElementById("global-player-play");
  const prevBtn = document.getElementById("global-player-prev");
  const nextBtn = document.getElementById("global-player-next");
  const progressBar = document.getElementById("global-player-progress-bar");
  const progressFill = document.getElementById("global-player-progress-fill");
  const currentTimeEl = document.getElementById("global-player-current-time");
  const totalTimeEl = document.getElementById("global-player-total-time");
  const titleEl = document.getElementById("global-player-title");
  const artistEl = document.getElementById("global-player-artist");
  const coverEl = document.getElementById("global-player-cover");
  const discEl = document.getElementById("global-player-disc");
  const fabCoverEl = document.getElementById("global-player-fab-cover");
  const fabStateEl = document.getElementById("global-player-fab-state");
  const playlistToggle = document.getElementById("global-player-toggle-playlist");
  const playlistPanel = document.getElementById("global-player-playlist-panel");
  const playlistList = document.getElementById("global-player-playlist-list");
  const playlistCount = document.getElementById("global-player-playlist-count");

  if (!root || !panel || !playBtn || !progressBar || !progressFill) return;

  const tracks = window.homePlaylist || [];
  if (!tracks.length) {
    // eslint-disable-next-line no-console
    if (window.console && console.warn) console.warn("[global-player] window.homePlaylist is empty");
    root.style.display = "none";
    return;
  }
  // eslint-disable-next-line no-console
  if (window.console && console.log) console.log("[global-player] initialized with", tracks.length, "tracks");

  const STORAGE_COLLAPSE_KEY = "vinyl-player-collapsed";
  const isHomePage = Boolean(document.getElementById("home-listening-station"));
  let isDragging = false;
  let unsubscribe = null;

  function loadCollapsedState() {
    try {
      const value = localStorage.getItem(STORAGE_COLLAPSE_KEY);
      if (value === null) return null;
      return value === "true";
    } catch (error) {
      return null;
    }
  }

  function saveCollapsedState(collapsed) {
    try {
      localStorage.setItem(STORAGE_COLLAPSE_KEY, collapsed ? "true" : "false");
    } catch (error) {
      // ignore
    }
  }

  function setCollapsed(collapsed) {
    root.classList.toggle("is-collapsed", collapsed);
    fab.setAttribute("aria-expanded", collapsed ? "false" : "true");
    panel.setAttribute("aria-hidden", collapsed ? "true" : "false");
    saveCollapsedState(collapsed);
  }

  function updatePlayButton(isPlaying) {
    playBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    playBtn.setAttribute("aria-label", isPlaying ? "暂停" : "播放");
    playBtn.innerHTML = isPlaying
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    root.classList.toggle("is-playing", isPlaying);
    fabStateEl.innerHTML = isPlaying
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="5" width="3" height="14" rx="1"/><rect x="14" y="5" width="3" height="14" rx="1"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  }

  function updateModeButton(playMode) {
    if (!modeBtn) return;
    modeBtn.innerHTML = Player.modeIcons[playMode] || "";
    modeBtn.setAttribute("aria-label", Player.modeLabels[playMode] || playMode);
    modeBtn.setAttribute("title", Player.modeLabels[playMode] || playMode);
    modeBtn.dataset.mode = playMode;
  }

  function updateTrackInfo(state) {
    const track = tracks[state.currentIndex];
    if (!track) return;

    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;

    if (coverEl) {
      coverEl.src = track.cover;
      coverEl.alt = track.title;
    }
    if (fabCoverEl) {
      fabCoverEl.src = track.cover;
      fabCoverEl.alt = track.title;
    }

    const color = track.color || "#b99431";
    const rgb = Player.hexToRgb(color);
    root.style.setProperty("--player-accent", color);
    root.style.setProperty("--player-accent-rgb", rgb.join(", "));

    updatePlaylistActive(state.currentIndex);
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

  function renderPlaylist() {
    if (!playlistList) return;
    playlistList.innerHTML = "";
    tracks.forEach((track, index) => {
      const li = document.createElement("li");
      li.className = "global-player-playlist-item";
      li.dataset.index = String(index);

      const img = document.createElement("img");
      img.className = "global-player-playlist-thumb";
      img.src = track.cover;
      img.alt = track.title;
      img.loading = "lazy";

      const meta = document.createElement("div");
      meta.className = "global-player-playlist-meta";

      const t = document.createElement("span");
      t.className = "global-player-playlist-title";
      t.textContent = track.title;

      const a = document.createElement("span");
      a.className = "global-player-playlist-artist";
      a.textContent = track.artist;

      meta.appendChild(t);
      meta.appendChild(a);
      li.appendChild(img);
      li.appendChild(meta);

      li.addEventListener("click", () => {
        Player.select(index);
      });

      playlistList.appendChild(li);
    });
    if (playlistCount) playlistCount.textContent = String(tracks.length);
  }

  function updatePlaylistActive(currentIndex) {
    if (!playlistList) return;
    const items = playlistList.querySelectorAll(".global-player-playlist-item");
    items.forEach((item, index) => {
      item.classList.toggle("is-active", index === currentIndex);
      item.setAttribute("aria-current", index === currentIndex ? "true" : "false");
    });
  }

  function togglePlaylist() {
    const expanded = root.classList.toggle("is-playlist-open");
    playlistToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    playlistPanel.setAttribute("aria-hidden", expanded ? "false" : "true");
  }

  function bindEvents() {
    fab.addEventListener("click", () => setCollapsed(false));
    collapseBtn.addEventListener("click", () => setCollapsed(true));

    if (modeBtn) modeBtn.addEventListener("click", () => Player.cycleMode());
    playBtn.addEventListener("click", () => Player.toggle());
    prevBtn.addEventListener("click", () => Player.prev());
    nextBtn.addEventListener("click", () => Player.next());

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

    if (playlistToggle) playlistToggle.addEventListener("click", togglePlaylist);
  }

  // Always subscribe so the sidebar UI stays in sync even when hidden on the homepage.
  Player.init(tracks);
  unsubscribe = Player.subscribe(handleStateChange);
  renderPlaylist();
  bindEvents();

  const initialState = Player.getState();
  updatePlayButton(initialState.isPlaying);
  updateModeButton(initialState.playMode);
  updateTrackInfo(initialState);
  updateProgress(initialState);

  // Visibility: hidden on homepage (full station handles it there), visible elsewhere.
  root.classList.toggle("is-home", isHomePage);

  // Collapsed state only matters when the sidebar is visible.
  // First-time visitors see the collapsed FAB by default.
  if (!isHomePage) {
    const saved = loadCollapsedState();
    const defaultCollapsed = saved === null ? true : saved;
    setCollapsed(defaultCollapsed);
  }

  // Cleanup hook for Turbo navigation
  root.addEventListener("player-disconnect", () => {
    if (unsubscribe) unsubscribe();
  });
})();
