/**
 * Created by josemanuel on 10/25/14.
 */
module latte {

    /**
     * Widget for showing children of a DataRecord.
     *
     * Children are added using the <c>children</c> collection, when <c>loadChildren</c> method is called.
     */
    export class DataRecordChildrenView extends ToolbarView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the widget
         */
        constructor(loadChildren: () => any = null, childAdd: () => any = null, childEdit: () => any = null, childRemove: () => any = null) {
            super();


            this.toolbar.sideItems.addArray([
                this.btnRemove,
                this.btnEdit,
                this.btnAdd,
                new SeparatorItem(),
                this.btnRefresh,
            ]);

            this.view = this.listView;

            if(loadChildren) {
                this.loadChildren.add(loadChildren);
            }

            if(childAdd) {
                this.childAdd.add(childAdd);
            }

            if(childEdit) {
                this.childEdit.add(childEdit);
            }

            if(childRemove) {
                this.childRemove.add(childRemove);
            }
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Raises the <c>childAdd</c> event
         */
        onChildrenAdd(){
            if(this._childAdd){
                this._childAdd.raise();
            }
        }

        /**
         * Raises the <c>childEdit</c> event
         */
        onChildEdit(){
            if(this._childEdit){
                this._childEdit.raise();
            }
        }

        /**
         * Raises the <c>childRemove</c> event
         */
        onChildRemove(){
            if(this._childRemove){
                this._childRemove.raise();
            }
        }

        /**
         * Raises the <c>loadChildren</c> event
         */
        onLoadChildren(){

            this.btnRemove.enabled = this.btnEdit.enabled = false;
            this.children.clear();

            if(this._loadChildren){
                this._loadChildren.raise();
            }
        }

        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(){
            if(this._recordChanged){
                this._recordChanged.raise();
            }

            this.onLoadChildren();
        }

        /**
         * Reloads children of the view
         */
        reloadChildren(){
            this.onLoadChildren();
        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _childAdd: LatteEvent;

        /**
         * Gets an event raised when the user asks to add a new children
         *
         * @returns {LatteEvent}
         */
        get childAdd(): LatteEvent{
            if(!this._childAdd){
                this._childAdd = new LatteEvent(this);
                this._childAdd.handlerAdded.add(() => { this.btnAdd.visible = true });
            }
            return this._childAdd;
        }

        /**
         * Back field for event
         */
        private _childEdit: LatteEvent;

        /**
         * Gets an event raised when the user requests to edit the children
         *
         * @returns {LatteEvent}
         */
        get childEdit(): LatteEvent{
            if(!this._childEdit){
                this._childEdit = new LatteEvent(this);
                this._childEdit.handlerAdded.add(() => { this.btnEdit.visible = true });
            }
            return this._childEdit;
        }

        /**
         * Back field for event
         */
        private _childRemove: LatteEvent;

        /**
         * Gets an event raised when the user requests to delete the children
         *
         * @returns {LatteEvent}
         */
        get childRemove(): LatteEvent{
            if(!this._childRemove){
                this._childRemove = new LatteEvent(this);
                this._childRemove.handlerAdded.add(() => { this.btnRemove.visible = true });
            }
            return this._childRemove;
        }

        /**
         * Back field for event
         */
        private _loadChildren: LatteEvent;

        /**
         * Gets an event raised when the children must be loaded
         *
         * @returns {LatteEvent}
         */
        get loadChildren(): LatteEvent{
            if(!this._loadChildren){
                this._loadChildren = new LatteEvent(this);
            }
            return this._loadChildren;
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
        public get recordChanged(): LatteEvent{
            if(!this._recordChanged){
                this._recordChanged = new LatteEvent(this);
            }
            return this._recordChanged;
        }

        //endregion

        //region Components

        /**
         * Field for btnAdd property
         */
        private _btnAdd:ButtonItem;

        /**
         * Gets the add button
         *
         * @returns {ButtonItem}
         */
        get btnAdd():ButtonItem {
            if (!this._btnAdd) {
                this._btnAdd = new ButtonItem(null, IconItem.standard(3, 3), () => { this.onChildrenAdd() });
                this._btnAdd.tooltip = strings.add;
                this._btnAdd.visible = false;
            }
            return this._btnAdd;
        }

        /**
         * Field for btnEdit property
         */
        private _btnEdit:ButtonItem;

        /**
         * Gets the edit button
         *
         * @returns {ButtonItem}
         */
        get btnEdit():ButtonItem {
            if (!this._btnEdit) {
                this._btnEdit = new ButtonItem(null, IconItem.standard(14, 8), () => { this.onChildEdit() });
                this._btnEdit.tooltip = strings.edit;
                this._btnEdit.visible = false;
                this._btnEdit.enabled = false;
            }
            return this._btnEdit;
        }

        /**
         * Field for btnRefresh property
         */
        private _btnRefresh:ButtonItem;

        /**
         * Gets the refresh button
         *
         * @returns {ButtonItem}
         */
        get btnRefresh():ButtonItem {
            if (!this._btnRefresh) {
                this._btnRefresh = new ButtonItem(null, IconItem.standard(1, 4), () => { this.onLoadChildren() });
            }
            return this._btnRefresh;
        }

        /**
         * Field for btnRemove property
         */
        private _btnRemove:ButtonItem;

        /**
         * Gets the remove button
         *
         * @returns {ButtonItem}
         */
        get btnRemove():ButtonItem {
            if (!this._btnRemove) {
                this._btnRemove = new ButtonItem(null, IconItem.standard(9, 1), () => {

                    var name = this.selectedChild.tag ? this.selectedChild.tag.toString() : this.selectedChild.toString();

                    DialogView.confirmDelete(name, () =>{
                        this.onChildRemove();
                    });
                });
                //this._btnRemove.tooltip = strings.remove;
                this._btnRemove.visible = false;
                this._btnRemove.enabled = false;
            }
            return this._btnRemove;
        }

        /**
         * Field for listView property
         */
        private _listView:ListView;

        /**
         * Gets the list view of the view
         *
         * @returns {ListView}
         */
        get listView():ListView {
            if (!this._listView) {
                this._listView = new ListView();
                this._listView.selectedItemChanged.add(() => {
                    this.btnEdit.enabled = this.btnRemove.enabled = this.listView.selectedItem != null;
                });
            }
            return this._listView;
        }

        /**
         * Field for pagination property
         */
        private _pagination:PaginationItem;

        /**
         * Gets the pagination item
         *
         * @returns {PaginationItem}
         */
        get pagination():PaginationItem {
            if (!this._pagination) {
                this._pagination = new PaginationItem();
            }
            return this._pagination;
        }


        //endregion

        //region Properties

        /**
         * Gets the collection of children of the widget
         *
         * @returns {Collection<SelectableItem>}
         */
        get children():Collection<ListViewItem> {
            return <Collection<ListViewItem>>this.listView.items;
        }

        /**
         * Property field
         */
        private _record: DataRecord = null;

        /**
         * Gets or sets the record parent of the children
         *
         * @returns {DataRecord}
         */
        get record(): DataRecord{
            return this._record;
        }

        /**
         * Gets or sets the record parent of the children
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

        /**
         * Gets the selected child of the widget
         *
         * @returns {SelectableItem}
         */
        get selectedChild():SelectableItem {
            return this.listView.selectedItem;
        }


        //endregion

    }

}