var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var latte;
(function (latte) {
    var categoryBase = (function (_super) {
        __extends(categoryBase, _super);
        function categoryBase() {
            _super.apply(this, arguments);
            /* Name of Php record */
            this._recordType = 'undefined';
            /* Name of Module where record lives */
            this._moduleName = 'test';
            /**
             * Database field: int(11)
             */
            this._idcategory = null;
            /**
             * Database field: varchar(128)
             */
            this._name = null;
            /**
             * Database field: int(11)
             */
            this._i = null;
        }
        Object.defineProperty(categoryBase.prototype, "idcategory", {
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
        Object.defineProperty(categoryBase.prototype, "idcategoryChanged", {
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
        categoryBase.prototype.onIdcategoryChanged = function () {
            if (this._idcategoryChanged) {
                this._idcategoryChanged.raise();
            }
            this.onFieldValueChanged('idcategory', this.idcategory);
        };
        /**
        * Gets the name of the autoincrement field
        **/
        categoryBase.prototype.onGetRecordIdName = function () { return 'idcategory'; };
        Object.defineProperty(categoryBase.prototype, "name", {
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
        Object.defineProperty(categoryBase.prototype, "nameChanged", {
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
        categoryBase.prototype.onNameChanged = function () {
            if (this._nameChanged) {
                this._nameChanged.raise();
            }
            this.onFieldValueChanged('name', this.name);
        };
        Object.defineProperty(categoryBase.prototype, "i", {
            /**
             * Gets or sets the value of the i field of type int(11)
             */
            get: function () {
                return this._i;
            },
            /**
             * Gets or sets the value of the i field of type int(11)
             */
            set: function (value) {
                var changed = value !== this._i;
                this._i = value;
                if (changed) {
                    this.onIChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(categoryBase.prototype, "iChanged", {
            /**
             * Gets an event raised when the value of the i property changes
             */
            get: function () {
                if (!this._iChanged) {
                    this._iChanged = new latte.LatteEvent(this);
                }
                return this._iChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>iChanged</c> event
         */
        categoryBase.prototype.onIChanged = function () {
            if (this._iChanged) {
                this._iChanged.raise();
            }
            this.onFieldValueChanged('i', this.i);
        };
        /**
        * Override. Gets data about the fields of the record.
        **/
        categoryBase.prototype.onGetFields = function () { return { 'idcategory': this.idcategory, 'name': this.name, 'i': this.i }; };
        return categoryBase;
    }(latte.DataRecord));
    latte.categoryBase = categoryBase;
    var personBase = (function (_super) {
        __extends(personBase, _super);
        function personBase() {
            _super.apply(this, arguments);
            /* Name of Php record */
            this._recordType = 'undefined';
            /* Name of Module where record lives */
            this._moduleName = 'test';
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
        personBase.prototype.onGetRecordIdName = function () { return 'idperson'; };
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
        personBase.prototype.onGetFields = function () { return { 'idperson': this.idperson, 'idcategory': this.idcategory, 'title': this.title, 'name': this.name, 'lastname': this.lastname, 'birth': this.birth, 'sex': this.sex, 'address': this.address, 'phone': this.phone, 'mobile': this.mobile, 'note': this.note, 'company': this.company, 'email': this.email }; };
        return personBase;
    }(latte.DataRecord));
    latte.personBase = personBase;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/27/16.
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
            latte.log("Test");
        }
        return Main;
    }());
    latte.Main = Main;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Sites/Latte/latte/test/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/test/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/test/support/ts-include/latte.data.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/test/support/ts-include/latte.data.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/test/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/test/support/ts-include/records.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/test/ts/Main.ts" /> 
