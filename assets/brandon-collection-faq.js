function initBrandonCollectionFAQ(container) {
  if (!container || container.dataset.faqInitialized === "true") return;
  container.dataset.faqInitialized = "true";

  const items = container.querySelectorAll(".js-faq-item");

  items.forEach((item) => {
    const summary = item.querySelector(".js-faq-summary");
    const answer = item.querySelector(".js-faq-answer");

    if (!summary || !answer) return;

    summary.addEventListener("click", function (e) {
      // Prevent default instantly closing so we can animate smoothly
      e.preventDefault();

      const isOpen = item.hasAttribute("open");

      if (isOpen) {
        // Closing animation
        const startHeight = answer.offsetHeight;
        answer.style.height = startHeight + "px";
        answer.style.transition = "height 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
        
        requestAnimationFrame(() => {
          answer.style.height = "0px";
        });

        const onTransitionEnd = function () {
          answer.removeEventListener("transitionend", onTransitionEnd);
          item.removeAttribute("open");
          answer.style.height = "";
          answer.style.transition = "";
        };
        answer.addEventListener("transitionend", onTransitionEnd);

      } else {
        // Open the target item
        item.setAttribute("open", "true");
        const endHeight = answer.scrollHeight;
        
        answer.style.height = "0px";
        answer.style.transition = "height 0.3s cubic-bezier(0.25, 1, 0.5, 1)";

        requestAnimationFrame(() => {
          answer.style.height = endHeight + "px";
        });

        const onTransitionEnd = function () {
          answer.removeEventListener("transitionend", onTransitionEnd);
          answer.style.height = "";
          answer.style.transition = "";
        };
        answer.addEventListener("transitionend", onTransitionEnd);
      }
    });
  });
}

function initAllBrandonCollectionFAQs() {
  document
    .querySelectorAll('[data-section-type="brandon-collection-faq"]')
    .forEach(initBrandonCollectionFAQ);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllBrandonCollectionFAQs);
} else {
  initAllBrandonCollectionFAQs();
}

document.addEventListener("shopify:section:load", function (e) {
  if (
    e.target &&
    e.target.getAttribute("data-section-type") === "brandon-collection-faq"
  ) {
    initBrandonCollectionFAQ(e.target);
  }
});
