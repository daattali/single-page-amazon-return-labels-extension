// Style element for print scale (created on DOMContentLoaded)
let printStyles = null;

function updatePrintScale(scale) {
  if (!printStyles) return;
  printStyles.textContent = `
    @media print {
      body {
        display: flex;
        justify-content: center;
      }
      .printable-section {
        transform: scale(${scale / 100});
        transform-origin: top center;
      }
      @page {
        margin: 10mm;
      }
    }
  `;
}

// Listen for storage changes to update scale dynamically
browser.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.sparl_print_scale) {
    updatePrintScale(changes.sparl_print_scale.newValue || 130);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Create and append style element now that DOM is ready
  printStyles = document.createElement('style');
  printStyles.id = 'sparl-print-styles';
  document.head.appendChild(printStyles);

  // Load initial scale
  browser.storage.sync.get(['sparl_print_scale']).then(function(items) {
    let print_scale = (typeof items.sparl_print_scale === 'undefined') ? 130 : items.sparl_print_scale;
    updatePrintScale(print_scale);
  });

  browser.storage.sync.get(['sparl_remove_print', 'sparl_remove_web', 'sparl_remove_items']).then(
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
