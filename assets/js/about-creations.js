/* About Creations: a Turbo-safe, keyboard-friendly five-work screening console. */
(function () {
  "use strict";

  function initCreationsReel() {
    const reel = document.querySelector("[data-creations-reel]");
    if (!reel || reel.dataset.creationsInitialized === "true") return;

    const controller = new AbortController();
    const signal = controller.signal;
    const triggers = Array.from(reel.querySelectorAll("[data-creation-trigger]"));
    const panels = Array.from(reel.querySelectorAll("[role='tabpanel']"));
    const image = reel.querySelector("[data-reel-image]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = new Set();
    let activeIndex = Math.max(0, triggers.findIndex(function (trigger) {
      return trigger.getAttribute("aria-selected") === "true";
    }));

    if (!triggers.length || !image) return;

    function updateImage(trigger) {
      const nextSource = trigger.dataset.workCover;
      if (!nextSource || image.getAttribute("src") === nextSource) return;

      const replace = function () {
        image.setAttribute("src", nextSource);
        image.setAttribute("alt", "《" + (trigger.querySelector(".creation-cue__title").textContent || "") + "》作品定帧");
        reel.style.setProperty("--creation-position", trigger.dataset.workPosition || "center");
        reel.style.setProperty("--creation-fit", trigger.dataset.workFit || "contain");
        if (reducedMotion) image.classList.remove("is-switching");
      };

      if (reducedMotion) {
        replace();
        return;
      }

      image.classList.add("is-switching");
      const timer = window.setTimeout(function () {
        timers.delete(timer);
        replace();
      }, 110);
      timers.add(timer);
    }

    function activate(index, moveFocus) {
      if (index < 0 || index >= triggers.length || index === activeIndex) return;
      const trigger = triggers[index];
      activeIndex = index;
      reel.dataset.activeWork = trigger.dataset.workId || "";
      reel.style.setProperty("--creation-accent", trigger.dataset.workAccent || "#c39c43");

      triggers.forEach(function (item, itemIndex) {
        const selected = itemIndex === index;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });

      panels.forEach(function (panel, panelIndex) {
        panel.hidden = panelIndex !== index;
      });

      updateImage(trigger);
      if (moveFocus) trigger.focus();
    }

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener("click", function () {
        activate(index, false);
      }, { signal: signal });

      trigger.addEventListener("keydown", function (event) {
        let nextIndex = null;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % triggers.length;
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + triggers.length) % triggers.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = triggers.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activate(nextIndex, true);
      }, { signal: signal });
    });

    image.addEventListener("load", function () {
      image.classList.remove("is-switching");
    }, { signal: signal });

    reel.__creationsAbort = controller;
    reel.__creationsTimers = timers;
    reel.dataset.creationsInitialized = "true";
  }

  function cleanupCreationsReel() {
    const reel = document.querySelector("[data-creations-reel]");
    if (!reel) return;
    if (reel.__creationsTimers) reel.__creationsTimers.forEach(window.clearTimeout);
    if (reel.__creationsAbort) reel.__creationsAbort.abort();
    delete reel.__creationsTimers;
    delete reel.__creationsAbort;
    reel.dataset.creationsInitialized = "false";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCreationsReel, { once: true });
  } else {
    initCreationsReel();
  }

  document.addEventListener("turbo:load", initCreationsReel);
  document.addEventListener("turbo:before-render", cleanupCreationsReel);
})();
