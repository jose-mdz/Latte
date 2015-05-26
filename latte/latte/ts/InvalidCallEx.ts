module latte{

    /**
     * Exception thrown when an argument of the function was invalid.
     *
     * Usage:
     * <example>
     *
     * function pow(a){
     *
     *      throw new latte.InvalidCallEx('pow')
     *
     * }
     *
     * </example>
     */
    export class InvalidCallEx extends Ex{

        /**
         * Creates the Exception
         * @param method
         */
        constructor(public method: string = null){
            super();
        }

        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        toString(){
            return "Invalid call: " +
                (this.method ? this.method : '<no method specified>');
        }

    }
}