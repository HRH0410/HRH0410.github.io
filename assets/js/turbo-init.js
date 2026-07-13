/* =============================================
   Turbo Drive integration for the vinyl player
   - Keeps the player sidebar permanent across navigations
   - Re-initializes Blowfish theme features after each page swap
   ============================================= */

(function () {
  "use strict";

  if (typeof Turbo === "undefined") return;

  function updatePlayerVisibility() {
    const root = document.getElementById("global-player-root");
    const isHome = Boolean(document.getElementById("home-listening-station"));
    if (root) {
      const wasHome = root.classList.contains("is-home") || document.documentElement.classList.contains("is-home-page");
      root.classList.toggle("is-home", isHome);
      if (wasHome && !isHome) {
        collapseGlobalPlayer(root);
      }
    }
    // Sync the build-time <html> class used to hide the player on the homepage.
    document.documentElement.classList.toggle("is-home-page", isHome);
  }

  function collapseGlobalPlayer(root) {
    const fab = root.querySelector("#global-player-fab");
    const panel = root.querySelector("#global-player-panel");
    root.classList.add("is-collapsed");
    if (fab) fab.setAttribute("aria-expanded", "false");
    if (panel) panel.setAttribute("aria-hidden", "true");
    try {
      localStorage.setItem("vinyl-player-collapsed", "true");
    } catch (_) {
      // ignore
    }
  }

  function initScrollToTop() {
    const el = document.getElementById("scroll-to-top");
    if (!el) return;
    const update = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        el.classList.remove("translate-y-4", "opacity-0");
        el.classList.add("translate-y-0", "opacity-100");
      } else {
        el.classList.remove("translate-y-0", "opacity-100");
        el.classList.add("translate-y-4", "opacity-0");
      }
    };
    window.removeEventListener("scroll", update);
    window.addEventListener("scroll", update);
    update();
  }

  function initCodeCopy() {
    const scriptBundle = document.getElementById("script-bundle");
    const copyText = scriptBundle?.getAttribute("data-copy") || "Copy";
    const copiedText = scriptBundle?.getAttribute("data-copied") || "Copied";

    async function copyToClipboard(button, text) {
      try {
        const result = await navigator.permissions.query({ name: "clipboard-write" });
        if (result.state === "granted" || result.state === "prompt") {
          await navigator.clipboard.writeText(text);
        } else {
          throw new Error("denied");
        }
      } catch (_) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      } finally {
        button.blur();
        button.innerText = copiedText;
        window.setTimeout(() => {
          button.innerText = copyText;
        }, 2000);
      }
    }

    document.querySelectorAll(".highlight-wrapper").forEach((wrapper) => {
      if (wrapper.querySelector(".copy-button")) return;
      const highlightDiv = wrapper.querySelector(".highlight");
      if (!highlightDiv) return;
      const codeBlock = highlightDiv.querySelector("code");
      if (!codeBlock) return;

      let text = "";
      const inlineLines = codeBlock.querySelectorAll(".cl");
      const tableCodeCell = highlightDiv.querySelector(".lntable .lntd:last-child code");
      if (inlineLines.length > 0) {
        text = Array.from(inlineLines).map((line) => line.textContent.replace(/\n$/, "")).join("\n");
      } else if (tableCodeCell) {
        text = tableCodeCell.textContent.trim();
      } else {
        text = codeBlock.textContent.trim();
      }

      const button = document.createElement("button");
      button.className = "copy-button";
      button.type = "button";
      button.setAttribute("aria-label", copyText);
      button.innerText = copyText;
      button.addEventListener("click", () => copyToClipboard(button, text));
      wrapper.insertBefore(button, wrapper.firstChild);
    });
  }

  function pageNeedsKaTeX() {
    return Boolean(
      document.getElementById("katex-render") ||
      document.querySelector(".article-content, .prose")?.textContent?.match(/\\\(|\\\[|\$\$/)
    );
  }

  function initKaTeX() {
    if (!pageNeedsKaTeX()) return;

    if (typeof renderMathInElement !== "function") {
      scheduleKaTeXRetry();
      return;
    }

    const target = document.querySelector(".article-content") || document.body;
    if (!target || target.dataset.katexRendered === "true") return;

    try {
      renderMathInElement(target, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false }
        ],
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
      });
      target.dataset.katexRendered = "true";
    } catch (error) {
      // eslint-disable-next-line no-console
      if (window.console && console.warn) console.warn("[katex] render failed", error);
    }
  }

  function scheduleKaTeXRetry() {
    if (window.__stephKaTeXRetryScheduled) return;
    window.__stephKaTeXRetryScheduled = true;

    [80, 180, 360, 720, 1200, 2000, 3200].forEach((delay) => {
      window.setTimeout(() => {
        if (typeof renderMathInElement !== "function") return;
        window.__stephKaTeXRetryScheduled = false;
        initKaTeX();
      }, delay);
    });

    window.setTimeout(() => {
      window.__stephKaTeXRetryScheduled = false;
    }, 3600);
  }

  function initAppearance() {
    function getTargetAppearance() {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    function updateMeta() {
      const body = document.querySelector("body");
      const meta = document.querySelector('meta[name="theme-color"]');
      if (body && meta) {
        meta.setAttribute("content", getComputedStyle(body).backgroundColor);
      }
    }
    function toggleAppearance() {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("appearance", getTargetAppearance());
      updateMeta();
    }

    // Use event delegation so we don't have to re-bind after header swaps.
    document.removeEventListener("click", handleAppearanceClick);
    document.addEventListener("click", handleAppearanceClick);

    function handleAppearanceClick(event) {
      const switcher = event.target.closest("#appearance-switcher, #appearance-switcher-mobile");
      if (!switcher) return;
      event.preventDefault();
      toggleAppearance();
    }

    updateMeta();
  }

  function initLikesButton() {
    document.removeEventListener("click", handleLikesClick);
    document.addEventListener("click", handleLikesClick);
  }

  function handleLikesClick(event) {
    const button = event.target.closest("#button_likes");
    if (!button) return;
    if (typeof process_article === "function") {
      process_article();
    }
  }

  function initSearch() {
    document.removeEventListener("click", handleSearchClick);
    document.addEventListener("click", handleSearchClick);
  }

  function handleSearchClick(event) {
    const openButton = event.target.closest("#search-button, #search-button-mobile");
    if (openButton && typeof displaySearch === "function") {
      displaySearch();
      return;
    }
    const closeButton = event.target.closest("#close-search-button");
    if (closeButton && typeof hideSearch === "function") {
      hideSearch();
    }
  }

  function initTypeIt() {
    const nodes = Array.from(document.querySelectorAll("[data-typeit-config]"));
    if (!nodes.length) return;

    if (typeof TypeIt === "undefined") {
      scheduleTypeItRetry();
      return;
    }

    nodes.forEach((el) => {
      if (el.dataset.typeitInitialized) return;

      let config = {};
      try {
        config = JSON.parse(el.dataset.typeitConfig || "{}");
      } catch (_) {
        return;
      }

      config.waitUntilVisible = false;
      new TypeIt(el, config).go();
      el.dataset.typeitInitialized = "true";
    });
  }

  function canPrefetchNavigation(link) {
    if (!link || link.target || link.hasAttribute("download") || link.dataset.turbo === "false") return false;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (_) {
      return false;
    }

    if (url.origin !== window.location.origin || url.protocol !== window.location.protocol) return false;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return false;
    return true;
  }

  function initNavigationPrefetch() {
    const links = document.querySelectorAll(
      "#menu-blur a[href], [role='dialog'][aria-modal='true'] nav a[href]"
    );

    links.forEach((link) => {
      if (link.dataset.navigationPrefetchBound === "true" || !canPrefetchNavigation(link)) return;
      link.dataset.navigationPrefetchBound = "true";

      let timer = null;
      const prefetch = () => {
        timer = null;
        const href = link.href;
        if (!href || document.head.querySelector(`link[data-navigation-prefetch="${CSS.escape(href)}"]`)) return;

        const resource = document.createElement("link");
        resource.rel = "prefetch";
        resource.as = "document";
        resource.href = href;
        resource.dataset.navigationPrefetch = href;
        document.head.appendChild(resource);
      };

      const schedulePrefetch = () => {
        if (timer !== null) return;
        timer = window.setTimeout(prefetch, 90);
      };

      const cancelPrefetch = () => {
        if (timer === null) return;
        window.clearTimeout(timer);
        timer = null;
      };

      link.addEventListener("pointerenter", schedulePrefetch, { passive: true });
      link.addEventListener("focus", schedulePrefetch, { passive: true });
      link.addEventListener("pointerleave", cancelPrefetch, { passive: true });
      link.addEventListener("blur", cancelPrefetch, { passive: true });
    });
  }

  function preparePageEnter(event) {
    const nextBody = event.detail && event.detail.newBody;
    if (nextBody) nextBody.classList.add("turbo-page-entering");
  }

  function revealPageEnter() {
    if (!document.body.classList.contains("turbo-page-entering")) return;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.body.classList.remove("turbo-page-entering");
      });
    });
  }

  function scheduleTypeItRetry() {
    if (window.__stephTypeItRetryScheduled) return;
    window.__stephTypeItRetryScheduled = true;

    [80, 180, 360, 720, 1200, 2000, 3200].forEach((delay) => {
      window.setTimeout(() => {
        if (typeof TypeIt !== "undefined") {
          window.__stephTypeItRetryScheduled = false;
        }
        initTypeIt();
      }, delay);
    });

    window.setTimeout(() => {
      window.__stephTypeItRetryScheduled = false;
    }, 3600);
  }

  async function recoverMissingTrackedStylesheets() {
    const trackedStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"][data-turbo-track="reload"]'));
    let missing = null;

    for (const link of trackedStyles) {
      if (!link.href || !link.href.startsWith(window.location.origin)) continue;
      try {
        const response = await fetch(link.href, { method: "HEAD", cache: "no-store" });
        if (!response.ok) {
          missing = link;
          break;
        }
      } catch (_) {
        // A temporary dev-server outage is not fixed by a browser reload loop.
      }
    }

    if (!missing) return;

    const key = `steph-missing-css:${window.location.pathname}:${missing.href}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch (_) {
      // If sessionStorage is unavailable, still avoid aggressive loops by reloading only on load checks.
    }
    window.location.reload();
  }

  function onPageChange() {
    updatePlayerVisibility();
    if (window.StephJourney && typeof window.StephJourney.init === "function") {
      window.StephJourney.init();
    }
    initScrollToTop();
    initCodeCopy();
    initKaTeX();
    initAppearance();
    initLikesButton();
    initSearch();
    initTypeIt();
    initNavigationPrefetch();
    window.setTimeout(recoverMissingTrackedStylesheets, 500);
  }

  document.addEventListener("turbo:load", onPageChange);
  document.addEventListener("turbo:render", revealPageEnter);

  // Before Turbo swaps the body, tell page-specific player views to unsubscribe
  // so they don't try to update DOM elements that are about to be removed.
  document.addEventListener("turbo:before-render", (event) => {
    preparePageEnter(event);
    const section = document.getElementById("home-listening-station");
    if (section) {
      section.dispatchEvent(new CustomEvent("player-disconnect", { bubbles: false }));
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onPageChange);
  } else {
    onPageChange();
  }
})();
