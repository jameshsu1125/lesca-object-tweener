function B(p) {
  return p && p.__esModule && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p;
}
var E, _;
function j() {
  if (_) return E;
  _ = 1;
  var p = 4, l = 1e-3, a = 1e-7, N = 10, u = 11, d = 1 / (u - 1), b = typeof Float32Array == "function";
  function F(e, t) {
    return 1 - 3 * t + 3 * e;
  }
  function g(e, t) {
    return 3 * t - 6 * e;
  }
  function v(e) {
    return 3 * e;
  }
  function n(e, t, i) {
    return ((F(t, i) * e + g(t, i)) * e + v(t)) * e;
  }
  function f(e, t, i) {
    return 3 * F(t, i) * e * e + 2 * g(t, i) * e + v(t);
  }
  function z(e, t, i, o, m) {
    var s, r, S = 0;
    do
      r = t + (i - t) / 2, s = n(r, o, m) - e, s > 0 ? i = r : t = r;
    while (Math.abs(s) > a && ++S < N);
    return r;
  }
  function x(e, t, i, o) {
    for (var m = 0; m < p; ++m) {
      var s = f(t, i, o);
      if (s === 0)
        return t;
      var r = n(t, i, o) - e;
      t -= r / s;
    }
    return t;
  }
  function O(e) {
    return e;
  }
  return E = function(t, i, o, m) {
    if (!(0 <= t && t <= 1 && 0 <= o && o <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    if (t === i && o === m)
      return O;
    for (var s = b ? new Float32Array(u) : new Array(u), r = 0; r < u; ++r)
      s[r] = n(r * d, t, o);
    function S(y) {
      for (var h = 0, c = 1, w = u - 1; c !== w && s[c] <= y; ++c)
        h += d;
      --c;
      var D = (y - s[c]) / (s[c + 1] - s[c]), I = h + D * d, T = f(I, t, o);
      return T >= l ? x(y, I, t, o) : T === 0 ? I : z(y, h, h + d, t, o);
    }
    return function(h) {
      return h === 0 ? 0 : h === 1 ? 1 : n(S(h), i, m);
    };
  }, E;
}
var C = j();
const V = /* @__PURE__ */ B(C), k = {
  outQuart: [0.165, 0.84, 0.44, 1]
}, R = {
  from: {},
  to: {},
  duration: 1e3,
  delay: 0,
  easing: k.outQuart,
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
class M {
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
  constructor(l) {
    const a = { ...R, ...l };
    if (this.enable = !0, this.data = [], this.playing = !1, this.clearNextFrame = !1, this.playNextFrame = !1, this.addDataNextFrame = [], this.timestamp = 0, JSON.stringify(a) !== JSON.stringify(R)) {
      const u = { method: a.onStart instanceof Function ? a.onStart : a.onStart.method, is: !1 };
      Object.keys(a.to).length > 0 && this.data.push({ ...a, onStart: u });
    }
    return this.eachResult = this.result = a.from, this;
  }
  add(l) {
    const a = { ...R, ...l }, { from: N, to: u, duration: d, delay: b, easing: F, onUpdate: g, onComplete: v, onStart: n } = a, f = {
      from: N,
      to: u,
      duration: d,
      delay: b,
      easing: F,
      onUpdate: g,
      onComplete: v,
      onStart: n || { method: () => {
      }, is: !0 }
    };
    return l.onStart ? f.onStart = { method: n instanceof Function ? n : n.method, is: !1 } : f.onStart = { method: () => {
    }, is: !0 }, this.clearNextFrame && this.addDataNextFrame.push(f), this.data.push(f), this;
  }
  clearQueue() {
    return this.data.length > 0 && (this.clearNextFrame = !0), this.data = [], this.addDataNextFrame = [], this.result = this.eachResult, this.timestamp = (/* @__PURE__ */ new Date()).getTime(), this;
  }
  play() {
    const { requestAnimationFrame: l } = window, [a] = this.data;
    if (a) {
      if (this.clearNextFrame) {
        this.playNextFrame = !0;
        return;
      }
      if (!this.playing)
        return this.playing = !0, this.enable = !0, this.timestamp = (/* @__PURE__ */ new Date()).getTime(), l(() => this.render()), this;
    }
  }
  stop() {
    return this.enable = !1, this.playing = !1, this;
  }
  render() {
    const { requestAnimationFrame: l } = window, [a] = this.data;
    if (!a) return;
    const { from: N, to: u, duration: d, delay: b, easing: F, onUpdate: g, onComplete: v, onStart: n } = a, f = N || this.result, x = (/* @__PURE__ */ new Date()).getTime() - this.timestamp - (b || 0), [O, e, t, i] = F, o = V(O, e, t, i), m = x / d;
    if (x < 0) {
      l(() => this.render());
      return;
    }
    if (Object.keys(n).length !== 0)
      if (n instanceof Function)
        n?.();
      else {
        const { method: r, is: S } = n;
        !S && r && (n.is = !0, r?.(f));
      }
    let s = {};
    Object.entries(u).forEach((r) => {
      const [S, y] = r, h = Object.entries(f).filter((D) => D[0] === S), c = h.length > 0 ? h[0][1] : null;
      if (c === void 0) return;
      const w = c + (y - c) * o(m);
      s[S] = w;
    }), x < d ? (this.eachResult = { ...this.result, ...s }, g?.(this.eachResult), this.enable ? l(() => this.render()) : (this.result = { ...this.result, ...s }, this.clearNextFrame && (this.clearNextFrame = !1, this.addDataNextFrame.length > 0 ? (this.data = [...this.addDataNextFrame], this.addDataNextFrame = []) : this.data = []), this.playNextFrame && (this.playNextFrame = !1, this.play()))) : (this.result = this.eachResult = { ...this.result, ...u }, this.data.shift(), v?.(this.result), this.data.length > 0 ? (this.reset(), this.data[0].from = this.data[0].from || this.result, this.enable && l(() => this.render())) : this.playing = !1);
  }
  reset() {
    this.timestamp = (/* @__PURE__ */ new Date()).getTime();
  }
}
export {
  M as default
};
