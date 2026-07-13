/* =============================================
   Steph.H About — archive cover and pixel-scene clue
   Turbo-safe, accessible and reduced-motion aware
   ============================================= */

(function () {
  "use strict";

  const fallbackPixelClue = {
    title: "UNFINISHED SONG",
    note: "去寻找这里浪费的意义～"
  };

  function getPixelClue(scene) {
    const source = scene.dataset.pixelClues;
    if (!source) return fallbackPixelClue;

    try {
      const parsed = JSON.parse(source);
      const clue = Array.isArray(parsed) ? parsed[0] : null;
      return clue && clue.title && clue.note ? clue : fallbackPixelClue;
    } catch (error) {
      return fallbackPixelClue;
    }
  }

  function initAboutPersona() {
    const scene = document.getElementById("about-pixel-scene");
    const button = document.getElementById("pixel-clue-button");
    const message = document.getElementById("pixel-clue-message");

    if (!scene || !button || !message) return;
    if (scene.dataset.personaInitialized === "true") return;

    const pixelClue = getPixelClue(scene);
    const controller = new AbortController();
    const signal = controller.signal;
    const titleEl = message.querySelector("strong");
    const noteEl = message.querySelector("small");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hideTimer = 0;

    scene.dataset.personaInitialized = "true";
    scene.__personaAbort = controller;

    function closeClue() {
      scene.classList.remove("is-clue-open");
      message.setAttribute("aria-hidden", "true");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "打开雨夜短笺");
      hideTimer = 0;
      scene.__personaHideTimer = 0;
    }

    function revealClue() {
      if (titleEl) titleEl.textContent = pixelClue.title;
      if (noteEl) noteEl.textContent = pixelClue.note;

      scene.classList.remove("is-clue-open");
      if (!reducedMotion) void scene.offsetWidth;
      scene.classList.add("is-clue-open");
      message.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "再次打开歌词彩蛋");

      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(closeClue, 5000);
      scene.__personaHideTimer = hideTimer;
    }

    button.addEventListener("click", revealClue, { signal });
  }

  function cleanupAboutPersona() {
    const scene = document.getElementById("about-pixel-scene");
    if (!scene) return;
    if (scene.__personaHideTimer) window.clearTimeout(scene.__personaHideTimer);
    delete scene.__personaHideTimer;
    if (scene.__personaAbort) scene.__personaAbort.abort();
    delete scene.__personaAbort;
    scene.dataset.personaInitialized = "false";
  }

  window.StephAboutPersona = {
    init: initAboutPersona,
    cleanup: cleanupAboutPersona
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAboutPersona, { once: true });
  } else {
    initAboutPersona();
  }

  document.addEventListener("turbo:load", initAboutPersona);
  document.addEventListener("turbo:before-render", cleanupAboutPersona);
})();
