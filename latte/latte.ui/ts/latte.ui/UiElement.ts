module latte{
    /**
     * Represents a basic element of the DOM, on which latte UI objects are constructed.
     **/
    export class UiElement{

        //region Static

        /**
         * Collection of context items
         **/
        private static _contextItemsCollect: Collection<Item>;

        /**
         * Saves the coordinates where the drag operation started
         */
        private static _dragStart: {x: number; y: number} = null;

        /**
         * Flag to know if static constructor has been called
         */
        private static _staticInited: boolean = false;


        //region Static methods

        /**
         * Disables the text selection feature of User Agent on the specified element.
         **/
        static disableTextSelection(element: JQuery): JQuery{


            if(!(element instanceof jQuery))
                throw new InvalidArgumentEx('element');

            element.attr('unselectable', 'on')
                .css({
                    '-moz-user-select': 'none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none'
                })
//            .each(function(){
//                this.onselectstart = function(){ return false; }
//            });

            return element;

        }

        /**
         * Enables the text selection feature of User Agent on the specified element.
         **/
        static enableTextSelection(element: JQuery): JQuery{

            element.attr('unselectable', 'off')
                .css({
                    '-moz-user-select': '',
                    '-webkit-user-select': '',
                    '-ms-user-select': '',
                    'user-select': ''
                })
//            .each(function(){
//                this.onselectstart = null;
//            });

            return element;

        }

        /**
         * Gets the opposite side of passed side
         * @param side
         * @returns {*}
         */
        static oppositeSide(side: Side): Side{
            switch(side){
                case Side.TOP: return Side.BOTTOM;
                case Side.BOTTOM: return Side.TOP;
                case Side.LEFT: return Side.RIGHT;
                case Side.RIGHT: return Side.LEFT;
                default: return Side.BOTTOM;
            }
        }

        /**
         * Static initializator
         */
        static staticInit(){
            $('body')
                .mousemove((e: JQueryEventObject) => {

                    if(UiElement.dragging){
                        UiElement._dragElement.css({
                            top: e.pageY + 10,
                            left: e.pageX + 10
                        })
                    }

                })
                .mouseup((e: JQueryEventObject) => {
                    UiElement._dragging = false;

                    if(UiElement._dragElement){
                        UiElement._dragElement.remove();
                        UiElement._dragElement = null;
                    }

                    if(UiElement._draggingElement){
                        if(UiElement.dropTarget){
                            UiElement.dropTarget.onDropElement();
                        }
                        UiElement._draggingElement.onDropped();
                        UiElement._draggingElement.beingDragged = false;
                        UiElement._draggingElement = null;
                    }

                })
        }
        //endregion

        //region Static Props

        /**
         *
         */
        private static _dragElement: JQuery;

        /**
         * Gets the element dragged around to show user something is dragging.
         * @returns {JQuery}
         */
        static get dragElement(): JQuery{
            return this._dragElement;
        }

        /**
         *
         */
        private static _dragging: boolean = false;

        /**
         * Gets a value indicating if the element is being dragged
         * @returns {boolean}
         */
        static get dragging(): boolean{
            return this._dragging;
        }

        /**
         *
         */
        private static _draggingElement: UiElement = null;

        /**
         * Gets the UiElement currently being dragged (if any)
         * @returns {boolean}
         */
        static get draggingElement(): UiElement{
            return this._draggingElement;
        }

        /**
         * Property field
         */
        private static _dropTarget:UiElement = null;

        /**
         * Gets or sets the element where dragging element will be dropped
         *
         * @returns {UiElement}
         */
        public static get dropTarget():UiElement {
            return this._dropTarget;
        }

        /**
         * Gets or sets the element where dragging element will be dropped
         *
         * @param {UiElement} value
         */
        public static set dropTarget(value:UiElement) {
            this._dropTarget = value;
        }

        //endregion

        //endregion

        //region Fields
        /**
         *
         */
        private _beingDragged: boolean;

        /**
         *
         **/
        private _enabled: boolean = true;

        /**
         *
         */
        private  _dragSource: JQuery;

        /**
         *
         */
        private _dropped: LatteEvent;

        /**
         *
         **/
        private _focusable: boolean;

        /**
         *
         */
        private _hideWhileDragging: boolean;

        /**
         *
         **/
        private _tag: any;

        /**
         *
         **/
        private _tooltip: string;

        /**
         *
         */
        private _visible: boolean;

        /**
         * Collection of items in contextual menu.
         **/
        contextItems: Collection<Item>;

        /**
         * Holds a pointer of the element on the DOM.
         **/
        element: JQuery;

        /**
         * Raised when the enabled state of item is changed.
         **/
        enabledChanged: LatteEvent;

        /**
         * Raised when the element updates its layout.
         **/
        layout: LatteEvent;

        /**
         * Raised when the menu with <c>contextItems</c> is about to be dislplayed.
         **/
        contextItemsShow: LatteEvent;

        /**
         * Raised when the <c>visible</c> property value changes
         **/
        visibleChanged: LatteEvent;
        //endregion

        /**
         * Creates the UiElement.
         **/
        constructor(){

            if(!UiElement._staticInited){
                UiElement.staticInit();
            }

            // Initialize events
            this.contextItemsShow = new LatteEvent(this);
            this.layout = new LatteEvent(this);
            this.enabledChanged = new LatteEvent(this);
            this.visibleChanged = new LatteEvent(this);

            // Initialize collecitons
            this.contextItems = new Collection<Item>();

            // Initialize static collection
            if(!UiElement._contextItemsCollect)
                UiElement._contextItemsCollect =
                    new Collection<Item>();

            // Create base element
            this.element = $('<div>');
            this.element.addClass('latte-uielement');
            this.element.data('instance', this);
            this.element.mousedown((e) => {return this._mouseDown(e)});
            this.element.click((e) => {return this._click(e)});
            this.element.bind('contextmenu', (e) => { return this._contextMenu(e); });


            // Disable text selection
            //UiElement.disableTextSelection(this.element);


        }

        //region Private

        /**
         *
         **/
        private _click(e: JQueryEventObject){

            if(!this.enabled){
                e.stopPropagation();
                return false;
            }

        }

        /**
         *
         **/
        private _contextMenu(e: JQueryEventObject){

            var menu = this.showContextMenu(e.pageX, e.pageY);
            return !(menu instanceof MenuOverlay);

        }

        /**
         *
         **/
        private _mouseDown(e: JQueryEventObject){

            if(!this.enabled){
                e.stopPropagation();
                return false;
            }

        }
        //endregion

        //region Methods

        /**
         * Adds classes to the element
         **/
        addClass(classString: string){

            this.element.addClass(classString);
            return this;

        }

        /**
         * Appends the view to the specified element.
         **/
        appendTo(element: any): UiElement{

            if(element instanceof jQuery || _isString(element)){
                this.element.appendTo(element);
            }else if (element instanceof UiElement){
                this.element.appendTo(element.element);
            }else{
                throw new InvalidArgumentEx('element', element);
            }

            return this;

        }

        /**
         * Passes css method to <c>element</c>
         **/
        css(css: any, value: any = ''): UiElement{

            this.element.css(css, value);
            return this;

        }

        /**
         * Finalizes the element
         */
        finalize(){
            if(this.onFinalizing() === false){
                return;
            }

            this.element.remove();
        }

        /**
         * Raises the <c>contextItemsShow</c> event.
         **/
        onContextItemsShow(){

            this.contextItemsShow.raise();

        }

        /**
         * Called when the element who shows dragging is created, from this UiElement.
         */
        onCreateDragElement(): JQuery{

            var copy = this.element.clone();

            copy.addClass('active-drag-element');

            copy.css({
                position: 'fixed',
                opacity: 0.5,
                width: this.element.width(),
                height: this.element.height(),
                left: UiElement._dragStart.x,
                top: UiElement._dragStart.y
            });

            copy.appendTo('body');

            return copy;
        }

        /**
         * Raises the <c>dropped</c> event
         */
        onDropped(){
            if(this._dropped){
                this.dropped.raise();
            }
        }

        /**
         * Raises the <c>enabledChanged</c> event.
         **/
        onEnabledChanged(){

            this.enabledChanged.raise();

        }

        /**
         * Raises the <c>hidden</c> event
         */
        onHiddenChanged(){

            if(this.hidden) {
                this.css('visibility', 'hidden');
            }else {
                this.css('visibility', '');
            }

            if(this._hiddenChanged){
                this._hiddenChanged.raise();
            }
        }

        /**
         * Raises the <c>layout</c> event.
         **/
        onLayout(){

            this.layout.raise();

        }

        /**
         * Raises the <c>visibleChanged</c> event.
         **/
        onVisibleChanged(){

            this.visibleChanged.raise();

        }

        /**
         * Removes classes to the element
         **/
        removeClass(classString: string){

            this.element.removeClass(classString);
            return this;

        }

        /**
         * Shows a menu with the <c>contextItems</c> at the specified position.
         **/
        showContextMenu(pageX: number, pageY: number){


            var buffer: Collection<Item> = UiElement._contextItemsCollect;

            // Invoke event to allow control to prepare its items
            this.onContextItemsShow();

            // Add separator
            if(buffer.count > 0 && this.contextItems.count > 0){
                buffer.add(new SeparatorItem());
            }

            // Add items of this item
            buffer.addCollection(this.contextItems);

            // If no parent elements and there's items to show
            if(this.element.parents('.latte-uielement').length == 0
                && buffer.count > 0){

                MenuOverlay.closeAll();

                // Create menu
                var m = new MenuOverlay();

                // Add items
                m.items.addCollection(buffer);

                // show it
                m.showAt(pageX, pageY);

                // Clear items buffer
                buffer.clear();

                return m;
            }

            return null;


        }
        //endregion

        //region Events


        /**
         * Back field for event
         */
        private _blur: LatteEvent;

        /**
         * Gets an event raised when the element loses focus (if focusable)
         *
         * @returns {LatteEvent}
         */
        get blur(): LatteEvent{
            if(!this._blur){
                this._blur = new LatteEvent(this);
            }
            return this._blur;
        }

        /**
         * Raises the <c>blur</c> event
         */
        onBlur(){
            if(this._blur){
                this._blur.raise();
            }
        }

        /**
         * Back field for event
         */
        private _dragOver: LatteEvent

        /**
         * Gets an event raised when an element is dragged over this element.
         * The handler must return <c>true</c> to confirm drop is allowed
         *
         * @returns {LatteEvent}
         */
        public get dragOver(): LatteEvent{
            if(!this._dragOver){
                this._dragOver = new LatteEvent(this);
                this._dragOver.handlerAdded.add(() => {
                    this.element.mouseover(() => {
                        if(UiElement.dragging){
                            if(this.onDragOver()){
                                UiElement.dropTarget = this;
                            }else{
                                UiElement.dropTarget = null;
                            }
                        }
                    });
                });
            }
            return this._dragOver;
        }

        /**
         * Raises the <c>dragOver</c> event
         */
        public onDragOver(): boolean{
            if(this._dragOver){
                return <boolean>this._dragOver.raise();
            }
        }

        /**
         * Back field for event
         */
         private _finalizing: LatteEvent

        /**
         * Gets an event raised when the element is being finalized
         *
         * @returns {LatteEvent}
         */
        public get finalizing(): LatteEvent{
            if(!this._finalizing){
                this._finalizing = new LatteEvent(this);
            }
            return this._finalizing;
        }

        /**
         * Raises the <c>finalizing</c> event
         */
        public onFinalizing(){
            if(this._finalizing){
                return this._finalizing.raise();
            }
        }


        /**
         * Back field for event
         */
        private _focused: LatteEvent;

        /**
         * Gets an event raised when the element recieves focus (if focusasble)
         *
         * @returns {LatteEvent}
         */
        get focused(): LatteEvent{
            if(!this._focused){
                this._focused = new LatteEvent(this);
            }
            return this._focused;
        }

        /**
         * Raises the <c>focused</c> event
         */
        onFocused(){
            if(this._focused){
                this._focused.raise();
            }
        }

        /**
         * Back field for event
         */
        private _hiddenChanged: LatteEvent

        /**
         * Gets an event raised when the value of the hidden property changes
         *
         * @returns {LatteEvent}
         */
        get hiddenChanged(): LatteEvent{
            if(!this._hiddenChanged){
                this._hiddenChanged = new LatteEvent(this);
            }
            return this._hiddenChanged;
        }

        /**
         * Back field for event
         */
         private _dropElement: LatteEvent

        /**
         * Gets an event raised when an element is dropped over this element.
         * For an element to be allowed to be dropped over,
         *  the <c>dragOver</c> event handler must return true before the drop operation.
         *
         * @returns {LatteEvent}
         */
        public get dropElement(): LatteEvent{
            if(!this._dropElement){
                this._dropElement = new LatteEvent(this);
            }
            return this._dropElement;
        }

        /**
         * Raises the <c>dropElement</c> event.
         */
        public onDropElement(){
            if(this._dropElement){
                this._dropElement.raise();
            }
        }

        //endregion

        //region Properties

        /**
         * Gets or sets a value indicating if the element is curerntly being dragged.
         * @returns {boolean}
         */
        get beingDragged(): boolean{
            return this._beingDragged;
        }

        /**
         * Gets or sets a value indicating if the element is curerntly being dragged.
         * @param value
         */
        set beingDragged(value: boolean){
            this._beingDragged = value;

            if(this.hideWhileDragging === true){
                this.visible = !value;
            }
        }

        /**
         * Gets or sets the element who will act as source for dragging.
         * @returns {JQuery}
         */
        get dragSource(): JQuery{
            return this._dragSource;
        }

        /**
         *
         * @param value
         */
        set dragSource(value: JQuery){

            if(this._dragSource instanceof $){
                // Remove handlers
            }

            this._dragSource = value;

            var hTimeout: number = 0;

            this._dragSource
                .mousedown((e: JQueryEventObject) => {

                    if(e.which == 1){
                        // Set up timeout to start dragging
                        hTimeout = setTimeout(() => {
                            UiElement._dragStart = {x: e.pageX, y: e.pageY};
                            UiElement._dragging = true;
                            UiElement._dragElement = this.onCreateDragElement();
                            UiElement._draggingElement = this;
                            this.beingDragged = true;

                        }, 200);

                        e.stopPropagation();
                        return false;
                    }

                })
                .mouseup((e: JQueryEventObject) => {

                    // Cancel timeout
                    if(hTimeout){
                        clearTimeout(hTimeout);
                    }
                });
        }

        /**
         * Gets an event raised when the element is dropped after a dragging operation
         */
        get dropped(): LatteEvent{
            if(!this._dropped){
                this._dropped = new LatteEvent(this);
            }

            return this._dropped;
        }

        /**
         * Gets or sets a value indicating if the item is enabled.
         **/
        get enabled(): boolean{
            return this._enabled;
        }

        /**
         * Gets or sets a value indicating if the item is enabled.
         **/
        set enabled(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            var changed = this._enabled != value;

            this._enabled = value;

            if(value){
                this.element.removeClass('disabled');
                this.element.css('opacity', 1);
            }else{
                this.element.addClass('disabled');
                this.element.css('opacity', .4);
            }

            if(changed)
                this.onEnabledChanged();



        }

        /**
         * Property field
         */
        private _finalized:boolean;

        /**
         * Gets a value indicating if the element has been finalized
         *
         * @returns {boolean}
         */
        public get finalized():boolean {
            return this._finalized;
        }

        /**
         * Gets or sets a value indicating if the element should be focusable
         **/
        get focusable(): boolean{
            return this._focusable;
        }

        /**
         * Gets or sets a value indicating if the element should be focusable
         **/
        set focusable(value: boolean){


            if(value){
                this.element.attr('tabindex', 0);// TabIndexManager.subscribe(this));

                this.element.get(0).addEventListener('focus', () => {
                    this.onFocused();
                })

                this.element.get(0).addEventListener('blur', () => {
                    this.onBlur();
                })

            }else{
                this.element.removeAttr('tabindex');
            }

            this._focusable = value;


        }

        /**
         * Gets or sets the height of the element.
         **/
        get height(): number{
            return this.element.height();
        }

        /**
         * Gets or sets the height of the element.
         **/
        set height(value: number){

            this.element.height(value);


        }

        /**
         * Property field
         */
        private _hidden: boolean = false;

        /**
         * Gets or sets a value indicating if the element is hidde
         *
         * @returns {boolean}
         */
        get hidden(): boolean{
            return this._hidden;
        }

        /**
         * Gets or sets a value indicating if the element is hidde
         *
         * @param {boolean} value
         */
        set hidden(value: boolean){

            // Check if value changed
            var changed: boolean = value !== this._hidden;

            // Set value
            this._hidden = value;

            // Trigger changed event
            if(changed){
                this.onHiddenChanged();
            }
        }

        /**
         * Gets or sets a value indicating if the element should be hidden while its being dragged.
         * @returns {boolean}
         */
        get hideWhileDragging(): boolean{
            return this._hideWhileDragging;
        }

        /**
         * Gets or sets a value indicating if the element should be hidden while its being dragged.
         * @param value
         */
        set hideWhileDragging(value: boolean){
            this._hideWhileDragging = value;
        }

        /**
         * Gets or sets a generic object to add extra information to the element.
         **/
        get tag(): any{
            return this._tag;
        }

        /**
         * Gets or sets a generic object to add extra information to the element.
         **/
        set tag(value: any){


            this._tag = value;



        }

        /**
         * Gets or sets the tooltip of the element
         **/
        get tooltip(): string{
            return this._tooltip;
        }

        /**
         * Gets or sets the tooltip of the element
         **/
        set tooltip(value: string){

            this.element.attr('title', value);
            this._tooltip = value;

        }

        /**
         * Gets or sets a value indicating if the element should be visible.
         **/
        get visible(): boolean{
            return this._visible;
        }

        /**
         * Gets or sets a value indicating if the element should be visible.
         **/
        set visible(value: boolean){

            this._visible = value;
            var changed = this._visible != value;

            if(value){
                this.element.show();
            }else{
                this.element.hide();
            }

            if(changed){
                this.onVisibleChanged();
            }
        }

        /**
         * Gets or sets the width of the element.
         **/
        get width(): number{
            return this.element.width();
        }

        /**
         * Gets or sets the width of the element.
         **/
        set width(value: number){

            this.element.width(value);


        }

        //endregion

    }
}