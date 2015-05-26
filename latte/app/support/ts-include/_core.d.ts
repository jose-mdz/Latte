/// <reference path="_core.strings.d.ts" />
/// <reference path="_ui.d.ts" />
/// <reference path="_ui.strings.d.ts" />
/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
declare module latte {
    /**
     * Represents a column of data for <c>DataSet</c>
     **/
    class DataSetColumn {
        /**
         *
         **/
        private _length;
        /**
         *
         **/
        private _name;
        /**
         *
         **/
        private _options;
        /**
         *
         **/
        private _tag;
        /**
         *
         **/
        private _type;
        /**
         * Raised when <c>options</c> value is changed.
         **/
        optionsChanged: LatteEvent;
        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
        constructor(name?: string, type?: string, length?: number);
        /**
         * Gets or sets the length of the column values.
         **/
        /**
         * Gets or sets the length of the column values.
         **/
        length: number;
        /**
         * Gets or sets the name of the column.
         **/
        /**
         * Gets or sets the name of the column.
         **/
        name: string;
        /**
         * Raises the <c>optionsChanged</c> event.
         **/
        onOptionsChanged(): void;
        /**
         * Gets or sets the options of the column.
         **/
        /**
         * Gets or sets the options of the column.
         **/
        options: any;
        /**
         * Gets or sets a generic tag value for the object
         **/
        /**
         * Gets or sets a generic tag value for the object
         **/
        tag: any;
        /**
         * Gets or sets the type of the column values.
         **/
        /**
         * Gets or sets the type of the column values.
         **/
        type: string;
    }
}
declare module latte {
    /**
     * Represents a row of data for <c>DataSet</c>
     **/
    class DataSetRow {
        data: any[];
        /**
         *
         **/
        private _dataSet;
        /**
         *
         **/
        private _readOnly;
        /**
         *
         **/
        private _tag;
        /**
         * Creates the row of data. Optionally sets the array of data
         **/
        constructor(data?: any[]);
        /**
         * Gets the data as an array of specified positions. Undefined positions will be set to null
         **/
        getDataArray(columns: number): any[];
        /**
         * Gets a value indicating if there is a value at the specified index
         **/
        hasValueAt(index: number): boolean;
        /**
         * Gets or sets a value indicating if the row is read-only
         **/
        /**
         * Gets or sets a value indicating if the row is read-only
         **/
        readOnly: boolean;
        /**
         * Gets or sets the value at the specified position
         **/
        /**
         * Gets or sets the value at the specified position
         **/
        tag: any;
        /**
         * Gets or sets the value at the specified position
         **/
        getValueAt(index: number): any;
        /**
         * Gets or sets the value at the specified position
         **/
        setValueAt(index: number, value: any): void;
    }
}
declare module latte {
    /**
     * Renders a grid that allows data manipulation
     **/
    class GridView extends View {
        /**
         *
         **/
        private _actionCommit;
        /**
         *
         **/
        private _actionCopyCellValue;
        /**
         *
         **/
        private _actionPasteCellValue;
        /**
         * Convert to PUBLIC
         **/
        _actionRemoveRow: Action;
        /**
         *
         **/
        private _actionRollback;
        /**
         *
         **/
        private _actionSetCellNull;
        /**
         *
         **/
        private _allowChangeRows;
        /**
         *
         **/
        private _allowDeleteRows;
        /**
         *
         **/
        private _allowNewRows;
        /**
         *
         **/
        private _editingTd;
        /**
         *
         **/
        private _readOnly;
        /**
         *
         **/
        private _tdAll;
        /**
         *
         **/
        private _trColumns;
        /**
         * Columns of the grid view
         **/
        columns: Collection<GridViewColumn>;
        /**
         * Rows of data of the grid
         **/
        rows: Collection<GridViewRow>;
        /**
         * Holds the Table element where the grid lives
         **/
        table: JQuery;
        /**
         * Raised after <c>rowsAdded</c>, <c>rowsChanged</c>, <c>rowsRemoved</c> are raised originated by calling <c>commit()</c>
         **/
        committed: LatteEvent;
        /**
         * Raised when the value of a cell changed
         The object passed has the attribubtes:
         <example>
         {
           column:   number,
           row:      number,
           value:    string,
           oldValue: string
         }
         </exapmle>
         **/
        valueChanged: LatteEvent;
        /**
         * Raised when new rows are added to the grid and confirmed by the user.
         The object passed to the event is a <c>DataSet</c> with the new rows
         **/
        rowsAdded: LatteEvent;
        /**
         * Raised when changed rows where changed, and confirmed by the user.
         The object passed to the event is a <c>DataSet</c> with the changed rows
         **/
        rowsChanged: LatteEvent;
        /**
         * Raised when rows are removed from the grid and confirmed by the user.
         The object passed to the event is a <c>DataSet</c> with the deleted rows
         **/
        rowsRemoved: LatteEvent;
        /**
         * Creates the GridView
         **/
        constructor();
        /**
         *
         **/
        private _addInsertRow();
        /**
         *
         **/
        private _createCell(columnIndex, rowIndex);
        /**
         *
         **/
        private _createRow();
        /**
         *
         **/
        private _makeInsertRowCandidate();
        /**
         *
         **/
        private _onAddColumn(column);
        /**
         *
         **/
        private _onAddRow(row);
        /**
         *
         **/
        private _onRemoveColumn(column);
        /**
         *
         **/
        private _onRemoveRow(row, index);
        /**
         *
         **/
        private _removeInsertRow();
        /**
         *
         **/
        private _selectColumnHeader(index?);
        /**
         *
         **/
        private _selectRowHeader(index);
        /**
         *
         **/
        private _transactionEnd();
        /**
         *
         **/
        private _transactionStart();
        /**
         *
         **/
        private _updateRowIndexes();
        /**
         * Gets a value indicating if the cell at the specified position can be edited.
         **/
        canEditCellAt(columnIndex: number, rowIndex: number): boolean;
        /**
         * Clears selection of cells.
         **/
        clearSelection(): void;
        /**
         * Commits the current transaction of rows added, changed and deleted.
         Events <c>rowsAdded</c>, <c>rowsChanged</c>, <c>rowsRemoved</c> are raised accordingly.
         **/
        commit(): void;
        /**
         * Commits the current transaction of rows added.
         LatteEvent <c>rowsAdded</c> is raised.
         **/
        commitAddedRows(): void;
        /**
         * Commits the current transaction of rows changed.
         LatteEvent <c>rowsChanged</c> is raised.
         **/
        commitChangedRows(): void;
        /**
         * Commits the current transaction of rows deleted.
         LatteEvent <c>rowsDeleted</c> is raised.
         **/
        commitDeletedRows(): void;
        /**
         * Confirms the commit of added rows
         **/
        confirmRowsAdded(): void;
        /**
         * Confirms the commit of changed rows
         **/
        confirmRowsChanged(): void;
        /**
         * Confirms the commit of delete rows
         **/
        confirmRowsRemoved(): void;
        /**
         * Enables the user a mechanism for copying the value of the cell to clipboard
         **/
        copySelectedCellValue(): void;
        /**
         * Marks the row at the specified position for deletion
         **/
        deleteRowAt(rowIndex: number): void;
        /**
         * Starts the edition mode of the cell at the specified row and column.
         **/
        editCellAt(columnIndex: number, rowIndex: number): void;
        /**
         * Starts the edition mode of the next cell on the grid, if already in edition mode.
         **/
        editNextCell(): void;
        /**
         * Starts the edition mode of the previous cell on the grid, if already in edition mode.
         **/
        editPreviousCell(): void;
        /**
         * Ends the edition mode of the current editing cell. Optionally cancells edition by returning value to its original state.
         **/
        endCellEdit(cancelled?: boolean): void;
        /**
         * Gets the actual element of the cell at specified column and row.
         **/
        getCellElementAt(columnIndex: number, rowIndex: number): JQuery;
        /**
         *
         **/
        getData(): DataSet;
        /**
         * Gets the actual element of the row at specified column and row.
         **/
        getRowElementAt(rowIndex: number): JQuery;
        /**
         * Gets the data value at the specified position.
         **/
        getValueAt(columnIndex: number, rowIndex: number): any;
        /**
         * Gets a value indicating if the there is a cell for the specified position
         **/
        hasCellAt(columnIndex: number, rowIndex: number): boolean;
        /**
         * Gets a value indicating if there is a value at the specified position.
         **/
        hasValueAt(columnIndex: number, rowIndex: number): boolean;
        /**
         * Raises the <c>committed</c> event
         **/
        onCommitted(): void;
        /**
         * Raises the <c>contextItemsShow</c> event.
         **/
        onContextItemsShow(): void;
        /**
         * Raises the <c>rowsAdded</c> event.
         **/
        onRowsAdded(dataset: DataSet): void;
        /**
         * Raises the <c>rowsChanged</c> event.
         **/
        onRowsChanged(dataset: DataSet, oldDataset?: DataSet): void;
        /**
         * Raises the <c>rowsDeleted</c> event.
         **/
        onRowsRemoved(dataset: DataSet): void;
        /**
         * Raises the <c>valueChanged</c> event.
         **/
        onValueChanged(columnIndex: number, rowIndex: number, value: any, oldValue: any): void;
        /**
         * Gets or sets the original value of the specified position.
         If no changes have occoured, it will return <c>undefined</c>
         **/
        originalValue(columnIndex: number, rowIndex: number, value?: any): any;
        /**
         * Restores the original value at the specified position if possible.
         **/
        restoreValueAt(columnIndex: number, rowIndex: number): void;
        /**
         * Cancels the current transaction of rows added, changed and deleted.
         **/
        rollback(): void;
        /**
         * Selects the cell at the specified position.
         **/
        selectCellAt(columnIndex: number, rowIndex: number): void;
        /**
         *
         **/
        setData(value: DataSet): void;
        /**
         * Sets the data value at the specified position.
         Optionally specifies if the <c>valueChanged</c> should be raised
         **/
        setValueAt(columnIndex: number, rowIndex: number, value: any, raiseEvent?: boolean): void;
        /**
         * Gets or sets a value indicating if the user is allowed to change values on rows
         **/
        /**
         * Gets or sets a value indicating if the user is allowed to change values on rows
         **/
        allowChangeRows: boolean;
        /**
         * Gets or sets a value indicating if the user is allowed to delete rows
         **/
        /**
         * Gets or sets a value indicating if the user is allowed to delete rows
         **/
        allowDeleteRows: boolean;
        /**
         * Gets or sets a value indicating if the user is allowed to create new rows
         **/
        /**
         * Gets or sets a value indicating if the user is allowed to create new rows
         **/
        allowNewRows: boolean;
        /**
         * Gets or sets the data on grid as a DataSet
         **/
        /**
         * Gets or sets the data on grid as a DataSet
         **/
        data: DataSet;
        /**
         * Gets a value indicating if some cell of the grid is currently on edit mode
         **/
        editing: boolean;
        /**
         * Gets or sets a value indicating if the whole grid should be read-only.
         **/
        /**
         * Gets or sets a value indicating if the whole grid should be read-only.
         **/
        readOnly: boolean;
        /**
         * Gets or sets the selected cell of grid
         **/
        /**
         * Gets or sets the selected cell of grid
         **/
        selectedCell: JQuery;
    }
}
declare module latte {
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
    class Cache {
        /**
         * Loads a cache of the specified name into cache itself.
         * @param recordType
         * @param name
         * @param callback
         * @returns {null}
         */
        load(recordType: string, name: string, callback?: () => any): Message;
    }
}
declare module latte {
    interface DataRecordArrayCallback {
        (records: DataRecord[]): void;
    }
    interface DataRecordCallback {
        (record: DataRecord): void;
    }
    interface VoidCallback {
        (): any;
    }
    /**
     * Represents a DataRecord on App
     **/
    class DataRecord {
        /**
         * Pointer to the default namespace where records are stored, used by <c>fromServerObject</c> method for selecting records.
         **/
        static _defaultRecordsNamespace: Object;
        /**
         * Name of object where records are stored
         */
        static recordsNamespaceName: string;
        /**
         * Scans the passed Object and converts available packed records to latte.DataRecord
         instances
         **/
        static scanAndConvert(obj: any): any;
        /**
         * Sets the default records namespace, and injects common code into records.
         **/
        static setDefaultRecordsNamespace(namespace: Object): void;
        /**
         * Creates a record from the specified name and id. If no id is specified, empty record will arrive.
         **/
        static fromName(name: string, id: number, callback: DataRecordCallback): Message;
        /**
         * Converts a server given Object to a Record of the specified type, if no type specified <c>DataRecord</c> will be used.
         **/
        static fromServerObject(obj: any, classType?: Function): DataRecord;
        /**
         * Converts a server given array of Object to a Records array
         **/
        static fromServerObjects(array: Object[], classType?: Function): DataRecord[];
        /**
         * Returns a value indicating if the passed Object
         is a packed Object
         **/
        static isPackedRecord(object: any): boolean;
        /**
         *
         **/
        private _recordId;
        /**
         *
         **/
        _recordType: string;
        /**
         *
         **/
        private _tag;
        /**
         * Arbitrary collection of tags
         */
        tags: any;
        /**
         * Metadata of record. Comes from server.
         **/
        metadata: any;
        /**
         * Raised before a form for this record is created.
         **/
        _formCreating: LatteEvent;
        /**
         * Raised when a form for this record has been created and filled with record fields.
         **/
        _formCreated: LatteEvent;
        /**
         * Raised before a view for this record is created.
         **/
        _viewCreating: LatteEvent;
        /**
         * Raised when a view for this record has been created and filled with record fields.
         **/
        _viewCreated: LatteEvent;
        /**
         * Creates the record
         **/
        constructor();
        /**
         * Creates a view for displaying the record
         **/
        createView(): View;
        /**
         * Gets the fields of the record, with values
         **/
        getFields(): Object;
        /**
         * Can be overriden to return dynamically generated metadata
         **/
        getMetadata(): any;
        /**
         * Sends an insert message to the server
         **/
        insert(callback: VoidCallback): Message;
        /**
         * Gets the remote call for insertion
         *
         * @returns {latte.RemoteCall}
         */
        insertCall(): RemoteCall<string>;
        /**
         * Returns a value indicating if the record is inserted, based on the existence of id
         **/
        inserted(): boolean;
        /**
         * Raises the <c>formCreated</c> event
         **/
        onFormCreated(form: DataRecordFormItem): void;
        /**
         * Raises the <c>formCreating</c> event
         **/
        onFormCreating(form: DataRecordFormItem): void;
        /**
         * Gets the name of the id field
         * @returns {undefined}
         */
        onGetRecordIdName(): string;
        /**
         * Raises the <c>viewCreated</c> event
         **/
        onViewCreated(view: View): void;
        /**
         * Raises the <c>viewCreating</c> event
         **/
        onViewCreating(view: View): void;
        /**
         * Sends a DELETE request to the server
         **/
        remove(callback: () => any): Message;
        /**
         * Gets the call for removing this record
         * @returns {latte.RemoteCall}
         */
        removeCall(): RemoteCall<boolean>;
        /**
         * Inserts or updates the record
         **/
        save(callback: VoidCallback): Message;
        /**
         * Gets the insert or update call for record
         */
        saveCall(): RemoteCall<any>;
        /**
         * Sends an update message to the record
         **/
        update(callback: VoidCallback): Message;
        /**
         * Gets the call for updating the record
         *
         * @returns {latte.RemoteCall<string>}
         */
        updateCall(): RemoteCall<string>;
        /**
         * Property field
         */
        _moduleName: string;
        /**
         * Gets or sets the name of the module where record is contained
         *
         * @returns {string}
         */
        /**
         * Gets or sets the name of the module where record is contained
         *
         * @param {string} value
         */
        moduleName: string;
        /**
         * Gets an event raised when a form about the record is solicited
         * @returns {LatteEvent}
         */
        formCreating: LatteEvent;
        /**
         * Gets an event raised when a form about the record has been created
         * @returns {LatteEvent}
         */
        formCreated: LatteEvent;
        /**
         * Gets or sets the record id
         **/
        /**
         * Gets or sets the record id
         **/
        recordId: number;
        /**
         * Gets or sets the record type
         **/
        /**
         * Gets or sets the record type
         **/
        recordType: string;
        /**
         * Gets or sets an arbitrary value for the record
         **/
        /**
         * Gets or sets an arbitrary value for the record
         **/
        tag: string;
        /**
         * Gets an event raised when a View about the record has been created
         * @returns {LatteEvent}
         */
        viewCreated: LatteEvent;
        /**
         * Gets an event raised when a View about the record is being requested
         * @returns {LatteEvent}
         */
        viewCreating: LatteEvent;
    }
}
declare module latte {
    /**
     * Represents a collection of records
     */
    class DataRecordCollection extends Collection<DataRecord> {
        /**
         * Creates the collection of the specified type.
         * Optionally specifies handlers for adding and removing items, and a
         * context to call as closure of events.
         *
         * @param addCallback
         * @param removeCallback
         * @param context
         */
        constructor(addCallback?: (DataRecord: any, number: any) => any, removeCallback?: (DataRecord: any, number: any) => any, context?: any);
        /**
         * Finds the record of the specified <c>id</c>
         *
         * @param id
         * @returns {null}
         */
        byId(id: number): DataRecord;
    }
}
declare module latte {
    /**
     * Represents a set of structured data
     **/
    class DataSet {
        /**
         * Columns of the dataset
         **/
        columns: Collection<DataSetColumn>;
        /**
         * Rows of data
         **/
        rows: Collection<DataSetRow>;
        /**
         * Creates the dataset
         **/
        constructor();
        /**
         * Creates a <c>DataSet</c> from the dataset specified as a JSON object
         **/
        static fromServerObject(dataset: any): DataSet;
        /**
         * Converts the type sent by server to a type compatible with <c>InputItem</c>
         **/
        static fromServerType(type: string): string;
        /**
         * Gets the index of the column by passing the name of the column
         **/
        getColumnIndex(columnName: string): number;
        /**
         * Gets the data as an array of arrays
         **/
        getDataArray(): any[];
        /**
         * Gets the value of the specified column at the specified row index
         **/
        getValue(columnName: string, rowIndex: number): any;
        /**
         * Gets the value at the specified position
         **/
        getValueAt(columnIndex: number, rowIndex: number): any;
        /**
         * Sets the value at the specified position
         **/
        setValue(columnName: string, rowIndex: number, value: any): DataSet;
        /**
         * Sets the value at the specified position
         **/
        setValueAt(columnIndex: number, rowIndex: number, value: any): DataSet;
    }
}
declare module latte {
    interface MessageSucceededCallback {
        (data: any): void;
        (): void;
    }
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
    class Message {
        static log: Message[];
        /**
         * Flag to indicate if network is
         **/
        private static _networkAvailable;
        /**
         * Pointer to messages
         **/
        private static _pendentMessages;
        /**
         * Holds the current amount of seconds to execute next retry
         **/
        private static _retryCountdown;
        /**
         * Pointer to message who is leading the retry mechanism
         **/
        private static _retryLeader;
        /**
         * Holds the loader
         **/
        private static _retryLoader;
        /**
         * Holds the time of last retry
         **/
        private static _retryTime;
        /**
         * Pointer to timer who executes retry
         **/
        private static _retryTimer;
        /**
         * Path where requests are made
         */
        static pathToRequest: string;
        /**
         * Directly sends an array of calls
         * @param calls
         * @returns {latte.Message}
         */
        static sendCalls(calls: RemoteCall<any>[]): Message;
        /**
         * Checks if newtowrk is currently available, according to last message sent.
         **/
        static networkAvailable: boolean;
        /**
         * Assign a function to this property to be executed on global fail. Its executed on the context of the failed message
         **/
        static globalFailed: Function;
        /**
         *
         **/
        private _loader;
        /**
         *
         **/
        private _loaderText;
        /**
         *
         **/
        private _working;
        /**
         *
         */
        private _calls;
        /**
         *
         */
        critical: boolean;
        /**
         * Complete response of message
         **/
        response: string;
        /**
         * Executed when message response arrives, before parsing it
         **/
        _responseArrived: LatteEvent;
        /**
         * Executed when message is sent
         **/
        _sent: LatteEvent;
        /**
         * Executed when message arrives with error
         **/
        _failed: LatteEvent;
        /**
         * Executed when the network has failed
         **/
        _networkFailed: LatteEvent;
        /**
         * Creates the message with the specified call
         **/
        constructor(moduleName?: string, className?: string, method?: string, arguments?: any, id?: number);
        /**
         * Adds calls to the calls array
         * @param calls
         */
        addCalls(calls: RemoteCall<any>[]): void;
        /**
         * Reacts to data arrived
         **/
        dataArrived(data: string): void;
        /**
         * Raises the failed event
         **/
        onFailed(errorDescription: string): void;
        /**
         * Raises the networkFailed event
         **/
        onNetworkFailed(): void;
        /**
         * Raises the responseArrived event
         **/
        onResponseArrived(): void;
        /**
         * Raises the <c>sent</c> event
         **/
        onSent(): void;
        /**
         * Sends the message. Optionally adds event handlers for <c>succeeded</c> and <c>failed</c> events
         **/
        send(success?: (data: any) => any, failure?: () => any): Message;
        /**
         * Shows the loader if any <c>loaderText</c> assigned
         **/
        showLoader(): void;
        /**
         * Gets a value indcating if the message is in progress
         **/
        working(): boolean;
        /**
         * Gets the calls this message will make
         *
         * @returns {Array<RemoteCall>}
         */
        calls: RemoteCall<any>[];
        /**
         * Gets an event raised when the message fails by network issues or server issues
         * @returns {LatteEvent}
         */
        failed: LatteEvent;
        /**
         * Gets or sets the text of a loader that will be shown while message arrives.
         **/
        /**
         * Gets or sets the text of a loader that will be shown while message arrives.
         **/
        loaderText: string;
        /**
         * Gets an event raised when the network fails
         * @returns {LatteEvent}
         */
        networkFailed: LatteEvent;
        /**
         * Gets an event raised when the response arrives
         * @returns {LatteEvent}
         */
        responseArrived: LatteEvent;
        /**
         * Gets an event raised when the message is sent
         * @returns {LatteEvent}
         */
        sent: LatteEvent;
    }
}
declare module latte {
    /**
     * Object who contains marshalled call data
     */
    interface IRemoteCall {
        className: string;
        method: string;
        id: number;
        params: any;
    }
    /**
     * Represents a call to a remote procedure
     */
    class RemoteCall<T> {
        private _className;
        private _method;
        private _id;
        private _params;
        private _returns;
        private _success;
        private _failure;
        private _response;
        /**
         * Creates the procedure with optional parameters
         * @param module
         * @param className
         * @param method
         * @param params
         * @param id
         * @param returns
         */
        constructor(moduleName?: string, className?: string, method?: string, params?: any, id?: number, returns?: T);
        /**
         * Gets the marshalled call
         */
        marshall(): IRemoteCall;
        /**
         * Raises the <c>failure</c> event
         */
        onFailure(): void;
        /**
         * Raises the <c>success</c> event
         * @param data
         */
        onSuccess(data: T): void;
        /**
         * Reports a response from server to the call
         *
         * @param responseData
         */
        respond(responseData: IRemoteResponse): void;
        /**
         * Creates a Message object and sends the call, additionally handlers for success and failure may be added.
         */
        send(success?: (data: T) => void, failure?: () => void): Message;
        /**
         * Creates a Message object and sends the call, showing a loader with the specified text
         * @param loaderText
         * @param success
         * @param failure
         */
        sendWithLoader(loaderText: string, success?: (data: T) => void, failure?: () => void): Message;
        /**
         * Gets a string representation of the call
         * @returns {*|string}
         */
        toString(): string;
        /**
         * Adds handlers for success and/or failure and returns the call object
         * @param success
         * @param failure
         * @returns {latte.RemoteCall}
         */
        withHandlers(success?: (data: T) => void, failure?: () => void): RemoteCall<T>;
        /**
         * Gets or sets the name of the class where the procedure is located
         * @returns {string}
         */
        /**
         * Gets or sets the name of the class where the procedure is located
         * @param value
         */
        className: string;
        /**
         * Gets or sets the name of the remote procedure to be called
         * @returns {string}
         */
        /**
         * Gets or sets the name of the remote procedure to be called
         * @param value
         */
        method: string;
        /**
         * Gets an event raised when the call fails
         * @returns {LatteEvent}
         */
        failure: LatteEvent;
        /**
         * Property field
         */
        private _something;
        /**
         * Gets or sets something
         *
         * @returns {string}
         */
        /**
         * Gets or sets something
         *
         * @param {string} value
         */
        something: string;
        /**
         * Property field
         */
        private _moduleName;
        /**
         * Gets or sets the module name
         *
         * @returns {string}
         */
        /**
         * Gets or sets the module name
         *
         * @param {string} value
         */
        moduleName: string;
        /**
         * Gets or sets the id of the object instance where procedure should be called
         * @returns {number}
         */
        /**
         * Gets or sets the id of the object instance where procedure should be called
         * @param value
         */
        id: number;
        /**
         * Gets or sets an object representing the parameters to use when calling the remote procedure
         * @returns {*}
         */
        /**
         * Gets or sets an object representing the parameters to use when calling the remote procedure
         * @param value
         */
        params: any;
        /**
         * Gets or sets the response of the message
         *
         * @returns {RemoteResponse}
         */
        /**
         * Gets or sets the response of the message
         *
         * @param value
         */
        response: RemoteResponse<T>;
        /**
         * Gets or sets the type of data returned by the remote procedure
         * @param value
         */
        /**
         * Gets or sets the type of data returned by the remote procedure
         * @param value
         */
        returns: T;
        /**
         * Gets an event raised when message arrives successfully
         */
        success: LatteEvent;
    }
}
declare module latte {
    interface IRemoteResponse {
        success: boolean;
        data: any;
        errorCode: number;
        errorDescription: string;
    }
    /**
     *
     */
    class RemoteResponse<T> {
        private _call;
        private _response;
        private _errorCode;
        private _errorDescription;
        private _success;
        private _data;
        /**
         * Creates the response
         * @param call
         * @param responseText
         */
        constructor(call: RemoteCall<T>, response: IRemoteResponse);
        /**
         * Unpacks the response text to indicate attributes
         */
        private unmarshall();
        /**
         * Gets the call who originated this response
         * @returns {RemoteCall}
         */
        call: RemoteCall<T>;
        /**
         * Gets the error code returned (if any)
         * @returns {number}
         */
        errorCode: number;
        /**
         * Gets the error description returned (if any)
         * @returns {string}
         */
        errorDescription: string;
        /**
         * Property field
         */
        private _logs;
        /**
         * Gets or sets the logs array in response
         *
         * @returns {Array<string>}
         */
        /**
         * Gets or sets the logs array in response
         *
         * @param {Array<string>} value
         */
        logs: string[];
        /**
         * Gets the literal response from server
         * @returns {string}
         */
        response: IRemoteResponse;
        /**
         * Gets
         * @returns {T}
         */
        data: T;
        /**
         * Gets a value indicating if the call was a success
         * @returns {boolean}
         */
        success: boolean;
        /**
         * Property field
         */
        private _warnings;
        /**
         * Gets or sets
         *
         * @returns {Array<string>}
         */
        /**
         * Gets or sets
         *
         * @param {Array<string>} value
         */
        warnings: string[];
    }
}
/**
 * Created by josemanuel on 10/25/14.
 */
