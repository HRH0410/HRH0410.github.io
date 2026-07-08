/* About 页微交互：技能条滚动入场 + 爱好标签微动画 */

(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealSkillItems(container) {
    const items = container.querySelectorAll(".skill-item");
    items.forEach(function (item, index) {
      if (item.classList.contains("is-revealed")) return;
      var delay = reducedMotion ? 0 : index * 90;
      window.setTimeout(function () {
        item.classList.add("is-revealed");
      }, delay);
    });
  }

  function initSkillReveal() {
    if (reducedMotion) {
      document.querySelectorAll(".about-page-content .skill-item").forEach(function (item) {
        item.classList.add("is-revealed");
      });
      return;
    }

    var skillContainers = document.querySelectorAll(".about-page-content .skill-items");
    if (!skillContainers.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealSkillItems(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px"
    });

    skillContainers.forEach(function (container) {
      observer.observe(container);
    });
  }

  function initHobbyAnimations() {
    var tags = document.querySelectorAll(".about-page-content .hobby-archive .tag");
    var emojiMap = {
      "🎵": "hobby-music",
      "📷": "hobby-photo",
      "✈️": "hobby-travel",
      "🎮": "hobby-game",
      "📚": "hobby-read",
      "🎬": "hobby-movie"
    };

    tags.forEach(function (tag) {
      var text = tag.textContent.trim();
      Object.keys(emojiMap).forEach(function (emoji) {
        if (text.indexOf(emoji) === 0) {
          tag.classList.add(emojiMap[emoji]);
          if (!tag.querySelector(".hobby-emoji")) {
            tag.innerHTML = tag.innerHTML.replace(emoji, '<span class="hobby-emoji">' + emoji + '</span>');
          }
        }
      });
    });
  }

  function init() {
    initSkillReveal();
    initHobbyAnimations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
