function B(y) {
  return y && y.__esModule && Object.prototype.hasOwnProperty.call(y, "default") ? y.default : y;
}
var I, _;
function V() {
  if (_) return I;
  _ = 1;
  var y = 4, l = 1e-3, r = 1e-7, N = 10, u = 11, p = 1 / (u - 1), b = typeof Float32Array == "function";
  function g(e, t) {
    return 1 - 3 * t + 3 * e;
  }
  function F(e, t) {
    return 3 * t - 6 * e;
  }
  function v(e) {
    return 3 * e;
  }
  function n(e, t, a) {
    return ((g(t, a) * e + F(t, a)) * e + v(t)) * e;
  }
  function c(e, t, a) {
    return 3 * g(t, a) * e * e + 2 * F(t, a) * e + v(t);
  }
  function z(e, t, a, o, S) {
    var i, s, d = 0;
    do
      s = t + (a - t) / 2, i = n(s, o, S) - e, i > 0 ? a = s : t = s;
    while (Math.abs(i) > r && ++d < N);
    return s;
  }
  function x(e, t, a, o) {
    for (var S = 0; S < y; ++S) {
      var i = c(t, a, o);
      if (i === 0)
        return t;
      var s = n(t, a, o) - e;
      t -= s / i;
    }
    return t;
  }
  function D(e) {
    return e;
  }
  return I = function(t, a, o, S) {
    if (!(0 <= t && t <= 1 && 0 <= o && o <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    if (t === a && o === S)
      return D;
    for (var i = b ? new Float32Array(u) : new Array(u), s = 0; s < u; ++s)
      i[s] = n(s * p, t, o);
    function d(h) {
      for (var m = 0, f = 1, w = u - 1; f !== w && i[f] <= h; ++f)
        m += p;
      --f;
      var E = (h - i[f]) / (i[f + 1] - i[f]), O = m + E * p, T = c(O, t, o);
      return T >= l ? x(h, O, t, o) : T === 0 ? O : z(h, m, m + p, t, o);
    }
    return function(m) {
      return m === 0 ? 0 : m === 1 ? 1 : n(d(m), a, S);
    };
  }, I;
}
var j = V();
const C = /* @__PURE__ */ B(j), k = {
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
    const r = { ...R, ...l };
    if (this.enable = !0, this.data = [], this.playing = !1, this.clearNextFrame = !1, this.playNextFrame = !1, this.addDataNextFrame = [], this.timestamp = 0, JSON.stringify(r) !== JSON.stringify(R)) {
      const u = { method: r.onStart instanceof Function ? r.onStart : r.onStart.method, is: !1 };
      Object.keys(r.to).length > 0 && this.data.push({ ...r, onStart: u });
    }
    return this.eachResult = this.result = r.from, this;
  }
  add(l) {
    const r = { ...R, ...l }, { from: N, to: u, duration: p, delay: b, easing: g, onUpdate: F, onComplete: v, onStart: n } = r, c = {
      from: N,
      to: u,
      duration: p,
      delay: b,
      easing: g,
      onUpdate: F,
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
    const { requestAnimationFrame: l } = window, [r] = this.data;
    if (r) {
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
    const { requestAnimationFrame: l } = window, [r] = this.data;
    if (!r) return;
    const { from: N, to: u, duration: p, delay: b, easing: g, onUpdate: F, onComplete: v, onStart: n } = r, c = N || this.result, x = (/* @__PURE__ */ new Date()).getTime() - this.timestamp - (b || 0), [D, e, t, a] = g, o = C(D, e, t, a), S = x / p;
    if (x < 0) {
      l(() => this.render());
      return;
    }
    if (Object.keys(n).length !== 0)
      if (n instanceof Function)
        n?.();
      else {
        const { method: d, is: h } = n;
        !h && d && (n.is = !0, d?.(c));
      }
    let i = {}, s = [];
    Object.entries(u).forEach((d) => {
      const [h, m] = d, f = Object.entries(c).filter((O) => O[0] === h);
      if (f.length === 0) {
        s.push(h);
        return;
      }
      const w = f.length > 0 ? f[0][1] : null;
      if (w === void 0) return;
      const E = w + (m - w) * o(S);
      i[h] = E;
    }), s.forEach((d) => {
      console.warn(`[Tweener] property "${d}" is undefined.`);
    }), x < p ? (this.eachResult = { ...this.result, ...i }, F?.(this.eachResult), this.enable ? l(() => this.render()) : (this.result = { ...this.result, ...i }, this.clearNextFrame && (this.clearNextFrame = !1, this.addDataNextFrame.length > 0 ? (this.data = [...this.addDataNextFrame], this.addDataNextFrame = []) : this.data = []), this.playNextFrame && (this.playNextFrame = !1, this.play()))) : (this.result = this.eachResult = { ...this.result, ...u }, this.data.shift(), v?.(this.result), this.data.length > 0 ? (this.reset(), this.data[0].from = this.data[0].from || this.result, this.enable && l(() => this.render())) : this.playing = !1);
  }
  reset() {
    this.timestamp = (/* @__PURE__ */ new Date()).getTime();
  }
}
export {
  M as default
};
