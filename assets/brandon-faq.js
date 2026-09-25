function initBrandonFAQ(container) {
  if (!container || container.dataset.faqInitialized === "true") return;
  container.dataset.faqInitialized = "true";

  const triggers = container.querySelectorAll(".js-faq-trigger");
  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      const item = this.closest(".brandon-faq__item");
      if (!item) return;
      const content = item.querySelector(".js-faq-content");
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        this.setAttribute("aria-expanded", "false");
        item.classList.remove("is-active");
        if (content) content.style.display = "none";
      } else {
        this.setAttribute("aria-expanded", "true");
        item.classList.add("is-active");
        if (content) content.style.display = "block";
      }
    });
  });
}

function initAllBrandonFAQs() {
  document.querySelectorAll('[data-section-type="brandon-faq"]').forEach(initBrandonFAQ);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllBrandonFAQs);
} else {
  initAllBrandonFAQs();
}

document.addEventListener("shopify:section:load", function (e) {
  if (e.target && e.target.getAttribute("data-section-type") === "brandon-faq") {
    initBrandonFAQ(e.target);
  }
});
