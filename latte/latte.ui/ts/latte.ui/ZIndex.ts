module latte{
    /**
     * Manages z-index related positions
     <b style="color:darkred">This class should not be used directly because it is likely to disappear in future version</b>
     **/
    export class ZIndex{

        /**
         * Array of elements that are being handled by class
         **/
        static elements: Array<JQuery> = [];


        /**
         * Brings the specified element to the top
         **/
        static bringToFront(element: JQuery){

            if(element instanceof jQuery)
                element = element.get(0);


            // Add to elements
            this.elements.push(element);

            // Update indexes
            this.updateZIndexes();

        }

        /**
         * Remove elemet from elements, and erase z-index
         **/
        static removeElement(element: JQuery){

            var arr = [];

            if(element instanceof jQuery)
                element = element.get(0);

            // Remove z-index
            // debugger;
            $(element).css('zIndex', '');


            // Create new array
            for(var i = 0; i < this.elements.length; i++)
                if(this.elements[i] !== element)
                    arr.push(this.elements[i]);

            // Set new array
            this.elements = arr;

            this.updateZIndexes();

        }

        /**
         * Updates the z-indexes of elements
         **/
        static updateZIndexes(){


            // Calculate max index
            //var max = document.all ? document.all.length : $('*').length;
            var max = $(':not(.latte-overlay.menu)').length - this.elements.length;

            for(var i = 0; i < this.elements.length; i++){
                $(this.elements[i]).css('zIndex', max++);
            }

        }
    }
}