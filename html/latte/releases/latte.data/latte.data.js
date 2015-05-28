var latte;
(function (latte) {
    /**
     * Saves full lists of records in Memory
     *
     * <example>
     * // Load cache of users
     * Cache.load('User', 'users');
     *
     * // After load, now we can use the users cache
     * // Cache.users is a DataRecordCollection object
     * for(var i = 0; i < Cache.users.count; i++)
     *  console.log(Cache.users.item(i));
     * </example>
     *
     */
    var Cache = (function () {
        function Cache() {
        }
        /**
         * Loads a cache of the specified name into cache itself.
         * @param recordType
         * @param name
         * @param callback
         * @returns {null}
         */
        Cache.prototype.load = function (recordType, name, callback) {
            /*
            DataRecord.fromListing(recordType, '/', {}, function(stages){

                // Add users to cache
                latte.Cache[name] = new latte.DataRecordCollection();
                latte.Cache[name].add(stages);

                // Call callback
                if(_isFunction(callback))
                    callback.call(this);
            });*/
            if (callback === void 0) { callback = null; }
            return null;
        };
        return Cache;
    })();
    latte.Cache = Cache;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a DataRecord on App
     **/
    var DataRecord = (function () {
        //endregion
        /**
         * Creates the record
         **/
        function DataRecord() {
            /**
             * Arbitrary collection of tags
             */
            this.tags = {};
            /**
             * Initialize empty the fields of record
             */
            var metadata = this.getMetadata();
            if (metadata && latte._isObject(metadata.fields)) {
                for (var i in metadata.fields) {
                    this[i] = '';
                }
            }
        }
        /**
         * Scans the passed Object and converts available packed records to latte.DataRecord
         instances
         **/
        DataRecord.scanAndConvert = function (obj) {
            if (obj && latte._isObject(obj) || latte._isArray(obj)) {
                if (latte.DataRecord.isPackedRecord(obj)) {
                    obj = latte.DataRecord.fromServerObject(obj);
                }
                else {
                    for (var i in obj) {
                        obj[i] = latte.DataRecord.scanAndConvert(obj[i]);
                    }
                }
            }
            return obj;
        };
        /**
         * Sets the default records namespace, and injects common code into records.
         **/
        DataRecord.setDefaultRecordsNamespace = function (namespace) {
            latte.DataRecord._defaultRecordsNamespace = namespace;
            for (var symbol in namespace) {
                // Set record name
                namespace[symbol].recordType = symbol;
                // Copy static methods
                namespace[symbol].fromServerObject = latte.DataRecord.fromServerObject;
                namespace[symbol].fromServerObjects = latte.DataRecord.fromServerObjects;
            }
        };
        /**
         * Creates a record from the specified name and id. If no id is specified, empty record will arrive.
         **/
        DataRecord.fromName = function (name, id, callback) {
            var m = new latte.Message('_core', 'DataLatteUa', 'recordSelect', { name: name, id: id }).send(function (record) {
                // Execute callback with record
                callback(record);
            });
            return m;
        };
        /**
         * Converts a server given Object to a Record of the specified type, if no type specified <c>DataRecord</c> will be used.
         **/
        DataRecord.fromServerObject = function (obj, classType) {
            if (classType === void 0) { classType = null; }
            var dns = latte.DataRecord._defaultRecordsNamespace ? latte.DataRecord._defaultRecordsNamespace : (latte._isObject(window[DataRecord.recordsNamespaceName]) ? window[DataRecord.recordsNamespaceName] : null);
            var rt = obj.recordType;
            var type = latte._isFunction(classType) ? classType : (latte._isFunction(dns[rt]) ? dns[rt] : DataRecord);
            var record = new type();
            var i, j;
            if (!latte.DataRecord.isPackedRecord(obj)) {
                throw new latte.Ex();
            }
            for (i in obj.fields)
                record[i] = obj.fields[i];
            record.recordType = obj.recordType;
            record.recordId = obj.recordId;
            if (obj.metadata) {
                // Metadata, if any
                record.metadata = obj.metadata || {};
            }
            // If record contains properties
            if (!latte._undef(obj['properties'])) {
                for (i in obj.properties) {
                    // If property is an array
                    if (latte._isArray(obj.properties[i])) {
                        for (j = 0; j < obj.properties[i].length; j++) {
                            obj.properties[i][j] = latte.DataRecord.fromServerObject(obj.properties[i][j]);
                        }
                    }
                    // If property is a record
                    if (obj.properties[i] && obj.properties[i]['type'] == 'DataRecord') {
                        // Unpack
                        record[i] = latte.DataRecord.fromServerObject(obj.properties[i]);
                    }
                    else {
                        // Or, Assign as it is
                        record[i] = obj.properties[i];
                    }
                }
            }
            return record;
        };
        /**
         * Converts a server given array of Object to a Records array
         **/
        DataRecord.fromServerObjects = function (array, classType) {
            if (classType === void 0) { classType = null; }
            if (!latte._isArray(array))
                throw new latte.InvalidArgumentEx('array', array);
            var a = [];
            for (var i = 0; i < array.length; i++) {
                a.push(latte.DataRecord.fromServerObject(array[i], classType));
            }
            return a;
        };
        /**
         * Returns a value indicating if the passed Object
         is a packed Object
         **/
        DataRecord.isPackedRecord = function (object) {
            return latte._isObject(object) && object.type == 'DataRecord' && !latte._undef(object.recordType);
        };
        //region Methods
        /**
         * Gets the fields of the record, with values
         **/
        DataRecord.prototype.getFields = function () {
            var def = this.onGetFields();
            if (def) {
                return def;
            }
            else {
                var f = {};
                var metadata = this.getMetadata();
                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        f[i] = this[i] || null;
                    }
                }
                return f;
            }
        };
        /**
         * Can be overriden to return dynamically generated metadata
         **/
        DataRecord.prototype.getMetadata = function () {
            return this.metadata;
        };
        /**
         * Sends an insert message to the server
         **/
        DataRecord.prototype.insert = function (callback) {
            return this.insertCall().send(function () {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        };
        /**
         * Gets the remote call for insertion
         *
         * @returns {latte.RemoteCall}
         */
        DataRecord.prototype.insertCall = function () {
            var _this = this;
            var values = this.getFields();
            for (var i in values) {
                if (values[i] === null) {
                    values[i] = '';
                }
            }
            // Create call
            var call = new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordInsert', { name: this.recordType, fields: values });
            // Catch auto-id
            call.success.add(function (data) {
                _this.recordId = parseInt(data, 10);
                _this[_this.onGetRecordIdName()] = _this.recordId;
            });
            return call;
        };
        /**
         * Returns a value indicating if the record is inserted, based on the existence of id
         **/
        DataRecord.prototype.inserted = function () {
            return this.recordId > 0;
        };
        /**
         * Gets the fields of the record with its data.
         */
        DataRecord.prototype.onGetFields = function () {
            return null;
        };
        /**
         * Gets the name of the id field
         * @returns {undefined}
         */
        DataRecord.prototype.onGetRecordIdName = function () {
            return undefined;
        };
        /**
         * Sends a DELETE request to the server
         **/
        DataRecord.prototype.remove = function (callback) {
            return this.removeCall().send(function () {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        };
        /**
         * Gets the call for removing this record
         * @returns {latte.RemoteCall}
         */
        DataRecord.prototype.removeCall = function () {
            return new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordDelete', { name: this.recordType, id: this.recordId });
        };
        /**
         * Inserts or updates the record
         **/
        DataRecord.prototype.save = function (callback) {
            return this.saveCall().send(function () {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        };
        /**
         * Gets the insert or update call for record
         */
        DataRecord.prototype.saveCall = function () {
            if (this.recordId) {
                return this.updateCall();
            }
            else {
                return this.insertCall();
            }
        };
        /**
         * Sends an update message to the record
         **/
        DataRecord.prototype.update = function (callback) {
            return this.updateCall().send(function () {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        };
        /**
         * Gets the call for updating the record
         *
         * @returns {latte.RemoteCall<string>}
         */
        DataRecord.prototype.updateCall = function () {
            var values = this.getFields();
            for (var i in values) {
                if (values[i] === null) {
                    values[i] = '';
                }
            }
            // Create call
            var call = new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordUpdate', { name: this.recordType, id: this.recordId, fields: values });
            return call;
        };
        Object.defineProperty(DataRecord.prototype, "moduleName", {
            /**
             * Gets or sets the name of the module where record is contained
             *
             * @returns {string}
             */
            get: function () {
                return this._moduleName;
            },
            /**
             * Gets or sets the name of the module where record is contained
             *
             * @param {string} value
             */
            set: function (value) {
                this._moduleName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "formCreating", {
            /**
             * Gets an event raised when a form about the record is solicited
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._formCreating) {
                    this._formCreating = new latte.LatteEvent(this);
                }
                return this._formCreating;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "formCreated", {
            /**
             * Gets an event raised when a form about the record has been created
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._formCreated) {
                    this._formCreated = new latte.LatteEvent(this);
                }
                return this._formCreated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "recordId", {
            /**
             * Gets or sets the record id
             **/
            get: function () {
                return this._recordId;
            },
            /**
             * Gets or sets the record id
             **/
            set: function (value) {
                this._recordId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "recordType", {
            /**
             * Gets or sets the record type
             **/
            get: function () {
                return this._recordType;
            },
            /**
             * Gets or sets the record type
             **/
            set: function (value) {
                this._recordType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "tag", {
            /**
             * Gets or sets an arbitrary value for the record
             **/
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets an arbitrary value for the record
             **/
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "viewCreated", {
            /**
             * Gets an event raised when a View about the record has been created
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._viewCreated) {
                    this._viewCreated = new latte.LatteEvent(this);
                }
                return this._viewCreated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "viewCreating", {
            /**
             * Gets an event raised when a View about the record is being requested
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._viewCreating) {
                    this._viewCreating = new latte.LatteEvent(this);
                }
                return this._viewCreating;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Name of object where records are stored
         */
        DataRecord.recordsNamespaceName = 'latte';
        return DataRecord;
    })();
    latte.DataRecord = DataRecord;
})(latte || (latte = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var latte;
(function (latte) {
    /**
     * Represents a collection of records
     */
    var DataRecordCollection = (function (_super) {
        __extends(DataRecordCollection, _super);
        /**
         * Creates the collection of the specified type.
         * Optionally specifies handlers for adding and removing items, and a
         * context to call as closure of events.
         *
         * @param addCallback
         * @param removeCallback
         * @param context
         */
        function DataRecordCollection(addCallback, removeCallback, context) {
            if (addCallback === void 0) { addCallback = null; }
            if (removeCallback === void 0) { removeCallback = null; }
            if (context === void 0) { context = null; }
            _super.call(this, addCallback, removeCallback, context);
        }
        /**
         * Finds the record of the specified <c>id</c>
         *
         * @param id
         * @returns {null}
         */
        DataRecordCollection.prototype.byId = function (id) {
            return null;
        };
        return DataRecordCollection;
    })(latte.Collection);
    latte.DataRecordCollection = DataRecordCollection;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a set of structured data
     **/
    var DataSet = (function () {
        /**
         * Creates the dataset
         **/
        function DataSet() {
            this.columns = new latte.Collection();
            this.rows = new latte.Collection();
        }
        /**
         * Creates a <c>DataSet</c> from the dataset specified as a JSON object
         **/
        DataSet.fromServerObject = function (dataset) {
            var d = new DataSet();
            var i;
            for (i in dataset.fields) {
                d.columns.add(new latte.DataSetColumn(dataset.fields[i].name, DataSet.fromServerType(dataset.fields[i].type), dataset.fields[i].length));
            }
            // Add rows
            if (latte._isArray(dataset.rows)) {
                for (i = 0; i < dataset.rows.length; i++) {
                    var arr = dataset.rows[i];
                    var ds = new latte.DataSetRow(arr);
                    d.rows.add(ds);
                }
            }
            return d;
        };
        /**
         * Converts the type sent by server to a type compatible with <c>InputItem</c>
         **/
        DataSet.fromServerType = function (type) {
            switch (type) {
                case 'int':
                    type = 'integer';
                    break;
                case 'blob':
                    type = 'string';
                    break;
            }
            return type;
        };
        /**
         * Gets the index of the column by passing the name of the column
         **/
        DataSet.prototype.getColumnIndex = function (columnName) {
            var col = null;
            var i = 0;
            while ((col = this.columns.next())) {
                if (col.name.toLowerCase() == columnName.toLowerCase()) {
                    this.columns.resetPointer();
                    return i;
                }
                i++;
            }
            return null;
        };
        /**
         * Gets the data as an array of arrays
         **/
        DataSet.prototype.getDataArray = function () {
            var a = [];
            for (var i = 0; i < this.rows.count; i++)
                a.push(this.rows.item(i).getDataArray(this.columns.count));
            return a;
        };
        /**
         * Gets the value of the specified column at the specified row index
         **/
        DataSet.prototype.getValue = function (columnName, rowIndex) {
            var columnIndex;
            if ((columnIndex = this.getColumnIndex(columnName))) {
                return this.getValueAt(columnIndex, rowIndex);
            }
            else {
                throw new latte.InvalidArgumentEx(columnName);
            }
        };
        /**
         * Gets the value at the specified position
         **/
        DataSet.prototype.getValueAt = function (columnIndex, rowIndex) {
            if (this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex))
                return this.rows.item(rowIndex).getValueAt(columnIndex);
            else
                return null;
        };
        /**
         * Sets the value at the specified position
         **/
        DataSet.prototype.setValue = function (columnName, rowIndex, value) {
            var columnIndex;
            if ((columnIndex = this.getColumnIndex(columnName))) {
                return this.setValueAt(columnIndex, rowIndex, value);
            }
            return this;
        };
        /**
         * Sets the value at the specified position
         **/
        DataSet.prototype.setValueAt = function (columnIndex, rowIndex, value) {
            if (this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex))
                this.rows.item(rowIndex).setValueAt(columnIndex, value);
            else if (this.rows.count <= rowIndex)
                throw new latte.InvalidArgumentEx('rowIndex', rowIndex);
            else
                throw new latte.InvalidArgumentEx('columnIndex', columnIndex);
            return this;
        };
        return DataSet;
    })();
    latte.DataSet = DataSet;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a column of data for <c>DataSet</c>
     **/
    var DataSetColumn = (function () {
        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
        function DataSetColumn(name, type, length) {
            if (name === void 0) { name = ''; }
            if (type === void 0) { type = ''; }
            if (length === void 0) { length = 0; }
            this.optionsChanged = new latte.LatteEvent(this);
            this.name = name;
            this.type = type;
            this.length = length;
        }
        Object.defineProperty(DataSetColumn.prototype, "length", {
            /**
             * Gets or sets the length of the column values.
             **/
            get: function () {
                return this._length;
            },
            /**
             * Gets or sets the length of the column values.
             **/
            set: function (value) {
                this._length = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSetColumn.prototype, "name", {
            /**
             * Gets or sets the name of the column.
             **/
            get: function () {
                return this._name;
            },
            /**
             * Gets or sets the name of the column.
             **/
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>optionsChanged</c> event.
         **/
        DataSetColumn.prototype.onOptionsChanged = function () {
            this.optionsChanged.raise();
        };
        Object.defineProperty(DataSetColumn.prototype, "options", {
            /**
             * Gets or sets the options of the column.
             **/
            get: function () {
                return this._options;
            },
            /**
             * Gets or sets the options of the column.
             **/
            set: function (value /*(any|Array)*/) {
                this._options = value;
                this.onOptionsChanged();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSetColumn.prototype, "tag", {
            /**
             * Gets or sets a generic tag value for the object
             **/
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets a generic tag value for the object
             **/
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSetColumn.prototype, "type", {
            /**
             * Gets or sets the type of the column values.
             **/
            get: function () {
                return this._type;
            },
            /**
             * Gets or sets the type of the column values.
             **/
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        return DataSetColumn;
    })();
    latte.DataSetColumn = DataSetColumn;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a row of data for <c>DataSet</c>
     **/
    var DataSetRow = (function () {
        /**
         * Creates the row of data. Optionally sets the array of data
         **/
        function DataSetRow(data) {
            if (data === void 0) { data = []; }
            this.data = data;
            if (data)
                this.data = data;
            else
                this.data = [];
        }
        /**
         * Gets the data as an array of specified positions. Undefined positions will be set to null
         **/
        DataSetRow.prototype.getDataArray = function (columns) {
            var a = [];
            for (var i = 0; i < columns; i++)
                if (latte._undef(this.data[i]))
                    a[i] = null;
                else
                    a[i] = this.data[i];
            return a;
        };
        /**
         * Gets a value indicating if there is a value at the specified index
         **/
        DataSetRow.prototype.hasValueAt = function (index) {
            return !latte._undef(this.data[index]);
        };
        Object.defineProperty(DataSetRow.prototype, "readOnly", {
            /**
             * Gets or sets a value indicating if the row is read-only
             **/
            get: function () {
                return this._readOnly;
            },
            /**
             * Gets or sets a value indicating if the row is read-only
             **/
            set: function (value) {
                this._readOnly = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSetRow.prototype, "tag", {
            /**
             * Gets or sets the value at the specified position
             **/
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets the value at the specified position
             **/
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Gets or sets the value at the specified position
         **/
        DataSetRow.prototype.getValueAt = function (index) {
            return this.data[index];
        };
        /**
         * Gets or sets the value at the specified position
         **/
        DataSetRow.prototype.setValueAt = function (index, value) {
            this.data[index] = value;
        };
        return DataSetRow;
    })();
    latte.DataSetRow = DataSetRow;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Sends messages to objects on server.
     * <example>
     * // ( 1 )
     * // Execute method Person::computeAge() on person with id 1
     * var m1 = new Message('Person', 'computeAge', {}, 1);
     *
     * m1.send(function(){
     *   // Log result of computeAge()
     *   log(this.data);
     * });
     *
     * // ( 2 )
     * // Execute *static* method Person::count()
     * var m2 = new Message('Person', 'count');
     *
     * m2.send(function(){
     *   // Log result of count()
     *   log(this.data);
     * });
     *
     * </example>
     *
     * @class
     */
    var Message = (function () {
        //endregion
        /**
         * Creates the message with the specified call
         **/
        function Message(moduleName, className, method, arguments, id) {
            if (moduleName === void 0) { moduleName = null; }
            if (className === void 0) { className = null; }
            if (method === void 0) { method = null; }
            if (arguments === void 0) { arguments = null; }
            if (id === void 0) { id = 0; }
            /**
             *
             */
            this._calls = [];
            // Add first standard call
            if (className !== null) {
                this.calls.push(new latte.RemoteCall(moduleName, className, method, arguments, id));
            }
            if (Message._pendentMessages === null)
                Message._pendentMessages = new latte.Collection();
        }
        /**
         * Directly sends an array of calls
         * @param calls
         * @returns {latte.Message}
         */
        Message.sendCalls = function (calls) {
            var m = new Message();
            m.addCalls(calls);
            m.send();
            return m;
        };
        Object.defineProperty(Message, "networkAvailable", {
            /**
             * Checks if newtowrk is currently available, according to last message sent.
             **/
            get: function () {
                return Message._networkAvailable;
            },
            enumerable: true,
            configurable: true
        });
        //region Methods
        /**
         * Adds calls to the calls array
         * @param calls
         */
        Message.prototype.addCalls = function (calls) {
            this._calls = this._calls.concat(calls);
        };
        /**
         * Reacts to data arrived
         **/
        Message.prototype.dataArrived = function (data) {
            var parsed = false;
            var result = null;
            this._working = false;
            /// Assign response
            this.response = data;
            /// Network is available
            Message._networkAvailable = true;
            /// Raise received handler
            this.onResponseArrived();
            // Check if data arrived
            if (data.length == 0) {
                this.onFailed("Empty response from server");
            }
            try {
                result = JSON.parse(data);
                parsed = true;
            }
            catch (ex) {
            }
            if (parsed && latte._isArray(result)) {
                if (result.length !== this.calls.length) {
                    this.onFailed("Different amount of response than calls");
                }
                for (var i = 0; i < this.calls.length; i++) {
                    this.calls[i].respond(result[i]);
                }
            }
            else {
                /// Raise failed event
                this.onFailed("Can't parse or response is not an array.");
            }
            if (Message.networkAvailable) {
                if (!Message._pendentMessages) {
                    Message._pendentMessages = new latte.Collection();
                }
                // Send all messages
                Message._pendentMessages.each(function (m) {
                    m.send();
                });
                // Clear collection
                Message._pendentMessages.clear();
            }
        };
        /**
         * Raises the failed event
         **/
        Message.prototype.onFailed = function (errorDescription) {
            // Dump error
            latte.log(errorDescription);
            latte.log("On call(s):");
            for (var i = 0; i < this.calls.length; i++) {
                latte.log(this.calls[i].toString());
            }
            latte.log(this.response);
            if (this._failed instanceof latte.LatteEvent) {
                this.failed.raise();
            }
            if (latte._isFunction(Message.globalFailed)) {
                Message.globalFailed.call(this, errorDescription);
            }
        };
        /**
         * Raises the networkFailed event
         **/
        Message.prototype.onNetworkFailed = function () {
            /// Networks appears to be unavailable
            Message._networkAvailable = false;
            // If no retryLeader
            if (Message._retryLeader === null) {
                // I am the retry leader
                Message._retryLeader = this;
            }
            else if (Message._retryLeader !== this) {
                // Add me to pendent messages and good bye.
                Message._pendentMessages.add(this);
                return;
            }
            /// Raise event
            if (this._networkFailed) {
                this._networkFailed.raise();
            }
            //            this.onNetworkFailed();
            /// Ensure loader is there
            latte.LoadInfo.instance.start(strings.reconnecting);
            /// If message was critical
            if (this.critical) {
            }
            /// If first try
            if (Message._retryTime == 0) {
                // Initialize retry time to 5 seconds
                Message._retryTime = 5;
            }
            else {
                // Duplicate last retry time, topped to 5 minutes
                Message._retryTime = Math.min(latte.TimeSpan.fromMinutes(5).totalSeconds, Message._retryTime * 2);
            }
            // Initialize countdown
            Message._retryCountdown = Message._retryTime;
            // Announce countdown
            latte.LoadInfo.instance.loadingText = (latte.sprintf(strings.reconnectingInS, latte.TimeSpan.fromSeconds(Message._retryCountdown).toString()));
            if (Message._retryTimer)
                Message._retryTimer.pause();
            /// Set timer to countdown
            Message._retryTimer = new latte.Timer(function () {
                Message._retryCountdown--;
                // Retry now?
                if (Message._retryCountdown == 0) {
                    latte.LoadInfo.instance.loadingText = strings.reconnecting;
                    Message._networkAvailable = true;
                    this.send();
                }
                else if (Message._retryCountdown < 0) {
                    Message._retryTimer.pause();
                    latte.LoadInfo.instance.end();
                }
                else {
                    /// Retry time text
                    latte.LoadInfo.instance.loadingText = (latte.sprintf(strings.reconnectingInS, latte.TimeSpan.fromSeconds(Message._retryCountdown).toString()));
                }
            }, 1000, this);
            Message._retryTimer.start();
        };
        /**
         * Raises the responseArrived event
         **/
        Message.prototype.onResponseArrived = function () {
            if (this._responseArrived) {
                this.responseArrived.raise();
            }
        };
        /**
         * Raises the <c>sent</c> event
         **/
        Message.prototype.onSent = function () {
            if (this._sent) {
                this.sent.raise();
            }
            Message.log.push(this);
            if (Message.log.length > 50) {
                Message.log.shift();
            }
        };
        /**
         * Sends the message. Optionally adds event handlers for <c>succeeded</c> and <c>failed</c> events
         **/
        Message.prototype.send = function (success, failure) {
            var _this = this;
            if (success === void 0) { success = null; }
            if (failure === void 0) { failure = null; }
            if (!Message.networkAvailable) {
                // Add to pendent messages
                Message._pendentMessages.add(this);
                return this;
            }
            if (success || failure) {
                if (this.calls.length !== 1) {
                    throw new latte.Ex("Can't assign handlers when more than one call in message");
                }
                else {
                    if (success) {
                        this.calls[0].success.add(success);
                    }
                    if (failure) {
                        this.calls[0].failure.add(failure);
                    }
                }
            }
            this._working = true;
            // Gather calls
            var calls = [];
            for (var i = 0; i < this.calls.length; i++) {
                calls.push(this.calls[i].marshall());
            }
            //log(sprintf("Call: %s, %s", DateTime.now.toString(), JSON.stringify(calls)));
            latte.Ajax.post(Message.pathToRequest, {
                action: 'ajax-rpc',
                calls: JSON.stringify(calls)
            }, function (data) {
                /*
                 * FOR SOME ULTRA WEIRD REASON
                 * DATA IS ARRIVING WITH AN "undefined" prefix
                 * */
                if (data.indexOf('undefined') === 0) {
                    data = data.substr(9);
                }
                _this.dataArrived(data);
            }, function (error) {
                _this._working = false;
                latte.log("Message.send() [Error]: " + error);
                _this.onNetworkFailed();
            });
            //$.ajax({
            //
            //    /// Use URL for DataLatte requests
            //    url: Message.pathToRequest,
            //
            //    /// Use the message as context
            //    context: this,
            //
            //    /// Mix data with headers
            //    data: {
            //        action:     'ajax-rpc',
            //        calls:  JSON.stringify(calls)
            //    },
            //
            //    /// Interpret as text to make it JSON by ourselves
            //    dataType: 'text',
            //
            //    /// Send request as POST
            //    type: 'POST',
            //
            //    /// Handle success
            //    success: function(data){
            //        this.dataArrived(data);
            //    },
            //
            //    /// Handle ajax error
            //    error: function(jqXHR, textStatus, errorThrown){
            //        this._working = false;
            //
            //        this.errorDescription = "Network error: " + textStatus;
            //        this.errorCode = 1;
            //
            //        this.onNetworkFailed();
            //    }
            //});
            this.onSent();
            return this;
        };
        /**
         * Gets a value indcating if the message is in progress
         **/
        Message.prototype.working = function () {
            return this._working;
        };
        Object.defineProperty(Message.prototype, "calls", {
            //endregion
            //region Properties
            /**
             * Gets the calls this message will make
             *
             * @returns {Array<RemoteCall>}
             */
            get: function () {
                return this._calls;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "failed", {
            /**
             * Gets an event raised when the message fails by network issues or server issues
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._failed) {
                    this._failed = new latte.LatteEvent(this);
                }
                return this._failed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "networkFailed", {
            /**
             * Gets an event raised when the network fails
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._networkFailed) {
                    this._networkFailed = new latte.LatteEvent(this);
                }
                return this._networkFailed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "responseArrived", {
            /**
             * Gets an event raised when the response arrives
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._responseArrived) {
                    this._responseArrived = new latte.LatteEvent(this);
                }
                return this._responseArrived;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "sent", {
            /**
             * Gets an event raised when the message is sent
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._sent) {
                    this._sent = new latte.LatteEvent(this);
                }
                return this._sent;
            },
            enumerable: true,
            configurable: true
        });
        //region Static
        Message.log = [];
        /**
         * Flag to indicate if network is
         **/
        Message._networkAvailable = true;
        /**
         * Pointer to messages
         **/
        Message._pendentMessages = null;
        /**
         * Path where requests are made
         */
        Message.pathToRequest = "/latte/request.php";
        return Message;
    })();
    latte.Message = Message;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a call to a remote procedure
     */
    var RemoteCall = (function () {
        //endregion
        /**
         * Creates the procedure with optional parameters
         * @param module
         * @param className
         * @param method
         * @param params
         * @param id
         * @param returns
         */
        function RemoteCall(moduleName, className, method, params, id, returns) {
            if (moduleName === void 0) { moduleName = null; }
            if (className === void 0) { className = null; }
            if (method === void 0) { method = null; }
            if (params === void 0) { params = null; }
            if (id === void 0) { id = 0; }
            if (returns === void 0) { returns = null; }
            //region Fields
            this._className = null;
            this._method = null;
            this._id = 0;
            this._params = null;
            this._returns = null;
            this._success = null;
            this._failure = null;
            /**
             * Property field
             */
            this._something = null;
            /**
             * Property field
             */
            this._moduleName = null;
            if (moduleName)
                this.moduleName = moduleName;
            if (className)
                this.className = className;
            if (method)
                this.method = method;
            if (params)
                this.params = params;
            if (id)
                this.id = id;
            if (returns)
                this.returns = returns;
        }
        //region Methods
        /**
         * Gets the marshalled call
         */
        RemoteCall.prototype.marshall = function () {
            return {
                moduleName: this.moduleName,
                className: this.className,
                method: this.method,
                id: this.id,
                params: this.params
            };
        };
        /**
         * Raises the <c>failure</c> event
         */
        RemoteCall.prototype.onFailure = function () {
            if (this._failure instanceof latte.LatteEvent) {
                this._failure.raise();
            }
        };
        /**
         * Raises the <c>success</c> event
         * @param data
         */
        RemoteCall.prototype.onSuccess = function (data) {
            if (this._success instanceof latte.LatteEvent) {
                this._success.raise(data);
            }
        };
        /**
         * Reports a response from server to the call
         *
         * @param responseData
         */
        RemoteCall.prototype.respond = function (responseData) {
            var response = new latte.RemoteResponse(this, responseData);
            this.response = response;
        };
        /**
         * Creates a Message object and sends the call, additionally handlers for success and failure may be added.
         */
        RemoteCall.prototype.send = function (success, failure) {
            if (success === void 0) { success = null; }
            if (failure === void 0) { failure = null; }
            this.withHandlers(success, failure);
            // Create message
            var m = new latte.Message();
            // Add this call to message
            m.calls.push(this);
            // Send the message
            m.send();
            return m;
        };
        /**
         * Creates a Message object and sends the call, showing a loader with the specified text
         * @param loaderText
         * @param success
         * @param failure
         */
        RemoteCall.prototype.sendWithLoader = function (loaderText, success, failure) {
            if (success === void 0) { success = null; }
            if (failure === void 0) { failure = null; }
            var m = this.send(success, failure);
            latte.LoadInfo.instance.start(loaderText);
            m.responseArrived.add(function () {
                latte.LoadInfo.instance.end();
            });
            return m;
        };
        /**
         * Gets a string representation of the call
         * @returns {*|string}
         */
        RemoteCall.prototype.toString = function () {
            var idpart = this.id > 0 ? latte.sprintf("<%s>", this.id) : '';
            var paramspart = [];
            for (var i in this.params) {
                var a = this.params[i];
                paramspart.push(i + ' = ' + (latte._isArray(a) || latte._isObject(a) ? JSON.stringify(a) : String(a)));
            }
            return latte.sprintf("%s%s.%s(%s)", this.className, idpart, this.method, paramspart.join(', '));
        };
        /**
         * Adds handlers for success and/or failure and returns the call object
         * @param success
         * @param failure
         * @returns {latte.RemoteCall}
         */
        RemoteCall.prototype.withHandlers = function (success, failure) {
            if (success === void 0) { success = null; }
            if (failure === void 0) { failure = null; }
            // Add success handler
            if (success) {
                this.success.add(success);
            }
            // Add failed handler
            if (failure) {
                this.failure.add(failure);
            }
            return this;
        };
        Object.defineProperty(RemoteCall.prototype, "className", {
            //endregion
            //region Properties
            /**
             * Gets or sets the name of the class where the procedure is located
             * @returns {string}
             */
            get: function () {
                return this._className;
            },
            /**
             * Gets or sets the name of the class where the procedure is located
             * @param value
             */
            set: function (value) {
                this._className = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "method", {
            /**
             * Gets or sets the name of the remote procedure to be called
             * @returns {string}
             */
            get: function () {
                return this._method;
            },
            /**
             * Gets or sets the name of the remote procedure to be called
             * @param value
             */
            set: function (value) {
                this._method = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "failure", {
            /**
             * Gets an event raised when the call fails
             * @returns {LatteEvent}
             */
            get: function () {
                if (!(this._failure instanceof latte.LatteEvent)) {
                    this._failure = new latte.LatteEvent(this);
                }
                return this._failure;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "something", {
            /**
             * Gets or sets something
             *
             * @returns {string}
             */
            get: function () {
                return this._something;
            },
            /**
             * Gets or sets something
             *
             * @param {string} value
             */
            set: function (value) {
                this._something = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "moduleName", {
            /**
             * Gets or sets the module name
             *
             * @returns {string}
             */
            get: function () {
                return this._moduleName;
            },
            /**
             * Gets or sets the module name
             *
             * @param {string} value
             */
            set: function (value) {
                this._moduleName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "id", {
            /**
             * Gets or sets the id of the object instance where procedure should be called
             * @returns {number}
             */
            get: function () {
                return this._id;
            },
            /**
             * Gets or sets the id of the object instance where procedure should be called
             * @param value
             */
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "params", {
            /**
             * Gets or sets an object representing the parameters to use when calling the remote procedure
             * @returns {*}
             */
            get: function () {
                return this._params;
            },
            /**
             * Gets or sets an object representing the parameters to use when calling the remote procedure
             * @param value
             */
            set: function (value) {
                this._params = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "response", {
            /**
             * Gets or sets the response of the message
             *
             * @returns {RemoteResponse}
             */
            get: function () {
                return this._response;
            },
            /**
             * Gets or sets the response of the message
             *
             * @param value
             */
            set: function (value) {
                this._response = value;
                if (value.logs.length > 0) {
                    latte.log(latte.sprintf("Log: " + this.toString()));
                    for (var i = 0; i < value.logs.length; i++) {
                        latte.log('    ' + value.logs[i]);
                    }
                }
                if (value.warnings.length > 0) {
                    latte.log("Warnings: " + latte.sprintf(this.toString()));
                    for (var i = 0; i < value.warnings.length; i++) {
                        if (console && console.warn) {
                            console.warn('    ' + value.warnings[i]);
                        }
                        else {
                            latte.log('    ' + value.warnings[i]);
                        }
                    }
                }
                if (value.success) {
                    this.onSuccess(value.data);
                }
                else {
                    this.onFailure();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "returns", {
            /**
             * Gets or sets the type of data returned by the remote procedure
             * @param value
             */
            get: function () {
                return this._returns;
            },
            /**
             * Gets or sets the type of data returned by the remote procedure
             * @param value
             */
            set: function (value) {
                this._returns = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "success", {
            /**
             * Gets an event raised when message arrives successfully
             */
            get: function () {
                if (!(this._success instanceof latte.LatteEvent)) {
                    this._success = new latte.LatteEvent(this);
                }
                return this._success;
            },
            enumerable: true,
            configurable: true
        });
        return RemoteCall;
    })();
    latte.RemoteCall = RemoteCall;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     */
    var RemoteResponse = (function () {
        //endregion
        /**
         * Creates the response
         * @param call
         * @param responseText
         */
        function RemoteResponse(call, response) {
            //region Fields
            this._call = null;
            this._errorCode = -1;
            this._errorDescription = null;
            this._success = false;
            /**
             * Property field
             */
            this._logs = [];
            /**
             * Property field
             */
            this._warnings = [];
            this._call = call;
            this._response = response;
            this.unmarshall();
        }
        //region Private Methods
        /**
         * Unpacks the response text to indicate attributes
         */
        RemoteResponse.prototype.unmarshall = function () {
            for (var i in this.response) {
                this['_' + i] = this.response[i];
            }
            if (this.success === true) {
                this._data = latte.DataRecord.scanAndConvert(this.data);
            }
            else {
                latte.log("Error on call: " + this.call.toString());
                latte.log(latte.sprintf("(%s) - %s", this.errorCode, this.errorDescription));
                this.call.onFailure();
            }
        };
        Object.defineProperty(RemoteResponse.prototype, "call", {
            //endregion
            //region Properties
            /**
             * Gets the call who originated this response
             * @returns {RemoteCall}
             */
            get: function () {
                return this._call;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "errorCode", {
            /**
             * Gets the error code returned (if any)
             * @returns {number}
             */
            get: function () {
                return this._errorCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "errorDescription", {
            /**
             * Gets the error description returned (if any)
             * @returns {string}
             */
            get: function () {
                return this._errorDescription;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "logs", {
            /**
             * Gets or sets the logs array in response
             *
             * @returns {Array<string>}
             */
            get: function () {
                return this._logs;
            },
            /**
             * Gets or sets the logs array in response
             *
             * @param {Array<string>} value
             */
            set: function (value) {
                this._logs = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "response", {
            /**
             * Gets the literal response from server
             * @returns {string}
             */
            get: function () {
                return this._response;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "data", {
            /**
             * Gets
             * @returns {T}
             */
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "success", {
            /**
             * Gets a value indicating if the call was a success
             * @returns {boolean}
             */
            get: function () {
                return this._success;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "warnings", {
            /**
             * Gets or sets
             *
             * @returns {Array<string>}
             */
            get: function () {
                return this._warnings;
            },
            /**
             * Gets or sets
             *
             * @param {Array<string>} value
             */
            set: function (value) {
                this._warnings = value;
            },
            enumerable: true,
            configurable: true
        });
        return RemoteResponse;
    })();
    latte.RemoteResponse = RemoteResponse;
})(latte || (latte = {}));
