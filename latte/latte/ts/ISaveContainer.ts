/**
 * Created by josemanuel on 7/18/16.
 */
module latte {

    /**
     * The SaveContainer is an object that may contain ISave objects in its structure.
     */
    export interface ISaveContainer {

        /**
         * Collection of ISave objects this container has.
         */
        saveItems: Collection<ISave>;

    }

}