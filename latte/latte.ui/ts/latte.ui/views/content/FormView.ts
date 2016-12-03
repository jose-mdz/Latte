module latte{
    /**
     * Renders a form to iunput data.
     **/
    export class FormView extends ColumnView{

        /**
         * Creates a new form, using the specified fields
         and commands
         **/
        constructor(inputs: Array<InputItem> = null){


            super(1);
            this.addClass('form');

            this.items.add(this.form);

            if(inputs)
                this.inputs.addArray(inputs);

        }

        //region Methods
        /**
         * Checks every input in <c>inputs</c> to be valid
         **/
        valid(): boolean{

            return this.form.valid;

        }

        /**
         * Returns an object with the values of fields
         **/
        getValues(): any{
            return this.form.getValues();
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
            this.form.setTextWidth(value);
        }
        //endregion

        //region Events


        /**
         * Back field for event
         */
         private _valueChanged: LatteEvent

        /**
         * Gets an event raised when a value of the form changes
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
            this.unsavedChanges = true;
        }

        //endregion

        //region Components

        /**
         * Field for form property
         */
        private _form:FormItem;

        /**
         * Gets the form of the view
         *
         * @returns {FormItem}
         */
        public get form():FormItem {
            if (!this._form) {
                this._form = new FormItem();
                this._form.valueChanged.add(this.onValueChanged, this);
            }
            return this._form;
        }


        //endregion

        //region Properties
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        get faceVisible(): boolean{
            return this.form.faceVisible;
        }

        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        set faceVisible(value: boolean){
            this.form.faceVisible = value;
        }

        /**
         * Gets the inputs of the form
         *
         * @returns {Collection<InputItem>}
         */
        public get inputs():Collection<InputItem> {
            return this.form.inputs;
        }

        /**
         * Gets a value indicating if the values in the form are valid
         *
         * @returns {boolean}
         */
        get isValid(): boolean {
            return this.form.isValid;
        }


        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        get readOnly(): boolean{
            return this.form.readOnly;
        }

        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        set readOnly(value: boolean){
            this.form.readOnly = value;
        }

        /**
         * Gets or sets the title of the form
         **/
        get title(): string{
            return this.form.title;
        }

        /**
         * Gets or sets the title of the form
         **/
        set title(value: string){
            this.form.title = value;
        }

        /**
         * Gets the title label of the form
         *
         * @returns {LabelItem}
         */
        public get titleLabel():LabelItem {
            return this.form.titleLabel;
        }

        //endregion
    }
}