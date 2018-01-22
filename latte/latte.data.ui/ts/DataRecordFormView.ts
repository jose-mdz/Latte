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

        /**
         * Override
         * @returns {latte.ICall[]}
         */
        getSaveCalls(): ICall[]{
            //HACK: I don't think the call to applyValues should be here.
            this.applyValues(this.record);

            // Return save call
            return [this.record.saveCall().withHandlers(() => {
                this.unsavedChanges = false;
            })];
        }

        printSaveStack(view: View){
            log(sprintf("Unsaved changes = %s of view:", view.unsavedChanges))
            log(view)
            if(view.parentView) this.printSaveStack(view.parentView);
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