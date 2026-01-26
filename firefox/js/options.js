var sparlOptions = {
  init : function() {
    sparlOptions.restoreOptions();
    document.getElementById('remove_print').addEventListener('click', function(e) {
      browser.storage.sync.set({ sparl_remove_print : document.getElementById('remove_print').checked });
    });
    document.getElementById('remove_web').addEventListener('click', function(e) {
      browser.storage.sync.set({ sparl_remove_web : document.getElementById('remove_web').checked });
    });
    document.getElementById('remove_items').addEventListener('click', function(e) {
      browser.storage.sync.set({ sparl_remove_items : document.getElementById('remove_items').checked });
    });
    document.getElementById('print_scale').addEventListener('change', function(e) {
      let scale = parseInt(document.getElementById('print_scale').value) || 130;
      scale = Math.max(50, Math.min(200, scale));
      document.getElementById('print_scale').value = scale;
      browser.storage.sync.set({ sparl_print_scale : scale });
    });
  },

  restoreOptions : function() {
    browser.storage.sync.get(
      ['sparl_remove_print', 'sparl_remove_web', 'sparl_remove_items', 'sparl_print_scale']
    ).then(function(items) {
      document.getElementById('remove_print').checked = (typeof items.sparl_remove_print === 'undefined') ? true : items.sparl_remove_print;
      document.getElementById('remove_web').checked = (typeof items.sparl_remove_web === 'undefined') ? false : items.sparl_remove_web;
      document.getElementById('remove_items').checked = (typeof items.sparl_remove_items === 'undefined') ? false : items.sparl_remove_items;
      document.getElementById('print_scale').value = (typeof items.sparl_print_scale === 'undefined') ? 130 : items.sparl_print_scale;
    });
  }
}

document.addEventListener('DOMContentLoaded', sparlOptions.init);