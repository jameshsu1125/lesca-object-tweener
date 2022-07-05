var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "bezier-easing"], function (require, exports, bezier_easing_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Bezier = void 0;
    bezier_easing_1 = __importDefault(bezier_easing_1);
    exports.Bezier = {
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
        easeInOutBack: [0.68, -0.55, 0.265, 1.55],
    };
    var defaultOptions = {
        from: {},
        to: {},
        duration: 1000,
        delay: 0,
        easing: exports.Bezier.easeOutQuart,
        onStart: {
            is: false,
            method: function () { },
        },
        onUpdate: function () { },
        onComplete: function () { },
    };
    var Tweener = /** @class */ (function () {
        /**
         * { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
         * @param {object} options { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
         * @returns
         */
        function Tweener(options) {
            var opt = __assign(__assign({}, defaultOptions), options);
            this.enable = true;
            this.data = [];
            this.playing = false;
            this.clearNextFrame = false;
            this.playNextFrame = false;
            this.addDataNextFrame = [];
            this.timestamp = 0;
            if (JSON.stringify(opt) !== JSON.stringify(defaultOptions)) {
                var method = opt.onStart instanceof Function ? opt.onStart : opt.onStart.method;
                var onStart = { method: method, is: false };
                if (opt.to)
                    this.data.push(__assign(__assign({}, opt), { onStart: onStart }));
            }
            this.eachResult = this.result = opt.from;
            return this;
        }
        Tweener.prototype.add = function (options) {
            var opt = __assign(__assign({}, defaultOptions), options);
            var from = opt.from, to = opt.to, duration = opt.duration, delay = opt.delay, easing = opt.easing, onUpdate = opt.onUpdate, onComplete = opt.onComplete, onStart = opt.onStart;
            var data = {
                from: from,
                to: to,
                duration: duration,
                delay: delay,
                easing: easing,
                onUpdate: onUpdate,
                onComplete: onComplete,
                onStart: onStart || { method: function () { }, is: true },
            };
            if (!options.onStart) {
                data.onStart = { method: function () { }, is: true };
            }
            else {
                data.onStart = { method: onStart instanceof Function ? onStart : onStart.method, is: false };
            }
            if (this.clearNextFrame) {
                this.addDataNextFrame.push(data);
            }
            this.data.push(data);
            return this;
        };
        Tweener.prototype.clearQueue = function () {
            if (this.data.length > 0)
                this.clearNextFrame = true;
            this.data = [];
            this.addDataNextFrame = [];
            this.result = this.eachResult;
            this.timestamp = new Date().getTime();
            return this;
        };
        Tweener.prototype.play = function () {
            var _this = this;
            var requestAnimationFrame = window.requestAnimationFrame;
            var data = this.data[0];
            if (!data)
                return;
            if (this.clearNextFrame) {
                this.playNextFrame = true;
                return;
            }
            if (this.playing)
                return;
            this.playing = true;
            this.enable = true;
            this.timestamp = new Date().getTime();
            requestAnimationFrame(function () { return _this.render(); });
            return this;
        };
        Tweener.prototype.stop = function () {
            this.enable = false;
            this.playing = false;
            return this;
        };
        Tweener.prototype.render = function () {
            var _this = this;
            var requestAnimationFrame = window.requestAnimationFrame;
            // get data form class
            var data = this.data[0];
            if (!data)
                return;
            var nfrom = data.from, to = data.to, duration = data.duration, delay = data.delay, easing = data.easing, onUpdate = data.onUpdate, onComplete = data.onComplete, onStart = data.onStart;
            var from = nfrom || this.result;
            // calc easing time
            var time = new Date().getTime() - this.timestamp;
            var currentTime = time - (delay || 0);
            var x1 = easing[0], y1 = easing[1], x2 = easing[2], y2 = easing[3];
            var cubicBezier = (0, bezier_easing_1.default)(x1, y1, x2, y2);
            var timePercent = currentTime / duration;
            // wait for delay
            if (currentTime < 0) {
                requestAnimationFrame(function () { return _this.render(); });
                return;
            }
            // onStart
            if (Object.keys(onStart).length !== 0) {
                if (onStart instanceof Function) {
                    onStart === null || onStart === void 0 ? void 0 : onStart();
                }
                else {
                    var method = onStart.method, is = onStart.is;
                    if (!is && method) {
                        onStart.is = true;
                        method === null || method === void 0 ? void 0 : method(from);
                    }
                }
            }
            // get value by easing time
            var result = {};
            Object.entries(to).forEach(function (e) {
                var key = e[0], value = e[1];
                var fromValue = Object.entries(from).filter(function (e) { return e[0] === key; })[0][1];
                if (fromValue === undefined)
                    return;
                var resultValue = fromValue + (value - fromValue) * cubicBezier(timePercent);
                result[key] = resultValue;
            });
            if (currentTime < duration) {
                // keep render
                this.eachResult = __assign(__assign({}, this.result), result);
                onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(this.eachResult);
                if (this.enable) {
                    requestAnimationFrame(function () { return _this.render(); });
                }
                else {
                    // force stop
                    this.result = __assign(__assign({}, this.result), result);
                    if (this.clearNextFrame) {
                        this.clearNextFrame = false;
                        if (this.addDataNextFrame.length > 0) {
                            this.data = __spreadArray([], this.addDataNextFrame, true);
                            this.addDataNextFrame = [];
                        }
                        else
                            this.data = [];
                    }
                    if (this.playNextFrame) {
                        this.playNextFrame = false;
                        this.play();
                    }
                }
            }
            else {
                // complete and save result
                this.result = this.eachResult = __assign(__assign({}, this.result), to);
                // remove queue
                this.data.shift();
                onComplete === null || onComplete === void 0 ? void 0 : onComplete(this.result);
                // check data. run next queue when data still has one
                if (this.data.length > 0) {
                    this.reset();
                    this.data[0].from = this.data[0].from || this.result;
                    // this.data[0].onStart?.();
                    if (this.enable)
                        requestAnimationFrame(function () { return _this.render(); });
                }
                else {
                    this.playing = false;
                }
            }
        };
        Tweener.prototype.reset = function () {
            this.timestamp = new Date().getTime();
        };
        return Tweener;
    }());
    exports.default = Tweener;
});
