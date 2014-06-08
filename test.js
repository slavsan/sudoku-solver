(function() {
  "use strict";

  function TestMatrix() {
    // Put initialization code here if needed
  }
  TestMatrix.prototype = {
    constructor: TestMatrix,

    setInitialData: function( matrix ) {
      matrix.grid[0][0] = 8;
      matrix.grid[0][3] = 6;
      matrix.grid[0][5] = 3;
      matrix.grid[0][8] = 2;
      matrix.grid[1][1] = 6;
      matrix.grid[1][2] = 3;
      matrix.grid[1][3] = 2;
      matrix.grid[1][5] = 4;
      matrix.grid[1][6] = 9;
      matrix.grid[1][7] = 5;
      matrix.grid[2][4] = 5;
      matrix.grid[3][2] = 5;
      matrix.grid[3][6] = 7;
      matrix.grid[4][0] = 7;
      matrix.grid[4][1] = 8;
      matrix.grid[4][7] = 4;
      matrix.grid[4][8] = 3;
      matrix.grid[5][2] = 4;
      matrix.grid[5][6] = 2;
      matrix.grid[6][4] = 6;
      matrix.grid[7][1] = 2;
      matrix.grid[7][2] = 9;
      matrix.grid[7][3] = 1;
      matrix.grid[7][5] = 7;
      matrix.grid[7][6] = 5;
      matrix.grid[7][7] = 6;
      matrix.grid[8][0] = 5;
      matrix.grid[8][3] = 3;
      matrix.grid[8][5] = 9;
      matrix.grid[8][8] = 7;
    },

    horizontalValidation: function( matrix ) {
      matrix.grid[3][5] = 5;
    },

    verticalValidation: function( matrix ) {
      matrix.grid[6][0] = 8;
    },

    horizontalLineWithOneUnknown: function( matrix ) {
      matrix.grid[1][0] = 1;
      matrix.grid[1][8] = 8;
      matrix.grid[7][0] = 3;
      matrix.grid[7][4] = 8;
    },

    horizontalLineWithTwoUnknown: function( matrix ) {
      matrix.grid[1][4] = 7;
      matrix.grid[7][8] = 4;
    },

    verticalLineWithOneUnknown: function(matrix) {
      matrix.grid[0][2] = 7;
      matrix.grid[2][2] = 2;
      matrix.grid[4][2] = 6;
      matrix.grid[6][2] = 8;
      matrix.grid[2][5] = 6;
      matrix.grid[4][5] = 1;
      matrix.grid[5][5] = 5;
      matrix.grid[6][5] = 2;
    },

    blocksWithOneUnknown: function( matrix ) {
      // Test block 0
      matrix.grid[0][1] = 5;
      matrix.grid[0][2] = 7;
      matrix.grid[2][0] = 4;
      matrix.grid[2][1] = 9;
      matrix.grid[2][2] = 2;

      // Test block 1
      //matrix.grid[2][5] = 1;
      //matrix.grid[0][4] = 7;
      //matrix.grid[2][3] = 9;

      // Test block 2
      //matrix.grid[0][6] = 4;
      //matrix.grid[1][8] = 8;
      //matrix.grid[2][6] = 3;
      //matrix.grid[2][7] = 7;
      //matrix.grid[2][8] = 6;

      // Test block 3
      //matrix.grid[3][0] = 2;
      //matrix.grid[3][1] = 1;
      //matrix.grid[4][2] = 6;
      //matrix.grid[5][0] = 9;

      // Test block 5
      //matrix.grid[3][7] = 2;
      //matrix.grid[3][8] = 6;
      //matrix.grid[4][6] = 1;
      //matrix.grid[5][8] = 5;

      // Test block 6
      //matrix.grid[6][0] = 3;
      //matrix.grid[6][1] = 7;
      //matrix.grid[6][2] = 8;
      //matrix.grid[8][1] = 1;
      //matrix.grid[8][2] = 6;

      // Test block 7
      //matrix.grid[6][3] = 5;
      //matrix.grid[6][5] = 2;
      //matrix.grid[8][4] = 4;

      // Test block 8
      //matrix.grid[6][6] = 1;
      //matrix.grid[6][7] = 3;
      //matrix.grid[6][8] = 9;
      //matrix.grid[8][6] = 8;
      //matrix.grid[8][7] = 2;
    }
  };

  window.TestMatrix = TestMatrix;

}());
