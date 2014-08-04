module latte{
    /**
     * A view with an editable text box
     **/
    export class TextView extends View{

        /**
         * Points to the TEXTAREA of the view.
         **/
        textElement: JQuery;


        /**
         * Creates the TextView
         **/
        constructor(){


            super();
            this.element.addClass('text');
            this.textElement = $('<textarea>').appendTo(this.container);


        }

        /**
         * Gets or sets the text of the view
         **/
        get text(): string{
            return this.textElement.val();
        }

        /**
         * Gets or sets the text of the view
         **/
        set text(value: string){


            this.textElement.val(value);


        }
    }
}