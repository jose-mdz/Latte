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
        public optionsChanged: LatteEvent;
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
        public length : number;
        /**
        * Gets or sets the name of the column.
        **/
        /**
        * Gets or sets the name of the column.
        **/
        public name : string;
        /**
        * Raises the <c>optionsChanged</c> event.
        **/
        public onOptionsChanged(): void;
        /**
        * Gets or sets the options of the column.
        **/
        /**
        * Gets or sets the options of the column.
        **/
        public options : any;
        /**
        * Gets or sets a generic tag value for the object
        **/
        /**
        * Gets or sets a generic tag value for the object
        **/
        public tag : any;
        /**
        * Gets or sets the type of the column values.
        **/
        /**
        * Gets or sets the type of the column values.
        **/
        public type : string;
    }
}
declare module latte {
    /**
    * Represents a row of data for <c>DataSet</c>
    **/
    class DataSetRow {
        public data: any[];
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
        public getDataArray(columns: number): any[];
        /**
        * Gets a value indicating if there is a value at the specified index
        **/
        public hasValueAt(index: number): boolean;
        /**
        * Gets or sets a value indicating if the row is read-only
        **/
        /**
        * Gets or sets a value indicating if the row is read-only
        **/
        public readOnly : boolean;
        /**
        * Gets or sets the value at the specified position
        **/
        /**
        * Gets or sets the value at the specified position
        **/
        public tag : any;
        /**
        * Gets or sets the value at the specified position
        **/
        public getValueAt(index: number): any;
        /**
        * Gets or sets the value at the specified position
        **/
        public setValueAt(index: number, value: any): void;
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
        public _actionRemoveRow: Action;
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
        public columns: Collection<GridViewColumn>;
        /**
        * Rows of data of the grid
        **/
        public rows: Collection<GridViewRow>;
        /**
        * Holds the Table element where the grid lives
        **/
        public table: JQuery;
        /**
        * Raised after <c>rowsAdded</c>, <c>rowsChanged</c>, <c>rowsRemoved</c> are raised originated by calling <c>commit()</c>
        **/
        public committed: LatteEvent;
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
        public valueChanged: LatteEvent;
        /**
        * Raised when new rows are added to the grid and confirmed by the user.
        The object passed to the event is a <c>DataSet</c> with the new rows
        **/
        public rowsAdded: LatteEvent;
        /**
        * Raised when changed rows where changed, and confirmed by the user.
        The object passed to the event is a <c>DataSet</c> with the changed rows
        **/
        public rowsChanged: LatteEvent;
        /**
        * Raised when rows are removed from the grid and confirmed by the user.
        The object passed to the event is a <c>DataSet</c> with the deleted rows
        **/
        public rowsRemoved: LatteEvent;
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
        public canEditCellAt(columnIndex: number, rowIndex: number): boolean;
        /**
        * Clears selection of cells.
        **/
        public clearSelection(): void;
        /**
        * Commits the current transaction of rows added, changed and deleted.
        Events <c>rowsAdded</c>, <c>rowsChanged</c>, <c>rowsRemoved</c> are raised accordingly.
        **/
        public commit(): void;
        /**
        * Commits the current transaction of rows added.
        LatteEvent <c>rowsAdded</c> is raised.
        **/
        public commitAddedRows(): void;
        /**
        * Commits the current transaction of rows changed.
        LatteEvent <c>rowsChanged</c> is raised.
        **/
        public commitChangedRows(): void;
        /**
        * Commits the current transaction of rows deleted.
        LatteEvent <c>rowsDeleted</c> is raised.
        **/
        public commitDeletedRows(): void;
        /**
        * Confirms the commit of added rows
        **/
        public confirmRowsAdded(): void;
        /**
        * Confirms the commit of changed rows
        **/
        public confirmRowsChanged(): void;
        /**
        * Confirms the commit of delete rows
        **/
        public confirmRowsRemoved(): void;
        /**
        * Enables the user a mechanism for copying the value of the cell to clipboard
        **/
        public copySelectedCellValue(): void;
        /**
        * Marks the row at the specified position for deletion
        **/
        public deleteRowAt(rowIndex: number): void;
        /**
        * Starts the edition mode of the cell at the specified row and column.
        **/
        public editCellAt(columnIndex: number, rowIndex: number): void;
        /**
        * Starts the edition mode of the next cell on the grid, if already in edition mode.
        **/
        public editNextCell(): void;
        /**
        * Starts the edition mode of the previous cell on the grid, if already in edition mode.
        **/
        public editPreviousCell(): void;
        /**
        * Ends the edition mode of the current editing cell. Optionally cancells edition by returning value to its original state.
        **/
        public endCellEdit(cancelled?: boolean): void;
        /**
        * Gets the actual element of the cell at specified column and row.
        **/
        public getCellElementAt(columnIndex: number, rowIndex: number): JQuery;
        /**
        *
        **/
        public getData(): DataSet;
        /**
        * Gets the actual element of the row at specified column and row.
        **/
        public getRowElementAt(rowIndex: number): JQuery;
        /**
        * Gets the data value at the specified position.
        **/
        public getValueAt(columnIndex: number, rowIndex: number): any;
        /**
        * Gets a value indicating if the there is a cell for the specified position
        **/
        public hasCellAt(columnIndex: number, rowIndex: number): boolean;
        /**
        * Gets a value indicating if there is a value at the specified position.
        **/
        public hasValueAt(columnIndex: number, rowIndex: number): boolean;
        /**
        * Raises the <c>committed</c> event
        **/
        public onCommitted(): void;
        /**
        * Raises the <c>contextItemsShow</c> event.
        **/
        public onContextItemsShow(): void;
        /**
        * Raises the <c>rowsAdded</c> event.
        **/
        public onRowsAdded(dataset: DataSet): void;
        /**
        * Raises the <c>rowsChanged</c> event.
        **/
        public onRowsChanged(dataset: DataSet, oldDataset?: DataSet): void;
        /**
        * Raises the <c>rowsDeleted</c> event.
        **/
        public onRowsRemoved(dataset: DataSet): void;
        /**
        * Raises the <c>valueChanged</c> event.
        **/
        public onValueChanged(columnIndex: number, rowIndex: number, value: any, oldValue: any): void;
        /**
        * Gets or sets the original value of the specified position.
        If no changes have occoured, it will return <c>undefined</c>
        **/
        public originalValue(columnIndex: number, rowIndex: number, value?: any): any;
        /**
        * Restores the original value at the specified position if possible.
        **/
        public restoreValueAt(columnIndex: number, rowIndex: number): void;
        /**
        * Cancels the current transaction of rows added, changed and deleted.
        **/
        public rollback(): void;
        /**
        * Selects the cell at the specified position.
        **/
        public selectCellAt(columnIndex: number, rowIndex: number): void;
        /**
        *
        **/
        public setData(value: DataSet): void;
        /**
        * Sets the data value at the specified position.
        Optionally specifies if the <c>valueChanged</c> should be raised
        **/
        public setValueAt(columnIndex: number, rowIndex: number, value: any, raiseEvent?: boolean): void;
        /**
        * Gets or sets a value indicating if the user is allowed to change values on rows
        **/
        /**
        * Gets or sets a value indicating if the user is allowed to change values on rows
        **/
        public allowChangeRows : boolean;
        /**
        * Gets or sets a value indicating if the user is allowed to delete rows
        **/
        /**
        * Gets or sets a value indicating if the user is allowed to delete rows
        **/
        public allowDeleteRows : boolean;
        /**
        * Gets or sets a value indicating if the user is allowed to create new rows
        **/
        /**
        * Gets or sets a value indicating if the user is allowed to create new rows
        **/
        public allowNewRows : boolean;
        /**
        * Gets or sets the data on grid as a DataSet
        **/
        /**
        * Gets or sets the data on grid as a DataSet
        **/
        public data : DataSet;
        /**
        * Gets a value indicating if some cell of the grid is currently on edit mode
        **/
        public editing : boolean;
        /**
        * Gets or sets a value indicating if the whole grid should be read-only.
        **/
        /**
        * Gets or sets a value indicating if the whole grid should be read-only.
        **/
        public readOnly : boolean;
        /**
        * Gets or sets the selected cell of grid
        **/
        /**
        * Gets or sets the selected cell of grid
        **/
        public selectedCell : JQuery;
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
        public load(recordType: string, name: string, callback?: () => any): Message;
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
        public _recordType: string;
        /**
        *
        **/
        private _tag;
        /**
        * Arbitrary collection of tags
        */
        public tags: any;
        /**
        * Metadata of record. Comes from server.
        **/
        public metadata: any;
        /**
        * Raised before a form for this record is created.
        **/
        public _formCreating: LatteEvent;
        /**
        * Raised when a form for this record has been created and filled with record fields.
        **/
        public _formCreated: LatteEvent;
        /**
        * Raised before a view for this record is created.
        **/
        public _viewCreating: LatteEvent;
        /**
        * Raised when a view for this record has been created and filled with record fields.
        **/
        public _viewCreated: LatteEvent;
        /**
        * Creates the record
        **/
        constructor();
        /**
        * Creates a view for displaying the record
        **/
        public createView(): View;
        /**
        * Gets the fields of the record, with values
        **/
        public getFields(): Object;
        /**
        * Can be overriden to return dynamically generated metadata
        **/
        public getMetadata(): any;
        /**
        * Sends an insert message to the server
        **/
        public insert(callback: VoidCallback): Message;
        /**
        * Gets the remote call for insertion
        *
        * @returns {latte.RemoteCall}
        */
        public insertCall(): RemoteCall<string>;
        /**
        * Returns a value indicating if the record is inserted, based on the existence of id
        **/
        public inserted(): boolean;
        /**
        * Raises the <c>formCreated</c> event
        **/
        public onFormCreated(form: DataRecordFormItem): void;
        /**
        * Raises the <c>formCreating</c> event
        **/
        public onFormCreating(form: DataRecordFormItem): void;
        /**
        * Gets the name of the id field
        * @returns {undefined}
        */
        public onGetRecordIdName(): string;
        /**
        * Raises the <c>viewCreated</c> event
        **/
        public onViewCreated(view: View): void;
        /**
        * Raises the <c>viewCreating</c> event
        **/
        public onViewCreating(view: View): void;
        /**
        * Sends a DELETE request to the server
        **/
        public remove(callback: () => any): Message;
        /**
        * Gets the call for removing this record
        * @returns {latte.RemoteCall}
        */
        public removeCall(): RemoteCall<boolean>;
        /**
        * Inserts or updates the record
        **/
        public save(callback: VoidCallback): Message;
        /**
        * Gets the insert or update call for record
        */
        public saveCall(): RemoteCall<any>;
        /**
        * Sends an update message to the record
        **/
        public update(callback: VoidCallback): Message;
        /**
        * Gets the call for updating the record
        *
        * @returns {latte.RemoteCall<string>}
        */
        public updateCall(): RemoteCall<string>;
        /**
        * Property field
        */
        public _moduleName: string;
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
        public moduleName : string;
        /**
        * Gets an event raised when a form about the record is solicited
        * @returns {LatteEvent}
        */
        public formCreating : LatteEvent;
        /**
        * Gets an event raised when a form about the record has been created
        * @returns {LatteEvent}
        */
        public formCreated : LatteEvent;
        /**
        * Gets or sets the record id
        **/
        /**
        * Gets or sets the record id
        **/
        public recordId : number;
        /**
        * Gets or sets the record type
        **/
        /**
        * Gets or sets the record type
        **/
        public recordType : string;
        /**
        * Gets or sets an arbitrary value for the record
        **/
        /**
        * Gets or sets an arbitrary value for the record
        **/
        public tag : string;
        /**
        * Gets an event raised when a View about the record has been created
        * @returns {LatteEvent}
        */
        public viewCreated : LatteEvent;
        /**
        * Gets an event raised when a View about the record is being requested
        * @returns {LatteEvent}
        */
        public viewCreating : LatteEvent;
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
        public byId(id: number): DataRecord;
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
        public columns: Collection<DataSetColumn>;
        /**
        * Rows of data
        **/
        public rows: Collection<DataSetRow>;
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
        public getColumnIndex(columnName: string): number;
        /**
        * Gets the data as an array of arrays
        **/
        public getDataArray(): any[];
        /**
        * Gets the value of the specified column at the specified row index
        **/
        public getValue(columnName: string, rowIndex: number): any;
        /**
        * Gets the value at the specified position
        **/
        public getValueAt(columnIndex: number, rowIndex: number): any;
        /**
        * Sets the value at the specified position
        **/
        public setValue(columnName: string, rowIndex: number, value: any): DataSet;
        /**
        * Sets the value at the specified position
        **/
        public setValueAt(columnIndex: number, rowIndex: number, value: any): DataSet;
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
        static networkAvailable : boolean;
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
        public critical: boolean;
        /**
        * Complete response of message
        **/
        public response: string;
        /**
        * Executed when message response arrives, before parsing it
        **/
        public _responseArrived: LatteEvent;
        /**
        * Executed when message is sent
        **/
        public _sent: LatteEvent;
        /**
        * Executed when message arrives with error
        **/
        public _failed: LatteEvent;
        /**
        * Executed when the network has failed
        **/
        public _networkFailed: LatteEvent;
        /**
        * Creates the message with the specified call
        **/
        constructor(moduleName?: string, className?: string, method?: string, arguments?: any, id?: number);
        /**
        * Adds calls to the calls array
        * @param calls
        */
        public addCalls(calls: RemoteCall<any>[]): void;
        /**
        * Reacts to data arrived
        **/
        public dataArrived(data: string): void;
        /**
        * Raises the failed event
        **/
        public onFailed(errorDescription: string): void;
        /**
        * Raises the networkFailed event
        **/
        public onNetworkFailed(): void;
        /**
        * Raises the responseArrived event
        **/
        public onResponseArrived(): void;
        /**
        * Raises the <c>sent</c> event
        **/
        public onSent(): void;
        /**
        * Sends the message. Optionally adds event handlers for <c>succeeded</c> and <c>failed</c> events
        **/
        public send(success?: (data: any) => any, failure?: () => any): Message;
        /**
        * Shows the loader if any <c>loaderText</c> assigned
        **/
        public showLoader(): void;
        /**
        * Gets a value indcating if the message is in progress
        **/
        public working(): boolean;
        /**
        * Gets the calls this message will make
        *
        * @returns {Array<RemoteCall>}
        */
        public calls : RemoteCall<any>[];
        /**
        * Gets an event raised when the message fails by network issues or server issues
        * @returns {LatteEvent}
        */
        public failed : LatteEvent;
        /**
        * Gets or sets the text of a loader that will be shown while message arrives.
        **/
        /**
        * Gets or sets the text of a loader that will be shown while message arrives.
        **/
        public loaderText : string;
        /**
        * Gets an event raised when the network fails
        * @returns {LatteEvent}
        */
        public networkFailed : LatteEvent;
        /**
        * Gets an event raised when the response arrives
        * @returns {LatteEvent}
        */
        public responseArrived : LatteEvent;
        /**
        * Gets an event raised when the message is sent
        * @returns {LatteEvent}
        */
        public sent : LatteEvent;
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
        public marshall(): IRemoteCall;
        /**
        * Raises the <c>failure</c> event
        */
        public onFailure(): void;
        /**
        * Raises the <c>success</c> event
        * @param data
        */
        public onSuccess(data: T): void;
        /**
        * Reports a response from server to the call
        *
        * @param responseData
        */
        public respond(responseData: IRemoteResponse): void;
        /**
        * Creates a Message object and sends the call, additionally handlers for success and failure may be added.
        */
        public send(success?: (data: T) => void, failure?: () => void): Message;
        /**
        * Creates a Message object and sends the call, showing a loader with the specified text
        * @param loaderText
        * @param success
        * @param failure
        */
        public sendWithLoader(loaderText: string, success?: (data: T) => void, failure?: () => void): Message;
        /**
        * Gets a string representation of the call
        * @returns {*|string}
        */
        public toString(): string;
        /**
        * Adds handlers for success and/or failure and returns the call object
        * @param success
        * @param failure
        * @returns {latte.RemoteCall}
        */
        public withHandlers(success?: (data: T) => void, failure?: () => void): RemoteCall<T>;
        /**
        * Gets or sets the name of the class where the procedure is located
        * @returns {string}
        */
        /**
        * Gets or sets the name of the class where the procedure is located
        * @param value
        */
        public className : string;
        /**
        * Gets or sets the name of the remote procedure to be called
        * @returns {string}
        */
        /**
        * Gets or sets the name of the remote procedure to be called
        * @param value
        */
        public method : string;
        /**
        * Gets an event raised when the call fails
        * @returns {LatteEvent}
        */
        public failure : LatteEvent;
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
        public something : string;
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
        public moduleName : string;
        /**
        * Gets or sets the id of the object instance where procedure should be called
        * @returns {number}
        */
        /**
        * Gets or sets the id of the object instance where procedure should be called
        * @param value
        */
        public id : number;
        /**
        * Gets or sets an object representing the parameters to use when calling the remote procedure
        * @returns {*}
        */
        /**
        * Gets or sets an object representing the parameters to use when calling the remote procedure
        * @param value
        */
        public params : any;
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
        public response : RemoteResponse<T>;
        /**
        * Gets or sets the type of data returned by the remote procedure
        * @param value
        */
        /**
        * Gets or sets the type of data returned by the remote procedure
        * @param value
        */
        public returns : T;
        /**
        * Gets an event raised when message arrives successfully
        */
        public success : LatteEvent;
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
        public call : RemoteCall<T>;
        /**
        * Gets the error code returned (if any)
        * @returns {number}
        */
        public errorCode : number;
        /**
        * Gets the error description returned (if any)
        * @returns {string}
        */
        public errorDescription : string;
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
        public logs : string[];
        /**
        * Gets the literal response from server
        * @returns {string}
        */
        public response : IRemoteResponse;
        /**
        * Gets
        * @returns {T}
        */
        public data : T;
        /**
        * Gets a value indicating if the call was a success
        * @returns {boolean}
        */
        public success : boolean;
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
        public warnings : string[];
    }
}
declare module latte {
    /**
    * Shows a dialog to edit the specified <c>DataRecord</c>
    **/
    class DataRecordDialogView extends DialogView {
        /**
        *
        */
        private _readOnly;
        /**
        *
        **/
        public cancelButton: ButtonItem;
        /**
        *
        **/
        public formView: DataRecordFormView;
        /**
        *
        **/
        public saveButton: ButtonItem;
        /**
        *
        **/
        public saving: LatteEvent;
        /**
        *
        **/
        public saved: LatteEvent;
        /**
        *
        **/
        constructor(record?: DataRecord);
        /**
        * Raises the <c>saved</c> event
        **/
        public onSaved(): void;
        /**
        * Raises the <c>saving</c> event
        **/
        public onSaving(): void;
        /**
        * Gets or sets a value indicating if the form is for read-only
        **/
        /**
        * Gets or sets a value indicating if the form is for read-only
        **/
        public readOnly : boolean;
        /**
        * Gets the record of the view
        *
        * @returns {DataRecord}
        */
        public record : DataRecord;
    }
}
declare module latte {
    /**
    * Creates a form for a specific <c>DataRecord</c>
    **/
    class DataRecordFormItem extends FormItem {
        /**
        *
        **/
        private _record;
        /**
        * Creates the form of the specified record
        **/
        constructor(record?: DataRecord);
        /**
        * Applies the values on form to the record. Optionally specifies which record
        is supposed to recieve the values
        **/
        public applyValues(record?: DataRecord): void;
        /**
        * Gets or sets the record of the form
        **/
        /**
        * Gets or sets the record of the form
        **/
        public record : DataRecord;
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
        public applyValues(record?: DataRecord): void;
        /**
        * Gets or sets the record of the form
        **/
        /**
        * Gets or sets the record of the form
        **/
        public record : DataRecord;
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
        public _recordType: string;
        /**
        * Collection of records on the grid
        **/
        public records: Collection<DataRecord>;
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
        public applyValues(row: DataSetRow, record: DataRecord): void;
        /**
        * Prepares items for context item showing
        **/
        public onContextItemsShow(): void;
        /**
        * Raises the <c>rowsAdded</c> event.
        **/
        public onRowsAdded(dataset: DataSet): void;
        /**
        * Raises the <c>rowsChanged</c> event.
        **/
        public onRowsChanged(dataset: DataSet): void;
        /**
        * Raises the <c>rowsRemoved</c> event.
        **/
        public onRowsRemoved(dataset: DataSet): void;
        /**
        * Gets or sets the recordType of the grid
        **/
        /**
        * Gets or sets the recordType of the grid
        **/
        public recordType : string;
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
        constructor(loader?: DataRecordSuggestionLoader, textboxCreated?: (t: TextboxItem) => any);
        /**
        * Override.
        * @returns {number}
        */
        public getValue(): number;
        /**
        * Override
        * @returns {string}
        */
        public getValueString(): string;
        /**
        * Override
        * @param value
        */
        public setValue(value: any): void;
        /**
        * Sets the record without raising the valueChanged event
        */
        public setRecordSilent(r: DataRecord): void;
        /**
        * Updates the item inside to show
        */
        public updateItem(): void;
        /**
        * Back field for event
        */
        private _textboxCreated;
        /**
        * Gets an event raised when the textbox has been created
        *
        * @returns {LatteEvent}
        */
        public textboxCreated : LatteEvent;
        /**
        * Raises the <c>textboxCreated</c> event
        */
        public onTextboxCreated(): void;
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
        public loaderFunction : DataRecordSuggestionLoader;
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
        public record : DataRecord;
        /**
        * Property field
        */
        private _textbox;
        /**
        * Gets the textbox used to search
        *
        * @returns {TextboxItem}
        */
        public textbox : TextboxItem;
        /**
        * Gets the text of the textbox (if any)
        *
        * @returns {string}
        */
        public text : string;
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
        public header : JQuery;
        /**
        * Gets or sets a value indicating if the column is read only
        **/
        /**
        * Gets or sets a value indicating if the column is read only
        **/
        public readOnly : boolean;
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
        public element: JQuery;
        /**
        * Creates the row
        **/
        constructor(data?: any[]);
    }
}
