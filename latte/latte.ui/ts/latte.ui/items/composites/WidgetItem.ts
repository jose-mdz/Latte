module latte{
    /**
     * Represents a widget.

     Widgets are like small windows who can be maximized, minimized and dragged around.
     **/
    export class WidgetItem extends Item{

        /**
         *
         **/
        private _allowClose: boolean = true;

        /**
         *
         **/
        private _allowMaximize: boolean = true;

        /**
         *
         **/
        private _allowMinimize: boolean = true;

        /**
         *
         **/
        private _minimized: boolean;

        /**
         * Button for closing widget
         **/
        closeButton: ButtonItem;

        /**
         * Collection of items in widget
         **/
        items: Collection<Item>;

        /**
         * Button for maximizing the widget
         **/
        maximizeButton: ButtonItem;

        /**
         * Button for minimizing the widget
         **/
        minimizeButton: ButtonItem;

        /**
         * Collection of options of widget
         **/
        options: Collection<Item>;

        /**
         * Button for options
         **/
        optionsButton: ButtonItem;

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
         * Raised when the widget has been closed
         **/
        closed: LatteEvent;

        /**
         * Raised when the widget has been maximized
         **/
        maximized: LatteEvent;

        /**
         * Raised when the widget has been minimized
         **/
        minimizedChanged: LatteEvent;


        /**
         * Creates the widget
         **/
        constructor(){

            // Init
            super();

            var widget = this;


            this.element.addClass('widget');

            // Init events
            this.closed = new LatteEvent(this);
            this.maximized = new LatteEvent(this);
            this.minimizedChanged = new LatteEvent(this);

            // Init collections
            this.items = new Collection<Item>(this._onAddItem, this._onRemoveItem, this);
            this.options = new Collection<Item>(this._onAddOption, this._onRemoveOption, this);

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
            this.optionsButton = new ButtonItem();
            this.optionsButton.icon = Glyph.down;
            this.closeButton = new ButtonItem();
            this.closeButton.icon = Glyph.dismiss;
            this.minimizeButton = new ButtonItem();
            this.minimizeButton.icon = Glyph.collapseWidget;
            this.maximizeButton = new ButtonItem();
            this.maximizeButton.icon = Glyph.maximize;

            // Prepare top toolbar
            this.topToolbar.items.add(this.optionsButton);
            this.topToolbar.items.add(this.titleLabel);
            this.topToolbar.sideItems.addArray([this.closeButton, this.maximizeButton, this.minimizeButton]);

            // Default reacts
            this.closeButton.click.add(() => {this.onClosed()});
            this.minimizeButton.click.add(() => {this.minimized = !this.minimized});
            this.maximizeButton.click.add(() => {this.onMaximized()});
            this.toolbar.itemsChanged.add(() => {this.onLayout()});
            this.toolbar.sideItemsChanged.add(() => {this.onLayout()});
            this.topToolbar.element.dblclick(() => { if(this.allowMaximize) this.onMaximized(); })

        }

        /**
         *
         **/
        private _onAddItem(item: Item){

            this.stack.items.add(item);

        }

        /**
         *
         **/
        private _onAddOption(item: Item){

            this.optionsButton.items.add(item);
            this.optionsButton.glyph = null;

        }

        /**
         *
         **/
        private _onRemoveItem(item: Item){

            this.stack.items.remove(item);

        }

        /**
         *
         **/
        private _onRemoveOption(item: Item){

            this.optionsButton.items.remove(item);

        }

        /**
         * Raises the <c>closed</c> event
         **/
        onClosed(){

            this.closed.raise();

        }

        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(){

            super.onLayout();

            this.stack.onLayout();

            // Check bottom bar visible
            this.toolbar.visible = this.toolbar.items.count > 0 || this.toolbar.sideItems.count > 0;

        }

        /**
         * Raises the <c>maximized</c> event
         **/
        onMaximized(){

            this.maximized.raise();

        }

        /**
         * Raises the <c>minimized</c> event
         **/
        onMinimizedChanged(){

            this.minimizedChanged.raise();

        }

        /**
         * Gets or sets a value indicating if the item could be closed
         **/
        get allowClose(): boolean{
            return this._allowClose;
        }

        /**
         * Gets or sets a value indicating if the item could be closed
         **/
        set allowClose(value: boolean){


            this._allowClose = value;
            this.closeButton.visible = value;
            this.onLayout();


        }

        /**
         * Gets or sets a value indicating if the item could be maximized
         **/
        get allowMaximize(): boolean{
            return this._allowMaximize;
        }

        /**
         * Gets or sets a value indicating if the item could be maximized
         **/
        set allowMaximize(value: boolean){


            this._allowMaximize = value;
            this.maximizeButton.visible = value;
            this.onLayout();


        }

        /**
         * Gets or sets a value indicating if the item could be minimized
         **/
        get allowMinimize(): boolean{
            return this._allowMinimize;
        }

        /**
         * Gets or sets a value indicating if the item could be minimized
         **/
        set allowMinimize(value: boolean){


            this._allowMinimize = value;
            this.minimizeButton.visible = value;
            this.onLayout();


        }

        /**
         * Gets or sets a value indicating if the widget is currently minimized
         **/
        get minimized(): boolean{
            return this._minimized;
        }

        /**
         * Gets or sets a value indicating if the widget is currently minimized
         **/
        set minimized(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            var original = this._minimized;

            if(value){
                this.element.addClass('minimized');
                this.stack.visible = false;
                this.toolbar.visible = false;
                this.minimizeButton.icon = Glyph.expandWidget;
            }else{
                this.element.removeClass('minimized');
                this.stack.visible = true;
                this.toolbar.visible = this.toolbar.items.count > 0 || this.toolbar.sideItems.count > 0;
                this.minimizeButton.icon = Glyph.collapseWidget;
            }

            this._minimized = value;

            if(original !== this._minimized)
                this.onMinimizedChanged();



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
    }
}