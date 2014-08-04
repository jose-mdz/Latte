module latte{
    /**
     * Group of buttons.

     By default ButtonGroupItem doesn't allow to have multiple buttons checked at
     once, this can be altered by using the <c>multiCheck</c> method
     **/
    export class ButtonGroupItem extends Item{

        /**
         *
         **/
        private _checkedButton: ButtonItem;

        /**
         *
         **/
        private _direction: Direction;

        /**
         *
         **/
        private _faceVisible: boolean = true;

        /**
         *
         **/
        private _multiCheck: boolean;

        /**
         * Collection of buttons of button group
         **/
        buttons: Collection<ButtonItem>;

        /**
         * Raised when some button is checked
         **/
        checkedChanged: LatteEvent;

        /**
         * Creates the Button Group. Optionally adds the buttons to the group
         **/
        constructor(buttons: Array<ButtonItem> = null){

            super();

            this.element.addClass('button-group');

            this.checkedChanged = new LatteEvent(this);

            this.buttons = new Collection<ButtonItem>(
                this._onAddButton, this._onRemoveButton, this);

            this._direction = Direction.HORIZONTAL;

            if(buttons){
                this.buttons.addArray(buttons);
            }


        }

        /**
         *
         **/
        private _checkCheck(checkedButton: ButtonItem){


            if(this.multiCheck){
                return;
            }

            this.buttons.each(function(b){

                if(b != checkedButton){
                    b.setChecked(false, true);
                }else{
                    this._checkedButton = b;
                }

            });

            this.onCheckedChanged();

        }

        /**
         *
         **/
        private _onAddButton(button: ButtonItem){

            var __this = this;

            this.element.append(button.element);

            button.faceVisible = this.faceVisible;

            button.checkedChanged.add(function(){__this._checkCheck(this)});

            this._update();

        }

        /**
         *
         **/
        private _onRemoveButton(button: ButtonItem){

            button.element.detach();

            this._update();

        }

        /**
         *
         **/
        private _update(){


            var faces = this.element.find('.latte-item.clickable');
            var maxh = 0;
            var maxw = 0;
            var i = 0;

            // Clear corners
            faces.css({
                'border-top-right-radius': 0,
                'border-bottom-right-radius': 0,
                'border-top-left-radius': 0,
                'border-bottom-left-radius': 0
            });

            if(this.buttons.count > 0){
                if(this.direction == Direction.HORIZONTAL){

                    // Last button
                    this.buttons.last.element.css({
                        'border-top-right-radius': 4,
                        'border-bottom-right-radius': 4
                    });

                    // First button corners
                    this.buttons.first.element.css({
                        'border-top-left-radius': 4,
                        'border-bottom-left-radius': 4
                    });

                    for(i = 0; i < this.buttons.count; i++){
                        if(i > 0) this.buttons.item(i).element.css('marginLeft', -1);
                        maxh = Math.max(maxh, this.buttons.item(i).element.height());
                    }

                    if(maxh > 0) this.element.find('.latte-item > .face').height(maxh);

                    this.element.find('.latte-item.button').css('float', 'left');

                }else{

                    // Last button
                    this.buttons.last.element.css({
                        'border-bottom-right-radius': 4,
                        'border-bottom-left-radius': 4
                    });

                    // First button corners
                    this.buttons.first.element.css({
                        'border-top-right-radius': 4,
                        'border-top-left-radius': 4
                    });

                    for(i = 0; i < this.buttons.count; i++){
                        //if(i > 0)
                        this.buttons.item(i).element.css('marginBottom', -1);
                        maxw = Math.max(maxw, this.buttons.item(i).element.width());
                    }

                    if(maxh > 0) this.element.find('.latte-item > .face').width(maxw);

                    this.element.find('.latte-item.button').css('float', 'none');

                }
            }



        }

        /**
         * Raises the <c>checkedChanged</c>
         **/
            onCheckedChanged(){

            this.checkedChanged.raise();

        }

        /**
         * Overriden.
         **/
        onEnabledChanged(){

            super.onEnabledChanged();

            var __this = this;

            this.buttons.each(function(b){
                b.enabled = __this.enabled;
            });

        }

        /**
         * Overriden.
         **/
        onLayout(){

            super.onLayout();
            this._update();

        }

        /**
         * Gets the checked button of the group
         **/
        get checkedButton(): ButtonItem{
            return this._checkedButton;
        }

        /**
         * Gets the checked button of the group
         **/
        set checkedButton(value: ButtonItem){


            if(!(value instanceof ButtonItem))
                throw new InvalidArgumentEx('value', value);

            value.checked = true;



        }

        /**
         * Gets or sets the direction of the groups
         **/
        get direction(): Direction{
            return this._direction;
        }

        /**
         * Gets or sets the direction of the groups
         **/
        set direction(value: Direction){


            this._direction = value;
            this._update();



        }

        /**
         * Gets ors sets a value indicating if the face of the button group should
         be visible.
         **/
        get faceVisible(): boolean{
            return this._faceVisible;
        }

        /**
         * Gets ors sets a value indicating if the face of the button group should
         be visible.
         **/
        set faceVisible(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value');

            this._faceVisible = value;

            // Update buttons
            this.buttons.each(function(b){b.faceVisible = value; });

        }

        /**
         * Gets or sets a value indicating if the group allows multiple buttons to
         be checked at the same time
         **/
        get multiCheck(): boolean{
            return this._multiCheck;
        }

        /**
         * Gets or sets a value indicating if the group allows multiple buttons to
         be checked at the same time
         **/
        set multiCheck(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._multiCheck = value;


        }
    }
}