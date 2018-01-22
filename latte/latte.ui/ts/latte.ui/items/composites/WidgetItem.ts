module latte{
    /**
     * Represents a widget.

     Widgets are like small windows who can be maximized, minimized and dragged around.
     **/
    export class WidgetItem extends Item{


        /**
         * Collection of items in widget
         **/
        items: Collection<Item>;

        /**
         * Stack of items in the widget
         **/
        stack: ItemStack;

        /**
         * Label where title is placed
         **/
        titleLabel: LabelItem;

        /**
         * Bottom toolbar
         **/
        toolbar: Toolbar;

        /**
         * Top toolbar
         **/
        topToolbar: Toolbar;

        /**
         * Creates the widget
         **/
        constructor(){

            // Init
            super();

            this.element.addClass('widget');

            // Init collections
            this.items = new Collection<Item>(this._onAddItem, this._onRemoveItem, this);

            // Init main elements
            this.topToolbar = new Toolbar();
            this.topToolbar.appendTo(this.element);
            this.stack = new ItemStack();
            this.stack.appendTo(this.element);
            this.toolbar = new Toolbar();
            this.toolbar.visible = false;
            this.toolbar.appendTo(this.element);
            this.topToolbar.element.addClass('top');
            this.toolbar.element.addClass('bottom');

            // Init detailed elements
            this.titleLabel = new LabelItem();

            // Prepare top toolbar
            this.topToolbar.items.add(this.titleLabel);
            this.topToolbar.sideItems.addArray([ this.minimizeButton]);

            // Default reacts

            this.toolbar.itemsChanged.add(() => {this.onLayout()});
            this.toolbar.sideItemsChanged.add(() => {this.onLayout()});

        }

        //region Private Methods

        /**
         *
         **/
        private _onAddItem(item: Item){

            this.stack.items.add(item);

        }

        /**
         *
         **/
        private _onRemoveItem(item: Item){

            this.stack.items.remove(item);

        }

        //endregion

        //region Methods

        /**
         * Raises the <c>allowMinimize</c> event
         */
        onAllowMinimizeChanged(){
            if(this._allowMinimizeChanged){
                this._allowMinimizeChanged.raise();
            }

            this.minimizeButton.visible = this.allowMinimize;
        }

        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(){

            super.onLayout();

            this.stack.onLayout();

            // Check bottom bar visible
            this.toolbar.visible = this.toolbar.items.count > 0 || this.toolbar.sideItems.count > 0;



            setTimeout(() => {
                let avail = Rectangle.fromElement(this.topToolbar.raw).width;

                this.topToolbar.items.each(item => {
                    if(item.visible && item != this.titleLabel) {
                        avail -= Rectangle.fromElement(item.raw).width;
                    }
                });

                this.topToolbar.sideItems.each(item => {
                    avail -= Rectangle.fromElement(item.raw).width;
                });

                // HACK: this 15 constant should be computed
                this.titleLabel.element.css('max-width', avail - 15);
            });

        }

        /**
         * Raises the <c>minimized</c> event
         */
        onMinimizedChanged(){


            if(this.minimized){
                this.element.addClass('minimized');
                this.stack.visible = false;
                this.toolbar.visible = false;
                this.minimizeButton.icon = LinearIcon.chevron_down;
            }else{
                this.element.removeClass('minimized');
                this.stack.visible = true;
                this.toolbar.visible = this.toolbar.items.count > 0 || this.toolbar.sideItems.count > 0;
                this.minimizeButton.icon = LinearIcon.chevron_up;
            }

            // HACK: Trigger the event after modification, because listeners should be waiting of the size of minimized widget
            if(this._minimizedChanged){
                this._minimizedChanged.raise();
            }
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _allowMinimizeChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the allowMinimize property changes
         *
         * @returns {LatteEvent}
         */
        get allowMinimizeChanged(): LatteEvent{
            if(!this._allowMinimizeChanged){
                this._allowMinimizeChanged = new LatteEvent(this);
            }
            return this._allowMinimizeChanged;
        }

        /**
         * Back field for event
         */
        private _minimizedChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the minimized property changes
         *
         * @returns {LatteEvent}
         */
        get minimizedChanged(): LatteEvent{
            if(!this._minimizedChanged){
                this._minimizedChanged = new LatteEvent(this);
            }
            return this._minimizedChanged;
        }

        //endregion

        //region Properties
        /**
         * Property field
         */
        private _allowMinimize: boolean = true;

        /**
         * Gets or sets a value indicating if minimization is allowed
         *
         * @returns {boolean}
         */
        get allowMinimize(): boolean{
            return this._allowMinimize;
        }

        /**
         * Gets or sets a value indicating if minimization is allowed
         *
         * @param {boolean} value
         */
        set allowMinimize(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._allowMinimize;

            // Set value
            this._allowMinimize = value;

            // Trigger changed event
            if(changed){
                this.onAllowMinimizeChanged();
            }
        }
        /**
         * Property field
         */
        private _minimized: boolean = null;

        /**
         * Gets or sets a value indicating if the widget is currently minimized
         *
         * @returns {boolean}
         */
        get minimized(): boolean{
            return this._minimized;
        }

        /**
         * Gets or sets a value indicating if the widget is currently minimized
         *
         * @param {boolean} value
         */
        set minimized(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._minimized;

            // Set value
            this._minimized = value;

            // Trigger changed event
            if(changed){
                this.onMinimizedChanged();
            }
        }

        /**
         * Gets or sets the title of the widget
         **/
        get title(): string{
            return this.titleLabel.text;
        }

        /**
         * Gets or sets the title of the widget
         **/
        set title(value: string){


            this.titleLabel.text = value;
            this.titleLabel.tooltip = value;
            this.onLayout();


        }
        //endregion

        //region Components

        /**
         * Field for minimizeButton property
         */
        private _minimizeButton: ButtonItem;

        /**
         * Gets the minimize button
         *
         * @returns {ButtonItem}
         */
        get minimizeButton(): ButtonItem {
            if (!this._minimizeButton) {
                this._minimizeButton = new ButtonItem();
                this._minimizeButton = new ButtonItem();
                this._minimizeButton.icon = LinearIcon.chevron_up;
                this._minimizeButton.click.add(() => {this.minimized = !this.minimized});
            }
            return this._minimizeButton;
        }


        //endregion
    }
}