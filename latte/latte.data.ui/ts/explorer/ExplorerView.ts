/**
 * Created by josemanuel on 8/6/14.
 */
module latte {

    /**
     *
     */
    export class ExplorerView extends SplitView {

        //region Static
        //endregion

        //region Fields

        private ignorePageChange: boolean = false;
        //endregion

        /**
         *
         */
        constructor(rootItem: ExplorerItem = null) {
            super();

            //region Structure

            this.sideSize = 300;

            // Tree View Side
            var treeSide = new ToolbarView();
            this._treeViewToolbar = treeSide.toolbar;
            treeSide.view = this.treeView;

            // Detail View Side
            this.detailViewToolbarView.view = this.detailView;

            this.detailViewToolbar.items.add(this.btnSaveDetail);
            this.detailViewToolbar.sideItems.add(this.btnRemoveDetail);

            // ListView Side
            var listSide = new ToolbarView();
            this._listViewToolbar = listSide.toolbar;
            listSide.view = this.listView;

            this.listViewToolbar.sideItems.add(this.paginator);
            this.listViewToolbar.sideItems.add(this.btnRefresh);

            // Second split view
            this.detailSplitView.sideView = this.detailViewToolbarView;
            this.detailSplitView.view = listSide;

            // Set tree view side
            this.sideView = treeSide;
            this.view = this.detailSplitView;


            //endregion

            // TODO: Use it for something
            this.treeViewToolbar.visible = false;

            if(rootItem) {
                this.addRootItem(rootItem);
            }

        }

        //region Private Methods

        /**
         * Adds handlers to the item
         */
        private addTreeItemHandlers(treeItem: TreeItem){

            var item: ExplorerItem = treeItem.tag;

            // Tree items load request
            if (item.loadsChildrenFolders) {
                treeItem.loadItems.add(() => {

                    item.loadChildren(() => {

                        this.treeViewChildrenOf(item, treeItem);

                        if (treeItem.selected) {
                            this.listViewChildrenOf(item);
                        }

                        treeItem.reportItemsLoaded();
                    });
                });
            }

            // Tree item selection change
            treeItem.selectedChanged.add(() => {
                if(treeItem.selected) {

                    this._treeSelectedItem = item;


                    this.detailViewOf(item);

                    if (item.childrenLoaded) {
                        this.listViewChildrenOf(item);

                    }else if(!item.loadsChildrenFolders) {

                        item.loadChildren(() => {

                            if(treeItem.selected) {
                                this.listViewChildrenOf(item);
                            }

                        });

                    }


                }
            });

            // Children change reaction
            //item.childrenChanged.handlers = [];
            item.childrenChanged.add(() => {
                item.loadChildren(() => {

                    this.treeViewChildrenOf(item, treeItem);

                    if(treeItem.selected) {
                        this.listViewChildrenOf(item);
                    }

                    treeItem.reportItemsLoaded();
                });
            });


            item.childrenPagesChanged.add(() => {
                this.paginator.pages = item.childrenPages;
            });

        }

        /**
         * Loads the children of specified item into the listview
         * @param treeItem
         */
        private listViewChildrenOf(item: ExplorerItem){

            this.listView.items.clear();

            this.ignorePageChange = true;
            this.paginator.page = item.childrenPage;
            this.paginator.pages = item.childrenPages;
            this.ignorePageChange = false;

            // Load items into listview
            for (var i = 0; i < item.children.length; i++) {
                var gitem:ExplorerItem = item.children[i];

                // Create listview item
                var litem:ListViewItem = gitem.createListViewItem();
                litem.tag = gitem;

                // Add handlers to the item
                this.addListViewItemHandlers(litem);

                // Add to the listview
                this.listView.items.add(litem);
            }

            // Load items into the toolbar
            this.listViewToolbar.items.clear();
            this.listViewToolbar.items.addArray(item.getItems());



        }