declare module latte {
    /**
     * Widget for showing children of a DataRecord.
     *
     * Children are added using the <c>children</c> collection, when <c>loadChildren</c> method is called.
     */
    class DataRecordChildrenView extends ToolbarView {
        /**
         * Creates the widget
         */
        constructor(loadChildren?: () => any, childAdd?: () => any, childEdit?: () => any, childRemove?: () => any);
        /**
         * Raises the <c>childAdd</c> event
         */
        onChildrenAdd(): void;
        /**
         * Raises the <c>childEdit</c> event
         */
        onChildEdit(): void;
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(): void;
        /**
         * Back field for event
         */
        private _childAdd;
        /**
         * Gets an event raised when the user asks to add a new children
         *
         * @returns {LatteEvent}
         */
        childAdd: LatteEvent;
        /**
         * Back field for event
         */
        private _childEdit;
        /**
         * Gets an event raised when the user requests to edit the children
         *
         * @returns {LatteEvent}
         */
        childEdit: LatteEvent;
        /**
         * Back field for event
         */
        private _childRemove;
        /**
         * Gets an event raised when the user requests to delete the children
         *
         * @returns {LatteEvent}
         */
        childRemove: LatteEvent;
        /**
         * Raises the <c>childRemove</c> event
         */
        onChildRemove(): void;
        /**
         * Back field for event
         */
        private _loadChildren;
        /**
         * Gets an event raised when the children must be loaded
         *
         * @returns {LatteEvent}
         */
        loadChildren: LatteEvent;
        /**
         * Raises the <c>loadChildren</c> event
         */
        onLoadChildren(): void;
        /**
         * Back field for event
         */
        private _recordChanged;
        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        recordChanged: LatteEvent;
        /**
         * Field for btnAdd property
         */
        private _btnAdd;
        /**
         * Gets the add button
         *
         * @returns {ButtonItem}
         */
        btnAdd: ButtonItem;
        /**
         * Field for btnEdit property
         */
        private _btnEdit;
        /**
         * Gets the edit button
         *
         * @returns {ButtonItem}
         */
        btnEdit: ButtonItem;
        /**
         * Field for btnRefresh property
         */
        private _btnRefresh;
        /**
         * Gets the refresh button
         *
         * @returns {ButtonItem}
         */
        btnRefresh: ButtonItem;
        /**
         * Field for btnRemove property
         */
        private _btnRemove;
        /**
         * Gets the remove button
         *
         * @returns {ButtonItem}
         */
        btnRemove: ButtonItem;
        /**
         * Field for listView property
         */
        private _listView;
        /**
         * Gets the list view of the view
         *
         * @returns {ListView}
         */
        listView: ListView;
        /**
         * Field for pagination property
         */
        private _pagination;
        /**
         * Gets the pagination item
         *
         * @returns {PaginationItem}
         */
        pagination: PaginationItem;
        /**
         * Gets the collection of children of the widget
         *
         * @returns {Collection<SelectableItem>}
         */
        children: Collection<ListViewItem>;
        /**
         * Property field
         */
        private _record;
        /**
         * Gets or sets the record parent of the children
         *
         * @returns {DataRecord}
         */
        /**
         * Gets or sets the record parent of the children
         *
         * @param {DataRecord} value
         */
        record: DataRecord;
        /**
         * Gets the selected child of the widget
         *
         * @returns {SelectableItem}
         */
        selectedChild: SelectableItem;
    }
}
/**
 * Created by josemanuel on 10/25/14.
 */
