(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navToggle = document.querySelector(".nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var districtButtons = document.querySelectorAll(".district-btn");
  var mapActiveEls = document.querySelectorAll(".map-active-el");
  var districtPanels = document.querySelectorAll("[data-district-panel]");

  function selectDistrict(id) {
    districtButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.district === id ? "true" : "false");
    });
    mapActiveEls.forEach(function (el) {
      el.classList.toggle("is-active", el.dataset.district === id);
    });
    districtPanels.forEach(function (panel) {
      var match = panel.dataset.districtPanel === id;
      panel.hidden = !match;
    });
  }

  if (districtButtons.length) {
    districtButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectDistrict(btn.dataset.district);
      });
    });

    var defaultBtn = document.querySelector('.district-btn[aria-pressed="true"]');
    if (defaultBtn) {
      selectDistrict(defaultBtn.dataset.district);
    }
  }

  var filterGroups = document.querySelectorAll("[data-filter-group]");
  filterGroups.forEach(function (group) {
    var chips = group.querySelectorAll(".filter-chip");
    var targetSelector = group.dataset.filterGroup;
    var items = document.querySelectorAll(targetSelector);

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.setAttribute("aria-pressed", "false");
        });
        chip.setAttribute("aria-pressed", "true");
        var filter = chip.dataset.filter;

        items.forEach(function (item) {
          if (filter === "all" || item.dataset.category === filter) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        });
      });
    });
  });
})();
