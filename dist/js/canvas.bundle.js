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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/js/player.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform.js */ "./src/js/platform.js");
/* harmony import */ var _resources_tile1_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resources/tile1.png */ "./src/resources/tile1.png");



var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var gravity = 1.5;
var key = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
};
var player = new _player_js__WEBPACK_IMPORTED_MODULE_0__["Player"](canvas, 200, 100);
var platforms = [new _platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 100, 400), new _platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 350, 250)];

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach(function (platform) {
    platform.draw();
  });

  if (key.left.pressed && player.position.x > 100) {
    player.velocity.x += -1;
    console.log('Aqui 1');
  } else if (key.right.pressed && player.position.x < 400) {
    player.velocity.x += 1;
    console.log('Aqui 2');
  } else {
    player.velocity.x = 0;

    if (key.left.pressed) {
      platforms.forEach(function (platform) {
        platform.position.x += 4;
      });
      console.log('Aqui 3');
    } else if (key.right.pressed) {
      platforms.forEach(function (platform) {
        platform.position.x -= 4;
      });
      console.log('Aqui 4');
    }
  }

  platforms.forEach(function (platform) {
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0;
    }
  });
}

animate();
addEventListener('keydown', function (_ref) {
  var keyCode = _ref.keyCode;
  console.log(keyCode);
  var JUMP = 87,
      LEFT = 65,
      RIGHT = 68;

  switch (keyCode) {
    case JUMP:
      player.velocity.y -= 20;
      break;

    case LEFT:
      key.left.pressed = true;
      console.log('Left down');
      break;

    case RIGHT:
      key.right.pressed = true;
      console.log('Right down');
      break;
  }
});
addEventListener('keyup', function (_ref2) {
  var keyCode = _ref2.keyCode;
  console.log(keyCode);
  var JUMP = 87,
      LEFT = 65,
      RIGHT = 68;

  switch (keyCode) {
    case JUMP:
      player.velocity.y -= 20;
      break;

    case LEFT:
      key.left.pressed = false;
      console.log('Left up');
      break;

    case RIGHT:
      key.right.pressed = false;
      console.log('Right up');
      break;
  }
});

/***/ }),

/***/ "./src/js/platform.js":
/*!****************************!*\
  !*** ./src/js/platform.js ***!
  \****************************/
/*! exports provided: Platform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Platform", function() { return Platform; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Platform = /*#__PURE__*/function () {
  function Platform(context, x, y) {
    _classCallCheck(this, Platform);

    this.context = context;
    this.position = {
      x: x,
      y: y
    };
    this.width = 200;
    this.height = 20;
  }

  _createClass(Platform, [{
    key: "draw",
    value: function draw() {
      this.context.fillStyle = 'blue';
      this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }]);

  return Platform;
}();

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(canvas) {
    _classCallCheck(this, Player);

    this.gravity = 1.5;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.position = {
      x: 100,
      y: 100
    };
    this.velocity = {
      x: 0,
      y: 2
    };
    this.width = 30;
    this.height = 30;
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      this.context.fillStyle = 'red';
      this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      var bottonScreen = this.position.y + this.height + this.velocity.y <= this.canvas.height;

      if (bottonScreen) {
        this.velocity.y += this.gravity;
      } else {
        this.velocity.y = 0;
      }
    }
  }]);

  return Player;
}();

/***/ }),

/***/ "./src/resources/tile1.png":
/*!*********************************!*\
  !*** ./src/resources/tile1.png ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "ca85b1815eacb73be83415cdd47670f2.png");

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map