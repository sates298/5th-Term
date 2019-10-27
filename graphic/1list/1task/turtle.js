function drawTurtle(){
    var h = 15;
    var base = 30;
    turtleDgr = turtleDgr%(2*Pi);

    ctx.lineTo(turtleX + (base/2) *cos(Pi/2 - turtleDgr), turtleY + (base/2)*cos(turtleDgr));
    ctx.lineTo(turtleX + cos(turtleDgr)*h, turtleY + sin(turtleDgr)*h);
    ctx.lineTo(turtleX - (base/2) *cos(Pi/2 + turtleDgr), turtleY - (base/2)*sin(Pi/2 + turtleDgr));
    ctx.lineTo(turtleX, turtleY);
    ctx.stroke();
}

function getCommand(){
    var args = cmd.value.split(" ");
    args.forEach(element => {
        element = element.toUpperCase;
    });

}

function click() {
    
    getCommand();
    
    
    ctx.stroke();
}

var cmdArray = [
    function(s) {
        var x = cos(Pi + turtleDgr)*s;
        var y = sin(Pi + turtleDgr)*s
        ctx.lineTo(x, y)
        drawTurtle();
    },
    function(s){
        var x = cos(turtleDgr)*s;
        var y = sin(turtleDgr)*s
        ctx.lineTo(x, y)
        drawTurtle();
    },
    function(dgr){
        turtleDgr = (turtleDgr + dgr)%(2*Pi); // rad to dgr and dgr to rad
        drawTurtle();
    },
    function(dgr){
        turtleDgr = (turtleDgr - dgr)%(2*Pi);
        drawTurtle();
    }
];

var COMMANDS = [
    "FORWARD",
    "BACK", 
    "RIGHT", 
    "LEFT", 
    "SQUARE", 
    "RECTANGLE", 
    "CIRCLE"
];

var cos = Math.cos;
var sin = Math.sin;
var tg = Math.tan;
var ctg = Math.ctg;
var Pi = Math.PI;


var canvas = document.getElementById("canv");
var cmd = document.getElementById("command");
var ctx = canvas.getContext("2d");

var turtleX = canvas.width/2;
var turtleY = canvas.height/2;
var turtleDgr =;


ctx.moveTo(turtleX, turtleY);
drawTurtle();
ctx.fillText(cos(turtleDgr),100, 100 );
var butt = document.getElementById("goButton");
butt.onclick = click;
