var hue
var saturation
var val
var trainingsData = []

// var brain = require('brain.js')
// var net = new brain.NeuralNetwork()

function setup() {
    colorMode(HSB);
    createCanvas(600, 600);
}

function draw() {

    net.train(trainingsData)

    frameRate(5)
    saturation = 255
    hue = map(mouseX, 0, width, 0, 360);
    val = map(mouseY, height, 0, 0, 100);
    background(hue, saturation, val);

    var netOutput = net.run({h: hue, s: saturation, v: val}) 
    console.log(netOutput)
    var clr = color(0, 0, 255)
    fill(clr)
    textSize(48);
    text('EXAMPLE', 180, 300);
    // console.log(hue, saturation, val)
}

function keyReleased() {
    var currentColor = { h: hue / 360, s: saturation / 255, v: val / 255 }
    if (key == 'g' || key == 'G') { trainingsData.push({ input: currentColor, output: { white: 1 } }) }
    if (key == 'b' || key == 'B') { trainingsData.push({ input: currentColor, output: { black: 1 } }) }
    console.log(trainingsData)
}