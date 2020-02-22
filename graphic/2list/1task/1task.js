var canvas = document.getElementById("canv");
var gl = canvas.getContext("experimental-webgl");


/*==========Defining and storing the geometry=======*/

var vertices = [
   0.5,0.5,0.0,
   0.0,0.1,0.0,
   -0.5, 0.5, 0.0,
   -0.25,-0.25,0.0,
   0.25, -0.25, 0.0,
   0.0, -0.1, 0.0
];

var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

/*=========================Shaders========================*/

// vertex shader source code
var vertCode =`
   attribute vec3 coordinates;

   void main(void) {
      gl_Position = vec4(coordinates, 1.0);
      gl_PointSize = 10.0;
   }`;

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

// fragment shader source code
var fragCode =`
   uniform mediump vec4 color;

   void main(void) {
      gl_FragColor = color;
   }`;

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader); 
gl.attachShader(shaderProgram, fragShader);

gl.bindAttribLocation(shaderProgram, 0, "coordinates");

gl.linkProgram(shaderProgram);


gl.useProgram(shaderProgram);


/*======== Associating shaders to buffer objects ========*/

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

var col = gl.getUniformLocation(shaderProgram, "color");


// without bindAttribLocation
// var coord = gl.getAttribLocation(shaderProgram, "coordinates");
// gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(coord);

//bindAttribLocation
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);


// gl.uniform4f(col, 0.5, 0.7, 0.5, 1.0);

/*============= Drawing the primitive ===============*/

gl.enable(gl.DEPTH_TEST);
gl.viewport(0,0,canvas.width,canvas.height);


function loop(){
   gl.uniform4f(col, 0.8, 0.1, 0.1, 1.0);
   gl.drawArrays(gl.LINE_LOOP, 0, 6);
}

function lines(){
   gl.uniform4f(col, 0.6, 0.1, 0.2, 1.0);
   gl.drawArrays(gl.LINES, 0, 6);
}

function triangles() {
   gl.uniform4f(col, 0.4, 0.3, 0.2, 1.0);
   gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function points(){
   gl.clearColor(0.5, 0.5, 0.5, 0.9);
   gl.uniform4f(col, 0.0, 0.0, 0.0, 1.0);
   gl.drawArrays(gl.POINTS, 0, 6);
}

function lstrip(){
   gl.uniform4f(col, 0.0, 0.0, 1.0, 1.0);
   gl.drawArrays(gl.LINE_STRIP, 0, 6);
}

function tstrip(){
   gl.uniform4f(col, 0.0, 1.0, 0.0, 1.0);
   gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
}

function fan(){
   gl.uniform4f(col, 0.1, 0.3, 0.4, 1.0);
   gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
}

document.getElementById("pts").onclick = points;
document.getElementById("lines").onclick = lines;
document.getElementById("loop").onclick = loop;
document.getElementById("lstrip").onclick = lstrip;
document.getElementById("tstrip").onclick = tstrip;
document.getElementById("triangles").onclick = triangles;
document.getElementById("tfan").onclick = fan;

const numAttribs = gl.getProgramParameter(shaderProgram, gl.ACTIVE_ATTRIBUTES);
console.log("attributes")
for (let i = 0; i < numAttribs; ++i) {
  const info = gl.getActiveAttrib(shaderProgram, i); 
  console.log('name:', info.name, 'type:', info.type, 'size:', info.size); 
}

const numUniforms = gl.getProgramParameter(shaderProgram, gl.ACTIVE_UNIFORMS);
console.log("uniforms");
for (let i = 0; i < numUniforms; ++i) {
  const info = gl.getActiveUniform(shaderProgram, i); 
  console.log('name:', info.name, 'type:', info.type, 'size:', info.size); 
}


