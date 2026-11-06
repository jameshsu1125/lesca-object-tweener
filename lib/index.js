function B(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var I, C;
function _() {
  if (C) return I;
  C = 1;
  var e = 4, o = 1e-3, n = 1e-7, g = 10, c = 11, p = 1 / (c - 1), v = typeof Float32Array == "function";
  function m(r, t) {
    return 1 - 3 * t + 3 * r;
  }
  function F(r, t) {
    return 3 * t - 6 * r;
  }
  function O(r) {
    return 3 * r;
  }
  function u(r, t, i) {
    return ((m(t, i) * r + F(t, i)) * r + O(t)) * r;
  }
  function f(r, t, i) {
    return 3 * m(t, i) * r * r + 2 * F(t, i) * r + O(t);
  }
  function D(r, t, i, a, h) {
    var l, s, S = 0;
    do
      s = t + (i - t) / 2, l = u(s, a, h) - r, l > 0 ? i = s : t = s;
    while (Math.abs(l) > n && ++S < g);
    return s;
  }
  function w(r, t, i, a) {
    for (var h = 0; h < e; ++h) {
      var l = f(t, i, a);
      if (l === 0)
        return t;
      var s = u(t, i, a) - r;
      t -= s / l;
    }
    return t;
  }
  function b(r) {
    return r;
  }
  return I = function(t, i, a, h) {
    if (!(0 <= t && t <= 1 && 0 <= a && a <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    if (t === i && a === h)
      return b;
    for (var l = v ? new Float32Array(c) : new Array(c), s = 0; s < c; ++s)
      l[s] = u(s * p, t, a);
    function S(y) {
      for (var d = 0, N = 1, R = c - 1; N !== R && l[N] <= y; ++N)
        d += p;
      --N;
      var T = (y - l[N]) / (l[N + 1] - l[N]), E = d + T * p, M = f(E, t, a);
      return M >= o ? w(y, E, t, a) : M === 0 ? E : D(y, d, d + p, t, a);
    }
    return function(d) {
      return d === 0 ? 0 : d === 1 ? 1 : u(S(d), i, h);
    };
  }, I;
}
var k = _();
const z = /* @__PURE__ */ B(k), U = {
  // basic
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  // Sine
  inSine: [0.47, 0, 0.745, 0.715],
  outSine: [0.39, 0.575, 0.565, 1],
  inOutSine: [0.445, 0.05, 0.55, 0.95],
  // Cubic
  inCubic: [0.55, 0.055, 0.675, 0.19],
  outCubic: [0.215, 0.61, 0.355, 1],
  inOutCubic: [0.645, 0.045, 0.355, 1],
  // Quint
  InQuint: [0.755, 0.05, 0.855, 0.06],
  OutQuint: [0.23, 1, 0.32, 1],
  InOutQuint: [0.86, 0, 0.07, 1],
  // Circ
  inCirc: [0.6, 0.04, 0.98, 0.335],
  outCirc: [0.075, 0.82, 0.165, 1],
  inOutCirc: [0.785, 0.135, 0.15, 0.86],
  // Quad
  inQuad: [0.55, 0.085, 0.68, 0.53],
  outQuad: [0.25, 0.46, 0.45, 0.94],
  inOutQuad: [0.455, 0.03, 0.515, 0.955],
  // Quart
  inQuart: [0.895, 0.03, 0.685, 0.22],
  outQuart: [0.165, 0.84, 0.44, 1],
  inOutQuart: [0.77, 0, 0.175, 1],
  // Expo
  inExpo: [0.95, 0.05, 0.795, 0.035],
  outExpo: [0.19, 1, 0.22, 1],
  inOutExpo: [1, 0, 0, 1],
  // Back
  inBack: [0.6, -0.28, 0.735, 0.045],
  outBack: [0.175, 0.885, 0.32, 1.275],
  inOutBack: [0.68, -0.55, 0.265, 1.55]
}, Q = 2 * Math.PI / 3, V = 2 * Math.PI / 4.5, j = {
  inElastic: (e) => e === 0 || e === 1 ? e : -Math.pow(2, 10 * e - 10) * Math.sin((e * 10 - 10.75) * Q),
  outElastic: (e) => e === 0 || e === 1 ? e : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * Q) + 1,
  inOutElastic: (e) => {
    if (e === 0 || e === 1) return e;
    const o = Math.sin((20 * e - 11.125) * V);
    return e < 0.5 ? -(Math.pow(2, 20 * e - 10) * o) / 2 : Math.pow(2, -20 * e + 10) * o / 2 + 1;
  }
}, x = {
  from: {},
  to: {},
  duration: 1e3,
  delay: 0,
  easing: U.outQuart,
  onStart: {
    is: !1,
    method: () => {
    }
  },
  onUpdate: () => {
  },
  onComplete: () => {
  }
};
class P {
  enable;
  data;
  playing;
  clearNextFrame;
  playNextFrame;
  addDataNextFrame;
  eachResult;
  result;
  timestamp;
  /**
   * { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @param {object} options { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @returns
   */
  constructor(o) {
    const n = { ...x, ...o };
    if (this.enable = !0, this.data = [], this.playing = !1, this.clearNextFrame = !1, this.playNextFrame = !1, this.addDataNextFrame = [], this.timestamp = 0, JSON.stringify(n) !== JSON.stringify(x)) {
      const c = { method: n.onStart instanceof Function ? n.onStart : n.onStart.method, is: !1 };
      Object.keys(n.to).length > 0 && this.data.push({ ...n, onStart: c });
    }
    return this.eachResult = this.result = n.from, this;
  }
  add(o) {
    const n = { ...x, ...o }, { from: g, to: c, duration: p, delay: v, easing: m, onUpdate: F, onComplete: O, onStart: u } = n, f = {
      from: g,
      to: c,
      duration: p,
      delay: v,
      easing: m,
      onUpdate: F,
      onComplete: O,
      onStart: u || { method: () => {
      }, is: !0 }
    };
    return o.onStart ? f.onStart = { method: u instanceof Function ? u : u.method, is: !1 } : f.onStart = { method: () => {
    }, is: !0 }, this.clearNextFrame && this.addDataNextFrame.push(f), this.data.push(f), this;
  }
  clearQueue() {
    return this.data.length > 0 && (this.clearNextFrame = !0), this.data = [], this.addDataNextFrame = [], this.result = this.eachResult, this.timestamp = (/* @__PURE__ */ new Date()).getTime(), this;
  }
  play() {
    const { requestAnimationFrame: o } = window, [n] = this.data;
    if (n) {
      if (this.clearNextFrame) {
        this.playNextFrame = !0;
        return;
      }
      if (!this.playing)
        return this.playing = !0, this.enable = !0, this.timestamp = (/* @__PURE__ */ new Date()).getTime(), o(() => this.render()), this;
    }
  }
  stop() {
    return this.enable = !1, this.playing = !1, this;
  }
  render() {
    const { requestAnimationFrame: o } = window, [n] = this.data;
    if (!n) return;
    const { from: g, to: c, duration: p, delay: v, easing: m, onUpdate: F, onComplete: O, onStart: u } = n, f = g || this.result, w = (/* @__PURE__ */ new Date()).getTime() - this.timestamp - (v || 0), b = typeof m == "function" ? m : z(...m), r = w / p;
    if (w < 0) {
      o(() => this.render());
      return;
    }
    if (Object.keys(u).length !== 0)
      if (u instanceof Function)
        u?.();
      else {
        const { method: a, is: h } = u;
        !h && a && (u.is = !0, a?.(f));
      }
    let t = {}, i = [];
    Object.entries(c).forEach((a) => {
      const [h, l] = a, s = Object.entries(f).filter((d) => d[0] === h);
      if (s.length === 0) {
        i.push(h);
        return;
      }
      const S = s.length > 0 ? s[0][1] : null;
      if (S === void 0) return;
      const y = S + (l - S) * b(r);
      t[h] = y;
    }), i.forEach((a) => {
      console.warn(`[Tweener] property "${a}" is undefined.`);
    }), w < p ? (this.eachResult = { ...this.result, ...t }, F?.(this.eachResult), this.enable ? o(() => this.render()) : (this.result = { ...this.result, ...t }, this.clearNextFrame && (this.clearNextFrame = !1, this.addDataNextFrame.length > 0 ? (this.data = [...this.addDataNextFrame], this.addDataNextFrame = []) : this.data = []), this.playNextFrame && (this.playNextFrame = !1, this.play()))) : (this.result = this.eachResult = { ...this.result, ...c }, this.data.shift(), O?.(this.result), this.data.length > 0 ? (this.reset(), this.data[0].from = this.data[0].from || this.result, this.enable && o(() => this.render())) : this.playing = !1);
  }
  reset() {
    this.timestamp = (/* @__PURE__ */ new Date()).getTime();
  }
}
export {
  U as Bezier,
  j as Elastic,
  P as default
};
