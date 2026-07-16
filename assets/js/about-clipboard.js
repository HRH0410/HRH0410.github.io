/* About 页微交互：通用联系方式复制 + Toast 提示 */

(function () {
  "use strict";

  function showToast(message) {
    let toast = document.querySelector(".about-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "about-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");

    if (toast._timer) window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1000);
  }

  function fallbackCopy(text, label) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText = "position:fixed;inset:0;opacity:0;pointer-events:none;";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const copied = document.execCommand("copy");
      showToast(copied ? label + "已复制" : "复制失败，请手动复制");
    } catch (error) {
      showToast("复制失败，请手动复制");
    }

    document.body.removeChild(textarea);
  }

  function copyValue(value, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(function () {
        showToast(label + "已复制");
      }).catch(function () {
        fallbackCopy(value, label);
      });
    } else {
      fallbackCopy(value, label);
    }
  }

  function initCopyButtons() {
    document.querySelectorAll("[data-about-copy]").forEach(function (button) {
      if (button.dataset.aboutCopyInitialized === "true") return;
      button.dataset.aboutCopyInitialized = "true";
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const value = button.dataset.aboutCopy || "";
        const label = button.dataset.aboutCopyLabel || "内容";
        if (value) copyValue(value, label);
      });
    });
  }

  function initWechatReveal() {
    document.querySelectorAll("[data-wechat-reveal]").forEach(function (button) {
      if (button.dataset.wechatRevealInitialized === "true") return;
      button.dataset.wechatRevealInitialized = "true";
      button.addEventListener("click", function () {
        const value = button.parentElement && button.parentElement.querySelector("[data-wechat-id]");
        if (!value) return;
        value.hidden = false;
        button.hidden = true;
      });
    });
  }

  function initRecognition() {
    document.querySelectorAll("[data-recognition]").forEach(function (section) {
      if (section.dataset.recognitionInitialized === "true") return;
      const toggle = section.querySelector("[data-recognition-toggle]");
      if (!toggle) return;
      section.dataset.recognitionInitialized = "true";

      const items = Array.from(section.querySelectorAll('[data-recognition-item][data-featured="false"]'));
      const label = toggle.querySelector("[data-recognition-label]");
      const symbol = toggle.querySelector("[data-recognition-symbol]");

      toggle.addEventListener("click", function () {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        const nextExpanded = !expanded;
        toggle.setAttribute("aria-expanded", nextExpanded ? "true" : "false");
        items.forEach(function (item) { item.hidden = !nextExpanded; });
        if (label) label.textContent = nextExpanded ? "收起" : "展开";
        if (symbol) symbol.textContent = nextExpanded ? "−" : "＋";
      });
    });
  }

  function initAll() {
    initCopyButtons();
    initWechatReveal();
    initRecognition();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  document.addEventListener("turbo:load", initAll);
})();
