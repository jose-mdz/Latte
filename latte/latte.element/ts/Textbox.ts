/**
 * Created by josemanuel on 4/15/15.
 */
module latte {

    /**
     *
     */
    export class Textbox extends Element<HTMLInputElement> {

        //region Static

        /**
         * Checks if email is valid
         * @param email
         * @returns {boolean}
         */
        static validEmail(email: string): boolean{
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }

        //endregion

        //region Fields
        private lastValueOnKeyUp: string = null;
        //endregion

        /**
         * Creates the textbox
         */
        constructor(element: HTMLElement) {
            super(element);

            this.addEventListener('input', () => {
                if(this.pristine) {
                    //log("Unpristined: " + this.input.name)
                    this.pristine = false;
                }

                this.lastValueOnKeyUp = this.value;
            });

        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Returns a value indicating if the value of the textbox contains only the caracters specified
         * in the validChars string.
         * @param validChars
         */
        static charCheck(text: string, validChars: string): boolean{
            validChars = String(validChars);

            for (var i = 0; i < text.length; i++) {
                if(validChars.indexOf(text.charAt(i)) < 0){
                    return false
                }
            }
            return true;
        }

        /**
         * Focuses on the Input
         */
        focus(){
            this.input.focus();
        }

        /**
         * Returns the value of the textbox
         * @returns {string}
         */
        toString(): string{
            return this.value;
        }

        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Gets the element as an input element (Type Cast)
         *
         * @returns {HTMLInputElement}
         */
        get input():HTMLInputElement {
            return <HTMLInputElement>this.element;
        }

        /**
         * Gets a value indicating if the value of the textbox has only letters and numbers
         * @returns {boolean}
         */
        get isAlphanumeric():boolean{
            return Textbox.charCheck(this.value, '1234567890qwertyuiopasdfghjklzxcvbnm');
        }

        /**
         * Gets a value indicating if the value of the textbox is an email
         *
         * @returns {boolean}
         */
        get isEmail():boolean {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(this.value);
        }

        /**
         * Gets a value indicating if the value of the textbox is an integer number
         * @returns {boolean}
         */
        get isInt():boolean{
            return Textbox.charCheck(this.value, '1234567890');
        }

        /**
         * Gets a value indicating if the value of the textbox is a floating point number
         * @returns {boolean}
         */
        get isFloat():boolean{
            return Textbox.charCheck(this.value, '123456789.');
        }

        /**
         * Gets or sets the minimum length of the text in textbox
         *
         * @returns {number}
         */
        get minLength():number {
            return parseInt(this.element.getAttribute('data-minlength'), 10) || 0;
        }

        /**
         * Gets or sets the minimum length of the text in textbox
         *
         * @param {number} value
         */
        set minLength(value:number) {
            this.element.setAttribute('data-minlength', String(value));
        }

        /**
         * Property field
         */
        private _pristine: boolean = true;

        /**
         * Gets or sets a value indicating if the textbox is pristine, i.e., it hasn't been touched
         *
         * @returns {boolean}
         */
        get pristine(): boolean{
            return this._pristine;
        }

        /**
         * Gets or sets a value indicating if the textbox is pristine, i.e., it hasn't been touched
         *
         * @param {boolean} value
         */
        set pristine(value: boolean){

            // Check if value changed
            var changed: boolean = value !== this._pristine;

            // Set value
            this._pristine = value;

            // Trigger changed event
            if(changed){
                this.onPristineChanged();
            }
        }

        /**
         * Back field for event
         */
        private _pristineChanged: LatteEvent

        /**
         * Gets an event raised when the value of the pristine property changes
         *
         * @returns {LatteEvent}
         */
        get pristineChanged(): LatteEvent{
            if(!this._pristineChanged){
                this._pristineChanged = new LatteEvent(this);
            }
            return this._pristineChanged;
        }

        /**
         * Raises the <c>pristine</c> event
         */
        onPristineChanged(){
            if(this._pristineChanged){
                this._pristineChanged.raise();
            }
        }

        /**
         * Gets a value indicating if the textbox is valid
         *
         * @returns {boolean}
         */
        get valid():boolean {

            var valid = true;

            if(valid && _isNumber(this.minLength)) {
                valid = String(this.value).length >= this.minLength;
            }
            return valid;
        }

        /**
         * Gets or sets the value of the textbox
         *
         * @returns {string}
         */
        get value():string {
            return this.input.value || "";
        }

        /**
         * Gets or sets the value of the textbox
         *
         * @param {string} value
         */
        set value(value:string) {
            this.input.value = value;
        }


        //endregion

    }

}