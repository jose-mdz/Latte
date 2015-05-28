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
        //endregion

        //region Events
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
            var f = String(this.name);
            var l = String(this.lastname);
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