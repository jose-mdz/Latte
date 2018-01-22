/**
 * Created by josemanuel on 10/24/14.
 */
module latte {

    /**
     *
     */
    export class DataRecordWidget extends WidgetItem {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(record: DataRecord = null) {
            super();


            this.topToolbar.sideItems.add(this.btnSave);

            this.items.add(this.form);

            if(record) {
                this.record = record;
            }
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(){

            this.form.record = this.record;
            this.btnSave.enabled = false;

            if(this._recordChanged){
                this._recordChanged.raise();
            }

        }

        /**
         * Raises the <c>saving</c> event
         */
        onSaving(){
            if(this._saving){
                this._saving.raise();
            }
        }

        /**
         * Raises the <c>saved</c> event
         */
        onSaved(){
            if(this._saved){
                this._saved.raise();
            }
        }

        //endregion

        //region Events
        /**
         * Back field for event
         */
        private _recordChanged: LatteEvent

        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        public get recordChanged(): LatteEvent{
            if(!this._recordChanged){
                this._recordChanged = new LatteEvent(this);
            }
            return this._recordChanged;
        }


        /**
         * Back field for event
         */
        private _saving: LatteEvent;

        /**
         * Gets an event raised when the record is being saved
         *
         * @returns {LatteEvent}
         */
        get saving(): LatteEvent{
            if(!this._saving){
                this._saving = new LatteEvent(this);
            }
            return this._saving;
        }

        /**
         * Back field for event
         */
        private _saved: LatteEvent;

        /**
         * Gets an event raised when the record is saved
         *
         * @returns {LatteEvent}
         */
        get saved(): LatteEvent{
            if(!this._saved){
                this._saved = new LatteEvent(this);
            }
            return this._saved;
        }



        //endregion

        //region Components

        /**
         * Field for form property
         */
        private _form:DataRecordFormItem;

        /**
         * Gets the form of the record
         *
         * @returns {DataRecordFormItem}
         */
        get form():DataRecordFormItem {
            if (!this._form) {
                this._form = new DataRecordFormItem();
                this._form.faceVisible = false;
                this._form.valueChanged.add(()=> {
                    this.btnSave.enabled = true;
                });
            }
            return this._form;
        }

        /**
         * Field for btnSave property
         */
        private _btnSave:ButtonItem;

        /**
         * Gets the save button
         *
         * @returns {ButtonItem}
         */
        get btnSave():ButtonItem {
            if (!this._btnSave) {
                this._btnSave = new ButtonItem(null, IconItem.standard(4, 2), () => {
                    this.form.applyValues(this.record);

                    this.onSaving();

                    this.record.save(() => {
                        this.btnSave.enabled = false;
                        this.onSaved();
                    });

                });
                this._btnSave.tooltip = strings.save;
                this._btnSave.enabled = false;
            }
            return this._btnSave;
        }


        //endregion

        //region Properties

        /**
         * Property field
         */
        private _record: DataRecord = null;

        /**
         * Gets or sets the record of the widget
         *
         * @returns {DataRecord}
         */
        get record(): DataRecord{
            return this._record;
        }

        /**
         * Gets or sets the record of the widget
         *
         * @param {DataRecord} value
         */
        set record(value: DataRecord){

            // Check if value changed
            var changed: boolean = value !== this._record;

            // Set value
            this._record = value;

            // Trigger changed event
            if(changed){
                this.onRecordChanged();
            }
        }

        //endregion

    }

}