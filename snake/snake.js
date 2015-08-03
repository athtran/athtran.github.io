(function () {
  var Snake = window.Snake || {};

  Snake = window.Snake = function () {
    this.dir = "N";
    this.segments = [[15,10], [15,11], [15,12]];
    this.eatenApple = false;
  };

  Snake.prototype.move = function () {
    this.eatenApple = Coord.plus(this.segments, this.dir, this.eatenApple);
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

  Coord.plus = function (segments, dir, eatenApple) {
    var newHead = segments[0].slice(0);
    if (eatenApple === false) {
      segments.pop();
    } else {
      eatenApple = false;
    }
    switch(dir) {
      case "N":
        newHead[0] -= 1;
        break;
      case "S":
        newHead[0] += 1;
        break;
      case "E":
        newHead[1] += 1;
        break;
      case "W":
        newHead[1] -= 1;
        break;
    }
    // debugger;
    segments.unshift(newHead);
    return eatenApple;
  };

  Coord.equals = function (coord1, coord2) {
    return coord1.join() === coord2.join();
  };

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
