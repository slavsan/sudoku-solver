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
    onClickBlock: function( callback ) {
      document.addEventListener('click', function( e ) {
        if (e.target.classList.contains('block')) {
          var target = e.target;

          target.innerHTML = '<input type="text" />';
          var input = target.children[0];
          input.focus();
          var number;
          target.onkeyup = function( e ) {
            switch (e.keyCode) {
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
              case 58:
                number = input.value;
                break;
              default:
                console.log('ONLY INTEGERS FROM 1 TO 9 ARE ALLOWED: %i', e.keyCode);
                input.value = '';
                e.preventDefault();
                return;
            }

            callback(target, number);
          };
        }
      });
    }
  };

  window.Control = Control;

}());