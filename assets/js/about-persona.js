/* =============================================
   Steph.H About — archive cover and pixel-scene clue
   Turbo-safe, accessible and reduced-motion aware
   ============================================= */

(function () {
  "use strict";

  const pixelClues = [
    { mark: "#30", title: "CURRY 30", note: "投进下一个还没发生的可能。" },
    { mark: "MIC", title: "MICROPHONE", note: "唱到世界听见心里的回声。" },
    { mark: "GTR", title: "WOODEN GUITAR", note: "把沿途的风谱成一小段旋律。" },
    { mark: "BGM", title: "UNFINISHED SONG", note: "去寻找这里浪费的意义。" },
    { mark: "STAR", title: "STARFRUIT", note: "今天也在自己的季节里慢慢生长。" },
    { mark: "HEN", title: "FARM CHICKEN", note: "它好像知道明天会是晴天。" },
    { mark: "DOOR", title: "ANYWHERE DOOR", note: "下一站，去还没有写进地图的地方。" },
    { mark: "TAKE", title: "TAKE-COPTER", note: "先飞起来，再决定要去哪里。" },
    { mark: "CAF", title: "HALF A COFFEE", note: "给还没完成的灵感续一点时间。" },
    { mark: "HP", title: "HEADPHONES", note: "把世界调成一首适合散步的歌。" },
    { mark: "BOOK", title: "POCKET BOOK", note: "有些远方，可以先从一页纸抵达。" }
  ];

  function initAboutPersona() {
    const scene = document.getElementById("about-pixel-scene");
    const button = document.getElementById("pixel-clue-button");
    const message = document.getElementById("pixel-clue-message");

    if (!scene || !button || !message) return;
    if (scene.dataset.personaInitialized === "true") return;

    const controller = new AbortController();
    const signal = controller.signal;
    const markEl = message.querySelector(".pixel-scene__mark");
    const titleEl = message.querySelector("strong");
    const noteEl = message.querySelector("small");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let previousIndex = -1;
    let hideTimer = 0;

    scene.dataset.personaInitialized = "true";
    scene.__personaAbort = controller;

    function pickClue() {
      let index = Math.floor(Math.random() * pixelClues.length);
      if (pixelClues.length > 1 && index === previousIndex) {
        index = (index + 1) % pixelClues.length;
      }
      previousIndex = index;
      return pixelClues[index];
    }

    function closeClue() {
      scene.classList.remove("is-clue-open");
      message.setAttribute("aria-hidden", "true");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "检查页尾的像素夜景");
      hideTimer = 0;
      scene.__personaHideTimer = 0;
    }

    function revealClue() {
      const clue = pickClue();
      if (markEl) markEl.textContent = clue.mark;
      if (titleEl) titleEl.textContent = clue.title;
      if (noteEl) noteEl.textContent = clue.note;

      scene.classList.remove("is-clue-open");
      if (!reducedMotion) void scene.offsetWidth;
      scene.classList.add("is-clue-open");
      message.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "继续检查像素夜景中的线索");

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
