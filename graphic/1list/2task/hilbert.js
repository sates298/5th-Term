class HilbertCurve {
    constructor(level, context) {
        this.ctx = context;
        this.turtleAngle = 0;
        this.range = this.ctx.canvas.width / Math.pow(2, level);
        this.turtleX = this.range / 2;
        this.turtleY = this.range / 2;
    }


    forward() {
        this.turtleX -= Math.cos(this.turtleAngle) * this.range;
        this.turtleY -= Math.sin(this.turtleAngle) * this.range;

        this.ctx.lineTo(this.turtleX, this.turtleY)
    }

    turnRight() {
        this.turtleAngle += Math.PI/2;
    }

    turnLeft() {
        this.turtleAngle -= Math.PI/2;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();

        this.forward();
        this.turnRight();
        this.forward();
        this.turnRight();
        this.forward();
        this.turnRight();
        // this.drawOnePart();
        this.ctx.stroke();
        console.log("weszło")
    }

    drawOnePart(){
        this.forward();
        this.turnRight();
        this.forward();
        this.turnRight();
        this.forward();
        this.turnRight();
    }

}

function createHilbert(canvas, level) {
    var canvas = document.getElementById("canv");
    var lvl = document.getElementById("level");

    var hilbert = new HilbertCurve(lvl.value, canvas.getContext("2d"));
    console.log(hilbert.range, hilbert.turtleX, hilbert.turtleY);

    hilbert.draw();
}


var button = document.getElementById("okButton");
button.onclick = createHilbert;

