module latte{
    /**
     * Represents an item which can be apparently clicked.

     - Item may be checked, event automatically if <c>checked()</c> value is <c>true</c>
     - Item may be selected, when user hovers over it, if <c>selectable()</c> value is <c>true</c>
     - Item may be pressed, when user holds the mouse button down.
     - Item may be withContext, when its showing contextual data, like a menu or a tab's content
     **/
    export class ClickableItem extends Item{

        /**
         *
         **/
        private _checkable: boolean;

        /**
         *
         **/
        private _checked: boolean;

        /**
         *
         **/
        private _clickPropagation: boolean;

        /**
         *
         **/
        private _contextAt: Side = null;

        /**
         *
         **/
        private _faceVisible: boolean;

        /**
         *
         **/
        private _flatSide: Side;

        /**
         *
         **/
        private _openSide: Side;

        /**
         *
         **/
        private _pressed: boolean;

        /**
         *
         **/
        private _selectable: boolean = true;

        /**
         *
         **/
        private _selected: boolean;

        /**
         *
         **/
        private _withContext: boolean;

        /**
         * Raised when user clicks the item. Passes the item when clicked.
         **/
        click: LatteEvent;

        /**
         * Raised when <c>checked()</c> value changes
         **/
        checkedChanged: LatteEvent;

        /**
         * Raised when <c>faceVisible()</c> value changes
         **/
        faceVisibleChanged: LatteEvent;

        /**
         * Raised when <c>pressed()</c> value changes
         **/
        pressedChanged: LatteEvent;

        /**
         * Raised when <c>selected()</c> value changes
         **/
        selectedChanged: LatteEvent;

        /**
         * Raised when <c>withContext()</c> value changes
         **/
        withContextChanged: LatteEvent;

        /**
         *
         **/
        constructor(){

            super();
            this.element.addClass('clickable');

            // Init events
            this.checkedChanged = new LatteEvent(this);
            this.click = new LatteEvent(this);
            this.faceVisibleChanged = new LatteEvent(this);
            this.pressedChanged = new LatteEvent(this);
            this.selectedChanged = new LatteEvent(this);
            this.withContextChanged = new LatteEvent(this);

            // Init this
            this.faceVisible = true;

            // Wire events
            this.element
                .hover(() => {
                    if(this.selectable && this.enabled){
                        this.selected = true;
                    }
                }, () => {
                    if(this.selectable && this.enabled) {
                        this.selected = false;
                    }
                    this.pressed = false;
                })
                .mousedown(() => {
                    if(this.enabled){
                        this.pressed = true;
                    }
                })
                .mouseup(() => {
                    if(this.enabled) {
                        this.pressed = false;
                        this.selected = false;
                    }
                })
                .click((e: JQueryEventObject) => {
                    if(this.enabled){
                        this.onClick( e as any);

                        if(!this.clickPropagation){
                            e.stopPropagation();
                            return false;
                        }

                    }

                    return undefined;
                });

        }

        /**
         * Returns the value of the checked property
         **/
        getChecked(): boolean{
            return this._checked;
        }

        /**
         *
         **/
        getContextAt(): Side{

            return this._contextAt;

        }

        /**
         *
         **/
        getSelected(): boolean{

            return this._selected;

        }

        /**
         * Override
         */
        onBlur(){
            super.onBlur();

            this.selected = false;
        }

        /**
         * Raises the <c>checkedChanged</c> event
         **/
        onCheckedChanged(){

            this.checkedChanged.raise();

        }

        /**
         * Raises the <c>click</c> event
         **/
        onClick(e: MouseEvent = null){


            if(this.checkable){
                this.checked = !this.checked;
            }

            this.click.raise(e);

        }

        /**
         * Raises the <c>defaulted</c> event
         */
        onDefaultedChanged(){
            if(this._defaultedChanged){
                this._defaultedChanged.raise();
            }

            if(this.defaulted) {
                this.addClass('defaulted')
            }else {
                this.removeClass('defaulted')
            }
        }

        /**
         * Overriden. Raises the <c>enabledChanged</c> event
         **/
        onEnabledChanged(){

            super.onEnabledChanged();

            this.selected = false;
            this.pressed = false;

        }

