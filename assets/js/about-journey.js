/* =============================================
   Steph.H About - footprint film archive
   Turbo-safe page module
   ============================================= */

(function () {
  "use strict";

  function initJourney() {
    const section = document.getElementById("footprint-film-archive");
    const timeline = document.getElementById("journey-timeline");
    const track = document.getElementById("journey-track");
    const lightbox = document.getElementById("journey-lightbox");

    if (!section || !timeline || !track || !lightbox) return;
    if (section.dataset.journeyInitialized === "true") return;

    const controller = new AbortController();
    const signal = controller.signal;

    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxCity = document.getElementById("lightbox-city");
    const lightboxYear = document.getElementById("lightbox-year");
    const lightboxEmoji = document.getElementById("lightbox-emoji");
    const lightboxPhotos = document.getElementById("lightbox-photos");
    const lightboxStory = document.getElementById("lightbox-story");
    const lightboxContent = lightbox.querySelector(".lightbox-content");
    const cards = Array.from(track.querySelectorAll(".journey-card"));

    if (!lightboxClose || !lightboxCity || !lightboxYear || !lightboxEmoji || !lightboxPhotos || !lightboxStory) {
      return;
    }

    section.dataset.journeyInitialized = "true";
    section.__journeyAbort = controller;

    let previousFocus = null;
    let activeCardIndex = -1;

    function applyCardRatio(card) {
      const img = card.querySelector(".film-photo img");
      if (!img) return;

      const apply = () => {
        if (!img.naturalWidth || !img.naturalHeight) return;
        const ratio = img.naturalWidth / img.naturalHeight;
        const cardWidth = Math.max(128, Math.min(230, 142 * Math.min(ratio, 1.62)));

        card.style.setProperty("--photo-ratio", ratio.toFixed(4));
        card.style.setProperty("--card-width", `${Math.round(cardWidth)}px`);
        card.classList.toggle("is-photo-portrait", ratio < 0.9);
        card.classList.toggle("is-photo-landscape", ratio > 1.12);
        card.classList.add("has-photo-ratio");
      };

      const markError = () => {
        card.classList.add("is-photo-missing");
      };

      if (img.complete) {
        apply();
        if (!img.naturalWidth) markError();
      } else {
        img.addEventListener("load", apply, { once: true, signal });
        img.addEventListener("error", markError, { once: true, signal });
      }
    }

    function parsePhotos(card) {
      try {
        const parsed = JSON.parse(card.dataset.photos || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch (_) {
        return [];
      }
    }

    function renderPhotos(photos, city) {
      lightboxPhotos.innerHTML = "";
      lightbox.classList.remove("is-landscape", "is-portrait", "is-gallery");
      lightbox.classList.add(photos.length > 1 ? "is-gallery" : "is-landscape");
      if (photos[0]) {
        lightbox.style.setProperty("--journey-active-photo", `url("${photos[0]}")`);
      }

      photos.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = city;
        img.loading = "lazy";
        img.className = "nozoom";
        img.draggable = false;
        img.addEventListener("click", (event) => event.stopPropagation(), { signal });
        img.addEventListener("load", () => {
          if (photos.length !== 1 || index !== 0 || !img.naturalWidth || !img.naturalHeight) return;
          const ratio = img.naturalWidth / img.naturalHeight;
          lightbox.classList.toggle("is-portrait", ratio < 0.92);
          lightbox.classList.toggle("is-landscape", ratio >= 0.92);
          if (lightboxContent) {
            lightboxContent.style.setProperty("--photo-aspect", ratio.toFixed(4));
          }
        }, { once: true, signal });
        lightboxPhotos.appendChild(img);
      });
    }

    function updateNavLabels() {
      if (!cards.length || activeCardIndex < 0) return;
      const prevCard = cards[(activeCardIndex - 1 + cards.length) % cards.length];
      const nextCard = cards[(activeCardIndex + 1) % cards.length];
      if (lightboxPrev) {
        lightboxPrev.setAttribute("aria-label", `上一站：${prevCard.dataset.city || ""}`);
      }
      if (lightboxNext) {
        lightboxNext.setAttribute("aria-label", `下一站：${nextCard.dataset.city || ""}`);
      }
    }

    function setLightboxCard(card) {
      const city = card.dataset.city || "";
      const year = card.dataset.year || "";
      const emoji = card.dataset.emoji || "";
      const story = card.dataset.story || "";
      const photos = parsePhotos(card);

      lightboxCity.textContent = city;
      lightboxYear.textContent = year ? `${year} archive` : "archive";
      lightboxEmoji.textContent = emoji;
      lightboxStory.textContent = story || "这里还没有写下故事，但照片会替我保留当时的光。";
      renderPhotos(photos, city);
      updateNavLabels();
    }

    function openLightbox(card) {
      previousFocus = document.activeElement;
      activeCardIndex = Math.max(0, cards.indexOf(card));
      setLightboxCard(card);

      lightbox.setAttribute("aria-hidden", "false");
      lightbox.classList.add("is-open");
      document.body.classList.add("is-journey-lightbox-open");
      document.body.style.overflow = "hidden";
      lightboxClose.focus({ preventScroll: true });
    }

    function closeLightbox() {
      lightbox.setAttribute("aria-hidden", "true");
      lightbox.classList.remove("is-open");
      lightbox.style.removeProperty("--journey-active-photo");
      document.body.classList.remove("is-journey-lightbox-open");
      document.body.style.overflow = "";
      activeCardIndex = -1;
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus({ preventScroll: true });
      }
    }

    function moveLightbox(direction) {
      if (!cards.length || activeCardIndex < 0) return;
      activeCardIndex = (activeCardIndex + direction + cards.length) % cards.length;
      setLightboxCard(cards[activeCardIndex]);
    }

    cards.forEach((card) => {
      card.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openLightbox(card);
      }, { signal });
    });

    lightboxClose.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeLightbox();
    }, { signal });
    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        moveLightbox(-1);
      }, { signal });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        moveLightbox(1);
      }, { signal });
    }
    lightbox.addEventListener("click", (event) => {
      const clickedBackdrop = event.target === lightbox ||
        (lightboxContent && !lightboxContent.contains(event.target));
      const clickedInnerBlank = event.target === lightboxContent || event.target === lightboxPhotos;
      if (clickedBackdrop || clickedInnerBlank) closeLightbox();
    }, { signal });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLightbox(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(1);
      }
    }, { signal });

    cards.forEach(applyCardRatio);
  }

  function cleanupJourney() {
    const section = document.getElementById("footprint-film-archive");
    if (!section || !section.__journeyAbort) return;
    section.__journeyAbort.abort();
    document.body.classList.remove("is-journey-lightbox-open");
    document.body.style.overflow = "";
  }

  window.StephJourney = {
    init: initJourney,
    cleanup: cleanupJourney
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initJourney);
  } else {
    initJourney();
  }

  document.addEventListener("turbo:load", initJourney);
  document.addEventListener("turbo:before-render", cleanupJourney);
})();
