var canvas = document.getElementById("canv");
var cmd = document.getElementById("command");
var ctx = canvas.getContext("2d");

var turtleX = canvas.width/2;
var turtleY = canvas.height/2;
var turtleAngle = 0;

ctx.beginPath();
ctx.moveTo(turtleX, turtleY);

var cos = Math.cos;
var sin = Math.sin;
var Pi = Math.PI;

function dgrToRad(dgr){
    return dgr*Pi/180;
}

var cmdArray = [
    function(s) {
        var x = turtleX - cos(turtleAngle)*s;
        var y = turtleY - sin(turtleAngle)*s;
            
        ctx.lineTo(x, y)
        
        turtleX = x;
        turtleY = y;
    },
    function(s){
        var x = turtleX - cos(Pi + turtleAngle)*s;
        var y = turtleY - sin(Pi + turtleAngle)*s
        
        ctx.lineTo(x, y)
        
        turtleX = x;
        turtleY = y;
    },
    function(dgr){
        turtleAngle = (turtleAngle + dgrToRad(dgr));
    },
    function(dgr){
        turtleAngle = (turtleAngle - dgrToRad(dgr));
    }
];




function clear() {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    turtleX = canvas.width/2;
    turtleY = canvas.height/2;
    turtleAngle = 0;
    ctx.beginPath();
    ctx.moveTo(turtleX, turtleY);
}

function square(){
    for (let index = 0; index < 4; index++) {
        cmdArray[0](50);
        cmdArray[2](90);
    }
    ctx.stroke();

}

function rectangle(){
    for (let index = 0; index < 2; index++) {
        cmdArray[0](50);
        cmdArray[2](90);
        cmdArray[0](100);
        cmdArray[2](90);
    }


    ctx.stroke();
}

function pentagon(){
    for (let index = 0; index < 5; index++) {
        cmdArray[0](50);
        cmdArray[2](72);
    }

    ctx.stroke();
}

function hexagon() {
    for (let index = 0; index < 6; index++) {
        cmdArray[0](50);
        cmdArray[2](60);
    }

    ctx.stroke();
}

function circle() {
    for (let index = 0; index < 360; index++) {
        cmdArray[0](1);
        cmdArray[2](1);
    }
    ctx.stroke();
}

document.getElementById("clear").onclick = clear;
document.getElementById("square").onclick = square;
document.getElementById("rectangle").onclick = rectangle;
document.getElementById("pentagon").onclick = pentagon;
document.getElementById("hexagon").onclick = hexagon;
document.getElementById("circle").onclick = circle;
