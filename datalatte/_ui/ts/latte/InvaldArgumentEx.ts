module latte{

    /**
     * Exception thrown when an argument of the function was invalid.
     *
     * Usage:
     * <example>
     *
     * function pow(a){
     *
     *      if(typeof a != 'number')
     *          // Inform user that the parameter was invalid
     *          throw new InvalidArgumentEx('a');
     *
     *      return a * a;
     *
     * }
     *
     * </example>
     */
    export class InvalidArgumentEx extends Ex{

        /**
         * Creates the exception
         *
         * @param argument
         * @param value
         */
        constructor(public argument: string = "", public value: any = ""){
            super();
        }

        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        toString(){
            return "Invalid argument: " +
                (this.argument ? this.argument : '<no argument specified>') +
                (!this.value ? " ( " + this.value + ")": '')
        }
    }
}