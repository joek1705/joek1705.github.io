/**
 *
 * @param {number} size is a positive integer
 */
function GameBoard(size) {
  this.size = size;
  this.BoardArray = new Array(size);

  /*
  In order to faciliate movement functionality
  within the board there is a dedicated square that moves.
  This square is initially placed in the bottom right corner
  */
  this.MovingSquare;

  this.init = function () {
    this.MovingSquare = [size - 1, size - 1];
    let count = size;
    for (var i = 0; i < size; i++) {
      this.BoardArray[i] = new Array(size);
      let indx = 0;
      // The inner loop fills in the cells so that their values increase from left to right and top to bottom
      for (var j = count - size + 1; j <= count; j++) {
        this.BoardArray[i][indx] = j;
        indx += 1;
      }
      count += size;
    }
  };

  /**
   * Finds the adjacent squares of the square located in (row,col)
   * I.E those squares that are in the same row or column as the given square
   * @param {number} row is a positive integer
   * @param {number} col is a positive integer
   */
  this.findAdjacent = function (row, col) {
    let AdjacentSquares = [];

    //square is located in last row
    if (row === this.size - 1) {
      if (col === this.size - 1) {
        AdjacentSquares.push([row - 1, col]);
        AdjacentSquares.push([row, col - 1]);
      } else if (col === 0) {
        AdjacentSquares.push([row - 1, col]);
        AdjacentSquares.push([row, col + 1]);
      } else {
        AdjacentSquares.push([row - 1, col]);
        AdjacentSquares.push([row, col - 1]);
        AdjacentSquares.push([row, col + 1]);
      }
    } else if (row === 0) {
      //here the square is located in the first row
      if (col === this.size - 1) {
        AdjacentSquares.push([row + 1, col]);
        AdjacentSquares.push([row, col - 1]);
      } else if (col === 0) {
        AdjacentSquares.push([row + 1, col]);
        AdjacentSquares.push([row, col + 1]);
      } else {
        AdjacentSquares.push([row + 1, col]);
        AdjacentSquares.push([row, col - 1]);
        AdjacentSquares.push([row, col + 1]);
      }
    } else {
      //in this block the square is not located in the first nor last row
      if (col === 0) {
        AdjacentSquares.push([row, col + 1]);
        AdjacentSquares.push([row - 1, col]);
        AdjacentSquares.push([row + 1, col]);
      } else if (col === this.size - 1) {
        AdjacentSquares.push([row, col - 1]);
        AdjacentSquares.push([row - 1, col]);
        AdjacentSquares.push([row + 1, col]);
      } else {
        AdjacentSquares.push([row, col - 1]);
        AdjacentSquares.push([row, col + 1]);
        AdjacentSquares.push([row - 1, col]);
        AdjacentSquares.push([row + 1, col]);
      }
    }
    return AdjacentSquares;
  };

  this.swapSquares = function (FirstRow, FirstCol, SecondRow, SecondCol) {
    let temp = this.BoardArray[FirstRow][FirstCol];
    this.BoardArray[FirstRow][FirstCol] = this.BoardArray[SecondRow][SecondCol];
    this.BoardArray[SecondRow][SecondCol] = temp;
  };

  /**
   * if the given square is adjacent to the moving square, their values are swapped
   * @param {number} row
   * @param {number} col
   */
  this.MoveSquare = function (row, col) {
    let adjacents = this.findAdjacent(row, col);
    let moved = false;
    adjacents.forEach((element) => {
      // check if an adjacent square has the value of the moving square
      if (this.BoardArray[element[0]][element[1]] === this.size * this.size) {
        this.swapSquares(row, col, element[0], element[1]);
        moved = [element[0], element[1]];
      }
    });
    return moved;
  };

  /**
   * Randomly moves the moving square a give number of times
   * @param {Number} NumberOfShuffles
   */
  this.shuffleBoard = function (NumberOfShuffles) {
    while (NumberOfShuffles > 0) {
      let CurrRow = this.MovingSquare[0];
      let CurrCol = this.MovingSquare[1];
      let adjacents = this.findAdjacent(CurrRow, CurrCol);
      let NewPos = adjacents[Math.floor(Math.random() * adjacents.length)];
      this.swapSquares(NewPos[0], NewPos[1], CurrRow, CurrCol);
      this.MovingSquare[0] = NewPos[0];
      this.MovingSquare[1] = NewPos[1];
      NumberOfShuffles -= 1;
    }
  };

  this.done = function () {
    let squareCount = 1;
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (squareCount++ !== this.BoardArray[row][col]) {
          return false;
        }
      }
    }
    return true;
  };

  /**
   * Utility function for printing the gameboard's contents
   */
  this.print = function () {
    this.BoardArray.forEach((element) => {
      console.log(element);
    });
  };
}
