//constants and variables
var canvas = document.getElementById("canv");
var cmd = document.getElementById("command");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 2; // line width



var pi = 3.1415; // value for pi (Math.PI not working for Math.sin(Math.PI))
var sin = Math.sin;
var cos = Math.cos;
var log = Math.log;

var perspective = (eyex, eyez, screen_z, x, z) => (eyex + (screen_z - eyez) * (x - eyex) / (z - eyez));

var xrotate = (x, y, angle) => (x * cos(angle) - y * sin(angle));
var yrotate = (x, y, angle) => (y * cos(angle) + x * sin(angle));

var rpixel = 0.005; // size of pixel
var rminx = -rpixel * ctx.canvas.width / 2;
var rmaxx = rpixel * ctx.canvas.width / 2;
var rminy = -rpixel * ctx.canvas.height / 2;
var rmaxy = rpixel * ctx.canvas.height / 2;

var rx = x => (x - rminx) / (rmaxx - rminx) * (canvas.width);
var ry = y => canvas.height - (y - rminy) / (rmaxy - rminy) * (canvas.height);

// parameters for stereoscopy
var eyeDistance = 7;
var leftEye;
var rightEye;
var screen_z = 0.0;
var rightColor;
var leftColor;

// current mode (mono or stereo)
var mode;

// camera angle
var ALPHA = -2.9 * pi;//pi / 6;
var BETA = pi / 6;

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

class Turtle3D {
    constructor() {
        this.pos = { x: 0, y: 0, z: 0 };
        this.lines = [];
        this.angleXZ = 0;
        this.angleXY = 0;
        this.isDrawing = true;
    }

    dgrToRad(dgr) {
        return dgr * pi / 180;
    }

    forward(s) {
        var d = s * cos(this.angleXZ);
        var newX = this.pos.x + d * sin(this.angleXY);
        var newY = this.pos.y + d * cos(this.angleXY);
        var newZ = this.pos.z + s * sin(this.angleXZ);

        if (this.isDrawing) {
            this.lines.push([this.pos.x, this.pos.y, this.pos.z, newX, newY, newZ]);
        }
        this.pos = { x: newX, y: newY, z: newZ };
    }
    back(s) {
        var d = s * cos(this.angleXZ);
        var newX = this.pos.x - d * sin(this.angleXY);
        var newY = this.pos.y - d * cos(this.angleXY);
        var newZ = this.pos.z - s * sin(this.angleXZ);

        if (this.isDrawing) {
            this.lines.push([this.pos.x, this.pos.y, this.pos.z, newX, newY, newZ]);
        }
        this.pos = { x: newX, y: newY, z: newZ };
    }
    right(dgr) {
        this.angleXY += this.dgrToRad(dgr);
    }
    left(dgr) {
        this.angleXY -= this.dgrToRad(dgr);
    }
    up(dgr) {
        this.angleXZ += this.dgrToRad(dgr);
    }
    down(dgr) {
        this.angleXZ -= this.dgrToRad(dgr);
    }
    penUp() {
        this.isDrawing = false;
    }
    penDown() {
        this.isDrawing = true;
    }
    

    reset() {
        this.pos = { x: 0, y: 0, z: 0 };
        this.lines = [];
        this.angleXZ = 0;
        this.angleXY = 0;
        this.isDrawing = true;
    }

}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke(); 
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function rputline(ctx, x1, y1, x2, y2) {
    [x1, y1] = [rx(x1), ry(y1)];
    [x2, y2] = [rx(x2), ry(y2)];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function setStereo() {
    mode = 1;
    leftEye = {x: -eyeDistance / 2, y: 0, z: 40};
    rightEye = {x: eyeDistance / 2, y: 0, z: 40};
    rightColor = '#F00000';
    leftColor = '#00FFFF';
}

function setMono() {
    mode = 0;
    leftEye = rightEye = {x: 0, y: 0, z: 40};
    rightColor = leftColor = '#000000';
}

function toggle() {
    mode == 0 ? setStereo() : setMono();
}

function draw(ctx, colorString, eye) { 
    ctx.strokeStyle = colorString;
    ctx.lineWidth = 3;

    function putLine(x1, y1, z1, x2, y2, z2) {
        var fx1 = xrotate(-x1, -z1, ALPHA)
        var fz1 = yrotate(-x1, -z1, ALPHA)

        var ffz1 = xrotate(fz1, y1, BETA)
        var fy1 = yrotate(fz1, y1, BETA)

        var fx2 = xrotate(-x2, -z2, ALPHA) 
        var fz2 = yrotate(-x2, -z2, ALPHA)
        var ffz2 = xrotate(fz2, y2, BETA)
        var fy2 = yrotate(fz2, y2, BETA)

        var finx1 = perspective(eye.x, eye.z, screen_z, fx1, ffz1)
        var finy1 = perspective(eye.y, eye.z, screen_z, fy1, ffz1)
        var finx2 = perspective(eye.x, eye.z, screen_z, fx2, ffz2)
        var finy2 = perspective(eye.y, eye.z, screen_z, fy2, ffz2)

        rputline(ctx, finx1, finy1, finx2, finy2);
    }

     for (l of commonTurtle.lines) {
        putLine(l[0], l[1], l[2], l[3], l[4], l[5]);
    }
}

function redraw() {
    clearScreen(ctx, '#DDDDDD');
    if (mode == 1) {
        draw(ctx, leftColor, leftEye);
        draw(ctx, rightColor, rightEye);
    } else {
        draw(ctx, leftColor, leftEye);
    }
}

var commonTurtle = new Turtle3D();

var keyCallbackDown = function (e) {
    const rotStep = pi / 36; // 5 degrees 

    var code = e.which || e.keyCode;
    switch (code) {
        case 38: // up
            e.preventDefault();
            BETA += rotStep;
            break;
        case 40: // down
            e.preventDefault();
            BETA -= rotStep;
            break;
        case 37: // left
            e.preventDefault();
            ALPHA += rotStep;
            break;
        case 39:// right
            e.preventDefault();
            ALPHA -= rotStep;
            break;
        case 77: // M
            e.preventDefault();
            toggle();
            break;
        case 9: // Tab
            e.preventDefault();
            leftColor = (rightColor => rightColor)(rightColor, rightColor = leftColor);
            break;
    };
    redraw();
}


var click = function () {
    var args = cmd.value.split(" ");
    var idx = -1;
    for (let index = 0; index < COMMANDS.length; index++) {
        if (COMMANDS[index].localeCompare(args[0].toUpperCase()) == 0) {
            idx = index;
            break;
        }
    }
    if (idx < 0) {
        return;
    }
    console.log(idx);
    switch (idx) {
        case 0:
            commonTurtle.forward(args[1])
            break;
        case 1:
            commonTurtle.back(args[1])
            break;
        case 2:
            commonTurtle.right(args[1])
            break;
        case 3:
            commonTurtle.left(args[1])
            break;
        case 4:
            commonTurtle.up(args[1])
            break;
        case 5:
            commonTurtle.down(args[1])
            break;
        case 6:
            commonTurtle.penUp()
            break;
        case 7:
            commonTurtle.penDown()
            break;
        default:
            break;
    }
    redraw();
}

setMono()
redraw()
var butt = document.getElementById("goButton");
butt.onclick = click;
onkeydown = keyCallbackDown