        /**
         * Loads the children of specified item into its node
         * @param item
         */
        private treeViewChildrenOf(item: ExplorerItem, treeItem: TreeItem){
            treeItem.items.clear();

            // Convert children into nodes
            for (var i = 0; i < item.children.length; i++) {

                var gitem:ExplorerItem = item.children[i];

                if(gitem.loadsChildren) {
                    var gitemTree: TreeItem = gitem.createTreeItem();

                    this.addTreeItemHandlers(gitemTree);

                    treeItem.items.add(gitemTree);
                }
            }
        }

        /**
         * Assigns handlers to list view items
         * @param listItem
         */
        private addListViewItemHandlers(listItem: ListViewItem){

            var item: ExplorerItem = listItem.tag;

            listItem.selectedChanged.add(() => {
                if(listItem.selected) {
                    this.detailViewOf(item);
                }
            });

        }

        /**
         * Sets the detail view of the specified item, if any
         *
         * @param item
         */
        private detailViewOf(item: ExplorerItem){

            var view = item ? item.getDetailView() : null;

            //region Get rid of old view
            if(this.detailView.view) {
                var old = this.detailView.view;
                this.detailView.view = null;
                old.element.remove();
            }
            //endregion

            if(view) {
                this.detailView.view = view;

                this.btnSaveDetail.enabled = false;

                view.unsavedChangesChanged.add(() => {

                    //log("Unsaved changes changed")
                    //log("Unsaved changes " + view.unsavedChanges)

                    this.btnSaveDetail.enabled = view.unsavedChanges;

                });
            }

            if(item) {
                this.btnRemoveDetail.enabled = item.getCanBeDeleted();
            }

            this._listSelectedItem = item;

        }

        //endregion

        //region Methods

        /**
         * Adds a root item
         *
         * @param item
         */
        addRootItem(item: ExplorerItem){

            item.explorer = this;

            var node = item.createTreeItem();

            this.addTreeItemHandlers(node);

            this.treeView.items.add(node);

            if(this.treeView.items.length == 1) {
                node.selected = true;
            }

        }

        /**
         * Refreshes the children of the list
         */
        refreshList(){

            var item = this.listSelectedItem;
            var treeItem = this.treeView.selectedItem;

            item.childrenPage = this.paginator.page;
            item.onChildrenChanged();

            //this.listSelectedItem.loadChildren(() => {
            //
            //    this.treeViewChildrenOf(item, treeItem);
            //
            //    if(treeItem.selected) {
            //        this.listViewChildrenOf(item);
            //    }
            //
            //    treeItem.reportItemsLoaded();
            //});
        }
        //endregion

        //region Events
        //endregion

        //region Components

        /**
         * Field for btnSaveDetail property
         */
        private _btnSaveDetail:ButtonItem;

        /**
         * Gets the "save" button
         *
         * @returns {boolean}
         */
        public get btnSaveDetail():ButtonItem {
            if (!this._btnSaveDetail) {
                this._btnSaveDetail = new ButtonItem(strings.save, IconItem.standard(4, 2), () =>{
                    if(this.detailView.view) {
                        this.detailView.view.saveChanges();
                        //this.detailView.view.onSaveChanges();
                    }
                });
                this._btnSaveDetail.enabled = false;
            }
            return this._btnSaveDetail;
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
                this._btnRefresh = new ButtonItem(null, IconItem.refreshIcon(), () => {
                    this.refreshList()
                });
            }
            return this._btnRefresh;
        }

        /**
         * Field for btnRemoveDetail property
         */
        private _btnRemoveDetail:ButtonItem;

        /**
         * Gets the remove button
         *
         * @returns {ButtonItem}
         */
        public get btnRemoveDetail():ButtonItem {
            if (!this._btnRemoveDetail) {
                this._btnRemoveDetail = new ButtonItem(null, IconItem.standard(9, 1), () => {

                    DialogView.alert(sprintf(strings.confirmDeleteS, this.listSelectedItem.getName()), strings.cantBeUndone,
                    [
                        new ButtonItem(strings.cancel),

                        new ButtonItem(sprintf(strings.yesDeleteS, this.listSelectedItem.getName()), null, () => {

                            // Delete now
                            if(this.listSelectedItem instanceof ExplorerItemDataRecord) {
                                var r = (<ExplorerItemDataRecord<DataRecord>>this.listSelectedItem).record;

                                r.remove(() => {
                                    this.detailViewOf(null);

                                    if(this.treeSelectedItem) {
                                        this.treeSelectedItem.onChildrenChanged();
                                    }
                                });
                            }

                        })
                    ])

                });
            }
            return this._btnRemoveDetail;
        }

