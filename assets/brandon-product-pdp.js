(function () {
  "use strict";

  function initPdp() {
    const section = document.querySelector(".brandon-pdp-wrapper");
    if (!section) return;

    const allDetailsBtn = section.querySelector(".js-pdp-toggle-details");
    const accordionsContainer = section.querySelector(
      ".brandon-pdp__accordions",
    );
    const currentNumEl = section.querySelector(".js-pdp-current-num");
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

    if (galleryItems.length > 0 && currentNumEl) {
      const observerOptions = {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(galleryItems).indexOf(entry.target) + 1;
            const formattedIndex = index < 10 ? "0" + index : "" + index;
            currentNumEl.textContent = formattedIndex;
          }
        });
      }, observerOptions);

      galleryItems.forEach((item) => observer.observe(item));
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
        on: {
          slideChange: function () {
            if (currentNumEl) {
              const idx = this.activeIndex + 1;
              currentNumEl.textContent = idx < 10 ? "0" + idx : "" + idx;
            }
          },
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPdp);
  } else {
    initPdp();
  }
})();
