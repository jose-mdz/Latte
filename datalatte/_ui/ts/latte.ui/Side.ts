module latte{
    /**
     * Enumerates sides of objects
     **/
    export enum Side{

        /**
         * No side specified so automatic side is chosen.
         **/
        AUTO = 1,

        /**
         * Bottom side of something
         **/
        BOTTOM = 4,

        /**
         * Left side of something
         **/
        LEFT = 8,

        /**
         * Right side of something
         **/
        RIGHT = 16,

        /**
         * Top side of something
         **/
        TOP = 32,

    }
}