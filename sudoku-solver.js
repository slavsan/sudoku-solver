(function(){

  function DuplicateItemError( errorMessage, listItem ) {
    return {msg:errorMessage, item:listItem};
  }

  function Matrix( x, y ) {
    this.ARRAY = [1,2,3,4,5,6,7,8,9];
    this.x = x;
    this.y = y;
    this.init();
    this.prefill();
    this.draw();
    this.validate();
    this.solve();
  }
  Matrix.prototype = {
    constructor: Matrix,

    init: function() {
      console.log('initialize here ..');
      this.grid = [];
      for (var i = 0; i < this.y; i += 1) {
        this.grid[i] = [];
        for (var y = 0; y < this.x; y += 1) {
          this.grid[i][y] = null;
        }
      }
      //console.log('GRID: %o', this.grid);
    },

    draw: function() {
      console.log('drawing..');
      var $element;
      var x, y;
      for (x = 0; x < this.grid.length; x += 1) {
        for (y = 0; y < this.grid[x].length; y += 1) {
          if (y == 8) {
            $element = $('<div id="block-' + x + '-' + y + '"></div><br />').appendTo('#main');
          } else {
            $element = $('<div id="block-' + x + '-' + y + '"></div>').appendTo('#main');
          }
          if (this.grid[x][y] == null) {
            $element.html("&nbsp;");
          } else {
            $element.html(this.grid[x][y]);
            $element.addClass('default-value');
          }
        }
      }
    },

    drawBlock: function( x, y, num ) {
      $('#block-' + x + '-' + y).text(num);
    },

    checkForDuplicates: function( list ) {
      var temporaryList = [];
      for (var i = 0; i < list.length; i += 1) {
        if (temporaryList.indexOf(list[i]) === -1 || list[i] === null) { // does our temp list already contain the item
          temporaryList.push(list[i]);
        } else {
          throw new DuplicateItemError("There is a duplicate in the list", i);
        }
      }
    },

    validate: function() {
      console.log('validating ..');
      var x, y;
      var columns = [[],[],[],[],[],[],[],[],[]];
      // Checking horizontal lines
      for (x = 0; x < this.grid.length; x += 1) {
        try {
          this.checkForDuplicates(this.grid[x]);
        } catch (e) {
          console.log(e);
          $('#block-' + x + '-' + e.item).css('background', 'red');
          return false;
        }

        // Store columns data
        columns[0].push(this.grid[x][0]);
        columns[1].push(this.grid[x][1]);
        columns[2].push(this.grid[x][2]);
        columns[3].push(this.grid[x][3]);
        columns[4].push(this.grid[x][4]);
        columns[5].push(this.grid[x][5]);
        columns[6].push(this.grid[x][6]);
        columns[7].push(this.grid[x][7]);
        columns[8].push(this.grid[x][8]);
      }

      // Checking vertical lines
      for (y = 0; y < columns.length; y += 1) {
        try {
          this.checkForDuplicates(columns[y]);
        } catch (e) {
          console.log(e);
          $('#block-' + e.item + '-' + y).css('background', 'red');
          return false;
        }
      }

      console.log('.. seems valid');
      return true;
    },

    diff: function( arr1, arr2 ) {
      return arr1.filter(function( arr1 ){
        return arr2.indexOf(arr1) == -1;
      })
    },

    checkHorizontalLinesForOneMissingNumber: function() {
      console.log('checking horizontal lines for one missing number ..');
      var empty, index, number;
      for (var i = 0; i < this.grid.length; i += 1) {
        empty = this.grid[i].filter(function( item ) {
          return item === null;
        });
        if (empty.length === 1) {
          index = this.grid[i].indexOf(null);
          number = this.diff(this.ARRAY, this.grid[i]);
          this.grid[i][index] = number[0];
          console.info('solved one number ..');
          this.drawBlock(i, index, number[0]);
          return true;
        }
      }
      return false;
    },

    checkVerticalLinesForOneMissingNumber: function() {
      console.log('checking vertical lines for one missing number ..');
      var x, columns = [[],[],[],[],[],[],[],[],[]];
      for (x = 0; x < this.grid.length; x += 1) {
        // Store columns data
        columns[0].push(this.grid[x][0]);
        columns[1].push(this.grid[x][1]);
        columns[2].push(this.grid[x][2]);
        columns[3].push(this.grid[x][3]);
        columns[4].push(this.grid[x][4]);
        columns[5].push(this.grid[x][5]);
        columns[6].push(this.grid[x][6]);
        columns[7].push(this.grid[x][7]);
        columns[8].push(this.grid[x][8]);
      }
      var empty, index, number;
      for (var i = 0; i < columns.length; i += 1) {
        empty = columns[i].filter(function( item ) {
          return item === null;
        });
        if (empty.length === 1) {
          index = columns[i].indexOf(null);
          number = this.diff(this.ARRAY, columns[i]);
          this.grid[index][i] = number[0];
          console.info('solved one number ..');
          this.drawBlock(index, i, number[0]);
          return true;
        }
      }
      return false;
    },

    checkBlock: function( i, Y, X ) {
      var y, x, block = [];
      block[i] = []; // Initialize block
      for (y = Y.start; y < Y.stop; y += 1) {
        block[i][y] = [];
        for (x = X.start; x < X.stop; x += 1) {
          block[i][y][x] = this.grid[y][x];
        }
      }
      //console.log('BLOCK %i: %o', i, block[i]);
      return block[i];
    },

    checkBlocksForOneMissingNumber: function() {
      console.log('checking blocks for one missing number ..');
      var i, c, block, empty, full, number, index, blah;
      // iterate over all blocks
      for (i = 0; i < 9; i += 1) {
        empty = []; // Reset empty array
        full = []; // Reset full array
        switch (i) {
          case 0: block = this.checkBlock(i, {start:0, stop:3}, {start:0, stop:3}); break;
          case 1: block = this.checkBlock(i, {start:0, stop:3}, {start:3, stop:6}); break;
          case 2: block = this.checkBlock(i, {start:0, stop:3}, {start:6, stop:9}); break;
          case 3: block = this.checkBlock(i, {start:3, stop:6}, {start:0, stop:3}); break;
          case 4: block = this.checkBlock(i, {start:3, stop:6}, {start:3, stop:6}); break;
          case 5: block = this.checkBlock(i, {start:3, stop:6}, {start:6, stop:9}); break;
          case 6: block = this.checkBlock(i, {start:6, stop:9}, {start:0, stop:3}); break;
          case 7: block = this.checkBlock(i, {start:6, stop:9}, {start:3, stop:6}); break;
          case 8: block = this.checkBlock(i, {start:6, stop:9}, {start:6, stop:9}); break;
        }

        if (i === 0 || i === 1 || i === 2) blah = 0;
        if (i === 3 || i === 4 || i === 5) blah = 3;
        if (i === 6 || i === 7 || i === 8) blah = 6;

        for (c = blah; c < block.length; c += 1) {
          full = full.concat(block[c]);
        }
        empty = full.filter(function( item ) {
          return item === null;
        });
        if (empty.length === 1) {
          number = this.diff(this.ARRAY, full);
          for (c = blah; c < block.length; c += 1) {
            index = block[c].indexOf(null);
            if (index !== -1) {
              this.grid[c][index] = number[0];
              this.drawBlock(c, index, number[0]);
              return true;
            }
          }
        }
      }
      return false;
    },

    solve: function() {
      console.log('solving ..\n');
      var notStuck = true;
      while (notStuck) {
        notStuck = this.checkHorizontalLinesForOneMissingNumber();
        if (notStuck) continue;
        notStuck = this.checkVerticalLinesForOneMissingNumber();
        if (notStuck) continue;
        notStuck = this.checkBlocksForOneMissingNumber();
      }
      console.log('\nstuck ..');
    },

    prefill: function() {
      this.grid[0][0] = 8;
      this.grid[0][3] = 6;
      this.grid[0][5] = 3;
      this.grid[0][8] = 2;
      this.grid[1][1] = 6;
      this.grid[1][2] = 3;
      this.grid[1][3] = 2;
      this.grid[1][5] = 4;
      this.grid[1][6] = 9;
      this.grid[1][7] = 5;
      this.grid[2][4] = 5;
      this.grid[3][2] = 5;
      this.grid[3][6] = 7;
      this.grid[4][0] = 7;
      this.grid[4][1] = 8;
      this.grid[4][7] = 4;
      this.grid[4][8] = 3;
      this.grid[5][2] = 4;
      this.grid[5][6] = 2;
      this.grid[6][4] = 6;
      this.grid[7][1] = 2;
      this.grid[7][2] = 9;
      this.grid[7][3] = 1;
      this.grid[7][5] = 7;
      this.grid[7][6] = 5;
      this.grid[7][7] = 6;
      this.grid[8][0] = 5;
      this.grid[8][3] = 3;
      this.grid[8][5] = 9;
      this.grid[8][8] = 7;




      // .. Testing

      // Test if validation works
      //this.grid[0][7] = 8;
      //this.grid[3][5] = 5;
      //this.grid[6][0] = 8;

      // Test if checking horizontal lines for one missing number works
      //this.grid[1][0] = 1;
      //this.grid[1][4] = 8;
      //this.grid[7][0] = 4;
      //this.grid[7][4] = 3;

      // Test if checking vertical lines for one missing number works
      //this.grid[0][2] = 7;
      //this.grid[2][2] = 2;
      //this.grid[4][2] = 6;
      //this.grid[6][2] = 8;
      //this.grid[2][5] = 1;
      //this.grid[4][5] = 6;
      //this.grid[5][5] = 5;
      //this.grid[6][5] = 2;

      // Test if checking blocks for one missing number works
      //this.grid[0][1] = 5;
      //this.grid[0][2] = 7;
      ////this.grid[1][0] = 1;
      //this.grid[2][0] = 4;
      //this.grid[2][1] = 9;
      //this.grid[2][2] = 2;

      //this.grid[2][5] = 1;

      //this.grid[0][6] = 4;
      ////this.grid[0][7] = 1;
      //this.grid[1][8] = 8;
      //this.grid[2][6] = 3;
      //this.grid[2][7] = 7;
      //this.grid[2][8] = 6;

      //this.grid[3][0] = 2;
      //this.grid[3][1] = 1;
      //this.grid[4][2] = 6;
      //this.grid[5][0] = 9;

      //this.grid[6][6] = 1;
      //this.grid[6][7] = 3;
      //this.grid[6][8] = 9;
      //this.grid[8][6] = 8;
      //this.grid[8][7] = 2;
    }
  };



  new Matrix(9, 9);

}());
