(function () {
  var Board = window.Board || {};

  Board = window.Board = function (gridSize) {
    this.snake = new Snake([[15,10]]);
    // this.snake2 = new Snake();
    this.gridSize = gridSize;
    this.grid = Board.setupGrid(gridSize);
    this.gameOver = false;
  };

  Board.setupGrid = function(size){
    var grid = new Array(size);

    for (var i = 0; i < grid.length; i++) {
      grid[i] = new Array(size);
    }

    return grid;
  };

  Board.prototype.update = function (){
    if (!this.justEaten) {
      this.checkGameOver();
    }

    this.justEaten = false;
    this.snake.move();
  };

  Board.prototype.checkGameOver = function () {
    for (var j = 1; j < this.snake.segments.length; j++) {
      if (this.snake.segments[j].join() === this.snake.segments[0].join()) {
        this.gameOver = true;
      }
    }
  };

  Board.prototype.render = function(){
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = ".";
      }
    }

    var board = this;

    this.snake.segments.forEach( function (coord) {
      var coordX = coord[0];
      var coordY = coord[1];
      if (board.grid[coordX]) {
        board.grid[coordX][coordY] = "S";
      }
    });

    return this.grid;
  };
})();
