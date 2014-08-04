module latte{
    /**
     * A <c>View</c> with a ribbon on the top.

     The view reacts in size when ribbon is collapsed and preserves it on the top.
     **/
    export class RibbonView extends AnchorView{

        /**
         * The Ribbon of the View
         **/
        ribbon: Ribbon;


        /**
         * Creates the View
         **/
        constructor(){

            super();

            this.element.addClass('ribbon');

            // Create Ribbon
            this.ribbon = new Ribbon();

            this.anchorTop = this.ribbon;

            this.ribbon.collapsedChanged.add(() => {
                this.onLayout();
            });

//            this.element.prepend(this.ribbon.element);


        }

        /**
         * Handles changes in size
         **/
        onLayoutHIDDEN(){


            super.onLayout();

            this.ribbon.onLayout();

            // Position the container
            this.container.css('top', this.ribbon.element.height());


        }
    }
}