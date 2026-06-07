(function () {
  const config = window.SITE_CONFIG || {};
  const services = window.FLOORING_SERVICES || [];

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value || "";
    });
  };

  const hydrateConfig = () => {
    setText("[data-company-name]", config.companyName);
    setText("[data-company-legal-name]", config.companyLegalName);
    setText("[data-company-id]", config.companyId);
    setText("[data-company-address]", [config.addressLine1, config.addressLine2].filter(Boolean).join(", "));
    setText("[data-phone-text]", config.phoneDisplay);
    setText("[data-email-text]", config.email);
    setText("[data-footer-text-primary]", config.footerTextPrimary);
    setText("[data-footer-text-secondary]", config.footerTextSecondary);
    setText("[data-disclaimer-short]", config.disclaimerShort);
    setText("[data-disclaimer-full]", config.disclaimerFull);
    setText("[data-year]", new Date().getFullYear());

    document.querySelectorAll("[data-phone-link]").forEach((link) => {
      link.href = `tel:${config.phone || ""}`;
    });
    document.querySelectorAll("[data-email-link]").forEach((link) => {
      link.href = `mailto:${config.email || ""}`;
    });
    document.querySelectorAll("[data-cta-primary]").forEach((node) => {
      node.textContent = config.ctaPrimary || "Get a Quote";
    });
  };

  const serviceUrl = (service) => `${service.slug}.html`;

  const serviceGroups = [
    {
      title: "Floor Installation",
      eyebrow: "Primary surfaces",
      summary: "Hardwood, vinyl, laminate, and carpet systems selected around traffic, comfort, moisture, and daily maintenance.",
      slugs: ["hardwood-floor-installation", "luxury-vinyl-plank-flooring", "laminate-floor-installation", "carpet-installation"]
    },
    {
      title: "Tile & Surface Systems",
      eyebrow: "Precision tile work",
      summary: "Porcelain, ceramic, and commercial flooring built around layout discipline, durability, cleaning routines, and finish quality.",
      slugs: ["porcelain-ceramic-tile-installation", "commercial-flooring"]
    },
    {
      title: "Repair, Prep & Finishing",
      eyebrow: "What makes it last",
      summary: "Subfloor correction, refinishing, stairs, trim, and transitions that protect the floor and make the project feel integrated.",
      slugs: ["hardwood-floor-refinishing", "subfloor-repair-leveling", "stair-trim-floor-finishing"]
    }
  ];

  const bySlug = (slug) => services.find((service) => service.slug === slug);

  const serviceCard = (service, index) => `
    <article class="service-card">
      <a href="${serviceUrl(service)}" class="service-card__image" aria-label="${service.title}">
        <img src="${service.image}" alt="${service.title}" loading="lazy">
        <span>${String(index + 1).padStart(2, "0")}</span>
      </a>
      <div class="service-card__body">
        <p class="eyebrow">${service.eyebrow}</p>
        <h3><a href="${serviceUrl(service)}">${service.title}</a></h3>
        <p>${service.short}</p>
        <a class="text-link" href="${serviceUrl(service)}">View service</a>
      </div>
    </article>`;

  const renderServices = () => {
    const grid = document.querySelector("[data-services-grid]");
    if (grid) grid.innerHTML = services.map(serviceCard).join("");

    const groupGrid = document.querySelector("[data-service-groups]");
    if (groupGrid) {
      const cards = serviceGroups.map((group, index) => {
        const groupServices = group.slugs.map(bySlug).filter(Boolean);
        const featured = groupServices[0];
        return `
          <article class="service-group-card">
            <div class="service-group-card__media">
              ${featured ? `<img src="${featured.image}" alt="${group.title}" loading="lazy">` : ""}
              <span>${String(index + 1).padStart(2, "0")}</span>
            </div>
            <div class="service-group-card__body">
              <p class="eyebrow">${group.eyebrow}</p>
              <h3>${group.title}</h3>
              <p>${group.summary}</p>
              <div class="service-group-links">
                ${groupServices.map((service) => `<a href="${serviceUrl(service)}">${service.title}</a>`).join("")}
              </div>
            </div>
          </article>`;
      }).join("");
      groupGrid.innerHTML = `
        <div class="service-groups__viewport">
          <div class="service-groups__track">
            ${cards}
          </div>
        </div>
        <div class="service-groups__controls" aria-label="Service group slideshow controls">
          <button class="service-groups__arrow service-groups__arrow--prev" type="button" data-service-groups-prev aria-label="Previous service group"></button>
          <div class="service-groups__dots">
            ${serviceGroups.map((group, index) => `<button type="button" data-service-groups-dot="${index}" aria-label="Show ${group.title}"></button>`).join("")}
          </div>
          <button class="service-groups__arrow service-groups__arrow--next" type="button" data-service-groups-next aria-label="Next service group"></button>
        </div>`;
    }

    const groupSections = document.querySelector("[data-service-group-sections]");
    if (groupSections) {
      groupSections.innerHTML = serviceGroups.map((group) => {
        const groupServices = group.slugs.map(bySlug).filter(Boolean);
        return `
          <section class="service-group-section">
            <div class="service-group-section__intro">
              <p class="eyebrow">${group.eyebrow}</p>
              <h2>${group.title}</h2>
              <p>${group.summary}</p>
            </div>
            <div class="services-grid services-grid--compact">
              ${groupServices.map(serviceCard).join("")}
            </div>
          </section>`;
      }).join("");
    }

    const nav = document.querySelector("[data-services-nav]");
    if (nav) {
      nav.innerHTML = services.map((service) => `<a href="${serviceUrl(service)}">${service.title}</a>`).join("");
    }
  };

  const renderServiceDetail = () => {
    const page = document.querySelector("[data-service-page]");
    if (!page) return;
    const slug = page.getAttribute("data-service-page");
    const service = services.find((item) => item.slug === slug);
    if (!service) return;

    document.title = `${service.title} | ${config.companyName || "Floens"}`;
    document.querySelectorAll("[data-service-title]").forEach((node) => node.textContent = service.title);
    document.querySelectorAll("[data-service-eyebrow]").forEach((node) => node.textContent = service.eyebrow);
    document.querySelectorAll("[data-service-short]").forEach((node) => node.textContent = service.short);
    document.querySelectorAll("[data-service-intro]").forEach((node) => node.textContent = service.intro);
    document.querySelectorAll("[data-service-image]").forEach((img) => {
      img.src = service.image;
      img.alt = service.title;
    });
    const list = (name, values) => {
      document.querySelectorAll(`[data-service-${name}]`).forEach((node) => {
        node.innerHTML = values.map((item) => `<li>${item}</li>`).join("");
      });
    };
    list("situations", service.situations);
    list("process", service.process);
    list("details", service.details);
    document.querySelectorAll("[data-service-faq]").forEach((node) => {
      node.innerHTML = service.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
    });

    const related = services.filter((item) => item.slug !== slug).slice(0, 3);
    document.querySelectorAll("[data-related-services]").forEach((node) => {
      node.innerHTML = related.map(serviceCard).join("");
    });
  };

  const mobileMenu = () => {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    if (!toggle || !menu) return;
    const close = () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      document.body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
    };
    const toggleMenu = () => document.body.classList.contains("menu-open") ? close() : open();
    toggle.addEventListener("click", toggleMenu);
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  };

  const stickyHeader = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
  };

  const serviceGroupCarousel = () => {
    const carousel = document.querySelector("[data-service-groups]");
    if (!carousel) return;
    const track = carousel.querySelector(".service-groups__track");
    const viewport = carousel.querySelector(".service-groups__viewport");
    const slides = Array.from(carousel.querySelectorAll(".service-group-card"));
    const dots = Array.from(carousel.querySelectorAll("[data-service-groups-dot]"));
    const prev = carousel.querySelector("[data-service-groups-prev]");
    const next = carousel.querySelector("[data-service-groups-next]");
    if (!track || !viewport || slides.length < 2) return;

    let index = 0;
    let timer = 0;
    const desktop = window.matchMedia("(min-width: 761px)");

    const update = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      track.style.transform = "";
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle("is-active", active);
        if (desktop.matches) {
          slide.style.opacity = active ? "1" : "0";
          slide.style.visibility = active ? "visible" : "hidden";
          slide.style.pointerEvents = active ? "auto" : "none";
        } else {
          slide.style.opacity = "";
          slide.style.visibility = "";
          slide.style.pointerEvents = "";
        }
        slide.toggleAttribute("aria-hidden", desktop.matches && !active);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
        dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
      });
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = 0;
    };
    const start = () => {
      stop();
      if (!desktop.matches) return;
      timer = window.setInterval(() => update(index + 1), 4200);
    };

    prev?.addEventListener("click", () => {
      update(index - 1);
      start();
    });
    next?.addEventListener("click", () => {
      update(index + 1);
      start();
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        update(Number(dot.getAttribute("data-service-groups-dot")) || 0);
        start();
      });
    });
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);
    desktop.addEventListener("change", () => {
      update(index);
      start();
    });

    update(0);
    start();
  };

  const revealOnScroll = () => {
    const nodes = document.querySelectorAll(".section, .trust-strip, .service-card, .service-group-section, .process-step, .feature, .contact-method, .form");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    nodes.forEach((node) => node.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach((node) => observer.observe(node));
  };

  hydrateConfig();
  renderServices();
  renderServiceDetail();
  serviceGroupCarousel();
  mobileMenu();
  stickyHeader();
  revealOnScroll();
})();
