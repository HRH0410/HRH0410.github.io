(function () {
  "use strict";

  function initPersonalFile() {
    const card = document.getElementById("steph-personal-file");
    if (!card || card.dataset.personalFileReady === "true") return;
    card.dataset.personalFileReady = "true";

    const triggers = Array.from(document.querySelectorAll("[data-personal-file-open]"));
    const tabList = card.querySelector("[role='tablist']");
    const tabs = Array.from(card.querySelectorAll("[data-personal-file-page]"));
    const panels = Array.from(card.querySelectorAll("[data-personal-file-panel]"));
    const pages = card.querySelector(".personal-file__pages");
    const previous = card.querySelector("[data-personal-file-prev]");
    const next = card.querySelector("[data-personal-file-next]");
    const progress = card.querySelector("[data-personal-file-progress]");
    const headerProgress = card.querySelector("[data-personal-file-header-progress]");
    const copyStatus = card.querySelector("[data-personal-file-copy-status]");
    const wechatToggle = card.querySelector("[data-personal-file-wechat-toggle]");
    const wechatLabel = card.querySelector("[data-personal-file-wechat-label]");
    const wechatValue = "huangronghao2004";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let currentPage = 1;
    let returnFocus = null;
    let transitionTimer = null;

    function isVisible() {
      return !card.hidden && !card.classList.contains("is-closing");
    }

    function setTriggerState(expanded) {
      triggers.forEach(function (trigger) {
        trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
      });
    }

    function setProgress() {
      const current = String(currentPage).padStart(2, "0");
      const total = String(panels.length).padStart(2, "0");
      if (progress) progress.textContent = current + " / " + total;
      if (headerProgress) headerProgress.textContent = current + " — " + total;
    }

    function showPage(page, moveFocus) {
      currentPage = Math.max(1, Math.min(panels.length, page));
      let activeTab = null;

      tabs.forEach(function (tab) {
        const active = Number(tab.dataset.personalFilePage) === currentPage;
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.tabIndex = active ? 0 : -1;
        if (active) activeTab = tab;
      });

      panels.forEach(function (panel) {
        const active = Number(panel.dataset.personalFilePanel) === currentPage;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });

      if (previous) previous.disabled = currentPage === 1;
      if (next) next.disabled = currentPage === panels.length;
      setProgress();
      if (pages) pages.scrollTop = 0;

      if (activeTab && tabList && tabList.scrollWidth > tabList.clientWidth) {
        const left = activeTab.offsetLeft - (tabList.clientWidth - activeTab.offsetWidth) / 2;
        tabList.scrollTo({ left: Math.max(0, left), behavior: reducedMotion ? "auto" : "smooth" });
      }

      if (activeTab && moveFocus) activeTab.focus({ preventScroll: true });
    }

    function setAnimationOrigin(trigger) {
      const triggerRect = trigger.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const originX = triggerRect.left + triggerRect.width / 2 - (cardRect.left + cardRect.width / 2);
      const originY = triggerRect.top + triggerRect.height / 2 - (cardRect.top + cardRect.height / 2);
      card.style.setProperty("--personal-file-from-x", originX + "px");
      card.style.setProperty("--personal-file-from-y", originY + "px");
    }

    function openCard(trigger) {
      window.clearTimeout(transitionTimer);
      returnFocus = trigger || document.activeElement;
      showPage(1, false);
      card.hidden = false;
      card.classList.remove("is-closing", "is-open", "is-opening");
      card.classList.add("is-preparing");
      setAnimationOrigin(trigger || returnFocus);
      setTriggerState(true);

      // A short timer deliberately follows the first paint. Unlike requestAnimationFrame,
      // it also advances when the page is briefly backgrounded (for example, while a
      // visitor is switching tabs), so the card never remains in its invisible start state.
      window.setTimeout(function () {
        card.classList.remove("is-preparing");
        card.classList.add("is-opening", "is-open");
        transitionTimer = window.setTimeout(function () {
          card.classList.remove("is-opening");
        }, reducedMotion ? 0 : 800);
        if (tabs[0]) tabs[0].focus({ preventScroll: true });
      }, reducedMotion ? 0 : 16);
    }

    function closeCard(restoreFocus) {
      if (card.hidden || card.classList.contains("is-closing")) return;
      window.clearTimeout(transitionTimer);
      card.classList.remove("is-opening", "is-open", "is-preparing");
      card.classList.add("is-closing");
      setTriggerState(false);

      transitionTimer = window.setTimeout(function () {
        card.hidden = true;
        card.classList.remove("is-closing");
        showPage(1, false);
        if (restoreFocus && returnFocus && document.contains(returnFocus)) {
          returnFocus.focus({ preventScroll: true });
        }
      }, reducedMotion ? 0 : 280);
    }

    triggers.forEach(function (trigger) {
      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("click", function () {
        if (isVisible()) closeCard(false);
        else openCard(trigger);
      });
    });

    card.addEventListener("click", function (event) {
      if (event.target.closest("[data-personal-file-close]")) {
        closeCard(true);
        return;
      }

      const tab = event.target.closest("[data-personal-file-page]");
      if (tab) {
        showPage(Number(tab.dataset.personalFilePage), false);
        return;
      }

      if (event.target.closest("[data-personal-file-prev]")) showPage(currentPage - 1, false);
      if (event.target.closest("[data-personal-file-next]")) showPage(currentPage + 1, false);

      const wechatToggleClicked = event.target.closest("[data-personal-file-wechat-toggle]");
      if (wechatToggleClicked && wechatLabel) {
        const isExpanded = wechatToggleClicked.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
          wechatToggleClicked.setAttribute("aria-expanded", "false");
          wechatLabel.textContent = "对个暗号";
          if (copyStatus) copyStatus.textContent = "";
        } else {
          wechatToggleClicked.setAttribute("aria-expanded", "true");
          wechatLabel.textContent = wechatValue;
          copyValue(wechatValue, function (success) {
            if (copyStatus) copyStatus.textContent = success ? "微信号已复制" : "复制失败，请手动复制微信号";
          });
        }
        return;
      }

      const copy = event.target.closest("[data-personal-file-copy]");
      if (!copy) return;

      const original = copy.textContent;
      copyValue(copy.dataset.personalFileCopy, function (success) {
        copy.textContent = success ? "已复制" : "请手动复制";
        if (copyStatus) copyStatus.textContent = success ? "微信号已复制" : "复制失败，请手动复制微信号";
        window.setTimeout(function () { copy.textContent = original; }, 1600);
      });
    });

    function copyValue(value, callback) {
      function finish(success) {
        if (callback) callback(success);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(function () { finish(true); }).catch(function () { finish(false); });
      } else {
        const input = document.createElement("textarea");
        input.value = value;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        finish(copied);
      }
    }

    card.addEventListener("keydown", function (event) {
      const inTabList = Boolean(event.target.closest("[data-personal-file-page]"));
      const previousKey = event.key === "ArrowLeft" || (inTabList && event.key === "ArrowUp");
      const nextKey = event.key === "ArrowRight" || (inTabList && event.key === "ArrowDown");

      if (previousKey) {
        event.preventDefault();
        event.stopPropagation();
        showPage(currentPage - 1, inTabList);
      }

      if (nextKey) {
        event.preventDefault();
        event.stopPropagation();
        showPage(currentPage + 1, inTabList);
      }

      if (inTabList && event.key === "Home") {
        event.preventDefault();
        showPage(1, true);
      }

      if (inTabList && event.key === "End") {
        event.preventDefault();
        showPage(panels.length, true);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isVisible()) {
        event.preventDefault();
        closeCard(true);
      }
    });

    // The card deliberately does not add a dimmed backdrop: the garden remains
    // visible and its links stay usable. A click on ordinary whitespace around
    // the card is still a lightweight way to fold it back into its trigger.
    document.addEventListener("click", function (event) {
      if (!isVisible() || card.contains(event.target)) return;

      const interactiveTarget = event.target.closest(
        "a, button, input, textarea, select, summary, [role='button'], [contenteditable='true']"
      );

      if (!interactiveTarget) closeCard(true);
    });

    showPage(1, false);

    if (!window.__stephPersonalFileTurboBound) {
      document.addEventListener("turbo:before-render", function () {
        card.hidden = true;
        card.classList.remove("is-preparing", "is-opening", "is-open", "is-closing");
        setTriggerState(false);
      });
      window.__stephPersonalFileTurboBound = true;
    }
  }

  if (!window.__stephPersonalFileBound) {
    document.addEventListener("turbo:load", initPersonalFile);
    window.__stephPersonalFileBound = true;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initPersonalFile);
  else initPersonalFile();
})();
