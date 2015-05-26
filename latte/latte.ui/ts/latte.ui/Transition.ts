module latte{
    /**
     * Defines possible transition modes for views
     **/
    export enum Transition{

        /**
         * Fades out the current view and fades in the new one.
         **/
        FADE,

        /**
         * Gives the impression of advancing forward.
         **/
        SWIPE_FORWARD

    }
}