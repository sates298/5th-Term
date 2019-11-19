function dgrToRad(dgr){
    return dgr*Pi/180;
}

function click() {
    var args = cmd.value.split(" ");
    var idx = -1;
    for (let index = 0; index < COMMANDS.length; index++) {
        if(COMMANDS[index].localeCompare(args[0].toUpperCase()) == 0){
            idx = index;
            break;
        }
    }
    if(idx < 0){
        return;
    }
    if(idx < 4){
        cmdArray[idx](parseInt(args[1]));
    }else{
        cmdArray[idx]();
    }
    ctx.stroke();
}

//functions for commands
var cmdArray = [
    function(s) {
        var x = turtleX - cos(turtleAngle)*s;
        var y = turtleY - sin(turtleAngle)*s;
        if(isDrawing){
            ctx.lineTo(x, y)
        }else{
            ctx.moveTo(x, y);
        }
        turtleX = x;
        turtleY = y;
    },
    function(s){
        var x = turtleX - cos(Pi + turtleAngle)*s;
        var y = turtleY - sin(Pi + turtleAngle)*s
        if(isDrawing){
            ctx.lineTo(x, y)
        }else{
            ctx.moveTo(x, y);
        }
        turtleX = x;
        turtleY = y;
    },
    function(dgr){
        turtleAngle = (turtleAngle + dgrToRad(dgr));
    },
    function(dgr){
        turtleAngle = (turtleAngle - dgrToRad(dgr));
    },
    function(){
        isDrawing = false;
    },
    function(){
        isDrawing = true;
    }
];


//constants and variables
var isDrawing = true;

var COMMANDS = [
    "FORWARD",
    "BACK", 
    "RIGHT", 
    "LEFT", 
    "PENUP",
    "PENDOWN"
];

var cos = Math.cos;
var sin = Math.sin;
var Pi = Math.PI;


var canvas = document.getElementById("canv");
var cmd = document.getElementById("command");
var ctx = canvas.getContext("2d");

var turtleX = canvas.width/2;
var turtleY = canvas.height/2;
var turtleAngle = 0;

//setup
ctx.moveTo(turtleX, turtleY);

var butt = document.getElementById("goButton");
butt.onclick = click;