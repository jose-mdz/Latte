module latte{
    /**
     * Represents selection modes for DateItem
     **/
    export enum DateSelectionMode{

        /**
         * Single day
         **/
        DAY,

        /**
         * No side specified so let to user selection
         **/
        MANUAL,

        /**
         * Month
         **/
        MONTH,

        /**
         * Week
         **/
        WEEK,

        /**
         * Work week
         **/
        WORKWEEK

    }
}