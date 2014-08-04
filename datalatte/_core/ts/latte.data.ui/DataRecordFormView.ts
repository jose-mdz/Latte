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

            this.form = new DataRecordFormItem();
            this.items.clear();
            this.items.add(this.form);

            if(record)
                this.record = record;

        }

        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to recieve the values
         **/
        applyValues(record: DataRecord = null){

            (<DataRecordFormItem>this.form).applyValues(record);

        }

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
    }
}