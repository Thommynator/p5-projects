new p5()

var bars = []
var barWidth = 15
var maxDist
var angleOffset

function setup() {
  var myCanvas = createCanvas(400, 400)
  myCanvas.parent("ColorBars")
  rectMode(CENTER)
  angleMode(DEGREES)
  colorMode(HSB, 100)

  angleOffset = 0
  maxDist = ceil(dist(0, 0, width, height))

  for (var i = 0; i < height / barWidth; i++) {
    for (var j = 0; j < width / barWidth; j++) {
      bars.push(new Bar(i, j))
    }
  }
}

function draw() {
  background(0, 0, 0)
  angleOffset = (angleOffset + 2) % 360
  for (var i = 0; i < bars.length; i++) {
    bars[i].setAngle(newAngle(bars[i]))
    bars[i].show()
  }
}

function distanceFactor(bar) {
  var distance = dist(mouseX, mouseY, bar.position.x, bar.position.y)
  var factor = map(distance, 0, maxDist, 0.8, 0)
  return factor
}

function newAngle(bar) {
  var xDiff = mouseX - bar.position.x
  var yDiff = mouseY - bar.position.y
  var angle = ((atan2(yDiff, xDiff) + 360) % 360)
  var angleDiff = angle - bar.angle

  if (angleDiff < -180) {
    angleDiff += 360
  }
  if (angleDiff > 180) {
    angleDiff -= 360
  }

  var thres = 20
  if (angleDiff > thres) {
    angleDiff = thres
  } else if (angleDiff < -thres) {
    angleDiff = -thres
  }

  angle = bar.angle + distanceFactor(bar) * angleDiff
  return angle
}


function Bar(x, y) {
  this.angle = 0
  this.w = barWidth
  this.h = 3
  this.position = createVector(x * this.w, y * this.w)
  this.id = x + y * (width / barWidth)

  this.show = function() {
    var interval = 360
    var value = (this.angle + angleOffset) % interval
    var hueValue = map(value, 0, interval, 0, 100)
    var clr = color(hueValue, 60, 100, 50)
    push()
    translate(this.position.x, this.position.y)
    rotate(this.angle)
    fill(clr)
    noStroke()
    rect(0, 0, 1.3 * this.w, this.h)
    pop()
  }

  this.setAngle = function(angle) {
    this.angle = (angle % 360)
    if (this.angle < 0) {
      this.angle += 360
    }
  }
}