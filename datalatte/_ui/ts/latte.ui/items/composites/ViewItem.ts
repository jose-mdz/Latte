module latte{
    /**
     * An Item for containing a View
     **/
    export class ViewItem extends Item{

        /**
         *
         **/
        private _autoHeight: boolean;

        /**
         *
         **/
        private _view: View;

        /**
         * Creates the Item, optionally specifies the view to contain.
         **/
        constructor(view: View = null){

            super();
            this.element.addClass('view');

            if(view)
                this.view = view;

        }

        /**
         * Gets or sets a value indicating if the item's height will be adjusted
         to the contents of the view.

         This is achieved by setting the bottom CSS property of the View and its container to 'inherit'
         **/
        get autoHeight(): boolean{
            return this._autoHeight;
        }

        /**
         * Gets or sets a value indicating if the item's height will be adjusted
         to the contents of the view.

         This is achieved by setting the bottom CSS property of the View and its container to 'inherit'
         **/
        set autoHeight(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._autoHeight = value;

            if(value){
                this.view.element.css('bottom', 'inherit');
                this.view.container.css('bottom', 'inherit');
            }else{
                this.view.element.css('bottom', '');
                this.view.container.css('bottom', '');
            }



        }

        /**
         * Gets or sets the height of the item, and so the view
         **/
        get height(): number{
            return this.element.height();
        }

        /**
         * Gets or sets the height of the item, and so the view
         **/
        set height(value: number){
            this.element.height(value);
        }

        /**
         * Gets or sets the View inside this item
         **/
        get view(): View{
            return this._view;
        }

        /**
         * Gets or sets the View inside this item
         **/
        set view(value: View){


            this._view = value;
            this.element.empty();

            value.appendTo(this.element);



        }
    }
}