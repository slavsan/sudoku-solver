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
    this.attempts = 0;
    this.init();
  }
  Matrix.prototype = {
    constructor: Matrix,

    init: function() {
      console.log('initialize here ..');
      this.grid = [];
      for (var y = 0; y < this.y; y += 1) {
        this.grid[y] = [];
        for (var x = 0; x < this.x; x += 1) {
          this.grid[y][x] = null;
        }
      }
    },

    setDefaultValue: function( y, x, number ) {
      var div = document.querySelector('#block-' + y + '-' + x);
      this.grid[y][x] = parseInt(number, 10);
      div.innerHTML = number;
      div.classList.add('default');
    },

    createBlock: function( parentElement, y, x ) {
      var div = document.createElement('div');
      div.id = 'block-' + y + '-' + x;
      div.classList.add('block');
      div.setAttribute('y', y);
      div.setAttribute('x', x);
      parentElement.appendChild(div);
      return div;
    },

    createLine: function() {
      var div = document.createElement('div');
      document.querySelector('#main').appendChild(div);
      div.classList.add('line');
      return div;
    },

    markAsError: function( y, x ) {
      var div = document.querySelector('#block-' + y + '-' + x);
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

    drawBlock: function( y, x, number ) {
      var div = document.querySelector('#block-' + y + '-' + x);
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
      var x, y, columns = this.getColumns();
      // Checking horizontal lines
      for (x = 0; x < this.grid.length; x += 1) {
        try {
          this.checkForDuplicates(this.grid[x]);
        } catch (e) {
          console.log(e);
          this.markAsError(x, e.item);
          this.abort = true;
        }
      }

      // Checking vertical lines
      for (y = 0; y < columns.length; y += 1) {
        try {
          this.checkForDuplicates(columns[y]);
        } catch (e) {
          console.log(e);
          this.markAsError(e.item, y);
          this.abort = true;
        }
      }

      console.log('.. seems valid');
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

    getVerticalLine: function( y ) {
      var x, column = [];
      for (x = 0; x < this.grid.length; x += 1) {
        column.push(this.grid[x][y]);
      }
      return column;
    },

    getColumns: function() {
      var x, columns = [[],[],[],[],[],[],[],[],[]];
      for (x = 0; x < this.grid.length; x += 1) {
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
      return columns;
    },

    getBlockAtIndex: function( index ) {
      var block;
      switch (index) {
        case 0: block = this.checkBlock({start:0, stop:3}, {start:0, stop:3}); break;
        case 1: block = this.checkBlock({start:0, stop:3}, {start:3, stop:6}); break;
        case 2: block = this.checkBlock({start:0, stop:3}, {start:6, stop:9}); break;
        case 3: block = this.checkBlock({start:3, stop:6}, {start:0, stop:3}); break;
        case 4: block = this.checkBlock({start:3, stop:6}, {start:3, stop:6}); break;
        case 5: block = this.checkBlock({start:3, stop:6}, {start:6, stop:9}); break;
        case 6: block = this.checkBlock({start:6, stop:9}, {start:0, stop:3}); break;
        case 7: block = this.checkBlock({start:6, stop:9}, {start:3, stop:6}); break;
        case 8: block = this.checkBlock({start:6, stop:9}, {start:6, stop:9}); break;
      }
      return block;
    },

    markAsSolved: function( y, i, number ) {
      console.info('solved number (%i) at position [%i/%i]', number, y, i);
      this.grid[y][i] = number;
      this.drawBlock(y, i, number);
      this.stuck = false;
    },

    getCurrentBlock: function( y, x ) {
      var index;
      if (y >= 0 && y <= 2) {
        if (x >= 0 && x <= 2) index = 0;
        else if (x >= 3 && x <= 5) index = 1;
        else if (x >= 6 && x <= 8) index = 2;
      } else if (y >= 3 && y <= 5) {
        if (x >= 0 && x <= 2) index = 3;
        else if (x >= 3 && x <= 5) index = 4;
        else if (x >= 6 && x <= 8) index = 5;
      } else if (y >= 6 && y <= 8) {
        if (x >= 0 && x <= 2) index = 6;
        else if (x >= 3 && x <= 5) index = 7;
        else if (x >= 6 && x <= 8) index = 8;
      }
      return index;
    },

    getBlockNumbers: function( section, block ) {
      var c, numbers = [];
      for (c = section; c < block.length; c += 1) {
        numbers = numbers.concat(block[c]);
      }
      return numbers;
    },

    doesVerticalSquareLineContain: function( y, number ) {
      var verticalLine = this.getVerticalLine(y),
        index = verticalLine.indexOf(number);
      if (index !== -1) return index;
      return false;
    },

    doesHorizontalSquareLineContain: function( x, number ) {
      var horizontalLine = this.grid[x],
        index = horizontalLine.indexOf(number);
      if (index !== -1) return index;
      return false;
    },

    doesBlockContain: function( blockIndex, number ) {
      var block = this.getBlockNumbers(0, this.getBlockAtIndex(blockIndex)),
        index = block.indexOf(number);
      if (index !== -1) return index;
      return false;
    },

    solveHorizontalLinesWithOneUnknown: function() {
      console.log('checking horizontal lines with one unknown ..');
      var empty, index, unknown;
      for (var i = 0; i < this.grid.length; i += 1) {
        empty = this.filter(this.grid[i]);
        if (empty.length === 1) {
          index = this.grid[i].indexOf(null);
          unknown = this.diff(this.ARRAY, this.grid[i])[0];
          this.markAsSolved(i, index, unknown);
        }
      }
    },

    solveHorizontalLinesWithTwoUnknown:function() {
      console.log('checking horizontal lines with two unknown ..');
      var y, i, e, u, empty, indices = [], index, unknownList, excluded, unknown;
      solved:
        for (y = 0; y < this.grid.length; y += 1) {
          empty = this.filter(this.grid[y]);
          if (empty.length === 2) {
            unknownList = this.diff(this.ARRAY, this.grid[y]);
            for (e = 0; e < this.grid[y].length; e += 1) {
              if (this.grid[y][e] === null) indices.push(e);
            }
            //console.log('LIST OF UNKNOWN: ', unknownList);
            //console.log('INDICES: ', indices);
            for (i = 0; i < indices.length; i += 1) {
              index = indices[i];
              //console.log('CHECK INDEX: %i at block position %i/%i', index, y, index);
              for (u = 0; u < unknownList.length; u += 1) {
                //console.log('CHECK FOR UNKNOWN: ', unknownList[u]);
                excluded = this.doesVerticalSquareLineContain(index, unknownList[u]);
                if (excluded !== false) {
                  //console.log('VERTICAL LINE CONTAINS: ', unknownList[u]);
                  unknownList.splice(u, 1);
                  unknown = unknownList[0];
                  //console.log('OTHER NUMBER IS: ', unknown);
                  //console.log('COLUMN: ', y);
                  //console.log('INDEX: ', index);
                  this.markAsSolved(y, index, unknown);
                  break solved;
                }
                excluded = this.doesBlockContain(this.getCurrentBlock(y, index), unknownList[u]);
                if (excluded !== false) {
                  //console.log('BLOCK CONTAINS NUMBER: ', unknownList[u]);
                  unknownList.splice(u, 1);
                  unknown = unknownList[0];
                  this.markAsSolved(y, index, unknown);
                  break solved;
                }
              }
            }
          }
        }
    },

    solveHorizontalLinesWithThreeUnknown: function() {
      console.log('checking horizontal lines with three unknown ..');
      var y, e, u, empty, indices, index, unknownList, possible;
      solved:
        for (y = 0; y < this.grid.length; y += 1) {
          empty = this.filter(this.grid[y]);
          if (empty.length === 3) {
            unknownList = this.diff(this.ARRAY, this.grid[y]);
            indices = [];
            for (e = 0; e < this.grid[y].length; e += 1) {
              if (this.grid[y][e] === null) indices.push(e);
            }

            // TODO: in case
            // for each index
            //    for each unknown
            //        check if possible
            //            if possible values are 1 / solved

            for (u = 0; u < unknownList.length; u += 1) {
              possible = [];
              for (index = 0; index < indices.length; index += 1) {
                if (!(this.doesVerticalSquareLineContain(indices[index], unknownList[u])) && !(this.doesBlockContain(this.getCurrentBlock(y, indices[index]), unknownList[u]))) {
                  possible.push({index:indices[index], unknown:unknownList[u]});
                }
              }
              if (possible.length === 1) {
                this.markAsSolved(y, possible[0].index, possible[0].unknown);
                break solved;
              }
            }
          }
        }
    },

    solveVerticalLinesWithOneUnknown: function() {
      console.log('checking vertical lines with one unknown ..');
      var empty, index, unknown, columns = this.getColumns();
      for (var i = 0; i < columns.length; i += 1) {
        empty = this.filter(columns[i]);
        if (empty.length === 1) {
          index = columns[i].indexOf(null);
          unknown = this.diff(this.ARRAY, columns[i])[0];
          this.markAsSolved(index, i, unknown);
        }
      }
    },

    solveVerticalLinesWithTwoUnknown: function() {
      console.log('checking vertical lines with two unknown ..');
      var i, e, u, empty, index, indices = [], excluded, unknown, unknownList, columns = this.getColumns();
      solved:
        for (var x = 0; x < columns.length; x += 1) {
          empty = this.filter(columns[x]);
          if (empty.length === 2) {
            unknownList = this.diff(this.ARRAY, columns[x]);
            for (e = 0; e < columns[x].length; e += 1) {
              if (columns[x][e] === null) indices.push(e);
            }
            for (i = 0; i < indices.length; i += 1) {
              index = indices[i];
              for (u = 0; u < unknownList.length; u += 1) {
                excluded = this.doesHorizontalSquareLineContain(index, unknownList[u]);
                if (excluded !== false) {
                  unknownList.splice(u, 1);
                  unknown = unknownList[0];
                  this.markAsSolved(index, x, unknown);
                  break solved;
                }
                excluded = this.doesBlockContain(this.getCurrentBlock(index, x), unknownList[u]);
                if (excluded !== false) {
                  unknownList.splice(u, 1);
                  unknown = unknownList[0];
                  this.markAsSolved(index, x, unknown);
                  break solved;
                }
              }
            }
          }
        }
    },

    checkBlock: function( Y, X ) {
      var y, x, block = [];
      for (y = Y.start; y < Y.stop; y += 1) {
        block[y] = [];
        for (x = X.start; x < X.stop; x += 1) {
          block[y][x] = this.grid[y][x];
        }
      }
      return block;
    },

    solveBlocksWithOneUnknown: function() {
      console.log('checking blocks with one unknown ..');
      var i, c, block, empty, full, unknown, index, section;
      // iterate over all blocks
      for (i = 0; i < 9; i += 1) {
        empty = []; // Reset empty array
        full = []; // Reset full array
        block = this.getBlockAtIndex(i);

        if (i >= 0 && i <= 2) section = 0;
        if (i >= 3 && i <= 5) section = 3;
        if (i >= 6 && i <= 8) section = 6;

        full = this.getBlockNumbers(section, block);
        empty = this.filter(full);
        if (empty.length === 1) {
          unknown = this.diff(this.ARRAY, full)[0];
          for (c = section; c < block.length; c += 1) {
            index = block[c].indexOf(null);
            if (index !== -1) {
              this.markAsSolved(c, index, unknown);
            }
          }
        }
      }
    },

    solveBlocksWithUnknown: function( limit ) {
      console.log("solving blocks with %i unknown ..", limit);
      var i, y, x, e, c, u, block, empty, full, unknown, indices, index, section, possible, unknownList;
      // iterate over all blocks
      solved:
        for (i = 0; i < 9; i += 1) {
          empty = []; // Reset empty array
          full = []; // Reset full array
          block = this.getBlockAtIndex(i);

          switch (i) {
            case 0: section = {y:{start:0, stop:3}, x:{start:0, stop:3}}; break;
            case 1: section = {y:{start:0, stop:3}, x:{start:3, stop:6}}; break;
            case 2: section = {y:{start:0, stop:3}, x:{start:6, stop:9}}; break;
            case 3: section = {y:{start:3, stop:6}, x:{start:0, stop:3}}; break;
            case 4: section = {y:{start:3, stop:6}, x:{start:3, stop:6}}; break;
            case 5: section = {y:{start:3, stop:6}, x:{start:6, stop:9}}; break;
            case 6: section = {y:{start:6, stop:9}, x:{start:0, stop:3}}; break;
            case 7: section = {y:{start:6, stop:9}, x:{start:3, stop:6}}; break;
            case 8: section = {y:{start:6, stop:9}, x:{start:6, stop:9}}; break;
          }

          full = this.getBlockNumbers(section.y.start, block);
          empty = this.filter(full);

          if (empty.length === limit) {
            //console.log('BLOCK INDEX: ', i);
            //console.log('FULL: ', full);
            //console.log('EMPTY: ', empty);

            unknownList = this.diff(this.ARRAY, full);

            //console.log("UNKNOWN LIST: ", unknownList);

            for (u = 0; u < unknownList.length; u += 1) {
              //console.log('CHECK FOR NUMBER: ', unknownList[u]);
              indices = [];


              //console.log('BLOCK 2', block);
              for (y = section.y.start; y < section.y.stop; y += 1) {
                for (x = section.x.start; x < section.x.stop; x +=1 ) {
                  //console.log('BLOCK: (%i/%i) ', y, x);
                  if (this.grid[y][x] === null) indices.push({y:y,x:x});
                }
                //if (block[x][e] === null) indices.push(e);
              }

              //console.log('INDICES: ', indices);

              possible = [];
              for (index = 0; index < indices.length; index += 1) {
                if (this.doesVerticalSquareLineContain(indices[index].x, unknownList[u]) === false && this.doesHorizontalSquareLineContain(indices[index].y, unknownList[u]) === false) {
                  possible.push({y:indices[index].y, x:indices[index].x, unknown:unknownList[u]});
                }
              }

              if (possible.length === 1) {
                console.log('SOLVED: number %i at position %i/%i', possible[0].unknown, possible[0].y, possible[0].x);
                this.markAsSolved(possible[0].y, possible[0].x, possible[0].unknown);
                break solved;
              }
            }
          }
        }
    },

    solve: function() {
      if (this.abort) return false;
      console.log('solving ..\n');
      this.attempts = 0;
      while (this.stuck === false) {
        this.attempts += 1;
        console.groupCollapsed('attempt: %i', this.attempts);
        this.stuck = true;
        this.solveHorizontalLinesWithOneUnknown();
        this.solveVerticalLinesWithOneUnknown();
        this.solveBlocksWithOneUnknown();
        this.solveHorizontalLinesWithTwoUnknown();
        this.solveVerticalLinesWithTwoUnknown();
        this.solveHorizontalLinesWithThreeUnknown();
        //this.solveVerticalLinesWithThreeUnknown();
        this.solveBlocksWithUnknown(2);
        this.solveBlocksWithUnknown(3);
        this.solveBlocksWithUnknown(4);
        this.solveBlocksWithUnknown(5);
        this.solveBlocksWithUnknown(6);
        this.solveBlocksWithUnknown(7);
        this.solveBlocksWithUnknown(8);
        this.solveBlocksWithUnknown(9);
        console.groupEnd();
      }

      this.validate(); // Validate when finished solving

      console.log('GRID: ', this.grid);

      if (this.stuck) console.log('\nstuck ..');
    }

  };


  window.Matrix = Matrix;

}());
