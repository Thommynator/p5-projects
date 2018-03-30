/**
 * Creates a list of several pendulums, which form a wave and synch over time.
 * The "cycleTime" parameter defines, after how many periods, the pendulums will
 * be synched again. 
 */

var origin = new p5.Vector(300, 15);
var pends = [];
var t = 0;
var cycleTime = 16.0; // pendulums are lined up, after this amount of periods

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);

	// amount of different pendulums
  var nPendulums = 15;
  for (var i=0; i<nPendulums; i++) {
    pends.push(new Pendulum(computeLength(cycleTime+i, height-(height*0.1)), map(i,0,nPendulums,18,4)));
  }
}

function draw() {
  background(30);
  fill(100);
  ellipse(origin.x, origin.y, 4, 4);
  for (i=0; i<pends.length; i++) {
    pends[i].updateAngle(t);
    pends[i].show();
  }

  t += 0.5;
}

function computeLength(T, maxL) {
  return maxL*pow(cycleTime/T, 2);
}