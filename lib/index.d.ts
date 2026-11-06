declare const Bezier: {
    linear: number[];
    easeIn: number[];
    easeOut: number[];
    easeInOut: number[];
    inSine: number[];
    outSine: number[];
    inOutSine: number[];
    inCubic: number[];
    outCubic: number[];
    inOutCubic: number[];
    InQuint: number[];
    OutQuint: number[];
    InOutQuint: number[];
    inCirc: number[];
    outCirc: number[];
    inOutCirc: number[];
    inQuad: number[];
    outQuad: number[];
    inOutQuad: number[];
    inQuart: number[];
    outQuart: number[];
    inOutQuart: number[];
    inExpo: number[];
    outExpo: number[];
    inOutExpo: number[];
    inBack: number[];
    outBack: number[];
    inOutBack: number[];
};
type EasingFn = (t: number) => number;
type Easing = number[] | EasingFn;
/** Function-based easings that cubic-bezier cannot express (multiple oscillations). */
declare const Elastic: Record<'inElastic' | 'outElastic' | 'inOutElastic', EasingFn>;
type OnStart = {
    is: boolean;
    method: Function | undefined;
};
type Option = {
    from?: object;
    to?: object;
    duration?: number;
    delay?: number;
    easing?: Easing;
    onStart?: Function;
    onUpdate?: Function;
    onComplete?: Function;
};
type AllOption = {
    from: object;
    to: object;
    duration: number;
    delay: number;
    easing: Easing;
    onStart: OnStart | Function;
    onUpdate: Function;
    onComplete: Function;
};
export default class Tweener {
    enable: boolean;
    data: AllOption[];
    playing: boolean;
    private clearNextFrame;
    private playNextFrame;
    private addDataNextFrame;
    private eachResult;
    result: object | undefined;
    private timestamp;
    /**
     * { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
     * @param {object} options { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
     * @returns
     */
    constructor(options: Option);
    add(options: Option): this;
    clearQueue(): this;
    play(): this | undefined;
    stop(): this;
    render(): void;
    reset(): void;
}
export { Bezier, Elastic };
export type { Easing, EasingFn };
