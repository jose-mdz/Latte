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
            this._moduleName = 'app.contacts';
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
        personBase.search = function (options, page, pageSize) {
            if (page === void 0) { page = 1; }
            if (pageSize === void 0) { pageSize = 50; }
            return new latte.RemoteCall('app.contacts', 'Person', 'search', { options: options, page: page, pageSize: pageSize });
        };
        return personBase;
    })(latte.DataRecord);
    latte.personBase = personBase;
    var categoryBase = (function (_super) {
        __extends(categoryBase, _super);
        function categoryBase() {
            _super.apply(this, arguments);
            /* Name of Php record */
            this._recordType = 'Category';
            /* Name of Module where record lives*/
            this._moduleName = 'app.contacts';
        }
        /**
        * Gets the name of the autoincrement field
        **/
        categoryBase.prototype.onGetRecordIdName = function () {
            return 'idcategory';
        };
        /*
         * Remote Method.

         */
        categoryBase.fullCatalog = function () {
            return new latte.RemoteCall('app.contacts', 'Category', 'fullCatalog', {});
        };
        return categoryBase;
    })(latte.DataRecord);
    latte.categoryBase = categoryBase;
})(latte || (latte = {}));
var latte;
(function (latte) {
    var ContactsMainViewBase = (function (_super) {
        __extends(ContactsMainViewBase, _super);
        function ContactsMainViewBase() {
            _super.call(this, latte.Element.fromBank('ContactsMainViewBase'));
        }
        Object.defineProperty(ContactsMainViewBase.prototype, "detailHeader", {
            get: function () {
                if (!this._detailHeader) {
                    this._detailHeader = new latte.Element(this.find('[data-property=detailHeader]'));
                }
                return this._detailHeader;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "detailRows", {
            get: function () {
                if (!this._detailRows) {
                    this._detailRows = new latte.Element(this.find('[data-property=detailRows]'));
                }
                return this._detailRows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "detailToolbar", {
            get: function () {
                if (!this._detailToolbar) {
                    this._detailToolbar = new latte.Element(this.find('[data-property=detailToolbar]'));
                }
                return this._detailToolbar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "lblDescription", {
            get: function () {
                if (!this._lblDescription) {
                    this._lblDescription = new latte.Element(this.find('[data-property=lblDescription]'));
                }
                return this._lblDescription;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "lblFullname", {
            get: function () {
                if (!this._lblFullname) {
                    this._lblFullname = new latte.Element(this.find('[data-property=lblFullname]'));
                }
                return this._lblFullname;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "lblInitials", {
            get: function () {
                if (!this._lblInitials) {
                    this._lblInitials = new latte.Element(this.find('[data-property=lblInitials]'));
                }
                return this._lblInitials;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "listGroups", {
            get: function () {
                if (!this._listGroups) {
                    this._listGroups = new latte.Element(this.find('[data-property=listGroups]'));
                }
                return this._listGroups;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "listPeople", {
            get: function () {
                if (!this._listPeople) {
                    this._listPeople = new latte.Element(this.find('[data-property=listPeople]'));
                }
                return this._listPeople;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "panelDetail", {
            get: function () {
                if (!this._panelDetail) {
                    this._panelDetail = new latte.Element(this.find('[data-property=panelDetail]'));
                }
                return this._panelDetail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainViewBase.prototype, "txtSearch", {
            get: function () {
                if (!this._txtSearch) {
                    this._txtSearch = new latte.Textbox(this.find('[data-property=txtSearch]'));
                }
                return this._txtSearch;
            },
            enumerable: true,
            configurable: true
        });
        ContactsMainViewBase.getModel = function () {
            if (!this._Model) {
                this._Model = new latte.Element(latte.Element.find('[data-class=ContactsMainViewBase]'));
            }
            return this._Model;
        };
        return ContactsMainViewBase;
    })(latte.Element);
    latte.ContactsMainViewBase = ContactsMainViewBase;
})(latte || (latte = {}));
var latte;
(function (latte) {
    var ListItem = (function (_super) {
        __extends(ListItem, _super);
        function ListItem() {
            _super.call(this, latte.Element.fromBank('ListItem'));
        }
        ListItem.getModel = function () {
            if (!this._Model) {
                this._Model = new latte.Element(latte.Element.find('[data-class=ListItem]'));
            }
            return this._Model;
        };
        return ListItem;
    })(latte.Element);
    latte.ListItem = ListItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    var ListItemHeader = (function (_super) {
        __extends(ListItemHeader, _super);
        function ListItemHeader() {
            _super.call(this, latte.Element.fromBank('ListItemHeader'));
        }
        ListItemHeader.getModel = function () {
            if (!this._Model) {
                this._Model = new latte.Element(latte.Element.find('[data-class=ListItemHeader]'));
            }
            return this._Model;
        };
        return ListItemHeader;
    })(latte.Element);
    latte.ListItemHeader = ListItemHeader;
})(latte || (latte = {}));
var latte;
(function (latte) {
    var ContactDataRowBase = (function (_super) {
        __extends(ContactDataRowBase, _super);
        function ContactDataRowBase() {
            _super.call(this, latte.Element.fromBank('ContactDataRowBase'));
        }
        Object.defineProperty(ContactDataRowBase.prototype, "lblName", {
            get: function () {
                if (!this._lblName) {
                    this._lblName = new latte.Element(this.find('[data-property=lblName]'));
                }
                return this._lblName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactDataRowBase.prototype, "lblValue", {
            get: function () {
                if (!this._lblValue) {
                    this._lblValue = new latte.Element(this.find('[data-property=lblValue]'));
                }
                return this._lblValue;
            },
            enumerable: true,
            configurable: true
        });
        ContactDataRowBase.getModel = function () {
            if (!this._Model) {
                this._Model = new latte.Element(latte.Element.find('[data-class=ContactDataRowBase]'));
            }
            return this._Model;
        };
        return ContactDataRowBase;
    })(latte.Element);
    latte.ContactDataRowBase = ContactDataRowBase;
})(latte || (latte = {}));
var latte;
(function (latte) {
    latte.globalViewsBank = {
        "ContactsMainViewBase": "<div data-class=\"ContactsMainViewBase\" class=\"contacts-ui\">\n\n    <!-- GROUPS PANEL -->\n    <div data-property=\"listGroups\" class=\"panel-groups\">\n        \n        \n        <div class=\"list-item\">All iCloud</div>\n        <div class=\"list-item\">Don Mueble</div>\n        <div class=\"list-item-header\">Facebook</div>\n        <div class=\"list-item\">All Facebook</div>\n        <div class=\"list-item-header\">Smart Groups</div>\n        <div class=\"list-item\">Last Import</div>\n    </div>\n\n    <!-- NAMES LIST PANEL -->\n    <div class=\"panel-list\">\n        <div class=\"search-box\">\n            <input data-property=\"txtSearch\" type=\"text\" placeholder=\"Search\">\n        </div>\n\n        <div data-property=\"listPeople\" class=\"list\">\n            <div class=\"no-items\">No contacts found</div>\n            <div class=\"list-item-header\">A</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item selected\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item-header\">B</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item-header\">D</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n        </div>\n    </div>\n\n    <!-- CONTACT DETAIL PANEL -->\n    <div data-property=\"panelDetail\" class=\"panel-detail\">\n        <div data-property=\"detailHeader\" class=\"header\">\n            <div class=\"picture-side\">\n                <div class=\"picture\">\n                    <div data-property=\"lblInitials\">AJ</div>\n                </div>\n            </div>\n            <div class=\"name-side\">\n                <div data-property=\"lblFullname\" class=\"name\">Alchemist Joe</div>\n                <div data-property=\"lblDescription\" class=\"description\">Superworks, Inc.</div>\n            </div>\n        </div>\n        <div data-property=\"detailRows\" class=\"rows\">\n            \n            <div class=\"data\">\n                <div class=\"name\">mobile</div>\n                <div class=\"value\">+(54) 123456789</div>\n            </div>\n            <div class=\"data\">\n                <div class=\"name\">address</div>\n                <div class=\"value\">Elm Street 1090, TX, PA 9875</div>\n            </div>\n            <div class=\"data\">\n                <div class=\"name\">note</div>\n                <div class=\"value\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat molestie enim, vel viverra odio malesuada quis. Nulla gravida vulputate nulla, non egestas elit pretium et. </div>\n            </div>\n        </div>\n        <div data-property=\"detailToolbar\" class=\"toolbar\">\n            <div class=\"button btn-add\">+</div>\n            <div class=\"button btn-export\">...</div>\n            <div class=\"button btn-edit\">Edit</div>\n        </div>\n    </div>\n</div>",
        "ListItem": "<div class=\"list-item\" data-class=\"ListItem\">All Contacts</div>",
        "ListItemHeader": "<div class=\"list-item-header\" data-class=\"ListItemHeader\">iCloud</div>",
        "ContactDataRowBase": "<div class=\"data\" data-class=\"ContactDataRowBase\">\n                <div data-property=\"lblName\" class=\"name\">phone</div>\n                <div data-property=\"lblValue\" class=\"value\">+(55) 123456789</div>\n            </div>"
    };
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/27/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ContactDataRow = (function (_super) {
        __extends(ContactDataRow, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function ContactDataRow() {
            _super.call(this);
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._editable = false;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>editable</c> event
         */
        ContactDataRow.prototype.onEditableChanged = function () {
            if (this._editableChanged) {
                this._editableChanged.raise();
            }
            if (this.editable) {
                this.lblValue.element.contentEditable = 'yes';
            }
            else {
                this.lblValue.element.contentEditable = 'no';
            }
        };
        Object.defineProperty(ContactDataRow.prototype, "editableChanged", {
            /**
             * Gets an event raised when the value of the editable property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._editableChanged) {
                    this._editableChanged = new latte.LatteEvent(this);
                }
                return this._editableChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactDataRow.prototype, "editable", {
            /**
             * Gets or sets a value indicating if the row is in editable mode
             *
             * @returns {boolean}
             */
            get: function () {
                return this._editable;
            },
            /**
             * Gets or sets a value indicating if the row is in editable mode
             *
             * @param {boolean} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._editable;
                // Set value
                this._editable = value;
                // Trigger changed event
                if (changed) {
                    this.onEditableChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        return ContactDataRow;
    })(latte.ContactDataRowBase);
    latte.ContactDataRow = ContactDataRow;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/27/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ContactsMainView = (function (_super) {
        __extends(ContactsMainView, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the view
         */
        function ContactsMainView() {
            _super.call(this);
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._selectedCategory = null;
            /**
             * Property field
             */
            this._editMode = null;
            /**
             * Property field
             */
            this._person = null;
            this.loadCategories();
            this.loadContacts();
        }
        //region Private Methods
        //endregion
        //region Methods
        ContactsMainView.prototype.loadCategories = function () {
            var _this = this;
            this.listGroups.clear();
            latte.Category.fullCatalog().send(function (cats) {
                var groups = {};
                for (var i = 0; i < cats.length; i++) {
                    var c = cats[i];
                    if (latte._undef(groups[c.group])) {
                        groups[c.group] = [];
                    }
                    groups[c.group].push(c);
                }
                for (var g in groups) {
                    (function (g) {
                        var array = groups[g];
                        // Sort categories
                        array.sort(function (a, b) {
                            return a.i - b.i;
                        });
                        var groupItem = new latte.ListItemHeader();
                        groupItem.text = g;
                        _this.listGroups.add(groupItem);
                        for (var i = 0; i < array.length; i++) {
                            var item = new latte.ListItem();
                            item.text = array[i].name;
                            _this.listGroups.add(item);
                        }
                    })(g);
                }
            });
        };
        ContactsMainView.prototype.loadContacts = function () {
            var _this = this;
            this.listPeople.clear();
            var opts = {};
            if (this.selectedCategory instanceof latte.Category) {
                opts.idcategory = this.selectedCategory.idcategory;
            }
            if (this.txtSearch.value.length > 0) {
                opts.text = this.txtSearch.value;
            }
            latte.Person.search(opts, 1, 50).send(function (p) {
                var groups = {};
                for (var i = 0; i < p.records.length; i++) {
                    (function (person) {
                        if (latte._undef(groups[person.charForIndex])) {
                            groups[person.charForIndex] = [];
                        }
                        groups[person.charForIndex].push(person);
                    })(p.records[i]);
                }
                //endregion
                //region Alert if no matches
                if (p.records.length == 0) {
                    var noItems = new latte.Element(document.createElement('div'));
                    noItems.addClass('no-items');
                    noItems.text = strings.noContacts;
                    _this.listPeople.add(noItems);
                }
                for (var g in groups) {
                    var array = groups[g];
                    var groupItem = new latte.ListItemHeader();
                    groupItem.text = g;
                    for (var i = 0; i < array.length; i++) {
                        (function (person) {
                            var item = new latte.ListItem();
                            item.text = person.fullName;
                            _this.listPeople.add(item);
                        })(array[i]);
                    }
                }
            });
        };
        /**
         * Raises the <c>editMode</c> event
         */
        ContactsMainView.prototype.onEditModeChanged = function () {
            if (this._editModeChanged) {
                this._editModeChanged.raise();
            }
            this.detailHeader.visible = this.editMode;
            if (this.editMode) {
            }
        };
        /**
         * Raises the <c>person</c> event
         */
        ContactsMainView.prototype.onPersonChanged = function () {
            if (this._personChanged) {
                this._personChanged.raise();
            }
        };
        /**
         * Raises the <c>selectedCategory</c> event
         */
        ContactsMainView.prototype.onSelectedCategoryChanged = function () {
            if (this._selectedCategoryChanged) {
                this._selectedCategoryChanged.raise();
            }
        };
        Object.defineProperty(ContactsMainView.prototype, "editModeChanged", {
            /**
             * Gets an event raised when the value of the editMode property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._editModeChanged) {
                    this._editModeChanged = new latte.LatteEvent(this);
                }
                return this._editModeChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainView.prototype, "personChanged", {
            /**
             * Gets an event raised when the value of the person property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._personChanged) {
                    this._personChanged = new latte.LatteEvent(this);
                }
                return this._personChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainView.prototype, "selectedCategoryChanged", {
            /**
             * Gets an event raised when the value of the selectedCategory property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._selectedCategoryChanged) {
                    this._selectedCategoryChanged = new latte.LatteEvent(this);
                }
                return this._selectedCategoryChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainView.prototype, "selectedCategory", {
            /**
             * Gets or sets the currently selected category, if any.
             *
             * @returns {Category}
             */
            get: function () {
                return this._selectedCategory;
            },
            /**
             * Gets or sets the currently selected category, if any.
             *
             * @param {Category} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._selectedCategory;
                // Set value
                this._selectedCategory = value;
                // Trigger changed event
                if (changed) {
                    this.onSelectedCategoryChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainView.prototype, "editMode", {
            /**
             * Gets or sets a value indicating if the view is in edit mode
             *
             * @returns {boolean}
             */
            get: function () {
                return this._editMode;
            },
            /**
             * Gets or sets a value indicating if the view is in edit mode
             *
             * @param {boolean} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._editMode;
                // Set value
                this._editMode = value;
                // Trigger changed event
                if (changed) {
                    this.onEditModeChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactsMainView.prototype, "person", {
            /**
             * Gets or sets the person of the detail zone
             *
             * @returns {Person}
             */
            get: function () {
                return this._person;
            },
            /**
             * Gets or sets the person of the detail zone
             *
             * @param {Person} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._person;
                // Set value
                this._person = value;
                // Trigger changed event
                if (changed) {
                    this.onPersonChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        return ContactsMainView;
    })(latte.ContactsMainViewBase);
    latte.ContactsMainView = ContactsMainView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/27/15.
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
            document.body.appendChild((new latte.ContactsMainView()).element);
        }
        return Main;
    })();
    latte.Main = Main;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/27/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Category = (function (_super) {
        __extends(Category, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function Category() {
            _super.call(this);
        }
        return Category;
    })(latte.categoryBase);
    latte.Category = Category;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/27/15.
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
        Object.defineProperty(Person.prototype, "charForIndex", {
            //region Private Methods
            //endregion
            //region Methods
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Gets the character for indexing the contact
             *
             * @returns {string}
             */
            get: function () {
                var f = String(this.name);
                var l = String(this.lastname);
                if (l.length > 0) {
                    return l.charAt(0).toUpperCase();
                }
                else if (f.length > 0) {
                    return l.charAt(0).toUpperCase();
                }
                else {
                    return strings.noName;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Person.prototype, "fullName", {
            /**
             * Gets the full name of the person
             *
             * @returns {string}
             */
            get: function () {
                return [this.name, this.lastname].join(' ');
            },
            enumerable: true,
            configurable: true
        });
        return Person;
    })(latte.personBase);
    latte.Person = Person;
})(latte || (latte = {}));
