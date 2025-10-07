import BezierEasing from 'bezier-easing';

const Bezier = {
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
  inOutBack: [0.68, -0.55, 0.265, 1.55],
};

type OnStart = {
  is: boolean;
  method: Function | undefined;
};

type Option = {
  from?: object;
  to?: object;
  duration?: number;
  delay?: number;
  easing?: number[];
  onStart?: Function;
  onUpdate?: Function;
  onComplete?: Function;
};

type AllOption = {
  from: object;
  to: object;
  duration: number;
  delay: number;
  easing: number[];
  onStart: OnStart | Function;
  onUpdate: Function;
  onComplete: Function;
};

const defaultOptions: AllOption = {
  from: {},
  to: {},
  duration: 1000,
  delay: 0,
  easing: Bezier.outQuart,
  onStart: {
    is: false,
    method: () => {},
  },
  onUpdate: () => {},
  onComplete: () => {},
};

export default class Tweener {
  public enable: boolean;
  public data: AllOption[];
  public playing: boolean;
  private clearNextFrame: boolean;
  private playNextFrame: boolean;
  private addDataNextFrame: AllOption[];
  private eachResult: object | undefined;
  public result: object | undefined;
  private timestamp: number;
  /**
   * { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @param {object} options { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @returns
   */
  constructor(options: Option) {
    const opt: AllOption = { ...defaultOptions, ...options };

    this.enable = true;
    this.data = [];
    this.playing = false;
    this.clearNextFrame = false;
    this.playNextFrame = false;
    this.addDataNextFrame = [];
    this.timestamp = 0;

    if (JSON.stringify(opt) !== JSON.stringify(defaultOptions)) {
      const method = opt.onStart instanceof Function ? opt.onStart : opt.onStart.method;
      const onStart = { method, is: false };
      if (Object.keys(opt.to).length > 0) this.data.push({ ...opt, onStart });
    }

    this.eachResult = this.result = opt.from;
    return this;
  }

  add(options: Option) {
    const opt = { ...defaultOptions, ...options };

    const { from, to, duration, delay, easing, onUpdate, onComplete, onStart } = opt;

    const data: AllOption = {
      from,
      to,
      duration,
      delay,
      easing,
      onUpdate,
      onComplete,
      onStart: onStart || { method: () => {}, is: true },
    };

    if (!options.onStart) {
      data.onStart = { method: () => {}, is: true };
    } else {
      data.onStart = { method: onStart instanceof Function ? onStart : onStart.method, is: false };
    }

    if (this.clearNextFrame) {
      this.addDataNextFrame.push(data);
    }

    this.data.push(data);

    return this;
  }

  clearQueue() {
    if (this.data.length > 0) this.clearNextFrame = true;

    this.data = [];
    this.addDataNextFrame = [];
    this.result = this.eachResult;
    this.timestamp = new Date().getTime();
    return this;
  }

  play() {
    const { requestAnimationFrame } = window;

    const [data] = this.data;
    if (!data) return;

    if (this.clearNextFrame) {
      this.playNextFrame = true;
      return;
    }

    if (this.playing) return;
    this.playing = true;

    this.enable = true;
    this.timestamp = new Date().getTime();

    requestAnimationFrame(() => this.render());
    return this;
  }

  stop() {
    this.enable = false;
    this.playing = false;
    return this;
  }

  render() {
    const { requestAnimationFrame } = window;

    // get data form class
    const [data] = this.data;
    if (!data) return;
    const { from: currentFrom, to, duration, delay, easing, onUpdate, onComplete, onStart } = data;
    const from = currentFrom || this.result;

    // calc easing time
    const time = new Date().getTime() - this.timestamp;
    const currentTime = time - (delay || 0);
    const [x1, y1, x2, y2] = easing;
    const cubicBezier = BezierEasing(x1, y1, x2, y2);
    const timePercent = currentTime / duration;

    // wait for delay
    if (currentTime < 0) {
      requestAnimationFrame(() => this.render());
      return;
    }

    // onStart

    if (Object.keys(onStart).length !== 0) {
      if (onStart instanceof Function) {
        onStart?.();
      } else {
        const { method, is } = onStart;
        if (!is && method) {
          onStart.is = true;
          method?.(from);
        }
      }
    }

    // get value by easing time
    let result: Record<string, number> = {};
    let undefinedValue: string[] = [];

    Object.entries(to).forEach((e) => {
      const [key, value] = e;
      const fromMatchValue = Object.entries(from).filter((e) => e[0] === key);
      if (fromMatchValue.length === 0) {
        undefinedValue.push(key);
        return;
      }
      const fromValue = fromMatchValue.length > 0 ? fromMatchValue[0][1] : null;

      if (fromValue === undefined) return;
      const resultValue = fromValue + (value - fromValue) * cubicBezier(timePercent);
      result[key] = resultValue;
    });

    // if from value is undefined, set to value directly
    undefinedValue.forEach((key) => {
      console.warn(`[Tweener] property "${key}" is undefined.`);
    });

    if (currentTime < duration) {
      // keep render
      this.eachResult = { ...this.result, ...result };
      onUpdate?.(this.eachResult);
      if (this.enable) {
        requestAnimationFrame(() => this.render());
      } else {
        // force stop
        this.result = { ...this.result, ...result };
        if (this.clearNextFrame) {
          this.clearNextFrame = false;
          if (this.addDataNextFrame.length > 0) {
            this.data = [...this.addDataNextFrame];
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
      this.result = this.eachResult = { ...this.result, ...to };
      // remove queue
      this.data.shift();
      onComplete?.(this.result);

      // check data. run next queue when data still has one
      if (this.data.length > 0) {
        this.reset();
        this.data[0].from = this.data[0].from || this.result;
        // this.data[0].onStart?.();
        if (this.enable) requestAnimationFrame(() => this.render());
      } else {
        this.playing = false;
      }
    }
  }

  reset() {
    this.timestamp = new Date().getTime();
  }
}
