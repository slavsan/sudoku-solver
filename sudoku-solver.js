(function(){
  "use strict";

  function DuplicateItemError( errorMessage, listItem ) {
    return {msg:errorMessage, item:listItem};
  }

  function Matrix( x, y ) {
    this.ARRAY = [1,2,3,4,5,6,7,8,9];
    this.x = x;
    this.y = y;
    this.abort = false;
    this.stuck = false;
    this.init();
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

    createBlock: function( parentElement, x, y ) {
      var div = document.createElement('div');
      div.id = 'block-' + x + '-' + y;
      div.classList.add('block');
      parentElement.appendChild(div);
      return div;
    },

    createLine: function() {
      var div = document.createElement('div');
      document.querySelector('#main').appendChild(div);
      div.classList.add('line');
      return div;
    },

    markAsError: function( x, y ) {
      var div = document.querySelector('#block-' + x + '-' + y);
      div.classList.add('error');
    },

    draw: function() {
      console.log('drawing..');
      var x, y, line, block;
      for (x = 0; x < this.grid.length; x += 1) {
        line = this.createLine();
        for (y = 0; y < this.grid[x].length; y += 1) {
          block = this.createBlock(line, x, y);
          if (this.grid[x][y] !== null) {
            block.textContent = this.grid[x][y];
            block.classList.add('default');
          }
        }
      }
    },

    drawBlock: function( x, y, number ) {
      var div = document.querySelector('#block-' + x + '-' + y);
      div.textContent = number;
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
          this.markAsError(x, e.item);
          this.abort = true;
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
          this.markAsError(e.item, y);
          this.abort = true;
          return false;
        }
      }

      console.log('.. seems valid');
      return true;
    },

    diff: function( arr1, arr2 ) {
      return arr1.filter(function( arr1 ){
        return arr2.indexOf(arr1) === -1;
      });
    },

    filter: function( arr ) {
      return arr.filter(function( item ) {
        return item === null;
      });
    },

    checkHorizontalLinesForOneMissingNumber: function() {
      console.log('checking horizontal lines for one missing number ..');
      var empty, index, number;
      for (var i = 0; i < this.grid.length; i += 1) {
        empty = this.filter(this.grid[i]);
        if (empty.length === 1) {
          index = this.grid[i].indexOf(null);
          number = this.diff(this.ARRAY, this.grid[i]);
          this.grid[i][index] = number[0];
          console.info('solved one number ..');
          this.drawBlock(i, index, number[0]);
          this.stuck = false;
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
        empty = this.filter(columns[i]);
        if (empty.length === 1) {
          index = columns[i].indexOf(null);
          number = this.diff(this.ARRAY, columns[i]);
          this.grid[index][i] = number[0];
          console.info('solved one number ..');
          this.drawBlock(index, i, number[0]);
          this.stuck = false;
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
      var i, c, block, empty, full, number, index, section;
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

        if (i >= 0 && i <= 2) section = 0;
        if (i >= 3 && i <= 5) section = 3;
        if (i >= 6 && i <= 8) section = 6;

        for (c = section; c < block.length; c += 1) {
          full = full.concat(block[c]);
        }
        empty = this.filter(full);
        if (empty.length === 1) {
          number = this.diff(this.ARRAY, full);
          for (c = section; c < block.length; c += 1) {
            index = block[c].indexOf(null);
            if (index !== -1) {
              this.grid[c][index] = number[0];
              this.drawBlock(c, index, number[0]);
              this.stuck = false;
              return true;
            }
          }
        }
      }
      return false;
    },

    solve: function() {
      if (this.abort) return false;
      console.log('solving ..\n');
      while (this.stuck === false) {
        this.stuck = true;
        this.checkHorizontalLinesForOneMissingNumber();
        this.checkVerticalLinesForOneMissingNumber();
        this.checkBlocksForOneMissingNumber();
      }

      this.validate(); // Validate when finished solving

      if (this.stuck) console.log('\nstuck ..');
    }

  };


  window.Matrix = Matrix;

}());
