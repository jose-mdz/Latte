module latte {

    /**
     * Wrapper of a div element
     */
    export class DivElement extends Element<HTMLElement> {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(className: string = null) {
            super();

            if(className)
            this.addClass(className);
        }

        //region Private Methods
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

    }

}