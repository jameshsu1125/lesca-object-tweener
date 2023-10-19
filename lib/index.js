"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Bezier = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _bezierEasing = _interopRequireDefault(require("bezier-easing"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Bezier = exports.Bezier = {
  // basic
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  // Sine
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  // Cubic
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  // Quint
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  // Circ
  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
  // Quad
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  // Quart
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  // Expo
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutExpo: [1, 0, 0, 1],
  // Back
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
};
var defaultOptions = {
  from: {},
  to: {},
  duration: 1000,
  delay: 0,
  easing: Bezier.easeOutQuart,
  onStart: {
    is: false,
    method: function method() {}
  },
  onUpdate: function onUpdate() {},
  onComplete: function onComplete() {}
};
var Tweener = exports["default"] = /*#__PURE__*/function () {
  /**
   * { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @param {object} options { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @returns
   */
  function Tweener(options) {
    (0, _classCallCheck2["default"])(this, Tweener);
    (0, _defineProperty2["default"])(this, "enable", void 0);
    (0, _defineProperty2["default"])(this, "data", void 0);
    (0, _defineProperty2["default"])(this, "playing", void 0);
    (0, _defineProperty2["default"])(this, "clearNextFrame", void 0);
    (0, _defineProperty2["default"])(this, "playNextFrame", void 0);
    (0, _defineProperty2["default"])(this, "addDataNextFrame", void 0);
    (0, _defineProperty2["default"])(this, "eachResult", void 0);
    (0, _defineProperty2["default"])(this, "result", void 0);
    (0, _defineProperty2["default"])(this, "timestamp", void 0);
    var opt = _objectSpread(_objectSpread({}, defaultOptions), options);
    this.enable = true;
    this.data = [];
    this.playing = false;
    this.clearNextFrame = false;
    this.playNextFrame = false;
    this.addDataNextFrame = [];
    this.timestamp = 0;
    if (JSON.stringify(opt) !== JSON.stringify(defaultOptions)) {
      var method = opt.onStart instanceof Function ? opt.onStart : opt.onStart.method;
      var onStart = {
        method: method,
        is: false
      };
      if (Object.keys(opt.to).length > 0) this.data.push(_objectSpread(_objectSpread({}, opt), {}, {
        onStart: onStart
      }));
    }
    this.eachResult = this.result = opt.from;
    return this;
  }
  (0, _createClass2["default"])(Tweener, [{
    key: "add",
    value: function add(options) {
      var opt = _objectSpread(_objectSpread({}, defaultOptions), options);
      var from = opt.from,
        to = opt.to,
        duration = opt.duration,
        delay = opt.delay,
        easing = opt.easing,
        onUpdate = opt.onUpdate,
        onComplete = opt.onComplete,
        onStart = opt.onStart;
      var data = {
        from: from,
        to: to,
        duration: duration,
        delay: delay,
        easing: easing,
        onUpdate: onUpdate,
        onComplete: onComplete,
        onStart: onStart || {
          method: function method() {},
          is: true
        }
      };
      if (!options.onStart) {
        data.onStart = {
          method: function method() {},
          is: true
        };
      } else {
        data.onStart = {
          method: onStart instanceof Function ? onStart : onStart.method,
          is: false
        };
      }
      if (this.clearNextFrame) {
        this.addDataNextFrame.push(data);
      }
      this.data.push(data);
      return this;
    }
  }, {
    key: "clearQueue",
    value: function clearQueue() {
      if (this.data.length > 0) this.clearNextFrame = true;
      this.data = [];
      this.addDataNextFrame = [];
      this.result = this.eachResult;
      this.timestamp = new Date().getTime();
      return this;
    }
  }, {
    key: "play",
    value: function play() {
      var _this = this;
      var _window = window,
        requestAnimationFrame = _window.requestAnimationFrame;
      var _this$data = (0, _slicedToArray2["default"])(this.data, 1),
        data = _this$data[0];
      if (!data) return;
      if (this.clearNextFrame) {
        this.playNextFrame = true;
        return;
      }
      if (this.playing) return;
      this.playing = true;
      this.enable = true;
      this.timestamp = new Date().getTime();
      requestAnimationFrame(function () {
        return _this.render();
      });
      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.enable = false;
      this.playing = false;
      return this;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _window2 = window,
        requestAnimationFrame = _window2.requestAnimationFrame;

      // get data form class
      var _this$data2 = (0, _slicedToArray2["default"])(this.data, 1),
        data = _this$data2[0];
      if (!data) return;
      var currentFrom = data.from,
        to = data.to,
        duration = data.duration,
        delay = data.delay,
        easing = data.easing,
        onUpdate = data.onUpdate,
        onComplete = data.onComplete,
        onStart = data.onStart;
      var from = currentFrom || this.result;

      // calc easing time
      var time = new Date().getTime() - this.timestamp;
      var currentTime = time - (delay || 0);
      var _easing = (0, _slicedToArray2["default"])(easing, 4),
        x1 = _easing[0],
        y1 = _easing[1],
        x2 = _easing[2],
        y2 = _easing[3];
      var cubicBezier = (0, _bezierEasing["default"])(x1, y1, x2, y2);
      var timePercent = currentTime / duration;

      // wait for delay
      if (currentTime < 0) {
        requestAnimationFrame(function () {
          return _this2.render();
        });
        return;
      }

      // onStart

      if (Object.keys(onStart).length !== 0) {
        if (onStart instanceof Function) {
          onStart === null || onStart === void 0 || onStart();
        } else {
          var method = onStart.method,
            is = onStart.is;
          if (!is && method) {
            onStart.is = true;
            method === null || method === void 0 || method(from);
          }
        }
      }

      // get value by easing time
      var result = {};
      Object.entries(to).forEach(function (e) {
        var _e = (0, _slicedToArray2["default"])(e, 2),
          key = _e[0],
          value = _e[1];
        var fromValue = Object.entries(from).filter(function (e) {
          return e[0] === key;
        })[0][1];
        if (fromValue === undefined) return;
        var resultValue = fromValue + (value - fromValue) * cubicBezier(timePercent);
        result[key] = resultValue;
      });
      if (currentTime < duration) {
        // keep render
        this.eachResult = _objectSpread(_objectSpread({}, this.result), result);
        onUpdate === null || onUpdate === void 0 || onUpdate(this.eachResult);
        if (this.enable) {
          requestAnimationFrame(function () {
            return _this2.render();
          });
        } else {
          // force stop
          this.result = _objectSpread(_objectSpread({}, this.result), result);
          if (this.clearNextFrame) {
            this.clearNextFrame = false;
            if (this.addDataNextFrame.length > 0) {
              this.data = (0, _toConsumableArray2["default"])(this.addDataNextFrame);
              this.addDataNextFrame = [];
            } else this.data = [];
          }
          if (this.playNextFrame) {
            this.playNextFrame = false;
            this.play();
          }
        }
      } else {
        // complete and save result
        this.result = this.eachResult = _objectSpread(_objectSpread({}, this.result), to);
        // remove queue
        this.data.shift();
        onComplete === null || onComplete === void 0 || onComplete(this.result);

        // check data. run next queue when data still has one
        if (this.data.length > 0) {
          this.reset();
          this.data[0].from = this.data[0].from || this.result;
          // this.data[0].onStart?.();
          if (this.enable) requestAnimationFrame(function () {
            return _this2.render();
          });
        } else {
          this.playing = false;
        }
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.timestamp = new Date().getTime();
    }
  }]);
  return Tweener;
}();