(function () {
  var Board = window.Board || {};

  Board = window.Board = function (gridSize) {
    this.gridSize = gridSize;
    this.grid = Board.setupGrid(gridSize);
    this.snake = new Snake([[Math.floor(gridSize/2),Math.floor(gridSize/4)]], "E", gridSize, false);
    this.snake2 = new Snake([[Math.floor(gridSize/2),Math.floor(gridSize*3/4)]], "W", gridSize, this.grid);
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
    this.checkGameOver();

    if (this.snake.boost) {
      this.snake.boost = this.snake.boost - 1;
      this.snake.move();
    }

    if (Math.random()*100 < 2) {
      this.snake2.addBoost();
    }

    if (this.snake2.boost) {
      this.snake2.boost = this.snake2.boost - 1;
      this.snake2.move();
    }

    this.snake.move();
    this.snake2.move();
  };


  Board.prototype.checkGameOver = function () {
    for (var j = 1; j < this.snake.segments.length; j++) {
      if (this.snake.segments[j].join() === this.snake.segments[0].join()) {
        this.gameOver = true; // snake2 wins
        this.winner = 1;
      } else if (this.snake.segments[j].join() === this.snake2.segments[0].join() ) {
        this.gameOver = true; //snake1 wins
        this.winner = 2;
      }
    }

    for (var i = 1; i < this.snake2.segments.length; i++) {
      if (this.snake2.segments[i].join() === this.snake.segments[0].join() ){
        this.gameOver = true; //snake 2 wins
      } else if (this.snake2.segments[i].join() === this.snake2.segments[0].join() ) {
        this.gameOver = true; //snake1 wins
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

    this.snake2.segments.forEach( function (coord) {
      var coordX = coord[0];
      var coordY = coord[1];
      if (board.grid[coordX]) {
        board.grid[coordX][coordY] = "A";
      }
    });

    return this.grid;
  };
})();
