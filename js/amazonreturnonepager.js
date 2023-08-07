document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".printable-section #return-deadline-display").classList.add("no-print");
  document.querySelector(".printable-section .a-unordered-list").classList.add("no-print");
  document.querySelectorAll(".printable-section .a-text-left").forEach(
    function(el) {
      if (!el.closest("table")) {
        el.classList.add("no-print");
      }
    }
  );
});
