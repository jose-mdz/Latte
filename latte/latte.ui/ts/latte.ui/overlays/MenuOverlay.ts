module latte{
    /**
     * Shows items in a popup.
     **/
    export class MenuOverlay extends Overlay{

        /**
         * Raised when closing all open menuitems. This method can be hooked statically
         to close elements with similar behavior to menus, like popups.
         **/
        static closingAll: LatteEvent;

        /**
         * Flag to save static initialization
         */
        static initialized: boolean;

        /**
         * Initialize handlers at global level
         **/
        public static _initialize(){

            // Check if not already initialized
            if(MenuOverlay.initialized === true){
                return;
            }

            MenuOverlay.closingAll = new LatteEvent(this);

            $(document)
                .click(function(){
                    MenuOverlay.closeAll();
                })
                .keydown(function(evt){
                    if(evt.keyCode == Key.ESCAPE){
                        MenuOverlay.closeAll();
                    }
                });

            // Flag as initialized
            MenuOverlay.initialized = true;

        }

        /**
         * Closes all open menus along the User Agent viewport
         **/
        static closeAll(){


            MenuOverlay.onClosingAll();

            $('.latte-overlay.menu').each(function(){
                $(this).data('instance').close();
            });

        }

        /**
         * Marks with CSS the element as currently showing a menu. If no side
         is specified, it just clears the CSS as "no showing the menu"
         **/
        static mark(elem: JQuery, side: Side = null){


            if(!(elem instanceof jQuery)) throw new InvalidArgumentEx('elem', elem)

            elem.removeClass(
                'with-menu with-menu-at-top with-menu-at-bottom ' +
                    'with-menu-at-right with-menu-at-left hover pressed');

            if(side){
                var str = '';
                switch(side){
                    case Side.BOTTOM:  str = 'bottom'; break;
                    case Side.LEFT:    str = 'left';   break;
                    case Side.RIGHT:   str = 'right';  break;
                    case Side.TOP:     str = 'top';    break;
                }
                elem.addClass('with-menu with-menu-at-' + str);
            }

        }

        /**
         * Raises the <c>closingAll</c> static event
         **/
        static onClosingAll(){

            MenuOverlay.closingAll.raise();

        }

        /**
         *
         */
        private _domElement: JQuery;

        /**
         *
         **/
        private _edge: Side;

        /**
         *
         **/
        private _item: Item;

        /**
         *
         **/
        private _parentButton: ButtonItem;

        /**
         *
         **/
        private _side: Side;

        /**
         * Items within the menu
         **/
        items: Collection<Item>;

        /**
         * Raised when the menu is closed
         **/
        closed: LatteEvent;

        /**
         * Raised when the menu is about the be shown at the passed X coordinate.
         Handler may return a number to alter its position.
         **/
        willShowAtX: LatteEvent;

        /**
         * Raised when the menu is about the be shown at the passed Y coordinate.
         Handler may return a number to alter its position.
         **/
        willShowAtY: LatteEvent;

        /**
         * Creates the Menu
         **/
        constructor(){

            super();

            this.closed = new LatteEvent(this);
            this.willShowAtX = new LatteEvent(this);
            this.willShowAtY = new LatteEvent(this);

            this._side = Side.AUTO;
            this._edge = Side.AUTO;

            this.element.addClass('menu');
            this.element.addClass('menu-face');

            // Add to DOM
//            this.element.appendTo('body');

            // Temporary
            this.element.css({
                minWidth: 100, minHeight: 20
            })

            this.items = new Collection<Item>(
                this._onAddItem, this._onRemoveItem, this);

        }

        /**
         *
         **/
        private _onAddItem(item: Item){

            if(item instanceof ButtonItem){

                var b = <ButtonItem>item;

                // Remove face
                b.faceVisible = false;

                // Check if glyph is needed
                if(b.items.count > 0 || b.willLoadItems)
                    b.glyph = Glyph.right;
                else
                    b.glyph = null;

                // Dismisser
                b.click.add(() => { MenuOverlay.closeAll(); })
            }

            this.element.append(item.element);


        }

        /**
         *
         **/
        private _onRemoveItem(item: Item){

            item.element.detach();

        }

        /**
         * Closes the menu and removes its elements from the DOM
         **/
        close(){


            var m = this;

            if(this._parentButton)
                this._parentButton.itemsMenu = null;

            if(this.domElement){
                //MenuOverlay.mark(this.domElement);
            }

            // Remove contextAt of clickable item
            if(this.item instanceof ClickableItem){
                (<ClickableItem>this.item).contextAt = null;
            }

            ZIndex.removeElement(this.element);

            // Execute event
            this.onClosed();

            // Fadeout
            this.element.fadeOut('fast', function(){
                // Bye bye from DOM
                m.element.detach();
            })

            return this;

        }

        /**
         * Closes the menus open by any of this Menu's children
         **/
        closeChildrenMenus(){


            var item;

            while( (item = this.items.next()) ){
                if(item instanceof ButtonItem)
                    item.hideItems();
            }

            return this;

        }

        /**
         * Raises the <c>closed</c> event
         **/
        onClosed(){

            this.closed.raise();

        }

        /**
         * Override.
         */
        onLayout(){
            super.onLayout();

            for(var i = 0; i < this.items.length; i++){
                this.items[i].onLayout();
            }
        }

        /**
         * Raises the <c>willShowAtX</c> event
         **/
        onWillShowAtX(x: number): any{

            return this.willShowAtX.raise(x);

        }

        /**
         * Raises the <c>willShowAtY</c> event
         **/
        onWillShowAtY(y: number): any{

            return this.willShowAtY.raise(y);

        }

        /**
         * Sets the parent button of the menu
         */
        setParentButton(b: ButtonItem){
            this._parentButton = b;
        }

        /**
         * Shows the menu relative to the specified element
         **/
        showByItem(item: Item, side: Side, edge: Side): MenuOverlay{


            if(!(item instanceof Item))
                throw new InvalidArgumentEx('item', item);

            this.parent = item;
            var s = Side;
            var $element = item instanceof ButtonItem ? ((<ButtonItem>item).split ? (<ButtonItem>item).dropdown.element : item.element) : item.element;
            var e = item.element.rectangle();
            var r = this.element.rectangle();
            var x = 0;
            var y = 0;
            var iterations = 0;
            var offset = 2;

            this._item = item;
            this._domElement = $element;


            if(_undef(side) || !side) side = s.BOTTOM;
            if(_undef(edge) || !edge) edge = s.AUTO;


            // Hide?
            this.element.hide();

            while(iterations++ < 2){

                //iterations++;

                // Remvove hover & pressed (for clickables)
                $element.removeClass('hover pressed');

                // Mark parent
                if(item instanceof ClickableItem){
                    (<ClickableItem>item).contextAt = side;
                }

                switch(side){
                    case s.TOP:     y = e.top - r.height + offset;   break;
                    case s.BOTTOM:  y = e.bottom - offset;           break;
                    case s.LEFT:    x = e.left - r.width + offset;   break;
                    case s.RIGHT:   x = e.right - offset;            break;
                }

                if(side == s.TOP || side == s.BOTTOM){
                    var minWidth = Math.round(e.width * 1.3);

                    this.element.css('min-width', minWidth);

                    r = this.element.rectangle();

                    if(edge == s.RIGHT) x = e.right - r.width; else x = e.left;
                }

                if(side == s.LEFT || side == s.RIGHT){
                    var minHeight = Math.round(e.height * 1.3);

                    this.element.css('min-height', minHeight);

                    r = this.element.rectangle();

                    if(edge == s.BOTTOM) y = e.bottom - r.height; else y = e.top;
                }

                var viewport = $(window).rectangle();
                var rect = new Rectangle(x, y, this.element.width(), this.element.height());

                // Position correction or recalculation
                if(iterations <= 1 && !viewport.containsRectangle(rect)){

                    // Check if necessary to invert
                    if(side == s.RIGHT  && rect.right  > viewport.right
                        || side == s.LEFT   && rect.left   < viewport.left
                        || side == s.BOTTOM && rect.bottom > viewport.bottom
                        || side == s.TOP    && rect.top    < viewport.top){

                        switch(side){
                            case s.TOP:     side = s.BOTTOM; break;
                            case s.BOTTOM:  side = s.TOP;    break;
                            case s.RIGHT:   side = s.LEFT;   break;
                            case s.LEFT:    side = s.RIGHT;  break;
                        }

                        if((item instanceof ButtonItem) && (<ButtonItem>item).split){
                            $element = item.element;
                        }
                        continue;
                    }


                }

                // Bottom correction
                if(rect.bottom > viewport.bottom){
                    rect.top = viewport.bottom - rect.height - offset;
                }

                // Top correction
                if(rect.top < viewport.top){
                    rect.top = viewport.top;
                }

                // Right correction
                if(rect.right > viewport.right){
                    rect.left = viewport.right - rect.width - offset;
                }

                // Left correction
                if(rect.left < viewport.left){
                    rect.left = viewport.left;
                }


            }

            this._edge = edge;
            this._side = side;


            this.showAt(rect.left, rect.top);

            return this;

        }

        /**
         * Shows the menu at the exact point
         **/
        showAt(x: number, y: number){


            if(!_isNumber(x)) throw new InvalidArgumentEx('x', x);
            if(!_isNumber(y)) throw new InvalidArgumentEx('y', y);

            var newX = this.onWillShowAtX(x);
            var newY = this.onWillShowAtY(y);

            if(_isNumber(newX)) x = newX;
            if(_isNumber(newY)) y = newY;

            this.element.hide();

            var viewport = $(window).rectangle();
            var rect = new Rectangle(x, y, this.element.width(), this.element.height());
            var offset = 30;
            var time = 100;
            var animStart: any = {opacity: 0};
            var animEnd: any = {opacity: 1};
            var side = this.side;

            // If menu is larger than viewport
            if(rect.bottom > viewport.bottom){
                // Make it fit
                log("FITTING!")
                this.element.height(viewport.bottom - rect.top);
                this.element.css('overflow', 'auto');
            }

//            log("MenuAt %s, %s", x, y)
            // Position
            this.element.css({
                left: x,
                top: y
            });

            // Fix position according to position
            if(View.smallScreen){
                this.element.css({
                    left: 0,
                    right: 0,
                    bottom: 0
                });
            }else{
                // Program animations
                if(side){
                    switch(side){
                        case Side.RIGHT:
                            animStart.left = '-=' + offset;
                            animEnd.left = '+=' + offset;
                            break;
                        case Side.LEFT:
                            animStart.left = '+=' + offset;
                            animEnd.left = '-=' + offset;
                            break;
                        case Side.BOTTOM:
                            animStart.top = '-=' + offset;
                            animEnd.top = '+=' + offset;
                            break;
                        case Side.TOP:
                            animStart.top = '+=' + offset;
                            animEnd.top = '-=' + offset;
                            break;
                    }
                }
            }

            if($.fx.off || View.smallScreen){
                this.element.show();
            }else{
                this.element
                    .show()
                    .css(animStart).animate(animEnd, time, 'swing', () => { this.onLayout(); });
            }


        }

        /**
         * Gets the parent element relative to this menu. The menu is shown to the <c>side</c> of this element
         **/
        get domElement(): JQuery{

            return this._domElement;

        }

        /**
         * Gets the edge of the menu, relative to element provided by <c>domElement</c>
         **/
        get edge(): Side{

            return this._edge;

        }

        /**
         * Gets the parent item of the menu
         **/
        get item(): Item{

            return this._item;

        }

        /**
         * Gets the orientation of the menu, relative to element provided by <c>domElement</c>
         **/
        get side(): Side{

            return this._side;

        }


    }

    $(() => { MenuOverlay._initialize(); })
}