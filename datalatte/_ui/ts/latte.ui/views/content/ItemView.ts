module latte{
    /**
     * A View containing an Item
     **/
    export class ItemView extends View{

        /**
         *
         **/
        private _item: Item;


        /**
         *
         **/
        constructor(item: Item = null){

            super();
            this.element.addClass('item');

            if(item)
                this.item = item;

        }

        /**
         * Overriden.
         **/
            onLayout(){

            super.onLayout();

            if(this.item)
                this.item.onLayout();

        }

        /**
         * Gets or sets the item of the view
         **/
        get item(): Item{
            return this._item;
        }

        /**
         * Gets or sets the item of the view
         **/
        set item(value: Item){


            this._item = value;

            this.container.empty().append(value.element);



        }
    }
}