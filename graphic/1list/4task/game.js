var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

// ctx.strokeStyle = "rgb(255,255,255)";
ctx.lineWidth = 3;

var sin=Math.sin;
var cos=Math.cos;
var log=Math.log;
var Pi=Math.PI;


var xrotate= function (x,y, angle){
    return(x*cos(angle)-y*sin(angle));
}

var yrotate= function (x,y, angle){
    return(y*cos(angle)+x*sin(angle));
}

var rpixel=0.005;
var rminx=-rpixel*ctx.canvas.width/2; 
var rmaxx= rpixel*ctx.canvas.width/2;
var rminy=-rpixel*ctx.canvas.height/2;
var rmaxy= rpixel*ctx.canvas.height/2;

var posx = x => (x - rminx) / (rmaxx - rminx) *(ctx.canvas.width);
var posy = y => ctx.canvas.height - (y - rminy) / (rmaxy - rminy) *(ctx.canvas.height);

var pos = {x: 0, y: 0, z: 0};
var walls = [[1, 1, 1, 0.2]];

var keys = {w: false, s: false, a: false, d: false, space: false};
var speed = 4;
var endpoint = 200;


var screen_z= 0.0;

var eyeDistance=7;
var eye=[-eyeDistance/2, 0, 40];

var ALPHA = (Pi);
var BETA = -(Pi);


var rputline = function(ctx, x1, y1, x2, y2){
    [x1, y1] = [posx(x1), posy(y1)];
    [x2, y2] = [posx(x2), posy(y2)];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

var perspective= function(eyex, eyez, screen_z, x,z){
    return( eyex+(screen_z-eyez)*(x-eyex)/(z-eyez) );
}


var drawLine = function (x1, y1, z1, x2, y2, z2) {
    var fz0, ffz0, fx1, fy1, fz1, ffx2, ffy2, ffz2;

    z1 -= pos.z +1;
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

var drawCube = function(x1, y1, z1, x2, y2, z2){
    drawLine(x1, y1, z1, x2, y1, z1);
    drawLine(x1, y1, z1, x1, y1, z2);
    drawLine(x2, y1, z1, x2, y1, z2);
    drawLine(x1, y1, z2, x2, y1, z2);

    drawLine(x1, y1, z1, x1, y2, z1);
    drawLine(x1, y1, z2, x1, y2, z2);
    drawLine(x2, y1, z1, x2, y2, z1);
    drawLine(x2, y1, z2, x2, y2, z2);

    drawLine(x1, y2, z1, x2, y2, z1);
    drawLine(x1, y2, z1, x1, y2, z2);
    drawLine(x2, y2, z1, x2, y2, z2);
    drawLine(x1, y2, z2, x2, y2, z2);
}

var drawCubeByMiddle = function(x, y, z, radius){
    ctx.strokeStyle = "rgb(0,0,0)";
    drawCube(x -radius, y - radius, z - 10*radius, x+ radius, y + radius, z + 10*radius);
}


var drawCircle = function(){
    const r = 0.2;
    const length = 4;
    
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";

    drawCube(pos.x - r, pos.y - r, pos.z, pos.x + r, pos.y + r, pos.z - length);
    
    ctx.stroke();
}


var collision = function(x, y, z, r) { 
    console.log("pos: ", posx(pos.x), posy(pos.y), pos.z);
    console.log("wall: ", x, y, z, r);
    if (pos.x > x - r && pos.x < x + r) {
        if (pos.z > z - r && pos.z < z + r) {
            if (pos.y > y - r  && pos.y < y + r) {
                return true;
            }
        }
    }
    return false;
}



var clearScreen= function(ctx, bgColorString) {
    ctx.globalCompositeOperation="source-over";
    ctx.fillStyle=bgColorString;
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height );
}



function reset() {
    pos = {x: 0, y: 0, z: 0};
    walls = [];
    keys = {w: false, s: false, a: false, d: false, space: false};
    speed = 4;
}

var generateWalls = function () {
    for (let i in [0,1,2,3,4,5,6]) {
        // if (walls.length > 4) {
        //     walls.shift();
        // }
        if (Math.random() > 0.5) {
            let r = (x, y) => x + Math.random() * (y - x);
            walls.push([r(-2, 2), r(1, -0.5), pos.z + 20, r(0.2, 0.5)]);
        }   
    }
}

var drawWalls = function () {
    for(w of walls){
        drawCubeByMiddle(...w);
    }
}

var redraw = function(){
    if (keys.space && pos.z <= endpoint){
        pos.z += speed;
    }
    if (keys.w && pos.y >= -1.5) {
        pos.y -= 0.1;
    }
    if (keys.s && pos.y <= 1.5) {
        pos.y += 0.1;
    }
    if (keys.a && pos.x >= -1.5) {
        pos.x -= 0.1;
    }
    if (keys.d && pos.x <= 1.5) {
        pos.x += 0.1;
    }

    if(pos.z >= endpoint){
        alert("You win!");
        reset()
    }

    for (w of walls) {
        if (collision(...w)) {
            alert('game over');
            reset();
        }
    }

    for (w of walls) {
        if (w[2] <= pos.z - 20) {
            let idx = walls.indexOf(w);
            walls.splice(idx, 1);
        }
    }
    if(walls.length < 2){
        generateWalls();
    }

    clearScreen(ctx, '#DDDDDD');
    drawWalls();
    drawCircle();

}


var keyCallbackDown = function(e) {
    const rotStep = Pi / 36; // 5 degrees 

    var code = e.which || e.keyCode;
    switch(code) {
        case 87: // W
            e.preventDefault();
            keys.w = true;
            break;
        case 83: // S
            e.preventDefault();
            keys.s = true;
            break;
        case 65: // A
            e.preventDefault();
            keys.a = true;
            break;
        case 68: // D
            e.preventDefault();
            keys.d = true;
            break;
        case 32: // Space
            e.preventDefault();
            keys.space = true;
            break;
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
    };
    redraw();
}

var keyCallbackUp = function (e) {
    var code = e.which || e.keyCode;
    switch (code) {
        case 87: // W
            e.preventDefault();
            keys.w = false;
            break;
        case 83: // S
            e.preventDefault();
            keys.s = false;
            break;
        case 65: // A
            e.preventDefault();
            keys.a = false;
            break;
        case 68: // D
            e.preventDefault();
            keys.d = false;
            break;
        case 32: // Space
            e.preventDefault();
            keys.space = false;
            break;
    };
}


ctx.beginPath();
redraw();
ctx.stroke();

onkeyup = keyCallbackUp;
onkeydown = keyCallbackDown