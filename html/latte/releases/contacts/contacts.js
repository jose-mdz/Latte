var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            this._moduleName = 'contacts';
            /**
             * Database field: int(11)
             */
            this._idperson = null;
            /**
             * Database field: varchar(128)
             */
            this._name = null;
            /**
             * Database field: varchar(128)
             */
            this._lastname = null;
            /**
             * Database field: varchar(128)
             */
            this._phone = null;
            /**
             * Database field: varchar(128)
             */
            this._cellphone = null;
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
        Object.defineProperty(personBase.prototype, "cellphone", {
            /**
             * Gets or sets the value of the cellphone field of type varchar(128)
             */
            get: function () {
                return this._cellphone;
            },
            /**
             * Gets or sets the value of the cellphone field of type varchar(128)
             */
            set: function (value) {
                var changed = value !== this._cellphone;
                this._cellphone = value;
                if (changed) {
                    this.onCellphoneChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personBase.prototype, "cellphoneChanged", {
            /**
             * Gets an event raised when the value of the cellphone property changes
             */
            get: function () {
                if (!this._cellphoneChanged) {
                    this._cellphoneChanged = new latte.LatteEvent(this);
                }
                return this._cellphoneChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>cellphoneChanged</c> event
         */
        personBase.prototype.onCellphoneChanged = function () {
            if (this._cellphoneChanged) {
                this._cellphoneChanged.raise();
            }
            this.onFieldValueChanged('cellphone', this.cellphone);
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
        personBase.prototype.onGetFields = function () { return { 'idperson': this.idperson, 'name': this.name, 'lastname': this.lastname, 'phone': this.phone, 'cellphone': this.cellphone, 'email': this.email }; };
        /*
         * Remote Method.
 Retrieves all person records.

         */
        personBase.catalog = function () {
            return new latte.RemoteCall('contacts', 'Person', 'catalog', {});
        };
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
        }
        return Main;
    }());
    latte.Main = Main;
})(latte || (latte = {}));
/**
 * Generated by xlatte
 */
var latte;
(function (latte) {
    /**
     * Record for table Person
     */
    var Person = (function (_super) {
        __extends(Person, _super);
        function Person() {
            _super.apply(this, arguments);
        }
        /**
         * Creates a new person
         */
        Person.create = function (name, lastname) {
            var p = new Person();
            p.name = name;
            p.lastname = lastname;
            p.save();
        };
        return Person;
    }(latte.personBase));
    latte.Person = Person;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Sites/Latte/latte/contacts/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/contacts/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/contacts/support/ts-include/latte.data.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/contacts/support/ts-include/latte.data.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/contacts/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/contacts/support/ts-include/records.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/contacts/ts/Main.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/contacts/ts/records/Person.ts" /> 
