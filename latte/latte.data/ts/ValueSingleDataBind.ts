module latte {

    /**
     * Binds one source to
     */
    export class ValueSingleDataBind {

        //region Static
        //endregion

        //region Fields
        lastHandleApplied: () => void;
        //endregion

        /**
         * Creates the bind
         */
        constructor(sourceActor: DataBindActor, targetActor: DataBindActor){
            this._sourceActor = sourceActor;
            this._targetActor = targetActor;

            // Install the bind
            this.install();
        }

        //region Private Methods

        //endregion

        //region Methods

        /**
         * Updates the target's value
         */
        apply(){

            if(this.skipNextApply) {
                this.skipNextApply = false;
                return;
            }

            this.onWillApply();

            let sourceValue = this.sourceActor.actor[this.sourceActor.propertyName];
            let targetValue = DataBindCoercion.coerce(sourceValue, this.sourceActor.propertyType, this.targetActor.propertyType);

            this.targetActor.actor[this.targetActor.propertyName] = targetValue;

            this.onApplied();

        }

        /**
         * Installs the bind
         */
        install(){

            // Uninstall in case of repeated call
            this.uninstall();

            let s = this.sourceActor;

            // Catch value change on source
            if(s.propertyChanged instanceof LatteEvent) {

                // Handle valueChanged Event
                this.lastHandleApplied = () => {
                    this.apply();
                };

                // Assign handler
                s.propertyChanged.add(this.lastHandleApplied);

            }

            this.apply();

        }

        /**
         * Raises the <c>applied</c> event
         */
        onApplied(){
            if(this._applied){
                this._applied.raise();
            }
        }

        /**
         * Raises the <c>willApply</c> event
         */
        onWillApply(){
            if(this._willApply){
                this._willApply.raise();
            }
        }

        /**
         * Uninstalls the bind
         */
        uninstall(){

            if(this.lastHandleApplied) {
                this.sourceActor.propertyChanged.remove(this.lastHandleApplied);
            }

        }

        //endregion

        //region Events


        /**
         * Back field for event
         */
        private _applied: LatteEvent;

        /**
         * Gets an event raised when the value has been applied to the target
         *
         * @returns {LatteEvent}
         */
        get applied(): LatteEvent{
            if(!this._applied){
                this._applied = new LatteEvent(this);
            }
            return this._applied;
        }


        /**
         * Back field for event
         */
        private _willApply: LatteEvent;

        /**
         * Gets an event raised when the bind will apply the value
         *
         * @returns {LatteEvent}
         */
        get willApply(): LatteEvent{
            if(!this._willApply){
                this._willApply = new LatteEvent(this);
            }
            return this._willApply;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _sourceActor: DataBindActor;

        /**
         * Gets the source actor data
         *
         * @returns {DataBindActor}
         */
        get sourceActor(): DataBindActor {
            return this._sourceActor;
        }

        /**
         * Property field
         */
        private _skipNextApply: boolean = false;

        /**
         * Gets or sets a value indicating if the next apply should be ignored
         *
         * @returns {boolean}
         */
        get skipNextApply(): boolean {
            return this._skipNextApply;
        }

        /**
         * Gets or sets a value indicating if the next apply should be ignored
         *
         * @param {boolean} value
         */
        set skipNextApply(value: boolean) {
            this._skipNextApply = value;
        }

        /**
         * Property field
         */
        private _targetActor: DataBindActor;

        /**
         * Gets the target actor data
         *
         * @returns {DataBindActor}
         */
        get targetActor(): DataBindActor {
            return this._targetActor;
        }


        //endregion

    }

}