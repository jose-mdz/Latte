module latte{
    /**
     * Creates a form for a specific <c>DataRecord</c>
     **/
    export class DataRecordFormItemOld extends FormItem implements ISave{


        /**
         * Creates the form of the specified record
         **/
        constructor(record: DataRecord = null){

            super();

            if(record)
                this.record = record;

        }

        //region Private Methods

        /**
         * Loads the record
         *
         * @param record
         */
        private loadRecord(){

            // Calls to get foreign key records
            let calls: ICall[] = [];

            // Call form creating
            this.record.onFormCreating(this);

            // Extract metadata
            let metadata = this.record.getMetadata();

            // Check fields metadata
            if (metadata && metadata.fields) {

                // Scan fields
                for (let i in metadata.fields) {

                    let field = metadata.fields[i];

                    // Skip if category specified and field is not in category
                    if(!(_isString(this.category) && (field['category'] != this.category))) {

                        // Add input and get call to make
                        calls.push(this.addInput(i, metadata.fields[i]));
                    }
                }
            }

            // Call form created
            this.record.onFormCreated(this);

            // Sends the calls
            Message.sendCalls(calls, () => this.onRecordLoaded());
        }

        /**
         * Adds the specified input
         * @param {string} name
         * @param {latte.IInput} field
         * @returns {latte.ICall}
         */
        private addInput(name: string, field: IInput): ICall{

            // Prepare result
            let result: ICall = null;

            // Create Input
            let input:InputItem = InputItem.fromIInput(field, name);

            // Get value of Input
            let value = _undef(this.record[name]) ? null : this.record[name];
            this.record.addBind(name, input, 'value');

            // Tag because of backwards compatibility
            input.tag = name;

            // Name of input
            input.name = name;

            // Visibility of input
            this.updateFieldVisibility(field, input, value);

            // Separator
            input.separator = field['separator'] === true;

            //If fieldString declaration when read-only
            // if(input.readOnly && this.record[name + 'String']) {
            //     input.value = this.record[name + 'String'];
            // }else{
            //     input.value = value; //value !== null ? value : field['defaultValue'];
            // }

            // Actually add the input
            this.inputs.add(input);

            // Check
            if(field.type == 'record') {
                result = this.handleRecordInput(field, input, value);

            }

            return result;

        }

        /**
         * Handles the load of a Record
         * @param {latte.IInput} field
         * @param {latte.DataRecordValueItem} d
         * @returns {latte.ICall}
         */
        private handleRecordInput(field: IInput, input: InputItem, value: any): ICall{

            let d: DataRecordValueItem = <DataRecordValueItem>input.valueItem;

            if(!(d instanceof DataRecordValueItem))
                throw "Input Item doesn't have a DataRecordValueItem";

            // Handle record change
            d.valueChanged.add(() => this.onLoadedRecordProperty(input.name));

            // Assign loader function
            d.loaderFunction = field.loaderFunction;

            // If not record as value, load it in call
            if (value && field.recordType && !(value instanceof DataRecord)) {

                let params = {
                    name: field.recordType,
                    id: value
                };

                let dummy = new latte[params.name]();

                if (_isString(dummy['_moduleName'])) {
                    params['module'] = dummy['_moduleName'];
                }

                let call = new RemoteCall<DataRecord>('latte.data', 'DataLatteUa', 'recordSelect', params);

                return call.withHandlers(r => {

                    // log("Arrived foreign key record:")

                    // log(r)

                    if (r && r.recordId > 0) {
                        d.setRecordSilent(r);
                        input.value = input.value;


                        this.updateFieldVisibility(field, input, r);

                        this.onLoadedRecordProperty(input.name);
                    }

                });
            }
        }

        /**
         * Updates the visibility of the field
         * @param {string} name
         * @param {latte.IInput} field
         * @param {latte.DataRecord} record
         * @param value
         */
        private updateFieldVisibility(field: IInput, input: InputItem, value: any){

            // Visibility of Input
            input.visible = field['visible'] !== false;

            // Conditional visibility
            if(_isString(field['visible'])) {
                if(field['visible'] === 'if-inserted') {
                    input.visible = this.record.inserted();

                }else if(field['visible'] === 'if-not-inserted') {
                    input.visible = !this.record.inserted();

                }else if(field['visible'] == 'if-value') {
                    input.visible = !!value;
                }
            }
        }

        //endregion

        //region Methods

        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to receive the values
         **/
        applyValues(record: DataRecord = null){

            warnDeprecated('DataRecordFormItem.applyValues', 'values are DataBinded now');

            let input: InputItem;
            let r = record || this.record;

            while( (input = this.inputs.next()) ){

                if(input.readOnly === true) continue;

                if(_isBoolean(input.value)){
                    r[input.tag] = input.value + 0;
                }else{
                    r[input.tag] = input.value;
                }

            }

        }

        /**
         * Property field
         */
        private _category: string = null;

        /**
         * Gets or sets the category of fields to show
         *
         * @returns {string}
         */
        get category(): string{
            return this._category;
        }

        /**
         * Gets or sets the category of fields to show
         *
         * @param {string} value
         */
        set category(value: string){

            // Check if value changed
            let changed: boolean = value !== this._category;

            // Set value
            this._category = value;

            // Trigger changed event
            if(changed){
                this.onCategoryChanged();
            }
        }

        /**
         * Override.
         */
        getSaveCalls(): ICall[]{
            if(this.record){
                //this.applyValues(this.record);
                return [this.record.saveCall().withHandlers(() => this.unsavedChanges = false)];
            }
            return [];
        }

        /**
         * Raises the <c>category</c> event
         */
        onCategoryChanged(){
            if(this._categoryChanged){
                this._categoryChanged.raise();
            }

            if(this.record) {
                this.onRecordChanged();
            }
        }

        /**
         * Raises the <c>loadedRecordProperty</c> event
         */
        onLoadedRecordProperty(propertyName: string){
            if(this._loadedRecordProperty){
                this._loadedRecordProperty.raise(propertyName);
            }
        }

        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(){

            // Clear inputs
            this.inputs.clear();

            if(this.record) {

                // Load the record
                this.loadRecord();

            }

            if(this._recordChanged){
                this._recordChanged.raise();
            }
        }

        /**
         * Raises the <c>record</c> event
         */
        onRecordChangedOLD(){

            let record = this.record;

            // Calls to get foreign key records
            let calls: Array<RemoteCall<DataRecord>> = [];

            // Clear inputs
            this.inputs.clear();

            if (record) {

                // Call form creating
                //TODO: onFormCreating should com from an interface or something
                if(record['onFormCreating']){
                    record['onFormCreating'](this);
                }

                // Extract metadata
                let metadata = record.getMetadata();

                // Scan metadata
                if (metadata && metadata.fields) {
                    for (let i in metadata.fields) {

                        let field = metadata.fields[i];

                        if(_isString(this.category) && this.category.length == 0 && !field['category']) {
                            // All good
                            // debugger;
                        }else if(_isString(this.category) && (field['category'] != this.category)) {
                            // debugger;
                            continue;
                        }

                        let input:InputItem = InputItem.fromIInput(field, i);
                        let value = _undef(record[i]) ? null : record[i];

                        // input.text = field.text ? field.text : i;
                        // input.type = field.type ? field.type : 'string';
                        // input.name = i;
                        // input.readOnly = field['readonly'] === true || field['readOnly'] === true;
                        // input.options = field['options'];
                        input.tag = i;
                        input.visible = field['visible'] !== false;
                        input.separator = field['separator'] === true;

                        if(_isString(field['visible'])) {
                            if(field['visible'] === 'if-inserted') {
                                input.visible = record.inserted();

                            }else if(field['visible'] === 'if-not-inserted') {
                                input.visible = !record.inserted();
                            }
                        }

                        // Check for fieldString declaration when read-only
                        if(input.readOnly && record[i + 'String']) {
                            input.value = record[i + 'String'];
                        }else{
                            input.value = value;//value !== null ? value : field['defaultValue'];
                        }

                        if (field.type == 'record') {

                            // Get record value item
                            let d:DataRecordValueItem = <any>input.valueItem;

                            // Handle record change
                            d.valueChanged.add(() => this.onLoadedRecordProperty(i));

                            // Assign loader function
                            d.loaderFunction = field.loaderFunction;

                            // If not record as value, load it in call
                            if (value && field['recordType'] && !(value instanceof DataRecord)) {
                                ((d:DataRecordValueItem, input) => {

                                    let params = {
                                        name: field['recordType'],
                                        id: value
                                    };

                                    let dummy = new latte[params.name]();

                                    if(_isString(dummy['_moduleName'])){
                                        params['module'] = dummy['_moduleName'];
                                    }

                                    calls.push(new RemoteCall<DataRecord>('latte.data', 'DataLatteUa', 'recordSelect', params)
                                        .withHandlers((r:DataRecord) => {
                                        // log("Arrived foreign key record:")
                                        // log(r)
                                        if (r && r.recordId) {
                                            d.setRecordSilent(r);
                                            input.value = input.value;

                                            this.onLoadedRecordProperty(i);
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

        /**
         * Raises the <c>recordLoaded</c> event
         */
        onRecordLoaded(){
            if(this._recordLoaded){
                this._recordLoaded.raise();
            }
        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _categoryChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the category property changes
         *
         * @returns {LatteEvent}
         */
        get categoryChanged(): LatteEvent{
            if(!this._categoryChanged){
                this._categoryChanged = new LatteEvent(this);
            }
            return this._categoryChanged;
        }

        /**
         * Back field for event
         */
        private _loadedRecordProperty: LatteEvent;

        /**
         * Gets an event raised when a property of type record has been loaded
         *
         * @returns {LatteEvent}
         */
        get loadedRecordProperty(): LatteEvent{
            if(!this._loadedRecordProperty){
                this._loadedRecordProperty = new LatteEvent(this);
            }
            return this._loadedRecordProperty;
        }

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

        /**
         * Back field for event
         */
        private _recordLoaded: LatteEvent;

        /**
         * Gets an event raised when the full data of the record is loaded
         *
         * @returns {LatteEvent}
         */
        get recordLoaded(): LatteEvent{
            if(!this._recordLoaded){
                this._recordLoaded = new LatteEvent(this);
            }
            return this._recordLoaded;
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
            let changed: boolean = value !== this._record;

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