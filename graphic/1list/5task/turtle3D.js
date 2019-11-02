//constants and variables
var canvas = document.getElementById("canv");
var cmd = document.getElementById("command");
var ctx = canvas.getContext("2d");

var isDrawing = true;

var COMMANDS = [
    "FORWARD",
    "BACK", 
    "RIGHT", 
    "LEFT",
    "UP",
    "DOWN", 
    "PENUP",
    "PENDOWN"
];

cmdArray = [
    function(turtle, s) {
        var newX =  turtle.pos.x + s * cos(turtle.angleXY) * cos(turtle.angleXZ);
        var newY =  turtle.pos.y + s * sin(turtle.angleXY) * cos(turtle.angleXZ);
        var newZ =  turtle.pos.z + s * cos(turtle.angleXZ) ;

        if (isDrawing) {
            turtle.points.push([turtle.pos.x, turtle.pos.y, turtle.pos.z, newX, newY, newZ]);
        }
        turtle.pos = {x: newX, y: newY, z: newZ};
        console.log(this.pos);
    },
    function(turtle, s){
        var newX =  turtle.pos.x - s * cos(turtle.angleXY) * cos(turtle.angleXZ);
        var newY =  turtle.pos.y - s * sin(turtle.angleXY) * cos(turtle.angleXZ);
        var newZ =  turtle.pos.z - s * cos(turtle.angleXZ) ;

        if (isDrawing) {
            turtle.points.push([turtle.pos.x, turtle.pos.y, turtle.pos.z, newX, newY, newZ]);
        }
        turtle.pos = {x: newX, y: newY, z: newZ};
    },
    function(turtle, dgr){
        turtle.angleXY += dgrToRad(dgr);
    },
    function(turtle, dgr){
        turtle.angleXY -= dgrToRad(dgr);
    },
    function(turtle, dgr){
        turtle.angleXZ += dgrToRad(dgr);
    },
    function(turtle, dgr){
        turtle.angleXZ -= dgrToRad(dgr);
    },
    function(){
        isDrawing = false;
    },
    function(){
        isDrawing = true;
    }
];

var cos = Math.cos;
var sin = Math.sin;
var Pi = Math.PI;


var rpixel=0.005;
var rminx=-rpixel*ctx.canvas.width/2; 
var rmaxx= rpixel*ctx.canvas.width/2;
var rminy=-rpixel*ctx.canvas.height/2;
var rmaxy= rpixel*ctx.canvas.height/2;


var screen_z= 0.0;

var eyeDistance=7;
var eye=[-eyeDistance/2, 0, 40];


var ALPHA = 0;
var BETA = 0;

class Turtle3D{
    constructor(){
        this.pos = {x: 0, y: 0, z: 0};
        this.points = [[0,0,0,0,0,0]];
        this.angleXZ = 0;
        this.angleXY = 0;
        this.isDrawing = true;
    }

    posx = x => (x - rminx) / (rmaxx - rminx) *(ctx.canvas.width);
    posy = y => ctx.canvas.height - (y - rminy) / (rmaxy - rminy) *(ctx.canvas.height);

    xrotate= function (x,y, angle){
        return(x*cos(angle)-y*sin(angle));
    }
    
    yrotate= function (x,y, angle){
        return(y*cos(angle)+x*sin(angle));
    }

    rputline = function(ctx, x1, y1, x2, y2){
        [x1, y1] = [posx(x1), posy(y1)];
        [x2, y2] = [posx(x2), posy(y2)];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    perspective= function(eyex, eyez, screen_z, x,z){
        return( eyex+(screen_z-eyez)*(x-eyex)/(z-eyez) );
    }

    drawLine = function (x1, y1, z1, x2, y2, z2) {
        var fz0, ffz0, fx1, fy1, fz1, ffx2, ffy2, ffz2;
    
        z1 -= pos.z + 1;
        z2 -= pos.z + 1;
        
        fx1 = xrotate(-x1, -z1, ALPHA);
        fz0 = yrotate(-x1, -z1, ALPHA);
    
        fz1 = xrotate(fz0, y1, BETA);
        fy1 = yrotate(fz0, y1, BETA);
    
        ffx2 = xrotate(-x2, -z2, ALPHA);
        ffz0 = yrotate(-x2, -z2, ALPHA);
    
        ffz2 = xrotate(ffz0, y2, BETA);
        ffy2 = yrotate(ffz0, y2, BETA);
    
        var finx1 = perspective(eye[0], eye[2], screen_z, fx1, fz1);
        var finy1 = perspective(eye[1], eye[2], screen_z, fy1, fz1);
        var finx2 = perspective(eye[0], eye[2], screen_z, ffx2, ffz2);
        var finy2 = perspective(eye[1], eye[2], screen_z, ffy2, ffz2);
    
        rputline(ctx, finx1, finy1, finx2, finy2);
    }

    redraw = function () {
        clearScreen(ctx, 'rgb(255,255,255)');
        for (l of this.points) {
            putLine(l[0], l[1], l[2], l[3], l[4], l[5]);
        }
    } 

    
}

function dgrToRad(dgr){
    return dgr*Pi/180;
}

var clearScreen= function(ctx, bgColorString) {
    ctx.globalCompositeOperation="source-over";
    ctx.fillStyle=bgColorString;
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height );
}

var commonTurtle = new Turtle3D();

var keyCallbackDown = function(e) {
    const rotStep = Pi / 36; // 5 degrees 

    var code = e.which || e.keyCode;
    switch(code) {
        case 38: // up
            e.preventDefault();
            commonTurtle.BETA += rotStep;
            break;
        case 40: // down
            e.preventDefault();
            commonTurtle.BETA -= rotStep;
            break;
        case 37: // left
            e.preventDefault();
            commonTurtle.ALPHA += rotStep;
            break;
        case 39:// right
            e.preventDefault();
            commonTurtle.ALPHA -= rotStep;
            break;
    };
    commonTurtle.redraw();
}


var click = function () {
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
    if(idx < 6){
        cmdArray[idx](commonTurtle, parseInt(args[1]));
    }else{
        cmdArray[idx]();
    }
    commonTurtle.redraw();
}


ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2);

var butt = document.getElementById("goButton");
butt.onclick = click;


