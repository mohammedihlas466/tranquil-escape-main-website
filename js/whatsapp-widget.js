(function () {
  function init() {
    var root = document.getElementById("te-whatsapp-widget");
    if (!root) return;

    var bubble = root.querySelector(".live-chat-bubbble---brix.whatsapp");
    if (!bubble) return;

    function setOpen(open) {
      root.classList.toggle("is-open", open);
      bubble.setAttribute("aria-expanded", open ? "true" : "false");
      bubble.setAttribute(
        "aria-label",
        open ? "Close WhatsApp chat" : "Open WhatsApp chat"
      );
    }

    bubble.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      setOpen(!root.classList.contains("is-open"));
    });

    bubble.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(!root.classList.contains("is-open"));
      }
      if (e.key === "Escape") setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
