(function() {
  "use strict";

  var sudoku = new window.Matrix(9, 9);
  var test = new window.TestMatrix();

  test.setInitialData(sudoku);
  //test.horizontalValidation(sudoku);
  //test.verticalValidation(sudoku);
  //test.horizontalLineWithOneUnknown(sudoku);
  //test.verticalLineWithOneUnknown(sudoku);
  //test.blocksWithOneUnknown(sudoku);
  //test.horizontalLineWithTwoUnknown(sudoku);
  //test.verticalLineWithTwoUnknown(sudoku);

  sudoku.draw();
  sudoku.validate();
  sudoku.solve();

}());
