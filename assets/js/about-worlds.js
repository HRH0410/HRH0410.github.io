/* About page interactive worlds: Turbo-safe, keyboard-friendly and motion-aware. */
(function () {
  "use strict";

  const studioStates = {
    code: "BUILDING",
    ai: "THINKING",
    create: "EXPORTING"
  };

  const townStates = {
    music: {
      mark: "♪",
      message: "Steph 走到右侧音乐角，鼓点惊动了正在啄食的小鸡。",
      target: [74, 72],
      route: [[54, 70], [63, 68], [70, 68], [74, 72]],
      facing: "down",
      perform: 2300
    },
    photo: {
      mark: "▣",
      message: "蝴蝶停在花圃上，快门与掠过树梢的飞鸟同时亮起。",
      target: [43, 68],
      route: [[48, 74], [47, 69], [43, 68]],
      facing: "left",
      perform: 2500
    },
    travel: {
      mark: "→",
      message: "Steph 在路边等了一会儿，巴士从农舍前缓缓停靠。",
      target: [71, 68],
      route: [[55, 70], [63, 70], [71, 68]],
      facing: "right",
      perform: 3300
    },
    game: {
      mark: "✦",
      message: "树荫下的街机亮起，刷新纪录时跳出一颗像素星星。",
      target: [59, 72],
      route: [[52, 72], [59, 72]],
      facing: "right",
      perform: 2400
    },
    guitar: {
      mark: "♩",
      message: "风穿过树梢，Steph 拿起草坪边的吉他弹了一段熟悉的和弦。",
      target: [69, 72],
      route: [[54, 70], [62, 68], [67, 68], [69, 72]],
      facing: "down",
      perform: 2600
    },
    movie: {
      mark: "▶",
      message: "忙完一天后，Steph 来到菜园旁，露天电影刚好开场。",
      target: [48, 87],
      route: [[49, 80], [48, 87]],
      facing: "right",
      perform: 3000
    }
  };

  const HOME = [47, 77];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function attachVisibilityObserver(root) {
    if (!("IntersectionObserver" in window) || reducedMotion) return null;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        root.classList.toggle("is-offscreen", !entry.isIntersecting);
      });
    }, { threshold: 0.04, rootMargin: "120px 0px 120px 0px" });
    observer.observe(root);
    return observer;
  }

  function initSkillsStudio() {
    const studio = document.querySelector("[data-skills-studio]");
    if (!studio || studio.dataset.worldInitialized === "true") return;

    const controller = new AbortController();
    const signal = controller.signal;
    const stations = Array.from(studio.querySelectorAll("[data-skill-station]"));
    const switches = Array.from(studio.querySelectorAll("[data-skill-trigger]"));
    const status = studio.querySelector("[data-studio-status]");

    function activateStation(name) {
      if (!studioStates[name]) return;
      studio.dataset.activeStation = name;
      stations.forEach(function (station) {
        station.classList.toggle("is-active", station.dataset.skillStation === name);
      });
      switches.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.skillTrigger === name));
      });
      if (status) status.textContent = studioStates[name];
    }

    stations.forEach(function (station) {
      const name = station.dataset.skillStation;
      station.addEventListener("pointerenter", function () { activateStation(name); }, { signal });
      station.addEventListener("focusin", function () { activateStation(name); }, { signal });
    });
    switches.forEach(function (button) {
      button.addEventListener("click", function () { activateStation(button.dataset.skillTrigger); }, { signal });
    });

    studio.__worldAbort = controller;
    studio.__worldObserver = attachVisibilityObserver(studio);
    studio.dataset.worldInitialized = "true";
    activateStation(studio.dataset.activeStation || "code");
  }

  function initHobbyTown() {
    const town = document.querySelector("[data-hobby-town]");
    if (!town || town.dataset.worldInitialized === "true") return;

    const controller = new AbortController();
    const signal = controller.signal;
    const triggers = Array.from(town.querySelectorAll("[data-hobby-trigger]"));
    const kent = town.querySelector("[data-town-kent]");
    const message = town.querySelector("[data-town-message]");
    const mark = town.querySelector(".hobby-town__message-mark");
    let sequence = 0;
    let position = HOME.slice();

    function setTriggerState(name, busy) {
      triggers.forEach(function (trigger) {
        const active = trigger.dataset.hobbyTrigger === name;
        trigger.classList.toggle("is-active", active);
        trigger.setAttribute("aria-pressed", String(active));
        trigger.setAttribute("aria-disabled", String(busy));
      });
    }

    function wait(ms, token) {
      return new Promise(function (resolve) {
        const timer = window.setTimeout(function () {
          town.__worldTimers.delete(timer);
          resolve(token === sequence);
        }, ms);
        town.__worldTimers.add(timer);
      });
    }

    function directionTo(next) {
      const dx = next[0] - position[0];
      const dy = next[1] - position[1];
      if (Math.abs(dx) > Math.abs(dy)) return dx < 0 ? "left" : "right";
      return dy < 0 ? "up" : "down";
    }

    async function walkRoute(route, token) {
      town.dataset.townPhase = "walking";
      for (const next of route) {
        if (token !== sequence) return false;
        kent.dataset.direction = directionTo(next);
        const distance = Math.hypot(next[0] - position[0], next[1] - position[1]);
        const duration = reducedMotion ? 0 : Math.max(280, Math.min(780, distance * 52));
        kent.style.setProperty("--kent-x", next[0] + "%");
        kent.style.setProperty("--kent-y", next[1] + "%");
        kent.style.setProperty("--kent-step-time", duration + "ms");
        position = next.slice();
        if (!(await wait(duration, token))) return false;
      }
      return true;
    }

    async function activateHobby(name) {
      const state = townStates[name];
      if (!state || town.dataset.townPhase !== "idle") return;

      const token = ++sequence;
      town.dataset.activeHobby = name;
      setTriggerState(name, true);
      if (message) message.textContent = state.message;
      if (mark) mark.textContent = state.mark;

      if (!(await walkRoute(state.route, token))) return;
      kent.dataset.direction = state.facing;
      town.dataset.townPhase = "performing";
      town.classList.add("is-event-playing");
      if (!(await wait(reducedMotion ? 1100 : state.perform, token))) return;

      town.classList.remove("is-event-playing");
      const returnRoute = state.route.slice(0, -1).reverse().concat([HOME]);
      if (!(await walkRoute(returnRoute, token))) return;
      kent.dataset.direction = "down";
      town.dataset.townPhase = "idle";
      setTriggerState(name, false);
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        activateHobby(trigger.dataset.hobbyTrigger);
      }, { signal });
    });

    town.__worldAbort = controller;
    town.__worldObserver = attachVisibilityObserver(town);
    town.__worldTimers = new Set();
    town.dataset.worldInitialized = "true";
    kent.style.setProperty("--kent-x", HOME[0] + "%");
    kent.style.setProperty("--kent-y", HOME[1] + "%");
    setTriggerState(town.dataset.activeHobby || "music", false);
  }

  function cleanupWorld(root) {
    if (!root) return;
    if (root.__worldTimers) root.__worldTimers.forEach(window.clearTimeout);
    if (root.__worldObserver) root.__worldObserver.disconnect();
    if (root.__worldAbort) root.__worldAbort.abort();
    delete root.__worldTimers;
    delete root.__worldObserver;
    delete root.__worldAbort;
    root.dataset.worldInitialized = "false";
  }

  function init() {
    initSkillsStudio();
    initHobbyTown();
  }

  function cleanup() {
    cleanupWorld(document.querySelector("[data-skills-studio]"));
    cleanupWorld(document.querySelector("[data-hobby-town]"));
  }

  window.StephAboutWorlds = { init: init, cleanup: cleanup };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
  document.addEventListener("turbo:load", init);
  document.addEventListener("turbo:before-render", cleanup);
})();
