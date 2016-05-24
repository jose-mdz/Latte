module latte{
    /**
     *
     **/
    export class DataRecordFormView extends FormView{


        /**
         * Creates the form of the specified record
         **/
        constructor(record: DataRecord = null){

            super();

            //this.form = new DataRecordFormItem();
            //this.items.clear();
            //this.items.add(this.form);

            if(record)
                this.record = record;

        }



        //region Methods
        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to recieve the values
         **/
        applyValues(record: DataRecord = null){

            (<DataRecordFormItem>this.form).applyValues(record);

        }

        onSaveChanges(){
            super.onSaveChanges();

            this.applyValues(this.record);
            this.record.save(() => { this.unsavedChanges = false })
        }

        //endregion

        //region Components

        /**
         * Field for form property
         */
        private _dataform:DataRecordFormItem;

        /**
         * Gets the data record form view
         *
         * @returns {DataRecordFormItem}
         */
        get form():DataRecordFormItem {
            if (!this._dataform) {
                this._dataform = new DataRecordFormItem();
                this._dataform.valueChanged.add(this.onValueChanged, this);
            }
            return this._dataform;
        }

        //endregion

        //region Properties

        /**
         * Gets or sets the record of the form
         **/
        get record(): DataRecord{
            return (<DataRecordFormItem>this.form).record;
        }

        /**
         * Gets or sets the record of the form
         **/
        set record(record: DataRecord){
            (<DataRecordFormItem>this.form).record = record;
        }
        //endregion
    }
}