declare module latte {
    /**
     * Widget for showing children of a DataRecord.
     *
     * Children are added using the <c>children</c> collection, when <c>loadChildren</c> method is called.
     */
    class DataRecordChildrenWidget extends WidgetItem {
        /**
         * Creates the widget
         */
        constructor(loadChildren?: () => any, childAdd?: () => any, childEdit?: () => any, childRemove?: () => any);
        /**
         * Raises the <c>childAdd</c> event
         */
        onChildrenAdd(): void;
        /**
         * Raises the <c>childEdit</c> event
         */
        onChildEdit(): void;
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(): void;
        /**
         * Back field for event
         */
        private _childAdd;
        /**
         * Gets an event raised when the user asks to add a new children
         *
         * @returns {LatteEvent}
         */
        childAdd: LatteEvent;
        /**
         * Back field for event
         */
        private _childEdit;
        /**
         * Gets an event raised when the user requests to edit the children
         *
         * @returns {LatteEvent}
         */
        childEdit: LatteEvent;
        /**
         * Back field for event
         */
        private _childRemove;
        /**
         * Gets an event raised when the user requests to delete the children
         *
         * @returns {LatteEvent}
         */
        childRemove: LatteEvent;
        /**
         * Raises the <c>childRemove</c> event
         */
        onChildRemove(): void;
        /**
         * Back field for event
         */
        private _loadChildren;
        /**
         * Gets an event raised when the children must be loaded
         *
         * @returns {LatteEvent}
         */
        loadChildren: LatteEvent;
        /**
         * Raises the <c>loadChildren</c> event
         */
        onLoadChildren(): void;
        /**
         * Back field for event
         */
        private _recordChanged;
        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        recordChanged: LatteEvent;
        /**
         * Field for btnAdd property
         */
        private _btnAdd;
        /**
         * Gets the add button
         *
         * @returns {ButtonItem}
         */
        btnAdd: ButtonItem;
        /**
         * Field for btnEdit property
         */
        private _btnEdit;
        /**
         * Gets the edit button
         *
         * @returns {ButtonItem}
         */
        btnEdit: ButtonItem;
        /**
         * Field for btnRefresh property
         */
        private _btnRefresh;
        /**
         * Gets the refresh button
         *
         * @returns {ButtonItem}
         */
        btnRefresh: ButtonItem;
        /**
         * Field for btnRemove property
         */
        private _btnRemove;
        /**
         * Gets the remove button
         *
         * @returns {ButtonItem}
         */
        btnRemove: ButtonItem;
        /**
         * Field for stackChildren property
         */
        private _stackChildren;
        /**
         * Gets the stack where children are placed
         *
         * @returns {SelectableStack}
         */
        stackChildren: SelectableStack;
        /**
         * Gets the collection of children of the widget
         *
         * @returns {Collection<SelectableItem>}
         */
        children: Collection<SelectableItem>;
        /**
         * Property field
         */
        private _record;
        /**
         * Gets or sets the record parent of the children
         *
         * @returns {DataRecord}
         */
        /**
         * Gets or sets the record parent of the children
         *
         * @param {DataRecord} value
         */
        record: DataRecord;
        /**
         * Gets the selected child of the widget
         *
         * @returns {SelectableItem}
         */
        selectedChild: SelectableItem;
    }
}
declare module latte {
    /**
     * Shows a dialog to edit the specified <c>DataRecord</c>
     **/
    class DataRecordDialogView extends DialogView {
        /**
         * Shows a dialog to edit the specified record
         * @param r
         * @param onSaved
         * @param title
         */
        static editRecord(r: DataRecord, onSaved?: () => any, title?: string): DataRecordDialogView;
        /**
         *
         */
        private _readOnly;
        /**
         *
         **/
        cancelButton: ButtonItem;
        /**
         *
         **/
        formView: DataRecordFormView;
        /**
         *
         **/
        saveButton: ButtonItem;
        /**
         *
         **/
        saving: LatteEvent;
        /**
         *
         **/
        saved: LatteEvent;
        /**
         *
         **/
        constructor(record?: DataRecord);
        /**
         * Raises the <c>saved</c> event
         **/
        onSaved(): void;
        /**
         * Raises the <c>saving</c> event
         **/
        onSaving(): void;
        /**
         * Gets or sets a value indicating if the form is for read-only
         **/
        /**
         * Gets or sets a value indicating if the form is for read-only
         **/
        readOnly: boolean;
        /**
         * Gets the record of the view
         *
         * @returns {DataRecord}
         */
        record: DataRecord;
    }
}
declare module latte {
    /**
     * Creates a form for a specific <c>DataRecord</c>
     **/
    class DataRecordFormItem extends FormItem {
        /**
         * Creates the form of the specified record
         **/
        constructor(record?: DataRecord);
        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to recieve the values
         **/
        applyValues(record?: DataRecord): void;
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(): void;
        /**
         * Back field for event
         */
        private _recordChanged;
        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        recordChanged: LatteEvent;
        /**
         * Property field
         */
        private _record;
        /**
         * Gets or sets the record of the form
         *
         * @returns {DataRecord}
         */
        /**
         * Gets or sets the record of the form
         *
         * @param {DataRecord} value
         */
        record: DataRecord;
    }
}
declare module latte {
    /**
     *
     **/
    class DataRecordFormView extends FormView {
        /**
         * Creates the form of the specified record
         **/
        constructor(record?: DataRecord);
        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to recieve the values
         **/
        applyValues(record?: DataRecord): void;
        /**
         * Field for form property
         */
        private _dataform;
        /**
         * Gets the data record form view
         *
         * @returns {DataRecordFormItem}
         */
        form: DataRecordFormItem;
        /**
         * Gets or sets the record of the form
         **/
        /**
         * Gets or sets the record of the form
         **/
        record: DataRecord;
    }
}
declare module latte {
    /**
     * Hanldles insertions, updates and deletion of <c>DataRecords</c>
     **/
    class DataRecordGridView extends GridView {
        /**
         *
         **/
        private _metadata;
        /**
         *
         **/
        _recordType: string;
        /**
         * Collection of records on the grid
         **/
        records: Collection<DataRecord>;
        /**
         *
         **/
        constructor();
        /**
         *
         **/
        private _onAddRecord(record);
        /**
         *
         **/
        private _onRemoveRecord(record);
        /**
         * Applies the values on row to the speified record
         **/
        applyValues(row: DataSetRow, record: DataRecord): void;
        /**
         * Prepares items for context item showing
         **/
        onContextItemsShow(): void;
        /**
         * Raises the <c>rowsAdded</c> event.
         **/
        onRowsAdded(dataset: DataSet): void;
        /**
         * Raises the <c>rowsChanged</c> event.
         **/
        onRowsChanged(dataset: DataSet): void;
        /**
         * Raises the <c>rowsRemoved</c> event.
         **/
        onRowsRemoved(dataset: DataSet): void;
        /**
         * Gets or sets the recordType of the grid
         **/
        /**
         * Gets or sets the recordType of the grid
         **/
        recordType: string;
    }
}
/**
 * Created by josemanuel on 1/13/14.
 */
