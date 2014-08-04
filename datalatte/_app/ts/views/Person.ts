/**
 * Created by josemanuel on 6/11/14.
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

        getMetadata(){
            return {
                fields: {
                    name: {
                        text: strings.name
                    },

                    lastname: {
                        text: strings.lastName
                    },

                    sex: {
                        text: strings.sex,
                        type: 'enumeration',
                        options: ['M', 'F']
                    },

                    birth: {
                        text: strings.birth,
                        type: 'date'
                    }
                }
            }
        }

        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

    }

}