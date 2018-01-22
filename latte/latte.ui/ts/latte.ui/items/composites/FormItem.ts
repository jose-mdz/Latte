module latte{
    /**
     *
     **/
    export class FormItem extends ItemStack implements ISave{


        //region Static

        //endregion

        //region Fields

        //endregion

        /**
         *
         **/
        constructor(){

            super();
            this.element.addClass('form');

            // Init me
            this.faceVisible = true;

            // Add label item
            this.items.add(this.titleLabel);

        }

        //region Private

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
         * Implementation. Gets an empty array since the form class itself has no way of knowing what calls should make
         * the save itself.
         */
        getSaveCalls(): ICall[]{
            return [];
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
         * Raises the <c>direction</c> event
         */
        onDirectionChanged(){
            if(this._directionChanged){
                this._directionChanged.raise();
            }

            for(var i = 0; i < this.inputs.length; i++){
                this.inputs.item(i).direction = this.direction;
            }
        }

        /**
         * Called when an input has been added
         * @param {latte.InputItem} item
         */
        onInputAdded(input: InputItem){
            this.items.add(input);

            input.valueChanged.add(() => {
                // log(`Input item value changed: ${input.value}`);
                // if(input.value == 2) {
                //     debugger;
                // }
                // log(`[${this.localId}] Value: ${input.value}`);
                this.onValueChanged();
            });

            if(this.direction){
                input.direction = this.direction;
            }

            // if(input.readOnly === null && this.readOnly !== null) {
            //     input.readOnly = this.readOnly;
            // }

            if(this.readOnly === true) {
                input.readOnly = true;
            }

            input.textVisible = true;
        }

        /**
         * Called when an input has been removed
         * @param {latte.InputItem} input
         */
        onInputRemoved(input: InputItem){
            this.items.remove(input);
        }

        /**
         * Raises the <c>readOnly</c> event
         */
        onReadOnlyChanged(){
            if(this._readOnlyChanged){
                this._readOnlyChanged.raise();
            }

            // for (let i = 0; i < this.inputs.length; i++) {
            //     let input = this.inputs[i];
            //
            //     if(input.readOnly === null && this.readOnly !== null) {
            //         input.readOnly = this.readOnly;
            //     }
            //
            // }

            this.inputs.each(input => {
                if(this.readOnly) {
                    input.readOnly = true;
                }else{
                    if(input.meta && _isBoolean(input.meta.readOnly)) {
                        input.readOnly = input.meta.readOnly as boolean;
                    }
                }
            });
        }

        /**
         * Raises the <c>valueChanged</c> event
         */
        onValueChanged(){
            if(this._valueChanged){
                this._valueChanged.raise();
            }
            // log(`Sending unsaved changes. Current: ${this.unsavedChanges}`);
            this.unsavedChanges = true;
        }

        /**
         * Sets the direction of Inputs
         * @param d
         */
        setDirection(d: Direction){
            warnDeprecated('FormItem.setDirection', 'FormItem.direction');
            this.direction = d;
        }

        /**
         * Returns an input by its assigned name
         **/
        valueItemByName(name: string, baseClass: Function = null): ValueItem<any>{


            let input = this.byName(name);

            if(input){
                if(baseClass) {
                    if(input.valueItem instanceof baseClass) {
                        return input.valueItem;
                    }else {
                        return null;
                    }
                }else {
                    return input.valueItem;
                }
            }

            return null;
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
        private _directionChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the direction property changes
         *
         * @returns {LatteEvent}
         */
        get directionChanged(): LatteEvent{
            if(!this._directionChanged){
                this._directionChanged = new LatteEvent(this);
            }
            return this._directionChanged;
        }

        /**
         * Back field for event
         */
        private _readOnlyChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the readOnly property changes
         *
         * @returns {LatteEvent}
         */
        get readOnlyChanged(): LatteEvent{
            if(!this._readOnlyChanged){
                this._readOnlyChanged = new LatteEvent(this);
            }
            return this._readOnlyChanged;
        }

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

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _direction: Direction = null;

        /**
         * Gets or sets the direction of the inputs in the form
         *
         * @returns {Direction}
         */
        get direction(): Direction{
            return this._direction;
        }

        /**
         * Gets or sets the direction of the inputs in the form
         *
         * @param {Direction} value
         */
        set direction(value: Direction){

            // Check if value changed
            let changed: boolean = value !== this._direction;

            // Set value
            this._direction = value;

            // Trigger changed event
            if(changed){
                this.onDirectionChanged();
            }
        }

        /**
         *
         **/
        private _faceVisible: boolean;

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
         * Field for inputs property
         */
        private _inputs:Collection<InputItem>;

        /**
         * Gets the inputs of the form
         *
         * @returns {Collection<Input>}
         */
        get inputs():Collection<InputItem> {
            if (!this._inputs) {
                this._inputs = new Collection<InputItem>(
                    input => this.onInputAdded(input),
                    input => this.onInputRemoved(input)
                );
            }
            return this._inputs;
        }

        /**
         * Gets a value indicating if the form is currently valid
         *
         * @returns {boolean}
         */
        get isValid(): boolean {

            for (let i = 0; i < this.inputs.length; i++) {
                if(!this.inputs[i].valid) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Property field
         */
        private _readOnly: boolean = null;

        /**
         * Gets or sets a value indicating if the inputs should be read-only.
         *
         * @returns {boolean}
         */
        get readOnly(): boolean{
            return this._readOnly;
        }

        /**
         * Gets or sets a value indicating if the inputs should be read-only.
         *
         * @param {boolean} value
         */
        set readOnly(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._readOnly;

            // Set value
            this._readOnly = value;

            // Trigger changed event
            if(changed){
                this.onReadOnlyChanged();
            }
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

        //region Components

        /**
         * Field for titleLabel property
         */
        private _titleLabel:LabelItem;

        /**
         * Gets the title label
         *
         * @returns {LabelItem}
         */
        get titleLabel():LabelItem {
            if (!this._titleLabel) {
                this._titleLabel = new LabelItem();
                this._titleLabel.visible = false;
                this._titleLabel.title = 1;
            }
            return this._titleLabel;
        }


        //endregion
    }
}