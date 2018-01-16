function Pendulum (pendulumLength, radius) {
    this.l = pendulumLength;
    this.phi = 0;
    this.r = radius;
    this.increaseAngle = true;
    this.range = 0.4;
    this.clr = color(map(this.l, 0, 500, 80,240));


	this.show = function() {
		fill(this.clr);
		stroke(150, 128);
		line(origin.x, origin.y, (this.l-this.r)*sin(this.phi) + width/2, (this.l-this.r)*cos(this.phi));
		stroke(0);
		ellipse(this.l*sin(this.phi) + width/2, this.l*cos(this.phi), this.r*2, this.r*2);
	}

		this.updateAngle = function(t) {
		var omega = sqrt(9.81/this.l);
		this.phi = this.range * sin(omega*t);
	}
}