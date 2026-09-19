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
  document.querySelectorAll("[data-ba]").forEach(function (slider) {
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

  /* ---------- Contact form -> mailto ---------- */
  var form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var vehicle = (data.get("vehicle") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var subject = "Quote Request: " + (service || "Auto Service") + " - " + name;
      var bodyLines = [
        "Name: " + name,
        "Phone: " + phone,
        vehicle ? "Vehicle: " + vehicle : "",
        service ? "Service needed: " + service : "",
        "",
        "Message:",
        message || "(no additional details)"
      ].filter(Boolean);

      var mailto =
        "mailto:sparkscarautotune24@gmail.com" +
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
