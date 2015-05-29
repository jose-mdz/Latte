/**
 * Created by josemanuel on 5/27/15.
 */
module latte {

    /**
     *
     */
    export class Person extends personBase {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods
        //endregion

        //region Methods

        onFieldValueChanged(name: string, value: any){
            super.onFieldValueChanged(name, value);

            if(name == 'name' || name == 'lastname') {
                this.onFullNameChanged();
                this.onInitialsChanged();
            }

        }

        /**
         * Raises the <c>initialsChanged</c> event
         */
        onInitialsChanged(){
            if(this._initialsChanged){
                this._initialsChanged.raise();
            }
        }

        /**
         * Raises the <c>fullNameChanged</c> event
         */
        onFullNameChanged(){
            if(this._fullNameChanged){
                this._fullNameChanged.raise();
            }
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _fullNameChanged: LatteEvent;

        /**
         * Gets an event raised when the full name changes
         *
         * @returns {LatteEvent}
         */
        get fullNameChanged(): LatteEvent{
            if(!this._fullNameChanged){
                this._fullNameChanged = new LatteEvent(this);
            }
            return this._fullNameChanged;
        }


        /**
         * Back field for event
         */
        private _initialsChanged: LatteEvent;

        /**
         * Gets an event raised when the initials change
         *
         * @returns {LatteEvent}
         */
        get initialsChanged(): LatteEvent{
            if(!this._initialsChanged){
                this._initialsChanged = new LatteEvent(this);
            }
            return this._initialsChanged;
        }

        //endregion

        //region Properties

        /**
         * Gets the character for indexing the contact
         *
         * @returns {string}
         */
        get charForIndex():string {

            var f = String(this.name);
            var l = String(this.lastname);

            if(l.length > 0) {
                return l.charAt(0).toUpperCase();
            }else if(f.length > 0){
                return l.charAt(0).toUpperCase();
            }else {
                return strings.noName;
            }
        }

        /**
         * Gets the full name of the person
         *
         * @returns {string}
         */
        get fullName():string {
            return [this.name, this.lastname].join(' ');
        }

        /**
         * Gets the initials of the person
         *
         * @returns {string}
         */
        get initials():string {
            var f = String(this.name || '');
            var l = String(this.lastname || '');
            var data = [];

            if(f.length) {
                data.push(f.charAt(0).toUpperCase());
            }

            if(l.length) {
                data.push(l.charAt(0).toUpperCase());
            }

            return data.join('');
        }


        //endregion

    }

}