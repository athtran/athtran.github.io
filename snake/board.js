(function () {
  var Board = window.Board || {};

  Board = window.Board = function (gridSize) {
    this.snake = new Snake();
    this.gridSize = gridSize;
    this.grid = Board.setupGrid(gridSize);
    this.apple = Board.generateApple(this.snake);
    this.applesEaten = 0;
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

    this.snake.move();
    if (this.snake.segments[0].join() === this.apple.join()) {
      this.snake.eatenApple = true;
      this.applesEaten += 1;
      this.apple = Board.generateApple(this.snake);
    }
  };

  Board.prototype.checkGameOver = function () {
    // if (this.snake.segments[0][0] < 0                   ||
    //     this.snake.segments[0][0] > (this.gridSize - 1) ||
    //     this.snake.segments[0][1] < 0                   ||
    //     this.snake.segments[0][1] > (this.gridSize - 1)) {
    //   this.gameOver = true;
    // }
    for (var i = 1; i < this.snake.segments.length; i++) {
      if (this.snake.segments[i].join() === this.snake.segments[0].join()) {
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

    board.grid[this.apple[0]][this.apple[1]] = "A";

    return this.grid;
  };

  Board.generateApple = function (snake){
    var newApple = Board.randomApple();
    while (Board.checkApple(newApple, snake) === false) {
      newApple = Board.randomApple();
    }

    return newApple;
  };

  Board.randomApple = function (){
    return [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
  };

  Board.checkApple = function (apple, snake) {
    for (var i = 0; i < snake.segments.length; i++) {
      if (apple.join() === snake.segments[i].join()){
        return false;
      }
    }

    return true;
  };
})();
