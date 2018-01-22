module latte {

    /**
     *
     */
    export class DataBindActor {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the actor
         *
         * If no propertyChanged event is passed, the "propertyChanged" event will be automatically seeked.
         *
         */
        constructor(actor: any, propertyName: string, propertyType: BindValueType = BindValueType.STRING, propertyChanged: LatteEvent = null) {
            this._actor = actor;
            this._propertyName = propertyName;
            this._propertyType = propertyType;

            if(!this.propertyChanged) {
                let name = propertyName + "Changed";
                if(actor[name] instanceof LatteEvent) {
                    this._propertyChanged = actor[name];
                }
            }else{
               this._propertyChanged = propertyChanged;
            }
        }

        //region Private Methods
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _actor: any;

        /**
         * Gets the actor of the bind
         *
         * @returns {any}
         */
        get actor(): any {
            return this._actor;
        }

        /**
         * Property field
         */
        private _propertyChanged: LatteEvent;

        /**
         * Gets the event of property change
         *
         * @returns {LatteEvent}
         */
        get propertyChanged(): LatteEvent {
            return this._propertyChanged;
        }

        /**
         * Property field
         */
        private _propertyName: string;

        /**
         * Gets the name of the property
         *
         * @returns {string}
         */
        get propertyName(): string {
            return this._propertyName;
        }

        /**
         * Property field
         */
        private _propertyType: BindValueType;

        /**
         * Gets the type of the property
         *
         * @returns {BindType}
         */
        get propertyType(): BindValueType {
            return this._propertyType;
        }

        //endregion

    }

}