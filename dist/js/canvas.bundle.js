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
/* harmony import */ var _entities_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/player.js */ "./src/js/entities/player.js");
/* harmony import */ var _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/platform.js */ "./src/js/entities/platform.js");
/* harmony import */ var _entities_gameElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/gameElement.js */ "./src/js/entities/gameElement.js");
/* harmony import */ var _resources_tile1_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resources/tile1.png */ "./src/resources/tile1.png");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _resources_background_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../resources/background.png */ "./src/resources/background.png");






var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var tile = Object(_utils_js__WEBPACK_IMPORTED_MODULE_4__["createImage"])(_resources_tile1_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
var background = Object(_utils_js__WEBPACK_IMPORTED_MODULE_4__["createImage"])(_resources_background_png__WEBPACK_IMPORTED_MODULE_5__["default"]);
var player, platforms, gameElements;
var key = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
};
var getLevel = new Promise(function (resolve, reject) {
  fetch("http://localhost:8080/level", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (data) {
    return resolve(data);
  })["catch"](function (error) {
    return reject(error);
  });
});
getLevel.then(function (response) {
  response.json().then(function (data) {
    console.log(data);
  });
});
var myPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("foo");
  }, 300);
});

var mySolve = function mySolve(a) {
  console.log(a);
  init();
  animate();
};

var myReject = function myReject() {
  console.log("not foo");
};

myPromise.then(mySolve, myReject);

function init() {
  var tileBottom = innerHeight - tile.height;
  platforms = [new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 0, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 60, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 120, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 180, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 240, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 300, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 360, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 420, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 480, tileBottom, tile), new _entities_platform_js__WEBPACK_IMPORTED_MODULE_1__["Platform"](context, 540, tileBottom, tile)];
  player = new _entities_player_js__WEBPACK_IMPORTED_MODULE_0__["Player"](canvas, 200, 100);
  gameElements = [new _entities_gameElement_js__WEBPACK_IMPORTED_MODULE_2__["GameElement"](context, 0, 0, background)];
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameElements.forEach(function (gameElem) {
    gameElem.draw();
  });
  player.update();
  platforms.forEach(function (platform) {
    platform.draw();
  });

  if (key.left.pressed && player.position.x > 100) {
    player.velocity.x += -1;
  } else if (key.right.pressed && player.position.x < 400) {
    player.velocity.x += 1;
  } else {
    player.velocity.x = 0;

    if (key.left.pressed) {
      platforms.forEach(function (platform) {
        platform.position.x += 4;
      });
    } else if (key.right.pressed) {
      platforms.forEach(function (platform) {
        platform.position.x -= 4;
      });
    }
  }

  platforms.forEach(function (platform) {
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0;
    }
  }); // lose condition

  if (player.position.y > canvas.height) {
    console.log('you lose');
    init();
  }
} //init()
//animate()


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
      break;

    case RIGHT:
      key.right.pressed = false;
      break;
  }
});

/***/ }),

/***/ "./src/js/entities/gameElement.js":
/*!****************************************!*\
  !*** ./src/js/entities/gameElement.js ***!
  \****************************************/
/*! exports provided: GameElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameElement", function() { return GameElement; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameElement = /*#__PURE__*/function () {
  function GameElement(context, x, y, image) {
    _classCallCheck(this, GameElement);

    this.context = context;
    this.image = image;
    this.position = {
      x: x,
      y: y
    };
    this.width = image.width;
    this.height = image.height;
  }

  _createClass(GameElement, [{
    key: "draw",
    value: function draw() {
      this.context.drawImage(this.image, this.position.x, this.position.y);
    }
  }]);

  return GameElement;
}();

/***/ }),

/***/ "./src/js/entities/platform.js":
/*!*************************************!*\
  !*** ./src/js/entities/platform.js ***!
  \*************************************/
/*! exports provided: Platform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Platform", function() { return Platform; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Platform = /*#__PURE__*/function () {
  function Platform(context, x, y, image) {
    _classCallCheck(this, Platform);

    this.context = context;
    this.image = image;
    this.position = {
      x: x,
      y: y
    };
    this.width = image.width;
    this.height = image.height;
  }

  _createClass(Platform, [{
    key: "draw",
    value: function draw() {
      this.context.drawImage(this.image, this.position.x, this.position.y);
      /*this.context.fillStyle = 'blue'
      this.context.fillRect(this.position.x,
          this.position.y,
          this.width,
          this.height)*/
    }
  }]);

  return Platform;
}();

/***/ }),

/***/ "./src/js/entities/player.js":
/*!***********************************!*\
  !*** ./src/js/entities/player.js ***!
  \***********************************/
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
      } else {//this.velocity.y = 0
      }
    }
  }]);

  return Player;
}();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function createImage(src) {
  var image = new Image();
  image.src = src;
  return image;
}

module.exports = {
  createImage: createImage
};

/***/ }),

/***/ "./src/resources/background.png":
/*!**************************************!*\
  !*** ./src/resources/background.png ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "a5bd4e0ae13bc2edca22d79535b9af8b.png");

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