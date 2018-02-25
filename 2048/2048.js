var hCells = 5	// change amount of horizonral cells here
var vCells = 5	// change amount of vertical cells here
let cellSize = 80	// cell size in pixel
var counter
var grid

function setup() {
	createCanvas(hCells*cellSize, vCells*cellSize)
	restart()
}

function draw() {
	drawGrid()
	drawCounter()
	drawSprites()
}

function restart() {
	initGrid()
	drawGrid()
	newNumber()
	newNumber()
	counter = 0
}

// control inputs
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
		moveLeft()
    newNumber()
	}
	else if (keyCode === RIGHT_ARROW) {
    moveRight()
		newNumber()
	}
	else if (keyCode === UP_ARROW) {
    moveUp()
		newNumber()
	}
	else if (keyCode === DOWN_ARROW) {
    moveDown()
		newNumber()
	}
}

function initGrid() {
	grid = []
	for(var r=0; r < vCells; r++) {
		var row = []
		for(var c=0; c < hCells; c++) {
			row.push(new Cell(r, c))
		}
		grid.push(row)
	}
}

function drawGrid() {
	for(var r=0; r<vCells; r++){
		for(var c=0; c<hCells; c++){
			grid[r][c].show()	
		}
	}
}

function drawCounter() {
	textAlign(LEFT)
	textSize(cellSize/6)
	fill(255)
	stroke(0)
	textStyle(ITALIC)
	text(counter, 5, 15)
}

function drawExplosion(cell) {
	let xPos = cell.colIdx * cellSize + cellSize/2
	let yPos = cell.rowIdx * cellSize + cellSize/2
			
	for (var i = 0; i < 40; i++) {
    var newParticle = createSprite(xPos, yPos, 10, 10);
    newParticle.shapeColor = color(255, 50);
    newParticle.rotationSpeed = random(-1, 1) * 360 / 60;
    newParticle.addSpeed(random(1, 3), random(360));
    newParticle.life = floor(random(30, 60));
  }
}

function newNumber() {
	counter += 1
	var emptyCells = []
	for(var r=0; r<vCells; r++){
		for(var c=0; c<hCells; c++){
			let cell = grid[r][c]
			if(!cell.exponent) {
				emptyCells.push(cell)
			}
		}
	}
	if(emptyCells.length > 0) {
		let rndCell = emptyCells[floor(random(emptyCells.length))]
		grid[rndCell.rowIdx][rndCell.colIdx].setExponent(random(1) < 0.6 ? 1 : 2)
	} else {
		// restart game
		restart()
	}
}

/**
 * Move all cells to the left if possible.
 * Equal cells are merged and the value is increased.
 */
function moveLeft() {
	for(var r=0; r<vCells; r++){
		for(var c=1; c<hCells; c++){
			moveCellLeft(grid[r][c])
		}
	}
}

function moveCellLeft(cell) {
	// if cell is not one of the most left cells
	if(cell.colIdx > 0) {
		// if left neighbor cell is empty
		if(!grid[cell.rowIdx][cell.colIdx-1].exponent) {
			grid[cell.rowIdx][cell.colIdx-1].exponent = cell.exponent
			grid[cell.rowIdx][cell.colIdx].exponent = 0
			moveCellLeft(grid[cell.rowIdx][cell.colIdx-1])
		}
		// if neighboring cells are euqal
		else if (grid[cell.rowIdx][cell.colIdx-1].exponent == cell.exponent) {
			grid[cell.rowIdx][cell.colIdx].exponent = 0
			grid[cell.rowIdx][cell.colIdx-1].exponent += 1
			let xPos = grid[cell.rowIdx][cell.colIdx-1].colIdx * cellSize + cellSize/2
			let yPos = grid[cell.rowIdx][cell.colIdx-1].rowIdx * cellSize + cellSize/2
			drawExplosion(grid[cell.rowIdx][cell.colIdx-1])
		}
	}
}

/**
 * Move all cells to the right if possible.
 * Equal cells are merged and the value is increased.
 */
function moveRight() {
	for(var r=0; r<vCells; r++){
		for(var c=hCells-2; c>=0; c--){
			moveCellRight(grid[r][c])
		}
	}
}

function moveCellRight(cell) {
	// if cell is not one of the most right cells
	if(cell.colIdx < (hCells-1)) {
		// if right neighbor cell is empty
		if(!grid[cell.rowIdx][cell.colIdx+1].exponent) {
			grid[cell.rowIdx][cell.colIdx+1].exponent = cell.exponent
			grid[cell.rowIdx][cell.colIdx].exponent = 0
			moveCellRight(grid[cell.rowIdx][cell.colIdx+1])
		} 
		else if (grid[cell.rowIdx][cell.colIdx+1].exponent == cell.exponent) {
			// if left neighbor cell is equal to current cell
			grid[cell.rowIdx][cell.colIdx].exponent = 0
			grid[cell.rowIdx][cell.colIdx+1].exponent += 1
			drawExplosion(grid[cell.rowIdx][cell.colIdx+1])
		}
	}
}

/**
 * Move all cells up if possible.
 * Equal cells are merged and the value is increased.
 */
function moveUp() {
	for(var r=1; r<vCells; r++){
		for(var c=0; c<hCells; c++){
			moveCellUp(grid[r][c])
		}
	}
}

function moveCellUp(cell) {
	// if cell is not one of the most upward cells
	if(cell.rowIdx > 0) {
		// if upward neighbor cell is empty
		if(!grid[cell.rowIdx-1][cell.colIdx].exponent) {
			grid[cell.rowIdx-1][cell.colIdx].exponent = cell.exponent
			grid[cell.rowIdx][cell.colIdx].exponent = 0
			moveCellUp(grid[cell.rowIdx-1][cell.colIdx])
		} 
		else if (grid[cell.rowIdx-1][cell.colIdx].exponent == cell.exponent) {
			// if upward neighbor cell is equal to current cell
			grid[cell.rowIdx][cell.colIdx].exponent = 0
			grid[cell.rowIdx-1][cell.colIdx].exponent += 1
			drawExplosion(grid[cell.rowIdx-1][cell.colIdx])
		}
	}
}

/**
 * Move all cells down if possible.
 * Equal cells are merged and the value is increased.
 */
function moveDown() {
	for(var r=vCells-2; r>=0; r--){
		for(var c=0; c<hCells; c++){
			moveCellDown(grid[r][c])
		}
	}
}

function moveCellDown(cell) {
	// if cell is not one of the bottom cells
	if(cell.rowIdx < (vCells-1)) {
		// if bottom neighbor cell is empty
		if(!grid[cell.rowIdx+1][cell.colIdx].exponent) {
			grid[cell.rowIdx+1][cell.colIdx].exponent = cell.exponent
			grid[cell.rowIdx][cell.colIdx].exponent = 0
			moveCellDown(grid[cell.rowIdx+1][cell.colIdx])
		} 
		else if (grid[cell.rowIdx+1][cell.colIdx].exponent == cell.exponent) {
			// if bottom neighbor cell is equal to current cell
			grid[cell.rowIdx][cell.colIdx].exponent = 0
			grid[cell.rowIdx+1][cell.colIdx].exponent += 1
			drawExplosion(grid[cell.rowIdx+1][cell.colIdx])
		}
	}
}