        /**
         * Raises the <c>faceVisibleChanged</c> event
         **/
        onFaceVisibleChanged(){

            this.faceVisibleChanged.raise();

        }

        /**
         * Override
         */
        onFocused(){
            super.onFocused();

            this.selected = true;
        }

        /**
         * Raises the <c>pressedChanged</c> event
         **/
        onPressedChanged(){

            this.pressedChanged.raise();

        }

        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged(){

            this.selectedChanged.raise();

        }

        /**
         * Raises the <c>withContextChanged</c> event
         **/
        onWithContextChanged(){

            this.withContextChanged.raise();

        }

        /**
         * Sets a value indicating if the item is currently checked.
         Optionally omits the <c>checkedChanged</c> event trigger.
         **/
        setChecked(value: boolean, silent: boolean = false){



            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            var changed = value != this._checked;

            this._checked = value;

            if(value){
                this.element.addClass('checked');
            }else{
                this.element.removeClass('checked');
            }

            if(changed && silent !== true){
                this.onCheckedChanged();
            }


        }

        /**
         *
         **/
        setContextAt(value: Side){

            this.openSide = value;
            this.flatSide = value;
            this.withContext = value !== null;
            this._contextAt = value;

        }

        /**
         *
         **/
        setSelected(value: boolean, silent: boolean = false){

            var changed = value != this._selected;

            this._selected = value;

            if(value){
                this.element.addClass('selected');
            }else{
                this.element.removeClass('selected');
            }

            if(changed && silent !== true){
                this.onSelectedChanged();
            }

        }

        //region Events
        /**
         * Back field for event
         */
        private _defaultedChanged: LatteEvent

        /**
         * Gets an event raised when the value of the defaulted property changes
         *
         * @returns {LatteEvent}
         */
        get defaultedChanged(): LatteEvent{
            if(!this._defaultedChanged){
                this._defaultedChanged = new LatteEvent(this);
            }
            return this._defaultedChanged;
        }


        //endregion

        //region Props

        /**
         * Property field
         */
        private _defaulted: boolean = false;

        /**
         * Gets or sets a value indicating if the item is defaulted (Will recieve enter when pressed)
         *
         * @returns {boolean}
         */
        get defaulted(): boolean{
            return this._defaulted;
        }

        /**
         * Gets or sets a value indicating if the item is defaulted (Will recieve enter when pressed)
         *
         * @param {boolean} value
         */
        set defaulted(value: boolean){

            // Check if value changed
            var changed: boolean = value !== this._defaulted;

            // Set value
            this._defaulted = value;

            // Trigger changed event
            if(changed){
                this.onDefaultedChanged();
            }
        }

        /**
         * Gets or sets a value indicating if the item is checkable.
         When checkable, the item will be turned to checked when clicked.
         **/
        get checkable(): boolean{
            return this._checkable;
        }

        /**
         * Gets or sets a value indicating if the item is checkable.
         When checkable, the item will be turned to checked when clicked.
         **/
        set checkable(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._checkable = value;



        }

        /**
         * Gets or sets the checked state of the clickable
         **/
        get checked(): boolean{
            return this.getChecked();
        }

        /**
         * Gets or sets the checked state of the clickable
         **/
        set checked(value: boolean){

            this.setChecked(value);

        }

        /**
         * Gets or sets a value indicating if click event will propagate as usual.
         If set to false, event propagation will be suspended on click.
         **/
        get clickPropagation(): boolean{
            return this._clickPropagation;
        }

        /**
         * Gets or sets a value indicating if click event will propagate as usual.
         If set to false, event propagation will be suspended on click.
         **/
        set clickPropagation(value: boolean){


            this._clickPropagation = value;


        }

        /**
         * Gets or sets a value indicating if the item is visually indicating that it
         has context at some side.
         It will automatically affect the values of <c>openSide()</c>, <c>withContext</c>
         and <c>flatSide()</c>.
         It may be removed by passing <c>null</c> as value.
         **/
        get contextAt(): Side{
            return this.getContextAt();
        }

        /**
         * Gets or sets a value indicating if the item is visually indicating that it
         has context at some side.
         It will automatically affect the values of <c>openSide()</c>, <c>withContext</c>
         and <c>flatSide()</c>.
         It may be removed by passing <c>null</c> as value.
         **/
        set contextAt(value: Side){


            this.setContextAt(value);



        }

