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
            /* Name of Module where record lives */
            this._moduleName = 'app.list';
            /**
             * Database field: int(11)
             */
            this._idperson = null;
            /**
             * Database field: int(11)
             */
            this._idcategory = null;
            /**
             * Database field: varchar(128)
             */
            this._title = null;
            /**
             * Database field: varchar(128)
             */
            this._name = null;
            /**
             * Database field: varchar(128)
             */
            this._lastname = null;
            /**
             * Database field: date
             */
            this._birth = null;
            /**
             * Database field: varchar(10)
             */
            this._sex = null;
            /**
             * Database field: varchar(255)
             */
            this._address = null;
            /**
             * Database field: varchar(128)
             */
            this._phone = null;
            /**
             * Database field: varchar(128)
             */
            this._mobile = null;
            /**
             * Database field: text
             */
            this._note = null;
            /**
             * Database field: varchar(128)
             */
            this._company = null;
            /**
             * Database field: varchar(128)
             */
            this._email = null;
        }
        Object.defineProperty(personBase.prototype, "idperson", {
            /**
             * Gets or sets the value of the idperson field of type int(11)
             */
            get: function () {
                return this._idperson;
            },
            /**
             * Gets or sets the value of the idperson field of type int(11)
             */
            set: function (value) {
                var changed = value !== this._idperson;
                this._idperson = value;
                if (changed) {
                    this.onIdpersonChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "idpersonChanged", {
            /**
             * Gets an event raised when the value of the idperson property changes
             */
            get: function () {
                if (!this._idpersonChanged) {
                    this._idpersonChanged = new latte.LatteEvent(this);
                }
                return this._idpersonChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>idpersonChanged</c> event
         */
        personBase.prototype.onIdpersonChanged = function () {
            if (this._idpersonChanged) {
                this._idpersonChanged.raise();
            }
            this.onFieldValueChanged('idperson', this.idperson);
        };
        /**
        * Gets the name of the autoincrement field
        **/
        personBase.prototype.onGetRecordIdName = function () {
            return 'idperson';
        };
        Object.defineProperty(personBase.prototype, "idcategory", {
            /**
             * Gets or sets the value of the idcategory field of type int(11)
             */
            get: function () {
                return this._idcategory;
            },
            /**
             * Gets or sets the value of the idcategory field of type int(11)
             */
            set: function (value) {
                var changed = value !== this._idcategory;
                this._idcategory = value;
                if (changed) {
                    this.onIdcategoryChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "idcategoryChanged", {
            /**
             * Gets an event raised when the value of the idcategory property changes
             */
            get: function () {
                if (!this._idcategoryChanged) {
                    this._idcategoryChanged = new latte.LatteEvent(this);
                }
                return this._idcategoryChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>idcategoryChanged</c> event
         */
        personBase.prototype.onIdcategoryChanged = function () {
            if (this._idcategoryChanged) {
                this._idcategoryChanged.raise();
            }
            this.onFieldValueChanged('idcategory', this.idcategory);
        };
        Object.defineProperty(personBase.prototype, "title", {
            /**
             * Gets or sets the value of the title field of type varchar(128)
             */
            get: function () {
                return this._title;
            },
            /**
             * Gets or sets the value of the title field of type varchar(128)
             */
            set: function (value) {
                var changed = value !== this._title;
                this._title = value;
                if (changed) {
                    this.onTitleChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "titleChanged", {
            /**
             * Gets an event raised when the value of the title property changes
             */
            get: function () {
                if (!this._titleChanged) {
                    this._titleChanged = new latte.LatteEvent(this);
                }
                return this._titleChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>titleChanged</c> event
         */
        personBase.prototype.onTitleChanged = function () {
            if (this._titleChanged) {
                this._titleChanged.raise();
            }
            this.onFieldValueChanged('title', this.title);
        };
        Object.defineProperty(personBase.prototype, "name", {
            /**
             * Gets or sets the value of the name field of type varchar(128)
             */
            get: function () {
                return this._name;
            },
            /**
             * Gets or sets the value of the name field of type varchar(128)
             */
            set: function (value) {
                var changed = value !== this._name;
                this._name = value;
                if (changed) {
                    this.onNameChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "nameChanged", {
            /**
             * Gets an event raised when the value of the name property changes
             */
            get: function () {
                if (!this._nameChanged) {
                    this._nameChanged = new latte.LatteEvent(this);
                }
                return this._nameChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>nameChanged</c> event
         */
        personBase.prototype.onNameChanged = function () {
            if (this._nameChanged) {
                this._nameChanged.raise();
            }
            this.onFieldValueChanged('name', this.name);
        };
        Object.defineProperty(personBase.prototype, "lastname", {
            /**
             * Gets or sets the value of the lastname field of type varchar(128)
             */
            get: function () {
                return this._lastname;
            },
            /**
             * Gets or sets the value of the lastname field of type varchar(128)
             */
            set: function (value) {
                var changed = value !== this._lastname;
                this._lastname = value;
                if (changed) {
                    this.onLastnameChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "lastnameChanged", {
            /**
             * Gets an event raised when the value of the lastname property changes
             */
            get: function () {
                if (!this._lastnameChanged) {
                    this._lastnameChanged = new latte.LatteEvent(this);
                }
                return this._lastnameChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>lastnameChanged</c> event
         */
        personBase.prototype.onLastnameChanged = function () {
            if (this._lastnameChanged) {
                this._lastnameChanged.raise();
            }
            this.onFieldValueChanged('lastname', this.lastname);
        };
        Object.defineProperty(personBase.prototype, "birth", {
            /**
             * Gets or sets the value of the birth field of type date
             */
            get: function () {
                return this._birth;
            },
            /**
             * Gets or sets the value of the birth field of type date
             */
            set: function (value) {
                var changed = value !== this._birth;
                this._birth = value;
                if (changed) {
                    this.onBirthChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "birthChanged", {
            /**
             * Gets an event raised when the value of the birth property changes
             */
            get: function () {
                if (!this._birthChanged) {
                    this._birthChanged = new latte.LatteEvent(this);
                }
                return this._birthChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>birthChanged</c> event
         */
        personBase.prototype.onBirthChanged = function () {
            if (this._birthChanged) {
                this._birthChanged.raise();
            }
            this.onFieldValueChanged('birth', this.birth);
        };
        Object.defineProperty(personBase.prototype, "sex", {
            /**
             * Gets or sets the value of the sex field of type varchar(10)
             */
            get: function () {
                return this._sex;
            },
            /**
             * Gets or sets the value of the sex field of type varchar(10)
             */
            set: function (value) {
                var changed = value !== this._sex;
                this._sex = value;
                if (changed) {
                    this.onSexChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "sexChanged", {
            /**
             * Gets an event raised when the value of the sex property changes
             */
            get: function () {
                if (!this._sexChanged) {
                    this._sexChanged = new latte.LatteEvent(this);
                }
                return this._sexChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>sexChanged</c> event
         */
        personBase.prototype.onSexChanged = function () {
            if (this._sexChanged) {
                this._sexChanged.raise();
            }
            this.onFieldValueChanged('sex', this.sex);
        };
        Object.defineProperty(personBase.prototype, "address", {
            /**
             * Gets or sets the value of the address field of type varchar(255)
             */
            get: function () {
                return this._address;
            },
            /**
             * Gets or sets the value of the address field of type varchar(255)
             */
            set: function (value) {
                var changed = value !== this._address;
                this._address = value;
                if (changed) {
                    this.onAddressChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "addressChanged", {
            /**
             * Gets an event raised when the value of the address property changes
             */
            get: function () {
                if (!this._addressChanged) {
                    this._addressChanged = new latte.LatteEvent(this);
                }
                return this._addressChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>addressChanged</c> event
         */
        personBase.prototype.onAddressChanged = function () {
            if (this._addressChanged) {
                this._addressChanged.raise();
            }
            this.onFieldValueChanged('address', this.address);
        };
        Object.defineProperty(personBase.prototype, "phone", {
            /**
             * Gets or sets the value of the phone field of type varchar(128)
             */
            get: function () {
                return this._phone;
            },
            /**
             * Gets or sets the value of the phone field of type varchar(128)
             */
            set: function (value) {
                var changed = value !== this._phone;
                this._phone = value;
                if (changed) {
                    this.onPhoneChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "phoneChanged", {
            /**
             * Gets an event raised when the value of the phone property changes
             */
            get: function () {
                if (!this._phoneChanged) {
                    this._phoneChanged = new latte.LatteEvent(this);
                }
                return this._phoneChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>phoneChanged</c> event
         */
        personBase.prototype.onPhoneChanged = function () {
            if (this._phoneChanged) {
                this._phoneChanged.raise();
            }
            this.onFieldValueChanged('phone', this.phone);
        };
        Object.defineProperty(personBase.prototype, "mobile", {
            /**
             * Gets or sets the value of the mobile field of type varchar(128)
             */
            get: function () {
                return this._mobile;
            },
            /**
             * Gets or sets the value of the mobile field of type varchar(128)
             */
            set: function (value) {
                var changed = value !== this._mobile;
                this._mobile = value;
                if (changed) {
                    this.onMobileChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "mobileChanged", {
            /**
             * Gets an event raised when the value of the mobile property changes
             */
            get: function () {
                if (!this._mobileChanged) {
                    this._mobileChanged = new latte.LatteEvent(this);
                }
                return this._mobileChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>mobileChanged</c> event
         */
        personBase.prototype.onMobileChanged = function () {
            if (this._mobileChanged) {
                this._mobileChanged.raise();
            }
            this.onFieldValueChanged('mobile', this.mobile);
        };
        Object.defineProperty(personBase.prototype, "note", {
            /**
             * Gets or sets the value of the note field of type text
             */
            get: function () {
                return this._note;
            },
            /**
             * Gets or sets the value of the note field of type text
             */
            set: function (value) {
                var changed = value !== this._note;
                this._note = value;
                if (changed) {
                    this.onNoteChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "noteChanged", {
            /**
             * Gets an event raised when the value of the note property changes
             */
            get: function () {
                if (!this._noteChanged) {
                    this._noteChanged = new latte.LatteEvent(this);
                }
                return this._noteChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>noteChanged</c> event
         */
        personBase.prototype.onNoteChanged = function () {
            if (this._noteChanged) {
                this._noteChanged.raise();
            }
            this.onFieldValueChanged('note', this.note);
        };
        Object.defineProperty(personBase.prototype, "company", {
            /**
             * Gets or sets the value of the company field of type varchar(128)
             */
            get: function () {
                return this._company;
            },
            /**
             * Gets or sets the value of the company field of type varchar(128)
             */
            set: function (value) {
                var changed = value !== this._company;
                this._company = value;
                if (changed) {
                    this.onCompanyChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "companyChanged", {
            /**
             * Gets an event raised when the value of the company property changes
             */
            get: function () {
                if (!this._companyChanged) {
                    this._companyChanged = new latte.LatteEvent(this);
                }
                return this._companyChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>companyChanged</c> event
         */
        personBase.prototype.onCompanyChanged = function () {
            if (this._companyChanged) {
                this._companyChanged.raise();
            }
            this.onFieldValueChanged('company', this.company);
        };
        Object.defineProperty(personBase.prototype, "email", {
            /**
             * Gets or sets the value of the email field of type varchar(128)
             */
            get: function () {
                return this._email;
            },
            /**
             * Gets or sets the value of the email field of type varchar(128)
             */
            set: function (value) {
                var changed = value !== this._email;
                this._email = value;
                if (changed) {
                    this.onEmailChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "emailChanged", {
            /**
             * Gets an event raised when the value of the email property changes
             */
            get: function () {
                if (!this._emailChanged) {
                    this._emailChanged = new latte.LatteEvent(this);
                }
                return this._emailChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>emailChanged</c> event
         */
        personBase.prototype.onEmailChanged = function () {
            if (this._emailChanged) {
                this._emailChanged.raise();
            }
            this.onFieldValueChanged('email', this.email);
        };
        /**
        * Override. Gets data about the fields of the record.
        **/
        personBase.prototype.onGetFields = function () {
            return { 'idperson': this.idperson, 'idcategory': this.idcategory, 'title': this.title, 'name': this.name, 'lastname': this.lastname, 'birth': this.birth, 'sex': this.sex, 'address': this.address, 'phone': this.phone, 'mobile': this.mobile, 'note': this.note, 'company': this.company, 'email': this.email };
        };
        /*
         * Remote Method.
 Searches for persons in the database


         */
        personBase.search = function (term, page, pageSize) {
            if (term === void 0) { term = ''; }
            if (page === void 0) { page = 1; }
            if (pageSize === void 0) { pageSize = 50; }
            return new latte.RemoteCall('app.list', 'Person', 'search', { term: term, page: page, pageSize: pageSize });
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
