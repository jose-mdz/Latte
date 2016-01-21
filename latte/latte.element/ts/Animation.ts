/**
 * Created by josemanuel on 4/20/15.
 */
module latte {

    /**
     *
     */
    export class Animation {

        //region Static

        /**
         * Stack of active animations
         * @type {Array}
         */
        static stack: Animation[] = [];

        /**
         * Gets the requestAnimationRequest function, cross-browser
         */
        static get requestAnimationFrame(): any{
            return window.requestAnimationFrame || (function() {
                    var timeLast = 0;

                    return window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || function(callback) {
                            var timeCurrent = (new Date()).getTime(), timeDelta;

                            /* Dynamically set the delay on a per-tick basis to more closely match 60fps. */
                            /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671. */
                            timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
                            timeLast = timeCurrent + timeDelta;

                            return setTimeout(function() { callback(timeCurrent + timeDelta); }, timeDelta);
                        };
                })();
        }

        static loopActive:boolean = false;

        /**
         * Starts the animation loop.
         */
        static loop(){

            Animation.loopActive = true;

            var now = DateTime.now;
            var runningAnimations = 0;

            for (var i = 0; i < Animation.stack.length; i++) {

                // Get animation to attend
                var a = Animation.stack[i];

                // If animation no longer valid, continue
                if(!a || !a.running) continue;

                var value = a.currentValue;

                //log("Updating: %s-%s -> %s", a.startValue, a.endValue, a.currentValue)
                if(now.compareTo(a.endTime) > 0 || value >= a.endValue) {
                    a._running = false;
                    a.onUpdate(a.endValue);
                    a.onEnded();
                }else {
                    a.onUpdate(value);
                    runningAnimations++;
                }
            }

            if(runningAnimations > 0){
                var rq = Animation.requestAnimationFrame;
                //log("Relooping")
                rq(Animation.loop);
            }else{
                // Clear stack
                //log("Ending Loop")
                Animation.stack = [];
                Animation.loopActive = false;
            }

        }

        //endregion

        //region Fields
        //endregion

        /**
         * Creates the animation
         * @param startValue
         * @param endValue
         * @param duration Duration of animation in seconds
         */
        constructor(startValue: number, endValue: number, duration: number, updateHandler: (value?: number) => any = null, endHandler: () => any = null) {
            this._duration = duration;
            this._startValue = startValue;
            this._endValue = endValue;

            if(updateHandler) {
                this.update.add(updateHandler);
            }

            if(endHandler) {
                this.ended.add(endHandler);
            }
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Gets the value of the animation for the specified second of the animation
         * @param f
         * @returns {number}
         */
        getValueForSecond(s: number){
            //if(this.startValue  + (this.speed * s) > 600) {
            //    debugger;
            //}
            return this.startValue + (this.speed * s);
        }

        /**
         * Starts the animation
         */
        start(){
            this._startTime = DateTime.now;
            this._running = true;

            Animation.stack.push(this);
            if(!Animation.loopActive)
                Animation.loop(); // Start the animation loop

        }
        //endregion

        //region Events


        /**
         * Back field for event
         */
        private _ended: LatteEvent;

        /**
         * Gets an event raised when the animation ends
         *
         * @returns {LatteEvent}
         */
        get ended(): LatteEvent{
            if(!this._ended){
                this._ended = new LatteEvent(this);
            }
            return this._ended;
        }

        /**
         * Raises the <c>ended</c> event
         */
        onEnded(){
            if(this._ended){
                this._ended.raise();
            }

        }

        /**
         * Back field for event
         */
        private _update: LatteEvent;

        /**
         * Gets an event raised when an update to the animation is performed
         *
         * @returns {LatteEvent}
         */
        get update(): LatteEvent{
            if(!this._update){
                this._update = new LatteEvent(this);
            }
            return this._update;
        }

        /**
         * Raises the <c>update</c> event
         */
        onUpdate(value: number){
            if(this._update){
                this._update.raise(value);
            }
        }
        //endregion

        //region Properties

        /**
         * Gets the current value of distance to the current frame
         *
         * @returns {number}
         */
        get currentValue():number {

            return this.getValueForSecond(DateTime.now.subtractDate(this.startTime).totalSeconds);
        }

        /**
         * Gets the distance of the animation
         *
         * @returns {number}
         */
        get distance():number {
            return this.endValue - this.startValue;
        }

        /**
         * Property field
         */
        private _duration:number;

        /**
         * Gets the duration of the animation, in seconds
         *
         * @returns {number}
         */
        get duration():number {
            return this._duration;
        }

        /**
         * Property field
         */
        private _endValue:number;

        /**
         * Gets the final value of the animation
         *
         * @returns {number}
         */
        get endValue():number {
            return this._endValue;
        }

        /**
         * Gets the end time of the animation
         *
         * @returns {number}
         */
        get endTime():DateTime {
            return this.startTime.addSeconds(this.duration);
        }

        /**
         * Property field
         */
        private _running:boolean = false;

        /**
         * Gets a value indicating if the animation is currently running
         *
         * @returns {boolean}
         */
        get running():boolean {
            return this._running;
        }


        /**
         * Property field
         */
        private _startValue:number;

        /**
         * Gets the initial value for the animation
         *
         * @returns {number}
         */
        get startValue():number {
            return this._startValue;
        }

        /**
         * Property field
         */
        private _startTime:DateTime;

        /**
         * Gets or sets the initial time of the animation
         *
         * @returns {DateTime}
         */
        get startTime():DateTime {
            return this._startTime;
        }

        /**
         * Gets or sets the initial time of the animation
         *
         * @returns {DateTime}
         */
        set startTime(value: DateTime){
            this._startTime = value;
        }

        /**
         * Gets the speed of the animation value, in distance per second
         *
         * @returns {number}
         */
        get speed():number {
            return this.distance / this.duration;
        }

        /**
         * Property field
         */
        private _tag:any = null;

        /**
         * Gets or sets the tag of the animation
         *
         * @returns {any}
         */
        get tag():any {
            return this._tag;
        }

        /**
         * Gets or sets the tag of the animation
         *
         * @param {any} value
         */
        set tag(value:any) {
            this._tag = value;
        }

        //endregion

    }

}