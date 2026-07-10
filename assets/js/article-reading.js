(function () {
  "use strict";

  var globalKey = "StephArticleReading";
  var previousInstance = window[globalKey];

  if (previousInstance && typeof previousInstance.destroy === "function") {
    previousInstance.destroy();
  }

  var lifecycleController = new AbortController();
  var pageController = null;
  var frameId = 0;
  var progressBar = null;
  var readingStart = null;
  var readingEnd = null;

  function cleanupPage() {
    if (pageController) {
      pageController.abort();
      pageController = null;
    }

    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }

    progressBar = null;
    readingStart = null;
    readingEnd = null;
  }

  function updateProgress() {
    frameId = 0;
    if (!progressBar || !readingStart || !readingEnd) return;

    var start = readingStart.getBoundingClientRect().top + window.scrollY;
    var end = readingEnd.getBoundingClientRect().bottom + window.scrollY;
    var distance = Math.max(end - start - window.innerHeight, 1);
    var current = window.scrollY - start;
    var progress = Math.min(1, Math.max(0, current / distance));

    progressBar.style.setProperty("--article-reading-progress", progress.toFixed(4));
  }

  function scheduleUpdate() {
    if (frameId) return;
    frameId = window.requestAnimationFrame(updateProgress);
  }

  function initPage() {
    cleanupPage();

    var article = document.querySelector(".article-shell[data-article-type]");
    if (!article) return;

    progressBar = article.querySelector("[data-article-progress]");
    readingStart = article.querySelector(".article-header");
    readingEnd = article.querySelector(".article-reading-content");
    if (!progressBar || !readingStart || !readingEnd) {
      cleanupPage();
      return;
    }

    pageController = new AbortController();
    var listenerOptions = { passive: true, signal: pageController.signal };
    window.addEventListener("scroll", scheduleUpdate, listenerOptions);
    window.addEventListener("resize", scheduleUpdate, listenerOptions);
    updateProgress();
  }

  document.addEventListener("turbo:load", initPage, { signal: lifecycleController.signal });
  document.addEventListener("turbo:before-render", cleanupPage, { signal: lifecycleController.signal });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage, {
      once: true,
      signal: lifecycleController.signal
    });
  } else {
    initPage();
  }

  window[globalKey] = {
    destroy: function () {
      cleanupPage();
      lifecycleController.abort();
    }
  };
})();
