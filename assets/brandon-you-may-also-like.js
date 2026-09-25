function initBrandonAlsoLike(container) {
  if (!container || container.dataset.alsoLikeInitialized === "true") return;
  container.dataset.alsoLikeInitialized = "true";

  const swiperEl = container.querySelector(".js-also-like-swiper");
  if (!swiperEl) return;

  let swiperInst = null;

  function handleSwiper() {
    const isMobile = window.innerWidth <= 767;
    if (isMobile) {
      if (!swiperInst && typeof Swiper !== "undefined") {
        swiperInst = new Swiper(swiperEl, {
          slidesPerView: 2,
          spaceBetween: 0,
          freeMode: false
        });
      }
    } else {
      if (swiperInst) {
        swiperInst.destroy(true, true);
        swiperInst = null;
      }
    }
  }

  handleSwiper();
  window.addEventListener("resize", handleSwiper);
}

function initAllBrandonAlsoLikes() {
  document.querySelectorAll('[data-section-type="brandon-also-like"]').forEach(initBrandonAlsoLike);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllBrandonAlsoLikes);
} else {
  initAllBrandonAlsoLikes();
}

document.addEventListener("shopify:section:load", function (e) {
  if (e.target && e.target.getAttribute("data-section-type") === "brandon-also-like") {
    initBrandonAlsoLike(e.target);
  }
});
