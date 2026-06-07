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
    setText("[data-footer-disclaimer]", config.footerDisclaimer);
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
  const serviceHeroImage = (service) => `/img/generated/service-heroes/${service.slug}-hero.webp`;

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
  const groupId = (group) => group.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const serviceIcon = (service) => {
    const iconMap = {
      "hardwood-floor-installation": "trees",
      "luxury-vinyl-plank-flooring": "droplets",
      "porcelain-ceramic-tile-installation": "grid-3x3",
      "laminate-floor-installation": "layers-3",
      "hardwood-floor-refinishing": "sparkles",
      "carpet-installation": "waves",
      "subfloor-repair-leveling": "ruler",
      "commercial-flooring": "building-2",
      "stair-trim-floor-finishing": "corner-down-right"
    };
    return iconMap[service.slug] || "square-stack";
  };
  const serviceEnhancements = {
    "hardwood-floor-installation": {
      included: [
        "We review room use, subfloor condition, moisture risk, plank width, installation method, and transitions before layout begins.",
        "Existing flooring can be removed, the substrate is checked for flatness, and low or high areas are corrected where needed.",
        "Boards are planned around sightlines, doorways, expansion space, and adjacent rooms so the finished floor feels continuous.",
        "Final trim, reducers, thresholds, and care guidance are coordinated so the new hardwood is ready for daily use."
      ],
      materials: [
        "Solid hardwood: a long-life option for dry living areas where future sanding and refinishing are priorities.",
        "Engineered hardwood: a more dimensionally stable wood floor for many remodels, wider planks, and some kitchen or slab conditions.",
        "Prefinished hardwood: factory-applied finish, faster installation, and less site odor or finish cure time.",
        "Site-finished hardwood: more control over stain, sheen, and blending into existing wood floors."
      ]
    },
    "luxury-vinyl-plank-flooring": {
      included: [
        "We confirm wear layer, waterproof rating, locking or glue-down method, underlayment needs, and manufacturer flatness tolerance.",
        "The subfloor is cleaned, patched, leveled, or skimmed so bumps and seams do not telegraph through the planks.",
        "Plank layout is mapped to avoid narrow wall cuts, repeated patterns, and awkward transitions at doors or stairs.",
        "Edges, expansion gaps, reducers, and trim are finished so the floor looks clean and performs as a complete system."
      ],
      materials: [
        "Click-lock LVP: common for homes, faster to install, and useful when a floating floor is appropriate.",
        "Glue-down LVP: strong for commercial areas, rolling loads, and spaces where a thinner profile helps transitions.",
        "Rigid core vinyl: stable feel underfoot, often used over minor imperfections when allowed by the product.",
        "Waterproof vinyl plank: useful for kitchens, basements, laundry rooms, and pet-heavy spaces when edges are detailed correctly."
      ]
    },
    "porcelain-ceramic-tile-installation": {
      included: [
        "We inspect the substrate, deflection risk, flatness, waterproofing needs, tile size, grout joint, and movement-joint requirements.",
        "Layout is planned around focal lines, doorways, drains, cabinetry, walls, and visible cut balance before tile is set.",
        "Tile is installed with appropriate mortar coverage, spacing, leveling systems where useful, and clean grout work.",
        "Edges, thresholds, profiles, sealant joints, and cleaning guidance are completed so the floor is durable and easy to maintain."
      ],
      materials: [
        "Porcelain tile: dense, durable, and a strong choice for kitchens, bathrooms, entries, and high-traffic rooms.",
        "Ceramic tile: versatile and cost-controlled for many residential spaces with moderate traffic.",
        "Large-format tile: fewer grout lines and a calmer look, but requires excellent flatness and careful leveling.",
        "Mosaic or patterned tile: useful for decorative accents, small rooms, and areas where layout detail matters."
      ]
    },
    "laminate-floor-installation": {
      included: [
        "We review AC rating, water-resistance claims, plank thickness, attached pad, separate underlayment, and room suitability.",
        "The substrate is checked for flatness and squeaks because laminate depends on a stable, even surface underneath.",
        "Rows are planned to control plank repeats, expansion gaps, doorway cuts, and transitions into adjoining rooms.",
        "Base shoe, reducers, thresholds, and care notes are finished so the floor stays clean-looking and practical."
      ],
      materials: [
        "Standard laminate: budget-friendly wood-look flooring for bedrooms, offices, and living areas.",
        "Water-resistant laminate: better for busy homes, but still needs careful edges and realistic moisture expectations.",
        "Thicker laminate planks: often feel more solid underfoot and can improve sound when paired with the right underlayment.",
        "Attached-pad laminate: simplifies installation, though separate acoustic underlayment may still be better in some spaces."
      ]
    },
    "hardwood-floor-refinishing": {
      included: [
        "We assess wood thickness, previous sanding, damaged boards, stains, gaps, finish failure, and whether refinishing is still viable.",
        "Rooms are protected, dust is managed, and sanding is performed in controlled passes for an even surface.",
        "Stain samples, natural finish options, and sheen levels are reviewed before the final finish system is applied.",
        "Cure timing, furniture return, rug timing, and cleaning guidance are explained so the new finish can harden properly."
      ],
      materials: [
        "Water-based finish: lower ambering, faster dry times, and a clean modern look.",
        "Oil-based finish: warmer tone and traditional depth, with longer odor and cure considerations.",
        "Matte or satin sheen: hides daily wear better than high gloss in many homes.",
        "Stain colors: natural, medium brown, dark brown, gray-wash, or custom blending depending on wood species."
      ]
    },
    "carpet-installation": {
      included: [
        "We review room use, fiber type, pile style, pad density, seam placement, stairs, thresholds, and traffic direction.",
        "Old carpet and pad can be removed, tack strips checked, subfloor concerns identified, and transitions prepared.",
        "Carpet is stretched, seamed, trimmed, and fitted so it stays smooth instead of wrinkling or pulling at edges.",
        "Stair details, doorway metals, vacuuming, and care guidance are reviewed before the space is turned back over."
      ],
      materials: [
        "Nylon carpet: durable for stairs, bedrooms, family rooms, and higher-traffic areas.",
        "Polyester carpet: soft feel and good color options, often used in lower to moderate traffic rooms.",
        "Wool carpet: premium natural fiber with comfort and warmth, but higher cost and care requirements.",
        "Carpet pad: density and thickness matter for comfort, sound control, and long-term carpet performance."
      ]
    },
    "subfloor-repair-leveling": {
      included: [
        "We inspect plywood or concrete for movement, dips, humps, squeaks, cracks, moisture, rot, and product flatness requirements.",
        "Loose areas can be fastened, damaged sections repaired, high spots reduced, and low areas patched or leveled.",
        "Primers, patch compounds, self-leveling products, panels, or crack treatments are selected around the finish floor.",
        "The final substrate is checked before flooring begins so the visible surface is not asked to hide structural problems."
      ],
      materials: [
        "Self-leveling underlayment: used to correct low areas when the substrate and conditions allow it.",
        "Patch and skim compounds: useful for seams, small dips, surface defects, and transition corrections.",
        "Plywood or underlayment panels: used when wood subfloors need reinforcement or a cleaner installation surface.",
        "Concrete crack treatment and grinding: helps prepare slabs for tile, vinyl, laminate, or commercial flooring."
      ]
    },
    "commercial-flooring": {
      included: [
        "We review traffic level, cleaning routines, business downtime, access, rolling loads, slip resistance, and tenant requirements.",
        "Existing surfaces and concrete conditions are checked so the product can be installed within manufacturer tolerances.",
        "Installation can be phased around occupied spaces, after-hours work, or priority zones when the scope allows.",
        "Transitions, base, punch-list items, maintenance expectations, and replacement strategy are planned with the floor."
      ],
      materials: [
        "Commercial LVP: durable, cleanable, and useful for offices, retail suites, corridors, and rental properties.",
        "Carpet tile: practical for offices because damaged tiles can often be replaced individually.",
        "Porcelain tile: strong for entries, restrooms, and high-cleaning areas with heavy traffic.",
        "Sheet vinyl or glue-down resilient flooring: useful where cleanability, budget, and downtime matter."
      ]
    },
    "stair-trim-floor-finishing": {
      included: [
        "We map stairs, landings, thresholds, reducers, base shoe, doorways, and places where flooring changes thickness.",
        "Profiles are selected to protect edges, reduce trip points, and visually connect different rooms or materials.",
        "Treads, risers, nosing, end caps, quarter round, and trim returns are cut and fitted for clean sightlines.",
        "Color matching, stain, paint, caulk lines, and final detail review are coordinated with the flooring scope."
      ],
      materials: [
        "Hardwood stair treads and nosing: used when stairs should match or coordinate with wood flooring.",
        "LVP stair components: useful for vinyl plank projects when matching stair noses and landings are available.",
        "Reducers, T-molds, thresholds, and end caps: used where rooms, doorway heights, or materials change.",
        "Base shoe and quarter round: used to finish expansion gaps and make floor edges look built-in."
      ]
    }
  };

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
      const tabs = serviceGroups.map((group, index) => `
        <button class="service-directory__tab${index === 0 ? " is-active" : ""}" type="button" data-directory-tab="${groupId(group)}" aria-controls="${groupId(group)}" aria-selected="${index === 0 ? "true" : "false"}">
          <strong>${group.title}</strong>
          <small>${group.eyebrow}</small>
        </button>`).join("");
      const panels = serviceGroups.map((group, index) => {
        const groupServices = group.slugs.map(bySlug).filter(Boolean);
        const featured = groupServices[0];
        return `
          <section class="service-directory__panel${index === 0 ? " is-active" : ""}" id="${groupId(group)}" data-directory-panel="${groupId(group)}" ${index === 0 ? "" : "hidden"}>
            <div class="service-directory__media">
              ${featured ? `<img src="${featured.image}" alt="${group.title}" loading="lazy">` : ""}
            </div>
            <div class="service-directory__content">
              <p class="eyebrow">${group.eyebrow}</p>
              <h2>${group.title}</h2>
              <p>${group.summary}</p>
              <div class="service-directory__links">
                ${groupServices.map((service) => `
                  <a href="${serviceUrl(service)}">
                    <i data-lucide="${serviceIcon(service)}" aria-hidden="true"></i>
                    <span><strong>${service.title}</strong><small>${service.eyebrow}</small></span>
                  </a>`).join("")}
              </div>
            </div>
          </section>`;
      }).join("");
      groupSections.innerHTML = `
        <div class="service-directory" data-service-directory>
          <aside class="service-directory__nav" aria-label="Service groups">
            ${tabs}
          </aside>
          <div class="service-directory__stage">
            ${panels}
          </div>
        </div>`;
    }

    const nav = document.querySelector("[data-services-nav]");
    if (nav) {
      nav.innerHTML = serviceGroups.map((group) => `<a href="services.html#${groupId(group)}">${group.title}</a>`).join("");
    }

    document.querySelectorAll("[data-services-dropdown]").forEach((dropdown) => {
      const icons = ["layers", "layout-grid", "hammer"];
      dropdown.innerHTML = serviceGroups.map((group, index) => `
        <div class="nav-dropdown__item">
          <a class="nav-dropdown__group" href="services.html#${groupId(group)}">
            <i data-lucide="${icons[index] || "square-stack"}" aria-hidden="true"></i>
            <span><strong>${group.title}</strong><small>${group.eyebrow}</small></span>
          </a>
          <div class="nav-dropdown__submenu" aria-label="${group.title} services">
            ${group.slugs.map(bySlug).filter(Boolean).map((service) => `
              <a href="${serviceUrl(service)}">
                <i data-lucide="${serviceIcon(service)}" aria-hidden="true"></i>
                <span>${service.title}</span>
              </a>`).join("")}
          </div>
        </div>`).join("");
    });
  };

  const renderServiceDetail = () => {
    const page = document.querySelector("[data-service-page]");
    if (!page) return;
    const slug = page.getAttribute("data-service-page");
    const service = services.find((item) => item.slug === slug);
    if (!service) return;
    const enhanced = serviceEnhancements[service.slug] || {
      included: service.details || [],
      materials: service.details || []
    };

    document.title = `${service.title} | ${config.companyName || "Floens"}`;
    document.querySelectorAll("[data-service-title]").forEach((node) => node.textContent = service.title);
    document.querySelectorAll("[data-service-eyebrow]").forEach((node) => node.textContent = service.eyebrow);
    document.querySelectorAll("[data-service-short]").forEach((node) => node.textContent = service.short);
    document.querySelectorAll("[data-service-intro]").forEach((node) => node.textContent = service.intro);
    document.querySelectorAll(".service-hero, .service-detail-cta").forEach((node) => {
      node.style.setProperty("--service-hero-image", `url("${serviceHeroImage(service)}")`);
    });
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
    list("included", enhanced.included);
    list("materials", enhanced.materials);
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

  const cookieBanner = () => {
    const storageKey = "floens_cookie_consent";
    if (window.localStorage?.getItem(storageKey)) return;

    const banner = document.createElement("section");
    banner.className = "cookie-banner";
    banner.setAttribute("aria-label", "Cookie notice");
    banner.innerHTML = `
      <div class="cookie-banner__copy">
        <strong>Cookie preferences</strong>
        <p>We use essential cookies to keep the site working and may use analytics or marketing cookies to understand visits and improve flooring service inquiries.</p>
      </div>
      <div class="cookie-banner__actions">
        <a class="cookie-banner__link" href="cookie-policy.html">Cookie Policy</a>
        <button class="cookie-banner__btn cookie-banner__btn--ghost" type="button" data-cookie-choice="declined">Decline</button>
        <button class="cookie-banner__btn" type="button" data-cookie-choice="accepted">Accept</button>
      </div>`;

    const close = (choice) => {
      window.localStorage?.setItem(storageKey, JSON.stringify({
        choice,
        date: new Date().toISOString()
      }));
      banner.classList.remove("is-visible");
      window.setTimeout(() => banner.remove(), 260);
    };

    banner.querySelectorAll("[data-cookie-choice]").forEach((button) => {
      button.addEventListener("click", () => close(button.getAttribute("data-cookie-choice")));
    });

    document.body.appendChild(banner);
    window.requestAnimationFrame(() => banner.classList.add("is-visible"));
  };

  const renderIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
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

  const serviceDirectory = () => {
    document.querySelectorAll("[data-service-directory]").forEach((directory) => {
      const tabs = Array.from(directory.querySelectorAll("[data-directory-tab]"));
      const panels = Array.from(directory.querySelectorAll("[data-directory-panel]"));
      if (!tabs.length || !panels.length) return;

      const setActive = (id) => {
        tabs.forEach((tab) => {
          const active = tab.getAttribute("data-directory-tab") === id;
          tab.classList.toggle("is-active", active);
          tab.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach((panel) => {
          const active = panel.getAttribute("data-directory-panel") === id;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
      };

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const id = tab.getAttribute("data-directory-tab");
          setActive(id);
          if (id) history.replaceState(null, "", `#${id}`);
        });
      });

      const fromHash = () => {
        const id = window.location.hash.replace("#", "");
        if (id && panels.some((panel) => panel.getAttribute("data-directory-panel") === id)) {
          setActive(id);
        }
      };
      fromHash();
      window.addEventListener("hashchange", fromHash);
    });
  };

  const testimonialsCarousel = () => {
    const carousel = document.querySelector("[data-testimonials-carousel]");
    if (!carousel) return;
    const slides = Array.from(carousel.querySelectorAll(".testimonials-list"));
    const dots = Array.from(carousel.querySelectorAll("[data-testimonials-dot]"));
    const prev = carousel.querySelector("[data-testimonials-prev]");
    const next = carousel.querySelector("[data-testimonials-next]");
    if (slides.length < 2) return;

    let index = 0;
    let timer = 0;

    const update = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle("is-active", active);
        slide.toggleAttribute("aria-hidden", !active);
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
      timer = window.setInterval(() => update(index + 1), 5200);
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
        update(Number(dot.getAttribute("data-testimonials-dot")) || 0);
        start();
      });
    });
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    update(0);
    start();
  };

  const smoothAccordions = () => {
    const detailsItems = Array.from(document.querySelectorAll(".faq-list-home details, .faq-list details"));
    detailsItems.forEach((details) => {
      const summary = details.querySelector("summary");
      const paragraph = details.querySelector("p");
      if (!summary || !paragraph || details.dataset.smoothAccordion === "true") return;
      details.dataset.smoothAccordion = "true";

      const content = document.createElement("div");
      content.className = "accordion-content";
      paragraph.parentNode.insertBefore(content, paragraph);
      content.appendChild(paragraph);

      const collapseStyles = () => {
        content.style.height = "0px";
        content.style.opacity = "0";
      };

      if (!details.open) collapseStyles();
      if (details.open) {
        content.style.height = "auto";
        content.style.opacity = "1";
      }

      const afterHeightTransition = (callback) => {
        let finished = false;
        const finish = () => {
          if (finished) return;
          finished = true;
          content.removeEventListener("transitionend", onTransitionEnd);
          callback();
        };
        const onTransitionEnd = (transitionEvent) => {
          if (transitionEvent.propertyName === "height") finish();
        };
        content.addEventListener("transitionend", onTransitionEnd);
        window.setTimeout(finish, 420);
      };

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        if (details.dataset.animating === "true") return;
        details.dataset.animating = "true";

        if (details.open) {
          content.style.height = `${content.scrollHeight}px`;
          content.offsetHeight;
          collapseStyles();
          afterHeightTransition(() => {
            details.open = false;
            details.dataset.animating = "false";
          });
          return;
        }

        details.open = true;
        collapseStyles();
        content.offsetHeight;
        content.style.opacity = "1";
        window.requestAnimationFrame(() => {
          content.style.height = `${content.scrollHeight || paragraph.scrollHeight}px`;
        });
        afterHeightTransition(() => {
          content.style.height = "auto";
          content.style.opacity = "1";
          details.dataset.animating = "false";
        });
      });
    });
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
  smoothAccordions();
  serviceGroupCarousel();
  serviceDirectory();
  testimonialsCarousel();
  renderIcons();
  cookieBanner();
  mobileMenu();
  stickyHeader();
  revealOnScroll();
})();
