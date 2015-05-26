var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var latte;
(function (latte) {
    var personBase = (function (_super) {
        __extends(personBase, _super);
        function personBase() {
            _super.apply(this, arguments);
            /* Name of Php record */
            this._recordType = 'Person';
            /* Name of Module where record lives*/
            this._moduleName = '_app';
        }
        /**
        * Gets the name of the autoincrement field
        **/
        personBase.prototype.onGetRecordIdName = function () {
            return 'idperson';
        };
        /*
         * Remote Method.
 Searches for persons in the database


         */
        personBase.search = function (term, page, pageSize) {
            if (term === void 0) { term = ''; }
            if (page === void 0) { page = 1; }
            if (pageSize === void 0) { pageSize = 50; }
            return new latte.RemoteCall('_app', 'Person', 'search', { term: term, page: page, pageSize: pageSize });
        };
        return personBase;
    })(latte.DataRecord);
    latte.personBase = personBase;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 6/11/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Main = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function Main() {
            latte.View.mainView = new latte.MainView();
        }
        return Main;
    })();
    latte.Main = Main;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 6/11/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var MainView = (function (_super) {
        __extends(MainView, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the Agenda View
         */
        function MainView() {
            _super.call(this);
            // Init Structure
            this.toolbar.items.add(this.btnNew);
            this.toolbar.sideItems.add(this.paginator);
            this.view = this.listView;
            // Load data
            this.loadList();
        }
        //region Private Methods
        MainView.prototype.btnNew_Click = function () {
            var _this = this;
            var p = new latte.Person();
            var d = new latte.DataRecordDialogView(p);
            d.show();
            d.saved.add(function () {
                _this.loadList();
            });
        };
        //endregion
        //region Methods
        /**
         * Loads the list of people in the agenda
         */
        MainView.prototype.loadList = function () {
            var _this = this;
            latte.Person.search('').sendWithLoader(strings.loading, function (p) {
                // Clear list
                _this.listView.items.clear();
                _this.paginator.page = p.page;
                _this.paginator.pages = p.pages;
                for (var i = 0; i < p.records.length; i++) {
                    var person = p.records[i];
                    var item = new latte.ListViewItem(_this.listView);
                    item.icon = latte.IconItem.standard(2, 1);
                    item.setText(0, person.name);
                    item.setText(1, person.lastname);
                    item.setText(2, person.sex == 1 ? 'F' : 'M');
                    item.setText(3, person.birth);
                }
            });
        };
        Object.defineProperty(MainView.prototype, "btnNew", {
            /**
             * Gets the "New" Button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnNew) {
                    this._btnNew = new latte.ButtonItem(strings.newPerson, latte.IconItem.standard(2, 1), function () {
                        _this.btnNew_Click();
                    });
                }
                return this._btnNew;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainView.prototype, "paginator", {
            /**
             * Gets the pagination item
             *
             * @returns {PaginationItem}
             */
            get: function () {
                var _this = this;
                if (!this._paginator) {
                    this._paginator = new latte.PaginationItem();
                    this._paginator.pageChanged.add(function () {
                        _this.loadList();
                    });
                }
                return this._paginator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainView.prototype, "listView", {
            /**
             * Gets the list view
             *
             * @returns {ListView}
             */
            get: function () {
                if (!this._listView) {
                    this._listView = new latte.ListView();
                    this._listView.columnHeaders.addArray([
                        new latte.ColumnHeader(strings.lastName),
                        new latte.ColumnHeader(strings.name),
                        new latte.ColumnHeader(strings.sex),
                        new latte.ColumnHeader(strings.birth)
                    ]);
                }
                return this._listView;
            },
            enumerable: true,
            configurable: true
        });
        return MainView;
    })(latte.ToolbarView);
    latte.MainView = MainView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 6/11/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Person = (function (_super) {
        __extends(Person, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function Person() {
            _super.call(this);
        }
        //region Private Methods
        //endregion
        //region Methods
        Person.prototype.getMetadata = function () {
            return {
                fields: {
                    name: {
                        text: strings.name
                    },
                    lastname: {
                        text: strings.lastName
                    },
                    sex: {
                        text: strings.sex,
                        type: 'enumeration',
                        options: ['M', 'F']
                    },
                    birth: {
                        text: strings.birth,
                        type: 'date'
                    }
                }
            };
        };
        return Person;
    })(latte.personBase);
    latte.Person = Person;
})(latte || (latte = {}));
