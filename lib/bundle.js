/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _image_show = __webpack_require__(1);

var _image_show2 = _interopRequireDefault(_image_show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var gl = void 0;
var horizAspect = 480.0 / 640.0;
var vertexPositionAttribute = void 0;
var squareVerticesBuffer = void 0;

var start = function start() {
  var canvas = document.getElementById('glCanvas');

  //Initialize the GL context
  gl = initWebGL(canvas);
  if (!gl) {
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

var initWebGL = function initWebGL(canvas) {
  gl = null;
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    alert('unable to initialize webgl!');
  }
  return gl;
};

var initShaders = function initShaders() {
  var fragmentShader = getShader('shader-fs');
  var vertexShader = getShader('shader-vs');
  console.log(vertexShader);
  console.log(fragmentShader);
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('unable to initialize the shader program');
  }

  gl.useProgram(shaderProgram);

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram);
  gl.enableVertexAttribArray(vertexPositionAttribute);
};

var getShader = function getShader(id, type) {
  var shaderScript = void 0,
      shader = void 0;

  shaderScript = document.getElementById(id);

  if (!shaderScript) {
    return null;
  }

  var theSource = "";
  var currentChild = shaderScript.firstChild;

  while (currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContext;
    }
    currentChild = currentChild.nextSibling;
  }

  if (!type) {
    if (shaderScript.type == 'x-shader/x-fragment') {
      type = gl.FRAGMENT_SHADER;
    } else if (shaderScript.type == 'x-shader/x-vertex') {
      type = gl.VERTEX_SHADER;
    } else {
      return null;
    }
  }
  shader = gl.createShader(type);
  gl.shaderSource(shader, theSource);

  //Compile the shader program
  gl.compileShader(shader);
  console.log(shader);
  //See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('an error occured compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

var initBuffers = function initBuffers() {
  squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  var vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
};

var drawScene = function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var perspectiveMatrix = makePerspective(45, 1 / horizAspect, 0.1, 100);

  loadIdentity();
  mvTranslate([-0.0, 0.0, -6.0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

document.addEventListener('DOMContentLoaded', function () {
  start();
  initShaders();
  initBuffers();
  drawScene();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageShow = function () {
  function ImageShow(canvasEl) {
    _classCallCheck(this, ImageShow);

    this.canvas = canvasEl;
    // this.ctx = canvasEl.getContext('2d');
    var ctx = canvasEl.getContext('2d');
    var testImage = new Image();
    this.testImage = new Image();
    this.imageReady = false;
    var width = void 0;
    var height = void 0;
    var canvas = this.canvas;
    var processImage = this.processImage;
    testImage.onload = function () {
      // this.imageReady = true;
      canvas.width = this.width;
      canvas.height = this.height;
      console.log(this.width);
      console.log(this.height);
      processImage(this.src);
      ctx.drawImage(testImage, 0, 0, this.width, this.height);
      // let image = ctx.getImageData(0,0,1280,1014);
    };

    // console.log(image);
    // this.testImage.src = 'images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
    testImage.src = 'images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
  }

  _createClass(ImageShow, [{
    key: 'processImage',
    value: function processImage(imagePath) {
      // let file = new XMLHttpRequest('/images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg');
      var reader = new FileReader();
      reader.onload = function () {
        console.log(reader);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log(this.ctx);
      // this.testImage.onload(this.ctx);
      // if(this.imageReady){
      //   this.ctx.drawImage(this.testImage,0,0);
      //   console.log(this.testImage);
      // }
    }
  }]);

  return ImageShow;
}();

exports.default = ImageShow;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map