var canvas = document.getElementById('canv');
var gl = canvas.getContext('webgl');
gl.clearColor(0.9,0.9,0.8,1);
gl.clear(gl.COLOR_BUFFER_BIT);


// glsl vertex shader code
const vertCode = `
attribute vec3 coordinates;
uniform vec3 translation;

attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

void main(void) {
    gl_Position = vec4(coordinates.xyz + translation.xyz, 1.0);
    gl_PointSize = 10.0;
    vTextureCoord = aTextureCoord;
}`;

// glsl fragment shader code
const fragCode = `
precision highp float;
uniform vec4 colors;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
    if (colors.w == 0.0) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    } else {
        gl_FragColor = colors;
    }
}`;

var background = [
    -0.95, -1.0, 0.2,
    -0.95, 0.95, 0.2,
    0.95, 0.95, 0.2,
    0.95, -1.0, 0.2
];

var bgColors = [1.0, 0.0, 0.0, 0.0];

var playerOne = {
    id: 0,
    color: [1.0, 0.0, 0.0, 1.0],
    translation: [0.5, 0.0, 0.0],
    size: 0.4,
    position: [
        -0.95, -0.9, 0.1,
        -0.95, -1.0, 0.1,
        -0.55, -0.9, 0.1,
        -0.55, -1.0, 0.1
    ]
};

var playerTwo = {
    id: 1,
    color: [0.0, 0.0, 1.0, 1.0],
    translation: [1.0, 0.0, 0.05],
    size: 0.4,
    position: [
        -0.95, -0.9, 0.1,
        -0.95, -1.0, 0.1,
        -0.55, -0.9, 0.1,
        -0.55, -1.0, 0.1
    ]
};

var ball = {
    color: [1.0, 1.0, 1.0, 0.0],
    translation: [0.0, -0.5, 0.0],
    speedX: -0.01,
    speedY: -0.01,
    speed: 0.01,
    size: 0.06,
    position: [
        -0.03, 0.01, 0.1,
        -0.03, -0.05, 0.1,
        0.03, 0.01, 0.1,
        0.03, -0.05, 0.1
    ],
};

// new buffer obj
var vertex_buffer; 

// create new program
var program;

// get location of colors uniform and translation uniform
var colorsLoc;
var transLoc;

// get position location
var positionLoc;
// texture location
var textureUniLoc;

// current player
var curPlayer = 0;

var keyPressed = {};
var requestId = 0;

function loadTexture(url) {
    var texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);

    var level = 0;
    var internalFormat = gl.RGBA;
    var width = 1;
    var height = 1;
    var border = 0;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    var pixel = new Uint8Array([0, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

    const image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
           gl.generateMipmap(gl.TEXTURE_2D);
        } else {
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    };
    image.src = url;

    return texture;
}

function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

var texture = loadTexture('field.png');
var ball_texture = loadTexture('ball.png');

const textureCoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

const textureCoordinates = [0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

// create a new progam from vertex and fragment code and link them
function createProgram() {
    var vertShader = gl.createShader(gl.VERTEX_SHADER); // create vshader
    gl.shaderSource(vertShader, vertCode); // attach vshader to code
    gl.compileShader(vertShader); // compile vshader

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER); // create fshader
    gl.shaderSource(fragShader, fragCode); // attach fshader to code
    gl.compileShader(fragShader); //compile fshader

    var program = gl.createProgram(); // create shader program
    gl.attachShader(program, vertShader); // attach vshader
    gl.attachShader(program, fragShader); // attach fshader

    gl.linkProgram(program);

    return program;
}

function drawBg() {
    gl.enableVertexAttribArray(positionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0); 
    // point attribute to currently bound vertex buffer obj 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(background), gl.STATIC_DRAW); // pass vertex arr data to buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // unbind buffer

    // textures
    var num = 2; // every coordinate composed of 2 values
    var type = gl.FLOAT; // the data in the buffer is 32 bit float
    var normalize = false; // don't normalize
    var stride = 0; // how many bytes to get from one set to the next
    var offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.vertexAttribPointer(gl.getAttribLocation(program, 'aTextureCoord'), num, type, normalize, stride, offset);
    gl.enableVertexAttribArray(gl.getAttribLocation(program, 'aTextureCoord'));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.getUniformLocation(program, 'uSampler'), 0);

    gl.uniform3fv(transLoc, [0.0, 0.0, 0.0]);
    gl.uniform4fv(colorsLoc, bgColors);
    
    // redraw array of vericies
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4); // draw triangle
}

function drawPlayer(player) {
    gl.enableVertexAttribArray(positionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0); 
    // point attribute to currently bound vertex buffer obj 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(player.position), gl.STATIC_DRAW); // pass vertex arr data to buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // unbind buffer

    var num = 2; // every coordinate composed of 2 values
    var type = gl.FLOAT; // the data in the buffer is 32 bit float
    var normalize = false; // don't normalize
    var stride = 0; // how many bytes to get from one set to the next
    var offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.vertexAttribPointer(gl.getAttribLocation(program, 'aTextureCoord'), num, type, normalize, stride, offset);
    gl.enableVertexAttribArray(gl.getAttribLocation(program, 'aTextureCoord'));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, ball_texture);
    gl.uniform1i(gl.getUniformLocation(program, 'uSampler'), 0);

    // setup translation and colors
    gl.uniform3fv(transLoc, player.translation);
    gl.uniform4fv(colorsLoc, player.color);

    // redraw array of vericies
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // draw triangle

}

