/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.data.d.ts" />
/// <reference path="latte.data.strings.d.ts" />
/// <reference path="latte.strings.d.ts" />
/// <reference path="latte.ui.d.ts" />
/// <reference path="latte.ui.strings.d.ts" />
/**
 * Created by josemanuel on 5/2/16.
 */
declare module latte {
    /**
     *
     */
    interface IDataRecordCustomForm {
        onFormCreated?(form: DataRecordFormItem): any;
        onFormCreating?(form: DataRecordFormItem): any;
    }
}
/**
 * Created by josemanuel on 5/2/16.
 */
declare module latte {
    /**
     *
     */
    interface IDataRecordCustomView {
        onViewCreated?(view: View): any;
        onViewCreating?(view: View): any;
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
/**
 * Created by josemanuel on 8/8/14.
 */
declare module latte {
    /**
     *
     */
    class ExplorerItem {
        /**
         *
         */
        constructor();
        /**
         * Creates a tree item for the record
         */
        createTreeItem(): TreeItem;
        /**
         * Creates a list view item for the record
         */
        createListViewItem(): ListViewItem;
        /**
         * Gets the actions of the button
         *
         * @returns {Array}
         */
        getItems(): Item[];
        /**
         * Gets the actions that apply for child items
         *
         * @returns {Array}
         */
        getChildrenItems(): Item[];
        /**
         * Gets the icon of 16 pixels
         *
         * @returns {IconItem}
         */
        getIcon(): IconItem;
        /**
         * Gets the icon of 32 pixels
         *
         * @returns {IconItem}
         */
        getIcon32(): IconItem;
        /**
         * Gets the name for the item
         *
         * @returns {string}
         */
        getName(): string;
        /**
         * Gets a value indicating if the item may be deleted
         *
         * @returns {boolean}
         */
        getCanBeDeleted(): boolean;
        /**
         * Gets the name of the columns that go in the lists
         * This are names of fields, described in metadata of record.
         */
        getColumns(): string[];
        /**
         * Loads the children of the item
         */
        getChildrenLoader(): RemoteCall<any>;
        /**
         * Gets the detail view of the item
         *
         * @returns {latte.DataRecordFormItem}
         */
        getDetailView(): View;
        /**
         * Loads children if necessary.
         * Checks <c>loadsChildren</c> and <c>childrenLoaded</c> flags to avoid re-loading.
         */
        loadChildren(callback?: () => void): void;
        /**
         * Back field for event
         */
        private _childAdded;
        /**
         * Gets an event raised when a child is added
         *
         * @returns {LatteEvent}
         */
        childAdded: LatteEvent;
        /**
         * Raises the <c>childAdded</c> event
         */
        onChildAdded(item: ExplorerItem): void;
        /**
         * Back field for event
         */
        private _childRemoved;
        /**
         * Gets an event raised when a child is removed
         *
         * @returns {LatteEvent}
         */
        childRemoved: LatteEvent;
        /**
         * Raises the <c>childRemoved</c> event
         */
        onChildRemoved(item: ExplorerItem): void;
        /**
         * Back field for event
         */
        private _childrenChanged;
        /**
         * Gets an event raised when the children of the item changed
         *
         * @returns {LatteEvent}
         */
        childrenChanged: LatteEvent;
        /**
         * Raises the <c>childrenChanged</c> event
         */
        onChildrenChanged(): void;
        /**
         * Back field for event
         */
        private _childrenLoadStarted;
        /**
         * Gets an event raised when the load of children starts
         *
         * @returns {LatteEvent}
         */
        childrenLoadStarted: LatteEvent;
        /**
         * Raises the <c>childrenLoadStarted</c> event
         */
        onChildrenLoadStarted(): void;
        /**
         * Back field for event
         */
        private _childrenLoadEnd;
        /**
         * Gets an event raised when the load of children ends
         *
         * @returns {LatteEvent}
         */
        childrenLoadEnd: LatteEvent;
        /**
         * Raises the <c>childrenLoadEnd</c> event
         */
        onChildrenLoadEnd(): void;
        /**
         * Field for children property
         */
        private _children;
        /**
         * Gets the collection of child items of this item
         *
         * @returns {Collection<ExplorerItem>}
         */
        children: Collection<ExplorerItem>;
        /**
         * Property field
         */
        private _childrenLoaded;
        /**
         * Gets or sets a value indicating if the children is loaded
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the children is loaded
         *
         * @param {boolean} value
         */
        childrenLoaded: boolean;
        /**
         * Gets a value indicating if the node needs to load children, by analyzing its state
         *
         * @returns {boolean}
         */
        childrenLoadNeeded: boolean;
        /**
         * Property field
         */
        private _childrenPage;
        /**
         * Gets or sets the current page of children
         *
         * @returns {number}
         */
        /**
         * Gets or sets the current page of children
         *
         * @param {number} value
         */
        childrenPage: number;
        /**
         * Property field
         */
        private _childrenPages;
        /**
         * Gets or sets the total pages of children items
         *
         * @returns {number}
         */
        /**
         * Gets or sets the total pages of children items
         *
         * @param {number} value
         */
        childrenPages: number;
        /**
         * Back field for event
         */
        private _childrenPagesChanged;
        /**
         * Gets an event raised when the value of the childrenPages property changes
         *
         * @returns {LatteEvent}
         */
        childrenPagesChanged: LatteEvent;
        /**
         * Raises the <c>childrenPages</c> event
         */
        onChildrenPagesChanged(): void;
        /**
         * Property field
         */
        private _explorer;
        /**
         * Gets or sets the explorer view where the item lives
         *
         * @returns {ExplorerView}
         */
        /**
         * Gets or sets the explorer view where the item lives
         *
         * @param {ExplorerView} value
         */
        explorer: ExplorerView;
        /**
         * Property field
         */
        private _childrenLoading;
        /**
         * Gets a value indicating if children are being loaded
         *
         * @returns {boolean}
         */
        childrenLoading: boolean;
        /**
         * Property field
         */
        private _loadsChildren;
        /**
         * Gets or sets a flag indicating if the item may load children for sub-items
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a flag indicating if the item may load children for sub-items
         *
         * @param {boolean} value
         */
        loadsChildren: boolean;
        /**
         * Property field
         */
        private _loadsChildrenFolders;
        /**
         * Gets or sets a value indicating if the item will load items with sub-items.
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the item will load items with sub-items.
         *
         * @param {boolean} value
         */
        loadsChildrenFolders: boolean;
        /**
         * Property field
         */
        private _parent;
        /**
         * Gets the parent item of this item
         *
         * @returns {ExplorerItem}
         */
        parent: ExplorerItem;
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
         * Raises the <c>childRemove</c> event
         */
        onChildRemove(): void;
        /**
         * Raises the <c>loadChildren</c> event
         */
        onLoadChildren(): void;
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(): void;
        /**
         * Reloads children
         */
        reloadChildren(): void;
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
     * Creates a form for a specific <c>DataRecord</c>
     **/
    class DataRecordFormItem extends FormItem {
        /**
         * Creates the form of the specified record
         **/
        constructor(record?: DataRecord);
        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to receive the values
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
         * Raises the <c>childRemove</c> event
         */
        onChildRemove(): void;
        /**
         * Raises the <c>loadChildren</c> event
         */
        onLoadChildren(): void;
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(): void;
        /**
         * Reloads children of the view
         */
        reloadChildren(): void;
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
        onSaveChanges(): void;
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
/**
 * Created by josemanuel on 1/13/14.
 */
declare module latte {
    /**
     *
     */
    interface DataRecordSuggestionLoader {
        (d: DataRecordValueItem, callback: (items: Array<Item>) => any): Message;
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
        constructor(data?: Array<any>);
    }
}
/**
 * Created by josemanuel on 8/6/14.
 */
declare module latte {
    /**
     *
     */
    class ExplorerView extends SplitView {
        private ignorePageChange;
        /**
         *
         */
        constructor(rootItem?: ExplorerItem);
        /**
         * Adds handlers to the item
         */
        private addTreeItemHandlers(treeItem);
        /**
         * Loads the children of specified item into the listview
         * @param treeItem
         */
        private listViewChildrenOf(item);
        /**
         * Loads the children of specified item into its node
         * @param item
         */
        private treeViewChildrenOf(item, treeItem);
        /**
         * Assigns handlers to list view items
         * @param listItem
         */
        private addListViewItemHandlers(listItem);
        /**
         * Sets the detail view of the specified item, if any
         *
         * @param item
         */
        private detailViewOf(item);
        /**
         * Adds a root item
         *
         * @param item
         */
        addRootItem(item: ExplorerItem): void;
        /**
         * Refreshes the children of the list
         */
        refreshList(): void;
        /**
         * Field for btnSaveDetail property
         */
        private _btnSaveDetail;
        /**
         * Gets the "save" button
         *
         * @returns {boolean}
         */
        btnSaveDetail: ButtonItem;
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
         * Field for btnRemoveDetail property
         */
        private _btnRemoveDetail;
        /**
         * Gets the remove button
         *
         * @returns {ButtonItem}
         */
        btnRemoveDetail: ButtonItem;
        /**
         * Field for detailSplitView property
         */
        private _detailSplitView;
        /**
         * Gets the details split view
         *
         * @returns {SplitView}
         */
        detailSplitView: SplitView;
        /**
         * Field for detailViewToolbarView property
         */
        private _detailViewToolbarView;
        /**
         * Gets the detail view toolbar view
         *
         * @returns {ToolbarView}
         */
        detailViewToolbarView: ToolbarView;
        /**
         * Gets the toolbar of the detail zone
         *
         * @returns {Toolbar}
         */
        detailViewToolbar: Toolbar;
        /**
         * Property field
         */
        private _treeViewToolbar;
        /**
         * Gets the toolbar of the tree view
         *
         * @returns {Toolbar}
         */
        treeViewToolbar: Toolbar;
        /**
         * Property field
         */
        private _listSelectedItem;
        /**
         * Gets the selected item on the list
         *
         * @returns {ExplorerItem}
         */
        listSelectedItem: ExplorerItem;
        /**
         * Property field
         */
        private _listViewToolbar;
        /**
         * Gets the toolbar of the list view
         *
         * @returns {Toolbar}
         */
        listViewToolbar: Toolbar;
        /**
         * Field for detailView property
         */
        private _detailView;
        /**
         * Gets the detail View
         *
         * @returns {View}
         */
        detailView: View;
        /**
         * Field for listView property
         */
        private _listView;
        /**
         * Gets the list view
         *
         * @returns {ListView}
         */
        listView: ListView;
        /**
         * Field for paginator property
         */
        private _paginator;
        /**
         * Gets the pagination item
         *
         * @returns {PaginationItem}
         */
        paginator: PaginationItem;
        /**
         * Property field
         */
        private _treeSelectedItem;
        /**
         * Gets the selected item on the tree side
         *
         * @returns {ExplorerItem}
         */
        treeSelectedItem: ExplorerItem;
        /**
         * Field for treeView property
         */
        private _treeView;
        /**
         * Gets the tree view
         *
         * @returns {TreeView}
         */
        treeView: TreeView;
    }
}
/**
 * Created by josemanuel on 8/8/14.
 */
declare module latte {
    /**
     *
     */
    class ExplorerTreeItem extends TreeItem {
        /**
         *
         */
        constructor();
        /**
         * Property field
         */
        private _record;
        /**
         * Gets or sets the record of the tree item
         *
         * @returns {DataRecord}
         */
        /**
         * Gets or sets the record of the tree item
         *
         * @param {DataRecord} value
         */
        record: DataRecord;
    }
}
/**
 * Created by josemanuel on 8/11/14.
 */
declare module latte {
    /**
     *
     */
    class ExplorerItemDataRecord<T extends DataRecord> extends ExplorerItem {
        /**
         *
         */
        constructor();
        /**
         * Creates a list view item for the record
         */
        createListViewItem(): ListViewItem;
        /**
         * Gets the name for the item
         *
         * @returns {string}
         */
        getName(): string;
        /**
         * Gets the name of the columns that go in the lists
         * This are names of fields, described in metadata of record.
         */
        getColumns(): string[];
        /**
         * Gets the width of the specified column
         *
         * @param name
         */
        getColumnWithFor(name: string): number;
        /**
         * Gets an item for the column
         *
         * @param name
         */
        getItemForColumn(name: string): Item;
        /**
         * Gets the detail view of the item
         *
         * @returns {latte.DataRecordFormItem}
         */
        getDetailView(): View;
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
        record: T;
    }
}
