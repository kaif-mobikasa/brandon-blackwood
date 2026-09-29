(function () {
  "use strict";

  function initPdp() {
    const section = document.querySelector(".brandon-pdp-wrapper");
    if (!section) return;

    const allDetailsBtn = section.querySelector(".js-pdp-toggle-details");
    const accordionsContainer = section.querySelector(
      ".brandon-pdp__accordions",
    );
    const galleryItems = section.querySelectorAll(".brandon-pdp__gallery-item");

    const container = section.querySelector(".brandon-pdp__container");
    const closeDetailsBtn = section.querySelector(".js-pdp-close-details");

    if (allDetailsBtn) {
      allDetailsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.innerWidth <= 768) {
          if (accordionsContainer) {
            const isOpen = accordionsContainer.classList.contains(
              "brandon-pdp__accordions--open",
            );
            if (isOpen) {
              accordionsContainer.classList.remove("brandon-pdp__accordions--open");
              const labelEl = allDetailsBtn.querySelector("span:last-child");
              const iconEl = allDetailsBtn.querySelector(".js-pdp-plus-icon");
              if (labelEl) labelEl.textContent = "All Details";
              if (iconEl) iconEl.textContent = "+";
            } else {
              accordionsContainer.classList.add("brandon-pdp__accordions--open");
              const labelEl = allDetailsBtn.querySelector("span:last-child");
              const iconEl = allDetailsBtn.querySelector(".js-pdp-plus-icon");
              if (labelEl) labelEl.textContent = "Hide Details";
              if (iconEl) iconEl.textContent = "-";
            }
          }
        } else {
          if (container) {
            container.classList.remove("has-colors-open");
            container.classList.add("has-details-open");
          }
        }
      });
    }

    if (closeDetailsBtn && container) {
      closeDetailsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        container.classList.remove("has-details-open");
      });
    }

    const tabBtns = section.querySelectorAll(".js-pdp-tab-btn");
    const tabPanels = section.querySelectorAll(".js-pdp-tab-panel");
    if (tabBtns.length > 0 && tabPanels.length > 0) {
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("data-tab");
          tabBtns.forEach((b) => b.classList.remove("is-active"));
          tabPanels.forEach((p) => p.classList.remove("is-active"));

          this.classList.add("is-active");
          const targetPanel = section.querySelector("#" + targetId);
          if (targetPanel) {
            targetPanel.classList.add("is-active");
          }
        });
      });
    }


    const swiperEl = section.querySelector(".js-pdp-swiper");
    if (swiperEl && typeof Swiper !== "undefined") {
      new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        navigation: {
          nextEl: ".js-pdp-next",
          prevEl: ".js-pdp-prev",
        },
        pagination: {
          el: ".js-pdp-dots",
          clickable: true,
          bulletClass: "brandon-pdp__dot",
          bulletActiveClass: "brandon-pdp__dot--active",
        },
      });
    }

    const pdpForm = section.querySelector("#BrandonPdpForm");
    const stickyAtc = section.querySelector(".js-pdp-sticky-atc");

    if (pdpForm && stickyAtc) {
      const stickyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              stickyAtc.classList.add("is-visible");
            } else {
              stickyAtc.classList.remove("is-visible");
            }
          });
        },
        { threshold: 0 }
      );

      stickyObserver.observe(pdpForm);

      const variantSelect = stickyAtc.querySelector(".js-sticky-variant-select");
      const hiddenInput = stickyAtc.querySelector(".js-sticky-variant-id");
      const stickyPrice = stickyAtc.querySelector(".js-sticky-price");
      const stickyStock = stickyAtc.querySelector(".js-sticky-stock");

      if (variantSelect && hiddenInput) {
        variantSelect.addEventListener("change", function () {
          const selectedOption = this.options[this.selectedIndex];
          hiddenInput.value = this.value;

          if (selectedOption) {
            const price = selectedOption.getAttribute("data-price");
            const inventory = parseInt(selectedOption.getAttribute("data-inventory") || "3", 10);

            if (price && stickyPrice) stickyPrice.textContent = price;
            if (stickyStock) {
              if (inventory > 0 && inventory <= 10) {
                stickyStock.textContent = `Only ${inventory} left`;
              } else {
                stickyStock.textContent = "Only 3 left";
              }
            }
          }
        });
      }
    }

    const openColorsBtns = section.querySelectorAll(".js-pdp-trigger-colors-modal");
    const closeColorsBtn = section.querySelector(".js-pdp-close-colors-panel");

    if (openColorsBtns.length > 0 && container) {
      openColorsBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          container.classList.remove("has-details-open");
          container.classList.add("has-colors-open");
        });
      });
    }

    if (closeColorsBtn && container) {
      closeColorsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        container.classList.remove("has-colors-open");
      });
    }

    const openPersonalizeBtns = section.querySelectorAll(".js-pdp-trigger-personalize");
    const closePersonalizeBtn = section.querySelector(".js-pdp-close-personalize-panel");

    if (openPersonalizeBtns.length > 0 && container) {
      openPersonalizeBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          container.classList.remove("has-details-open");
          container.classList.remove("has-colors-open");
          container.classList.add("has-personalize-open");
        });
      });
    }

    if (closePersonalizeBtn && container) {
      closePersonalizeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        container.classList.remove("has-personalize-open");
      });
    }

    const personalizeInput = section.querySelector(".js-personalize-input");
    const slot1 = section.querySelector(".js-personalize-slot-1");
    const slot2 = section.querySelector(".js-personalize-slot-2");
    const slot3 = section.querySelector(".js-personalize-slot-3");
    const propInput = section.querySelector(".js-personalize-property-input");

    if (personalizeInput) {
      const updateSlots = function () {
        const val = personalizeInput.value.toUpperCase();
        if (slot1) slot1.textContent = val[0] || (val.length === 0 ? "|" : "");
        if (slot2) slot2.textContent = val[1] || (val.length === 1 ? "|" : "");
        if (slot3) slot3.textContent = val[2] || (val.length === 2 ? "|" : "");
        if (propInput) propInput.value = val;
      };

      personalizeInput.addEventListener("input", updateSlots);
      updateSlots();
    }
// custom hover image functionality for gallery items
    const hoverCardEls = section.querySelectorAll("[data-hover-image]");
    if (hoverCardEls.length > 0) {
      hoverCardEls.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          const hoverImgSrc = this.getAttribute("data-hover-image");
          if (!hoverImgSrc) return;
          const firstGalleryImg = section.querySelector(".brandon-pdp__gallery-img");
          if (firstGalleryImg) {
            if (!firstGalleryImg.dataset.originalSrc) {
              firstGalleryImg.dataset.originalSrc = firstGalleryImg.src;
            }
            firstGalleryImg.src = hoverImgSrc;
          }
        });

        card.addEventListener("mouseleave", function () {
          const firstGalleryImg = section.querySelector(".brandon-pdp__gallery-img");
          if (firstGalleryImg && firstGalleryImg.dataset.originalSrc) {
            firstGalleryImg.src = firstGalleryImg.dataset.originalSrc;
          }
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPdp);
  } else {
    initPdp();
  }
})();
