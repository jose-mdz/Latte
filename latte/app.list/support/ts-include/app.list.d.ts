/// <reference path="app.list.strings.d.ts" />
/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.data.d.ts" />
/// <reference path="latte.data.strings.d.ts" />
/// <reference path="latte.data.ui.d.ts" />
/// <reference path="latte.strings.d.ts" />
/// <reference path="latte.ui.d.ts" />
/// <reference path="latte.ui.strings.d.ts" />
declare module latte {
    class personBase extends DataRecord {
        _recordType: string;
        _moduleName: string;
        /**
         * Database field: int(11)
         */
        _idperson: any;
        /**
         * Gets or sets the value of the idperson field of type int(11)
         */
        /**
         * Gets or sets the value of the idperson field of type int(11)
         */
        idperson: any;
        /**
         * Back field for event
         */
        _idpersonChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the idperson property changes
         */
        idpersonChanged: LatteEvent;
        /**
         * Raises the <c>idpersonChanged</c> event
         */
        onIdpersonChanged(): void;
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName(): string;
        /**
         * Database field: int(11)
         */
        _idcategory: any;
        /**
         * Gets or sets the value of the idcategory field of type int(11)
         */
        /**
         * Gets or sets the value of the idcategory field of type int(11)
         */
        idcategory: any;
        /**
         * Back field for event
         */
        _idcategoryChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the idcategory property changes
         */
        idcategoryChanged: LatteEvent;
        /**
         * Raises the <c>idcategoryChanged</c> event
         */
        onIdcategoryChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _title: any;
        /**
         * Gets or sets the value of the title field of type varchar(128)
         */
        /**
         * Gets or sets the value of the title field of type varchar(128)
         */
        title: any;
        /**
         * Back field for event
         */
        _titleChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the title property changes
         */
        titleChanged: LatteEvent;
        /**
         * Raises the <c>titleChanged</c> event
         */
        onTitleChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _name: any;
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        name: any;
        /**
         * Back field for event
         */
        _nameChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the name property changes
         */
        nameChanged: LatteEvent;
        /**
         * Raises the <c>nameChanged</c> event
         */
        onNameChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _lastname: any;
        /**
         * Gets or sets the value of the lastname field of type varchar(128)
         */
        /**
         * Gets or sets the value of the lastname field of type varchar(128)
         */
        lastname: any;
        /**
         * Back field for event
         */
        _lastnameChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the lastname property changes
         */
        lastnameChanged: LatteEvent;
        /**
         * Raises the <c>lastnameChanged</c> event
         */
        onLastnameChanged(): void;
        /**
         * Database field: date
         */
        _birth: any;
        /**
         * Gets or sets the value of the birth field of type date
         */
        /**
         * Gets or sets the value of the birth field of type date
         */
        birth: any;
        /**
         * Back field for event
         */
        _birthChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the birth property changes
         */
        birthChanged: LatteEvent;
        /**
         * Raises the <c>birthChanged</c> event
         */
        onBirthChanged(): void;
        /**
         * Database field: varchar(10)
         */
        _sex: any;
        /**
         * Gets or sets the value of the sex field of type varchar(10)
         */
        /**
         * Gets or sets the value of the sex field of type varchar(10)
         */
        sex: any;
        /**
         * Back field for event
         */
        _sexChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the sex property changes
         */
        sexChanged: LatteEvent;
        /**
         * Raises the <c>sexChanged</c> event
         */
        onSexChanged(): void;
        /**
         * Database field: varchar(255)
         */
        _address: any;
        /**
         * Gets or sets the value of the address field of type varchar(255)
         */
        /**
         * Gets or sets the value of the address field of type varchar(255)
         */
        address: any;
        /**
         * Back field for event
         */
        _addressChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the address property changes
         */
        addressChanged: LatteEvent;
        /**
         * Raises the <c>addressChanged</c> event
         */
        onAddressChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _phone: any;
        /**
         * Gets or sets the value of the phone field of type varchar(128)
         */
        /**
         * Gets or sets the value of the phone field of type varchar(128)
         */
        phone: any;
        /**
         * Back field for event
         */
        _phoneChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the phone property changes
         */
        phoneChanged: LatteEvent;
        /**
         * Raises the <c>phoneChanged</c> event
         */
        onPhoneChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _mobile: any;
        /**
         * Gets or sets the value of the mobile field of type varchar(128)
         */
        /**
         * Gets or sets the value of the mobile field of type varchar(128)
         */
        mobile: any;
        /**
         * Back field for event
         */
        _mobileChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the mobile property changes
         */
        mobileChanged: LatteEvent;
        /**
         * Raises the <c>mobileChanged</c> event
         */
        onMobileChanged(): void;
        /**
         * Database field: text
         */
        _note: any;
        /**
         * Gets or sets the value of the note field of type text
         */
        /**
         * Gets or sets the value of the note field of type text
         */
        note: any;
        /**
         * Back field for event
         */
        _noteChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the note property changes
         */
        noteChanged: LatteEvent;
        /**
         * Raises the <c>noteChanged</c> event
         */
        onNoteChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _company: any;
        /**
         * Gets or sets the value of the company field of type varchar(128)
         */
        /**
         * Gets or sets the value of the company field of type varchar(128)
         */
        company: any;
        /**
         * Back field for event
         */
        _companyChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the company property changes
         */
        companyChanged: LatteEvent;
        /**
         * Raises the <c>companyChanged</c> event
         */
        onCompanyChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _email: any;
        /**
         * Gets or sets the value of the email field of type varchar(128)
         */
        /**
         * Gets or sets the value of the email field of type varchar(128)
         */
        email: any;
        /**
         * Back field for event
         */
        _emailChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the email property changes
         */
        emailChanged: LatteEvent;
        /**
         * Raises the <c>emailChanged</c> event
         */
        onEmailChanged(): void;
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields(): any;
        static search(term?: string, page?: number, pageSize?: number): RemoteCall<PageResult<Person>>;
    }
}
/**
 * Created by josemanuel on 6/11/14.
 */
declare module latte {
    /**
     *
     */
    class Main {
        /**
         *
         */
        constructor();
    }
}
/**
 * Created by josemanuel on 6/11/14.
 */
declare module latte {
    /**
     *
     */
    class MainView extends ToolbarView {
        /**
         * Creates the Agenda View
         */
        constructor();
        private btnNew_Click();
        /**
         * Loads the list of people in the agenda
         */
        loadList(): void;
        /**
         * Field for btnNew property
         */
        private _btnNew;
        /**
         * Gets the "New" Button
         *
         * @returns {ButtonItem}
         */
        btnNew: ButtonItem;
        /**
         * Field for paginator property
         */
        private _paginator;
        /**
         * Gets the pagination item
         *
         * @returns {PaginationItem}
         */
        paginator: PaginationItem;
        /**
         * Field for listView property
         */
        private _listView;
        /**
         * Gets the list view
         *
         * @returns {ListView}
         */
        listView: ListView;
    }
}
/**
 * Created by josemanuel on 6/11/14.
 */
declare module latte {
    /**
     *
     */
    class Person extends personBase {
        /**
         *
         */
        constructor();
        getMetadata(): {
            fields: {
                name: {
                    text: string;
                };
                lastname: {
                    text: string;
                };
                sex: {
                    text: string;
                    type: string;
                    options: string[];
                };
                birth: {
                    text: string;
                    type: string;
                };
            };
        };
    }
}
