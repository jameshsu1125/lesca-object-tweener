import BezierEasing from 'bezier-easing';

export const Bezier = {
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
	easeInOutBack: [0.68, -0.55, 0.265, 1.55],
};

const defaultOptions = {
	from: false,
	to: false,
	duration: 1000,
	delay: 0,
	easing: Bezier.easeOutQuart,
	onUpdate: void 0,
	onComplete: void 0,
	onStart: void 0,
};

export default class Tweener {
	/**
	 * { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
	 * @param {object} options { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
	 * @returns
	 */
	constructor(options = defaultOptions) {
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

	add({
		from,
		to,
		duration = 1000,
		delay = 0,
		easing = Bezier.easeOutQuart,
		onUpdate = void 0,
		onComplete = void 0,
		onStart = void 0,
	}) {
		const data = { from, to, duration, delay, easing, onUpdate, onComplete, onStart };
		if (this.clearNextFrame) {
			this.addDataNextFrame.push(data);
		}
		this.data.push(data);
		return this;
	}

	clearQueue() {
		if (this.data.length > 0) this.clearNextFrame = true;
		return this;
	}

	play() {
		const { requestAnimationFrame } = window;

		if (this.clearNextFrame) {
			this.playNextFrame = true;
			return;
		}

		if (this.playing) return;
		this.playing = true;

		this.enable = true;
		this.timestamp = new Date().getTime();

		const [data] = this.data;
		data.onStart?.();

		requestAnimationFrame(() => this.render());
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
		const { from: nfrom, to, duration, delay, easing, onUpdate, onComplete } = data;

		const from = nfrom || this.result;

		// calc easing time
		const time = new Date().getTime() - this.timestamp;
		const currentTime = time - delay;
		const [x1, y1, x2, y2] = easing;
		const cubicBezier = BezierEasing(x1, y1, x2, y2);
		const timePercent = currentTime / duration;

		// wait for delay
		if (currentTime < 0) {
			requestAnimationFrame(() => this.render());
			return;
		}

		// get value by easing time
		let result = {};
		Object.entries(to).forEach((e) => {
			const [key, value] = e;
			const fromValue = from[key];
			if (fromValue === undefined) return;
			const resultValue = fromValue + (value - fromValue) * cubicBezier(timePercent);
			result[key] = resultValue;
		});

		if (currentTime < duration) {
			// keep render
			onUpdate?.(result);
			if (this.enable) {
				requestAnimationFrame(() => this.render());
			} else {
				// force stop
				this.result = { ...from, ...result };
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
			this.result = { ...from, ...result };
			// remove queue
			this.data.shift();
			onComplete?.(to);

			// check data. run next queue when data still has one
			if (this.data.length > 0) {
				this.reset();
				this.data[0].from = this.result;
				this.data[0].onStart?.();
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
