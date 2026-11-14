/**
 * SYNOLETICS SOLUTIONS - CENTRALIZED CONFIGURATION
 * Keep all company-specific details, social URLs, and integration endpoints in one place.
 * Sensitive keys or API endpoints can be injected via runtime environment configuration.
 */

window.SYNOLETICS_CONFIG = Object.freeze({
  company: {
    name: "Synoletics Solutions",
    tagline: "Build | Grow | Run Better",
    foundedYear: 2026,
    industry: "IT and Non IT",
    headquarters: "Kochi",
    operatingRegions: ["Trivandrum", "Kochi", "Thrissur"],
    email: "info@synoleticssolutions.com",
    phone: "+91-6282932146",
    phoneHref: "tel:+916282932146",
    address: "Test street, test postbox, test. Pin: 676776",
    domain: "synoleticssolutions.com",
    siteUrl: "https://synoleticssolutions.com/"
  },
  social: {
    linkedin: "https://synoleticssolutions.com/",
    facebook: "https://synoleticssolutions.com/",
    instagram: "https://synoleticssolutions.com/",
    x: "https://synoleticssolutions.com/",
    youtube: "https://synoleticssolutions.com/"
  },
  statistics: {
    yearsOfExperience: "[DEFINE: Years of Experience]",
    projectsCompleted: "[DEFINE: Projects Completed]",
    clientsServed: "[DEFINE: Clients Served]",
    countriesServed: "[DEFINE: Countries Served]"
  },
  integrations: {
    // Do not hardcode live production secrets in frontend code.
    // Replace with your backend API endpoint or inject via window.__ENV__.CONTACT_API_ENDPOINT
    contactFormEndpoint:
      (window.__ENV__ && window.__ENV__.CONTACT_API_ENDPOINT) ||
      "[DEFINE: API Endpoint / Backend Details]"
  }
});

