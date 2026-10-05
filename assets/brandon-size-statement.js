function initBrandonSizeStatement(container) {
  if (!container || container.dataset.sizeStatementInitialized === "true")
    return;

  const swiperEl = container.querySelector(".js-size-statement-swiper");
  if (swiperEl && typeof Swiper !== "undefined") {
    container.dataset.sizeStatementInitialized = "true";

    const prevBtn = container.querySelector(".js-size-statement-prev");
    const nextBtn = container.querySelector(".js-size-statement-next");
    const mobPrevBtn = container.querySelector(
      ".js-size-statement-mobile-prev",
    );
    const mobNextBtn = container.querySelector(
      ".js-size-statement-mobile-next",
    );

    const swiper = new Swiper(swiperEl, {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: false,
      centeredSlides: false,
      watchSlidesProgress: true,
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
        init: function (s) {
          updateSlideScalesAndActiveDot(s);
        },
        slideChange: function (s) {
          updateSlideScalesAndActiveDot(s);
        },
        slideChangeTransitionStart: function (s) {
          updateSlideScalesAndActiveDot(s);
        },
        setTranslate: function (s) {
          updateSlideScalesAndActiveDot(s);
        },
        progress: function (s) {
          updateSlideScalesAndActiveDot(s);
        },
        resize: function (s) {
          updateSlideScalesAndActiveDot(s);
        },
        breakpoint: function (s) {
          updateSlideScalesAndActiveDot(s);
        },
      },
    });

    function getVisibleSlidesCount() {
      const w = window.innerWidth;
      if (w >= 1100) return 5;
      if (w >= 900) return 4;
      if (w >= 600) return 3;
      return 2;
    }

    function updateSlideScalesAndActiveDot(s) {
      const sw = s || swiper;
      if (!sw || !sw.slides || sw.slides.length === 0) return;

      const spv = getVisibleSlidesCount();
      const maxProgressIndex = Math.max(1, spv - 1);
      const SCALE_LEFT = 0.60;
      const SCALE_RIGHT = 1.0;
      const activeIdx = sw.activeIndex || 0;

      // Dynamic Left (Small 0.60) to Right (Large 1.00) scaling for each visible slide
      sw.slides.forEach((slide, idx) => {
        const img = slide.querySelector(".brandon-size-statement__img");
        if (img) {
          let relPos = idx - activeIdx;
          if (relPos < 0) relPos = 0;
          if (relPos > maxProgressIndex) relPos = maxProgressIndex;

          const normPos = relPos / maxProgressIndex;
          const scaleVal = SCALE_LEFT + normPos * (SCALE_RIGHT - SCALE_LEFT);

          img.style.transform = `scale(${scaleVal.toFixed(3)})`;
          img.style.transformOrigin = "bottom center";
        }

        // Reset active slide and active dot classes
        slide.classList.remove("brandon-size-statement__slide--active");
        const dot = slide.querySelector(".brandon-size-statement__dot");
        if (dot) {
          dot.classList.remove("brandon-size-statement__dot--active");
        }
      });

      // Highlight active center visible slide & timeline dot
      const centerOffset = Math.floor((spv - 1) / 2);
      let centerIdx = activeIdx + centerOffset;
      if (centerIdx >= sw.slides.length) {
        centerIdx = sw.slides.length - 1;
      }

      const centerSlide = sw.slides[centerIdx];
      if (centerSlide) {
        centerSlide.classList.add("brandon-size-statement__slide--active");
        const centerDot = centerSlide.querySelector(
          ".brandon-size-statement__dot",
        );
        if (centerDot) {
          centerDot.classList.add("brandon-size-statement__dot--active");
        }
      }
    }

    // Initial trigger
    setTimeout(function () {
      updateSlideScalesAndActiveDot(swiper);
    }, 50);
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
