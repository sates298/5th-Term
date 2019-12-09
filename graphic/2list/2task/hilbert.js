var canvas = document.getElementById('canv');
var gl = canvas.getContext('webgl');

clear();
gl.lineWidth(5);

var green = document.getElementById("green");
var red = document.getElementById("red");
var blue = document.getElementById("blue");
var x = document.getElementById("x");
var y = document.getElementById("y");
var z = document.getElementById("z");

var level = document.getElementById("level");
level.onclick = () => {
    for (let i = 0; i < level.length; i++) {
        if (level[i].checked) {
            console.log(level[i].value);
            chosen = levels[level[i].value - 1]

            redraw();
        }
    }
}

red.oninput = () => { 
    chosen.colors[0] = parseFloat(red.value)/100;
    redraw();
}
green.oninput = () => { 
    chosen.colors[1] = parseFloat(green.value)/100;
    redraw();
}
blue.oninput = () => { 
    chosen.colors[2] = parseFloat(blue.value)/100;
    redraw();
}


x.oninput = () => { 
    chosen.changes[0] = (parseFloat(x.value)/50) - 1.0;
    redraw();
}
y.oninput = () => { 
    chosen.changes[1] = (parseFloat(y.value)/50) - 1.0;
    redraw();
}
z.oninput = () => { 
    chosen.changes[2] = (parseFloat(z.value)/50) - 1.0;

    redraw();
}

class Hilbert {
    constructor(n, posZ, R, G, B) {
        this.posX =  0.75;
        this.posY = 0.75;
        this.posZ = 2.0;
        this.deg = 0;
        this.hilbert = [this.posX, this.posY, this.posZ];
        this.colors = [R, G, B, 1.0];
        this.pi = Math.PI;
        this.changes = [n*0.1, n*0.1, n*0.3];
        this.drawHilbert(4.0 / Math.pow(2, n), n, 90)
    }

    lt(angle) {
        this.deg += (this.pi / 180) * angle
    }

    rt(angle) {
        this.deg -= (this.pi / 180) * angle
    }

    fd(dis) {
        var newX = this.posX - Math.sin(this.deg) * dis;
        var newY = this.posY - Math.cos(this.deg) * dis;
        // console.log("pushing", newX, newY)
        this.hilbert.push(newX, newY, this.posZ);
        this.posX = newX;
        this.posY = newY;
    }

    drawHilbert(size, n, angle) {
        if (n <= 0) return;

        this.lt(angle);
        this.drawHilbert(size, n - 1, -angle);
        this.fd(size);
        this.rt(angle);
        this.drawHilbert(size, n - 1, angle);
        this.fd(size);
        this.drawHilbert(size, n - 1, angle);
        this.rt(angle);
        this.fd(size);
        this.drawHilbert(size, n - 1, -angle);
        this.lt(angle);
    }
}

var vertex_buffer = gl.createBuffer();
var program = createProgram();
gl.useProgram(program);

var coord = gl.getAttribLocation(program, "coordinates");
var chan = gl.getUniformLocation(program, "changes");
var col = gl.getUniformLocation(program, "color");

var levels = [];

for(let i=1; i<6; i++){
    levels.push(new Hilbert(i, 1.0 + 0.5*i, 0.1*i, 0.1*i, 0.1*i))
}

var chosen = levels[0];


function createProgram() {

    var vertCode =`
        attribute vec3 coordinates;
        uniform vec3 changes;

        void main(void) {
            gl_Position = vec4(coordinates.x + changes.x, coordinates.y + changes.y, changes.z, coordinates.z + changes.z);
            gl_PointSize = 10.0;
        }`;

    var fragCode =`
        uniform lowp vec4 color;

        void main(void) {
            gl_FragColor = color;
        }`;

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER); 
    gl.shaderSource(fragShader, fragCode); 
    gl.compileShader(fragShader); 

    var program = gl.createProgram(); 
    gl.attachShader(program, vertShader); 
    gl.attachShader(program, fragShader); 

    gl.linkProgram(program);
    return program;
}



function initHilbert(vertices, change, colors){
   
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);


    gl.enableVertexAttribArray(coord);
    
    gl.uniform3fv(chan, change);
    gl.uniform4fv(col, colors);

}


function redraw(){
    clear();
    console.log(levels);

    for(l of levels){
        // console.log(levels[l]);
        // console.log(l);
        initHilbert(l.hilbert, l.changes, l.colors);
        gl.drawArrays(gl.LINE_STRIP, 0, l.hilbert.length/3);
    }
}

function clear(){
    gl.clearColor(1.0,1.0,1.0,1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);   
}