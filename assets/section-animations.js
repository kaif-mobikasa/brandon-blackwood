/**
 * Modular Section Animations for Shopify Theme
 * Register individual section animations with ShopifyAnimationEngine
 */

(function () {
  "use strict";

  // Helper: wait for ShopifyAnimationEngine to be ready if loaded asynchronously
  function registerWhenEngineReady(sectionType, handlerFn) {
    if (window.ShopifyAnimationEngine) {
      window.ShopifyAnimationEngine.register(sectionType, handlerFn);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        if (window.ShopifyAnimationEngine) {
          window.ShopifyAnimationEngine.register(sectionType, handlerFn);
        }
      });
    }
  }

  // ==========================================
  // 1. HERO BANNER ANIMATION
  // ==========================================
  function initHeroAnimation(section) {
    const heading = section.querySelector(".banner__heading, .hero__title, h1");
    const text = section.querySelector(".banner__text, .hero__subtitle, p");
    const buttons = section.querySelectorAll(
      ".banner__buttons, .button, .hero__cta",
    );
    const bgImage = section.querySelector(".banner__media img, .hero__bg");

    const mm = gsap.matchMedia();

    // Desktop & Tablet Animation
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline();

      if (bgImage) {
        gsap.to(bgImage, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (heading) {
        tl.from(heading, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (text) {
        tl.from(
          text,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
      }

      if (buttons.length > 0) {
        tl.from(
          buttons,
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }
    });

    // Mobile Animation
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline();

      if (heading) {
        tl.from(heading, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      if (text) {
        tl.from(
          text,
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }

      if (buttons.length > 0) {
        tl.from(
          buttons,
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
    });
  }

  // ==========================================
  // 2. PRODUCT GRID & FEATURED COLLECTION
  // ==========================================
  function initProductGridAnimation(section) {
    const heading = section.querySelector(".title, .section-heading, h2");
    const cards = section.querySelectorAll(
      ".product-card, .card-wrapper, .grid__item",
    );

    if (heading) {
      gsap.from(heading, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (cards.length > 0) {
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".grid, .product-grid") || section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Hover scale micro-interaction setup
      cards.forEach((card) => {
        const image = card.querySelector("img, .media img");
        if (image) {
          card.addEventListener("mouseenter", () => {
            gsap.to(image, { scale: 1.05, duration: 0.4, ease: "power2.out" });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(image, { scale: 1, duration: 0.4, ease: "power2.out" });
          });
        }
      });
    }
  }

  // ==========================================
  // 3. IMAGE WITH TEXT / BANNER PARALLAX
  // ==========================================
  function initImageBannerAnimation(section) {
    const imageContainer = section.querySelector(
      ".image-with-text__media, .banner__media",
    );
    const image = section.querySelector("img");
    const content = section.querySelector(
      ".image-with-text__content, .banner__content",
    );

    if (imageContainer && image) {
      gsap.fromTo(
        image,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: imageContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }

    if (content) {
      const children = content.children;
      gsap.from(children, {
        y: 45,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }

  // ==========================================
  // 4. MULTICOLUMN & TESTIMONIALS ANIMATION
  // ==========================================
  function initMulticolumnAnimation(section) {
    const columns = section.querySelectorAll(
      ".multicolumn-card, .column, .testimonial-card",
    );

    if (columns.length > 0) {
      gsap.from(columns, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }

  // ==========================================
  // 5. BRANDON BLACKWOOD HERO BANNER ANIMATION
  // ==========================================
  function initBrandonHeroAnimation(section) {
    const loader = section.querySelector(".brandon-hero__loader");
    const loaderTop = section.querySelector(".brandon-hero__loader-panel--top");
    const loaderBottom = section.querySelector(
      ".brandon-hero__loader-panel--bottom",
    );
    const bannerImg = section.querySelector(".brandon-hero__image");
    const zoomedPic = section.querySelector(".brandon-hero__picture--zoomed");
    const scrollArrow = section.querySelector(".brandon-hero__scroll-arrow");
    const brandTitle = document.querySelector(
      ".custom-header__brand-title, .brandon-hero__brand-title",
    );
    const icons = document.querySelectorAll(
      ".custom-header__menu-btn, .custom-header__icon-btn, .brandon-hero__menu-btn, .brandon-hero__icon-btn",
    );
    const title = section.querySelector(".brandon-hero__title");
    const subheading = section.querySelector(".brandon-hero__subheading");
    const button = section.querySelector(".brandon-hero__btn");
    const announcement = document.querySelector(
      ".custom-announcement-bar, .brandon-hero__announcement",
    );

    const duration = parseFloat(section.dataset.loadingDuration) || 1.8;
    const delay = parseFloat(section.dataset.loadingDelay) || 0.3;
    const zoomScale = parseFloat(section.dataset.zoomScale) || 1.3;

    // Master Timeline for synchronized sequence
    const masterTl = gsap.timeline();

    // 1. Split Screen Loading Curtain Animation
    if (loader && loaderTop && loaderBottom) {
      gsap.set(loader, { display: "block" });
      gsap.set(loaderTop, { yPercent: 0 });
      gsap.set(loaderBottom, { yPercent: 0 });

      masterTl
        .to(
          loaderTop,
          {
            yPercent: -100,
            duration: duration,
            ease: "power3.inOut",
          },
          delay,
        )
        .to(
          loaderBottom,
          {
            yPercent: 100,
            duration: duration,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(loader, { display: "none" });
              if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.refresh();
              }
            },
          },
          delay,
        );
    }

    // 2. Announcement Bar slides down from top
    if (announcement) {
      const annTime = loader ? delay + duration - 0.4 : 0.1;
      masterTl.fromTo(
        announcement,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        annTime,
      );
    }

    // 3. Brand Header (Title & Icons) slides down from top
    if (brandTitle || icons.length > 0) {
      const headerTime = loader ? delay + duration - 0.3 : 0.2;
      const headerElements = [brandTitle, ...Array.from(icons)].filter(Boolean);
      masterTl.fromTo(
        headerElements,
        { y: -35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        headerTime,
      );
    }

    // 4. Hero Glass Card & Content ONLY shows when user SCROLLS DOWN
    const targetCard =
      section.querySelector(".brandon-hero__glass-card") ||
      section.querySelector(".brandon-hero__text-box");

    if (targetCard) {
      gsap.set(targetCard, {
        y: 80,
        autoAlpha: 0,
        opacity: 0,
        pointerEvents: "none",
      });

      if (bannerImg) {
        gsap.set(bannerImg, { scale: 1.0, transformOrigin: "center center" });
      }

      if (zoomedPic) {
        gsap.set(zoomedPic, {
          opacity: 0,
          scale: 1.0,
          transformOrigin: "center center",
        });
      }

      if (scrollArrow) {
        gsap.set(scrollArrow, {
          autoAlpha: 0,
          opacity: 0,
          pointerEvents: "none",
        });
      }

      let isRevealed = false;

      const revealCard = () => {
        if (isRevealed) return;
        isRevealed = true;

        gsap.to(targetCard, {
          y: 0,
          opacity: 1,
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: 0.8,
          ease: "power3.out",
        });

        if (bannerImg) {
          gsap.to(bannerImg, {
            scale: zoomScale,
            duration: 1.1,
            ease: "power3.out",
          });
        }

        if (zoomedPic) {
          gsap.to(zoomedPic, {
            opacity: 1,
            scale: 1.05,
            duration: 1.1,
            ease: "power3.out",
          });
        }

        if (scrollArrow) {
          gsap.to(scrollArrow, {
            y: 0,
            opacity: 1,
            autoAlpha: 1,
            pointerEvents: "auto",
            duration: 0.5,
            ease: "power2.out",
          });
        }
      };

      const hideCard = () => {
        if (!isRevealed) return;
        isRevealed = false;

        gsap.to(targetCard, {
          y: 80,
          opacity: 0,
          autoAlpha: 0,
          pointerEvents: "none",
          duration: 0.5,
          ease: "power3.in",
        });

        if (bannerImg) {
          gsap.to(bannerImg, {
            scale: 1.0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (zoomedPic) {
          gsap.to(zoomedPic, {
            opacity: 0,
            scale: 1.0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (scrollArrow) {
          gsap.to(scrollArrow, {
            opacity: 0,
            autoAlpha: 0,
            pointerEvents: "none",
            duration: 0.3,
          });
        }
      };

      // Listen for Scroll & Wheel & Touch Events
      const handleScrollCheck = () => {
        if (window.scrollY > 5) {
          revealCard();
        } else {
          hideCard();
        }
      };

      window.addEventListener("scroll", handleScrollCheck, { passive: true });

      window.addEventListener(
        "wheel",
        (e) => {
          if (e.deltaY > 2) {
            revealCard();
          } else if (e.deltaY < -2 && window.scrollY <= 10) {
            hideCard();
          }
        },
        { passive: true },
      );

      let touchStartY = 0;
      window.addEventListener(
        "touchstart",
        (e) => {
          if (e.touches && e.touches[0]) {
            touchStartY = e.touches[0].clientY;
          }
        },
        { passive: true },
      );

      window.addEventListener(
        "touchmove",
        (e) => {
          if (e.touches && e.touches[0]) {
            const touchEndY = e.touches[0].clientY;
            if (touchStartY - touchEndY > 5) {
              revealCard();
            } else if (touchEndY - touchStartY > 5 && window.scrollY <= 10) {
              hideCard();
            }
          }
        },
        { passive: true },
      );

      // ScrollTrigger Integration
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.create({
          trigger: section,
          start: "top top-=10",
          onEnter: revealCard,
          onLeaveBack: hideCard,
          onUpdate: (self) => {
            if (self.scroll() > 5) {
              revealCard();
            } else {
              hideCard();
            }
          },
        });
      }

      // Initial check to sync state with scroll position
      handleScrollCheck();
    }

    // Click handler for Scroll Arrow Indicator
    if (scrollArrow) {
      scrollArrow.addEventListener("click", () => {
        const nextSection =
          section.closest(".shopify-section")?.nextElementSibling ||
          window.innerHeight;
        if (nextSection && typeof nextSection === "object") {
          nextSection.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: "smooth",
          });
        }
      });
    }

    // 5. Responsive Parallax Scroll on Hero Image & Glass Card
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (bannerImg) {
        gsap.to(bannerImg, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (targetCard) {
        gsap.to(targetCard, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }

  // ==========================================
  // 6. BRANDON DROP COUNTDOWN BANNER ANIMATION
  // ==========================================
  function initBrandonCountdownAnimation(section) {
    const card = section.querySelector(".brandon-countdown__card");
    const bgWrapper = section.querySelector(".brandon-countdown__bg-wrapper");
    const bgImg = section.querySelector(".brandon-countdown__bg-img");
    const productWrapper = section.querySelector(
      ".brandon-countdown__product-wrapper",
    );
    const subheading = section.querySelector(".brandon-countdown__subheading");
    const timerUnits = section.querySelectorAll(
      ".brandon-countdown__timer-unit, .brandon-countdown__timer-colon",
    );
    const button = section.querySelector(".brandon-countdown__btn-wrapper");

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
      // Explicitly set initial GSAP hidden state for countdown elements
      if (bgWrapper) gsap.set(bgWrapper, { autoAlpha: 0 });
      if (card) gsap.set(card, { y: 140, autoAlpha: 0 });
      if (productWrapper)
        gsap.set(productWrapper, { scale: 0.75, y: 40, autoAlpha: 0 });
      if (subheading) gsap.set(subheading, { y: 25, autoAlpha: 0 });
      if (timerUnits.length > 0) gsap.set(timerUnits, { y: 30, autoAlpha: 0 });
      if (button) gsap.set(button, { y: 25, autoAlpha: 0 });

      // Parallax Scrub on Floral Background Image
      if (bgImg) {
        gsap.fromTo(
          bgImg,
          { scale: 1.15, yPercent: 0 },
          {
            scale: 1.0,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      // Scroll-Driven Scrub Animation Timeline for Drop Countdown Card
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          end: "top 20%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (bgWrapper) {
        scrubTl.to(
          bgWrapper,
          { autoAlpha: 1, duration: 0.8, ease: "power2.out" },
          0,
        );
      }

      if (card) {
        scrubTl.to(
          card,
          { y: 0, autoAlpha: 1, duration: 1.0, ease: "power2.out" },
          0,
        );
      }

      if (productWrapper) {
        scrubTl.to(
          productWrapper,
          { scale: 1.0, y: 0, autoAlpha: 1, duration: 1.1, ease: "power2.out" },
          0.1,
        );
      }

      if (subheading) {
        scrubTl.to(
          subheading,
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
          0.3,
        );
      }

      if (timerUnits.length > 0) {
        scrubTl.to(
          timerUnits,
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2.out",
          },
          0.4,
        );
      }

      if (button) {
        scrubTl.to(
          button,
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
          0.6,
        );
      }
    });

    // Realtime JS Countdown Engine
    const targetDateStr = section.dataset.targetDate || "2026-10-01T12:00:00";
    const daysEl = section.querySelector(".js-countdown-days");
    const hoursEl = section.querySelector(".js-countdown-hours");
    const minutesEl = section.querySelector(".js-countdown-minutes");
    const secondsEl = section.querySelector(".js-countdown-seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
      const targetTime = new Date(targetDateStr).getTime();
      const updateTimer = () => {
        const now = new Date().getTime();
        const diff = targetTime - now;

        if (isNaN(diff) || diff <= 0) {
          daysEl.textContent = "00";
          hoursEl.textContent = "00";
          minutesEl.textContent = "00";
          secondsEl.textContent = "00";
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? "0" + days : days;
        hoursEl.textContent = hours < 10 ? "0" + hours : hours;
        minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
      };

      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);

      section.addEventListener("shopify:section:unload", () => {
        clearInterval(timerInterval);
      });
    }
  }

  // ==========================================
  // 5. BRANDON FEATURED PRODUCTS ANIMATION & SWIPER
  // ==========================================
  function initBrandonFeaturedProductsAnimation(section) {
    const sectionContainer =
      section.querySelector(".brandon-featured-products") || section;
    const swiperEl = sectionContainer.querySelector(
      ".brandon-featured-products__swiper",
    );
    const prevBtn = sectionContainer.querySelector(".js-fp-prev");
    const nextBtn = sectionContainer.querySelector(".js-fp-next");
    const titleBadgeText = sectionContainer.querySelector(
      ".js-active-product-title",
    );

    // Initialize Swiper Carousel
    const initSwiper = () => {
      if (typeof Swiper === "undefined") {
        setTimeout(initSwiper, 100);
        return;
      }

      if (!swiperEl) return;

      const swiper = new Swiper(swiperEl, {
        slidesPerView: 1.25,
        centeredSlides: true,
        spaceBetween: 15,
        loop: true,
        speed: 600,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        breakpoints: {
          640: {
            slidesPerView: 1.8,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 2.8,
            spaceBetween: 35,
          },
          1400: {
            slidesPerView: 3.2,
            spaceBetween: 45,
          },
        },
        on: {
          init: function () {
            updateActiveBadge(this);
            updateMobilePaginationLines(this);
            if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
          },
          slideChange: function () {
            updateActiveBadge(this);
            updateMobilePaginationLines(this);
          },
        },
      });

      function updateMobilePaginationLines(swiperInst) {
        const pagLines = sectionContainer.querySelectorAll(
          ".brandon-featured-products__pag-line",
        );
        if (!pagLines || pagLines.length === 0) return;

        const totalLines = pagLines.length;
        const activeIdx =
          (swiperInst.realIndex !== undefined ? swiperInst.realIndex : 0) %
          totalLines;

        pagLines.forEach((line, index) => {
          if (index === activeIdx) {
            line.classList.add("brandon-featured-products__pag-line--active");
          } else {
            line.classList.remove(
              "brandon-featured-products__pag-line--active",
            );
          }
        });
      }

      // Allow clicking mobile pagination lines to jump to corresponding slide
      const pagLines = sectionContainer.querySelectorAll(
        ".brandon-featured-products__pag-line",
      );
      pagLines.forEach((line, index) => {
        line.style.cursor = "pointer";
        line.addEventListener("click", () => {
          if (swiper.slideToLoop) {
            swiper.slideToLoop(index);
          } else {
            swiper.slideTo(index);
          }
        });
      });

      function updateActiveBadge(swiperInst) {
        if (!titleBadgeText) return;
        const activeSlide = swiperInst.slides[swiperInst.activeIndex];
        if (activeSlide) {
          const title = activeSlide.getAttribute("data-title");
          if (title) {
            if (titleBadgeText.textContent !== title) {
              gsap.to(titleBadgeText, {
                opacity: 0,
                y: -4,
                duration: 0.15,
                onComplete: () => {
                  titleBadgeText.textContent = title;
                  gsap.to(titleBadgeText, { opacity: 1, y: 0, duration: 0.25 });
                },
              });
            } else {
              titleBadgeText.textContent = title;
            }
          }
        }
      }
    };

    initSwiper();

    // GSAP ScrollTrigger Entrance Sequence
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      const emblem = sectionContainer.querySelector(".js-fp-emblem");
      const heading = sectionContainer.querySelector(".js-fp-heading");
      const titleBadge = sectionContainer.querySelector(".js-fp-title-badge");
      const swiperContainer = sectionContainer.querySelector(".js-fp-swiper");

      if (emblem) gsap.set(emblem, { y: 50, scale: 0.85, autoAlpha: 0 });
      if (heading) gsap.set(heading, { y: 30, autoAlpha: 0 });
      if (titleBadge) gsap.set(titleBadge, { y: 30, autoAlpha: 0 });
      if (swiperContainer)
        gsap.set(swiperContainer, { y: 60, scale: 0.92, autoAlpha: 0 });

      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionContainer,
          start: "top 90%",
          end: "top 25%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (emblem) {
        scrubTl.to(
          emblem,
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.7, ease: "power2.out" },
          0,
        );
      }
      if (heading) {
        scrubTl.to(
          heading,
          { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
          0.1,
        );
      }
      if (titleBadge) {
        scrubTl.to(
          titleBadge,
          { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
          0.2,
        );
      }
      if (swiperContainer) {
        scrubTl.to(
          swiperContainer,
          { y: 0, scale: 1, autoAlpha: 1, duration: 1.0, ease: "power2.out" },
          0.15,
        );
      }
    }
  }

  // ==========================================
  // 6. BRANDON FEATURED COLLECTIONS ANIMATION
  // ==========================================
  function initBrandonFeaturedCollectionsAnimation(section) {
    const sectionContainer =
      section.querySelector(".brandon-featured-collections") || section;
    const innerContainer = sectionContainer.querySelector(
      ".brandon-featured-collections__container"
    );
    const gridContainer = sectionContainer.querySelector(".js-fc-grid");
    const cards = sectionContainer.querySelectorAll(".js-fc-card");
    const indicators = sectionContainer.querySelector(".js-fc-indicators");

    if (!cards.length) return;

    const mm = gsap.matchMedia();

    // Desktop Animation: Single Centered Card expanding into 4-Column Grid (No JS Pinning/Height)
    mm.add("(min-width: 768px)", () => {
      const totalCards = cards.length;
      const centerIndex = totalCards - 1; // 4th card (index 3) is center card
      let isExpanded = false;

      const setupInitialState = () => {
        if (!gridContainer || !cards.length) return;

        // Reset transforms temporarily to measure natural CSS layout centers
        gsap.set(cards, { x: 0, xPercent: 0 });

        const gridRect = gridContainer.getBoundingClientRect();
        const gridCenter = gridRect.left + gridRect.width / 2;

        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const offsetPx = gridCenter - cardCenter;

          if (index !== centerIndex) {
            gsap.set(card, {
              x: offsetPx,
              autoAlpha: 0,
              scale: 0.85,
              pointerEvents: "none",
            });
          } else {
            gsap.set(card, {
              x: offsetPx,
              scale: 1.05,
              autoAlpha: 1,
              pointerEvents: "auto",
              cursor: "pointer",
            });
          }
        });

        if (indicators) {
          gsap.set(indicators, { autoAlpha: 1, y: 0, cursor: "pointer" });
        }
      };

      setupInitialState();

      const expandTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionContainer,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            setupInitialState();
          },
          onUpdate: (self) => {
            if (self.progress >= 0.95) {
              isExpanded = true;
            } else if (self.progress < 0.1) {
              isExpanded = false;
            }
          },
        },
      });

      cards.forEach((card) => {
        expandTl.to(
          card,
          {
            x: 0,
            xPercent: 0,
            scale: 1,
            autoAlpha: 1,
            pointerEvents: "auto",
            duration: 1.2,
            ease: "power2.out",
          },
          0
        );
      });

      if (indicators) {
        expandTl.to(
          indicators,
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.in",
          },
          0.2
        );
      }

      const handleExpand = (e) => {
        if (!isExpanded) {
          e.preventDefault();
          isExpanded = true;
          gsap.to(expandTl, {
            progress: 1,
            duration: 1.0,
            ease: "power2.out",
          });
        }
      };

      if (cards[centerIndex]) {
        cards[centerIndex].addEventListener("click", handleExpand);
      }
      if (indicators) {
        indicators.addEventListener("click", handleExpand);
      }

      let resizeDebounce;
      const handleResize = () => {
        clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(() => {
          if (!isExpanded) {
            setupInitialState();
          }
        }, 100);
      };
      window.addEventListener("resize", handleResize);
      window.addEventListener("load", handleResize);

      return () => {
        if (cards[centerIndex]) {
          cards[centerIndex].removeEventListener("click", handleExpand);
        }
        if (indicators) {
          indicators.removeEventListener("click", handleExpand);
        }
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("load", handleResize);
      };
    });

    // Mobile Responsive Carousel & Active Indicator Tracking
    mm.add("(max-width: 767px)", () => {
      const elementsToClear = [
        sectionContainer,
        innerContainer,
        gridContainer,
        indicators,
        ...Array.from(cards),
      ].filter(Boolean);

      gsap.set(elementsToClear, { clearProps: "all" });

      if (indicators) {
        gsap.set(indicators, { autoAlpha: 1, y: 0 });
      }

      const indLines = indicators
        ? indicators.querySelectorAll(".brandon-featured-collections__ind-line")
        : [];

      const handleScroll = () => {
        if (!gridContainer || !indLines.length) return;
        const scrollLeft = gridContainer.scrollLeft;
        const cardWidth = gridContainer.firstElementChild
          ? gridContainer.firstElementChild.offsetWidth + 16
          : 300;
        const activeIndex = Math.min(
          indLines.length - 1,
          Math.max(0, Math.round(scrollLeft / cardWidth))
        );

        indLines.forEach((line, i) => {
          if (i === activeIndex) {
            line.classList.add("brandon-featured-collections__ind-line--active");
          } else {
            line.classList.remove("brandon-featured-collections__ind-line--active");
          }
        });
      };

      if (gridContainer) {
        gridContainer.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
      }

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }

      return () => {
        if (gridContainer) {
          gridContainer.removeEventListener("scroll", handleScroll);
        }
      };
    });
  }

  // Register section handlers
  registerWhenEngineReady("image-banner", initHeroAnimation);
  registerWhenEngineReady("hero", initHeroAnimation);
  registerWhenEngineReady("brandon-hero", initBrandonHeroAnimation);
  registerWhenEngineReady("brandon-countdown", initBrandonCountdownAnimation);
  registerWhenEngineReady(
    "brandon-featured-products",
    initBrandonFeaturedProductsAnimation,
  );
  registerWhenEngineReady(
    "brandon-featured-collections",
    initBrandonFeaturedCollectionsAnimation,
  );
  registerWhenEngineReady("brandon-categories", () => {});
  registerWhenEngineReady("brandon-founder", () => {});
  registerWhenEngineReady("custom-announcement", () => {});
  registerWhenEngineReady("custom-header", () => {});
  registerWhenEngineReady("featured-collection", initProductGridAnimation);
  registerWhenEngineReady("product-grid", initProductGridAnimation);
  registerWhenEngineReady("image-with-text", initImageBannerAnimation);
})();
