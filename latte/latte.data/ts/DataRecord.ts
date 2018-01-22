module latte{

    import _isString = latte._isString;

    export interface DataRecordArrayCallback { (records:Array<DataRecord>): void }
    export interface DataRecordCallback { (record:DataRecord): void }
    export interface VoidCallback { (): any }

    /**
     * Represents a DataRecord on App
     **/
    export class DataRecord {

        //region Static

        /**
         * Pointer to the default namespace where records are stored, used by <c>fromServerObject</c> method for selecting records.
         **/
        static _defaultRecordsNamespace: Object;

        /**
         * Name of object where records are stored
         */
        static recordsNamespaceName: string = 'latte';

        /**
         * Scans the passed Object and converts available packed records to latte.DataRecord
         instances
         **/
        static scanAndConvert(obj:any):any {

            if ( obj && _isObject(obj) || _isArray(obj)) {
                if (latte.DataRecord.isPackedRecord(obj)) {
                    obj = latte.DataRecord.fromServerObject(obj);

                } else {
                    for (let i in obj) {
                        obj[i] = latte.DataRecord.scanAndConvert(obj[i]);
                    }
                }
            }

            return obj;

        }

        /**
         * Sets the default records namespace, and injects common code into records.
         **/
        static setDefaultRecordsNamespace(namespace: Object) {

            latte.DataRecord._defaultRecordsNamespace = namespace;

            for (var symbol in namespace) {
                // Set record name
                namespace[symbol].recordType = symbol;

                // Copy static methods
                namespace[symbol].fromServerObject = latte.DataRecord.fromServerObject;
                namespace[symbol].fromServerObjects = latte.DataRecord.fromServerObjects;
            }

        }

        /**
         * Creates a record from the specified name and id. If no id is specified, empty record will arrive.
         **/
        static fromName(name:string, id:number, callback: DataRecordCallback) {


            var m = new latte.Message('latte.data', 'DataLatteUa', 'recordSelect',
                {name: name, id: id})
                .send( (record: DataRecord) => {

                    // Execute callback with record
                    callback(record);

                });

            return m;

        }

        /**
         * Converts a server given Object to a Record of the specified type, if no type specified <c>DataRecord</c> will be used.
         **/
        static fromServerObject(obj: any, classType: Function = null):DataRecord {

            var dns = latte.DataRecord._defaultRecordsNamespace ? latte.DataRecord._defaultRecordsNamespace : (_isObject(window[DataRecord.recordsNamespaceName]) ? window[DataRecord.recordsNamespaceName] : null);
            var rt = obj.recordType;
            var type = _isFunction(classType) ? classType : ( _isFunction(dns[rt]) ? dns[rt] : DataRecord);
            var record = new (<any>type)();
            var i, j;

            if (!latte.DataRecord.isPackedRecord(obj)){
                throw new latte.Ex();
            }

            for (i in obj.fields){
                let nativeType = type['nativeTypes'] ? type['nativeTypes'][i] || 'varchar' : 'varchar';
                record[i] = DataRecord.unserializeNativeValue(obj.fields[i], nativeType);
            }

            record.recordType = obj.recordType;
            record.recordId = parseInt(obj.recordId);

            if (obj.metadata) {
                // Metadata, if any
                record.metadata = obj.metadata || {};
            }

            // If record contains properties
            if (!_undef(obj['properties'])) {

                for (i in obj.properties) {

                    // If property is an array
                    if (_isArray(obj.properties[i])) {

                        // Check if contains records
                        for (j = 0; j < obj.properties[i].length; j++) {
                            obj.properties[i][j] = latte.DataRecord.fromServerObject(obj.properties[i][j]);
                        }
                    }

                    // If property is a record
                    if (obj.properties[i] && obj.properties[i]['type'] == 'DataRecord') {
                        // Unpack
                        record[i] = latte.DataRecord.fromServerObject(obj.properties[i]);

                    } else {
                        // Or, Assign as it is
                        record[i] = obj.properties[i];
                    }
                }
            }

            return record;

        }

        /**
         * Converts a server given array of Object to a Records array
         **/
        static fromServerObjects(array: Array<Object>, classType: Function = null): Array<DataRecord> {


            if (!_isArray(array)) throw new latte.InvalidArgumentEx('array', array);

            var a = [];

            for (var i = 0; i < array.length; i++) {
                a.push(latte.DataRecord.fromServerObject(array[i], classType));
            }

            return a;

        }

        /**
         * Returns a value indicating if the passed Object
         is a packed Object
         **/
        static isPackedRecord(object: any):boolean {

            return _isObject(object)
                && object.type == 'DataRecord'
                && !_undef(object.recordType);

        }

        /**
         * Serializes the native value
         * @param value
         * @param nativeType
         * @returns {any}
         */
        static serializeNativeValue(value: any, nativeType: string): string{
            let parts = nativeType.split('(');
            let name = parts[0].toLowerCase();
            let size = parts.length > 1 ? parseInt(parts[1].replace(')', '')) : -1;
            let dictionary = {
                'bit': 'int',
                'tinyint': 'int',
                'bool': 'int',
                'boolean': 'int',
                'smallint': 'int',
                'mediumint': 'int',
                'int': 'int',
                'integer': 'int',
                'bigint': 'int',
                'decimal': 'float',
                'dec': 'float',
                'double': 'float',
                'double precision': 'float',
                'float': 'float',
                'year': 'int',
                'date': 'DateTime',
                'datetime': 'DateTime',
                'timestamp': 'TimeSpan',
                'time': 'TimeSpan',
                'char': 'string',
                'varchar': 'string',
                'text': 'string',
                'mediumtext': 'string',
                'enum': 'string'
            };

            let t = dictionary[name] || 'string';

            if(name == 'int' && size == 1) {
                return value ? "1" : "0";
            }

            let v = value === null ? '' : String(value);
            return v;
        }

        /**
         * Unserializes the native value
         * @param value
         * @param nativeType
         */
        static unserializeNativeValue(value: string, nativeType: string): any{
            if(value === null) {
                return null;
            }
            let parts = nativeType.split('(');
            let name = parts[0].toLowerCase();
            let size = parts.length > 1 ? parseInt(parts[1].replace(')', '')) : -1;
            let dictionary = {
                'bit': 'int',
                'tinyint': 'int',
                'bool': 'int',
                'boolean': 'int',
                'smallint': 'int',
                'mediumint': 'int',
                'int': 'int',
                'integer': 'int',
                'bigint': 'int',
                'decimal': 'float',
                'dec': 'float',
                'double': 'float',
                'double precision': 'float',
                'float': 'float',
                'year': 'int',
                'date': 'DateTime',
                'datetime': 'DateTime',
                'timestamp': 'TimeSpan',
                'time': 'TimeSpan',
                'char': 'string',
                'varchar': 'string',
                'text': 'string',
                'mediumtext': 'string',
                'enum': 'string'

            };

            let t = dictionary[name] || 'string';

            if(name == 'int' && size == 1) {
                t = 'boolean';
            }

            switch(t){
                case 'boolean': return !!parseInt(value, 10);
                case 'int': return parseInt(value, 10);
                case 'float': return parseFloat(value);
                case 'DateTime': return DateTime.fromString(value);
                case 'TimeSpan': return TimeSpan.fromString(value);
                case 'string': return String(value);
            }

            return String(value);
        }

        //endregion

        //region Fields

        private _binds: ValueDataBind[];

        /**
         *
         **/
        public _recordType: string;

        /**
         *
         **/
        private _tag: any;

        /**
         * Arbitrary collection of tags
         */
        tags: any = {};

        /**
         * Metadata of record. Comes from server.
         **/
        metadata: IEntityMeta;

        //endregion

        /**
         * Creates the record
         **/
        constructor() {

            /**
             * Initialize empty the fields of record
             */
            var metadata = this.getMetadata();

            if (metadata && _isObject(metadata.fields)) {
                for (var i in metadata.fields) {
                    this[i] = '';
                }
            }


        }

        //region Methods

        /**
         * Adds a bind to a property
         * @param {string} property
         * @param {any} target
         * @param {string} targetProperty
         * @param {any} type
         *
         */
        addBind(property: string, target: any, targetProperty: string, type: string | BindValueType = BindValueType.ANY): ValueDataBind{
            if(!this._binds) {
                this._binds = [];
            }

            let a = new DataBindActor(this, property, DataBindCoercion.parseType(this.onGetFieldTypes()[property]));
            let b = new DataBindActor(target, targetProperty, _isString(type) ? DataBindCoercion.parseType(<any>type) : <any>type);

            let bind = new ValueDataBind(a, b);

            this._binds.push(bind);

            return bind;
        }

        /**
         * Clears all the binds of the element
         */
        clearBinds(){
            if(this._binds) {
                this._binds.forEach(b => b.uninstall());
            }

            this._binds = null;
        }

        /**
         * Copies the data
         * @param r
         */
        copyFieldsDataFrom(r: DataRecord){

            var fields = r.onGetFields();

            for(var i in fields){
                this[i] = fields[i];
            }
        }

        /**
         * Gets the fields of the record, with values
         **/
        getFields():Object {

            var def = this.onGetFields();

            if(def) {
                return def;
            }else {
                var f = {};
                var metadata = this.getMetadata();

                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        f[i] = this[i] || null;
                    }
                }
                return f;
            }

        }

        /**
         * Can be overriden to return dynamically generated metadata
         **/
        getMetadata(): IEntityMeta {

            return this.metadata;

        }

        /**
         * Gets the fields of the record, with values serialized.
         */
        getSerializedFields():Object {

            var def = this.onGetFields();
            var rt = latte[this._recordType];

            if(def) {

                for(var i in def){
                    let nativeType = rt['nativeTypes'] ? rt['nativeTypes'][i] : 'varchar';
                    def[i] = DataRecord.serializeNativeValue(def[i], nativeType) || null;
                }

                return def;
            }else {
                var f = {};
                var metadata = this.getMetadata();

                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        let nativeType = rt['nativeTypes'] ? rt['nativeTypes'][i] : 'varchar';

                        f[i] = DataRecord.serializeNativeValue(this[i], nativeType) || null;
                    }
                }
                return f;
            }

        }

        /**
         * Sends an insert message to the server
         **/
        insert(callback: VoidCallback): latte.Message {

            return this.insertCall().send(( ) => {
                if(_isFunction(callback)){
                    callback();
                }
            });

        }

        /**
         * Gets the remote call for insertion
         *
         * @returns {latte.RemoteCall}
         */
        insertCall(): RemoteCall<string>{

            let values = this.getSerializedFields();

            // Change null values to empty values
            for (let i in values){
                if (values[i] === null){
                    values[i] = '';
                }
            }

            // Create call
            let call = new RemoteCall<string>(this.moduleName, 'DataLatteUa', 'recordInsert', {name: this.recordType, fields: values});

            // Catch auto-id
            call.success.add((data: string) => {
                this.recordId =  parseInt(data, 10);
                this[this.onGetRecordIdName()] = this.recordId;
            });

            return call;
        }

        /**
         * Returns a value indicating if the record is inserted, based on the existence of id
         **/
        inserted():boolean {

            return this.recordId > 0;

        }

        /**
         * Raises the <c>fieldValueChanged</c> event
         */
        onFieldValueChanged(field: string, value: any){
            if(this._fieldValueChanged){
                this._fieldValueChanged.raise(field, value);
            }
        }

        /**
         * Raises the <c>formCreating</c> event
         */
        onFormCreating(dataRecordFormItem: any){
            if(this._formCreating){
                this._formCreating.raise(dataRecordFormItem);
            }
        }

        /**
         * Raises the <c>formCreated</c> event
         */
        onFormCreated(dataRecordFormItem: any){
            if(this._formCreated){
                this._formCreated.raise(dataRecordFormItem);
            }
        }

        /**
         * Gets the fields of the record with its data.
         */
        onGetFields(): any {
            return null;
        }

        /**
         *  Gets a dictionary with the TypeScript type of each property
         * @returns {any}
         */
        onGetFieldTypes(): any{
            return null;
        }

        /**
         * Gets the name of the id field
         * @returns {undefined}
         */
        onGetRecordIdName(): string{
            return undefined;
        }

        /**
         * Raises the <c>recordId</c> event
         */
        onRecordIdChanged(){
            if(this._recordIdChanged){
                this._recordIdChanged.raise();
            }
        }

        /**
         * Sends a DELETE request to the server
         **/
        remove(callback:() => any = null){

            return this.removeCall().send(( ) => {
                if(_isFunction(callback)){
                    callback();
                }
            });

        }

        /**
         * Removes binds of the specified target
         * @param target
         */
        removeBindsOf(target: any){
            let list = [];

            this._binds.forEach(b => {
                if(b.actorB.actor == target){
                    b.uninstall();
                }else{
                    list.push(b);
                }
            })

            this._binds = list;
        }

        /**
         * Gets the call for removing this record
         * @returns {latte.RemoteCall}
         */
        removeCall(): RemoteCall<boolean>{
            return new RemoteCall<boolean>(this.moduleName, 'DataLatteUa', 'recordDelete', {name: this.recordType, id: this.recordId});
        }

        /**
         * Inserts or updates the record
         **/
        save(callback:VoidCallback = null):latte.Message {

            return this.saveCall().send(( ) => {
                if(_isFunction(callback)){
                    callback();
                }
            });
        }

        /**
         * Gets the insert or update call for record
         */
        saveCall(): RemoteCall<any>{
            if (this.recordId){
                return this.updateCall();
            }
            else{
                return this.insertCall();
            }
        }

        /**
         * Represents the person as a string
         * @returns {string}
         */
        toString(): string{

            if(_isString(this['name'])) {
                return this['name'];

            }else if(_isString(this['text'])) {
                return this['text'];

            }else{
                return sprintf("[%s: %s]", this.recordType, this.recordId);
            }
        }

        /**
         * Sends an update message to the record
         **/
        update(callback:VoidCallback): Message {

            return this.updateCall().send(( ) => {
                if(_isFunction(callback)){
                    callback();
                }
            });

        }

        /**
         * Gets the call for updating the record
         *
         * @returns {latte.RemoteCall<string>}
         */
        updateCall(): RemoteCall<string>{

            var values = this.getSerializedFields();

            // Change null values to empty values
            for (var i in values){
                if (values[i] === null){
                    values[i] = '';
                }
            }

            // Create call
            var call = new RemoteCall<string>(this.moduleName, 'DataLatteUa', 'recordUpdate', {name: this.recordType, id: this.recordId, fields: values});

            return call;
        }

        //endregion

        //region Events


        /**
         * Back field for event
         */
        private _formCreating: LatteEvent;

        /**
         * Gets an event raised when a DataRecordFormItem about the record is being created
         *
         * @returns {LatteEvent}
         */
        get formCreating(): LatteEvent{
            if(!this._formCreating){
                this._formCreating = new LatteEvent(this);
            }
            return this._formCreating;
        }


        /**
         * Back field for event
         */
        private _formCreated: LatteEvent;

        /**
         * Gets an event raised when a DataRecordFormItem about the record has been created
         *
         * @returns {LatteEvent}
         */
        get formCreated(): LatteEvent{
            if(!this._formCreated){
                this._formCreated = new LatteEvent(this);
            }
            return this._formCreated;
        }

        /**
         * Back field for event
         */
        private _fieldValueChanged: LatteEvent;

        /**
         * Gets an event raised when the value of a field is changed
         *
         * @returns {LatteEvent}
         */
        get fieldValueChanged(): LatteEvent{
            if(!this._fieldValueChanged){
                this._fieldValueChanged = new LatteEvent(this);
            }
            return this._fieldValueChanged;
        }

        /**
         * Back field for event
         */
        private _recordIdChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the recordId property changes
         *
         * @returns {LatteEvent}
         */
        get recordIdChanged(): LatteEvent{
            if(!this._recordIdChanged){
                this._recordIdChanged = new LatteEvent(this);
            }
            return this._recordIdChanged;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
         _moduleName:string;

        /**
         * Gets or sets the name of the module where record is contained
         *
         * @returns {string}
         */
        get moduleName():string {
            return this._moduleName;
        }

        /**
         * Gets or sets the name of the module where record is contained
         *
         * @param {string} value
         */
        set moduleName(value:string) {
            this._moduleName = value;
        }

        /**
         * Property field
         */
        private _recordId: number = null;

        /**
         * Gets or sets the record id
         *
         * @returns {number}
         */
        get recordId(): number{
            return this._recordId;
        }

        /**
         * Gets or sets the record id
         *
         * @param {number} value
         */
        set recordId(value: number){

            // Check if value changed
            let changed: boolean = value !== this._recordId;

            // Set value
            this._recordId = value;

            // Trigger changed event
            if(changed){
                this.onRecordIdChanged();
            }
        }

        /**
         * Gets or sets the record type
         **/
        get recordType():string {
            return this._recordType;
        }

        /**
         * Gets or sets the record type
         **/
        set recordType(value: string) {
            this._recordType = value;
        }

        /**
         * Gets or sets an arbitrary value for the record
         **/
        get tag():string {
            return this._tag;
        }

        /**
         * Gets or sets an arbitrary value for the record
         **/
        set tag(value:string) {
            this._tag = value;
        }


        //endregion

    }
}