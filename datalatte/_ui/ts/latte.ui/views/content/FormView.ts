module latte{
    /**
     * Renders a form to iunput data.
     **/
    export class FormView extends ColumnView{

        /**
         * Form
         **/
        form: FormItem;

        /**
         * Input items of the form
         **/
        inputs: Collection<InputItem>;

        /**
         * Holds the title element of the form
         **/
        titleLabel: LabelItem;


        /**
         * Creates a new form, using the specified fields
         and commands
         **/
            constructor(inputs: Array<InputItem> = null){


            super(1);
            this.addClass('form');

            this.form = new FormItem();
            this.inputs = this.form.inputs;
            this.titleLabel = this.form.titleLabel;

            this.items.add(this.form);

            if(inputs)
                this.inputs.addArray(inputs);

        }

        /**
         * Checks every input in <c>inputs</c> to be valid
         **/
        valid(): boolean{

            return this.form.valid;

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
         * Returns an object with the values of fields
         **/
        getValues(): any{

            return this.form.getValues();

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
    }
}