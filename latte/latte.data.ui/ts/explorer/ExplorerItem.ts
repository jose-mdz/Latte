/**
 * Created by josemanuel on 8/8/14.
 */
module latte {

    /**
     *
     */
    export class ExplorerItem {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the explorer item
         */
        constructor() {
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Creates a tree item for the record
         */
        createTreeItem(): TreeItem{

            var item = new TreeItem();
            item.tag = this;

            this._treeItem = item;

            this.syncUI();

            return item;
        }

        /**
         * Creates a list view item for the record
         */
        createListViewItem(): ListViewItem{

            var item = new ListViewItem(this.explorer.listView);
            var columns: string[] = this.getColumns();

            item.tag = this;

            this._listViewItem = item;

            // Name column
            item.addColumn(150);

            this.syncUI();



            return item;
        }

        /**
         * Gets a value indicating if the item may be deleted
         *
         * @returns {boolean}
         */
        getCanBeDeleted(): boolean{
            return true;
        }

        /**
         * Gets the column headers of the item
         * @returns {Array}
         */
        getColumnHeaders(): ColumnHeader[]{
            return [];
        }

        /**
         * Gets the name of the columns that go in the lists
         * This are names of fields, described in metadata of record.
         */
        getColumns(): string[]{
            return [];
        }

        /**
         * Loads the children of the item
         */
        getChildrenLoader(): RemoteCall<any>{
            return null;
        }

        /**
         * Gets the view who renders children. Return null to use the standard ListView
         */
        getChildrenView(): ExplorerChildrenView{
            return null;
        }
        
        /**
         * Gets the detail view of the item
         *
         * @returns {latte.DataRecordFormItem}
         */
        getDetailView(): View{
            return null;
        }
        
        /**
         * Gets the actions of the button
         *
         * @returns {Array}
         */
        getItems(): Item[]{
            return [];
        }

        /**
         * Gets the actions that apply for child items
         *
         * @returns {Array}
         */
        getChildrenItems(): Item[]{

            return [];
        }

        /**
         * Gets the icon of 16 pixels
         *
         * @returns {IconItem}
         */
        getIcon(): IconItem{
            return IconItem.fileIcon();
        }

        /**
         * Gets the icon of 32 pixels
         *
         * @returns {IconItem}
         */
        getIcon32(): IconItem{
            return IconItem.standard(2, 1, 32);
        }

        /**
         * Gets the name for the item
         *
         * @returns {string}
         */
        getName(): string{
            return this.toString();
        }

        /**
         * Loads children if necessary.
         * Checks <c>loadsChildren</c> and <c>childrenLoaded</c> flags to avoid re-loading.
         */
        loadChildren(callback: () => void = null){

            if(!callback) {
                callback = () => {}; // Does nothing;
            }

            if(!this.loadsChildren || this.childrenLoaded) {
                callback();
                return;

            }else{

                // Raise load start
                this.onChildrenLoadStarted();

                // Retrieve loader
                let call = this.getChildrenLoader();

                if (call) {

                    this.children.clear();

                    this._childrenLoading = true;

                    call.send(() => {

                        // Check flag
                        this.childrenLoaded = true;

                        // Report end of load
                        this._childrenLoading = false;

                        // Raise load end
                        this.onChildrenLoadEnd();

                        // Callback
                        callback();

                    });
                }else{
                    // Check flag
                    this.childrenLoaded = true;

                    // Raise load end
                    this.onChildrenLoadEnd();

                    callback();
                }
            }




        }

        /**
         * Raises the <c>childAdded</c> event
         */
        onChildAdded(item: ExplorerItem){
            if(this._childAdded){
                this._childAdded.raise(item);
            }

            item.explorer = this.explorer;
            item._parent = this;
        }

        /**
         * Raises the <c>childrenPages</c> event
         */
        onChildrenPagesChanged(){
            if(this._childrenPagesChanged){
                this._childrenPagesChanged.raise();
            }

            this.explorer.paginator.visible = this.explorer && this.childrenPages > 1;

            //log("Paginator visible: " + (this.explorer && this.childrenPages > 1))

        }

        /**
         * Raises the <c>childRemoved</c> event
         */
        onChildRemoved(item: ExplorerItem){
            if(this._childRemoved){
                this._childRemoved.raise(item);
            }

            item._parent = null;
        }

        /**
         * Raises the <c>childrenChanged</c> event
         */
        onChildrenChanged(){

            this.childrenLoaded = false;

            if(this._childrenChanged){
                this._childrenChanged.raise();
            }

        }

        /**
         * Raises the <c>childrenLoadStarted</c> event
         */
        onChildrenLoadStarted(){
            if(this._childrenLoadStarted){
                this._childrenLoadStarted.raise();
            }
        }

        /**
         * Raises the <c>childrenLoadEnd</c> event
         */
        onChildrenLoadEnd(){
            if(this._childrenLoadEnd){
                this._childrenLoadEnd.raise();
            }
        }

        /**
         * Synchronizes UI Items to reflect possible changes
         */
        syncUI(){

            if(this.treeItem) {
                this.treeItem.text = this.getName();
                this.treeItem.icon = this.getIcon();
            }

            if(this.listViewItem) {
                this.listViewItem.icon = this.getIcon();
                this.listViewItem.setItem(0, new LabelItem(this.getName()));
            }

        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _childAdded: LatteEvent;

        /**
         * Gets an event raised when a child is added
         *
         * @returns {LatteEvent}
         */
        get childAdded(): LatteEvent{
            if(!this._childAdded){
                this._childAdded = new LatteEvent(this);
            }
            return this._childAdded;
        }

        /**
         * Back field for event
         */
        private _childRemoved: LatteEvent;

        /**
         * Gets an event raised when a child is removed
         *
         * @returns {LatteEvent}
         */
        get childRemoved(): LatteEvent{
            if(!this._childRemoved){
                this._childRemoved = new LatteEvent(this);
            }
            return this._childRemoved;
        }

        /**
         * Back field for event
         */
        private _childrenChanged: LatteEvent;

        /**
         * Gets an event raised when the children of the item changed
         *
         * @returns {LatteEvent}
         */
        get childrenChanged(): LatteEvent{
            if(!this._childrenChanged){
                this._childrenChanged = new LatteEvent(this);
            }
            return this._childrenChanged;
        }

        /**
         * Back field for event
         */
        private _childrenLoadStarted: LatteEvent;

        /**
         * Gets an event raised when the load of children starts
         *
         * @returns {LatteEvent}
         */
        get childrenLoadStarted(): LatteEvent{
            if(!this._childrenLoadStarted){
                this._childrenLoadStarted = new LatteEvent(this);
            }
            return this._childrenLoadStarted;
        }

        /**
         * Back field for event
         */
        private _childrenLoadEnd: LatteEvent;

        /**
         * Gets an event raised when the load of children ends
         *
         * @returns {LatteEvent}
         */
        get childrenLoadEnd(): LatteEvent{
            if(!this._childrenLoadEnd){
                this._childrenLoadEnd = new LatteEvent(this);
            }
            return this._childrenLoadEnd;
        }

        //endregion

        //region Properties

        /**
         * Field for children property
         */
       private _children:Collection<ExplorerItem>;

        /**
         * Gets the collection of child items of this item
         *
         * @returns {Collection<ExplorerItem>}
         */
        get children():Collection<ExplorerItem> {
            if (!this._children) {
                this._children = new Collection<ExplorerItem>(
                    (item: ExplorerItem) => { this.onChildAdded(item) },
                    (item: ExplorerItem) => { this.onChildRemoved(item) }
                );
            }
            return this._children;
        }

        /**
         * Property field
         */
       private _childrenLoaded:boolean = false;

        /**
         * Gets or sets a value indicating if the children is loaded
         *
         * @returns {boolean}
         */
        get childrenLoaded():boolean {
            return this._childrenLoaded;
        }

        /**
         * Gets or sets a value indicating if the children is loaded
         *
         * @param {boolean} value
         */
        set childrenLoaded(value:boolean) {
            this._childrenLoaded = value;
        }

        /**
         * Gets a value indicating if the node needs to load children, by analyzing its state
         *
         * @returns {boolean}
         */
        get childrenLoadNeeded():boolean {
            return this.loadsChildren && !this.childrenLoaded && !this.childrenLoaded;
        }

        /**
         * Property field
         */
       private _childrenPage:number = 1;

        /**
         * Gets or sets the current page of children
         *
         * @returns {number}
         */
        get childrenPage():number {
            return this._childrenPage;
        }

        /**
         * Gets or sets the current page of children
         *
         * @param {number} value
         */
        set childrenPage(value:number) {
            this._childrenPage = value;
        }

        /**
         * Property field
         */
       private _childrenPages: number = 0;

        /**
         * Gets or sets the total pages of children items
         *
         * @returns {number}
         */
        get childrenPages(): number{
            return this._childrenPages;
        }

        /**
         * Gets or sets the total pages of children items
         *
         * @param {number} value
         */
        set childrenPages(value: number){

            // Check if value changed
            var changed: boolean = value !== this._childrenPages;

            // Set value
            this._childrenPages = value;

            // Trigger changed event
            if(changed){
                this.onChildrenPagesChanged();
            }
        }

        /**
         * Back field for event
         */
        private _childrenPagesChanged: LatteEvent

        /**
         * Gets an event raised when the value of the childrenPages property changes
         *
         * @returns {LatteEvent}
         */
        get childrenPagesChanged(): LatteEvent{
            if(!this._childrenPagesChanged){
                this._childrenPagesChanged = new LatteEvent(this);
            }
            return this._childrenPagesChanged;
        }



        /**
         * Property field
         */
       private _explorer:ExplorerView = null;

        /**
         * Gets or sets the explorer view where the item lives
         *
         * @returns {ExplorerView}
         */
        get explorer():ExplorerView {
            return this._explorer;
        }

        /**
         * Gets or sets the explorer view where the item lives
         *
         * @param {ExplorerView} value
         */
        set explorer(value:ExplorerView) {
            this._explorer = value;

            for (var i = 0; i < this.children.length; i++) {
                this.children[i].explorer = value;
            }
        }

        /**
         * Property field
         */
       private _childrenLoading:boolean;

        /**
         * Gets a value indicating if children are being loaded
         *
         * @returns {boolean}
         */
        get childrenLoading():boolean {
            return this._childrenLoading;
        }

        /**
         * Property field
         */
       private _listViewItem: ListViewItem;

        /**
         * Gets the last created listview item
         *
         * @returns {ListViewItem}
         */
        get listViewItem(): ListViewItem {
            return this._listViewItem;
        }


        /**
         * Property field
         */
       private _loadsChildren:boolean = true;

        /**
         * Gets or sets a flag indicating if the item may load children for sub-items
         *
         * @returns {boolean}
         */
        get loadsChildren():boolean {
            return this._loadsChildren;
        }

        /**
         * Gets or sets a flag indicating if the item may load children for sub-items
         *
         * @param {boolean} value
         */
        set loadsChildren(value:boolean) {
            this._loadsChildren = value;
        }

        /**
         * Property field
         */
       private _loadsChildrenFolders:boolean = true;

        /**
         * Gets or sets a value indicating if the item will load items with sub-items.
         *
         * @returns {boolean}
         */
        get loadsChildrenFolders():boolean {
            return this._loadsChildrenFolders;
        }

        /**
         * Gets or sets a value indicating if the item will load items with sub-items.
         *
         * @param {boolean} value
         */
        set loadsChildrenFolders(value:boolean) {
            this._loadsChildrenFolders = value;
        }

        /**
         * Property field
         */
       private _parent:ExplorerItem = null;

        /**
         * Gets the parent item of this item
         *
         * @returns {ExplorerItem}
         */
        get parent():ExplorerItem {
            return this._parent;
        }

        /**
         * Property field
         */
       private _treeItem: TreeItem;

        /**
         * Gets the last created tree item
         *
         * @returns {TreeItem}
         */
        get treeItem(): TreeItem {
            return this._treeItem;
        }


        //endregion

    }

}