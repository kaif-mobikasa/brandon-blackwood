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
    });

    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        swiper.slidePrev();
      });
    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        swiper.slideNext();
      });
    if (mobPrevBtn)
      mobPrevBtn.addEventListener("click", function () {
        swiper.slidePrev();
      });
    if (mobNextBtn)
      mobNextBtn.addEventListener("click", function () {
        swiper.slideNext();
      });
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
