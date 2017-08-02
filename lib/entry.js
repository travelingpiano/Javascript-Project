import ImageShow from './image_show';

// document.addEventListener('DOMContentLoaded', ()=>{
//   const canvasEl = document.getElementsByTagName('canvas')[0];
//   let image = new ImageShow(canvasEl);
//   // let imageUpload = document.querySelector('input');
//   // imageUpload.addEventListener('change',processImage);
//   let button1 = document.getElementsByName('button1')[0];
//   console.log(button1);
//   button1.addEventListener('click',processImage1);
// });
//
// function processImage1(){
//   let canvas = document.getElementsByTagName('canvas')[0];
//   let ctx = canvas.getContext('2d');
//   console.log(ctx.getImageData(0,0,1280,1014));
// }
//
// function processImage(){
//   let imageUpload = document.querySelector('input').files[0];
//   console.log(imageUpload);
//   let reader = new FileReader();
//   reader.addEventListener('load',function(){
//     console.log(reader.result.data);
//   });
//   console.log(imageUpload);
//   reader.readAsDataURL(imageUpload);
// }

let gl;
let horizAspect = 480.0/640.0;
let vertexPositionAttribute;
let squareVerticesBuffer;

let start = () => {
  let canvas = document.getElementById('glCanvas');

  //Initialize the GL context
  gl = initWebGL(canvas);
  if(!gl){
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.viewport(0,0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

let initWebGL = canvas => {
  gl = null;
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if(!gl){
    alert('unable to initialize webgl!');
  }
  return gl;
};

let initShaders = () => {
  let fragmentShader = getShader('shader-fs');
  let vertexShader = getShader('shader-vs');
  console.log(vertexShader);
  console.log(fragmentShader);
  let shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
    console.log('unable to initialize the shader program');
  }

  gl.useProgram(shaderProgram);

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram);
  gl.enableVertexAttribArray(vertexPositionAttribute);
};

let getShader = (id, type) => {
  let shaderScript, shader;

  shaderScript = document.getElementById(id);

  if(!shaderScript) {
    return null;
  }

  let theSource = "";
  let currentChild = shaderScript.firstChild;

  while(currentChild){
    if(currentChild.nodeType == 3){
      theSource += currentChild.textContext;
    }
    currentChild = currentChild.nextSibling;
  }

  if(!type){
    if(shaderScript.type == 'x-shader/x-fragment'){
      type = gl.FRAGMENT_SHADER;
    }else if(shaderScript.type == 'x-shader/x-vertex'){
      type = gl.VERTEX_SHADER;
    }else{
      return null;
    }
  }
  shader = gl.createShader(type);
  gl.shaderSource(shader, theSource);

  //Compile the shader program
  gl.compileShader(shader);
  console.log(shader);
  //See if it compiled successfully
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    console.log('an error occured compiling the shaders: '  + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

let initBuffers = () => {
  squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  let vertices = [
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
};

let drawScene = () => {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  let perspectiveMatrix = makePerspective(45, 1/horizAspect, 0.1, 100);

  loadIdentity();
  mvTranslate([-0.0, 0.0, -6.0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0,0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

document.addEventListener('DOMContentLoaded',()=>{
  start();
  initShaders();
  initBuffers();
  drawScene();
});
