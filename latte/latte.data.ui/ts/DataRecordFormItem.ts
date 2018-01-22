module latte {

    /**
     *
     */
    export class DataRecordFormItem extends MetaFormItem {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the item
         */
        constructor(record: DataRecord = null) {
            super(null, null);

            if(record) {
                this.record = record;
            }
        }

        //region Private Methods

        /**
         * Loads the record
         *
         * @param record
         */
        protected loadRecord(){

            // Call form creating
            this.record.onFormCreating(this);

            // Extract metadata
            this.metadata = this.record.getMetadata();

            // Call form created
            this.record.onFormCreated(this);

        }

        /**
         * Resolves a boolean in function of many criteria
         * @param {latte.IInput} field
         * @param {latte.InputItem} input
         * @param value
         */
        protected resolveBoolean(resolver: InputResolvedBoolean, field:IInput, input: InputItem, value: any){

            if(typeof resolver == 'boolean') {
                return resolver as boolean;
            }

            // if(input.name == 'lastname2') {
            //     debugger;
            // }

            if(typeof resolver == 'string') {
                if(resolver === 'if-inserted') {
                    return this.record.inserted();

                }else if(resolver === 'if-not-inserted') {
                    return !this.record.inserted();

                }else if(resolver == 'if-value') {
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
         * Override.
         */
        getSaveCalls(): ICall[]{
            if(this.record){
                // this.applyValues(this.record);
                // log(`Saving form`);
                return [this.record.saveCall()]; //.withHandlers(() => this.unsavedChanges = false)];
            }
            return [];
        }

        /**
         * Raises the <c>category</c> event
         */
        onCategoryChanged(){
            super.onCategoryChanged();

            if(this.record) {
                this.onRecordChanged();
            }
        }

        /**
         * Override
         * @param {latte.InputItem} input
         */
        onInputAdded(input: InputItem){


            // Add binding to input
            this.source.addBind(input.name, input, 'value', DataBindCoercion.parseType(input.type));

            super.onInputAdded(input);
        }

        /**
         * Override
         */
        onLoadedMetadata(){
            super.onLoadedMetadata();

            this.onRecordLoaded();
        }

        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(){
            if(this._recordChanged){
                this._recordChanged.raise();
            }

            this.source = this.record;

            if(this.record) {
                this.loadRecord();

                this.updater = () => this.record.getMetadata();
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
        private _recordChanged: LatteEvent;

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
         * Gets an event raised when the record data has been fully loaded
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
         * Gets or sets the Data Record of the item
         *
         * @returns {DataRecord}
         */
        get record(): DataRecord{
            return this._record;
        }

        /**
         * Gets or sets the Data Record of the item
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