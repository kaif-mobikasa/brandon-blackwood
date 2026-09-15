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
    const card = section.querySelector('.brandon-countdown__card');
    const bgWrapper = section.querySelector('.brandon-countdown__bg-wrapper');
    const bgImg = section.querySelector('.brandon-countdown__bg-img');
    const productWrapper = section.querySelector('.brandon-countdown__product-wrapper');
    const subheading = section.querySelector('.brandon-countdown__subheading');
    const timerUnits = section.querySelectorAll('.brandon-countdown__timer-unit, .brandon-countdown__timer-colon');
    const button = section.querySelector('.brandon-countdown__btn-wrapper');

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1px)', () => {
      // Explicitly set initial GSAP hidden state for countdown elements
      if (bgWrapper) gsap.set(bgWrapper, { autoAlpha: 0 });
      if (card) gsap.set(card, { y: 140, autoAlpha: 0 });
      if (productWrapper) gsap.set(productWrapper, { scale: 0.75, y: 40, autoAlpha: 0 });
      if (subheading) gsap.set(subheading, { y: 25, autoAlpha: 0 });
      if (timerUnits.length > 0) gsap.set(timerUnits, { y: 30, autoAlpha: 0 });
      if (button) gsap.set(button, { y: 25, autoAlpha: 0 });

      // Parallax Scrub on Floral Background Image
      if (bgImg) {
        gsap.fromTo(bgImg,
          { scale: 1.15, yPercent: 0 },
          {
            scale: 1.0,
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      // Scroll-Driven Scrub Animation Timeline for Drop Countdown Card
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'top 20%',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      if (bgWrapper) {
        scrubTl.to(bgWrapper,
          { autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
          0
        );
      }

      if (card) {
        scrubTl.to(card,
          { y: 0, autoAlpha: 1, duration: 1.0, ease: 'power2.out' },
          0
        );
      }

      if (productWrapper) {
        scrubTl.to(productWrapper,
          { scale: 1.0, y: 0, autoAlpha: 1, duration: 1.1, ease: 'power2.out' },
          0.1
        );
      }

      if (subheading) {
        scrubTl.to(subheading,
          { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
          0.3
        );
      }

      if (timerUnits.length > 0) {
        scrubTl.to(timerUnits,
          { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.8, ease: 'power2.out' },
          0.4
        );
      }

      if (button) {
        scrubTl.to(button,
          { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
          0.6
        );
      }
    });

    // Realtime JS Countdown Engine
    const targetDateStr = section.dataset.targetDate || '2026-10-01T12:00:00';
    const daysEl = section.querySelector('.js-countdown-days');
    const hoursEl = section.querySelector('.js-countdown-hours');
    const minutesEl = section.querySelector('.js-countdown-minutes');
    const secondsEl = section.querySelector('.js-countdown-seconds');

    if (daysEl && hoursEl && minutesEl && secondsEl) {
      const targetTime = new Date(targetDateStr).getTime();
      const updateTimer = () => {
        const now = new Date().getTime();
        const diff = targetTime - now;

        if (isNaN(diff) || diff <= 0) {
          daysEl.textContent = '00';
          hoursEl.textContent = '00';
          minutesEl.textContent = '00';
          secondsEl.textContent = '00';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
      };

      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);

      section.addEventListener('shopify:section:unload', () => {
        clearInterval(timerInterval);
      });
    }
  }

  // Register section handlers
  registerWhenEngineReady('image-banner', initHeroAnimation);
  registerWhenEngineReady('hero', initHeroAnimation);
  registerWhenEngineReady('brandon-hero', initBrandonHeroAnimation);
  registerWhenEngineReady('brandon-countdown', initBrandonCountdownAnimation);
  registerWhenEngineReady('custom-announcement', () => {});
  registerWhenEngineReady('custom-header', () => {});
  registerWhenEngineReady('featured-collection', initProductGridAnimation);
  registerWhenEngineReady('product-grid', initProductGridAnimation);
  registerWhenEngineReady('image-with-text', initImageBannerAnimation);
})();


