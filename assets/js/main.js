(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("active", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- Before / After sliders ---------- */
  function bindBeforeAfterSliders(root) {
    (root || document).querySelectorAll("[data-ba]").forEach(function (slider) {
      if (slider.dataset.baBound) return;
      slider.dataset.baBound = "true";

      var topImg = slider.querySelector(".ba-top");
      var handle = slider.querySelector(".ba-handle");
      var range = slider.querySelector(".ba-range");

      function setPosition(pct) {
        pct = Math.max(0, Math.min(100, pct));
        if (topImg) topImg.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
        if (handle) handle.style.left = pct + "%";
      }

      if (range) {
        range.addEventListener("input", function () {
          setPosition(parseFloat(range.value));
        });
      }

      setPosition(50);
    });
  }

  bindBeforeAfterSliders(document);

  /* ---------- Dynamic gallery (before/after pairs from cPanel-hosted JSON) ---------- */
  var dynamicGallery = document.getElementById("dynamicGallery");
  if (dynamicGallery) {
    var GALLERY_JSON_URL = "https://media.sparkscarautotune.co.ke/gallery/gallery.json";

    function escapeHtml(str) {
      return String(str || "").replace(/[&<>"']/g, function (ch) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
      });
    }

    function renderGallery(entries) {
      if (!Array.isArray(entries) || !entries.length) {
        dynamicGallery.innerHTML = '<p class="gallery-status">No gallery photos have been added yet &mdash; check back soon.</p>';
        return;
      }

      var baseUrl = GALLERY_JSON_URL.replace(/gallery\.json$/, "");
      var html = '<div class="ba-grid">';

      entries.forEach(function (entry) {
        if (!entry || !entry.before || !entry.after) return;
        var beforeSrc = /^https?:\/\//i.test(entry.before) ? entry.before : baseUrl + entry.before;
        var afterSrc = /^https?:\/\//i.test(entry.after) ? entry.after : baseUrl + entry.after;
        var title = escapeHtml(entry.title || "Before and after repair");

        html +=
          '<div class="ba-slider reveal in-view" data-ba>' +
            '<img class="ba-img ba-base" src="' + afterSrc + '" alt="' + title + ' &mdash; after" loading="lazy">' +
            '<img class="ba-img ba-top" src="' + beforeSrc + '" alt="' + title + ' &mdash; before" loading="lazy">' +
            '<div class="ba-handle"></div>' +
            '<span class="ba-tag ba-tag-before">Before</span>' +
            '<span class="ba-tag ba-tag-after">After</span>' +
            '<input type="range" min="0" max="100" value="50" class="ba-range" aria-label="Drag to compare before and after: ' + title + '">' +
          '</div>';
      });

      html += "</div>";
      dynamicGallery.innerHTML = html;
      bindBeforeAfterSliders(dynamicGallery);
    }

    dynamicGallery.innerHTML = '<p class="gallery-status">Loading gallery&hellip;</p>';

    fetch(GALLERY_JSON_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("Gallery fetch failed: " + res.status);
        return res.json();
      })
      .then(renderGallery)
      .catch(function () {
        dynamicGallery.innerHTML =
          '<p class="gallery-status gallery-status-error">We couldn&rsquo;t load the gallery right now. Please refresh, or view our work on ' +
          '<a href="https://wa.me/254713131738" target="_blank" rel="noopener">WhatsApp</a>.</p>';
      });
  }

  /* ---------- Contact form -> mailto ---------- */
  var form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var vehicle = (data.get("vehicle") || "").toString().trim();
      var clientType = (data.get("clientType") || "").toString().trim();
      var branch = (data.get("branch") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var subject = "Quote Request: " + (service || "Auto Service") + " - " + name;
      var bodyLines = [
        "Name: " + name,
        "Phone: " + phone,
        vehicle ? "Vehicle: " + vehicle : "",
        clientType ? "Client type: " + clientType : "",
        branch ? "Preferred branch: " + branch : "",
        service ? "Service needed: " + service : "",
        "",
        "Message:",
        message || "(no additional details)"
      ].filter(Boolean);

      var mailto =
        "mailto:info@sparkscarautotune.co.ke" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();