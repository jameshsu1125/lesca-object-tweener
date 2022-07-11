export declare const Bezier: {
    linear: number[];
    easeIn: number[];
    easeOut: number[];
    easeInOut: number[];
    easeInSine: number[];
    easeOutSine: number[];
    easeInOutSine: number[];
    easeInCubic: number[];
    easeOutCubic: number[];
    easeInOutCubic: number[];
    easeInQuint: number[];
    easeOutQuint: number[];
    easeInOutQuint: number[];
    easeInCirc: number[];
    easeOutCirc: number[];
    easeInOutCirc: number[];
    easeInQuad: number[];
    easeOutQuad: number[];
    easeInOutQuad: number[];
    easeInQuart: number[];
    easeOutQuart: number[];
    easeInOutQuart: number[];
    easeInExpo: number[];
    easeOutExpo: number[];
    easeInOutExpo: number[];
    easeInBack: number[];
    easeOutBack: number[];
    easeInOutBack: number[];
};
declare type OnStart = {
    is: boolean;
    method: Function | undefined;
};
declare type Option = {
    from?: object;
    to?: object;
    duration?: number;
    delay?: number;
    easing?: number[];
    onStart?: Function;
    onUpdate?: Function;
    onComplete?: Function;
};
declare type AllOption = {
    from: object;
    to: object;
    duration: number;
    delay: number;
    easing: number[];
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
    play(): this;
    stop(): this;
    render(): void;
    reset(): void;
}
export {};
