function B(p) {
  return p && p.__esModule && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p;
}
var I, T;
function j() {
  if (T) return I;
  T = 1;
  var p = 4, l = 1e-3, a = 1e-7, N = 10, u = 11, f = 1 / (u - 1), b = typeof Float32Array == "function";
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
  function c(e, t, i) {
    return 3 * F(t, i) * e * e + 2 * g(t, i) * e + v(t);
  }
  function R(e, t, i, o, d) {
    var s, r, S = 0;
    do
      r = t + (i - t) / 2, s = n(r, o, d) - e, s > 0 ? i = r : t = r;
    while (Math.abs(s) > a && ++S < N);
    return r;
  }
  function x(e, t, i, o) {
    for (var d = 0; d < p; ++d) {
      var s = c(t, i, o);
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
  return I = function(t, i, o, d) {
    if (!(0 <= t && t <= 1 && 0 <= o && o <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    if (t === i && o === d)
      return O;
    for (var s = b ? new Float32Array(u) : new Array(u), r = 0; r < u; ++r)
      s[r] = n(r * f, t, o);
    function S(y) {
      for (var h = 0, m = 1, w = u - 1; m !== w && s[m] <= y; ++m)
        h += f;
      --m;
      var _ = (y - s[m]) / (s[m + 1] - s[m]), D = h + _ * f, z = c(D, t, o);
      return z >= l ? x(y, D, t, o) : z === 0 ? D : R(y, h, h + f, t, o);
    }
    return function(h) {
      return h === 0 ? 0 : h === 1 ? 1 : n(S(h), i, d);
    };
  }, I;
}
var C = j();
const k = /* @__PURE__ */ B(C), U = {
  outQuart: [0.165, 0.84, 0.44, 1]
}, E = {
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
class V {
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
    const a = { ...E, ...l };
    if (this.enable = !0, this.data = [], this.playing = !1, this.clearNextFrame = !1, this.playNextFrame = !1, this.addDataNextFrame = [], this.timestamp = 0, JSON.stringify(a) !== JSON.stringify(E)) {
      const u = { method: a.onStart instanceof Function ? a.onStart : a.onStart.method, is: !1 };
      Object.keys(a.to).length > 0 && this.data.push({ ...a, onStart: u });
    }
    return this.eachResult = this.result = a.from, this;
  }
  add(l) {
    const a = { ...E, ...l }, { from: N, to: u, duration: f, delay: b, easing: F, onUpdate: g, onComplete: v, onStart: n } = a, c = {
      from: N,
      to: u,
      duration: f,
      delay: b,
      easing: F,
      onUpdate: g,
      onComplete: v,
      onStart: n || { method: () => {
      }, is: !0 }
    };
    return l.onStart ? c.onStart = { method: n instanceof Function ? n : n.method, is: !1 } : c.onStart = { method: () => {
    }, is: !0 }, this.clearNextFrame && this.addDataNextFrame.push(c), this.data.push(c), this;
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
    const { from: N, to: u, duration: f, delay: b, easing: F, onUpdate: g, onComplete: v, onStart: n } = a, c = N || this.result, x = (/* @__PURE__ */ new Date()).getTime() - this.timestamp - (b || 0), [O, e, t, i] = F, o = k(O, e, t, i), d = x / f;
    if (x < 0) {
      l(() => this.render());
      return;
    }
    if (Object.keys(n).length !== 0)
      if (n instanceof Function)
        n?.();
      else {
        const { method: r, is: S } = n;
        !S && r && (n.is = !0, r?.(c));
      }
    let s = {};
    Object.entries(u).forEach((r) => {
      const [S, y] = r, h = Object.entries(c).filter((w) => w[0] === S)[0][1];
      if (h === void 0) return;
      const m = h + (y - h) * o(d);
      s[S] = m;
    }), x < f ? (this.eachResult = { ...this.result, ...s }, g?.(this.eachResult), this.enable ? l(() => this.render()) : (this.result = { ...this.result, ...s }, this.clearNextFrame && (this.clearNextFrame = !1, this.addDataNextFrame.length > 0 ? (this.data = [...this.addDataNextFrame], this.addDataNextFrame = []) : this.data = []), this.playNextFrame && (this.playNextFrame = !1, this.play()))) : (this.result = this.eachResult = { ...this.result, ...u }, this.data.shift(), v?.(this.result), this.data.length > 0 ? (this.reset(), this.data[0].from = this.data[0].from || this.result, this.enable && l(() => this.render())) : this.playing = !1);
  }
  reset() {
    this.timestamp = (/* @__PURE__ */ new Date()).getTime();
  }
}
export {
  V as default
};
