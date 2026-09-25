function initBrandonUncommonMaterials(container) {
  if (!container || container.dataset.uncommonMaterialsInitialized === "true") return;

  const swiperEl = container.querySelector(".js-uncommon-materials-swiper");
  const dotsEl = container.querySelector(".js-uncommon-materials-dots-desktop");

  if (swiperEl && typeof Swiper !== "undefined") {
    container.dataset.uncommonMaterialsInitialized = "true";

    new Swiper(swiperEl, {
      slidesPerView: 1.35,
      spaceBetween: 3,
      loop: false,
      grabCursor: true,
      allowTouchMove: true,
      pagination: dotsEl ? {
        el: dotsEl,
        clickable: true,
        bulletClass: "brandon-uncommon-materials__dot",
        bulletActiveClass: "brandon-uncommon-materials__dot--active"
      } : false,
      breakpoints: {
        769: {
          slidesPerView: "auto",
          spaceBetween: 10,
          grabCursor: true,
          allowTouchMove: true
        }
      }
    });
  }
}

function initAllBrandonUncommonMaterials() {
  document.querySelectorAll('[data-section-type="brandon-uncommon-materials"]').forEach(initBrandonUncommonMaterials);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllBrandonUncommonMaterials);
} else {
  initAllBrandonUncommonMaterials();
}

document.addEventListener("shopify:section:load", function (e) {
  if (e.target && e.target.getAttribute("data-section-type") === "brandon-uncommon-materials") {
    initBrandonUncommonMaterials(e.target);
  }
});
