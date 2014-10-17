module latte{
    /**
     * Creates a form for a specific <c>DataRecord</c>
     **/
    export class DataRecordFormItem extends FormItem{

        /**
         *
         **/
        private _record: DataRecord;


        /**
         * Creates the form of the specified record
         **/
        constructor(record: DataRecord = null){

            super();

            if(record)
                this.record = record;

        }

        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to recieve the values
         **/
        applyValues(record: DataRecord = null){

            var input: InputItem;
            var r = record || this.record;

            while( (input = this.inputs.next()) ){

                if(input.readOnly === true) continue;

                r[input.tag] = input.value;

            }

        }

        /**
         * Gets or sets the record of the form
         **/
        get record(): DataRecord{
            return this._record;
        }

        /**
         * Gets or sets the record of the form
         **/
        set record(record: DataRecord){

            // Calls to get foreign key records
            var calls: Array<RemoteCall<DataRecord>> = [];

            // Hold record
            this._record = record;

            // Clear inputs
            this.inputs.clear();

            if (record) {

                // Call form creating
                record.onFormCreating(this);

                // Extract metadata
                var metadata = record.getMetadata();

                // Scan metadata
                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {

                        var field = metadata.fields[i];
                        var input:InputItem = new InputItem();
                        var value = _undef(record[i]) ? null : record[i];

                        input.text = field.text ? field.text : '(No name)';
                        input.type = field.type ? field.type : 'string';
                        input.name = i;
                        input.tag = i;
                        input.readOnly = field['readonly'] === true;
                        input.visible = field['visible'] !== false;
                        input.options = field['options'];
                        input.value = value;//value !== null ? value : field['defaultValue'];
                        input.separator = field['separator'] === true;

                        if (field.type == 'record') {

                            // Get record value item
                            var d:DataRecordValueItem = <any>input.valueItem;

                            // Assign loader function
                            d.loaderFunction = field.loaderFunction;

                            // If not record as value, load it in call
                            if (value && field['recordType'] && !(value instanceof DataRecord)) {
                                ((d:DataRecordValueItem, input) => {
                                    calls.push(new RemoteCall<DataRecord>('_core', 'DataLatteUa', 'recordSelect', {name: field['recordType'], id: value}).withHandlers((r:DataRecord) => {
    //                                    log("Arrived foreign key record:")
    //                                    log(r)
                                        if (r && r.recordId) {
                                            d.setRecordSilent(r);
                                            input.value = input.value;
                                        }

                                    }));
                                })(d, input);

                            }
                        }

                        this.inputs.add(input);
                    }
                }

                record.onFormCreated(this);

                /**
                 * Send calls if any
                 */
                if (calls.length > 0) {
                    Message.sendCalls(calls);
                }
            }


        }
    }
}