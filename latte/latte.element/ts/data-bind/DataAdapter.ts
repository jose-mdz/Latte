/**
 * Created by josemanuel on 5/28/15.
 */
module latte {

    /**
     * Requirements for an adapter. An adapter transforms the values from an latte.Element to any other object.
     */
    export interface DataAdapter<E, V> {

        /**
         * Transforms the value of the record into a proper value for the element
         *
         * @param value
         */
        adaptForElement(value: V): E;

        /**
         * Transforms the value of the element into a proper value for the record
         * @param value
         */
        adaptForRecord(value: E): V;
    }

}