declare module latte {
    /**
     *
     */
    interface DataRecordSuggestionLoader {
        (d: DataRecordValueItem, callback: (items: Item[]) => any): Message;
    }
    /**
     * Value item for representing data records as value item.
     */
    class DataRecordValueItem extends ValueItem {
        /**
         * Creates the value item
         * @param loader
         * @param textboxCreated
         */
        constructor(loader?: DataRecordSuggestionLoader, textboxCreated?: (t: TextboxItem) => any, placeholder?: string);
        /**
         * Override.
         * @returns {number}
         */
        getValue(): number;
        /**
         * Override
         * @returns {string}
         */
        getValueString(): string;
        /**
         * Override
         * @param value
         */
        setValue(value: any): void;
        /**
         * Sets the record without raising the valueChanged event
         */
        setRecordSilent(r: DataRecord): void;
        /**
         * Updates the item inside to show
         */
        updateItem(): void;
        /**
         * Back field for event
         */
        private _textboxCreated;
        /**
         * Gets an event raised when the textbox has been created
         *
         * @returns {LatteEvent}
         */
        textboxCreated: LatteEvent;
        /**
         * Raises the <c>textboxCreated</c> event
         */
        onTextboxCreated(): void;
        /**
         * Property field
         */
        private _loaderFunction;
        /**
         * Gets or sets the loader function
         *
         * @returns {(text:string, callback:(items:Array<Item>) => any) => Message}
         */
        /**
         * Gets or sets the loader function
         *
         * @param {(text:string, callback:(items:Array<Item>) => any) => Message} value
         */
        loaderFunction: DataRecordSuggestionLoader;
        /**
         * Property field
         */
        private _placeholder;
        /**
         * Gets or sets the placeholder
         *
         * @returns {string}
         */
        /**
         * Gets or sets the placeholder
         *
         * @param {string} value
         */
        placeholder: string;
        /**
         * Property field
         */
        private _record;
        /**
         * Gets or sets the record of the item
         *
         * @returns {DataRecord}
         */
        /**
         * Gets or sets the record of the item
         *
         * @param {DataRecord} value
         */
        record: DataRecord;
        /**
         * Property field
         */
        private _textbox;
        /**
         * Gets the textbox used to search
         *
         * @returns {TextboxItem}
         */
        textbox: TextboxItem;
        /**
         * Gets the text of the textbox (if any)
         *
         * @returns {string}
         */
        text: string;
    }
}
/**
 * Created by josemanuel on 10/24/14.
 */
