function initBrandonCollectionSwatches() {
  // Mobile Scroll Indicator Handler
  const rowWrapper = document.querySelector(".brandon-collection-swatches__row-wrapper");
  if (rowWrapper) {
    const row = rowWrapper.querySelector(".brandon-collection-swatches__row");
    const indicator = rowWrapper.querySelector(".brandon-collection-swatches__line-indicator");

    if (row && indicator) {
      function updateScrollIndicator() {
        const scrollWidth = row.scrollWidth;
        const clientWidth = row.clientWidth;
        const maxScroll = scrollWidth - clientWidth;

        if (maxScroll <= 0) {
          indicator.style.width = "100%";
          indicator.style.left = "0%";
          return;
        }

        const indicatorWidthPercent = 19.4796;
        indicator.style.width = indicatorWidthPercent + "%";

        const scrollRatio = Math.max(0, Math.min(1, row.scrollLeft / maxScroll));
        const maxLeftPercent = 100 - indicatorWidthPercent;
        const currentLeftPercent = scrollRatio * maxLeftPercent;

        indicator.style.left = currentLeftPercent + "%";
      }

      row.addEventListener("scroll", updateScrollIndicator, { passive: true });
      window.addEventListener("resize", updateScrollIndicator);
      window.addEventListener("load", updateScrollIndicator);
      setTimeout(updateScrollIndicator, 100);
      setTimeout(updateScrollIndicator, 500);
      updateScrollIndicator();
    }
  }

  // Collection Swatches Item AJAX Click Handler
  const swatchItems = document.querySelectorAll(".brandon-collection-swatches__item");
  swatchItems.forEach(item => {
    item.addEventListener("click", function(e) {
      const url = this.getAttribute("href");
      if (!url || url === "#") return;

      const plpGridContainer = document.querySelector(".brandon-plp-grid-wrapper");
      if (!plpGridContainer) return;

      e.preventDefault();

      swatchItems.forEach(i => i.classList.remove("brandon-collection-swatches__item--active"));
      this.classList.add("brandon-collection-swatches__item--active");

      plpGridContainer.style.transition = "opacity 0.25s ease";
      plpGridContainer.style.opacity = "0.4";

      fetch(url)
        .then(res => res.text())
        .then(htmlText => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, "text/html");
          const newGrid = doc.querySelector(".brandon-plp-grid-wrapper");
          
          if (newGrid) {
            plpGridContainer.innerHTML = newGrid.innerHTML;
            window.history.pushState({}, "", url);
            if (typeof initBrandonPlpGrid === "function") {
              initBrandonPlpGrid();
            }
          } else {
            window.location.href = url;
          }
          plpGridContainer.style.opacity = "1";
        })
        .catch(err => {
          console.error("AJAX collection load error:", err);
          window.location.href = url;
        });
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBrandonCollectionSwatches);
} else {
  initBrandonCollectionSwatches();
}
