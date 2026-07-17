/**
 * Tranquil Escape — site analytics (GA4)
 *
 * SETUP: Set your GA4 Measurement ID below (Admin → Data streams → Measurement ID).
 * High-intent Google Search Ads should land on: https://tranquilescapevilla.com/book
 *
 * Events: reserve_cta_click, whatsapp_click, phone_click, booking_search_started
 * Do not invent booking_completed unless HotelRunner exposes a verifiable confirmation signal.
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // GA4 Measurement ID (public client ID — also settable via window.TE_GA4_MEASUREMENT_ID)
  // ---------------------------------------------------------------------------
  var TE_GA4_MEASUREMENT_ID = (
    window.TE_GA4_MEASUREMENT_ID || "G-THLJN79RM1"
  ).trim();

  var ADS_LANDING_PATH = "/book";

  function hasGa4Id() {
    return /^G-[A-Z0-9]+$/i.test(TE_GA4_MEASUREMENT_ID);
  }

  function loadGa4() {
    if (!hasGa4Id()) {
      if (typeof console !== "undefined" && console.info) {
        console.info(
          "[TE Analytics] Set window.TE_GA4_MEASUREMENT_ID (G-XXXXXXXX) to enable GA4."
        );
      }
      return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    var isLocal =
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "localhost";
    gtag("config", TE_GA4_MEASUREMENT_ID, {
      send_page_view: true,
      anonymize_ip: true,
      // Helps GA4 DebugView on local testing (Tag Assistant often fails on localhost)
      debug_mode: isLocal,
    });

    var s = document.createElement("script");
    s.async = true;
    s.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(TE_GA4_MEASUREMENT_ID);
    document.head.appendChild(s);
  }

  function track(eventName, params) {
    params = params || {};
    if (typeof window.gtag === "function" && hasGa4Id()) {
      window.gtag("event", eventName, params);
    }
  }

  function bindClicks() {
    document.addEventListener(
      "click",
      function (e) {
        var el = e.target;
        if (!el || !el.closest) return;
        var a = el.closest("a");
        if (!a || !a.getAttribute) return;

        var href = (a.getAttribute("href") || "").trim();
        var location =
          a.getAttribute("data-te-location") ||
          (a.classList.contains("te-hero-cta")
            ? "hero"
            : a.classList.contains("te-book-cta__button")
              ? "room_strip"
              : a.classList.contains("te-home-reserve__button")
                ? "home_band"
                : a.classList.contains("footer-text-link")
                  ? "footer"
                  : "link");

        if (
          href === "/book" ||
          href === "/book.html" ||
          href.indexOf("/book?") === 0 ||
          href.indexOf("tranquilescapevilla.com/book") !== -1
        ) {
          track("reserve_cta_click", {
            link_url: href,
            cta_location: location,
            page_path: window.location.pathname,
          });
          return;
        }

        if (href.indexOf("wa.me/") !== -1 || href.indexOf("whatsapp.com") !== -1) {
          track("whatsapp_click", {
            link_url: href,
            page_path: window.location.pathname,
          });
          return;
        }

        if (href.indexOf("tel:") === 0) {
          track("phone_click", {
            link_url: href,
            page_path: window.location.pathname,
          });
        }
      },
      true
    );
  }

  function bindBookingSearch() {
    var path = window.location.pathname || "";
    if (path.indexOf("book") === -1) return;

    var fired = false;
    function fireSearch() {
      if (fired) return;
      fired = true;
      track("booking_search_started", {
        page_path: path,
        ads_landing: ADS_LANDING_PATH,
      });
    }

    document.addEventListener(
      "click",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        if (t.closest("#hr_search_widget, .datepicker, .hr_button, .te-booking__widget-wrap")) {
          fireSearch();
        }
      },
      true
    );

    document.addEventListener(
      "change",
      function (e) {
        var t = e.target;
        if (!t) return;
        if (t.closest && t.closest("#hr_search_widget, .te-booking__widget-wrap")) {
          fireSearch();
        }
      },
      true
    );
  }

  loadGa4();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindClicks();
      bindBookingSearch();
    });
  } else {
    bindClicks();
    bindBookingSearch();
  }
})();
