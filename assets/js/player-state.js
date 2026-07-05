/* =============================================
   Global vinyl player state + single audio instance
   Shared by the homepage station and the sidebar mini-player
   ============================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "vinyl-player-state";

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

  let tracks = [];
  let audio = null;
  const subscribers = [];
  let isDragging = false;
  let initialized = false;

  const state = {
    currentIndex: 0,
    isPlaying: false,
    playMode: "sequence",
    currentTime: 0,
    duration: 0,
    error: null
  };

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

  function notify(changes) {
    const snapshot = { ...state };
    subscribers.slice().forEach((fn) => {
      try {
        fn(snapshot, changes || {});
      } catch (error) {
        // eslint-disable-next-line no-console
        if (window.console && console.error) console.error(error);
      }
    });
  }

  function setState(changes) {
    Object.assign(state, changes);
    notify(changes);
    persist();
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentIndex: state.currentIndex,
        currentTime: audio ? audio.currentTime : state.currentTime,
        isPlaying: state.isPlaying,
        playMode: state.playMode,
        savedAt: Date.now()
      }));
    } catch (error) {
      // ignore private-mode/storage-unavailable errors
    }
  }

  function restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function getRandomIndex() {
    if (tracks.length <= 1) return state.currentIndex;
    let nextIndex = state.currentIndex;
    let guard = 0;
    while (nextIndex === state.currentIndex && guard < 20) {
      nextIndex = Math.floor(Math.random() * tracks.length);
      guard += 1;
    }
    return nextIndex;
  }

  function getNextIndex() {
    if (state.playMode === "shuffle") return getRandomIndex();
    return state.currentIndex + 1;
  }

  function getPrevIndex() {
    if (state.playMode === "shuffle") return getRandomIndex();
    return state.currentIndex - 1;
  }

  function createAudio() {
    if (audio) return audio;

    audio = document.getElementById("global-player-audio");
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "global-player-audio";
      audio.className = "global-player-audio";
      audio.preload = "metadata";
      audio.setAttribute("playsinline", "");
      audio.setAttribute("crossorigin", "anonymous");
      document.body.appendChild(audio);
    }

    bindAudioEvents();
    return audio;
  }

  function bindAudioEvents() {
    if (!audio) return;

    audio.addEventListener("loadedmetadata", () => {
      setState({ duration: audio.duration || 0 });
    });

    audio.addEventListener("timeupdate", () => {
      if (isDragging || !audio) return;
      setState({ currentTime: audio.currentTime || 0 });
    });

    audio.addEventListener("ended", handleTrackEnded);

    audio.addEventListener("error", () => {
      setState({
        duration: 0,
        error: audio && audio.error ? audio.error.code : "unknown"
      });
    });

    audio.addEventListener("pause", () => {
      if (!isDragging) setState({ isPlaying: false });
    });

    audio.addEventListener("play", () => {
      setState({ isPlaying: true });
    });
  }

  function loadTrack(index, autoplay) {
    if (!tracks.length) return;
    const normalized = ((index % tracks.length) + tracks.length) % tracks.length;
    const track = tracks[normalized];
    if (!track) return;

    createAudio();
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    audio.src = track.audio;
    audio.preload = "metadata";

    setState({
      currentIndex: normalized,
      duration: 0,
      currentTime: 0,
      error: null,
      isPlaying: Boolean(autoplay)
    });

    if (autoplay) {
      play();
    }
  }

  function play() {
    if (!audio) createAudio();
    if (!audio.src) {
      loadTrack(state.currentIndex);
    }
    const promise = audio.play();
    if (promise && typeof promise.then === "function") {
      promise.catch((error) => {
        setState({ isPlaying: false, error: error && error.name ? error.name : "play-failed" });
      });
    }
  }

  function pause() {
    if (audio) audio.pause();
  }

  function toggle() {
    if (state.isPlaying) pause();
    else play();
  }

  function next() {
    loadTrack(getNextIndex(), state.isPlaying);
  }

  function prev() {
    loadTrack(getPrevIndex(), state.isPlaying);
  }

  function select(index) {
    if (index === state.currentIndex) {
      toggle();
      return;
    }
    loadTrack(index, true);
  }

  function seek(percent) {
    if (!audio || !audio.duration) return;
    const clamped = Math.max(0, Math.min(100, percent));
    const time = (clamped / 100) * audio.duration;
    audio.currentTime = time;
    setState({ currentTime: time });
  }

  function seekByTime(delta) {
    if (!audio || !audio.duration) return;
    const time = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
    audio.currentTime = time;
    setState({ currentTime: time });
  }

  function setDragging(dragging) {
    isDragging = dragging;
  }

  function cycleMode() {
    const idx = playModes.indexOf(state.playMode);
    setState({ playMode: playModes[(idx + 1) % playModes.length] });
  }

  function handleTrackEnded() {
    if (state.playMode === "repeat") {
      if (audio) audio.currentTime = 0;
      play();
    } else {
      next();
    }
  }

  function subscribe(fn) {
    if (typeof fn !== "function") return function () {};
    subscribers.push(fn);
    fn({ ...state }, {});
    return function unsubscribe() {
      const idx = subscribers.indexOf(fn);
      if (idx !== -1) subscribers.splice(idx, 1);
    };
  }

  function init(playlist) {
    if (initialized) return;
    initialized = true;

    tracks = Array.isArray(playlist) ? playlist : [];
    if (!tracks.length) return;

    createAudio();

    const saved = restore();
    const savedIndex = saved && Number.isInteger(saved.currentIndex)
      ? ((saved.currentIndex % tracks.length) + tracks.length) % tracks.length
      : 0;
    const savedMode = saved && playModes.includes(saved.playMode)
      ? saved.playMode
      : "sequence";

    state.currentIndex = savedIndex;
    state.playMode = savedMode;
    state.isPlaying = false;
    state.currentTime = 0;
    state.duration = 0;
    state.error = null;

    loadTrack(state.currentIndex);

    if (saved && saved.currentTime > 0) {
      const targetTime = saved.currentTime;
      const onCanPlay = () => {
        if (audio && audio.duration && isFinite(audio.duration)) {
          audio.currentTime = Math.min(targetTime, audio.duration);
        }
        audio.removeEventListener("canplay", onCanPlay);
      };
      audio.addEventListener("canplay", onCanPlay);
    }
  }

  window.VinylPlayer = {
    init,
    subscribe,
    loadTrack,
    play,
    pause,
    toggle,
    next,
    prev,
    select,
    seek,
    seekByTime,
    setDragging,
    cycleMode,
    getState: () => ({ ...state }),
    getAudio: () => audio,
    getTracks: () => tracks.slice(),
    formatTime,
    hexToRgb,
    playModes,
    modeIcons,
    modeLabels
  };
})();
