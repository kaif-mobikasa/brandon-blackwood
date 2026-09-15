/**
 * GSAP + ScrollTrigger Animation Architecture for Shopify Theme
 * Handles core setup, plugin registration, section animation lifecycle,
 * and Shopify Theme Editor events (load, unload, reorder, block select).
 */

(function () {
  'use strict';

  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined') {
    console.warn('[ShopifyAnimationEngine] GSAP is not loaded.');
    return;
  }

  // Register ScrollTrigger plugin once
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.warn('[ShopifyAnimationEngine] ScrollTrigger is not loaded.');
  }

  class AnimationEngine {
    constructor() {
      this.handlers = new Map(); // sectionType -> handler function
      this.activeContexts = new Map(); // sectionId -> gsap.context instance
      this.isInitialized = false;

      // Check prefers-reduced-motion
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        this.refreshAll();
      });

      this.init();
    }

    /**
     * Register an animation handler for a specific section type or selector.
     * @param {string} sectionType - Identifier for section (e.g., 'hero', 'product-grid', 'featured-collection')
     * @param {Function} handlerFn - Callback `(sectionElement, context) => void`
     */
    register(sectionType, handlerFn) {
      if (typeof handlerFn !== 'function') return;
      this.handlers.set(sectionType, handlerFn);

      // If page already initialized, auto-init newly registered section handlers
      if (this.isInitialized) {
        this.initSectionsByType(sectionType);
      }
    }

    /**
     * Identify section element type/identifier
     */
    getSectionType(sectionEl) {
      if (!sectionEl) return null;
      if (sectionEl.dataset.sectionType) return sectionEl.dataset.sectionType;
      
      // Fallback: check class names or section template attributes
      const classList = Array.from(sectionEl.classList || []);
      for (const [registeredType] of this.handlers) {
        if (classList.some(c => c.includes(registeredType)) || sectionEl.querySelector(`[data-section-type="${registeredType}"]`)) {
          return registeredType;
        }
      }

      // Check section ID substring match
      const sectionId = sectionEl.id || sectionEl.dataset.sectionId || '';
      for (const [registeredType] of this.handlers) {
        if (sectionId.toLowerCase().includes(registeredType.toLowerCase())) {
          return registeredType;
        }
      }

      return null;
    }

    /**
     * Get unique section ID for lifecycle context tracking
     */
    getSectionId(sectionEl) {
      if (!sectionEl) return null;
      return sectionEl.id || sectionEl.dataset.sectionId || `section-${Math.random().toString(36).substring(2, 9)}`;
    }

    /**
     * Initialize animation for a single section element
     */
    initSection(sectionEl) {
      if (!sectionEl || !(sectionEl instanceof HTMLElement)) return;

      const sectionId = this.getSectionId(sectionEl);

      // Unload existing animation context if present to prevent duplicates
      this.unloadSection(sectionEl);

      const sectionType = this.getSectionType(sectionEl);
      if (!sectionType) return;

      const handlerFn = this.handlers.get(sectionType);
      if (!handlerFn) return;

      // Do not run animations if user prefers reduced motion (unless handler handles it explicitly)
      if (this.prefersReducedMotion) {
        sectionEl.classList.add('gsap-reduced-motion');
        return;
      }

      // Create scoped GSAP context for this section
      const ctx = gsap.context(() => {
        handlerFn(sectionEl);
      }, sectionEl);

      this.activeContexts.set(sectionId, ctx);
    }

    /**
     * Safely destroy/revert GSAP context and ScrollTriggers for a section
     */
    unloadSection(sectionEl) {
      if (!sectionEl) return;
      const sectionId = this.getSectionId(sectionEl);
      const ctx = this.activeContexts.get(sectionId);

      if (ctx) {
        ctx.revert(); // Reverts all GSAP animations & kills associated ScrollTriggers
        this.activeContexts.delete(sectionId);
      }
    }

    /**
     * Initialize all sections matching a registered type
     */
    initSectionsByType(sectionType) {
      const selector = `[data-section-type="${sectionType}"], .shopify-section-${sectionType}, [id*="${sectionType}"]`;
      const sectionElements = document.querySelectorAll(selector);
      sectionElements.forEach((el) => {
        const sectionContainer = el.closest('.shopify-section') || el;
        this.initSection(sectionContainer);
      });
    }

    /**
     * Scan page and initialize all registered sections
     */
    initAllSections() {
      const sections = document.querySelectorAll('.shopify-section, [data-section-type]');
      sections.forEach((sectionEl) => {
        this.initSection(sectionEl);
      });

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }

    /**
     * Refresh all ScrollTriggers
     */
    refreshAll() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }

    /**
     * Bind Shopify Theme Editor lifecycle events & DOM Ready
     */
    init() {
      const onDomReady = () => {
        this.isInitialized = true;
        this.initAllSections();
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDomReady);
      } else {
        onDomReady();
      }

      // Shopify Theme Editor Lifecycle Events
      document.addEventListener('shopify:section:load', (event) => {
        const loadedSection = event.target;
        this.initSection(loadedSection);
        this.refreshAll();
      });

      document.addEventListener('shopify:section:unload', (event) => {
        const unloadedSection = event.target;
        this.unloadSection(unloadedSection);
        this.refreshAll();
      });

      document.addEventListener('shopify:section:reorder', () => {
        this.refreshAll();
      });

      document.addEventListener('shopify:block:select', (event) => {
        const blockEl = event.target;
        const sectionEl = blockEl.closest('.shopify-section') || blockEl;
        this.refreshAll();
      });

      document.addEventListener('shopify:block:deselect', () => {
        this.refreshAll();
      });
    }
  }

  // Create global instance
  window.ShopifyAnimationEngine = new AnimationEngine();

})();
