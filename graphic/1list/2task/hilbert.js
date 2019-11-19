class HilbertCurve {
    constructor(level, context) {
        this.ctx = context;
        this.turtleAngle = Math.PI/2;
        this.level = level;
        this.range = this.ctx.canvas.width / Math.pow(2, level);
        this.turtleX = this.range / 2;
        this.turtleY = this.ctx.canvas.height - this.range / 2;
    }


    forward() {
        this.turtleX -= Math.cos(this.turtleAngle) * this.range;
        this.turtleY -= Math.sin(this.turtleAngle) * this.range;

        this.ctx.lineTo(this.turtleX, this.turtleY)
    }

    turnRight(angle) {
        this.turtleAngle -= angle;
    }

    turnLeft(angle) {
        this.turtleAngle += angle;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.range / 2, this.ctx.canvas.height - this.range / 2);

        this.drawOnePart(this.level, Math.PI/2);
        this.ctx.stroke();
    }

    drawOnePart(n, angle){
        if (n <=0) return;

        this.turnLeft(angle);
        this.drawOnePart(n-1, -angle);
        this.forward();
        this.turnRight(angle);
        this.drawOnePart(n-1, angle);
        this.forward();
        this.drawOnePart(n-1, angle);
        this.turnRight(angle);
        this.forward();
        this.drawOnePart(n-1, -angle);
        this.turnLeft(angle);
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

