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

        private detailViewItem: ExplorerItem = null;

        /**
         * Saves the milliseconds that the last 100 times lasted
         * @type {Array}
         */
        private loadTimes: number[] = [];

        /**
         * Stores the prediction (in milliseconds) of next load
         * @type {number}
         */
        private nextLoadTimePrediction: number = 800;

        //endregion

        /**
         *
         */
        constructor(rootItem: ExplorerItem = null) {
            super();

            this.addClass('explorer');

            //region Structure

            this.sideSize = 300;

            // Tree View Side
            let treeSide = new ToolbarView();
            this._treeViewToolbar = treeSide.toolbar;
            treeSide.view = this.treeView;

            // Detail View Side
            this.detailViewToolbarView.view = this.detailView;

            this.detailViewToolbar.items.add(this.btnSaveDetail);
            this.detailViewToolbar.sideItems.add(this.btnRemoveDetail);

            // ListView Side
            let listSide = this.childrenSide;
            this._listViewToolbar = listSide.toolbar;
            listSide.view = this.listView;
            this.listView.element.append(this.loadBar);

            this.listViewToolbar.sideItems.add(this.btnHideDetailBar);
            this.listViewToolbar.sideItems.add(this.paginator);
            this.listViewToolbar.sideItems.add(this.btnRefresh);

            // Hide paginator by default
            this.paginator.visible = false;

            // Second split view
            this.detailSplitView.sideView = this.detailViewToolbarView;
            this.detailSplitView.view = listSide;

            // Set tree view side
            this.sideView = treeSide;
            this.view = this.detailSplitView;


            //endregion

            // TODO: Use it for something?
            this.treeViewToolbar.visible = false;

            if(rootItem) {
                this.addRootItem(rootItem);
            }

        }

        //region Private Methods

        /**
         * Adds a loading time for criteria enrichment
         * @param time
         */
        private addLoadingTime(time: TimeSpan){

            this.loadTimes.push(time.totalMilliseconds);


            if(this.loadTimes.length > 100){
                this.loadTimes.pop();
            }
            let sum = 0;

            this.loadTimes.forEach((t) => sum += t );
            this.nextLoadTimePrediction = Math.round(sum / this.loadTimes.length);


            // log(sprintf("New Time: %s \t Next Prediction: %s", time.totalMilliseconds, this.nextLoadTimePrediction));
        }

        /**
         * Adds handlers to the item
         */
        private addTreeItemHandlers(treeItem: TreeItem){

            var item: ExplorerItem = treeItem.tag;

            // Tree items load request
            if (item.loadsChildrenFolders) {
                treeItem.loadItems.add(() => {

                    this.loadChildrenOf(item, () => {

                        this.treeViewChildrenOf(item, treeItem);

                        if (treeItem.selected) {
                            this.childrenViewOf(item);
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
                        this.paginator.visible = item.childrenPages > 1;
                        this.childrenViewOf(item);

                    }else if(!item.loadsChildrenFolders) {

                        this.loadChildrenOf(item, () => {

                            if(treeItem.selected) {
                                this.paginator.visible = item.childrenPages > 1;
                                this.childrenViewOf(item);
                            }

                        });

                    }


                }
            });

            // Children change reaction
            //item.childrenChanged.handlers = [];
            item.childrenChanged.add(() => {

                this.loadChildrenOf(item, () => {

                    this.treeViewChildrenOf(item, treeItem);

                    if(treeItem.selected) {
                        this.childrenViewOf(item);
                    }

                    treeItem.reportItemsLoaded();
                });
            });


            item.childrenPagesChanged.add(() => {
                this.paginator.pages = item.childrenPages;
            });

        }

        /**
         * Loads the children of the specified item into the children view
         * @param item
         */
        private childrenViewOf(item: ExplorerItem){

            let view = item.getChildrenView();

            // Load items into the toolbar
            this.listViewToolbar.items.clear();
            this.listViewToolbar.items.addArray(item.getItems());

            if(view) {
                view.explorerItem = item;
                this.childrenSide.view = view;
                view.onShowChildren();
            }else{
                this.childrenSide.view = this.listView;
                this.listViewChildrenOf(item);
            }

        }

        /**
         * Loads the children of specified item into the listview
         * @param treeItem
         */
        private listViewChildrenOf(item: ExplorerItem){

            // Column headers
            this.listView.columnHeaders.clear();
            this.listView.columnHeaders.addArray(item.getColumnHeaders());

            this.ignorePageChange = true;
            this.paginator.page = item.childrenPage;
            this.paginator.pages = item.childrenPages;
            this.ignorePageChange = false;

            this.listView.items.clear();

            // Load items into listview
            for (let i = 0; i < item.children.length; i++) {
                let gitem:ExplorerItem = item.children[i];

                // Create listview item
                let litem:ListViewItem = gitem.createListViewItem();
                litem.listView = this.listView;
                litem.tag = gitem;

                // Add handlers to the item
                this.addListViewItemHandlers(litem);

                // Add to the listview
                this.listView.items.add(litem);
            }

        }

        /**
         * Loads the children of the specified item, and passes the callback when done
         * This method does not place the children into the list.
         * @param item
         * @param callback
         */
        private loadChildrenOf(item: ExplorerItem, callback: () => any){

            let loaded = false;
            let preventiveAnimationFinished = false;
            let barFinihsed = false;

            let finishBar = () => {

                bar.animate({
                    width: '100%'
                }, 50, null, () => {

                    barFinihsed = true;
                    bar.fadeOut(() => {
                        bar.css('display', 'none');
                        bar.removeClass('visible')
                    });
                });
            };

            // Clear items off list
            this.listView.items.clear();

            // Show load bar
            let bar = $(this.loadBar);
            let started = DateTime.now;
            bar.addClass('visible');
            bar.show();
            bar.css('width', '1px');
            bar.animate({
                width: '90%'
            }, this.nextLoadTimePrediction, null, () => {
                preventiveAnimationFinished = true;

                if(loaded) {
                    finishBar();
                }
            });

            item.loadChildren(() => {

                // Data has been loaded
                loaded = true;

                // Register the loading time
                this.addLoadingTime(DateTime.now.subtractDate(started));

                // If preventive animation finished
                if(preventiveAnimationFinished) {
                    finishBar();
                }

                callback();
            });
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
                    this._listSelectedItem = item;
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

            let view = item ? item.getDetailView() : null;

            if(view){
                view.unsavedChangesChanged.add(() => {

                    if(!view.unsavedChanges) {
                        item.syncUI();
                    }

                });
            }

            this.setDetailView(view);

            if(item) {
                // TODO: Temproarily removed delete button
                this.btnRemoveDetail.visible = false;
                // this.btnRemoveDetail.enabled = item.getCanBeDeleted();
            }

            this.detailViewItem = item;

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

            var treeItem = this.treeView.selectedItem;
            var item:ExplorerItem = <any>treeItem.tag;

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

        /**
         * Sets the detail view
         * @param {latte.View} view
         */
        setDetailView(view: View){

            //region Get rid of old view
            if(this.detailView.view) {
                let old = this.detailView.view;
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

                view.isSavingChangesChanged.add(() => {

                    // log(`Saving Changes Changed`);
                    // debugger;

                    this.btnSaveDetail.text = view.isSavingChanges ? strings.saving : strings.save;
                    this.btnSaveDetail.enabled = !view.isSavingChanges && view.unsavedChanges;

                });

                // log(`Adding handler`);

            }

        }

        //endregion

        //region Events
        //endregion

        //region Components

        /**
         * Field for btnHideDetailBar property
         */
        private _btnHideDetailBar: ButtonItem;

        /**
         * Gets the hide sidebar button
         *
         * @returns {ButtonItem}
         */
        get btnHideDetailBar(): ButtonItem {
            if (!this._btnHideDetailBar) {
                let lazy: ButtonItem = this._btnHideDetailBar = new ButtonItem(null, IconItem.sidebarRight(),
                    () => this.detailVisible = !this.detailVisible);
                lazy.visible = false;
            }
            return this._btnHideDetailBar;
        }

        /**
         * Field for btnSaveDetail property
         */
        private _btnSaveDetail:ButtonItem;

        /**
         * Gets the "save" button
         *
         * @returns {boolean}
         */
        get btnSaveDetail():ButtonItem {
            if (!this._btnSaveDetail) {
                this._btnSaveDetail = new ButtonItem(strings.save, IconItem.saveIcon(), () =>{
                    if(this.detailView.view) {
                        this.detailView.view.saveChanges();
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
        get btnRemoveDetail():ButtonItem {
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
         * Field for childrenSide property
         */
        private _childrenSide: ToolbarView;

        /**
         * Gets the children side view
         *
         * @returns {ToolbarView}
         */
        get childrenSide(): ToolbarView {
            if (!this._childrenSide) {
                this._childrenSide = new ToolbarView();
            }
            return this._childrenSide;
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
        get detailViewToolbar():Toolbar {
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
        get treeViewToolbar():Toolbar {
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
        get listSelectedItem():ExplorerItem {
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
        get listViewToolbar():Toolbar {
            return this._listViewToolbar;
        }

        /**
         * Field for loadBar property
         */
        private _loadBar: HTMLDivElement;

        /**
         * Gets the load bar
         *
         * @returns {HTMLDivElement}
         */
        get loadBar(): HTMLDivElement {
            if (!this._loadBar) {
                this._loadBar = document.createElement('div');
                this._loadBar.className = 'load-bar';
            }
            return this._loadBar;
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
        get detailView():View {
            if (!this._detailView) {
                this._detailView = new View();
                this._detailView.addClass('explorer-detail-view');
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
        get listView():ListView {
            if (!this._listView) {
                this._listView = new ListView();
                this._listView.columnHeaders.add(new ColumnHeader(''));
                this._listView.focusable = true;
                this._listView.focused.add(() => {
                    if(this._listSelectedItem && this._listSelectedItem != this.detailViewItem) {
                        this.detailViewOf(this._listSelectedItem);
                    }
                });
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
        get paginator():PaginationItem {
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
        get treeSelectedItem():ExplorerItem {
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
        get treeView():TreeView {
            if (!this._treeView) {
                this._treeView = new TreeView();
                this._treeView.focusable = true;
                this._treeView.focused.add(() => {
                    if(this._treeSelectedItem && this._treeSelectedItem != this.detailViewItem) {
                        this.detailViewOf(this._treeSelectedItem);
                    }
                });
            }
            return this._treeView;
        }

        //endregion

        //region Properties

        /**
         * Gets or sets a value indicating if the detail view is currently visible
         *
         * @returns {boolean}
         */
        get detailVisible(): boolean {
            return this.detailSplitView.sideVisible;
        }

        /**
         * Gets or sets a value indicating if the detail view is currently visible
         *
         * @param {boolean} value
         */
        set detailVisible(value: boolean) {
            this.detailSplitView.sideVisible = value;
        }


        //endregion

    }

}