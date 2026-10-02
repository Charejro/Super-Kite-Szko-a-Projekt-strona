/* ==========================================================================
   Super Kite — interakcje: dwujęzyczność PL/EN, menu mobilne, lightbox, rok
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "superkite-lang";
  var DEFAULT_LANG = "pl";

  var dict = window.SK_I18N || { pl: {}, en: {} };

  /* ---------- Tłumaczenia ---------- */

  function getStoredLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pl" || saved === "en") return saved;
    } catch (e) {
      /* localStorage może być niedostępny (np. tryb prywatny) */
    }
    return null;
  }

  function detectLang() {
    var stored = getStoredLang();
    if (stored) return stored;
    var nav = (navigator.language || "pl").toLowerCase();
    return nav.indexOf("pl") === 0 ? "pl" : "en";
  }

  function translate(key, lang) {
    var table = dict[lang] || {};
    var value = table[key];
    if (value == null) value = (dict[DEFAULT_LANG] || {})[key];
    return value == null ? null : value;
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;

    // textContent
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = translate(el.getAttribute("data-i18n"), lang);
      if (v != null) el.textContent = v;
    });

    // innerHTML (teksty z linkami / <br> / <strong>)
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = translate(el.getAttribute("data-i18n-html"), lang);
      if (v != null) el.innerHTML = v;
    });

    // dowolny atrybut: data-i18n-attr="alt:klucz"
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var v = translate(parts[1].trim(), lang);
        if (v != null) el.setAttribute(attr, v);
      });
    });

    // Stan przycisków przełącznika
    document.querySelectorAll(".lang__btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    updateYear(lang);
  }

  /* ---------- Rok w stopce (z szablonem {year}) ---------- */

  function updateYear(lang) {
    var year = new Date().getFullYear();
    var tpl = translate("footer.rights", lang) || "© {year} Super Kite";
    document.querySelectorAll("[data-i18n-html='footer.rights'], .footer-bottom").forEach(function (el) {
      if (el.classList && el.classList.contains("footer-bottom")) {
        el.textContent = tpl.replace("{year}", year);
      }
    });
  }

  function setLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignorujemy */
    }
    applyLanguage(lang);
  }

  /* ---------- Lightbox galerii ---------- */

  var lightbox = null;

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightbox = null;
  }

  function openLightbox(src, alt, caption) {
    var box = document.querySelector(".lightbox");
    if (!box) return;
    box.querySelector(".lightbox__img").setAttribute("src", src);
    box.querySelector(".lightbox__img").setAttribute("alt", alt || "");
    var cap = box.querySelector(".lightbox__caption");
    if (cap) cap.textContent = caption || "";
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightbox = box;
  }

  /* ---------- Start ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    // Język
    applyLanguage(detectLang());

    document.querySelectorAll(".lang__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang"));
      });
    });

    // Menu mobilne
    var toggle = document.querySelector(".nav__toggle");
    var links = document.querySelector(".nav__links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Podświetlanie sekcji na stronie głównej
    var sections = document.querySelectorAll("[data-nav-section]");
    if (sections.length && "IntersectionObserver" in window) {
      var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach(function (section) {
        observer.observe(section);
      });
    }

    // Lightbox — klik w zdjęcie galerii
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var img = item.querySelector("img");
        var captionEl = item.querySelector(".gallery-item__caption");
        openLightbox(
          item.getAttribute("data-full") || img.getAttribute("src"),
          img.getAttribute("alt"),
          captionEl ? captionEl.textContent : ""
        );
      });
    });

    var box = document.querySelector(".lightbox");
    if (box) {
      box.addEventListener("click", function (e) {
        if (e.target === box || e.target.classList.contains("lightbox__close")) {
          closeLightbox();
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeLightbox();
      });
    }
  });
})();
