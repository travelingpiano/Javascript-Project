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

document.addEventListener('DOMContentLoaded', function () {
  var canvasEl = document.getElementsByTagName('canvas')[0];
  var image = new _image_show2.default(canvasEl);
  image.render();
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
    this.ctx = canvasEl.getContext('2d');
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
      processImage(this);
      ctx.drawImage(testImage, 0, 0, this.width, this.height);
    };
    // this.testImage.src = 'images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
    testImage.src = 'images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
  }

  _createClass(ImageShow, [{
    key: 'processImage',
    value: function processImage(image) {
      console.log(image.src);
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