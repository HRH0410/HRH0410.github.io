/* 首页微交互：磁性导航 + 控制台欢迎艺术 */

(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function printConsoleWelcome() {
    if (!window.console || !console.log) return;
    console.log("%c🌱 欢迎来到 Steph.H 的数字花园", "color: #5e806f; font-size: 12px; font-weight: bold;");
    console.log("%c    在这里慢慢走，顺便发现一些小彩蛋。", "color: #7a7166; font-size: 11px;");
    console.log(`
        🌿
      🌱🌱🌱
    🌿🌿🌿🌿🌿
      🌱🌱🌱
        🌿
    `);
  }

  function initMagneticNav() {
    if (reducedMotion) return;

    const items = document.querySelectorAll(".garden-nav-item.is-magnetic");
    items.forEach(function (item) {
      item.addEventListener("mousemove", function (event) {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const maxMove = 8;
        item.style.setProperty("--mag-x", (x / rect.width) * maxMove + "px");
        item.style.setProperty("--mag-y", (y / rect.height) * maxMove + "px");
      });

      item.addEventListener("mouseleave", function () {
        item.style.setProperty("--mag-x", "0px");
        item.style.setProperty("--mag-y", "0px");
      });
    });
  }

  function initAll() {
    printConsoleWelcome();
    initMagneticNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  document.addEventListener("turbo:load", initAll);
})();
