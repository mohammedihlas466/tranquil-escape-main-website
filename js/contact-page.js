(function () {
  function init() {
    var section = document.querySelector(".te-contact");
    if (!section) return;

    var panel = section.querySelector(".te-reveal");
    var items = section.querySelectorAll(".te-reveal-item");
    var revealed = false;

    for (var i = 0; i < items.length; i++) {
      items[i].style.setProperty("--te-i", i);
    }

    function reveal() {
      if (revealed) return;
      revealed = true;
      if (panel) panel.classList.add("is-visible");
      for (var j = 0; j < items.length; j++) {
        items[j].classList.add("is-visible");
      }
    }

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    // Arm the hidden state only when we can safely animate.
    section.classList.add("is-armed");

    var target = panel || section;

    function inViewport(el) {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(target);

    // Reveal right away if it is already on screen at load.
    if (inViewport(target)) reveal();

    // Safety net: never let content stay hidden if the observer misfires.
    window.addEventListener("load", function () {
      if (inViewport(target)) reveal();
    });
    setTimeout(reveal, 1600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