declare module latte {
    /**
     *
     */
    class DataRecordWidget extends WidgetItem {
        /**
         *
         */
        constructor(record?: DataRecord);
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(): void;
        /**
         * Raises the <c>saving</c> event
         */
        onSaving(): void;
        /**
         * Raises the <c>saved</c> event
         */
        onSaved(): void;
        /**
         * Back field for event
         */
        private _recordChanged;
        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        recordChanged: LatteEvent;
        /**
         * Back field for event
         */
        private _saving;
        /**
         * Gets an event raised when the record is being saved
         *
         * @returns {LatteEvent}
         */
        saving: LatteEvent;
        /**
         * Back field for event
         */
        private _saved;
        /**
         * Gets an event raised when the record is saved
         *
         * @returns {LatteEvent}
         */
        saved: LatteEvent;
        /**
         * Field for form property
         */
        private _form;
        /**
         * Gets the form of the record
         *
         * @returns {DataRecordFormItem}
         */
        form: DataRecordFormItem;
        /**
         * Field for btnSave property
         */
        private _btnSave;
        /**
         * Gets the save button
         *
         * @returns {ButtonItem}
         */
        btnSave: ButtonItem;
        /**
         * Property field
         */
        private _record;
        /**
         * Gets or sets the record of the widget
         *
         * @returns {DataRecord}
         */
        /**
         * Gets or sets the record of the widget
         *
         * @param {DataRecord} value
         */
        record: DataRecord;
    }
}
declare module latte {
    /**
     * Represents a column of data in the GridView
     **/
    class GridViewColumn extends DataSetColumn {
        /**
         *
         **/
        private _header;
        /**
         *
         **/
        private _readonly;
        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
        constructor(name?: string, type?: string, length?: number);
        /**
         * Gets or sets the GridView header element this column represents
         **/
        /**
         * Gets or sets the GridView header element this column represents
         **/
        header: JQuery;
        /**
         * Gets or sets a value indicating if the column is read only
         **/
        /**
         * Gets or sets a value indicating if the column is read only
         **/
        readOnly: boolean;
    }
}
declare module latte {
    /**
     * Represents a row of data on the <c>GridView</c>
     **/
    class GridViewRow extends DataSetRow {
        /**
         * Points to the row element on grid
         **/
        element: JQuery;
        /**
         * Creates the row
         **/
        constructor(data?: any[]);
    }
}
