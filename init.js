(function() {
  "use strict";

  var sudoku = new window.Matrix(9, 9);
  var control = new window.Control();
  //var test = new window.TestMatrix();

  //test.setInitialData(sudoku);
  //test.horizontalValidation(sudoku);
  //test.verticalValidation(sudoku);
  //test.horizontalLineWithOneUnknown(sudoku);
  //test.verticalLineWithOneUnknown(sudoku);
  //test.blocksWithOneUnknown(sudoku);
  //test.horizontalLineWithTwoUnknown(sudoku);
  //test.verticalLineWithTwoUnknown(sudoku);

  sudoku.draw();
  //sudoku.validate();
  //sudoku.solve();

  control.addButton({
    text:"solve",
    cb:function() {
      sudoku.stuck = false;
      sudoku.solve();
    }
  });

  control.onClickBlock(function( target ){
    //console.log('BLAH');
    console.log('CLICKED TARGET: %o', target);
    target.innerHTML = '<input type="text" />';
    var input = target.children[0];
    input.focus();
    var temp;
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
          temp = input.value;
          break;
        default:
          console.log('ONLY INTEGERS FROM 1 TO 9 ARE ALLOWED: %i', e.keyCode);
          input.value = '';
          e.preventDefault();
          return;
      }

      sudoku.setDefaultValue(target.getAttribute('y'), target.getAttribute('x'), temp);
      sudoku.validate();
    };
  });


}());
