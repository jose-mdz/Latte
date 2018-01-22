module latte{
    /**
     * Creates a form for a specific <c>DataRecord</c>
     **/
    export class MetaFormItem extends FormItem implements ISave{

        //region Fields

        //endregion

        /**
         * Creates the form of the specified record
         **/
        constructor(source: any = null, metadata: IEntityMeta = null, updater: () => IEntityMeta = null){

            super();

            if(source)
                this.source = source;

            if(metadata)
                this.metadata = metadata;

            if(updater)
                this.updater = updater;

        }

        //region Private Methods

        /**
         * Loads the record
         *
         * @param record
         */
        private loadMetadata(){

            this.inputs.clear();

            // Calls to get foreign key records
            let calls: ICall[] = [];

            // Extract metadata
            let metadata = this.metadata;

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

            // Sends the calls
            Message.sendCalls(calls, () => this.onLoadedMetadata());
        }

        /**
         * Adds the specified input
         * @param {string} name
         * @param {latte.IInput} field
         * @returns {latte.ICall}
         */
        protected addInput(name: string, field: IInput): ICall{

            // Prepare result
            let result: ICall = null;

            // Get value of Input
            let value = _undef(this.source[name]) ? null : this.source[name];

            // Get defaultValue if needed
            if(value === null && 'defaultValue' in field ) {
                value = field['defaultValue'];
            }

            // Create Input
            let input:InputItem = InputItem.fromIInput(field, name, value);

            // Tag because of backwards compatibility
            input.tag = name;

            // Name of input
            input.name = name;

            // Resolve Read Only
            if(this.readOnly){
                input.readOnly = true;

            }else if('readOnly' in field) {
                input.readOnly = this.resolveBoolean(field.readOnly, field, input, value);
            }

            // Visibility of input
            this.updateFieldVisibility(field, input, value);

            // ReadOnly findings
            this.updateFieldReadOnlyFindings(input, name);

            // Separator
            if('separator' in field)
                input.separator = this.resolveBoolean(field.separator, field, input, value);


            // Actually add the input
            this.inputs.add(input);

            // Check
            if(field.type == 'record') {
                result = this.handleRecordInput(field, input, value);
            }

            // Handle value change if formUpdater
            if(('updatesForm' in field) && this.resolveBoolean(field.updatesForm, field, input, value)){
                // Handle value change
                input.valueChanged.add(() => {
                    this.updateForm();
                });
            }

            return result;

        }

        /**
         * Handles the load of a Record
         * @param {latte.IInput} field
         * @param {latte.DataRecordValueItem} d
         * @returns {latte.ICall}
         */
        protected handleRecordInput(field: IInput, input: InputItem, value: any): ICall{

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
         * Updates the findings that may change the read-only value
         * @param {latte.InputItem} input
         * @param {string} name
         */
        protected updateFieldReadOnlyFindings(input: InputItem, name: string){
            //If fieldString declaration when read-only
            if(input.readOnly && this.source[name + 'String'] || this.readOnly) {
                input.readOnlyValue = this.source[name + 'String'];
            }
        }

        /**
         * Updates the visibility of the field
         * @param {string} name
         * @param {latte.IInput} field
         * @param {latte.DataRecord} record
         * @param value
         */
        protected updateFieldVisibility(field: IInput, input: InputItem, value: any){

            // Visibility of Input
            // input.visible = field['visible'] !== false;

            if('visible' in field) {
                input.visible = this.resolveBoolean(field.visible, field, input, value);
            }

            // Conditional visibility
            // if(_isString(field['visible'])) {
            //     if(field['visible'] == 'if-value') {
            //         input.visible = !!value;
            //     }
            // }
        }

        /**
         * Resolves a boolean in function of many criteria
         * @param {latte.IInput} field
         * @param {latte.InputItem} input
         * @param value
         */
        protected resolveBoolean(resolver: InputResolvedBoolean, field:IInput, input: InputItem, value: any): boolean{

            if(typeof resolver == 'boolean') {
                return !!resolver;
            }

            if(typeof resolver == 'string') {
                if(resolver == 'if-value') {
                    return !InputItem.isEmptyValue(value);

                }else if(resolver == 'if-readonly-and-value') {
                    return input.readOnly ? !InputItem.isEmptyValue(value) : true;
                }
            }

            return null;
        }

        //endregion

        //region Methods

        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to receive the values
         **/
        applyValues(record: any = null){

            // warnDeprecated('DataRecordFormItem.applyValues', 'values are DataBinded now');

            let input: InputItem;
            let r = record || this.source;

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
         * Raises the <c>category</c> event
         */
        onCategoryChanged(){
            if(this._categoryChanged){
                this._categoryChanged.raise();
            }

        }

        /**
         * Raises the <c>formUpdated</c> event
         */
        onFormUpdated(){
            if(this._formUpdated){
                this._formUpdated.raise();
            }
        }

        /**
         * Raises the <c>loadedMetadata</c> event
         */
        onLoadedMetadata(){
            if(this._loadedMetadata){
                this._loadedMetadata.raise();
            }

            if(_isFunction(this.metadata.onFormCreated)) {
                this.metadata.onFormCreated(this);
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
         * Raises the <c>metadata</c> event
         */
        onMetadataChanged(){
            if(this._metadataChanged){
                this._metadataChanged.raise();
            }

            if(this.source && this.metadata) {
                this.loadMetadata();
            }

            if(this.metadata && _isFunction(this.metadata.onFormCreating)) {
                this.metadata.onFormCreating(this);
            }
        }

        /**
         * Override.
         */
        onReadOnlyChanged(){
            super.onReadOnlyChanged();

            // Update visibility of items
            this.inputs.each(input => {
                this.updateFieldReadOnlyFindings(input, input.name);
                this.updateFieldVisibility(input.meta, input, input.value);
            });
        }

        /**
         * Raises the <c>source</c> event
         */
        onSourceChanged(){
            if(this._sourceChanged){
                this._sourceChanged.raise();
            }
        }

        /**
         * Updates the inputs of the form based on the criteria of metadata
         */
        updateForm(){
            if(this.updater){
                this._metadata = this.updater();
            }else{
                console.warn("Can't update form, no updater specified");
            }

            if(this.metadata.fields){
                for(let name in this.metadata.fields){
                    let input = this.byName(name);
                    let meta = this.metadata.fields[name];

                    if(input) {

                        // Update visibility
                        input.visible = 'visible' in meta ? this.resolveBoolean(meta.visible, meta, input, input.value) : true;

                        // Updates the read only state
                        input.readOnly = 'readOnly' in meta ? this.resolveBoolean(meta.readOnly, meta, input, input.value) : false;

                        // Updates the separator
                        input.separator = 'separator' in meta ? this.resolveBoolean(meta.separator, meta, input, input.value) : false;

                        // Update meta of field
                        input.meta = meta;
                    }else{
                        log(`Input not found ${name}`);
                    }
                }
            }

            this.onFormUpdated();

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
        private _formUpdated: LatteEvent;

        /**
         * Gets an event raised when the form is updated
         *
         * @returns {LatteEvent}
         */
        get formUpdated(): LatteEvent{
            if(!this._formUpdated){
                this._formUpdated = new LatteEvent(this);
            }
            return this._formUpdated;
        }

        /**
         * Back field for event
         */
        private _loadedMetadata: LatteEvent;

        /**
         * Gets an event raised when metadata has been fully loaded
         *
         * @returns {LatteEvent}
         */
        get loadedMetadata(): LatteEvent{
            if(!this._loadedMetadata){
                this._loadedMetadata = new LatteEvent(this);
            }
            return this._loadedMetadata;
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
        private _metadataChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the metadata property changes
         *
         * @returns {LatteEvent}
         */
        get metadataChanged(): LatteEvent{
            if(!this._metadataChanged){
                this._metadataChanged = new LatteEvent(this);
            }
            return this._metadataChanged;
        }

        /**
         * Back field for event
         */
        private _sourceChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the source property changes
         *
         * @returns {LatteEvent}
         */
        get sourceChanged(): LatteEvent{
            if(!this._sourceChanged){
                this._sourceChanged = new LatteEvent(this);
            }
            return this._sourceChanged;
        }

        //endregion

        //region Properties

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
         * Property field
         */
        private _metadata: IEntityMeta = null;

        /**
         * Gets or sets the metadata to load
         *
         * @returns {IEntityMeta}
         */
        get metadata(): IEntityMeta{
            return this._metadata;
        }

        /**
         * Gets or sets the metadata to load
         *
         * @param {IEntityMeta} value
         */
        set metadata(value: IEntityMeta){

            // Check if value changed
            let changed: boolean = value !== this._metadata;

            // Set value
            this._metadata = value;

            // Trigger changed event
            if(changed){
                this.onMetadataChanged();
            }
        }

        /**
         * Property field
         */
        private _source: any = null;

        /**
         * Gets or sets the source object of the metadata
         *
         * @returns {any}
         */
        get source(): any{
            return this._source;
        }

        /**
         * Gets or sets the source object of the metadata
         *
         * @param {any} value
         */
        set source(value: any){

            // Check if value changed
            let changed: boolean = value !== this._source;

            // Set value
            this._source = value;

            // Trigger changed event
            if(changed){
                this.onSourceChanged();
            }
        }

        /**
         * Property field
         */
        private _updater: () => IEntityMeta = null;

        /**
         * Gets or sets the updater of metadata
         *
         * @returns {() => IEntityMeta}
         */
        get updater(): () => IEntityMeta {
            return this._updater;
        }

        /**
         * Gets or sets the updater of metadata
         *
         * @param {() => IEntityMeta} value
         */
        set updater(value: () => IEntityMeta) {
            this._updater = value;
        }

        //endregion

    }
}