        /**
         * Gets or sets the visibility of the button face
         **/
        get faceVisible(): boolean{
            return this.getFaceVisible();
        }

        /**
         *
         **/
        getFaceVisible(): boolean{

            return this._faceVisible;

        }

        /**
         * Sets a value indicating if the item's face is currently visible.
         **/
        setFaceVisible(value: boolean = false, silent: boolean = false){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            var changed = value !== this._faceVisible;

            this._faceVisible = value;

            if(value){
                this.element.addClass('with-face');
            }else{
                this.element.removeClass('with-face');
            }

            if(changed && silent !== true){
                this.onFaceVisibleChanged();
            }

        }

        /**
         * Gets or sets the visibility of the button face
         **/
        set faceVisible(value: boolean){


            this.setFaceVisible(value);


        }

        /**
         * Gets or sets the flat side of the button.
         The flat side will remove corner roundness on the specified side.
         It can be removed by passing null as value.
         **/
        get flatSide(): Side{
            return this._flatSide;
        }

        /**
         * Gets or sets the flat side of the button.
         The flat side will remove corner roundness on the specified side.
         It can be removed by passing null as value.
         **/
        set flatSide(value: Side){


            this._flatSide = value;

            // Remove other flat sides
            this.element.removeClass('flat-bottom flat-right flat-left flat-top');

            if((value & Side.BOTTOM) == Side.BOTTOM) this.element.addClass('flat-bottom');
            if((value & Side.RIGHT) == Side.RIGHT) this.element.addClass('flat-right');
            if((value & Side.LEFT) == Side.LEFT) this.element.addClass('flat-left');
            if((value & Side.TOP) == Side.TOP) this.element.addClass('flat-top');



        }

        /**
         * Gets or sets the open side of the button.
         The open side will not show edge at the specified side.
         It can be removed by passing null as value.
         **/
        get openSide(): Side{
            return this._openSide;
        }

        /**
         * Gets or sets the open side of the button.
         The open side will not show edge at the specified side.
         It can be removed by passing null as value.
         **/
        set openSide(value: Side){


            this._openSide = value;

            // Remove other flat sides
            this.element.removeClass('open-at-bottom open-at-right open-at-left open-at-top');

            if((value & Side.BOTTOM) == Side.BOTTOM) this.element.addClass('open-at-bottom');
            if((value & Side.RIGHT) == Side.RIGHT) this.element.addClass('open-at-right');
            if((value & Side.LEFT) == Side.LEFT) this.element.addClass('open-at-left');
            if((value & Side.TOP) == Side.TOP) this.element.addClass('open-at-top');

        }

        /**
         * Gets or sets a value indicating if the item is currently pressed
         **/
        get pressed(): boolean{
            return this._pressed;
        }

        /**
         * Gets or sets a value indicating if the item is currently pressed
         **/
        set pressed(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            var changed = value != this._pressed;

            this._pressed = value;

            if(value){
                this.element.addClass('pressed');
            }else{
                this.element.removeClass('pressed');
            }

            if(changed){
                this.onPressedChanged();
            }



        }

        /**
         * Gets or sets a value indicating if the item is selectable.
         If <c>selectable()</c>, Item will be selected when mouse hovers over it.
         **/
        get selectable(): boolean{
            return this._selectable;
        }

        /**
         * Gets or sets a value indicating if the item is selectable.
         If <c>selectable()</c>, Item will be selected when mouse hovers over it.
         **/
        set selectable(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._selectable = value;



        }

        /**
         * Gets or sets a value indicating if the item is currently selected.
         **/
        get selected(): boolean{
            return this.getSelected();
        }

        /**
         * Gets or sets a value indicating if the item is currently selected.
         **/
        set selected(value: boolean){


            this.setSelected(value);


        }

        /**
         * Gets or sets a value indicating if the item has currently context
         **/
        get withContext(): boolean{
            return this._withContext;
        }

        /**
         * Gets or sets a value indicating if the item has currently context
         **/
        set withContext(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            var changed = value != this._withContext;

            this._withContext = value;

            if(value){
                this.element.addClass('with-context');
            }else{
                this.element.removeClass('with-context');
            }

            if(changed){
                this.onWithContextChanged();
            }



        }
        //endregion
    }
}