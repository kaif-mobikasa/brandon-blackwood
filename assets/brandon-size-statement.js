function initBrandonSizeStatement(container) {
  if (!container || container.dataset.sizeStatementInitialized === "true")
    return;

  const swiperEl = container.querySelector(".js-size-statement-swiper");
  if (swiperEl && typeof Swiper !== "undefined") {
    container.dataset.sizeStatementInitialized = "true";

    const prevBtn = container.querySelector(".js-size-statement-prev");
    const nextBtn = container.querySelector(".js-size-statement-next");
    const mobPrevBtn = container.querySelector(
      ".js-size-statement-mobile-prev"
    );
    const mobNextBtn = container.querySelector(
      ".js-size-statement-mobile-next"
    );

    const swiper = new Swiper(swiperEl, {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: false,
      centeredSlides: false,
      navigation: {
        prevEl: [prevBtn, mobPrevBtn].filter(Boolean),
        nextEl: [nextBtn, mobNextBtn].filter(Boolean),
      },
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 28,
        },
        1100: {
          slidesPerView: 5,
          spaceBetween: 18,
        },
      },
      on: {
        init: updateActiveCenterDot,
        slideChange: updateActiveCenterDot,
        resize: updateActiveCenterDot,
        breakpoint: updateActiveCenterDot,
      },
    });

    function updateActiveCenterDot(s) {
      const sw = s || swiper;
      if (!sw || !sw.slides || sw.slides.length === 0) return;

      sw.slides.forEach((slide) => {
        slide.classList.remove("brandon-size-statement__slide--active");
        const dot = slide.querySelector(".brandon-size-statement__dot");
        if (dot) {
          dot.classList.remove("brandon-size-statement__dot--active");
        }
      });

      let spv = sw.params.slidesPerView;
      if (typeof spv !== "number" || isNaN(spv)) {
        spv = 1;
      }
      const centerOffset = Math.floor(spv / 2);
      let activeIdx = sw.activeIndex;

      let centerIdx = activeIdx + centerOffset;
      if (centerIdx >= sw.slides.length) {
        centerIdx = sw.slides.length - 1;
      }

      const centerSlide = sw.slides[centerIdx];
      if (centerSlide) {
        centerSlide.classList.add("brandon-size-statement__slide--active");
        const centerDot = centerSlide.querySelector(
          ".brandon-size-statement__dot"
        );
        if (centerDot) {
          centerDot.classList.add("brandon-size-statement__dot--active");
        }
      }
    }

    updateActiveCenterDot(swiper);
  }
}

function initAllBrandonSizeStatements() {
  document
    .querySelectorAll('[data-section-type="brandon-size-statement"]')
    .forEach(initBrandonSizeStatement);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllBrandonSizeStatements);
} else {
  initAllBrandonSizeStatements();
}

document.addEventListener("shopify:section:load", function (e) {
  if (
    e.target &&
    e.target.getAttribute("data-section-type") === "brandon-size-statement"
  ) {
    initBrandonSizeStatement(e.target);
  }
});
