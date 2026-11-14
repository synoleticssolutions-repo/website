/**
 * SYNOLETICS SOLUTIONS - SHARED UI COMPONENTS & INTERACTIVE CONTROLLER
 * Provides consistent Header/Navigation, Footer, Scroll Reveal, and Form Validation.
 */

(function () {
  "use strict";

  const CONFIG = window.SYNOLETICS_CONFIG || {};

  /**
   * 1. Sticky Header & Scroll Behavior
   */
  function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 18) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /**
   * 2. Mobile Navigation & Accessible Dropdowns
   */
  function initNavigation() {
    const toggleBtn = document.querySelector(".mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const dropdownItems = document.querySelectorAll(".has-dropdown");

    if (toggleBtn && mainNav) {
      toggleBtn.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
        toggleBtn.innerHTML = isOpen
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`;
      });

      // Close mobile menu on Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
          mainNav.classList.remove("is-open");
          toggleBtn.setAttribute("aria-expanded", "false");
          toggleBtn.focus();
        }
      });
    }

    // Mobile & keyboard dropdown toggle
    dropdownItems.forEach((item) => {
      const trigger = item.querySelector(".dropdown-trigger");
      if (!trigger) return;

      trigger.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const opened = item.classList.toggle("open");
          trigger.setAttribute("aria-expanded", String(opened));
        }
      });

      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (window.innerWidth <= 900) {
            e.preventDefault();
            const opened = item.classList.toggle("open");
            trigger.setAttribute("aria-expanded", String(opened));
          }
        }
      });
    });

    // Highlight active nav link based on current pathname
    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const cleanHref = href.replace(/^(\.\.\/)+/, "");
      if (
        (cleanHref === "index.html" && (currentPath.endsWith("/") || currentPath.endsWith("/index.html"))) ||
        (cleanHref !== "index.html" && currentPath.endsWith(cleanHref)) ||
        (cleanHref === "services.html" && currentPath.includes("/services/"))
      ) {
        link.classList.add("active");
      }
    });
  }

  /**
   * 3. Scroll-Triggered Reveal Animations (Respects prefers-reduced-motion)
   */
  function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /**
   * 4. Contact Form Sanitization, Validation & Submission Handler
   */
  function sanitizeInput(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/[<>]/g, "")
      .trim();
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    if (!phone) return true; // Phone is optional unless required attribute is set
    const re = /^[+\d\s\-()]{7,20}$/;
    return re.test(phone);
  }

  function initContactForm() {
    const form = document.getElementById("synoletics-contact-form");
    if (!form) return;

    const statusBox = document.getElementById("form-status-message");
    const submitBtn = form.querySelector('button[type="submit"]');

    const setFieldError = (input, message) => {
      const group = input.closest(".form-group");
      const errorEl = group ? group.querySelector(".field-error") : null;
      if (message) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        input.setAttribute("aria-invalid", "true");
        if (group) group.classList.add("has-error");
        if (errorEl) errorEl.textContent = message;
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        input.setAttribute("aria-invalid", "false");
        if (group) group.classList.remove("has-error");
        if (errorEl) errorEl.textContent = "";
      }
    };

    const validateSingleField = (input) => {
      const val = sanitizeInput(input.value);
      const name = input.name;

      if (input.hasAttribute("required") && !val) {
        setFieldError(input, "This field is required.");
        return false;
      }

      if (name === "email" && val && !validateEmail(val)) {
        setFieldError(input, "Please enter a valid work or personal email address.");
        return false;
      }

      if (name === "phone" && val && !validatePhone(val)) {
        setFieldError(input, "Please enter a valid phone number (7 to 20 digits).");
        return false;
      }

      if (name === "message" && val && val.length < 15) {
        setFieldError(input, "Please provide at least 15 characters describing your requirements.");
        return false;
      }

      setFieldError(input, "");
      return true;
    };

    // Real-time blur validation
    const inputs = form.querySelectorAll(".form-control");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateSingleField(input));
      input.addEventListener("input", () => {
        if (input.classList.contains("is-invalid")) {
          validateSingleField(input);
        }
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (statusBox) {
        statusBox.className = "form-status";
        statusBox.textContent = "";
      }

      // Check Honeypot anti-spam field
      const honeypot = form.querySelector('input[name="website_url_hp"]');
      if (honeypot && honeypot.value.trim() !== "") {
        // Silently reject bot submission
        if (statusBox) {
          statusBox.className = "form-status error";
          statusBox.textContent = "Spam protection triggered. Submission blocked.";
        }
        return;
      }

      // Check Human Verification Checkbox
      const humanCheck = form.querySelector('input[name="human_verify"]');
      if (humanCheck && !humanCheck.checked) {
        if (statusBox) {
          statusBox.className = "form-status error";
          statusBox.textContent = "Please confirm the anti-spam verification checkbox before submitting.";
        }
        return;
      }

      // Validate all fields
      let isFormValid = true;
      inputs.forEach((input) => {
        if (!validateSingleField(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        if (statusBox) {
          statusBox.className = "form-status error";
          statusBox.textContent = "Please correct the highlighted fields before submitting.";
        }
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Prepare sanitized payload
      const payload = {
        name: sanitizeInput(form.elements["name"].value),
        email: sanitizeInput(form.elements["email"].value),
        phone: sanitizeInput(form.elements["phone"].value),
        company: sanitizeInput(form.elements["company"].value),
        subject: sanitizeInput(form.elements["subject"].value),
        message: sanitizeInput(form.elements["message"].value),
        submittedAt: new Date().toISOString()
      };

      const endpoint =
        (CONFIG.integrations && CONFIG.integrations.contactFormEndpoint) ||
        "[DEFINE: API Endpoint / Backend Details]";

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Processing Inquiry...</span>`;

      try {
        // If endpoint is still the placeholder [DEFINE: ...], simulate clean integration response
        if (endpoint.startsWith("[DEFINE:")) {
          await new Promise((resolve) => setTimeout(resolve, 650));
          if (statusBox) {
            statusBox.className = "form-status success";
            statusBox.innerHTML = `<strong>Thank you, ${payload.name}!</strong> Your inquiry has been validated. <br><small>Note: Form backend endpoint is currently set to placeholder <code>${endpoint}</code> in <code>assets/js/config.js</code>. You can also reach us directly at <a href="mailto:info@synoleticssolutions.com">info@synoleticssolutions.com</a> or <a href="tel:+916282932146">+91-6282932146</a>.</small>`;
          }
          form.reset();
          inputs.forEach((i) => i.classList.remove("is-valid"));
        } else {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
          }

          if (statusBox) {
            statusBox.className = "form-status success";
            statusBox.innerHTML = `<strong>Thank you, ${payload.name}!</strong> Your message has been sent to Synoletics Solutions. Our consulting team will respond shortly.`;
          }
          form.reset();
          inputs.forEach((i) => i.classList.remove("is-valid"));
        }
      } catch (err) {
        if (statusBox) {
          statusBox.className = "form-status error";
          statusBox.innerHTML = `<strong>Unable to submit via API right now.</strong> Please email us directly at <a href="mailto:info@synoleticssolutions.com">info@synoleticssolutions.com</a> or call <a href="tel:+916282932146">+91-6282932146</a>.`;
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    });
  }

  /**
   * Initialize all modules on DOMContentLoaded
   */
  document.addEventListener("DOMContentLoaded", () => {
    initStickyHeader();
    initNavigation();
    initScrollReveal();
    initContactForm();
  });
})();

