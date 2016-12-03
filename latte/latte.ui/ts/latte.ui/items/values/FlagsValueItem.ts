/**
 * Created by josemanuel on 8/6/16.
 */
module latte {

    export interface IFlags{
        [index: number]: string;
    }

    /**
     *
     */
    export class FlagsValueItem extends ValueItem<number> {

        //region Static
        //endregion

        //region Fields
        private ignoreUpdateChecks = false;
        private ignoreUpdateValue = false;
        //endregion

        /**
         *
         */
        constructor() {
            super();

            this.addClass('flags');
            this.element.append(this.stack.element);
        }

        //region Private Methods
        private updateChecks(){

            if(this.ignoreUpdateChecks) {
                this.ignoreUpdateChecks = false;
                return;
            }

            // log("Updating Checks")

            for (let i = 0; i < this.checks.length; i++) {
                let check = this.checks[i];
                let flag = check.tag;
                this.ignoreUpdateValue = true;
                check.value = (this.value & flag) == flag;
            }

            this.ignoreUpdateValue = false;
        }

        private updateValue(){

            if (this.ignoreUpdateValue){
                this.ignoreUpdateValue = false;
                return;
            }

            // log("Updating Value")

            let val = 0;

            for (let i = 0; i < this.checks.length; i++) {
                let check = this.checks[i];
                let flag = check.tag;
                if(check.value) {
                    val = val | flag;
                }
            }

            // this.ignoreValueChange = true;
            this.ignoreUpdateChecks = true;
            this.value = val;
        }
        //endregion

        //region Methods

        /**
         * Override.
         */
        onGetValueString(): string {
            let list: String[] = [];
            let f = this.value;
            for(let i in this.options){
                let flag = parseInt(i);

                if( (f & flag) == flag){
                    list.push(this.options[i]);
                }
            }
            return list.join(', ') || strings.flagsNone;
        }

        /**
         * Raises the <c>options</c> event
         */
        onOptionsChanged(){
            if(this._optionsChanged){
                this._optionsChanged.raise();
            }

            this.checks.clear();

            for(let i in this.options){
                let check = new CheckboxItem();
                check.label.text = this.options[i];
                check.tag = i;
                check.valueChanged.add(() => this.updateValue());
                this.checks.add(check);
            }
            // log("Options changed")

            this.updateChecks();
        }

        /**
         * Raises the <c>value</c> event
         */
        onValueChanged(){
            super.onValueChanged();
            // log("Value Changed: " + this.value)

            if(!this.ignoreUpdateChecks) {
                this.updateChecks();
            }

            this.ignoreUpdateChecks = false;
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _optionsChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the options property changes
         *
         * @returns {LatteEvent}
         */
        get optionsChanged(): LatteEvent{
            if(!this._optionsChanged){
                this._optionsChanged = new LatteEvent(this);
            }
            return this._optionsChanged;
        }

        //endregion

        //region Properties

        /**
         * Field for checks property
         */
        private _checks: Collection<CheckboxItem>;

        /**
         * Gets the checkboxes
         *
         * @returns {Collection<CheckboxItem>}
         */
        get checks(): Collection<CheckboxItem> {
            if (!this._checks) {
                this._checks = new Collection<CheckboxItem>(
                    // Add
                    (check) => {
                        this.stack.items.add(check)
                    },
                    // Remove
                    (check) => {
                        this.stack.items.remove(check)
                    }
                );
            }
            return this._checks;
        }

        /**
         * Property field
         */
        private _options: IFlags = null;

        /**
         * Gets or sets the options of the flags
         *
         * @returns {IFlags}
         */
        get options(): IFlags{
            return this._options;
        }

        /**
         * Gets or sets the options of the flags
         *
         * @param {IFlags} value
         */
        set options(value: IFlags){

            // Check if value changed
            let changed: boolean = value !== this._options;

            // Set value
            this._options = value;

            // Trigger changed event
            if(changed){
                this.onOptionsChanged();
            }
        }

        /**
         * Field for stack property
         */
        private _stack: ItemStack;

        /**
         * Gets the stack of the item
         *
         * @returns {ItemStack}
         */
        get stack(): ItemStack {
            if (!this._stack) {
                this._stack = new ItemStack();
            }
            return this._stack;
        }

        //endregion

    }

}