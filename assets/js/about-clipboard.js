/* About 页微交互：邮箱一键复制 + Toast 提示 */

(function () {
  "use strict";

  function showToast(message) {
    let toast = document.querySelector(".about-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "about-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");

    if (toast._timer) window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1000);
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText = "position:fixed;inset:0;opacity:0;pointer-events:none;";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      showToast("邮箱已复制 📋");
    } catch (error) {
      showToast("复制失败，请手动复制");
    }

    document.body.removeChild(textarea);
  }

  function copyEmail(email) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        showToast("邮箱已复制 📋");
      }).catch(function () {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
  }

  function initEmailCopy() {
    const emailLinks = document.querySelectorAll('.contact-card a[href^="mailto:"]');
    emailLinks.forEach(function (link) {
      const card = link.closest(".contact-card");
      if (!card) return;

      card.classList.add("is-copyable");
      card.setAttribute("title", "点击复制邮箱");

      card.addEventListener("click", function (event) {
        event.preventDefault();
        const email = link.getAttribute("href").replace("mailto:", "").trim();
        if (email) copyEmail(email);
      });
    });
  }

  function initAll() {
    initEmailCopy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  document.addEventListener("turbo:load", initAll);
})();
