var sparlOptions = {
  mybrowser : (window.browser)? window.browser : window.chrome,

  init : function() {
    sparlOptions.restoreOptions();
    document.getElementById('remove_print').addEventListener('click', function(e) {
      sparlOptions.mybrowser.storage.sync.set({ sparl_remove_print : document.getElementById('remove_print').checked });
    });
    document.getElementById('remove_web').addEventListener('click', function(e) {
      sparlOptions.mybrowser.storage.sync.set({ sparl_remove_web : document.getElementById('remove_web').checked });
    });
    document.getElementById('remove_items').addEventListener('click', function(e) {
      sparlOptions.mybrowser.storage.sync.set({ sparl_remove_items : document.getElementById('remove_items').checked });
    });
  },
  
  restoreOptions : function() {
    sparlOptions.mybrowser.storage.sync.get(
      ['sparl_remove_print', 'sparl_remove_web', 'sparl_remove_items']
    ).then(function(items) {
      document.getElementById('remove_print').checked = (typeof items.sparl_remove_print === 'undefined') ? true : items.sparl_remove_print;
      document.getElementById('remove_web').checked = (typeof items.sparl_remove_web === 'undefined') ? false : items.sparl_remove_web;
      document.getElementById('remove_items').checked = (typeof items.sparl_remove_items === 'undefined') ? false : items.sparl_remove_items;
    });
  }
}

document.addEventListener('DOMContentLoaded', sparlOptions.init);