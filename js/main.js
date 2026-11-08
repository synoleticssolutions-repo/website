/* ==========================================================================
   SYNOLETICS SOLUTIONS — Main Interactive Script
   ========================================================================== */

const SYNOLETICS_CONFIG = {
  // Update your official WhatsApp number here (country code + number, no '+' or spaces)
  whatsappNumber: '919876543210',
  defaultWhatsappMessage:
    'Hello Synoletics Solutions! I visited your website and would like to discuss a project / IT & analytics requirement.',
  companyEmail: 'synoleticssolutions@gmail.com',
};

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. Sticky Header & Scroll Spy
     -------------------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --------------------------------------------------------------------------
     2. Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  const mobileBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Portfolio / Solutions Filter Tabs
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  if (filterBtns.length && caseCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        caseCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. FAQ Accordion
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    btn.addEventListener('click', () => {
      const currentlyActive = item.classList.contains('active');

      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherAns = other.querySelector('.faq-answer');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!currentlyActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Floating WhatsApp Widget & Direct Links
     -------------------------------------------------------------------------- */
  const buildWhatsAppUrl = (text) => {
    const msg = encodeURIComponent(text || SYNOLETICS_CONFIG.defaultWhatsappMessage);
    return `https://wa.me/${SYNOLETICS_CONFIG.whatsappNumber}?text=${msg}`;
  };

  // Wire up any direct WhatsApp link with [data-wa-link]
  document.querySelectorAll('[data-wa-link]').forEach((el) => {
    const customMsg = el.getAttribute('data-wa-msg');
    el.setAttribute('href', buildWhatsAppUrl(customMsg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  const waFab = document.getElementById('waFabBtn');
  const waCard = document.getElementById('waChatCard');
  const waClose = document.getElementById('waCloseBtn');
  const waInput = document.getElementById('waQuickInput');
  const waSend = document.getElementById('waSendBtn');

  if (waFab && waCard) {
    waFab.addEventListener('click', () => {
      waCard.classList.toggle('open');
      if (waCard.classList.contains('open') && waInput) {
        setTimeout(() => waInput.focus(), 150);
      }
    });
  }

  if (waClose && waCard) {
    waClose.addEventListener('click', () => {
      waCard.classList.remove('open');
    });
  }

  const launchQuickWhatsApp = () => {
    const userText = waInput && waInput.value.trim()
      ? waInput.value.trim()
      : SYNOLETICS_CONFIG.defaultWhatsappMessage;
    window.open(buildWhatsAppUrl(userText), '_blank', 'noopener,noreferrer');
  };

  if (waSend) {
    waSend.addEventListener('click', launchQuickWhatsApp);
  }

  if (waInput) {
    waInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        launchQuickWhatsApp();
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. Contact Form Submission & "Send via WhatsApp" Option
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('synoleticsContactForm');
  const formFeedback = document.getElementById('formFeedback');
  const sendWaFormBtn = document.getElementById('sendViaWhatsappBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || 'Visitor';
      const service = formData.get('service') || 'General Inquiry';

      if (formFeedback) {
        formFeedback.textContent = `Thank you, ${name}! Your inquiry regarding "${service}" has been recorded. Our solutions team at ${SYNOLETICS_CONFIG.companyEmail} will respond within 24 business hours.`;
        formFeedback.classList.add('visible');
      }
      contactForm.reset();
    });
  }

  if (sendWaFormBtn && contactForm) {
    sendWaFormBtn.addEventListener('click', () => {
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const company = formData.get('company') || '';
      const service = formData.get('service') || 'IT & Data Solutions';
      const message = formData.get('message') || '';

      const compiled = [
        `Hello Synoletics Solutions,`,
        name ? `Name: ${name}` : '',
        company ? `Company: ${company}` : '',
        email ? `Email: ${email}` : '',
        `Service Interest: ${service}`,
        message ? `Details: ${message}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      window.open(buildWhatsAppUrl(compiled), '_blank', 'noopener,noreferrer');
    });
  }
});

