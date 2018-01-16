var nInitialCellsProb = 0.4;
var cellcreateCanvas = 10;
var rows;
var cols;
var cellsAlive = [];
var newGeneration = [];
var it = 0;

function setup() {
  var myCanvas = createCanvas(500, 500);
  myCanvas.parent("GameOfLife");
  background(255);
  rows = height / cellcreateCanvas;
  cols = width / cellcreateCanvas;
  initializeGrid();
}

function draw() {
  // rules
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var n = countLivingNeighbors(y, x);
      var idx = convertRowCol2Idx(y, x);

      // 1. a dead cell, which has exactly 3 living neighbors will be alive in the next generation
      if (!cellsAlive[idx] && n == 3) {
        newGeneration[idx] = true;
      }

      // 2. a living cell, which has less than 2 living neighbors will die in the next generation
      if (cellsAlive[idx] && n < 2) {
        newGeneration[idx] = false;
      }

      // 3. a living cell, which has 2 or 3 living neighbors will stay alive in the next generation
      if (cellsAlive[idx] && (n == 2 || n == 3)) {
        newGeneration[idx] = true;
      }

      // 4. a living cell, which has more than 3 living cells will die in the next generation
      if (cellsAlive[idx] && n > 3) {
        newGeneration[idx] = false;
      }
    }
  }

  cellsAlive = newGeneration.slice(0);
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      if (cellsAlive[convertRowCol2Idx(y, x)]) {
        fill(0, 255, 0);
      } else {
        fill(50, 50, 50);
      }
      rect(x * cellcreateCanvas, y * cellcreateCanvas, cellcreateCanvas, cellcreateCanvas);
    }
  }

  if (mouseIsPressed) {
    initializeGrid();
  }
}

/**
 * Choose a cell, defined by row and col and count its alive neighbors.
 */
function countLivingNeighbors(row, col) {
  var c = 0;

  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      // if checkcell is equal to center cell
      if (i == 0 && j == 0) {
        continue;
      }
      // if check cell is outside of grid
      if (col + j < 0 || col + j >= cols || row + i < 0 || row + i >= rows) {
        continue;
      }
      if (cellsAlive[convertRowCol2Idx(row + i, col + j)]) {
        c++;
      }
    }
  }
  return c;
}

/**
 * Convert a row & col index varo an 1-dimensional array index.
 */
function convertRowCol2Idx(row, col) {
  return col + row * cols;
}


/**
 * Initialize a new grid
 */
function initializeGrid() {
  cellsAlive = [];
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      if (random(1) > nInitialCellsProb) {
        cellsAlive.push(true);
      } else {
        cellsAlive.push(false);
      }
    }
  }
  newGeneration = cellsAlive.slice(0);
}