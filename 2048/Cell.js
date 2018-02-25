function Cell(rowIdx, colIdx) {
	this.rowIdx = rowIdx
	this.colIdx = colIdx
	this.base = 2
	this.exponent = 0
	
	this.setExponent = function(val) {
		this.exponent = val
	}
	
	this.getValue = function() {
		if(this.exponent) {
			return pow(this.base, this.exponent) 
		} else {
			return ''
		}
	}
	
	this.getColor = function() {
		// color for empty fields
		if(!this.exponent) {
			return color(100, 100, 100)	
		}
		
		// color for "number" fields
		let colors = [
			color(100, 200, 100),
			color(70, 50, 100),
			color(150,100, 20),
			color(200, 100, 100),
			color(100, 100, 200),
			color(100, 200, 200),
			color(200, 10, 60),
			color(70, 150, 200),
			color(40, 60, 100),
			color(150, 40, 220),
			color(155, 15, 200),
			color(80, 20, 140),
			color(10, 240, 120)
		]
		return colors[this.exponent % colors.length]
	}
	
	this.show = function() {
		// rectangle
		stroke(200)
		strokeWeight(2)
		fill(this.getColor())
		rect(this.colIdx * cellSize, this.rowIdx * cellSize, cellSize, cellSize)
		colorMode(RGB)
		
		// text
		textAlign(CENTER)
		textStyle(BOLD)
		textSize(cellSize/3)
		fill(255)
		stroke(0)
		text(this.getValue(), this.colIdx*cellSize + cellSize/2, this.rowIdx*cellSize + cellSize/2 + 0.15*cellSize)
	}
}