function drawBall(ball) {
    gl.enableVertexAttribArray(positionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0); 
    // point attribute to currently bound vertex buffer obj 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ball.position), gl.STATIC_DRAW); // pass vertex arr data to buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // unbind buffer

    // setup translation and colors
    gl.uniform3fv(transLoc, ball.translation);
    gl.uniform4fv(colorsLoc, ball.color);

    // redraw array of vericies
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // draw triangle
}

function checkCollision(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax > bx && ax < bx + bw && ay - ah < by; 
}

var lastTime = 0.0;
// redraw all scene 
function redraw(time) {
    requestId = window.requestAnimationFrame(redraw);

    if (keyPressed['ArrowLeft']) {
        playerOne.translation[0] -= 0.02;
    }
    if (keyPressed['ArrowRight']) {
        playerOne.translation[0] += 0.02;
    }
    if (keyPressed['a']) {
        playerTwo.translation[0] -= 0.02;
    }    
    if (keyPressed['d']) {
        playerTwo.translation[0] += 0.02;
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT); // clolr buffer bit
    gl.useProgram(program);

    ball.translation[0] += ball.speedX; 
    ball.translation[1] += ball.speedY; 

    let ballX = ball.position[0] + ball.translation[0];
    let ballY = ball.position[1] + ball.translation[1];
    let padOneX = playerOne.position[0] + playerOne.translation[0];
    let padOneY = playerOne.position[1] + playerOne.translation[1];
    let padTwoX = playerTwo.position[0] + playerTwo.translation[0];
    let padTwoY = playerTwo.position[1] + playerTwo.translation[1];

    // check top collision
    if (ballY > 0.95 || ballY - ball.size < -1.0) {
        ball.speedY *= -1;
    }

    if (0.95 < ballX + ball.size || ballX < -0.95) {

        ball.speedX *= -1;
    }

    if (checkCollision(ballX, ballY, ball.size, ball.size, padOneX, padOneY, playerOne.size, 0.1) && curPlayer == 0) {
        console.log("p1 collision")
        curPlayer = 1;
        playerTwo.translation[2] = 0.0;
        playerOne.translation[2] = 0.05;

        ball.speedY *= -1;
    }

    if (checkCollision(ballX, ballY, ball.size, ball.size, padTwoX, padTwoY, playerTwo.size, 0.1) && curPlayer == 1) {
        console.log("p2 collision")
        curPlayer = 0;
        playerOne.translation[2] = 0.0;
        playerTwo.translation[2] = 0.05;
        ball.speedY *= -1;
    }

    // loose point
    if (ballY - ball.size < -1.0) {
        if (curPlayer == 0) {
            curPlayer = 1;
            playerTwo.translation[2] = 0.0;
            playerOne.translation[2] = 0.05;
        } else {
            curPlayer = 0;
            playerTwo.translation[2] = 0.05;
            playerOne.translation[2] = 0.0;

        }
        ball.translation = [0.0, -0.5, 0.0];
    }

    drawBg();
    drawPlayer(playerOne);
    drawPlayer(playerTwo);

    drawBall(ball);
}

// compile program
function compile(vertices) {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // bind array to buffer obj
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // pass vertex arr data to buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // unbind buffer

    // link programs
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // bind vertex buffer obj
    var coord = gl.getAttribLocation(program, "coordinates"); // get the location attribute
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); // point attribute to currently bound vertex buffer obj
    gl.enableVertexAttribArray(coord); // enable attribute

    gl.enable(gl.DEPTH_TEST); // enable depth test
    gl.viewport(0, 0, canvas.width, canvas.height); // set view port
}

function callbackOnKeyDown(e) {
    keyPressed[e.key] = true;

    
    if (keyPressed[' ']) {
        if (requestId == 0) {
            window.performance.now();
            requestId = window.requestAnimationFrame(redraw);
        } else {
            window.cancelAnimationFrame(requestId);
            requestId = 0;
        }
    }
}

function callbackOnKeyUp(e) {
    delete keyPressed[e.key];
}

window.onload = function() {
    window.onkeydown = callbackOnKeyDown;
    window.onkeyup = callbackOnKeyUp;

    vertex_buffer = gl.createBuffer();
    program = createProgram();
    colorsLoc = gl.getUniformLocation(program, "colors");
    transLoc = gl.getUniformLocation(program, "translation");
    positionLoc = gl.getAttribLocation(program, "coordinates");
    textureUniLoc = gl.getUniformLocation(program, "pTexture");

    compile(background);
    window.performance.now();
    requestId = window.requestAnimationFrame(redraw);
};
