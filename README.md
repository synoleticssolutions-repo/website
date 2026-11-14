# Synoletics Solutions — Corporate Website (`synoleticssolutions.com`)

**Tagline:** Build | Grow | Run Better  
**Industry:** IT and Non-IT Products & Services  
**Founded:** 2026 | **Headquarters:** Kochi, Kerala (Operating across Trivandrum, Kochi, Thrissur & Worldwide)

---

## 1. Overview & Architecture

This repository contains the complete, production-ready corporate website for **Synoletics Solutions**, built strictly with clean, semantic **HTML5, CSS3, and modular Vanilla JavaScript** (zero external framework bloat).

### Key Highlights
- **Brand-Aligned Visual Identity:** Palette extracted directly from the official interlocking `SS` emblem in `logo/logo.png` (`#0B2545` Deep Navy, `#1B6B93` Synoletics Teal Blue, `#00A8E8` Cyan Accent, and crisp `#FFFFFF` / `#F8FAFC` surfaces).
- **14 Complete Pages:** Includes Home, About Us, Services Overview, 6 dedicated Service Detail pages, Industries We Serve, Careers, Contact Us, Privacy Policy, and Terms & Conditions.
- **Technical SEO & Structured Data:** Unique titles, meta descriptions, canonical tags, Open Graph & X/Twitter Card metadata, JSON-LD `Organization` / `ProfessionalService` / `Service` schema, `sitemap.xml`, and `robots.txt`.
- **Accessibility & Performance:** Skip-to-content navigation, keyboard-accessible dropdowns, `prefers-reduced-motion` support, optimized transparent PNG brand marks (`logo/logo-mark.png`, `logo/logo-clean.png`, `logo/favicon.png`), and responsive layouts across desktop, tablet, and mobile.

---

## 2. Folder & File Structure

```text
synoletics-website/
├── index.html                                         # Home Page
├── about.html                                         # About Us Page
├── services.html                                      # Services & Solutions Overview Page
├── industries.html                                    # Industries & Segments We Serve (IT & Non-IT)
├── careers.html                                       # Careers Page
├── contact.html                                       # Contact Us Page (Validated Form + Map Placeholder)
├── privacy-policy.html                                # Privacy Policy Page
├── terms-and-conditions.html                          # Terms & Conditions Page
├── robots.txt                                         # Search Engine Crawler Directives
├── sitemap.xml                                        # XML Sitemap for all 14 URLs
├── README.md                                          # Documentation & Deployment Guide
├── logo/
│   ├── logo.png                                       # Original supplied logo file
│   ├── logo-mark.png                                  # Transparent cropped interlocking 'SS' emblem
│   ├── logo-clean.png                                 # Transparent full lockup with wordmark & tagline
│   └── favicon.png                                    # 64x64 favicon generated from the official logo
├── services/
│   ├── websites-and-ecommerce.html                    # Service 1 Detail (incl. Webettan Micro-ECOM SaaS)
│   ├── hosting-domains-and-ssl.html                   # Service 2 Detail
│   ├── servers-cloud-and-devops.html                  # Service 3 Detail
│   ├── business-plans-and-analysis.html               # Service 4 Detail
│   ├── processes-quality-and-audit-readiness.html     # Service 5 Detail
│   └── sops-checklists-and-training.html              # Service 6 Detail
└── assets/
    ├── css/
    │   └── styles.css                                 # Design System tokens, responsive grids & components
    └── js/
        ├── config.js                                  # Centralized company info, social links & API endpoints
        └── main.js                                    # Sticky header, mobile menu, scroll reveal & form validation
```

---

## 3. Installation & Local Development Instructions

Because the website is engineered with pure HTML, CSS, and JavaScript, **no build step or package manager installation is required**.

### Option A: Open Directly in Browser
Double-click `index.html` in your file explorer to preview all pages immediately.

### Option B: Run a Local Development Server
If you have Python, Node.js, or VS Code Live Server installed:

```bash
# Using Python 3
python -m http.server 8080

# Or using Node.js npx serve
npx serve . -l 8080
```
Then visit `http://localhost:8080` in your browser.

---

## 4. Production Build & Deployment Instructions

1. **Static Hosting (Netlify / Vercel / Cloudflare Pages / GitHub Pages):**
   - Connect the repository or upload the root folder directly.
   - **Build Command:** *(Leave empty — static HTML/CSS/JS)*
   - **Publish Directory:** `.` (root directory)
2. **Traditional Web Server (Nginx / Apache / cPanel):**
   - Upload all files and folders to your `public_html` or `/var/www/synoleticssolutions.com` directory.
   - Ensure HTTPS (SSL/TLS) is enabled and configure security headers (`Content-Security-Policy`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Strict-Transport-Security`).

---

## 5. List of Remaining Placeholders (`[DEFINE: ...]`)

All company-specific configuration is centralized in [`assets/js/config.js`](assets/js/config.js) and clearly marked in the HTML where official verified data should be substituted prior to launch:

| Placeholder Marker | Location(s) | Purpose |
| :--- | :--- | :--- |
| `[DEFINE: Years of Experience]` | `index.html`, `assets/js/config.js` | Verified corporate years of experience metric |
| `[DEFINE: Projects Completed]` | `index.html`, `assets/js/config.js` | Verified completed projects counter |
| `[DEFINE: Clients Served]` | `index.html`, `assets/js/config.js` | Verified total clients served counter |
| `[DEFINE: Countries Served]` | `index.html`, `assets/js/config.js` | Verified countries served counter |
| `[DEFINE: API Endpoint / Backend Details]` | `contact.html`, `assets/js/config.js` | Production REST API / form handler endpoint URL |
| `[DEFINE: Privacy Policy Content]` | `privacy-policy.html` | Final legal-approved privacy policy clauses |
| `[DEFINE: Terms Content]` | `terms-and-conditions.html` | Final legal-approved terms & conditions clauses |
| `[DEFINE: Career Requirements]` | `careers.html` | Specific active job descriptions and qualifications |
| `[DEFINE: Leadership Profile ...]` | `about.html` | Named executive bios and headshots |
| `[DEFINE: Corporate Certifications ...]` | `about.html` | Official ISO/corporate registration numbers |
| Social Media URLs (`https://synoleticssolutions.com/`) | `assets/js/config.js`, Footer & Contact | Update with final LinkedIn, Facebook, Instagram, X, and YouTube profile handles |
| `[Placeholder Testimonial ...]` | `index.html` | Replace sample client quotes with verified customer testimonials |

---

## 6. Pending Integrations & Credentials

1. **Contact Form Backend API (`assets/js/config.js`):**
   - Update `window.SYNOLETICS_CONFIG.integrations.contactFormEndpoint` (or inject `window.__ENV__.CONTACT_API_ENDPOINT`) with your backend mail handler, CRM webhook, or form service endpoint.
   - Do **not** hardcode private SMTP credentials or secret API keys in frontend JavaScript.
2. **Anti-Spam / CAPTCHA Service (`contact.html`):**
   - The form currently includes a hidden honeypot field (`website_url_hp`) and a human verification checkbox placeholder. Connect server-side rate limiting or a server-verified anti-spam token when wiring your backend endpoint.
3. **Google Maps Embed (`contact.html`):**
   - Replace the `[Google Maps Integration Placeholder]` card in `contact.html` with your official Google Maps `<iframe>` embed for the Kochi headquarters address.

