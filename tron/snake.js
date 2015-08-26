(function () {
  var Snake = window.Snake || {};

  DECISION_DIRS = {
    "N" : { 'left': 'W', 'right': 'E' },
    "W" : { 'left': 'S', 'right': 'N' },
    "S" : { 'left': 'E', 'right': 'W' },
    "E" : { 'left': 'N', 'right': 'S' }
  };

  OPPOSITE_DIRS = {
    "N" : "S",
    "S" : "N",
    "W" : "E",
    "E" : "W"
  }

  Snake = window.Snake = function (segments, dir, gridSize, grid) {
    this.dir = dir;
    this.segments = segments;
    this.eatenApple = false;
    this.gridSize = gridSize;
    this.grid = grid;
  };

  Snake.prototype.move = function () {
    if (this.grid) {
      this.dir = this.computerMove();
    }
    Coord.plus(this.segments, this.dir, this.gridSize);
  };

  Snake.CalculateAreaLeft = function (pos, dir, grid) {
    newPos = Coord.plus([pos], dir, grid.length);
    var y = 1;
    while (grid[newPos[0]][newPos[1]] === '.' && y < 30){
      newPos = Coord.plus([newPos], dir, grid.length);
      y ++;
    }
    var x = 1;
    newPos = Coord.plus([newPos], OPPOSITE_DIRS[dir], grid.length);
    newPos = Coord.plus([newPos], DECISION_DIRS[dir].left, grid.length);
    while (grid[newPos[0]][newPos[1]] === '.' && x < 30){
      newPos = Coord.plus([newPos], DECISION_DIRS[dir].left, grid.length);
      x ++;
    }

    return x*y;
  },

  Snake.CalculateAreaRight = function (pos, dir, grid) {
    newPos = Coord.plus([pos], dir, grid.length);
    var y = 1;
    while (grid[newPos[0]][newPos[1]] === '.' && y < 30){
      newPos = Coord.plus([newPos], dir, grid.length);
      y ++;
    }
    var x = 1;
    newPos = Coord.plus([newPos], OPPOSITE_DIRS[dir], grid.length);
    newPos = Coord.plus([newPos], DECISION_DIRS[dir].right, grid.length);
    while (grid[newPos[0]][newPos[1]] === '.' && x < 30){
      newPos = Coord.plus([newPos], DECISION_DIRS[dir].right, grid.length);
      x ++;
    }

    return x*y;
  },

  Snake.prototype.computerMove = function () {
    newPos = Coord.plus(this.segments.slice(0, 1), this.dir, this.gridSize) ;
    if (this.grid[newPos[0]][newPos[1]] === 'S' || this.grid[newPos[0]][newPos[1]] === "A"){
      var left = Snake.CalculateAreaLeft(this.segments.slice(0)[0], DECISION_DIRS[this.dir].left, this.grid);
      var right = Snake.CalculateAreaRight(this.segments.slice(0)[0], DECISION_DIRS[this.dir].right, this.grid);

      if (left > right) {
        return DECISION_DIRS[this.dir].left;
      } else {
        return DECISION_DIRS[this.dir].right;
      }
    }
    return this.dir;
  };


  Snake.prototype.turn = function (dir) {
    var nDir = Coord.dir(dir);
    if ([this.segments[0][0] + nDir[0], this.segments[0][1] + nDir[1]].join() === this.segments[1].join()) {

    } else {
      this.dir = dir;
    }

  };

  function Coord () {
  }

  Coord.dir = function (dir) {
    switch(dir) {
      case "N":
        return [-1,0];
      case "S":
        return [1,0];
      case "E":
        return [0,1];
      case "W":
        return [0,-1];
    }
  };

  Coord.plus = function (segments, dir, gridSize) {
    var newHead = segments[0].slice(0);
    switch(dir) {
      case "N":
        newHead[0] -= 1;
        if (newHead[0] == -1) { newHead[0] = gridSize - 1; }
        break;
      case "S":
        newHead[0] += 1;
        if (newHead[0] == gridSize) { newHead[0] = 0; }
        break;
      case "E":
        newHead[1] += 1;
        if (newHead[1] == gridSize) { newHead[1] = 0; }
        break;
      case "W":
        newHead[1] -= 1;
        if (newHead[1] == -1) { newHead[1] = gridSize - 1; }
        break;
    }
    segments.unshift(newHead);
    return newHead;
  };
  //
  // Coord.equals = function (coord1, coord2) {
  //   return coord1.join() === coord2.join();
  // };

  OPPOSITE = {
    "N": "S",
    "S": "N",
    "E": "W",
    "W": "E"
  };

  Coord.isOpposite = function (dir1, dir2) {
    return OPPOSITE[dir1] === dir2;
  };

})();
