/**
 * Created by josemanuel on 5/29/14.
 */
module latte {

    /**
     *
     */
    export class Animation {

        //region Static

        /**
         * Animates the bounds of the node
         * @param p
         * @param duration
         */
        static moveBounds(destination: DrawingRectangle, duration: number): Animation{

            var a = new Animation(duration);

            // Get initial state
            a.initialStateProcessor = (node: DrawingNode) => {
                var r: any = {};

                var xd = destination.left - node.left;
                var yd = destination.top - node.top;
                var wd = destination.width - node.width;
                var hd = destination.height - node.height;

                r.x = node.left;
                r.y = node.top;
                r.width = node.width;
                r.height = node.height;

                r.xSpeed = xd / a.frames;
                r.ySpeed = yd / a.frames;
                r.wSpeed = wd / a.frames;
                r.hSpeed = hd / a.frames;

                return r;
            };

            // Update according to frame
            a.update.add((node: DrawingNode, frame: number, initialState: any) => {

                var xd = initialState.xSpeed * frame;
                var yd = initialState.ySpeed * frame;
                var wd = initialState.wSpeed * frame;
                var hd = initialState.hSpeed * frame;

                node.location = new Point(initialState.x + xd, initialState.y + yd);
                node.size = new Size(initialState.width + wd, initialState.height + hd);

            });

            return a;

        }

        /**
         * Animates the position of the node
         * @param p
         * @param duration
         */
        static moveLocation(destination: Point, duration: number): Animation{

            var a = new Animation(duration);

            // Get initial state
            a.initialStateProcessor = (node: DrawingNode) => {
                var r: any = {};

                var xd = destination.x - node.left;
                var yd = destination.y - node.top;

                r.x = node.left;
                r.y = node.top;
                r.xSpeed = xd / a.frames;
                r.ySpeed = yd / a.frames;

                return r;
            };

            // Update according to frame
            a.update.add((node: DrawingNode, frame: number, initialState: any) => {

                var xd = initialState.xSpeed * frame;
                var yd = initialState.ySpeed * frame;

                node.location = new Point(initialState.x + xd, initialState.y + yd);

                //log(node.location);

            });

            return a;

        }


        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(duration: number) {
            this.duration = duration;
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Gets the initial state of the animation
         */
        getInitialState(node: DrawingNode): any{
            return this.initialStateProcessor.call(this, node);
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
         private _update: LatteEvent

        /**
         * Gets an event raised when the animation should update a target
         *
         * @returns {LatteEvent}
         */
        public get update(): LatteEvent{
            if(!this._update){
                this._update = new LatteEvent(this);
            }
            return this._update;
        }

        /**
         * Raises the <c>update</c> event
         */
        public onUpdate(node: DrawingNode, frame: number, initialState: any){
            if(this._update){
                this._update.raise(node, frame, initialState);
            }
        }


        //endregion

        //region Properties


        /**
         * Property field
         */
        private _duration:number = 1;

        /**
         * Gets or sets the seconds that animation should last
         *
         * @returns {number}
         */
        public get duration():number {
            return this._duration;
        }

        /**
         * Gets or sets the seconds that animation should last
         *
         * @param {number} value
         */
        public set duration(value:number) {
            this._duration = value;
        }

        /**
         * Gets the number of frames that the animation should last
         *
         * @returns {number}
         */
        public get frames():number {
            return Math.round(this.duration * 32);
        }

        /**
         * Property field
         */
        private _initialStateProcessor:(node: DrawingNode) => any = null;

        /**
         * Gets or sets a function that returns the initial state for the node
         *
         * @returns {() => any}
         */
        public get initialStateProcessor():(node: DrawingNode) => any {
            return this._initialStateProcessor;
        }

        /**
         * Gets or sets a function that returns the initial state for the node
         *
         * @param {() => any} value
         */
        public set initialStateProcessor(value:(node: DrawingNode) => any) {
            this._initialStateProcessor = value;
        }

        //endregion

    }

}