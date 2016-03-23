/**
 * Created by josemanuel on 6/11/14.
 */
module latte {

    /**
     *
     */
    export class MainView extends ToolbarView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the Agenda View
         */
        constructor() {
            super();

            // Init Structure
            this.toolbar.items.add(this.btnNew);
            this.toolbar.sideItems.add(this.paginator);
            this.view = this.listView;

            // Load data
            this.loadList();
        }

        //region Private Methods

        private btnNew_Click(){

            var p = new Person();
            var d = new DataRecordDialogView(p);

            d.title = strings.newPerson;
            d.show();

            d.saved.add(() => { this.loadList() });

        }

        //endregion

        //region Methods

        /**
         * Loads the list of people in the agenda
         */
        loadList(){
            Person.search('').sendWithLoader(strings.loading, (p: PageResult<Person>) => {

                // Clear list
                this.listView.items.clear();

                this.paginator.page = p.page;
                this.paginator.pages = p.pages;

                for (var i = 0; i < p.records.length; i++) {
                    var person:Person = p.records[i];

                    var item = new ListViewItem(this.listView);
                    item.icon = IconItem.standard(2, 1);
                    item.setText(0, person.name);
                    item.setText(1, person.lastname);
                    item.setText(2, person.sex == 1 ? 'F' : 'M');
                    item.setText(3, person.birth);
                }
            });
        }

        //endregion

        //region Events
        //endregion

        //region Components

        /**
         * Field for btnNew property
         */
        private _btnNew:ButtonItem;

        /**
         * Gets the "New" Button
         *
         * @returns {ButtonItem}
         */
        public get btnNew():ButtonItem {
            if (!this._btnNew) {
                this._btnNew = new ButtonItem(strings.newPerson, IconItem.standard(2, 1), () => { this.btnNew_Click() });
            }
            return this._btnNew;
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
                this._paginator.pageChanged.add(() => { this.loadList() });
            }
            return this._paginator;
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
                this._listView.columnHeaders.addArray([
                    new ColumnHeader(strings.lastName),
                    new ColumnHeader(strings.name),
                    new ColumnHeader(strings.sex),
                    new ColumnHeader(strings.birth)
                ]);
            }
            return this._listView;
        }


        //endregion

        //region Properties
        //endregion

    }

}