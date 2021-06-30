"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Bezier = void 0;

var _bezierEasing = _interopRequireDefault(require("bezier-easing"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bezier = {
  // basic
  linear: [0, 0, 1, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  // Sine
  easeInSine: [0.47, 0, 0.745],
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
exports.Bezier = Bezier;
var defaultOptions = {
  from: false,
  to: false,
  duration: 1000,
  delay: 0,
  easing: Bezier.easeOutQuart,
  onUpdate: void 0,
  onComplete: void 0,
  onStart: void 0
};

var Tweener = /*#__PURE__*/function () {
  /**
   * { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @param {object} options { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @returns
   */
  function Tweener() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

    _classCallCheck(this, Tweener);

    this.enable = true;
    this.data = [];
    this.result = {};
    this.playing = false;
    this.clearNextFrame = false;
    this.playNextFrame = false;
    this.addDataNextFrame = [];

    if (options !== defaultOptions) {
      this.data.push(options);
      this.play();
    }

    return this;
  }

  _createClass(Tweener, [{
    key: "add",
    value: function add(_ref) {
      var from = _ref.from,
          to = _ref.to,
          _ref$duration = _ref.duration,
          duration = _ref$duration === void 0 ? 1000 : _ref$duration,
          _ref$delay = _ref.delay,
          delay = _ref$delay === void 0 ? 0 : _ref$delay,
          _ref$easing = _ref.easing,
          easing = _ref$easing === void 0 ? Bezier.easeOutQuart : _ref$easing,
          _ref$onUpdate = _ref.onUpdate,
          onUpdate = _ref$onUpdate === void 0 ? void 0 : _ref$onUpdate,
          _ref$onComplete = _ref.onComplete,
          onComplete = _ref$onComplete === void 0 ? void 0 : _ref$onComplete,
          _ref$onStart = _ref.onStart,
          onStart = _ref$onStart === void 0 ? void 0 : _ref$onStart;
      var data = {
        from: from,
        to: to,
        duration: duration,
        delay: delay,
        easing: easing,
        onUpdate: onUpdate,
        onComplete: onComplete,
        onStart: onStart
      };

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
      return this;
    }
  }, {
    key: "play",
    value: function play() {
      var _data$onStart,
          _this = this;

      var _window = window,
          requestAnimationFrame = _window.requestAnimationFrame;

      var _this$data = _slicedToArray(this.data, 1),
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
      (_data$onStart = data.onStart) === null || _data$onStart === void 0 ? void 0 : _data$onStart.call(data);
      requestAnimationFrame(function () {
        return _this.render();
      });
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
          requestAnimationFrame = _window2.requestAnimationFrame; // get data form class

      var _this$data2 = _slicedToArray(this.data, 1),
          data = _this$data2[0];

      if (!data) return;
      var nfrom = data.from,
          to = data.to,
          duration = data.duration,
          delay = data.delay,
          easing = data.easing,
          onUpdate = data.onUpdate,
          onComplete = data.onComplete;

      var from = nfrom || _objectSpread({}, this.result); // calc easing time


      var time = new Date().getTime() - this.timestamp;
      var currentTime = time - delay;

      var _easing = _slicedToArray(easing, 4),
          x1 = _easing[0],
          y1 = _easing[1],
          x2 = _easing[2],
          y2 = _easing[3];

      var cubicBezier = (0, _bezierEasing["default"])(x1, y1, x2, y2);
      var timePercent = currentTime / duration; // wait for delay

      if (currentTime < 0) {
        requestAnimationFrame(function () {
          return _this2.render();
        });
        return;
      } // get value by easing time


      var result = {};
      Object.entries(to).forEach(function (e) {
        var _e2 = _slicedToArray(e, 2),
            key = _e2[0],
            value = _e2[1];

        var fromValue = from[key];
        if (fromValue === undefined) return;
        var resultValue = fromValue + (value - fromValue) * cubicBezier(timePercent);
        result[key] = resultValue;
      });

      if (currentTime < duration) {
        // keep render
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(result);

        if (this.enable) {
          requestAnimationFrame(function () {
            return _this2.render();
          });
        } else {
          // force stop
          this.result = _objectSpread(_objectSpread({}, from), result);

          if (this.clearNextFrame) {
            this.clearNextFrame = false;

            if (this.addDataNextFrame.length > 0) {
              this.data = _toConsumableArray(this.addDataNextFrame);
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
        this.result = _objectSpread(_objectSpread({}, from), result); // remove queue

        this.data.shift();
        onComplete === null || onComplete === void 0 ? void 0 : onComplete(to); // check data. run next queue when data still has one

        if (this.data.length > 0) {
          var _this$data$0$onStart, _this$data$;

          this.reset();
          this.data[0].from = this.data[0].from || this.result;
          (_this$data$0$onStart = (_this$data$ = this.data[0]).onStart) === null || _this$data$0$onStart === void 0 ? void 0 : _this$data$0$onStart.call(_this$data$);
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

exports["default"] = Tweener;