/**
 * Created by josemanuel on 5/29/15.
 */
module latte {

    /**
     *
     */
    export class PersonView extends PersonViewBase {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(person: Person) {
            super();

            if(person) {
                this.person = person;
            }
        }

        //region Private Methods
        //endregion

        //region Methods
        /**
         * Event Handler.
         */
        lblFirstName_Focus(){
            setTimeout(() => {
                document.execCommand('selectAll', false, null)
            }, 50);
        }

        /**
         * Event Handler.
         */
        lblLastName_Focus(){
            setTimeout(() => {
                document.execCommand('selectAll', false, null)
            }, 50);
        }

        /**
         * Raises the <c>editMode</c> event
         */
        onEditModeChanged(){
            if(this._editModeChanged) {
                this._editModeChanged.raise();
            }

            // Set edit mode of the binded elements
            this.findAll('[data-bind]').setProperty('contentEditable', this.editMode);

            if(this.editMode) {
                this.lblFirstName.element.focus();

            }else {

                // Save data
                this.person.save(() => {
                    //this.onPersonChanged();
                });
            }

        }

        /**
         * Raises the <c>person</c> event
         */
        onPersonChanged(){
            if(this._personChanged){
                this._personChanged.raise();
            }

            if(this.person){
                this.bind(this.person);
            }

        }


        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _editModeChanged: LatteEvent

        /**
         * Gets an event raised when the value of the editMode property changes
         *
         * @returns {LatteEvent}
         */
        get editModeChanged(): LatteEvent{
            if(!this._editModeChanged){
                this._editModeChanged = new LatteEvent(this);
            }
            return this._editModeChanged;
        }

        /**
         * Back field for event
         */
        private _personChanged: LatteEvent

        /**
         * Gets an event raised when the value of the person property changes
         *
         * @returns {LatteEvent}
         */
        get personChanged(): LatteEvent{
            if(!this._personChanged){
                this._personChanged = new LatteEvent(this);
            }
            return this._personChanged;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _editMode: boolean = null;

        /**
         * Gets or sets a value indicating if the view is in edit mode
         *
         * @returns {boolean}
         */
        get editMode(): boolean{
            return this._editMode;
        }

        /**
         * Gets or sets a value indicating if the view is in edit mode
         *
         * @param {boolean} value
         */
        set editMode(value: boolean){

            // Check if value changed
            var changed: boolean = value !== this._editMode;

            // Set value
            this._editMode = value;

            // Trigger changed event
            if(changed){
                this.onEditModeChanged();
            }
        }

        /**
         * Property field
         */
        private _person: Person = null;

        /**
         * Gets or sets the person of the detail zone
         *
         * @returns {Person}
         */
        get person(): Person{
            return this._person;
        }

        /**
         * Gets or sets the person of the detail zone
         *
         * @param {Person} value
         */
        set person(value: Person){

            // Check if value changed
            var changed: boolean = value !== this._person;

            // Set value
            this._person = value;

            // Trigger changed event
            if(changed){
                this.onPersonChanged();
            }
        }

        //endregion

    }

}