module latte{
    /**
     * Creates a form for a specific <c>DataRecord</c>
     **/
    export class DataRecordFormItem extends FormItem{


        /**
         * Creates the form of the specified record
         **/
        constructor(record: DataRecord = null){

            super();

            if(record)
                this.record = record;

        }

        //region Methods

        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to receive the values
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
         * Raises the <c>record</c> event
         */
        onRecordChanged(){

            var record = this.record;

            // Calls to get foreign key records
            var calls: Array<RemoteCall<DataRecord>> = [];

            // Clear inputs
            this.inputs.clear();

            if (record) {

                // Call form creating
                //TODO: onFormCreating should com from an interface or something
                if(record['onFormCreating']){
                    record['onFormCreating'](this);
                }

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

                                    var params = {
                                        name: field['recordType'],
                                        id: value
                                    };

                                    if(_isString(field['recordModule'])){
                                        log("Added module")
                                        params['module'] = field['recordModule'];
                                    }

                                    calls.push(new RemoteCall<DataRecord>('latte.data', 'DataLatteUa', 'recordSelect', params).withHandlers((r:DataRecord) => {
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

                //TODO: onFormCreated should come from an interface or something
                if(record['onFormCreated']){
                    record['onFormCreated'](this);
                }

                /**
                 * Send calls if any
                 */
                if (calls.length > 0) {
                    Message.sendCalls(calls);
                }
            }

            if(this._recordChanged){
                this._recordChanged.raise();
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
        get recordChanged(): LatteEvent{
            if(!this._recordChanged){
                this._recordChanged = new LatteEvent(this);
            }
            return this._recordChanged;
        }
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _record: DataRecord = null;

        /**
         * Gets or sets the record of the form
         *
         * @returns {DataRecord}
         */
        get record(): DataRecord{
            return this._record;
        }

        /**
         * Gets or sets the record of the form
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