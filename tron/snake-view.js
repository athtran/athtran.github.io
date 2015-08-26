(function () {
  var View = window.View || {};

  KEYS = {
          65: "W",
          83: "S",
          68: "E",
          87: "N"
         };

  KEYS2 = {
          37: "W",
          40: "S",
          39: "E",
          38: "N"
         };


  View = window.View = function(size, $el, speed){
    this.size = size;
    this.board = new Board(size);
    this.speed = speed;
    this.$el = $el;
    this.setupGrid();
    this.renderBoard();
    this.buttonDown = false;
    $(window).on("keydown", this.keyBinding.bind(this));

    this.timerID = 0;
    this.timerID = window.setInterval(this.step.bind(this), speed);

  };

  View.prototype.step = function (){
    if (this.board.gameOver) {
      window.clearInterval(this.timerID);
      this.timerID = null;
      this.renderGameOver();
    } else {
      this.board.update();
      this.renderBoard();
    }
  };

  View.prototype.setupGrid = function () {
    for (var i = 0; i < this.board.gridSize; i++) {
      var $ul = $("<ul>");
      for (var j = 0; j < this.board.gridSize; j++) {
        var $li = $("<li>").attr("x-pos", i).attr("y-pos", j);
        $ul.append($li);
      }

      this.$el.append($ul);
    }
  };

  View.prototype.renderBoard = function () {
    var boardRendering = this.board.render();
    $lis = this.$el.children().children();
    for (var i = 0; i < $lis.length; i++) {
      if (boardRendering[+$lis.eq(i).attr("x-pos")][+$lis.eq(i).attr("y-pos")] === "S") {
        $lis.eq(i).addClass("snake");
      } else if (boardRendering[+$lis.eq(i).attr("x-pos")][+$lis.eq(i).attr("y-pos")] === "A") {
        $lis.eq(i).addClass("apple");
      } else {
        $lis.eq(i).removeClass("snake apple");
      }
    }
  };

  View.prototype.renderGameOver = function () {
    var $gameOverMessage = $('<div>').addClass("game-over");
    this.$el.append($gameOverMessage);
  };

  View.prototype.restartGame = function () {
    this.$el.empty();
    this.setupGrid();
    this.board = new Board(this.size);
    if (!this.timerID) {
      this.timerID = window.setInterval(this.step.bind(this), this.speed);
    }
  };

  View.prototype.keyBinding = function (event) {
    var newDir = KEYS[event.keyCode];
    var newDir2 = KEYS2[event.keyCode];
    if (newDir) { this.board.snake.turn(newDir); }
    if (newDir2) { this.board.snake2.turn(newDir2); }
    if (event.keyCode == 82) {
      this.restartGame();
    }
  };
})();
