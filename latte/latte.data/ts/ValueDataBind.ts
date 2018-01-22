module latte {

    /**
     * Binds two values bi-directionally
     */
    export class ValueDataBind {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the bi-directional bind
         */
        constructor(a: DataBindActor, b: DataBindActor) {

            this._actorA = a;
            this._actorB = b;

            // Install two singe binds
            this._bindA = new ValueSingleDataBind(a, b);
            this._bindB = new ValueSingleDataBind(b, a);

            this.bindA.willApply.add(() => {
                this.bindB.skipNextApply = true;
            });

            this.bindB.willApply.add(() => {
                this.bindA.skipNextApply = true;
            })

        }

        //region Private Methods
        //endregion

        //region Methods
        /**
         * Uninstall the
         */
        uninstall(){
            this.bindA.uninstall();
            this.bindB.uninstall();
        }
        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _actorA: DataBindActor;

        /**
         * Gets the A actor
         *
         * @returns {DataBindActor}
         */
        get actorA(): DataBindActor {
            return this._actorA;
        }

        /**
         * Property field
         */
        private _actorB: DataBindActor;

        /**
         * Gets the B actor
         *
         * @returns {DataBindActor}
         */
        get actorB(): DataBindActor {
            return this._actorB;
        }

        /**
         * Property field
         */
        private _bindA: ValueSingleDataBind;

        /**
         * Gets the A bind
         *
         * @returns {ValueSingleDataBind}
         */
        get bindA(): ValueSingleDataBind {
            return this._bindA;
        }

        /**
         * Property field
         */
        private _bindB: ValueSingleDataBind;

        /**
         * Gets the B Bind
         *
         * @returns {ValueSingleDataBind}
         */
        get bindB(): ValueSingleDataBind {
            return this._bindB;
        }


        //endregion


    }

}