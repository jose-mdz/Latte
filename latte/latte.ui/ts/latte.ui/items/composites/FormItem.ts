module latte{
    /**
     *
     **/
    export class FormItem extends ItemStack{

        /**
         *
         **/
        private _faceVisible: boolean;

        /**
         *
         **/
        private _readOnly: boolean;

        /**
         * Input items of the form
         **/
        inputs: Collection<InputItem>;

        /**
         * Holds the title element of the form
         **/
        titleLabel: LabelItem;

        /**
         *
         **/
        constructor(){

            super();
            this.element.addClass('form');

            // Init collection
            this.inputs = new Collection<InputItem>(this._onAddInput, this._onRemoveInput, this);

            // Init me
            this.faceVisible = true;

            /**
             * Add label item
             */
            this.titleLabel = new LabelItem();
            this.titleLabel.visible = false;
            this.titleLabel.title = 1;
            this.items.add(this.titleLabel);

        }

        //region Private
        /**
         *
         **/
        private _onAddInput(input: InputItem){

            this.items.add(input);

            input.valueChanged.add(this.onValueChanged, this);

            input.textVisible = true;

        }

        /**
         *
         **/
        private _onRemoveInput(input: InputItem){

            this.items.remove(input);

        }
        //endregion

        //region Methods
        /**
         * Returns an input by its assigned name
         **/
        byName(name: string): InputItem{


            if(!_isString(name))
                throw new InvalidArgumentEx('name', name);

            for(var i = 0; i < this.inputs.count; i++){
                if(this.inputs.item(i).name == name){
                    return this.inputs.item(i);
                }
            }

            return null;

        }

        /**
         * Gets an object with the values of fields
         **/
        getValues(): any{

            var r = {};
            var input: InputItem = null;

            while( (input = this.inputs.next()) )
                r[input.name] = input.value;

            return r;

        }

        /**
         * Sets the direction of Inputs
         * @param d
         */
        setDirection(d: Direction){
            for(var i = 0; i < this.inputs.length; i++){
                this.inputs.item(i).direction = d;
            }
        }

        /**
         * Gets or sets the with of the text parts.
         * Value must be percent since it must be leveled with value part. Value size will be adjusted
         * to 5% less large than it should to avoid edge collisions.
         * Values lower than 1 accepted.
         * Note that when horizontal input, layout may become affected.
         *
         */
        setTextWidth(value: number){
            for(var i = 0; i < this.inputs.length; i++){
                this.inputs[i].textWidth = value;
            }
        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
         private _valueChanged: LatteEvent

        /**
         * Gets an event raised when the value of an input is changed
         *
         * @returns {LatteEvent}
         */
        public get valueChanged(): LatteEvent{
            if(!this._valueChanged){
                this._valueChanged = new LatteEvent(this);
            }
            return this._valueChanged;
        }

        /**
         * Raises the <c>valueChanged</c> event
         */
        public onValueChanged(){
            if(this._valueChanged){
                this._valueChanged.raise();
            }
        }
        //endregion

        //region Properties

        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        get faceVisible(): boolean{
            return this._faceVisible;
        }

        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        set faceVisible(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._faceVisible = value;

            if(value){
                this.addClass('with-face');
            }else{
                this.removeClass('with-face');
            }



        }

        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        get readOnly(): boolean{
            return this._readOnly;
        }

        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        set readOnly(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value');

            var i = 0;

            for(i = 0; i < this.inputs.count; i++)
                this.inputs.item(i).readOnly = value;

            this._readOnly = value;


        }

        /**
         * Gets or sets the title of the form
         **/
        get title(): string{
            return this.titleLabel.text;
        }

        /**
         * Gets or sets the title of the form
         **/
        set title(value: string){


            if(value){
                this.titleLabel.visible = true;
            }

            this.titleLabel.text = value;


        }

        /**
         * Gets a value of checking every input in <c>inputs</c> to be valid
         **/
        get valid(): boolean{


            var input = null;

            while( (input = this.inputs.next()) )
                if(!input.valid)
                    return false;

            return true;

        }
        //endregion

    }
}