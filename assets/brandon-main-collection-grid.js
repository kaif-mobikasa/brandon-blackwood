function initBrandonPlpGrid() {
  // View By column switcher
  const viewBtns = document.querySelectorAll(".js-view-btn");
  const gridList = document.querySelector(".js-plp-grid-list");

  if (viewBtns.length > 0) {
    viewBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        const cols = this.getAttribute("data-cols");
        
        const parentGroup = this.parentElement;
        if (parentGroup) {
          parentGroup.querySelectorAll(".js-view-btn").forEach(b => {
            if ((this.classList.contains("brandon-plp-grid__view-btn--mobile") && b.classList.contains("brandon-plp-grid__view-btn--mobile")) ||
                (this.classList.contains("brandon-plp-grid__view-btn--desktop") && b.classList.contains("brandon-plp-grid__view-btn--desktop"))) {
              b.classList.remove("brandon-plp-grid__view-btn--active");
            }
          });
        }
        this.classList.add("brandon-plp-grid__view-btn--active");
        
        if (gridList) {
          gridList.classList.remove(
            "brandon-plp-grid__list--col-1",
            "brandon-plp-grid__list--col-2",
            "brandon-plp-grid__list--col-3",
            "brandon-plp-grid__list--col-4",
            "brandon-plp-grid__list--col-6"
          );
          gridList.classList.add("brandon-plp-grid__list--col-" + cols);
        }
      });
    });
  }

  // Open / Close Filter Drawer
  const openFilterBtn = document.querySelector(".js-open-filter-drawer");
  const filterDrawer = document.querySelector(".js-plp-filter-drawer");
  const closeFilterEls = document.querySelectorAll(".js-close-filter-drawer");

  if (openFilterBtn && filterDrawer) {
    openFilterBtn.addEventListener("click", function() {
      filterDrawer.classList.add("brandon-plp-drawer--open");
    });
  }

  if (closeFilterEls && filterDrawer) {
    closeFilterEls.forEach(el => {
      el.addEventListener("click", function() {
        filterDrawer.classList.remove("brandon-plp-drawer--open");
      });
    });
  }

  // Handle Filter Form Submit Disable empty inputs before submitting
  const filterForm = document.getElementById("BrandonFacetFiltersForm");
  if (filterForm) {
    filterForm.addEventListener("submit", function() {
      const inputs = filterForm.querySelectorAll('input[type="number"]');
      inputs.forEach(input => {
        if (!input.value || input.value.trim() === "") {
          input.disabled = true;
        }
      });
    });
  }

  // Sort By Custom Radio Dropdown Handler
  const sortDropdown = document.querySelector(".js-sort-dropdown");
  const sortTrigger = document.querySelector(".js-sort-trigger");

  if (sortDropdown && sortTrigger) {
    sortTrigger.addEventListener("click", function(e) {
      e.stopPropagation();
      const isOpen = sortDropdown.classList.toggle("brandon-plp-grid__sort-dropdown--open");
      sortTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", function(e) {
      if (!sortDropdown.contains(e.target)) {
        sortDropdown.classList.remove("brandon-plp-grid__sort-dropdown--open");
        sortTrigger.setAttribute("aria-expanded", "false");
      }
    });

    document.querySelectorAll(".js-sort-radio").forEach(radio => {
      radio.addEventListener("change", function() {
        const value = this.value;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("sort_by", value);
        window.location.search = searchParams.toString();
      });
    });
  }

  // Close Toggle PLP Promo Overlay Card
  const closePromoBtn = document.querySelector(".js-close-promo-overlay");
  const promoOverlayCard = document.querySelector(".js-promo-overlay-card");
  if (closePromoBtn && promoOverlayCard) {
    closePromoBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      promoOverlayCard.classList.add("brandon-plp-promo__overlay-card--hidden");
    });
  }

  // Hotspot Click Listener to show/toggle card
  document.querySelectorAll(".js-promo-hotspot").forEach(hotspot => {
    hotspot.addEventListener("click", function() {
      if (promoOverlayCard) {
        promoOverlayCard.classList.remove("brandon-plp-promo__overlay-card--hidden");
      }
    });
  });

  // AJAX Add To Cart
  document.querySelectorAll(".js-ajax-add-to-cart").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const variantId = this.getAttribute("data-variant-id");
      if (!variantId) return;

      const parsedId = parseInt(variantId, 10);
      if (isNaN(parsedId)) return;

      const originalBtnText = this.textContent;
      this.disabled = true;

      const cartAddUrl = (window.Shopify && Shopify.routes && Shopify.routes.root) ? Shopify.routes.root + "cart/add.js" : "/cart/add.js";

      fetch(cartAddUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          id: parsedId,
          quantity: 1
        })
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(errData => {
            throw new Error(errData.description || errData.message || "Failed to add item to cart");
          });
        }
        return res.json();
      })
      .then(data => {
        window.location.href = "/cart";
      })
      .catch(err => {
        console.error("Add to cart error:", err);
        alert(err.message || "Could not add product to cart.");
        this.disabled = false;
        this.textContent = originalBtnText;
      });
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBrandonPlpGrid);
} else {
  initBrandonPlpGrid();
}
