/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function (selector) {
  if (typeof selector === "string") {
    let arr = Array.from(document.querySelectorAll(selector))
    let dnc = new DOMNodeCollection(arr);
    return dnc;
  } else if (selector instanceof HTMLElement){
    let dnc = new DOMNodeCollection([selector]);
    return dnc;
  } else {}
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(els){
    this.htmlElements = els;
  }

  html(string) {
    if (string === undefined) {
      return this.htmlElements[0].innerHTML;
    } else {
      this.htmlElements.forEach ((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.htmlElements.forEach ((el) => {
      el.html = "";
    });
  }

  append(...args) {
    args.forEach ( arg => {
      if (arg instanceof DOMNodeCollection) {
        let allH = arg.htmlElements.map( el => el.outerHTML).join('');
        // arg.htmlElements.forEach (argEl => {
        //   let outerH = argEl.outerHTML;
          this.htmlElements.forEach (theseEl => {
            theseEl.innerHTML += allH;
          });
        // });
      } else if (arg instanceof HTMLElement) {
        this.htmlElements.forEach (theseEl => {
          theseEl.innerHTML += arg.outerHTML;
        });
      } else {
        this.htmlElements.forEach (theseEl => {
          theseEl.innerHTML += arg;
        });
      };
    });
  }

  attr(name, value) {
    if (value === undefined) {
      return this.htmlElements[0].getAttribute(name);
    } else {
      this.htmlElements.forEach ((el) => {
        el.setAttribute(name, value);
      });
    }
  }

  addClass(string) {
    this.htmlElements.forEach ((el) => {
      if (!el.className.includes(string)) {
        el.className += (string + ' ');
      }
    });
  }

  removeClass(string) {
    this.htmlElements.forEach ((el) => {
      if (el.className.includes(string)) {
        let classString = el.className;
        const idx = classString.indexOf(string);
        const begin = classString.slice(0, idx);
        const end = classString.slice(idx+string.length);
        el.className = begin + end;
        console.log(begin, end);
      }
    });
  }

  children() {
    let arr = [];
    this.htmlElements.forEach ((el) => {
      arr = arr.concat(el.children);
    });
    return new DOMNodeCollection(arr);
  }

  parents() {
    let arr = [];
    this.htmlElements.forEach ((el) => {
      arr.push(el.parentNode);
    });
    return new DOMNodeCollection(arr);
  }

  find(selector) {
    let arr = [];
    this.htmlElements.forEach ((el) => {
      arr = arr.concat(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(arr);
  }




}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);