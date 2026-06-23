(function () {
  const cfg = window.SITE_DR_BENJAMIN || {
    whatsapp: "5511916606602",
    whatsappDisplay: "(11) 91660-6602",
    instagram: "https://www.instagram.com/dr.benjaminramos/",
    defaultMessage: "Olá! Gostaria de agendar uma consulta com o Dr. Benjamin Ramos.",
    videos: [],
    hospitals: [],
    procedures: { videolaparoscopic: [], anorectal: [] },
    doctor: {},
    curriculum: { sections: [], highlights: [] },
    findMe: [],
  };

  function buildWhatsAppUrl(text, phone) {
    const num = phone || cfg.whatsapp;
    const base = "https://wa.me/" + num;
    if (!text) return base;
    return base + "?text=" + encodeURIComponent(text);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function wireWhatsApp() {
    document.querySelectorAll("[data-whatsapp-agendar]").forEach((el) => {
      el.href = buildWhatsAppUrl(cfg.defaultMessage);
    });

    document.querySelectorAll("[data-whatsapp-msg]").forEach((el) => {
      const msg = el.getAttribute("data-whatsapp-msg") || cfg.defaultMessage;
      el.href = buildWhatsAppUrl(msg);
    });

    document.querySelectorAll("[data-whatsapp-hospital]").forEach((el) => {
      const hospital = el.getAttribute("data-whatsapp-hospital");
      const phone = el.getAttribute("data-whatsapp-phone");
      const msg =
        "Olá! Gostaria de agendar consulta com o Dr. Benjamin Ramos no " + hospital + ".";
      el.href = buildWhatsAppUrl(msg, phone);
    });

    document.querySelectorAll("[data-whatsapp-label]").forEach((el) => {
      el.textContent = cfg.whatsappDisplay || "(11) 91660-6602";
    });

    document.querySelectorAll("[data-doctor-name]").forEach((el) => {
      el.textContent = cfg.doctor?.fullName || cfg.doctor?.shortName || "Dr. Benjamin Ramos";
    });

    document.querySelectorAll("[data-doctor-display-name]").forEach((el) => {
      el.textContent = cfg.doctor?.displayName || "Benjamin Ramos de Andrade Neto";
    });

    document.querySelectorAll("[data-doctor-subtitle]").forEach((el) => {
      el.textContent = cfg.doctor?.subtitle || "";
    });

    document.querySelectorAll("[data-doctor-tagline]").forEach((el) => {
      el.textContent = cfg.doctor?.tagline || "";
    });

    document.querySelectorAll("[data-doctor-title]").forEach((el) => {
      el.textContent = cfg.doctor?.title || "";
    });

    document.querySelectorAll("[data-doctor-crm]").forEach((el) => {
      el.textContent = cfg.doctor?.crm || "";
    });

    const rqeEl = document.getElementById("doctor-rqe");
    if (rqeEl && cfg.doctor?.rqe?.length) {
      rqeEl.innerHTML = cfg.doctor.rqe.map((r) => "<li>" + escapeHtml(r) + "</li>").join("");
    }
  }

  function wireInstagram() {
    document.querySelectorAll("[data-instagram-link]").forEach((el) => {
      el.href = cfg.instagram;
    });
    document.querySelectorAll("[data-instagram-handle]").forEach((el) => {
      el.textContent = cfg.instagramHandle || "@dr.benjaminramos";
    });
  }

  function renderProcedures() {
    const grid = document.getElementById("procedures-grid");
    if (!grid) return;

    const groups = cfg.procedures?.groups || [];
    if (!groups.length) return;

    grid.innerHTML = groups
      .map(
        (group) => `
      <article class="procedure-panel reveal">
        <div class="procedure-panel-header">
          <span class="procedure-index">${escapeHtml(group.index)}</span>
          <h3>${escapeHtml(group.title)}</h3>
        </div>
        <ul class="procedure-list">
          ${(group.items || []).map((item) => "<li>" + escapeHtml(item) + "</li>").join("")}
        </ul>
        <a class="btn btn-primary btn-sm" href="${buildWhatsAppUrl(group.whatsappMsg || cfg.defaultMessage)}" target="_blank" rel="noopener noreferrer">Agendar avaliação</a>
      </article>`
      )
      .join("");

    grid.querySelectorAll(".reveal").forEach((el) => observeReveal(el));
  }

  function renderChineseMedicine() {
    const section = document.getElementById("mtc-content");
    if (!section || !cfg.chineseMedicine) return;

    const mtc = cfg.chineseMedicine;
    const cards = (mtc.practices || [])
      .map(
        (item) => `
      <article class="mtc-card reveal">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </article>`
      )
      .join("");

    section.innerHTML = `
      <p class="mtc-lead reveal">${escapeHtml(mtc.lead)}</p>
      <div class="mtc-grid">${cards}</div>
      <div class="mtc-cta reveal">
        <a class="btn btn-whatsapp" href="${buildWhatsAppUrl("Olá! Gostaria de agendar consulta de Medicina Chinesa e acupuntura no consultório particular.")}" target="_blank" rel="noopener noreferrer">Agendar consultório</a>
      </div>`;

    section.querySelectorAll(".reveal").forEach((el) => observeReveal(el));
  }

  function renderHospitals() {
    const grid = document.getElementById("hospitals-grid");
    if (!grid || !cfg.hospitals?.length) return;

    grid.innerHTML = cfg.hospitals
      .map((h) => {
        const phones = (h.phones || [])
          .map(
            (p) => `
          <a
            class="btn btn-whatsapp btn-sm-full"
            href="${buildWhatsAppUrl("Olá! Gostaria de informações sobre consulta no " + h.name + ".", p.whatsapp)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            ${escapeHtml(p.display)}
          </a>
          <span class="hospital-phone-label">${escapeHtml(p.label)}</span>`
          )
          .join("");

        const badge = h.badge
          ? `<span class="hospital-badge">${escapeHtml(h.badge)}</span>`
          : "";

        const displayName = h.shortName
          ? `${escapeHtml(h.name)} (${escapeHtml(h.shortName)})`
          : escapeHtml(h.name);

        const note = h.note
          ? `<p class="hospital-note">${escapeHtml(h.note)}</p>`
          : "";

        const schedule =
          h.schedule?.length
            ? `<div class="hospital-schedule">
            <h4>Horários de ambulatório</h4>
            <ul>${h.schedule.map((slot) => `<li>${escapeHtml(slot)}</li>`).join("")}</ul>
          </div>`
            : "";

        return `
      <article class="hospital-card reveal">
        <div class="hospital-card-header">
          <h3>${displayName}</h3>
          ${badge}
        </div>
        <div class="hospital-card-body">
          ${note}
          ${schedule}
          <address class="hospital-address">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
            </svg>
            <span>
              ${h.venue ? escapeHtml(h.venue) + "<br>" : ""}
              ${escapeHtml(h.address)}<br>
              ${escapeHtml(h.district)}<br>
              ${escapeHtml(h.cep)}
            </span>
          </address>
          <a class="btn btn-outline btn-sm-full map-link" href="${escapeHtml(h.mapUrl || "#")}" target="_blank" rel="noopener noreferrer">
            Ver no Google Maps
          </a>
          <div class="hospital-divider"></div>
          <div class="hospital-phones">${phones}</div>
        </div>
      </article>`;
      })
      .join("");

    grid.querySelectorAll(".reveal").forEach((el) => observeReveal(el));
  }

  function renderCurriculum() {
    const root = document.getElementById("curriculum-content");
    if (!root || !cfg.curriculum) return;

    const sections = (cfg.curriculum.sections || [])
      .map(
        (sec) => `
      <article class="cv-block">
        <h3>${escapeHtml(sec.title)}</h3>
        <ul>${(sec.items || []).map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
      </article>`
      )
      .join("");

    root.innerHTML = `<div class="cv-grid">${sections}</div>`;
  }

  function renderFindMe() {
    const grid = document.getElementById("findme-grid");
    if (!grid || !cfg.findMe?.length) return;

    grid.innerHTML = cfg.findMe
      .map((item) => {
        if (item.action === "whatsapp") {
          return `
        <article class="findme-card reveal">
          <span class="findme-icon findme-icon--wa" aria-hidden="true">WA</span>
          <h3>${escapeHtml(item.label)}</h3>
          <p>${escapeHtml(item.value)}</p>
          <a class="btn btn-whatsapp btn-sm-full" href="${buildWhatsAppUrl(item.message)}" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
        </article>`;
        }

        const iconLabel =
          item.icon === "instagram"
            ? "IG"
            : item.icon === "hospital"
              ? "HP"
              : item.icon === "pdf"
                ? "PDF"
                : "@";
        const iconClass = item.icon === "hospital" ? " findme-icon--hp" : "";
        const isInternal = item.href?.startsWith("#");
        const linkAttrs = isInternal ? "" : item.icon === "pdf" ? "download" : 'target="_blank" rel="noopener noreferrer"';
        const btnLabel =
          item.buttonLabel || (item.icon === "pdf" ? "Baixar PDF" : isInternal ? "Ver hospitais" : "Acessar");

        return `
        <article class="findme-card reveal">
          <span class="findme-icon${iconClass}" aria-hidden="true">${iconLabel}</span>
          <h3>${escapeHtml(item.label)}</h3>
          <p>${escapeHtml(item.value)}</p>
          <a class="btn btn-primary btn-sm-full" href="${escapeHtml(item.href)}" ${linkAttrs}>${escapeHtml(btnLabel)}</a>
        </article>`;
      })
      .join("");

    grid.querySelectorAll(".reveal").forEach((el) => observeReveal(el));
  }

  function renderVideos() {
    const track = document.getElementById("video-track");
    const dots = document.getElementById("carousel-dots");
    if (!track || !cfg.videos?.length) return;

    track.innerHTML = cfg.videos
      .map(
        (v, i) => `
      <article class="video-slide" data-index="${i}">
        <div class="video-card">
          <div class="video-embed">
            <iframe
              src="https://www.youtube.com/embed/${escapeHtml(v.id)}"
              title="${escapeHtml(v.title)}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
          <div class="video-info">
            <h3>${escapeHtml(v.title)}</h3>
            <p>${escapeHtml(v.description)}</p>
          </div>
        </div>
      </article>`
      )
      .join("");

    if (dots) {
      dots.innerHTML = cfg.videos
        .map(
          (_, i) =>
            `<button class="carousel-dot${i === 0 ? " is-active" : ""}" type="button" data-dot="${i}" aria-label="Vídeo ${i + 1}"></button>`
        )
        .join("");
    }
  }

  function initCarousel() {
    const track = document.getElementById("video-track");
    const prev = document.getElementById("video-prev");
    const next = document.getElementById("video-next");
    const dots = document.getElementById("carousel-dots");
    if (!track) return;

    const step = () => {
      const slide = track.querySelector(".video-slide");
      return slide ? slide.offsetWidth + 20 : 380;
    };

    const updateDots = () => {
      if (!dots) return;
      const index = Math.round(track.scrollLeft / step());
      dots.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });
    };

    prev?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));

    dots?.querySelectorAll(".carousel-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        track.scrollTo({ left: Number(dot.getAttribute("data-dot")) * step(), behavior: "smooth" });
      });
    });

    track.addEventListener("scroll", updateDots, { passive: true });
  }

  function initMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  function observeReveal(el) {
    revealObserver.observe(el);
  }

  function initReveal() {
    document.querySelectorAll(".reveal").forEach(observeReveal);
  }

  function initAnalytics() {
    const analytics = cfg.analytics || {};
    const cfToken = String(analytics.cloudflareToken || "").trim();
    const clarityId = String(analytics.clarityProjectId || "").trim();

    if (cfToken) {
      const script = document.createElement("script");
      script.defer = true;
      script.src = "https://static.cloudflareinsights.com/beacon.min.js";
      script.setAttribute("data-cf-beacon", JSON.stringify({ token: cfToken }));
      document.head.appendChild(script);
    }

    if (clarityId) {
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", clarityId);
    }
  }

  function initNavHighlight() {
    const sections = [...document.querySelectorAll("main section[id]")];
    const links = [...document.querySelectorAll(".site-nav a")];

    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = sections[0]?.id;
      sections.forEach((sec) => {
        if (sec.offsetTop <= y) current = sec.id;
      });
      links.forEach((a) => {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  initAnalytics();
  renderProcedures();
  renderChineseMedicine();
  renderHospitals();
  renderCurriculum();
  renderFindMe();
  renderVideos();
  wireWhatsApp();
  wireInstagram();
  initCarousel();
  initMenu();
  initReveal();
  initNavHighlight();
  initHeaderScroll();
})();