        /**
         * Field for detailSplitView property
         */
        private _detailSplitView:SplitView;

        /**
         * Gets the details split view
         *
         * @returns {SplitView}
         */
        get detailSplitView():SplitView {
            if (!this._detailSplitView) {
                this._detailSplitView = new SplitView();
                this._detailSplitView.side = Side.RIGHT;
                this._detailSplitView.sideSize = 400;
            }
            return this._detailSplitView;
        }

        /**
         * Field for detailViewToolbarView property
         */
        private _detailViewToolbarView:ToolbarView;

        /**
         * Gets the detail view toolbar view
         *
         * @returns {ToolbarView}
         */
        get detailViewToolbarView():ToolbarView {
            if (!this._detailViewToolbarView) {
                this._detailViewToolbarView = new ToolbarView();
            }
            return this._detailViewToolbarView;
        }


        /**
         * Gets the toolbar of the detail zone
         *
         * @returns {Toolbar}
         */
        public get detailViewToolbar():Toolbar {
            return this.detailViewToolbarView.toolbar;
        }

        /**
         * Property field
         */
        private _treeViewToolbar:Toolbar;

        /**
         * Gets the toolbar of the tree view
         *
         * @returns {Toolbar}
         */
        public get treeViewToolbar():Toolbar {
            return this._treeViewToolbar;
        }

        /**
         * Property field
         */
        private _listSelectedItem:ExplorerItem = null;

        /**
         * Gets the selected item on the list
         *
         * @returns {ExplorerItem}
         */
        public get listSelectedItem():ExplorerItem {
            return this._listSelectedItem;
        }

        /**
         * Property field
         */
        private _listViewToolbar:Toolbar;

        /**
         * Gets the toolbar of the list view
         *
         * @returns {Toolbar}
         */
        public get listViewToolbar():Toolbar {
            return this._listViewToolbar;
        }

        /**
         * Field for detailView property
         */
        private _detailView:View;

        /**
         * Gets the detail View
         *
         * @returns {View}
         */
        public get detailView():View {
            if (!this._detailView) {
                this._detailView = new View();
            }
            return this._detailView;
        }

        /**
         * Field for listView property
         */
        private _listView:ListView;

        /**
         * Gets the list view
         *
         * @returns {ListView}
         */
        public get listView():ListView {
            if (!this._listView) {
                this._listView = new ListView();
                this._listView.columnHeaders.add(new ColumnHeader(''))
            }
            return this._listView;
        }

        /**
         * Field for paginator property
         */
        private _paginator:PaginationItem;

        /**
         * Gets the pagination item
         *
         * @returns {PaginationItem}
         */
        public get paginator():PaginationItem {
            if (!this._paginator) {
                this._paginator = new PaginationItem();
                this._paginator.pageChanged.add(() => {
                    if(!this.ignorePageChange) {
                        this.refreshList();
                    }
                });
            }
            return this._paginator;
        }

        /**
         * Property field
         */
        private _treeSelectedItem:ExplorerItem;

        /**
         * Gets the selected item on the tree side
         *
         * @returns {ExplorerItem}
         */
        public get treeSelectedItem():ExplorerItem {
            return this._treeSelectedItem;
        }

        /**
         * Field for treeView property
         */
        private _treeView:TreeView;

        /**
         * Gets the tree view
         *
         * @returns {TreeView}
         */
        public get treeView():TreeView {
            if (!this._treeView) {
                this._treeView = new TreeView();
            }
            return this._treeView;
        }

        //endregion

        //region Properties



        //endregion

    }

}