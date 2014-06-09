(function() {
  "use strict";

  function Control() {}
  Control.prototype = {
    addButton: function( conf ) {
      var btn = document.createElement('button');
      document.querySelector('.actions').appendChild(btn);
      btn.textContent = conf.text;
      btn.onclick = conf.cb;
      return btn;
    },
    onClickBlock: function( cb ) {
      var blocks = document.querySelectorAll('.block');
      for (var i = 0; i < blocks.length; i += 1) {
        blocks[i].onclick = function( e ) {
          cb(e.target);
        };
      }
    }
  };

  window.Control = Control;

}());