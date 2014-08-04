module latte{
    /**
     * Executes an action every specified amount of milliseconds
     **/
    export class Timer{

        /**
         *
         **/
        private _callback: any;

        /**
         *
         **/
        private _context: any;

        /**
         *
         **/
        private _milliseconds: any;

        /**
         *
         **/
        private _paused: any;

        /**
         * Creates a timer that will call <c>callback</c> every specified amount of
         <c>milliseconds</c> on the specified <c>context</c>.
         **/
        constructor(callback: Function, milliseconds: number, context: any){


            this.callback = callback;
            this.milliseconds = milliseconds;
            this.context = context;


        }

        /**
         * Gets or sets the function who will be called every tick
         **/
        get callback(): Function{

                return this._callback;

        }

        /**
         * Gets or sets the function who will be called every tick
         **/
        set callback(value: Function){

            this._callback = value;

        }

        /**
         * Gets or sets the context in which the function is executed
         **/
        get context(): any{

                return this._context;

        }

        /**
         * Gets or sets the context in which the function is executed
         **/
        set context(value: any){

            this._context = value;

        }

        /**
         * Gets or sets the milliseconds to sleep between calls
         **/
        get milliseconds(): number{

                return this._milliseconds;

        }
        /**
         * Gets or sets the milliseconds to sleep between calls
         **/
        set milliseconds(value: number){

            this._milliseconds = value;

        }

        /**
         * Pauses the timer
         **/
        pause(){

            this._paused = true;

        }

        /**
         * Starts ticking
         **/
        start(){


            if(this._paused === false) return;

            this._paused = false;

            setTimeout(
                () => { this.tick() },
                this.milliseconds
            );


        }

        /**
         * Ticks the timer. Executes the callback and programs next tick.
         **/
        tick(){

            // If paused, bye bye!
            if(this._paused === true) return;

            // Call callback
            this.callback.apply(this.context);

            // Program next tick
            setTimeout(
                () => { this.tick() },
                this.milliseconds
            );

        }
    }
}