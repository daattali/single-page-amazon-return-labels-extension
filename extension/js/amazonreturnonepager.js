document.addEventListener("DOMContentLoaded", function() {
  const mybrowser = (window.browser)? window.browser : window.chrome;
  mybrowser.storage.sync.get(['sparl_remove_print', 'sparl_remove_web', 'sparl_remove_items']).then(
    function(items) {
      let classes_to_add = [];
      let remove_print = (typeof items.sparl_remove_print === 'undefined') ? true : items.sparl_remove_print;
      let remove_web = (typeof items.sparl_remove_web === 'undefined') ? false : items.sparl_remove_web;
      let remove_items = (typeof items.sparl_remove_items === 'undefined') ? false : items.sparl_remove_items;

      if (remove_print) {
        classes_to_add.push("no-print");
      }
      if (remove_web) {
        classes_to_add.push("a-hidden");
      }

      document.querySelector(".printable-section #return-deadline-display").classList.add(...classes_to_add);
      document.querySelector(".printable-section .a-unordered-list").classList.add(...classes_to_add);
      document.querySelectorAll(".printable-section .a-text-left").forEach(
        function(el) {
          if (el.closest("table")) {
            if (remove_items) {
              el.closest("table").classList.add(...classes_to_add);
            }
          } else {
            el.classList.add(...classes_to_add);
          }
        }
      );
    }
  );
});
