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
export {};
