(function(){

  function DuplicateItemError( errorMessage, listItem ) {
    return {msg:errorMessage, item:listItem};
  }

  function Matrix( x, y ) {
    this.x = x;
    this.y = y;
    this.init();
    this.prefill();
    this.draw();
    this.validate();
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
          }
        }
      }
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
      //var tempHorizontalItemsList;
      //var tempVerticalItemsList;
      for (x = 0; x < this.grid.length; x += 1) {
        // Checking horizontal lines
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

      for (y = 0; y < columns.length; y += 1) {
        // Checking vertical lines
        try {
          this.checkForDuplicates(columns[y]);
        } catch (e) {
          console.log(e);
          $('#block-' + e.item + '-' + y).css('background', 'red');
          return false;
        }
      }

      console.log('Seems valid.');
      return true;
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

      //this.grid[0][7] = 8; // REMOVE (just a test)
      //this.grid[3][5] = 5; // REMOVE (just a test)
      //this.grid[6][0] = 8; // REMOVE (just a test)
    }
  };



  new Matrix(9, 9);

}());