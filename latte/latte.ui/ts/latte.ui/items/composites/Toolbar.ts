module latte{
    /**
     * Shows items in a strip
     **/
    export class Toolbar extends Item{

        /**
         *
         **/
        private _direction: Direction;

        /**
         *
         **/
        private _faceVisible: boolean;

        /**
         *
         **/
        private _holderWide: number;

        /**
         *
         **/
        private _padding: number;

        /**
         * Face of toolbar
         **/
        faceElement: JQuery;

        /**
         * Holds the items to a certain width
         **/
        holderElement: JQuery;

        /**
         * Collection of items in the toolbar
         **/
        items: Collection<Item>;

        /**
         * Element where the items are placed
         **/
        itemsElement: JQuery;

        /**
         * Collection of items shown in the opposite side of toolbar
         **/
        sideItems: Collection<Item>;

        /**
         * Element where the side items are placed
         **/
        sideItemsElement: JQuery;

        /**
         * Raised when items are addded or removed
         **/
        itemsChanged: LatteEvent;

        /**
         * Raised when side items are addded or removed
         **/
        sideItemsChanged: LatteEvent;


        /**
         * Creates the Toolbar
         **/
        constructor(){


            // Init
            super();
            this.element.addClass('toolbar');
            UiElement.disableTextSelection(this.element);

            // Events
            this.itemsChanged = new LatteEvent(this);
            this.sideItemsChanged = new LatteEvent(this);

            // Init elements
            this.faceElement = $('<div>').addClass('face').appendTo(this.element);
            this.holderElement = $('<div>').addClass('holder').appendTo(this.faceElement);
            this.itemsElement = $('<div>').addClass('items-container').appendTo(this.holderElement);
            this.sideItemsElement = $('<div>').addClass('side-items-container').appendTo(this.holderElement);
            this.faceElement.clear();

            // Initialize collection
            this.items = new Collection<Item>(this._onAddItem, this._onRemoveItem, this);
            this.sideItems = new Collection<Item>(this._onAddSideItem, this._onRemoveSideItem, this);

            this.direction = Direction.HORIZONTAL;
            this.faceVisible = true;

        }

        /**
         *
         **/
        private _onAddItem(item: Item){


            if(item instanceof ButtonItem){
                (<ButtonItem>item).faceVisible = false;
            }

            item.appendTo(this.itemsElement);

            // Apply padding
            if(this.padding) item.element.css('marginRight', this.padding);

            this.onItemsChanged();

        }

        /**
         *
         **/
        private _onAddSideItem(item: Item){

            if(item instanceof ButtonItem){
                (<ButtonItem>item).faceVisible = false;
            }
            item.appendTo(this.sideItemsElement);

            // Apply padding
            if(this.padding) item.element.css('marginRight', this.padding);

            this.onSideItemsChanged();

        }

        /**
         *
         **/
        private _onRemoveItem(item: Item){

            item.element.detach();
            this.onItemsChanged();

        }

        /**
         *
         **/
        private _onRemoveSideItem(item: Item){

            item.element.detach();
            this.onSideItemsChanged();

        }

        /**
         * Raises the <c>itemsChanged</c> event
         **/
            onItemsChanged(){

            this.itemsChanged.raise();

        }

        /**
         * Raises the <c>itemsChanged</c> event
         **/
            onSideItemsChanged(){

            this.sideItemsChanged.raise();

        }

        /**
         * Gets or sets the direction of the toolbar
         **/
        get direction(): Direction{
            return this._direction;
        }

        /**
         * Gets or sets the direction of the toolbar
         **/
        set direction(value: Direction){


            var changed = value !== this._direction;

            this._direction = value;

            if(changed){

                if(value === Direction.HORIZONTAL){
                    this.removeClass('vertical');
                    this.addClass('horizontal');
                }else{
                    this.removeClass('horizontal');
                    this.addClass('vertical')
                }

                this.onLayout();
            }



        }

        /**
         * Gets or sets a value indicating if the face of toolbar should be visible.
         **/
        get faceVisible(): boolean{
            return this._faceVisible;
        }

        /**
         * Gets or sets a value indicating if the face of toolbar should be visible.
         **/
        set faceVisible(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            if(value)
                this.element.addClass('with-face');
            else
                this.element.removeClass('with-face');

            this._faceVisible = value;


        }

        /**
         * Gets or sets the wide of the items holder to limit the area where items are placed.
         A value of zero or lower will set the holder to the wide of toolbar
         **/
        get holderWide(): number{
            return this._holderWide;
        }

        /**
         * Gets or sets the wide of the items holder to limit the area where items are placed.
         A value of zero or lower will set the holder to the wide of toolbar
         **/
        set holderWide(value: number){


            if(!_isNumber(value))
                throw new InvalidArgumentEx('value');

            if(value > 0){
                this.holderElement.width(value);
            }else{
                this.css('width', '');
            }

            this._holderWide = value;


        }

        /**
         * Gets or sets the padding of the toolbar.
         Can be set to <c>null</c> to reset padding to original.
         **/
        get padding(): number{
            return this._padding;
        }

        /**
         * Gets or sets the padding of the toolbar.
         Can be set to <c>null</c> to reset padding to original.
         **/
        set padding(value: number){


            if(value == null) value = 0;

            this._padding = value;

            // Adjust margins
            this.itemsElement.children().css('marginRight', value);
            this.itemsElement.css('paddingLeft', value);
            this.sideItemsElement.children().css('marginLeft', value);
            this.sideItemsElement.css('paddingRight', value);



        }
    }
}