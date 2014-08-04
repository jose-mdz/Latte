module latte{

    /**
     * Generic Exception class
     *
     * Usage
     * <example>
     *  if(somethingWrong){
     *      // Throw a simple exception
     *      throw new Ex()
     *  }
     * </example>
     */
    export class Ex{

        private description: string;

        /**
         * Creates the exception object
         *
         * @param description
         */
        constructor(description: string = ""){
            this.description = description;
        }

        /**
         * Returns the exception as a string.
         *
         * @returns {string}
         */
        toString(){
            return this.description ? this.description :  "Uncaught exception";
        }
    }
}